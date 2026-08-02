// Shared isometric vocabulary for the policy hero iso studies (v4 assembly, v5 circuit):
// a 2:1 axonometric projector, a dark-faced hairline cube, and edge helpers for pulses.

export type IsoPoint = [number, number];
export type IsoProjector = (gx: number, gy: number, gz: number) => IsoPoint;

const COS30 = 0.8660254;

export const createIso = (unit: number, originX: number, originY: number): IsoProjector => {
  return (gx, gy, gz) => [
    originX + (gx - gz) * COS30 * unit,
    originY + (gx + gz) * 0.5 * unit - gy * unit,
  ];
};

export const isoDepth = (gx: number, gy: number, gz: number) => gx + gz + gy * 0.6;

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
