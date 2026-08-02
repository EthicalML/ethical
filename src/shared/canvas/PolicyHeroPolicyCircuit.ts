import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import { createIso, drawIsoCube, drawIsoGrid, type IsoPoint, lerpPoint } from './PolicyHeroIso';
import { clamp, drawGlow } from './PolicyHeroShared';

interface Tower {
  base: number;
  gx: number;
  gz: number;
  label: string;
}

// One tower per policy track from /policy/, arranged around a central hub.
const TOWERS: Tower[] = [
  { label: 'EU AI ACT', gx: -3, gz: -1, base: 2 },
  { label: 'EU DIGITAL ACTS', gx: -1, gz: -3, base: 1 },
  { label: 'UK', gx: 3, gz: -2, base: 2 },
  { label: 'UN & GLOBAL', gx: 2.5, gz: 3, base: 1 },
  { label: 'SUSTAINABILITY', gx: -2.5, gz: 3, base: 2 },
];

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HALF = 0.5;
const CUBE_H = 0.9;
const BEAT = 2.0;

const CUBE_STYLE = {
  top: 'rgba(32,37,34,1)',
  right: 'rgba(20,23,21,1)',
  left: 'rgba(13,15,14,1)',
  edge: 'rgba(150,170,158,0.15)',
  edgeWidth: 1,
};
const CUBE_STYLE_HOT = {
  top: 'rgba(40,55,46,1)',
  right: 'rgba(25,36,30,1)',
  left: 'rgba(16,25,21,1)',
  edge: 'rgba(94,230,160,0.55)',
  edgeWidth: 1.1,
};

export class PolicyHeroPolicyCircuit extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private heights = TOWERS.map((tower) => tower.base);
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
    const time = reducedMotion ? 6 : elapsed + 3;
    const unit = Math.min(width, height) * 0.05;
    const project = createIso(unit, width * 0.58, height * 0.52);

    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.12;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.12;
    const cursorX = this.pointer.x * width;
    const cursorY = this.pointer.y * height;

    // Beat: every BEAT seconds the active tower advances a segment; a full lap is ~10s.
    const beat = Math.floor(time / BEAT);
    const active = ((beat % TOWERS.length) + TOWERS.length) % TOWERS.length;
    const flash = clamp(1 - (time % BEAT) / BEAT);

    drawIsoGrid(context, project, 5, 'rgba(94,230,160,0.045)');

    // Circuit board: a large low plate under the whole scene.
    drawIsoCube(context, project, 0, 0, 0, 4.4, 0.14, {
      top: 'rgba(16,19,17,0.92)',
      right: 'rgba(11,13,12,0.92)',
      left: 'rgba(8,10,9,0.92)',
      edge: 'rgba(94,230,160,0.1)',
      edgeWidth: 1,
    });

    // Nearest tower to the cursor.
    let nearest = -1;
    let nearestDistance = Infinity;
    if (this.pointer.active) {
      TOWERS.forEach((tower, index) => {
        const [sx, sy] = project(tower.gx, 0, tower.gz);
        const distance = Math.hypot(cursorX - sx, cursorY - sy);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      });
      if (nearestDistance > unit * 3.5) nearest = -1;
    }

    // Conduits from the hub to each tower, carrying travelling light pulses.
    const hub: IsoPoint = project(0, 0.16, 0);
    TOWERS.forEach((tower, index) => {
      const corner: IsoPoint = project(tower.gx, 0.16, 0);
      const foot: IsoPoint = project(tower.gx, 0.16, tower.gz);
      const hot = index === nearest || index === active;
      context.strokeStyle = hot ? 'rgba(94,230,160,0.5)' : 'rgba(94,230,160,0.16)';
      context.lineWidth = hot ? 1.6 : 1;
      context.beginPath();
      context.moveTo(hub[0], hub[1]);
      context.lineTo(corner[0], corner[1]);
      context.lineTo(foot[0], foot[1]);
      context.stroke();

      if (!reducedMotion) {
        for (let p = 0; p < 2; p += 1) {
          const t = (time * 0.28 + index * 0.4 + p * 0.5) % 1;
          const point =
            t < 0.5 ? lerpPoint(hub, corner, t * 2) : lerpPoint(corner, foot, (t - 0.5) * 2);
          drawGlow(context, point[0], point[1], unit * 0.5, 0.35);
          context.beginPath();
          context.arc(point[0], point[1], 1.5, 0, Math.PI * 2);
          context.fillStyle = 'rgba(180,255,214,0.85)';
          context.fill();
        }
      }
    });

    // Central hub marker.
    drawIsoCube(context, project, 0, 0.14, 0, 0.6, 0.5, CUBE_STYLE);
    drawGlow(context, hub[0], hub[1] - unit * 0.4, unit * 1.2, 0.16);

    // Towers, drawn back to front.
    const ordered = TOWERS.map((tower, index) => ({ tower, index })).sort(
      (a, b) => a.tower.gx + a.tower.gz - (b.tower.gx + b.tower.gz),
    );

    ordered.forEach(({ tower, index }) => {
      const completed = Math.floor((beat - index + TOWERS.length * 10) / TOWERS.length);
      const target = tower.base + (completed % 4);
      this.heights[index] += (target - this.heights[index]) * (reducedMotion ? 1 : 0.08);
      const current = this.heights[index];
      const hot = index === nearest;
      const style = hot ? CUBE_STYLE_HOT : CUBE_STYLE;
      const full = Math.floor(current);
      const frac = current - full;

      // Small raised pad under the tower.
      drawIsoCube(context, project, tower.gx, 0.14, tower.gz, 0.72, 0.16, style);
      for (let k = 0; k < full; k += 1) {
        drawIsoCube(context, project, tower.gx, 0.3 + k, tower.gz, HALF, CUBE_H, style);
      }
      if (frac > 0.05) {
        drawIsoCube(context, project, tower.gx, 0.3 + full, tower.gz, HALF, CUBE_H * frac, style);
      }

      const topPoint = project(tower.gx, 0.3 + current + 0.4, tower.gz);
      if (index === active) {
        drawGlow(context, topPoint[0], topPoint[1], unit * (1.4 + flash), 0.15 + flash * 0.32);
      } else if (hot) {
        drawGlow(context, topPoint[0], topPoint[1], unit * 1.3, 0.2);
      }

      // Tiny mono track label.
      context.font = `${Math.max(7.5, unit * 0.42)}px 'Geist Mono', monospace`;
      context.fillStyle =
        hot || index === active ? 'rgba(180,255,214,0.92)' : 'rgba(244,242,238,0.5)';
      context.textAlign = 'center';
      context.fillText(tower.label, topPoint[0], topPoint[1] - unit * 0.7);
      context.textAlign = 'start';
    });
  };
}

if (!customElements.get('policy-hero-policy-circuit')) {
  customElements.define('policy-hero-policy-circuit', PolicyHeroPolicyCircuit);
}
