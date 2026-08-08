// Playwright is deliberately not a repository dependency: it pulls a browser
// download that every `npm ci` on the site would pay for, and only the browser
// gates need it. It is therefore resolved at run time from whichever of the two
// places it actually lives:
//
//   - `node_modules`, when a caller has installed it (CI does, with a pinned
//     version, so the gate runs against a known browser);
//   - the local npx cache the harness has always been driven from, or whatever
//     `PLAYWRIGHT_MODULE` points at.
//
// Only a genuine "not installed" resolution failure falls through to the
// fallback; any other import error is rethrown, so a broken installation
// reports itself instead of masquerading as a missing one.

const FALLBACK_MODULE =
  process.env.PLAYWRIGHT_MODULE ??
  '/Users/asaucedo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js';

const load = async () => {
  try {
    return await import('playwright');
  } catch (error) {
    if (error?.code !== 'ERR_MODULE_NOT_FOUND') throw error;
    try {
      return await import(FALLBACK_MODULE);
    } catch (fallbackError) {
      if (fallbackError?.code !== 'ERR_MODULE_NOT_FOUND') throw fallbackError;
      throw new Error(
        `Playwright not found. Install it (npm i --no-save playwright@<version>) or point ` +
          `PLAYWRIGHT_MODULE at an installation; tried "playwright" and "${FALLBACK_MODULE}".`,
        { cause: fallbackError },
      );
    }
  }
};

const resolved = await load();
const playwright = resolved.default ?? resolved;

export default playwright;
export const { chromium, firefox, webkit, devices } = playwright;
