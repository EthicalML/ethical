# Style ownership

Put a rule with the component or page that owns the rendered surface; `src/styles/tokens.css` is only for tokens, foundations, shared primitives, cross-surface integration and page-wide motion.

## Theme tokens

Every colour that must differ between the dark and light themes is a token on `:root`. A literal
has nowhere to flip to under `:root[data-theme='light']`, so a literal is a bug unless it is on the
"never a token" list at the end of this section.

There are seven colour families. Each family has a small semantic ladder — **use a ladder rung for
new work, always.** The ladder is the ramp: sixteen job-named rungs, each named for what it does
rather than for a number.

| Job      | Rungs                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| Text     | `--ink-1` primary · `--ink-2` emphasis · `--ink-3` secondary · `--ink-4` tertiary · `--ink-5` metadata · `--ink-6` faint |
| Surfaces | `--bg-base` page · `--bg-panel` panel · `--bg-inset` inset                                                               |
| Borders  | `--hairline` subtle · `--hairline-card` visible · `--hairline-strong` strong                                             |
| Fills    | `--wash-1` zebra · `--wash-2` resting · `--wash-3` hover · `--wash-4` pressed                                            |
| Accent   | `--accent-ink` ink · `--accent` fill · `--accent-wash` / `--accent-veil` tint · `--accent-line` / `--accent-edge` rule   |

The `-a###` tokens beside each ladder are the same family at an off-ladder alpha (the digits are
permille, so `-a420` is `alpha 0.42`). **That namespace is closed.** They are historical: they are a
1:1 capture of every alpha literal the dark theme already shipped, and every one that could be
collapsed onto a rung or a neighbour inside a measured 3/255 budget has been. The 46 that remain are
grandfathered by name in `scripts/verify/token-alpha-allowlist.json`, and `npm run check:ratchet`
fails on any `-a###` that is not on that list — declared or merely referenced. Adding a colour means
adding a _job_, not an alpha. Treat the survivors as members of the nearest rung.

### Why 46 survive

Every survivor belongs to a family with **no ladder to point at**. The four ladder families — ink,
wash, hairline and accent — are fully collapsed: every off-ladder alpha in them now _is_ a rung.
What is left is `--ink-wash-*` (a surface tint with no named steps), the scrim depths, the shadow
ramp, and the identity hues `--warn`, `--violet`, `--glitch-red`, `--glitch-blue` and `--indigo`,
whose distinct steps may be carrying real meaning rather than drift. Plus `--ink-a050`/`--ink-a030`,
the ghost glyphs. Giving those families ladders is the obvious next reduction and is not blocked by
pixels — only by needing to name their jobs.

**Do not propose collapsing this invisibly.** Ink sits 244 channel levels above the darkest surface,
so `Δα 0.01` is already `2.44/255` before rendering and ~`3/255` after glyph antialiasing, and the
smallest step present anywhere in the data is `Δα 0.01`. Measured, the budget-to-survivor curve is
`2→92 · 3→86 · 5→72 · 8→60 · 12→47`: reaching a sixteen-value ladder needs roughly a **60/255**
budget. The way this palette actually collapsed was the opposite of a zero-pixel merge — alias each
token to its rung _by job_, have the resulting colour move reviewed by eye, then delete the
redundant names at tolerance 0.

**In light they are the rung.** `--ink-wash-a180` and `--ink-wash-a200` resolve to the same light
value; the same holds in every family that still has `-a###` members. Light has no baseline to preserve, so it gets the clean
ladder and dark keeps its (near-)exact historical appearance. Practically: an `-a###` token needs a
light value only when it is added, and it is always a copy of its rung's. The single exception is
`--ink-a050`/`--ink-a030`, ink below the ladder's floor — deliberately ghosted glyphs, which take
the wash curve rather than `--ink-6` so they stay ghosts, and which are excluded from merging for
the same reason.

