export interface MenuItem {
  number?: string;
  key?: string;
  eyebrow?: string;
  label?: string;
  title?: string;
  description?: string;
  href: string;
}

export interface MenuGroup {
  title: string;
  note: string;
  items: MenuItem[];
}

export interface MenuColumn {
  heading: string;
  items: MenuItem[];
}

export interface Menu {
  label: string;
  width: number;
  primary: boolean;
  eyebrow?: string;
  items?: MenuItem[];
  groups?: MenuGroup[];
  columns?: MenuColumn[];
  footerLinks?: MenuItem[];
}

export const menus: Record<string, Menu> = {
  overview: {
    label: 'Overview',
    width: 380,
    primary: true,
    eyebrow: 'ON THIS PAGE',
    items: [
      { number: '01', title: 'Four-phase strategy', href: '/#strategy' },
      { number: '02', title: 'Nine principles', href: '/#principles' },
      { number: '03', title: 'Open source & tools', href: '/#opensource' },
      { number: '04', title: 'Reports & data', href: '/#reports' },
      { number: '05', title: 'Network & newsletter', href: '/#join' },
      { number: '06', title: 'Talks & keynotes', href: '/talks-and-events/' },
      { number: '07', title: 'Contact the Institute', href: '/contact/' },
    ],
  },
  policy: {
    label: 'Policy & Frameworks',
    width: 440,
    primary: true,
    items: [
      {
        eyebrow: 'INSTITUTIONAL RECORD',
        title: 'Policy contributions',
        description: 'Public policy work, standards engagements and the published record.',
        href: '/policy/',
      },
      {
        eyebrow: 'FOUNDATION',
        title: 'The nine principles',
        description: 'Commitments, failure modes and the controls that implement them.',
        href: '/principles/',
      },
      {
        eyebrow: 'PROCUREMENT FRAMEWORK',
        title: 'AI-RFX Procurement',
        description: 'Open RFP and RFI templates for machine learning systems.',
        href: '/frameworks/ai-rfx/',
      },
      {
        eyebrow: 'ANNUAL SURVEY',
        title: 'State of Production ML',
        description: 'The annual practitioner survey, compared year on year.',
        href: '/reports/state-of-ml-2025/',
      },
    ],
    footerLinks: [{ label: 'All initiatives', href: '/frameworks/' }],
  },
  oss: {
    label: 'Open source',
    width: 860,
    primary: true,
    items: [
      {
        key: 'kaos',
        eyebrow: 'AGENT INFRASTRUCTURE',
        title: 'K8s Agent OS (KAOS)',
        description:
          'Control plane for autonomous agents with scoped credentials, budgets, approval gates and an audit trail.',
        href: '/open-source/kaos/',
      },
      {
        key: 'kompute',
        eyebrow: 'GPU ACCELERATION',
        title: 'Kompute',
        description:
          'Cross-vendor GPU compute, portable across hardware, in Linux Foundation AI & Data.',
        href: '/open-source/kompute/',
      },
      {
        key: 'xai',
        eyebrow: 'EXPLAINABILITY',
        title: 'XAI Framework',
        description:
          'Data analysis, model evaluation and production monitoring for bias and explainability.',
        href: '/open-source/xai/',
      },
      {
        key: 'list',
        eyebrow: 'ECOSYSTEM',
        title: 'Production ML list',
        description: 'Community catalogue of production ML and MLOps tooling, curated weekly.',
        href: '/open-source/production-ml-list/',
      },
    ],
    footerLinks: [{ label: 'All projects', href: '/open-source/' }],
  },
  initiatives: {
    label: 'Initiatives',
    width: 880,
    primary: true,
    eyebrow: 'PRINCIPLES, FRAMEWORKS & DATA',
    groups: [
      {
        title: 'Principles & frameworks',
        note: 'APPLIED FRAMEWORKS',
        items: [
          {
            label: 'The nine principles',
            description: 'Commitments, failure modes, controls',
            href: '/principles/',
          },
          {
            label: 'Frameworks overview',
            description: 'Procurement, maturity and security',
            href: '/frameworks/',
          },
          {
            label: 'AI-RFX Procurement',
            description: 'Open RFP and RFI templates',
            href: '/frameworks/ai-rfx/',
          },
          {
            label: 'ML Maturity Model',
            description: 'Eight supplier assessment criteria',
            href: '/frameworks/maturity-model/',
          },
          {
            label: 'MLSecOps & agentic security',
            description: 'Lifecycle and agentic security taxonomy',
            href: '/frameworks/security/',
          },
          {
            label: 'Agentic RFX',
            description: 'Procurement criteria in development',
            href: '/frameworks/agentic-rfx/',
          },
          {
            label: 'Agentic Maturity Model',
            description: 'Operating capability in development',
            href: '/frameworks/agentic-maturity-model/',
          },
        ],
      },
      {
        title: 'Reports & data',
        note: 'PUBLISHED EVIDENCE',
        items: [
          {
            label: 'State of Production ML 2025',
            description: 'Practitioner survey, tools and statistics',
            href: '/reports/state-of-ml-2025/',
          },
          {
            label: '2024 edition',
            description: 'Previous annual survey',
            href: '/reports/state-of-ml-2024/',
          },
          {
            label: 'Methodology & citation',
            description: 'Fieldwork, samples and citation guidance',
            href: '/reports/',
          },
        ],
      },
      {
        title: 'Institutional work',
        note: 'INSTITUTIONAL WORK',
        items: [
          {
            label: 'Policy & standards',
            description: 'Public policy, standards and institutional records',
            href: '/policy/',
          },
          {
            label: 'Partners',
            description: 'Institutional relationships and roles',
            href: '/partners/',
          },
          {
            label: 'Open-source work',
            description: 'Practical tools and shared infrastructure',
            href: '/open-source/',
          },
          {
            label: 'Contact the Institute',
            description: 'Start an institutional collaboration',
            href: '/contact/',
          },
        ],
      },
    ],
  },
  network: {
    label: 'Network',
    width: 640,
    primary: true,
    columns: [
      {
        heading: 'JOIN',
        items: [
          {
            title: 'The ML Engineer newsletter',
            description: 'Weekly issues for 70k+ practitioners, with the full archive',
            href: '/newsletter/',
          },
          {
            title: 'Ethical AI Network',
            description: 'Members across engineering, research, policy and standards',
            href: '/network/',
          },
          {
            title: 'Membership',
            description: 'Contribution, benefits and how to apply',
            href: '/membership/',
          },
        ],
      },
      {
        heading: 'CONNECT',
        items: [
          {
            title: 'Talks & events',
            description: 'Keynotes, conference talks and roundtables',
            href: '/talks-and-events/',
          },
          { title: 'Partners', description: 'Institutional collaboration', href: '/partners/' },
          {
            title: 'Policy & standards',
            description: 'Engagements and public records',
            href: '/policy/',
          },
        ],
      },
    ],
  },
  about: {
    label: 'About',
    width: 340,
    primary: false,
    eyebrow: 'THE INSTITUTE',
    items: [
      { number: '01', title: 'Our story', href: '/about/' },
      { number: '02', title: 'Partners', href: '/partners/' },
      { number: '03', title: 'Contact', href: '/contact/' },
    ],
  },
};

export const wordmark = {
  primary: 'THE INSTITUTE FOR ETHICAL AI',
  secondary: 'ALIGNMENT + SAFETY',
};

export const siteTitle = 'The Institute for Ethical AI Alignment & Safety';

/* `short` is the same destination under a narrower label: the header swaps to it
   once the row runs out of room, rather than letting the pill push the page wide. */
export const join = {
  label: 'JOIN / CONTACT',
  short: 'JOIN',
  href: '/contact/?interest=newsletter#contact',
};
