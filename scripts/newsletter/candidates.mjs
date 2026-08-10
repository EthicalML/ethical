#!/usr/bin/env node

import { Buffer } from 'node:buffer';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const issuesDir = process.env.NEWSLETTER_ISSUES_DIR ?? join(repoRoot, 'src/content/newsletter');
const poolPath =
  process.env.NEWSLETTER_POOL ?? join(repoRoot, 'scripts/newsletter/data/candidates.json');
const reportPath = join(repoRoot, 'tmp/newsletter-candidates.md');
// `search` ranks by popularity, `search_by_date` by recency. Fetching is done
// one day at a time against `search`, so each request returns that day's top
// stories rather than the week's.
const algoliaEndpoint = 'https://hn.algolia.com/api/v1/search';
const redditTokenEndpoint = 'https://www.reddit.com/api/v1/access_token';
const redditApiBase = 'https://oauth.reddit.com';
// Reddit rejects generic user agents, so identify the script explicitly.
const redditUserAgent = 'node:ethical-institute-newsletter-candidates:1.0 (by /u/axsaucedo)';
// Subreddits polled by the reddit source. Plain list on purpose: edit freely.
// Overridable per run with `--subreddits a,b,c`.
const subreddits = ['MachineLearning', 'programming', 'cpp', 'Python'];
// Backlog ceiling: roughly three months of waiting candidates at ~115/week.
const maxPool = 400;
// How many recent issues are scanned for repeated SUBJECTS (see
// recentlyCoveredIn). Roughly three months of coverage.
const recentIssuesWindow = 12;

// Hand-picked publisher feeds, so authoritative blogs are picked up even when
// they never trend on Hacker News. Plain table on purpose: edit freely.
//   type 'rss'     — RSS or Atom, parsed with the regex reader below.
//   type 'scrape'  — plain HTML fetch; `pattern` matches article hrefs.
//   type 'browser' — HTML only rendered by JS (or a fetch the host rejects);
//                    needs Playwright, and is skipped if it is unavailable.
// Feed items carry no popularity score, which is fine: points are a discovery
// signal for HN/Reddit, never a selection criterion.
const feeds = [
  { name: 'netflix-tech', url: 'https://netflixtechblog.com/feed', type: 'rss' },
  { name: 'simon-willison', url: 'https://simonwillison.net/atom/everything/', type: 'rss' },
  { name: 'raschka', url: 'https://magazine.sebastianraschka.com/feed', type: 'rss' },
  { name: 'huggingface', url: 'https://huggingface.co/blog/feed.xml', type: 'rss' },
  { name: 'openai', url: 'https://openai.com/news/rss.xml', type: 'rss' },
  { name: 'deepmind', url: 'https://deepmind.google/blog/rss.xml', type: 'rss' },
  { name: 'google-research', url: 'https://research.google/blog/rss/', type: 'rss' },
  { name: 'databricks', url: 'https://databricks.com/feed', type: 'rss' },
  { name: 'modular', url: 'https://modular.com/blog/rss.xml', type: 'rss' },
  { name: 'cloudflare', url: 'https://blog.cloudflare.com/rss/', type: 'rss' },
  { name: 'meta-eng', url: 'https://engineering.fb.com/feed/', type: 'rss' },
  { name: 'pinterest-eng', url: 'https://medium.com/feed/pinterest-engineering', type: 'rss' },
  { name: 'vllm', url: 'https://vllm.ai/blog/rss.xml', type: 'rss' },
  { name: 'langchain', url: 'https://www.langchain.com/blog/rss.xml', type: 'rss' },
  { name: 'latent-space', url: 'https://www.latent.space/feed', type: 'rss' },
  { name: 'interconnects', url: 'https://www.interconnects.ai/feed', type: 'rss' },
  { name: 'nvidia-dev', url: 'https://developer.nvidia.com/blog/feed', type: 'rss' },
  { name: 'hamel', url: 'https://hamel.dev/index.xml', type: 'rss' },
  {
    name: 'anthropic-news',
    url: 'https://www.anthropic.com/news',
    type: 'scrape',
    pattern: /\/news\/[a-z0-9-]+/g,
  },
  {
    name: 'anthropic-eng',
    url: 'https://www.anthropic.com/engineering',
    type: 'scrape',
    pattern: /\/engineering\/[a-z0-9-]+/g,
  },
  {
    name: 'mlops-community',
    url: 'https://mlops.community/blog/',
    type: 'scrape',
    pattern: /\/blog\/[a-z0-9-]+/g,
  },
  {
    name: 'uber-eng',
    url: 'https://www.uber.com/en-GB/blog/engineering/',
    type: 'browser',
    pattern: /\/blog\/([a-z0-9-]+)\/?$/,
  },
];

// Uber's blog index links its own category pages with the same `/blog/<slug>/`
// shape as an article, so they are excluded by name.
const uberCategorySlugs = new Set([
  'advertising',
  'merchants',
  'business',
  'health',
  'higher-education',
  'transit',
  'engineering',
  'community-support',
  'careers',
  'products',
  'data',
  'ai',
  'safety',
  'sustainability',
]);

// Playwright is not a dependency of this repo, so the `browser` feed type has
// to find it. Resolution order: an explicit override, then a normal install,
// then the npx cache the verify scripts also draw on. The npx directory is
// content-hashed, so it is searched rather than hardcoded: the hash changes
// whenever npx re-resolves, and a pinned one silently rots.
function resolvePlaywright() {
  if (process.env.NEWSLETTER_PLAYWRIGHT) return [process.env.NEWSLETTER_PLAYWRIGHT];
  const npxCache = join(process.env.HOME ?? '', '.npm/_npx');
  const cached = existsSync(npxCache)
    ? readdirSync(npxCache)
        .map((hash) => join(npxCache, hash, 'node_modules/playwright/index.js'))
        .filter((candidate) => existsSync(candidate))
    : [];
  return ['playwright', ...cached];
}

// Relevance keywords, in two tiers. Matched with word boundaries against
// "<title> <host>", lowercased. Plain lists on purpose: edit freely, one term
// per line.
//
// Strong: proves a technical ML/data/systems story on its own — a match here
// makes an entry relevant wherever it was published.
const strongKeywords = [
  'agentic',
  'alignment',
  'anthropic',
  'arxiv.org',
  'arrow',
  'attention',
  'bert',
  'claude',
  'clickhouse',
  'compiler',
  'compilers',
  'cuda',
  'curriculum',
  'data engineering',
  'data warehouse',
  'deep learning',
  'deepseek',
  'diffusion',
  'distributed systems',
  'duckdb',
  'embedding',
  'embeddings',
  'feature store',
  'fine-tuning',
  'finetuning',
  'gemini',
  'gpt',
  'gpu',
  'gpus',
  'huggingface',
  'inference',
  'kafka',
  'kernel',
  'kubeflow',
  'lakehouse',
  'langchain',
  'lecture series',
  'llama',
  'llm',
  'llm-generated',
  'llms',
  'machine learning',
  'mcp',
  'mistral',
  'mlops',
  'moe',
  'neural',
  'nvidia',
  'olap',
  'openai',
  'pandas',
  'parquet',
  'polars',
  'postgres',
  'postgresql',
  'pytorch',
  'quantization',
  'query engine',
  'qwen',
  'rag',
  'recommender',
  'reinforcement learning',
  'rlhf',
  'serving',
  'spark',
  'tensor',
  'tensorflow',
  'tokenizer',
  'transformer',
  'transformers',
  'triton',
  'vector database',
  'vector db',
  'vllm',
  'wasm',
];

