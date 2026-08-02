// Enrichment data for the /prototypes/policy-record/ studies.
//
// The `products` array is copied verbatim from src/pages/policy.mdx (title, instrument, date,
// track, href) and enriched with curated per-document fields: slug (matches the committed
// public/images/policy-record/<slug>.webp thumbnail), pages, a neutral "what it argued"
// summary, short verbatim `phrases` for the per-document terrain (V4), and `unverified` for the
// six HTML hrefs whose text could not be extracted. `positions` and `pairs` are the shared
// cross-document enrichment. WHEN A WINNER IS CHOSEN this module consolidates back into the
// policy.mdx `products:` frontmatter (plus a positions/pairs block on the live page).
//
// Curation is grounded in the page-1..4 text extracted by scripts/fetch-policy-previews.mjs
// (tmp/pdftext, gitignored). Summaries for the six unverified HTML documents are derived from
// title and instrument only and flagged so the owner can verify them.

export interface PolicyRecordProduct {
  title: string;
  instrument: string;
  date?: string;
  track: string;
  href: string;
  slug: string;
  pages?: number;
  summary: string;
  unverified?: boolean;
  phrases: string[];
}

export interface PolicyPosition {
  id: string;
  name: string;
  description: string;
  docs: number[];
}

export interface PolicyPair {
  docFrom: number;
  instrument: string;
  reference: string;
  ours: string;
  theirs: string;
  verified: boolean;
}

