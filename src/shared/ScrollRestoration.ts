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
