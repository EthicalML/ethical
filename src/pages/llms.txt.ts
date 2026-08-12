import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { newsletterFrontmatter } from './newsletter/frontmatter';

const SITE = 'https://ethical.institute';

const sectionHeadings = [
  'Principles and frameworks',
  'Open source',
  'Policy and research',
  'Newsletter',
  'About and network',
] as const;
type Section = (typeof sectionHeadings)[number];

interface PageMetadata {
  title: string;
  seoTitle?: string;
  description: string;
}

interface Surface extends PageMetadata {
  href: string;
}

// The order here is the reading order. Page titles and descriptions remain
// owned by their page frontmatter and are never repeated in this index.
const routeSections: Record<string, Section> = {
  '/principles/': 'Principles and frameworks',
  '/frameworks/': 'Principles and frameworks',
  '/frameworks/ai-rfx/': 'Principles and frameworks',
  '/frameworks/maturity-model/': 'Principles and frameworks',
  '/frameworks/security/': 'Principles and frameworks',
  '/frameworks/agentic-rfx/': 'Principles and frameworks',
  '/frameworks/agentic-maturity-model/': 'Principles and frameworks',
  '/open-source/': 'Open source',
  '/open-source/kaos/': 'Open source',
  '/open-source/kompute/': 'Open source',
  '/open-source/xai/': 'Open source',
  '/open-source/production-ml-list/': 'Open source',
  '/open-source/ai-guidelines/': 'Open source',
  '/policy/': 'Policy and research',
  '/reports/': 'Policy and research',
  '/reports/state-of-ml-2025/': 'Policy and research',
  '/reports/state-of-ml-2024/': 'Policy and research',
  '/newsletter/': 'Newsletter',
  '/talks-and-events/': 'About and network',
  '/network/': 'About and network',
  '/membership/': 'About and network',
  '/partners/': 'About and network',
  '/about/': 'About and network',
  '/contact/': 'About and network',
};

const preamble = `# The Institute for Ethical AI Alignment & Safety

> An independent research institute, founded in 2017, working to ensure that frontier AI is safe, aligned and accountable to people and society. It publishes open frameworks, open-source software, an annual practitioner survey and a weekly machine learning newsletter, and contributes to policy and standards work with the United Nations, the European Commission, ACM, the Linux Foundation, OWASP, IEEE and ISO/IEC.

The Institute develops methods for testing whether AI systems meet safety and alignment requirements, and publishes them so that engineers, organisations, standards bodies and public institutions can apply them. Everything below is public and free to cite; attribution to https://ethical.institute is appreciated.

Every newsletter issue is also served as plain markdown at https://ethical.institute/newsletter/{issue}.md — for example https://ethical.institute/newsletter/396.md. The complete list is under Optional, at the end of this file.`;

const pageModules = import.meta.glob<{ frontmatter: PageMetadata }>('./**/*.mdx', {
  eager: true,
});
const astroPageModules = import.meta.glob('./**/*.astro');

const routeFromFilename = (filename: string) => {
  const route = filename
    .replace(/^\.\//, '/')
    .replace(/\.(astro|mdx)$/, '/')
    .replace(/\/index\/$/, '/');
  return route;
};

const pageMetadata = new Map(
  Object.entries(pageModules).map(([filename, module]) => [
    routeFromFilename(filename),
    module.frontmatter,
  ]),
);
pageMetadata.set('/newsletter/', newsletterFrontmatter);

const excludedFromLlms = [
  (route: string) => route === '/',
  (route: string) => route === '/privacy/',
  (route: string) => /^\/principles\/\d+\/$/.test(route),
  (route: string) => /^\/newsletter\/\d+\/$/.test(route),
];

const list = (surfaces: Surface[]) =>
  surfaces
    .map(
      ({ seoTitle, title, href, description }) =>
        `- [${seoTitle ?? title}](${SITE}${href}): ${description}`,
    )
    .join('\n');

export const GET: APIRoute = async () => {
  const [issues, principles] = await Promise.all([
    getCollection('newsletter'),
    getCollection('principles'),
  ]);

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
    (route) => !routeSections[route] && !excludedFromLlms.some((isExcluded) => isExcluded(route)),
  );
  if (missingRoutes.length) {
    throw new Error(`llms.txt is missing a section assignment for: ${missingRoutes.join(', ')}`);
  }

  const staleRoutes = Object.keys(routeSections).filter((route) => !sitemapRoutes.includes(route));
  if (staleRoutes.length) {
    throw new Error(`llms.txt has unknown routes: ${staleRoutes.join(', ')}`);
  }

  const surfaces = Object.entries(routeSections).map(([href, section]) => {
    const metadata = pageMetadata.get(href);
    if (!metadata?.title || !metadata.description) {
      throw new Error(`llms.txt cannot find title and description frontmatter for: ${href}`);
    }
    return { ...metadata, href, section };
  });

  // Newest first: an assistant reading top-down should meet the current state
  // of the field before the 2018 archive.
  const archive = issues
    .sort((first, second) => second.data.issue - first.data.issue)
    .map(({ data }) => {
      const date = data.date ? ` (${data.date.toISOString().slice(0, 10)})` : '';
      const summary = data.summary ? `: ${data.summary.replace(/\s+/g, ' ').trim()}` : '';

      return `- [The ML Engineer #${data.issue}${date}](${SITE}/newsletter/${data.issue}.md)${summary}`;
    })
    .join('\n');

  const body = [
    preamble,
    ...sectionHeadings.map(
      (heading) =>
        `## ${heading}\n\n${list(surfaces.filter((surface) => surface.section === heading))}`,
    ),
    // The spec reserves `## Optional` for what a consumer may skip when its
    // context budget is short. Nine years of weekly issues is exactly that: the
    // most valuable corpus on the site and the one nobody should be forced to
    // read in full to understand what the Institute is.
    `## Optional\n\nThe full newsletter archive, one plain-markdown file per issue.\n\n${archive}`,
  ].join('\n\n');

  return new Response(`${body}\n`);
};
