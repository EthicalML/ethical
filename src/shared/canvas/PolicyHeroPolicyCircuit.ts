import {
  CanvasEngine,
  type CanvasDraw,
  type CanvasPalette,
  rgba,
  rgbCss,
  type Rgb,
} from './CanvasEngine';
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

// The five core towers, one per jurisdiction the Institute works across. Screen placement
// from the iso projection: EU and UK on the two top towers, USA far left, LATAM right,
// UN & Global on the bottom tower. Each has a rising beat phrase.
const TOWERS: District[] = [
  {
    kind: 'tower',
    label: 'EU',
    gx: -3,
    gz: -1,
    base: 2,
    half: 0.5,
    payload: 'risk tier',
    rise: 'classification follows risk',
  },
  {
    kind: 'tower',
    label: 'UK',
    gx: -1,
    gz: -3,
    base: 1,
    half: 0.5,
    payload: 'oversight',
    rise: 'continuous oversight',
  },
  {
    kind: 'tower',
    label: 'LATAM',
    gx: 3,
    gz: -2,
    base: 2,
    half: 0.5,
    payload: 'capacity',
    rise: 'regional capacity building',
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
    label: 'USA',
    gx: -2.5,
    gz: 3,
    base: 2,
    half: 0.5,
    payload: 'frameworks',
    rise: 'sector-led guidance',
  },
];