export const products: PolicyRecordProduct[] = [
  {
    title: 'EC AI White Paper consultation submission',
    instrument: 'EU AI WHITE PAPER',
    date: '19 JUN 2020',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-euc-ai-white-paper.pdf',
    slug: '00-europe-tpc-comments-euc-ai-white-paper',
    pages: 29,
    summary:
      'ACM Europe TPC’s questionnaire response to the February 2020 AI White Paper, submitted alongside its "When Computers Decide" recommendations and its statement on algorithmic transparency and accountability.',
    phrases: [
      'expert and timely substantive input',
      'algorithmic transparency and accountability',
      'excellence and trust',
      'When Computers Decide',
      'legal and social issues',
      'sound public policy formation',
      'a European approach to AI',
    ],
  },
  {
    title: 'Comments on the proposed AI Act',
    instrument: 'EU AI ACT',
    date: '5 AUG 2021',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-ai-consultation.pdf',
    slug: '01-europe-tpc-comments-ai-consultation',
    pages: 5,
    summary:
      'Backs the AI Act’s proportionate risk-based approach but argues the high-risk definition needs a more precise risk hierarchy (Articles 6 and 7) and that classification should follow the risk introduced by use.',
    phrases: [
      'a proportionate risk-based approach',
      'a more precise definition',
      'the risk hierarchy',
      'significant technical concerns',
      'health, safety, or fundamental rights',
      'classification should follow the risk',
      'continuous post-deployment oversight',
    ],
  },
  {
    title: 'Guidelines on the definition of an AI system & prohibited practices',
    instrument: 'EU AI ACT',
    date: 'DEC 2024',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-consultation-submission-2024---guidelines-on-the-application-of-the-definition-of-an-ai-system.pdf',
    slug: '02-acm-consultation-submission-2024---guidelines-on-the-application-of-the-defin',
    pages: 32,
    summary:
      'Response to the call for evidence on guidelines applying the AI Act’s definition of an AI system and its prohibited practices, pressing for scope narrowness to be maintained rather than merely declared.',
    phrases: [
      'the definition of an AI system',
      'prohibited AI practices',
      'narrowness is maintained',
      'the full response to the survey',
      'entered into force',
      'improves the internal market',
      'define your terms',
    ],
  },
  {
    title: 'Regulation (EU) 2024/1689 consultation',
    instrument: 'EU AI ACT',
    date: 'APR 2026',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/public-policy/europe-tpc/consultation-on-regulation-on-eu-ai-act-eu-2024-1689-04082026',
    slug: '03-consultation-on-regulation-on-eu-ai-act-eu-2024-1689-04082026',
    unverified: true,
    summary:
      'Consultation response on the consolidated EU AI Act (Regulation (EU) 2024/1689). Summary derived from title and instrument; the page is HTML and its text was not extracted.',
    phrases: [],
  },
  {
    title: 'Article 50 transparency guidelines response',
    instrument: 'EU AI ACT',
    date: 'JUN 2026',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/public-policy/europe-tpc/response-consultation-article-50-ai-act-06022026',
    slug: '04-response-consultation-article-50-ai-act-06022026',
    unverified: true,
    summary:
      'Response to the AI Act Article 50 transparency-guidelines consultation. Summary derived from title and instrument; the page is HTML and its text was not extracted.',
    phrases: [],
  },
  {
    title: 'Digital Omnibus on AI regulation',
    instrument: 'EU AI ACT',
    date: 'JAN 2026',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/acm-consultation-submission-2026---digital-omnibus-on-ai-regulation-proposal.pdf',
    slug: '05-acm-consultation-submission-2026---digital-omnibus-on-ai-regulation-proposal',
    pages: 5,
    summary:
      'Recommendations on eight articles of the Digital Omnibus proposal: synthetic-data bias limits (Article 4a), a workable definition of "narrow" for frontier models (Article 6(4)), simplified documentation without sacrificing auditability (Article 11) and watermark detectability (Article 50(7)).',
    phrases: [
      'synthetic data inherits',
      'it may mask the biases',
      'without sacrificing auditability',
      'bias detection',
      'in an era of general-purpose',
      'state-of-the-art security',
      'marking and labelling',
    ],
  },
  {
    title: 'First General-Purpose AI Code of Practice response',
    instrument: 'GPAI CODE',
    date: '27 NOV 2024',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2024---general-purpose-ai-code-of-practice.pdf',
    slug: '06-acm-europetpc-consultation-2024---general-purpose-ai-code-of-practice',
    pages: 4,
    summary:
      'Twelve recommendations on the first draft Code, chiefly that it stay within the limits of its title and not extend model-provider obligations onto deployers, and that working-group representation be re-calibrated.',
    phrases: [
      'twelve (12) recommendations',
      'stay within the limits of its title',
      'model providers with systemic risks',
      'deployment and use-cases',
      'model deployers',
      'appropriate representation',
      'development and release stages',
    ],
  },
  {
    title: 'Second General-Purpose AI Code of Practice response',
    instrument: 'GPAI CODE',
    date: '15 JAN 2025',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2024---2nd-general-purpose-ai-code-of-practice-1.pdf',
    slug: '07-acm-europetpc-consultation-2024---2nd-general-purpose-ai-code-of-practice-1',
    pages: 5,
    summary:
      'Records that eight of twelve initial recommendations were integrated into the Second Draft main text, extends those eight and adds two net-new recommendations (13 and 14).',
    phrases: [
      'eight (8) out of twelve (12)',
      'integrated in the main text',
      'the full life cycle',
      'two (2) new recommendations',
      'models with systemic risk',
      'demonstrating compliance',
      'the second draft',
    ],
  },
  {
    title: 'Scientific panel of independent experts comments',
    instrument: 'EU AI ACT',
    date: '15 NOV 2024',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-ai-scientific-panel-of-independent-experts-111524.pdf',
    slug: '08-europe-tpc-comments-ai-scientific-panel-of-independent-experts-111524',
    pages: 2,
    summary:
      'Three recommendations on the implementing regulation establishing the AI Act’s scientific panel, chiefly that the Commission define the panel’s scope of work before capping the number of experts.',
    phrases: [
      'a scientific panel',
      'independent experts',
      'the scope of work',
      'market surveillance authorities',
      'implementing and enforcing',
      'three recommendations',
    ],
  },
  {
    title: 'Calibrating oversight of agentic frontier models',
    instrument: 'DIGITAL OMNIBUS',
    date: 'APR 2026',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/public-policy/europe-tpc/calibrating-oversight-agentic-frontier-models-04272026',
    slug: '09-calibrating-oversight-agentic-frontier-models-04272026',
    unverified: true,
    summary:
      'Applies the Institute’s continuous post-deployment oversight position to agentic frontier models. Summary derived from title and instrument; the page is HTML and its text was not extracted.',
    phrases: [],
  },
  {
    title: 'Reflections on draft prEN 18282',
    instrument: 'AI STANDARD',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/public-policy/europe-tpc/reflections-draft-pren-18282',
    slug: '10-reflections-draft-pren-18282',
    unverified: true,
    summary:
      'Reflections on the draft prEN 18282 AI standard. Summary derived from title and instrument; the page is HTML and its text was not extracted.',
    phrases: [],
  },
  {
    title: 'Digital Services Act comments',
    instrument: 'DSA',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europetpc-digital-services-act-comments.pdf',
    slug: '11-europetpc-digital-services-act-comments',
    pages: 1,
    summary:
      'Early record submission on two points: automated content-moderation systems carry inherent limits and biases legislation must safeguard, and Article 31 "vetted researcher" rules must not exclude qualified researchers through overly restrictive data-access provisions.',
    phrases: [
      'automated content moderation systems',
      'inherent limitations and biases',
      'vetted researchers',
      'access to large data sets',
      'appropriately safeguarded against',
      'the effective audit of platforms',
    ],
  },
  {
    title: 'Digital Services Act delegated-regulation comments',
    instrument: 'DSA',
    date: '2024',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-europe-tpc-delegated-regulation-dsa-draft-act-comments-2024.pdf',
    slug: '12-acm-europe-tpc-delegated-regulation-dsa-draft-act-comments-2024',
    pages: 6,
    summary:
      'Broadly endorses the draft delegated regulation on VLOP and VLOSE data access under Article 40, with recommendations on procedures and time constraints that let researchers study systemic risks in the Union.',
    phrases: [
      'data access',
      'Very Large Online Platforms',
      'study systemic risks',
      'the time constraints identified',
      'roles and responsibilities',
      'Digital Services Coordinators',
    ],
  },
  {
    title: 'Data Act comments',
    instrument: 'DATA ACT',
    date: 'MAY 2022',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-eur-tpc-data-act-comments-13may22a.pdf',
    slug: '13-acm-eur-tpc-data-act-comments-13may22a',
    pages: 4,
    summary:
      'Supports the Data Act’s intent on fair allocation of data value and recommends expanding scope to metadata needed for reasonable consumption and processing of underlying data (Articles 2 and 3).',
    phrases: [
      'fair access to and use of data',
      'the scope of the Data Act',
      'to encompass metadata',
      'fairness in the allocation',
      'the data economy',
      'processing services',
    ],
  },
  {
    title: 'Cyber Resilience Act comments',
    instrument: 'CRA',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-cyber-resilience.pdf',
    slug: '14-europe-tpc-comments-cyber-resilience',
    pages: 3,
    summary:
      'Warns that excluding certain open-source software from the CRA risks vendors leaning on OSS to circumvent requirements, citing Log4J and SolarWinds, and urges the Commission to expand the Regulation’s scope.',
    phrases: [
      'open-source software',
      'unintended consequences',
      'circumvent its requirements',
      'the Log4J and SolarWinds examples',
      'products with digital elements',
      'horizontal cybersecurity requirements',
    ],
  },
  {
    title: 'European Digital Principles supplemental comments',
    instrument: 'EU DIGITAL POLICY',
    date: 'SEP 2021',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europetpc-comments-digital-principles.pdf',
    slug: '15-europetpc-comments-digital-principles',
    pages: 4,
    summary:
      'Supplemental section-by-section comments on the European Digital Principles consultation, concurring that universal access to fast and reliable internet services is of paramount importance.',
    phrases: [
      'European Digital Principles',
      'universal access to internet services',
      'fast and reliable internet',
      'of paramount importance',
      'technical matters',
      'societal impacts',
    ],
  },
  {
    title: 'ETPC response to targeted EC consultation',
    instrument: 'EC CONSULTATION',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/public-policy/europe-tpc/etpc-response-targeted-ec-consultation',
    slug: '16-etpc-response-targeted-ec-consultation',
    unverified: true,
    summary:
      'Response to a targeted European Commission consultation. Summary derived from title and instrument; the page is HTML and its text was not extracted.',
    phrases: [],
  },
  {
    title: 'ETPC survey responses',
    instrument: 'EC CONSULTATION',
    date: 'OCT 2023',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/etpc-survey-responses.pdf',
    slug: '17-etpc-survey-responses',
    pages: 5,
    summary:
      'Response to the EC stakeholder survey on the draft G7 Guiding Principles for organizations developing advanced AI systems, building on the Hiroshima AI process and its associated code of conduct.',
    phrases: [
      'draft G7 Guiding Principles',
      'advanced AI systems',
      'the Hiroshima AI process',
      'global "guardrails"',
      'foundation models',
      'a Code of Conduct',
    ],
  },
  {
    title: 'UK AI paper comments',
    instrument: 'UK AI PROPOSAL',
    date: 'JUN 2023',
    track: 'uk',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/final-acm_etpc-uk-ai-paper-comments.pdf',
    slug: '18-final-acm_etpc-uk-ai-paper-comments',
    pages: 5,
    summary:
      'Reaffirms and builds on the 2022 UK comments, recording that three of four overarching recommendations (international compatibility, defined principles and a transparent process) were accepted.',
    phrases: [
      'a pro-innovation approach',
      'compatible internationally',
      'the latter three of these four',
      'were accepted',
      'clearly defined',
      'a highly transparent process',
    ],
  },
  {
    title: 'UK AI regulatory framework comments',
    instrument: 'UK AI FRAMEWORK',
    date: 'SEP 2022',
    track: 'uk',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-uk-ai-framework-comments.pdf',
    slug: '19-europe-tpc-uk-ai-framework-comments',
    pages: 5,
    summary:
      'Four general recommendations on the UK pro-innovation framework: environmental impacts explicitly addressed, international compatibility, clearly defined cross-sectoral principles and a highly transparent process.',
    phrases: [
      'establish a pro-innovation approach',
      'Environmental risks and impacts',
      'compatible internationally',
      'cross-sectoral principles',
      'clearly defined',
      'a highly transparent process',
    ],
  },
  {
    title: 'UK National Data Strategy comments',
    instrument: 'UK DATA STRATEGY',
    date: 'DEC 2020',
    track: 'uk',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-uknds.pdf',
    slug: '20-europe-tpc-comments-uknds',
    pages: 10,
    summary:
      'Principal-authored response to the UK National Data Strategy consultation, providing technical input on the September 2020 strategy from a production-ML practitioner perspective.',
    phrases: [
      'a national data strategy',
      'sound public policy',
      'public understanding',
      'technology and policy',
      'ongoing dialogue',
      'the intersection of technology',
    ],
  },
  {
    title: 'Independent International Scientific Panel on AI consultation',
    instrument: 'UNITED NATIONS',
    date: '2025',
    track: 'global',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2025---independent-international-scientific-panel-on-ai---united-nations-office-for-digital-and-emerging-technologies-1.pdf',
    slug: '21-acm-europetpc-consultation-2025---independent-international-scientific-panel-',
    pages: 8,
    summary:
      'Response to the UN Office for Digital and Emerging Technologies on the establishment and functioning of the Independent International Scientific Panel on AI.',
    phrases: [
      'Independent International Scientific Panel',
      'Digital and Emerging Technologies',
      'the establishment and functioning',
      'inclusive AI governance',
      'not just industry led',
      'internationally compatible',
    ],
  },
  {
    title: 'EU–US TTC AI taxonomy comments',
    instrument: 'EU–US TTC',
    date: 'NOV 2023',
    track: 'global',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-etpc-ttc-ai-taxonomy-112123.pdf',
    slug: '22-acm-etpc-ttc-ai-taxonomy-112123',
    pages: 3,
    summary:
      'Term-by-term recommendations on the first-edition TTC WG1 EU-US AI terminology and taxonomy, for example redefining "autonomy" around behavioural rather than intelligence-based capabilities.',
    phrases: [
      'common terminology',
      'a taxonomy for Artificial Intelligence',
      'a set of behavioural capabilities',
      'self-directed behaviour',
      'within contextual tolerance',
      'concerns and recommendations',
    ],
  },
  {
    title: 'Joint AI statement update',
    instrument: 'GLOBAL PRINCIPLES',
    date: 'OCT 2022',
    track: 'global',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/final-joint-ai-statement-update.pdf',
    slug: '23-final-joint-ai-statement-update',
    pages: 6,
    summary:
      'Statement on Principles for Responsible Algorithmic Systems, updating the 2017 joint transparency statement and warning that opaque algorithmic decisions can be biased or erroneous.',
    phrases: [
      'Responsible Algorithmic Systems',
      'far-reaching effects',
      'without further substantive review',
      'proportional to the specific problems',
      'biased or erroneous',
      'established legal, ethical',
    ],
  },
  {
    title: 'Principles for the Development, Deployment, and Use of Generative AI Technologies',
    instrument: 'US POLICY',
    date: 'JUL 2023',
    track: 'global',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/principles-generative-ai.pdf',
    slug: '24-principles-generative-ai',
    pages: 3,
    summary:
      'ACM Technology Policy Council’s eight principles for generative AI, stating that existing mechanisms for avoiding AI harms will likely not suffice.',
    phrases: [
      'eight principles',
      'will likely not suffice',
      'fair, accurate, and beneficial',
      'the future of work',
      'human safety',
      'deep technical expertise',
    ],
  },
  {
    title: 'Climate disclosure statement',
    instrument: 'EU AI ACT',
    date: 'JUN 2025',
    track: 'sustainability',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/acm_climate_disclosure_final.pdf',
    slug: '25-acm_climate_disclosure_final',
    pages: 7,
    summary:
      'Policy brief proposing five primary and four secondary recommendations for environmental accountability in the AI Act, including inference-phase energy disclosure in Annexes IV, XI and XII and a public registry for climate metrics.',
    phrases: [
      'true environmental accountability',
      'inference-phase energy disclosures',
      'a public registry for climate metrics',
      'indirect GHG emissions',
      'incomplete inference phase coverage',
      'standardize energy reporting',
    ],
  },
  {
    title: 'Data-centre statement',
    instrument: 'SUSTAINABILITY',
    date: 'JUN 2025',
    track: 'sustainability',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/acm_data_center_final.pdf',
    slug: '26-acm_data_center_final',
    pages: 4,
    summary:
      'Policy brief with five recommendations for greener EU data centres, arguing that mandatory standards and customer-level reporting are both feasible and advantageous.',
    phrases: [
      'greener data centers',
      'mandatory standards',
      'customer-level reporting',
      'feasible and advantageous',
      'efficiency gains',
      'proactive and effective strategies',
    ],
  },
  {
    title: 'Data-centre statement: Spanish',
    instrument: 'SUSTAINABILITY',
    track: 'sustainability',
    href: 'https://www.acm.org/public-policy/europe-tpc/acm-data-center-final-spanish',
    slug: '27-acm-data-center-final-spanish',
    unverified: true,
    summary:
      'Spanish-language edition of the data-centre policy brief. Summary derived from title and instrument; the page is HTML and its text was not extracted.',
    phrases: [],
  },
];

