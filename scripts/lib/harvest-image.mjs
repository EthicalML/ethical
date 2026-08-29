// Getting a picture out of somebody else's URL.
//
// Two callers want this and want different things from it. `scripts/events/fetch-banners.mjs`
// wants the single best banner for a conference and commits the winning URL. The newsletter
// image step wants every plausible candidate for one article so the owner can pick between
// them. What they share is the collection: fetch the page as a browser, read what the site
// nominates for a social card, and when that comes up empty, render the page and look at the
// images actually on it.
//
// So this module collects and measures, and never decides. Acceptance gates (long edge,
// aspect ratio, byte cap) stay with the caller, because a wide event banner and a square
// figure out of a paper are both correct answers to different questions.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

// A plain fetch identifies itself as node and a fair number of sites answer 403 to that.
// Claiming a desktop browser is what gets the HTML.
export const browserUserAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) ' +
  'Chrome/124.0.0.0 Safari/537.36';

export const defaultRequestTimeoutMs = 20000;

// House furniture. Not a rejection but a demotion: a site whose only large image is its logo
// still gets it, and anything else on the page is tried first.
export const logoPattern = /logo|icon|favicon|sprite|avatar|badge/i;

export async function fetchWithTimeout(url, accept, timeoutMs = defaultRequestTimeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
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

// Attributes are read individually rather than positionally: `content` comes before
// `property` on plenty of real pages, and a single ordered regex misses exactly those.
export function metaTags(html) {
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

/**
 * Preference order, best first: the image the site itself nominates for a social card, then
 * its Twitter equivalent, then an icon as a last resort. The icon almost always fails a size
 * gate, which is the point: it is only there so a site with no card at all still gets one
 * honest attempt. Each entry carries `kind` so a caller can label where it came from.
 */
export function metaImageCandidates(html, pageUrl) {
  const tags = metaTags(html);
  const ordered = [
    ...tags
      .filter((tag) => tag.key === 'og:image' || tag.key === 'og:image:secure_url')
      .map((tag) => ({ raw: tag.content, kind: 'og:image' })),
    ...tags
      .filter((tag) => tag.key === 'twitter:image' || tag.key === 'twitter:image:src')
      .map((tag) => ({ raw: tag.content, kind: 'twitter:image' })),
    ...iconLinks(html).map((href) => ({ raw: href, kind: 'icon' })),
  ];
  const resolved = [];
  const seen = new Set();
  for (const { raw, kind } of ordered) {
    if (!raw || raw.startsWith('data:')) continue;
    try {
      const absolute = new URL(raw, pageUrl).toString();
      if (seen.has(absolute)) continue;
      seen.add(absolute);
      resolved.push({ url: absolute, alt: '', kind });
    } catch {
      // A candidate that is not a URL at all is simply not a candidate.
    }
  }
  return resolved;
}

// --- the rendered DOM ------------------------------------------------------
//
// Meta tags are what a site chooses to advertise; plenty of sites choose nothing at all and
// still carry a perfectly good hero image. When the meta pass finds nothing usable, the page
// is rendered and the images actually on it are considered.

// Playwright is not a dependency of this repo, so it has to be found: an explicit override,
// then a normal install, then the content-hashed npx cache. The cache is searched and never
// hardcoded, because the hash changes whenever npx re-resolves.
//
// The cache routinely holds several versions, and each one insists on the exact browser build
// it shipped against. `npx playwright install` populates the build of whichever version npx
// resolves today, which is the newest, so an older copy found first launches nothing and
// reports the browser as missing however many times it is reinstalled. Newest first, then.
function playwrightVersion(dir) {
  try {
    const raw = readFileSync(path.join(dir, 'node_modules/playwright/package.json'), 'utf8');
    return JSON.parse(raw).version ?? '0';
  } catch {
    return '0';
  }
}

function compareVersions(left, right) {
  const parts = (value) => value.split('.').map((piece) => Number.parseInt(piece, 10) || 0);
  const [a, b] = [parts(left), parts(right)];
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    const delta = (b[index] ?? 0) - (a[index] ?? 0);
    if (delta) return delta;
  }
  return 0;
}

/** The best specifier available, for handing to a child process that resolves its own. */
export function playwrightModulePath() {
  return resolvePlaywright().find((specifier) => specifier !== 'playwright') ?? 'playwright';
}

function resolvePlaywright() {
  if (process.env.NEWSLETTER_PLAYWRIGHT) return [process.env.NEWSLETTER_PLAYWRIGHT];
  const npxCache = path.join(process.env.HOME ?? '', '.npm/_npx');
  const cached = existsSync(npxCache)
    ? readdirSync(npxCache)
        .map((hash) => path.join(npxCache, hash))
        .filter((dir) => existsSync(path.join(dir, 'node_modules/playwright/index.js')))
        .sort((left, right) => compareVersions(playwrightVersion(left), playwrightVersion(right)))
        .map((dir) => path.join(dir, 'node_modules/playwright/index.js'))
    : [];
  return ['playwright', ...cached];
}

// Imported lazily and cached, so a run whose every page passes the meta gates never loads a
// browser at all. `null` means tried and unavailable.
let chromiumModule;
export async function loadChromium() {
  if (chromiumModule !== undefined) return chromiumModule;
  for (const specifier of resolvePlaywright()) {
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

// Runs inside the page. Two populations: `img` elements measured by what the browser actually
// decoded (naturalWidth/Height, so a lazy placeholder that never loaded scores zero and sorts
// to the bottom), and CSS backgrounds on elements big enough to be a hero rather than a
// bullet.
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

export function looksLikeFurniture(candidate) {
  return logoPattern.test(candidate.url) || logoPattern.test(candidate.alt ?? '');
}

// Biggest first, but everything that reads as house furniture sorts behind everything that
// does not, however large it is. A site whose logo is its largest asset still gets the logo
// if nothing else passes the gates.
export function rankDomCandidates(candidates) {
  const byArea = [...candidates].sort((left, right) => right.area - left.area);
  return [
    ...byArea.filter((candidate) => !looksLikeFurniture(candidate)),
    ...byArea.filter((candidate) => looksLikeFurniture(candidate)),
  ];
}

/**
 * Never throws: a page that will not render is one page with no DOM candidates, not a dead
 * run. Resolves to { candidates, reason }, where `reason` explains an empty list.
 *
 * `onPage` is an escape hatch for a caller that wants something else off the same rendered
 * page (the newsletter step takes a screenshot with it) and is called before the browser
 * closes. It is awaited and its failures are swallowed for the same reason.
 */
export async function domImageCandidates(
  pageUrl,
  {
    minBackgroundWidth = 600,
    minBackgroundHeight = 300,
    timeoutMs = 60000,
    retrySettleMs = 4000,
    onPage,
  } = {},
) {
  const chromium = await loadChromium();
  if (!chromium) return { candidates: [], reason: 'Playwright unavailable, DOM pass skipped' };
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ userAgent: browserUserAgent });
    try {
      await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: timeoutMs });
    } catch {
      // Some sites poll forever and never go idle. The DOM is usually all there regardless,
      // so settle briefly and take what rendered.
      await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
      await page.waitForTimeout(retrySettleMs);
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
      candidates.push({ url: absolute, alt: item.alt, area: item.area, kind: 'page image' });
    }
    if (onPage) {
      try {
        await onPage(page);
      } catch {
        // A screenshot that will not take is one missing candidate, not a failed harvest.
      }
    }
    return { candidates: rankDomCandidates(candidates), reason: '' };
  } catch (error) {
    return { candidates: [], reason: `page render failed (${error.message})` };
  } finally {
    await browser?.close();
  }
}

// --- image inspection ------------------------------------------------------

// sharp is not a declared dependency of this repo: it arrives transitively and the
// policy-record scripts already rely on that. Imported lazily so a run on a tree without it
// degrades to ImageMagick rather than failing at load.
let sharpModule;
let sharpTried = false;
export async function loadSharp() {
  if (sharpTried) return sharpModule;
  sharpTried = true;
  try {
    sharpModule = (await import('sharp')).default;
  } catch {
    sharpModule = null;
  }
  return sharpModule;
}

/**
 * Dimensions and format from the bytes themselves, never from the URL or the Content-Type
 * header: both lie, and a "banner.jpg" that is really a 16x16 ICO has to be judged on what
 * it is.
 */
export async function inspectImage(buffer, tmpPath) {
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
