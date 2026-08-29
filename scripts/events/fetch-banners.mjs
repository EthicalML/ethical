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

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  domImageCandidates,
  fetchWithTimeout,
  inspectImage,
  looksLikeFurniture,
  metaImageCandidates,
} from '../lib/harvest-image.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const yamlPath = path.join(root, 'src/content/events.yaml');

// Acceptance gates. A social banner is wide and reasonably large; anything
// outside these bounds is a favicon, a tracking pixel, a square logo or a
// decorative strip, none of which read as event artwork. The gates live here
// rather than in the shared harvester because they are what "a conference
// banner" means, and the newsletter's picture-per-article step wants different
// ones.
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
    meta = await inspectImage(buffer, tmpPath);
  } catch {
    return { ok: false, reason: 'not a decodable image' };
  }
  if (!meta.width || !meta.height) return { ok: false, reason: 'not a decodable image' };
  const long = Math.max(meta.width, meta.height);
  const ratio = long / Math.min(meta.width, meta.height);
  if (long < minLongEdge) {
    return {
      ok: false,
      reason: `${meta.width}x${meta.height} under the ${minLongEdge}px long edge`,
    };
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
    const candidates = metaImageCandidates(html, event.url);
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
  const dom = await domImageCandidates(event.url, {
    minBackgroundWidth,
    minBackgroundHeight,
    timeoutMs: browserTimeoutMs,
    retrySettleMs: browserRetrySettleMs,
  });
  if (dom.reason) reasons.push(dom.reason);
  const picked = dom.candidates.length
    ? await firstPassing(dom.candidates, tmpPath)
    : { winner: null, reasons: [] };
  reasons.push(...picked.reasons);
  if (!picked.winner) {
    if (metaFallback) {
      return accepted(metaFallback.candidate, metaFallback.note, {
        pass: 'meta (deep found none)',
      });
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
          (result.displaced
            ? `\n  demoted as furniture, would otherwise have won: ${result.displaced}`
            : '')
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
