# Style ownership

Put a rule with the component or page that owns the rendered surface; `src/styles/tokens.css` is only for tokens, foundations, shared primitives, cross-surface integration and page-wide motion.

## Global stylesheet

`src/styles/tokens.css` is 831 lines. The counts below are from the current parsed stylesheet: a rule is a CSS style rule or `@font-face` rule, keyframe step selectors are excluded, and declarations inside keyframes are included.

| Category | Rules | Declarations | Contents |
| --- | ---: | ---: | --- |
| Fonts | 4 | 20 | Local Newsreader, Geist and Geist Mono faces. |
| Design tokens | 1 | 76 | Colour, spacing, radius, typography, easing and duration custom properties on `:root`. |
| Foundation and typography | 16 | 38 | Box sizing, document defaults, links, headings, section spacing and custom-element display defaults. |
| Shared primitives | 22 | 71 | Actions, buttons, status pills, stat bands, eyebrows, widgets, tags, split lists and definition-list defaults. |
| Markdown and data prose | 26 | 78 | Numbered prose sections, pull quotes, prose blocks, embedded widgets, tables and shared network statistics. |
| Shared form controls | 13 | 64 | Form grid, labels, fields, fieldsets, buttons, helper text and honeypot placement used by multiple form owners. |
| Page and view-transition motion | 19 | 36 | Root settle, principle and newsletter navigation, persistent-header groups and reduced-motion handling. |
| Responsive foundation | 7 | 8 | Global section, typography, primitive and form adjustments at the named breakpoints. |
| Cross-surface and canvas integration | 73 | 151 | Canvas mount contracts, homepage section composition, shared composed-page clusters and rules spanning a page plus a child component. |
| Total | 181 | 542 | Global CSS only. |

## Component and page owners

Search by the surface name or representative selector below before adding a rule.