| Family                                                                                           | Dark base                                                                          | What each step is for                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ink-1` … `--ink-6`                                                                            | `rgba(244, 242, 238, α)`                                                           | Foreground. 1 headings and primary body · 2 emphasised body, active nav · 3 secondary copy and standfirsts · 4 tertiary copy, captions, table cells · 5 metadata and mono eyebrows, **large/UI only** · 6 disabled text and decorative glyphs.                                                                                                                                                                                                                                          |
| `--ink-wash-a###`                                                                                | same RGB, low alpha                                                                | The ink colour used as a _surface_ tint or SVG fill rather than as ink. Flips to a black-based wash, not to the light ink colour.                                                                                                                                                                                                                                                                                                                                                       |
| `--wash-1` … `--wash-4`                                                                          | `rgba(255, 255, 255, α)`                                                           | Surface lift above the panel underneath. 1 barely-there zebra stripe · 2 resting card or field fill · 3 hover fill · 4 pressed or selected fill. **This is the one family that is not a tint of the theme's ink.** Lift is toward the light source in both themes, so in light rungs 1–2 go _up_ toward paper white and only 3–4 tint down into ink. Flipping all four to a dark tint sinks every card and field into the panel it should sit on — that is what "grey soup" looks like. |
| `--hairline`, `--hairline-card`, `--hairline-strong`, `--hairline-a###`                          | `rgba(255, 255, 255, α)`                                                           | White used as a **border**. Separate from `--wash-*` because a light theme needs a heavier hairline than it needs a wash.                                                                                                                                                                                                                                                                                                                                                               |
| `--accent-wash`, `--accent-veil`, `--accent-line`, `--accent-edge`, `--accent-ink`, `--accent`   | `rgba(94, 230, 160, α)`                                                            | wash: section tint and callout background · veil: chip fill, hover fill, selection · line: subtle rule, inactive underline · edge: visible border and focus ring · **`--accent-ink`: accent text, icon strokes and borders** · `--accent`: solid fills, dots and marks, paired with `--accent-on`.                                                                                                                                                                                      |
| `--scrim-1-a###` … `--scrim-5-a###`                                                              | near-black, depth 1 lightest to 5 deepest                                          | Page-canvas fades and overlay scrims that sit _over_ content. Every one of them inverts under a light theme.                                                                                                                                                                                                                                                                                                                                                                            |
| `--warn`, `--glitch-red`, `--glitch-blue`, `--violet`, `--indigo`, each with `-fill` and `-a###` | amber `#e8b45c`, red `#ff5a6e`, blue `#4ac7ff`, violet `#b694ff`, indigo `#7aa2ff` | Semantic hues: identity colours outside the accent family — the survey report and the XAI window are amber, the memory lifecycle is violet, the sequence pipeline is blue. Each follows the accent's ink/fill split, and the alpha ladder uses the accent's rungs.                                                                                                                                                                                                                      |
| `--shadow-a###`, `--shadow-panel`                                                                | `rgba(0, 0, 0, α)`                                                                 | Drop shadows. Alphas cannot be scaled between themes — a light theme re-authors the shadow, it does not reuse the dark alpha. `--shadow-hard` is the same idea as a raw colour rather than a box-shadow, because the canvas modules cannot consume a shadow list.                                                                                                                                                                                                                       |

`--text-1` … `--text-4` are aliases over `--ink-1`, `--ink-3`, `--ink-4` and `--ink-5`; `--accent-wash-07`,
`--accent-wash-09`, `--form-wash-14` and `--accent-wash-16` are aliases over the accent ladder. Use
either name; they are one value.

### The ink/fill rule for the accent

`#5ee6a0` is 1.41:1 on paper, so in a light theme it can only ever be a fill. The **declaring
property** decides which token a site takes:

- `color`, `border*`, `stroke`, `outline`, `caret-color`, `accent-color`, `text-decoration-color` → `var(--accent-ink)`
- `background*`, `fill`, `box-shadow`, `text-shadow`, `filter` → `var(--accent)`

In the dark theme both resolve to `#5ee6a0`, so a misclassification is invisible until a light
theme lands. A component that overrides `--accent` in its own subtree must override `--accent-ink`
beside it, or that subtree falls back to the global green. The same rule governs every semantic hue:
`--warn` is the ink form and `--warn-fill` the bright one.

Two refinements the light block forced:

