/**
 * Refresh the committed policy corpus with:
 *   node scripts/fetch-policy-products.mjs
 *
 * Requires Poppler's pdftotext at /opt/homebrew/bin/pdftotext.
 * Downloads are working files under tmp/policy-pdfs/ and are not used by the build.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parse } from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sheetPath = path.join(
  root,
  '/Users/asaucedo/Programming/agentic/kaos-ai-docs/ethical-institute-rebrand/research/content-proposals/17-sheet-standards-policy.md',
);
const pagePath = path.join(root, 'src/pages/policy.mdx');
const downloadDirectory = path.join(root, 'tmp/policy-pdfs');
const outputDirectory = path.join(root, 'src/content/policy-products');
const pdfToText = '/opt/homebrew/bin/pdftotext';
const userAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

const alternates = new Map([
  [
    'https://www.acm.org/binaries/content/assets/public-policy/acm-europe-tpc-cyber-reslience-comments-pdf',
    'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-cyber-resilience.pdf',
  ],
  [
    'https://www.acm.org/binaries/content/assets/public-policy/ustpc-approved-generative-ai-principles',
    'https://www.acm.org/binaries/content/assets/public-policy/principles-generative-ai.pdf',
  ],
]);

const additionalMetadata = new Map([
  [
    'https://www.acm.org/binaries/content/assets/public-policy/acm-europe-tpc-dsa-comments.pdf',
    { title: 'Digital Services Act data-access comments', track: 'eu-digital-acts' },
  ],
  [
    'https://www.acm.org/binaries/content/assets/public-policy/contribution55012b10-52ec-43b1-9b8a-cda4848401cf.pdf',
    { title: 'Targeted consultation on Internet Governance', track: 'global' },
  ],
]);

function frontmatterFrom(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error('Could not find policy.mdx frontmatter.');
  return parse(match[1]);
}

function canonicalUrls(source) {
  const appendixIndex = source.indexOf('## Appendix — canonical raw URL list');
  if (appendixIndex < 0) throw new Error('Could not find the canonical raw URL appendix.');
  const appendix = source.slice(appendixIndex);
  return [...appendix.matchAll(/^https:\/\/\S+$/gm)].map(([url]) => url);
}

function filenameFor(url) {
  return new URL(url).pathname
    .split('/')
    .at(-1)
    .replaceAll(/[^a-zA-Z0-9._-]/g, '-');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replaceAll('&', 'and')
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-|-$/g, '');
}

function cleanText(source) {
  const pageNoise =
    /^(?:\d{1,3}|ACM Technology Policy Office|1701 Pennsylvania Ave NW, Suite 200|Washington, DC 20006|\+1 202\.580\.6555|acmpo@acm\.org|www\.acm\.org\/public-policy)$/i;
  return source
    .normalize('NFC')
    .replaceAll('\u0000', '')
    .replaceAll('\f', '\n\n')
    .replaceAll(/([a-z])-[ \t]*\n([a-z])/g, '$1$2')
    .split('\n')
    .map((line) => line.replaceAll(/[ \t]+$/g, ''))
    .filter((line) => !pageNoise.test(line.trim()))
    .join('\n')
    .replaceAll(/\n{3,}/g, '\n\n')
    .trim();
}

function inferredTitle(text, fallback) {
  const line = text
    .split('\n')
    .map((candidate) => candidate.trim())
    .find(
      (candidate) =>
        candidate.length >= 12 &&
        candidate.length <= 140 &&
        !/^(association for computing machinery|acm|page \d+|table of contents)$/i.test(candidate),
    );
  return line || fallback;
}

function inferredTrack(text) {
  if (/Digital Services Act|Article 40|Cyber Resilience|Data Act/i.test(text)) {
    return 'eu-digital-acts';
  }
  if (/United Kingdom|UK Government|National Data Strategy/i.test(text)) return 'uk';
  if (/environment|energy|water consumption|climate/i.test(text)) return 'sustainability';
  if (/United Nations|international scientific panel|G7|EU-US/i.test(text)) return 'global';
  return 'eu-ai-act';
}

function yamlLine(key, value) {
  return `${key}: ${JSON.stringify(value)}`;
}

mkdirSync(downloadDirectory, { recursive: true });
mkdirSync(outputDirectory, { recursive: true });

const page = frontmatterFrom(readFileSync(pagePath, 'utf8'));
const productsByHref = new Map(page.products.map((product) => [product.href, product]));
const urls = canonicalUrls(readFileSync(sheetPath, 'utf8'));
const skipped = [];
const written = [];

for (const canonicalUrl of urls) {
  const href = alternates.get(canonicalUrl) || canonicalUrl;
  if (!href.toLowerCase().endsWith('.pdf')) {
    skipped.push(canonicalUrl);
    continue;
  }

  const filename = filenameFor(href);
  const pdfPath = path.join(downloadDirectory, filename);
  const textPath = `${pdfPath}.txt`;
  const response = await fetch(href, { headers: { 'User-Agent': userAgent } });
  if (!response.ok) throw new Error(`Could not download ${href}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.subarray(0, 4).toString() !== '%PDF') {
    throw new Error(
      `Expected a PDF from ${href}, received ${response.headers.get('content-type')}.`,
    );
  }
  writeFileSync(pdfPath, bytes);

  const conversion = spawnSync(pdfToText, [pdfPath, textPath], {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024,
  });
  if (conversion.status !== 0) {
    throw new Error(`pdftotext failed for ${href}: ${conversion.stderr.trim()}`);
  }

  const text = cleanText(readFileSync(textPath, 'utf8'));
  const pageMetadata = productsByHref.get(href);
  const extraMetadata = additionalMetadata.get(href);
  const fallbackTitle = filename.replace(/\.pdf$/i, '').replaceAll(/[-_]+/g, ' ');
  const title = pageMetadata?.title || extraMetadata?.title || inferredTitle(text, fallbackTitle);
  const track = pageMetadata?.track || extraMetadata?.track || inferredTrack(text);
  const frontmatter = [yamlLine('title', title)];
  if (pageMetadata?.date) frontmatter.push(yamlLine('date', pageMetadata.date));
  frontmatter.push(yamlLine('track', track), yamlLine('href', href));

  const slug = slugify(title);
  const outputPath = path.join(outputDirectory, `${slug}.md`);
  writeFileSync(outputPath, `---\n${frontmatter.join('\n')}\n---\n\n${text}\n`);
  written.push({ href, outputPath });
  console.log(`Wrote ${path.relative(root, outputPath)}`);
}

const formatting = spawnSync('npx', ['prettier', '--write', outputDirectory], {
  cwd: root,
  encoding: 'utf8',
});
if (formatting.status !== 0) {
  throw new Error(`Prettier failed for the generated corpus: ${formatting.stderr.trim()}`);
}

console.log(`\nConverted ${written.length} PDF documents.`);
console.log(`Skipped ${skipped.length} HTML-only URLs:`);
skipped.forEach((url) => console.log(`- ${url}`));
