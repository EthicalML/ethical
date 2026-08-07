# Typewriter punctuation, cursor, and tab-switch zoom diagnosis

Branch verified: `redesign-astro`

## Result

- Every rotating L3 beneficiary now includes its full stop in the animated string. The period is typed, included in the dwell state, and removed first during backspacing because deletion uses the full string length.
- Reduced motion renders the static final line as `PEOPLE AND SOCIETY.`.
- The old text glyph cursor is now an empty inline block: white background, `.58ch` wide, `.78em` high, baseline-aligned, with the existing 1s blink.
- Cursor crop: [`typewriter-cursor.png`](typewriter-cursor.png)

Measured at the 1440px gate:

- cursor width: `4.515625px` (`.58ch` in the loaded 13px Geist Mono)
- cursor height: `10.125px`
- background: `rgb(255, 255, 255)`
- vertical alignment: `baseline`
- blink duration: `1s`

## Tab-switch zoom diagnosis

The reported zoom did not reproduce headlessly, so no production canvas change was made.

Code inspection found:

- Hero canvas `fit()` runs on mount and `ResizeObserver`, not on `visibilitychange`.
- Every canvas refit assigns its backing dimensions and calls `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` from scratch. No refit path multiplies the existing transform with `ctx.scale`.
- The hero `visibilitychange` handler only pauses or restarts the animation loop.

The regression test used device scale factor 2 (the site caps DPR at 1.5), captured the hero canvas before and after five synthetic hidden→visible event cycles, and also attempted five real headless tab switches with `bringToFront`.

Headless Chromium kept `document.visibilityState` as `visible` during `bringToFront`, so those switches did not exercise the visibility handler. The explicit hidden→visible events did exercise both branches five times.

Before and after were identical:

| Measurement | Before | After |
| --- | ---: | ---: |
| Canvas backing store | `1426 × 1013` | `1426 × 1013` |
| Canvas CSS box | `950.390625 × 675.359375` | `950.390625 × 675.359375` |
| 2D transform | `matrix(1.5, 0, 0, 1.5, 0, 0)` | `matrix(1.5, 0, 0, 1.5, 0, 0)` |
| Typewriter font size / transform | `13px` / `none` | `13px` / `none` |
| Glitch font size / transform | `72px` / `none` | `72px` / `none` |
| Reduced-motion canvas pixels | baseline | pixel-identical |

Machine-readable evidence is in [`visibility-toggle.json`](visibility-toggle.json), with the captured [`before`](visibility-before.png) and [`after`](visibility-after.png) canvas crops beside it. The assertion is retained as `scripts/verify/verify-visibility.mjs`.

Browser-side causes for the owner to check are site-specific browser zoom restoration and a retained pinch/trackpad zoom state. Those are browser viewport states and would not appear as canvas backing-store or element-transform changes.

## Gates

All gates ran against `http://127.0.0.1:4126` with Node `22.14.0`:

- Astro static build: pass, 25 pages
- Homepage DOM, `1440 × 1000`: pass
- Homepage DOM, `420 × 900`: pass
- Typewriter animation/reduced-motion/cursor assertions: pass
- Five-cycle visibility assertion at DPR 2 (capped to 1.5): pass
- `git diff --check`: pass
