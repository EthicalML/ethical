import {
  CanvasEngine,
  type CanvasPalette,
  type Rgb,
  mixRgb,
  rgba,
  rgbCss,
  surfaceOf,
} from './CanvasEngine';
import { clamp, createIso, type IsoPoint, type IsoProjector } from './IsoKit';

/* The monokai-institute.nvim buffer as an isometric slab: one extruded bar per
   syntax token, a blinking block cursor and a statusline strip along the front
   edge. The buffer idles — bars scintillate on slow staggered timers as if the
   file were being lightly edited — and every twelve seconds or so a vertical
   sweep crosses the slab and repaints it in the next of the theme's three
   colour states, so the artwork demonstrates the thing it advertises.

   Colours here are the colorscheme's own `guifg` values, read off
   `colors/monokai-institute.vim` and `colors/monokai-institute-light.vim`. Like
   the Kompute cube's sticker tones they are the subject rather than semantic
   site colour, so they stay put across themes and cannot become `var()`
   references. Only the ground hairline takes the canvas palette. */

type Role = 'keyword' | 'func' | 'type' | 'string' | 'constant' | 'ident' | 'comment';

interface BufferTheme {
  /** Statusline mode cell, cursor block and sweep front. */
  accent: Rgb;
  /** Slab top face; the two side faces are shaded from it. */
  slab: Rgb;
  /** Line-number gutter bars. */
  gutter: Rgb;
  /** Statusline strip fill and its mono ink. */
  status: Rgb;
  statusInk: Rgb;
  roles: Record<Role, Rgb>;
}

const MONOKAI: BufferTheme = {
  accent: [253, 151, 31],
  slab: [39, 40, 34],
  gutter: [70, 84, 87],
  status: [8, 8, 8],
  statusInk: [255, 255, 255],
  roles: {
    keyword: [249, 38, 114],
    func: [166, 226, 46],
    type: [102, 217, 239],
    string: [230, 219, 116],
    constant: [174, 129, 255],
    ident: [248, 248, 242],
    comment: [117, 113, 94],
  },
};

const INSTITUTE: BufferTheme = {
  accent: [94, 230, 160],
  slab: [8, 9, 8],
  gutter: [70, 84, 87],
  status: [12, 13, 12],
  statusInk: [224, 226, 234],
  roles: {
    keyword: [249, 38, 114],
    func: [166, 226, 46],
    type: [102, 217, 239],
    string: [230, 219, 116],
    constant: [94, 230, 160],
    ident: [224, 226, 234],
    comment: [126, 142, 145],
  },
};

const SAGE: BufferTheme = {
  accent: [5, 98, 89],
  slab: [246, 248, 246],
  gutter: [169, 178, 172],
  status: [231, 238, 233],
  statusInk: [58, 66, 62],
  roles: {
    keyword: [176, 74, 99],
    func: [0, 131, 176],
    type: [106, 90, 158],
    string: [150, 105, 46],
    constant: [12, 127, 94],
    ident: [58, 66, 62],
    comment: [154, 163, 157],
  },
};

/* Sweep order. `TIME_OFFSET` lands a still frame — reduced motion, and the
   engine's first paint — on a settled institute slab rather than mid-sweep. */
const THEMES = [INSTITUTE, SAGE, MONOKAI];
const STATE_SECONDS = 11.4;
const SWEEP_SECONDS = 1.8;
const TIME_OFFSET = SWEEP_SECONDS;

interface Token {
  role: Role;
  /** Width in characters; the row layout converts to grid units. */
  chars: number;
}

interface Line {
  /** Leading indent in characters. */
  indent: number;
  tokens: Token[];
}

const token = (role: Role, chars: number): Token => ({ role, chars });

// A plugin's colorscheme setup, which is what a reader of this panel is about to write.
const LINES: Line[] = [
  { indent: 0, tokens: [token('comment', 24)] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [token('keyword', 5), token('ident', 1), token('constant', 2)] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [token('keyword', 8), token('func', 9), token('ident', 6)] },
  {
    indent: 2,
    tokens: [token('ident', 4), token('ident', 4), token('keyword', 2), token('constant', 2)],
  },
  {
    indent: 2,
    tokens: [token('ident', 5), token('type', 13), token('constant', 4)],
  },
  { indent: 2, tokens: [token('ident', 4), token('func', 11), token('string', 19)] },
  { indent: 0, tokens: [token('keyword', 3)] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [token('keyword', 2), token('ident', 10), token('keyword', 4)] },
  { indent: 2, tokens: [token('ident', 4), token('type', 10), token('string', 7)] },
  { indent: 0, tokens: [token('keyword', 3)] },
  { indent: 0, tokens: [token('keyword', 6), token('ident', 1)] },
];

