// The policy record: the 30 delivered policy products shown in the /policy/ reading room
// (PolicyRecordPreview). Each entry carries the canonical publication link (href, usually
// acm.org) plus curated fields: slug (matches the committed page renders under
// public/images/policy-record/pages/<slug>/), and a neutral "what it argued" summary grounded
// in the extracted document text. `unverified: true` marks the remaining entries whose PDF
// could not be retrieved (summary derived from title and instrument only).
//
// Regenerating previews: scripts/fetch-policy-previews.mjs downloads the PDFs and extracts
// their text; scripts/render-policy-pages.mjs renders every page to webp. Cloudflare gates
// automated retrieval of some documents; those PDFs are fetched manually (see .github/copilot-instructions.md).

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
  role?: string;
}

export const products: PolicyRecordProduct[] = [
  {
    title: 'EC AI White Paper consultation submission',
    instrument: 'EU AI WHITE PAPER',
    date: '19 JUN 2020',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-euc-ai-white-paper.pdf',
    slug: '00-europe-tpc-comments-euc-ai-white-paper',
    role: 'AUTHOR',
    pages: 29,
    summary:
      'ACM Europe TPC’s questionnaire response to the February 2020 AI White Paper, submitted alongside its "When Computers Decide" recommendations and its statement on algorithmic transparency and accountability.',
  },
  {
    title: 'Comments on the proposed AI Act',
    instrument: 'EU AI ACT',
    date: '5 AUG 2021',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-ai-consultation.pdf',
    slug: '01-europe-tpc-comments-ai-consultation',
    role: 'AUTHOR',
    pages: 5,
    summary:
      'Backs the AI Act’s proportionate risk-based approach but argues the high-risk definition needs a more precise risk hierarchy (Articles 6 and 7) and that classification should follow the risk introduced by use.',
  },
  {
    title: 'Guidelines on the definition of an AI system & prohibited practices',
    instrument: 'EU AI ACT',
    date: 'DEC 2024',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-consultation-submission-2024---guidelines-on-the-application-of-the-definition-of-an-ai-system.pdf',
    slug: '02-acm-consultation-submission-2024---guidelines-on-the-application-of-the-defin',
    role: 'AUTHOR',
    pages: 32,
    summary:
      'Response to the call for evidence on guidelines applying the AI Act’s definition of an AI system and its prohibited practices, pressing for scope narrowness to be maintained rather than merely declared.',
  },
  {
    title: 'Regulation (EU) 2024/1689 consultation',
    instrument: 'EU AI ACT',
    date: 'APR 2026',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/public-policy/europe-tpc/consultation-on-regulation-on-eu-ai-act-eu-2024-1689-04082026',
    slug: '03-consultation-on-regulation-on-eu-ai-act-eu-2024-1689-04082026',
    role: 'AUTHOR',
    summary:
      'Responds to the proposed implementing regulation on the conduct of Commission proceedings under the AI Act, including how unilateral interim measures interact with parallel proceedings and an encrypted shadow-logging mechanism to balance confidentiality with security.',
  },
  {
    title: 'Article 50 transparency guidelines response',
    instrument: 'EU AI ACT',
    date: 'JUN 2026',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/public-policy/europe-tpc/response-consultation-article-50-ai-act-06022026',
    slug: '04-response-consultation-article-50-ai-act-06022026',
    role: 'AUTHOR',
    summary:
      'Responds to the draft guidelines on Article 50 transparency obligations, recommending the Commission ground them in the technical feasibility of content marking and detection and assess marking and provenance mechanisms across realistic redistribution chains.',
  },
  {
    title: 'Digital Omnibus on AI regulation',
    instrument: 'EU AI ACT',
    date: 'JAN 2026',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/acm-consultation-submission-2026---digital-omnibus-on-ai-regulation-proposal.pdf',
    slug: '05-acm-consultation-submission-2026---digital-omnibus-on-ai-regulation-proposal',
    role: 'AUTHOR',
    pages: 5,
    summary:
      'Recommendations on eight articles of the Digital Omnibus proposal: synthetic-data bias limits (Article 4a), a workable definition of "narrow" for frontier models (Article 6(4)), simplified documentation without sacrificing auditability (Article 11) and watermark detectability (Article 50(7)).',
  },
  {
    title: 'First General-Purpose AI Code of Practice response',
    instrument: 'GPAI CODE',
    date: '27 NOV 2024',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2024---general-purpose-ai-code-of-practice.pdf',
    slug: '06-acm-europetpc-consultation-2024---general-purpose-ai-code-of-practice',
    role: 'AUTHOR',
    pages: 4,
    summary:
      'Twelve recommendations on the first draft Code, chiefly that it stay within the limits of its title and not extend model-provider obligations onto deployers, and that working-group representation be re-calibrated.',
  },
  {
    title: 'Second General-Purpose AI Code of Practice response',
    instrument: 'GPAI CODE',
    date: '15 JAN 2025',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2024---2nd-general-purpose-ai-code-of-practice-1.pdf',
    slug: '07-acm-europetpc-consultation-2024---2nd-general-purpose-ai-code-of-practice-1',
    role: 'AUTHOR',
    pages: 5,
    summary:
      'Records that eight of twelve initial recommendations were integrated into the Second Draft main text, extends those eight and adds two net-new recommendations (13 and 14).',
  },
  {
    title: 'Scientific panel of independent experts comments',
    instrument: 'EU AI ACT',
    date: '15 NOV 2024',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-ai-scientific-panel-of-independent-experts-111524.pdf',
    slug: '08-europe-tpc-comments-ai-scientific-panel-of-independent-experts-111524',
    role: 'AUTHOR',
    pages: 2,
    summary:
      'Three recommendations on the implementing regulation establishing the AI Act’s scientific panel, chiefly that the Commission define the panel’s scope of work before capping the number of experts.',
  },
  {
    title: 'Calibrating oversight of agentic frontier models',
    instrument: 'DIGITAL OMNIBUS',
    date: 'APR 2026',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/public-policy/europe-tpc/calibrating-oversight-agentic-frontier-models-04272026',
    slug: '09-calibrating-oversight-agentic-frontier-models-04272026',
    role: 'AUTHOR',
    summary:
      'Argues that regulatory simplification for agentic frontier models must be paired with robust technical oversight, drawing on recent frontier-model disclosures and public evaluations by the UK AI Security Institute.',
  },
  {
    title: 'Frontier AI and European values',
    instrument: 'EU AI OFFICE',
    date: 'AUG 2026',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/frontier-ai-and-european-values_eurtpc_826.docx.pdf',
    slug: '29-frontier-ai-and-european-values',
    role: 'AUTHOR',
    pages: 6,
    summary:
      'Policy brief following the first European Expert Forum on Frontier AI, arguing Europe should compete through trustworthy governance rather than computational scale alone: purpose-first lifecycle assessment, sovereignty as a layered capability beyond compute, a case-by-case rather than uniform approach to open-weight release, and cognitive sovereignty as the condition for meaningful human oversight.',
  },
  {
    title: 'Reflections on draft prEN 18282',
    instrument: 'AI STANDARD',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/public-policy/europe-tpc/reflections-draft-pren-18282',
    slug: '10-reflections-draft-pren-18282',
    role: 'AUTHOR',
    summary:
      'Welcomes draft prEN 18282, the European standard on cybersecurity specifications for AI systems, for covering security across the full AI lifecycle, and recommends strengthening it in six areas.',
  },
  {
    title: 'Digital Services Act comments',
    instrument: 'DSA',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europetpc-digital-services-act-comments.pdf',
    slug: '11-europetpc-digital-services-act-comments',
    role: 'AUTHOR',
    pages: 1,
    summary:
      'Early record submission on two points: automated content-moderation systems carry inherent limits and biases legislation must safeguard, and Article 31 "vetted researcher" rules must not exclude qualified researchers through overly restrictive data-access provisions.',
  },
  {
    title: 'Digital Services Act delegated-regulation comments',
    instrument: 'DSA',
    date: '2024',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-europe-tpc-delegated-regulation-dsa-draft-act-comments-2024.pdf',
    slug: '12-acm-europe-tpc-delegated-regulation-dsa-draft-act-comments-2024',
    role: 'AUTHOR',
    pages: 6,
    summary:
      'Broadly endorses the draft delegated regulation on VLOP and VLOSE data access under Article 40, with recommendations on procedures and time constraints that let researchers study systemic risks in the Union.',
  },
  {
    title: 'Data Act comments',
    instrument: 'DATA ACT',
    date: 'MAY 2022',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-eur-tpc-data-act-comments-13may22a.pdf',
    slug: '13-acm-eur-tpc-data-act-comments-13may22a',
    role: 'AUTHOR',
    pages: 4,
    summary:
      'Supports the Data Act’s intent on fair allocation of data value and recommends expanding scope to metadata needed for reasonable consumption and processing of underlying data (Articles 2 and 3).',
  },
  {
    title: 'Cyber Resilience Act comments',
    instrument: 'CRA',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-cyber-resilience.pdf',
    slug: '14-europe-tpc-comments-cyber-resilience',
    role: 'AUTHOR',
    pages: 3,
    summary:
      'Warns that excluding certain open-source software from the CRA risks vendors leaning on OSS to circumvent requirements, citing Log4J and SolarWinds, and urges the Commission to expand the Regulation’s scope.',
  },
  {
    title: 'European Digital Principles supplemental comments',
    instrument: 'EU DIGITAL POLICY',
    date: 'SEP 2021',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europetpc-comments-digital-principles.pdf',
    slug: '15-europetpc-comments-digital-principles',
    role: 'AUTHOR',
    pages: 4,
    summary:
      'Supplemental section-by-section comments on the European Digital Principles consultation, concurring that universal access to fast and reliable internet services is of paramount importance.',
  },
  {
    title: 'High-risk AI classification guidelines response',
    instrument: 'EU AI ACT',
    date: 'JUN 2026',
    track: 'eu-ai-act',
    href: 'https://www.acm.org/public-policy/europe-tpc/etpc-response-targeted-ec-consultation',
    slug: '16-etpc-response-targeted-ec-consultation',
    role: 'AUTHOR',
    summary:
      'Responds to the draft Commission guidelines on classifying high-risk AI systems, warning that the broad end-to-end mandate makes benign subcomponents inherit high-risk status and arguing for modular classification and a workable Article 6(3) filter.',
  },
  {
    title: 'ETPC survey responses',
    instrument: 'EC CONSULTATION',
    date: 'OCT 2023',
    track: 'eu-digital-acts',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/etpc-survey-responses.pdf',
    slug: '17-etpc-survey-responses',
    role: 'AUTHOR',
    pages: 5,
    summary:
      'Response to the EC stakeholder survey on the draft G7 Guiding Principles for organizations developing advanced AI systems, building on the Hiroshima AI process and its associated code of conduct.',
  },
  {
    title: 'UK AI paper comments',
    instrument: 'UK AI PROPOSAL',
    date: 'JUN 2023',
    track: 'uk',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/final-acm_etpc-uk-ai-paper-comments.pdf',
    slug: '18-final-acm_etpc-uk-ai-paper-comments',
    role: 'AUTHOR',
    pages: 5,
    summary:
      'Reaffirms and builds on the 2022 UK comments, recording that three of four overarching recommendations (international compatibility, defined principles and a transparent process) were accepted.',
  },
  {
    title: 'UK AI regulatory framework comments',
    instrument: 'UK AI FRAMEWORK',
    date: 'SEP 2022',
    track: 'uk',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-uk-ai-framework-comments.pdf',
    slug: '19-europe-tpc-uk-ai-framework-comments',
    role: 'AUTHOR',
    pages: 5,
    summary:
      'Four general recommendations on the UK pro-innovation framework: environmental impacts explicitly addressed, international compatibility, clearly defined cross-sectoral principles and a highly transparent process.',
  },
  {
    title: 'UK National Data Strategy comments',
    instrument: 'UK DATA STRATEGY',
    date: 'DEC 2020',
    track: 'uk',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc-comments-uknds.pdf',
    slug: '20-europe-tpc-comments-uknds',
    role: 'AUTHOR',
    pages: 10,
    summary:
      'Principal-authored response to the UK National Data Strategy consultation, providing technical input on the September 2020 strategy from a production-ML practitioner perspective.',
  },
  {
    title: 'Independent International Scientific Panel on AI consultation',
    instrument: 'UNITED NATIONS',
    date: '2025',
    track: 'global',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-europetpc-consultation-2025---independent-international-scientific-panel-on-ai---united-nations-office-for-digital-and-emerging-technologies-1.pdf',
    slug: '21-acm-europetpc-consultation-2025---independent-international-scientific-panel-',
    role: 'AUTHOR',
    pages: 8,
    summary:
      'Response to the UN Office for Digital and Emerging Technologies on the establishment and functioning of the Independent International Scientific Panel on AI.',
  },
  {
    title: 'EU–US TTC AI taxonomy comments',
    instrument: 'EU–US TTC',
    date: 'NOV 2023',
    track: 'global',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/acm-etpc-ttc-ai-taxonomy-112123.pdf',
    slug: '22-acm-etpc-ttc-ai-taxonomy-112123',
    role: 'AUTHOR',
    pages: 3,
    summary:
      'Term-by-term recommendations on the first-edition TTC WG1 EU-US AI terminology and taxonomy, for example redefining "autonomy" around behavioural rather than intelligence-based capabilities.',
  },
  {
    title: 'Joint AI statement update',
    instrument: 'GLOBAL PRINCIPLES',
    date: 'OCT 2022',
    track: 'global',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/final-joint-ai-statement-update.pdf',
    slug: '23-final-joint-ai-statement-update',
    role: 'AUTHOR',
    pages: 6,
    summary:
      'Statement on Principles for Responsible Algorithmic Systems, updating the 2017 joint transparency statement and warning that opaque algorithmic decisions can be biased or erroneous.',
  },
  {
    title: 'Principles for the Development, Deployment, and Use of Generative AI Technologies',
    instrument: 'US POLICY',
    date: 'JUL 2023',
    track: 'global',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/principles-generative-ai.pdf',
    slug: '24-principles-generative-ai',
    role: 'AUTHOR',
    pages: 3,
    summary:
      'ACM Technology Policy Council’s eight principles for generative AI, stating that existing mechanisms for avoiding AI harms will likely not suffice.',
  },
  {
    title: 'Climate disclosure statement',
    instrument: 'EU AI ACT',
    date: 'JUN 2025',
    track: 'sustainability',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/acm_climate_disclosure_final.pdf',
    slug: '25-acm_climate_disclosure_final',
    role: 'AUTHOR',
    pages: 7,
    summary:
      'Policy brief proposing five primary and four secondary recommendations for environmental accountability in the AI Act, including inference-phase energy disclosure in Annexes IV, XI and XII and a public registry for climate metrics.',
  },
  {
    title: 'Data-centre statement',
    instrument: 'SUSTAINABILITY',
    date: 'JUN 2025',
    track: 'sustainability',
    href: 'https://www.acm.org/binaries/content/assets/public-policy/europe-tpc/acm_data_center_final.pdf',
    slug: '26-acm_data_center_final',
    role: 'AUTHOR',
    pages: 4,
    summary:
      'Policy brief with five recommendations for greener EU data centres, arguing that mandatory standards and customer-level reporting are both feasible and advantageous.',
  },
  {
    title: 'Data-centre statement: Spanish',
    instrument: 'SUSTAINABILITY',
    track: 'sustainability',
    href: 'https://www.acm.org/public-policy/europe-tpc/acm-data-center-final-spanish',
    slug: '27-acm-data-center-final-spanish',
    role: 'AUTHOR',
    summary:
      'Spanish edition of the greener data-centres policy brief, proposing five recommendations for policymakers to steer Europe toward more ecological data centres.',
  },
  {
    title: 'UN data governance principles: synthesis note',
    instrument: 'UN CSTD WGDG',
    date: 'MAR 2026',
    track: 'global',
    href: 'https://unctad.org/system/files/information-document/cstd-wgdg-synthesis-note-track-1_en.pdf',
    slug: '28-un-wgdg-synthesis-note',
    role: 'CO-FACILITATOR',
    summary:
      'Synthesis note of Track 1 of the UN CSTD Working Group on Data Governance: fundamental principles of data governance at all levels, consolidating seventy contributions from Member States, international organisations, civil society, academia and the private sector to a questionnaire designed by the track co-facilitators, the Institute among them.',
  },
];

