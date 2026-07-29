# ADR-010 — Client navigation and motion (view transitions)

**Status:** ACCEPTED (owner-ratified 2026-07-29, after worktree pilot `expt/view-transitions` + owner preview).

## Decision

Adopt Astro's `ClientRouter` (view transitions) site-wide, plus `prefetch`. The site remains a fully static MPA — every URL is complete build-time HTML, so SEO is unaffected; the router only upgrades internal navigation in JS-enabled browsers.

## Approved motion set (the map itself lives in CONVENTIONS.md and MUST be kept current there)

- Morphs: principles explorer title → principle page h1; Reports & Initiatives card titles → page hero titles; KAOS canvas card → `/open-source/kaos/` hero (signature move); homepage survey title → survey explorer; marquee partner logo → `/partners/` (name assigned to the clicked instance at click time — the marquee's duplicated strip means a static name would be non-unique and the browser would skip the morph).
- Entry effects: content settle (~10px rise + fade) on arrival; one-shot glitch burst on pages with glitch headlines; directional slide for principle prev/next paging.
- Persistent: site header (`transition:persist="site-header"`).
- Rejected: staggered card cascades (fights scroll-reveal); morphs into legacy `public/mle`/state-of-ml documents (outside the router until modernised).

## Rules

1. **No `prefers-reduced-motion` gating for view transitions** — explicit owner decision (existing widget reduced-motion behaviour untouched).
2. Morph names are widget-owned contracts: the component rendering each endpoint owns its `transition:name`; both ends must exist or the pair is a review failure.
3. Computed/template-literal transition names REQUIRE an inline `view-transition-name` style companion — Astro's production build drops the generated CSS for computed names while dev renders it (pilot root-cause, report-expt-vt.md "Morph fix").
4. Morphs are verified against the PRODUCTION build only; dev mode masks rule 3's failure class.
5. Long-lived document discipline: page-wide scripts must be custom elements or register `astro:before-swap`/`astro:after-swap` (the Reveal pattern). Analytics reports each navigation via `astro:page-load`, not only initial load.
6. Back-navigation scroll restoration is applied before the incoming snapshot so back animates directly into the restored position (no top-flash).
7. Any added or changed animation updates the CONVENTIONS.md motion map in the same change — definition-of-done item.

## Pilot facts

17-line product diff; of ten audited behaviours only the module-scope Reveal needed lifecycle work; zero resource growth over 10 navigation round trips. The experiment-only Vite tsconfig lines in the worktree's `astro.config.mjs` are build scaffolding for the nested `tmp/` location and MUST NOT ship.
