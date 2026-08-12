import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const principles = defineCollection({
  loader: glob({ pattern: '0[1-9].md', base: './src/content/principles' }),
  schema: z.object({
    number: z.string(),
    title: z.string(),
    description: z.string(),
    commitment: z.string(),
    failure_modes: z.array(z.string()).length(3),
    controls: z.array(z.string()).length(3),
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

export const NEWSLETTER_TAGS = [
  'ai-agents',
  'ai-ethics',
  'ai-policy',
  'computer-vision',
  'data-engineering',
  'explainability',
  'forecasting',
  'generative-ai',
  'gpu-compute',
  'llms',
  'ml-education',
  'ml-research',
  'ml-security',
  'mlops',
  'nlp',
  'privacy',
  'recommender-systems',
  'reinforcement-learning',
] as const;

export const EVENT_TOPICS = [
  'ai-agents',
  'ai-infrastructure',
  'ai-policy',
  'cloud-native',
  'data-engineering',
  'general-tech',
  'llms',
  'ml-security',
  'mlops',
  'python',
  'research',
] as const;

const events = defineCollection({
  loader: file('./src/content/events.yaml'),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    series: z.string(),
    url: z.url(),
    // Site-absolute path to a committed banner derivative, not a remote URL.
    // Absent means the generated SVG banner is used instead.
    image: z.string().optional(),
    start: z.date(),
    end: z.date().optional(),
    location: z.string().optional(),
    topics: z.array(z.enum(EVENT_TOPICS)).optional(),
    cfps: z
      .array(
        z.object({
          track: z.string().optional(),
          url: z.url().optional(),
          deadline: z.date().optional(),
        }),
      )
      .optional(),
    talks: z
      .array(
        z.object({
          title: z.string(),
          track: z.string().optional(),
          url: z.url().optional(),
          context: z.string().optional(),
          video: z.url().optional(),
          image: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

const newsletter = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/newsletter' }),
  schema: z.object({
    issue: z.number().int().positive(),
    date: z.date().optional(),
    summary: z.string().optional(),
    tags: z.array(z.enum(NEWSLETTER_TAGS)).max(3).optional(),
    syndication: z.array(z.object({ name: z.string(), url: z.url() })).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/blog' }),
  schema: z
    .object({
      title: z.string(),
      date: z.date(),
      summary: z.string().optional(),
      tags: z.array(z.string()).max(5).optional(),
      series: z.string().optional(),
      authors: z.array(z.string()).default(['Alejandro Saucedo']),
      source: z.enum(['original', 'linkedin', 'hackernoon', 'external']).default('original'),
      url: z.url().optional(),
      originalDate: z.date().optional(),
      image: z.string().optional(),
      draft: z.boolean().default(false),
    })
    .refine(({ source, url }) => source === 'original' || url !== undefined, {
      message: 'A non-original post requires its original URL.',
      path: ['url'],
    }),
});

const policyProducts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/policy-products' }),
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    track: z.enum(['eu-ai-act', 'eu-digital-acts', 'uk', 'global', 'sustainability']),
    href: z.url(),
  }),
});

export const collections = {
  blog,
  events,
  metrics,
  newsletter,
  partners,
  policyProducts,
  principles,
  survey,
};
