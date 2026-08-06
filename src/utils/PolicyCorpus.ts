import { getCollection } from 'astro:content';

export const policyCorpusThemes = [
  { label: 'ALL', value: 'all' },
  { label: 'OVERSIGHT', value: 'oversight' },
  { label: 'TRANSPARENCY', value: 'transparency' },
  { label: 'SECURITY', value: 'security' },
  { label: 'DEFINITIONS', value: 'definitions' },
  { label: 'SUSTAINABILITY', value: 'sustainability' },
] as const;

export type PolicyCorpusTheme = Exclude<(typeof policyCorpusThemes)[number]['value'], 'all'>;

export interface PolicyCorpusQuote {
  date?: string;
  documentId: string;
  featured: boolean;
  href: string;
  score: number;
  text: string;
  theme: PolicyCorpusTheme;
  title: string;
}

const themePatterns: Record<PolicyCorpusTheme, RegExp[]> = {
  oversight: [
    /oversight/i,
    /monitor/i,
    /human.in.the.loop/i,
    /incident/i,
    /audit/i,
    /diverg/i,
    /accountab/i,
  ],
  transparency: [
    /transparen/i,
    /disclos/i,
    /public (?:record|registr|scrutin)/i,
    /traceab/i,
    /redress/i,
    /contestab/i,
  ],
  security: [/security/i, /cyber/i, /vulnerab/i, /attack/i, /breach/i, /SBOM/i, /privacy/i],
  definitions: [/defin/i, /terminolog/i, /classification/i, /risk.based/i, /precision/i, /scope/i],
  sustainability: [
    /sustainab/i,
    /environment/i,
    /energy/i,
    /water/i,
    /climate/i,
    /emission/i,
    /carbon/i,
  ],
};

const preferredQuotes: Array<{ fragment: string; score: number; theme: PolicyCorpusTheme }> = [
  {
    fragment: 'incident response and handling of security breaches',
    score: 100,
    theme: 'security',
  },
  { fragment: 'software bills of material will be central', score: 95, theme: 'security' },
  {
    fragment: 'Existing mechanisms and modes for avoiding such harm likely will not suffice',
    score: 90,
    theme: 'security',
  },
  {
    fragment: 'security flaws of machine learning systems being exploited',
    score: 85,
    theme: 'security',
  },
  {
    fragment: 'narrowness is maintained rather than merely declared',
    score: 82,
    theme: 'oversight',
  },
  {
    fragment: 'certain artifacts are irreducible for a meaningful audit',
    score: 80,
    theme: 'oversight',
  },
  {
    fragment: 'ADM processes must be traceable so that they can be subjected to democratic control',
    score: 82,
    theme: 'transparency',
  },
  {
    fragment: 'Transparency must be paired with processes for accountability',
    score: 80,
    theme: 'transparency',
  },
  {
    fragment: 'Human-centered AI systems work in partnership with human beings',
    score: 82,
    theme: 'definitions',
  },
  { fragment: 'sunlight is often the best disinfectant', score: 82, theme: 'sustainability' },
  {
    fragment: 'public availability of model weights should not exempt developers',
    score: 80,
    theme: 'sustainability',
  },
];

const fallbackThemes: Record<string, PolicyCorpusTheme> = {
  'eu-ai-act': 'oversight',
  'eu-digital-acts': 'transparency',
  uk: 'definitions',
  global: 'definitions',
  sustainability: 'sustainability',
};

function sentences(body: string) {
  const protectedStop = '\uE000';
  const normalised = body
    .replaceAll(/\s+/g, ' ')
    .replaceAll(/\S+@\S+/g, ' ')
    .replaceAll(/(?:https?:\/\/|www\.)\S+/gi, ' ')
    .replaceAll(/www\.acm\.\s*org\/public-policy/gi, ' ')
    .replaceAll(/(\d)\.(\d)/g, `$1${protectedStop}$2`)
    .replaceAll(/\b(?:e\.g|i\.e|Art|Arts|Rec|Fig|No)\./gi, (abbreviation) =>
      abbreviation.replaceAll('.', protectedStop),
    )
    .trim();
  return (normalised.match(/[^.!?]+[.!?](?:[”"'])?(?=\s+[A-Z“"(]|\s*$)/gu) ?? []).map((sentence) =>
    sentence.replaceAll(protectedStop, '.'),
  );
}

function classify(text: string, fallback: PolicyCorpusTheme) {
  const preferred = preferredQuotes.find(({ fragment }) =>
    text.toLowerCase().includes(fragment.toLowerCase()),
  );
  if (preferred) return { score: preferred.score, theme: preferred.theme };
  const scores = Object.entries(themePatterns).map(([theme, patterns]) => ({
    theme: theme as PolicyCorpusTheme,
    score: patterns.reduce((total, pattern) => total + Number(pattern.test(text)), 0),
  }));
  scores.sort((left, right) => right.score - left.score);
  const best = scores[0];
  return { score: best.score, theme: best.score ? best.theme : fallback };
}

function candidates(body: string, fallback: PolicyCorpusTheme) {
  const emDash = String.fromCodePoint(0x2014);
  return sentences(body)
    .map((text) =>
      text
        .trim()
        .replaceAll(/^[•●▪\u200B\s]+/gu, '')
        .replace(/^['“"]|['”"]$/g, ''),
    )
    .filter(
      (text) =>
        text.length >= 72 &&
        text.length <= 300 &&
        !text.includes(emDash) &&
        !/https?:\/\/|@|Table of Contents|Contribution ID|Fields marked with/i.test(text) &&
        (text.match(/[a-z]/gi)?.length ?? 0) > text.length * 0.55,
    )
    .map((text) => {
      const classification = classify(text, fallback);
      const directive = /\b(recommend|should|must|require|urge|propose)\b/i.test(text) ? 3 : 0;
      const lengthFit = text.length >= 105 && text.length <= 240 ? 2 : 0;
      return {
        text,
        theme: classification.theme,
        score: classification.score * 4 + directive + lengthFit,
      };
    })
    .sort((left, right) => right.score - left.score || left.text.length - right.text.length);
}

export async function getPolicyCorpus() {
  const documents = await getCollection('policyProducts');
  const selected = documents.flatMap((document) => {
    const documentCandidates = candidates(document.body ?? '', fallbackThemes[document.data.track]);
    if (documentCandidates.length < 2)
      throw new Error(`Policy corpus needs two quotable sentences in ${document.id}.`);
    const quotes = [documentCandidates[0]];
    quotes.push(
      documentCandidates.find((candidate) => candidate.theme !== quotes[0].theme) ??
        documentCandidates[1],
    );
    return quotes.map((quote) => ({
      ...quote,
      date: document.data.date,
      documentId: document.id,
      featured: false,
      href: document.data.href,
      title: document.data.title,
    }));
  });

  selected.sort((left, right) => right.score - left.score || left.title.localeCompare(right.title));
  const featuredKeys = new Set(
    policyCorpusThemes
      .filter((theme) => theme.value !== 'all')
      .map(({ value }) => selected.find((quote) => quote.theme === value))
      .filter((quote): quote is (typeof selected)[number] => Boolean(quote))
      .slice(0, 4)
      .map((quote) => `${quote.documentId}:${quote.text}`),
  );
  const quotes: PolicyCorpusQuote[] = selected.map((quote) => ({
    ...quote,
    featured: featuredKeys.has(`${quote.documentId}:${quote.text}`),
  }));
  return { documents, quotes };
}
