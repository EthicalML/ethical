import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
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

const partners = defineCollection({
  loader: file('./src/content/partners.yaml'),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    role: z.string(),
    logo: z.string(),
    logo_color: z.string().optional(),
    detail: z.string(),
    links: z.array(
      z.object({
        label: z.string(),
        url: z.url(),
      }),
    ),
  }),
});

const surveyQuestion = z.object({
  label: z.string(),
  meta: z.string(),
  n2024: z.number().int().nonnegative(),
  n2025: z.number().int().nonnegative(),
  rows: z.array(
    z.object({
      label: z.string(),
      y2024: z.number().min(0).max(100),
      y2025: z.number().min(0).max(100),
      note: z.string(),
    }),
  ),
});

const survey = defineCollection({
  loader: file('./src/content/survey-questions.yaml'),
  schema: surveyQuestion,
});

const metrics = defineCollection({
  loader: file('./src/content/repos-metrics.yaml'),
  schema: z.object({
    values: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    ),
  }),
});

export const collections = { metrics, partners, principles, survey };
