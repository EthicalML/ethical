# Agent guide

The website for The Institute for Ethical AI Alignment & Safety (`ethical.institute`). An Astro static site deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`. The legacy Jekyll site is preserved at the `legacy-jekyll` tag and is the content source of truth when rebuilding a legacy page. This document is the single agent entry point: the change workflow first, then the authoring conventions it enforces.

## Change workflow

All changes land on `master` through a pull request; direct pushes are blocked by a branch ruleset.

1. Branch from `master` **in your own git worktree** (`git worktree add ./tmp/wt-<slug> -b <branch> origin/master`), so parallel tracks never share a dirty checkout. This is not optional housekeeping: other sessions and background agents are routinely live in the main checkout, and working there means their uncommitted files are in your `git status`.
2. **Stage explicit paths, never a directory**, and read `git diff --cached --name-only` before you commit. `git add <dir>` sweeps up whatever a concurrent session happens to have untracked in that directory. That is not merely noise in the diff: committing another session's untracked file makes it tracked, so the next branch switch **deletes it from their working tree**. A file you did not touch appearing in your diff means stop and find out whose it is.
3. Commit with comprehensive messages in [Conventional Commits](https://www.conventionalcommits.org) form: `type(scope): summary`, imperative mood, no trailing full stop. PR titles take the same form. Do not append session URLs to commit messages or PR bodies.

   | Type       | For                                                 |
   | ---------- | --------------------------------------------------- |
   | `feat`     | A capability the site did not have                  |
   | `fix`      | A defect in shipped behaviour                       |
   | `refactor` | Structure changes with no change in rendered output |
   | `perf`     | A measured improvement to speed or payload          |
   | `docs`     | `AGENTS.md`, `STYLES.md`, `README.md`, skills       |
   | `test`     | The `scripts/verify/` harness and its gates         |
   | `build`    | Dependencies, the Astro config, the lockfile        |
   | `ci`       | `.github/workflows/`                                |
   | `chore`    | Anything that fits none of the above                |

   The scope is the surface, not the file: `feat(newsletter)`, `fix(header)`, `refactor(tokens)`, `ci(visual)`. Omit it when a change is genuinely site-wide. The subject line is the summary; the body still carries the reasoning, and a comprehensive body matters more than the prefix. Mark a breaking change with `!` after the type or scope.

4. Push the branch and open a PR with `gh pr create`, then check `gh pr diff <n> --name-only` and confirm every file belongs to the change.
5. CI (`.github/workflows/ci.yml`) runs four required checks — `lint` (ESLint and Prettier), `typecheck` (the `astro check` ratchet), `build` (the production build, in demo mode without `FORM_ENDPOINT`) and `motion` (the view-transition settle gate) — plus `visual`, a merge-base pixel-parity sweep whose enforcement depends on the PR's labels.
6. Merge once CI is green. The merge landing on `master` triggers the production deploy.

The `visual` job builds and photographs both the merge base and the head, so there are no committed baselines to go stale. It skips entirely when nothing under `src/`, `public/` or `package-lock.json` changed, and otherwise:

| PR label        | Behaviour                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `dependencies`  | Zero differing pixels required; the job fails otherwise. A bump that moves rendering cannot merge silently. |
| `visual-change` | Skipped. The author is declaring that pixels are meant to move.                                             |
| anything else   | Measured and posted as a PR comment (routes changed, pixel counts, peak channel delta). Never fails.        |

CI still does not run the Playwright DOM gate, so `npm run verify:dom -- <route> --viewport 1440x1000` (and `420x900`) for affected routes remains a local pre-PR responsibility, as does the rest of the definition of done below.

## Companion documents

| Document                       | Read it when                                                                                                                                                                                                                                                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REUSABLE.md`                  | Before using or changing a documented reusable presentation component; API changes update the entry in the same change.                                                                                                                                                                                        |
| `STYLES.md`                    | Before adding or moving CSS; it maps global categories, component and page owners, deliberate cross-surface rules, and the named breakpoints.                                                                                                                                                                  |
| `scripts/verify/README.md`     | Before running or editing the verification harness (DOM gate, screenshots, ratchet).                                                                                                                                                                                                                           |
| `scripts/forms/apps-script.gs` | Before changing the contact form or its delivery. This file is the receiver's source of truth, deployed manually in the Google Apps Script editor; form field changes must stay aligned across `src/data/contactForm.ts`, `src/components/FormSection.astro`, this script, and the spreadsheet's column order. |

