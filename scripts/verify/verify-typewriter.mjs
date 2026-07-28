import playwright from '/Users/asaucedo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js';

const { chromium } = playwright;
const baseUrl = process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:4126';
const expectedLines = [
  'We are an independent research institute with a mission to',
  'ensure that frontier AI is safe, aligned and accountable to',
  'people and society',
];
const browser = await chromium.launch({ headless: true });
const errors = [];

const openPage = async (viewport, reducedMotion = 'no-preference') => {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  await page.goto(new URL('/', baseUrl).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return { context, page };
};

const normal = await openPage({ width: 1440, height: 1000 });
const lede = normal.page.locator('[data-widget="hero-typewriter"]');
const lineMetrics = await lede.evaluate((element) => {
  const pillStyle = getComputedStyle(document.querySelector('.status-pill'));
  const ledeStyle = getComputedStyle(element);
  const lines = [...element.querySelectorAll('.hero-typewriter-line')];
  return {
    lineCount: lines.length,
    lines: lines.map((line) => line.innerText),
    noWrap: lines.every((line) => getComputedStyle(line).whiteSpace === 'nowrap'),
    lineOverflow: lines.map((line) => line.scrollWidth - line.clientWidth),
    componentOverflow: element.scrollWidth - element.clientWidth,
    underline: element.dataset.underline,
    pill: {
      fontFamily: pillStyle.fontFamily,
      fontWeight: pillStyle.fontWeight,
      letterSpacing: pillStyle.letterSpacing,
    },
    lede: {
      color: ledeStyle.color,
      fontFamily: ledeStyle.fontFamily,
      fontWeight: ledeStyle.fontWeight,
      letterSpacing: ledeStyle.letterSpacing,
      textTransform: ledeStyle.textTransform,
    },
    dynamic: {
      color: getComputedStyle(element.querySelector('.hero-typewriter-dynamic')).color,
      cursorBlinkDuration: getComputedStyle(element.querySelector('.hero-typewriter-cursor')).animationDuration,
    },
  };
});

await normal.page.waitForFunction(() => (
  document.querySelector('[data-widget="hero-typewriter"]')?.dataset.typewriterPhase === 'dwell'
), null, { timeout: 5000 });
const initialBox = await lede.boundingBox();
const initialActionsTop = await normal.page.locator('.hero .actions').evaluate((element) => element.getBoundingClientRect().top);

await normal.page.waitForFunction(() => {
  const animation = document.querySelector('.glitch')
    ?.getAnimations()
    .find((item) => item.animationName === 'om-flicker');
  if (!animation) return false;
  const cycle = Number(animation.effect.getTiming().duration);
  const phase = (Number(animation.currentTime) % cycle) / cycle;
  return phase >= .665 && phase <= .73;
}, null, { timeout: 10000, polling: 10 });

const burstSample = await normal.page.evaluate(() => {
  const headline = document.querySelector('.glitch');
  const segment = document.querySelector('.hero-typewriter-glitch');
  const animationData = (element, name) => {
    const animation = element.getAnimations().find((item) => item.animationName === name);
    const cycle = Number(animation.effect.getTiming().duration);
    return {
      currentTime: Number(animation.currentTime),
      phase: (Number(animation.currentTime) % cycle) / cycle,
      startTime: Number(animation.startTime),
    };
  };
  return {
    headline: animationData(headline, 'om-flicker'),
    segment: animationData(segment, 'typewriter-flicker'),
    headlineGhostOpacity: getComputedStyle(headline, '::before').opacity,
    segmentGhostOpacity: getComputedStyle(segment, '::before').opacity,
    segmentGhostContent: getComputedStyle(segment, '::before').content,
    segmentGhostClip: getComputedStyle(segment, '::before').clipPath,
  };
});

await normal.page.waitForFunction(() => (
  document.querySelector('[data-widget="hero-typewriter"]')?.dataset.typewriterPhase === 'deleting'
), null, { timeout: 3000, polling: 5 });
const firstDeleteAt = await normal.page.evaluate(() => performance.now());
const deleteSample = await lede.evaluate((element) => {
  const headlineAnimation = document.querySelector('.glitch')
    .getAnimations()
    .find((item) => item.animationName === 'om-flicker');
  const cycle = Number(headlineAnimation.effect.getTiming().duration);
  return {
    actionsTop: document.querySelector('.hero .actions').getBoundingClientRect().top,
    beneficiary: element.querySelector('.hero-typewriter-text').textContent,
    phase: (Number(headlineAnimation.currentTime) % cycle) / cycle,
  };
});
const firstFrame = await lede.screenshot();
await normal.page.waitForTimeout(120);
const secondFrame = await lede.screenshot();

await normal.page.waitForFunction(() => {
  const element = document.querySelector('[data-widget="hero-typewriter"]');
  return element?.dataset.typewriterPhase === 'dwell'
    && element.querySelector('.hero-typewriter-text')?.textContent === 'the people who use it';
}, null, { timeout: 5000 });
const rotatedBox = await lede.boundingBox();

await normal.page.waitForFunction(() => (
  document.querySelector('[data-widget="hero-typewriter"]')?.dataset.typewriterPhase === 'deleting'
), null, { timeout: 10000, polling: 5 });
const secondDeleteAt = await normal.page.evaluate(() => performance.now());
const rotationInterval = secondDeleteAt - firstDeleteAt;

await normal.page.waitForFunction(() => (
  document.querySelector('[data-widget="hero-typewriter"]')?.dataset.typewriterPhase === 'dwell'
), null, { timeout: 5000 });
await normal.page.evaluate(() => {
  const element = document.querySelector('[data-widget="hero-typewriter"]');
  const output = element.querySelector('.hero-typewriter-text');
  const glitch = element.querySelector('.hero-typewriter-glitch');
  output.textContent = 'people and society';
  glitch.dataset.text = 'people and society';
});
await normal.page.evaluate(() => {
  document.querySelector('[data-widget="hero-typewriter"]').dataset.underline = 'false';
});
await lede.screenshot({ path: 'tmp2/typewriter-underline-off.png' });
await normal.page.evaluate(() => {
  document.querySelector('[data-widget="hero-typewriter"]').dataset.underline = 'true';
});
await lede.screenshot({ path: 'tmp2/typewriter-underline-on.png' });
await normal.page.evaluate(() => {
  document.querySelector('[data-widget="hero-typewriter"]').dataset.underline = 'false';
});

const reduced = await openPage({ width: 1440, height: 1000 }, 'reduce');
const reducedResult = await reduced.page.locator('[data-widget="hero-typewriter"]').evaluate((element) => ({
  cursorDisplay: getComputedStyle(element.querySelector('.hero-typewriter-cursor')).display,
  lines: [...element.querySelectorAll('.hero-typewriter-line')].map((line) => line.innerText),
  phase: element.dataset.typewriterPhase,
}));
const reducedFirstFrame = await reduced.page.locator('[data-widget="hero-typewriter"]').screenshot();
await reduced.page.waitForTimeout(800);
const reducedSecondFrame = await reduced.page.locator('[data-widget="hero-typewriter"]').screenshot();

const mobile = await openPage({ width: 420, height: 900 });
const mobileResult = await mobile.page.locator('[data-widget="hero-typewriter"]').evaluate((element) => ({
  blockHeight: element.getBoundingClientRect().height,
  componentOverflow: element.scrollWidth - element.clientWidth,
  fontSize: getComputedStyle(element).fontSize,
  lineCount: element.querySelectorAll('.hero-typewriter-line').length,
  lineOverflow: [...element.querySelectorAll('.hero-typewriter-line')]
    .map((line) => line.scrollWidth - line.clientWidth),
  pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
}));

const sameBox = initialBox
  && rotatedBox
  && initialBox.width === rotatedBox.width
  && initialBox.height === rotatedBox.height;
const matchingFont = lineMetrics.pill.fontFamily === lineMetrics.lede.fontFamily
  && lineMetrics.pill.fontWeight === lineMetrics.lede.fontWeight
  && lineMetrics.pill.letterSpacing === lineMetrics.lede.letterSpacing;
const phaseDifference = Math.abs(burstSample.headline.phase - burstSample.segment.phase);
const result = {
  passed: errors.length === 0
    && matchingFont
    && lineMetrics.lineCount === 3
    && JSON.stringify(lineMetrics.lines.slice(0, 2)) === JSON.stringify(expectedLines.slice(0, 2).map((line) => line.toUpperCase()))
    && lineMetrics.lines[2] === `${expectedLines[2].toUpperCase()}▍`
    && lineMetrics.noWrap
    && lineMetrics.componentOverflow <= 0
    && lineMetrics.lineOverflow.every((overflow) => overflow <= 0)
    && lineMetrics.underline === 'false'
    && lineMetrics.lede.textTransform === 'uppercase'
    && lineMetrics.lede.color === 'rgba(244, 242, 238, 0.66)'
    && lineMetrics.dynamic.color === 'rgb(94, 230, 160)'
    && lineMetrics.dynamic.cursorBlinkDuration === '1s'
    && phaseDifference < .005
    && burstSample.headlineGhostOpacity !== '0'
    && burstSample.segmentGhostOpacity !== '0'
    && burstSample.segmentGhostContent.includes('▍')
    && burstSample.segmentGhostClip !== 'inset(100% 0px 0px)'
    && deleteSample.phase >= .767
    && deleteSample.phase < .82
    && deleteSample.actionsTop === initialActionsTop
    && !firstFrame.equals(secondFrame)
    && sameBox
    && rotationInterval >= 8900
    && rotationInterval <= 9100
    && reducedResult.phase === 'static'
    && reducedResult.cursorDisplay === 'none'
    && JSON.stringify(reducedResult.lines) === JSON.stringify(expectedLines.map((line) => line.toUpperCase()))
    && reducedFirstFrame.equals(reducedSecondFrame)
    && mobileResult.pageOverflow <= 0
    && mobileResult.componentOverflow <= 0
    && mobileResult.lineOverflow.every((overflow) => overflow <= 0)
    && mobileResult.lineCount === 3
    && mobileResult.blockHeight > 0,
  baseUrl,
  errors,
  fontTreatment: { matchingFont, ...lineMetrics },
  phaseLock: {
    phaseDifference,
    burstSample,
    deletePhase: deleteSample.phase,
    rotationInterval,
  },
  animation: {
    framesChanged: !firstFrame.equals(secondFrame),
    initialBox,
    rotatedBox,
    reservedBoxStable: sameBox,
    actionsTopStable: deleteSample.actionsTop === initialActionsTop,
  },
  reducedMotion: {
    ...reducedResult,
    framesChanged: !reducedFirstFrame.equals(reducedSecondFrame),
  },
  mobile: mobileResult,
};

await normal.context.close();
await reduced.context.close();
await mobile.context.close();
await browser.close();
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
