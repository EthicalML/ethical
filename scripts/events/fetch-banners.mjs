#!/usr/bin/env node

// Conference banners for src/content/events.yaml.
//
// Same policy as the policy-record previews: the link stays canonical (`url`
// still points at the organiser), and what we commit is a derivative — one
// social image URL per event, linked rather than stored.
// The generated SVG banner stays the fallback for every event without one,
// which is most of the archive: conference sites rot, block bots, or serve a
// single house logo for the whole domain.
//
// Run: node scripts/events/fetch-banners.mjs [--only <slug>] [--force] [--dry-run] [--deep]

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const yamlPath = path.join(root, 'src/content/events.yaml');

// A plain fetch identifies itself as node and a fair number of conference CDNs
// answer 403 to that. Claiming a desktop browser is what gets the HTML.
const browserUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) ' +
  'Chrome/124.0.0.0 Safari/537.36';

const requestTimeoutMs = 20000;

// Acceptance gates. A social banner is wide and reasonably large; anything
// outside these bounds is a favicon, a tracking pixel, a square logo or a
// decorative strip, none of which read as event artwork.
const minLongEdge = 600;
const minRatio = 1.2;
const maxRatio = 3;
const maxBytes = 3 * 1024 * 1024;

// Rendered-DOM pass. `networkidle` is what gets a lazy-loaded hero to exist at
// all; the retry exists because at least one organiser (worldsummit.ai) never
// goes idle and would otherwise be reported as having no image.
const browserTimeoutMs = 60000;
const browserRetrySettleMs = 4000;
// Below this a background image is a button, a bullet or a divider, not art.
const minBackgroundWidth = 600;
const minBackgroundHeight = 300;
// House furniture. Not a rejection — a demotion: a site whose only large image
// is its logo still gets it, but anything else on the page is tried first.
const logoPattern = /logo|icon|favicon|sprite|avatar|badge/i;


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

// --- the YAML file ---------------------------------------------------------
//
// Read as lines, not as a parsed document: the file carries `# unverified`
// markers and prose comments that any YAML round-trip would drop. Top-level
// event fields are indented two spaces; talk and cfp fields are indented six,
// so the indent alone distinguishes an event `url:` from a talk `url:`.

function readEvents(lines) {
  const events = [];
  let current = null;
  lines.forEach((line, index) => {
    const slug = line.match(/^- slug:\s*(\S+)/);
    if (slug) {
      current = { slug: slug[1], start: index, urlLine: -1, imageLine: -1, url: '', image: '' };
      events.push(current);
      return;
    }
    if (!current) return;
    const field = line.match(/^ {2}(\w+):\s*(.*)$/);
    if (!field) return;
    if (field[1] === 'url') {
      current.urlLine = index;
      current.url = field[2].trim();
    }
    if (field[1] === 'image') {
      current.imageLine = index;
      current.image = field[2].trim();
    }
  });
  return events;
}

// The `image:` line goes directly after `url:`, so the canonical link and the
// committed derivative of it sit together. Written back highest line first, so
// earlier insertions do not shift the indices of later ones.
function writeImages(lines, updates) {
  const next = [...lines];
  for (const update of [...updates].sort((left, right) => right.at - left.at)) {
    const line = `  image: ${update.value}`;
    if (update.replace) next[update.at] = line;
    else next.splice(update.at + 1, 0, line);
  }
  return next;
}

// --- fetching --------------------------------------------------------------