// Weak: ubiquitous in 2026 headlines and prove nothing on their own. A
// weak-only match is relevant only on a technical host (see isTechnicalHost).
const weakKeywords = [
  'ai',
  'agent',
  'agents',
  'benchmark',
  'dataset',
  'ml',
  'model',
  'models',
  'pipeline',
  'prompt',
  'reasoning',
  'safety',
  'tokens',
  'training',
];

function keywordRegex(words) {
  return new RegExp(
    `(?:^|[^a-z0-9])(?:${words.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?:$|[^a-z0-9])`,
    'i',
  );
}

const strongPattern = keywordRegex(strongKeywords);
const weakPattern = keywordRegex(weakKeywords);

// Teaching material is a strong signal by shape rather than by vocabulary.
const teachingPattern = /\b(course|lecture|cs\d{3})\b/i;

// Corporate EVENTS: who bought whom, who raised what, who is suing whom. Not
// business *topics* — cost, pricing and efficiency words are deliberately
// absent, so an engineering piece about spend still reads as engineering.
const corporateEventPattern =
  /\b(?:acquires|acquired by|acquisition|merger|buys|funding round|seed round|valuation|ipo|layoffs?|lays off|laid off|job cuts|steps down|resigns?|appoints?|names new ceo|lawsuits?|sues|sued|antitrust|settlement|series [a-e])\b|\braise[sd] \$/i;

// Words that carry no subject on their own. Used both by the near-duplicate
// heading check and by the significant-bigram extraction below, where they are
// what stops a generic pair like "new model" from matching everything. Plain
// list on purpose: edit freely.
const titleStopWords = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'best',
  'better',
  'big',
  'but',
  'by',
  'can',
  'first',
  'for',
  'from',
  'get',
  'good',
  'great',
  'guide',
  'how',
  'in',
  'into',
  'is',
  'it',
  'its',
  'just',
  // Head nouns generic enough that a pair built from them ("foundation model",
  // "open-weights model") says nothing about which story it is.
  'model',
  'models',
  'more',
  'most',
  'new',
  'next',
  'not',
  'now',
  'of',
  'on',
  'one',
  'open',
  'or',
  'other',
  'our',
  'out',
  'over',
  'part',
  'that',
  'the',
  'their',
  'this',
  'to',
  'top',
  'up',
  'use',
  'used',
  'using',
  'via',
  'was',
  'we',
  'week',
  'what',
  'when',
  'why',
  'will',
  'with',
  'you',
  'your',
]);

function normaliseUrl(rawUrl) {
  try {
    const url = new URL(rawUrl.trim());
    const host = url.host.toLowerCase().replace(/^www\./, '');
    const params = [...url.searchParams.entries()].filter(
      ([key]) => !/^utm_/i.test(key) && key.toLowerCase() !== 'ref',
    );
    const query = params.length
      ? `?${params.map(([key, value]) => `${key}=${value}`).join('&')}`
      : '';
    const path = url.pathname.replace(/\/+$/, '');
    return `${host}${path}${query}`;
  } catch {
    return rawUrl.trim().toLowerCase();
  }
}

function hostOf(rawUrl) {
  try {
    return new URL(rawUrl).host.toLowerCase().replace(/^www\./, '');
  } catch {
    return '';
  }
}

// Parent identity for a host, so a "no two picks from the same company"
// check works even when hosts differ (blog vs cdn vs research subdomain).
// Unmapped hosts fall back to themselves (the registrable host we already
// store).
const companyByHost = {
  'openai.com': 'OpenAI',
  'cdn.openai.com': 'OpenAI',
  'anthropic.com': 'Anthropic',
  'claude.com': 'Anthropic',
  'blog.google': 'Google',
  'research.google': 'Google',
  'deepmind.google': 'Google',
  'cloud.google.com': 'Google',
  'developers.googleblog.com': 'Google',
  'ai.meta.com': 'Meta',
  'research.meta.ai': 'Meta',
  'engineering.fb.com': 'Meta',
  'qwen.ai': 'Qwen/Alibaba',
  'qwenlm.github.io': 'Qwen/Alibaba',
  'mistral.ai': 'Mistral',
  'huggingface.co': 'Hugging Face',
  'netflixtechblog.com': 'Netflix',
  'blog.cloudflare.com': 'Cloudflare',
  'databricks.com': 'Databricks',
};

function companyOf(host) {
  return companyByHost[host] ?? host;
}

// URLs that belong to the newsletter author, so self-promotion can be
// excluded by default. Edit this list, not the matcher below.
const ownProjectHosts = ['ethical.institute', 'axsaucedo.github.io', 'forms.gle'];
const ownProjectGithubOwners = ['EthicalML', 'axsaucedo', 'KomputeProject'];

function isOwnProject(rawUrl, host) {
  if (ownProjectHosts.includes(host)) return true;
  const githubOwner =
    host === 'github.com' ? rawUrl.split('github.com/')[1]?.split('/')[0] : undefined;
  if (githubOwner && ownProjectGithubOwners.includes(githubOwner)) return true;
  // Any "kaos" URL under one of the author's own hosts/owners (e.g. a KAOS
  // doc page or repo not caught by the exact-path checks above).
  if (/kaos/i.test(rawUrl) && (ownProjectHosts.includes(host) || Boolean(githubOwner))) return true;
  return false;
}

// General-press hosts: third parties reporting on AI, not the vendor/author
// itself. Used both for `kind` (-> news) and `firstParty` (-> false).
const generalPressHosts = [
  'theregister.com',
  'techcrunch.com',
  'wired.com',
  'fastcompany.com',
  'businessinsider.com',
  'economist.com',
  'cnbc.com',
  'reuters.com',
  'bloomberg.com',
  'forbes.com',
  'arstechnica.com',
  'theverge.com',
];

// Aggregator hosts: also not first-party, but not "news" either (they
// collate/rank rather than report).
const aggregatorHosts = ['artificialanalysis.ai'];

// Hosts that mostly POINT at an artifact rather than being one: a LinkedIn
// post about a repo, an HN thread about a paper. Manually added URLs on these
// hosts are flagged `isPointer` so the artifact is resolved before use. The
// link is never followed automatically — LinkedIn obfuscates its outbound
// URLs, and guessing is worse than saying so.
const pointerHosts = new Set([
  'linkedin.com',
  'x.com',
  'twitter.com',
  'bsky.app',
  'mastodon.social',
  'news.ycombinator.com',
  'reddit.com',
]);

function isFirstParty(host) {
  return !generalPressHosts.includes(host) && !aggregatorHosts.includes(host);
}

