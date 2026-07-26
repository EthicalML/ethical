import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import preact from '@astrojs/preact';
import rehypeSectionize from './src/plugins/rehype-sectionize.mjs';

export default defineConfig({
  markdown: {
    processor: unified({ rehypePlugins: [rehypeSectionize] }),
  },
  integrations: [mdx(), preact()],
});
