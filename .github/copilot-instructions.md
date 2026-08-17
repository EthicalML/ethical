# Agent guide

The website for The Institute for Ethical AI Alignment & Safety (`ethical.institute`). An Astro static site deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`.

## Agent instructions

- `.github/copilot-instructions.md` is the source of truth. `CLAUDE.md` and `AGENTS.md` symlink to it; edit only the `.github` file.
- A ruleset that applies to one directory goes in `.github/instructions/<name>.instructions.md`, with frontmatter `applyTo:` (single glob) and `paths:` (list) kept in sync, symlinked from `.claude/rules/<name>.md`.

## Change workflow

- All changes land on `master` through a pull request; direct pushes are blocked by a branch ruleset.
- **Always** create changes in a separate worktree under `.worktrees/`.
- Use comprehensive commits with byte-sized content where possible. PR titles should also contain comprehensive commit-style titles.
- CI runs four required checks (lint, typecheck, build, motion); visual does pixel-perfect comparison and enforcement depends on PR label (dependencies=pixel-perfect, visual-change=skipped, otherwise measured and posted as PR).
- Run the quick checks locally first: `npm run lint`, `npm run check:ratchet`, `npm run build`.
- Be efficient with visual checks: one pass at the end, not one per small change. `npm run verify:dom -- <route>` at 1440 and 420 for affected routes; `npm run verify:parity` proves a refactor moved zero pixels.

## Important documents (read condition)

- `REUSABLE.md` - Before using or changing a documented reusable presentation component. Add an entry (what it does, props table) when a component is consumed by more than one page, and update it in the same change as an API change.
- `STYLES.md` - Before adding or moving CSS.
- `TRANSITIONS.md` - Before adding or changing motion, and when a transition misbehaves.
- `CANVAS-WIDGETS.md` - Before building a canvas object: hero backdrop, section figure or looping demo.
- `scripts/verify/README.md` - When editing the verification harness (DOM gate, screenshots, ratchet).
- `scripts/forms/apps-script.gs` - Before changing the contact form.

## Editorial rules

- Markdown prose does not hard-wrap; let lines overflow.
- No em dashes in site prose.
- Organisation name: The Institute for Ethical AI Alignment & Safety. Network: Ethical AI Network. Principles: The 9 Responsible AI Principles.
- No bare paragraph after a widget: the note belongs in the section lede above it.

## SEO Requirements with any new page

- `title` or `seoTitle` and `description` in pages frontmatter.
- Visible h1 text reads correctly as plain extracted text.
- Article pages (newsletters/reports/blogs) emit Article JSON-LD with `datePublished`.
- Article authors resolve through `src/data/authors.ts`.
- Backlink where possible and relevant.
- Add redirects in `astro.config.mjs` for moved or removed URLs.
- Images below the fold are lazy-loaded.
- Do not add eager third-party fetches.

# Astro authoring conventions

## Pages and content

- A leaf page is a direct MDX file under `src/pages/`; its path is its URL.
- Use a content collection when the site validates and iterates a set. Principles, partners, survey questions, and repository metrics are collections defined in `src/content.config.ts`.
- Page-owned prose, headings, links, lists, and configuration belong in that page's MDX front matter or body.
- Components arrange supplied content. They do not hide owner-editable page copy.
- Frontmatter copy fields render as escaped plain text by default. Add `set:html` in component iff content has to carry flexible configurable rich text.
- `composed: true` means the MDX owns its full-width composition. Otherwise `ProseLayout.astro` supplies the standard article shell.
- External HTTP(S) links outside `ethical.institute` and its subdomains open in a new tab with `target="_blank" rel="noopener noreferrer"`.
- No ASCII-arrow link text (`Label →`). A link is either an inline text link in prose or a primary/secondary button.
- In MDX, write an inline element's label as an expression: `<a className="button primary" href="…">{'Subscribe'}</a>`. MDX parses a bare label sitting on its own line as a paragraph.
- MDX blocks are imported by name from `src/components/prose/components.js`: props for typed values, slots for rich markup. JSX parsing applies, so escape a bare `<` or `{`.
- `## Heading` in markdown becomes a numbered section wrapper (`rehype-sectionize`); never hand-author the eyebrow or wrapper.

## Data placement

- `src/data/` contains real source data only. It currently holds the 2024 and 2025 survey CSVs.
- Validated sets live under `src/content/` and have schemas in `src/content.config.ts`.
- Build configuration is read in `astro.config.mjs` with Vite's `loadEnv`.
- Chrome constants live with their component: `src/data/navigation.ts` (header nav and wordmark), `src/content/partners.yaml`, `src/content/repos-metrics.yaml`.
- Images Astro should optimise go under `src/assets/`; files needing exact public URLs go under `public/`. Never both.

## Components and client behaviour

Use the platform in this order:

1. Static markup and CSS.
2. A colocated TypeScript `<script>` in the owning `.astro` component.
3. A shared TypeScript module only when two or more components consume the behaviour.
4. A Preact island only when state changes rendered structure, such as the survey tabs and sorting.

Component behaviour is implemented as a custom element.

Shared canvas elements live in `src/shared/canvas/` - also:

- gate below-fold animation with `IntersectionObserver`;
- render a static frame for reduced motion;
- resize the backing store without resizing the container;
- release observers, listeners, animation frames, and timers when disconnected.

Page-wide behaviour is layout-owned. `BaseLayout.astro` explicitly imports the reveal module because reveal spans every page.

All first-party client behaviour is TypeScript.

## Motion

`TRANSITIONS.md` holds the route transition map and the page motion rules; `CANVAS-WIDGETS.md` is the menu of canvas objects. The essentials:

- Route transitions are shared `view-transition-name` pairs set through `MorphPairs`; text morphs need identical strings at both endpoints.
- Verify morphs against the production build, in-session and one change at a time; owner eyes are the acceptance gate, instrumentation is only for diagnosis.
- Every animation has a reduced-motion rendition.
- An added or changed motion updates its document in the same change.
