import { CanvasEngine, type CanvasDraw } from './CanvasEngine';

interface Anchor {
  label: string;
  x: number;
  y: number;
}

interface Arc {
  controlX: number;
  controlY: number;
  from: number;
  phase: number;
  to: number;
}

const ANCHORS: Anchor[] = [
  { label: 'EU', x: 0.3, y: 0.32 },
  { label: 'UK', x: 0.61, y: 0.18 },
  { label: 'US', x: 0.78, y: 0.58 },
  { label: 'LATAM', x: 0.39, y: 0.76 },
];

const ARCS: Arc[] = [
  { controlX: 0.42, controlY: 0.08, from: 0, phase: 0, to: 1 },
  { controlX: 0.82, controlY: 0.2, from: 1, phase: 1.4, to: 2 },
  { controlX: 0.82, controlY: 0.88, from: 2, phase: 2.8, to: 3 },
  { controlX: 0.12, controlY: 0.55, from: 3, phase: 4.2, to: 0 },
  { controlX: 0.55, controlY: 0.44, from: 0, phase: 5.5, to: 2 },
  { controlX: 0.47, controlY: 0.46, from: 1, phase: 6.8, to: 3 },
];

const pointOnArc = (
  start: Anchor,
  end: Anchor,
  control: { x: number; y: number },
  progress: number,
  width: number,
  height: number,
) => {
  const inverse = 1 - progress;
  return {
    x:
      (inverse * inverse * start.x +
        2 * inverse * progress * control.x +
        progress * progress * end.x) *
      width,
    y:
      (inverse * inverse * start.y +
        2 * inverse * progress * control.y +
        progress * progress * end.y) *
      height,
  };
};

const drawJurisdictionArcs: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);
  const scale = Math.min(width / 920, height / 650);

  context.lineWidth = 0.7;
  for (let ring = 0; ring < 4; ring += 1) {
    context.beginPath();
    context.ellipse(
      width * 0.54,
      height * 0.48,
      width * (0.19 + ring * 0.105),
      height * (0.12 + ring * 0.07),
      -0.12,
      0,
      Math.PI * 2,
    );
    context.strokeStyle = `rgba(244,242,238,${0.025 + ring * 0.009})`;
    context.stroke();
  }

  ARCS.forEach((arc, index) => {
    const start = ANCHORS[arc.from];
    const end = ANCHORS[arc.to];
    const control = { x: arc.controlX, y: arc.controlY };
    const newest = index === Math.floor(elapsed / 6) % ARCS.length;
    const drawProgress = newest ? 0.12 + ((elapsed % 6) / 6) * 0.88 : 1;
    const steps = 70;

    context.beginPath();
    for (let step = 0; step <= steps * drawProgress; step += 1) {
      const point = pointOnArc(start, end, control, step / steps, width, height);
      if (step) context.lineTo(point.x, point.y);
      else context.moveTo(point.x, point.y);
    }
    context.strokeStyle = newest ? 'rgba(94,230,160,.19)' : 'rgba(244,242,238,.105)';
    context.lineWidth = newest ? 1.15 : 0.8;
    context.stroke();

    const pulseProgress = (elapsed * 0.085 + arc.phase) % 1;
    const pulse = pointOnArc(start, end, control, pulseProgress, width, height);
    const visibility = Math.sin(pulseProgress * Math.PI);
    context.beginPath();
    context.arc(pulse.x, pulse.y, (1.8 + visibility * 1.5) * scale, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${visibility * 0.72})`;
    context.fill();

    if (pulseProgress > 0.9) {
      const arrival = (pulseProgress - 0.9) / 0.1;
      const endX = end.x * width;
      const endY = end.y * height;
      context.beginPath();
      context.arc(endX, endY, (7 + arrival * 22) * scale, 0, Math.PI * 2);
      context.strokeStyle = `rgba(94,230,160,${(1 - arrival) * 0.24})`;
      context.lineWidth = 1;
      context.stroke();
    }
  });

  ANCHORS.forEach((anchor, index) => {
    const x = anchor.x * width;
    const y = anchor.y * height;
    const breathing = 1 + Math.sin(elapsed * 0.45 + index) * 0.08;
    const glow = context.createRadialGradient(x, y, 0, x, y, 32 * scale);
    glow.addColorStop(0, 'rgba(94,230,160,.13)');
    glow.addColorStop(1, 'rgba(94,230,160,0)');
    context.fillStyle = glow;
    context.fillRect(x - 34 * scale, y - 34 * scale, 68 * scale, 68 * scale);
    context.beginPath();
    context.arc(x, y, 4.3 * breathing * scale, 0, Math.PI * 2);
    context.fillStyle = 'rgba(94,230,160,.74)';
    context.fill();
    context.beginPath();
    context.arc(x, y, 11 * scale, 0, Math.PI * 2);
    context.strokeStyle = 'rgba(244,242,238,.15)';
    context.stroke();
    context.font = `${Math.max(8, 9 * scale)}px 'Geist Mono', monospace`;
    context.fillStyle = 'rgba(244,242,238,.48)';
    context.textAlign = 'center';
    context.fillText(anchor.label, x, y - 18 * scale);
  });
  context.textAlign = 'left';
};

export class PolicyHero2 extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawJurisdictionArcs);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-hero-2')) customElements.define('policy-hero-2', PolicyHero2);
