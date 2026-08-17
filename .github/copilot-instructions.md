# Agent guide

The website for The Institute for Ethical AI Alignment & Safety (`ethical.institute`). An Astro static site deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `master`. 

## Agent Instructions

* [TODO: succint instruction to symlink any new dir-dependent ruleset under .claude/rules/ with both path rules. no need to go through all teh details that are not relevant, only instructions to carry out work]

## Change workflow

All changes land on `master` through a pull request; direct pushes are blocked by a branch ruleset. **Always** create changes in a separate worktree under .worktrees/. Use comprehensive commits with byte-sized content where possible. PRs titles should also contain comprehensive commit-style titles. CI runs three required checks (lint, typecheck, build and motion); visual does pixel perfect comparison and enforcement depends on PR label (dependencies=pixel-perfect, visual-change=skipped, otherwise measured and posted as PR).

## Imporatnt Documents (Read Condition)

* REUSABLE.md - Before using or changing a documented reusable presentation component. [TODO: Is there a way of defining a reusable compoennt?]
* STYLES.md - Before adding or moving CSS
* scripts/verify/README.md - When editing the verification harness (DOM gate, screenshots, ratchet).
* scripts/forms/apps-script.gs - Before changing the contact form.

## Blog authoring and publishing
[TODO: move this to a .claude/rule for src/content/blog/**]

Posts live as `src/content/blog/<YYYY-MM-DD->slug/index.md` with colocated assets. The publishing state machine is driven entirely by the optional `date` field; there is no draft flag:

- **No `date`** — the post is a draft: never built in production, visible only in dev. The folder carries no date prefix yet.
- **Future `date`** — the post page builds as an unlisted, `noindex`ed preview (reachable by URL, marked "Scheduled for" in its meta bar) but appears in no listing, sitemap, llms.txt entry or feed.
- **Past `date`** — fully published everywhere. The flip happens at build time (`date <= now` is frozen into the static output), so the daily 05:43 UTC cron on `deploy.yml` exists solely to re-run the build as time passes; it deploys unconditionally and never modifies the repository.

Every post requires a featured `image` (schema-enforced; drives archive showcases and social cards). Listing consumers must read the collection only through `publishedBlogEntries` in `src/utils/blog.ts`; only the post page's path generation uses `renderableBlogEntries`. Republished posts set `source` and `url` (rendered as the off-site canonical) and record other appearances in `syndication`.

## Editorial rules

- Markdown prose does not hard-wrap; let lines overflow.
- No em dashes in site prose.
- Organisation name: The Institute for Ethical AI Alignment & Safety. Network: Ethical AI Network. Principles: The 9 Responsible AI Principles.

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

The ratified decisions in `~/Programming/agentic/kaos-ai-docs/ethical-institute-rebrand/` (moved out of the repo from `.github/memory/2026-07-rebrand/`) are authoritative. ADR-009 defines the client architecture and data-placement rules summarised here.
[TODO: explain what is this, otherwise remove]

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

## Data placement

- `src/data/` contains real source data only. It currently holds the 2024 and 2025 survey CSVs.
- Validated sets live under `src/content/` and have schemas in `src/content.config.ts`.
- Build configuration is read in `astro.config.mjs` with Vite's `loadEnv`.

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

[TODO: Assess whether we move to MOTION.md, and make it relevant when adding transitions to pages, or when motion fails. And with a short high levle here.]

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
- The reveal pre-hide must never gate the first paint: a pre-paint inline script at the foot of `<body>` marks every `[data-reveal]` target starting inside the viewport as revealed, and a `<noscript>` override un-hides everything for scriptless clients. Above the fold the entrance is deliberately gone; below-fold motion is unchanged.
- An element whose visible text its own script rewrites at mount carries `data-paint-hold`: the pre-paint script hides it with `visibility` (layout stays reserved) and the owning script clears the hold once its text is correct, on every exit path. Held from script, not CSS, so a scriptless client is never held. The hero typewriter subtitle is the only holder.
- Reveal does not replay after a client-side navigation. `Reveal` is reconstructed with `settled` on `astro:after-swap`: it waits one frame for the router's scroll to land, marks everything already past the threshold as revealed without an entrance, and primes only what is still off screen. A route's own arrival motion (cross-fade, directional slide, morph) is therefore the only entrance a visible element plays.

[TODO: to be honest, this is way too detailed, and I assumed that this was just listing transition effects from page to page for coherence, eg documenting which page title maps to which other page title, but this is a massive table with things that to be hoenst are completely irrelevant; what is this supposed to be? e.g. explaining in minute detail what the form submission animation is, really is something that none careas about unless they are really going to either see what are animations thy can reuse or modifying it directly. So we need to rethink how we approach this. Also i would like to split coherence of transitions which is indeed important, which should be a section called PAGE TRANSITIONS or such, which focuses on transition coherence, and another on Animations and 3d Canvas or such, where it becomes more of a menu of elements, and is described succintly instead of a story of their entire life. ]
<!-- prettier-ignore -->
|Motion|Endpoints|Owners|
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
|Content settle|Every route → every route|`BaseLayout`, `tokens.css`|
|Section reveal|Every `data-reveal` element on every route: fires once the smaller of 100px or 60% of the element’s own height is visible, with an unreachable-threshold check and a page-bottom failsafe; on newsletter and blog article bodies every block element carries its own trigger, so long sections appear block by block; `data-reveal="trigger"` roots get the timing signal (`reveal:visible`) without the fade; on a full page load everything starting inside the first viewport is marked revealed before paint and plays no entrance|`Reveal`, `BaseLayout`|
|Header persistence|Every route ↔ every route|`SiteHeader`, `BaseLayout`|
|Header logo collapse|Every route, every width: at the top of the page the header carries the two-line wordmark; past 80px of scroll the logo's own I, E, A and S fly into the 2x2 mark over 900ms while the other letters scatter and thin, and the bar compacts on the same eased value (71px to 55px wide, 69px to 55px narrow). Under 24px of scroll it reverses; the hysteresis band between the two keeps a hovering scroll from flickering. The sticky header is a fixed-height shell holding both the compacting bar and a frosted pane that is its sibling rather than its child, so the page below never moves and the pane rides the rubber band with the bar. Reduced motion swaps the two states at the threshold without the tween; the open mobile drawer freezes the state, since its scroll lock reads as scroll position zero; a navigation landing at the top from a settled collapsed header plays the expansion instead of snapping, and mid-tween resizes re-measure without snapping the pose (mid-flight arrivals and reduced motion still adopt instantly)|`SiteLogo`, `SiteHeader`, `MegaMenu`|
|Mobile menu toggle morph|Below 950px on every route: the header's menu button rotates its three bars into an X as the drawer opens and back as it closes, and owns both directions itself; the header pins to the viewport while the drawer is open so the button stays reachable|`SiteHeader`, `MobileDrawer`|
|Mobile drawer entrance|Below the 1040px nav-collapse breakpoint on every route: the panel is an opaque plate on its first frame and its content carries the entrance, settling 12px down and fading over 300ms with the existing 35ms per-row stagger inside it. The panel used to cross-fade itself, which read the page straight through the menu for the length of the transition. Dismissal is a cut, because the header is lifted above the panel only while the drawer is open and a held plate would cover the control that had just been pressed. No entrance under reduced motion|`MobileDrawer`, `SiteHeader`|
|Homepage hero cycle|Homepage hero separator: cycles automatically through the three canvas objects while in view; its position bars are visual indicators only and have no pointer or keyboard interaction|`Hero`, `HeroCycle`|
|Principle title morph|Explorer detail → `/principles/NN/` h1; without that active pair, the title stays in its header's standard reveal/transition treatment|`MorphPairs`, `PrinciplesExplorer`, `PrincipleLayout`, `BaseLayout`|
|Report scrollytelling|`/reports/state-of-ml-2024/` and `/reports/state-of-ml-2025/`: at desktop widths, the active question near 45% viewport updates a sticky bar-chart stage with animated widths and labels; chapter and question controls are user-driven, with comparison available only when the report data supplies a baseline. Mobile and reduced-motion presentations use static inline charts|`SurveyReportApp`, `SurveyReportIsland`|
|Policy title morph|Homepage 03 policy heading → `/policy/` hero h1|`MorphPairs`, `PolicySection`, `ArticleHero`|
|Homepage policy citadel|Homepage 03 policy section: the /policy/ iso citadel spanning most of the section as a background layer behind the copy under a legibility scrim, hover heat and beat conduits preserved|`PolicyHeroPolicyCircuit`, `CanvasEngine`, `PolicySection`|
|Contact form submission|Both contact forms: an isometric packet crosses a route over the 2.5 second settle window while the fields dim beneath it, the button edge completes one perimeter lap, a conduit packet runs beneath it and a mono log prints; arrival raises the destination tower and blooms, the fields exit in a stagger and the confirmation rises behind a drawn check. Validation is reported inline under each field, never through the browser's bubble|`FormSection`, `FormSendIso`, `CanvasEngine`|
|Flagship initiative carousel|Homepage 04 bounded snap carousel (teaser and survey card bundled as the single first stop filling the row): position bubbles in the inter-card gap above the track (round dots, the active one stretches into a bar, click travels, follows scroll), full-height chevron compositions at the track edges in the strategy accent (single centred chevron between two gradient lines, neon hover, line-energise press, dimmed at the ends); enters whole (bubbles, edges and track) as a standard data-reveal element, then purely user-driven with wrapping controls; no entrance under reduced motion; horizontal at every width|`OpenSourceShowcase`, `Reveal`|
|Framework title morphs|`/frameworks/` cards → five matching framework heroes|`MorphPairs`, `FrameworkCards`, `ArticleHero`, `BaseLayout`|
|KAOS title morph|Homepage KAOS card title → KAOS page hero h1|`MorphPairs`, `OpenSourceShowcase`, `ArticleHero`|
|Homepage KAOS agent graph|Homepage showcase|`KaosGraph`|
|KAOS architecture orbit|Project portal, KAOS hero and selectable control-plane map|`KaosArchitecture`, `CanvasEngine`|
|OSS portal title morphs|`/open-source/` panel titles → project page heroes|`MorphPairs`, `ProjectPortal`, `ArticleHero`|
|Skills marketplace dock|`/open-source/` FIG 04 panel and the marketplace hero backdrop: idle cube scintillation with a periodic dispatch into a client socket; hover warms the nearest stack; reduced motion holds a composed frame|`SkillCrateDock`, `IsoKit`, `CanvasEngine`|
|Project portal activity|`/open-source/` project panels and production ML constellation|`ProjectPortal`, `CategoryConstellation`, `CanvasEngine`|
|Looping demo playback|Memory lifecycle, request path, Kompute sequence and XAI workflow|`AnimationWindow`, `MemoryLifecycle`, `RequestPath`, `SequencePipeline`, `XaiProcess`|
|Finite terminal playback|KAOS quickstart terminal|`AnimationWindow`, `QuickstartTerminal`|
|Production ML atlas drift|Production ML catalogue category field|`CategoryAtlas`|
|Agentic catalogue light grid|`/open-source/` FIG 07 panel and the agentic list hero backdrop: cells twinkle in violet with periodic snake and tetromino light runs, and the pointer marks its cell; reduced motion holds a composed frame|`CatalogueLightGrid`, `ArticleHero`, `ProjectFeature`|
|Editor theme buffer|`/open-source/` FIG 08 panel and the monokai hero backdrop: an isometric code slab whose sweep cycles classic Monokai, institute teal and light sage; reduced motion holds the teal frame|`ThemeBufferIso`, `CanvasEngine`, `IsoKit`|
|Project hero backdrops|`/open-source/xai/`, `/open-source/production-ml-list/` and `/open-source/ai-guidelines/` heroes: each project's canvas runs behind the hero copy through `ArticleHero`'s `backdrop` slot|`ArticleHero`, `XaiPipeline`, `CategoryMosaic`|
|Catalogue mosaic cells|All `CategoryMosaic` fields: the production ML set twinkles in squares, the AI regulation set in hexagons|`CategoryMosaic`|
|Policy citadel hero|`/policy/` flagship hero: iso citadel with jurisdiction towers, window-level hover tracking, beat-driven conduits|`PolicyHeroPolicyCircuit`, `PolicyHeroIso`, `CanvasEngine`|
|Policy reading room|`/policy/` record list with filter/search reselect, paginated page-render document viewer, mobile list/detail flip|`PolicyRecordPreview`|
|Policy achievement set table|`/policy/` set-table card grid: bottom-up lego falls on the global reveal signal, neighbour nudges, ghost-rule wipes, and per-block card-displacing neon reveals; a freeform collage variant is kept reusable (see `REUSABLE.md`)|`AchievementNeonRendition`, `Reveal`|
|Contact interest preselect|`?interest=<value>#contact` arrivals on the contact form (framework, network and newsletter CTAs): 500ms delayed tick, then a 2s bright-to-dim row highlight|`FormSection`|
|Partner logo morph|Clicked marquee instance → matching directory logo|`MorphPairs`, `AffiliationMarquee`, `PartnerDirectory`|
|Newsletter issue navigation|`/newsletter/N/` prev/next steps in the sticky meta bar → adjacent issue: only the deck and body (`newsletter-page`) slide directionally; hero, header and meta bar stay put. Arrival is the zero-height `#issue` anchor, which opts into top alignment with `data-scroll-align="start"` and reserves header + bar height. The bar docks with a compress lock-in (oversized arrival, scaleY settle, accent seam flash)|`[issue].astro`, `Motion`, `ScrollRestoration`, `tokens.css`|
|Principle directional slide|`/principles/NN/` pre-hero sticky sub-navbar prev/next → adjacent principle: the complete principle body (`principle-page`) slides left for next and right for previous while the hero, site header and sub-navbar stay fixed. The sub-navbar mounts directly beneath the site header before the principle hero. Adjacent links navigate without a hash so `ScrollRestoration` lands at the page top with the sub-navbar and hero visible; the motion gate requires both a single settle and a final `scrollY` of zero. Reduced motion replaces the directional slide with the standard content fade|`PrincipleLayout`, `BaseLayout`, `Motion`, `ScrollRestoration`, `tokens.css`|
|Contact interest selection|Framework contact CTAs → matching contact form interest row|`FormSection`|

## MDX components

[TODO: This has been repeated multiple times, do we really need ot repeat this structure on md xevery time? We have already bullet points that repeat this info multuple times, let us really thin kabotu what info is actualyl relevant for agents to ensure consistency withthe repo, but not pollute every single inital context every time.]

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

[TODO: This section seems useless.]
A short paragraph does not follow a table, card grid, chart or other widget. Composed pages have no prose shell, so a trailing sentence renders unframed and reads as an orphan. Put the sentence in the section lede above the widget, or fold it into the widget's own copy. A section is: heading, lede prose, widget. When a note genuinely belongs after the widget, it needs a component that frames it, not a bare paragraph.

## Automatic numbered sections
[TODO: Do we really need to mention this as an entire section? this could be a few word bulletpoint. I mean FEW WORD. Read the changes ive done above.]
`src/plugins/rehype-sectionize.mjs` turns every authored `## Heading` into a numbered `.prose-section`. Use `##` only when that treatment is intended. Use a composed MDX component for bespoke sections, and do not hand-author the generated eyebrow or wrapper.

## Source formatting
[TODO: Do we really need to write this?? Let type enforcers and prettifier enforce this, do not add superfluous explantions on things that are enforced anywaays.]
- TypeScript and scripts use an approximate 100-column print width.
- Astro and MDX templates use an approximate 160-column print width.
- Keep ordinary elements compact. Do not golf logic, and do not force one attribute per line.
- Run Prettier and ESLint rather than hand-formatting around their output.

## Images and passthrough files

- Put images Astro should optimise under `src/assets/` and render them through Astro's image pipeline.
- Put files that require exact public URLs under `public/`.
- Do not duplicate an image between the two pipelines.

## Homepage source map
[TODO: Is this really needed? it already explained things so many times, SIMPLIFY!]
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
[TODO: is this needed? it already mentioned some of the comands above. and also mentioned the expected workflow above. Why do we need this again? At most we can just add "Run the quick checks locally first" and "Be efficient with visual checks, do not run one per small change, instead one at the end" - KEEP IT ISIMPLE]
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
