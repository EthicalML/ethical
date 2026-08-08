// Pixel parity gate. Compares a freshly captured screenshot directory against a
// stored baseline and fails on any differing pixel, so a refactor that claims
// zero visual change has to prove it rather than be eyeballed.
//
//   node scripts/verify/verify-parity.mjs <baselineDir> <currentDir> \
//     [--tolerance N] [--out DIR] [--allow FILE]
//
// Tolerance is the number of differing pixels allowed per route (default 0).
// Anti-aliasing on canvas-backed routes can produce a handful of unstable
// pixels between runs; raise it deliberately and say so, never silently.
// Differences are written as side-by-side diff images so a failure is
// inspectable rather than a number.
//
// `--allow FILE` names a reviewed allowlist keyed by screenshot filename:
//
//   { "home.png": [{ "region": "400x60+100+200", "maxChannelDelta": 2,
//                    "pixels": 24000, "reason": "…", "approvedIn": "PR #NN" }] }
//
// It is deliberately not a tolerance. Declared regions are masked out of BOTH
// images and the rest of the page must still match exactly, so the gate is
// unweakened everywhere the reviewer did not look. Inside each region the
// magnitude is capped at 2/255 — anything a viewer could see has to be argued
// as a design change, not filed as an allowlist entry — the differing-pixel
// count may not exceed the declared figure, and an entry that no longer matches
// any difference fails the gate so the file cannot rot.

