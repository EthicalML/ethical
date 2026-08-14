// Global reveal trigger: every [data-reveal] element fires once the smaller of
// REVEAL_PX pixels or SHORT_REVEAL_RATIO of its own height has entered the
// viewport, so tall sections need a fixed scroll distance and no element ever
// has to be more than 60% on screen to appear. A threshold that the
// remaining page can never reach fires while the element is visible, so
// nothing at the foot of a short page stays hidden.
// `data-reveal="trigger"` elements receive only the timing signal
// (dataset.revealed plus a `reveal:visible` event) without the fade styling;
// components with bespoke entrances consume the signal via `onRevealed`.
const REVEAL_PX = 100;
const SHORT_REVEAL_RATIO = 0.3;

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

  // `settled` skips the entrance for whatever already qualifies at construction.
  // After a client-side navigation the router is already animating the page in
  // (route cross-fade, directional slides, morphs); replaying the reveal rise on
  // top of that reads as a second, competing entrance. Elements still below the
  // threshold keep their normal scroll-triggered reveal.
  constructor(settled = false) {
    if (!this.targets.length) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.targets.forEach((target) => {
        target.dataset.revealed = '1';
      });
      return;
    }

    if (!settled) {
      this.prime();
      this.listen();
      return;
    }

    // The router's scroll (top pin, or the deep-link scroll in
    // ScrollRestoration) is applied by listeners registered after this one, so
    // measuring inline would read the pre-navigation offset. Defer to a
    // microtask: it runs once every `astro:after-swap` listener has had its
    // turn, but still inside the router's view-transition update callback —
    // before the browser captures the new snapshot. Deferring a frame instead
    // (rAF) settles *after* the capture, so every on-screen `[data-reveal]`
    // element is photographed at the inline stylesheet's primed offset and the
    // whole transition plays 26px low, snapping up when the pseudo-elements go.
    queueMicrotask(() => {
      if (this.controller.signal.aborted) return;
      this.sweep();
      this.prime();
      this.listen();
    });
  }

  private prime() {
    this.targets.forEach((target, index) => {
      if (target.dataset.reveal === 'trigger' || target.dataset.revealed === '1') return;
      target.style.opacity = '0';
      target.style.transform = 'translateY(26px)';
      const delay = (index % 2) * 0.05;
      target.style.transition = `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}s, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}s`;
    });
  }

  private listen() {
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
      // An element revealed before it was ever primed has no entrance to play:
      // clearing the transition keeps it from animating from its default state.
      if (!target.style.opacity) target.style.transition = 'none';
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
      // Whichever is smaller: the fixed distance, or 60% of the element's own
      // height. A hard 100px floor for anything taller made elements just over
      // the threshold (a 108px stat band, a 141px marquee) wait until they
      // were almost fully on screen before firing.
      const needed = Math.min(REVEAL_PX, rect.height * SHORT_REVEAL_RATIO);
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
  reveal = new Reveal(true);
});
