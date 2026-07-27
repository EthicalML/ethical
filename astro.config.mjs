import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import preact from '@astrojs/preact';
import rehypeSectionize from './src/plugins/rehype-sectionize.mjs';

export default defineConfig({
  site: 'https://ethical.institute',
  vite: {
    server: { allowedHosts: ['*'] },
    preview: { allowedHosts: ['*'] },
  },
  redirects: {
    '/principles.html': '/principles/',
    '/security.html': '/frameworks/mlsecops/',
    '/rfx.html': '/frameworks/',
    '/rfp.html': '/frameworks/',
    '/xai.html': '/open-source/',
    '/eal.html': '/open-source/',
    '/mlmm.html': '/frameworks/maturity-model/',
    '/network.html': '/network/',
    '/contact.html': '/contact/',
    '/mle.html': '/network/', // TODO: point to the newsletter landing page when it exists.
    '/privacypolicy.html': '/privacy/',
  },
  markdown: {
    processor: unified({ rehypePlugins: [rehypeSectionize] }),
  },
  integrations: [mdx(), preact(), sitemap()],
});