- **The alpha ladder splits the same way.** `--accent-wash` and `--accent-veil` are surface tints, so
  under light they stay the bright mint and take more alpha; `--accent-line` and `--accent-edge` are
  rules and borders, so they tint toward the ink. Tinting all four toward the ink turns the accent
  sage-grey — a mint wash on paper should still read mint.
- **A `background` that is really a rule takes the ink.** Six sites paint a 2px state indicator —
  chapter-tab and switcher underlines, phase and stage rules — as a background. At 1.41:1 on paper a
  mint underline is invisible, so they take `var(--accent-ink)`, which is the same green in dark.

Each theme also declares `color-scheme`, which is what themes the native controls no stylesheet can
reach: form field internals, scrollbars, the caret and the spellcheck underline.

### The canvas palette and the surface label

The light theme keeps **whole blocks dark** on a light page — one selector list in `tokens.css`:
the header and its menus and drawer, `.hero`, `.article-hero.canvas-variant`, `.kompute-feature`,
`.kaos-feature`, `.map-stage`, `.kaos-panel`, `.palette-panel`. Depth on paper comes from inverting
sections, not from shading cards.

Canvas paints outside the cascade, so a canvas cannot inherit those re-entered rungs. It therefore
takes its colours from the **surface it sits on, not from the active theme**, via two token sets on
`:root`: `--canvas-*` for artwork on the page ground and `--canvas-dark-*` for artwork inside one of
the inverted blocks. Under dark the page _is_ that surface and the two sets are identical, which is
what keeps dark pixel-exact.

Which set a mount takes is a **hardcoded label**, never inferred: `data-surface="dark" | "page"` on
the mount element, read once at construction by `surfaceOf()`. Nothing sniffs its own backdrop —
that breaks on transparent parents, gradients and canvases that straddle two surfaces. Today only
five mounts are `page`: the homepage policy circuit, the three `/open-source/` portal visuals and the
form-send overlay. Everything else sits inside an inverted block and barely changes between themes.

**Two things must stay in step with the list above.** The `--canvas-dark-*` values in the light
block restate the inverted-block values — change one, change both. And if a component ever moves a
canvas from a dark block onto the page ground, its `data-surface` label must move with it.

### Never a token

- `#000` inside `mask-image` / `-webkit-mask-image`. It is an alpha stencil, not a colour: it means
  "opaque here". There are 25 of them and they are theme-independent.
- Bare `transparent` and zero-alpha gradient endpoints such as `rgba(12, 14, 13, 0)`. The long form
  exists to avoid Safari premultiplication artefacts — do not simplify it either.
- `currentColor`, which is already themed by whatever set `color`.
- Brand marks under `src/assets/`.
- The two paper-white plates behind scanned documents and screenshots
  (`StageExplorer.astro`, `PolicyRecordPreview.astro`): they are paper in both themes.
- Syntax-highlighted code. `github-dark` is baked into the markup at build time, so a console or code
  panel is a dark surface in both themes; `QuickstartTerminal.astro` re-enters the ink tokens at
  their dark values for that subtree rather than trying to flip it.
- Raster and baked artwork. A file that bakes an opaque plate cannot be flipped by CSS, so it needs
  a `-light` twin under `src/assets/` and an owner that hides the inactive one. There is no live
  instance today — `TalksGrid.astro`, the only one, was dead code and has been removed.

## Global stylesheet

`src/styles/tokens.css` is 1,248 lines. The counts below are from the current parsed stylesheet: a rule is a CSS style rule or `@font-face` rule, keyframe step selectors are excluded, and declarations inside keyframes are included.

