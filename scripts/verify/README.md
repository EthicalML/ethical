# Verification harness

These scripts are the reviewed development harness required by ADR-008. Start a built site on port 4126, then pass the affected routes explicitly:

```sh
node scripts/verify/verify-dom.mjs / /principles/ /principles/09/
node scripts/verify/verify-shots.mjs / /principles/ /principles/09/
```

Set `VERIFY_BASE_URL` only when deliberately verifying another local origin. `routes.json` is the nine-route evaluation baseline for Milestone A. Screenshot files and their manifest go to the git-ignored `scripts/verify/out/`.

## Reviewed checks

- HTTP status: asserts every requested route resolves successfully so a visually plausible error page cannot pass.
- Page and console errors: catches runtime failures that static build success cannot expose.
- Scripted reveal sweep: scrolls slowly through the full document and asserts every `[data-reveal]` reaches `data-revealed="1"` because observer-only reveal logic previously failed under fast scrolling.
- Canvas pixel sampling: asserts every rendered canvas has dimensions and at least one non-transparent sampled pixel because blank widgets survived visual review during evaluation.
- Page height ceiling: asserts the document remains below 20,000px to catch canvas ResizeObserver feedback loops.
- Page width ceiling: asserts desktop pages do not create document-level horizontal scrolling; wide content must scroll inside its container.
- Homepage structure: asserts the three hero modes, bounded principle column, survey card/bars, and 400px KAOS feature mount remain wired after refactors.
- KAOS mount bounds: asserts route and preview graph hosts stay between 220px and 500px, covering both the compact threshold and the prior infinite-height bug class.
- Deterministic full-page screenshots: disables animation and transition timing, scrolls once to activate lazy content, returns to the top, and masks canvases so refactor comparisons measure stable layout rather than animation frames.
