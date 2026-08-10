import playwright from './playwright.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { applyTheme, parseThemeArgs, themeOutputPath } from './theme.mjs';

const { chromium } = playwright;
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
const baseUrl = process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:4126';
// Dark keeps `out/<width>/` so the committed dark baseline stays comparable;
// every other theme gets its own tree and can never overwrite it.
const outputDir = new URL(`${themeOutputPath(theme, viewportWidth)}/`, import.meta.url);

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
  colorScheme: theme,
});
await applyTheme(context, theme);

// Photograph this build, not the internet. The pages legitimately pull remote
// artwork and an embedded player, which makes the sweep depend on hosts the
// gate has no business testing: they are slow or unreachable from a runner, so
// the page never reaches networkidle, and their content changes under us, so a
// diff can appear with no commit behind it. Both sides of a parity run are
// captured by this same code, so blocking is symmetric and what remains is
// exactly the output we produced.
let blocked = 0;
await context.route('**/*', (route) => {
  const host = new URL(route.request().url()).hostname;
  if (host === '127.0.0.1' || host === 'localhost') return route.continue();
  blocked += 1;
  return route.abort();
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
  // The mask stands in for every canvas, so it has to be the active theme's
  // page background or a light capture gets dark rectangles.
  const maskColor = await page.evaluate(
    () => getComputedStyle(document.documentElement).getPropertyValue('--bg-base').trim() || null,
  );
  if (!maskColor) throw new Error(`--bg-base did not resolve on ${route}`);
  await page.screenshot({
    path: path.pathname,
    fullPage: true,
    animations: 'disabled',
    mask: await page.locator('canvas').all(),
    maskColor,
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
console.log(
  JSON.stringify({ theme, output: outputDir.pathname, blocked, routes: manifest }, null, 2),
);