// Named recurring positions. Every position lists >=2 document indices whose extracted texts
// carried it. Grounded in the page-1..4 extractions; the six HTML documents contribute only
// where their title unambiguously names the position (e.g. agentic oversight).
export const positions: PolicyPosition[] = [
  {
    id: 'post-deployment-oversight',
    name: 'Continuous post-deployment oversight',
    description:
      'Oversight of self-modifying and agentic systems must continue after release, not stop at market entry.',
    docs: [1, 9, 24],
  },
  {
    id: 'definition-scoping',
    name: 'Definition scoping',
    description:
      'Regulatory terms must be defined precisely, with narrowness maintained rather than merely declared.',
    docs: [1, 2, 5, 22],
  },
  {
    id: 'risk-proportionality',
    name: 'Risk proportional to use',
    description:
      'Classification and obligations should follow the risk introduced by the use of a system, kept proportionate to it.',
    docs: [1, 2, 23],
  },
  {
    id: 'provider-vs-deployer',
    name: 'Provider versus deployer scope',
    description:
      'Instruments aimed at model providers should not silently extend obligations onto deployers; deployment differs from release.',
    docs: [5, 6, 7],
  },
  {
    id: 'auditability',
    name: 'Auditability and traceability',
    description:
      'Documentation and access must preserve the artefacts needed for a meaningful, reproducible audit.',
    docs: [5, 11, 12, 23],
  },
  {
    id: 'synthetic-data-bias',
    name: 'Dataset provenance and synthetic-data bias',
    description:
      'Synthetic data inherits and can mask the bias of its source model, so provenance and bias testing must be explicit.',
    docs: [5, 13, 23],
  },
  {
    id: 'open-source-security',
    name: 'Open-source software and security',
    description:
      'Open-source components need security controls and scoping that avoid circumvention incentives, drawing on production ML security practice.',
    docs: [6, 7, 14],
  },
  {
    id: 'international-compatibility',
    name: 'International compatibility',
    description:
      'AI regulation must remain internationally compatible and interoperable to sustain a global ecosystem.',
    docs: [17, 18, 19, 22],
  },
  {
    id: 'transparent-governance',
    name: 'Transparent, inclusive governance',
    description:
      'The development of AI frameworks must stay a highly transparent process and governance should not be industry-led alone.',
    docs: [0, 18, 19, 21],
  },
  {
    id: 'environmental-accountability',
    name: 'Environmental and energy accountability',
    description:
      'Environmental impact, inference-phase energy transparency and data-centre efficiency belong in the instruments.',
    docs: [18, 19, 25, 26],
  },
  {
    id: 'researcher-data-access',
    name: 'Vetted-researcher data access',
    description:
      'Independent researchers need workable, secure data access to audit platforms and study systemic risk.',
    docs: [11, 12],
  },
];