| Category                             | Rules | Declarations | Contents                                                                                                                              |
| ------------------------------------ | ----: | -----------: | ------------------------------------------------------------------------------------------------------------------------------------- |
| Fonts                                |     4 |           20 | Local Newsreader, Geist and Geist Mono faces.                                                                                         |
| Design tokens                        |     1 |           76 | Colour, spacing, radius, typography, easing and duration custom properties on `:root`.                                                |
| Foundation and typography            |    16 |           38 | Box sizing, document defaults, links, headings, section spacing and custom-element display defaults.                                  |
| Shared primitives                    |    22 |           71 | Actions, buttons, status pills, stat bands, eyebrows, widgets, tags, split lists and definition-list defaults.                        |
| Markdown and data prose              |    26 |           78 | Numbered prose sections, pull quotes, prose blocks, embedded widgets, tables and shared network statistics.                           |
| Shared form controls                 |    13 |           64 | Form grid, labels, fields, fieldsets, buttons, helper text and honeypot placement used by multiple form owners.                       |
| Page and view-transition motion      |    19 |           36 | Root settle, principle and newsletter navigation, persistent-header groups and reduced-motion handling.                               |
| Responsive foundation                |     7 |            8 | Global section, typography, primitive and form adjustments at the named breakpoints.                                                  |
| Cross-surface and canvas integration |    73 |          151 | Canvas mount contracts, homepage section composition, shared composed-page clusters and rules spanning a page plus a child component. |
| Theme overrides                      |     1 |          104 | Every theme-dependent token's light value on `:root[data-theme='light']`.                                                             |
| Total                                |   214 |          603 | Global CSS only.                                                                                                                      |

## Component and page owners

Search by the surface name or representative selector below before adding a rule.

