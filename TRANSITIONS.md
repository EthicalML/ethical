# Transitions

The map of what moves between and within routes. Add or change one, update this file in the same change.

## Route transition map

A morph is a `view-transition-name` shared by a source and a destination. `MorphPairs` sets it on the source at pointerdown and restores it for exactly one back-navigation; widget-local copies are not sanctioned.

| Source                                 | Destination                      | Owners                                                         |
| -------------------------------------- | -------------------------------- | -------------------------------------------------------------- |
| every route                            | every route (content settle)     | `BaseLayout`, `tokens.css`                                     |
| every route                            | every route (header persists)    | `SiteHeader`, `BaseLayout`                                     |
| principles explorer detail             | `/principles/NN/` h1             | `MorphPairs`, `PrinciplesExplorer`, `PrincipleLayout`          |
| homepage 03 policy heading             | `/policy/` hero h1               | `MorphPairs`, `PolicySection`, `ArticleHero`                   |
| `/frameworks/` cards                   | the five framework heroes        | `MorphPairs`, `FrameworkCards`, `ArticleHero`                  |
| homepage KAOS card title               | KAOS hero h1                     | `MorphPairs`, `OpenSourceShowcase`, `ArticleHero`              |
| `/open-source/` panel titles           | project page heroes              | `MorphPairs`, `ProjectFeature`, `ArticleHero`                  |
| blog archive card title                | blog post hero h1                | `blog/index.astro`, `[slug].astro`, `Hero`                     |
| affiliation marquee logo               | matching partner directory logo  | `MorphPairs`, `AffiliationMarquee`, `PartnerDirectory`         |
| `/newsletter/N/` prev/next             | adjacent issue (body slides)     | `[issue].astro`, `Motion`, `ScrollRestoration`                 |
| `/principles/NN/` sub-navbar prev/next | adjacent principle (body slides) | `PrincipleLayout`, `BaseLayout`, `Motion`, `ScrollRestoration` |
| framework, network and newsletter CTAs | matching contact form row        | `FormSection`                                                  |

`KaosGraph` and `KaosArchitecture` accept a `transitionName` for a canvas morph; no page passes one today.

On both sibling navigations only the article body slides directionally; hero, header and meta bar stay put, and reduced motion replaces the slide with the standard fade.

### Rules

- Text morphs require identical strings at both endpoints. Computed names need an inline companion beside the static destination name.
- Offscreen names are silenced on both sides of a navigation, so a title never flies in from outside the viewport. Partially visible elements still morph.
- A named element is lifted out of ancestor effects during a transition; anything meant to fade with the page must not carry a `view-transition-name`.
- An element that must stay above a morphing group needs its own named group and explicit `::view-transition-group` z-order.
- A stateful container restores the state that makes a morph endpoint visible synchronously at mount.
- Forward navigations without a hash pin the fresh page to the top until the transition finishes (`ScrollRestoration`). Firefox scrolls the new page after the snapshot capture, which offsets every morph; do not remove the pin without re-testing in Firefox from a deeply scrolled origin.
- Verify morphs against the production build. Dev mode hides missing computed names.
- Land motion changes one at a time, in-session, owner-validated by eye. Revert failed experiments; instrumentation is for diagnosis only.

## Page and chrome motion

Motion inside a route rather than between routes.

| Motion                       | What and where                                                                      | Owners                                  |
| ---------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------- |
| Section reveal               | fade-in as an element enters view, everywhere; article bodies reveal block by block | `Reveal`, `BaseLayout`                  |
| Header logo collapse         | wordmark folds into the 2x2 mark past 80px of scroll, the bar compacts with it      | `SiteLogo`, `SiteHeader`                |
| Mobile menu toggle           | burger rotates into an X as the drawer opens                                        | `SiteHeader`, `MobileDrawer`            |
| Mobile drawer entrance       | opaque panel, content settles down and fades with a per-row stagger                 | `MobileDrawer`, `SiteHeader`            |
| Flagship initiative carousel | homepage 04 snap carousel with position bubbles and edge chevrons                   | `OpenSourceShowcase`                    |
| Report scrollytelling        | `/reports/state-of-ml-*/` sticky bar-chart stage driven by the active question      | `SurveyReportApp`, `SurveyReportIsland` |
| Mega menu panels             | panel swap and content fade as a nav section opens                                  | `MegaMenu`                              |
| Control plane map            | KAOS control plane map: panel arrival on selecting a node                           | `ControlPlaneMap`                       |
| Archive showcase             | blog archive scroll stage, the featured post riding the scroll                      | `ScrollStage`                           |
| Talk reel                    | `/talks-and-events/` reel stepping through frames in the order given                | `TalkReel`, `ScrollStage`               |
| Policy reading room          | `/policy/` record list, document viewer, mobile list/detail flip                    | `PolicyRecordPreview`                   |
| Policy achievement set table | `/policy/` card grid: lego falls, ghost-rule wipes, neon reveals                    | `AchievementNeonRendition`              |

### Rules

- Reveal never replays after a client-side navigation: what is already on screen after the swap is marked revealed without an entrance, so a route's own arrival motion is the only entrance a visible element plays.
- The reveal pre-hide must not gate first paint. Everything starting inside the viewport is marked revealed before paint, and `<noscript>` un-hides everything.
- An element whose script rewrites its own visible text at mount carries `data-paint-hold`, cleared by that script on every exit path. The hero typewriter subtitle is the only holder.
- Cards a user drives never rotate on their own (principles, phases).
- Every motion has a reduced-motion rendition.