import { spawnSync } from 'node:child_process';
import { mkdir, readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';

// Above 2/255 a difference stops being sub-perceptual, so no reviewer may
// raise this from the allowlist file itself.
const MAX_CHANNEL_DELTA_CEILING = 2;

const args = process.argv.slice(2);
const positional = [];
let tolerance = 0;
let outDir = null;
let allowFile = null;
for (let index = 0; index < args.length; index += 1) {
  if (args[index] === '--tolerance') {
    tolerance = Number(args[index + 1]);
    index += 1;
  } else if (args[index] === '--out') {
    outDir = args[index + 1];
    index += 1;
  } else if (args[index] === '--allow') {
    allowFile = args[index + 1];
    index += 1;
  } else {
    positional.push(args[index]);
  }
}

const [baselineDir, currentDir] = positional;
if (!baselineDir || !currentDir) {
  throw new Error(
    'Usage: verify-parity.mjs <baselineDir> <currentDir> [--tolerance N] [--out DIR] [--allow FILE]',
  );
}
if (!Number.isFinite(tolerance) || tolerance < 0) {
  throw new Error(`Invalid tolerance "${tolerance}"`);
}

const allowlist = allowFile ? JSON.parse(await readFile(allowFile, 'utf8')) : {};

const parseRegion = (value) => {
  const match = /^(\d+)x(\d+)\+(\d+)\+(\d+)$/.exec(String(value ?? ''));
  if (!match) throw new Error(`Invalid region "${value}"; use WIDTHxHEIGHT+X+Y`);
  const [width, height, x, y] = match.slice(1).map(Number);
  return { width, height, x, y };
};
const magick = (parameters) => {
  const run = spawnSync('magick', parameters, { encoding: 'utf8' });
  return { stdout: `${run.stdout ?? ''}`.trim(), stderr: `${run.stderr ?? ''}`.trim() };
};
const differingPixelsBetween = (left, right) => {
  const { stderr } = magick(['compare', '-metric', 'AE', '-fuzz', '0%', left, right, 'null:']);
  return Number(stderr);
};
const maskRegions = (source, regions, destination) => {
  const draw = regions.flatMap(({ x, y, width, height }) => [
    '-draw',
    `rectangle ${x},${y} ${x + width - 1},${y + height - 1}`,
  ]);
  magick([source, '-fill', 'black', ...draw, destination]);
};
const differenceBoundingBox = (left, right) => {
  const { stdout } = magick([
    left,
    right,
    '-compose',
    'difference',
    '-composite',
    '-threshold',
    '0',
    '-format',
    '%@',
    'info:',
  ]);
  return stdout;
};

/**
 * Applies a reviewed allowlist to one route. Returns the entry outcomes plus a
 * verdict, or null when the route has no declared regions.
 */
const reviewAllowedRegions = async (name, basePath, currentPath, scratchDir) => {
  const entries = allowlist[name];
  if (!Array.isArray(entries) || entries.length === 0) return null;

  const regions = entries.map((entry) => parseRegion(entry.region));
  const maskedBase = path.join(scratchDir, `${name}.base.png`);
  const maskedCurrent = path.join(scratchDir, `${name}.current.png`);
  maskRegions(basePath, regions, maskedBase);
  maskRegions(currentPath, regions, maskedCurrent);
  const outsideRegions = differingPixelsBetween(maskedBase, maskedCurrent);

  const union = regions.reduce(
    (box, { x, y, width, height }) => ({
      left: Math.min(box.left, x),
      top: Math.min(box.top, y),
      right: Math.max(box.right, x + width),
      bottom: Math.max(box.bottom, y + height),
    }),
    { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity },
  );
  const bbox = differenceBoundingBox(basePath, currentPath);
  const parsedBbox = /^(\d+)x(\d+)\+(-?\d+)\+(-?\d+)$/.exec(bbox);
  const bboxContained =
    !parsedBbox ||
    (() => {
      const [width, height, x, y] = parsedBbox.slice(1).map(Number);
      if (width === 0 || height === 0) return true;
      return (
        x >= union.left && y >= union.top && x + width <= union.right && y + height <= union.bottom
      );
    })();

  const allowDir = path.join(diffDir, 'allow');
  await mkdir(allowDir, { recursive: true });
  const reviewed = entries.map((entry, index) => {
    const { region } = entry;
    const baseCrop = path.join(scratchDir, `${name}.${index}.base.png`);
    const currentCrop = path.join(scratchDir, `${name}.${index}.current.png`);
    magick([basePath, '-crop', region, '+repage', baseCrop]);
    magick([currentPath, '-crop', region, '+repage', currentCrop]);
    const { stdout } = magick([
      baseCrop,
      currentCrop,
      '-compose',
      'difference',
      '-composite',
      '-format',
      '%[fx:maxima*255]',
      'info:',
    ]);
    const maxChannelDelta = Number(stdout);
    const pixels = differingPixelsBetween(baseCrop, currentCrop);
    const declaredDelta = Number(entry.maxChannelDelta ?? MAX_CHANNEL_DELTA_CEILING);
    const cap = Math.min(declaredDelta, MAX_CHANNEL_DELTA_CEILING);
    const declaredPixels = Number(entry.pixels ?? Infinity);
    const problems = [];
    if (!entry.reason) problems.push('entry has no reason');
    if (!Number.isFinite(maxChannelDelta)) problems.push('magnitude measurement failed');
    else if (maxChannelDelta > cap)
      problems.push(`magnitude ${maxChannelDelta}/255 exceeds the ${cap}/255 cap`);
    if (pixels > declaredPixels)
      problems.push(`${pixels} differing pixels exceed the declared ${declaredPixels}`);
    if (pixels === 0) problems.push('region no longer contains any difference');
    magick([
      baseCrop,
      currentCrop,
      '-compose',
      'difference',
      '-composite',
      '-auto-level',
      path.join(allowDir, `${path.parse(name).name}-${index}.png`),
    ]);
    return {
      region,
      reason: entry.reason ?? null,
      approvedBy: entry.approvedBy ?? null,
      approvedIn: entry.approvedIn ?? null,
      maxChannelDelta,
      declaredMaxChannelDelta: declaredDelta,
      pixels,
      declaredPixels: entry.pixels ?? null,
      problems,
    };
  });

  const problems = [
    ...reviewed.flatMap(({ region, problems: entryProblems }) =>
      entryProblems.map((detail) => `${region}: ${detail}`),
    ),
    ...(outsideRegions === 0 ? [] : [`${outsideRegions} differing pixel(s) outside the allowlist`]),
    ...(bboxContained
      ? []
      : [`difference bounding box ${bbox} is not inside the declared regions`]),
  ];
  return { outsideRegions, boundingBox: bbox, entries: reviewed, problems };
};

const diffDir = outDir ?? path.join(currentDir, '__diff');
await mkdir(diffDir, { recursive: true });
const scratchDir = path.join(diffDir, '__masked');
if (allowFile) await mkdir(scratchDir, { recursive: true });

const pngsIn = async (dir) => (await readdir(dir)).filter((name) => name.endsWith('.png')).sort();
const baselineFiles = await pngsIn(baselineDir);
const currentFiles = await pngsIn(currentDir);

const missing = baselineFiles.filter((name) => !currentFiles.includes(name));
const added = currentFiles.filter((name) => !baselineFiles.includes(name));

const results = [];
for (const name of baselineFiles.filter((file) => currentFiles.includes(file))) {
  const basePath = path.join(baselineDir, name);
  const currentPath = path.join(currentDir, name);
  const diffPath = path.join(diffDir, name);
  // ImageMagick's AE metric counts absolutely different pixels and writes the
  // diff image; it exits non-zero when the images differ, which is expected.
  const run = spawnSync(
    'magick',
    ['compare', '-metric', 'AE', '-fuzz', '0%', basePath, currentPath, diffPath],
    { encoding: 'utf8' },
  );
  const output = `${run.stderr ?? ''}`.trim();
  // AE counts how many pixels differ at all; it says nothing about by how much.
  // A sub-perceptual shift across a large flat area reads as a huge count, so a
  // deliberate change needs PAE, the largest single-channel difference, to be
  // judged. Both are reported: the count locates the change, the delta sizes it.
  const peak = spawnSync(
    'magick',
    ['compare', '-metric', 'PAE', '-fuzz', '0%', basePath, currentPath, 'null:'],
    { encoding: 'utf8' },
  );
  const peakMatch = /\(([\d.eE+-]+)\)/.exec(`${peak.stderr ?? ''}`);
  const maxChannelDelta = peakMatch ? Math.round(Number(peakMatch[1]) * 255 * 100) / 100 : null;
  if (/image widths or heights differ/i.test(output)) {
    results.push({ route: name, status: 'size-mismatch', differingPixels: null, diff: diffPath });
    continue;
  }
  const differingPixels = Number(output);
  if (!Number.isFinite(differingPixels)) {
    results.push({ route: name, status: 'compare-failed', detail: output.slice(0, 200) });
    continue;
  }
  const allowed =
    differingPixels <= tolerance
      ? null
      : await reviewAllowedRegions(name, basePath, currentPath, scratchDir);
  results.push({
    route: name,
    status:
      differingPixels <= tolerance || allowed?.problems.length === 0
        ? 'pass'
        : allowed
          ? 'fail-allowlist'
          : 'fail',
    differingPixels,
    maxChannelDelta,
    ...(allowed ? { allowed } : {}),
    diff: differingPixels === 0 ? null : diffPath,
  });
}

const unusedAllowlistRoutes = Object.keys(allowlist).filter(
  (name) => !results.some((entry) => entry.route === name && entry.allowed),
);

const failures = results.filter((entry) => entry.status !== 'pass');
const passed =
  failures.length === 0 &&
  missing.length === 0 &&
  added.length === 0 &&
  unusedAllowlistRoutes.length === 0;

if (allowFile) await rm(scratchDir, { recursive: true, force: true });

console.log(
  JSON.stringify(
    {
      passed,
      tolerance,
      baselineDir,
      currentDir,
      ...(allowFile ? { allowFile, unusedAllowlistRoutes } : {}),
      compared: results.length,
      missingFromCurrent: missing,
      addedInCurrent: added,
      failures,
      results,
    },
    null,
    2,
  ),
);

process.exitCode = passed ? 0 : 1;
