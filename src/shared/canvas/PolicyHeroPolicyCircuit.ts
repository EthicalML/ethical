import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import {
  createIso,
  drawIsoCube,
  drawIsoGrid,
  type CubeStyle,
  type IsoPoint,
  lerpPoint,
} from './PolicyHeroIso';
import { clamp, drawGlow } from './PolicyHeroShared';

// A policy citadel: the five policy towers form the core, ringed by a fortified district of
// perimeter ramparts, cardinal gates and corner bastions, wired to the core by radial conduits
// and a perimeter conduit ring. Every district (tower, gate or bastion) is hoverable: pointing
// at one brightens its structure, its connected routes and its payload phrase, then eases back.

interface District {
  base: number;
  gx: number;
  gz: number;
  half: number;
  kind: 'tower' | 'gate' | 'bastion';
  label: string;
  payload: string;
  rise?: string;
}

// The five core towers, one per policy track from /policy/. Each has a rising beat phrase.
const TOWERS: District[] = [
  {
    kind: 'tower',
    label: 'EU AI ACT',
    gx: -3,
    gz: -1,
    base: 2,
    half: 0.5,
    payload: 'risk tier',
    rise: 'classification follows risk',
  },
  {
    kind: 'tower',
    label: 'EU DIGITAL ACTS',
    gx: -1,
    gz: -3,
    base: 1,
    half: 0.5,
    payload: 'provenance',
    rise: 'dataset provenance',
  },
  {
    kind: 'tower',
    label: 'UK',
    gx: 3,
    gz: -2,
    base: 2,
    half: 0.5,
    payload: 'oversight',
    rise: 'continuous oversight',
  },
  {
    kind: 'tower',
    label: 'UN & GLOBAL',
    gx: 2.5,
    gz: 3,
    base: 1,
    half: 0.5,
    payload: 'interoperable',
    rise: 'inclusive AI governance',
  },
  {
    kind: 'tower',
    label: 'SUSTAINABILITY',
    gx: -2.5,
    gz: 3,
    base: 2,
    half: 0.5,
    payload: 'energy',
    rise: 'inference-phase transparency',
  },
];

const R = 4.7; // perimeter radius

// Outer ring in clockwise order so consecutive entries are joined by the perimeter conduit:
// corner bastion, cardinal gate, corner bastion, gate, ... Gates are taller arch blocks, the
// corner bastions squatter satellite forts. Each carries a payload that travels its conduit.
const OUTER: District[] = [
  {
    kind: 'bastion',
    label: 'ENFORCEMENT',
    gx: -R,
    gz: -R,
    base: 1.6,
    half: 0.66,
    payload: 'kill switch',
  },
  {
    kind: 'gate',
    label: 'TRANSPARENCY',
    gx: 0,
    gz: -R,
    base: 2.3,
    half: 0.5,
    payload: 'public register',
  },
  {
    kind: 'bastion',
    label: 'PROVENANCE',
    gx: R,
    gz: -R,
    base: 1.6,
    half: 0.66,
    payload: 'dataset lineage',
  },
  {
    kind: 'gate',
    label: 'AUDIT',
    gx: R,
    gz: 0,
    base: 2.3,
    half: 0.5,
    payload: 'reproducible audit',
  },
  {
    kind: 'bastion',
    label: 'MONITORING',
    gx: R,
    gz: R,
    base: 1.6,
    half: 0.66,
    payload: 'drift thresholds',
  },
  {
    kind: 'gate',
    label: 'REDRESS',
    gx: 0,
    gz: R,
    base: 2.3,
    half: 0.5,
    payload: 'incident register',
  },
  {
    kind: 'bastion',
    label: 'ENERGY',
    gx: -R,
    gz: R,
    base: 1.6,
    half: 0.66,
    payload: 'inference metrics',
  },
  {
    kind: 'gate',
    label: 'STANDARDS',
    gx: -R,
    gz: 0,
    base: 2.3,
    half: 0.5,
    payload: 'interoperable',
  },
];

