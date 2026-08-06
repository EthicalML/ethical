import { getCollection } from 'astro:content';

export async function getRecentIssueNumbers(limit = 4) {
  const issues = await getCollection('newsletter');

  return issues
    .map((entry) => entry.data.issue)
    .sort((first, second) => second - first)
    .slice(0, limit);
}
