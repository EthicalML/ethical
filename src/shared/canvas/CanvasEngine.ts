export interface CanvasPointer {
  x: number;
  y: number;
}

/* ---------------------------------------------------------------------------
   Canvas palette

   Canvas paints outside the cascade, so a `data-theme` flip is invisible to it.
   The palette is the bridge: a handful of semantic slots, resolved once per
   theme (never per frame — `getComputedStyle` in a 60fps loop is a trap) and
   handed to every draw call.

   Slots are RGB triplets, not formatted strings, because most call sites
   compose their own alpha (`rgba(${accent},${pulse})`). Use `rgba()`/`rgbCss()`
   to format at draw time.

   The two tables below are the fallback rather than the source of truth: the
   dark column is a byte-exact copy of the literals these modules shipped with,
   so dark stays pixel-identical even with no stylesheet. Where the equivalent
   token resolves — `--accent`, `--accent-ink`, `--shadow-hard` and
   `--canvas-surface-{1,2,3}` — the CSS wins, so a brand override or a palette
   retune flows through without a code change.
--------------------------------------------------------------------------- */

export type Rgb = readonly [number, number, number];

export interface CanvasPalette {
  /** True when `data-theme="light"` is set on the document element. */
  light: boolean;
  /** Brand green as a fill. Unchanged across themes. */
  accent: Rgb;
  /** Brand green as text/stroke. Darkens under light so glyphs stay legible. */
  accentInk: Rgb;
  /** Primary foreground. */
  ink: Rgb;
  /** Very low-alpha separator wash. White on dark, ink on light. */
  wash: Rgb;
  /** Page background the canvas sits on. */
  base: Rgb;
  /** Raised face. */
  panel: Rgb;
  /** Recessed face — node interiors, plate fills. */
  inset: Rgb;
  /** Hard occlusion outline. */
  shadow: Rgb;
  /**
   * The three lit faces of an isometric solid: top, right, left. `inset` is one
   * surface and cannot express three, and the ordering inverts between themes —
   * the darkest faces under dark, the lightest under light.
   */
  surface: readonly [Rgb, Rgb, Rgb];
}

const DARK: CanvasPalette = {
  light: false,
  accent: [94, 230, 160],
  accentInk: [94, 230, 160],
  ink: [244, 242, 238],
  wash: [255, 255, 255],
  base: [19, 20, 20],
  panel: [23, 24, 24],
  inset: [15, 16, 15],
  shadow: [0, 0, 0],
  surface: [
    [16, 19, 17],
    [11, 13, 12],
    [8, 10, 9],
  ],
};

const LIGHT: CanvasPalette = {
  light: true,
  accent: [94, 230, 160],
  accentInk: [18, 103, 59],
  ink: [25, 24, 20],
  wash: [25, 24, 20],
  base: [244, 242, 238],
  panel: [251, 250, 247],
  inset: [232, 229, 222],
  shadow: [25, 24, 20],
  surface: [
    [246, 246, 243],
    [238, 239, 235],
    [228, 230, 225],
  ],
};

export const rgba = (color: Rgb, alpha: number) =>
  `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;

export const rgbCss = (color: Rgb) => `rgb(${color[0]},${color[1]},${color[2]})`;

export const mixRgb = (from: Rgb, to: Rgb, t: number): Rgb => [
  Math.round(from[0] + (to[0] - from[0]) * t),
  Math.round(from[1] + (to[1] - from[1]) * t),
  Math.round(from[2] + (to[2] - from[2]) * t),
];

// Accepts `#rgb`, `#rrggbb` and `rgb()`/`rgba()`; returns undefined for anything else.
const parseRgb = (value: string): Rgb | undefined => {
  const text = value.trim();
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text);
  if (hex) {
    const digits =
      hex[1].length === 3
        ? hex[1]
            .split('')
            .map((character) => character + character)
            .join('')
        : hex[1];
    return [
      Number.parseInt(digits.slice(0, 2), 16),
      Number.parseInt(digits.slice(2, 4), 16),
      Number.parseInt(digits.slice(4, 6), 16),
    ];
  }
  const parts = /^rgba?\(([^)]+)\)$/i.exec(text);
  if (!parts) return undefined;
  const numbers = parts[1]
    .split(/[\s,/]+/)
    .filter(Boolean)
    .map(Number);
  if (numbers.length < 3 || numbers.slice(0, 3).some(Number.isNaN)) return undefined;
  return [numbers[0], numbers[1], numbers[2]];
};

