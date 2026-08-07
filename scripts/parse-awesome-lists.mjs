import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(root, 'src/content/oss-catalogues.json');
const productionListPath = path.join(root, 'src/data/production-ml-libraries.json');

const repositories = {
  productionMl: 'EthicalML/awesome-production-machine-learning',
  aiGuidelines: 'EthicalML/awesome-artificial-intelligence-regulation',
};

// Refresh the committed offline snapshot with: node scripts/parse-awesome-lists.mjs
function fetchReadme(repository) {
  for (const branch of ['master', 'main']) {
    const url = `https://raw.githubusercontent.com/${repository}/${branch}/README.md`;
    const result = spawnSync('curl', ['-fsSL', '--retry', '1', url], {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
    });
    if (result.status === 0 && result.stdout.trim()) return { branch, text: result.stdout, url };
  }
  throw new Error(`Could not fetch README for ${repository} from master or main.`);
}

function sliceBetween(text, start, end) {
  const startIndex = text.indexOf(start);
  const endIndex = text.indexOf(end, startIndex + start.length);
  if (startIndex < 0 || endIndex < 0) throw new Error(`Missing README boundary: ${start} / ${end}`);
  return text.slice(startIndex, endIndex);
}

function markdownLinks(text) {
  return [...text.matchAll(/\[([^\]]+)\]\(#([^)]+)\)/g)].map(([, label, anchor]) => ({
    label: label.trim(),
    anchor: `#${anchor}`,
  }));
}

function sections(text, headingLevel) {
  const lines = text.split(/\r?\n/);
  const heading = new RegExp(`^#{${headingLevel}}\\s+(.+?)\\s*$`);
  const results = [];
  let current;

  for (const line of lines) {
    const match = line.match(heading);
    if (match) {
      current = { heading: match[1], count: 0 };
      results.push(current);
    } else if (current && /^\s*[*+-]\s+\[/.test(line)) {
      current.count += 1;
    }
  }
  return results;
}

function plainText(markdown) {
  return markdown
    .replaceAll(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replaceAll(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replaceAll(/<[^>]+>/g, '')
    .replaceAll(/[`*_]/g, '')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replace(/^\s*[-–]\s*/, '')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

function productionLibraries(text, categoryDetails) {
  const content = sliceBetween(text, '# Main Content', '# Other Awesome Lists');
  const result = [];
  let current;

  for (const line of content.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      const details = categoryDetails[result.length];
      if (!details) throw new Error(`Could not match production ML category: ${heading[1]}`);
      current = { name: details.name, emoji: details.emoji, entries: [] };
      result.push(current);
      continue;
    }

    const entry = line.match(/^\*\s+\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)\s*(.*)$/);
    if (!entry || !current) continue;
    current.entries.push({
      name: plainText(entry[1]),
      href: entry[2],
      description: plainText(entry[3]),
    });
  }

  return result;
}

function splitLeadingEmoji(label) {
  const match = label.match(/^(\S+)\s+(.+)$/u);
  if (!match) throw new Error(`Expected an emoji before label: ${label}`);
  return { emoji: match[1], name: match[2] };
}

function splitTrailingEmoji(label) {
  const match = label.match(/^(.+?)\s+(\S+)$/u);
  if (!match) throw new Error(`Expected an emoji after label: ${label}`);
  return { name: match[1], emoji: match[2] };
}

function zipLinksAndCounts(links, counts, parseLabel) {
  if (links.length !== counts.length) {
    throw new Error(
      `README structure mismatch: found ${links.length} links and ${counts.length} sections.`,
    );
  }
  const used = new Set();
  const normalise = (value) =>
    value
      .toLowerCase()
      .replaceAll('&', 'and')
      .replaceAll(/[^a-z0-9]+/g, ' ')
      .trim();

  return links.map(({ label, anchor }, index) => {
    const parsed = parseLabel(label);
    let countIndex = counts.findIndex(
      ({ heading }, candidate) =>
        !used.has(candidate) && normalise(heading) === normalise(parsed.name),
    );
    if (countIndex < 0 && !used.has(index)) countIndex = index;
    if (countIndex < 0) throw new Error(`Could not match README section for ${parsed.name}.`);
    used.add(countIndex);
    return { ...parsed, count: counts[countIndex].count, anchor };
  });
}

const production = fetchReadme(repositories.productionMl);
const productionLinks = markdownLinks(
  sliceBetween(
    production.text,
    '## Quick links to sections on this page',
    '## Contributing to the list',
  ),
);
const productionSections = sections(
  sliceBetween(production.text, '# Main Content', '# Other Awesome Lists'),
  2,
);
const categories = zipLinksAndCounts(productionLinks, productionSections, splitLeadingEmoji);
const libraryCategories = productionLibraries(production.text, categories);

const regulation = fetchReadme(repositories.aiGuidelines);
const areaLinks = markdownLinks(
  sliceBetween(regulation.text, '### National Regulation by Economic Area', '### Other Sections'),
);
const areaSections = sections(
  sliceBetween(
    regulation.text,
    '# Regulation and Policy',
    '# High Level Frameworks and Principles',
  ),
  2,
);
const areas = zipLinksAndCounts(areaLinks, areaSections, splitTrailingEmoji);

const themeLinks = markdownLinks(
  sliceBetween(regulation.text, '### Other Sections', '## Other relevant resources'),
);
const themeSections = sections(
  regulation.text.slice(regulation.text.indexOf('# High Level Frameworks and Principles')),
  1,
);
const themes = zipLinksAndCounts(themeLinks, themeSections, splitLeadingEmoji);

if (categories.length !== 24 || areas.length !== 15 || themes.length !== 6) {
  throw new Error(
    `Unexpected catalogue sizes: ${categories.length} categories, ${areas.length} areas, ${themes.length} themes.`,
  );
}

const libraryCount = libraryCategories.reduce(
  (total, category) => total + category.entries.length,
  0,
);
const expectedLibraryCount = categories.reduce((total, category) => total + category.count, 0);
if (libraryCategories.length !== 24 || libraryCount !== expectedLibraryCount) {
  throw new Error(
    `Unexpected production ML list size: ${libraryCategories.length} categories, ${libraryCount} libraries.`,
  );
}

const snapshot = {
  productionMl: {
    repository: `https://github.com/${repositories.productionMl}`,
    source: production.url,
    branch: production.branch,
    categories,
  },
  aiGuidelines: {
    repository: `https://github.com/${repositories.aiGuidelines}`,
    source: regulation.url,
    branch: regulation.branch,
    areas,
    themes,
  },
};

writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
writeFileSync(
  productionListPath,
  `${JSON.stringify(
    {
      repository: snapshot.productionMl.repository,
      source: production.url,
      libraryCount,
      categories: libraryCategories,
    },
    null,
    2,
  )}\n`,
);
console.log(
  `Wrote ${path.relative(root, outputPath)} and ${path.relative(root, productionListPath)} (${categories.length} production categories, ${libraryCount} libraries, ${areas.length} areas, ${themes.length} themes).`,
);
