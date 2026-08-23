#!/usr/bin/env node

/**
 * Scaffold the next newsletter issue from the previous one:
 *   node scripts/newsletter/new-issue.mjs [--issue N] [--date YYYY-MM-DD] [--out <path>] [--force]
 *
 * Everything that is boilerplate (the share preamble, the events section, the open source
 * section, the about section) is copied verbatim from the previous issue so it is carried
 * forward rather than reinvented. Everything that is authored each week (the summary, the
 * tags, the "This week in" list, the five article sections) is emitted as a placeholder.
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const issueDir = join(repoRoot, 'src/content/newsletter');
const eventsHeadingPattern = /^## Upcoming (?:MLOps Events|\[MLOps Events\]\([^)]*\))/m;
const articleCount = 5;

function parseArguments(argv) {
  const options = { force: false, 'dry-run': false };
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (flag === '--force') {
      options.force = true;
    } else if (flag === '--dry-run') {
      options['dry-run'] = true;
    } else if (flag.startsWith('--')) {
      options[flag.slice(2)] = argv[index + 1];
      index += 1;
    }
  }
  return options;
}

function issueNumbers() {
  return readdirSync(issueDir)
    .filter((name) => /^\d+\.md$/.test(name))
    .map((name) => Number.parseInt(name, 10))
    .sort((a, b) => a - b);
}

/** The issue after `previousDate`, on the same weekday, one week later. */
function nextDate(previousDate) {
  const next = new Date(`${previousDate}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 7);
  return next.toISOString().slice(0, 10);
}

function frontmatterValue(source, key) {
  const match = source.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  return match ? match[1].trim() : '';
}

/**
 * Split a past issue into the boilerplate that carries forward and the body that does not.
 * The preamble is everything between the frontmatter and the "This week in" heading; the
 * tail is everything from the events heading onwards.
 */
function splitIssue(source) {
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, '');
  const weekHeadingIndex = body.indexOf('## This week in');
  const eventsIndex = body.search(eventsHeadingPattern);
  if (weekHeadingIndex === -1 || eventsIndex === -1) {
    throw new Error('previous issue does not have the expected "This week in" / events headings');
  }
  return {
    preamble: body.slice(0, weekHeadingIndex).trim(),
    tail: body.slice(eventsIndex).trimEnd(),
  };
}

function scaffold({ issue, date, preamble, tail }) {
  const bullets = Array.from(
    { length: articleCount },
    (_, index) => `- TODO headline ${index + 1} [linked phrase](TODO-url)`,
  );
  bullets.push(
    '- Open Source [ML Frameworks](/open-source/production-ml-list/)',
    '- Awesome AI Guidelines [to check out this week](/open-source/ai-guidelines/)',
    '- \\+ more 🚀',
  );
  const articles = Array.from(
    { length: articleCount },
    (_, index) => `## [TODO headline ${index + 1}](TODO-url)\n\nTODO paragraph ${index + 1}.\n`,
  ).join('\n');

  return [
    '---',
    `issue: ${issue}`,
    `date: ${date}`,
    "summary: 'TODO summary + more 🚀'",
    'tags: [TODO]',
    '---',
    '',
    preamble,
    '',
    `## This week in [ML Engineering](http://ethical.institute/mle/${issue}.html):`,
    '',
    bullets.join('\n'),
    '',
    articles,
    tail,
    '',
  ].join('\n');
}

const options = parseArguments(process.argv.slice(2));
const numbers = issueNumbers();
const issue = Number.parseInt(options.issue ?? String(numbers.at(-1) + 1), 10);
const previousIssue = issue - 1;
const previousPath = join(issueDir, `${previousIssue}.md`);
if (!existsSync(previousPath)) {
  throw new Error(`cannot scaffold issue ${issue}: ${previousPath} does not exist`);
}

const previousSource = readFileSync(previousPath, 'utf8');
const { preamble, tail } = splitIssue(previousSource);
const date = options.date ?? nextDate(frontmatterValue(previousSource, 'date'));
const outputPath = options.out ? resolve(options.out) : join(issueDir, `${issue}.md`);
if (options['dry-run']) {
  process.stdout.write(`issue ${issue}\ndate ${date}\nwould write ${outputPath}\n`);
  process.exit(0);
}
if (existsSync(outputPath) && !options.force) {
  throw new Error(`${outputPath} already exists; pass --force to overwrite`);
}

writeFileSync(outputPath, scaffold({ issue, date, preamble, tail }));
process.stdout.write(
  `scaffolded issue ${issue} (${date}) from ${previousIssue} at ${outputPath}\n`,
);
