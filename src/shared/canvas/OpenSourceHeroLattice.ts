import { CanvasEngine, type CanvasDraw, rgba, type Rgb, surfaceOf } from './CanvasEngine';
import {
  clamp,
  createIso,
  drawGlow,
  drawIsoCube,
  drawIsoGrid,
  type IsoPoint,
  lerpPoint,
  plateStyle,
  styleAt,
} from './IsoKit';

// An open-source commons, built on the same isometric kit as the policy citadel but animated by
// the opposite motion: the citadel radiates outward from a core, this one is fed inward. Five
// project pads sit around a shared hub, ringed by an orbit of contributors. Every beat a
// contributor sends a packet down to a project, which merges it and grows another cube; the
// release phrase rises off the pad as it lands. Pointing at a pad brightens it, its conduit and
// its payload, then eases back.

interface Project {
  base: number;
  gx: number;
  gz: number;
  label: string;
  payload: string;
  rise: string;
}

// Screen placement from the iso projection: KAOS and Kompute on the two upper pads, XAI right,
// the two catalogues along the bottom. Order is the reading order of the cards below the hero.
const PROJECTS: Project[] = [
  { label: 'KAOS', gx: -3.4, gz: -1, base: 3, payload: 'agent run', rise: 'v0.7.0 released' },
  {
    label: 'KOMPUTE',
    gx: -1,
    gz: -3.6,
    base: 3,
    payload: 'gpu kernel',
    rise: 'cross-vendor build green',
  },
  {
    label: 'XAI',
    gx: 3.6,
    gz: -1.6,
    base: 2,
    payload: 'attribution',
    rise: 'explainer stage added',
  },
  {
    label: 'PROD ML',
    gx: 2.8,
    gz: 3,
    base: 2,
    payload: '550+ libraries',
    rise: 'catalogue curated',
  },
  {
    label: 'GUIDELINES',
    gx: -2.6,
    gz: 3.2,
    base: 2,
    payload: '15 economic areas',
    rise: 'regulation mapped',
  },
];

const ORBIT_R = 6.4; // contributor ring: clear of the pads, inside the plate
const ORBIT_COUNT = 12;
const ORBIT_GY = 0.34;
const BEAT = 2.2; // one merge lands per beat; a full lap of the five projects is ~11s
const CUBE_H = 0.9;
const HALF = 0.62;

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Off-token bright greens carry the "live signal" read: packets, payload text and the rising
// release phrase. Under light they collapse onto the accent ink, the only accent legible as text
// on a pale surface.
const SIGNAL_DARK: Rgb = [180, 255, 214];
const RISE_DARK: Rgb = [200, 255, 224];

const orbitPoint = (index: number, rotation: number): [number, number] => {
  const angle = rotation + (index / ORBIT_COUNT) * Math.PI * 2;
  return [Math.cos(angle) * ORBIT_R, Math.sin(angle) * ORBIT_R];
};

