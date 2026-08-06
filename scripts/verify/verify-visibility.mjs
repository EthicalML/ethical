import playwright from '/Users/asaucedo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js';
import { mkdir, writeFile } from 'node:fs/promises';

const { chromium } = playwright;
const baseUrl = process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:4126';
const outputDirectory = new URL('../../tmp2/', import.meta.url);
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
});
const page = await context.newPage();
const errors = [];

page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`);
});

await mkdir(outputDirectory, { recursive: true });
await page.goto(new URL('/', baseUrl).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const capture = async (screenshotName) => {
  const metrics = await page.evaluate(() => {
    const canvas = document.querySelector('.hero-canvas');
    const typewriter = document.querySelector('type-writer .hero-subtitle');
    const glitch = document.querySelector('.glitch');
    const canvasRect = canvas.getBoundingClientRect();
    const contextTransform = canvas.getContext('2d').getTransform();
    const elementMetrics = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        fontSize: style.fontSize,
        transform: style.transform,
        width: rect.width,
        height: rect.height,
      };
    };

    return {
      canvas: {
        backingWidth: canvas.width,
        backingHeight: canvas.height,
        cssWidth: canvasRect.width,
        cssHeight: canvasRect.height,
        transform: {
          a: contextTransform.a,
          b: contextTransform.b,
          c: contextTransform.c,
          d: contextTransform.d,
          e: contextTransform.e,
          f: contextTransform.f,
        },
      },
      typewriter: elementMetrics(typewriter),
      glitch: elementMetrics(glitch),
    };
  });
  const screenshot = await page.locator('.hero-canvas').screenshot({
    path: new URL(screenshotName, outputDirectory).pathname,
  });
  return { metrics, screenshot };
};

const before = await capture('visibility-before.png');
const tabVisibilityStates = [];
const otherPage = await context.newPage();
await otherPage.goto('data:text/html,<title>Visibility test tab</title>');
for (let index = 0; index < 5; index += 1) {
  await otherPage.bringToFront();
  tabVisibilityStates.push(await page.evaluate(() => document.visibilityState));
  await page.bringToFront();
  tabVisibilityStates.push(await page.evaluate(() => document.visibilityState));
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForTimeout(50);
}
const after = await capture('visibility-after.png');

const result = {
  passed:
    errors.length === 0 &&
    JSON.stringify(before.metrics) === JSON.stringify(after.metrics) &&
    before.screenshot.equals(after.screenshot),
  baseUrl,
  toggles: 5,
  tabVisibilityStates,
  syntheticVisibilityCycles: 5,
  errors,
  dimensionsAndStylesIdentical: JSON.stringify(before.metrics) === JSON.stringify(after.metrics),
  renderedCanvasIdentical: before.screenshot.equals(after.screenshot),
  before: before.metrics,
  after: after.metrics,
};

await writeFile(
  new URL('visibility-toggle.json', outputDirectory),
  `${JSON.stringify(result, null, 2)}\n`,
);
await context.close();
await browser.close();
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
