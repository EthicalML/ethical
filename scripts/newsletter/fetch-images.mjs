#!/usr/bin/env node

/**
 * Pictures for the week's five articles, so each one can be posted as an image post.
 *
 *   node scripts/newsletter/fetch-images.mjs [--issue N] [--only <slug>]
 *   node scripts/newsletter/fetch-images.mjs --apply [--issue N]
 *
 * The first pass collects every candidate it can find for each article and writes a review
 * document. It picks nothing: the image is the post, so the choice is the owner's, and the
 * document exists to be annotated. The second pass reads those annotations and lays out one
 * ready-to-post folder per article.
 *
 * Nothing here is ever committed. Everything lands under tmp/, which is gitignored, because
 * these images are somebody else's artwork borrowed for the length of one post and have no
 * business in the repository or on the site.
 */

import { execFileSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  domImageCandidates,
  fetchWithTimeout,
  inspectImage,
  loadSharp,
  logoPattern,
  metaImageCandidates,
} from '../lib/harvest-image.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const issueDir = path.join(root, 'src/content/newsletter');

// An issue's article sections are the only h2s that wrap their whole title in one link; the
// weekly list, events, open-source and about headings all carry text outside the link. That
// corpus convention is what tells an article apart from a structural section, and it is the
// same test src/utils/IssueClipboard.ts applies.
const ARTICLE_HEADING = /^## \[([^\]]+)\]\(([^)]+)\)[ \t]*$/;

// Loose gates. This pass is a menu, not a verdict: anything big enough to look at earns a row
// in the document, and the owner decides whether it is any good. Only tracking pixels,
// spacers and things that are not images at all are dropped.
const minLongEdge = 200;
const maxBytes = 8 * 1024 * 1024;
const maxDomCandidates = 4;

// A social image post. Wider than tall, and 1200x630 is what every network crops toward.
const shotWidth = 1200;
const shotHeight = 630;

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    if (!argv[index].startsWith('--')) continue;
    const next = argv[index + 1];
    if (next === undefined || next.startsWith('--')) {
      options[argv[index].slice(2)] = true;
    } else {
      options[argv[index].slice(2)] = next;
      index += 1;
    }
  }
  return options;
}

function latestIssue() {
  return readdirSync(issueDir)
    .filter((name) => /^\d+\.md$/.test(name))
    .map((name) => Number.parseInt(name, 10))
    .sort((left, right) => left - right)
    .at(-1);
}

/**
 * The five articles, in issue order: heading, URL, and the prose under it. The prose is what
 * the post says, so it is carried through verbatim rather than re-summarised.
 */
function readArticles(source) {
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, '');
  const lines = body.split('\n');
  const articles = [];
  lines.forEach((line, index) => {
    const heading = ARTICLE_HEADING.exec(line);
    if (!heading) return;
    const prose = [];
    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      if (lines[cursor].startsWith('## ')) break;
      if (lines[cursor].trim()) prose.push(lines[cursor].trim());
    }
    // Neither LinkedIn nor X renders markdown, so an inline link would post as its own
    // source. Issue prose rarely carries one, since the heading already holds the link.
    const plain = prose.join('\n\n').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
    articles.push({
      title: heading[1],
      url: heading[2],
      prose: plain,
      short: firstSentence(plain),
    });
  });
  return articles;
}

// X allows 280 characters and Bluesky 300, so the whole section never fits either. The
// opening sentence is what the author shortens to by hand, and it is written as a hook
// anyway, so it is the right pre-fill. X bills any link at 23 characters whatever its length
// while Bluesky counts the real thing, so the budget below leaves room for the longer of the
// two rather than the average.
const shortProseBudget = 250;

function firstSentence(prose) {
  const match = prose.match(/^[\s\S]*?[.!?](?=\s|$)/);
  const sentence = (match ? match[0] : prose).trim();
  return sentence.length <= shortProseBudget
    ? sentence
    : `${sentence.slice(0, shortProseBudget - 1).trimEnd()}...`;
}

