import playwright from '/Users/asaucedo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js';
import { readFile } from 'node:fs/promises';

const { chromium } = playwright;
const args = process.argv.slice(2);
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

if (routes.length === 0) {
  routes.push(...JSON.parse(await readFile(new URL('./routes.json', import.meta.url), 'utf8')));
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport,
  deviceScaleFactor: 1,
});
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
        endpoint: form.dataset.endpoint,
        variant: form.dataset.variant,
        state: form.dataset.state,
        confirmation: form.querySelector('[data-form-confirmation]').textContent,
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
    const xaiPreview = page.locator('.xai-preview');
    const firstXaiFrame = await xaiPreview.screenshot();
    await page.waitForTimeout(350);
    const secondXaiFrame = await xaiPreview.screenshot();
    homepageInteractions.xaiFramesChanged = !firstXaiFrame.equals(secondXaiFrame);

    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(300);
    if (isMobile) {
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
          joinVisible: drawer.querySelector('.join-pill').getBoundingClientRect().height >= 44,
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
    const unrevealed = [...document.querySelectorAll('[data-reveal]')]
      .filter((node) => node.dataset.revealed !== '1')
      .map((node) => `${node.tagName.toLowerCase()}#${node.id}.${node.className}`);
    const touchTargets = [
      ...document.querySelectorAll(
        '.header-row > .wordmark, [data-mobile-menu-open], .header-row .join-pill, main button, main .button, .cta-block a, .principle-pagination a, form button',
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

    return {
      pageHeight: document.documentElement.scrollHeight,
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      unrevealed,
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
      minTouchTargetHeight: touchTargets.length
        ? Math.min(...touchTargets.map((element) => element.getBoundingClientRect().height))
        : null,
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
              surveyPaddingBottom: getComputedStyle(document.querySelector('.home-survey-card'))
                .paddingBottom,
              footnoteStandards: [...document.querySelectorAll('.footnote-band .standards a')].map(
                (link) => {
                  const style = getComputedStyle(link);
                  return {
                    color: style.color,
                    fontFamily: style.fontFamily,
                    fontSize: style.fontSize,
                  };
                },
              ),
              initiativeCards: [...document.querySelectorAll('.initiative-pair > article')].map(
                (card) => ({
                  eyebrow: card.querySelector(':scope > .eyebrow')?.textContent,
                  heading: card.querySelector(':scope > h3')?.textContent,
                  buttons: [...card.querySelectorAll('.initiative-actions .button')].map(
                    (button) => ({
                      label: button.textContent,
                      primary: button.classList.contains('primary'),
                    }),
                  ),
                  inlineLinks: [...card.querySelectorAll(':scope > p .text-link')].map((link) => {
                    const style = getComputedStyle(link);
                    return {
                      color: style.color,
                      decoration: style.textDecorationLine,
                    };
                  }),
                }),
              ),
            }
          : null,
      kaosMounts: [...document.querySelectorAll('main kaos-graph')].map(
        (host) => host.getBoundingClientRect().height,
      ),
    };
  });
  if (checks.homepage) Object.assign(checks.homepage, homepageInteractions);

  const failures = [];
  const expectedStatus = isNotFoundRoute ? 404 : 200;
  if (!response || response.status() !== expectedStatus)
    failures.push(`HTTP ${response?.status() ?? 'no response'}`);
  if (errors.length > 0) failures.push(`${errors.length} page/console error(s)`);
  if (checks.unrevealed.length > 0)
    failures.push(`${checks.unrevealed.length} reveal target(s) did not fire`);
  if (checks.pageHeight >= 20000)
    failures.push(`page height ${checks.pageHeight}px exceeds 20000px`);
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
    (formChecks.endpoint !== '' ||
      formChecks.state !== 'success' ||
      !formChecks.confirmation.startsWith('The form is in demo mode.') ||
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
    failures.push('form demo state, anti-spam fields, or card containment is incomplete');
  if (isMobile && checks.minTouchTargetHeight < 43.5) {
    failures.push(`touch target is ${checks.minTouchTargetHeight}px high; expected at least 44px`);
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
    const expectedHomePadding = isMobile ? '96px' : '120px';
    if (
      checks.homepage.homeSections.length !== 5 ||
      checks.homepage.homeSections.some(
        ({ borderTopWidth, paddingTop }) =>
          borderTopWidth !== '1px' || paddingTop !== expectedHomePadding,
      )
    )
      failures.push('homepage major-section divider or spacing rhythm is inconsistent');
    if (
      checks.homepage.surveyPaddingBottom !==
      (viewport.width <= 600 ? '28px' : isMobile ? '34px' : '40px')
    ) {
      failures.push('homepage survey card bottom padding is incorrect');
    }
    if (
      checks.homepage.footnoteStandards.some(
        ({ color, fontFamily, fontSize }) =>
          color !== 'rgba(244, 242, 238, 0.42)' ||
          !fontFamily.includes('Geist Mono') ||
          fontSize !== '9.5px',
      )
    )
      failures.push('homepage footnote standards type tier has regressed');
    if (
      checks.homepage.initiativeCards[0]?.eyebrow !== 'Governance' ||
      checks.homepage.initiativeCards[0]?.heading !== 'AI Governance & Procurement' ||
      checks.homepage.initiativeCards[0]?.buttons.length !== 2 ||
      checks.homepage.initiativeCards[0]?.buttons.filter(
        ({ label }) => label === 'ML Maturity Model →',
      ).length !== 1 ||
      !checks.homepage.initiativeCards[0]?.buttons[0]?.primary ||
      checks.homepage.initiativeCards[1]?.eyebrow !== 'Security' ||
      checks.homepage.initiativeCards[1]?.heading !== 'ML & Agent Security' ||
      checks.homepage.initiativeCards[1]?.buttons.length !== 1 ||
      !checks.homepage.initiativeCards[1]?.buttons[0]?.primary ||
      checks.homepage.initiativeCards[1]?.inlineLinks.length !== 3 ||
      checks.homepage.initiativeCards[1]?.inlineLinks.some(
        ({ color, decoration }) => color !== 'rgb(94, 230, 160)' || decoration !== 'underline',
      )
    )
      failures.push('homepage governance/security card structure is incomplete');
    if (
      checks.homepage.formWash !==
      'radial-gradient(70% 90% at 70% 0%, rgba(94, 230, 160, 0.14), rgb(15, 16, 15) 72%)'
    ) {
      failures.push('homepage form wash differs from the prototype');
    }
    if (isMobile) {
      const expectedStatColumns = viewport.width <= 600 ? 2 : 3;
      const expectedPhaseColumns = viewport.width <= 600 ? 1 : 2;
      const nav = checks.homepage.mobileNav;
      if (
        !nav ||
        nav.accordionCount !== 5 ||
        !nav.drawerOpen ||
        !nav.firstPanelOpen ||
        !nav.joinVisible ||
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
      if (checks.homepage.kaosMountHeight !== 400)
        failures.push('homepage KAOS mount is not 400px high');
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
    ...checks,
  });

  page.off('pageerror', onPageError);
  page.off('console', onConsole);
}

await browser.close();
const passed = results.every((result) => result.passed);
console.log(JSON.stringify({ passed, baseUrl, viewport, results }, null, 2));
if (!passed) process.exit(1);
