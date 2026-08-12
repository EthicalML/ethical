#!/usr/bin/env node

/**
 * Check and sync newsletter syndication links:
 *   node --env-file=.env scripts/newsletter/backlinks.mjs status [--recent N]
 *   node --env-file=.env scripts/newsletter/backlinks.mjs sync [--recent N] [--all]
 *     [--source brevo,substack,linkedin] [--from <file>] [--dry-run]
 */

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const issueDir = join(repoRoot, 'src/content/newsletter');
const sourceOrder = ['Substack', 'LinkedIn', 'Brevo'];
const sourceKeys = sourceOrder.map((name) => name.toLowerCase());
const linkedInArchiveUrl =
  'https://www.linkedin.com/newsletters/the-machine-learning-engineer-6882216044568571904/';

function usage(message) {
  if (message) console.error(message);
  console.error(
    'usage: backlinks.mjs status [--recent N]\n' +
      '       backlinks.mjs sync [--recent N] [--all] [--source brevo,substack,linkedin] [--from <file>] [--dry-run]',
  );
  process.exit(2);
}

function parseArguments(argv) {
  const [command, ...rest] = argv;
  if (!['status', 'sync'].includes(command)) usage('expected status or sync');

  const options = {
    command,
    recent: 4,
    all: false,
    sources: new Set(sourceKeys),
    from: [],
    dryRun: false,
  };
  for (let index = 0; index < rest.length; index += 1) {
    const flag = rest[index];
    if (flag === '--recent') {
      options.recent = Number(rest[index + 1]);
      index += 1;
    } else if (flag === '--all') {
      options.all = true;
    } else if (flag === '--source') {
      options.sources = new Set((rest[index + 1] ?? '').split(',').filter(Boolean));
      index += 1;
    } else if (flag === '--from') {
      options.from.push(resolve(rest[index + 1] ?? ''));
      index += 1;
    } else if (flag === '--dry-run') {
      options.dryRun = true;
    } else {
      usage(`unknown argument: ${flag}`);
    }
  }

  if (!Number.isInteger(options.recent) || options.recent < 1) {
    usage('--recent expects a positive integer');
  }
  if ([...options.sources].some((source) => !sourceKeys.includes(source))) {
    usage('--source expects brevo, substack and/or linkedin');
  }
  if (command === 'status' && (options.all || options.from.length || options.dryRun)) {
    usage('status only accepts --recent');
  }
  if (options.all && rest.includes('--recent')) usage('--all and --recent cannot be combined');
  return options;
}

async function issueNumbers() {
  return (await readdir(issueDir))
    .filter((name) => /^\d+\.md$/.test(name))
    .map((name) => Number.parseInt(name, 10))
    .sort((left, right) => left - right);
}

function checkedIssues(numbers, options) {
  if (options.all) return numbers;
  return numbers.slice(0, -1).slice(-options.recent);
}

function frontmatterLines(source) {
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(source);
  if (!match) throw new Error('missing frontmatter');
  return { match, lines: match[1].split('\n') };
}

function readSyndication(source) {
  const { lines } = frontmatterLines(source);
  const start = lines.indexOf('syndication:');
  if (start === -1) return [];

  const entries = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const name = /^ {2}- name:\s*(.+)$/.exec(lines[index]);
    if (!name) break;
    const url = /^ {4}url:\s*(.+)$/.exec(lines[index + 1] ?? '');
    if (!url) throw new Error(`invalid syndication entry for ${name[1]}`);
    entries.push({ name: name[1], url: url[1] });
    index += 1;
  }
  return entries;
}

function writeSyndication(source, entries) {
  const { match, lines } = frontmatterLines(source);
  const start = lines.indexOf('syndication:');
  if (start !== -1) {
    let end = start + 1;
    while (end < lines.length && /^ {2,}/.test(lines[end])) end += 1;
    lines.splice(start, end - start);
  }

  const ordered = [...entries].sort((left, right) => {
    const leftIndex = sourceOrder.indexOf(left.name);
    const rightIndex = sourceOrder.indexOf(right.name);
    return (
      (leftIndex === -1 ? sourceOrder.length : leftIndex) -
      (rightIndex === -1 ? sourceOrder.length : rightIndex)
    );
  });
  if (ordered.length) {
    lines.push('syndication:');
    for (const entry of ordered) {
      lines.push(`  - name: ${entry.name}`, `    url: ${entry.url}`);
    }
  }

  return source.replace(match[0], `---\n${lines.join('\n')}\n---\n`);
}

