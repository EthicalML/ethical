import { readFileSync } from 'node:fs';
// js-yaml, matching the parser Astro's `file()` loader uses, so dates arrive as Date objects.
import { load as parse } from 'js-yaml';

const eventsUrl = new URL('../../src/content/events.yaml', import.meta.url);
const talksUrl = new URL('../../src/pages/talks.mdx', import.meta.url);

const events = parse(readFileSync(eventsUrl, 'utf8'));
const frontmatter = parse(readFileSync(talksUrl, 'utf8').split('---')[1] ?? '');
const featured = frontmatter?.featured ?? [];

const failures = [];
const fail = (message) => failures.push(message);
const countBy = (values) => {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
};

if (!Array.isArray(events) || events.length === 0) {
  throw new Error('src/content/events.yaml did not parse into a non-empty array.');
}

for (const [name, count] of countBy(events.map((event) => event.name))) {
  if (count > 1) fail(`Duplicate event name "${name}" appears ${count} times.`);
}

for (const [slug, count] of countBy(events.map((event) => event.slug))) {
  if (count > 1) fail(`Duplicate event slug "${slug}" appears ${count} times.`);
}

const talks = events.flatMap((event) => event.talks ?? []);
const cfps = events.flatMap((event) => event.cfps ?? []);

const videos = talks.filter((talk) => talk.video).map((talk) => talk.video);
for (const [video, count] of countBy(videos)) {
  if (count > 1) fail(`Talk video ${video} is claimed by ${count} talks.`);
}

for (const event of events) {
  for (const cfp of event.cfps ?? []) {
    if (cfp.deadline && cfp.deadline > event.start) {
      const track = cfp.track ? ` (${cfp.track})` : '';
      fail(`CFP for "${event.name}"${track} closes after the event itself starts.`);
    }
  }
}

if (featured.length > 10) fail(`featured lists ${featured.length} entries; the maximum is 10.`);
for (const name of featured) {
  const matches = events.filter((event) => event.name === name).length;
  if (matches !== 1) fail(`featured entry "${name}" resolves to ${matches} events, expected 1.`);
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  const now = new Date();
  const upcoming = events.filter((event) => (event.end ?? event.start) >= now).length;
  const topics = countBy(events.flatMap((event) => event.topics ?? []));
  console.log(
    [
      `events        ${events.length}`,
      `upcoming      ${upcoming}`,
      `past          ${events.length - upcoming}`,
      `talks         ${talks.length}`,
      `cfps          ${cfps.length}`,
      `with video    ${videos.length}`,
      `featured      ${featured.length}`,
      `topics        ${[...topics]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([topic, count]) => `${topic} ${count}`)
        .join(', ')}`,
    ].join('\n'),
  );
}
