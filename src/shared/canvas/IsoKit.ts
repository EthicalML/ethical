// Shared isometric vocabulary for the hero canvases built on it — the policy citadel and the
// open-source lattice: a 2:1 axonometric projector, a hairline cube, ground plates, edge helpers
// for pulses, and the cold-to-hot cube palette both heroes light their solids with.

import { rgba, rgbCss, type CanvasPalette, type Rgb } from './CanvasEngine';

export type IsoPoint = [number, number];
export type IsoProjector = (gx: number, gy: number, gz: number) => IsoPoint;

const COS30 = 0.8660254;

export const createIso = (unit: number, originX: number, originY: number): IsoProjector => {
  return (gx, gy, gz) => [
    originX + (gx - gz) * COS30 * unit,
    originY + (gx + gz) * 0.5 * unit - gy * unit,
  ];
};

export const lerpPoint = (a: IsoPoint, b: IsoPoint, t: number): IsoPoint => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];

export interface CubeStyle {
  edge: string;
  edgeWidth?: number;
  left: string;
  right: string;
  top: string;
}

const polygon = (
  context: CanvasRenderingContext2D,
  points: IsoPoint[],
  fill: string,
  edge: string,
  edgeWidth: number,
) => {
  context.beginPath();
  points.forEach(([x, y], index) => (index ? context.lineTo(x, y) : context.moveTo(x, y)));
  context.closePath();
  context.fillStyle = fill;
  context.fill();
  if (edge) {
    context.strokeStyle = edge;
    context.lineWidth = edgeWidth;
    context.stroke();
  }
};

// Draws a box whose base sits at (gx, gy, gz) and top at gy + height. Only the three
// viewer-facing faces are emitted (top, +x right, +z left), painted dark with hairline edges.
export const drawIsoCube = (
  context: CanvasRenderingContext2D,
  project: IsoProjector,
  gx: number,
  gy: number,
  gz: number,
  half: number,
  height: number,
  style: CubeStyle,
) => {
  const top = gy + height;
  const t1 = project(gx - half, top, gz - half);
  const t2 = project(gx + half, top, gz - half);
  const t3 = project(gx + half, top, gz + half);
  const t4 = project(gx - half, top, gz + half);
  const b2 = project(gx + half, gy, gz - half);
  const b3 = project(gx + half, gy, gz + half);
  const b4 = project(gx - half, gy, gz + half);
  const edgeWidth = style.edgeWidth ?? 1;
  polygon(context, [t2, t3, b3, b2], style.right, style.edge, edgeWidth);
  polygon(context, [t4, t3, b3, b4], style.left, style.edge, edgeWidth);
  polygon(context, [t1, t2, t3, t4], style.top, style.edge, edgeWidth);
};

// Faint isometric ground grid centred on the origin, spanning +/- span cells.
export const drawIsoGrid = (
  context: CanvasRenderingContext2D,
  project: IsoProjector,
  span: number,
  color: string,
) => {
  context.strokeStyle = color;
  context.lineWidth = 1;
  for (let g = -span; g <= span; g += 1) {
    const rowA = project(g, 0, -span);
    const rowB = project(g, 0, span);
    context.beginPath();
    context.moveTo(rowA[0], rowA[1]);
    context.lineTo(rowB[0], rowB[1]);
    context.stroke();
    const colA = project(-span, 0, g);
    const colB = project(span, 0, g);
    context.beginPath();
    context.moveTo(colA[0], colA[1]);
    context.lineTo(colB[0], colB[1]);
    context.stroke();
  }
};

export const clamp = (value: number) => Math.max(0, Math.min(1, value));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [
  Math.round(lerp(a[0], b[0], t)),
  Math.round(lerp(a[1], b[1], t)),
  Math.round(lerp(a[2], b[2], t)),
];

// Soft radial bloom, used for lit tower tops and travelling packets.
export const drawGlow = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number,
  color: Rgb,
) => {
  const glow = context.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, rgba(color, alpha));
  glow.addColorStop(0.42, rgba(color, alpha * 0.28));
  glow.addColorStop(1, rgba(color, 0));
  context.fillStyle = glow;
  context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
};

/* Cold-to-hot cube palette, interpolated by a solid's hover heat so it eases
   in and out. These are numeric channel triplets rather than colour strings, so
   no colour grep finds them — they are listed per theme here deliberately.
   Faces are near-black under dark and near-white under light; the cold edge is a
   desaturated hairline, the hot edge is the accent. */
interface CubeTone {
  top: Rgb;
  right: Rgb;
  left: Rgb;
  edge: Rgb;
  edgeA: number;
  edgeW: number;
}

const COLD_DARK: CubeTone = {
  top: [32, 37, 34],
  right: [20, 23, 21],
  left: [13, 15, 14],
  edge: [150, 170, 158],
  edgeA: 0.15,
  edgeW: 1,
};
const HOT_DARK: CubeTone = {
  top: [40, 55, 46],
  right: [25, 36, 30],
  left: [16, 25, 21],
  edge: [94, 230, 160],
  edgeA: 0.6,
  edgeW: 1.2,
};
const COLD_LIGHT: CubeTone = {
  top: [233, 234, 230],
  right: [216, 219, 214],
  left: [199, 203, 198],
  edge: [78, 92, 84],
  edgeA: 0.28,
  edgeW: 1,
};
const HOT_LIGHT: CubeTone = {
  top: [214, 240, 226],
  right: [193, 227, 209],
  left: [172, 213, 192],
  edge: [18, 103, 59],
  edgeA: 0.7,
  edgeW: 1.2,
};

export const styleAt = (heat: number, palette: CanvasPalette): CubeStyle => {
  const t = clamp(heat);
  const cold = palette.onLight ? COLD_LIGHT : COLD_DARK;
  const hot = palette.onLight ? HOT_LIGHT : HOT_DARK;
  return {
    top: rgbCss(mix(cold.top, hot.top, t)),
    right: rgbCss(mix(cold.right, hot.right, t)),
    left: rgbCss(mix(cold.left, hot.left, t)),
    edge: rgba(mix(cold.edge, hot.edge, t), lerp(cold.edgeA, hot.edgeA, t)),
    edgeWidth: lerp(cold.edgeW, hot.edgeW, t),
  };
};

/* Ground plates take the palette's three isometric faces: the darkest surfaces
   under dark, the lightest under light, and editable from `tokens.css` because
   `--canvas-surface-{1,2,3}` is where they now live. */
export const plateStyle = (palette: CanvasPalette): CubeStyle => {
  const [top, right, left] = palette.surface;
  return {
    top: rgba(top, 0.94),
    right: rgba(right, 0.94),
    left: rgba(left, 0.94),
    edge: rgba(palette.accentInk, 0.1),
    edgeWidth: 1,
  };
};
