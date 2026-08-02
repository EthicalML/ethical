# Astro authoring conventions

The ratified decisions in `.github/memory/2026-07-rebrand/` are authoritative. ADR-009 defines the client architecture and data-placement rules summarised here.

## Pages and content

- A leaf page is a direct MDX file under `src/pages/`; its path is its URL.
- Use a content collection when the site validates and iterates a set. Principles, partners, survey questions, and repository metrics are collections defined in `src/content.config.ts`.
- Page-owned prose, headings, links, lists, and configuration belong in that page's MDX front matter or body.
- Components arrange supplied content. They do not hide owner-editable page copy.
- Frontmatter copy fields render as escaped plain text by default. When a field genuinely needs inline emphasis, the standard is inline HTML in the field rendered through `set:html` at the consuming component; do not add markdown filters for frontmatter, and do not enable `set:html` on a field before its content actually carries markup. Scope stays inline (`<strong>`, `<em>`) on first-party copy fields only, never links or block markup. Not currently enabled anywhere.
- `composed: true` means the MDX owns its full-width composition. Otherwise `ProseLayout.astro` supplies the standard article shell.
- External HTTP(S) links outside `ethical.institute` and its subdomains open in a new tab with `target="_blank" rel="noopener noreferrer"`; internal, relative, anchor, and `mailto:` links do not. Markdown links are enforced by `src/plugins/rehype-external-links.mjs`; component-authored anchors must apply the same attributes.
- The legacy live site is preserved on the `master` branch as root-level HTML pages (`rfx.html`, `rfp.html`, `mlmm.html`, `security.html`, `state-of-ml-*.html`, …). Those pages are the content source of truth when rebuilding a legacy page — read them with `git show master:<file>` rather than assuming the prototype MDX carried the content over correctly.

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
- Morph sources use `MorphPairs` to set and record their inline name on pointerdown/click, then restore it for exactly one back-navigation; widget-local copies are not sanctioned.
- `MorphPairs` silences view-transition-names on offscreen elements on both sides of a navigation — before the old page is captured and (one microtask after `astro:after-swap`, once the router has applied scroll) before the new page is captured — so a title never flies in from or out to a point outside the viewport; the visible side fades in place, partially visible elements still morph, and silenced inline names are restored on `astro:page-load`.
- Singular destination names stay static, with inline companions for computed names; an unpaired destination settles with the same 220ms rise and fade as the root.
- Principle and phase cards are user-controlled only; they never rotate automatically.
- Verify morphs against the production build; dev mode can hide missing computed names.
- Stateful containers restore the state that makes a morph endpoint visible synchronously at mount.
- Elements that must stay above a morphing group need their own named group and explicit `::view-transition-group` z-order.
- Text morphs require identical strings at both endpoints.
- Full-bleed backdrops behind hero text (the KAOS architecture) must not carry card framing (`widget`/`embedded-widget`); a translucent dark plate behind text makes the route cross-fade read as content arriving dim. Use `<KaosArchitecture embedded backdrop />`.
- Named elements are lifted out of ancestor effects during a transition; anything meant to fade with the page must not carry a `view-transition-name`.
- Debugging motion: instrumented checks must assert snapshot opacity and landing position, not just presence; when instrumentation and the eye disagree, bisect by removing visible elements one build at a time.
- Forward navigations without a hash pin the fresh page to the top until the transition finishes (`ScrollRestoration`). Firefox fires a browser-internal scroll on the new page after the router's own scroll-to-top and after the snapshot capture, which lands every morph offset by that scroll; the pin snaps it back before paint. Do not remove the pin without re-testing morphs in Firefox from a deeply scrolled origin page.
- Motion changes land one at a time, in-session, and are owner-validated visually before commit; failed experiments are reverted, never left in the tree. Instrumentation is for diagnosis only — owner eyes are the acceptance gate.

| Motion                      | Endpoints                                                            | Owners                                                                                                                                                                                               |
| --------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content settle              | Every route → every route                                            | `BaseLayout`, `tokens.css`                                                                                                                                                                           |
| Header persistence          | Every route ↔ every route                                            | `SiteHeader`, `BaseLayout`                                                                                                                                                                           |
| Principle title morph       | Explorer detail → `/principles/NN/` h1                               | `MorphPairs`, `PrinciplesExplorer`, `PrincipleLayout`, `BaseLayout`                                                                                                                                  |
| Survey title morph          | Homepage report heading → survey explorer hero                       | `MorphPairs`, `ReportsSection`, `ArticleHero`                                                                                                                                                        |
| Initiative title morphs     | Homepage maturity / security card titles → matching framework heroes | `MorphPairs`, `ReportsSection`, `ArticleHero`, `BaseLayout`                                                                                                                                          |
| Framework title morphs      | `/frameworks/` cards → five matching framework heroes                | `MorphPairs`, `FrameworkCards`, `ArticleHero`, `BaseLayout`                                                                                                                                          |
| KAOS title morph            | Homepage KAOS card title → KAOS page hero h1                         | `MorphPairs`, `OpenSourceShowcase`, `ArticleHero`                                                                                                                                                    |
| Homepage KAOS agent graph   | Homepage showcase and principle feature                              | `KaosGraph`                                                                                                                                                                                          |
| KAOS architecture orbit     | Project portal, KAOS hero and selectable control-plane map           | `KaosArchitecture`, `CanvasEngine`                                                                                                                                                                   |
| OSS portal title morphs     | `/open-source/` panel titles → project page heroes                   | `MorphPairs`, `ProjectPortal`, `ArticleHero`                                                                                                                                                         |
| Project portal activity     | `/open-source/` project panels and production ML constellation       | `ProjectPortal`, `CategoryConstellation`, `CanvasEngine`                                                                                                                                             |
| Looping demo playback       | Memory lifecycle, request path, Kompute sequence and XAI workflow    | `AnimationWindow`, `MemoryLifecycle`, `RequestPath`, `SequencePipeline`, `XaiProcess`                                                                                                                |
| Finite terminal playback    | KAOS quickstart terminal                                             | `AnimationWindow`, `QuickstartTerminal`                                                                                                                                                              |
| Production ML atlas drift   | Production ML catalogue category field                               | `CategoryAtlas`                                                                                                                                                                                      |
| Policy record timeline      | `/policy/` flagship hero                                             | `PolicyTimeline`, `CanvasEngine`                                                                                                                                                                     |
| Policy hero canvas studies  | `/prototypes/policy-hero/?v=1..7`                                    | `PolicyHeroInstituteSystem`, `PolicyHeroPhraseGravity`, `PolicyHeroJellyScroll`, `PolicyHeroNeonPlanet`, `PolicyHeroDottedPlanet`, `PolicyHeroGovernedPlanet`, `PolicyHeroSunSystem`, `CanvasEngine` |
| Partner logo morph          | Clicked marquee instance → matching directory logo                   | `MorphPairs`, `AffiliationMarquee`, `PartnerDirectory`                                                                                                                                               |
| Principle directional slide | `/principles/NN/` prev/next → adjacent principle                     | `PrincipleLayout`, `Motion`, `tokens.css`                                                                                                                                                            |
| Contact interest selection  | Framework contact CTAs → matching contact form interest row          | `FormSection`                                                                                                                                                                                        |

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
