// Turns the per-viewport `verify-parity` reports produced by the merge-base
// visual job into one PR comment body, and decides the job's verdict.
//
//   node scripts/verify/parity-summary.mjs --mode enforce|report \
//     --marker '<!-- id -->' --out FILE --verdict FILE <label>=<report.json> ...
//
// `mode` only chooses the comment's wording; the workflow owns enforcement. The
// verdict — `clean` or `moved` — is written to its own file rather than encoded
// in the exit code, so a crash in here can never be read as "pixels moved".

import { readFile, writeFile } from 'node:fs/promises';

const args = process.argv.slice(2);
let mode = 'report';
let marker = '<!-- visual-parity -->';
let out = null;
let verdictPath = null;
let title = 'Merge-base visual parity';
const reports = [];
for (let index = 0; index < args.length; index += 1) {
  if (args[index] === '--mode') mode = args[(index += 1)];
  else if (args[index] === '--marker') marker = args[(index += 1)];
  else if (args[index] === '--out') out = args[(index += 1)];
  else if (args[index] === '--verdict') verdictPath = args[(index += 1)];
  else if (args[index] === '--title') title = args[(index += 1)];
  else {
    const split = args[index].indexOf('=');
    reports.push({ label: args[index].slice(0, split), path: args[index].slice(split + 1) });
  }
}

const viewports = [];
for (const { label, path } of reports) {
  const report = JSON.parse(await readFile(path, 'utf8'));
  const moved = report.results.filter((entry) => (entry.differingPixels ?? 0) > 0);
  viewports.push({
    label,
    moved,
    missing: report.missingFromCurrent ?? [],
    added: report.addedInCurrent ?? [],
    compared: report.compared ?? 0,
  });
}

const totalMoved = viewports.reduce((sum, entry) => sum + entry.moved.length, 0);
const structural = viewports.reduce(
  (sum, entry) => sum + entry.missing.length + entry.added.length,
  0,
);
const clean = totalMoved === 0 && structural === 0;

const lines = [marker, `### ${title}`, ''];
if (clean) {
  lines.push(
    `Every captured route is pixel-identical to the merge base across ${viewports
      .map((entry) => `${entry.label} (${entry.compared} routes)`)
      .join(' and ')}.`,
  );
} else {
  for (const entry of viewports) {
    lines.push(`**${entry.label}** — ${entry.moved.length} of ${entry.compared} routes moved.`);
    if (entry.moved.length) {
      lines.push('', '| Route | Differing pixels | Peak channel delta |', '| --- | ---: | ---: |');
      for (const route of entry.moved.slice(0, 40))
        lines.push(
          `| \`${route.route}\` | ${route.differingPixels?.toLocaleString() ?? '—'} | ${
            route.maxChannelDelta ?? '—'
          }/255 |`,
        );
      if (entry.moved.length > 40) lines.push(`| … ${entry.moved.length - 40} more | | |`);
    }
    if (entry.missing.length)
      lines.push('', `Routes lost since the merge base: ${entry.missing.join(', ')}`);
    if (entry.added.length)
      lines.push('', `Routes new since the merge base: ${entry.added.join(', ')}`);
    lines.push('');
  }
  lines.push(
    '',
    'Differing pixels locate a change; the peak channel delta sizes it. A large count with a',
    'delta of 1–2/255 is a sub-perceptual shift, a small count at 200/255 is something a reader',
    'would see.',
  );
}
lines.push(
  '',
  mode === 'enforce'
    ? '_Enforced: this PR is labelled `dependencies`, so a dependency bump that moves rendering fails here rather than merging silently._'
    : '_Informational: label the PR `visual-change` to state that pixels are meant to move, or `dependencies` to require zero._',
);

const body = `${lines.join('\n')}\n`;
if (out) await writeFile(out, body);
if (verdictPath) await writeFile(verdictPath, clean ? 'clean\n' : 'moved\n');
process.stdout.write(body);
