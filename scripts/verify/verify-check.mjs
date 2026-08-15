import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const baseline = JSON.parse(
  readFileSync(new URL('./astro-check-baseline.json', import.meta.url), 'utf8'),
);
const astroCli = fileURLToPath(new URL('../../node_modules/astro/bin/astro.mjs', import.meta.url));
const result = spawnSync(process.execPath, [astroCli, 'check'], {
  cwd: fileURLToPath(new URL('../../', import.meta.url)),
  encoding: 'utf8',
  env: {
    ...process.env,
    FORCE_COLOR: '0',
  },
});
const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
const errors = Number(output.match(/- (\d+) errors/)?.[1]);
const warnings = Number(output.match(/- (\d+) warnings/)?.[1]);
const hints = Number(output.match(/- (\d+) hints/)?.[1]);

process.stdout.write(output);

if (![errors, warnings, hints].every(Number.isFinite)) {
  throw new Error('Could not read the Astro Check diagnostic summary.');
}

const passed = errors <= baseline.errors;
console.log(JSON.stringify({ passed, baseline, current: { errors, warnings, hints } }, null, 2));
if (!passed) process.exitCode = 1;

// ---------------------------------------------------------------------------
// Alpha-token ratchet.
//
// `--<family>-a<permille>` is the escape hatch that let the dark theme keep
// every historical alpha literal, and it is why `:root` carried 108 of them.
// Documentation alone will not hold the line — the next author picks whichever
// `-a###` looks closest rather than a named ladder rung. So the survivors are
// grandfathered by name here and the namespace is closed: a new one fails the
// build. Removing one is the only edit that needs no argument, and the list may
// not name a token that no longer exists, so it cannot rot.
//
// To add a rung deliberately, give it a job name on its family's ladder
// (`--ink-4`, `--hairline-card`, `--accent-edge`) — not an alpha.
const alphaAllow = new Set(
  JSON.parse(readFileSync(new URL('./token-alpha-allowlist.json', import.meta.url), 'utf8')),
);
const alphaTokenPattern = /--[a-z0-9-]+-a\d{3}/g;
const stylesRoot = fileURLToPath(new URL('../../src/', import.meta.url));
const declared = new Set();
const seen = new Set();
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(astro|css|ts|tsx|js|jsx|mjs|mdx|md|svg)$/.test(entry.name)) continue;
    const text = readFileSync(full, 'utf8');
    for (const [token] of text.matchAll(alphaTokenPattern)) seen.add(token);
    for (const [, token] of text.matchAll(/(--[a-z0-9-]+-a\d{3})\s*:/g)) declared.add(token);
  }
};
walk(stylesRoot);
const introduced = [...declared].filter((token) => !alphaAllow.has(token)).sort();
const referenced = [...seen].filter((token) => !alphaAllow.has(token)).sort();
const stale = [...alphaAllow].filter((token) => !declared.has(token)).sort();
const alphaPassed = introduced.length === 0 && referenced.length === 0 && stale.length === 0;
console.log(
  JSON.stringify(
    {
      alphaRatchet: {
        passed: alphaPassed,
        grandfathered: alphaAllow.size,
        introduced,
        referencedButNotDeclared: referenced,
        staleAllowlistEntries: stale,
      },
    },
    null,
    2,
  ),
);
if (!alphaPassed) {
  console.error(
    'Alpha-token ratchet failed. `-a###` is a closed namespace: give the value a job name on its\n' +
      "family's ladder instead. Deleting a token means deleting its allowlist entry too.",
  );
  process.exitCode = 1;
}

// ---------------------------------------------------------------------------
// Inverted-surface role.
//
// The light theme keeps whole blocks dark on a light page. That used to be a
// hand-maintained selector list in `tokens.css` plus a matching `data-surface`
// label on every canvas mount inside those blocks — two lists, in two files,
// with nothing holding them together. A block added to neither renders wrong in
// LIGHT ONLY, which nobody working in the default theme ever sees.
//
// Now membership is one declaration at the block, `data-surface="dark"`, read
// by the stylesheet and by `surfaceOf()` alike. These checks keep it that way:
//
//   1. the role rule keys off the attribute, so the selector list cannot regrow;
//   2. `data-surface-plate` never appears without the role beside it;
//   3. every declared value is `dark` or `page`, so a typo is not a silent `page`;
//   4. the `--canvas-dark-*` set restates the role rule's values exactly — the
//      canvas cannot read the block it sits in, so those are copies, and copies
//      drift.
const tokensCss = readFileSync(new URL('../../src/styles/tokens.css', import.meta.url), 'utf8');
const surfaceFindings = [];

