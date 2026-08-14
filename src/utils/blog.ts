import type { CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export const blogSlug = (entry: BlogEntry) =>
  entry.id.replace(/\/index(?:\.md)?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

export const assertUniqueBlogSlugs = (entries: BlogEntry[]) => {
  const foldersBySlug = new Map<string, string[]>();
  for (const entry of entries) {
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

// A post without a date is a draft and is not built anywhere. A dated post
// always gets a page (future dates render as unlisted, noindexed previews);
// only posts whose date has passed appear in listings, feeds and indexes.
export const renderableBlogEntries = (entries: BlogEntry[]) => {
  assertUniqueBlogSlugs(entries);
  return import.meta.env.PROD ? entries.filter((entry) => entry.data.date) : entries;
};

export const publishedBlogEntries = (entries: BlogEntry[], now = new Date()) => {
  const renderable = renderableBlogEntries(entries);
  return import.meta.env.PROD
    ? renderable.filter((entry) => entry.data.date && entry.data.date <= now)
    : renderable;
};

export const blogHref = (entry: BlogEntry) => `/blog/${blogSlug(entry)}/`;

const sourceLabels: Partial<Record<BlogEntry['data']['source'], string>> = {
  linkedin: 'LinkedIn',
  hackernoon: 'HackerNoon',
  external: 'another publication',
};

export const blogSourceLabel = (source: BlogEntry['data']['source']) => sourceLabels[source];
