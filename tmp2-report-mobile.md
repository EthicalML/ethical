# Lane A' mobile pass report

Date: 2026-07-26  
Branch: `mobile-pass`  
Runtime: Node 22.14.0  
Verification origin: `http://127.0.0.1:4127` (server stopped after verification)

## Delivered commits

- `fd4c1fe` — responsive full-screen mobile navigation drawer
- `28c6c44` — responsive homepage layouts
- `affdef6` — responsive treatment for all other routes
- Final commit — viewport-aware DOM verification harness and this report

## 420px evidence

- Committed DOM harness: 20/20 routes passed at `420x900`.
- Every route reported `scrollWidth === clientWidth === 420`; no page-level horizontal overflow.
- Zero page errors, zero console errors, and zero unrevealed `[data-reveal]` targets.
- Every visible canvas sampled nonblank. Homepage canvas sizes: hero `420x340`, Kompute `382x260`, KAOS `300x260`.
- Homepage responsive assertions: 2-column evidence strip, 1-column phase grid, non-sticky principle detail, 1-column form and footnote band, horizontally contained survey tabs, full-width survey bars.
- Navigation assertions: five accordions, JOIN visible, minimum 44px CSS touch targets, scroll lock, Escape close, focus return, and focus-contained full-screen drawer.
- Tables scroll inside their cards: maturity table `370px` container / `640px` content; MLSecOps table `382px` container / `640px` content.
- Maximum document height was the homepage at `12,522px`, below the `20,000px` resize-loop ceiling.

## 768px evidence

- Committed DOM harness: 20/20 routes passed at `768x900`.
- Every route reported `scrollWidth === clientWidth === 768`; no page-level horizontal overflow.
- Zero page errors, zero console errors, and zero unrevealed `[data-reveal]` targets.
- Every visible canvas sampled nonblank. Homepage canvas sizes: hero `768x340`, Kompute `718x320`, KAOS `620x320`.
- Homepage responsive assertions: 3-column evidence strip, 2-column phase grid, stacked principles/OSS/reports/form/footer, non-sticky principle detail, horizontally contained survey tabs.
- Navigation interaction, scroll lock, Escape/focus behavior, and 44px touch-target checks passed.
- Maximum document height was the homepage at `10,991px`.

## Desktop zero-change gate

- Final build: 20 static routes generated successfully.
- Fresh `1440x1000` screenshots for all 20 routes were compared byte-for-byte with the pre-pass captures.
- Result: 20/20 screenshots pixel-identical; route widths, heights, HTTP status, and console-error manifests were unchanged.
- Pre-pass captures: `tmp/mobile-pass/before/`
- Final captures: `tmp/mobile-pass/final-desktop/`

## Conventional judgment calls for owner eyes

- Mobile navigation switches at `950px`; 1024px retains the unchanged desktop dropdown navigation.
- Homepage grids use 3/2 evidence columns and 2/1 phase columns at 768/420 respectively.
- Hero canvases are capped at `340px`; OSS/KAOS canvases are capped at `320px` at 768 and `260px` at 420.
- Survey tabs use a standard in-container horizontal scroller rather than wrapping.
- Two legacy prose routes rendered the same title twice. The inner duplicate is suppressed only below the mobile breakpoint; desktop remains pixel-identical.

No unresolved mobile design question blocks this pass. Owner visual review is most useful on the 420px hero/canvas balance, the full-screen drawer density, and the horizontal survey-tab affordance.