const roleRule = /:root\[data-theme='light'\]\s*\[data-surface='dark'\]\s*\{([^}]*)\}/.exec(
  tokensCss,
);
if (!roleRule) {
  surfaceFindings.push(
    "The inverted-surface role rule is gone or no longer keys off `[data-surface='dark']`. " +
      'Membership is declared at the block, never as a selector list here.',
  );
}
for (const [, selector] of tokensCss.matchAll(/:root\[data-theme='light'\]\s+([^{]+)\{/g)) {
  const text = selector.trim();
  if (text.includes('[data-surface')) continue;
  surfaceFindings.push(
    `A light-theme rule selects blocks by class rather than by the surface role: \`${text}\`. ` +
      'Give the block `data-surface="dark"` instead.',
  );
}

const markupRoot = fileURLToPath(new URL('../../src/', import.meta.url));
const surfaceValues = new Set();
const walkMarkup = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkMarkup(full);
      continue;
    }
    if (!/\.(astro|tsx|html)$/.test(entry.name)) continue;
    const text = readFileSync(full, 'utf8');
    // Both quote styles: reading only the double-quoted group made every single-quoted
    // occurrence (including one inside a component's own stylesheet) register as `undefined`
    // and fail the check with a value nobody had written.
    for (const [, doubleQuoted, singleQuoted] of text.matchAll(
      /data-surface=(?:"([^"]*)"|'([^']*)')/g,
    )) {
      surfaceValues.add(doubleQuoted ?? singleQuoted);
    }
    for (const [, value] of text.matchAll(/data-surface=\{([^}]*)\}/g)) {
      for (const [, literal] of value.matchAll(/'([^']*)'/g)) surfaceValues.add(literal);
    }
    for (const [tag] of text.matchAll(/<[a-zA-Z][^>]*>/g)) {
      if (!tag.includes('data-surface-plate')) continue;
      if (tag.includes('data-surface=')) continue;
      surfaceFindings.push(
        `${full}: \`data-surface-plate\` without \`data-surface="dark"\` on the same element. ` +
          'The plate is the role plus a background; it is never the background alone.',
      );
    }
  }
};
walkMarkup(markupRoot);
for (const value of surfaceValues) {
  if (value === 'dark' || value === 'page') continue;
  surfaceFindings.push(
    `\`data-surface="${value}"\` is not a surface. The only values are \`dark\` and \`page\`.`,
  );
}

// The canvas cannot inherit the role rule's re-entered rungs, so `:root` carries
// a `--canvas-dark-*` copy of them. Copies drift; this compares them.
const declarationsIn = (block) =>
  new Map(
    [...block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [
      name,
      value.trim(),
    ]),
  );
const lightRoot = /:root\[data-theme='light'\]\s*\{([\s\S]*?)\n\}/.exec(tokensCss);
if (roleRule && lightRoot) {
  const role = declarationsIn(roleRule[1]);
  const root = declarationsIn(lightRoot[1]);
  const mirrored = [
    ['--canvas-dark-ink', '--ink-1'],
    ['--canvas-dark-base', '--bg-base'],
    ['--canvas-dark-panel', '--bg-panel'],
    ['--canvas-dark-inset', '--bg-inset'],
    ['--canvas-dark-accent', '--accent'],
    ['--canvas-dark-accent-ink', '--accent-ink'],
    ['--canvas-dark-shadow', '--shadow-hard'],
  ];
  for (const [canvasToken, roleToken] of mirrored) {
    const canvasValue = root.get(canvasToken);
    const roleValue = role.get(roleToken);
    if (canvasValue === undefined || roleValue === undefined) {
      surfaceFindings.push(
        `${canvasToken} / ${roleToken}: one of the pair is missing, so the canvas palette and the ` +
          'inverted blocks can no longer be compared.',
      );
      continue;
    }
    if (canvasValue !== roleValue) {
      surfaceFindings.push(
        `${canvasToken} is \`${canvasValue}\` but the inverted blocks paint ${roleToken} as ` +
          `\`${roleValue}\`. A canvas cannot read the block it sits in, so these are copies: change one, change both.`,
      );
    }
  }
}

console.log(
  JSON.stringify(
    { surfaceRole: { passed: surfaceFindings.length === 0, findings: surfaceFindings } },
    null,
    2,
  ),
);
if (surfaceFindings.length > 0) process.exitCode = 1;
