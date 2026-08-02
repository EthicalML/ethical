import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import { createIso, drawIsoCube, drawIsoGrid } from './PolicyHeroIso';
import { drawGlow, hash } from './PolicyHeroShared';

interface Column {
  amp: number;
  base: number;
  gx: number;
  gz: number;
  phase: number;
  pulse: boolean;
  speed: number;
}

// Compact diamond cluster: every grid cell within Manhattan radius 2 of the centre.
const COLUMNS: Column[] = [];
{
  let index = 0;
  for (let gx = -2; gx <= 2; gx += 1) {
    for (let gz = -2; gz <= 2; gz += 1) {
      if (Math.abs(gx) + Math.abs(gz) > 2) continue;
      COLUMNS.push({
        gx,
        gz,
        base: 0.6 + hash(index, 71) * 0.6,
        amp: 1.4 + hash(index, 72) * 1.6,
        speed: 0.34 + hash(index, 73) * 0.3,
        phase: hash(index, 74) * Math.PI * 2,
        pulse: hash(index, 75) > 0.55,
      });
      index += 1;
    }
  }
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HALF = 0.46;
const CUBE_H = 0.9;

const CUBE_STYLE = {
  top: 'rgba(32,37,34,1)',
  right: 'rgba(20,23,21,1)',
  left: 'rgba(13,15,14,1)',
  edge: 'rgba(150,170,158,0.14)',
  edgeWidth: 1,
};
const CUBE_STYLE_HOT = {
  top: 'rgba(38,52,44,1)',
  right: 'rgba(24,34,29,1)',
  left: 'rgba(16,24,20,1)',
  edge: 'rgba(94,230,160,0.5)',
  edgeWidth: 1.1,
};

export class PolicyHeroIsometricAssembly extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
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
    const time = reducedMotion ? 3.4 : elapsed + 3;
    const unit = Math.min(width, height) * 0.052;
    const originX = width * 0.6;
    const originY = height * 0.6;
    const project = createIso(unit, originX, originY);

    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.12;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.12;
    const cursorX = this.pointer.x * width;
    const cursorY = this.pointer.y * height;

    drawIsoGrid(context, project, 4, 'rgba(94,230,160,0.05)');

    // Hexagonal base plate under the cluster.
    const hex: [number, number][] = Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
      return [Math.cos(angle) * 3.1, Math.sin(angle) * 3.1];
    });
    context.beginPath();
    hex.forEach(([hx, hz], i) => {
      const [sx, sy] = project(hx, 0, hz);
      if (i) context.lineTo(sx, sy);
      else context.moveTo(sx, sy);
    });
    context.closePath();
    context.fillStyle = 'rgba(18,22,20,0.6)';
    context.fill();
    context.strokeStyle = 'rgba(94,230,160,0.16)';
    context.lineWidth = 1;
    context.stroke();

    // Nearest column to the cursor lifts and glows (local hover).
    let nearest = -1;
    let nearestDistance = Infinity;
    if (this.pointer.active) {
      COLUMNS.forEach((column, index) => {
        const [sx, sy] = project(column.gx, 0, column.gz);
        const distance = Math.hypot(cursorX - sx, cursorY - sy);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      });
      if (nearestDistance > unit * 3) nearest = -1;
    }

    const ordered = COLUMNS.map((column, index) => ({ column, index })).sort(
      (a, b) => a.column.gx + a.column.gz - (b.column.gx + b.column.gz),
    );

    ordered.forEach(({ column, index }) => {
      const wave = 0.5 + 0.5 * Math.sin(time * column.speed + column.phase);
      const stackHeight = column.base + column.amp * wave;
      const full = Math.floor(stackHeight);
      const frac = stackHeight - full;
      const hot = index === nearest;
      const lift = hot ? 3.5 / unit : 0;
      const style = hot ? CUBE_STYLE_HOT : CUBE_STYLE;

      for (let k = 0; k < full; k += 1) {
        drawIsoCube(context, project, column.gx, k + lift, column.gz, HALF, CUBE_H, style);
      }
      if (frac > 0.05) {
        // Settling block: rises the last fraction into place.
        const rise = (1 - frac) * 0.12;
        drawIsoCube(
          context,
          project,
          column.gx,
          full + lift + rise,
          column.gz,
          HALF,
          CUBE_H * frac,
          style,
        );
      }

      if (hot) {
        const [gx, gy] = project(column.gx, stackHeight + lift + 0.6, column.gz);
        drawGlow(context, gx, gy, unit * 1.6, 0.22);
      }

      // Neon pulse travelling up the front vertical edge.
      if (column.pulse && !reducedMotion) {
        const t = (time * 0.4 + column.phase) % 1;
        const bottom = project(column.gx + HALF, lift, column.gz + HALF);
        const top = project(column.gx + HALF, stackHeight + lift, column.gz + HALF);
        const px = bottom[0] + (top[0] - bottom[0]) * t;
        const py = bottom[1] + (top[1] - bottom[1]) * t;
        drawGlow(context, px, py, unit * 0.7, 0.4 * (1 - Math.abs(t - 0.5) * 1.2));
        context.beginPath();
        context.arc(px, py, 1.6, 0, Math.PI * 2);
        context.fillStyle = 'rgba(180,255,214,0.9)';
        context.fill();
      }
    });
  };
}

if (!customElements.get('policy-hero-isometric-assembly')) {
  customElements.define('policy-hero-isometric-assembly', PolicyHeroIsometricAssembly);
}
