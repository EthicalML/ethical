# ADR-003 — Design tokens and CSS organisation

**Status:** ACCEPTED · Unchanged in substance since the pre-spike draft; validated through the fidelity rounds (5-6).

- **Single source of design values:** the handoff README's token table (research repo, `design/design_handoff_institute_homepage/README.md`) mirrored once into `src/styles/tokens.css` as CSS custom properties on `:root`. Components consume variables, never literals. A fidelity question is answered by diffing computed styles against the prototype, not by hunting hex codes.
- **Stylesheet roles** (rename the session-era files on import — see plan): `tokens.css` (variables + base + component classes), a prose-shell sheet, and a layout-geometry sheet. Candidate final names: `tokens.css`, `prose.css`, `layout.css`. No scoped `<style>` blocks in components for now — central sheets keep the design system greppable; revisit only if per-component styling pain emerges.
- **Fonts:** Newsreader (300–600 + italic), Geist (300–700), Geist Mono (300–500). Currently Google-hosted; **self-host woff2 before cutover** per the handoff instruction (`font-display: swap`).
- **Dark currently** (`color-scheme: dark`): not a design decision — the light theme was removed during design development because it wasn't good enough, not because theming is excluded. A light theme / theme switching is unprioritised, not rejected; do not architect against it (keep colour usage token-pure so a second token set remains possible).
- **Motion:** durations/easings via variables; every animated behaviour has a `prefers-reduced-motion` branch (static canvas frame, no reveal stagger, no marquee, no glitch). The 9s hero cycle (scene swap + tear) and glitch keyframes are phase-locked by construction — do not decouple their timings.
- Wide content must scroll within its container; the page never scrolls horizontally.
