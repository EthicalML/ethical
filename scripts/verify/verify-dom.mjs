import playwright from './playwright.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import {
  applyTheme,
  colorAlpha,
  DEFAULT_THEME,
  parseThemeArgs,
  readTokenColors,
  sameHue,
} from './theme.mjs';

const { chromium } = playwright;

// WCAG 2.x AA for body text.
const WCAG_BODY = 4.5;
const { theme, rest: args } = parseThemeArgs(process.argv.slice(2));
const routes = [];
let viewportValue = process.env.VERIFY_VIEWPORT ?? '1440x1000';
for (let index = 0; index < args.length; index += 1) {
  if (args[index] === '--viewport') {
    viewportValue = args[index + 1];
    index += 1;
  } else if (args[index].startsWith('--viewport=')) {
    viewportValue = args[index].slice('--viewport='.length);
  } else {
    routes.push(args[index]);
  }
}
const [viewportWidth, requestedHeight] = viewportValue.toLowerCase().split('x').map(Number);
const viewportHeight = requestedHeight || (viewportWidth <= 950 ? 900 : 1000);
if (!Number.isFinite(viewportWidth) || !Number.isFinite(viewportHeight)) {
  throw new Error(`Invalid viewport "${viewportValue}"; use WIDTH or WIDTHxHEIGHT`);
}
const viewport = { width: viewportWidth, height: viewportHeight };
const isMobile = viewport.width <= 950;
const baseUrl = process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:4126';
const notFoundArtifact = await readFile(
  new URL('../../dist/404.html', import.meta.url),
  'utf8',
).catch(() => '');

if (routes.length === 0) {
  routes.push(...JSON.parse(await readFile(new URL('./routes.json', import.meta.url), 'utf8')));
}

// Contrast ratios are recorded in dark and compared in light: absolute WCAG
// floors are unusable here because the correct dark site already produces 1.07
// and 1.52 on decorative text, so the only honest gate is the delta.
const contrastBaselineDir = new URL(`./out/contrast-baseline/${viewport.width}/`, import.meta.url);
const contrastBaselineFile = new URL('contrast.json', contrastBaselineDir);
const recordsContrastBaseline = theme === DEFAULT_THEME;
const contrastBaseline = recordsContrastBaseline
  ? {}
  : await readFile(contrastBaselineFile, 'utf8')
      .then(JSON.parse)
      .catch(() => null);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport,
  deviceScaleFactor: 1,
  colorScheme: theme,
});
await applyTheme(page, theme);
// The form check below submits for real, and a build made with FORM_ENDPOINT
// configured carries the live receiver in its bundle, so without this stub
// every gate run appends a Chrome Gate row to the production spreadsheet.
await page.route('https://script.google.com/**', (route) =>
  route.fulfill({ status: 200, body: '' }),
);
const results = [];

