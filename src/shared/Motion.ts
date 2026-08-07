document.addEventListener('astro:before-preparation', (event) => {
  if (!(event.sourceElement instanceof HTMLElement)) return;
  const direction = event.sourceElement.dataset.transitionDirection;
  if (direction === 'back' || direction === 'forward') event.direction = direction;
});

// Translucent chrome is opaque for the duration of a navigation. A backdrop
// filter cannot blur a sibling snapshot, so page content sliding beneath the
// header would otherwise read straight through it. The class is applied twice
// because the swap replaces the root element's attributes: once before the old
// state is captured, and again after the swap, before the new one is.
document.addEventListener('astro:before-preparation', () => {
  document.documentElement.classList.add('is-transitioning');
});
document.addEventListener('astro:after-swap', () => {
  document.documentElement.classList.add('is-transitioning');
});
document.addEventListener('astro:page-load', () => {
  document.documentElement.classList.remove('is-transitioning');
});
