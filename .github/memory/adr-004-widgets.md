# ADR-004 — Widgets: vanilla canvas vs Preact islands

**Status:** ACCEPTED · Boundary validated in rounds 4-6 (all engines ported at fidelity in vanilla JS; survey as island).

## The boundary rule

- **Stateless animation (no user-driven UI state) → vanilla JS**, mounted declaratively: component emits `<div data-widget="<name>">` (or a canvas with the attribute); a shared registry script scans `[data-widget]`, lazy-mounts on intersection. Applies to: hero alignment-field (3 scenes + tear/mode swap), Kompute cube, KAOS graph (full + compact <220px variant), XAI pipeline scan, ecosystem count-up, affiliation marquee behaviour.
- **Stateful UI (tabs/sorting/compare/user state) → a `.tsx` Preact island**, `client:visible`. Applies to: survey explorer. Add new islands only when state genuinely drives DOM structure; a third widget class does not exist.
- `.astro` components CANNOT hold client state by construction — this boundary is architectural, keep it.

## Mount contract (every vanilla widget)

- `mount(el, opts) → { destroy() }`; container height from CSS (min-height), canvas backing store resized via ResizeObserver — **never let canvas size feed back into container size** (the round-4 infinite-height bug class).
- DPR capped at 1.5; rAF gated by IntersectionObserver + `visibilitychange`; `prefers-reduced-motion` → draw one static frame, never start the loop.
- One widget per file; widgets read config from data-attributes, not globals.
- Scripts in `public/assets/` (served verbatim); reference from layouts with `is:inline` so Astro doesn't try to bundle them.

## Canvas engine facts (port-relevant)

- Hero: three scenes (layered planes 16/20/15 nodes with labels; Fibonacci sphere; warped contour rings), 9s cycle, tear = 16-band offscreen re-blit with chroma ghosting at 6.4-7.4s, 1.25s cross-fade + spin-boost on mode swap; graph-switcher rules select scenes; pointer shifts yaw/tilt.
- Kompute: 27 cubies, per-face orientation matrices, scramble 14 quarter-turns then inverse replay, 0.42s/move cubic ease, painter-sorted quads, sticker inset 0.82, pointer yaw/pitch.
- KAOS: 7 nodes / 9 edges, 2 packets per edge, hover highlights + names the node in a status line; compact variant auto-selected below 220px height (dropdown preview relies on this).
- Dropdown previews reuse the SAME widget modules as page cards — one implementation per visual, mounted late in a resized panel (ResizeObserver refit matters there).
