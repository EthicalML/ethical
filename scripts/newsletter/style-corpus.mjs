#!/usr/bin/env node

// Mines the writing style of the ML Engineering newsletter from past issues so a
// skill can reuse literal phrasing instead of vibes. Deterministic: same input
// files produce byte-identical output.

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const corpusDir = join(repoRoot, 'src/content/newsletter');

// The heading that opens the "This week in" list; wording drifted over the years.
const weeklyListHeading = /^(This week in |The .{0,30}this week:)/i;

// Headings that end the article block; everything from here on is boilerplate.
// Matched against link-stripped heading text, so `Open Source MLOps Tools` here
// does not also swallow a real article titled `Open Source $8 Trillion ...`.
const boilerplateHeading =
  /^(Upcoming MLOps Events|Open Source MLOps Tools|OSS:|About us|In case you missed|Events we are|MLConf|MLJobs|MLOps =|Support the ML Engineer|AI Conferences Gone Virtual)/i;

const slopWords = [
  'delve',
  'leverage',
  'robust',
  'seamless',
  'game-changing',
  'revolutionary',
  'landscape',
  'unlock',
  'harness',
  'pivotal',
  'testament',
  'crucial',
  'moreover',
  'furthermore',
];

const markers = [
  ['I (first person)', /\bI\b/g],
  ['my', /\bmy\b/gi],
  ['we', /\bwe\b/gi],
  ['our', /\bour\b/gi],
  ["Let's", /\blet's\b/gi],
  ['it is/it’s interesting', /\bit(?:'s| is| was| will be)?\s+\w*\s?interesting\b/gi],
  ['it is impressive', /\bit(?:'s| is| was)\s+impressive\b/gi],
  ['interesting (any)', /\binteresting\b/gi],
  ['great/awesome/super', /\b(great|awesome|super)\b/gi],
  ['pretty/quite/very', /\b(pretty|quite|very)\b/gi],
  ['definitely/indeed/certainly', /\b(definitely|indeed|certainly)\b/gi],
  ['looking forward', /\blooking forward\b/gi],
  ['exclamation mark', /!/g],
  ['ellipsis', /\.\.\./g],
  ['em/en dash aside', / [-–—] /g],
  ['semicolon', /;/g],
  ['emoji', /\p{Extended_Pictographic}/gu],
];

const informalities = [
  'tho',
  'tldr',
  'gonna',
  'kinda',
  'stuff',
  'haywire',
  'insane',
  'cool',
  'huge',
  'crazy',
  'wild',
  'nice',
];

// Lint thresholds, all from the mined corpus (see the skill's references/style.md).
const bannedWords = [
  'delve',
  'game-changing',
  'game changing',
  'revolutionary',
  'pivotal',
  'testament',
  'crucial',
  'moreover',
  'furthermore',
];

// Near-zero usage (each under 12 uses in 198 sections): flag, never fail.
const rareWords = ['seamless', 'landscape', 'leverage', 'unlock', 'robust'];

const fixedTrailingBullets = [
  'Open Source [ML Frameworks](/open-source/production-ml-list/)',
  'Awesome AI Guidelines [to check out this week](/open-source/ai-guidelines/)',
  '\\+ more 🚀',
];

const wholeLink = /^\[[^\]]*\]\((?:<[^>]*>|[^\s)]*)\)$/;

const limits = {
  sectionWords: [31, 291],
  issueWords: [600, 1000],
  colonLedes: [2, 4],
  sectionLinks: 1,
  exclamationsPerSection: 0.92,
  semicolonsPerSection: 0.69,
};

const stopWords = new Set(
  (
    'a about across after all also an and any are as at be because been being but by can could did do does ' +
    'each even for from get had has have how i if in into is it its just like make may might more most much ' +
    'must my no not now of on one only or other our out over own said same see should so some such than that ' +
    'the their them then there these they this those through to too two up us use used very was way we were ' +
    'what when where which while who will with would you your it’s its i’ve has have been'
  ).split(' '),
);

function parseArgs(argv) {
  const options = { issues: 40, out: join(repoRoot, 'tmp/newsletter-style') };
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (flag === '--issues') {
      options.issues = Number(value);
      index += 1;
    } else if (flag === '--out') {
      options.out = resolve(repoRoot, value ?? '');
      index += 1;
    } else if (flag === '--lint') {
      options.lint = resolve(repoRoot, value ?? '');
      index += 1;
    } else {
      throw new Error(`unknown argument: ${flag}`);
    }
  }
  if (!Number.isInteger(options.issues) || options.issues < 1) {
    throw new Error('--issues expects a positive integer');
  }
  return options;
}

function stripLinks(markdown) {
  return (
    markdown
      .replace(/!\[[^\]]*\]\((?:<[^>]*>|[^\s)]*)\)/g, '')
      .replace(/\[([^\]]*)\]\((?:<[^>]*>|[^\s)]*)\)/g, '$1')
      .replace(/\\([+*_])/g, '$1')
      // Bare URLs used as link labels would otherwise pollute the n-gram banks.
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function countLinks(markdown) {
  return [...markdown.matchAll(/(?<!!)\[[^\]]*\]\((?:<[^>]*>|[^\s)]*)\)/g)].length;
}