async function fetchWithTimeout(url, accept) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), requestTimeoutMs);
  try {
    return await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': browserUserAgent,
        Accept: accept,
        'Accept-Language': 'en-GB,en;q=0.9',
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

function decodeEntities(value) {
  return value
    .replace(/&#x2f;/gi, '/')
    .replace(/&#0?47;/g, '/')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();
}

// Attributes are read individually rather than positionally: `content` comes
// before `property` on plenty of real pages, and a single ordered regex misses
// exactly those.
function metaTags(html) {
  const tags = [];
  for (const match of html.matchAll(/<meta\b([^>]*)>/gi)) {
    const attrs = match[1];
    const key = attrs.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
    const content = attrs.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1];
    if (key && content) tags.push({ key, content: decodeEntities(content) });
  }
  return tags;
}

function iconLinks(html) {
  const icons = [];
  for (const match of html.matchAll(/<link\b([^>]*)>/gi)) {
    const attrs = match[1];
    const rel = attrs.match(/\brel\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase() ?? '';
    const href = attrs.match(/\bhref\s*=\s*["']([^"']*)["']/i)?.[1];
    if (!href) continue;
    if (/apple-touch-icon/.test(rel)) icons.push({ rank: 0, href: decodeEntities(href) });
    else if (/\bicon\b/.test(rel)) icons.push({ rank: 1, href: decodeEntities(href) });
  }
  return icons.sort((left, right) => left.rank - right.rank).map((icon) => icon.href);
}

// Preference order, best first: the image the site itself nominates for a
// social card, then its Twitter equivalent, then an icon as a last resort. The
// icon almost always fails the size gate, which is the point — it is only
// there so a site with no card at all still gets one honest attempt.
function imageCandidates(html, pageUrl) {
  const tags = metaTags(html);
  const ordered = [
    ...tags.filter((tag) => tag.key === 'og:image' || tag.key === 'og:image:secure_url'),
    ...tags.filter((tag) => tag.key === 'twitter:image' || tag.key === 'twitter:image:src'),
  ].map((tag) => tag.content);
  ordered.push(...iconLinks(html));
  const resolved = [];
  for (const raw of ordered) {
    if (!raw || raw.startsWith('data:')) continue;
    try {
      const absolute = new URL(raw, pageUrl).toString();
      if (!resolved.includes(absolute)) resolved.push(absolute);
    } catch {
      // A candidate that is not a URL at all is simply not a candidate.
    }
  }
  return resolved.map((url) => ({ url, alt: '' }));
}

// --- the rendered DOM ------------------------------------------------------
//
// Meta tags are what a site chooses to advertise; plenty of conference sites
// choose nothing at all and still carry a perfectly good hero image. When the
// meta pass finds nothing usable, the page is rendered and the images actually
// on it are considered.

// Playwright is not a dependency of this repo, so it has to be found. Same
// resolution order as scripts/newsletter/candidates.mjs: an explicit override,
// then a normal install, then the content-hashed npx cache (searched, never
// hardcoded, because the hash changes whenever npx re-resolves).
function resolvePlaywright() {
  if (process.env.NEWSLETTER_PLAYWRIGHT) return [process.env.NEWSLETTER_PLAYWRIGHT];
  const npxCache = path.join(process.env.HOME ?? '', '.npm/_npx');
  const cached = existsSync(npxCache)
    ? readdirSync(npxCache)
        .map((hash) => path.join(npxCache, hash, 'node_modules/playwright/index.js'))
        .filter((candidate) => existsSync(candidate))
    : [];
  return ['playwright', ...cached];
}

// Imported lazily and cached, so a run whose every event passes the meta gates
// never loads a browser at all. `null` means tried and unavailable.
let chromiumModule;
async function loadChromium() {
  if (chromiumModule !== undefined) return chromiumModule;
  const specifiers = resolvePlaywright();
  for (const specifier of specifiers) {
    try {
      const playwright = await import(specifier);
      const { chromium } = playwright.default ?? playwright;
      if (chromium) {
        chromiumModule = chromium;
        return chromiumModule;
      }
    } catch {
      // Try the next specifier; only an exhausted list is a real failure.
    }
  }
  chromiumModule = null;
  return chromiumModule;
}

// Runs inside the page. Two populations: `img` elements, measured by what the
// browser actually decoded (naturalWidth/Height, so a lazy placeholder that
// never loaded scores zero and sorts to the bottom), and CSS backgrounds on
// elements big enough to be a hero rather than a bullet.
function collectDomImages({ minWidth, minHeight }) {
  const found = [];
  for (const node of document.querySelectorAll('img')) {
    const url = node.currentSrc || node.src;
    if (!url || url.startsWith('data:')) continue;
    found.push({
      url,
      alt: node.getAttribute('alt') ?? '',
      area: (node.naturalWidth || 0) * (node.naturalHeight || 0),
    });
  }
  for (const node of document.querySelectorAll('*')) {
    const box = node.getBoundingClientRect();
    if (box.width < minWidth || box.height < minHeight) continue;
    const layer = getComputedStyle(node).backgroundImage;
    if (!layer || layer === 'none') continue;
    for (const match of layer.matchAll(/url\((['"]?)(.*?)\1\)/g)) {
      const url = match[2];
      if (!url || url.startsWith('data:')) continue;
      found.push({ url, alt: '', area: box.width * box.height });
    }
  }
  return found;
}

// Never throws: a page that will not render is one rejected event, not a dead
// run. Returns { candidates, reason } — `reason` explains an empty list.
async function domCandidates(pageUrl) {
  const chromium = await loadChromium();
  if (!chromium) {
    return { candidates: [], reason: 'Playwright unavailable, DOM pass skipped' };
  }
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ userAgent: browserUserAgent });
    try {
      await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: browserTimeoutMs });
    } catch {
      // Some sites poll forever and never go idle. The DOM is usually all there
      // regardless, so settle briefly and take what rendered.
      await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: browserTimeoutMs });
      await page.waitForTimeout(browserRetrySettleMs);
    }
    const raw = await page.evaluate(collectDomImages, {
      minWidth: minBackgroundWidth,
      minHeight: minBackgroundHeight,
    });
    const seen = new Set();
    const candidates = [];
    for (const item of raw) {
      let absolute;
      try {
        absolute = new URL(item.url, pageUrl).toString();
      } catch {
        continue;
      }
      if (seen.has(absolute)) continue;
      seen.add(absolute);
      candidates.push({ url: absolute, alt: item.alt, area: item.area });
    }
    return { candidates: rankDomCandidates(candidates), reason: '' };
  } catch (error) {
    return { candidates: [], reason: `page render failed (${error.message})` };
  } finally {
    await browser?.close();
  }
}