export class OpenSourceHeroLattice extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private canvas?: HTMLCanvasElement;
  private heights = PROJECTS.map((project) => project.base);
  private heat = PROJECTS.map(() => 0);
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
    this.engine = new CanvasEngine(canvas, this.draw, surfaceOf(this));
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
    const signalTone = palette.onLight ? palette.accentInk : SIGNAL_DARK;
    const riseTone = palette.onLight ? palette.accentInk : RISE_DARK;
    const time = reducedMotion ? 7 : elapsed + 3;
    // Per-embed tuning: data-scale multiplies the iso unit; data-center-x/-y shift the lattice
    // within the canvas (fractions of canvas size).
    const unit = Math.min(width, height) * 0.0295 * Number(this.dataset.scale || 1);
    const project = createIso(
      unit,
      width * Number(this.dataset.centerX || 0.6),
      height * Number(this.dataset.centerY || 0.54),
    );

    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.12;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.12;
    const cursorX = this.pointer.x * width;
    const cursorY = this.pointer.y * height;

    const beat = Math.floor(time / BEAT);
    const active = ((beat % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    const beatProgress = (time % BEAT) / BEAT;
    const rotation = reducedMotion ? 0.6 : time * 0.075;

    // Nearest pad to the cursor, then ease every heat toward it. Distance is measured to the
    // pad's vertical body rather than its ground point, so hovering a tall stack counts.
    let nearIndex = -1;
    if (this.pointer.active) {
      let best = unit * 5;
      PROJECTS.forEach((pad, index) => {
        const [sx, sy] = project(pad.gx, 0, pad.gz);
        const topY = project(pad.gx, this.heights[index], pad.gz)[1];
        const clampedY = Math.min(Math.max(cursorY, topY), sy);
        const distance = Math.hypot(cursorX - sx, cursorY - clampedY);
        if (distance < best) {
          best = distance;
          nearIndex = index;
        }
      });
    }
    const ease = reducedMotion ? 1 : 0.12;
    this.heat.forEach((value, index) => {
      this.heat[index] = value + ((nearIndex === index ? 1 : 0) - value) * ease;
    });

    drawIsoGrid(context, project, 7, rgba(palette.accentInk, 0.04));

    // Two stacked ground plates: the commons floor, then the raised deck the pads stand on.
    const plate = plateStyle(palette);
    drawIsoCube(context, project, 0, 0, 0, ORBIT_R + 1.1, 0.12, plate);
    drawIsoCube(context, project, 0, 0.12, 0, 4.4, 0.14, plate);

    const hub: IsoPoint = project(0, 0.16, 0);

    // The contributor orbit, drawn as a closed polyline of projected ring points so it reads as
    // a circle lying on the deck rather than a screen-space ellipse.
    context.strokeStyle = rgba(palette.accentInk, 0.1);
    context.lineWidth = 1;
    context.beginPath();
    for (let step = 0; step <= ORBIT_COUNT * 4; step += 1) {
      const angle = (step / (ORBIT_COUNT * 4)) * Math.PI * 2;
      const [x, y] = project(Math.cos(angle) * ORBIT_R, ORBIT_GY, Math.sin(angle) * ORBIT_R);
      if (step) context.lineTo(x, y);
      else context.moveTo(x, y);
    }
    context.closePath();
    context.stroke();

    // Conduits from the hub out to each pad, routed via the pad's axis corner. The active pad's
    // route stays warm through its beat; hover overrides it.
    const drawConduit = (pad: Project, index: number) => {
      const lit = clamp(Math.max(this.heat[index], index === active ? 0.4 : 0));
      const points = [
        [0, 0],
        [pad.gx, 0],
        [pad.gx, pad.gz],
      ].map(([gx, gz]) => project(gx, 0.16, gz));
      context.strokeStyle = rgba(palette.accentInk, 0.12 + lit * 0.42);
      context.lineWidth = 1 + lit * 0.9;
      context.beginPath();
      points.forEach((point, order) =>
        order ? context.lineTo(point[0], point[1]) : context.moveTo(point[0], point[1]),
      );
      context.stroke();
      if (reducedMotion) return;
      const segments = points.length - 1;
      for (let copy = 0; copy < 2; copy += 1) {
        const along = ((time * 0.28 + index * 0.4 + copy * 0.5) % 1) * segments;
        const segment = Math.min(segments - 1, Math.floor(along));
        const point = lerpPoint(points[segment], points[segment + 1], along - segment);
        if (lit > 0.05)
          drawGlow(context, point[0], point[1], unit * 0.5, 0.05 + lit * 0.3, palette.accentInk);
        context.beginPath();
        context.arc(point[0], point[1], 1.4, 0, Math.PI * 2);
        context.fillStyle = rgba(signalTone, 0.45 + lit * 0.45);
        context.fill();
        if (copy === 0 && lit > 0.35) {
          context.font = `${Math.max(7.5, unit * 0.4)}px 'Geist Mono', monospace`;
          context.fillStyle = rgba(signalTone, lit);
          context.textAlign = 'left';
          context.fillText(pad.payload, point[0] + unit * 0.45, point[1] - unit * 0.35);
          context.textAlign = 'start';
        }
      }
    };
    PROJECTS.forEach(drawConduit);

    // Contributors orbiting the commons. One of them is the sender for this beat: its packet
    // travels in to the active pad and lands as the beat completes.
    const sender = (beat * 5) % ORBIT_COUNT;
    for (let index = 0; index < ORBIT_COUNT; index += 1) {
      const [gx, gz] = orbitPoint(index, rotation);
      const sending = index === sender;
      const style = styleAt(sending ? 0.35 + (1 - beatProgress) * 0.4 : 0, palette);
      drawIsoCube(context, project, gx, ORBIT_GY, gz, 0.3, 0.45, style);
      if (sending) {
        const [px, py] = project(gx, ORBIT_GY + 0.5, gz);
        drawGlow(context, px, py, unit * 0.9, 0.16, palette.accentInk);
      }
    }

    // Central hub marker: the shared licence and governance the projects sit on.
    drawIsoCube(context, project, 0, 0.14, 0, 0.6, 0.5, styleAt(0, palette));
    drawGlow(context, hub[0], hub[1] - unit * 0.4, unit * 1.2, 0.14, palette.accentInk);

    // Project pads, drawn back to front so nearer stacks occlude further ones.
    [...PROJECTS.keys()]
      .sort((a, b) => PROJECTS[a].gx + PROJECTS[a].gz - (PROJECTS[b].gx + PROJECTS[b].gz))
      .forEach((index) => {
        const pad = PROJECTS[index];
        // Merges completed by this pad so far, capped into a four-cube cycle so the lattice
        // breathes instead of growing off the top of the canvas.
        const merged = Math.floor((beat - index + PROJECTS.length * 10) / PROJECTS.length);
        const target = pad.base + (merged % 4);
        this.heights[index] += (target - this.heights[index]) * (reducedMotion ? 1 : 0.08);
        const current = this.heights[index];
        const heat = this.heat[index];
        const style = styleAt(heat, palette);
        const full = Math.floor(current);
        const fraction = current - full;

        drawIsoCube(context, project, pad.gx, 0.26, pad.gz, 0.92, 0.18, style);
        for (let level = 0; level < full; level += 1) {
          drawIsoCube(context, project, pad.gx, 0.44 + level, pad.gz, HALF, CUBE_H, style);
        }
        if (fraction > 0.05) {
          drawIsoCube(
            context,
            project,
            pad.gx,
            0.44 + full,
            pad.gz,
            HALF,
            CUBE_H * fraction,
            style,
          );
        }

        const topPoint = project(pad.gx, 0.44 + current + 0.4, pad.gz);
        if (index === active) {
          const flash = clamp(1 - beatProgress);
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
        context.fillText(pad.label, topPoint[0], topPoint[1] - unit * 0.7);
        context.textAlign = 'start';
      });

    // The packet in flight: from this beat's contributor to the active pad, arriving as the beat
    // completes. Drawn after the pads so it stays visible over the stack it lands on.
    if (!reducedMotion) {
      const pad = PROJECTS[active];
      const [sx, sz] = orbitPoint(sender, rotation);
      const from = project(sx, ORBIT_GY + 0.5, sz);
      const to = project(pad.gx, 0.44 + this.heights[active], pad.gz);
      const travel = clamp(beatProgress / 0.8);
      const point = lerpPoint(from, to, travel * travel * (3 - 2 * travel));
      // Arc the packet above the straight line so it reads as a throw across the commons.
      point[1] -= Math.sin(travel * Math.PI) * unit * 1.6;
      drawGlow(context, point[0], point[1], unit * 0.9, 0.3, palette.accentInk);
      context.beginPath();
      context.arc(point[0], point[1], 2.1, 0, Math.PI * 2);
      context.fillStyle = rgba(signalTone, 0.9);
      context.fill();
    }

    // The release phrase rises off the active pad as its merge lands.
    const riseAlpha = clamp(Math.sin(beatProgress * Math.PI) * 1.5);
    if (riseAlpha > 0.02) {
      const pad = PROJECTS[active];
      const lift = 1.9 + beatProgress * 1.8;
      const risePoint = project(pad.gx, 0.44 + this.heights[active] + lift, pad.gz);
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
      context.fillText(pad.rise, risePoint[0], risePoint[1]);
      context.textAlign = 'start';
    }
  };
}

if (!customElements.get('open-source-hero-lattice')) {
  customElements.define('open-source-hero-lattice', OpenSourceHeroLattice);
}