// ':' terminates a sentence here on purpose: the author's lede sentence is a
// setup line that ends with a colon, and it must not swallow the rest.
function sentences(text) {
  return text
    .split(/(?<=[.!?:])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => /\p{L}/u.test(sentence));
}

function tokens(text) {
  return (text.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).map((token) =>
    token.replace(/’/g, "'"),
  );
}

function parseFrontmatter(block) {
  const data = { summary: '', tags: [] };
  for (const line of block.split('\n')) {
    const match = /^(\w+):\s*(.*)$/.exec(line);
    if (!match) continue;
    const [, key, raw] = match;
    let value = raw.trim();
    if (/^'.*'$/.test(value) || /^".*"$/.test(value)) value = value.slice(1, -1);
    if (key === 'tags') {
      data.tags = value
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
    } else {
      data[key] = value;
    }
  }
  return data;
}

function parseIssue(issue, source) {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(source);
  if (!match) return { issue, ok: false, reason: 'no frontmatter' };
  const front = parseFrontmatter(match[1]);
  const blocks = match[2]
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  const weeklyIndex = blocks.findIndex(
    (block) => block.startsWith('## ') && weeklyListHeading.test(stripLinks(block.slice(3))),
  );
  if (weeklyIndex === -1) return { issue, ok: false, reason: 'no "This week in" heading' };
  const listBlock = blocks[weeklyIndex + 1] ?? '';
  const bullets = /^- /m.test(listBlock)
    ? listBlock.split('\n').filter((line) => line.startsWith('- '))
    : [];

  const sections = [];
  let current;
  for (const block of blocks.slice(weeklyIndex + 1)) {
    if (block.startsWith('## ')) {
      const heading = block.slice(3).trim();
      // Skip rather than stop: in old issues a boilerplate block ("Support the
      // ML Engineer!") sits between the weekly list and the first article.
      if (boilerplateHeading.test(stripLinks(heading))) {
        current = undefined;
        continue;
      }
      current = { heading, paragraphs: [], nonProse: [] };
      sections.push(current);
      continue;
    }
    if (!current) continue;
    // Kept (not just skipped) so the linter can report structure the voice bans.
    if (/^(#|-|\*|>|```|\d+\.)/.test(block)) {
      current.nonProse.push(block);
      continue;
    }
    current.paragraphs.push(block);
  }

  const articles = sections.filter((section) => section.paragraphs.length > 0);
  return {
    issue,
    ok: articles.length >= 3,
    reason: articles.length >= 3 ? null : `only ${articles.length} article sections`,
    date: front.date ?? '',
    summary: front.summary ?? '',
    tags: front.tags,
    bullets,
    sections: articles,
  };
}

function quantiles(values) {
  if (!values.length) return { min: 0, median: 0, p90: 0, max: 0, mean: 0 };
  const sorted = [...values].sort((left, right) => left - right);
  const at = (fraction) =>
    sorted[Math.min(sorted.length - 1, Math.ceil(fraction * sorted.length) - 1)];
  const mean = sorted.reduce((sum, value) => sum + value, 0) / sorted.length;
  return {
    min: sorted[0],
    median: at(0.5),
    p90: at(0.9),
    max: sorted.at(-1),
    mean: Math.round(mean * 10) / 10,
  };
}

// `anchored` counts only the n-gram starting at token 0 (sentence openers).
function addNgrams(store, tokenList, sizes, issue, anchored = false) {
  for (const size of sizes) {
    const last = anchored ? 0 : tokenList.length - size;
    for (let index = 0; index <= last && index + size <= tokenList.length; index += 1) {
      const key = tokenList.slice(index, index + size).join(' ');
      let entry = store.get(key);
      if (!entry) {
        entry = { count: 0, issues: new Set() };
        store.set(key, entry);
      }
      entry.count += 1;
      entry.issues.add(issue);
    }
  }
}

// `by` picks the primary sort key; the other two keys always break ties, so the
// ordering is total and the output stays byte-identical between runs.
function rank(store, { minCount = 1, minIssues = 1, limit = 40, by = 'issues', size } = {}) {
  return [...store.entries()]
    .filter(
      ([phrase, entry]) =>
        entry.count >= minCount &&
        entry.issues.size >= minIssues &&
        (!size || phrase.split(' ').length === size),
    )
    .map(([phrase, entry]) => ({ phrase, count: entry.count, issues: entry.issues.size }))
    .sort(
      (left, right) =>
        (by === 'count' ? right.count - left.count : right.issues - left.issues) ||
        (by === 'count' ? right.issues - left.issues : right.count - left.count) ||
        (left.phrase < right.phrase ? -1 : 1),
    )
    .slice(0, limit);
}

function truncate(text, length = 150) {
  return text.length <= length ? text : `${text.slice(0, length - 1)}…`;
}

// One edit apart, and the edit is not in the last two characters — that filter
// removes the plural/tense noise ("contexts" vs "context") and leaves real slips.
function isTypoOf(left, right) {
  if (Math.abs(left.length - right.length) > 1) return false;
  let index = 0;
  while (index < left.length && left[index] === right[index]) index += 1;
  let tail = 0;
  while (
    tail < left.length - index &&
    tail < right.length - index &&
    left.at(-1 - tail) === right.at(-1 - tail)
  ) {
    tail += 1;
  }
  if (left.length - index - tail > 1 || right.length - index - tail > 1) return false;
  return index < Math.min(left.length, right.length) - 2;
}

function mine(issues, options) {
  const parsed = issues.map((entry) => parseIssue(entry.issue, entry.source));
  const clean = parsed.filter((entry) => entry.ok);

  const sectionStats = [];
  const issueStats = [];
  const seenParagraphs = new Set();
  const firstSentences = [];
  const finalSentences = [];
  const initialNgrams = new Map();
  const closingNgrams = new Map();
  const phraseBank = new Map();
  const wordCounts = new Map();
  const markerTotals = markers.map(() => 0);
  const headings = { wholeLink: 0, splitLink: 0, plain: 0, examples: [] };
  const bullets = { wholeLink: 0, splitLink: 0, plain: 0, fixed: {}, examples: [] };
  const tagPairs = new Map();
  const summaryMatch = { exact: 0, shortened: 0, independent: 0, examples: [] };
  let colonLedes = 0;
  let multiParagraphSections = 0;

  for (const entry of clean) {
    let issueWords = 0;
    let issueSentences = 0;

    for (const bullet of entry.bullets) {
      const text = bullet.slice(2).trim();
      const fixed = /Open Source|AI Guidelines|\+ more/.test(stripLinks(text));
      if (fixed) {
        const key = stripLinks(text).replace(/\s+/g, ' ');
        bullets.fixed[key] = (bullets.fixed[key] ?? 0) + 1;
        continue;
      }
      if (/^\[[^\]]*\]\((?:<[^>]*>|[^\s)]*)\)$/.test(text)) bullets.wholeLink += 1;
      else if (countLinks(text) > 0) bullets.splitLink += 1;
      else bullets.plain += 1;
      if (bullets.examples.length < 24) bullets.examples.push(`- ${text}`);
    }

    for (const [index, tag] of entry.tags.entries()) {
      for (const other of entry.tags.slice(index + 1)) {
        const key = [tag, other].sort().join(' + ');
        tagPairs.set(key, (tagPairs.get(key) ?? 0) + 1);
      }
    }

    const summaryItems = entry.summary
      .replace(/\s*\+ more.*$/u, '')
      .split(', ')
      .map((item) => item.trim())
      .filter(Boolean);
    const headingTexts = entry.sections.map((section) => stripLinks(section.heading));
    for (const item of summaryItems) {
      const lower = item.toLowerCase();
      if (headingTexts.some((heading) => heading.toLowerCase() === lower)) summaryMatch.exact += 1;
      else if (
        headingTexts.some(
          (heading) =>
            heading.toLowerCase().includes(lower) || lower.includes(heading.toLowerCase()),
        )
      )
        summaryMatch.shortened += 1;
      else {
        summaryMatch.independent += 1;
        if (summaryMatch.examples.length < 12) {
          summaryMatch.examples.push(
            `#${entry.issue}: "${item}" vs headings [${headingTexts.join(' | ')}]`,
          );
        }
      }
    }

    for (const section of entry.sections) {
      const headingText = section.heading;
      if (/^\[[^\]]*\]\((?:<[^>]*>|[^\s)]*)\)$/.test(headingText)) headings.wholeLink += 1;
      else if (countLinks(headingText) > 0) {
        headings.splitLink += 1;
        if (headings.examples.length < 20)
          headings.examples.push(`#${entry.issue}: ## ${headingText}`);
      } else headings.plain += 1;

      if (section.paragraphs.length > 1) multiParagraphSections += 1;
      const markdown = section.paragraphs.join(' ');
      const prose = stripLinks(markdown);
      if (seenParagraphs.has(prose)) continue;
      seenParagraphs.add(prose);

      const sectionSentences = sentences(prose);
      const sectionTokens = tokens(prose);
      const stats = {
        issue: entry.issue,
        words: sectionTokens.length,
        sentences: sectionSentences.length,
        links: countLinks(markdown),
        commas: (prose.match(/,/g) ?? []).length,
      };
      sectionStats.push(stats);
      issueWords += stats.words;
      issueSentences += stats.sentences;

      const first = sectionSentences[0] ?? '';
      if (first.endsWith(':')) colonLedes += 1;
      firstSentences.push({ issue: entry.issue, text: first });
      const last = sectionSentences.at(-1) ?? '';
      finalSentences.push({ issue: entry.issue, text: last });
      addNgrams(closingNgrams, tokens(last), [3, 4, 5, 6], entry.issue);

      for (const sentence of sectionSentences) {
        addNgrams(initialNgrams, tokens(sentence).slice(0, 5), [2, 3, 4, 5], entry.issue, true);
      }

      addNgrams(phraseBank, sectionTokens, [3, 4, 5], entry.issue);
      for (const token of sectionTokens) {
        wordCounts.set(token, (wordCounts.get(token) ?? 0) + 1);
      }
      markers.forEach(([, pattern], index) => {
        markerTotals[index] += (prose.match(pattern) ?? []).length;
      });
    }

    issueStats.push({ issue: entry.issue, words: issueWords, sentences: issueSentences });
  }

  const sectionCount = sectionStats.length || 1;
  const contentWords = [...wordCounts.entries()]
    .filter(([word]) => !stopWords.has(word) && word.length > 2)
    .sort((left, right) => right[1] - left[1] || (left[0] < right[0] ? -1 : 1));
  const frequent = new Set(contentWords.filter(([, count]) => count >= 8).map(([word]) => word));
  const likelyTypos = [...wordCounts.entries()]
    .filter(([word, count]) => count <= 2 && word.length >= 6 && !frequent.has(word))
    .map(([word, count]) => {
      const near = [...frequent].filter((candidate) => isTypoOf(word, candidate)).sort();
      return near.length ? { word, count, near: near[0] } : null;
    })
    .filter(Boolean)
    .sort((left, right) => (left.word < right.word ? -1 : 1))
    .slice(0, 25);

  return {
    generatedFrom: {
      corpusDir: 'src/content/newsletter',
      requestedIssues: options.issues,
      issuesRead: parsed.length,
      issuesParsedClean: clean.length,
      issueRange: clean.length ? [clean.at(-1).issue, clean[0].issue] : [],
      failures: parsed
        .filter((entry) => !entry.ok)
        .map((entry) => ({ issue: entry.issue, reason: entry.reason })),
      sections: sectionStats.length,
      uniqueParagraphs: seenParagraphs.size,
      multiParagraphSections,
    },
    perSection: {
      words: quantiles(sectionStats.map((stats) => stats.words)),
      sentences: quantiles(sectionStats.map((stats) => stats.sentences)),
      links: quantiles(sectionStats.map((stats) => stats.links)),
      commas: quantiles(sectionStats.map((stats) => stats.commas)),
      sectionsPerIssue: quantiles(clean.map((entry) => entry.sections.length)),
    },
    perIssueArticleBlock: {
      words: quantiles(issueStats.map((stats) => stats.words)),
      sentences: quantiles(issueStats.map((stats) => stats.sentences)),
    },
    lede: {
      colonEndingFirstSentences: colonLedes,
      totalSections: sectionStats.length,
      colonFraction: Math.round((colonLedes / sectionCount) * 1000) / 1000,
      examples: firstSentences.slice(0, 20).map((item) => `#${item.issue}: ${truncate(item.text)}`),
    },
    sentenceInitialNgrams: Object.fromEntries(
      [2, 3, 4, 5].map((size) => [
        `n${size}`,
        rank(initialNgrams, {
          minCount: size <= 3 ? 3 : 2,
          minIssues: 2,
          limit: 25,
          by: 'count',
          size,
        }),
      ]),
    ),
    closing: {
      ngrams: rank(closingNgrams, { minCount: 2, minIssues: 2, limit: 40 }),
      finalSentences: finalSentences
        .slice(0, 25)
        .map((item) => `#${item.issue}: ${truncate(item.text)}`),
    },
    phraseBank: rank(phraseBank, { minCount: 3, minIssues: 3, limit: 80 }),
    markers: markers.map(([label], index) => ({
      marker: label,
      total: markerTotals[index],
      perSection: Math.round((markerTotals[index] / sectionCount) * 100) / 100,
    })),
    headings: {
      wholeLink: headings.wholeLink,
      splitLink: headings.splitLink,
      plain: headings.plain,
      splitExamples: headings.examples,
    },
    bullets: {
      wholeLink: bullets.wholeLink,
      splitLink: bullets.splitLink,
      plain: bullets.plain,
      fixedTrailing: Object.entries(bullets.fixed).sort(
        (left, right) => right[1] - left[1] || (left[0] < right[0] ? -1 : 1),
      ),
      examples: bullets.examples,
    },
    frontmatter: {
      summaryItemsMatchingHeadingExactly: summaryMatch.exact,
      summaryItemsShortenedOrExtendedHeading: summaryMatch.shortened,
      summaryItemsIndependent: summaryMatch.independent,
      independentExamples: summaryMatch.examples,
      tagCooccurrence: [...tagPairs.entries()].sort(
        (left, right) => right[1] - left[1] || (left[0] < right[0] ? -1 : 1),
      ),
    },
    vocabulary: {
      topContentWords: contentWords.slice(0, 60).map(([word, count]) => ({ word, count })),
      slopWords: slopWords.map((word) => ({ word, count: wordCounts.get(word) ?? 0 })),
      informalities: informalities.map((word) => ({ word, count: wordCounts.get(word) ?? 0 })),
      likelyTypos,
    },
  };
}

