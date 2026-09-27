// Rasterises the committed SVG diagrams beside each blog post into PNGs under tmp/, for
// the dev-only "copy for LinkedIn / newsletter" buttons.
//
// Rich text editors accept a pasted <img> only if they can read its bytes: a localhost URL
// is unreachable from their servers, and SVG is not a format they render. The copy payload
// therefore inlines a rasterised PNG as a data URI, which needs no hosting and keeps the
// whole feature out of the production build.
//
// Output lives in tmp/diagrams/<post>/<name>.png, which is gitignored: these are
// derivatives of committed sources and regenerating them is one command. Nothing is
// hosted, because the copy payloads carry the bytes inline as data URIs.
//
// The copy component runs this with --stale whenever a post's PNGs are missing or older
// than their SVGs, so it normally runs on its own. It runs as a separate process because
// Playwright cannot be loaded through Vite's module runner.
//
//   node scripts/blog/rasterise-diagrams.mjs            # every post
//   node scripts/blog/rasterise-diagrams.mjs --only whose-memory-is-it-part-2
//   node scripts/blog/rasterise-diagrams.mjs --only <post-dir> --stale

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from '../verify/playwright.mjs';
import { BLOG_DIR, OUT_DIR, pngFor, svgsOf, isStale } from './diagram-cache.mjs';

// Two device pixels per CSS pixel, so the diagrams stay sharp on the retina displays these
// articles are read on.
const SCALE = 2;

async function rasterise(posts, { onlyStale = false } = {}) {
  const jobs = posts.flatMap((post) =>
    svgsOf(post)
      .filter((svg) => !onlyStale || isStale(post, svg))
      .map((svg) => [post, svg]),
  );
  if (jobs.length === 0) return 0;

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1400, height: 900 },
    deviceScaleFactor: SCALE,
  });

  let written = 0;
  for (const [post, svg] of jobs) {
    mkdirSync(join(OUT_DIR, post), { recursive: true });
    const markup = readFileSync(join(BLOG_DIR, post, svg), 'utf8');
    // The diagrams are authored for the dark article surface and declare a transparent
    // background, so they are composited on the site's own plate rather than on white.
    await page.setContent(`<body style="margin:0;background:#0f1115">${markup}</body>`);
    const element = await page.$('svg');
    if (!element) {
      console.warn(`${post}/${svg}: no <svg> element found, skipped`);
      continue;
    }
    writeFileSync(pngFor(post, svg), await element.screenshot({ type: 'png' }));
    written += 1;
    console.log(`${post}/${svg} -> ${pngFor(post, svg)}`);
  }

  await browser.close();
  return written;
}

const only = process.argv.includes('--only')
  ? process.argv[process.argv.indexOf('--only') + 1]
  : undefined;
const posts = readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !only || name.includes(only));
const written = await rasterise(posts, { onlyStale: process.argv.includes('--stale') });
console.log(`\n${written} diagram(s) rasterised into ${OUT_DIR}`);