| Owner                                                                             | Surface                                                                                                | Representative selectors                                                       |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `AchievementNeonRendition.astro` / `AchievementNeonRendition.css`                 | Policy achievement set table and freeform neon collage                                                 | `.achievement-neon-rendition`, `.neon-canvas`                                  |
| `AffiliationMarquee.astro`                                                        | Partner affiliation logo marquee                                                                       | `.affiliations`, `.marquee-track`, `.marquee-item`                             |
| `AnimationWindow.astro`                                                           | Reusable playback window chrome                                                                        | `animation-window`, `.window-header`, `.traffic-lights`                        |
| `ArticleHero.astro`                                                               | Article and framework heroes, including canvas variants                                                | `.article-hero`, `.hero-canvas`                                                |
| `CategoryAtlas.astro`                                                             | Production ML category atlas                                                                           | `.category-atlas`, `.atlas-field`, `.atlas-tile`                               |
| `CenteredCTA.astro`                                                               | Centred call-to-action section                                                                         | `.center-cta`                                                                  |
| `ChannelLinks.astro`                                                              | Network channel link rows                                                                              | `.channel-links a`                                                             |
| `CodeTabs.astro`                                                                  | Kompute code tabs, toolbar and copy controls                                                           | `code-tabs`, `.code-toolbar`, `[data-code-panel]`                              |
| `CommandPalette.astro`                                                            | Site search command palette                                                                            | `.palette-overlay`, `.palette-panel`, `.palette-result`                        |
| `ComparisonTable.astro`                                                           | Prose comparison table wrapper                                                                         | `.comparison-table-block`, `.table-wrap`                                       |
| `ControlPlaneMap.astro`                                                           | KAOS control-plane window and resource map                                                             | `control-plane-map`, `.map-shell`, `.map-stage`                                |
| `CriteriaMap.astro`                                                               | AI-RFX criteria accordion map                                                                          | `.criteria-map`, `.map-header`, `.criterion-number`                            |
| `FootnoteBand.astro`                                                              | Footer-adjacent about, links and affiliation band                                                      | `.footnote-band`, `.footnote-about`                                            |
| `FormSection.astro`                                                               | Homepage network form and full contact form                                                            | `.form-shell`, `.form-card`, `.field-note`, `.send-stage`                      |
| `FrameworkCards.astro`                                                            | Framework directory groups and cards                                                                   | `.framework-cards`, `.card-grid`, `.framework-card`                            |
| `FrameworkLinkCards.astro`                                                        | Related framework link cards                                                                           | `.framework-link-cards`                                                        |
| `Hero.astro` / `Hero.css`                                                         | Homepage hero, hero canvas and cycle controls                                                          | `.hero`, `.hero-copy`, `.hero-canvas`, `.hero-switchers`                       |
| `KaosProjectFooter.astro`                                                         | KAOS project metrics footer                                                                            | `.kaos-project-footer`                                                         |
| `KomputeCube.astro`                                                               | Kompute cube canvas host                                                                               | `kompute-cube`, `canvas`                                                       |
| `MediaBand.astro`                                                                 | Media figure band                                                                                      | `media-band`, `figure`, `figcaption`                                           |
| `MemoryLifecycle.astro`                                                           | KAOS memory lifecycle player                                                                           | `memory-lifecycle`, `.lifecycle-head`, `.memory-stage`                         |
| `NetworkDirectory.astro`                                                          | Network member directory and wordmarks                                                                 | `.network-directory`, `.member-wordmarks`                                      |
| `NewsletterLatestCard.astro`                                                      | Reusable latest-newsletter card                                                                        | `.newsletter-latest-card`, `.latest-title`                                     |
| `NewsletterSubscribe.astro`                                                       | Newsletter subscription form                                                                           | `newsletter-subscribe`, `.subscribe-field`, `.subscribe-status`                |
| `OpenSourceShowcase.astro`                                                        | Homepage flagship initiative carousel, KAOS and survey showcase cards                                  | `.open-source-prototype`, `.showcase-track`, `.carousel-edge`, `.kaos-feature` |
| `PartnerDirectory.astro`                                                          | Partner directory entries and logos                                                                    | `.partner-directory`, `.partner-entry`, `.partner-logo`                        |
| `PhaseCardGrid.astro`                                                             | Homepage strategy phase cards                                                                          | `.strategy`, `.phase-grid`, `.phase-card`, `.phase-rule`                       |
| `PolicyMandates.astro`                                                            | Policy mandate cards                                                                                   | `.mandate-grid`, `.mandate-row`                                                |
| `PolicyRecordPreview.astro`                                                       | Policy reading-room document viewer                                                                    | `.prv`, `.prv-head`, `.prv-viewer`                                             |
| `PolicyRecordShelves.astro`                                                       | Policy record shelf filters and cards                                                                  | `policy-record-shelves`, `.shelf-toggle`, `.record-shelf`                      |
| `PolicySection.astro`                                                             | Homepage policy citadel and contribution rows                                                          | `policy-section`, `.policy-standards-canvas`, `.policy-contributions`          |
| `PrinciplesExplorer.astro`                                                        | The 9 Responsible AI Principles explorer                                                               | `.principles-explorer`, `.principle-rows`, `.principle-detail`                 |
| `ProcurementFlow.astro`                                                           | AI-RFX procurement flow                                                                                | `.procurement-flow`                                                            |
| `ProductionMlCatalogue.astro`                                                     | Production ML catalogue and category details                                                           | `.production-catalogue`, `.catalogue-grid`                                     |
| `ProjectLinks.astro`                                                              | Project resource link buttons                                                                          | `.project-links`                                                               |
| `ProjectPortal.astro`                                                             | Open-source project portal and activity panels                                                         | `.project-portal`, `.portal-rail`, `.portal-stage`                             |
| `QuickstartTerminal.astro`                                                        | KAOS quickstart terminal playback                                                                      | `.quickstart-window`, `quickstart-terminal`, `.terminal-body`                  |
| `RecentIssuesRail.astro`                                                          | Recent newsletter issue rail                                                                           | `.recent-issues-rail`                                                          |
| `RegulationGrid.astro`                                                            | Policy regulation catalogue and themes                                                                 | `.regulation-catalogue`, `.regulation-grid`                                    |
| `RequestPath.astro`                                                               | KAOS request-path player and scenario controls                                                         | `request-path`, `.scenario-picker`, `.request-stage`                           |
| `SequencePipeline.astro`                                                          | Kompute sequence pipeline player                                                                       | `sequence-pipeline`, `.pipeline-heading`, `.pipeline-stage`                    |
| `SiteHeader.astro`                                                                | Persistent header shell, wordmark, desktop navigation triggers, search trigger and right-hand controls | `.site-header`, `.header-row`, `.primary-nav`, `.nav-right`                    |
| `MegaMenu.astro`                                                                  | Desktop mega-menu panels, project preview and initiative panes                                         | `.mega-panel`, `.oss-menu`, `.initiative-menu`                                 |
| `MobileDrawer.astro`                                                              | Mobile navigation drawer, accordion sections and drawer controls                                       | `.mobile-drawer`, `.mobile-nav`, `.mobile-menu-section`                        |
| `SplitList.astro`                                                                 | Reusable split-list columns                                                                            | `.split-list ul`                                                               |
| `LinkCardGrid.astro`                                                              | Shared link-card grid vocabulary                                                                       | `.link-card-grid`, `.link-card`                                                |
| `StageExplorer.astro`                                                             | Tabbed stage explorer                                                                                  | `stage-explorer`, `.stage-selector`, `.stage-panel`                            |
| `SurveyEvidence.astro`                                                            | Survey methodology and evidence block                                                                  | `.survey-evidence`                                                             |
| `SurveyExplorerIsland.astro`, `SurveyExplorerIsland.css` and `SurveyExplorer.tsx` | Homepage survey explorer tabs, year controls, bars and focus panel                                     | `.survey-island`, `.survey-toolbar`, `.survey-bars`, `.survey-focus`           |
| `SurveyReportApp.module.css`                                                      | 2024 and 2025 report scrollytelling, charts and comparison controls                                    | `.report`, `.chapterSwitcher`, `.barRow`, `.compareToggle`                     |
| `TalkCard.astro`                                                                  | Individual talk card                                                                                   | `.talk-card`                                                                   |
| `XaiProcess.astro`                                                                | XAI process player                                                                                     | `xai-process`, `.process-heading`, `.process-stage`                            |
| `prose/CTA.astro`                                                                 | MDX CTA block                                                                                          | `.cta-only`, `.cta-block`                                                      |
| `prose/CapabilityTable.astro`                                                     | MDX capability table                                                                                   | `.capability-table`                                                            |
| `prose/Feature.astro`                                                             | MDX feature block                                                                                      | `.feature-block`                                                               |
| `prose/Metrics.astro`                                                             | MDX metrics block                                                                                      | `.metrics-block`                                                               |
| `BaseLayout.astro`                                                                | Global reveal state and view-transition image-pair isolation                                           | `[data-reveal]`, `::view-transition-image-pair(*)`                             |
| `PrincipleLayout.astro`                                                           | Principle article prose and previous/next navigation                                                   | `.principle-prose`, `.principle-pagination`                                    |
| `ProseLayout.astro`                                                               | Standard article prose shell                                                                           | `.prose-content`                                                               |
| `pages/network.mdx`                                                               | Network page join introduction                                                                         | `.join-intro`                                                                  |
| `pages/newsletter/[issue].astro`                                                  | Newsletter issue meta bar, article deck and issue navigation                                           | `newsletter-meta-bar`, `.issue-meta`, `.newsletter-page`                       |
| `pages/newsletter/index.astro`                                                    | Newsletter archive latest card and issue grid                                                          | `.latest-card`, `.issue-grid`                                                  |
| `pages/partners.mdx`                                                              | Partners page policy feature and list heading                                                          | `.policy-feature`, `.partner-list-heading`                                     |
| `pages/policy.mdx`                                                                | Policy page work grid composition                                                                      | `.policy-work`                                                                 |
| `pages/talks.mdx`                                                                 | Featured talks grid composition                                                                        | `.featured-talks-grid`                                                         |

