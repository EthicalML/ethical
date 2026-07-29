document.addEventListener('astro:before-swap', (event) => {
  if (event.navigationType !== 'traverse') return;

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
