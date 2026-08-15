// Motion gate: a client-side arrival must happen in a single motion.
//
//   node scripts/verify/verify-motion.mjs [--viewport WxH] [--theme dark|light]
//                                         [--case NAME ...] [--json FILE]
//
// Screenshots cannot see this class of bug. Navigating into a principle used to
// play its view transition 26px too low and snap up on completion (fixed in
// c38ef92): `.principle-prose` was both a `[data-reveal]` element and the named
// `principle-page` transition group, and the reveal settle was deferred by
// `requestAnimationFrame` — one frame later than the browser photographs
// `::view-transition-new`. The named group now wraps the complete principle body
// and `.principle-prose` remains the reveal target tracked inside it. The page was
// never in the wrong place; the snapshot was, so every full-page capture of the
// landed page was correct.
//
// What is observable is the trajectory. This gate performs a REAL click-driven
// navigation and samples, every animation frame for ~2s, the scroll offset and
// the bounding rect of the elements the transition is built from. The primer
// that leaks into the snapshot is a `translateY(26px)` on the real element, and
// `getBoundingClientRect` sees transforms — so the bad frame is measurable even
// though the pseudo-element is not.
//
// The invariant: after the swap, every tracked element's document-space
// position (scrollY + rect.top, which is immune to the router's own scroll) is
// already its final position. A trajectory that visits a position it later
// corrects away from by more than TOLERANCE_PX is two motions, not one. Stating
// it against the resting value rather than "the first plateau" is deliberate: a
// bad frame can be a single sample, too short to ever form a plateau of its own,
// and a plateau-relative rule would score it as the settle it corrects into.
//
// The tolerance absorbs sub-pixel settle and layout rounding only. It is not a
// place to hide a jump: 26px was the bug, 2px is the noise floor.

import { writeFile } from 'node:fs/promises';
import { chromium } from './playwright.mjs';
import { applyTheme, parseThemeArgs } from './theme.mjs';

// A correction larger than this is a visible second motion. Sub-pixel settle
// and layout rounding sit well under 1px.
const TOLERANCE_PX = 2;
// Sampling window after the click. The longest transition is 220ms; two seconds
// covers the swap, the transition and a long tail of late corrections.
const WINDOW_MS = 2000;
// Below this a run has not observed enough of the arrival to conclude anything,
// so it fails rather than passing on three frames.
const MIN_POST_SWAP_SAMPLES = 20;

// Every case is a real user gesture: land on `from`, click `click`, arrive at
// `to`. `targets` are the elements the transition is composed of — the named
// transition groups and the `[data-reveal]` elements inside them, which is the
// exact overlap the bug lived in.
const CASES = [
  {
    name: 'principles-index-to-principle',
    from: '/principles/',
    click: 'a[href="/principles/01/"]:visible',
    to: '/principles/01/',
    targets: ['.principle-prose'],
  },
  {
    name: 'principle-next',
    from: '/principles/01/',
    click: '.principle-pagination a[data-transition-direction="forward"]',
    to: '/principles/02/',
    targets: ['.principle-prose'],
  },
  {
    name: 'principle-prev',
    from: '/principles/02/',
    click: '.principle-pagination a[data-transition-direction="back"]',
    to: '/principles/01/',
    targets: ['.principle-prose'],
  },
  {
    name: 'newsletter-index-to-issue',
    from: '/newsletter/',
    click: 'a.latest-card',
    to: null,
    targets: ['.issue-meta', '.issue-article', '.issue-lede'],
  },
  {
    name: 'newsletter-next',
    from: '/newsletter/396/',
    click: '.issue-meta a[data-transition-direction="forward"]',
    to: '/newsletter/397/',
    targets: ['.issue-meta', '.issue-article', '.issue-lede'],
  },
  {
    name: 'newsletter-prev',
    from: '/newsletter/397/',
    click: '.issue-meta a[data-transition-direction="back"]',
    to: '/newsletter/396/',
    targets: ['.issue-meta', '.issue-article', '.issue-lede'],
  },
];

const { theme, rest: args } = parseThemeArgs(process.argv.slice(2));
let viewportValue = process.env.VERIFY_VIEWPORT ?? '1440x1000';
let jsonPath = null;
const selected = [];
for (let index = 0; index < args.length; index += 1) {
  if (args[index] === '--viewport') {
    viewportValue = args[index + 1];
    index += 1;
  } else if (args[index].startsWith('--viewport=')) {
    viewportValue = args[index].slice('--viewport='.length);
  } else if (args[index] === '--case') {
    selected.push(args[index + 1]);
    index += 1;
  } else if (args[index] === '--json') {
    jsonPath = args[index + 1];
    index += 1;
  } else {
    selected.push(args[index]);
  }
}
const [viewportWidth, requestedHeight] = viewportValue.toLowerCase().split('x').map(Number);
const viewportHeight = requestedHeight || (viewportWidth <= 950 ? 900 : 1000);
if (!Number.isFinite(viewportWidth) || !Number.isFinite(viewportHeight)) {
  throw new Error(`Invalid viewport "${viewportValue}"; use WIDTH or WIDTHxHEIGHT`);
}
const cases = selected.length ? CASES.filter((entry) => selected.includes(entry.name)) : CASES;
if (!cases.length) throw new Error(`No motion cases matched ${selected.join(', ')}`);

const baseUrl = process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:4126';