function looksLikeFurniture(candidate) {
  return logoPattern.test(candidate.url) || logoPattern.test(candidate.alt);
}

// Biggest first, but everything that reads as house furniture sorts behind
// everything that does not, however large it is. A site whose logo is its
// largest asset still gets the logo if nothing else passes the gates.
function rankDomCandidates(candidates) {
  const byArea = [...candidates].sort((left, right) => right.area - left.area);
  return [
    ...byArea.filter((candidate) => !looksLikeFurniture(candidate)),
    ...byArea.filter((candidate) => looksLikeFurniture(candidate)),
  ];
}

// --- image inspection and encoding -----------------------------------------

// sharp is not a declared dependency of this repo — it arrives transitively and
// the policy-record scripts already rely on that. Imported lazily so a run on a
// tree without it degrades to ImageMagick, and then to "keep the original",
// rather than failing at load.
let sharpModule;
let sharpTried = false;
async function loadSharp() {
  if (sharpTried) return sharpModule;
  sharpTried = true;
  try {
    sharpModule = (await import('sharp')).default;
  } catch {
    sharpModule = null;
  }
  return sharpModule;
}


// Dimensions and format from the bytes themselves, never from the URL or the
// Content-Type header: both lie, and a "banner.jpg" that is really a 16x16 ICO
// has to be rejected on what it is.
async function inspect(buffer, tmpPath) {
  const sharp = await loadSharp();
  if (sharp) {
    const meta = await sharp(buffer).metadata();
    return { width: meta.width, height: meta.height, format: meta.format };
  }
  writeFileSync(tmpPath, buffer);
  const out = execFileSync('identify', ['-format', '%w %h %m', `${tmpPath}[0]`], {
    encoding: 'utf8',
  });
  const [width, height, format] = out.trim().split(/\s+/);
  return { width: Number(width), height: Number(height), format: format.toLowerCase() };
}

