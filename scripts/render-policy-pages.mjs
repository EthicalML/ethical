// One-off follow-up to fetch-policy-previews.mjs: renders EVERY page of each cached
// policy PDF (tmp/pdfs, gitignored) into public/images/policy-record/pages/<slug>/pNN.webp
// for the reading-room paginated document viewer. Pages render opaque white (pdftoppm)
// so the paper never shows the site's dark background through PDF transparency.
//
// Run: node scripts/render-policy-pages.mjs [pdfDir]

import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pdfDir = path.resolve(process.argv[2] ?? path.join(root, 'tmp', 'pdfs'));
const outRoot = path.join(root, 'public', 'images', 'policy-record', 'pages');
const MAX_PAGES = 24;
const WIDTH = 640;

const pdfs = readdirSync(pdfDir).filter((name) => name.endsWith('.pdf'));
let total = 0;
for (const name of pdfs) {
  const slug = name.replace(/\.pdf$/, '');
  const outDir = path.join(outRoot, slug);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const work = path.join(os.tmpdir(), `policy-pages-${slug}`);
  rmSync(work, { recursive: true, force: true });
  mkdirSync(work, { recursive: true });
  try {
    execFileSync(
      'pdftoppm',
      [
        '-png',
        '-l',
        String(MAX_PAGES),
        '-scale-to-x',
        String(WIDTH),
        '-scale-to-y',
        '-1',
        path.join(pdfDir, name),
        path.join(work, 'p'),
      ],
      { stdio: ['ignore', 'ignore', 'ignore'] },
    );
  } catch {
    console.log(`${slug}: SKIPPED (not a renderable PDF)`);
    rmSync(work, { recursive: true, force: true });
    rmSync(outDir, { recursive: true, force: true });
    continue;
  }
  const pages = readdirSync(work).sort();
  for (const [i, page] of pages.entries()) {
    const out = path.join(outDir, `p${String(i + 1).padStart(2, '0')}.webp`);
    await sharp(path.join(work, page)).webp({ quality: 68 }).toFile(out);
  }
  rmSync(work, { recursive: true, force: true });
  total += pages.length;
  console.log(`${slug}: ${pages.length} pages`);
}
console.log(`Rendered ${total} pages across ${pdfs.length} PDFs into ${outRoot}`);
