import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import {
  createIso,
  drawIsoCube,
  drawIsoGrid,
  type IsoPoint,
  type IsoProjector,
} from './PolicyHeroIso';
import { drawGlow, hash } from './PolicyHeroShared';

// Second circuit iteration: pure geometric richness. Three interconnected clusters mix cubes,
// hexagonal prisms and pyramidal (triangular facet) caps on a faint iso grid. Particles flow
// along the inter-cluster edges, and each cluster occasionally reflows into a new configuration.

type CellKind = 'cube' | 'hex' | 'pyramid';

interface Cell {
  amp: number;
  base: number;
  gx: number;
  gz: number;
  kind: CellKind;
  phase: number;
  speed: number;
}

interface Cluster {
  cells: Cell[];
  cx: number;
  cz: number;
}

const LAYOUT: [number, number][] = [
  [0, 0],
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const KINDS: CellKind[] = ['hex', 'cube', 'pyramid', 'cube', 'cube'];

const CENTERS: [number, number][] = [
  [-3.4, -3],
  [4, -1.4],
  [0.6, 3.6],
];

const CLUSTERS: Cluster[] = CENTERS.map(([cx, cz], ci) => ({
  cx,
  cz,
  cells: LAYOUT.map(([ox, oz], k) => {
    const idx = ci * 10 + k;
    return {
      amp: 0.9 + hash(idx, 72) * 1.3,
      base: 0.8 + hash(idx, 71) * 0.6,
      gx: cx + ox,
      gz: cz + oz,
      kind: KINDS[(k + ci) % KINDS.length],
      phase: hash(idx, 73) * Math.PI * 2,
      speed: 0.28 + hash(idx, 74) * 0.28,
    };
  }),
}));
const CELLS = CLUSTERS.flatMap((cluster) => cluster.cells);

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HALF = 0.46;
const REFLOW = 6.5;
const CONFIGS = 3;

const STYLE = {
  top: 'rgba(40,46,42,1)',
  right: 'rgba(25,29,26,1)',
  left: 'rgba(16,19,17,1)',
  edge: 'rgba(150,170,158,0.18)',
  edgeWidth: 1,
};
const STYLE_HOT = {
  top: 'rgba(38,52,44,1)',
  right: 'rgba(24,34,29,1)',
  left: 'rgba(16,24,20,1)',
  edge: 'rgba(94,230,160,0.5)',
  edgeWidth: 1.1,
};

const fillPoly = (
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
  context.strokeStyle = edge;
  context.lineWidth = edgeWidth;
  context.stroke();
};

const HEX_R = 0.5;
const hexOffsets = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
  return [Math.cos(angle) * HEX_R, Math.sin(angle) * HEX_R] as [number, number];
});

// Hexagonal prism: side faces painted far to near, then the top hexagon.
const drawHexPrism = (
  context: CanvasRenderingContext2D,
  project: IsoProjector,
  gx: number,
  gy: number,
  gz: number,
  height: number,
  style: typeof STYLE,
) => {
  const faces = hexOffsets.map((_, i) => {
    const j = (i + 1) % 6;
    return {
      i,
      j,
      depth: hexOffsets[i][0] + hexOffsets[i][1] + hexOffsets[j][0] + hexOffsets[j][1],
    };
  });
  faces.sort((a, b) => a.depth - b.depth);
  faces.forEach(({ i, j }) => {
    const [ax, az] = hexOffsets[i];
    const [bx, bz] = hexOffsets[j];
    fillPoly(
      context,
      [
        project(gx + ax, gy + height, gz + az),
        project(gx + bx, gy + height, gz + bz),
        project(gx + bx, gy, gz + bz),
        project(gx + ax, gy, gz + az),
      ],
      style.left,
      style.edge,
      style.edgeWidth,
    );
  });
  fillPoly(
    context,
    hexOffsets.map(([ax, az]) => project(gx + ax, gy + height, gz + az)),
    style.top,
    style.edge,
    style.edgeWidth,
  );
};

// Pyramidal cap: a square base with an apex above, showing two triangular facets.
const drawPyramid = (
  context: CanvasRenderingContext2D,
  project: IsoProjector,
  gx: number,
  gy: number,
  gz: number,
  capHeight: number,
  style: typeof STYLE,
) => {
  const apex = project(gx, gy + capHeight, gz);
  const right = project(gx + HALF, gy, gz - HALF);
  const front = project(gx + HALF, gy, gz + HALF);
  const left = project(gx - HALF, gy, gz + HALF);
  fillPoly(context, [right, front, apex], style.right, style.edge, style.edgeWidth);
  fillPoly(context, [front, left, apex], style.left, style.edge, style.edgeWidth);
};