// Documents in the policy arena the Institute contributed to rather than authored; they
// join the authored products in the POLICY view of the library, differentiated by role chip.
const policyContributions: PolicyRecordProduct[] = [
  {
    title: 'Governing AI for Humanity: final report',
    instrument: 'UN AI ADVISORY BODY',
    date: 'SEP 2024',
    track: 'global',
    href: 'https://www.un.org/sites/un2.un.org/files/governing_ai_for_humanity_final_report_en.pdf',
    slug: 'i01-governing-ai-for-humanity',
    role: 'AI EXPERT',
    summary:
      'Final report of the UN Secretary-General’s High-level Advisory Body on AI, setting out recommendations for international AI governance including an independent scientific panel and a global policy dialogue.',
  },
  {
    title: 'GPAI Code of Practice: Transparency chapter',
    instrument: 'EU AI ACT',
    date: 'JUL 2025',
    track: 'eu-ai-act',
    href: 'https://ec.europa.eu/newsroom/dae/redirection/document/118120',
    slug: 'i02-gpai-code-transparency',
    role: 'RECOMMENDATIONS ADOPTED',
    summary:
      'Transparency chapter of the final Code of Practice: three measures signatories implement to meet the Article 53(1) documentation obligations, with the Model Documentation Form. The Institute’s two GPAI Code responses fed this Code (eight of twelve recommendations integrated at second draft).',
  },
  {
    title: 'GPAI Code of Practice: Safety and Security chapter',
    instrument: 'EU AI ACT',
    date: 'JUL 2025',
    track: 'eu-ai-act',
    href: 'https://ec.europa.eu/newsroom/dae/redirection/document/118119',
    slug: 'i03-gpai-code-safety-security',
    role: 'RECOMMENDATIONS ADOPTED',
    summary:
      'Safety and Security chapter of the final Code of Practice: the framework providers of general-purpose AI models with systemic risk commit to, spanning end-to-end risk assessment, model reports and external evaluation.',
  },
  {
    title: 'Frontier AI expert findings: competitiveness, sovereignty and security',
    instrument: 'EU AI OFFICE',
    date: '2026',
    track: 'eu-ai-act',
    href: 'https://digital-strategy.ec.europa.eu/en/library/ai-office-publishes-frontier-ai-expert-findings-eu-competitiveness-sovereignty-and-security',
    slug: 'i04-frontier-ai-expert-findings',
    role: 'FORUM MEMBER',
    summary:
      'Key insights from the first meeting of the European Expert Forum on Frontier AI, on enhancing the EU’s competitiveness, sovereignty and security in frontier AI. The Institute participates through its Frontier AI Forum membership.',
  },
  {
    title: 'WGDG Progress Report: zero draft',
    instrument: 'UN CSTD WGDG',
    date: 'JUN 2026',
    track: 'global',
    href: 'https://unctad.org/meeting/6th-meeting-un-cstd-multi-stakeholder-working-group-data-governance-all-levels',
    slug: 'i12-wgdg-progress-report-zero-draft',
    role: 'CO-FACILITATOR',
    summary:
      'Zero draft of the progress report of the UN CSTD Working Group on Data Governance for its sixth meeting; Chapter 2 carries the Track 1 fundamental principles of data governance co-facilitated by the Institute. Interim draft, ahead of the final published report.',
  },
];

