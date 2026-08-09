// First paint belongs to the inline script in BaseLayout's <head>; this module owns
// everything after it — the router's attribute wipe, the header control's state, and
// the flip itself.
//
// The key must match the one the inline script and the verification harness use.
const STORAGE_KEY = 'theme';

const stored = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // Safari private mode throws on any storage access.
    return null;
  }
};

const current = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

// SiteHeader carries `transition:persist`, so the control's DOM node outlives the root
// element's attributes. Deriving its pressed state from the live attribute rather than
// tracking it separately is what keeps the two from drifting apart.
const sync = () => {
  const pressed = String(current() === 'light');
  document
    .querySelectorAll<HTMLElement>('[data-theme-toggle]')
    .forEach((button) => button.setAttribute('aria-pressed', pressed));
};

const apply = (theme: string) => {
  const root = document.documentElement;
  if (root.dataset.theme !== theme) {
    root.classList.add('is-theme-switching');
    root.dataset.theme = theme;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove('is-theme-switching')),
    );
  }
  sync();
};

// ClientRouter swaps in the incoming document's <html> attributes, which drops
// `data-theme` on every internal navigation — verified: /about/ → / yields null.
// Same shape as Motion's `is-transitioning` re-application.
document.addEventListener('astro:after-swap', () => apply(stored() === 'light' ? 'light' : 'dark'));
document.addEventListener('astro:page-load', sync);

// Delegated, so the handler survives the persisted header being moved between documents
// and never double-binds.
document.addEventListener('click', (event) => {
  const target =
    event.target instanceof Element ? event.target.closest('[data-theme-toggle]') : null;
  if (!target) return;
  const next = current() === 'light' ? 'dark' : 'light';
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // An unwritable store still gets the flip; it just will not outlive the page.
  }
  apply(next);
});

sync();
