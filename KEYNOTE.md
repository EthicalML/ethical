# Signals keynote

`public/keynote/` is the compiled, standalone Signals Berlin presentation, served at https://ethical.institute/keynote/. Astro copies this directory unchanged into `dist/keynote/`; the existing Pages workflow publishes it when this PR is merged to `master`. It has its own full-screen layout and does not use the Astro navigation or route transitions.

The package contains 41 speaking stops, six preloaded Three.js hardware models, local fonts, a portrait, and the closing QR code. Daytime and storm scenes use coordinated light/dark palettes. The repaired enclosure becomes a memory-rack drawer; nested mechanical sleeves open into a funnel, activity crystals assemble into eight agent cubes, and a 6,800-star field gathers into a rotating galaxy only on the final Thank You stop. The engine opens and reassembles, then separates into four retained assemblies: housing, cylinder, crankshaft and governor. No covers are ejected during that separation. All hardware floats without artificial ground-shadow planes. One first-slide JPEG is shipped for social sharing; there is no screenshot fallback. A PDF can be exported separately if needed. Click, Space, Enter, Page Down, or Right advances; P opens the presenter window. Hash links such as `/keynote/#4.7` open a specific stop. Reduced-motion support remains built into the presentation.

The identity section includes an illustrative shared-admin-credential failure, followed by its safeguards. A metal robot assembles behind the credential cards, with opaque depth-tested parts and red sensor eyes. It retreats as three thick blue covers seat sequentially around the credentials. Security footnotes are white over the autumn foothills. The security divider object is enlarged, and the SRE control-loop slide places the raised engine left of the lowered text block.

## Updating the package

The editable source currently lives separately at `~/Programming/agentic/astra-keynote`; this directory is a release artifact, not its source repository. Make presentation changes there and run:

```sh
npm run build -- --base=/keynote/ --outDir=tmp/keynote-package
```

Replace this repository's `public/keynote/` with that output in a new website worktree. Copy the source project's current `PREFLIGHT.md` into the package, and `node_modules/three/LICENSE` as `THREE-LICENSE.txt`. Do not edit hashed bundles directly.

Keep Vite's `/keynote/` base and the runtime `import.meta.env.BASE_URL` asset references: root-relative portrait, QR, or checklist paths will break on the published URL. All presentation assets are local; no server or new deployment workflow is required. Google Analytics is an optional external request on the production hostname only, excluded from localhost and presenter windows.

## Verification

Run the website's lint, ratchet and build checks. Serve the resulting `dist/` and verify `/keynote/`, including all 41 stops, deep-link reloads, presenter notes at the final stop, clicker controls, and desktop/mobile layouts. The source project's `scripts/verify-clicker.mjs` accepts `KEYNOTE_URL` for checking the packaged route.

The presentation preserves a 16:9 stage on phones (letterboxed in portrait); landscape orientation is recommended for reading the detailed charts. The website's article typography and mobile layout are not applied to this standalone release.

## Sharing and analytics

The static HTML includes Open Graph and X large-image card metadata for the first-slide image at `/keynote/keynote-preview-20260910.jpg` (1200 by 675). Crawlers do not need to execute JavaScript. Regenerate it from the source project's local preview using `node scripts/capture-sharing-preview.mjs`; version the image filename and metadata together when changing the picture. Cached previews on sharing platforms may need a fresh scrape.

The top-left speaker name links to `https://www.linkedin.com/in/axsaucedo/` in a new tab. The separate SIGNALS link returns to the opening slide.

GA4 reuses `G-L2HXV1W6H6` from `BaseLayout.astro`. The tag loads asynchronously after page load only on `ethical.institute`, outside presenter mode. The page URL excludes the slide fragment. Standard GA4 and shared enhanced-measurement settings apply; no custom slide events are sent. The presentation remains usable when analytics is blocked. Analytics verification uses intercepted tag requests to avoid polluting production reports.
