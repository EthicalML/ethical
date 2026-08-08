type StepValue = number | (() => number);

interface LoopingTimelineOptions {
  lastStep: StepValue;
  duration: number;
  staticStep?: StepValue;
  restartAtEnd?: boolean;
  render: (step: number) => void;
}

export class LoopingTimeline {
  private controller = new AbortController();
  private timer = 0;
  private step = 0;
  private windowElement: HTMLElement | null = null;

  constructor(
    private readonly host: HTMLElement,
    private readonly options: LoopingTimelineOptions,
  ) {}

  connect() {
    this.controller = new AbortController();
    this.windowElement = this.host.closest<HTMLElement>('animation-window');
    if (!this.windowElement) return;

    this.windowElement.addEventListener('animationwindow:play', () => this.play(), {
      signal: this.controller.signal,
    });
    this.windowElement.addEventListener('animationwindow:pause', () => this.pause(), {
      signal: this.controller.signal,
    });
    this.render();
    if (this.windowElement.dataset.playing === 'true') this.play();
  }

  disconnect() {
    this.controller.abort();
    this.pause();
    this.windowElement = null;
  }

  reset(step = 0) {
    this.step = step;
    this.render();
    if (this.windowElement?.dataset.playing === 'true') this.play();
  }

  private play() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lastStep = this.value(this.options.lastStep);
    if (this.options.restartAtEnd !== false && this.step >= lastStep) this.step = 0;
    this.render();
    this.scheduleNext();
  }

  private pause() {
    window.clearTimeout(this.timer);
  }

  private scheduleNext() {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      const lastStep = this.value(this.options.lastStep);
      this.step = this.step >= lastStep ? 0 : this.step + 1;
      this.render();
      this.scheduleNext();
    }, this.options.duration);
  }

  private render() {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = reduced ? this.value(this.options.staticStep ?? 0) : this.step;
    this.options.render(step);
  }

  private value(value: StepValue) {
    return typeof value === 'function' ? value() : value;
  }
}