// Returns the written path plus how it was produced, so the summary can say

// --- per-event work --------------------------------------------------------

// One candidate against the gates. Resolves to { ok, note?, reason? }. The
// bytes are fetched only to measure the image and are discarded immediately:
// what gets committed is the URL.
async function gate(candidate, tmpPath) {
  let buffer;
  try {
    const response = await fetchWithTimeout(candidate.url, 'image/*');
    if (!response.ok) return { ok: false, reason: `image HTTP ${response.status}` };
    buffer = Buffer.from(await response.arrayBuffer());
  } catch (error) {
    return { ok: false, reason: `image fetch failed (${error.message})` };
  }
  if (buffer.byteLength > maxBytes) {
    return {
      ok: false,
      reason: `${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB over the 3 MB cap`,
    };
  }
  let meta;
  try {
    meta = await inspect(buffer, tmpPath);
  } catch {
    return { ok: false, reason: 'not a decodable image' };
  }
  if (!meta.width || !meta.height) return { ok: false, reason: 'not a decodable image' };
  const long = Math.max(meta.width, meta.height);
  const ratio = long / Math.min(meta.width, meta.height);
  if (long < minLongEdge) {
    return { ok: false, reason: `${meta.width}x${meta.height} under the ${minLongEdge}px long edge` };
  }
  if (ratio < minRatio || ratio > maxRatio) {
    return { ok: false, reason: `aspect ${ratio.toFixed(2)}:1 outside ${minRatio}-${maxRatio}:1` };
  }
  return { ok: true, note: `${meta.width}x${meta.height} ${meta.format}` };
}

// First candidate in the given order that passes. Returns the winner plus every
// rejection reason, so a total failure can say what it saw rather than "none".
async function firstPassing(candidates, tmpPath) {
  const reasons = [];
  for (const candidate of candidates) {
    const verdict = await gate(candidate, tmpPath);
    if (verdict.ok) return { winner: candidate, note: verdict.note, reasons };
    reasons.push(verdict.reason);
  }
  return { winner: null, reasons };
}

// Did the furniture demotion actually decide anything? Only the demoted
// candidates that outrank the winner on area can have been affected, so only
// those are re-tested — and only when one of them would itself have passed is
// the rule reported as having changed the pick.
async function demotionChangedPick(candidates, winner, tmpPath) {
  const displaced = candidates.filter(
    (candidate) => looksLikeFurniture(candidate) && candidate.area > winner.area,
  );
  for (const candidate of displaced) {
    const verdict = await gate(candidate, tmpPath);
    if (verdict.ok) return `${candidate.url} (${verdict.note})`;
  }
  return '';
}

