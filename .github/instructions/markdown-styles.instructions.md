---
applyTo: '{src/content/**/*.md,src/pages/**/*.mdx}'
paths:
  - 'src/content/**/*.md'
  - 'src/pages/**/*.mdx'
---

# Markdown elements and how they render

Every markdown element the site styles, what it looks like, and the constraints on using it. Markdown is processed by the unified pipeline configured in `astro.config.mjs` (`rehype-external-links` then `rehype-sectionize`); presentation lives in `src/styles/tokens.css` (shared prose rules) and in the owning page for surface-specific overrides. Two rendering surfaces exist and differ where noted:

| Surface           | Where                                                                      | Wrapper                                                                              |
| ----------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Prose pages       | `src/pages/**/*.mdx` through `ProseLayout.astro`                           | `.prose-section` per `##` heading                                                    |
| Newsletter issues | `src/content/newsletter/*.md` through `src/pages/newsletter/[issue].astro` | `.article-section.issue-section` per `##` heading, inside `.article-body.issue-body` |
| Blog posts        | `src/content/blog/*/index.md` through `src/pages/blog/[slug].astro`        | `.article-section.blog-section` per `##` heading, inside `.article-body.blog-body`   |

## Headings

`## Heading` is not a plain heading: `rehype-sectionize` turns each one into a section wrapper. On prose pages it produces a numbered `.prose-section` with a generated eyebrow; in newsletter issues and blog posts it produces a bare `.article-section` carrying the surface class, with the reveal trigger stamped on every block element inside it so long sections appear block by block, and the heading itself renders as a large serif display line above a hairline rule. Use `##` only where that sectioning treatment is intended, and never hand-author the generated eyebrow or wrapper.

`### Subheading` renders as a small uppercase mono label with wide letter-spacing. It is the label-level heading, not a smaller title; do not use it for a paragraph that needs a sentence-case heading.

`#` is reserved for the page title, which comes from frontmatter or a hero component, never from markdown body text.

## Body copy

Ordinary paragraphs render at `--body-16-5` with 1.75 line height on the shared newsletter/blog article surface and `--body-16` at 1.7 on prose pages, capped to a readable measure and centred within the section. Markdown prose does not hard-wrap; let lines overflow (see the editorial rules in `.github/copilot-instructions.md`). No em dashes in site prose.

`**bold**` and `_italic_` render as expected inside paragraphs and list items. Do not use bold as a substitute for `###`.

## Blockquotes

`> quoted text` renders as the site pull quote: serif italic at 21px, with an oversized accent quote mark hanging in the left margin and symmetric left/right padding so the measure stays optically centred. It drops to 18px with tighter padding below 600px. This is the same treatment as the newsletter and blog decks (`.prose-quote` on `.issue-lede` or `.blog-lede`), so a markdown quote and the article summary read identically.

Use it for a genuine quotation or a standout line. It is visually heavy: one per section at most, and never as a container for lists or code.

Applying the same look outside markdown means putting `class="prose-quote"` on a `<blockquote>`; the shared rules live under `.prose-quote` in `src/styles/tokens.css` and cover `.prose-section blockquote`, `.prose-body blockquote` and `.issue-body blockquote` in one declaration.

## Lists

`- item` renders as an unordered list without bullets: each item is prefixed by a short accent rule at cap height, with indentation and 1.65 line height. Nested lists inherit the same treatment. Ordered lists are not separately styled; prefer an unordered list or an authored component when sequence matters visually.

## Links

`[label](href)` renders in the accent colour with a hairline underline that brightens and gains a soft glow on hover. Links inside `##` and `###` headings carry the same accent treatment, so an article title that is a link reads as one.

External HTTP(S) links outside `ethical.institute` and its subdomains automatically receive `target="_blank" rel="noopener noreferrer"` from `src/plugins/rehype-external-links.mjs`; internal, relative, anchor and `mailto:` links do not. Component-authored anchors must apply the same attributes themselves.

No ASCII-arrow link text (`Label →`). A link is either an inline text link in prose or a primary/secondary button, and in both cases the label carries no trailing arrow.

## Code

Inline `` `code` `` renders in the mono face at the surrounding size.

Fenced blocks wear the `AnimationWindow` chrome: an inset card with a 30px title bar carrying three traffic lights, the language name centred in the bar, 13px mono at 1.75 line height, and horizontal scrolling for long lines. Always tag the fence with its language so the window title is populated:

````markdown
```python
model.fit(x, y)
```
````

## Images

`![alt](src)` renders full width inside its measure with a hairline card border and rounded corners. Height is automatic; an explicit `width` attribute is respected. Images that Astro should optimise belong under `src/assets/` and render through the image pipeline; only files that need exact public URLs belong in `public/`. Never duplicate an image between the two.

Mermaid diagrams in blog source material are pre-rendered as committed SVG derivatives beside the post and referenced through ordinary image syntax. Render them with Mermaid's dark theme and a transparent background; the article surface supplies the stable dark inset plate that keeps them legible in both site themes. Do not add a browser-backed Mermaid build step or client-side Mermaid runtime for published posts.

## Tables

Markdown tables remain unsupported on prose pages and newsletter issues; wide tabular data there belongs in a designed component (see `REUSABLE.md`) or, for content collections, in a validated set with a schema. Blog posts are the exception: `rehype-sectionize` wraps each Markdown table in a keyboard-focusable `.article-table-scroll` region, and the blog article surface gives it hairline borders, compact body cells and mono header labels. The table keeps a useful minimum width and scrolls inside that wrapper, so the page body never scrolls sideways.

## MDX-only rules

MDX prose follows JSX parsing rules: escape a bare `<` as `&lt;`, escape `{` as `\{`, or put the text in backticks. Components come from `src/components/prose/components.js`; import only the blocks a page uses. `composed: true` in frontmatter means the MDX owns its full-width composition instead of the standard `ProseLayout` article shell.
