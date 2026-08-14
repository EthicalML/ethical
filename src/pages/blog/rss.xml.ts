import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { blogHref, publishedBlogEntries } from '../../utils/blog';

// Preserve headroom under the 8 MB reader ceiling as new posts are added.
const wholeTextPostLimit = 100;

const absolutiseReferences = (html: string, site: URL) =>
  html.replace(
    /\b(href|src)=(['"])(?![a-z][a-z\d+.-]*:|#)([^'"]*)\2/gi,
    (_match, attribute, quote, reference) => {
      // Feed readers do not share the site's base URL, so root-relative post links
      // need a canonical origin in the portable HTML payload.
      return `${attribute}=${quote}${new URL(reference, site).href}${quote}`;
    },
  );

export async function GET(context: APIContext) {
  const site = context.site!;
  const posts = publishedBlogEntries(await getCollection('blog')).sort(
    (first, second) => second.data.date!.getTime() - first.data.date!.getTime(),
  );

  return rss({
    title: 'Production ML, responsible AI and alignment blog',
    description:
      'Writing from The Institute for Ethical AI Alignment & Safety on production machine learning, responsible AI and AI safety.',
    site,
    items: posts.map((entry, index) => ({
      title: entry.data.title,
      link: blogHref(entry),
      pubDate: entry.data.date!,
      description: entry.data.summary,
      categories: entry.data.tags,
      ...(index < wholeTextPostLimit
        ? { content: absolutiseReferences(entry.rendered!.html, site) }
        : {}),
    })),
    customData: '<language>en</language>',
  });
}
