// Shared theme plumbing for the browser gates.
//
// Playwright's default `colorScheme` is light, and no gate used to pin it. The
// moment the site gains a `prefers-color-scheme` fallback that omission would
// have made the stored dark baselines silently start capturing light, so every
// gate now pins the scheme explicitly even when it asks for dark.
//
// A naive init script that calls `document.documentElement.setAttribute` fails
// silently: init scripts run at document-start, when `documentElement` is still
// null, and the throw skips the rest of the script. Seed `localStorage` (the
// production-faithful path, read by the site's own pre-paint script) and apply
// the attribute from a MutationObserver only as a fallback, so a light capture
// works before the toggle ships and never fights the site once it does.

export const THEMES = ['dark', 'light'];
export const DEFAULT_THEME = 'dark';
export const THEME_STORAGE_KEY = 'theme';

/**
 * Pulls `--theme <value>` / `--theme=<value>` out of an argument list.
 * Returns the resolved theme and the remaining arguments.
 */
export function parseThemeArgs(args) {
  const rest = [];
  let theme = process.env.VERIFY_THEME ?? DEFAULT_THEME;
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--theme') {
      theme = args[index + 1];
      index += 1;
    } else if (args[index].startsWith('--theme=')) {
      theme = args[index].slice('--theme='.length);
    } else {
      rest.push(args[index]);
    }
  }
  if (!THEMES.includes(theme)) {
    throw new Error(`Invalid theme "${theme}"; use one of ${THEMES.join(', ')}`);
  }
  return { theme, rest };
}

/** Seeds the stored preference and pins the emulated OS colour scheme. */
export async function applyTheme(context, theme) {
  await context.addInitScript(
    ({ theme, key }) => {
      try {
        localStorage.setItem(key, theme);
      } catch {
        // Private-mode storage failures must not abort the rest of the seed.
      }
      const claim = (force) => {
        const root = document.documentElement;
        if (!root) return false;
        if (force || !root.hasAttribute('data-theme')) root.setAttribute('data-theme', theme);
        return true;
      };
      if (!claim(false)) {
        const observer = new MutationObserver(() => {
          if (claim(false)) observer.disconnect();
        });
        observer.observe(document, { childList: true, subtree: true });
      }
      // Astro's ClientRouter swaps `<html>` attributes from the incoming
      // document, which drops `data-theme` on every client-side navigation.
      document.addEventListener('astro:after-swap', () => claim(true));
    },
    { theme, key: THEME_STORAGE_KEY },
  );
  if (typeof context.emulateMedia === 'function')
    await context.emulateMedia({ colorScheme: theme });
}

/**
 * Resolves CSS custom properties to the same normalised `rgb()`/`rgba()` string
 * `getComputedStyle` reports, so colour assertions can name the token they mean
 * instead of baking one theme's literal. Unset tokens resolve to `null`.
 */
export async function readTokenColors(page, names) {
  return page.evaluate((tokenNames) => {
    const root = getComputedStyle(document.documentElement);
    const resolved = {};
    for (const name of tokenNames) {
      if (!root.getPropertyValue(name).trim()) {
        resolved[name] = null;
        continue;
      }
      const probe = document.createElement('span');
      probe.style.color = `var(${name})`;
      document.body.append(probe);
      resolved[name] = getComputedStyle(probe).color;
      probe.remove();
    }
    return resolved;
  }, names);
}

/** Channel triple of a normalised colour string, ignoring alpha. */
export function colorChannels(color) {
  const parts = String(color).match(/[\d.]+/g);
  return parts ? parts.slice(0, 3).map(Number) : null;
}

/** True when two colours share an RGB hue and differ only in alpha. */
export function sameHue(left, right) {
  const a = colorChannels(left);
  const b = colorChannels(right);
  return Boolean(a && b && a.every((value, index) => value === b[index]));
}

/** Alpha of a normalised colour string; opaque colours report 1. */
export function colorAlpha(color) {
  const parts = String(color).match(/[\d.]+/g);
  return parts && parts.length > 3 ? Number(parts[3]) : 1;
}

/** Screenshot/report output directory for a theme, preserving the dark paths. */
export function themeOutputPath(theme, suffix) {
  return theme === DEFAULT_THEME ? `./out/${suffix}` : `./out/${theme}/${suffix}`;
}
