document.addEventListener('astro:before-preparation', (event) => {
  if (!(event.sourceElement instanceof HTMLElement)) return;
  const direction = event.sourceElement.dataset.transitionDirection;
  if (direction === 'back' || direction === 'forward') event.direction = direction;
});

document.addEventListener('astro:after-swap', () => {
  const glitch = document.querySelector<HTMLElement>('h1.glitch, h1 .glitch');
  if (!glitch) return;

  glitch.classList.add('glitch-burst');
  glitch.addEventListener('animationend', () => glitch.classList.remove('glitch-burst'), {
    once: true,
  });
});
