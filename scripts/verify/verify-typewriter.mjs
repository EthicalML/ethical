import playwright from './playwright.mjs';

import { applyTheme, parseThemeArgs, readTokenColors } from './theme.mjs';

const { chromium } = playwright;
const { theme } = parseThemeArgs(process.argv.slice(2));
const baseUrl = process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:4126';
const expectedLines = [
  'We are an independent research institute with a mission to',
  'ensure that frontier AI is safe, aligned and accountable to',
  'people and society.',
];
const subtitleFontSize = 13;
const expectedCursorGeometry = {
  height: subtitleFontSize * 1.15,
  verticalAlign: subtitleFontSize * -0.14,
  width: 5.6, // .72ch in the rendered 13px Geist Mono subtitle
};
const cursorGeometryTolerance = {
  height: 0.5,
  verticalAlign: 0.15,
  width: 0.5,
};
const browser = await chromium.launch({ headless: true });
const errors = [];

const openPage = async (viewport, reducedMotion = 'no-preference') => {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion,
    colorScheme: theme,
  });
  await applyTheme(context, theme);
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
// Colour expectations name their token and resolve it from the page, so the
// same assertions hold in either theme.
const tokens = await readTokenColors(normal.page, [
  '--typewriter-cursor',
  '--text-2',
  '--accent',
  '--accent-ink',
]);
const expectedColors = {
  cursor: tokens['--typewriter-cursor'],
  lede: tokens['--text-2'],
  dynamic: tokens['--accent-ink'] ?? tokens['--accent'],
};
const lede = normal.page.locator('type-writer .hero-subtitle');
const lineMetrics = await lede.evaluate((element) => {
  const pillStyle = getComputedStyle(document.querySelector('.status-pill'));
  const ledeStyle = getComputedStyle(element);
  const lines = [...element.querySelectorAll('.hero-typewriter-line')];
  return {
    lineCount: lines.length,
    noWrap: lines.every((line) => getComputedStyle(line).whiteSpace === 'nowrap'),
    reservedLines: lines.every((line) => line.getBoundingClientRect().height > 0),
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
    },
  };
});

await normal.page.waitForFunction(
  () => {
    const element = document.querySelector('type-writer .hero-subtitle');
    const outputs = [...(element?.querySelectorAll('.hero-typewriter-text') ?? [])];
    return (
      element?.dataset.typewriterPhase === 'initial' &&
      outputs[0]?.textContent.length > 0 &&
      outputs[1]?.textContent === '' &&
      outputs[2]?.textContent === ''
    );
  },
  null,
  { timeout: 2000 },
);
const initialBox = await lede.boundingBox();
const initialActionsTop = await normal.page
  .locator('.hero .actions')
  .evaluate((element) => element.getBoundingClientRect().top);
const initialFirstFrame = await lede.screenshot();
await normal.page.waitForTimeout(120);
const initialSecondFrame = await lede.screenshot();

await normal.page.waitForFunction(
  (line) => {
    const element = document.querySelector('type-writer .hero-subtitle');
    const outputs = [...(element?.querySelectorAll('.hero-typewriter-text') ?? [])];
    const cursorLine = element
      ?.querySelector('.hero-typewriter-cursor')
      ?.closest('.hero-typewriter-line');
    return (
      outputs[0]?.textContent === line &&
      outputs[1]?.textContent.length > 0 &&
      outputs[1]?.textContent !== 'ensure that frontier AI is safe, aligned and accountable to' &&
      outputs[2]?.textContent === '' &&
      cursorLine === element.querySelectorAll('.hero-typewriter-line')[1]
    );
  },
  expectedLines[0],
  { timeout: 5000 },
);
const secondLineSample = await lede.evaluate((element) =>
  [...element.querySelectorAll('.hero-typewriter-text')].map((output) => output.textContent),
);

