# Astro authoring conventions

The ratified decisions in `.github/memory/2026-07-rebrand/` are authoritative. ADR-009 defines the client architecture and data-placement rules summarised here.

## Pages and content

- A leaf page is a direct MDX file under `src/pages/`; its path is its URL.
- Use a content collection when the site validates and iterates a set. Principles, partners, survey questions, and repository metrics are collections defined in `src/content.config.ts`.
- Page-owned prose, headings, links, lists, and configuration belong in that page's MDX front matter or body.
- Components arrange supplied content. They do not hide owner-editable page copy.
- `composed: true` means the MDX owns its full-width composition. Otherwise `ProseLayout.astro` supplies the standard article shell.

The placement rule is: content lives with its owner; a separate file must be earned by two unrelated consumers, a validated set, or a genuinely large dataset.

## Data placement

- `src/data/` contains real source data only. It currently holds the 2024 and 2025 survey CSVs.
- Validated sets live under `src/content/` and have schemas in `src/content.config.ts`.
- Page-local structured values live in page front matter.
- Header, footer, and other chrome constants live in their owning component fences.
- Build configuration comes from `astro:env`; `FORM_ENDPOINT` configures form delivery.
- Derived facts are generated from their source. Recent newsletter issue numbers come from `public/mle/*.html` filenames; do not maintain a parallel issue list or parse the archive HTML.
- Rows use named keys. Avoid positional tuples except where a component API is naturally tuple-shaped and typed.

## Components and client behaviour

Use the platform in this order:

1. Static markup and CSS.
2. A colocated TypeScript `<script>` in the owning `.astro` component.
3. A shared TypeScript module only when two or more components consume the behaviour.
4. A Preact island only when state changes rendered structure, such as the survey tabs and sorting.

Component behaviour is implemented as a custom element. The element queries only inside itself, starts and tears down work in `connectedCallback` and `disconnectedCallback`, and owns any window/document listeners through an abort signal. Data attributes may remain as configuration or test hooks; they are not a global wiring mechanism.

Shared canvas elements live in `src/shared/canvas/`. Files and exported classes use matching PascalCase names; browser element tags use kebab-case. The importing component is the wiring. Canvas elements preserve the mount contract:

- gate below-fold animation with `IntersectionObserver`;
- render a static frame for reduced motion;
- resize the backing store without resizing the container;
- release observers, listeners, animation frames, and timers when disconnected.

Page-wide behaviour is layout-owned. `BaseLayout.astro` explicitly imports the reveal module because reveal spans every page.

All first-party client behaviour is TypeScript. Do not add first-party runtime JavaScript under `public/`, a layout script-loader list, whole-document marker scans, or a generic `src/scripts/` holding area.

## Motion

- Long-lived-page behaviour uses custom elements or explicit `astro:before-swap`/`astro:after-swap` hooks.
- Morph sources set `view-transition-name` inline on pointerdown/click; singular destination names stay static, with inline companions for computed names.
- Principle and phase cards are user-controlled only; they never rotate automatically.
- Verify morphs against the production build; dev mode can hide missing computed names.
- Stateful containers restore the state that makes a morph endpoint visible synchronously at mount.
- Elements that must stay above a morphing group need their own named group and explicit `::view-transition-group` z-order.
- Text morphs require identical strings at both endpoints.

| Motion                      | Endpoints                                                     | Owners                                                |
| --------------------------- | ------------------------------------------------------------- | ----------------------------------------------------- |
| Content settle              | Every route → every route                                     | `BaseLayout`, `tokens.css`                            |
| Header persistence          | Every route ↔ every route                                     | `SiteHeader`, `BaseLayout`                            |
| Principle title morph       | Explorer detail → `/principles/NN/` h1                        | `PrinciplesExplorer`, `PrincipleLayout`, `BaseLayout` |
| Survey title morph          | Homepage report heading → survey explorer hero                | `ReportsSection`, `ArticleHero`                       |
| Initiative title morphs     | Homepage governance/security cards → maturity/MLSecOps heroes | `ReportsSection`, `ArticleHero`, `BaseLayout`         |
| KAOS canvas morph           | Homepage KAOS card → KAOS hero canvas                         | `OpenSourceShowcase`, `KaosGraph`, `ArticleHero`      |
| Partner logo morph          | Clicked marquee instance → matching directory logo            | `AffiliationMarquee`, `PartnerDirectory`              |
| Principle directional slide | `/principles/NN/` prev/next → adjacent principle              | `PrincipleLayout`, `Motion`, `tokens.css`             |