Path-scoped instruction files (`.github/instructions/`):

| File                              | Applies to                                  | Read it when                                                                                                                          |
| --------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `markdown-styles.instructions.md` | `src/content/**/*.md`, `src/pages/**/*.mdx` | Authoring or restyling markdown body content: what every element renders as, the two rendering surfaces, and the constraints on each. |

## Local commands

Node version is pinned in `.tool-versions`. `npm run dev` for the dev server, `npm run build && npm run preview` for the production build. Use `npm run verify:parity -- <baseline-dir> <current-dir>` to mechanically prove screenshot parity; zero-visual-change work must pass with zero differing pixels unless a documented same-build recapture proves canvas instability. Temporary files go under `./tmp`, never `/tmp`.

## Editorial rules

- Markdown prose does not hard-wrap; let lines overflow.
- No em dashes in site prose.
- Organisation name: The Institute for Ethical AI Alignment & Safety. Network: Ethical AI Network. Principles: The 9 Responsible AI Principles.

## SEO invariants

- Every page has a topical `title` or `seoTitle` and `description` in frontmatter, using words people search for rather than internal labels; aim for about 65 characters.
- Visible h1 text reads correctly as plain extracted text; never rely on CSS alone to separate words.
- Article pages, including newsletters, blog posts and reports, emit Article JSON-LD with `datePublished`.
- Article authors resolve through `src/data/authors.ts`; do not duplicate author records in page frontmatter.
- Every new page is reachable through at least one internal link.
- Assign every new indexable page to an llms.txt section; the build fails when an assignment is missing.
- Add redirects in `astro.config.mjs` for moved or removed URLs.
- Images below the fold are lazy-loaded.
- Do not add eager third-party fetches.

# Astro authoring conventions

The ratified decisions in `~/Programming/agentic/kaos-ai-docs/ethical-institute-rebrand/` (moved out of the repo from `.github/memory/2026-07-rebrand/`) are authoritative. ADR-009 defines the client architecture and data-placement rules summarised here.

## Pages and content