await normal.page.waitForFunction(
  (lines) => {
    const element = document.querySelector('type-writer .hero-subtitle');
    const outputs = [...(element?.querySelectorAll('.hero-typewriter-text') ?? [])];
    const cursorLine = element
      ?.querySelector('.hero-typewriter-cursor')
      ?.closest('.hero-typewriter-line');
    return (
      outputs[0]?.textContent === lines[0] &&
      outputs[1]?.textContent === lines[1] &&
      outputs[2]?.textContent.length > 0 &&
      outputs[2]?.textContent !== lines[2] &&
      cursorLine === element.querySelectorAll('.hero-typewriter-line')[2]
    );
  },
  expectedLines,
  { timeout: 5000 },
);
const thirdLineSample = await lede.evaluate((element) =>
  [...element.querySelectorAll('.hero-typewriter-text')].map((output) => output.textContent),
);

await normal.page.waitForFunction(
  () => document.querySelector('type-writer .hero-subtitle')?.dataset.typewriterPhase === 'dwell',
  null,
  { timeout: 8000 },
);
const initialComplete = await lede.evaluate((element) => {
  const cursor = element.querySelector('.hero-typewriter-cursor');
  const cursorStyle = getComputedStyle(cursor);
  const cursorBox = cursor.getBoundingClientRect();
  const headlineAnimation = document
    .querySelector('.glitch')
    .getAnimations()
    .find((item) => item.animationName === 'om-flicker');
  const cycle = Number(headlineAnimation.effect.getTiming().duration);
  return {
    lines: [...element.querySelectorAll('.hero-typewriter-text')].map(
      (output) => output.textContent,
    ),
    cursorLine: [...element.querySelectorAll('.hero-typewriter-line')].indexOf(
      cursor.closest('.hero-typewriter-line'),
    ),
    cursorBlinkDuration: cursorStyle.animationDuration,
    cursor: {
      backgroundColor: cursorStyle.backgroundColor,
      height: cursorBox.height,
      text: cursor.textContent,
      verticalAlign: cursorStyle.verticalAlign,
      width: cursorBox.width,
    },
    headlineCurrentTime: Number(headlineAnimation.currentTime),
    headlineCycle: cycle,
    headlinePhase: (Number(headlineAnimation.currentTime) % cycle) / cycle,
  };
});

await normal.page.waitForFunction(
  () => {
    const animation = document
      .querySelector('.glitch')
      ?.getAnimations()
      .find((item) => item.animationName === 'om-flicker');
    if (!animation) return false;
    const cycle = Number(animation.effect.getTiming().duration);
    const phase = (Number(animation.currentTime) % cycle) / cycle;
    return phase >= 0.665 && phase <= 0.73;
  },
  null,
  { timeout: 10000, polling: 10 },
);

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

await normal.page.waitForFunction(
  () =>
    document.querySelector('type-writer .hero-subtitle')?.dataset.typewriterPhase === 'deleting',
  null,
  { timeout: 12000, polling: 5 },
);
const firstDeleteAt = await normal.page.evaluate(() => performance.now());
const deleteSample = await lede.evaluate((element) => {
  const headlineAnimation = document
    .querySelector('.glitch')
    .getAnimations()
    .find((item) => item.animationName === 'om-flicker');
  const cycle = Number(headlineAnimation.effect.getTiming().duration);
  return {
    actionsTop: document.querySelector('.hero .actions').getBoundingClientRect().top,
    beneficiary: element.querySelector('.hero-typewriter-dynamic .hero-typewriter-text')
      .textContent,
    headlineCurrentTime: Number(headlineAnimation.currentTime),
    phase: (Number(headlineAnimation.currentTime) % cycle) / cycle,
  };
});
const firstFrame = await lede.screenshot();
await normal.page.waitForTimeout(120);
const secondFrame = await lede.screenshot();

await normal.page.waitForFunction(
  () => {
    const element = document.querySelector('type-writer .hero-subtitle');
    return (
      element?.dataset.typewriterPhase === 'dwell' &&
      element.querySelector('.hero-typewriter-dynamic .hero-typewriter-text')?.textContent ===
        'the people who use it.'
    );
  },
  null,
  { timeout: 5000 },
);
const rotatedBox = await lede.boundingBox();