// Resolves to { status, reason?, value?, bytes? }. Never throws: one dead
// conference site must not take the other twenty-six with it.
async function fetchBanner(event, { dryRun, deep, tmpDir }) {
  const tmpPath = path.join(tmpDir, `${event.slug}.bin`);
  const accepted = (candidate, note, extra) => ({
    status: 'accepted',
    value: candidate.url,
    mode: dryRun ? 'dry-run' : 'linked',
    note,
    source: candidate.url,
    ...extra,
  });

  const reasons = [];
  let metaFallback = null;
  let html;
  try {
    const response = await fetchWithTimeout(event.url, 'text/html,application/xhtml+xml');
    if (!response.ok) reasons.push(`page HTTP ${response.status}`);
    else html = await response.text();
  } catch (error) {
    reasons.push(`page fetch failed (${error.message})`);
  }

  if (html) {
    const candidates = imageCandidates(html, event.url);
    if (!candidates.length) reasons.push('no og:image, twitter:image or icon');
    const meta = candidates.length
      ? await firstPassing(candidates, tmpPath)
      : { winner: null, reasons: [] };
    reasons.push(...meta.reasons);
    // Meta-first by default: the site's own nomination wins when it passes.
    // `--deep` overrides that deliberately, for a technically-valid og:image
    // that is nonetheless the wrong picture.
    if (meta.winner && !deep) return accepted(meta.winner, meta.note, { pass: 'meta' });
    // Under --deep the meta winner is still held: if the DOM pass finds nothing
    // better, keeping the site's own card beats reporting no image at all.
    if (meta.winner) {
      metaFallback = { candidate: meta.winner, note: meta.note };
      reasons.push(`meta candidate ${meta.winner.url} reconsidered under --deep`);
    }
  }

  // Fallback: what is actually on the rendered page.
  const dom = await domCandidates(event.url);
  if (dom.reason) reasons.push(dom.reason);
  const picked = dom.candidates.length
    ? await firstPassing(dom.candidates, tmpPath)
    : { winner: null, reasons: [] };
  reasons.push(...picked.reasons);
  if (!picked.winner) {
    if (metaFallback) {
      return accepted(metaFallback.candidate, metaFallback.note, { pass: 'meta (deep found none)' });
    }
    return { status: 'rejected', reason: reasons.join('; ') || 'no usable candidate' };
  }
  const displaced = await demotionChangedPick(dom.candidates, picked.winner, tmpPath);
  return accepted(picked.winner, picked.note, {
    pass: 'dom',
    alt: picked.winner.alt,
    displaced,
  });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const dryRun = Boolean(options['dry-run']);
  const force = Boolean(options.force);
  const deep = Boolean(options.deep);
  const only = typeof options.only === 'string' ? options.only : null;

  const lines = readFileSync(yamlPath, 'utf8').split('\n');
  const events = readEvents(lines);
  if (only && !events.some((event) => event.slug === only)) {
    throw new Error(`no event with slug "${only}"`);
  }

  const tmpDir = path.join(root, 'tmp', 'event-banners');
  mkdirSync(tmpDir, { recursive: true });

  const updates = [];
  const results = [];
  for (const event of events) {
    if (only && event.slug !== only) continue;
    if (!event.url) {
      results.push({ slug: event.slug, status: 'skipped', reason: 'no url' });
      continue;
    }
    if (event.image && !force) {
      results.push({ slug: event.slug, status: 'existing', reason: event.image });
      continue;
    }
    const result = await fetchBanner(event, { dryRun, deep, tmpDir });
    results.push({ slug: event.slug, ...result });
    if (result.status === 'accepted' && !dryRun) {
      updates.push({
        at: event.imageLine >= 0 ? event.imageLine : event.urlLine,
        replace: event.imageLine >= 0,
        value: result.value,
      });
    }
    const detail =
      result.status === 'accepted'
        ? `[${result.pass}] ${result.note} -> ${result.value}` +
          (result.alt ? ` (alt: "${result.alt}")` : '') +
          (result.displaced ? `\n  demoted as furniture, would otherwise have won: ${result.displaced}` : '')
        : result.reason;
    console.log(`${event.slug}: ${result.status} — ${detail}`);
  }

  if (updates.length) writeFileSync(yamlPath, writeImages(lines, updates).join('\n'));

  const counted = (status) => results.filter((result) => result.status === status).length;
  const modes = [...new Set(results.filter((r) => r.mode).map((r) => r.mode))];
  console.log(
    `\nattempted: ${results.length - counted('existing') - counted('skipped')}; ` +
      `accepted: ${counted('accepted')}; rejected: ${counted('rejected')}; ` +
      `already had one: ${counted('existing')}; skipped: ${counted('skipped')}` +
      (modes.length ? `; encoded via: ${modes.join(', ')}` : ''),
  );
  if (dryRun) console.log('Dry run: nothing was written.');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
