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
  private context: CanvasRenderingContext2D;
  private height = 0;
  private intersectionObserver: IntersectionObserver;
  private pointer: CanvasPointer = { x: 0.5, y: 0.5 };
  private reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private resizeObserver: ResizeObserver;
  private startedAt = performance.now();
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
    this.canvas.addEventListener('pointermove', this.handlePointerMove);
    this.fit();
    this.drawFrame(this.context, this.width, this.height, 0, this.pointer);
    this.resizeObserver.observe(this.canvas);
    this.intersectionObserver.observe(this.canvas);
    if (!this.reducedMotion) this.animationFrame = requestAnimationFrame(this.frame);
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.intersectionObserver.disconnect();
    this.resizeObserver.disconnect();
  }

  redraw() {
    this.drawFrame(
      this.context,
      this.width,
      this.height,
      (performance.now() - this.startedAt) / 1000,
      this.pointer,
    );
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
    this.drawFrame(
      this.context,
      this.width,
      this.height,
      (now - this.startedAt) / 1000,
      this.pointer,
    );
    if (this.active && !this.reducedMotion) {
      this.animationFrame = requestAnimationFrame(this.frame);
    }
  };

  private handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
    const nextActive = entry.isIntersecting;
    if (nextActive && !this.active) {
      this.active = true;
      this.startedAt = performance.now();
      this.animationFrame = requestAnimationFrame(this.frame);
    }
    this.active = nextActive;
    if (!nextActive) cancelAnimationFrame(this.animationFrame);
  };

  private handlePointerMove = (event: PointerEvent) => {
    const bounds = this.canvas.getBoundingClientRect();
    this.pointer.x = (event.clientX - bounds.left) / bounds.width;
    this.pointer.y = (event.clientY - bounds.top) / bounds.height;
  };

  private handleResize = () => {
    this.fit();
    this.drawFrame(this.context, this.width, this.height, 0, this.pointer);
  };
}