await normal.page.waitForFunction(
  () =>
    document.querySelector('type-writer .hero-subtitle')?.dataset.typewriterPhase === 'deleting',
  null,
  { timeout: 10000, polling: 5 },
);
const secondDeleteAt = await normal.page.evaluate(() => performance.now());
const rotationInterval = secondDeleteAt - firstDeleteAt;

await normal.page.waitForFunction(
  () => document.querySelector('type-writer .hero-subtitle')?.dataset.typewriterPhase === 'dwell',
  null,
  { timeout: 5000 },
);
await normal.page.evaluate(() => {
  const element = document.querySelector('type-writer .hero-subtitle');
  const output = element.querySelector('.hero-typewriter-dynamic .hero-typewriter-text');
  const glitch = element.querySelector('.hero-typewriter-glitch');
  output.textContent = 'people and society.';
  glitch.dataset.text = 'people and society.';
});
await normal.page.evaluate(() => {
  document.querySelector('type-writer .hero-subtitle').dataset.underline = 'false';
});
await lede.screenshot({ path: 'tmp2/typewriter-underline-off.png' });
await normal.page.evaluate(() => {
  document.querySelector('type-writer .hero-subtitle').dataset.underline = 'true';
});
await lede.screenshot({ path: 'tmp2/typewriter-underline-on.png' });
await normal.page.evaluate(() => {
  document.querySelector('type-writer .hero-subtitle').dataset.underline = 'false';
});
await normal.page.addStyleTag({
  content: `
    .hero-typewriter-glitch::before,
    .hero-typewriter-glitch::after { display: none !important; }
    .hero-typewriter-cursor { animation: none !important; opacity: 1 !important; }
  `,
});
await lede.locator('.hero-typewriter-dynamic').screenshot({ path: 'tmp2/typewriter-cursor.png' });

const reduced = await openPage({ width: 1440, height: 1000 }, 'reduce');
const reducedResult = await reduced.page
  .locator('type-writer .hero-subtitle')
  .evaluate((element) => ({
    cursorDisplay: getComputedStyle(element.querySelector('.hero-typewriter-cursor')).display,
    lines: [...element.querySelectorAll('.hero-typewriter-line')].map((line) => line.innerText),
    phase: element.dataset.typewriterPhase,
  }));
const reducedFirstFrame = await reduced.page.locator('type-writer .hero-subtitle').screenshot();
await reduced.page.waitForTimeout(800);
const reducedSecondFrame = await reduced.page.locator('type-writer .hero-subtitle').screenshot();

