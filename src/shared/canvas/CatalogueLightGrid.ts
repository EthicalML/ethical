import {
  CanvasEngine,
  type CanvasPalette,
  type CanvasPointer,
  mixRgb,
  type Rgb,
  rgba,
  surfaceOf,
} from './CanvasEngine';

/* ---------------------------------------------------------------------------
   Catalogue light grid

   A board of small square cells over faint hairlines: the agentic catalogue's
   own object, on the FIG 07 panel and behind its page hero. Three layers sit on
   top of each other, cheapest first:

   1. Ambient scintillation. Every cell runs its own slow off/dim/lit cycle on a
      per-cell period and phase, so the board idles like live infrastructure
      rather than blinking in step. Most cells settle on the dim slate tone; a
      minority reach the violet the catalogue is painted in.
   2. Light runs. Every few seconds one of two events fires and varies: a snake
      crawls cell to cell across the board leaving a decaying trail, or a
      tetromino-shaped cluster lights together and locks in with a long fade.
      Where they travel and where they land is biased by the seven category
      regions of the catalogue, which are weights on a board, never labels.
   3. The pointer. The cell under the cursor lights bright inside a hairline
      ring with crosshair ticks, and the cells it left behind decay as a trail.

   Reduced motion never advances the clock, so frame zero has to be the
   composed static frame: the per-cell phases already scatter lit cells across
   the board, and two clusters are seeded locked at t=0.
--------------------------------------------------------------------------- */

/** Where the pointer is over the canvas, in CSS pixels. Owned by the element. */
export interface GridPointer {
  x: number;
  y: number;
  active: boolean;
}

/**
 * A category region as a rectangle on a six-by-four board, mapped onto whatever
 * cell grid the mount's size produces. `density` weights how busy the region is
 * and how often a run picks it, so the frameworks section reads as the anchor.
 */
interface Region {
  column: number;
  row: number;
  columns: number;
  rows: number;
  density: number;
}

const BOARD_COLUMNS = 6;
const BOARD_ROWS = 4;

const REGIONS: Region[] = [
  { column: 0, row: 0, columns: 3, rows: 2, density: 1.35 },
  { column: 3, row: 0, columns: 3, rows: 1, density: 0.95 },
  { column: 3, row: 1, columns: 3, rows: 1, density: 0.9 },
  { column: 0, row: 2, columns: 2, rows: 1, density: 0.8 },
  { column: 2, row: 2, columns: 2, rows: 1, density: 0.75 },
  { column: 4, row: 2, columns: 2, rows: 1, density: 0.7 },
  { column: 0, row: 3, columns: 6, rows: 1, density: 0.6 },
];

/* The two tones. The palette accent is the mint the rest of the site paints in;
   this catalogue adopted the violet ladder, and the canvas cannot read the
   `.agentic-accent` scope it sits beside, so the two literals are the
   `--violet` token's dark and light values. Slate is the low tone. */
const SLATE: { onDark: Rgb; onLight: Rgb } = { onDark: [132, 142, 162], onLight: [92, 100, 120] };
const VIOLET: { onDark: Rgb; onLight: Rgb } = { onDark: [182, 148, 255], onLight: [102, 70, 171] };

const DIRECTIONS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const TETROMINOES: ReadonlyArray<ReadonlyArray<readonly [number, number]>> = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 1],
  ],
  [
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ],
];

const fract = (value: number) => value - Math.floor(value);
const hash = (a: number, b: number) => fract(Math.sin(a * 127.1 + b * 311.7) * 43758.5453);
const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

interface Flare {
  at: number;
  decay: number;
  strength: number;
}

interface Snake {
  column: number;
  row: number;
  direction: number;
  steps: number;
  stepAt: number;
  interval: number;
  target: Region;
}

