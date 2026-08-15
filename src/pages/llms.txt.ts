import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { menus, siteTitle, type Menu, type MenuItem } from '../data/navigation';
import { publishedBlogEntries } from '../utils/blog';

const SITE = 'https://ethical.institute';

interface PageMetadata {
  title: string;
  seoTitle?: string;
  description: string;
}

interface Surface extends PageMetadata {
  href: string;
  section: string;
}

const pageModules = import.meta.glob<{ frontmatter: PageMetadata }>('./**/*.mdx', {
  eager: true,
});
const astroPageModules = import.meta.glob('./**/*.astro');

const routeFromFilename = (filename: string) =>
  filename
    .replace(/^\.\//, '/')
    .replace(/\.(astro|mdx)$/, '/')
    .replace(/\/index\/$/, '/');
const routeFromHref = (href: string) => href.split(/[?#]/)[0] || '/';
const itemsIn = (menu: Menu): MenuItem[] => [
  ...(menu.items ?? []),
  ...(menu.groups?.flatMap(({ items }) => items) ?? []),
  ...(menu.columns?.flatMap(({ items }) => items) ?? []),
  ...(menu.footerLinks ?? []),
];

const pageMetadata = new Map(
  Object.entries(pageModules).map(([filename, module]) => [
    routeFromFilename(filename),
    module.frontmatter,
  ]),
);

const navigationSections = Object.values(menus).map((menu) => ({
  heading: menu.label,
  routes: itemsIn(menu).map(({ href }) => routeFromHref(href)),
}));
const sectionByRoute = new Map<string, string>();
for (const { heading, routes } of navigationSections) {
  for (const route of routes) if (!sectionByRoute.has(route)) sectionByRoute.set(route, heading);
}

// This indexable catalogue is not linked in the site navigation.
sectionByRoute.set('/open-source/ai-guidelines/', menus.oss.label);

const excludedFromLlms = [
  (route: string) => route === '/',
  (route: string) => route === '/privacy/',
  (route: string) => /^\/principles\/\d+\/$/.test(route),
  (route: string) => /^\/newsletter\/\d+\/$/.test(route),
];
const isExcluded = (route: string) => excludedFromLlms.some((check) => check(route));

const list = (surfaces: Surface[]) =>
  surfaces
    .map(
      ({ seoTitle, title, href, description }) =>
        `- [${seoTitle ?? title}](${SITE}${href}): ${description}`,
    )
    .join('\n');

export const GET: APIRoute = async () => {
  const [issues, principles, allBlogEntries] = await Promise.all([
    getCollection('newsletter'),
    getCollection('principles'),
    getCollection('blog'),
  ]);
  const blogPosts = publishedBlogEntries(allBlogEntries);
  const staticAstroRoutes = Object.keys(astroPageModules)
    .filter(
      (filename) =>
        !filename.includes('/prototypes/') &&
        !filename.includes('[') &&
        !filename.endsWith('/404.astro'),
    )
    .map(routeFromFilename);
  const sitemapRoutes = [
    ...pageMetadata.keys(),
    ...staticAstroRoutes,
    ...principles.map(({ data }) => `/principles/${data.number}/`),
    ...issues.map(({ data }) => `/newsletter/${data.issue}/`),
  ];
  const missingRoutes = [...new Set(sitemapRoutes)].filter(
    (route) => !sectionByRoute.has(route) && !isExcluded(route),
  );
  if (missingRoutes.length) {
    throw new Error(`llms.txt is missing a section assignment for: ${missingRoutes.join(', ')}`);
  }

  const staleRoutes = [...sectionByRoute.keys()].filter(
    (route) => !sitemapRoutes.includes(route) && !isExcluded(route),
  );
  if (staleRoutes.length) {
    throw new Error(`llms.txt has unknown routes: ${staleRoutes.join(', ')}`);
  }

  const surfaces: Surface[] = [...sectionByRoute].flatMap(([href, section]) => {
    if (isExcluded(href) || href === '/newsletter/' || href === '/blog/') return [];
    const metadata = pageMetadata.get(href);
    if (!metadata?.title || !metadata.description) {
      throw new Error(`llms.txt cannot find title and description frontmatter for: ${href}`);
    }
    return [{ ...metadata, href, section }];
  });

  const datedIssues = issues.sort(
    (first, second) => first.data.date.getTime() - second.data.date.getTime(),
  );
  const firstIssue = datedIssues[0];
  const lastIssue = datedIssues.at(-1);
  const newsletterTitle = itemsIn(menus.network).find(({ href }) => href === '/newsletter/')?.title;
  const newsletterSection = sectionByRoute.get('/newsletter/');
  if (!firstIssue || !lastIssue || !newsletterTitle || !newsletterSection) {
    throw new Error('llms.txt cannot derive the newsletter archive entry');
  }
  surfaces.push({
    title: newsletterTitle,
    description: `${issues.length} issues, ${firstIssue.data.date.toISOString().slice(0, 10)} to ${lastIssue.data.date.toISOString().slice(0, 10)}.`,
    href: '/newsletter/',
    section: newsletterSection,
  });

  const datedPosts = blogPosts.sort(
    (first, second) => (first.data.date?.getTime() ?? 0) - (second.data.date?.getTime() ?? 0),
  );
  const firstPost = datedPosts[0];
  const lastPost = datedPosts.at(-1);
  const blogTitle = itemsIn(menus.network).find(({ href }) => href === '/blog/')?.title;
  const blogSection = sectionByRoute.get('/blog/');
  if (!firstPost || !lastPost || !blogTitle || !blogSection) {
    throw new Error('llms.txt cannot derive the blog archive entry');
  }
  surfaces.push({
    title: 'Production ML, responsible AI and alignment blog',
    description: `${blogPosts.length} long-form articles, ${firstPost.data.date?.toISOString().slice(0, 10)} to ${lastPost.data.date?.toISOString().slice(0, 10)}.`,
    href: '/blog/',
    section: blogSection,
  });

  const homepage = pageMetadata.get('/');
  if (!homepage?.description) throw new Error('llms.txt cannot find homepage frontmatter');
  const preamble = `# ${siteTitle}\n\n> ${homepage.description}`;
  const sections = navigationSections.flatMap(({ heading }) => {
    const entries = surfaces.filter((surface) => surface.section === heading);
    return entries.length ? [`## ${heading}\n\n${list(entries)}`] : [];
  });

  return new Response(`${[preamble, ...sections].join('\n\n')}\n`);
};
