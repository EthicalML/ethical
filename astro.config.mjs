import { defineConfig } from 'astro/config';
import { existsSync, globSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { loadEnv } from 'vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import preact from '@astrojs/preact';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';
import rehypeSectionize from './src/plugins/rehype-sectionize.mjs';

// The form receiver's URL is read at build and inlined into the client bundle
// base64-encoded, never into the markup. It cannot be secret: the browser has
// to post to it. Keeping it out of the HTML denies a scraper the one surface it
// reliably crawls, and the receiver's own honeypot and throttles are the actual
// defence. Encoding here rather than in a component is what keeps it out of the
// rendered page entirely.
const { FORM_ENDPOINT = '' } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const formToken = FORM_ENDPOINT ? Buffer.from(FORM_ENDPOINT, 'utf8').toString('base64') : '';
const newsletterRedirects = Object.fromEntries(
  globSync('src/content/newsletter/*.md')
    .map((filename) => basename(filename, '.md'))
    .filter((issue) => /^\d+$/.test(issue))
    // Astro copies public/ before generating redirect pages. An existing
    // public/mle/N.html therefore blocks the redirect's N.html directory and
    // makes the build fail with ENOTDIR. Enable each redirect automatically as
    // its passthrough file is retired.
    .filter((issue) => !existsSync(resolve(`public/mle/${issue}.html`)))
    // Both spellings. The legacy site served these as real files, so GitHub
    // Pages resolved an extension-less /mle/395 to mle/395.html for free. A
    // redirect is a directory, not a file, so that implicit resolution has
    // nothing to find and every inbound link without the extension 404s.
    .flatMap((issue) => [
      [`/mle/${issue}.html`, `/newsletter/${issue}/`],
      [`/mle/${issue}`, `/newsletter/${issue}/`],
    ]),
);

export default defineConfig({
  site: 'https://ethical.institute',
  prefetch: true,
  vite: {
    define: { __FORM_TOKEN__: JSON.stringify(formToken) },
    server: { allowedHosts: ['ethical.institute', 'localhost', '127.0.0.1'] },
    preview: { allowedHosts: ['ethical.institute', 'localhost', '127.0.0.1'] },
  },
  redirects: {
    '/principles.html': '/principles/',
    '/security.html': '/frameworks/security/',
    '/rfx.html': '/frameworks/ai-rfx/',
    '/rfp.html': '/frameworks/ai-rfx/',
    '/xai.html': '/open-source/xai/',
    '/eal.html': '/open-source/',
    '/mlmm.html': '/frameworks/maturity-model/',
    '/network.html': '/network/',
    '/initiatives/': '/policy/',
    '/data/survey-explorer/': '/reports/state-of-ml-2025/',
    '/contact.html': '/contact/',
    '/mle.html': '/newsletter/',
    ...newsletterRedirects,
    '/mle/397.html': '/newsletter/397/',
    '/mle/397': '/newsletter/397/',
    '/mle/398.html': '/newsletter/398/',
    '/mle/398': '/newsletter/398/',
    '/privacypolicy.html': '/privacy/',
    '/state-of-ml-2024': '/reports/state-of-ml-2024/',
    '/state-of-ml-2025': '/reports/state-of-ml-2025/',
    '/state-of-ml-2024.html': '/reports/state-of-ml-2024/',
    '/state-of-ml-2025.html': '/reports/state-of-ml-2025/',
    '/_includes/apply-form.html': '/contact/',
    '/_includes/footer.html': '/',
    '/_includes/header.html': '/',
    '/_includes/navbar.html': '/',
    '/_includes/subscribe-form.html': '/',
  },
  markdown: {
    processor: unified({ rehypePlugins: [rehypeExternalLinks, rehypeSectionize] }),
  },
  integrations: [mdx(), preact(), sitemap()],
});
