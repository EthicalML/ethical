// Where rasterised blog diagrams live and whether they are current. Shared by the
// rasteriser and the dev-only copy component, without pulling Playwright into Vite.

import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const BLOG_DIR = 'src/content/blog';
export const OUT_DIR = 'tmp/diagrams';

export const pngFor = (post, svg) => join(OUT_DIR, post, svg.replace(/\.svg$/, '.png'));

export function svgsOf(post) {
  return readdirSync(join(BLOG_DIR, post)).filter((file) => file.endsWith('.svg'));
}

// A PNG is stale when it is missing or older than the SVG it was rendered from.
export function isStale(post, svg) {
  const out = pngFor(post, svg);
  return !existsSync(out) || statSync(out).mtimeMs < statSync(join(BLOG_DIR, post, svg)).mtimeMs;
}
