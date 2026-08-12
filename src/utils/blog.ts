import type { CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export const publishedBlogEntries = (entries: BlogEntry[], now = new Date()) =>
  import.meta.env.PROD
    ? entries.filter((entry) => !entry.data.draft && entry.data.date <= now)
    : entries;

export const blogSlug = (entry: BlogEntry) =>
  entry.id.replace(/\/index(?:\.md)?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

export const hasBlogBody = (entry: BlogEntry) => Boolean(entry.body?.trim());

export const blogHref = (entry: BlogEntry) =>
  hasBlogBody(entry) ? `/blog/${blogSlug(entry)}/` : entry.data.url!;

const sourceLabels: Partial<Record<BlogEntry['data']['source'], string>> = {
  linkedin: 'LinkedIn',
  hackernoon: 'HackerNoon',
  external: 'another publication',
};

export const blogSourceLabel = (source: BlogEntry['data']['source']) => sourceLabels[source];