// Verbatim adoption pairs for V2. `verified: true` means both sides came from extracted ACM/
// Institute text (an authored recommendation and its own later record of integration). Pairs
// where the adopted/official side is sourced from general knowledge of the instrument are
// `verified: false` and render a PENDING OWNER VERIFICATION tag; those official quotes are
// paraphrase-close and must be confirmed against the instrument before any live use.
export const pairs: PolicyPair[] = [
  {
    docFrom: 6,
    instrument: 'GPAI CODE OF PRACTICE',
    reference: 'Second Draft, main text',
    ours: 'the code of practice should stay within the limits of its title “General Purpose AI Code of Practice”',
    theirs:
      'eight (8) out of twelve (12) initial recommendations made for the First Draft are integrated in the main text of the Second Draft',
    verified: true,
  },
  {
    docFrom: 19,
    instrument: 'UK PRO-INNOVATION APPROACH',
    reference: '2022 framework → 2023 white paper',
    ours: 'Development of an AI regulatory framework must remain a highly transparent process',
    theirs: 'Europe TPC is gratified that the latter three of these four suggestions were accepted',
    verified: true,
  },
  {
    docFrom: 1,
    instrument: 'EU AI ACT',
    reference: 'Article 6 and Annex III',
    ours: 'The Proposal’s definition of high-risk systems would benefit from a more precise definition of the risk hierarchy',
    theirs:
      'The adopted Article 6 sets explicit high-risk classification conditions and Annex III enumerates the high-risk areas.',
    verified: false,
  },
  {
    docFrom: 5,
    instrument: 'DIGITAL OMNIBUS',
    reference: 'Article 4a(1)(a)',
    ours: 'If the source model encodes intersectional biases, the synthetic data inherits them. Furthermore, it may mask the biases',
    theirs:
      'Article 4a permits sensitive-data processing for bias detection only where it cannot be effectively fulfilled by synthetic or other data.',
    verified: false,
  },
  {
    docFrom: 14,
    instrument: 'CYBER RESILIENCE ACT',
    reference: 'Open-source steward provisions',
    ours: 'the exclusion of certain types of open-source software (OSS) from the Cyber Resilience Act may have unintended consequences',
    theirs:
      'The final CRA introduces a lighter-touch “open-source software steward” category rather than a blanket exclusion.',
    verified: false,
  },
  {
    docFrom: 25,
    instrument: 'EU AI ACT',
    reference: 'Annexes IV, XI, XII',
    ours: 'Include inference-phase energy disclosures in Annexes IV, XI, XII AI Act',
    theirs:
      'GPAI documentation obligations require providers to record the energy consumption of the model.',
    verified: false,
  },
];
