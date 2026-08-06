// Applies generated metadata into each newsletter issue's frontmatter:
// `summary` from tmp/nl-summarize/out/N.json and `tags` from
// tmp/nl-topics/tags.json. Idempotent — safe to re-run after the converter
// regenerates issues (regeneration wipes these fields; this restores them).
// Usage: node scripts/newsletter/apply-frontmatter.mjs
import { readFile, writeFile, readdir } from 'node:fs/promises';

const ROOT = new URL('../../', import.meta.url);
const CONTENT = new URL('./src/content/newsletter/', ROOT);

const tags = JSON.parse(await readFile(new URL('./tmp/nl-topics/tags.json', ROOT), 'utf8'));

const yamlQuote = (value) => `'${value.replace(/'/g, "''")}'`;

let updated = 0;
let missing = 0;
for (const file of (await readdir(CONTENT)).filter((name) => /^\d+\.md$/.test(name))) {
  const issue = Number.parseInt(file, 10);
  const path = new URL(`./${file}`, CONTENT);
  const markdown = await readFile(path, 'utf8');
  const match = /^---\n([\s\S]*?)\n---\n/.exec(markdown);
  if (!match) throw new Error(`${file}: no frontmatter`);

  let summary;
  try {
    ({ summary } = JSON.parse(
      await readFile(new URL(`./tmp/nl-summarize/out/${issue}.json`, ROOT), 'utf8'),
    ));
  } catch {
    missing += 1;
  }
  const issueTags = tags[issue];

  const kept = match[1]
    .split('\n')
    .filter((line) => !/^(summary|tags):/.test(line) && !/^ {2}- /.test(line));
  if (summary) kept.push(`summary: ${yamlQuote(summary)}`);
  if (issueTags?.length) kept.push(`tags: [${issueTags.join(', ')}]`);

  const next = `---\n${kept.join('\n')}\n---\n${markdown.slice(match[0].length)}`;
  if (next !== markdown) {
    await writeFile(path, next);
    updated += 1;
  }
}
console.log(`frontmatter applied: ${updated} updated, ${missing} without summary`);