| Owner | Surface | Representative selectors |
| --- | --- | --- |
| `AchievementNeonRendition.astro` | Policy achievement set table and freeform neon collage | `.achievement-neon-rendition`, `.neon-canvas` |
| `AffiliationMarquee.astro` | Partner affiliation logo marquee | `.affiliations`, `.marquee-track`, `.marquee-item` |
| `AnimationWindow.astro` | Reusable playback window chrome | `animation-window`, `.window-header`, `.traffic-lights` |
| `ArticleHero.astro` | Article and framework heroes, including canvas variants | `.article-hero`, `.hero-canvas` |
| `CardGrid.astro` | Generic feature card copy inside card grids | `.feature-card h3`, `.feature-card p` |
| `CategoryAtlas.astro` | Production ML category atlas | `.category-atlas`, `.atlas-field`, `.atlas-tile` |
| `CenteredCTA.astro` | Centred call-to-action section | `.center-cta` |
| `ChannelLinks.astro` | Network channel link rows | `.channel-links a` |
| `CodeTabs.astro` | Kompute code tabs, toolbar and copy controls | `code-tabs`, `.code-toolbar`, `[data-code-panel]` |
| `CommandPalette.astro` | Site search command palette | `.palette-overlay`, `.palette-panel`, `.palette-result` |
| `ComparisonTable.astro` | Prose comparison table wrapper | `.comparison-table-block`, `.table-wrap` |
| `ControlPlaneMap.astro` | KAOS control-plane window and resource map | `control-plane-map`, `.map-shell`, `.map-stage` |
| `CriteriaMap.astro` | AI-RFX criteria accordion map | `.criteria-map`, `.map-header`, `.criterion-number` |
| `FootnoteBand.astro` | Footer-adjacent about, links and affiliation band | `.footnote-band`, `.footnote-about` |
| `FormSection.astro` | Homepage network form and full contact form | `.form-shell`, `.form-card`, `.field-note`, `.send-stage` |
| `FrameworkCards.astro` | Framework directory groups and cards | `.framework-cards`, `.card-grid`, `.framework-card` |
| `FrameworkLinkCards.astro` | Related framework link cards | `.framework-link-cards` |
| `Hero.astro` | Homepage hero, hero canvas and cycle controls | `.hero`, `.hero-copy`, `.hero-canvas`, `.hero-switchers` |
| `KaosProjectFooter.astro` | KAOS project metrics footer | `.kaos-project-footer` |
| `KomputeCube.astro` | Kompute cube canvas host | `kompute-cube`, `canvas` |
| `MediaBand.astro` | Media figure band | `media-band`, `figure`, `figcaption` |
| `MemoryLifecycle.astro` | KAOS memory lifecycle player | `memory-lifecycle`, `.lifecycle-head`, `.memory-stage` |
| `NetworkDirectory.astro` | Network member directory and wordmarks | `.network-directory`, `.member-wordmarks` |
| `NewsletterLatestCard.astro` | Reusable latest-newsletter card | `.newsletter-latest-card`, `.latest-title` |
| `NewsletterSubscribe.astro` | Newsletter subscription form | `newsletter-subscribe`, `.subscribe-field`, `.subscribe-status` |
| `OpenSourceShowcase.astro` | Homepage flagship initiative carousel, KAOS and survey showcase cards | `.open-source-prototype`, `.showcase-track`, `.carousel-edge`, `.kaos-feature` |
| `PartnerDirectory.astro` | Partner directory entries and logos | `.partner-directory`, `.partner-entry`, `.partner-logo` |
| `PhaseCardGrid.astro` | Homepage strategy phase cards | `.strategy`, `.phase-grid`, `.phase-card`, `.phase-rule` |
| `PolicyMandates.astro` | Policy mandate cards | `.mandate-grid`, `.mandate-row` |
| `PolicyRecordPreview.astro` | Policy reading-room document viewer | `.prv`, `.prv-head`, `.prv-viewer` |
| `PolicyRecordShelves.astro` | Policy record shelf filters and cards | `policy-record-shelves`, `.shelf-toggle`, `.record-shelf` |
| `PolicySection.astro` | Homepage policy citadel and contribution rows | `policy-section`, `.policy-standards-canvas`, `.policy-contributions` |
| `PrinciplesExplorer.astro` | The 9 Responsible AI Principles explorer | `.principles-explorer`, `.principle-rows`, `.principle-detail` |
| `ProcurementFlow.astro` | AI-RFX procurement flow | `.procurement-flow` |
| `ProductionMlCatalogue.astro` | Production ML catalogue and category details | `.production-catalogue`, `.catalogue-grid` |
| `ProjectLinks.astro` | Project resource link buttons | `.project-links` |
| `ProjectPortal.astro` | Open-source project portal and activity panels | `.project-portal`, `.portal-rail`, `.portal-stage` |
| `PrototypeSwitcher.astro` | Prototype navigation switcher | `prototype-switcher`, `.prototype-switcher-nav` |
| `QuickstartTerminal.astro` | KAOS quickstart terminal playback | `.quickstart-window`, `quickstart-terminal`, `.terminal-body` |
| `RecentIssuesRail.astro` | Recent newsletter issue rail | `.recent-issues-rail` |
| `RegulationGrid.astro` | Policy regulation catalogue and themes | `.regulation-catalogue`, `.regulation-grid` |
| `RequestPath.astro` | KAOS request-path player and scenario controls | `request-path`, `.scenario-picker`, `.request-stage` |
| `SequencePipeline.astro` | Kompute sequence pipeline player | `sequence-pipeline`, `.pipeline-heading`, `.pipeline-stage` |
| `SiteHeader.astro` | Persistent header shell, wordmark, desktop navigation triggers, search trigger and right-hand controls | `.site-header`, `.header-row`, `.primary-nav`, `.nav-right` |
| `MegaMenu.astro` | Desktop mega-menu panels, project preview and initiative panes | `.mega-panel`, `.oss-menu`, `.initiative-menu` |
| `MobileDrawer.astro` | Mobile navigation drawer, accordion sections and drawer controls | `.mobile-drawer`, `.mobile-nav`, `.mobile-menu-section` |
| `SplitList.astro` | Reusable split-list columns | `.split-list ul` |
| `StageExplorer.astro` | Tabbed stage explorer | `stage-explorer`, `.stage-selector`, `.stage-panel` |
| `SurveyEvidence.astro` | Survey methodology and evidence block | `.survey-evidence` |
| `SurveyExplorerIsland.astro` and `SurveyExplorer.tsx` | Homepage survey explorer tabs, year controls, bars and focus panel | `.survey-island`, `.survey-toolbar`, `.survey-bars`, `.survey-focus` |
| `SurveyReportApp.module.css` | 2024 and 2025 report scrollytelling, charts and comparison controls | `.report`, `.chapterSwitcher`, `.barRow`, `.compareToggle` |
| `TalkCard.astro` | Individual talk card | `.talk-card` |
| `TalksGrid.astro` | Talks listing grid | `.talk-grid` |
| `XaiProcess.astro` | XAI process player | `xai-process`, `.process-heading`, `.process-stage` |
| `prose/CTA.astro` | MDX CTA block | `.cta-only`, `.cta-block` |
| `prose/CapabilityTable.astro` | MDX capability table | `.capability-table` |
| `prose/Feature.astro` | MDX feature block | `.feature-block` |
| `prose/Metrics.astro` | MDX metrics block | `.metrics-block` |
| `BaseLayout.astro` | Global reveal state and view-transition image-pair isolation | `[data-reveal]`, `::view-transition-image-pair(*)` |
| `PrincipleLayout.astro` | Principle article prose and previous/next navigation | `.principle-prose`, `.principle-pagination` |
| `ProseLayout.astro` | Standard article prose shell | `.prose-content` |
| `pages/network.mdx` | Network page join introduction | `.join-intro` |
| `pages/newsletter/[issue].astro` | Newsletter issue meta bar, article deck and issue navigation | `newsletter-meta-bar`, `.issue-meta`, `.newsletter-page` |
| `pages/newsletter/index.astro` | Newsletter archive latest card and issue grid | `.latest-card`, `.issue-grid` |
| `pages/partners.mdx` | Partners page policy feature and list heading | `.policy-feature`, `.partner-list-heading` |
| `pages/policy.mdx` | Policy page work grid composition | `.policy-work` |
| `pages/talks.mdx` | Featured talks grid composition | `.featured-talks-grid` |