const CHAR = 0.55;
const GAP = 0.62;
const TEXT_X = -9.6;
const GUTTER_X = -10.9;
const SLAB_X = 11.4;
const ROW_PITCH = 1;
const BAR_DEPTH = 0.3;
const BAR_HEIGHT = 0.2;
const SLAB_TOP = 0.34;
/** Row and column of the block cursor, in buffer coordinates. */
const CURSOR_LINE = 6;
const COS30 = 0.8660254;

const firstZ = -((LINES.length - 1) * ROW_PITCH) / 2;
const zOf = (line: number) => firstZ + line * ROW_PITCH;
const STATUS_Z = zOf(LINES.length - 1) + 1.5;

// Deterministic per-token jitter, so a still frame is always the same still frame.
const noise = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const shade = (color: Rgb, factor: number): Rgb => [
  Math.round(color[0] * factor),
  Math.round(color[1] * factor),
  Math.round(color[2] * factor),
];

const polygon = (context: CanvasRenderingContext2D, points: IsoPoint[], fill: string) => {
  context.beginPath();
  points.forEach(([x, y], index) => (index ? context.lineTo(x, y) : context.moveTo(x, y)));
  context.closePath();
  context.fillStyle = fill;
  context.fill();
};

/* A rectangular extrusion. `drawIsoCube` takes one half-extent for both ground
   axes, and a code line is long in x and thin in z, so the bar has its own
   emitter here rather than a widened cube. */
const drawBar = (
  context: CanvasRenderingContext2D,
  project: IsoProjector,
  x0: number,
  x1: number,
  z: number,
  depth: number,
  base: number,
  height: number,
  color: Rgb,
  edge: string,
) => {
  const top = base + height;
  const t1 = project(x0, top, z - depth);
  const t2 = project(x1, top, z - depth);
  const t3 = project(x1, top, z + depth);
  const t4 = project(x0, top, z + depth);
  const b2 = project(x1, base, z - depth);
  const b3 = project(x1, base, z + depth);
  const b4 = project(x0, base, z + depth);
  polygon(context, [t2, t3, b3, b2], rgbCss(shade(color, 0.6)));
  polygon(context, [t4, t3, b3, b4], rgbCss(shade(color, 0.42)));
  polygon(context, [t1, t2, t3, t4], rgbCss(color));
  context.beginPath();
  [t1, t2, t3, t4].forEach(([x, y], index) =>
    index ? context.lineTo(x, y) : context.moveTo(x, y),
  );
  context.closePath();
  context.strokeStyle = edge;
  context.lineWidth = 1;
  context.stroke();
};