let cachedPalette: CanvasPalette | undefined;
let cachedTheme: string | undefined;
const themeListeners = new Set<() => void>();

const currentTheme = () =>
  (typeof document === 'undefined' ? '' : document.documentElement.dataset.theme) ?? '';

/** Resolved palette for the active theme. Cached until `data-theme` changes. */
export const getPalette = (): CanvasPalette => {
  const theme = currentTheme();
  if (cachedPalette && cachedTheme === theme) return cachedPalette;
  const table = theme === 'light' ? LIGHT : DARK;
  const palette = { ...table };
  if (typeof document !== 'undefined') {
    const styles = getComputedStyle(document.documentElement);
    const accent = parseRgb(styles.getPropertyValue('--accent'));
    if (accent) {
      palette.accent = accent;
      palette.accentInk = accent;
    }
    const accentInk = parseRgb(styles.getPropertyValue('--accent-ink'));
    if (accentInk) palette.accentInk = accentInk;
    const shadow = parseRgb(styles.getPropertyValue('--shadow-hard'));
    if (shadow) palette.shadow = shadow;
    const surface = ([1, 2, 3] as const).map((step) =>
      parseRgb(styles.getPropertyValue(`--canvas-surface-${step}`)),
    );
    if (surface.every(Boolean)) palette.surface = surface as unknown as readonly [Rgb, Rgb, Rgb];
  }
  cachedPalette = palette;
  cachedTheme = theme;
  return palette;
};

/**
 * Subscribe to theme changes. Every canvas must repaint (and any cached bitmap
 * must be discarded) when this fires. Returns an unsubscribe function.
 */
export const onThemeChange = (listener: () => void) => {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
};

if (typeof document !== 'undefined') {
  new MutationObserver(() => {
    if (currentTheme() === cachedTheme) return;
    cachedPalette = undefined;
    themeListeners.forEach((listener) => listener());
  }).observe(document.documentElement, {
    attributeFilter: ['data-theme'],
  });
}

export type CanvasDraw = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsedSeconds: number,
  pointer: CanvasPointer,
  palette: CanvasPalette,
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
  private unsubscribeTheme: () => void;
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
    this.unsubscribeTheme = onThemeChange(this.handleThemeChange);
    this.fit();
    this.drawFrame(this.context, this.width, this.height, 0, this.pointer, getPalette());
    this.resizeObserver.observe(this.canvas);
    this.intersectionObserver.observe(this.canvas);
    if (!this.reducedMotion) this.animationFrame = requestAnimationFrame(this.frame);
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);
    this.controller.abort();
    this.intersectionObserver.disconnect();
    this.resizeObserver.disconnect();
    this.unsubscribeTheme();
  }

  redraw() {
    this.drawFrame(
      this.context,
      this.width,
      this.height,
      this.elapsedSeconds,
      this.pointer,
      getPalette(),
    );
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
    this.drawFrame(
      this.context,
      this.width,
      this.height,
      this.elapsedSeconds,
      this.pointer,
      getPalette(),
    );
    if (this.active && this.playing && !this.reducedMotion) {
      this.animationFrame = requestAnimationFrame(this.frame);
    }
  };

  // Paused, off-screen and reduced-motion canvases still hold a stale-theme
  // bitmap, so the repaint is unconditional rather than left to the rAF loop.
  private handleThemeChange = () => {
    this.redraw();
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
