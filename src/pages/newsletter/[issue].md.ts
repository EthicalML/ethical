import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

const SITE = 'https://ethical.institute';

// Every issue is already authored as markdown, so the plain-text rendition is
// the source body plus a header carrying what the HTML page states in its
// chrome: the issue title, the date, the tags and the canonical URL. Nothing is
// re-rendered, which is what keeps this cheap and impossible to drift from the
// page it mirrors.
export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('newsletter');

  return entries.map((entry) => ({
    params: { issue: String(entry.data.issue) },
    props: { entry },
  }));
};

// Issue bodies link internally with site-absolute paths (`/open-source/…`).
// Those resolve for a browser sitting on the page and for nothing else, so a
// consumer that has only the markdown file loses them. Rewriting the link
// targets to absolute URLs makes each rendition self-contained. `](//` is left
// alone: it is already protocol-relative and absolute.
const absolutise = (markdown: string) => markdown.replace(/\]\(\/(?!\/)/g, `](${SITE}/`);

export const GET: APIRoute = ({ props }) => {
  const entry = props.entry as CollectionEntry<'newsletter'>;
  const { issue, date, summary, tags } = entry.data;

  const header = [
    `# The Machine Learning Engineer — Issue #${issue}`,
    '',
    ...(date ? [`Published: ${date.toISOString().slice(0, 10)}`] : []),
    ...(tags?.length ? [`Tags: ${tags.join(', ')}`] : []),
    `Canonical: ${SITE}/newsletter/${issue}/`,
    `Archive: ${SITE}/newsletter/`,
    '',
    ...(summary ? [`> ${summary}`, ''] : []),
  ].join('\n');

  // The build writes this to disk as `newsletter/<issue>.md`; GitHub Pages
  // serves it as `text/markdown; charset=utf-8` off the extension, so the
  // response headers set here never reach a reader and are omitted.
  return new Response(`${header}\n${absolutise(entry.body ?? '').trim()}\n`);
};