export const drawThemeBuffer = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsed: number,
  palette: CanvasPalette,
) => {
  context.clearRect(0, 0, width, height);
  if (width < 2 || height < 2) return;

  const spanX = SLAB_X * 2;
  const spanZ = STATUS_Z - (firstZ - 1.4);
  const unit = Math.min(
    (width * 0.94) / ((spanX + spanZ) * COS30),
    (height * 0.9) / ((spanX + spanZ) * 0.5 + 2),
  );
  const project = createIso(unit, width / 2, height * 0.5 + unit * 1.1);

  // Which two states the sweep is between, and how far across the slab it is.
  const clock = (elapsed + TIME_OFFSET) % (STATE_SECONDS * THEMES.length);
  const stateIndex = Math.floor(clock / STATE_SECONDS);
  const inState = clock - stateIndex * STATE_SECONDS;
  const to = THEMES[stateIndex];
  const from = THEMES[(stateIndex + THEMES.length - 1) % THEMES.length];
  const sweep = easeInOut(clamp(inState / SWEEP_SECONDS));
  const front = -SLAB_X - 2.4 + sweep * (spanX + 4.8);
  const BAND = 2.6;
  // 0 before the front arrives, 1 once it has passed, blended across the band.
  const mixAt = (x: number) => clamp((front - x) / BAND);
  const colorAt = (x: number, pick: (theme: BufferTheme) => Rgb) =>
    mixRgb(pick(from), pick(to), mixAt(x));

  const slab = colorAt(0, (theme) => theme.slab);
  const hairline = rgba(palette.ink, 0.08);

  // Slab body, back to front: the plate, then each row, then the statusline.
  drawBar(
    context,
    project,
    -SLAB_X,
    SLAB_X,
    (firstZ - 1.4 + STATUS_Z + 0.9) / 2,
    (STATUS_Z + 0.9 - (firstZ - 1.4)) / 2,
    0,
    SLAB_TOP,
    slab,
    hairline,
  );

  LINES.forEach((line, index) => {
    const z = zOf(index);
    const cursorRow = index === CURSOR_LINE;

    if (cursorRow) {
      // Cursorline: a barely raised full-width plate under the active row.
      drawBar(
        context,
        project,
        GUTTER_X - 0.5,
        SLAB_X - 0.6,
        z,
        0.46,
        SLAB_TOP,
        0.02,
        mixRgb(
          slab,
          colorAt(0, (theme) => theme.accent),
          0.09,
        ),
        hairline,
      );
    }

    drawBar(
      context,
      project,
      GUTTER_X,
      GUTTER_X + 0.7,
      z,
      0.18,
      SLAB_TOP,
      BAR_HEIGHT * 0.4,
      colorAt(GUTTER_X, (theme) => theme.gutter),
      hairline,
    );

    let x = TEXT_X + line.indent * CHAR;
    line.tokens.forEach((item, tokenIndex) => {
      const seed = index * 31 + tokenIndex * 17 + 3;
      const period = 3.6 + noise(seed) * 3.4;
      const phase = noise(seed + 101) * period;
      const cycle = ((elapsed + phase) % period) / period;
      // A short bump once per cycle: the cell settling after a light edit.
      const bump = cycle < 0.17 ? Math.sin((cycle / 0.17) * Math.PI) : 0;
      const span = item.chars * CHAR * (1 + 0.045 * bump);
      const barHeight = BAR_HEIGHT * (1 + 0.5 * bump);
      const tone = colorAt(x + span / 2, (theme) => theme.roles[item.role]);
      drawBar(
        context,
        project,
        x,
        x + span,
        z,
        BAR_DEPTH,
        SLAB_TOP,
        barHeight,
        mixRgb(tone, [255, 255, 255], bump * 0.18),
        rgba(palette.ink, 0.08 + bump * 0.14),
      );
      x += span + GAP;
    });

    if (cursorRow && elapsed % 1.12 < 0.62) {
      const accent = colorAt(x, (theme) => theme.accent);
      drawBar(context, project, x, x + CHAR * 1.6, z, BAR_DEPTH, SLAB_TOP, 0.52, accent, hairline);
    }
  });

  const statusFill = colorAt(0, (theme) => theme.status);
  const statusAccent = colorAt(0, (theme) => theme.accent);
  drawBar(
    context,
    project,
    -SLAB_X + 0.6,
    SLAB_X - 0.6,
    STATUS_Z,
    0.42,
    SLAB_TOP,
    0.09,
    statusFill,
    hairline,
  );
  drawBar(
    context,
    project,
    -SLAB_X + 0.6,
    -SLAB_X + 4.4,
    STATUS_Z,
    0.42,
    SLAB_TOP,
    0.1,
    statusAccent,
    hairline,
  );

  // Statusline type, sheared onto the strip's top face so it lies on the plate.
  const size = unit * 0.42;
  if (size >= 5) {
    const [originX, originY] = project(-SLAB_X + 1.1, SLAB_TOP + 0.1, STATUS_Z);
    context.save();
    context.translate(originX, originY);
    context.transform(COS30, 0.5, 0, 1, 0, 0);
    context.font = `${size.toFixed(2)}px 'Geist Mono',monospace`;
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    // The mode cell is a solid accent block, so its label takes the readable end
    // of the accent's own luminance rather than either theme's foreground.
    const bright = statusAccent[0] * 0.3 + statusAccent[1] * 0.6 + statusAccent[2] * 0.1 > 130;
    context.fillStyle = bright ? 'rgb(8,9,8)' : 'rgb(246,248,246)';
    context.fillText('NORMAL', 0, 0);
    context.fillStyle = rgba(
      colorAt(0, (theme) => theme.statusInk),
      0.86,
    );
    // Past the mode cell's right edge, in the sheared frame's own units.
    context.fillText('init.lua', unit * 3.7, 0);
    context.restore();
  }
};

export class ThemeBufferIso extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (!canvas) return;
    this.engine = new CanvasEngine(
      canvas,
      (context, width, height, elapsed, _pointer, palette) =>
        drawThemeBuffer(context, width, height, elapsed, palette),
      surfaceOf(this),
    );
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('theme-buffer-iso')) {
  customElements.define('theme-buffer-iso', ThemeBufferIso);
}