// Hosts known to belong to a model vendor, for the release-pattern check
// below (avoids "Foo Bar v2 is out" on a random blog being tagged
// model-release).
const modelVendorHosts = new Set([
  'openai.com',
  'cdn.openai.com',
  'anthropic.com',
  'claude.com',
  'blog.google',
  'research.google',
  'deepmind.google',
  'ai.meta.com',
  'research.meta.ai',
  'qwen.ai',
  'qwenlm.github.io',
  'mistral.ai',
  'huggingface.co',
]);

const kindPatterns = {
  researchPaper: /arxiv\.org|openreview/i,
  video: /^(youtube\.com|youtu\.be)$/i,
  release: /\b(release[sd]?|launch(es|ed)?|announc(e|es|ed|ing)|introducing|is out)\b/i,
  // Model names glue the digits straight onto the name ("qwen3.8-max",
  // "gpt5"), so there's no word boundary between letters and the number to
  // anchor a \b on — matched without one, on a known model-vendor host only.
  modelVersionNumber: /\d+(\.\d+)+/,
  security: /\b(cve-|vulnerabilit(y|ies)|exploit|attack|breach|jailbreak|malware|security)\b/i,
  // A bare `v\d+` used to match product names like "V8 isolates" as a version
  // number, so a dotted version is required and the plain-word signals carry
  // the rest.
  tooling: /\b(release[sd]?|open source|library|framework|toolkit|sdk|cli)\b|\bv\d+\.\d+/i,
  education: /\b(course|tutorial|guide|awesome-|papers|curriculum|handbook|learn )\b/i,
  report: /\b(state of|survey|report|benchmark|index|we analy[sz]ed)\b/i,
  companyEngHost: /^(blog\.|research\.)|techblog|^engineering\./i,
  // Third-party evaluators publish results about someone else's model. That is
  // a report, not a release, and never a first-party source for it.
  evaluatorHost: /^(arcprize\.org|artificialanalysis\.ai|lmarena\.ai|epoch\.ai)$/i,
  opinion: /\b(why |how i |stop |the case for|considered harmful|is dead|lessons)\b|thoughts on/i,
};

// Hosts that are technical by construction rather than by table: the research
// and code commons, plus every publisher already configured as a feed.
// youtube counts because it is the corpus's single most-used source: 29 of the
// 300 article sections in issues 340-398 are talks, courses and documentaries.
// Without it a conference talk titled "Production ML across 2015-2035" matches
// only the weak keyword "ml" and is dropped before anyone sees it.
const technicalHosts = new Set([
  'arxiv.org',
  'openreview.net',
  'github.com',
  'huggingface.co',
  'youtube.com',
  'youtu.be',
]);
const feedHosts = new Set(feeds.map((feed) => hostOf(feed.url)).filter(Boolean));

// A host that publishes engineering. Reuses the tables above rather than
// keeping a second list of the same names in sync.
function isTechnicalHost(host) {
  if (!host) return false;
  if (companyByHost[host] || modelVendorHosts.has(host)) return true;
  if (technicalHosts.has(host) || feedHosts.has(host)) return true;
  if (host.endsWith('.edu')) return true;
  return kindPatterns.companyEngHost.test(host);
}

// `kind` is a heuristic HINT for the selecting agent, not a verdict — titles
// are short and ambiguous, so treat mismatches as expected noise and keep
// every pattern list above editable in one place rather than "fixing" this
// function with more special cases.
function classifyKind(title, host) {
  const text = title.toLowerCase();
  // Corporate events are news wherever they are published, including on a
  // vendor's own blog.
  if (corporateEventPattern.test(text)) return 'news';
  if (kindPatterns.researchPaper.test(host)) return 'research-paper';
  if (kindPatterns.video.test(host)) return 'video';
  if (generalPressHosts.includes(host)) return 'news';
  if (kindPatterns.evaluatorHost.test(host)) return 'report';
  if (
    modelVendorHosts.has(host) &&
    (kindPatterns.release.test(text) || kindPatterns.modelVersionNumber.test(text))
  )
    return 'model-release';
  if (kindPatterns.security.test(text)) return 'security';
  if (host === 'github.com' || kindPatterns.tooling.test(text)) return 'tooling';
  if (kindPatterns.education.test(text)) return 'education';
  if (kindPatterns.report.test(text)) return 'report';
  // A known company's own domain writing about anything else is still that
  // company writing, which beats leaving it unknown.
  if (kindPatterns.companyEngHost.test(host) || companyByHost[host]) return 'company-eng';
  if (kindPatterns.opinion.test(text)) return 'opinion';
  return 'unknown';
}

function issueFiles() {
  if (!existsSync(issuesDir)) return [];
  return readdirSync(issuesDir)
    .filter((name) => /^\d+\.md$/.test(name))
    .map((name) => ({ issue: Number(name.replace('.md', '')), path: join(issuesDir, name) }))
    .sort((left, right) => left.issue - right.issue);
}

/**
 * The subject lines of one issue: the article-section headings (`## [Title](url)`)
 * plus the frontmatter `summary`. The summary is one comma-separated list of
 * that issue's headlines, so it is split on commas — otherwise a bigram would
 * straddle two unrelated stories.
 */