## Deliberately global rules

| Rules | Reason |
| --- | --- |
| `:root`, `@font-face` | Fonts and design tokens are consumed across unrelated surfaces. |
| `*`, `html`, `body`, element typography and link defaults | These establish the document foundation and reset native defaults consistently. |
| Custom-element `display: contents` defaults | Wrapper elements span several component implementations and must not introduce layout boxes. |
| `.actions`, `.button`, `.text-link`, `.status-pill`, `.eyebrow`, `.meta-label`, `.accent-action` | These presentation primitives are used by three or more unrelated components or authored pages. |
| `.stat-band`, `.stat`, `.split-list`, `.widget`, `.embedded-widget`, `.tags` | These are shared composition primitives with unrelated consumers. |
| `.prose-section`, `.prose-block`, `.block-body`, prose lists and pull quotes | Markdown, MDX and newsletter bodies share the same generated prose contract. |
| `table`, `th`, `td`, `dl`, `dt`, `dd` | Data and definition markup appears on unrelated prose and component surfaces. |
| Base `form`, `fieldset`, label, input and form-button rules | The contact/network form and newsletter form share these control foundations. |
| Root, principle and newsletter view-transition selectors and keyframes | Their endpoints cross layouts, pages and persisted header chrome. |
| `SiteHeader.astro` global `.site-header` transition name | The persisted node keeps its previous page scope across a route swap, so its transition name must remain unscoped. |
| `MegaMenu.astro` global `om-swap` keyframes | The mega-menu script assigns this animation by name at runtime, outside Astro's scoped keyframe rewriting. |
| `.fixed-canvas canvas`, `.kaos-canvas-mount canvas`, `.kaos-architecture-mount canvas` | The canvas sizing contract has multiple unrelated hosts. |
| `.kaos-canvas-mount`, `.kaos-architecture-mount`, `kaos-graph`, `kaos-architecture` | Shared KAOS canvas elements are embedded by multiple owners. |
| `.home-section` and its final-section rule | Page sections are composed through several homepage components and hydration adds non-section siblings. |
| `.article-hero.canvas-variant .hero-canvas` | The canvas is owned by its widget while its sizing depends on the parent hero variant. |
| `.footnote-about .affiliations` and descendant marquee rules | The footer owns the compact composition while `AffiliationMarquee` owns the child markup. |
| `.policy-section`, `.policy-work` and their shared descendants | The policy surface is composed by both the homepage component and the policy page. |
| Shared section clusters, engagement bands, benefit rows and policy feature copy | These patterns have page and component consumers, so no single local style fence owns them. |

## Presentation primitives

| Primitive | Appearance | Use |
| --- | --- | --- |
| `.eyebrow` | Small uppercase accent text in the mono face with wide tracking. | Section and card eyebrows. Override only the size or tracking when the local hierarchy needs it. |
| `.meta-label` | Small muted mono metadata with compact line-height and moderate tracking. | Dates, group labels, counts and short descriptive metadata. Local colour, size and tracking may express hierarchy without copying the whole treatment. |
| `.accent-action` | Small uppercase mono action text in the accent colour. | Trailing card actions and compact text calls to action. Preserve sentence case locally when the authored action is not a label. |
| `.text-link` | Accent-coloured underlined inline text with a readable underline offset. | Links inside prose. Do not use it for button-like or trailing card actions. |
| `.prose-block` | Subtle top-to-bottom surface wash, hairline border and standard card radius. | Bordered prose widgets and editorial blocks. Components own their internal layout and padding. |

## Breakpoints

| Name | Width | Use |
| --- | ---: | --- |
| Wide | `950px` | Switch desktop navigation, multi-column compositions and full desktop widgets to compact layouts. |
| Compact | `600px` | Stack dense rows, simplify grids and tighten mobile spacing. |
| Narrow | `420px` | Handle the smallest supported viewport where compact rules still need a final adjustment. |

Use these widths for CSS media queries. A component that needs responsive client behaviour must keep its `matchMedia` condition beside that behaviour and align it with the CSS boundary whenever the states represent the same layout switch.

## Where a new rule goes

1. For a new component, put the rule in that component's scoped `<style>` block; use `is:global` only when styling child markup that Astro cannot scope, such as an island or custom element.
2. For a page-specific tweak, put the rule in the owning `.astro` or `.mdx` page so it cannot affect another route.
3. For a new token, add it to `:root` only after at least two owners need the same semantic value; otherwise keep the value local.
4. If an override seems necessary, find the existing owner first and change the original rule or component API. Add a cross-owner rule to `tokens.css` only when the relationship itself is shared and document that reason here.
