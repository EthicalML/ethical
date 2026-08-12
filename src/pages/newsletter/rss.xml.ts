import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export const newsletterArchiveFrontmatter = {
  title: 'The ML Engineer — Newsletter archive',
  description:
    'The Machine Learning Engineer newsletter archive: weekly curated articles, tutorials and insights from experienced machine learning professionals since 2018.',
};

const siteOrigin = 'https://ethical.institute';

const absolutiseReferences = (html: string) =>
  html.replace(
    /\b(href|src)=(['"])(?![a-z][a-z\d+.-]*:|#)([^'"]*)\2/gi,
    (_match, attribute, quote, reference) => {
      // Feed readers do not share the site's base URL, so root-relative issue links
      // need a canonical origin in the portable HTML payload.
      return `${attribute}=${quote}${new URL(reference, siteOrigin).href}${quote}`;
    },
  );

export async function GET(context: APIContext) {
  const issues = (await getCollection('newsletter')).sort(
    (first, second) =>
      second.data.date.getTime() - first.data.date.getTime() ||
      second.data.issue - first.data.issue,
  );

  return rss({
    title: newsletterArchiveFrontmatter.title,
    description: newsletterArchiveFrontmatter.description,
    site: context.site!,
    items: issues.map((entry) => ({
      title: `The ML Engineer — Issue #${entry.data.issue}`,
      link: `/newsletter/${entry.data.issue}/`,
      pubDate: entry.data.date,
      description: entry.data.summary,
      categories: entry.data.tags,
      content: absolutiseReferences(entry.rendered!.html),
    })),
    customData: '<language>en</language>',
  });
}
