import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const principles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/principles' }),
  schema: z.object({
    number: z.string(),
    title: z.string(),
    description: z.string(),
    commitment: z.string(),
    failure_modes: z.array(z.string()).length(3).optional(),
    controls: z.array(z.string()).length(3).optional(),
    related_links: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    ),
  }),
});

export const collections = { principles };
