#!/usr/bin/env node

/**
 * Records a scroll-through of every article marked `gif` in the issue's review document.
 *
 *   node scripts/newsletter/capture-gifs.mjs [--issue N] [--engine <path>] [--only <slug>]
 *
 * The recording engine is the `site-capture` skill's `capture.mjs`, which is a standalone
 * script with a documented CLI. It is used rather than reimplemented: it already handles the
 * constant scroll speed, the visible cursor and the CSS-zoom trap that makes a naive
 * implementation letterbox instead of zoom. It is also not part of this repository and never
 * will be, so its path is resolved at run time and never committed: --engine, then
 * SITE_CAPTURE_ENGINE, then the installed skill.
 *
 * Output is a GIF per article, written into that article's post folder, under the size cap.
 * GIF only: the destinations that need a picture rather than a video are the reason this
 * exists, and one artifact per post is one less thing to choose at upload time.
 */

import { execFile, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { playwrightModulePath } from '../lib/harvest-image.mjs';

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const flowPath = path.join(root, 'scripts/newsletter/capture-flow.mjs');

// A walk, not a tour. Long enough to read the title and see the article has a body, short
// enough to loop on a feed without becoming wallpaper.
const captureWidth = 1280;
const captureHeight = 800;
const maxGifBytes = 5 * 1024 * 1024;

// Encoding ladder, tried in order until one lands under the cap. Frame rate goes first
// because eased scrolling loses almost nothing at 10fps; width goes next; quality last,
// since flat dark backgrounds band before they soften.
const ladder = [
  { fps: 12, width: 900, quality: 80 },
  { fps: 10, width: 900, quality: 80 },
  { fps: 10, width: 760, quality: 75 },
  { fps: 8, width: 640, quality: 70 },
];

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    if (!argv[index].startsWith('--')) continue;
    const next = argv[index + 1];
    if (next === undefined || next.startsWith('--')) options[argv[index].slice(2)] = true;
    else {
      options[argv[index].slice(2)] = next;
      index += 1;
    }
  }
  return options;
}

/** The engine, wherever it happens to live on this machine. */
function resolveEngine(explicit) {
  const candidates = [
    explicit,
    process.env.SITE_CAPTURE_ENGINE,
    path.join(process.env.HOME ?? '', '.claude/skills/site-capture/capture.mjs'),
  ].filter(Boolean);
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  // Installed as a marketplace plugin, where the path carries a version directory.
  const cache = path.join(process.env.HOME ?? '', '.claude/plugins/cache');
  if (existsSync(cache)) {
    for (const marketplace of readdirSync(cache)) {
      const versions = path.join(cache, marketplace, 'site-capture');
      if (!existsSync(versions)) continue;
      const found = readdirSync(versions)
        .sort()
        .reverse()
        .map((version) => path.join(versions, version, 'skills/site-capture/capture.mjs'))
        .find((file) => existsSync(file));
      if (found) return found;
    }
  }
  return null;
}