## Deliberately global rules

| Rules                                                                                            | Reason                                                                                                             |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `:root`, `@font-face`                                                                            | Fonts and design tokens are consumed across unrelated surfaces.                                                    |
| `*`, `html`, `body`, element typography and link defaults                                        | These establish the document foundation and reset native defaults consistently.                                    |
| Custom-element `display: contents` defaults                                                      | Wrapper elements span several component implementations and must not introduce layout boxes.                       |
| `.actions`, `.button`, `.text-link`, `.status-pill`, `.eyebrow`, `.meta-label`, `.accent-action` | These presentation primitives are used by three or more unrelated components or authored pages.                    |
| `.stat-band`, `.stat`, `.split-list`, `.widget`, `.embedded-widget`, `.tags`                     | These are shared composition primitives with unrelated consumers.                                                  |
| `.prose-section`, `.prose-block`, `.block-body`, prose lists and pull quotes                     | Markdown, MDX and newsletter bodies share the same generated prose contract.                                       |
| `table`, `th`, `td`, `dl`, `dt`, `dd`                                                            | Data and definition markup appears on unrelated prose and component surfaces.                                      |
| Base `form`, `fieldset`, label, input and form-button rules                                      | The contact/network form and newsletter form share these control foundations.                                      |
| Root, principle and newsletter view-transition selectors and keyframes                           | Their endpoints cross layouts, pages and persisted header chrome.                                                  |
| `SiteHeader.astro` global `.site-header` transition name                                         | The persisted node keeps its previous page scope across a route swap, so its transition name must remain unscoped. |
| `MegaMenu.astro` global `om-swap` keyframes                                                      | The mega-menu script assigns this animation by name at runtime, outside Astro's scoped keyframe rewriting.         |
| `.fixed-canvas canvas`, `.kaos-canvas-mount canvas`, `.kaos-architecture-mount canvas`           | The canvas sizing contract has multiple unrelated hosts.                                                           |
| `.kaos-canvas-mount`, `.kaos-architecture-mount`, `kaos-graph`, `kaos-architecture`              | Shared KAOS canvas elements are embedded by multiple owners.                                                       |
| `.home-section` and its final-section rule                                                       | Page sections are composed through several homepage components and hydration adds non-section siblings.            |
| `.article-hero.canvas-variant .hero-canvas`                                                      | The canvas is owned by its widget while its sizing depends on the parent hero variant.                             |
| `.footnote-about .affiliations` and descendant marquee rules                                     | The footer owns the compact composition while `AffiliationMarquee` owns the child markup.                          |
| `.policy-section`, `.policy-work` and their shared descendants                                   | The policy surface is composed by both the homepage component and the policy page.                                 |
| Shared section clusters, engagement bands, benefit rows and policy feature copy                  | These patterns have page and component consumers, so no single local style fence owns them.                        |

