import playwright from '/Users/asaucedo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js';

const { chromium } = playwright;
const baseUrl = process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:4127';
const sentence = 'We are an independent research institute with a mission to ensure that frontier AI is safe, aligned and accountable to people and society.';
const browser = await chromium.launch({ headless: true });

const normalContext = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
  reducedMotion: 'no-preference',
});
const normalPage = await normalContext.newPage();
const errors = [];
normalPage.on('pageerror', (error) => errors.push(`page: ${error.message}`));
normalPage.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`);
});
await normalPage.goto(new URL('/', baseUrl).href, { waitUntil: 'networkidle' });

const lede = normalPage.locator('[data-widget="hero-typewriter"]');
await normalPage.waitForFunction(() => (
  document.querySelector('[data-widget="hero-typewriter"]')?.dataset.typewriterPhase === 'dwell'
), null, { timeout: 10000 });
const initialBox = await lede.boundingBox();

await normalPage.waitForFunction(() => (
  document.querySelector('[data-widget="hero-typewriter"]')?.dataset.typewriterPhase === 'deleting'
), null, { timeout: 5000 });
const firstFrame = await lede.screenshot();
await normalPage.waitForTimeout(120);
const secondFrame = await lede.screenshot();
const deletingText = await lede.locator('.hero-typewriter-text').textContent();

await normalPage.waitForFunction(() => {
  const widget = document.querySelector('[data-widget="hero-typewriter"]');
  return widget?.dataset.typewriterPhase === 'dwell'
    && widget.querySelector('.hero-typewriter-text')?.textContent.includes('the people who use it');
}, null, { timeout: 5000 });
const rotatedBox = await lede.boundingBox();

const reducedContext = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
});
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(new URL('/', baseUrl).href, { waitUntil: 'networkidle' });
const reduced = await reducedPage.locator('[data-widget="hero-typewriter"]').evaluate((element) => {
  const output = element.querySelector('.hero-typewriter-text');
  return {
    cursorContent: getComputedStyle(output, '::after').content,
    phase: element.dataset.typewriterPhase,
    text: output.textContent,
  };
});
const reducedFirstFrame = await reducedPage.locator('[data-widget="hero-typewriter"]').screenshot();
await reducedPage.waitForTimeout(800);
const reducedSecondFrame = await reducedPage.locator('[data-widget="hero-typewriter"]').screenshot();

const sameBox = initialBox
  && rotatedBox
  && initialBox.width === rotatedBox.width
  && initialBox.height === rotatedBox.height;
const result = {
  passed: errors.length === 0
    && !firstFrame.equals(secondFrame)
    && deletingText.startsWith(sentence.slice(0, sentence.lastIndexOf('people and society')))
    && sameBox
    && reduced.phase === 'static'
    && reduced.text === sentence
    && reduced.cursorContent === 'none'
    && reducedFirstFrame.equals(reducedSecondFrame),
  baseUrl,
  errors,
  animatedFramesChanged: !firstFrame.equals(secondFrame),
  staticPrefixPreserved: deletingText.startsWith(sentence.slice(0, sentence.lastIndexOf('people and society'))),
  reservedBoxStable: sameBox,
  initialBox,
  rotatedBox,
  reducedMotion: {
    ...reduced,
    framesChanged: !reducedFirstFrame.equals(reducedSecondFrame),
  },
};

await normalContext.close();
await reducedContext.close();
await browser.close();
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
