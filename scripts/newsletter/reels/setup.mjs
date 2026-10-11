#!/usr/bin/env node

/**
 * Lays out the working folder for an issue's motion reels.
 *
 *   node scripts/newsletter/reels/setup.mjs --issue N [--audio-lib <dir>]
 *
 * Creates tmp/issue-<N>/reels/ with everything a reel folder inside it expects to find one
 * level up:
 *
 *   gallery.html          the review page (gallery.html?reels=a,b,c)
 *   vendor/fit.js         scales the live preview to the window
 *   vendor/audio.js       Sound A / B / C buttons, which become the preview clock
 *   vendor/three.module.min.js   three.js r170, downloaded once
 *   vendor/audio-lib/     links to the procedural audio library (music.py, sfx.py, ...)
 *   .venv/                Python with numpy, soundfile and scipy for the sound scripts
 *
 * The audio library belongs to the `z-motion-reel` skill and is not part of this repository,
 * so it is linked rather than copied and its path is never committed: --audio-lib, then
 * REEL_AUDIO_LIB, then the newest installed skill under ~/.claude/plugins/cache/.
 *
 * Safe to re-run: vendor files are refreshed, the download and the venv are made only once.
 */

import { execFileSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const threeUrl = 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js';
const audioFiles = ['music.py', 'sfx.py', 'music.md', 'score.py'];

const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : undefined;
};
const fail = (message) => {
  console.error(`setup: ${message}`);
  process.exit(1);
};

const issue = option('issue');
if (!/^\d+$/.test(issue ?? '')) fail('usage: setup.mjs --issue N [--audio-lib <dir>]');

const has = (command) => {
  try {
    execFileSync('which', [command], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};
if (!has('ffmpeg')) fail('ffmpeg not found on PATH (brew install ffmpeg)');
if (!has('uv')) fail('uv not found on PATH (https://docs.astral.sh/uv/)');

// A library file may sit at the top of the directory or, for score.py in the installed
// skill, under template/.
const locate = (dir, file) =>
  [path.join(dir, file), path.join(dir, 'template', file)].find((candidate) =>
    existsSync(candidate),
  );

function installedAudioLib() {
  const cache = path.join(process.env.HOME ?? '', '.claude/plugins/cache');
  if (!existsSync(cache)) return undefined;
  const found = [];
  for (const marketplace of readdirSync(cache)) {
    const helpers = path.join(cache, marketplace, 'helpers');
    if (!existsSync(helpers)) continue;
    for (const version of readdirSync(helpers)) {
      const dir = path.join(helpers, version, 'skills/z-motion-reel');
      if (existsSync(dir)) found.push({ version, dir });
    }
  }
  const parts = (value) => value.split('.').map((piece) => Number.parseInt(piece, 10) || 0);
  found.sort((left, right) => {
    const [a, b] = [parts(left.version), parts(right.version)];
    for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
      const delta = (b[index] ?? 0) - (a[index] ?? 0);
      if (delta) return delta;
    }
    return 0;
  });
  return found[0]?.dir;
}

const audioLib = option('audio-lib') ?? process.env.REEL_AUDIO_LIB ?? installedAudioLib();
if (!audioLib) {
  fail(
    'audio library not found: pass --audio-lib, set REEL_AUDIO_LIB, or install the z-motion-reel skill',
  );
}
const missing = audioFiles.filter((file) => !locate(audioLib, file));
if (missing.length) fail(`audio library at ${audioLib} is missing ${missing.join(', ')}`);

const reelsDir = path.join(root, 'tmp', `issue-${issue}`, 'reels');
const vendorDir = path.join(reelsDir, 'vendor');
mkdirSync(vendorDir, { recursive: true });

copyFileSync(path.join(here, 'vendor/fit.js'), path.join(vendorDir, 'fit.js'));
copyFileSync(path.join(here, 'vendor/audio.js'), path.join(vendorDir, 'audio.js'));
copyFileSync(path.join(here, 'gallery.html'), path.join(reelsDir, 'gallery.html'));

const threePath = path.join(vendorDir, 'three.module.min.js');
if (!existsSync(threePath)) {
  const response = await fetch(threeUrl);
  if (!response.ok) fail(`could not download three.js (${response.status} from ${threeUrl})`);
  writeFileSync(threePath, Buffer.from(await response.arrayBuffer()));
}

// One link per file, rebuilt every run, so a newer installed skill is picked up.
const libDir = path.join(vendorDir, 'audio-lib');
rmSync(libDir, { recursive: true, force: true });
mkdirSync(libDir);
for (const file of audioFiles) symlinkSync(locate(audioLib, file), path.join(libDir, file));

const venv = path.join(reelsDir, '.venv');
if (!existsSync(path.join(venv, 'bin/python'))) {
  execFileSync('uv', ['venv', '--quiet', venv], { stdio: 'inherit' });
  execFileSync(
    'uv',
    [
      'pip',
      'install',
      '--quiet',
      '--python',
      path.join(venv, 'bin/python'),
      'numpy',
      'soundfile',
      'scipy',
    ],
    { stdio: 'inherit' },
  );
}

console.log(`reels ready in ${path.relative(root, reelsDir)}/ (audio library: ${audioLib})`);
