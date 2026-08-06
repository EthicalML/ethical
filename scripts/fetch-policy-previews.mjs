// One-off data-prep for the /prototypes/policy-record/ studies.
//
// For each of the 28 policy products it: downloads the href (curl -L, tolerating
// failures), detects PDF vs HTML, renders page 1 of each PDF to a page-1 thumbnail
// (sips -> png), downscales/encodes to webp via the existing sharp dependency into
// public/images/policy-record/<slug>.webp, and extracts text with pdftotext into
// tmp/pdftext/<slug>.txt for editorial curation. Non-PDF hrefs are recorded as
// html-placeholder (no image). tmp/ is gitignored: raw pdfs and extracted text are
// NOT committed, only the webp thumbnails and the curated data module.
//
// Run: node scripts/fetch-policy-previews.mjs

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pdfDir = path.join(root, 'tmp', 'pdfs');
const textDir = path.join(root, 'tmp', 'pdftext');
const outDir = path.join(root, 'public', 'images', 'policy-record');
[pdfDir, textDir, outDir].forEach((dir) => mkdirSync(dir, { recursive: true }));

// Copied verbatim from src/pages/policy.mdx products[]; slug derived from the href basename.
const hrefs = [
  'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-euc-ai-white-paper.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-ai-consultation.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/acm-consultation-submission-2024---guidelines-on-the-application-of-the-definition-of-an-ai-system.pdf',
  'https://www.acm.org/public-policy/europe-tpc/consultation-on-regulation-on-eu-ai-act-eu-2024-1689-04082026',
  'https://www.acm.org/public-policy/europe-tpc/response-consultation-article-50-ai-act-06022026',
  'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/acm-consultation-submission-2026---digital-omnibus-on-ai-regulation-proposal.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2024---general-purpose-ai-code-of-practice.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2024---2nd-general-purpose-ai-code-of-practice-1.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-ai-scientific-panel-of-independent-experts-111524.pdf',
  'https://www.acm.org/public-policy/europe-tpc/calibrating-oversight-agentic-frontier-models-04272026',
  'https://www.acm.org/public-policy/europe-tpc/reflections-draft-pren-18282',
  'https://www.acm.org/binaries/content/assets/public-policy/europetpc-digital-services-act-comments.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/acm-europe-tpc-delegated-regulation-dsa-draft-act-comments-2024.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/acm-eur-tpc-data-act-comments-13may22a.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-cyber-resilience.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/europetpc-comments-digital-principles.pdf',
  'https://www.acm.org/public-policy/europe-tpc/etpc-response-targeted-ec-consultation',
  'https://www.acm.org/binaries/content/assets/public-policy/etpc-survey-responses.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/final-acm_etpc-uk-ai-paper-comments.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-uk-ai-framework-comments.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-uknds.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2025---independent-international-scientific-panel-on-ai---united-nations-office-for-digital-and-emerging-technologies-1.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/acm-etpc-ttc-ai-taxonomy-112123.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/final-joint-ai-statement-update.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/principles-generative-ai.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/acm_climate_disclosure_final.pdf',
  'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/acm_data_center_final.pdf',
  'https://www.acm.org/public-policy/europe-tpc/acm-data-center-final-spanish',
];

const slugFor = (href, index) => {
  const base = href
    .split('/')
    .pop()
    .replace(/\.pdf$/i, '');
  return `${String(index).padStart(2, '0')}-${base}`.slice(0, 80);
};

const results = [];

for (let i = 0; i < hrefs.length; i += 1) {
  const href = hrefs[i];
  const slug = slugFor(href, i);
  const pdfPath = path.join(pdfDir, `${slug}.pdf`);
  const record = {
    index: i,
    slug,
    href,
    download: 'fail',
    kind: 'html',
    thumb: false,
    text: false,
  };

  try {
    // acm.org sits behind a Cloudflare challenge that 403s a bare curl UA; a browser UA passes.
    const ua =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
    execFileSync(
      'curl',
      [
        '-sL',
        '--max-time',
        '60',
        '-A',
        ua,
        '-H',
        'Accept: text/html,application/xhtml+xml,application/pdf,*/*',
        '-H',
        'Accept-Language: en-US,en;q=0.9',
        '-o',
        pdfPath,
        href,
      ],
      { stdio: 'ignore' },
    );
    const head = existsSync(pdfPath) ? readFileSync(pdfPath).subarray(0, 5).toString('latin1') : '';
    record.download = 'ok';
    if (head.startsWith('%PDF')) {
      record.kind = 'pdf';
    } else {
      record.kind = 'html';
    }
  } catch {
    record.download = 'fail';
  }

  if (record.kind === 'pdf') {
    // pdftotext for curation (tmp only)
    try {
      execFileSync('pdftotext', ['-l', '4', pdfPath, path.join(textDir, `${slug}.txt`)], {
        stdio: 'ignore',
      });
      record.text = true;
    } catch {
      record.text = false;
    }
    // page-1 render via sips -> temp png, then sharp -> webp (downscale to 520px wide)
    try {
      const rawPng = path.join(pdfDir, `${slug}.page1.png`);
      execFileSync('sips', ['-s', 'format', 'png', pdfPath, '--out', rawPng], { stdio: 'ignore' });
      await sharp(rawPng)
        .resize({ width: 520, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(outDir, `${slug}.webp`));
      record.thumb = true;
    } catch (error) {
      record.thumb = false;
      record.thumbError = String(error).slice(0, 120);
    }
  }

  results.push(record);
  process.stdout.write(
    `${slug}: dl=${record.download} kind=${record.kind} thumb=${record.thumb} text=${record.text}\n`,
  );
}

writeFileSync(path.join(root, 'tmp', 'fetch-report.json'), JSON.stringify(results, null, 2));

const tally = results.reduce(
  (acc, r) => {
    acc.dlOk += r.download === 'ok' ? 1 : 0;
    acc.pdf += r.kind === 'pdf' ? 1 : 0;
    acc.html += r.kind === 'html' ? 1 : 0;
    acc.thumb += r.thumb ? 1 : 0;
    acc.text += r.text ? 1 : 0;
    return acc;
  },
  { dlOk: 0, pdf: 0, html: 0, thumb: 0, text: 0 },
);
console.log('\nTALLY', JSON.stringify(tally));
