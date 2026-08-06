import playwright from '/Users/asaucedo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

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
const baseUrl = process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:4126';
const outputDir = new URL(`./out/${viewportWidth}/`, import.meta.url);

if (!Number.isFinite(viewportWidth) || !Number.isFinite(viewportHeight)) {
  throw new Error(`Invalid viewport "${viewportValue}"; use WIDTH or WIDTHxHEIGHT`);
}
if (routes.length === 0) {
  routes.push(...JSON.parse(await readFile(new URL('./routes.json', import.meta.url), 'utf8')));
}

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: viewportWidth, height: viewportHeight },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
});
const manifest = {};

for (const route of routes) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });

  const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: 'networkidle' });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        caret-color: transparent !important;
        transition: none !important;
      }
      html { scroll-behavior: auto !important; }
    `,
  });

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let top = 0; top < height; top += 700) {
    await page.evaluate((nextTop) => scrollTo(0, nextTop), top);
    await page.waitForTimeout(30);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(150);

  const name = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replaceAll('/', '--');
  const path = new URL(`${name}.png`, outputDir);
  await page.screenshot({
    path: path.pathname,
    fullPage: true,
    animations: 'disabled',
    mask: await page.locator('canvas').all(),
    maskColor: '#131414',
  });

  manifest[name] = {
    route,
    status: response?.status() ?? 0,
    width: await page.evaluate(() => document.documentElement.scrollWidth),
    height: await page.evaluate(() => document.documentElement.scrollHeight),
    errors,
  };
  await page.close();
}

await writeFile(new URL('manifest.json', outputDir), `${JSON.stringify(manifest, null, 2)}\n`);
await browser.close();
console.log(JSON.stringify({ output: outputDir.pathname, routes: manifest }, null, 2));
