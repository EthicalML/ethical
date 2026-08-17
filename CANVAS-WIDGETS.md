# Canvas widgets

The menu of canvas objects the site already has. Read it before building a new one, whether it is a hero backdrop, a section figure or a looping demo: the answer is usually an existing widget with a new prop, or the same kit assembled differently.

Named "canvas widgets" rather than 3D: the isometric pieces project 3D, the field and grid pieces do not, and all of them are 2D canvas elements under `src/shared/canvas/`.

## The kit

- `CanvasEngine` - the shared loop: sizing, device pixel ratio, visibility gating, teardown.
- `IsoKit` - isometric primitives (cubes, slabs, conduits, towers) shared by every iso widget.
- `AnimationWindow` - the framed chrome around a demo that plays, with its title bar.

## Widgets

| Widget                                                             | What it draws                                          | Where it runs                                      |
| ------------------------------------------------------------------ | ------------------------------------------------------ | -------------------------------------------------- |
| `PolicyHeroPolicyCircuit`                                          | iso citadel, jurisdiction towers, beat-driven conduits | `/policy/` hero, homepage 03 as a background layer |
| `KaosArchitecture`                                                 | orbiting control-plane map, selectable nodes           | KAOS hero, project portal                          |
| `KaosGraph`                                                        | agent graph                                            | homepage showcase                                  |
| `SkillCrateDock`                                                   | iso crates dispatching into a client socket            | `/open-source/` FIG 04, marketplace hero           |
| `ThemeBufferIso`                                                   | iso code slab cycling three palettes                   | `/open-source/` FIG 08, monokai hero               |
| `FormSendIso`                                                      | iso packet crossing a route to a destination tower     | both contact forms                                 |
| `KomputeCube`                                                      | rotating compute cube                                  | Kompute hero backdrop                              |
| `CatalogueLightGrid`                                               | violet cell grid with snake and tetromino runs         | `/open-source/` FIG 07, agentic list hero          |
| `CategoryMosaic`                                                   | twinkling category field: squares or hexagons          | production ML and AI regulation heroes             |
| `CategoryConstellation`                                            | linked category constellation                          | `/open-source/` project panels                     |
| `CategoryAtlas`                                                    | drifting category field                                | production ML and agentic catalogues               |
| `XaiPipeline`                                                      | pipeline stages flowing                                | XAI hero backdrop                                  |
| `OpenSourceHeroLattice`                                            | lattice field                                          | `/open-source/` hero                               |
| `HeroCycle`                                                        | cycles the homepage hero through its three objects     | homepage hero separator                            |
| `NavPreview`                                                       | small preview canvas                                   | mega menu                                          |
| `MemoryLifecycle`, `RequestPath`, `SequencePipeline`, `XaiProcess` | looping demos inside `AnimationWindow`                 | KAOS and Kompute explainer sections                |
| `QuickstartTerminal`                                               | terminal typing once, then holding                     | KAOS quickstart                                    |

## Adding one

- The canvas element goes in `src/shared/canvas/` (file and exported class in matching PascalCase, browser tag kebab-case); its `.astro` wrapper goes in `src/components/`. The importing component is the wiring; no global registry.
- Build on `CanvasEngine`, and on `IsoKit` when the piece is isometric.
- Mount contract: gate below-fold work with `IntersectionObserver`; render a static composed frame for reduced motion; resize the backing store without resizing the container; release observers, listeners, frames and timers on disconnect.
- A hero backdrop mounts through `ArticleHero`'s `backdrop` slot with the `hero-canvas` class, and carries no card framing (`widget`/`embedded-widget`), which would read as a dim plate behind the text.
- Add the widget to the table above in the same change.
