document.addEventListener('astro:before-preparation', (event) => {
  if (!(event.sourceElement instanceof HTMLElement)) return;
  const direction = event.sourceElement.dataset.transitionDirection;
  if (direction === 'back' || direction === 'forward') event.direction = direction;
});