// Low rampart plates walking each edge between a corner bastion and the neighbouring gate.
const WALLS: { gx: number; gz: number }[] = [];
for (const step of [-3.1, -1.55, 1.55, 3.1]) {
  WALLS.push({ gx: step, gz: -R }, { gx: step, gz: R }, { gx: -R, gz: step }, { gx: R, gz: step });
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HALF = 0.5;
const CUBE_H = 0.9;
const BEAT = 2.0;
const RING_GY = 0.28;

// Cold-to-hot cube palette, interpolated by a district's hover heat so it eases in and out.
const COLD = {
  top: [32, 37, 34],
  right: [20, 23, 21],
  left: [13, 15, 14],
  edge: [150, 170, 158],
  edgeA: 0.15,
  edgeW: 1,
};
const HOT = {
  top: [40, 55, 46],
  right: [25, 36, 30],
  left: [16, 25, 21],
  edge: [94, 230, 160],
  edgeA: 0.6,
  edgeW: 1.2,
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mixRgb = (a: number[], b: number[], t: number) =>
  `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;

const styleAt = (heat: number): CubeStyle => {
  const t = clamp(heat);
  return {
    top: mixRgb(COLD.top, HOT.top, t),
    right: mixRgb(COLD.right, HOT.right, t),
    left: mixRgb(COLD.left, HOT.left, t),
    edge: `rgba(${Math.round(lerp(COLD.edge[0], HOT.edge[0], t))},${Math.round(lerp(COLD.edge[1], HOT.edge[1], t))},${Math.round(lerp(COLD.edge[2], HOT.edge[2], t))},${lerp(COLD.edgeA, HOT.edgeA, t)})`,
    edgeWidth: lerp(COLD.edgeW, HOT.edgeW, t),
  };
};

const PLATE_STYLE: CubeStyle = {
  top: 'rgba(16,19,17,0.94)',
  right: 'rgba(11,13,12,0.94)',
  left: 'rgba(8,10,9,0.94)',
  edge: 'rgba(94,230,160,0.1)',
  edgeWidth: 1,
};

export class PolicyHeroPolicyCircuit extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private heights = TOWERS.map((tower) => tower.base);
  private towerHeat = TOWERS.map(() => 0);
  private outerHeat = OUTER.map(() => 0);
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
    const time = reducedMotion ? 7 : elapsed + 3;
    const unit = Math.min(width, height) * 0.041;
    const project = createIso(unit, width * 0.5, height * 0.47);

    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.12;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.12;
    const cursorX = this.pointer.x * width;
    const cursorY = this.pointer.y * height;

    // Beat: every BEAT seconds the active tower advances a segment; a full lap is ~10s.
    const beat = Math.floor(time / BEAT);
    const active = ((beat % TOWERS.length) + TOWERS.length) % TOWERS.length;
    const flash = clamp(1 - (time % BEAT) / BEAT);

    // Nearest district to the cursor across the whole citadel, then ease every heat toward it.
    let nearKind: 'none' | 'tower' | 'outer' = 'none';
    let nearIndex = -1;
    if (this.pointer.active) {
      let best = unit * 3;
      const consider = (kind: 'tower' | 'outer', list: District[]) => {
        list.forEach((d, index) => {
          const [sx, sy] = project(d.gx, 0, d.gz);
          const distance = Math.hypot(cursorX - sx, cursorY - sy);
          if (distance < best) {
            best = distance;
            nearKind = kind;
            nearIndex = index;
          }
        });
      };
      consider('tower', TOWERS);
      consider('outer', OUTER);
    }
    const ease = reducedMotion ? 1 : 0.12;
    this.towerHeat.forEach((h, i) => {
      const target = nearKind === 'tower' && nearIndex === i ? 1 : 0;
      this.towerHeat[i] = h + (target - h) * ease;
    });
    this.outerHeat.forEach((h, i) => {
      const target = nearKind === 'outer' && nearIndex === i ? 1 : 0;
      this.outerHeat[i] = h + (target - h) * ease;
    });

    drawIsoGrid(context, project, 6, 'rgba(94,230,160,0.04)');

    // Layered ground plates give the district its stepped, fortified silhouette.
    drawIsoCube(context, project, 0, 0, 0, R + 0.9, 0.12, PLATE_STYLE);
    drawIsoCube(context, project, 0, 0.12, 0, R - 0.3, 0.14, PLATE_STYLE);
    drawIsoCube(context, project, 0, 0.26, 0, 3.3, 0.14, PLATE_STYLE);

    // Perimeter rampart walls: low crenellated plates between the bastions and gates.
    for (const wall of WALLS) {
      drawIsoCube(context, project, wall.gx, 0.26, wall.gz, 0.5, 0.5, styleAt(0));
    }

    const hub: IsoPoint = project(0, 0.16, 0);

    const drawConduit = (
      grid: [number, number][],
      gy: number,
      heat: number,
      payload: string,
      phase: number,
    ) => {
      const pts = grid.map(([gx, gz]) => project(gx, gy, gz));
      const lit = clamp(heat);
      context.strokeStyle = `rgba(94,230,160,${0.12 + lit * 0.42})`;
      context.lineWidth = 1 + lit * 0.9;
      context.beginPath();
      pts.forEach((p, i) => (i ? context.lineTo(p[0], p[1]) : context.moveTo(p[0], p[1])));
      context.stroke();
      if (reducedMotion) return;
      const segments = pts.length - 1;
      for (let p = 0; p < 2; p += 1) {
        const t = (time * 0.28 + phase + p * 0.5) % 1;
        const along = t * segments;
        const seg = Math.min(segments - 1, Math.floor(along));
        const point = lerpPoint(pts[seg], pts[seg + 1], along - seg);
        if (lit > 0.05) drawGlow(context, point[0], point[1], unit * 0.5, 0.05 + lit * 0.3);
        context.beginPath();
        context.arc(point[0], point[1], 1.4, 0, Math.PI * 2);
        context.fillStyle = `rgba(180,255,214,${0.45 + lit * 0.45})`;
        context.fill();
        // The payload is the data flowing through the conduit; reveal it on lit routes.
        if (p === 0 && payload && lit > 0.35) {
          context.font = `${Math.max(7.5, unit * 0.4)}px 'Geist Mono', monospace`;
          context.fillStyle = `rgba(190,255,220,${clamp(lit)})`;
          context.textAlign = 'left';
          context.fillText(payload, point[0] + unit * 0.45, point[1] - unit * 0.35);
          context.textAlign = 'start';
        }
      }
    };

    // Radial conduits: hub to each tower (routed via its axis corner), gate and bastion.
    TOWERS.forEach((tower, index) => {
      const heat = Math.max(this.towerHeat[index], index === active ? 0.4 : 0);
      drawConduit(
        [
          [0, 0],
          [tower.gx, 0],
          [tower.gx, tower.gz],
        ],
        0.16,
        heat,
        tower.payload,
        index * 0.4,
      );
    });
    OUTER.forEach((d, index) => {
      drawConduit(
        [
          [0, 0],
          [d.gx, d.gz],
        ],
        RING_GY,
        this.outerHeat[index],
        d.payload,
        0.7 + index * 0.3,
      );
    });

    // Perimeter conduit ring joining the outer districts; a segment lights with either end.
    for (let i = 0; i < OUTER.length; i += 1) {
      const a = OUTER[i];
      const b = OUTER[(i + 1) % OUTER.length];
      const heat = Math.max(this.outerHeat[i], this.outerHeat[(i + 1) % OUTER.length]);
      drawConduit(
        [
          [a.gx, a.gz],
          [b.gx, b.gz],
        ],
        RING_GY,
        heat,
        '',
        1.3 + i * 0.2,
      );
    }

    // Central hub marker.
    drawIsoCube(context, project, 0, 0.14, 0, 0.6, 0.5, styleAt(0));
    drawGlow(context, hub[0], hub[1] - unit * 0.4, unit * 1.2, 0.14);

    // Outer districts (gates and bastions), drawn back to front.
    [...OUTER.keys()]
      .sort((a, b) => OUTER[a].gx + OUTER[a].gz - (OUTER[b].gx + OUTER[b].gz))
      .forEach((index) => {
        const d = OUTER[index];
        const heat = this.outerHeat[index];
        const style = styleAt(heat);
        drawIsoCube(context, project, d.gx, 0.26, d.gz, d.half + 0.12, 0.18, style);
        drawIsoCube(context, project, d.gx, 0.44, d.gz, d.half, d.base, style);
        const topPoint = project(d.gx, 0.44 + d.base + 0.3, d.gz);
        if (heat > 0.05) drawGlow(context, topPoint[0], topPoint[1], unit * 1.3, heat * 0.24);
        if (heat > 0.2) {
          context.font = `${Math.max(7.5, unit * 0.4)}px 'Geist Mono', monospace`;
          context.fillStyle = `rgba(180,255,214,${clamp(heat)})`;
          context.textAlign = 'center';
          context.fillText(d.label, topPoint[0], topPoint[1] - unit * 0.6);
          context.textAlign = 'start';
        }
      });

    // Core towers, drawn back to front.
    [...TOWERS.keys()]
      .sort((a, b) => TOWERS[a].gx + TOWERS[a].gz - (TOWERS[b].gx + TOWERS[b].gz))
      .forEach((index) => {
        const tower = TOWERS[index];
        const completed = Math.floor((beat - index + TOWERS.length * 10) / TOWERS.length);
        const target = tower.base + (completed % 4);
        this.heights[index] += (target - this.heights[index]) * (reducedMotion ? 1 : 0.08);
        const current = this.heights[index];
        const heat = this.towerHeat[index];
        const style = styleAt(heat);
        const full = Math.floor(current);
        const frac = current - full;

        drawIsoCube(context, project, tower.gx, 0.26, tower.gz, 0.72, 0.18, style);
        for (let k = 0; k < full; k += 1) {
          drawIsoCube(context, project, tower.gx, 0.44 + k, tower.gz, HALF, CUBE_H, style);
        }
        if (frac > 0.05) {
          drawIsoCube(
            context,
            project,
            tower.gx,
            0.44 + full,
            tower.gz,
            HALF,
            CUBE_H * frac,
            style,
          );
        }

        const topPoint = project(tower.gx, 0.44 + current + 0.4, tower.gz);
        if (index === active) {
          drawGlow(context, topPoint[0], topPoint[1], unit * (1.4 + flash), 0.15 + flash * 0.32);
        } else if (heat > 0.05) {
          drawGlow(context, topPoint[0], topPoint[1], unit * 1.3, heat * 0.24);
        }

        context.font = `${Math.max(7.5, unit * 0.42)}px 'Geist Mono', monospace`;
        context.fillStyle =
          heat > 0.2 || index === active ? 'rgba(180,255,214,0.92)' : 'rgba(244,242,238,0.5)';
        context.textAlign = 'center';
        context.fillText(tower.label, topPoint[0], topPoint[1] - unit * 0.7);
        context.textAlign = 'start';
      });

    // A phrase rises from the active tower as its beat lands, holding readable for a moment.
    const activeTower = TOWERS[active];
    const beatProgress = (time % BEAT) / BEAT;
    const riseAlpha = clamp(Math.sin(beatProgress * Math.PI) * 1.5);
    if (riseAlpha > 0.02 && activeTower.rise) {
      const lift = 1.9 + beatProgress * 1.8;
      const risePoint = project(activeTower.gx, 0.44 + this.heights[active] + lift, activeTower.gz);
      drawGlow(context, risePoint[0], risePoint[1], unit * 1.7, riseAlpha * 0.16);
      context.font = `${Math.max(9.5, unit * 0.52)}px 'Geist Mono', monospace`;
      context.textAlign = 'center';
      context.fillStyle = `rgba(200,255,224,${riseAlpha})`;
      context.fillText(activeTower.rise, risePoint[0], risePoint[1]);
      context.textAlign = 'start';
    }
  };
}

if (!customElements.get('policy-hero-policy-circuit')) {
  customElements.define('policy-hero-policy-circuit', PolicyHeroPolicyCircuit);
}
