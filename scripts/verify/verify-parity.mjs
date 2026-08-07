// Pixel parity gate. Compares a freshly captured screenshot directory against a
// stored baseline and fails on any differing pixel, so a refactor that claims
// zero visual change has to prove it rather than be eyeballed.
//
//   node scripts/verify/verify-parity.mjs <baselineDir> <currentDir> [--tolerance N] [--out DIR]
//
// Tolerance is the number of differing pixels allowed per route (default 0).
// Anti-aliasing on canvas-backed routes can produce a handful of unstable
// pixels between runs; raise it deliberately and say so, never silently.
// Differences are written as side-by-side diff images so a failure is
// inspectable rather than a number.

import { spawnSync } from 'node:child_process';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const positional = [];
let tolerance = 0;
let outDir = null;
for (let index = 0; index < args.length; index += 1) {
  if (args[index] === '--tolerance') {
    tolerance = Number(args[index + 1]);
    index += 1;
  } else if (args[index] === '--out') {
    outDir = args[index + 1];
    index += 1;
  } else {
    positional.push(args[index]);
  }
}

const [baselineDir, currentDir] = positional;
if (!baselineDir || !currentDir) {
  throw new Error(
    'Usage: verify-parity.mjs <baselineDir> <currentDir> [--tolerance N] [--out DIR]',
  );
}
if (!Number.isFinite(tolerance) || tolerance < 0) {
  throw new Error(`Invalid tolerance "${tolerance}"`);
}

const diffDir = outDir ?? path.join(currentDir, '__diff');
await mkdir(diffDir, { recursive: true });

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
  if (/image widths or heights differ/i.test(output)) {
    results.push({ route: name, status: 'size-mismatch', differingPixels: null, diff: diffPath });
    continue;
  }
  const differingPixels = Number.parseInt(output.replace(/[^\d].*$/, ''), 10);
  if (!Number.isFinite(differingPixels)) {
    results.push({ route: name, status: 'compare-failed', detail: output.slice(0, 200) });
    continue;
  }
  results.push({
    route: name,
    status: differingPixels <= tolerance ? 'pass' : 'fail',
    differingPixels,
    diff: differingPixels === 0 ? null : diffPath,
  });
}

const failures = results.filter((entry) => entry.status !== 'pass');
const passed = failures.length === 0 && missing.length === 0 && added.length === 0;

console.log(
  JSON.stringify(
    {
      passed,
      tolerance,
      baselineDir,
      currentDir,
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
