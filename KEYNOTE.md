# Signals keynote

`public/keynote/` is the compiled, standalone Signals Berlin presentation, served at https://ethical.institute/keynote/. Astro copies this directory unchanged into `dist/keynote/`; the existing Pages workflow publishes it when this PR is merged to `master`. It has its own full-screen layout and does not use the Astro navigation or route transitions.

The package contains 40 speaking stops, six preloaded Three.js hardware models, local fonts, a portrait, and the closing QR code. Daytime and storm scenes use coordinated light/dark palettes. The repaired enclosure becomes a memory-rack drawer; nested mechanical sleeves open into a funnel, activity crystals assemble into eight agent cubes, and a 6,800-star field gathers into a rotating galaxy only on the final Thank You stop. The engine opens and reassembles, then separates into four retained assemblies: housing, cylinder, crankshaft and governor. No covers are ejected during that separation. All hardware floats without artificial ground-shadow planes. No slide screenshots are shipped; a PDF can be exported separately if needed. Click, Space, Enter, Page Down, or Right advances; P opens the presenter window. Hash links such as `/keynote/#4.7` open a specific stop. Reduced-motion support remains built into the presentation.

## Updating the package

The editable source currently lives separately at `~/Programming/agentic/astra-keynote`; this directory is a release artifact, not its source repository. Make presentation changes there and run:

```sh
npm run build -- --base=/keynote/ --outDir=tmp/keynote-package
```

Replace this repository's `public/keynote/` with that output in a new website worktree. Copy the source project's current `PREFLIGHT.md` into the package, and `node_modules/three/LICENSE` as `THREE-LICENSE.txt`. Do not edit hashed bundles directly.

Keep Vite's `/keynote/` base and the runtime `import.meta.env.BASE_URL` asset references: root-relative portrait, QR, or checklist paths will break on the published URL. All presentation assets are local; no server or new deployment workflow is required.

## Verification

Run the website's lint, ratchet and build checks. Serve the resulting `dist/` and verify `/keynote/`, including all 40 stops, deep-link reloads, presenter notes at the final stop, clicker controls, and desktop/mobile layouts. The source project's `scripts/verify-clicker.mjs` accepts `KEYNOTE_URL` for checking the packaged route.

The presentation preserves a 16:9 stage on phones (letterboxed in portrait); landscape orientation is recommended for reading the detailed charts. The website's article typography and mobile layout are not applied to this standalone release.
