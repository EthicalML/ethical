// STYLES.md documents where styles live. Documentation drifts silently, so the
// facts it asserts that CAN be derived from the source are derived here and
// compared; the ones that cannot are covered by a content hash the author has to
// re-bless deliberately.
//
//   node scripts/verify/verify-styles-doc.mjs          check, exit 1 on drift
//   node scripts/verify/verify-styles-doc.mjs --sync   rewrite the derived facts
//
// The distinction matters. A derived check cannot be satisfied by a token edit:
// it either matches reality or it does not. The hash only proves someone looked.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = new URL('../../', import.meta.url).pathname;
const DOC = join(ROOT, 'STYLES.md');
const TOKENS = join(ROOT, 'src/styles/tokens.css');
const HASH_MARKER = /<!-- styles-hash: ([a-f0-9]{64}) -->/;

const walk = async (dir, out = []) => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path, out);
    else out.push(path);
  }
  return out;
};

// A file "owns styles" if it carries its own style block or a sibling stylesheet.
// Those are exactly the files the ownership table is supposed to name.
const styleOwners = async () => {
  const files = await walk(join(ROOT, 'src'));
  const owners = new Set();
  for (const path of files) {
    if (/\.(css)$/.test(path) && !path.includes('/styles/')) owners.add(relative(ROOT, path));
    if (!/\.(astro|mdx)$/.test(path)) continue;
    if (/<style[\s>]/.test(readFileSync(path, 'utf8'))) owners.add(relative(ROOT, path));
  }
  return owners;
};

// Comments carry no style, and counting them makes the totals move whenever a
// rationale is reworded.
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

const tokenFacts = () => {
  const raw = readFileSync(TOKENS, 'utf8');
  const css = stripComments(raw);
  return {
    // `wc -l` semantics, so the number matches what a reader gets from the shell.
    lines: raw.split('\n').length - (raw.endsWith('\n') ? 1 : 0),
    rules: (css.match(/[^{}]+\{/g) ?? []).length,
    declarations: (css.match(/[-a-zA-Z]+\s*:\s*[^;{}]+;/g) ?? []).length,
  };
};

// Every style block plus the global sheet. Any change to how the site is styled
// moves this; a change to STYLES.md's prose does not.
const styleHash = async () => {
  const owners = [...(await styleOwners())].sort();
  const hash = createHash('sha256');
  hash.update(readFileSync(TOKENS, 'utf8'));
  for (const owner of owners) {
    hash.update(owner);
    const source = readFileSync(join(ROOT, owner), 'utf8');
    if (owner.endsWith('.css')) hash.update(source);
    else for (const block of source.match(/<style[\s\S]*?<\/style>/g) ?? []) hash.update(block);
  }
  return hash.digest('hex');
};

const documentedOwners = (doc) =>
  new Set([...doc.matchAll(/^\| `([^`]+\.(?:astro|css|mdx|tsx))`/gm)].map((match) => match[1]));

const format = (value) => value.toLocaleString('en-US');

const run = async () => {
  const sync = process.argv.includes('--sync');
  let doc = readFileSync(DOC, 'utf8');
  const facts = tokenFacts();
  const hash = await styleHash();
  const problems = [];

  const lineClaim = /`src\/styles\/tokens\.css` is ([\d,]+) lines/;
  const totalRow = /(\| Total\s*\|\s*)([\d,]+)(\s*\|\s*)([\d,]+)(\s*\|)/;

  if (sync) {
    doc = doc.replace(lineClaim, `\`src/styles/tokens.css\` is ${format(facts.lines)} lines`);
    doc = doc.replace(totalRow, `$1${format(facts.rules)}$3${format(facts.declarations)}$5`);
    doc = HASH_MARKER.test(doc)
      ? doc.replace(HASH_MARKER, `<!-- styles-hash: ${hash} -->`)
      : `${doc.trimEnd()}\n\n<!-- styles-hash: ${hash} -->\n`;
    writeFileSync(DOC, doc);
    console.log(
      `styles-doc: synced (${facts.lines} lines, ${facts.rules} rules, ${facts.declarations} declarations)`,
    );
    return;
  }

  const claimedLines = doc.match(lineClaim);
  if (!claimedLines) problems.push('STYLES.md no longer states the tokens.css line count');
  else if (Number(claimedLines[1].replace(/,/g, '')) !== facts.lines)
    problems.push(`tokens.css is ${facts.lines} lines, STYLES.md says ${claimedLines[1]}`);

  const claimedTotal = doc.match(totalRow);
  if (!claimedTotal) problems.push('STYLES.md no longer carries a Total row');
  else {
    const [rules, declarations] = [claimedTotal[2], claimedTotal[4]].map((n) =>
      Number(n.replace(/,/g, '')),
    );
    if (rules !== facts.rules)
      problems.push(`tokens.css has ${facts.rules} rules, STYLES.md says ${rules}`);
    if (declarations !== facts.declarations)
      problems.push(
        `tokens.css has ${facts.declarations} declarations, STYLES.md says ${declarations}`,
      );
  }

  const actual = await styleOwners();
  const documented = documentedOwners(doc);
  // The table is per component, not per file: a component whose styles were
  // extracted into a sibling sheet (Hero.astro + Hero.css) is one owner, so
  // compare on the stem rather than the filename.
  const bare = (path) =>
    path
      .split('/')
      .pop()
      .replace(/\.[^.]+$/, '');
  const documentedNames = new Set([...documented].map(bare));

  for (const owner of actual)
    if (!documentedNames.has(bare(owner)))
      problems.push(`${owner} owns styles but is not in the ownership table`);
  for (const owner of documented)
    if (![...actual].some((path) => bare(path) === bare(owner)))
      problems.push(
        `${owner} is in the ownership table but owns no styles (deleted, or its style block went)`,
      );

  const claimedHash = doc.match(HASH_MARKER);
  if (!claimedHash) problems.push('STYLES.md carries no styles-hash marker');
  else if (claimedHash[1] !== hash)
    problems.push(
      'styles changed since STYLES.md was last reviewed. Read it, correct anything now wrong, then run `npm run styles:sync`',
    );

  if (problems.length) {
    console.error('styles-doc: STYLES.md is out of step with the stylesheets\n');
    for (const problem of problems) console.error(`  - ${problem}`);
    console.error(
      '\nFix the document, then run `npm run styles:sync` to restate the derived facts.',
    );
    process.exit(1);
  }

  console.log(
    `styles-doc: ok (${actual.size} owners, ${facts.rules} rules, ${facts.declarations} declarations)`,
  );
};

await run();
