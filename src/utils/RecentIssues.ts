import { getCollection } from 'astro:content';

export async function getRecentIssueNumbers(limit = 4) {
  const issues = await getCollection('newsletter');

  return issues
    .map((entry) => entry.data.issue)
    .sort((first, second) => second - first)
    .slice(0, limit);
}

// Every published issue number, ascending. The command palette answers "is 123 an
// issue?" locally, so it needs the whole set rather than the recent window.
export async function getIssueNumbers() {
  const issues = await getCollection('newsletter');

  return issues.map((entry) => entry.data.issue).sort((first, second) => first - second);
}

// Consecutive runs collapse to `from-to`, so the ~400 numbers ship as a handful of
// bytes in the markup of every page instead of a comma list.
export function toIssueRanges(numbers: number[]) {
  return numbers
    .reduce<[number, number][]>((ranges, issue) => {
      const last = ranges.at(-1);
      if (last && issue === last[1] + 1) last[1] = issue;
      else ranges.push([issue, issue]);
      return ranges;
    }, [])
    .map(([from, to]) => (from === to ? `${from}` : `${from}-${to}`))
    .join(' ');
}

// The homepage's "issues published" stat. Counting entries rather than reading the
// highest number keeps it honest if the archive ever has a gap.
export async function getIssueCount() {
  return (await getCollection('newsletter')).length;
}
