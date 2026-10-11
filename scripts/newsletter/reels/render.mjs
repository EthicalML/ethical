#!/usr/bin/env node

/**
 * Renders one motion reel, frame by frame, to an mp4 or to review stills.
 *
 *   node scripts/newsletter/reels/render.mjs <reel-dir> [--fps 30] [--out file.mp4]
 *                                            [--frames-only t1,t2,...]
 *
 * A reel is a folder holding an index.html that animates itself in the browser. The renderer
 * never plays it in real time: it loads the page with ?render=1, then asks for each frame by
 * time, so a slow machine produces the same video as a fast one. That needs a contract with
 * the page, which `.claude/skills/newsletter-issue/references/reels.md` spells out in full:
 *
 *   - with ?render=1 the page does not self-animate;
 *   - it sets window.reel = { duration, width, height, seek: async (t) => {} } and
 *     window.reelReady = true once its fonts and assets are loaded;
 *   - seek(t) draws exactly the frame at t seconds and is a pure function of t.
 *
 * The reel folder's parent is served over http rather than the folder itself, because every
 * reel references the shared `../vendor/` that setup.mjs lays out next to it.
 *
 * --frames-only writes PNG stills at the given times into <reel-dir>/stills/, which is how a
 * reel is reviewed while it is still being built. Without it, frames are piped into ffmpeg as
 * an H.264 mp4 (written to <reel-dir>/reel.mp4 unless --out says otherwise), and an
 * audio.mp3 sitting in the reel folder is muxed in. The browser runs headless with the Metal
 * GPU flags, because software rendering gets WebGL compositing wrong in ways that only show
 * in the export.
 */

import { execFileSync, spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { loadChromium } from '../../lib/harvest-image.mjs';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
};
if (!args[0] || args[0].startsWith('--')) {
  console.error('usage: render.mjs <reel-dir> [--fps 30] [--out file.mp4] [--frames-only t1,t2]');
  process.exit(1);
}
const reelDir = path.resolve(args[0]);
if (!existsSync(path.join(reelDir, 'index.html'))) {
  console.error(`${reelDir} has no index.html`);
  process.exit(1);
}
const servedRoot = path.dirname(reelDir);
const fps = Number(option('fps', 30));
const out = path.resolve(reelDir, option('out', 'reel.mp4'));
const stills = option('frames-only', null);

const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
};
const server = createServer((request, response) => {
  const file = path.join(servedRoot, decodeURIComponent(request.url.split('?')[0]));
  if (!file.startsWith(servedRoot) || !existsSync(file)) return response.writeHead(404).end();
  response.writeHead(200, {
    'Content-Type': types[path.extname(file)] ?? 'application/octet-stream',
  });
  response.end(readFileSync(file));
}).listen(0);
const port = server.address().port;

const chromium = await loadChromium();
if (!chromium) {
  console.error('playwright is not available: run `npx playwright install chromium` once');
  process.exit(1);
}
const browser = await chromium.launch({
  headless: true,
  args: [
    '--use-angle=metal',
    '--enable-gpu',
    '--ignore-gpu-blocklist',
    '--enable-gpu-rasterization',
  ],
});
const page = await browser.newPage({
  viewport: { width: 1080, height: 1350 },
  deviceScaleFactor: 1,
});
page.on('pageerror', (error) => console.error('pageerror:', error.message));
page.on(
  'console',
  (message) => message.type() === 'error' && console.error('console:', message.text()),
);
await page.goto(`http://localhost:${port}/${path.basename(reelDir)}/index.html?render=1`);
await page.waitForFunction(() => window.reelReady === true, null, { timeout: 30000 });
const { duration, width, height } = await page.evaluate(() => ({
  duration: window.reel.duration,
  width: window.reel.width ?? 1080,
  height: window.reel.height ?? 1350,
}));
await page.setViewportSize({ width, height });

const shot = async (time) => {
  await page.evaluate((t) => window.reel.seek(t), time);
  await page.evaluate(
    () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))),
  );
  return page.screenshot({ type: 'png' });
};

if (stills) {
  const stillsDir = path.join(reelDir, 'stills');
  mkdirSync(stillsDir, { recursive: true });
  for (const time of stills.split(',').map(Number)) {
    writeFileSync(path.join(stillsDir, `t${time.toFixed(2)}.png`), await shot(time));
  }
  console.log(`stills written to ${stillsDir}`);
} else {
  const total = Math.round(duration * fps);
  const encoder = spawn(
    'ffmpeg',
    [
      '-y',
      '-loglevel',
      'error',
      '-f',
      'image2pipe',
      '-framerate',
      String(fps),
      '-i',
      '-',
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-crf',
      '18',
      '-preset',
      'slow',
      '-movflags',
      '+faststart',
      out,
    ],
    { stdio: ['pipe', 'inherit', 'inherit'] },
  );
  for (let frame = 0; frame < total; frame += 1) {
    const buffer = await shot(frame / fps);
    if (!encoder.stdin.write(buffer))
      await new Promise((done) => encoder.stdin.once('drain', done));
    if (frame % fps === 0) process.stdout.write(`\rframe ${frame}/${total}`);
  }
  encoder.stdin.end();
  await new Promise((done) => encoder.on('close', done));

  const audio = path.join(reelDir, 'audio.mp3');
  if (existsSync(audio)) {
    const silent = out.replace(/\.mp4$/, '.silent.mp4');
    renameSync(out, silent);
    execFileSync('ffmpeg', [
      '-y',
      '-loglevel',
      'error',
      '-i',
      silent,
      '-i',
      audio,
      '-map',
      '0:v',
      '-map',
      '1:a',
      '-c:v',
      'copy',
      '-c:a',
      'aac',
      '-b:a',
      '192k',
      '-t',
      String(duration),
      '-movflags',
      '+faststart',
      out,
    ]);
    rmSync(silent);
    console.log('\nmuxed audio.mp3');
  }
  console.log(`\nwrote ${out} (${total} frames, ${duration}s @ ${fps}fps, ${width}x${height})`);
}
await browser.close();
server.close();