function table(rows, header) {
  const lines = [`| ${header.join(' | ')} |`, `| ${header.map(() => '---').join(' | ')} |`];
  for (const row of rows) lines.push(`| ${row.join(' | ')} |`);
  return lines.join('\n');
}

function statRow(label, stats) {
  return [label, stats.min, stats.median, stats.p90, stats.max, stats.mean];
}

function ngramLines(items) {
  return items.map((item) => `- \`${item.phrase}\` — ${item.count}x in ${item.issues} issues`);
}

function report(data) {
  const out = [];
  const push = (...lines) => out.push(...lines, '');
  push('# Newsletter style corpus');
  push(
    `Issues read: ${data.generatedFrom.issuesRead}; parsed clean: ${data.generatedFrom.issuesParsedClean}` +
      ` (range ${data.generatedFrom.issueRange.join('-')}); article sections: ${data.generatedFrom.sections};` +
      ` unique paragraphs: ${data.generatedFrom.uniqueParagraphs};` +
      ` multi-paragraph sections: ${data.generatedFrom.multiParagraphSections}.`,
  );
  if (data.generatedFrom.failures.length) {
    push('## Parse failures');
    push(...data.generatedFrom.failures.map((item) => `- issue ${item.issue}: ${item.reason}`));
  }

  push('## Shape');
  push(
    table(
      [
        statRow('section words', data.perSection.words),
        statRow('section sentences', data.perSection.sentences),
        statRow('section links', data.perSection.links),
        statRow('section commas', data.perSection.commas),
        statRow('sections per issue', data.perSection.sectionsPerIssue),
        statRow('issue article words', data.perIssueArticleBlock.words),
        statRow('issue article sentences', data.perIssueArticleBlock.sentences),
      ],
      ['metric', 'min', 'median', 'p90', 'max', 'mean'],
    ),
  );

  push('## Lede shape');
  push(
    `First sentence ends with \`:\` in ${data.lede.colonEndingFirstSentences}/${data.lede.totalSections} sections (${Math.round(data.lede.colonFraction * 100)}%).`,
  );
  push(...data.lede.examples.map((line) => `- ${line}`));

  push('## Sentence-initial n-grams');
  for (const size of [2, 3, 4, 5]) {
    push(`### n=${size}`);
    push(...ngramLines(data.sentenceInitialNgrams[`n${size}`]));
  }

  push('## Closing moves');
  push(...ngramLines(data.closing.ngrams));
  push('### Final sentences (verbatim)');
  push(...data.closing.finalSentences.map((line) => `- ${line}`));

  push('## Phrase bank (>=3 uses in >=3 issues)');
  push(...ngramLines(data.phraseBank));

  push('## Editorial markers');
  push(
    table(
      data.markers.map((item) => [item.marker, item.total, item.perSection]),
      ['marker', 'total', 'per section'],
    ),
  );

  push('## Heading patterns');
  push(
    `Whole-heading link: ${data.headings.wholeLink}; split-link heading: ${data.headings.splitLink}; no link: ${data.headings.plain}.`,
  );
  push(...data.headings.splitExamples.map((line) => `- ${line}`));

  push('## "This week in" bullets');
  push(
    `Whole-title link: ${data.bullets.wholeLink}; split-title link: ${data.bullets.splitLink}; no link: ${data.bullets.plain}.`,
  );
  push('### Fixed trailing bullets');
  push(...data.bullets.fixedTrailing.map(([text, count]) => `- \`${text}\` — ${count}x`));
  push('### Examples');
  push(...data.bullets.examples.map((line) => `- \`${line}\``));

  push('## Frontmatter');
  push(
    `Summary items equal to a heading: ${data.frontmatter.summaryItemsMatchingHeadingExactly};` +
      ` shortened/extended heading: ${data.frontmatter.summaryItemsShortenedOrExtendedHeading};` +
      ` independent: ${data.frontmatter.summaryItemsIndependent}.`,
  );
  push(...data.frontmatter.independentExamples.map((line) => `- ${line}`));
  push('### Tag co-occurrence');
  push(...data.frontmatter.tagCooccurrence.map(([pair, count]) => `- ${pair} — ${count}x`));

  push('## Vocabulary');
  push(
    `Top content words: ${data.vocabulary.topContentWords.map((item) => `${item.word} (${item.count})`).join(', ')}.`,
  );
  push('### LLM-slop candidates');
  push(...data.vocabulary.slopWords.map((item) => `- \`${item.word}\` — ${item.count}`));
  push('### Informalities');
  push(...data.vocabulary.informalities.map((item) => `- \`${item.word}\` — ${item.count}`));
  push('### Likely typos (rare word one edit from a frequent one)');
  push(
    ...data.vocabulary.likelyTypos.map(
      (item) => `- \`${item.word}\` (${item.count}) vs \`${item.near}\``,
    ),
  );

  return `${out
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()}\n`;
}

