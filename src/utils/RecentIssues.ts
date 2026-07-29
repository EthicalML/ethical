import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const ARCHIVE_DIRECTORY = resolve('public/mle');
const ISSUE_FILE = /^(\d+)\.html$/;

export async function getRecentIssueNumbers(limit = 4) {
  const filenames = await readdir(ARCHIVE_DIRECTORY);

  return filenames
    .map((filename) => ISSUE_FILE.exec(filename)?.[1])
    .filter((number): number is string => number !== undefined)
    .map(Number)
    .sort((first, second) => second - first)
    .slice(0, limit);
}
