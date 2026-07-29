export class Reveal {
  private controller = new AbortController();
  private observer?: IntersectionObserver;
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

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            this.reveal(entry.target as HTMLElement);
            this.observer?.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -8% 0px' },
      );
      this.targets.forEach((target) => this.observer?.observe(target));
    }
  }

  destroy() {
    this.controller.abort();
    this.observer?.disconnect();
  }

  private requestSweep = () => {
    if (this.queued) return;
    this.queued = true;
    requestAnimationFrame(this.sweep);
  };

  private reveal(target: HTMLElement) {
    if (target.dataset.revealed === '1') return;
    target.dataset.revealed = '1';
    target.style.opacity = '1';
    target.style.transform = 'none';
  }

  private sweep = () => {
    this.queued = false;
    const atBottom = scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
    this.targets.forEach((target) => {
      if (target.getBoundingClientRect().top < innerHeight * 0.92 || atBottom) {
        this.reveal(target);
      }
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
