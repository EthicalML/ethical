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
// Run: node scripts/events/fetch-banners.mjs [--only <slug>] [--force] [--dry-run]

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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
  return resolved;
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

// Resolves to { status, reason?, value?, bytes? }. Never throws: one dead
// conference site must not take the other twenty-six with it.
async function fetchBanner(event, { dryRun, tmpDir }) {
  let html;
  try {
    const response = await fetchWithTimeout(event.url, 'text/html,application/xhtml+xml');
    if (!response.ok) return { status: 'rejected', reason: `page HTTP ${response.status}` };
    html = await response.text();
  } catch (error) {
    return { status: 'rejected', reason: `page fetch failed (${error.message})` };
  }

  const candidates = imageCandidates(html, event.url);
  if (!candidates.length)
    return { status: 'rejected', reason: 'no og:image, twitter:image or icon' };

  const reasons = [];
  for (const candidate of candidates) {
    const tmpPath = path.join(tmpDir, `${event.slug}.bin`);
    let buffer;
    try {
      const response = await fetchWithTimeout(candidate, 'image/*');
      if (!response.ok) {
        reasons.push(`image HTTP ${response.status}`);
        continue;
      }
      buffer = Buffer.from(await response.arrayBuffer());
    } catch (error) {
      reasons.push(`image fetch failed (${error.message})`);
      continue;
    }
    if (buffer.byteLength > maxBytes) {
      reasons.push(`${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB over the 3 MB cap`);
      continue;
    }
    let meta;
    try {
      meta = await inspect(buffer, tmpPath);
    } catch {
      reasons.push('not a decodable image');
      continue;
    }
    if (!meta.width || !meta.height) {
      reasons.push('not a decodable image');
      continue;
    }
    const long = Math.max(meta.width, meta.height);
    const ratio = long / Math.min(meta.width, meta.height);
    if (long < minLongEdge) {
      reasons.push(`${meta.width}x${meta.height} under the ${minLongEdge}px long edge`);
      continue;
    }
    if (ratio < minRatio || ratio > maxRatio) {
      reasons.push(`aspect ${ratio.toFixed(2)}:1 outside ${minRatio}-${maxRatio}:1`);
      continue;
    }
    // The image is linked, never stored: the bytes are fetched only to gate the
    // candidate on its real dimensions, then discarded. A remote image can
    // disappear, so the card falls back to the generated banner on load error.
    return {
      status: 'accepted',
      value: candidate,
      mode: dryRun ? 'dry-run' : 'linked',
      note: `${meta.width}x${meta.height} ${meta.format}`,
      source: candidate,
    };
  }
  return { status: 'rejected', reason: reasons.join('; ') || 'no usable candidate' };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const dryRun = Boolean(options['dry-run']);
  const force = Boolean(options.force);
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
    const result = await fetchBanner(event, { dryRun, tmpDir });
    results.push({ slug: event.slug, ...result });
    if (result.status === 'accepted' && !dryRun) {
      updates.push({
        at: event.imageLine >= 0 ? event.imageLine : event.urlLine,
        replace: event.imageLine >= 0,
        value: result.value,
      });
    }
    const detail =
      result.status === 'accepted' ? `${result.note} -> ${result.value}` : result.reason;
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