- A leaf page is a direct MDX file under `src/pages/`; its path is its URL.
- Use a content collection when the site validates and iterates a set. Principles, partners, survey questions, and repository metrics are collections defined in `src/content.config.ts`.
- Page-owned prose, headings, links, lists, and configuration belong in that page's MDX front matter or body.
- Components arrange supplied content. They do not hide owner-editable page copy.
- Frontmatter copy fields render as escaped plain text by default. When a field genuinely needs inline emphasis, the standard is inline HTML in the field rendered through `set:html` at the consuming component; do not add markdown filters for frontmatter, and do not enable `set:html` on a field before its content actually carries markup. Scope stays inline (`<strong>`, `<em>`) on first-party copy fields only, never links or block markup. Not currently enabled anywhere.
- `composed: true` means the MDX owns its full-width composition. Otherwise `ProseLayout.astro` supplies the standard article shell.
- External HTTP(S) links outside `ethical.institute` and its subdomains open in a new tab with `target="_blank" rel="noopener noreferrer"`; internal, relative, anchor, and `mailto:` links do not. Markdown links are enforced by `src/plugins/rehype-external-links.mjs`; component-authored anchors must apply the same attributes.
- No ASCII-arrow link text (`Label →`). A link is either an inline text link in prose or a primary/secondary button — in both cases the label carries no trailing arrow.
- In MDX, write an inline element's label as an expression: `<a className="button primary" href="…">{'Subscribe'}</a>`. MDX parses a bare label sitting on its own line as a paragraph, so the same anchor with an indented `Subscribe` compiles to `<a class="button primary"><p>Subscribe</p></a>` — a block inside an inline anchor, which renders as a full-width box rather than a button. Keeping the label on one line is NOT sufficient: Prettier reflows a single-line anchor back onto three lines, which silently reintroduces it. This was fixed once by hand across three buttons and regressed the next time `npm run format` ran. An expression child cannot become a paragraph however the source is wrapped, and `verify:dom` now fails on any `a.button` or `button.button` containing a `p` or `div`.
- The legacy live site is preserved at the `legacy-jekyll` tag (master's final Jekyll commit before the Astro cutover) as root-level HTML pages (`rfx.html`, `rfp.html`, `mlmm.html`, `security.html`, `state-of-ml-*.html`, …). Those pages are the content source of truth when rebuilding a legacy page — read them with `git show legacy-jekyll:<file>` rather than assuming the prototype MDX carried the content over correctly.

The placement rule is: content lives with its owner; a separate file must be earned by two unrelated consumers, a validated set, or a genuinely large dataset.

## Data placement

- `src/data/` contains real source data only. It currently holds the 2024 and 2025 survey CSVs.
- Validated sets live under `src/content/` and have schemas in `src/content.config.ts`.
- Page-local structured values live in page front matter.
- Header, footer, and other chrome constants live in their owning component fences.
- Build configuration is read in `astro.config.mjs` with Vite's `loadEnv`; `FORM_ENDPOINT` configures form delivery. The URL is base64-encoded at build and inlined into the form's client bundle through a Vite define (`__FORM_TOKEN__`), never into the rendered HTML: it cannot be secret on a static site, so this only costs a scraper its grep, and the receiver in `scripts/forms/apps-script.gs` carries the real defences. The receiver replies through a redirect chain that has taken 15 seconds and `mode: no-cors` makes the reply unreadable, so the form confirms after a 2.5 second settle window and relies on `keepalive` to finish delivery.
- Derived facts are generated from their source. Recent newsletter issue numbers come from the `newsletter` content collection; do not maintain a parallel issue list or parse the legacy archive HTML.
- Policy record documents: links stay canonical, previews are committed derivatives. Each `src/components/PolicyRecordData.ts` entry's `href` points at the remote publication (acm.org); the site never self-hosts the PDFs. The reading-room page images under `public/images/policy-record/pages/<slug>/` are build-time renders committed to the repo, regenerated with `scripts/fetch-policy-previews.mjs` (download + text extraction) and `scripts/render-policy-pages.mjs` (per-page webp). Cloudflare blocks automated retrieval of some documents; fetch those PDFs manually in a browser and place them in `tmp/pdfs-web/<slug>.pdf` before re-rendering.
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

Reusable presentation components are documented in `REUSABLE.md`. An API change to a documented component updates its entry in the same change.

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
- Reveal does not replay after a client-side navigation. `Reveal` is reconstructed with `settled` on `astro:after-swap`: it waits one frame for the router's scroll to land, marks everything already past the threshold as revealed without an entrance, and primes only what is still off screen. A route's own arrival motion (cross-fade, directional slide, morph) is therefore the only entrance a visible element plays.

| Motion                       | Endpoints                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Owners                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Content settle               | Every route → every route                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `BaseLayout`, `tokens.css`                                                            |
| Section reveal               | Every `data-reveal` element on every route: fires once 150px of the element is visible (60% of height for elements shorter than that), with an unreachable-threshold check and a page-bottom failsafe; `data-reveal="trigger"` roots get the timing signal (`reveal:visible`) without the fade                                                                                                                                                                                                                                                                                                                                    | `Reveal`, `BaseLayout`                                                                |
| Header persistence           | Every route ↔ every route                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `SiteHeader`, `BaseLayout`                                                            |
| Mobile menu toggle morph     | Below 950px on every route: the header's menu button rotates its three bars into an X as the drawer opens and back as it closes, and owns both directions itself; the header pins to the viewport while the drawer is open so the button stays reachable                                                                                                                                                                                                                                                                                                                                                                          | `SiteHeader`, `MobileDrawer`                                                          |
| Homepage hero cycle          | Homepage hero separator: cycles automatically through the three canvas objects while in view; its position bars are visual indicators only and have no pointer or keyboard interaction                                                                                                                                                                                                                                                                                                                                                                                                                                            | `Hero`, `HeroCycle`                                                                   |
| Principle title morph        | Explorer detail → `/principles/NN/` h1; without that active pair, the title stays in its header's standard reveal/transition treatment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `MorphPairs`, `PrinciplesExplorer`, `PrincipleLayout`, `BaseLayout`                   |
| Report scrollytelling        | `/reports/state-of-ml-2024/` and `/reports/state-of-ml-2025/`: at desktop widths, the active question near 45% viewport updates a sticky bar-chart stage with animated widths and labels; chapter and question controls are user-driven, with comparison available only when the report data supplies a baseline. Mobile and reduced-motion presentations use static inline charts                                                                                                                                                                                                                                                | `SurveyReportApp`, `SurveyReportIsland`                                               |
| Policy title morph           | Homepage 03 policy heading → `/policy/` hero h1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `MorphPairs`, `PolicySection`, `ArticleHero`                                          |
| Homepage policy citadel      | Homepage 03 policy section: the /policy/ iso citadel spanning most of the section as a background layer behind the copy under a legibility scrim, hover heat and beat conduits preserved                                                                                                                                                                                                                                                                                                                                                                                                                                          | `PolicyHeroPolicyCircuit`, `CanvasEngine`, `PolicySection`                            |
| Contact form submission      | Both contact forms: an isometric packet crosses a route over the 2.5 second settle window while the fields dim beneath it, the button edge completes one perimeter lap, a conduit packet runs beneath it and a mono log prints; arrival raises the destination tower and blooms, the fields exit in a stagger and the confirmation rises behind a drawn check. Validation is reported inline under each field, never through the browser's bubble                                                                                                                                                                                 | `FormSection`, `FormSendIso`, `CanvasEngine`                                          |
| Flagship initiative carousel | Homepage 04 bounded snap carousel (teaser and survey card bundled as the single first stop filling the row): position bubbles in the inter-card gap above the track (round dots, the active one stretches into a bar, click travels, follows scroll), full-height chevron compositions at the track edges in the strategy accent (single centred chevron between two gradient lines, neon hover, line-energise press, dimmed at the ends); enters whole (bubbles, edges and track) as a standard data-reveal element, then purely user-driven with wrapping controls; no entrance under reduced motion; horizontal at every width | `OpenSourceShowcase`, `Reveal`                                                        |
| Framework title morphs       | `/frameworks/` cards → five matching framework heroes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `MorphPairs`, `FrameworkCards`, `ArticleHero`, `BaseLayout`                           |
| KAOS title morph             | Homepage KAOS card title → KAOS page hero h1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `MorphPairs`, `OpenSourceShowcase`, `ArticleHero`                                     |
| Homepage KAOS agent graph    | Homepage showcase and principle feature                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `KaosGraph`                                                                           |
| KAOS architecture orbit      | Project portal, KAOS hero and selectable control-plane map                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `KaosArchitecture`, `CanvasEngine`                                                    |
| OSS portal title morphs      | `/open-source/` panel titles → project page heroes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `MorphPairs`, `ProjectPortal`, `ArticleHero`                                          |
| Project portal activity      | `/open-source/` project panels and production ML constellation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `ProjectPortal`, `CategoryConstellation`, `CanvasEngine`                              |
| Looping demo playback        | Memory lifecycle, request path, Kompute sequence and XAI workflow                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `AnimationWindow`, `MemoryLifecycle`, `RequestPath`, `SequencePipeline`, `XaiProcess` |
| Finite terminal playback     | KAOS quickstart terminal                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `AnimationWindow`, `QuickstartTerminal`                                               |
| Production ML atlas drift    | Production ML catalogue category field                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `CategoryAtlas`                                                                       |
| Policy citadel hero          | `/policy/` flagship hero: iso citadel with jurisdiction towers, window-level hover tracking, beat-driven conduits                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `PolicyHeroPolicyCircuit`, `PolicyHeroIso`, `CanvasEngine`                            |
| Policy reading room          | `/policy/` record list with filter/search reselect, paginated page-render document viewer, mobile list/detail flip                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `PolicyRecordPreview`                                                                 |
| Policy achievement set table | `/policy/` set-table card grid: bottom-up lego falls on the global reveal signal, neighbour nudges, ghost-rule wipes, and per-block card-displacing neon reveals; a freeform collage variant is kept reusable (see `REUSABLE.md`)                                                                                                                                                                                                                                                                                                                                                                                                 | `AchievementNeonRendition`, `Reveal`                                                  |
| Contact interest preselect   | `?interest=<value>#contact` arrivals on the contact form (framework, network and newsletter CTAs): 500ms delayed tick, then a 2s bright-to-dim row highlight                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `FormSection`                                                                         |
| Partner logo morph           | Clicked marquee instance → matching directory logo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `MorphPairs`, `AffiliationMarquee`, `PartnerDirectory`                                |
| Newsletter issue navigation  | `/newsletter/N/` prev/next steps in the sticky meta bar → adjacent issue: only the deck and body (`newsletter-page`) slide directionally; hero, header and meta bar stay put. Arrival is the zero-height `#issue` anchor, which opts into top alignment with `data-scroll-align="start"` and reserves header + bar height. The bar docks with a compress lock-in (oversized arrival, scaleY settle, accent seam flash)                                                                                                                                                                                                            | `[issue].astro`, `Motion`, `ScrollRestoration`, `tokens.css`                          |
| Principle directional slide  | `/principles/NN/` prev/next → adjacent principle                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `PrincipleLayout`, `Motion`, `tokens.css`                                             |
| Contact interest selection   | Framework contact CTAs → matching contact form interest row                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `FormSection`                                                                         |

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

## Prose around widgets

A short paragraph does not follow a table, card grid, chart or other widget. Composed pages have no prose shell, so a trailing sentence renders unframed and reads as an orphan. Put the sentence in the section lede above the widget, or fold it into the widget's own copy. A section is: heading, lede prose, widget. When a note genuinely belongs after the widget, it needs a component that frames it, not a bare paragraph.

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

| Concern                                                          | Authoring source                                                          |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Hero, evidence, phases, policy, project, survey and network copy | `src/pages/index.mdx`                                                     |
| Principle content                                                | `src/content/principles/*.md`                                             |
| Repository facts                                                 | `src/content/repos-metrics.yaml`                                          |
| Partner directory and affiliation logos                          | `src/content/partners.yaml`                                               |
| Survey source rows                                               | `src/data/survey-2024.csv`, `src/data/survey-2025.csv`                    |
| Derived survey questions                                         | `src/content/survey-questions.yaml`                                       |
| Recent newsletter issue numbers                                  | `newsletter` content collection via `src/utils/RecentIssues.ts`           |
| Header navigation content and wordmark                           | `src/data/navigation.ts`                                                  |
| Header shell, mega-menu and mobile drawer chrome                 | `src/components/SiteHeader.astro`, `MegaMenu.astro`, `MobileDrawer.astro` |
| Footer and footnote chrome                                       | `src/components/SiteFooter.astro`, `src/components/FootnoteBand.astro`    |
| Form delivery endpoint                                           | `FORM_ENDPOINT` through `loadEnv`, base64 Vite define in the JS bundle    |

## Definition of done

Every change must satisfy:

1. Copy is placed with its owner or in an earned validated/shared source.
2. Client behaviour is explicitly owned and imported; there are no document-scanning loaders.
3. `npm run lint` and `npm run format:check` pass.
4. `npm run check:ratchet` reports zero errors, warnings, and hints.
5. `npm run build` passes under the Node version pinned in `.tool-versions`.
6. The DOM gate passes for all affected routes at desktop and mobile widths.
7. Zero-change work passes `npm run verify:parity -- <baseline-dir> <current-dir>` with zero differing pixels after masked full-page capture; intentional visual changes have documented before/after evidence.
8. Any added or changed animation updates the Motion table in the same change.
9. The change lands on `master` through a pull request with green CI; direct pushes are blocked. The workflow is described at the top of this document.

For a new route, add the MDX page, title, description, and explicit layout; add required component imports; add redirects for replaced legacy URLs; then run the full definition of done. For a new principle or validated data entry, satisfy the relevant collection schema.
