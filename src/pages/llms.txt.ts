import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://ethical.institute';

interface Surface {
  title: string;
  href: string;
  note: string;
}

// The curated index, in the order a reader unfamiliar with the Institute
// should meet it: what it commits to, what it builds, what it has published,
// then how to reach it. Kept here rather than derived from `src/data/navigation.ts`
// because the header menus are shaped by what fits in a menu column, and this
// file is shaped by what an assistant needs to answer a question.
const sections: { heading: string; surfaces: Surface[] }[] = [
  {
    heading: 'Principles and frameworks',
    surfaces: [
      {
        title: 'The 9 Responsible AI Principles',
        href: '/principles/',
        note: 'The Institute’s foundational commitments, each with its failure modes and the controls that implement it.',
      },
      {
        title: 'Frameworks overview',
        href: '/frameworks/',
        note: 'Index of the applied frameworks: procurement, maturity assessment and security.',
      },
      {
        title: 'AI-RFX Procurement Framework',
        href: '/frameworks/ai-rfx/',
        note: 'Open RFP and RFI templates for procuring machine learning systems.',
      },
      {
        title: 'ML Maturity Model',
        href: '/frameworks/maturity-model/',
        note: 'Eight criteria for assessing a supplier’s production machine learning capability.',
      },
      {
        title: 'MLSecOps and agentic security',
        href: '/frameworks/security/',
        note: 'Lifecycle security guidance and the agentic security taxonomy.',
      },
      {
        title: 'Agentic RFX',
        href: '/frameworks/agentic-rfx/',
        note: 'Procurement criteria for agentic systems, in development.',
      },
      {
        title: 'Agentic Maturity Model',
        href: '/frameworks/agentic-maturity-model/',
        note: 'Operating capability model for agentic systems, in development.',
      },
    ],
  },
  {
    heading: 'Open source',
    surfaces: [
      {
        title: 'Open-source projects',
        href: '/open-source/',
        note: 'Index of the Institute’s software and maintained reference lists.',
      },
      {
        title: 'KAOS (Kubernetes Agent OS)',
        href: '/open-source/kaos/',
        note: 'Control plane for autonomous agents: scoped credentials, budgets, approval gates and an audit trail.',
      },
      {
        title: 'Kompute',
        href: '/open-source/kompute/',
        note: 'Cross-vendor GPU compute framework, portable across hardware, hosted in Linux Foundation AI & Data.',
      },
      {
        title: 'XAI Framework',
        href: '/open-source/xai/',
        note: 'Data analysis, model evaluation and production monitoring for bias and explainability.',
      },
      {
        title: 'Awesome Production Machine Learning',
        href: '/open-source/production-ml-list/',
        note: 'Community catalogue of production ML and MLOps tooling, curated weekly.',
      },
      {
        title: 'Awesome AI Guidelines',
        href: '/open-source/ai-guidelines/',
        note: 'Catalogue of AI principles, guidelines, frameworks and regulatory initiatives worldwide.',
      },
    ],
  },
  {
    heading: 'Policy, standards and research',
    surfaces: [
      {
        title: 'Policy and standards record',
        href: '/policy/',
        note: 'Published policy contributions and standards engagements, with the source documents.',
      },
      {
        title: 'Reports and data',
        href: '/reports/',
        note: 'The annual practitioner survey, its methodology and citation guidance.',
      },
      {
        title: 'State of Production Machine Learning 2025',
        href: '/reports/state-of-ml-2025/',
        note: 'Latest edition of the annual survey, compared against the previous year.',
      },
      {
        title: 'State of Production Machine Learning 2024',
        href: '/reports/state-of-ml-2024/',
        note: 'Previous edition of the annual survey.',
      },
    ],
  },
  {
    heading: 'Newsletter',
    surfaces: [
      {
        title: 'The ML Engineer newsletter',
        href: '/newsletter/',
        note: 'Weekly curated machine learning writing for 70k+ practitioners, with the searchable archive of every issue.',
      },
    ],
  },
  {
    heading: 'Talks, network and contact',
    surfaces: [
      {
        title: 'Talks and events',
        href: '/talks-and-events/',
        note: 'Keynotes, conference talks and roundtables, with recordings where they exist.',
      },
      {
        title: 'Ethical AI Network',
        href: '/network/',
        note: 'The practitioner network across engineering, research, policy and standards.',
      },
      {
        title: 'Membership',
        href: '/membership/',
        note: 'What members contribute, what they get, and how to apply.',
      },
      {
        title: 'Partners',
        href: '/partners/',
        note: 'Institutional relationships and the role each partner holds.',
      },
      {
        title: 'About the Institute',
        href: '/about/',
        note: 'History since 2017, mission, methods and how the work is organised.',
      },
      {
        title: 'Contact',
        href: '/contact/',
        note: 'Start an institutional collaboration, or reach the Institute directly.',
      },
    ],
  },
];

const preamble = `# The Institute for Ethical AI Alignment & Safety

> An independent research institute, founded in 2017, working to ensure that frontier AI is safe, aligned and accountable to people and society. It publishes open frameworks, open-source software, an annual practitioner survey and a weekly machine learning newsletter, and contributes to policy and standards work with the United Nations, the European Commission, ACM, the Linux Foundation, OWASP, IEEE and ISO/IEC.

The Institute develops methods for testing whether AI systems meet safety and alignment requirements, and publishes them so that engineers, organisations, standards bodies and public institutions can apply them. Everything below is public and free to cite; attribution to https://ethical.institute is appreciated.

Every newsletter issue is also served as plain markdown at https://ethical.institute/newsletter/{issue}.md — for example https://ethical.institute/newsletter/396.md. The complete list is under Optional, at the end of this file.`;

const list = (surfaces: Surface[]) =>
  surfaces.map(({ title, href, note }) => `- [${title}](${SITE}${href}): ${note}`).join('\n');

export const GET: APIRoute = async () => {
  const issues = await getCollection('newsletter');

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
    ...sections.map(({ heading, surfaces }) => `## ${heading}\n\n${list(surfaces)}`),
    // The spec reserves `## Optional` for what a consumer may skip when its
    // context budget is short. Nine years of weekly issues is exactly that: the
    // most valuable corpus on the site and the one nobody should be forced to
    // read in full to understand what the Institute is.
    `## Optional\n\nThe full newsletter archive, one plain-markdown file per issue.\n\n${archive}`,
  ].join('\n\n');

  return new Response(`${body}\n`);
};
