import type { CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export const blogSlug = (entry: BlogEntry) =>
  entry.id.replace(/\/index(?:\.md)?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

export const hasBlogBody = (entry: BlogEntry) => Boolean(entry.body?.trim());

export const assertUniqueBlogSlugs = (entries: BlogEntry[]) => {
  const foldersBySlug = new Map<string, string[]>();
  for (const entry of entries.filter(hasBlogBody)) {
    const slug = blogSlug(entry);
    const folder = entry.id.replace(/\/index(?:\.md)?$/, '');
    foldersBySlug.set(slug, [...(foldersBySlug.get(slug) ?? []), folder]);
  }
  const collisions = [...foldersBySlug.entries()].filter(([, folders]) => folders.length > 1);
  if (collisions.length) {
    const detail = collisions.map(([slug, folders]) => `${slug}: ${folders.join(', ')}`).join('; ');
    throw new Error(`Blog slug collision after removing date prefixes: ${detail}`);
  }
};

export const publishedBlogEntries = (entries: BlogEntry[], now = new Date()) => {
  assertUniqueBlogSlugs(entries);
  return import.meta.env.PROD
    ? entries.filter((entry) => !entry.data.draft && entry.data.date <= now)
    : entries;
};

export const blogHref = (entry: BlogEntry) =>
  hasBlogBody(entry) ? `/blog/${blogSlug(entry)}/` : entry.data.url!;

const sourceLabels: Partial<Record<BlogEntry['data']['source'], string>> = {
  linkedin: 'LinkedIn',
  hackernoon: 'HackerNoon',
  external: 'another publication',
};

export const blogSourceLabel = (source: BlogEntry['data']['source']) => sourceLabels[source];