export function createCatalogueGridDrawer(pointer: GridPointer) {
  const flares = new Map<number, Flare>();
  let snake: Snake | null = null;
  let nextEventAt = 3;
  let lastEvent = 'snake';
  let seed = 1;
  let columns = 1;
  let rows = 1;

  const random = () => fract(Math.sin(seed++ * 12.9898 + 78.233) * 43758.5453);
  const key = (column: number, row: number) => row * 4096 + column;

  const flare = (column: number, row: number, at: number, decay: number, strength: number) => {
    if (column < 0 || row < 0 || column >= columns || row >= rows) return;
    flares.set(key(column, row), { at, decay, strength });
  };

  /** The region a cell falls in, by its position on the six-by-four board. */
  const regionAt = (column: number, row: number) => {
    const boardColumn = Math.min(BOARD_COLUMNS - 1, Math.floor((column / columns) * BOARD_COLUMNS));
    const boardRow = Math.min(BOARD_ROWS - 1, Math.floor((row / rows) * BOARD_ROWS));
    return (
      REGIONS.find(
        (region) =>
          boardColumn >= region.column &&
          boardColumn < region.column + region.columns &&
          boardRow >= region.row &&
          boardRow < region.row + region.rows,
      ) ?? REGIONS[0]
    );
  };

  /** A region picked by its density, so runs favour the busy sections. */
  const pickRegion = () => {
    const total = REGIONS.reduce((sum, region) => sum + region.density, 0);
    let ticket = random() * total;
    for (const region of REGIONS) {
      ticket -= region.density;
      if (ticket <= 0) return region;
    }
    return REGIONS[0];
  };

  const cellInRegion = (region: Region) => ({
    column: Math.floor(((region.column + random() * region.columns) / BOARD_COLUMNS) * columns),
    row: Math.floor(((region.row + random() * region.rows) / BOARD_ROWS) * rows),
  });

  const lockCluster = (elapsed: number) => {
    const shape = TETROMINOES[Math.floor(random() * TETROMINOES.length)];
    const anchor = cellInRegion(pickRegion());
    shape.forEach(([offsetColumn, offsetRow], index) => {
      flare(anchor.column + offsetColumn, anchor.row + offsetRow, elapsed + index * 0.07, 3.4, 1);
    });
  };

  const startSnake = (elapsed: number) => {
    const start = cellInRegion(pickRegion());
    snake = {
      column: start.column,
      row: start.row,
      direction: Math.floor(random() * DIRECTIONS.length),
      steps: 22 + Math.floor(random() * 26),
      stepAt: elapsed,
      interval: 0.05 + random() * 0.05,
      target: pickRegion(),
    };
  };

  // Two clusters land locked on frame zero, so the reduced-motion frame reads
  // as a board mid-idle rather than an empty one.
  lockCluster(0);
  lockCluster(0);

  return (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    _pointer: CanvasPointer,
    palette: CanvasPalette,
  ) => {
    if (width <= 0 || height <= 0) return;
    const pitch = Math.max(15, Math.min(28, Math.round(Math.min(width, height) / 16)));
    const size = Math.max(4, pitch - 5);
    columns = Math.max(1, Math.ceil(width / pitch) + 1);
    rows = Math.max(1, Math.ceil(height / pitch) + 1);
    // The board bleeds off every edge by the same half cell, so no side shows a
    // lone sliver of a column.
    const originX = (width - columns * pitch) / 2;
    const originY = (height - rows * pitch) / 2;
    const slate = palette.onLight ? SLATE.onLight : SLATE.onDark;
    const violet = palette.onLight ? VIOLET.onLight : VIOLET.onDark;

    context.clearRect(0, 0, width, height);

    // Layer 1: the hairlines the cells sit on.
    context.beginPath();
    for (let column = 1; column < columns; column += 1) {
      const x = Math.round(originX + column * pitch) + 0.5;
      context.moveTo(x, 0);
      context.lineTo(x, height);
    }
    for (let row = 1; row < rows; row += 1) {
      const y = Math.round(originY + row * pitch) + 0.5;
      context.moveTo(0, y);
      context.lineTo(width, y);
    }
    context.lineWidth = 1;
    context.strokeStyle = rgba(palette.ink, palette.onLight ? 0.07 : 0.055);
    context.stroke();

    // Layer 2: the light runs. Events alternate with a jittered gap and vary
    // which of the two patterns fires.
    if (elapsed >= nextEventAt) {
      const snakeTurn = lastEvent === 'tetromino' || random() < 0.4;
      if (snakeTurn) startSnake(elapsed);
      else lockCluster(elapsed);
      lastEvent = snakeTurn ? 'snake' : 'tetromino';
      nextEventAt = elapsed + 4 + random() * 4;
    }

    while (snake && elapsed >= snake.stepAt) {
      const run = snake;
      // Steer toward the target region often enough to read as a path, not a
      // random walk, but not so often that it travels in a straight line.
      if (random() < 0.34) {
        const target = cellInRegion(run.target);
        const towards =
          Math.abs(target.column - run.column) > Math.abs(target.row - run.row)
            ? target.column > run.column
              ? 0
              : 2
            : target.row > run.row
              ? 1
              : 3;
        run.direction = towards;
      }
      const [stepColumn, stepRow] = DIRECTIONS[run.direction];
      run.column += stepColumn;
      run.row += stepRow;
      if (run.column < 0 || run.row < 0 || run.column >= columns || run.row >= rows) {
        run.column = Math.max(0, Math.min(columns - 1, run.column));
        run.row = Math.max(0, Math.min(rows - 1, run.row));
        run.direction = (run.direction + 1 + Math.floor(random() * 2)) % DIRECTIONS.length;
      }
      flare(run.column, run.row, run.stepAt, 1.5, 1);
      run.stepAt += run.interval;
      run.steps -= 1;
      if (run.steps <= 0) snake = null;
    }

    // Layer 3: the pointer's own cell and the trail behind it.
    let hoverColumn = -1;
    let hoverRow = -1;
    if (pointer.active) {
      hoverColumn = Math.floor((pointer.x - originX) / pitch);
      hoverRow = Math.floor((pointer.y - originY) / pitch);
      flare(hoverColumn, hoverRow, elapsed, 0.9, 0.85);
    }

    for (const [cell, entry] of flares) {
      if (elapsed - entry.at > entry.decay) flares.delete(cell);
    }

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const region = regionAt(column, row);
        const activity = region.density * (0.3 + hash(column + 0.5, row + 1.5) * 0.7);
        const period = 6 + hash(row + 2.5, column + 3.5) * 10;
        const cycle = fract(elapsed / period + hash(column + 7.5, row + 11.5));
        const window = 0.34;
        const ambient =
          cycle < window ? smooth(1 - Math.abs((cycle / window) * 2 - 1)) * activity : 0;

        const entry = flares.get(key(column, row));
        const burst = entry ? clamp01(1 - (elapsed - entry.at) / entry.decay) * entry.strength : 0;
        const level = clamp01(ambient * 0.85 + burst);
        const violetCell = hash(column + 13.5, row + 5.5) < 0.24 * region.density;
        const tone = mixRgb(slate, violet, clamp01(violetCell ? level * 1.25 : burst));

        const x = originX + column * pitch + (pitch - size) / 2;
        const y = originY + row * pitch + (pitch - size) / 2;
        context.fillStyle = rgba(tone, 0.05 + level * (palette.onLight ? 0.45 : 0.55));
        context.fillRect(x, y, size, size);
      }
    }

    if (hoverColumn < 0 || hoverColumn >= columns || hoverRow < 0 || hoverRow >= rows) return;
    const markX = originX + hoverColumn * pitch;
    const markY = originY + hoverRow * pitch;
    context.strokeStyle = rgba(violet, 0.62);
    context.lineWidth = 1;
    context.strokeRect(markX + 0.5, markY + 0.5, pitch - 1, pitch - 1);
    context.beginPath();
    const tick = Math.round(pitch * 0.4);
    context.moveTo(markX - tick, markY + pitch / 2);
    context.lineTo(markX, markY + pitch / 2);
    context.moveTo(markX + pitch, markY + pitch / 2);
    context.lineTo(markX + pitch + tick, markY + pitch / 2);
    context.moveTo(markX + pitch / 2, markY - tick);
    context.lineTo(markX + pitch / 2, markY);
    context.moveTo(markX + pitch / 2, markY + pitch);
    context.lineTo(markX + pitch / 2, markY + pitch + tick);
    context.strokeStyle = rgba(violet, 0.3);
    context.stroke();
  };
}

export class CatalogueLightGrid extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private pointer: GridPointer = { x: 0, y: 0, active: false };

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (!canvas) return;
    // The engine's own pointer is a smoothed drift, which cannot answer which
    // cell the cursor is over, so the mark tracks the absolute position here.
    const { signal } = this.controller;
    const track = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      this.pointer.x = event.clientX - bounds.left;
      this.pointer.y = event.clientY - bounds.top;
      this.pointer.active = event.pointerType !== 'touch';
    };
    canvas.addEventListener('pointermove', track, { signal });
    canvas.addEventListener('pointerenter', track, { signal });
    canvas.addEventListener(
      'pointerleave',
      () => {
        this.pointer.active = false;
      },
      { signal },
    );
    this.engine = new CanvasEngine(
      canvas,
      createCatalogueGridDrawer(this.pointer),
      surfaceOf(this),
    );
  }

  disconnectedCallback() {
    this.controller.abort();
    this.controller = new AbortController();
    this.engine?.destroy();
  }
}

if (!customElements.get('catalogue-light-grid')) {
  customElements.define('catalogue-light-grid', CatalogueLightGrid);
}