function issueSubjectTexts(markdown) {
  const texts = [];
  for (const match of markdown.matchAll(/^##\s+\[([^\]]+)\]\(/gm)) texts.push(match[1]);
  const summary = markdown.match(/^summary:\s*(.+)$/m)?.[1] ?? '';
  texts.push(...summary.replace(/^['"]|['"]$/g, '').split(','));
  return texts;
}

/**
 * Adjacent word pairs that name a subject: neither word is a stop word and at
 * least one is longer than two characters. Pairs are taken over the raw token
 * sequence rather than over the filtered one, so a stop word breaks the chain
 * instead of gluing its neighbours together ("Opus 5 is OUT" gives "opus 5",
 * never "5 out").
 */
function significantBigrams(text) {
  const tokens = text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .toLowerCase()
    // Possessives, before punctuation goes: otherwise "DeepMind's WeatherNext"
    // leaves a stray "s" token and the bigram "deepmind s" matches every other
    // DeepMind headline.
    .replace(/['’]s\b/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const bigrams = [];
  for (let index = 0; index + 1 < tokens.length; index += 1) {
    const [left, right] = [tokens[index], tokens[index + 1]];
    if (titleStopWords.has(left) || titleStopWords.has(right)) continue;
    if (left.length <= 2 && right.length <= 2) continue;
    bigrams.push(`${left} ${right}`);
  }
  return bigrams;
}

// Every URL the newsletter has ever linked: markdown links `](url)` /
// `](<url>)` plus bare angle-bracket links `<url>`, plus (for the last
// `recentIssuesWindow` issues only) a map of significant bigram -> the most
// recent issue whose subjects contained it.
function readCorpus() {
  const used = new Set();
  // Same URLs, keyed to the issue that linked them, so `add` can name the
  // issue in its warning. Files are read oldest first, so a later issue wins.
  const usedIn = new Map();
  const headings = [];
  const recentBigrams = new Map();
  const files = issueFiles();
  const oldestRecent = files.length > recentIssuesWindow ? files.at(-recentIssuesWindow).issue : 0;
  for (const { issue, path } of files) {
    const markdown = readFileSync(path, 'utf8');
    if (issue >= oldestRecent) {
      for (const text of issueSubjectTexts(markdown)) {
        for (const bigram of significantBigrams(text)) {
          // Files are read oldest first, so a later issue always wins.
          recentBigrams.set(bigram, issue);
        }
      }
    }
    for (const match of markdown.matchAll(/\]\(\s*<?(https?:\/\/[^\s)>]+)>?\s*\)/g)) {
      used.add(normaliseUrl(match[1]));
      usedIn.set(normaliseUrl(match[1]), issue);
    }
    for (const match of markdown.matchAll(/<(https?:\/\/[^\s>]+)>/g)) {
      used.add(normaliseUrl(match[1]));
      usedIn.set(normaliseUrl(match[1]), issue);
    }
    for (const match of markdown.matchAll(/^#{2,3}\s+(.+)$/gm)) {
      headings.push({ issue, text: match[1] });
    }
  }
  return { used, usedIn, headings, recentBigrams };
}

/**
 * Subject-level recency, next to the URL-level dedupe: the same story reported
 * by a second publisher has a different URL, so only its words give it away.
 * Returns the most recent issue that shares a significant bigram with the
 * title, or null. Advisory only — the owner decides.
 */
function recentlyCoveredIn(title, recentBigrams) {
  let covered = null;
  for (const bigram of significantBigrams(title)) {
    const issue = recentBigrams.get(bigram);
    if (issue && (covered === null || issue > covered)) covered = issue;
  }
  return covered;
}

function titleTokens(text) {
  return new Set(
    text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((token) => token.length > 1 && !titleStopWords.has(token)),
  );
}

// Overlap = |A ∩ B| / max(|A|, |B|): symmetric, so only near-identical
// headings score above the 0.8 flag threshold.
function findSimilarHeading(title, headings) {
  const tokens = titleTokens(title);
  if (tokens.size < 3) return undefined;
  for (const heading of headings) {
    const other = titleTokens(heading.text);
    if (other.size < 3) continue;
    let shared = 0;
    for (const token of tokens) if (other.has(token)) shared += 1;
    if (shared / Math.max(tokens.size, other.size) > 0.8) return heading;
  }
  return undefined;
}

/**
 * Two-tier relevance. A strong keyword (or a teaching-shaped title, or a
 * university host) carries an entry on its own; the ubiquitous words only count
 * when the publisher is already technical. Without the second tier the bare
 * word "ai" admitted most of the general press.
 */
function isRelevant(title, host) {
  const text = `${title} ${host}`.toLowerCase();
  if (strongPattern.test(text)) return true;
  if (teachingPattern.test(title)) return true;
  // A university host is a weak signal on its own: `.edu` covers every
  // department's page, so unqualified it admitted a 1950 short story and a
  // solar physics bulletin. It counts only alongside a subject keyword.
  if (weakPattern.test(text)) return isTechnicalHost(host) || host.endsWith('.edu');
  return false;
}

// Feed items have no popularity score at all, which is different from scoring
// zero, so `points` is null for them and every ranking path orders them by
// recency instead.
function isScored(entry) {
  return typeof entry.points === 'number';
}

// Score = points with a mild recency boost: a story published today counts for
// 1.5x its points, decaying with a one-week half-life-ish exponential so a
// week-old story is worth roughly 1.18x. Points still dominate. Unscored
// entries have no score; null says so rather than pretending they scored 0.
function score(entry, now) {
  if (!isScored(entry)) return null;
  const ageDays = Math.max(0, (now - Date.parse(entry.createdAt)) / 86400000);
  return entry.points * (1 + 0.5 * Math.exp(-ageDays / 7));
}

function ageInDays(entry, now) {
  return Math.max(0, (now - Date.parse(entry.createdAt)) / 86400000);
}

/**
 * One ordering over two incomparable populations. Scored entries rank by
 * score, unscored ones by recency; a feed post's date says nothing about how a
 * 300-point HN story should rank against it, so neither ordering can be
 * extended over the other. Each group is ranked internally and the two are
 * merged on relative rank (position / group size), which interleaves them in
 * proportion: whatever is trimmed or truncated takes the lowest-scoring scored
 * entries and the oldest unscored ones at the same rate.
 */
function rankEntries(entries, now) {
  const scored = entries
    .filter((entry) => isScored(entry))
    .sort((left, right) => score(right, now) - score(left, now));
  const unscored = entries
    .filter((entry) => !isScored(entry))
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));
  const withRank = [
    ...scored.map((entry, index) => ({ entry, rank: (index + 1) / scored.length })),
    ...unscored.map((entry, index) => ({ entry, rank: (index + 1) / unscored.length })),
  ];
  return withRank.sort((left, right) => left.rank - right.rank).map((item) => item.entry);
}

async function fetchHnDay(from, to, perDay, minPoints) {
  const url =
    `${algoliaEndpoint}?tags=story&hitsPerPage=${perDay}` +
    `&numericFilters=created_at_i>=${from},created_at_i<${to},points>=${minPoints}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

/**
 * One request per day, each returning that day's top `perDay` stories.
 *
 * A single week-wide query ranked by points is biased towards the oldest day in
 * the window, because points accumulate with age: a Monday story outranks a
 * Friday story on nothing but having existed longer. Per-day windows remove
 * that bias, and keep every request far below the API's page ceiling.
 *
 * Days are rolling 24-hour windows counted back from now, so the result does
 * not depend on the caller's timezone.
 */
async function fetchHn({ days, perDay, minPoints }) {
  const now = Math.floor(Date.now() / 1000);
  const hits = [];
  const perDayCounts = [];
  let failures = 0;
  for (let day = 0; day < days; day += 1) {
    const to = now - day * 86400;
    const from = to - 86400;
    let payload;
    try {
      payload = await fetchHnDay(from, to, perDay, minPoints);
    } catch {
      try {
        payload = await fetchHnDay(from, to, perDay, minPoints);
      } catch (error) {
        failures += 1;
        console.error(`Day -${day} failed twice (${error.message}); skipping.`);
        perDayCounts.push(`-${day}:failed`);
        continue;
      }
    }
    const dayHits = payload.hits ?? [];
    for (const hit of dayHits) {
      const discussionUrl = `https://news.ycombinator.com/item?id=${hit.objectID}`;
      hits.push({
        id: `hn:${hit.objectID}`,
        title: hit.title ?? '',
        url: hit.url ?? discussionUrl,
        points: hit.points ?? 0,
        comments: hit.num_comments ?? 0,
        createdAt: hit.created_at,
        discussionUrl,
      });
    }
    // nbHits above perDay means the day had more qualifying stories than were
    // taken. That is the intended cap, but say so rather than truncate silently.
    const total = payload.nbHits ?? dayHits.length;
    perDayCounts.push(`-${day}:${dayHits.length}${total > dayHits.length ? `/${total}` : ''}`);
  }
  if (!hits.length) {
    throw new Error(
      `Hacker News API returned no stories (${failures} day failure(s)). No data was written.`,
    );
  }
  console.error(`Per day (taken/available): ${perDayCounts.join(' ')}`);
  return hits;
}

// Thrown when a source cannot run for a reason the user can fix (missing
// credentials). Other sources still run; only an all-sources-skipped run fails.
function skipError(message) {
  const error = new Error(message);
  error.skipSource = true;
  return error;
}

const redditCredentialsMessage =
  'Reddit skipped: set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET ' +
  '(run node with --env-file=.env to load them from the repo .env).';

// One client-credentials token per run, reused across every subreddit request.
async function fetchRedditToken() {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw skipError(redditCredentialsMessage);
  const response = await fetch(redditTokenEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': redditUserAgent,
    },
    body: 'grant_type=client_credentials',
  });
  if (!response.ok) throw new Error(`Reddit token request failed: HTTP ${response.status}`);
  const payload = await response.json();
  if (!payload.access_token) throw new Error('Reddit token request returned no access_token.');
  return payload.access_token;
}

