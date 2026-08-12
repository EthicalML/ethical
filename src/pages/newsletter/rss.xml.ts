import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

// Preserve headroom under the 8 MB reader ceiling as one issue is added each week.
const wholeTextIssueLimit = 100;

const absolutiseReferences = (html: string, site: URL) =>
  html.replace(
    /\b(href|src)=(['"])(?![a-z][a-z\d+.-]*:|#)([^'"]*)\2/gi,
    (_match, attribute, quote, reference) => {
      // Feed readers do not share the site's base URL, so root-relative issue links
      // need a canonical origin in the portable HTML payload.
      return `${attribute}=${quote}${new URL(reference, site).href}${quote}`;
    },
  );

export async function GET(context: APIContext) {
  const site = context.site!;
  const issues = (await getCollection('newsletter')).sort(
    (first, second) =>
      second.data.date.getTime() - first.data.date.getTime() ||
      second.data.issue - first.data.issue,
  );

  return rss({
    title: 'The ML Engineer — Newsletter archive',
    description:
      'The Machine Learning Engineer newsletter archive: weekly curated articles, tutorials and insights from experienced machine learning professionals since 2018.',
    site,
    items: issues.map((entry, index) => ({
      title: `The ML Engineer — Issue #${entry.data.issue}`,
      link: `/newsletter/${entry.data.issue}/`,
      pubDate: entry.data.date,
      description: entry.data.summary,
      categories: entry.data.tags,
      ...(index < wholeTextIssueLimit
        ? { content: absolutiseReferences(entry.rendered!.html, site) }
        : {}),
    })),
    customData: '<language>en</language>',
  });
}
