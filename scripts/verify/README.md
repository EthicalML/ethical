# Verification harness

These scripts are the reviewed development harness required by ADR-008. Start a built site on port 4126. With no route arguments, the DOM and screenshot gates read every route from `routes.json`:

```sh
npm run verify:dom:all
npm run verify:shots:all
npm run verify:typewriter
npm run verify:motion:all
```

Playwright is not a repository dependency — it is a browser download nobody building the site should pay for. `playwright.mjs` resolves it at run time from `node_modules` if a caller installed it there (CI does, pinned), otherwise from `PLAYWRIGHT_MODULE` or the local npx cache the harness has always been driven from.

Pass routes after `--` to check a safe subset. Set `VERIFY_BASE_URL` only when deliberately verifying another local origin. `--viewport WIDTH` or `--viewport WIDTHxHEIGHT` changes either responsive gate; `VERIFY_VIEWPORT` is the environment equivalent. Screenshot files and their manifest go to viewport-specific folders under the git-ignored `scripts/verify/out/`.

## Themes

`--theme dark|light` (environment equivalent `VERIFY_THEME`, default `dark`) selects the theme every browser gate captures and asserts against. It is accepted by `verify-dom`, `verify-shots` and `verify-typewriter`.

The `:all` scripts wrap their two viewport legs in `sh -c ... --` so forwarded flags reach both. npm appends extra arguments to the end of the script string, so a plain `&&` chain gave `--theme light` to the 420 leg only and silently re-ran 1440 in dark — which for `verify:dom:all` meant overwriting the contrast baseline the light run was supposed to be compared against.

The flag seeds `localStorage.theme` before any script runs — the same signal the site's own pre-paint script reads, so the capture exercises the production path — and pins Playwright's emulated `prefers-color-scheme` to match. Both halves are load-bearing: Playwright defaults to light, so a gate that only seeds storage would silently capture light the moment the site gains an OS-preference fallback. As a fallback for builds where the theme script has not shipped yet, the seed also applies `data-theme` itself from a `MutationObserver`; it never overwrites an attribute the page already set, and it re-applies on `astro:after-swap` because Astro's `ClientRouter` swaps `<html>` attributes on every client-side navigation.

Dark output stays at `out/<viewport>/` so the committed dark baseline remains comparable; every other theme writes to `out/<theme>/<viewport>/` and can never overwrite it. Colour assertions resolve the custom property they mean (`--accent`, `--text-1`, `--bg-inset`, `--typewriter-cursor`, …) from the live page rather than baking one theme's literal, and the canvas screenshot mask uses the active theme's `--bg-base`.

## Contrast delta gate

`verify-dom` samples every text-bearing element, composites its colour over the first opaque ancestor background, and records the WCAG ratio under a structural key. Absolute WCAG floors are unusable as a gate here: the correct dark site already produces ratios of 1.07 and 1.52 on decorative text. The gate is therefore a delta against dark.

A dark run **records** the baseline to the git-ignored `out/contrast-baseline/<viewport>/contrast.json`, merging per route so a partial run refreshes only what it visited. A light run **compares** against it and fails when an element

- drops below a 1.15 ratio while it was at or above 1.15 in dark (invisible text), or
- retains less than 90% of its dark ratio **and** does not clear 4.5:1 (a real contrast regression).

The 4.5:1 clause is a pass threshold, not a failure threshold. The 0.9x rule alone flags the palette
itself: an accent at 11.7:1 on near-black cannot also be 10.5:1 on paper without ceasing to be an
accent, and its drop to 5.5:1 is the design. Absolute WCAG floors remain unusable for _failing_ a
node — correct dark decorative text sits at 1.07 — but a node that clears the body gate in light is
readable whatever it scored in dark.

Run the dark gate before the light gate; a light run with no recorded baseline fails rather than passing vacuously.

## Motion