const R = 8.2; // perimeter radius: the outskirts sit well clear of the five-tower core

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
for (const step of [-4.8, -3.2, -1.6, 1.6, 3.2, 4.8]) {
  WALLS.push({ gx: step, gz: -R }, { gx: step, gz: R }, { gx: -R, gz: step }, { gx: R, gz: step });
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HALF = 0.5;
const CUBE_H = 0.9;
const BEAT = 2.0;
const RING_GY = 0.28;

/* Cold-to-hot cube palette, interpolated by a district's hover heat so it eases
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

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [
  Math.round(lerp(a[0], b[0], t)),
  Math.round(lerp(a[1], b[1], t)),
  Math.round(lerp(a[2], b[2], t)),
];

const styleAt = (heat: number, palette: CanvasPalette): CubeStyle => {
  const t = clamp(heat);
  const cold = palette.light ? COLD_LIGHT : COLD_DARK;
  const hot = palette.light ? HOT_LIGHT : HOT_DARK;
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
const plateStyle = (palette: CanvasPalette): CubeStyle => {
  const [top, right, left] = palette.surface;
  return {
    top: rgba(top, 0.94),
    right: rgba(right, 0.94),
    left: rgba(left, 0.94),
    edge: rgba(palette.accentInk, 0.1),
    edgeWidth: 1,
  };
};

/* Three off-token bright greens carry the "live signal" read: conduit packets,
   payload text and the rising phrase. Under light they collapse onto the accent
   ink, which is the only accent value legible as text on a pale surface. */
const SIGNAL_DARK: Rgb = [180, 255, 214];
const PAYLOAD_DARK: Rgb = [190, 255, 220];
const RISE_DARK: Rgb = [200, 255, 224];

export class PolicyHeroPolicyCircuit extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private heights = TOWERS.map((tower) => tower.base);
  private towerHeat = TOWERS.map(() => 0);
  private outerHeat = OUTER.map(() => 0);
  private canvas?: HTMLCanvasElement;
  private pointer = { active: false, targetX: 0.5, targetY: 0.5, x: 0.5, y: 0.5 };

  connectedCallback() {
    this.controller = new AbortController();
    const canvas = this.querySelector('canvas');
    if (!canvas) return;
    this.canvas = canvas;
    // Track on window: the canvas sits behind the hero copy, which would otherwise swallow
    // pointer events and make the hover flicker on and off as the cursor crosses text.
    window.addEventListener('pointermove', this.handlePointer, { signal: this.controller.signal });
    window.addEventListener('blur', this.handleLeave, { signal: this.controller.signal });
    this.engine = new CanvasEngine(canvas, this.draw);
  }

  disconnectedCallback() {
    this.controller.abort();
    this.engine?.destroy();
  }

  private handlePointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch' || !this.canvas) return;
    const bounds = this.canvas.getBoundingClientRect();
    const nx = (event.clientX - bounds.left) / bounds.width;
    const ny = (event.clientY - bounds.top) / bounds.height;
    this.pointer.active = nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1;
    if (this.pointer.active) {
      this.pointer.targetX = nx;
      this.pointer.targetY = ny;
    }
  };

  private handleLeave = () => {
    this.pointer.active = false;
  };

  private draw: CanvasDraw = (context, width, height, elapsed, _pointer, palette) => {
    context.clearRect(0, 0, width, height);
    const signalTone = palette.light ? palette.accentInk : SIGNAL_DARK;
    const payloadTone = palette.light ? palette.accentInk : PAYLOAD_DARK;
    const riseTone = palette.light ? palette.accentInk : RISE_DARK;
    const time = reducedMotion ? 7 : elapsed + 3;
    // Per-embed tuning: data-scale multiplies the iso unit; data-center-x/-y shift
    // the citadel within the canvas (fractions of canvas size).
    const unit = Math.min(width, height) * 0.0295 * Number(this.dataset.scale || 1);
    const project = createIso(
      unit,
      width * Number(this.dataset.centerX || 0.54),
      height * Number(this.dataset.centerY || 0.5),
    );

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
      let best = unit * 5;
      const consider = (kind: 'tower' | 'outer', list: District[]) => {
        list.forEach((d, index) => {
          // Measure to the district's vertical body (base-to-top segment), not just its
          // ground point, so hovering anywhere on a tall tower counts.
          const [sx, sy] = project(d.gx, 0, d.gz);
          const topY = project(d.gx, d.base, d.gz)[1];
          const clampedY = Math.min(Math.max(cursorY, topY), sy);
          const distance = Math.hypot(cursorX - sx, cursorY - clampedY);
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

    drawIsoGrid(context, project, 8, rgba(palette.accentInk, 0.04));

    // Layered ground plates give the district its stepped, fortified silhouette.
    const plate = plateStyle(palette);
    drawIsoCube(context, project, 0, 0, 0, R + 0.9, 0.12, plate);
    drawIsoCube(context, project, 0, 0.12, 0, R - 0.3, 0.14, plate);
    drawIsoCube(context, project, 0, 0.26, 0, 3.3, 0.14, plate);

    // Perimeter rampart walls: low crenellated plates between the bastions and gates.
    for (const wall of WALLS) {
      drawIsoCube(context, project, wall.gx, 0.26, wall.gz, 0.5, 0.5, styleAt(0, palette));
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
      context.strokeStyle = rgba(palette.accentInk, 0.12 + lit * 0.42);
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
        if (lit > 0.05)
          drawGlow(context, point[0], point[1], unit * 0.5, 0.05 + lit * 0.3, palette.accentInk);
        context.beginPath();
        context.arc(point[0], point[1], 1.4, 0, Math.PI * 2);
        context.fillStyle = rgba(signalTone, 0.45 + lit * 0.45);
        context.fill();
        // The payload is the data flowing through the conduit; reveal it on lit routes.
        if (p === 0 && payload && lit > 0.35) {
          context.font = `${Math.max(7.5, unit * 0.4)}px 'Geist Mono', monospace`;
          context.fillStyle = rgba(payloadTone, clamp(lit));
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
    drawIsoCube(context, project, 0, 0.14, 0, 0.6, 0.5, styleAt(0, palette));
    drawGlow(context, hub[0], hub[1] - unit * 0.4, unit * 1.2, 0.14, palette.accentInk);

    // Outer districts (gates and bastions), drawn back to front.
    [...OUTER.keys()]
      .sort((a, b) => OUTER[a].gx + OUTER[a].gz - (OUTER[b].gx + OUTER[b].gz))
      .forEach((index) => {
        const d = OUTER[index];
        const heat = this.outerHeat[index];
        const style = styleAt(heat, palette);
        drawIsoCube(context, project, d.gx, 0.26, d.gz, d.half + 0.12, 0.18, style);
        drawIsoCube(context, project, d.gx, 0.44, d.gz, d.half, d.base, style);
        const topPoint = project(d.gx, 0.44 + d.base + 0.3, d.gz);
        if (heat > 0.05)
          drawGlow(context, topPoint[0], topPoint[1], unit * 1.3, heat * 0.24, palette.accentInk);
        if (heat > 0.2) {
          context.font = `${Math.max(7.5, unit * 0.4)}px 'Geist Mono', monospace`;
          context.fillStyle = rgba(signalTone, clamp(heat));
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
        const style = styleAt(heat, palette);
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
          drawGlow(
            context,
            topPoint[0],
            topPoint[1],
            unit * (1.4 + flash),
            0.15 + flash * 0.32,
            palette.accentInk,
          );
        } else if (heat > 0.05) {
          drawGlow(context, topPoint[0], topPoint[1], unit * 1.3, heat * 0.24, palette.accentInk);
        }

        context.font = `${Math.max(7.5, unit * 0.42)}px 'Geist Mono', monospace`;
        context.fillStyle =
          heat > 0.2 || index === active ? rgba(signalTone, 0.92) : rgba(palette.ink, 0.5);
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
      drawGlow(
        context,
        risePoint[0],
        risePoint[1],
        unit * 1.7,
        riseAlpha * 0.16,
        palette.accentInk,
      );
      context.font = `${Math.max(9.5, unit * 0.52)}px 'Geist Mono', monospace`;
      context.textAlign = 'center';
      context.fillStyle = rgba(riseTone, riseAlpha);
      context.fillText(activeTower.rise, risePoint[0], risePoint[1]);
      context.textAlign = 'start';
    }
  };
}

if (!customElements.get('policy-hero-policy-circuit')) {
  customElements.define('policy-hero-policy-circuit', PolicyHeroPolicyCircuit);
}