/** Every `## n. Title` block whose `Choice:` line says gif. */
function gifTargets(document) {
  return document
    .split(/^## /m)
    .slice(1)
    .map((block, index) => ({
      position: index + 1,
      title: block
        .split('\n')[0]
        .replace(/^\d+\.\s*/, '')
        .trim(),
      url: block.match(/^Source: <([^>]+)>/m)?.[1] ?? '',
      choice:
        block
          .match(/^Choice:[ \t]*(.*)$/m)?.[1]
          ?.trim()
          .toLowerCase() ?? '',
    }))
    .filter((entry) => entry.choice === 'gif' && entry.url);
}

async function encodeGif(webm, target, workDir, trimSeconds) {
  for (const step of ladder) {
    const frames = path.join(workDir, 'frames');
    rmSync(frames, { recursive: true, force: true });
    mkdirSync(frames, { recursive: true });
    await run('ffmpeg', [
      '-v',
      'error',
      '-y',
      // Before the input, so it seeks rather than decoding and discarding.
      '-ss',
      String(trimSeconds),
      '-i',
      webm,
      '-vf',
      `fps=${step.fps},scale=${step.width}:-2:flags=lanczos`,
      path.join(frames, '%05d.png'),
    ]);
    const png = readdirSync(frames).map((name) => path.join(frames, name));
    if (!png.length) throw new Error('ffmpeg produced no frames');
    await run('gifski', [
      '-o',
      target,
      '--fps',
      String(step.fps),
      '--quality',
      String(step.quality),
      '--width',
      String(step.width),
      ...png,
    ]);
    rmSync(frames, { recursive: true, force: true });
    const bytes = statSync(target).size;
    if (bytes <= maxGifBytes) return { bytes, ...step };
  }
  // The last rung is what there is. Report it rather than pretending it passed.
  return { bytes: statSync(target).size, ...ladder.at(-1), overCap: true };
}

async function capture(target, { engine, postsDir, workDir }) {
  const slugDir = readdirSync(postsDir).find((name) => name.startsWith(`${target.position}-`));
  if (!slugDir) throw new Error(`no post folder for ${target.position}; run --apply first`);
  const outDir = path.join(workDir, `capture-${target.position}`);
  const name = `walk-${target.position}`;

  const { stdout } = await run(
    'node',
    [
      engine,
      '--url',
      target.url,
      '--flow',
      flowPath,
      '--name',
      name,
      '--out',
      outDir,
      '--width',
      String(captureWidth),
      '--height',
      String(captureHeight),
    ],
    {
      // The engine resolves Playwright from PLAYWRIGHT_MODULE when it is not a dependency of
      // the project it runs against, which here it is not. CAPTURE_TARGET_URL is how the
      // generic flow learns which article it is walking.
      env: {
        ...process.env,
        PLAYWRIGHT_MODULE: playwrightModulePath() ?? '',
        CAPTURE_TARGET_URL: target.url,
      },
      timeout: 300000,
    },
  );

  const webm = path.join(outDir, `${name}.webm`);
  if (!existsSync(webm)) throw new Error('engine produced no recording');
  // The beat log timestamps every mark. `article` is stamped the instant the article is up,
  // so everything before it is the engine's mandatory root load and comes off the front.
  const trim = Number(stdout.match(/^\s*([\d.]+)s\s+article\s*$/m)?.[1] ?? 0);
  const gif = path.join(postsDir, slugDir, 'image.gif');
  const encoded = await encodeGif(webm, gif, outDir, trim);
  rmSync(outDir, { recursive: true, force: true });
  return { slugDir, gif, trim, ...encoded };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const issue = Number.parseInt(
    options.issue ??
      String(
        readdirSync(path.join(root, 'src/content/newsletter'))
          .filter((name) => /^\d+\.md$/.test(name))
          .map((name) => Number.parseInt(name, 10))
          .sort((left, right) => left - right)
          .at(-1),
      ),
    10,
  );
  const workDir = path.join(root, 'tmp', `issue-${issue}`);
  const documentPath = path.join(workDir, 'posts.md');
  if (!existsSync(documentPath)) throw new Error(`${documentPath} does not exist`);

  const engine = resolveEngine(typeof options.engine === 'string' ? options.engine : null);
  if (!engine) {
    throw new Error(
      'site-capture engine not found. Pass --engine <path to capture.mjs> or set SITE_CAPTURE_ENGINE.',
    );
  }
  for (const tool of ['ffmpeg', 'gifski']) {
    try {
      execFileSync('which', [tool], { stdio: 'ignore' });
    } catch {
      throw new Error(`${tool} is required to encode the gif (brew install ${tool})`);
    }
  }

  const postsDir = path.join(workDir, 'posts');
  if (!existsSync(postsDir)) throw new Error('no posts folder yet; run fetch-images --apply first');

  const only = typeof options.only === 'string' ? options.only : null;
  const targets = gifTargets(readFileSync(documentPath, 'utf8')).filter(
    (target) => !only || target.url.includes(only),
  );
  if (!targets.length) {
    console.log('nothing marked gif');
    return;
  }
  console.log(`engine: ${engine}`);
  console.log(`recording ${targets.length} walk(s) in parallel\n`);

  // In parallel, because each is a browser recording in real time: five sequential walks is
  // five times the wall clock for work that does not compete for anything but CPU.
  const settled = await Promise.allSettled(
    targets.map((target) => capture(target, { engine, postsDir, workDir })),
  );
  settled.forEach((result, index) => {
    const target = targets[index];
    if (result.status === 'rejected') {
      console.log(`${target.title}: FAILED - ${result.reason.message}`);
      return;
    }
    const { bytes, fps, width, overCap } = result.value;
    console.log(
      `${target.title}: ${(bytes / 1024 / 1024).toFixed(1)} MB at ${fps}fps ${width}px -> ` +
        `${path.relative(root, result.value.gif)}` +
        (overCap ? ' (OVER the 5 MB cap even at the lowest rung)' : ''),
    );
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
