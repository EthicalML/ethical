// Every canvas must paint for the surface it actually sits on.
//
//   node scripts/verify/verify-canvas-surface.mjs [--base-url URL]
//
// `surfaceOf()` resolves a mount by walking up to the nearest `[data-surface]`.
// The syntactic checks in verify-check.mjs prove the attribute is spelled right
// and that the stylesheet keys off it; none of them proves the resolution is
// TRUE — that the surface a mount resolves to is the surface its backdrop
// actually is. That is the invariant the whole per-surface palette rests on,
// and nothing else can see it: the screenshot gate masks every canvas, and it
// only runs the dark theme, where both surfaces resolve identically and the
// question is unanswerable by construction.
//
// So: load each route in LIGHT, find each canvas, walk up for the first opaque
// background, and assert the resolved surface matches what is painted there.

import { readFileSync } from 'node:fs';
import playwright from './playwright.mjs';

const { chromium } = playwright;

const args = process.argv.slice(2);
const baseIndex = args.indexOf('--base-url');
const baseUrl =
  (baseIndex >= 0 ? args[baseIndex + 1] : undefined) ??
  process.env.VERIFY_BASE_URL ??
  'http://127.0.0.1:4126';
const routes = JSON.parse(readFileSync(new URL('./routes.json', import.meta.url), 'utf8'));

// Perceptual lightness of the composited backdrop. The two grounds are far
// apart (#f6f8f6 against #39433f), so the midpoint is not a tuned threshold.
const DARK_BELOW = 0.45;

const probe = () =>
  Array.from(document.querySelectorAll('canvas')).map((canvas) => {
    const host =
      canvas.closest('kaos-graph, kaos-architecture, kompute-cube, [data-surface]') ??
      canvas.parentElement;
    let node = host;
    let backdrop = 'transparent';
    while (node && backdrop === 'transparent') {
      const painted = getComputedStyle(node).backgroundColor;
      if (painted && painted !== 'rgba(0, 0, 0, 0)') backdrop = painted;
      node = node.parentElement;
    }
    const channels = (backdrop.match(/\d+/g) ?? ['255', '255', '255']).map(Number);
    const luminance = (channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722) / 255;
    return {
      host: host?.tagName?.toLowerCase() ?? 'unknown',
      resolved: host?.closest('[data-surface]')?.getAttribute('data-surface') ?? 'page',
      backdrop,
      luminance,
    };
  });

const run = async () => {
  const browser = await chromium.launch();
  const failures = [];
  let checked = 0;

  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    // Light is the only theme where the question has an answer: under dark the
    // page ground IS the inverted colour, so every mount looks correct either way.
    await page.addInitScript(() => {
      try {
        localStorage.setItem('theme', 'light');
      } catch {
        /* private mode */
      }
    });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(baseUrl + route, { waitUntil: 'domcontentloaded' });
    // Scroll-mounted canvases do not exist until they are reached.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 800) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
    });
    for (const mount of await page.evaluate(probe)) {
      checked += 1;
      const backdropIsDark = mount.luminance < DARK_BELOW;
      if ((mount.resolved === 'dark') !== backdropIsDark) {
        failures.push({ route, ...mount });
      }
    }
    await page.close();
  }

  await browser.close();

  if (!checked) {
    console.error(
      'canvas-surface: no canvases found — the probe measured nothing, which is not a pass',
    );
    process.exit(1);
  }

  if (failures.length) {
    console.error(
      `canvas-surface: ${failures.length} of ${checked} mounts paint for the wrong surface\n`,
    );
    for (const failure of failures) {
      console.error(
        `  ${failure.route} ${failure.host}: resolved "${failure.resolved}" but sits on ${failure.backdrop}`,
      );
    }
    console.error(
      '\nEither the mount needs its own data-surface, or the block it sits in needs the role.',
    );
    process.exit(1);
  }

  console.log(`canvas-surface: ok (${checked} mounts, every one matches its backdrop)`);
};

await run();