const mobile = await openPage({ width: 420, height: 900 });
const mobileResult = await mobile.page
  .locator('type-writer .hero-subtitle')
  .evaluate((element) => ({
    blockHeight: element.getBoundingClientRect().height,
    componentOverflow: element.scrollWidth - element.clientWidth,
    fontSize: getComputedStyle(element).fontSize,
    lineCount: element.querySelectorAll('.hero-typewriter-line').length,
    lineOverflow: [...element.querySelectorAll('.hero-typewriter-line')].map(
      (line) => line.scrollWidth - line.clientWidth,
    ),
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));

const sameBox =
  initialBox &&
  rotatedBox &&
  initialBox.width === rotatedBox.width &&
  initialBox.height === rotatedBox.height;
const matchingFont =
  lineMetrics.pill.fontFamily === lineMetrics.lede.fontFamily &&
  lineMetrics.pill.fontWeight === lineMetrics.lede.fontWeight &&
  lineMetrics.pill.letterSpacing === lineMetrics.lede.letterSpacing;
const phaseDifference = Math.abs(burstSample.headline.phase - burstSample.segment.phase);
const initialBurstWasActive =
  initialComplete.headlinePhase >= 0.656 && initialComplete.headlinePhase < 0.767;
const skippedActiveBoundary =
  !initialBurstWasActive ||
  Math.floor(deleteSample.headlineCurrentTime / initialComplete.headlineCycle) >
    Math.floor(initialComplete.headlineCurrentTime / initialComplete.headlineCycle);
const result = {
  passed:
    errors.length === 0 &&
    matchingFont &&
    lineMetrics.lineCount === 3 &&
    lineMetrics.reservedLines &&
    !initialFirstFrame.equals(initialSecondFrame) &&
    JSON.stringify(secondLineSample.slice(0, 1)) === JSON.stringify(expectedLines.slice(0, 1)) &&
    secondLineSample[1].length > 0 &&
    secondLineSample[2] === '' &&
    JSON.stringify(thirdLineSample.slice(0, 2)) === JSON.stringify(expectedLines.slice(0, 2)) &&
    thirdLineSample[2].length > 0 &&
    JSON.stringify(initialComplete.lines) === JSON.stringify(expectedLines) &&
    initialComplete.cursorLine === 2 &&
    initialComplete.cursor.backgroundColor === expectedColors.cursor &&
    Math.abs(initialComplete.cursor.height - expectedCursorGeometry.height) <=
      cursorGeometryTolerance.height &&
    initialComplete.cursor.text === '' &&
    Math.abs(
      parseFloat(initialComplete.cursor.verticalAlign) - expectedCursorGeometry.verticalAlign,
    ) <= cursorGeometryTolerance.verticalAlign &&
    Math.abs(initialComplete.cursor.width - expectedCursorGeometry.width) <=
      cursorGeometryTolerance.width &&
    lineMetrics.noWrap &&
    lineMetrics.componentOverflow <= 0 &&
    lineMetrics.lineOverflow.every((overflow) => overflow <= 0) &&
    lineMetrics.underline === 'false' &&
    lineMetrics.lede.textTransform === 'uppercase' &&
    lineMetrics.lede.color === expectedColors.lede &&
    lineMetrics.dynamic.color === expectedColors.dynamic &&
    initialComplete.cursorBlinkDuration === '1s' &&
    phaseDifference < 0.005 &&
    burstSample.headlineGhostOpacity !== '0' &&
    burstSample.segmentGhostOpacity !== '0' &&
    burstSample.segmentGhostContent.includes('▋') &&
    burstSample.segmentGhostClip !== 'inset(100% 0px 0px)' &&
    /* The delete phase opens at 0.767 of the 9s headline cycle. Sampling it is a
       race with the frame clock: a measured run landed at 0.7657 — 12ms short of
       the boundary — and passed on re-run, so the bound sat exactly on the edge it
       was testing. 0.762 carries ~45ms (roughly three frames at 60Hz) of slack,
       an order of magnitude beyond the observed variance and still nowhere near
       the 0.656 burst start. The upper bound is untouched: it, not the lower one,
       is what proves the sample is inside the delete phase rather than past it. */
    deleteSample.phase >= 0.762 &&
    deleteSample.phase < 0.82 &&
    skippedActiveBoundary &&
    deleteSample.actionsTop === initialActionsTop &&
    !firstFrame.equals(secondFrame) &&
    sameBox &&
    rotationInterval >= 8900 &&
    rotationInterval <= 9100 &&
    reducedResult.phase === 'static' &&
    reducedResult.cursorDisplay === 'none' &&
    JSON.stringify(reducedResult.lines) ===
      JSON.stringify(expectedLines.map((line) => line.toUpperCase())) &&
    reducedFirstFrame.equals(reducedSecondFrame) &&
    mobileResult.pageOverflow <= 0 &&
    mobileResult.componentOverflow <= 0 &&
    mobileResult.lineOverflow.every((overflow) => overflow <= 0) &&
    mobileResult.lineCount === 3 &&
    mobileResult.blockHeight > 0,
  baseUrl,
  errors,
  fontTreatment: { matchingFont, ...lineMetrics },
  phaseLock: {
    phaseDifference,
    burstSample,
    deletePhase: deleteSample.phase,
    initialBurstWasActive,
    skippedActiveBoundary,
    rotationInterval,
  },
  animation: {
    cursorGeometryExpectation: {
      expected: expectedCursorGeometry,
      tolerance: cursorGeometryTolerance,
    },
    initialFramesChanged: !initialFirstFrame.equals(initialSecondFrame),
    secondLineSample,
    thirdLineSample,
    initialComplete,
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