function normaliseUrl(url) {
  return url.replace(/^http:\/\//, 'https://');
}

function campaignIssue(name) {
  const number = /#(\d+)/.exec(name);
  if (!number) return undefined;
  const copies = name.match(/_copy/gi)?.length ?? 0;
  return Number(number[1]) + copies;
}

function laterCampaign(left, right) {
  return String(right.sentDate ?? '') > String(left.sentDate ?? '') ? right : left;
}

function chooseCampaign(issue, current, candidate) {
  const currentCopies = current.name.match(/_copy/gi)?.length ?? 0;
  const candidateCopies = candidate.name.match(/_copy/gi)?.length ?? 0;
  let chosen;
  let reason;
  if (currentCopies === 0 && candidateCopies > 0) {
    chosen = current;
    reason = 'preferred the campaign without _copy';
  } else if (candidateCopies === 0 && currentCopies > 0) {
    chosen = candidate;
    reason = 'preferred the campaign without _copy';
  } else if (current.name === candidate.name) {
    chosen = laterCampaign(current, candidate);
    reason = 'kept the later sentDate for identical names';
  } else {
    chosen = laterCampaign(current, candidate);
    reason = 'kept the later sentDate after the names tied on _copy count';
  }
  console.error(
    `warning: Brevo collision for issue ${issue}: ${JSON.stringify(current.name)} (${current.sentDate ?? 'no date'}) vs ${JSON.stringify(candidate.name)} (${candidate.sentDate ?? 'no date'}); ${reason}`,
  );
  return chosen;
}

async function fetchBrevo() {
  if (!process.env.BREVO_API_KEY) {
    console.error('warning: BREVO_API_KEY is missing; skipping Brevo');
    return new Map();
  }

  const campaigns = new Map();
  for (let offset = 0; ; offset += 100) {
    const response = await fetch(
      `https://api.brevo.com/v3/emailCampaigns?limit=100&offset=${offset}&sort=desc`,
      { headers: { 'api-key': process.env.BREVO_API_KEY } },
    );
    if (!response.ok) throw new Error(`Brevo returned ${response.status}`);
    const page = await response.json();
    const rows = page.campaigns ?? [];
    for (const campaign of rows) {
      const issue = campaignIssue(campaign.name ?? '');
      if (!issue || !campaign.shareLink) continue;
      const current = campaigns.get(issue);
      campaigns.set(issue, current ? chooseCampaign(issue, current, campaign) : campaign);
    }
    if (rows.length < 100) break;
  }
  return new Map(
    [...campaigns].map(([issue, campaign]) => [issue, normaliseUrl(campaign.shareLink)]),
  );
}

async function fetchSubstack() {
  const issues = new Map();
  for (let offset = 0; ; offset += 50) {
    const response = await fetch(
      `https://machinelearning.substack.com/api/v1/archive?sort=new&offset=${offset}&limit=50`,
    );
    if (!response.ok) throw new Error(`Substack returned ${response.status}`);
    const page = await response.json();
    if (!Array.isArray(page)) throw new Error('Substack returned an unexpected response');
    if (!page.length) break;
    for (const post of page) {
      const match = /issue-(\d+)/.exec(post.slug ?? '');
      if (match && post.canonical_url) {
        issues.set(Number(match[1]), post.canonical_url);
      }
    }
  }
  return issues;
}

function linkedInIssues(html) {
  const issues = new Map();
  const pattern = /\/pulse\/(issue-(\d+)-ml-engineer[a-z0-9-]*)/gi;
  for (const match of html.matchAll(pattern)) {
    issues.set(Number(match[2]), `https://www.linkedin.com/pulse/${match[1].toLowerCase()}`);
  }
  return issues;
}

async function fetchLinkedIn() {
  const response = await fetch(linkedInArchiveUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    },
  });
  if (!response.ok) throw new Error(`LinkedIn returned ${response.status}`);
  return linkedInIssues(await response.text());
}