async function fetchSubreddit(subreddit, token) {
  const response = await fetch(`${redditApiBase}/r/${subreddit}/top?t=week&limit=100`, {
    headers: { Authorization: `Bearer ${token}`, 'User-Agent': redditUserAgent },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

/**
 * One request per subreddit for the week's top posts, keeping each subreddit's
 * top `--per-sub`.
 *
 * Reddit scores are not comparable across subreddits, let alone with Hacker
 * News points: r/technology routinely clears 20,000 while r/MachineLearning's
 * top of the week sits under 100. A shared points floor therefore admits all of
 * the former and none of the latter, which is why Reddit is capped by rank
 * within each subreddit and ignores `--min-points` entirely. The ranked table
 * mixes sources only as a rough guide, never as a like-for-like ranking.
 */
function mapRedditListing(payload, perSub) {
  const hits = [];
  let selfPosts = 0;
  for (const child of payload?.data?.children ?? []) {
    const post = child?.data;
    if (!post?.title || !post.url) continue;
    // The newsletter links articles, not discussion threads.
    if (post.is_self) {
      selfPosts += 1;
      continue;
    }
    const points = post.score ?? 0;
    hits.push({
      id: `reddit:${post.id}`,
      title: post.title,
      url: post.url,
      points,
      comments: post.num_comments ?? 0,
      createdAt: new Date((post.created_utc ?? 0) * 1000).toISOString(),
      discussionUrl: `https://www.reddit.com${post.permalink}`,
    });
  }
  // Listings arrive already ranked by the `top` sort, so the slice is the
  // subreddit's top N for the week.
  return {
    hits: hits.slice(0, perSub),
    selfPosts,
    available: payload?.data?.children?.length ?? 0,
  };
}

async function fetchReddit({ perSub, subreddits: subs }) {
  const token = await fetchRedditToken();
  const hits = [];
  const counts = [];
  let selfPosts = 0;
  for (const subreddit of subs) {
    let payload;
    try {
      payload = await fetchSubreddit(subreddit, token);
    } catch (error) {
      console.error(`Subreddit ${subreddit} failed (${error.message}); skipping.`);
      counts.push(`${subreddit}:failed`);
      continue;
    }
    const mapped = mapRedditListing(payload, perSub);
    hits.push(...mapped.hits);
    selfPosts += mapped.selfPosts;
    counts.push(`${subreddit}:${mapped.hits.length}/${mapped.available}`);
  }
  console.error(`Per subreddit (taken/available): ${counts.join(' ')}`);
  console.error(`Skipped ${selfPosts} self-post(s).`);
  return hits;
}

// --- feeds -----------------------------------------------------------------

function decodeXmlText(text) {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&(?:apos|#0?39|#x27);/gi, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function tagText(block, tag) {
  const match = block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? decodeXmlText(match[1]) : '';
}

// Atom puts the URL in a `<link href="...">` attribute (with rel="alternate"
// or no rel; rel="self"/"replies" are not the article), RSS puts it in the
// element text.
function feedItemLink(block) {
  for (const match of block.matchAll(/<link\b([^>]*)>/gi)) {
    const attrs = match[1];
    const href = attrs.match(/href="([^"]+)"/i);
    if (!href) continue;
    const rel = attrs.match(/rel="([^"]+)"/i);
    if (rel && rel[1].toLowerCase() !== 'alternate') continue;
    return decodeXmlText(href[1]);
  }
  return tagText(block, 'link');
}

function feedItemDate(block) {
  for (const tag of ['pubDate', 'published', 'updated', 'dc:date']) {
    const value = tagText(block, tag);
    if (value && !Number.isNaN(Date.parse(value))) return new Date(value).toISOString();
  }
  return '';
}

// No numeric id comes back from a feed (or from a hand-added URL), so the URL
// is hashed (FNV-1a) into a stable one. Dedupe still happens on normalisedUrl
// downstream; this only has to be stable and collision-free enough to
// namespace.
function urlHash(url) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < url.length; index += 1) {
    hash ^= url.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

function feedId(url) {
  return `feed:${urlHash(url)}`;
}

function toFeedHit(title, url, createdAt) {
  return {
    id: feedId(url),
    title,
    url,
    // No popularity signal exists for a feed item. Null, never 0.
    points: null,
    comments: null,
    createdAt,
    discussionUrl: null,
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ethical-institute-newsletter/1.0)' },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

// RSS `<item>` and Atom `<entry>` are the same shape for our purposes: a
// title, a link and a date. A regex reader avoids an XML dependency; feeds
// that break it are skipped like any other failing feed.
async function fetchRssFeed(feed, cutoff) {
  const xml = await fetchText(feed.url);
  const hits = [];
  for (const match of xml.matchAll(/<(item|entry)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const block = match[2];
    const title = tagText(block, 'title');
    const url = feedItemLink(block);
    const createdAt = feedItemDate(block);
    if (!title || !/^https?:\/\//i.test(url) || !createdAt) continue;
    if (Date.parse(createdAt) < cutoff) continue;
    hits.push(toFeedHit(title, url, createdAt));
  }
  return hits;
}

function titleFromSlug(url) {
  const slug =
    url
      .replace(/[?#].*$/, '')
      .replace(/\/+$/, '')
      .split('/')
      .pop() ?? '';
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * The real headline, read from the article's own `og:title` (or `<title>`).
 *
 * A slug-derived title is what the selecting agent ends up reading in the
 * shortlist, and slugs mangle exactly the words that carry meaning
 * ("Improving Fable 5 S Biology Safeguards"). One extra request per scraped
 * link is worth a headline that says what the piece is. Falls back to the slug
 * if the page cannot be read.
 */
async function fetchArticleTitle(url) {
  try {
    const html = await fetchText(url);
    const meta = html.match(
      /<meta[^>]+(?:property|name)=["']og:title["'][^>]+content=["']([^"']+)["']/i,
    );
    const title = meta?.[1] ?? html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1];
    const cleaned = title ? decodeXmlText(title).replace(/\s+/g, ' ').trim() : '';
    // Strip a trailing site name: "Headline \ Anthropic", "Headline | Site".
    return cleaned.replace(/\s*[\\|·—–]\s*[^\\|·—–]{2,30}$/, '').trim() || titleFromSlug(url);
  } catch {
    return titleFromSlug(url);
  }
}

// Scraped pages carry no per-item date, so the index is taken at face value:
// what is on the front page today is this week's output. Stamped with the run
// time, which also keeps them inside the `--days` window.
//
// Titles come from the slug rather than the anchor text: these index pages
// wrap a whole card in the link, so the anchor carries the date and the
// standfirst as well as the headline.
async function fetchScrapeFeed(feed, timestamp) {
  const html = await fetchText(feed.url);
  const hits = [];
  const seen = new Set();
  for (const match of html.matchAll(feed.pattern)) {
    const href = match[0];
    if (seen.has(href)) continue;
    seen.add(href);
    const url = new URL(href, feed.url).toString();
    hits.push(toFeedHit(await fetchArticleTitle(url), url, timestamp));
  }
  return hits;
}

// Some indexes are only in the rendered DOM, or reject a plain fetch outright
// (Uber answers 406). Playwright is imported lazily and only here, so a run
// that touches no browser feed never needs it.
async function fetchBrowserFeed(feed, timestamp) {
  const specifiers = resolvePlaywright();
  let chromium;
  let lastError;
  for (const specifier of specifiers) {
    try {
      const playwright = await import(specifier);
      ({ chromium } = playwright.default ?? playwright);
      if (chromium) break;
      lastError = new Error('no chromium export');
    } catch (error) {
      lastError = error;
    }
  }
  if (!chromium) {
    throw new Error(
      `Playwright unavailable (tried ${specifiers.join(', ')}: ${lastError?.message})`,
      { cause: lastError },
    );
  }
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(feed.url, { waitUntil: 'networkidle' });
    const hrefs = await page.$$eval('a[href*="/blog/"]', (nodes) =>
      nodes.map((node) => node.getAttribute('href') ?? ''),
    );
    const hits = [];
    const seen = new Set();
    for (const href of hrefs) {
      const path = href.split('?')[0].split('#')[0];
      const match = path.match(feed.pattern);
      if (!match) continue;
      const slug = match[1];
      if (slug.length <= 12 || uberCategorySlugs.has(slug) || seen.has(slug)) continue;
      seen.add(slug);
      const url = new URL(href, feed.url).toString();
      hits.push(toFeedHit(await fetchArticleTitle(url), url, timestamp));
    }
    return hits;
  } finally {
    await browser.close();
  }
}

/**
 * One request per feed, keeping each feed's newest `--per-feed` items that
 * were published inside the `--days` window. A single failing feed is logged
 * and skipped, the same as a failing HN day or subreddit.
 */
async function fetchFeeds({ days, perFeed }) {
  const timestamp = new Date().toISOString();
  const cutoff = Date.now() - days * 86400000;
  const hits = [];
  const counts = [];
  for (const feed of feeds) {
    let feedHits;
    try {
      if (feed.type === 'rss') feedHits = await fetchRssFeed(feed, cutoff);
      else if (feed.type === 'scrape') feedHits = await fetchScrapeFeed(feed, timestamp);
      else feedHits = await fetchBrowserFeed(feed, timestamp);
    } catch (error) {
      console.error(`feed ${feed.name} failed (${error.message}); skipping`);
      counts.push(`${feed.name}:failed`);
      continue;
    }
    const taken = feedHits
      .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
      .slice(0, perFeed);
    hits.push(...taken);
    counts.push(`${feed.name}:${taken.length}/${feedHits.length}`);
  }
  console.error(`Per feed (taken/in window): ${counts.join(' ')}`);
  return hits;
}

// Sourcing plugins. Each `fetch` returns normalised hits:
// { id, title, url, points, comments, createdAt, discussionUrl }, with `id`
// namespaced by source so ids from different sources never collide.
const sources = {
  hn: { name: 'hn', fetch: fetchHn },
  reddit: { name: 'reddit', fetch: fetchReddit },
  feeds: { name: 'feeds', fetch: fetchFeeds },
};

// Entries written before a field was renamed or added. Migrating on load keeps
// one shape everywhere downstream; nothing is dropped.
function migrateEntry(entry) {
  if (entry.hnUrl && !entry.discussionUrl) entry.discussionUrl = entry.hnUrl;
  delete entry.hnUrl;
  // Everything in the pool before the reddit source existed came from HN.
  if (!entry.source) entry.source = 'hn';
  if (!entry.id.includes(':')) entry.id = `${entry.source}:${entry.id}`;
  return entry;
}

function loadPool() {
  if (!existsSync(poolPath)) return [];
  return JSON.parse(readFileSync(poolPath, 'utf8')).map(migrateEntry);
}

/**
 * The backlog is a bounded queue: once it holds more than `maxPool` waiting
 * candidates, the lowest-ranked ones are dropped — lowest-scoring among the
 * scored entries, oldest among the unscored ones (see rankEntries). Only
 * `pool` entries are capped. A `rejected` entry is kept forever because it
 * exists precisely to stop something resurfacing, an entry carrying a
 * hand-written `note` is kept because a human spent attention on it, and a
 * `pinned` entry is kept because the owner already put it in the issue.
 */
function trimPool(entries, now) {
  const waiting = entries.filter((entry) => entry.status === 'pool' && !entry.note);
  if (waiting.length <= maxPool) return { kept: entries, dropped: 0 };
  const survivors = new Set(rankEntries(waiting, now).slice(0, maxPool));
  return {
    kept: entries.filter(
      (entry) => entry.status !== 'pool' || Boolean(entry.note) || survivors.has(entry),
    ),
    dropped: waiting.length - maxPool,
  };
}

function savePool(entries, now = Date.now()) {
  const { kept, dropped } = trimPool(entries, now);
  const sorted = [...kept].sort(
    (left, right) =>
      Date.parse(right.createdAt) - Date.parse(left.createdAt) || left.id.localeCompare(right.id),
  );
  mkdirSync(resolve(poolPath, '..'), { recursive: true });
  writeFileSync(poolPath, `${JSON.stringify(sorted, null, 2)}\n`);
  if (dropped) console.error(`Trimmed ${dropped} lowest-ranked candidate(s) to cap ${maxPool}.`);
  return sorted;
}

function toCandidate(hit, source, corpus, timestamp) {
  const { url, title } = hit;
  const similar = findSimilarHeading(title, corpus.headings);
  const host = hostOf(url);
  return {
    id: hit.id,
    title,
    url,
    normalisedUrl: normaliseUrl(url),
    host,
    points: hit.points,
    comments: hit.comments,
    createdAt: hit.createdAt,
    source,
    discussionUrl: hit.discussionUrl,
    firstSeen: timestamp,
    lastSeen: timestamp,
    status: 'pool',
    possibleDuplicate: Boolean(similar),
    duplicateOf: similar ? similar.issue : null,
    company: companyOf(host),
    ownProject: isOwnProject(url, host),
    firstParty: isFirstParty(host),
    kind: classifyKind(title, host),
    recentlyCovered: recentlyCoveredIn(title, corpus.recentBigrams),
  };
}

// Every derived field a pool entry should carry, recomputed from its own
// title/url/host (and the current corpus) so backfilling an old entry (added
// before a field existed) gives the same result as fetching it fresh today.
function deriveFields(entry, corpus) {
  return {
    company: companyOf(entry.host),
    ownProject: isOwnProject(entry.url, entry.host),
    firstParty: isFirstParty(entry.host),
    kind: classifyKind(entry.title, entry.host),
    recentlyCovered: recentlyCoveredIn(entry.title, corpus.recentBigrams),
  };
}

// Merge preserves every existing entry and any human-added fields; only the
// volatile score counters, lastSeen, duplicate flags and derived signals are
// refreshed/backfilled.
function mergePool(existing, fresh, corpus) {
  const byUrl = new Map(existing.map((entry) => [entry.normalisedUrl, entry]));
  let added = 0;
  for (const candidate of fresh) {
    const previous = byUrl.get(candidate.normalisedUrl);
    if (!previous) {
      byUrl.set(candidate.normalisedUrl, candidate);
      added += 1;
      continue;
    }
    previous.points = candidate.points;
    previous.comments = candidate.comments;
    previous.lastSeen = candidate.lastSeen;
    previous.possibleDuplicate = candidate.possibleDuplicate;
    previous.duplicateOf = candidate.duplicateOf;
  }
  // Derived signals are deterministic from title/url/host, so recomputing
  // them for every entry (not just ones touched above) is what backfills
  // old pool entries and keeps everyone in sync if a heuristic changes.
  for (const entry of byUrl.values()) Object.assign(entry, deriveFields(entry, corpus));
  return { entries: [...byUrl.values()], added };
}

// `news` entries stay in the pool — they are only hidden from the tables, so a
// corporate-event story is still on record and still blocks a re-add. This is a
// view filter, never a delete.
function hideNews(entries, includeNews) {
  if (includeNews) return { visible: entries, hidden: 0, note: '' };
  const visible = entries.filter((entry) => entry.kind !== 'news');
  const hidden = entries.length - visible.length;
  return {
    visible,
    hidden,
    note: hidden ? ` (${hidden} news entries hidden; --include-news to show)` : '',
  };
}

// Like hideNews: recently-covered entries stay in the pool and are only
// optionally hidden from the tables. The flag is a hint that last month's
// issue already told this story, not a verdict.
function hideCovered(entries, hide) {
  const flagged = entries.filter((entry) => entry.recentlyCovered).length;
  if (!hide) {
    return {
      visible: entries,
      note: flagged ? ` (${flagged} recently covered; --hide-covered to hide)` : '',
    };
  }
  return {
    visible: entries.filter((entry) => !entry.recentlyCovered),
    note: flagged ? ` (${flagged} recently covered hidden)` : '',
  };
}

function rankedTable(entries, limit, now) {
  const ranked = rankEntries(entries, now).slice(0, limit);
  // `pts` mixes Hacker News points with Reddit scores, which are not on the
  // same scale — read the ranking as a rough guide, and `src` as the caveat.
  // Feed items have no score at all and show `—`; they are ordered by recency.
  const lines = [
    '| # | src | pts | age (d) | kind | host | title |',
    '| --- | --- | --- | --- | --- | --- | --- |',
  ];
  ranked.forEach((entry, index) => {
    const flag =
      (entry.possibleDuplicate ? ` ⚠️#${entry.duplicateOf}` : '') +
      (entry.recentlyCovered ? ` covered:${entry.recentlyCovered}` : '');
    const host = entry.ownProject ? `${entry.host}*` : entry.host;
    lines.push(
      `| ${index + 1} | ${entry.source ?? ''} | ${isScored(entry) ? entry.points : '—'} | ${ageInDays(entry, now).toFixed(1)} | ${entry.kind ?? ''} | ${host} | [${entry.title.replace(/\|/g, '\\|')}](${entry.url})${flag} |`,
    );
  });
  return lines.join('\n');
}

function parseArgs(argv) {
  const options = {};
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index].startsWith('--')) {
      const next = argv[index + 1];
      if (next === undefined || next.startsWith('--')) {
        options[argv[index].slice(2)] = true;
      } else {
        options[argv[index].slice(2)] = next;
        index += 1;
      }
    } else {
      positional.push(argv[index]);
    }
  }
  return { options, positional };
}

async function commandFetch(options) {
  const days = Number(options.days ?? 7);
  // The points floor is the quality gate; per-day is only a safety ceiling.
  //
  // Ranking depth is not a quality signal here: the keyword filter matches a
  // flat ~25% of all Hacker News stories at every depth (34/140 at 20/day,
  // 171/700 at 100/day, 774/2800 at 400/day), so taking more per day just
  // extends further down the points ranking into noise. At a 40-point floor
  // each day yields 37-76 stories, well under the ceiling, which is what we
  // want: the floor decides, and the day window only stops points-by-age from
  // crowding out the newest days.
  const perDay = Number(options['per-day'] ?? 200);
  // Reddit is capped by rank within each subreddit, not by points.
  const perSub = Number(options['per-sub'] ?? 25);
  // Feeds are capped by rank within each publisher, like Reddit: a feed has no
  // score to threshold on.
  const perFeed = Number(options['per-feed'] ?? 5);
  const minPoints = Number(options['min-points'] ?? 40);
  const limit = Number(options.limit ?? 60);
  const requested = String(options.source ?? 'hn')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);
  for (const name of requested) {
    if (!sources[name]) {
      throw new Error(`unknown source "${name}" (use ${Object.keys(sources).join(' | ')})`);
    }
  }
  const subs = String(options.subreddits ?? subreddits.join(','))
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);
  const corpus = readCorpus();
  const now = Date.now();
  const timestamp = new Date(now).toISOString();

  const hits = [];
  const skipped = [];
  for (const name of requested) {
    try {
      const sourceHits = await sources[name].fetch({
        days,
        perDay,
        perSub,
        perFeed,
        minPoints,
        subreddits: subs,
      });
      for (const hit of sourceHits) hits.push({ hit, source: name });
    } catch (error) {
      if (!error.skipSource) throw error;
      console.error(error.message);
      skipped.push(error.message);
    }
  }
  if (skipped.length === requested.length) {
    throw new Error(`Every requested source was skipped, so no data was written.`);
  }

  const seen = new Set();
  let relevant = 0;
  let alreadyUsed = 0;
  const fresh = [];
  for (const { hit, source } of hits) {
    if (!hit.title || seen.has(hit.id)) continue;
    seen.add(hit.id);
    const candidate = toCandidate(hit, source, corpus, timestamp);
    if (!isRelevant(candidate.title, candidate.host)) continue;
    relevant += 1;
    if (corpus.used.has(candidate.normalisedUrl)) {
      alreadyUsed += 1;
      continue;
    }
    fresh.push(candidate);
  }

  const { entries, added } = mergePool(loadPool(), fresh, corpus);
  const saved = savePool(entries);
  const pool = saved.filter((entry) => entry.status === 'pool');
  const { visible, note } = hideNews(pool, 'include-news' in options);
  const covered = hideCovered(visible, 'hide-covered' in options);
  const table = rankedTable(covered.visible, limit, now);
  mkdirSync(resolve(reportPath, '..'), { recursive: true });
  writeFileSync(reportPath, `# Newsletter candidates (${timestamp})\n\n${table}\n`);
  console.log(
    `Sources: ${requested.join(',')}; stories: ${hits.length}; relevant: ${relevant}; ` +
      `dropped as already used: ${alreadyUsed}; ` +
      `new in pool: ${added}; pool total: ${pool.length}${note}${covered.note}; ` +
      `historic used URLs: ${corpus.used.size}`,
  );
  console.log(`\n${table}\n\nWrote ${reportPath}`);
}

/**
 * Hand-added URLs: the links the owner collects during the week and pastes in
 * by hand. They go through exactly the same path as every other source — same
 * normalisedUrl dedupe key, same derived fields, same merge and cap — so they
 * are ranked, deduped and checked against the corpus like anything else.
 *
 * Two deliberate differences. They are unscored (points/comments null, like a
 * feed item), so they rank by recency. And `isRelevant` is NOT applied: the
 * owner already chose them, and a keyword filter must never overrule that. A
 * would-be rejection is printed as a note, because "my own pick does not look
 * relevant to the filter" is useful signal about the filter.
 */
async function commandAdd(urls, options) {
  if (!urls.length) throw new Error('add requires at least one url');
  const status = 'pinned' in options ? 'pinned' : 'pool';
  const corpus = readCorpus();
  const now = Date.now();
  const timestamp = new Date(now).toISOString();
  const entries = loadPool();
  const byUrl = new Map(entries.map((entry) => [entry.normalisedUrl, entry]));
  const added = [];
  for (const rawUrl of urls) {
    const normalised = normaliseUrl(rawUrl);
    const existing = byUrl.get(normalised);
    if (existing) {
      existing.lastSeen = timestamp;
      console.log(
        `Already in pool as "${existing.title}" (status ${existing.status}); only lastSeen updated.`,
      );
      continue;
    }
    const title = await fetchArticleTitle(rawUrl);
    const entry = toCandidate(
      {
        id: `manual:${urlHash(rawUrl)}`,
        title,
        url: rawUrl,
        // Hand-added links carry no popularity signal. Null, never 0.
        points: null,
        comments: null,
        createdAt: timestamp,
        discussionUrl: null,
      },
      'manual',
      corpus,
      timestamp,
    );
    entry.status = status;
    if (pointerHosts.has(entry.host)) entry.isPointer = true;
    entries.push(entry);
    byUrl.set(normalised, entry);
    added.push(entry);
    console.log(`Added ${entry.host}: ${entry.title}`);
    const usedBy = corpus.usedIn.get(normalised);
    if (usedBy) {
      console.log(`  !! WARNING: issue #${usedBy} already links this URL. Added anyway.`);
    }
    if (!isRelevant(entry.title, entry.host)) {
      console.log('  note: the relevance filter would have rejected this; added anyway.');
    }
    if (entry.isPointer) {
      console.log('  note: pointer — this points at another artifact; resolve it before use.');
    }
  }
  savePool(entries, now);
  if (!added.length) return;
  const lines = [
    '',
    '| status | kind | company | own | covered | title |',
    '| --- | --- | --- | --- | --- | --- |',
  ];
  for (const entry of added) {
    lines.push(
      `| ${entry.status}${entry.isPointer ? ' (pointer)' : ''} | ${entry.kind} | ${entry.company} | ` +
        `${entry.ownProject ? 'yes' : ''} | ${entry.recentlyCovered ? `#${entry.recentlyCovered}` : ''} | ` +
        `[${entry.title.replace(/\|/g, '\\|')}](${entry.url}) |`,
    );
  }
  console.log(lines.join('\n'));
  console.log(`\nAdded ${added.length} entr(ies) with status "${status}".`);
}

function commandList(options) {
  const limit = Number(options.limit ?? 25);
  const status = options.status ?? 'pool';
  const includeOwn = 'include-own' in options;
  const all = loadPool();
  // Pinned entries are the owner saying "this is in the issue", so they are
  // shown first and unfiltered, above the ranked pool. Only when listing the
  // pool itself: `--status used` is a different question.
  if (status === 'pool') {
    const pinned = all.filter((entry) => entry.status === 'pinned');
    if (pinned.length) {
      console.log(`PINNED (${pinned.length}) — already chosen, not candidates:`);
      console.log(rankedTable(pinned, pinned.length, Date.now()));
      console.log('');
    }
  }
  let entries = all.filter((entry) => entry.status === status);
  if (!includeOwn) entries = entries.filter((entry) => !entry.ownProject);
  if (options.kind) entries = entries.filter((entry) => entry.kind === options.kind);
  if (options.source) entries = entries.filter((entry) => entry.source === options.source);
  // Asking for `--kind news` is asking to see them, so it implies the flag.
  const { visible, note } = hideNews(entries, 'include-news' in options || options.kind === 'news');
  const covered = hideCovered(visible, 'hide-covered' in options);
  console.log(rankedTable(covered.visible, limit, Date.now()));
  console.log(
    `\n${covered.visible.length} entr(ies) with status "${status}"${note}${covered.note}.`,
  );
}

function commandMark(positional) {
  const [status, ...targets] = positional;
  if (!['used', 'rejected', 'pool'].includes(status)) {
    throw new Error(`unknown status "${status}" (use used | rejected | pool)`);
  }
  if (!targets.length) throw new Error('mark requires at least one url or id');
  const entries = loadPool();
  let changed = 0;
  for (const target of targets) {
    const normalised = normaliseUrl(target);
    const entry = entries.find((item) => item.id === target || item.normalisedUrl === normalised);
    if (!entry) {
      console.error(`No pool entry matched "${target}".`);
      continue;
    }
    entry.status = status;
    changed += 1;
  }
  savePool(entries);
  console.log(`Marked ${changed} entr(ies) as "${status}".`);
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const { options, positional } = parseArgs(rest);
  if (command === 'fetch') await commandFetch(options);
  else if (command === 'add') await commandAdd(positional, options);
  else if (command === 'list') commandList(options);
  else if (command === 'mark') commandMark(positional);
  else {
    console.error(
      'Usage:\n' +
        '  candidates.mjs fetch [--source hn,reddit,feeds] [--subreddits a,b,c] [--days 7]\n' +
        '                       [--per-day 200] [--per-sub 25] [--per-feed 5] [--min-points 40]\n' +
        '                       [--limit 60] [--include-news] [--hide-covered]\n' +
        '  candidates.mjs add <url>... [--pinned]\n' +
        '  candidates.mjs list [--limit 25] [--status pool] [--kind <kind>] [--source hn]\n' +
        '                      [--include-own] [--include-news] [--hide-covered]\n' +
        '  candidates.mjs mark <used|rejected|pool> <url|id>...',
    );
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
