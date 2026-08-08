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
