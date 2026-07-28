# Verification harness

These scripts are the reviewed development harness required by ADR-008. Start a built site on port 4127, then pass the affected routes explicitly:

```sh
node scripts/verify/verify-dom.mjs / /principles/ /principles/09/
node scripts/verify/verify-dom.mjs --viewport 420x900 / /principles/
VERIFY_VIEWPORT=768x900 node scripts/verify/verify-dom.mjs / /principles/
node scripts/verify/verify-shots.mjs / /principles/ /principles/09/
node scripts/verify/verify-typewriter.mjs
```

Set `VERIFY_BASE_URL` only when deliberately verifying another local origin. `--viewport WIDTH` or `--viewport WIDTHxHEIGHT` changes the DOM-gate viewport; `VERIFY_VIEWPORT` is the environment equivalent. `routes.json` lists every generated site route. Screenshot files and their manifest go to the git-ignored `scripts/verify/out/`.

## Reviewed checks

- HTTP status: asserts every requested route resolves successfully so a visually plausible error page cannot pass.
- Page and console errors: catches runtime failures that static build success cannot expose.
- Scripted reveal sweep: scrolls slowly through the full document and asserts every `[data-reveal]` reaches `data-revealed="1"` because observer-only reveal logic previously failed under fast scrolling.
- Canvas pixel sampling: scales the full canvas into a small sample and asserts every visible canvas has at least one non-transparent pixel because blank widgets survived visual review during evaluation; the header's deliberately hidden preview mount is excluded until a menu opens it.
- Page height ceiling: asserts the document remains below 20,000px to catch canvas ResizeObserver feedback loops.
- Page width ceiling: asserts pages do not exceed the selected viewport; wide tables must scroll inside their own container.
- Mobile checks: asserts the drawer accordions, JOIN access, Escape/focus/scroll-lock handling, 44px touch targets, stacked form/footer, responsive evidence/phase grids, non-sticky principles detail, capped hero canvas, and contained survey tabs.
- Homepage structure: asserts the three hero modes, principle layout, survey card/bars, and viewport-appropriate KAOS feature mount remain wired after refactors.
- KAOS mount bounds: asserts route and preview graph hosts stay between 220px and 500px, covering both the compact threshold and the prior infinite-height bug class.
- Deterministic full-page screenshots: disables animation and transition timing, scrolls once to activate lazy content, returns to the top, and masks canvases so refactor comparisons measure stable layout rather than animation frames.
- Hero typewriter: asserts sequential initial typing across all three fixed lines, cursor movement, pill-matched type, accent colour, 9-second headline phase lock, stable geometry, changing initial and rotation frames, the underline comparison crops, mobile containment, and a static reduced-motion state without a cursor.