## MDX components

`src/components/prose/components.js` is the named export surface for designed MDX blocks. Import only the blocks a page uses:

```mdx
---
layout: ../layouts/ProseLayout.astro
title: Talks & keynotes
composed: true
---

import { ArticleHero, TalksGrid } from '../components/prose/components.js';

<ArticleHero eyebrow="TALKS" title="Selected talks" />
<TalksGrid talks={frontmatter.talks} />
```

Use props for typed strings, identifiers, hrefs, and structured values. Use slots for rich Markdown or markup. Slot names are stringly typed, so verify them carefully.

MDX prose follows JSX parsing rules. Escape a bare `<` as `&lt;`, escape `{` as `\{`, or put the text in backticks.

## Automatic numbered sections

`src/plugins/rehype-sectionize.mjs` turns every authored `## Heading` into a numbered `.prose-section`. Use `##` only when that treatment is intended. Use a composed MDX component for bespoke sections, and do not hand-author the generated eyebrow or wrapper.

## Source formatting

- TypeScript and scripts use an approximate 100-column print width.
- Astro and MDX templates use an approximate 160-column print width.
- Keep ordinary elements compact. Do not golf logic, and do not force one attribute per line.
- Run Prettier and ESLint rather than hand-formatting around their output.

## Images and passthrough files

- Put images Astro should optimise under `src/assets/` and render them through Astro's image pipeline.
- Put files that require exact public URLs under `public/`.
- Do not duplicate an image between the two pipelines.

## Homepage source map

| Concern                                                         | Authoring source                                                       |
| --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Hero, evidence, phases, project copy, reports, and network copy | `src/pages/index.mdx`                                                  |
| Principle content                                               | `src/content/principles/*.md`                                          |
| Repository facts                                                | `src/content/repos-metrics.yaml`                                       |
| Partner directory and affiliation logos                         | `src/content/partners.yaml`                                            |
| Survey source rows                                              | `src/data/survey-2024.csv`, `src/data/survey-2025.csv`                 |
| Derived survey questions                                        | `src/content/survey-questions.yaml`                                    |
| Recent newsletter issue numbers                                 | `public/mle/*.html` filenames via `src/utils/RecentIssues.ts`          |
| Header navigation and wordmark                                  | `src/components/SiteHeader.astro`                                      |
| Footer and footnote chrome                                      | `src/components/SiteFooter.astro`, `src/components/FootnoteBand.astro` |
| Form delivery endpoint                                          | `FORM_ENDPOINT` through `astro:env`                                    |

## Definition of done

Every change must satisfy:

1. Copy is placed with its owner or in an earned validated/shared source.
2. Client behaviour is explicitly owned and imported; there are no document-scanning loaders.
3. `npm run lint` and `npm run format:check` pass.
4. `npm run check:ratchet` reports zero errors, warnings, and hints.
5. `npm run build` passes under the Node version pinned in `.tool-versions`.
6. The DOM gate passes for all affected routes at desktop and mobile widths.
7. Zero-change work has masked full-page screenshot parity; intentional visual changes have documented before/after evidence.
8. Any added or changed animation updates the Motion table in the same change.

For a new route, add the MDX page, title, description, and explicit layout; add required component imports; add redirects for replaced legacy URLs; then run the full definition of done. For a new principle or validated data entry, satisfy the relevant collection schema.
