import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
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
