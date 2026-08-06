export interface CanvasPointer {
  x: number;
  y: number;
}

export type CanvasDraw = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsedSeconds: number,
  pointer: CanvasPointer,
) => void;

export class CanvasEngine {
  private active = true;
  private animationFrame = 0;
  private controller = new AbortController();
  private context: CanvasRenderingContext2D;
  private height = 0;
  private intersectionObserver: IntersectionObserver;
  private elapsedSeconds = 0;
  private lastFrameAt?: number;
  private lastPointer?: CanvasPointer;
  private playing = true;
  private pointer: CanvasPointer = { x: 0.5, y: 0.5 };
  private pointerTarget: CanvasPointer = { x: 0.5, y: 0.5 };
  private reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private resizeObserver: ResizeObserver;
  private width = 0;

  constructor(
    private canvas: HTMLCanvasElement,
    private drawFrame: CanvasDraw,
  ) {
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D context is unavailable.');
    this.context = context;

    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.intersectionObserver = new IntersectionObserver(this.handleIntersection);
    this.canvas.addEventListener('pointerenter', this.handlePointerEnter, {
      signal: this.controller.signal,
    });
    this.canvas.addEventListener('pointermove', this.handlePointerMove, {
      signal: this.controller.signal,
    });
    this.fit();
    this.drawFrame(this.context, this.width, this.height, 0, this.pointer);
    this.resizeObserver.observe(this.canvas);
    this.intersectionObserver.observe(this.canvas);
    if (!this.reducedMotion) this.animationFrame = requestAnimationFrame(this.frame);
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);
    this.controller.abort();
    this.intersectionObserver.disconnect();
    this.resizeObserver.disconnect();
  }

  redraw() {
    this.drawFrame(this.context, this.width, this.height, this.elapsedSeconds, this.pointer);
  }

  setPlaying(playing: boolean) {
    if (this.reducedMotion || playing === this.playing) return;
    this.playing = playing;
    this.lastFrameAt = undefined;
    cancelAnimationFrame(this.animationFrame);
    if (playing && this.active) this.animationFrame = requestAnimationFrame(this.frame);
  }

  private fit() {
    const bounds = this.canvas.getBoundingClientRect();
    const density = Math.min(devicePixelRatio || 1, 1.5);
    this.width = bounds.width;
    this.height = bounds.height;
    this.canvas.width = Math.max(1, Math.round(this.width * density));
    this.canvas.height = Math.max(1, Math.round(this.height * density));
    this.context.setTransform(density, 0, 0, density, 0, 0);
  }

  private frame = (now: number) => {
    if (this.lastFrameAt !== undefined)
      this.elapsedSeconds += Math.min(0.05, (now - this.lastFrameAt) / 1000);
    this.lastFrameAt = now;
    this.pointer.x += (this.pointerTarget.x - this.pointer.x) * 0.12;
    this.pointer.y += (this.pointerTarget.y - this.pointer.y) * 0.12;
    this.drawFrame(this.context, this.width, this.height, this.elapsedSeconds, this.pointer);
    if (this.active && this.playing && !this.reducedMotion) {
      this.animationFrame = requestAnimationFrame(this.frame);
    }
  };

  private handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
    const nextActive = entry.isIntersecting;
    if (nextActive && !this.active) {
      this.active = true;
      this.lastFrameAt = undefined;
      if (this.playing) this.animationFrame = requestAnimationFrame(this.frame);
    }
    this.active = nextActive;
    if (!nextActive) cancelAnimationFrame(this.animationFrame);
  };

  private handlePointerEnter = (event: PointerEvent) => {
    this.lastPointer = { x: event.clientX, y: event.clientY };
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (!this.lastPointer) {
      this.handlePointerEnter(event);
      return;
    }
    const bounds = this.canvas.getBoundingClientRect();
    const deltaX = (event.clientX - this.lastPointer.x) / bounds.width;
    const deltaY = (event.clientY - this.lastPointer.y) / bounds.height;
    this.pointerTarget.x = Math.max(0, Math.min(1, this.pointerTarget.x + deltaX));
    this.pointerTarget.y = Math.max(0, Math.min(1, this.pointerTarget.y + deltaY));
    this.lastPointer = { x: event.clientX, y: event.clientY };
  };

  private handleResize = () => {
    this.fit();
    this.redraw();
  };
}