`verify-motion` is the one gate that watches the journey rather than the destination. A real bug survived on `master` through every branch and was found by accident: navigating into a principle played its view transition 26px too low and snapped up on completion. Screenshots could not see it — the page was never in the wrong place, the _snapshot_ was. `.principle-prose` is both a `[data-reveal]` element and the named `principle-page` transition group, and the reveal settle was deferred by `requestAnimationFrame`, which runs after the browser photographs `::view-transition-new`. Fixed in `c38ef92` by settling in a microtask instead.

The gate clicks a real link (never `goto`), then samples every animation frame for two seconds after the click: the scroll offset, and each tracked element's `getBoundingClientRect()`. The primer that leaks into the snapshot is a `translateY(26px)` on the real element, and `getBoundingClientRect` sees transforms, so the bad frame is measurable even though the pseudo-element is not.

**The invariant is that arrival happens in a single motion.** From `astro:after-swap` onwards, every tracked element's document-space position — `scrollY + rect.top`, which cancels the router's own scroll — must already be its resting position. A trajectory that visits a position it later corrects away from by more than 2px is two motions. The resting value is the median of the window's last samples, and the assertion is stated against it rather than against "the first plateau" deliberately: a bad frame can be a single sample, too short to form a plateau of its own, and a plateau-relative rule would score it as the settle it corrects into. The 2px tolerance absorbs sub-pixel settle and layout rounding; it is not somewhere to hide a jump.

`reducedMotion` is left at `no-preference` on purpose — under `reduce`, `Reveal` marks everything revealed at construction and the gate would assert nothing.

Cases cover `/principles/` into a principle, principle prev/next in both directions, `/newsletter/` into an issue, and newsletter prev/next, at 1440x1000 and 420x900. Reverting `c38ef92` makes every principle case and both newsletter step cases fail with a measured 26px correction at post-swap frame 0, naming the route; the newsletter index card at 420 stays green because at that width the revealed elements are below the fold, so nothing on screen is photographed wrong.

## Parity

Compare a fresh capture with a stored baseline mechanically:

```sh
npm run verify:parity -- <baseline-dir> <current-dir> [--allow <file.json>]
```

The default tolerance is zero differing pixels. Only use `--tolerance` for documented canvas instability that reproduces between two captures of the same build.

### Reviewed allowlist

`--allow` names a JSON file keyed by screenshot filename, listing regions a reviewer has signed off on:

```json
{
  "home.png": [
    {
      "region": "400x60+100+200",
      "maxChannelDelta": 2,
      "pixels": 24000,
      "reason": "hairline rgba(255,255,255,0.07) collapsed onto the 0.08 ladder step",
      "approvedBy": "reviewer",
      "approvedIn": "PR #34"
    }
  ]
}
```

`region` is ImageMagick geometry, `WIDTHxHEIGHT+X+Y`. It is deliberately **not** a tolerance, and `--fuzz` is deliberately not the mechanism — a global magnitude threshold would equally hide a difference nobody reviewed. Instead the declared regions are masked out of _both_ images and the rest of the page must still match exactly, so the gate is unweakened everywhere the reviewer did not look. Within each region the script then requires:

- a maximum channel delta at or below the declared `maxChannelDelta`, hard-capped at 2/255 by the script — anything a viewer could see must be argued as a design change, not filed here;
- a differing-pixel count at or below the declared `pixels`, so a region cannot quietly grow to absorb new differences;
- at least one differing pixel, so a stale entry fails the gate instead of rotting;
- the difference bounding box of the unmasked pair to fall inside the declared regions, which surfaces "you masked the wrong place".

Every entry is echoed with its reason into the JSON report and cropped into `<diff-dir>/allow/<route>-<n>.png`, so review is per-difference and visual. Allowlist routes that produce no difference at all are reported as `unusedAllowlistRoutes` and fail the run. Omitting `--allow` leaves the gate exactly as it is: zero pixels, no exceptions.

`npm run verify:events` is the exception: it reads `src/content/events.yaml` and the `featured` list in `src/pages/talks.mdx` statically, so it needs neither a build nor a server.

