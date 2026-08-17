# Motion

Two things live here: the **page transitions**, which must stay coherent across routes, and the **animation menu**, which is the catalogue of what exists and who owns it. Add or change either, update this file in the same change.

## Page transitions

Route-to-route continuity. A morph is a `view-transition-name` shared by a source and a destination; `MorphPairs` sets it on the source at pointerdown and restores it for one back-navigation.

| Transition                  | Source → destination                                         | Owners                                                         |
| --------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| Content settle              | every route → every route                                    | `BaseLayout`, `tokens.css`                                     |
| Header persistence          | every route ↔ every route                                    | `SiteHeader`, `BaseLayout`                                     |
| Principle title morph       | explorer detail → `/principles/NN/` h1                       | `MorphPairs`, `PrinciplesExplorer`, `PrincipleLayout`          |
| Policy title morph          | homepage 03 heading → `/policy/` hero h1                     | `MorphPairs`, `PolicySection`, `ArticleHero`                   |
| Framework title morphs      | `/frameworks/` cards → the five framework heroes             | `MorphPairs`, `FrameworkCards`, `ArticleHero`                  |
| KAOS title morph            | homepage KAOS card title → KAOS hero h1                      | `MorphPairs`, `OpenSourceShowcase`, `ArticleHero`              |
| OSS portal title morphs     | `/open-source/` panel titles → project heroes                | `MorphPairs`, `ProjectPortal`, `ArticleHero`                   |
| Partner logo morph          | clicked marquee logo → matching directory logo               | `MorphPairs`, `AffiliationMarquee`, `PartnerDirectory`         |
| Newsletter issue navigation | `/newsletter/N/` prev/next → adjacent issue                  | `[issue].astro`, `Motion`, `ScrollRestoration`                 |
| Principle directional slide | `/principles/NN/` prev/next → adjacent principle             | `PrincipleLayout`, `BaseLayout`, `Motion`, `ScrollRestoration` |
| Contact interest arrival    | framework/network/newsletter CTA → matching contact form row | `FormSection`                                                  |

On the two sibling navigations only the article body slides directionally; hero, header and meta bar stay put, and reduced motion replaces the slide with the standard fade.

### Rules

- Text morphs require identical strings at both endpoints, and computed names need an inline companion beside the static destination name.
- Offscreen names are silenced on both sides of a navigation, so a title never flies in from outside the viewport. Partially visible elements still morph.
- A named element is lifted out of ancestor effects during a transition; anything meant to fade with the page must not carry a `view-transition-name`.
- An element that must stay above a morphing group needs its own named group and explicit `::view-transition-group` z-order.
- A stateful container restores the state that makes a morph endpoint visible synchronously at mount.
- Forward navigations without a hash pin the fresh page to the top until the transition finishes (`ScrollRestoration`). Firefox scrolls the new page after the snapshot capture, which offsets every morph; do not remove the pin without re-testing in Firefox from a deeply scrolled origin.
- Verify morphs against the production build. Dev mode hides missing computed names.
- Land motion changes one at a time, in-session, owner-validated by eye. Revert failed experiments; instrumentation is for diagnosis only.

## Animations and canvas

The menu of what exists. Reuse from here before writing a new one. Every entry holds a composed static frame under reduced motion.

| Animation                    | What and where                                                                            | Owners                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Section reveal               | fade-in as an element enters view, on every route; article bodies reveal block by block   | `Reveal`, `BaseLayout`                                                                |
| Header logo collapse         | wordmark folds into the 2x2 mark past 80px of scroll, bar compacts with it                | `SiteLogo`, `SiteHeader`                                                              |
| Mobile menu toggle           | burger rotates into an X as the drawer opens                                              | `SiteHeader`, `MobileDrawer`                                                          |
| Mobile drawer entrance       | opaque panel, content settles down and fades with a per-row stagger                       | `MobileDrawer`, `SiteHeader`                                                          |
| Homepage hero cycle          | hero separator cycles its three canvas objects while in view                              | `Hero`, `HeroCycle`                                                                   |
| Homepage KAOS agent graph    | agent graph in the homepage showcase                                                      | `KaosGraph`                                                                           |
| Flagship initiative carousel | homepage 04 snap carousel with position bubbles and edge chevrons                         | `OpenSourceShowcase`                                                                  |
| Report scrollytelling        | `/reports/state-of-ml-*/` sticky bar-chart stage driven by the active question at desktop | `SurveyReportApp`, `SurveyReportIsland`                                               |
| Contact form submission      | isometric packet crosses to its destination over the settle window, then a confirmation   | `FormSection`, `FormSendIso`                                                          |
| KAOS architecture orbit      | control-plane map on the project portal and KAOS hero                                     | `KaosArchitecture`                                                                    |
| Policy citadel               | iso citadel with jurisdiction towers and beat conduits: `/policy/` hero and homepage 03   | `PolicyHeroPolicyCircuit`, `PolicyHeroIso`, `PolicySection`                           |
| Policy reading room          | `/policy/` record list, document viewer, mobile list/detail flip                          | `PolicyRecordPreview`                                                                 |
| Policy achievement set table | `/policy/` card grid: lego falls, ghost-rule wipes, neon reveals                          | `AchievementNeonRendition`                                                            |
| Skills marketplace dock      | iso crates dispatching into a client socket: `/open-source/` FIG 04 and marketplace hero  | `SkillCrateDock`, `IsoKit`                                                            |
| Agentic catalogue light grid | violet cell grid with snake and tetromino runs: `/open-source/` FIG 07 and the list hero  | `CatalogueLightGrid`                                                                  |
| Editor theme buffer          | iso code slab cycling three palettes: `/open-source/` FIG 08 and the monokai hero         | `ThemeBufferIso`, `IsoKit`                                                            |
| Project portal activity      | `/open-source/` project panels and the production ML constellation                        | `ProjectPortal`, `CategoryConstellation`                                              |
| Project hero backdrops       | each project canvas behind its hero copy through `ArticleHero`'s `backdrop` slot          | `ArticleHero`, `XaiPipeline`, `CategoryMosaic`                                        |
| Catalogue mosaic cells       | twinkling category fields: squares for production ML, hexagons for AI regulation          | `CategoryMosaic`                                                                      |
| Production ML atlas drift    | drifting category field in the production ML catalogue                                    | `CategoryAtlas`                                                                       |
| Looping demo playback        | memory lifecycle, request path, Kompute sequence, XAI workflow                            | `AnimationWindow`, `MemoryLifecycle`, `RequestPath`, `SequencePipeline`, `XaiProcess` |
| Finite terminal playback     | KAOS quickstart terminal typing once                                                      | `AnimationWindow`, `QuickstartTerminal`                                               |

### Rules

- A canvas element gates below-fold work with `IntersectionObserver`, resizes its backing store without resizing the container, and releases observers, listeners, frames and timers on disconnect.
- Reveal never replays after a client-side navigation: what is already on screen after the swap is marked revealed without an entrance, so a route's own arrival motion is the only entrance a visible element plays.
- The reveal pre-hide must not gate first paint. Everything starting inside the viewport is marked revealed before paint, and `<noscript>` un-hides everything.
- An element whose script rewrites its own visible text at mount carries `data-paint-hold`, cleared by that script on every exit path. The hero typewriter subtitle is the only holder.
- Full-bleed backdrops behind hero text carry no card framing: use `<KaosArchitecture embedded backdrop />`, never `widget`/`embedded-widget`.
- Cards that a user drives never rotate on their own (principles, phases).