export class PolicyHeroCircuitConfigurations extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private heights = CELLS.map((cell) => cell.base);
  private pointer = { active: false, targetX: 0.5, targetY: 0.5, x: 0.5, y: 0.5 };

  connectedCallback() {
    this.controller = new AbortController();
    const canvas = this.querySelector('canvas');
    if (!canvas) return;
    canvas.addEventListener('pointerenter', this.handlePointer, { signal: this.controller.signal });
    canvas.addEventListener('pointermove', this.handlePointer, { signal: this.controller.signal });
    canvas.addEventListener('pointerleave', this.handleLeave, { signal: this.controller.signal });
    this.engine = new CanvasEngine(canvas, this.draw);
  }

  disconnectedCallback() {
    this.controller.abort();
    this.engine?.destroy();
  }

  private handlePointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    const canvas = event.currentTarget as HTMLCanvasElement;
    const bounds = canvas.getBoundingClientRect();
    this.pointer.active = true;
    this.pointer.targetX = (event.clientX - bounds.left) / bounds.width;
    this.pointer.targetY = (event.clientY - bounds.top) / bounds.height;
  };

  private handleLeave = () => {
    this.pointer.active = false;
  };

  private draw: CanvasDraw = (context, width, height, elapsed) => {
    context.clearRect(0, 0, width, height);
    const time = reducedMotion ? 5.4 : elapsed + 3;
    const unit = Math.min(width, height) * 0.046;
    const project = createIso(unit, width * 0.6, height * 0.5);

    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.12;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.12;
    const cursorX = this.pointer.x * width;
    const cursorY = this.pointer.y * height;

    drawIsoGrid(context, project, 7, 'rgba(94,230,160,0.04)');

    // Hex base plate under each cluster.
    CLUSTERS.forEach((cluster) => {
      const plate = Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
        return project(cluster.cx + Math.cos(angle) * 1.9, 0, cluster.cz + Math.sin(angle) * 1.9);
      });
      fillPoly(context, plate, 'rgba(16,20,18,0.6)', 'rgba(94,230,160,0.14)', 1);
    });

    // Inter-cluster conduits carrying flowing particles per the reference vocabulary.
    const centers = CLUSTERS.map((cluster) => project(cluster.cx, 0.2, cluster.cz));
    const links: [number, number][] = [
      [0, 1],
      [1, 2],
      [2, 0],
    ];
    links.forEach(([a, b], li) => {
      const from = centers[a];
      const to = centers[b];
      context.strokeStyle = 'rgba(94,230,160,0.18)';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(from[0], from[1]);
      context.lineTo(to[0], to[1]);
      context.stroke();
      if (!reducedMotion) {
        for (let p = 0; p < 3; p += 1) {
          const t = (time * 0.22 + li * 0.3 + p / 3) % 1;
          const px = from[0] + (to[0] - from[0]) * t;
          const py = from[1] + (to[1] - from[1]) * t;
          drawGlow(context, px, py, unit * 0.5, 0.3);
          context.beginPath();
          context.arc(px, py, 1.5, 0, Math.PI * 2);
          context.fillStyle = 'rgba(180,255,214,0.85)';
          context.fill();
        }
      }
    });

    // Nearest cell to the cursor lifts and glows.
    let nearest = -1;
    let nearestDistance = Infinity;
    if (this.pointer.active) {
      CELLS.forEach((cell, index) => {
        const [sx, sy] = project(cell.gx, 0, cell.gz);
        const distance = Math.hypot(cursorX - sx, cursorY - sy);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      });
      if (nearestDistance > unit * 2.6) nearest = -1;
    }

    // Reflow: each cluster switches configuration every REFLOW seconds on a stagger, and the
    // cells ease toward the new heights so the cluster visibly reassembles.
    const ordered = CELLS.map((cell, index) => ({ cell, index })).sort(
      (a, b) => a.cell.gx + a.cell.gz - (b.cell.gx + b.cell.gz),
    );

    ordered.forEach(({ cell, index }) => {
      const clusterIndex = Math.floor(index / LAYOUT.length);
      const config = Math.floor(time / REFLOW + clusterIndex * 0.4) % CONFIGS;
      const configHeight = hash(index, 90 + config * 11) * cell.amp;
      const breath = 0.15 * Math.sin(time * cell.speed + cell.phase);
      const target = cell.base + configHeight + breath;
      this.heights[index] += (target - this.heights[index]) * (reducedMotion ? 1 : 0.06);
      const current = this.heights[index];
      const hot = index === nearest;
      const lift = hot ? 3.5 / unit : 0;
      const style = hot ? STYLE_HOT : STYLE;

      if (cell.kind === 'hex') {
        drawHexPrism(context, project, cell.gx, lift, cell.gz, current, style);
      } else {
        const full = Math.floor(current);
        const frac = current - full;
        for (let k = 0; k < full; k += 1) {
          drawIsoCube(context, project, cell.gx, k + lift, cell.gz, HALF, 0.9, style);
        }
        if (frac > 0.05) {
          drawIsoCube(context, project, cell.gx, full + lift, cell.gz, HALF, 0.9 * frac, style);
        }
        if (cell.kind === 'pyramid') {
          drawPyramid(context, project, cell.gx, current + lift, cell.gz, 0.9, style);
        }
      }

      if (hot) {
        const [gx, gy] = project(cell.gx, current + lift + 0.8, cell.gz);
        drawGlow(context, gx, gy, unit * 1.6, 0.22);
      }

      // Neon particle climbing the front vertical edge.
      if (!reducedMotion && hash(index, 75) > 0.4) {
        const t = (time * 0.4 + cell.phase) % 1;
        const bottom = project(cell.gx + HALF, lift, cell.gz + HALF);
        const top = project(cell.gx + HALF, current + lift, cell.gz + HALF);
        const px = bottom[0] + (top[0] - bottom[0]) * t;
        const py = bottom[1] + (top[1] - bottom[1]) * t;
        drawGlow(context, px, py, unit * 0.6, 0.36 * (1 - Math.abs(t - 0.5) * 1.2));
        context.beginPath();
        context.arc(px, py, 1.5, 0, Math.PI * 2);
        context.fillStyle = 'rgba(180,255,214,0.9)';
        context.fill();
      }
    });
  };
}

if (!customElements.get('policy-hero-circuit-configurations')) {
  customElements.define('policy-hero-circuit-configurations', PolicyHeroCircuitConfigurations);
}