// Runs inside the page, straddling the navigation. The router swaps the
// document but never the realm, so this closure and its samples survive the
// swap and keep resolving selectors against whatever document is current.
const recorder = ({ targets, windowMs }) => {
  const state = { samples: [], swapped: false, swapAt: null, direction: null, native: null };
  window.__motion = state;
  state.native = typeof document.startViewTransition === 'function';
  // Registered after every application listener, so `swapped` can only be true
  // once the router and its `astro:after-swap` consumers have run. Anything the
  // page corrects after this point is a correction a viewer would see.
  document.addEventListener(
    'astro:after-swap',
    () => {
      state.swapped = true;
      state.swapAt = performance.now();
      state.direction = document.documentElement.dataset.astroTransition ?? null;
    },
    { once: true },
  );
  const started = performance.now();
  const tick = () => {
    const now = performance.now();
    const sample = {
      t: Math.round((now - started) * 100) / 100,
      swapped: state.swapped,
      scrollY: window.scrollY,
      path: location.pathname,
      tops: {},
    };
    for (const selector of targets) {
      const element = document.querySelector(selector);
      // Document-space position: the router's own scroll cancels out, so what
      // is left is only the element moving relative to the page.
      sample.tops[selector] = element ? window.scrollY + element.getBoundingClientRect().top : null;
    }
    state.samples.push(sample);
    if (now - started < windowMs) requestAnimationFrame(tick);
    else state.done = true;
  };
  requestAnimationFrame(tick);
};

/**
 * Largest position a trajectory visits and then corrects away from. The resting
 * value is the tail of the window, taken as the median of the last few samples
 * so one dropped frame cannot redefine "final".
 */
const settleReport = (values) => {
  const usable = values.filter((value) => Number.isFinite(value));
  if (usable.length < MIN_POST_SWAP_SAMPLES) return { samples: usable.length, final: null };
  const tail = usable.slice(-5).sort((a, b) => a - b);
  const final = tail[Math.floor(tail.length / 2)];
  let worst = 0;
  let worstIndex = -1;
  usable.forEach((value, index) => {
    const deviation = Math.abs(value - final);
    if (deviation > worst) {
      worst = deviation;
      worstIndex = index;
    }
  });
  return {
    samples: usable.length,
    final: Math.round(final * 100) / 100,
    maxCorrection: Math.round(worst * 100) / 100,
    atFrame: worstIndex,
  };
};

const browser = await chromium.launch({ headless: true });
// Motion is the subject: `reducedMotion: 'reduce'` would make Reveal mark
// everything revealed at construction and the gate would assert nothing.
const context = await browser.newContext({
  viewport: { width: viewportWidth, height: viewportHeight },
  deviceScaleFactor: 1,
  reducedMotion: 'no-preference',
  colorScheme: theme,
});
await applyTheme(context, theme);

const results = [];
for (const entry of cases) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });

  const problems = [];
  const response = await page.goto(new URL(entry.from, baseUrl).href, { waitUntil: 'networkidle' });
  if ((response?.status() ?? 0) >= 400)
    problems.push(`${entry.from} returned ${response?.status()}`);

  const link = page.locator(entry.click).first();
  await link.waitFor({ state: 'visible', timeout: 10000 });
  await link.scrollIntoViewIfNeeded();
  // Settle the scroll-triggered reveals the scroll just fired, so the recorded
  // window contains the navigation and nothing else.
  await page.waitForTimeout(1200);

  await page.evaluate(recorder, { targets: entry.targets, windowMs: WINDOW_MS });
  await link.click();
  await page.waitForFunction(() => window.__motion?.done === true, null, {
    timeout: WINDOW_MS + 15000,
  });
  const motion = await page.evaluate(() => window.__motion);

  const arrived = new URL(page.url()).pathname;
  if (!motion.swapped)
    problems.push('no astro:after-swap fired: the click did not navigate in-page');
  if (entry.to && arrived !== entry.to)
    problems.push(`arrived at ${arrived}, expected ${entry.to}`);
  if (!motion.direction)
    problems.push('no data-astro-transition on <html>: no view transition ran');

  const post = motion.samples.filter((sample) => sample.swapped);
  if (post.length < MIN_POST_SWAP_SAMPLES)
    problems.push(`only ${post.length} post-swap frames sampled (need ${MIN_POST_SWAP_SAMPLES})`);

  const trajectories = {};
  for (const selector of entry.targets) {
    const report = settleReport(post.map((sample) => sample.tops[selector]));
    trajectories[selector] = report;
    if (report.final === null) {
      problems.push(`${selector} resolved on only ${report.samples} post-swap frames`);
      continue;
    }
    if (report.maxCorrection > TOLERANCE_PX)
      problems.push(
        `${selector} settled twice: ${report.maxCorrection}px correction at post-swap frame ` +
          `${report.atFrame} (rested at ${report.final}px)`,
      );
  }
  const scroll = settleReport(post.map((sample) => sample.scrollY));
  trajectories.scrollY = scroll;
  if (scroll.final !== null && scroll.maxCorrection > TOLERANCE_PX)
    problems.push(
      `scroll settled twice: ${scroll.maxCorrection}px correction at post-swap frame ${scroll.atFrame}`,
    );

  if (errors.length) problems.push(...errors);

  results.push({
    case: entry.name,
    viewport: `${viewportWidth}x${viewportHeight}`,
    theme,
    from: entry.from,
    to: arrived,
    direction: motion.direction,
    nativeViewTransitions: motion.native,
    frames: motion.samples.length,
    postSwapFrames: post.length,
    trajectories,
    status: problems.length ? 'fail' : 'pass',
    problems,
  });
  await page.close();
}

await browser.close();

const failures = results.filter((entry) => entry.status !== 'pass');
const report = {
  passed: failures.length === 0,
  tolerancePx: TOLERANCE_PX,
  viewport: `${viewportWidth}x${viewportHeight}`,
  theme,
  cases: results.length,
  failures: failures.map((entry) => ({ case: entry.case, problems: entry.problems })),
  results,
};
if (jsonPath) await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.passed ? 0 : 1;