## Reviewed checks

- Events data: asserts every `featured` name resolves to exactly one event, caps the featured list at ten, and rejects duplicate event names, a talk video claimed by two events, and a CFP whose deadline falls after its own event starts. Prints total, upcoming, past, with-talk, with-video, featured counts and the topic distribution.

- HTTP status: asserts every requested route resolves successfully so a visually plausible error page cannot pass.
- Page and console errors: catches runtime failures that static build success cannot expose.
- Scripted reveal sweep: scrolls slowly through the full document and asserts every `[data-reveal]` reaches `data-revealed="1"` because observer-only reveal logic previously failed under fast scrolling.
- Canvas pixel sampling: scales the full canvas into a small sample and asserts every visible canvas has at least one non-transparent pixel because blank widgets survived visual review during evaluation; the header's deliberately hidden preview mount is excluded until a menu opens it.
- Page height ceiling: asserts the document remains below 40,000px to catch canvas ResizeObserver feedback loops while accommodating long-form articles. Overflow, contrast and structural checks remain independent gates.
- Page width ceiling: asserts pages do not exceed the selected viewport; wide tables must scroll inside their own container.
- Mobile checks: asserts the drawer accordions, JOIN access, Escape/focus/scroll-lock handling, 44px touch targets including the drawer's theme toggle (measured with the drawer open, because below 950px the desktop pill is hidden and the drawer copy is not laid out until it opens), stacked form/footer, responsive evidence/phase grids, non-sticky principles detail, capped hero canvas, and contained survey tabs.
- Homepage structure: asserts the three hero modes, principle layout, survey card/bars, and viewport-appropriate KAOS feature mount remain wired after refactors.
- KAOS mount bounds: asserts route and preview graph hosts stay between 220px and 500px, covering both the compact threshold and the prior infinite-height bug class.
- Text contrast delta: samples every visible text element's composited contrast ratio, records it in the dark run and fails the light run on invisible text or a ratio that lost more than 10% of its dark value.
- Deterministic full-page screenshots: disables animation and transition timing, scrolls once to activate lazy content, returns to the top, and masks canvases so refactor comparisons measure stable layout rather than animation frames.
- Hero typewriter: asserts sequential initial typing across all three fixed lines, cursor movement, pill-matched type, accent colour, 9-second headline phase lock, stable geometry, changing initial and rotation frames, the underline comparison crops, mobile containment, and a static reduced-motion state without a cursor.

## Style-ownership drift

`npm run check:ratchet` also runs `verify-styles-doc.mjs`, which holds `STYLES.md` to the code it describes. Three derived checks — the `tokens.css` line, rule and declaration counts, every file owning styles appearing in the ownership table, and every table row pointing at a file that still owns styles — plus a `styles-hash` marker over `tokens.css` and every style block.

The derived checks cannot be satisfied by a token edit: they either match reality or they do not. The hash is weaker by design; it only forces a deliberate look. After changing any style, read `STYLES.md`, correct anything now wrong, and run `npm run styles:sync` to restate the derived facts and re-bless the hash. A component and its extracted sibling sheet (`Hero.astro` + `Hero.css`) count as one owner.

## In CI

`.github/workflows/ci.yml` runs two of these gates. `motion` is a required check: it builds, serves `dist` on :4126 and runs `verify:motion:all`. `visual` rebuilds and photographs the PR's merge base and its head with `verify:shots:all` and compares them with `verify:parity`, so nothing is baselined and nothing can rot; `parity-summary.mjs` turns the two per-viewport reports into the PR comment and the verdict. Enforcement is by label — `dependencies` requires zero pixels, `visual-change` skips the job, anything else measures and reports without failing.

Both install Playwright at a version pinned in the workflow, Chromium only. `verify-parity` shells out to ImageMagick and now accepts either the ImageMagick 7 `magick` entry point or the ImageMagick 6 per-command binaries that Ubuntu packages.