for (const route of routes) {
  const errors = [];
  const isNotFoundRoute = route === '/404.html';
  const onPageError = (error) => errors.push(`page: ${error.message}`);
  const onConsole = (message) => {
    const expectedNotFoundLog =
      isNotFoundRoute &&
      message.text() ===
        'Failed to load resource: the server responded with a status of 404 (Not Found)';
    if (message.type() === 'error' && !expectedNotFoundLog)
      errors.push(`console: ${message.text()}`);
  };
  page.on('pageerror', onPageError);
  page.on('console', onConsole);

  const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });

  let formChecks = null;
  let formContainment;
  const instituteForm = page.locator('[data-institute-form]');
  if (await instituteForm.count()) {
    formContainment = await instituteForm.evaluate((form) => {
      const card = form.closest('.network-split');
      const formBox = form.getBoundingClientRect();
      const cardBox = card.getBoundingClientRect();
      const within = (outer, inner) =>
        inner.left >= outer.left - 0.5 &&
        inner.right <= outer.right + 0.5 &&
        inner.top >= outer.top - 0.5 &&
        inner.bottom <= outer.bottom + 0.5;
      const visibleChildren = [
        ...form.querySelectorAll(
          '.form-fields, .form-fields input, fieldset, button, form > small',
        ),
      ].filter((element) => element.getClientRects().length && !element.closest('.form-honeypot'));
      return {
        formWithinCard: within(cardBox, formBox),
        childrenWithinForm: visibleChildren.every((element) =>
          within(formBox, element.getBoundingClientRect()),
        ),
        formWidth: formBox.width,
        cardWidth: cardBox.width,
      };
    });
    const applicationInterest = instituteForm.locator('[data-application-interest]');
    let applicationHelper = null;
    if (await applicationInterest.count()) {
      const helper = instituteForm.locator('[data-application-helper]');
      const initiallyHidden = await helper.evaluate((element) => element.hidden);
      await applicationInterest.check();
      applicationHelper = {
        initiallyHidden,
        visibleAfterCheck: await helper.isVisible(),
        text: await helper.textContent(),
      };
    }
    await instituteForm.locator('[name="name"]').fill('Chrome Gate');
    await instituteForm.locator('[name="email"]').fill('chrome-gate@example.com');
    await instituteForm.locator('[type="submit"]').click();
    await instituteForm.locator('[data-form-confirmation]').waitFor({ state: 'visible' });
    formChecks = await instituteForm.evaluate((form, applicationHelper) => {
      const honeypot = form.querySelector('.form-honeypot');
      const honeypotStyle = getComputedStyle(honeypot);
      return {
        variant: form.dataset.variant,
        state: form.dataset.state,
        confirmation: form.querySelector('[data-form-confirmation]').textContent,
        expectedConfirmation: form.dataset.confirmation,
        expectedDemoConfirmation: form.dataset.demoConfirmation,
        startedAt: form.querySelector('[name="startedAt"]').value,
        applicationHelper,
        honeypot: {
          height: honeypotStyle.height,
          left: honeypotStyle.left,
          position: honeypotStyle.position,
          width: honeypotStyle.width,
        },
      };
    }, applicationHelper);
    formChecks.containment = formContainment;
  }

  let homepageInteractions = null;
  if (route === '/') {
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.evaluate(() => {
      const originalClearRect = CanvasRenderingContext2D.prototype.clearRect;
      window.__heroCyclePaints = 0;
      CanvasRenderingContext2D.prototype.clearRect = function (...parameters) {
        if (this.canvas.closest('hero-cycle')) window.__heroCyclePaints += 1;
        return originalClearRect.apply(this, parameters);
      };
    });
    await page.waitForTimeout(300);
    const visibleStart = await page.evaluate(() => window.__heroCyclePaints);
    await page.waitForTimeout(400);
    const visibleEnd = await page.evaluate(() => window.__heroCyclePaints);
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(300);
    const offscreenEnd = await page.evaluate(() => window.__heroCyclePaints);
    // Hiding the tab while the canvas is already paused offscreen must not start
    // a second loop: the two pause causes share one frame handle, so whichever
    // resumes has to cancel the in-flight frame before requesting another.
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await page.waitForTimeout(250);
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: false });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await page.waitForTimeout(250);
    const hiddenEnd = await page.evaluate(() => window.__heroCyclePaints);
    await page.evaluate(() => scrollTo(0, 0));
    const resumedStart = await page.evaluate(() => window.__heroCyclePaints);
    await page.waitForTimeout(400);
    const resumedEnd = await page.evaluate(() => window.__heroCyclePaints);
    homepageInteractions = await page.evaluate(async () => {
      const section = document.querySelector('#principles');
      const detail = document.querySelector('.principle-detail-wrap');
      section.style.transition = 'none';
      section.style.transform = 'none';
      detail.querySelectorAll('.principle-detail').forEach((card) => {
        card.style.animation = 'none';
      });
      const sectionTop = section.getBoundingClientRect().top + scrollY;
      scrollTo(0, sectionTop + 80);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const firstTop = detail.getBoundingClientRect().top;
      scrollTo(0, sectionTop + 160);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const secondTop = detail.getBoundingClientRect().top;
      scrollTo(0, 0);
      return {
        principleStickyPosition: getComputedStyle(detail).position,
        principleStickyTop: getComputedStyle(detail).top,
        principleViewportTops: [firstTop, secondTop],
        principleLinks: [...document.querySelectorAll('.principle-detail')].map((card) => ({
          count: card.querySelectorAll('.principle-links a').length,
          readHref: card.querySelector('.principle-links a:last-child')?.getAttribute('href'),
        })),
        formWash: getComputedStyle(document.querySelector('#join form')).backgroundImage,
      };
    });
    homepageInteractions.heroCyclePlayback = {
      visibleFrames: visibleEnd - visibleStart,
      offscreenFrames: offscreenEnd - visibleEnd,
      hiddenFrames: hiddenEnd - offscreenEnd,
      resumedFrames: resumedEnd - resumedStart,
    };
    const xaiPreview = page.locator('.xai-preview');
    const firstXaiFrame = await xaiPreview.screenshot();
    await page.waitForTimeout(350);
    const secondXaiFrame = await xaiPreview.screenshot();
    homepageInteractions.xaiFramesChanged = !firstXaiFrame.equals(secondXaiFrame);

    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(300);
    if (isMobile) {
      await page.evaluate(() => scrollTo(0, 2000));
      await page.waitForTimeout(200);
      const lockedScroll = await page.evaluate(() => scrollY);
      await page.locator('[data-mobile-menu-open]').click();
      await page.waitForTimeout(400);
      homepageInteractions.mobileDrawerScrolled = await page.evaluate((expectedScroll) => {
        const drawer = document.querySelector('[data-mobile-menu]');
        const shell = document.querySelector('.header-sticky');
        const toggle = document.querySelector('[data-mobile-menu-open]');
        const siteHeader = drawer.closest('site-header');
        const toggleBox = toggle.getBoundingClientRect();
        const barBottom = shell.querySelector('.header-row').getBoundingClientRect().bottom;
        return {
          expectedScroll,
          ariaHidden: drawer.getAttribute('aria-hidden'),
          bodyPosition: getComputedStyle(document.body).position,
          bodyTop: document.body.style.top,
          drawerTop: drawer.getBoundingClientRect().top,
          drawerZIndex: getComputedStyle(drawer).zIndex,
          // The pinned shell is lifted over the drawer on purpose: the toggle that closes the
          // drawer lives in the header row, so the row has to stay hittable above it.
          headerZIndex: getComputedStyle(shell).zIndex,
          parent: drawer.closest('mobile-drawer').parentElement.localName,
          persist: siteHeader?.getAttribute('data-astro-transition-persist'),
          // Two halves of one promise: the drawer covers the viewport under the header bar,
          // and the control that closes it is the thing you hit at the top of the screen.
          drawerCoversBelowBar: Boolean(
            document
              .elementFromPoint(innerWidth / 2, barBottom + 20)
              ?.closest('[data-mobile-menu]'),
          ),
          toggleHittable:
            document
              .elementFromPoint(
                toggleBox.left + toggleBox.width / 2,
                toggleBox.top + toggleBox.height / 2,
              )
              ?.closest('[data-mobile-menu-open]') === toggle,
          scrollLocked: document.body.classList.contains('mobile-nav-open'),
        };
      }, lockedScroll);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(100);
      homepageInteractions.mobileDrawerScrolled.closed = await page.evaluate(() => ({
        bodyTop: document.body.style.top,
        scrollY,
        scrollUnlocked: !document.body.classList.contains('mobile-nav-open'),
      }));
      await page.locator('[data-mobile-menu-open]').click();
      // Must cross the 1040px nav-collapse breakpoint (see SiteHeader.astro) for the
      // drawer's desktop auto-close to fire; 1000 stopped being "desktop" when the
      // breakpoint moved and left this gate red with a phantom drawer bug.
      await page.setViewportSize({ width: 1100, height: viewport.height });
      await page.waitForTimeout(100);
      homepageInteractions.mobileDrawerScrolled.desktopResize = await page.evaluate(() => ({
        ariaHidden: document.querySelector('[data-mobile-menu]').getAttribute('aria-hidden'),
        bodyTop: document.body.style.top,
        scrollUnlocked: !document.body.classList.contains('mobile-nav-open'),
      }));
      await page.setViewportSize(viewport);
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.locator('[data-mobile-menu-open]').click();
      await page.waitForTimeout(400);
      await page.locator('[data-mobile-accordion]').first().click();
      homepageInteractions.mobileNav = await page.evaluate(() => {
        const drawer = document.querySelector('[data-mobile-menu]');
        const targets = [...drawer.querySelectorAll('a, button')].filter((element) => {
          const style = getComputedStyle(element);
          return (
            element.getClientRects().length &&
            style.display !== 'none' &&
            style.visibility !== 'hidden'
          );
        });
        return {
          accordionCount: drawer.querySelectorAll('[data-mobile-accordion]').length,
          drawerOpen: drawer.getAttribute('aria-hidden') === 'false',
          firstPanelOpen: !drawer.querySelector('.mobile-submenu').hidden,
          // The join CTA left the drawer for the header row when the toggle became the
          // only drawer control; the 44px touch-target promise is asserted where the
          // pill actually lives now.
          joinVisible:
            document.querySelector('.header-row .join-pill').getBoundingClientRect().height >= 44,
          /* The theme control is measured here, with the drawer open, rather than
             in the page-level touch-target sweep: below 950px the desktop pill is
             `display: none` and the drawer copy is inside a closed, hidden drawer,
             so a page-level selector would match nothing and assert nothing. This
             is where the control is actually reachable by a thumb. */
          themeToggle: (() => {
            const box = drawer.querySelector('[data-theme-toggle]')?.getBoundingClientRect() ?? {
              width: 0,
              height: 0,
            };
            return { width: box.width, height: box.height };
          })(),
          minTargetHeight: Math.min(
            ...targets.map((element) => element.getBoundingClientRect().height),
          ),
          scrollLocked: document.body.classList.contains('mobile-nav-open'),
        };
      });
      await page.keyboard.press('Escape');
      Object.assign(
        homepageInteractions.mobileNav,
        await page.evaluate(() => ({
          drawerClosed:
            document.querySelector('[data-mobile-menu]').getAttribute('aria-hidden') === 'true',
          focusReturned: document.activeElement.matches('[data-mobile-menu-open]'),
          scrollUnlocked: !document.body.classList.contains('mobile-nav-open'),
        })),
      );
    } else {
      await page.locator('[data-menu-trigger="oss"]').hover();
      await page.waitForTimeout(400);
      homepageInteractions.ossPreviewStates = [];
      for (const row of await page.locator('[data-oss-index]').all()) {
        await row.hover();
        await page.waitForTimeout(100);
        homepageInteractions.ossPreviewStates.push(
          await page.locator('.oss-menu-preview').evaluate((preview) => {
            const canvases = [...preview.querySelectorAll('canvas')];
            const canvas = canvases[0];
            const context = canvas.getContext('2d');
            const startY = Math.floor(canvas.height * 0.78);
            const pixels = context.getImageData(
              0,
              startY,
              canvas.width,
              canvas.height - startY,
            ).data;
            let bottomOpaquePixels = 0;
            for (let index = 3; index < pixels.length; index += 4) {
              if (pixels[index] > 0) bottomOpaquePixels += 1;
            }
            return {
              canvasCount: canvases.length,
              mode: canvas.closest('nav-preview')?.getAttribute('mode'),
              bottomOpaquePixels,
            };
          }),
        );
      }
      await page.keyboard.press('Escape');

      await page.locator('[data-menu-trigger="policy"]').hover();
      await page.waitForTimeout(400);
      homepageInteractions.policyGeometry = await page
        .locator('[data-menu-body="policy"]')
        .evaluate((body) => {
          const list = body.querySelector('.oss-menu-list.standalone');
          const metrics = (element) => {
            const box = element.getBoundingClientRect();
            return {
              box: [box.left, box.right, box.width, box.height],
              client: [element.clientWidth, element.clientHeight],
              scroll: [element.scrollWidth, element.scrollHeight],
            };
          };
          return {
            body: metrics(body),
            list: metrics(list),
            links: body.querySelectorAll('a').length,
          };
        });
      await page.keyboard.press('Escape');

      await page.locator('[data-menu-trigger="initiatives"]').hover();
      await page.waitForTimeout(400);
      homepageInteractions.initiativesGeometry = await page
        .locator('[data-menu-body="initiatives"]')
        .evaluate((body) => {
          const menu = body.querySelector('.initiative-menu');
          const rail = body.querySelector('.group-rail');
          const panes = body.querySelector('.initiative-panes');
          const metrics = (element) => {
            const box = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return {
              box: [box.left, box.right, box.width, box.height],
              client: [element.clientWidth, element.clientHeight],
              scroll: [element.scrollWidth, element.scrollHeight],
              padding: [
                style.paddingTop,
                style.paddingRight,
                style.paddingBottom,
                style.paddingLeft,
              ],
            };
          };
          return {
            body: metrics(body),
            menu: metrics(menu),
            rail: metrics(rail),
            panes: metrics(panes),
          };
        });
      await page.keyboard.press('Escape');
    }
  }

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let top = 0; top < height; top += 500) {
    await page.evaluate((nextTop) => scrollTo(0, nextTop), top);
    await page.waitForTimeout(70);
  }
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);

  const checks = await page.evaluate(async () => {
    await document.fonts.ready;
    const sampleCanvas = (canvas) => {
      if (canvas.width < 2 || canvas.height < 2) return false;
      const sample = document.createElement('canvas');
      sample.width = 96;
      sample.height = 64;
      const context = sample.getContext('2d');
      context.drawImage(canvas, 0, 0, sample.width, sample.height);
      const pixels = context.getImageData(0, 0, sample.width, sample.height).data;
      for (let index = 3; index < pixels.length; index += 4) {
        if (pixels[index] > 0) return true;
      }
      return false;
    };
    const canvases = [...document.querySelectorAll('canvas')].filter(
      (canvas) => canvas.clientWidth >= 2 && canvas.clientHeight >= 2,
    );
    // Text-contrast sampling. Composites each element's colour over the first
    // opaque ancestor background and reports the WCAG ratio, keyed by a
    // structural path so the key survives content edits.
    const parseColor = (value) => {
      const parts = String(value)
        .match(/[\d.]+/g)
        ?.map(Number) ?? [0, 0, 0, 0];
      return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
    };
    // Porter-Duff source-over, alpha included. Returning a hardcoded `a: 1`
    // makes two stacked translucent layers look opaque, which stops the
    // ancestor walk early and reports a background the page never paints.
    const sourceOver = (top, under) => {
      const alpha = top.a + under.a * (1 - top.a);
      if (alpha === 0) return { r: 0, g: 0, b: 0, a: 0 };
      const blend = (topChannel, underChannel) =>
        (topChannel * top.a + underChannel * under.a * (1 - top.a)) / alpha;
      return {
        r: blend(top.r, under.r),
        g: blend(top.g, under.g),
        b: blend(top.b, under.b),
        a: alpha,
      };
    };
    const channelLuminance = (value) => {
      const scaled = value / 255;
      return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
    };
    const luminance = (color) =>
      0.2126 * channelLuminance(color.r) +
      0.7152 * channelLuminance(color.g) +
      0.0722 * channelLuminance(color.b);
    const contrastRatio = (a, b) => {
      const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
      return (high + 0.05) / (low + 0.05);
    };
    const canvasBackdrop = { r: 255, g: 255, b: 255, a: 1 };
    const effectiveBackground = (element) => {
      let current = element;
      let stack = null;
      while (current) {
        const layer = parseColor(getComputedStyle(current).backgroundColor);
        if (layer.a > 0) {
          stack = stack ? sourceOver(stack, layer) : layer;
          if (stack.a >= 1) return stack;
        }
        current = current.parentElement;
      }
      return stack ? sourceOver(stack, canvasBackdrop) : canvasBackdrop;
    };
    const structuralKey = (element) => {
      const steps = [];
      let current = element;
      while (current && current !== document.body && steps.length < 6) {
        const tag = current.tagName.toLowerCase();
        const classes = String(current.className || '')
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 3)
          .join('.');
        const index =
          [...(current.parentElement?.children ?? [])]
            .filter((sibling) => sibling.tagName === current.tagName)
            .indexOf(current) + 1;
        steps.unshift(`${tag}${classes ? `.${classes}` : ''}:${index}`);
        current = current.parentElement;
      }
      return steps.join('>');
    };
    const textContrast = [];
    const contrastSeen = new Set();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.nodeValue.trim()) continue;
      const element = node.parentElement;
      if (!element || contrastSeen.has(element)) continue;
      contrastSeen.add(element);
      const style = getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      if (Number(style.opacity) === 0 || !element.getClientRects().length) continue;
      const background = effectiveBackground(element);
      const foreground = sourceOver(parseColor(style.color), background);
      textContrast.push({
        key: structuralKey(element),
        ratio: Number(contrastRatio(foreground, background).toFixed(3)),
      });
    }
    const unrevealed = [...document.querySelectorAll('[data-reveal]')]
      .filter((node) => node.dataset.revealed !== '1')
      .map((node) => `${node.tagName.toLowerCase()}#${node.id}.${node.className}`);
    const touchTargets = [
      ...document.querySelectorAll(
        /* `[data-theme-toggle]` matches two controls. Below 950px — the same
           breakpoint `isMobile` uses — the desktop pill is `display: none` and the
           drawer copy is hidden inside the closed drawer, so this sweep passes over
           both; it is a guard that the 52x25 desktop pill never becomes reachable
           on mobile, not the primary assertion. The reachable control is measured
           with the drawer open in `mobileNav.themeToggle`. */
        '.header-row > .wordmark, [data-mobile-menu-open], [data-theme-toggle], .header-row .join-pill, main button, main .button, .cta-block a, .principle-pagination a, form button',
      ),
    ].filter((element) => {
      const style = getComputedStyle(element);
      return (
        element.getClientRects().length && style.display !== 'none' && style.visibility !== 'hidden'
      );
    });
    const columns = (selector) => {
      const element = document.querySelector(selector);
      return element ? getComputedStyle(element).gridTemplateColumns.split(' ').length : 0;
    };
    const touchTarget = (element) => {
      const box = element.getBoundingClientRect();
      const after = getComputedStyle(element, '::after');
      const expansion = (side) =>
        after.content !== 'none' && after.position === 'absolute'
          ? Math.max(0, -(Number.parseFloat(after[side]) || 0))
          : 0;
      return {
        label:
          element.getAttribute('aria-label') ||
          element.textContent.trim().replace(/\s+/g, ' ') ||
          element.className,
        width: box.width + expansion('left') + expansion('right'),
        height: box.height + expansion('top') + expansion('bottom'),
      };
    };

    return {
      pageHeight: document.documentElement.scrollHeight,
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      unrevealed,
      textContrast,
      fonts: {
        newsreader: document.fonts.check('16px "Newsreader"'),
        geist: document.fonts.check('16px "Geist"'),
        geistMono: document.fonts.check('16px "Geist Mono"'),
        googleRequests: performance
          .getEntriesByType('resource')
          .filter((entry) => entry.name.includes('fonts.googleapis.com')),
      },
      canvases: canvases.map((canvas) => ({
        widget:
          canvas.closest('hero-cycle, kompute-cube, nav-preview, kaos-graph')?.localName ??
          'unlabelled',
        size: `${canvas.clientWidth}x${canvas.clientHeight}/${canvas.width}x${canvas.height}`,
        nonBlank: sampleCanvas(canvas),
      })),
      tableContainers: [...document.querySelectorAll('.table-wrap')].map((container) => {
        const box = container.getBoundingClientRect();
        return {
          bounds: [box.left, box.right],
          clientWidth: container.clientWidth,
          scrollWidth: container.scrollWidth,
          overflowX: getComputedStyle(container).overflowX,
        };
      }),
      touchTargets: touchTargets.map(touchTarget),
      // A label on its own line inside an MDX anchor compiles to a paragraph
      // inside it, which turns a button into a full-width block with the label
      // adrift. Prettier reflows single-line anchors, so the convention alone
      // cannot hold this: it has to be checked in the output.
      blockInsideButton: Array.from(document.querySelectorAll('a.button, button.button'))
        .filter((element) => element.querySelector('p, div'))
        .map((element) => element.textContent.trim().slice(0, 40)),
      homepage:
        location.pathname === '/'
          ? {
              heroSwitchers: document.querySelectorAll('[data-hero-mode]').length,
              surveyCard: Boolean(document.querySelector('#reports [data-survey-card]')),
              surveyBars: document.querySelectorAll('#reports .survey-bars button').length,
              principleListWithinHalfViewport:
                (document
                  .querySelector('.principles-explorer-grid')
                  ?.firstElementChild?.getBoundingClientRect().width ?? 9999) <=
                innerWidth * 0.5,
              kaosMountHeight:
                document.querySelector('.kaos-feature .kaos-canvas-mount')?.getBoundingClientRect()
                  .height ?? 0,
              heroCanvasHeight:
                document.querySelector('.hero .hero-canvas')?.getBoundingClientRect().height ?? 0,
              statColumns: columns('.stat-band'),
              phaseColumns: columns('.phase-grid'),
              formColumns: columns('.network-split'),
              footnoteColumns: columns('.footnote-band'),
              surveyTabs: {
                flexWrap: getComputedStyle(document.querySelector('.survey-tabs')).flexWrap,
                overflowX: getComputedStyle(document.querySelector('.survey-tabs')).overflowX,
              },
              homeSections: [...document.querySelectorAll('main > .home-section')].map(
                (section) => {
                  const style = getComputedStyle(section);
                  return {
                    id: section.id,
                    borderTopWidth: style.borderTopWidth,
                    paddingTop: style.paddingTop,
                  };
                },
              ),
              /* Was `.footnote-band .standards a`, which has never matched anything
                 in the built site — `.some()` over an empty list is always false, so
                 the tier it meant to guard was unasserted. The mono tier that exists
                 in the band is the legal privacy link (the all-talks link was retired
                 with the publications list, 2026-08-12); the count is asserted so a
                 rename cannot make this vacuous again. */
              footnoteStandards: [
                ...document.querySelectorAll('.footnote-band .footnote-legal a'),
              ].map((link) => {
                const style = getComputedStyle(link);
                return {
                  color: style.color,
                  fontFamily: style.fontFamily,
                  fontSize: style.fontSize,
                };
              }),
              initiativeCards: [
                ...document.querySelectorAll('#reports .oss-carousel-track > article.oss-card'),
              ]
                .filter((card) =>
                  ['ML Maturity Model', 'Agentic & ML Security'].includes(
                    card.querySelector(':scope > h3')?.textContent,
                  ),
                )
                .map((card) => ({
                  eyebrow: card.querySelector(':scope > .eyebrow')?.textContent,
                  heading: card.querySelector(':scope > h3')?.textContent,
                  buttons: [...card.querySelectorAll('.actions .button')].map((button) => ({
                    label: button.textContent,
                    href: button.getAttribute('href'),
                    primary: button.classList.contains('primary'),
                  })),
                  inlineLinks: [...card.querySelectorAll(':scope > p .text-link')].map((link) => {
                    const style = getComputedStyle(link);
                    return {
                      color: style.color,
                      decoration: style.textDecorationLine,
                      href: link.getAttribute('href'),
                      label: link.textContent,
                    };
                  }),
                })),
            }
          : null,
      kaosMounts: [...document.querySelectorAll('main kaos-graph')].map(
        (host) => host.getBoundingClientRect().height,
      ),
    };
  });
  if (checks.homepage) Object.assign(checks.homepage, homepageInteractions);

  // Colour assertions name the token they mean and resolve it from the page, so
  // they describe intent ("this is the accent ink") in either theme rather than
  // one theme's literal.
  const tokens = await readTokenColors(page, [
    '--text-1',
    '--accent',
    '--accent-ink',
    '--bg-inset',
  ]);
  const accentInk = tokens['--accent-ink'] ?? tokens['--accent'];

  // Lowest ratio per structural key; several elements can share a key and the
  // worst of them is the one worth gating on.
  const contrastByKey = {};
  for (const { key, ratio } of checks.textContrast) {
    contrastByKey[key] = Math.min(contrastByKey[key] ?? Infinity, ratio);
  }
  let contrastReport = null;
  if (recordsContrastBaseline) {
    contrastBaseline[route] = contrastByKey;
  } else if (!contrastBaseline?.[route]) {
    contrastReport = { compared: 0, missingBaseline: true, regressions: [], invisible: [] };
  } else {
    const reference = contrastBaseline[route];
    const regressions = [];
    const invisible = [];
    for (const [key, ratio] of Object.entries(contrastByKey)) {
      const darkRatio = reference[key];
      if (darkRatio === undefined) continue;
      if (ratio < 1.15 && darkRatio >= 1.15) invisible.push({ key, ratio, darkRatio });
      /* The 0.9x rule catches text that got harder to read, but it cannot be the
         whole gate: an accent that is 11.7:1 on near-black cannot also be 10.5:1
         on paper without ceasing to be the accent, and the drop to 5.5:1 is the
         design, not a regression. Absolute WCAG floors are unusable as a failure
         threshold here (correct dark decorative text sits at 1.07), but they are
         sound as a *pass* threshold: a node that clears the 4.5:1 body gate in
         light is readable by definition, whatever it scored in dark. */
      else if (ratio < WCAG_BODY && ratio < darkRatio * 0.9)
        regressions.push({ key, ratio, darkRatio });
    }
    const worstFirst = (list) =>
      list.sort((a, b) => a.ratio / a.darkRatio - b.ratio / b.darkRatio).slice(0, 10);
    contrastReport = {
      compared: Object.keys(contrastByKey).filter((key) => key in reference).length,
      missingBaseline: false,
      invisibleCount: invisible.length,
      regressionCount: regressions.length,
      invisible: worstFirst(invisible),
      regressions: worstFirst(regressions),
    };
  }

  const failures = [];
  if (contrastReport?.missingBaseline) {
    failures.push(`no dark contrast baseline for ${route}; run the dark gate first`);
  }
  if (contrastReport?.invisibleCount) {
    failures.push(
      `${contrastReport.invisibleCount} element(s) dropped below a 1.15 contrast ratio that were legible in dark`,
    );
  }
  if (contrastReport?.regressionCount) {
    failures.push(
      `${contrastReport.regressionCount} element(s) lost more than 10% of their dark contrast ratio`,
    );
  }
  const validStatus = isNotFoundRoute
    ? response && [200, 404].includes(response.status())
    : response?.status() === 200;
  if (!validStatus) failures.push(`HTTP ${response?.status() ?? 'no response'}`);
  if (
    isNotFoundRoute &&
    (!notFoundArtifact.includes('>That route does not exist</h1>') ||
      !notFoundArtifact.includes('404 / NOT FOUND') ||
      !notFoundArtifact.includes('href="/"'))
  )
    failures.push('built 404 artifact is missing its expected content or home link');
  if (errors.length > 0) failures.push(`${errors.length} page/console error(s)`);
  if (checks.blockInsideButton.length > 0)
    failures.push(
      `button(s) wrapping a block element: ${checks.blockInsideButton.join(', ')} — use {'Label'} so the label cannot become a paragraph`,
    );
  if (checks.unrevealed.length > 0)
    failures.push(`${checks.unrevealed.length} reveal target(s) did not fire`);
  if (checks.pageHeight >= 40000)
    failures.push(`page height ${checks.pageHeight}px exceeds 40000px`);
  if (checks.pageWidth > checks.viewportWidth) {
    failures.push(
      `page width ${checks.pageWidth}px exceeds the ${checks.viewportWidth}px viewport`,
    );
  }
  if (
    !checks.fonts.newsreader ||
    !checks.fonts.geist ||
    !checks.fonts.geistMono ||
    checks.fonts.googleRequests.length > 0
  ) {
    failures.push('self-hosted fonts are missing or Google Fonts was requested');
  }
  if (checks.canvases.some((canvas) => !canvas.nonBlank))
    failures.push('one or more canvases are blank');
  if (checks.kaosMounts.some((height) => height < 220 || height > 500))
    failures.push('KAOS mount height is outside 220–500px');
  if (
    formChecks &&
    (formChecks.state !== 'success' ||
      ![formChecks.expectedConfirmation, formChecks.expectedDemoConfirmation].includes(
        formChecks.confirmation,
      ) ||
      !/^\d{13}$/.test(formChecks.startedAt) ||
      !formChecks.applicationHelper?.initiallyHidden ||
      !formChecks.applicationHelper?.visibleAfterCheck ||
      formChecks.applicationHelper?.text !==
        'Please provide enough information to consider your application.' ||
      formChecks.honeypot.height !== '1px' ||
      formChecks.honeypot.left !== '-10000px' ||
      formChecks.honeypot.position !== 'absolute' ||
      formChecks.honeypot.width !== '1px' ||
      !formChecks.containment?.formWithinCard ||
      !formChecks.containment?.childrenWithinForm)
  )
    failures.push('form success state, anti-spam fields, or card containment is incomplete');
  const undersizedTouchTarget = isMobile
    ? checks.touchTargets.find(({ width, height }) => width < 43.5 || height < 43.5)
    : null;
  if (undersizedTouchTarget) {
    failures.push(
      `touch target "${undersizedTouchTarget.label}" is ${undersizedTouchTarget.width}x${undersizedTouchTarget.height}px; expected at least 44x44px`,
    );
  }
  if (
    checks.tableContainers.some(
      ({ bounds, overflowX }) =>
        bounds[0] < -0.5 ||
        bounds[1] > checks.viewportWidth + 0.5 ||
        !['auto', 'scroll'].includes(overflowX),
    )
  )
    failures.push('one or more tables do not scroll inside their container');

  if (checks.homepage) {
    if (checks.homepage.heroSwitchers !== 3)
      failures.push('homepage does not expose three hero modes');
    if (!checks.homepage.surveyCard || checks.homepage.surveyBars < 5)
      failures.push('homepage survey explorer is incomplete');
    if (
      checks.homepage.principleLinks.some(
        ({ count, readHref }, index) =>
          count < 2 || readHref !== `/principles/${String(index + 1).padStart(2, '0')}/`,
      )
    )
      failures.push('homepage principle pills or Read principle targets are incomplete');
    if (!checks.homepage.xaiFramesChanged)
      failures.push('homepage XAI scan pixels do not change over time');
    const heroPlayback = checks.homepage.heroCyclePlayback;
    if (
      !heroPlayback ||
      heroPlayback.visibleFrames < 10 ||
      heroPlayback.offscreenFrames > 1 ||
      heroPlayback.hiddenFrames !== 0 ||
      heroPlayback.resumedFrames < 10 ||
      heroPlayback.resumedFrames > heroPlayback.visibleFrames * 1.5 + 2
    )
      failures.push('homepage hero cycle does not pause or resume correctly');
    const expectedHomeSections = isMobile
      ? [
          ['strategy', '0px', '96px'],
          ['principles', '0px', '96px'],
          ['', '0px', '96px'],
          ['opensource', '0px', '32px'],
          ['join', '0px', '96px'],
        ]
      : [
          ['strategy', '0px', '120px'],
          ['principles', '0px', '120px'],
          ['', '0px', '120px'],
          ['opensource', '0px', '120px'],
          ['join', '0px', '120px'],
        ];
    if (
      checks.homepage.homeSections.length !== 5 ||
      checks.homepage.homeSections.some(
        ({ id, borderTopWidth, paddingTop }, index) =>
          [id, borderTopWidth, paddingTop].join() !== expectedHomeSections[index].join(),
      )
    )
      failures.push('homepage major-section divider or spacing rhythm is inconsistent');
    if (
      checks.homepage.footnoteStandards.length !== 1 ||
      checks.homepage.footnoteStandards.some(
        ({ color, fontFamily, fontSize }) =>
          !sameHue(color, tokens['--text-1']) ||
          colorAlpha(color) >= 1 ||
          !fontFamily.includes('Geist Mono') ||
          fontSize !== '13px',
      )
    )
      failures.push('homepage footnote mono link tier has regressed');
    if (
      checks.homepage.initiativeCards[0]?.eyebrow !== 'Governance' ||
      checks.homepage.initiativeCards[0]?.heading !== 'ML Maturity Model' ||
      checks.homepage.initiativeCards[0]?.buttons.length !== 2 ||
      checks.homepage.initiativeCards[0]?.buttons[0]?.label !== 'AI-RFX Procurement Framework' ||
      checks.homepage.initiativeCards[0]?.buttons[0]?.href !== '/frameworks/ai-rfx/' ||
      !checks.homepage.initiativeCards[0]?.buttons[0]?.primary ||
      checks.homepage.initiativeCards[0]?.buttons[1]?.label !== 'ML Maturity Model' ||
      checks.homepage.initiativeCards[0]?.buttons[1]?.href !== '/frameworks/maturity-model/' ||
      checks.homepage.initiativeCards[0]?.buttons[1]?.primary ||
      checks.homepage.initiativeCards[1]?.eyebrow !== 'Security' ||
      checks.homepage.initiativeCards[1]?.heading !== 'Agentic & ML Security' ||
      checks.homepage.initiativeCards[1]?.buttons.length !== 1 ||
      checks.homepage.initiativeCards[1]?.buttons[0]?.label !== 'Agentic & ML Security' ||
      checks.homepage.initiativeCards[1]?.buttons[0]?.href !== '/frameworks/security/' ||
      !checks.homepage.initiativeCards[1]?.buttons[0]?.primary ||
      checks.homepage.initiativeCards[1]?.inlineLinks.length !== 1 ||
      checks.homepage.initiativeCards[1]?.inlineLinks.some(
        ({ color, decoration, href, label }) =>
          color !== accentInk ||
          decoration !== 'underline' ||
          href !== '/frameworks/security/' ||
          label !== 'the Agentic & ML Security framework',
      )
    )
      failures.push('homepage governance/security card structure is incomplete');
    // Semantically: an accent wash of the same geometry fading into the inset
    // surface. The literals move with the theme; the relationship does not.
    const wash =
      /^radial-gradient\(70% 90% at 70% 0%, (rgba?\([^)]*\)), (rgba?\([^)]*\)) 72%\)$/.exec(
        checks.homepage.formWash,
      );
    if (
      !wash ||
      !sameHue(wash[1], tokens['--accent']) ||
      colorAlpha(wash[1]) >= 1 ||
      wash[2] !== tokens['--bg-inset']
    ) {
      failures.push('homepage form wash differs from the prototype');
    }
    if (isMobile) {
      const expectedStatColumns = viewport.width <= 600 ? 2 : 3;
      const expectedPhaseColumns = viewport.width <= 600 ? 1 : 2;
      const nav = checks.homepage.mobileNav;
      const scrolledDrawer = checks.homepage.mobileDrawerScrolled;
      if (
        !scrolledDrawer ||
        scrolledDrawer.expectedScroll <= 0 ||
        scrolledDrawer.ariaHidden !== 'false' ||
        /* The lock is overflow-only now: the body stays static and unoffset, and the
           scroll position simply never moves in either direction. */
        scrolledDrawer.bodyPosition !== 'static' ||
        scrolledDrawer.bodyTop !== '' ||
        Math.abs(scrolledDrawer.drawerTop) > 0.5 ||
        scrolledDrawer.drawerZIndex !== '80' ||
        scrolledDrawer.headerZIndex !== '90' ||
        scrolledDrawer.parent !== 'site-header' ||
        scrolledDrawer.persist !== 'site-header' ||
        !scrolledDrawer.drawerCoversBelowBar ||
        !scrolledDrawer.toggleHittable ||
        !scrolledDrawer.scrollLocked ||
        Math.abs(scrolledDrawer.closed.scrollY - scrolledDrawer.expectedScroll) > 1 ||
        scrolledDrawer.closed.bodyTop !== '' ||
        !scrolledDrawer.closed.scrollUnlocked ||
        scrolledDrawer.desktopResize.ariaHidden !== 'true' ||
        scrolledDrawer.desktopResize.bodyTop !== '' ||
        !scrolledDrawer.desktopResize.scrollUnlocked
      )
        failures.push('mobile drawer does not remain viewport-fixed after opening while scrolled');
      if (
        !nav ||
        nav.accordionCount !== 6 ||
        !nav.drawerOpen ||
        !nav.firstPanelOpen ||
        !nav.joinVisible ||
        nav.themeToggle.width < 43.5 ||
        nav.themeToggle.height < 43.5 ||
        nav.minTargetHeight < 43.5 ||
        !nav.scrollLocked ||
        !nav.drawerClosed ||
        !nav.focusReturned ||
        !nav.scrollUnlocked
      )
        failures.push('mobile navigation interaction or focus handling failed');
      if (checks.homepage.principleStickyPosition !== 'static')
        failures.push('mobile principle detail remains sticky');
      if (checks.homepage.heroCanvasHeight > 340)
        failures.push('mobile hero canvas exceeds its 340px cap');
      if (checks.homepage.statColumns !== expectedStatColumns)
        failures.push('mobile evidence strip has the wrong column count');
      if (checks.homepage.phaseColumns !== expectedPhaseColumns)
        failures.push('mobile phase grid has the wrong column count');
      if (checks.homepage.formColumns !== 1 || checks.homepage.footnoteColumns !== 1) {
        failures.push('mobile form or footnote band does not stack');
      }
      if (
        checks.homepage.surveyTabs.flexWrap !== 'nowrap' ||
        !['auto', 'scroll'].includes(checks.homepage.surveyTabs.overflowX)
      )
        failures.push('mobile survey tabs are not horizontally contained');
    } else {
      if (!checks.homepage.principleListWithinHalfViewport)
        failures.push('homepage principle list exceeds half the viewport');
      if (checks.homepage.kaosMountHeight !== 430)
        failures.push('homepage KAOS mount is not 430px high');
      if (
        checks.homepage.principleStickyPosition !== 'sticky' ||
        checks.homepage.principleStickyTop !== '96px' ||
        checks.homepage.principleViewportTops.some((top) => Math.abs(top - 96) > 1)
      )
        failures.push('homepage principle detail does not remain sticky at 96px');
      if (
        checks.homepage.ossPreviewStates.some(({ canvasCount }) => canvasCount !== 1) ||
        checks.homepage.ossPreviewStates
          .filter(({ mode }) => mode === 'xai' || mode === 'list')
          .some(({ bottomOpaquePixels }) => bottomOpaquePixels !== 0)
      )
        failures.push('homepage open-source dropdown composites multiple previews');
      const policy = checks.homepage.policyGeometry;
      if (
        policy.links !== 5 ||
        [policy.body, policy.list].some(
          ({ client, scroll }) => scroll[0] > client[0] || scroll[1] > client[1],
        ) ||
        policy.list.box[0] < policy.body.box[0] ||
        policy.list.box[1] > policy.body.box[1]
      )
        failures.push('homepage policy menu link count or overflow is wrong');
      const initiatives = checks.homepage.initiativesGeometry;
      if (
        initiatives.rail.box[2] !== 230 ||
        initiatives.rail.padding.join() !== ['24px', '18px', '24px', '18px'].join() ||
        initiatives.panes.padding.join() !== ['26px', '30px', '26px', '30px'].join() ||
        [initiatives.body, initiatives.menu, initiatives.rail, initiatives.panes].some(
          ({ client, scroll }) => scroll[0] > client[0] || scroll[1] > client[1],
        ) ||
        initiatives.menu.box[0] < initiatives.body.box[0] ||
        initiatives.menu.box[1] > initiatives.body.box[1]
      )
        failures.push('homepage initiatives menu padding or overflow differs from the prototype');
    }
  }

  results.push({
    route,
    passed: failures.length === 0,
    failures,
    errors,
    form: formChecks,
    contrast: contrastReport ?? { recorded: Object.keys(contrastByKey).length },
    ...checks,
    // The full per-node ratio table is baseline material, not report material.
    textContrast: undefined,
  });

  page.off('pageerror', onPageError);
  page.off('console', onConsole);
}

await browser.close();
if (recordsContrastBaseline) {
  await mkdir(contrastBaselineDir, { recursive: true });
  const stored = await readFile(contrastBaselineFile, 'utf8')
    .then(JSON.parse)
    .catch(() => ({}));
  // Merge so a partial run refreshes only the routes it visited.
  await writeFile(
    contrastBaselineFile,
    `${JSON.stringify({ ...stored, ...contrastBaseline }, null, 2)}\n`,
  );
}
const passed = results.every((result) => result.passed);
console.log(JSON.stringify({ passed, theme, baseUrl, viewport, results }, null, 2));
if (!passed) process.exit(1);
