import { createMarkdownProcessor } from '@astrojs/markdown-remark';

// An issue's article sections are the only h2s that wrap their whole title in one link;
// the weekly list, events, open-source and about headings link a fragment or nothing.
// That corpus convention is what tells an article apart from a structural section.
const ARTICLE_HEADING = /^## \[([^\]]+)\]\(([^)]+)\)[ \t]*$/;
const SECTION_HEADING = /^## (.+?)[ \t]*$/;
const LABEL_HEADING = /^### (.+?)[ \t]*$/;
// The lookbehind keeps images out: bolding the [alt](src) half of ![alt](src) separates
// the bang from the link and the image collapses into a bold link.
const MARKDOWN_LINK = /(?<!!)(\*\*)?\[([^\]]+)\]\(([^)]+)\)(\*\*)?/g;
const BLOCK_CLOSE = /<\/(p|h1|h2|h3|ul|ol|blockquote)>/g;
const BLOCK_OPEN = /<(p|h1|h2|h3|li|blockquote)(\s|>)/g;

export type ClipboardMode = 'linkedin' | 'newsletter';

const absolutise = (markdown: string, site: string) =>
  markdown.replace(
    /\]\((\/[^)]*)\)/g,
    (_match, path: string) => `](${site.replace(/\/$/, '')}${path})`,
  );

// The newsletter editor bolds nothing by default and the author wants every link to carry
// weight, so links that are not already bold get wrapped.
const boldLinks = (markdown: string) =>
  markdown.replace(MARKDOWN_LINK, (match, before, label, href) =>
    before ? match : `**[${label}](${href})**`,
  );

// Paragraphs there have no bottom margin, so an empty paragraph after each block is the
// only way to get separation that survives the paste.
const padBlocks = (html: string) => html.replace(BLOCK_CLOSE, (match) => `${match}\n<p>&nbsp;</p>`);

// Both editors default to justified text on paste, which stretches lines to the full
// column width and reads badly.
const alignLeft = (html: string) =>
  html.replace(BLOCK_OPEN, (_match, tag, tail) => `<${tag} style="text-align: left"${tail}`);

/**
 * The whole issue body, retargeted at a rich text editor:
 *
 * - article titles become bold links, because these editors strip links out of headings
 *   but keep them inside bold text (verified by probe on 2026-08-17);
 * - structural section headings stay headings, accepting the lost link in their titles;
 * - the h3 labels inside the events and open-source blocks become bold text;
 * - every section is preceded by a rule.
 */
export function toClipboardMarkdown(body: string, site: string, mode: ClipboardMode) {
  const out: string[] = [];

  for (const line of body.split('\n')) {
    const article = ARTICLE_HEADING.exec(line);
    if (article) {
      out.push('', '---', '', `**[${article[1]}](${article[2]})**`);
      continue;
    }

    const section = SECTION_HEADING.exec(line);
    if (section) {
      out.push('', '---', '', `# ${section[1]}`);
      continue;
    }

    const label = LABEL_HEADING.exec(line);
    if (label) {
      out.push(`**${label[1]}**`);
      continue;
    }

    out.push(line);
  }

  const markdown = absolutise(
    out
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim(),
    site,
  );
  return mode === 'newsletter' ? boldLinks(markdown) : markdown;
}

/**
 * Rendered HTML for the clipboard: a title, the issue summary as a subtitle, then the
 * whole body. Rendered through the site's own markdown processor so emphasis, lists and
 * links match what the issue page shows.
 */
export async function toClipboardHtml({
  body,
  title,
  summary,
  site,
  mode,
}: {
  body: string;
  title: string;
  summary?: string;
  site: string;
  mode: ClipboardMode;
}) {
  const processor = await createMarkdownProcessor({});
  const { code } = await processor.render(toClipboardMarkdown(body, site, mode));
  const head = [`<h2>${title}</h2>`, summary ? `<p><em>${summary}</em></p>` : ''];
  const html = [...head.filter(Boolean), mode === 'newsletter' ? padBlocks(code) : code].join('\n');
  return alignLeft(html);
}

/**
 * Blog bodies reference committed SVG diagrams beside the post. Neither editor renders
 * SVG, so each one is swapped for its rasterised PNG inlined as a data URI: the bytes ride
 * in the clipboard, so nothing is hosted and an unpublished draft still pastes whole.
 *
 * PNGs come from `node scripts/blog/rasterise-diagrams.mjs`, which writes them under tmp/.
 * A diagram with no PNG yet is left as it is rather than dropped.
 */
export function inlineDiagrams(markdown: string, readPng: (name: string) => Buffer | undefined) {
  return markdown.replace(
    /!\[([^\]]*)\]\(\.\/([^)]+)\.svg\)/g,
    (match, alt: string, name: string) => {
      const png = readPng(`${name}.png`);
      return png ? `![${alt}](data:image/png;base64,${png.toString('base64')})` : match;
    },
  );
}
