import playwright from '/Users/asaucedo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js';

const { chromium } = playwright;
const routes = process.argv.slice(2);
const baseUrl = process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:4126';

if (routes.length === 0) {
  throw new Error('Usage: node scripts/verify/verify-dom.mjs <route...>');
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const results = [];

for (const route of routes) {
  const errors = [];
  const onPageError = (error) => errors.push(`page: ${error.message}`);
  const onConsole = (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  };
  page.on('pageerror', onPageError);
  page.on('console', onConsole);

  const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });

  let homepageInteractions = null;
  if (route === '/') {
    homepageInteractions = await page.evaluate(async () => {
      const section = document.querySelector('#principles');
      const detail = document.querySelector('.principle-detail-wrap');
      section.style.transition = 'none';
      section.style.transform = 'none';
      detail.querySelectorAll('.principle-detail').forEach((card) => { card.style.animation = 'none'; });
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
      };
    });
  }

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let top = 0; top < height; top += 500) {
    await page.evaluate((nextTop) => scrollTo(0, nextTop), top);
    await page.waitForTimeout(70);
  }
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);

  const checks = await page.evaluate(() => {
    const sampleCanvas = (canvas) => {
      if (canvas.width < 2 || canvas.height < 2) return false;
      const context = canvas.getContext('2d');
      if (!context) return false;
      const width = Math.min(canvas.width, 240);
      const height = Math.min(canvas.height, 160);
      const pixels = context.getImageData(0, 0, width, height).data;
      for (let index = 3; index < pixels.length; index += 4) {
        if (pixels[index] > 0) return true;
      }
      return false;
    };
    const canvases = [...document.querySelectorAll('canvas')]
      .filter((canvas) => canvas.clientWidth >= 2 && canvas.clientHeight >= 2);
    const unrevealed = [...document.querySelectorAll('[data-reveal]')]
      .filter((node) => node.dataset.revealed !== '1')
      .map((node) => `${node.tagName.toLowerCase()}#${node.id}.${node.className}`);

    return {
      pageHeight: document.documentElement.scrollHeight,
      pageWidth: document.documentElement.scrollWidth,
      unrevealed,
      canvases: canvases.map((canvas) => ({
        widget: canvas.dataset.widget ?? canvas.closest('[data-widget]')?.dataset.widget ?? 'unlabelled',
        size: `${canvas.clientWidth}x${canvas.clientHeight}/${canvas.width}x${canvas.height}`,
        nonBlank: sampleCanvas(canvas),
      })),
      homepage: location.pathname === '/' ? {
        heroSwitchers: document.querySelectorAll('[data-hero-mode]').length,
        surveyCard: Boolean(document.querySelector('#reports [data-survey-card]')),
        surveyBars: document.querySelectorAll('#reports .survey-bars button').length,
        principleListWithinHalfViewport:
          (document.querySelector('.principles-explorer-grid')?.firstElementChild?.getBoundingClientRect().width ?? 9999)
          <= innerWidth * 0.5,
        kaosMountHeight:
          document.querySelector('.kaos-feature .kaos-canvas-mount')?.getBoundingClientRect().height ?? 0,
      } : null,
      kaosMounts: [...document.querySelectorAll('main [data-widget="kaos-graph"]')]
        .map((host) => host.getBoundingClientRect().height),
    };
  });
  if (checks.homepage) Object.assign(checks.homepage, homepageInteractions);

  const failures = [];
  if (!response || !response.ok()) failures.push(`HTTP ${response?.status() ?? 'no response'}`);
  if (errors.length > 0) failures.push(`${errors.length} page/console error(s)`);
  if (checks.unrevealed.length > 0) failures.push(`${checks.unrevealed.length} reveal target(s) did not fire`);
  if (checks.pageHeight >= 20000) failures.push(`page height ${checks.pageHeight}px exceeds 20000px`);
  if (checks.pageWidth > 1440) failures.push(`page width ${checks.pageWidth}px exceeds the 1440px viewport`);
  if (checks.canvases.some((canvas) => !canvas.nonBlank)) failures.push('one or more canvases are blank');
  if (checks.kaosMounts.some((height) => height < 220 || height > 500)) failures.push('KAOS mount height is outside 220–500px');

  if (checks.homepage) {
    if (checks.homepage.heroSwitchers !== 3) failures.push('homepage does not expose three hero modes');
    if (!checks.homepage.principleListWithinHalfViewport) failures.push('homepage principle list exceeds half the viewport');
    if (!checks.homepage.surveyCard || checks.homepage.surveyBars < 5) failures.push('homepage survey explorer is incomplete');
    if (checks.homepage.kaosMountHeight !== 400) failures.push('homepage KAOS mount is not 400px high');
    if (
      checks.homepage.principleStickyPosition !== 'sticky'
      || checks.homepage.principleStickyTop !== '96px'
      || checks.homepage.principleViewportTops.some((top) => Math.abs(top - 96) > 1)
    ) failures.push('homepage principle detail does not remain sticky at 96px');
  }

  results.push({
    route,
    passed: failures.length === 0,
    failures,
    errors,
    ...checks,
  });

  page.off('pageerror', onPageError);
  page.off('console', onConsole);
}

await browser.close();
const passed = results.every((result) => result.passed);
console.log(JSON.stringify({ passed, baseUrl, results }, null, 2));
if (!passed) process.exit(1);
