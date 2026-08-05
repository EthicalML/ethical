// Global reveal trigger: every [data-reveal] element fires once REVEAL_RATIO of
// it is visible; an element too tall for that (its share would exceed the viewport
// share below) fires once TALL_REVEAL_VH of the viewport is filled by it. A
// threshold that the remaining page can never reach fires while the element is
// visible, so nothing at the foot of a short page stays hidden.
// `data-reveal="trigger"` elements receive only the timing signal
// (dataset.revealed plus a `reveal:visible` event) without the fade styling;
// components with bespoke entrances consume the signal via `onRevealed`.
const REVEAL_RATIO = 0.45;
const TALL_REVEAL_VH = 0.45;

export const onRevealed = (element: HTMLElement, callback: () => void, signal: AbortSignal) => {
  if (element.dataset.revealed === '1') {
    callback();
    return;
  }
  element.addEventListener('reveal:visible', () => callback(), { once: true, signal });
};

export class Reveal {
  private controller = new AbortController();
  private queued = false;
  private targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

  constructor() {
    if (!this.targets.length) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.targets.forEach((target) => {
        target.dataset.revealed = '1';
      });
      return;
    }

    this.targets.forEach((target, index) => {
      if (target.dataset.reveal === 'trigger') return;
      target.style.opacity = '0';
      target.style.transform = 'translateY(26px)';
      const delay = (index % 2) * 0.05;
      target.style.transition = `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}s, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}s`;
    });

    const options = { passive: true, signal: this.controller.signal };
    addEventListener('scroll', this.requestSweep, options);
    addEventListener('scrollend', this.requestSweep, { signal: this.controller.signal });
    addEventListener('resize', this.requestSweep, { signal: this.controller.signal });
    requestAnimationFrame(this.sweep);
  }

  destroy() {
    this.controller.abort();
  }

  private requestSweep = () => {
    if (this.queued) return;
    this.queued = true;
    requestAnimationFrame(this.sweep);
  };

  private reveal(target: HTMLElement) {
    if (target.dataset.revealed === '1') return;
    target.dataset.revealed = '1';
    if (target.dataset.reveal !== 'trigger') {
      target.style.opacity = '1';
      target.style.transform = 'none';
    }
    target.dispatchEvent(new CustomEvent('reveal:visible'));
  }

  private sweep = () => {
    this.queued = false;
    const atBottom = scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
    const scroller = document.scrollingElement;
    const remaining = scroller
      ? Math.max(0, scroller.scrollHeight - innerHeight - scroller.scrollTop)
      : 0;
    this.targets.forEach((target) => {
      if (target.dataset.revealed === '1') return;
      const rect = target.getBoundingClientRect();
      const needed = Math.min(rect.height * REVEAL_RATIO, innerHeight * TALL_REVEAL_VH);
      const visible = Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0);
      if (atBottom || visible >= needed) {
        this.reveal(target);
        return;
      }
      if (visible <= 0) return;
      // Unreachable threshold: even at the best remaining scroll position the
      // element can never show `needed` pixels (foot of a short page) — fire now.
      const bestScroll = Math.min(Math.max(rect.top, 0), remaining);
      const bestVisible =
        Math.min(rect.bottom - bestScroll, innerHeight) - Math.max(rect.top - bestScroll, 0);
      if (bestVisible < needed) this.reveal(target);
    });
  };
}

let reveal = new Reveal();

document.addEventListener('astro:before-swap', () => {
  reveal.destroy();
});

document.addEventListener('astro:after-swap', () => {
  reveal = new Reveal();
});
