// TRANSITIONS.md maps what morphs into what; CANVAS-WIDGETS.md is the menu of
// canvas objects. Both drift silently, so the facts that CAN be derived from the
// source are derived here and compared.
//
//   node scripts/verify/verify-motion-docs.mjs
//
// Only derived checks live here. Transition names are mostly computed at runtime
// (`blog-title-${slug}`, `partner-logo-${slug}`), so the pairs themselves cannot
// be enumerated from source; what can be is WHO participates. A file that names
// a view transition, drives one through MorphPairs, or draws on a canvas is a
// file the documents have to account for, and every name they cite has to exist.

import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = new URL('../../', import.meta.url).pathname;
const TRANSITIONS = join(ROOT, 'TRANSITIONS.md');
const WIDGETS = join(ROOT, 'CANVAS-WIDGETS.md');
const CANVAS_DIR = join(ROOT, 'src/shared/canvas');

const walk = async (dir, out = []) => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path, out);
    else out.push(path);
  }
  return out;
};

const stem = (path) =>
  path
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '');

// Browser APIs read like component names in backticks and own no file.
const WEB_APIS = new Set(['IntersectionObserver', 'MutationObserver', 'ResizeObserver']);

// Every backticked identifier a document cites: a filename, or a PascalCase
// module name. CSS properties, event names and route fragments are lowercase
// without an extension, so they fall out on their own.
const cited = (doc) =>
  new Set(
    [...doc.matchAll(/`(\[?[A-Za-z][\w\-\]\/]*(?:\.astro|\.css|\.ts)?)`/g)]
      .map((match) => match[1])
      .filter((name) => /\.(astro|css|ts)$/.test(name) || /^[A-Z]/.test(name))
      .map(stem)
      .filter((name) => !WEB_APIS.has(name)),
  );

// A file participates in transitions if it names a view transition, or reaches
// for the shared pair machinery.
const transitionParticipants = async () => {
  const owners = new Set();
  for (const path of await walk(join(ROOT, 'src'))) {
    if (!/\.(astro|css|ts|tsx|mdx)$/.test(path)) continue;
    const source = readFileSync(path, 'utf8');
    if (/view-transition-name|transition:name=|MorphPairs/.test(source))
      owners.add(relative(ROOT, path));
  }
  return owners;
};

const run = async () => {
  const transitions = readFileSync(TRANSITIONS, 'utf8');
  const widgets = readFileSync(WIDGETS, 'utf8');
  const problems = [];

  // 1. Canvas elements are a closed set on disk: each is a widget or kit piece.
  const canvasFiles = (await readdir(CANVAS_DIR)).filter((name) => name.endsWith('.ts'));
  const widgetNames = cited(widgets);
  for (const file of canvasFiles)
    if (!widgetNames.has(stem(file)))
      problems.push(`src/shared/canvas/${file} is not in CANVAS-WIDGETS.md`);

  // 2. Nothing the menu names may have been deleted or renamed.
  const onDisk = new Set((await walk(join(ROOT, 'src'))).map(stem));
  for (const name of widgetNames)
    if (!onDisk.has(name)) problems.push(`CANVAS-WIDGETS.md names ${name}, which is not in src/`);

  // 3. Everything that participates in a transition is accounted for by name.
  const documented = cited(transitions);
  for (const owner of await transitionParticipants())
    if (!documented.has(stem(owner)))
      problems.push(`${owner} takes part in a transition but is not named in TRANSITIONS.md`);
  for (const name of documented)
    if (!onDisk.has(name)) problems.push(`TRANSITIONS.md names ${name}, which is not in src/`);

  if (problems.length) {
    console.error('motion-docs: the motion documents are out of step with the source\n');
    for (const problem of problems) console.error(`  - ${problem}`);
    console.error('\nAdd the missing entry, or drop the stale one, then re-run.');
    process.exit(1);
  }

  console.log(
    `motion-docs: ok (${canvasFiles.length} canvas elements, ${documented.size} transition owners)`,
  );
};

await run();