function allowedTags() {
  const source = readFileSync(join(repoRoot, 'src/content.config.ts'), 'utf8');
  const block = /export const NEWSLETTER_TAGS = \[([\s\S]*?)\]/.exec(source);
  if (!block) throw new Error('could not find NEWSLETTER_TAGS in src/content.config.ts');
  return new Set([...block[1].matchAll(/'([^']+)'/g)].map((match) => match[1]));
}

function ledeType(first) {
  if (first.endsWith(':')) return 'colon';
  if (first.endsWith('!')) return 'exclamation';
  if (first.endsWith('?')) return 'question';
  return 'plain';
}

function lint(file, source) {
  const parsed = parseIssue(file.replace(/^.*\//, ''), source);
  if (!parsed.ok) throw new Error(`cannot lint ${file}: ${parsed.reason}`);

  const findings = [];
  const fail = (check, detail) => findings.push({ level: 'error', check, detail });
  const warn = (check, detail) => findings.push({ level: 'warn', check, detail });

  const rows = [];
  let totalWords = 0;
  let totalExclamations = 0;
  let totalSemicolons = 0;
  let colonLedes = 0;

  for (const section of parsed.sections) {
    const title = stripLinks(section.heading);
    const markdown = section.paragraphs.join(' ');
    const prose = stripLinks(markdown);
    const sectionSentences = sentences(prose);
    const words = tokens(prose).length;
    const links = countLinks(markdown);
    const exclamations = (prose.match(/!/g) ?? []).length;
    const semicolons = (prose.match(/;/g) ?? []).length;
    const lede = ledeType(sectionSentences[0] ?? '');

    totalWords += words;
    totalExclamations += exclamations;
    totalSemicolons += semicolons;
    if (lede === 'colon') colonLedes += 1;

    rows.push([
      truncate(title, 44),
      words,
      sectionSentences.length,
      (prose.match(/,/g) ?? []).length,
      exclamations,
      semicolons,
      links,
      lede,
    ]);

    for (const word of bannedWords) {
      if (new RegExp(`\\b${word}\\b`, 'i').test(prose))
        fail('banned-word', `"${word}" in ${title}`);
    }
    for (const word of rareWords) {
      if (new RegExp(`\\b${word}\\b`, 'i').test(prose))
        warn('rare-word', `"${word}" in ${title} — under 12 uses in 198 corpus sections`);
    }
    if (!wholeLink.test(section.heading))
      fail('heading-link', `heading does not wrap the whole title in one link: ${section.heading}`);
    for (const block of section.nonProse) {
      const kind = block.startsWith('>')
        ? 'block quote'
        : block.startsWith('#')
          ? 'sub-heading'
          : 'bullet list';
      const level = block.startsWith('>') ? warn : fail;
      level('section-structure', `${kind} inside ${title}: ${truncate(block, 60)}`);
    }
    if (words < limits.sectionWords[0] || words > limits.sectionWords[1])
      warn(
        'section-words',
        `${title}: ${words} words, corpus range ${limits.sectionWords.join('-')}`,
      );
    if (links > limits.sectionLinks)
      warn('section-links', `${title}: ${links} in-prose links, corpus median 0 / p90 1`);
  }

  const listBullets = parsed.bullets.map((bullet) => bullet.slice(2).trim());
  const trailing = listBullets.slice(-fixedTrailingBullets.length);
  for (const [index, expected] of fixedTrailingBullets.entries()) {
    if (trailing[index] !== expected)
      fail(
        'fixed-bullets',
        `expected \`- ${expected}\`, got \`- ${trailing[index] ?? '(missing)'}\``,
      );
  }
  for (const bullet of listBullets.slice(0, -fixedTrailingBullets.length)) {
    if (wholeLink.test(bullet))
      fail('bullet-link', `weekly bullet links the whole phrase, corpus splits 199/199: ${bullet}`);
  }

  for (const [index, line] of source.split('\n').entries()) {
    if (/\bTODO\b/.test(line)) fail('todo-placeholder', `line ${index + 1}: ${truncate(line, 60)}`);
  }

  const headingTexts = parsed.sections.map((section) => stripLinks(section.heading));
  const expectedSummary = `${headingTexts.join(', ')} + more 🚀`;
  if (parsed.summary !== expectedSummary) {
    const items = parsed.summary
      .replace(/\s*\+ more.*$/u, '')
      .split(', ')
      .map((item) => item.trim())
      .filter(Boolean);
    if (!/\+ more 🚀$/u.test(parsed.summary))
      fail('summary-format', 'summary does not end with " + more 🚀"');
    if (items.length !== headingTexts.length)
      fail(
        'summary-format',
        `summary has ${items.length} items, the issue has ${headingTexts.length} headings`,
      );
    for (const [index, item] of items.entries()) {
      const heading = headingTexts[index];
      if (heading === undefined || item === heading) continue;
      warn('summary-heading', `item ${index + 1} "${item}" != heading "${heading}"`);
    }
  }

  const enumTags = allowedTags();
  if (parsed.tags.length > 3) fail('tags', `${parsed.tags.length} tags, at most 3 allowed`);
  for (const tag of parsed.tags) {
    if (!enumTags.has(tag)) fail('tags', `"${tag}" is not in the NEWSLETTER_TAGS enum`);
  }

  const count = parsed.sections.length;
  if (totalWords < limits.issueWords[0] || totalWords > limits.issueWords[1])
    warn('issue-words', `${totalWords} words of article prose, corpus mean ~789 (want 600-1000)`);
  if (colonLedes < limits.colonLedes[0] || colonLedes > limits.colonLedes[1])
    warn('colon-ledes', `${colonLedes}/${count} colon ledes, corpus rate 58% (want 2-4)`);

  const wantExclamations = limits.exclamationsPerSection * count;
  if (totalExclamations < wantExclamations / 2)
    warn(
      'exclamations',
      `${totalExclamations} in article prose, corpus expects ~${wantExclamations.toFixed(1)} ` +
        `(0.92/section) — add them mid-paragraph, not only in ledes`,
    );
  const wantSemicolons = limits.semicolonsPerSection * count;
  if (totalSemicolons < wantSemicolons / 2)
    warn(
      'semicolons',
      `${totalSemicolons} in article prose, corpus expects ~${wantSemicolons.toFixed(1)} ` +
        `(0.69/section) — the semicolon joins a claim to its consequence, mid-paragraph`,
    );

  return { rows, findings };
}

function lintReport(file, { rows, findings }) {
  const lines = [
    `# Style lint: ${file}`,
    '',
    table(rows, ['section', 'words', 'sentences', 'commas', '!', ';', 'links', 'lede']),
    '',
  ];
  const errors = findings.filter((finding) => finding.level === 'error');
  for (const finding of [...errors, ...findings.filter((finding) => finding.level === 'warn')]) {
    lines.push(`${finding.level.padEnd(5)}  ${finding.check}  ${finding.detail}`);
  }
  if (findings.length) lines.push('');
  lines.push(`${errors.length} errors, ${findings.length - errors.length} warnings`);
  return { text: lines.join('\n'), errors: errors.length };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.lint) {
    const result = lintReport(
      options.lint.replace(`${repoRoot}/`, ''),
      lint(options.lint, readFileSync(options.lint, 'utf8')),
    );
    console.log(result.text);
    process.exitCode = result.errors ? 1 : 0;
    return;
  }
  const files = readdirSync(corpusDir)
    .map((name) => /^(\d+)\.md$/.exec(name))
    .filter(Boolean)
    .map((match) => Number(match[1]))
    .sort((left, right) => right - left)
    .slice(0, options.issues);
  if (!files.length) throw new Error(`no issues found in ${corpusDir}`);

  const issues = files.map((issue) => ({
    issue,
    source: readFileSync(join(corpusDir, `${issue}.md`), 'utf8'),
  }));
  const data = mine(issues, options);

  mkdirSync(options.out, { recursive: true });
  writeFileSync(join(options.out, 'style-corpus.json'), `${JSON.stringify(data, null, 2)}\n`);
  writeFileSync(join(options.out, 'style-report.md'), report(data));

  const stats = data.generatedFrom;
  console.log(
    `Parsed ${stats.issuesParsedClean}/${stats.issuesRead} issues cleanly ` +
      `(${stats.issueRange.join('-')}), ${stats.sections} article sections, ` +
      `${stats.uniqueParagraphs} unique paragraphs.`,
  );
  console.log(
    `Lede colon rate ${Math.round(data.lede.colonFraction * 100)}%; ` +
      `median section ${data.perSection.words.median} words / ${data.perSection.sentences.median} sentences.`,
  );
  console.log(`Wrote ${join(options.out, 'style-corpus.json')} and style-report.md`);
}

main();
