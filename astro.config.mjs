import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import preact from '@astrojs/preact';
import rehypeExternalLinks from './src/plugins/rehype-external-links.mjs';
import rehypeSectionize from './src/plugins/rehype-sectionize.mjs';

export default defineConfig({
  site: 'https://ethical.institute',
  prefetch: true,
  env: {
    schema: {
      FORM_ENDPOINT: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
        default: '',
      }),
    },
  },
  vite: {
    server: { allowedHosts: ['*'] },
    preview: { allowedHosts: ['*'] },
  },
  redirects: {
    '/principles.html': '/principles/',
    '/security.html': '/frameworks/security/',
    '/rfx.html': '/frameworks/ai-rfx/',
    '/rfp.html': '/frameworks/ai-rfx/',
    '/xai.html': '/open-source/',
    '/eal.html': '/open-source/',
    '/mlmm.html': '/frameworks/maturity-model/',
    '/network.html': '/network/',
    '/initiatives/': '/policy/',
    '/contact.html': '/contact/',
    '/mle.html': '/network/',
    '/privacypolicy.html': '/privacy/',
    '/state-of-ml-2025.html': '/reports/state-of-ml-2025/',
  },
  markdown: {
    processor: unified({ rehypePlugins: [rehypeExternalLinks, rehypeSectionize] }),
  },
  integrations: [mdx(), preact(), sitemap()],
});