function mapFromJson(json) {
  const rows = Object.entries(json);
  const sample = rows.find(([, value]) => value != null)?.[1];
  if (typeof sample === 'string') {
    return {
      source: 'linkedin',
      issues: new Map(rows.map(([issue, url]) => [Number(issue), url])),
    };
  }
  if (sample && typeof sample === 'object' && 'slug' in sample) {
    return {
      source: 'substack',
      issues: new Map(rows.map(([issue, value]) => [Number(issue), value.url])),
    };
  }
  if (sample && typeof sample === 'object' && ('name' in sample || 'sent' in sample)) {
    return {
      source: 'brevo',
      issues: new Map(rows.map(([issue, value]) => [Number(issue), normaliseUrl(value.url)])),
    };
  }
  throw new Error('could not identify the JSON map source');
}

async function loadFromFile(path) {
  const contents = await readFile(path, 'utf8');
  if (/\.json$/i.test(path)) return mapFromJson(JSON.parse(contents));
  return { source: 'linkedin', issues: linkedInIssues(contents) };
}

async function resolveSources(options) {
  const resolved = new Map();
  for (const path of options.from) {
    try {
      const loaded = await loadFromFile(path);
      if (!options.sources.has(loaded.source)) continue;
      const existing = resolved.get(loaded.source) ?? new Map();
      for (const [issue, url] of loaded.issues) existing.set(issue, url);
      resolved.set(loaded.source, existing);
    } catch (error) {
      console.error(`warning: could not load ${path}: ${error.message}`);
    }
  }

  const fetchers = {
    brevo: fetchBrevo,
    substack: fetchSubstack,
    linkedin: fetchLinkedIn,
  };
  for (const source of options.sources) {
    if (resolved.has(source)) continue;
    try {
      resolved.set(source, await fetchers[source]());
    } catch (error) {
      console.error(`warning: ${source} sync failed: ${error.message}`);
      resolved.set(source, new Map());
    }
  }
  return resolved;
}

async function status(numbers, recent) {
  const checked = checkedIssues(numbers, { all: false, recent });
  const missing = new Map(sourceOrder.map((name) => [name, []]));
  const incomplete = [];
  for (const issue of checked) {
    const source = await readFile(join(issueDir, `${issue}.md`), 'utf8');
    const names = new Set(readSyndication(source).map((entry) => entry.name));
    const absent = sourceOrder.filter((name) => !names.has(name));
    if (absent.length) incomplete.push(issue);
    for (const name of absent) missing.get(name).push(issue);
  }

  console.log(`Checked issues: ${checked.join(', ')}`);
  for (const name of sourceOrder) {
    const issues = missing.get(name);
    console.log(`${name} missing: ${issues.length ? issues.join(', ') : 'none'}`);
  }
  console.log(`Incomplete issues: ${incomplete.length ? incomplete.join(', ') : 'none'}`);
  if (incomplete.length) process.exitCode = 1;
}

async function sync(numbers, options) {
  const checked = checkedIssues(numbers, options);
  const resolved = await resolveSources(options);
  const added = new Map(sourceOrder.map((name) => [name, 0]));
  let changed = 0;
  let conflicts = 0;

  for (const issue of checked) {
    const path = join(issueDir, `${issue}.md`);
    const source = await readFile(path, 'utf8');
    const entries = readSyndication(source);
    let issueChanged = false;
    for (const key of options.sources) {
      const name = sourceOrder.find((candidate) => candidate.toLowerCase() === key);
      const url = resolved.get(key)?.get(issue);
      if (!url) continue;
      const existing = entries.find((entry) => entry.name === name);
      if (existing && existing.url !== url) {
        conflicts += 1;
        console.error(
          `warning: issue ${issue} ${name} conflict: kept ${existing.url}; resolved ${url}`,
        );
        continue;
      }
      if (!existing) {
        entries.push({ name, url });
        added.set(name, added.get(name) + 1);
        issueChanged = true;
      }
    }
    if (!issueChanged) continue;
    changed += 1;
    if (!options.dryRun) await writeFile(path, writeSyndication(source, entries));
  }

  console.log(
    `${options.dryRun ? 'Would update' : 'Updated'} ${changed} of ${checked.length} checked issues`,
  );
  for (const name of sourceOrder) console.log(`${name} added: ${added.get(name)}`);
  console.log(`Conflicts: ${conflicts}`);
}

const options = parseArguments(process.argv.slice(2));
const numbers = await issueNumbers();
if (!numbers.length) throw new Error('no newsletter issues found');
if (options.command === 'status') await status(numbers, options.recent);
else await sync(numbers, options);