// The last segment that names anything. A trailing locale ("/harness/en") or an index file
// names the site's plumbing rather than the piece, so it is skipped.
function slugFor(url) {
  const parsed = new URL(url);
  const segments = parsed.pathname
    .split('/')
    .filter(Boolean)
    .filter((segment) => !/^(?:[a-z]{2}|[a-z]{2}-[a-z]{2})$/i.test(segment))
    .filter((segment) => !/^index(?:\.\w+)?$/i.test(segment));
  const last = segments.at(-1) ?? parsed.hostname;
  // Only a real file extension is dropped. An arXiv id is "2608.10257", whose tail looks
  // exactly like one, and truncating it to "2608" names a year rather than a paper.
  return last
    .replace(/\.(?:html?|php|aspx?|jsp|pdf|md|txt)$/i, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase();
}

// --- PDF pages -------------------------------------------------------------
//
// A paper's own page rarely nominates a social image and its DOM is mostly text, so the sheet
// itself is the only picture on offer. Page 1 usually carries the title block and, on a good
// day, the teaser figure.

function arxivPdfUrl(url) {
  const match = url.match(/arxiv\.org\/(?:abs|pdf)\/([\w.\-/]+?)(?:v\d+)?(?:\.pdf)?$/i);
  return match ? `https://arxiv.org/pdf/${match[1]}` : url.match(/\.pdf($|\?)/i) ? url : null;
}

// pdftoppm first, then macOS sips. Returns a PNG buffer, or null with the reason recorded by
// the caller: a missing PDF renderer costs one candidate, never the run.
function renderPdfPage(pdfBuffer, workDir) {
  const pdfPath = path.join(workDir, 'source.pdf');
  writeFileSync(pdfPath, pdfBuffer);
  const prefix = path.join(workDir, 'page');
  try {
    execFileSync('pdftoppm', ['-png', '-f', '1', '-l', '1', '-r', '110', pdfPath, prefix], {
      stdio: 'ignore',
    });
    const rendered = readdirSync(workDir).find((name) => /^page-?0*1\.png$/.test(name));
    if (rendered) return readFileSync(path.join(workDir, rendered));
  } catch {
    // Fall through to sips.
  }
  try {
    const out = path.join(workDir, 'page-sips.png');
    execFileSync('sips', ['-s', 'format', 'png', pdfPath, '--out', out], { stdio: 'ignore' });
    if (existsSync(out)) return readFileSync(out);
  } catch {
    // Neither renderer is present.
  }
  return null;
}

// --- collecting ------------------------------------------------------------

async function download(url) {
  const response = await fetchWithTimeout(url, 'image/*');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  // A bot challenge answers 200-class with an HTML body, which would otherwise arrive as
  // "not a decodable image" and read like a broken file rather than a blocked request.
  const type = response.headers.get('content-type') ?? '';
  if (/^text\//i.test(type)) {
    throw new Error(`HTTP ${response.status} served ${type.split(';')[0]}, likely a bot challenge`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength > maxBytes) {
    throw new Error(`${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB over the cap`);
  }
  return buffer;
}

/**
 * Measure, then keep. Resolves to the written candidate or null, with the rejection pushed
 * onto `rejected` so the document can say what it saw rather than showing a short list and
 * implying that was everything.
 */
async function keep({ buffer, kind, source, alt }, { dir, slug, index, rejected }) {
  const scratch = path.join(dir, `.${slug}-${index}.bin`);
  let meta;
  try {
    meta = await inspectImage(buffer, scratch);
  } catch {
    rejected.push(`${kind}: not a decodable image (${source})`);
    return null;
  } finally {
    rmSync(scratch, { force: true });
  }
  if (!meta.width || !meta.height) {
    rejected.push(`${kind}: not a decodable image (${source})`);
    return null;
  }
  if (Math.max(meta.width, meta.height) < minLongEdge) {
    rejected.push(`${kind}: ${meta.width}x${meta.height}, under the ${minLongEdge}px floor`);
    return null;
  }
  const extension = meta.format === 'jpeg' ? 'jpg' : (meta.format ?? 'img');
  const file = `${slug}-${index}-${kind.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.${extension}`;
  writeFileSync(path.join(dir, file), buffer);
  return {
    file,
    kind,
    source,
    alt: alt ?? '',
    width: meta.width,
    height: meta.height,
    bytes: buffer.byteLength,
  };
}

async function collect(article, { dir }) {
  const slug = slugFor(article.url);
  const rejected = [];
  const found = [];
  let index = 0;
  const take = async (item) => {
    index += 1;
    const kept = await keep(item, { dir, slug, index, rejected });
    if (kept) found.push(kept);
  };

  // 1. What the site nominates for a social card.
  let html;
  try {
    const response = await fetchWithTimeout(article.url, 'text/html,application/xhtml+xml');
    if (response.ok) html = await response.text();
    else rejected.push(`page HTTP ${response.status}`);
  } catch (error) {
    rejected.push(`page fetch failed (${error.message})`);
  }
  if (html) {
    for (const candidate of metaImageCandidates(html, article.url)) {
      if (candidate.kind === 'icon') continue; // A favicon is never a post image.
      try {
        await take({
          buffer: await download(candidate.url),
          kind: candidate.kind,
          source: candidate.url,
        });
      } catch (error) {
        rejected.push(`${candidate.kind}: ${error.message} (${candidate.url})`);
      }
    }
  }

  // 2. A page of the PDF, where the article is one.
  const pdfUrl = arxivPdfUrl(article.url);
  if (pdfUrl) {
    try {
      const response = await fetchWithTimeout(pdfUrl, 'application/pdf');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const rendered = renderPdfPage(Buffer.from(await response.arrayBuffer()), dir);
      if (rendered) await take({ buffer: rendered, kind: 'pdf page 1', source: pdfUrl });
      else rejected.push('pdf page 1: no pdftoppm or sips on this machine');
    } catch (error) {
      rejected.push(`pdf page 1: ${error.message}`);
    } finally {
      rmSync(path.join(dir, 'source.pdf'), { force: true });
      for (const name of readdirSync(dir).filter((entry) =>
        /^page-?\d*(-sips)?\.png$/.test(entry),
      )) {
        rmSync(path.join(dir, name), { force: true });
      }
    }
  }

  // 3. The images actually on the rendered page, and three screenshots off the same load.
  //    The screenshots are the floor: every article ends with a usable picture even when the
  //    source blocks every fetch, and the figure shot is the only thing here that can capture
  //    a diagram drawn as inline SVG or canvas, which nothing downloadable would find.
  const shots = [];
  const dom = await domImageCandidates(article.url, {
    onPage: async (page) => {
      await page.setViewportSize({ width: shotWidth, height: shotHeight });
      await page.waitForTimeout(600);
      shots.push({ kind: 'screenshot hero', buffer: await page.screenshot({ type: 'png' }) });

      // The biggest thing on the page that is a picture of something: a diagram, a chart, a
      // table of results. Cropped to the element, because the interesting part of a technical
      // post is usually one figure rather than the column it sits in.
      await page.setViewportSize({ width: 1400, height: 1000 });
      const figure = await page.evaluate(() => {
        const boxes = [...document.querySelectorAll('img, svg, canvas, figure, table, pre')]
          .map((node, index) => {
            const box = node.getBoundingClientRect();
            return { index, area: box.width * box.height, width: box.width, height: box.height };
          })
          // Wider than a sidebar, shorter than a whole page, and not a hairline rule.
          .filter((item) => item.width >= 320 && item.height >= 180 && item.height <= 1600)
          .sort((left, right) => right.area - left.area);
        if (!boxes.length) return -1;
        return boxes[0].index;
      });
      if (figure >= 0) {
        const handle = (await page.$$('img, svg, canvas, figure, table, pre'))[figure];
        if (handle) {
          shots.push({
            kind: 'screenshot figure',
            buffer: await handle.screenshot({ type: 'png' }),
          });
        }
      }

      // Something from the middle of the article, which tends to be prose plus a code block.
      await page.setViewportSize({ width: shotWidth, height: shotHeight });
      const middle = await page.evaluate(() => {
        const depth = Math.max(0, document.body.scrollHeight - window.innerHeight);
        window.scrollTo(0, Math.round(depth * 0.45));
        return Math.round(depth * 0.45);
      });
      if (middle > 200) {
        await page.waitForTimeout(500);
        shots.push({ kind: 'screenshot middle', buffer: await page.screenshot({ type: 'png' }) });
      }
    },
  });
  if (dom.reason) rejected.push(dom.reason);
  for (const candidate of dom.candidates.slice(0, maxDomCandidates)) {
    try {
      await take({
        buffer: await download(candidate.url),
        kind: 'page image',
        source: candidate.url,
        alt: candidate.alt,
      });
    } catch (error) {
      rejected.push(`page image: ${error.message} (${candidate.url})`);
    }
  }
  for (const shot of shots) {
    await take({ buffer: shot.buffer, kind: shot.kind, source: `${article.url} (${shot.kind})` });
  }

  // Logos, favicons and funder strips sort last rather than out. On a paper's page they are
  // most of what there is to find, and a menu that quietly dropped them would look like the
  // page had nothing on it; a menu that lists them fifth reads as what it is.
  const furniture = (candidate) =>
    logoPattern.test(candidate.source) || logoPattern.test(candidate.alt);
  return {
    ...article,
    slug,
    candidates: [...found.filter((one) => !furniture(one)), ...found.filter(furniture)],
    rejected,
  };
}

// --- the review document ---------------------------------------------------

function kilobytes(bytes) {
  return `${Math.round(bytes / 1024)} kB`;
}

/**
 * One block per article, each opening on the line the owner edits. Candidates are shown at a
 * consistent width so two of them can be compared on sight rather than on their dimensions,
 * and every rejection is listed underneath so a thin menu is visibly a thin menu.
 */
function reviewDocument(issue, results) {
  const out = [
    `# Issue ${issue} posts`,
    '',
    'One post per article: the text, and an image that is the post rather than an attachment to it. Nothing is chosen for you.',
    '',
    'Edit two things per article and leave the rest alone.',
    '',
    '`Choice:` picks the picture:',
    '',
    '- a candidate number, to use that image;',
    '- `gif`, to have a scroll-through of the page recorded instead;',
    '- a path or URL of your own;',
    '- `skip`, to post that one without an image.',
    '',
    '`Text:` is the post itself, pre-filled with the section as published and the link on the last line. Edit inside the fence; what is there at apply time is what gets posted.',
    '',
    'Then run `node scripts/newsletter/fetch-images.mjs --apply` to lay out the posts.',
    '',
  ];
  results.forEach((result, position) => {
    if (result.reuse) {
      out.push(result.reuse, '');
      return;
    }
    out.push(`## ${position + 1}. ${result.title}`, '');
    out.push(`Source: <${result.url}>`, '');
    out.push(`Choice: ${result.keptChoice ?? ''}`, '');
    // Fenced rather than quoted: it round-trips whitespace exactly and nothing inside it is
    // read as markdown, so an edit means what it says.
    const text = result.keptText || `${result.prose}\n\n${result.url}`;
    out.push('Text:', '', '```', text, '```', '');
    const short = result.keptShort || `${result.short}\n\n${result.url}`;
    out.push(`Short: (X and Bluesky, ${short.length} chars)`, '', '```', short, '```', '');
    if (!result.candidates.length) {
      out.push('No candidate survived. Paste a path on the choice line, or write `gif`.', '');
    }
    for (const [candidateIndex, candidate] of result.candidates.entries()) {
      const number = candidateIndex + 1;
      out.push(
        `**${number}.** ${candidate.kind} - ${candidate.width}x${candidate.height}, ${kilobytes(candidate.bytes)}` +
          (candidate.alt ? ` - alt: "${candidate.alt}"` : ''),
        '',
        `<img src="images/${candidate.file}" width="420">`,
        '',
        `<${candidate.source}>`,
        '',
      );
    }
    if (result.rejected.length) {
      out.push('<details><summary>Not shown</summary>', '');
      out.push(...result.rejected.map((reason) => `- ${reason}`));
      out.push('', '</details>', '');
    }
  });
  return out.join('\n');
}

// --- applying the choices --------------------------------------------------

/**
 * Title, annotation, and the files shown under it in the order they were shown.
 *
 * The files are read back out of the document rather than recomputed, because a candidate's
 * displayed number and its filename index are not the same thing: the filename counts every
 * download attempt, including the ones measured and dropped, while the number counts only
 * what survived to be looked at. The owner writes down what he sees, so what he sees has to
 * be what resolves.
 */
function readChoices(document) {
  const blocks = document.split(/^## /m).slice(1);
  return blocks.map((block) => {
    const title = block
      .split('\n')[0]
      .replace(/^\d+\.\s*/, '')
      .trim();
    const choice = block.match(/^Choice:[ \t]*(.*)$/m)?.[1]?.trim() ?? '';
    const files = [...block.matchAll(/<img src="images\/([^"]+)"/g)].map((match) => match[1]);
    const text = block.match(/^Text:\s*\n```\n([\s\S]*?)\n```/m)?.[1] ?? '';
    const short = block.match(/^Short:[^\n]*\n\s*\n```\n([\s\S]*?)\n```/m)?.[1] ?? '';
    // The block exactly as it stands, so an article that was not re-collected this run can be
    // put back untouched rather than rebuilt from data the document no longer carries.
    return { title, choice, files, text, short, raw: `## ${block.trimEnd()}` };
  });
}

/**
 * A post is a folder holding the text and the picture. The text is the section prose exactly
 * as it was published, with the link on its own last line, because that is the shape the
 * owner asked for and paraphrasing it here would mean editing the issue twice.
 */
async function applyChoices(articles, { imagesDir, postsDir }) {
  const document = readFileSync(path.join(path.dirname(imagesDir), 'posts.md'), 'utf8');
  const choices = readChoices(document);
  const pending = [];
  mkdirSync(postsDir, { recursive: true });

  for (const [position, article] of articles.entries()) {
    const slug = slugFor(article.url);
    const entry = choices.find((candidate) => candidate.title === article.title);
    const choice = entry?.choice ?? '';
    const dir = path.join(postsDir, `${position + 1}-${slug}`);
    mkdirSync(dir, { recursive: true });
    // The document wins over the issue. It was pre-filled from the issue and may since have
    // been edited, and re-deriving here would throw those edits away on every re-run.
    const text = entry?.text?.trim() || `${article.prose}\n\n${article.url}`;
    writeFileSync(path.join(dir, 'post.txt'), `${text}\n`);
    // The short cut is a separate file rather than a section of the same one, because the
    // two go to different channels and each is uploaded whole.
    const short = entry?.short?.trim() || `${article.short}\n\n${article.url}`;
    writeFileSync(path.join(dir, 'post-short.txt'), `${short}\n`);
    if (short.length > 280) {
      pending.push(`${slug}: short text is ${short.length} chars, over X's 280`);
    }

    if (!choice || choice.toLowerCase() === 'skip') {
      pending.push(`${slug}: no image (choice "${choice || 'blank'}")`);
      continue;
    }
    if (choice.toLowerCase() === 'gif') {
      pending.push(`${slug}: wants a site-capture walk of ${article.url}`);
      continue;
    }
    let sourcePath = null;
    if (/^\d+$/.test(choice)) {
      const file = entry?.files[Number.parseInt(choice, 10) - 1];
      if (file && existsSync(path.join(imagesDir, file))) sourcePath = path.join(imagesDir, file);
    } else if (!/^https?:/i.test(choice)) {
      const candidate = path.isAbsolute(choice) ? choice : path.join(root, choice);
      if (existsSync(candidate)) sourcePath = candidate;
    }
    if (!sourcePath && /^https?:/i.test(choice)) {
      try {
        const buffer = await download(choice);
        sourcePath = path.join(
          imagesDir,
          `${slug}-chosen${path.extname(new URL(choice).pathname) || '.img'}`,
        );
        writeFileSync(sourcePath, buffer);
      } catch (error) {
        pending.push(`${slug}: could not fetch ${choice} (${error.message})`);
        continue;
      }
    }
    if (!sourcePath) {
      pending.push(`${slug}: choice "${choice}" matched no candidate, file or URL`);
      continue;
    }

    // Normalised only in size. Recompressing somebody's clean 1200px card to hit a round
    // number costs quality for nothing, so an image already within bounds is copied as it is.
    const sharp = await loadSharp();
    const target = path.join(dir, `image${path.extname(sourcePath)}`);
    const meta = sharp ? await sharp(sourcePath).metadata() : null;
    if (sharp && meta?.width > 1600) {
      await sharp(sourcePath).resize({ width: 1600 }).toFile(target);
    } else {
      copyFileSync(sourcePath, target);
    }
  }

  return pending;
}

// --- main ------------------------------------------------------------------

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const issue = Number.parseInt(options.issue ?? String(latestIssue()), 10);
  const issuePath = path.join(issueDir, `${issue}.md`);
  if (!existsSync(issuePath)) throw new Error(`${issuePath} does not exist`);

  const articles = readArticles(readFileSync(issuePath, 'utf8'));
  if (!articles.length) throw new Error(`issue ${issue} has no article sections yet`);

  const workDir = path.join(root, 'tmp', `issue-${issue}`);
  const imagesDir = path.join(workDir, 'images');
  mkdirSync(imagesDir, { recursive: true });

  if (options.apply) {
    const pending = await applyChoices(articles, {
      imagesDir,
      postsDir: path.join(workDir, 'posts'),
    });
    console.log(`wrote ${articles.length} posts to tmp/issue-${issue}/posts/`);
    if (pending.length)
      console.log(`\nstill open:\n${pending.map((line) => `  ${line}`).join('\n')}`);
    return;
  }

  const only = typeof options.only === 'string' ? options.only : null;
  const wanted = articles.filter((article) => !only || slugFor(article.url) === only);

  // Concurrent, because almost all of the time here is a browser waiting on somebody else's
  // network. Capped rather than unbounded: each article launches its own Chromium, and five
  // at once on a laptop already competing with a dev server is where it stops being free.
  const results = new Array(wanted.length);
  let next = 0;
  const worker = async () => {
    while (next < wanted.length) {
      const index = next;
      next += 1;
      const article = wanted[index];
      const result = await collect(article, { dir: imagesDir });
      results[index] = result;
      console.log(
        `${result.slug}: ${result.candidates.length} candidate(s)` +
          (result.rejected.length ? `, ${result.rejected.length} not shown` : ''),
      );
    }
  };
  await Promise.all(Array.from({ length: Math.min(3, wanted.length) }, worker));

  // Re-running the collection must not cost the owner his annotations. Anything already
  // written against an article that is still in the issue is carried into the new document;
  // only the candidate menu is rebuilt.
  const documentPath = path.join(workDir, 'posts.md');
  const previous = existsSync(documentPath) ? readChoices(readFileSync(documentPath, 'utf8')) : [];
  // Every article in the issue appears in the document, whether or not it was re-collected:
  // --only narrows the fetching, never the document, or a targeted re-run would silently
  // delete four articles' worth of annotations.
  const carried = articles.map((article) => {
    const before = previous.find((entry) => entry.title === article.title);
    const fresh = results.find((result) => result && result.title === article.title);
    if (!fresh) {
      return before?.raw
        ? { reuse: before.raw }
        : { ...article, slug: slugFor(article.url), candidates: [], rejected: ['not collected'] };
    }
    if (!before) return fresh;
    return {
      ...fresh,
      keptChoice: before.choice,
      keptText: before.text?.trim(),
      keptShort: before.short?.trim(),
    };
  });
  const kept = carried.filter((result) => result.keptChoice).length;
  writeFileSync(documentPath, reviewDocument(issue, carried));
  console.log(
    `\nreview: tmp/issue-${issue}/posts.md` + (kept ? ` (${kept} choice(s) carried over)` : ''),
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