## Presentation primitives

| Primitive        | Appearance                                                                   | Use                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.eyebrow`       | Small uppercase accent text in the mono face with wide tracking.             | Section and card eyebrows. Override only the size or tracking when the local hierarchy needs it.                                                       |
| `.meta-label`    | Small muted mono metadata with compact line-height and moderate tracking.    | Dates, group labels, counts and short descriptive metadata. Local colour, size and tracking may express hierarchy without copying the whole treatment. |
| `.accent-action` | Small uppercase mono action text in the accent colour.                       | Trailing card actions and compact text calls to action. Preserve sentence case locally when the authored action is not a label.                        |
| `.text-link`     | Accent-coloured underlined inline text with a readable underline offset.     | Links inside prose. Do not use it for button-like or trailing card actions.                                                                            |
| `.prose-block`   | Subtle top-to-bottom surface wash, hairline border and standard card radius. | Bordered prose widgets and editorial blocks. Components own their internal layout and padding.                                                         |

## Breakpoints

| Name    |   Width | Use                                                                                               |
| ------- | ------: | ------------------------------------------------------------------------------------------------- |
| Wide    | `950px` | Switch desktop navigation, multi-column compositions and full desktop widgets to compact layouts. |
| Compact | `600px` | Stack dense rows, simplify grids and tighten mobile spacing.                                      |
| Narrow  | `420px` | Handle the smallest supported viewport where compact rules still need a final adjustment.         |

Use these widths for CSS media queries. A component that needs responsive client behaviour must keep its `matchMedia` condition beside that behaviour and align it with the CSS boundary whenever the states represent the same layout switch.

## Where a new rule goes

1. For a new component, put the rule in that component's scoped `<style>` block; use `is:global` only when styling child markup that Astro cannot scope, such as an island or custom element. When a component's CSS grows large enough to obscure its markup and script, move that block unchanged to a same-named companion CSS file and import it from the original style fence.
2. For a page-specific tweak, put the rule in the owning `.astro` or `.mdx` page so it cannot affect another route.
3. For a new token, add it to `:root` when at least two owners need the same semantic value, or when the value must change between themes. A theme-dependent value is always a token, however few owners it has: a literal has nowhere to flip to under `:root[data-theme='light']`. Otherwise keep the value local.
4. If an override seems necessary, find the existing owner first and change the original rule or component API. Add a cross-owner rule to `tokens.css` only when the relationship itself is shared and document that reason here.

<!-- styles-hash: 36e36be9770557a19376ea3d9e2315e37c343a490aa31d80ea6d7408b17ff9f2 -->
