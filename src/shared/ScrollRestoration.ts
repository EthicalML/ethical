// Reload scroll is restored pre-paint by the inline veil script in BaseLayout's head,
// which reads history.state and holds the body invisible until it can jump. This module
// only has to keep that state fresh (below) — the router itself persists scroll on
// scrollend alone, which goes stale, and restores it post-paint, which flickers.

// The router only persists scroll into history.state on scrollend, so a refresh within
// ~a second of moving restores the stale previous position. Keep the state fresh with a
// short trailing write, and flush on pagehide so reloads land exactly where the user is.
{
  const write = () => {
    if (history.state) history.replaceState({ ...history.state, scrollX, scrollY }, '');
  };
  let timer = 0;
  addEventListener(
    'scroll',
    () => {
      clearTimeout(timer);
      timer = window.setTimeout(write, 150);
    },
    { passive: true },
  );
  addEventListener('pagehide', write);
  // A write armed just before a navigation would land after the router pushes the new
  // entry and stamp the old page's offset into it; drop it when a navigation starts.
  document.addEventListener('astro:before-preparation', () => clearTimeout(timer));
}

document.addEventListener('astro:before-swap', (event) => {
  if (event.navigationType !== 'traverse') {
    const targetId = decodeURIComponent(event.to.hash.slice(1));
    if (!targetId) {
      // Firefox fires a browser-internal scroll on the fresh page right after the swap
      // (tens of px, after the router's own scrollTo(0,0)), which lands after the
      // view-transition snapshot and makes morphs arrive offset. Pin the page to the
      // top until the transition settles.
      document.addEventListener(
        'astro:after-swap',
        () => {
          const pin = () => window.scrollTo({ left: 0, top: 0, behavior: 'instant' });
          pin();
          if (!event.viewTransition) return;
          addEventListener('scroll', pin);
          void event.viewTransition.finished.finally(() => removeEventListener('scroll', pin));
        },
        { once: true },
      );
      return;
    }
    document.addEventListener(
      'astro:after-swap',
      () => {
        const target = document.getElementById(targetId);
        if (!target) return;
        const scrollToTarget = () => {
          target.scrollIntoView({ behavior: 'instant', block: 'center' });
        };
        scrollToTarget();
        requestAnimationFrame(scrollToTarget);
        void event.viewTransition.finished.then(scrollToTarget);
      },
      { once: true },
    );
    return;
  }

  const swap = event.swap;
  const { scrollX = 0, scrollY = 0 } = history.state ?? {};
  const scrollBehavior = document.documentElement.style.scrollBehavior;
  document.addEventListener(
    'astro:after-swap',
    () => {
      document.documentElement.style.scrollBehavior = scrollBehavior;
    },
    { once: true },
  );
  event.swap = () => {
    swap();
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
  };
});