// The POLICY view of the library: authored products plus policy contributions.
export const policyLibrary: PolicyRecordProduct[] = [...products, ...policyContributions];

// The INDUSTRY view: industry-body publications the Institute co-created or reviewed.
export const industryFilters = [
  { label: 'ALL', value: 'all' },
  { label: 'PRINCIPLES', value: 'principles' },
  { label: 'AGENTIC SECURITY', value: 'agentic-security' },
];

export const industryLibrary: PolicyRecordProduct[] = [
  {
    title: 'Principles for Trusted AI',
    instrument: 'LF AI & DATA',
    date: 'FEB 2021',
    track: 'principles',
    href: 'https://lfaidata.foundation/blog/2021/02/08/lf-ai-data-announces-principles-for-trusted-ai/',
    slug: 'i13-lfai-principles-trusted-ai',
    role: 'CO-CREATED',
    summary:
      'The Linux Foundation AI & Data Foundation’s eight Principles for Trusted AI ((R)REPEATS: reproducibility, robustness, equitability, privacy, explainability, accountability, transparency, security), developed over a year by the Trusted AI Principles working group with the Institute among its members and approved by the Technical Advisory Council.',
  },
  {
    title: 'OWASP Top 10 for Agentic Applications 2026',
    instrument: 'OWASP AGENTIC',
    date: 'DEC 2025',
    track: 'agentic-security',
    href: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
    slug: 'i05-owasp-top10-agentic',
    role: 'REVIEWER',
    summary:
      'The peer-reviewed benchmark of the ten most critical security risks facing autonomous and agentic applications, assembled from more than one hundred contributors across security research and industry.',
  },
  {
    title: 'Agentic AI: threats and mitigations',
    instrument: 'OWASP AGENTIC',
    date: 'DEC 2025',
    track: 'agentic-security',
    href: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/',
    slug: 'i06-owasp-agentic-threats-mitigations',
    role: 'REVIEWER',
    summary:
      'The Agentic Security Initiative’s threat-model-based reference of emerging agentic threats and mitigations, with a structured taxonomy covering agent design, memory, planning and autonomy, tool use, and deployment.',
  },
  {
    title: 'Securing Agentic Applications Guide 1.0',
    instrument: 'OWASP AGENTIC',
    date: 'JUL 2025',
    track: 'agentic-security',
    href: 'https://genai.owasp.org/resource/securing-agentic-applications-guide-1-0/',
    slug: 'i07-owasp-securing-agentic-apps',
    role: 'REVIEWER',
    summary:
      'Practical technical guidance for securely designing and deploying LLM-powered agentic applications, from architecture patterns through operational controls.',
  },
  {
    title: 'State of Agentic AI Security and Governance 2.01',
    instrument: 'OWASP AGENTIC',
    date: 'JUN 2026',
    track: 'agentic-security',
    href: 'https://genai.owasp.org/resource/state-of-agentic-ai-security-and-governance/',
    slug: 'i08-owasp-state-agentic-security',
    role: 'REVIEWER',
    summary:
      'A landscape view of securing and governing autonomous AI systems: the evolving tool ecosystem, emerging regulation, and actionable insight for developing and deploying agentic systems responsibly.',
  },
  {
    title: 'Multi-Agentic system Threat Modeling Guide v1.0',
    instrument: 'OWASP AGENTIC',
    date: 'APR 2025',
    track: 'agentic-security',
    href: 'https://genai.owasp.org/resource/multi-agentic-system-threat-modeling-guide-v1-0/',
    slug: 'i10-owasp-multi-agent-threat-modeling',
    role: 'REVIEWER',
    summary:
      'Applies the agentic threat taxonomy to real-world multi-agent systems, where coordinating autonomous agents introduce additional complexity and new attack surfaces.',
  },
];
