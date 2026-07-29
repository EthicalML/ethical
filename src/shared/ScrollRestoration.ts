document.addEventListener('astro:before-swap', (event) => {
  if (event.navigationType !== 'traverse') {
    const targetId = decodeURIComponent(event.to.hash.slice(1));
    if (!targetId) return;
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
