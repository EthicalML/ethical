import { CanvasEngine, type CanvasDraw } from './CanvasEngine';

interface Hub {
  label: string;
  orbitX: number;
  orbitY: number;
  phase: number;
  x: number;
  y: number;
}

const HUBS: Hub[] = [
  { label: 'EC', orbitX: 92, orbitY: 54, phase: 0.3, x: 0.25, y: 0.29 },
  { label: 'UN', orbitX: 74, orbitY: 44, phase: 2.2, x: 0.73, y: 0.25 },
  { label: 'ACM', orbitX: 88, orbitY: 50, phase: 4.1, x: 0.76, y: 0.7 },
  { label: 'ISO / IEEE', orbitX: 96, orbitY: 49, phase: 5.4, x: 0.29, y: 0.74 },
];

const smooth = (value: number) => value * value * (3 - 2 * value);
const pulseWindow = (value: number, start: number, length: number) => {
  const progress = (value - start) / length;
  return progress >= 0 && progress <= 1 ? Math.sin(progress * Math.PI) : 0;
};

const drawOrbitalAssembly: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);

  const time = elapsed + 5.4;
  const center = { x: width * 0.54, y: height * 0.51 };
  const scale = Math.min(width / 920, height / 650);
  const cycle = time % 15;
  const assembly =
    cycle < 12.8 ? smooth(Math.min(1, cycle / 10.5)) : 1 - smooth((cycle - 12.8) / 2.2);

  const field = context.createRadialGradient(
    center.x,
    center.y,
    8,
    center.x,
    center.y,
    250 * scale,
  );
  field.addColorStop(0, 'rgba(94,230,160,.075)');
  field.addColorStop(0.42, 'rgba(94,230,160,.025)');
  field.addColorStop(1, 'rgba(94,230,160,0)');
  context.fillStyle = field;
  context.fillRect(0, 0, width, height);

  HUBS.forEach((hub, hubIndex) => {
    const hubX = width * hub.x;
    const hubY = height * hub.y;
    const orbitX = hub.orbitX * scale;
    const orbitY = hub.orbitY * scale;

    context.beginPath();
    context.ellipse(hubX, hubY, orbitX, orbitY, -0.15 + hubIndex * 0.13, 0, Math.PI * 2);
    context.setLineDash([2, 8]);
    context.lineDashOffset = time * (hubIndex % 2 ? 1.8 : -1.4);
    context.strokeStyle = 'rgba(244,242,238,.075)';
    context.lineWidth = 0.8;
    context.stroke();
    context.setLineDash([]);

    const hubGlow = context.createRadialGradient(hubX, hubY, 0, hubX, hubY, 34 * scale);
    hubGlow.addColorStop(0, 'rgba(94,230,160,.16)');
    hubGlow.addColorStop(1, 'rgba(94,230,160,0)');
    context.fillStyle = hubGlow;
    context.fillRect(hubX - 36 * scale, hubY - 36 * scale, 72 * scale, 72 * scale);

    context.beginPath();
    context.arc(hubX, hubY, 5.2 * scale, 0, Math.PI * 2);
    context.fillStyle = 'rgba(94,230,160,.78)';
    context.fill();
    context.beginPath();
    context.arc(hubX, hubY, 12 * scale, 0, Math.PI * 2);
    context.strokeStyle = 'rgba(94,230,160,.19)';
    context.stroke();
    context.font = `${Math.max(8, 9 * scale)}px 'Geist Mono', monospace`;
    context.fillStyle = 'rgba(244,242,238,.48)';
    context.textAlign = 'center';
    context.fillText(hub.label, hubX, hubY - 18 * scale);

    for (let nodeIndex = 0; nodeIndex < 6; nodeIndex += 1) {
      const angle = hub.phase + nodeIndex * 1.047 + time * (0.055 + hubIndex * 0.006);
      const depth = (Math.sin(angle) + 1) / 2;
      const x = hubX + Math.cos(angle) * orbitX;
      const y = hubY + Math.sin(angle) * orbitY;
      const radius = (1.4 + (nodeIndex % 3) * 0.65) * (0.74 + depth * 0.36) * scale;

      context.beginPath();
      context.moveTo(hubX, hubY);
      context.lineTo(x, y);
      context.strokeStyle = `rgba(244,242,238,${0.025 + depth * 0.035})`;
      context.lineWidth = 0.7;
      context.stroke();
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(244,242,238,${0.2 + depth * 0.38})`;
      context.fill();
      if (nodeIndex === hubIndex) {
        context.beginPath();
        context.arc(x, y, radius + 5 * scale, 0, Math.PI * 2);
        context.strokeStyle = `rgba(94,230,160,${0.08 + depth * 0.11})`;
        context.stroke();
      }
    }

    const travel = pulseWindow(cycle, 1.15 + hubIndex * 2.25, 2.1);
    if (travel > 0) {
      const progress = Math.acos(1 - (2 * (cycle - (1.15 + hubIndex * 2.25))) / 2.1) / Math.PI;
      const x = hubX + (center.x - hubX) * progress;
      const y = hubY + (center.y - hubY) * progress;
      context.beginPath();
      context.moveTo(hubX, hubY);
      context.lineTo(center.x, center.y);
      context.strokeStyle = `rgba(94,230,160,${travel * 0.14})`;
      context.lineWidth = 1;
      context.stroke();
      context.beginPath();
      context.arc(x, y, (2.2 + travel * 1.4) * scale, 0, Math.PI * 2);
      context.fillStyle = `rgba(94,230,160,${travel * 0.84})`;
      context.fill();
    }
  });

  context.save();
  context.translate(center.x, center.y);
  context.rotate(-Math.PI / 6);
  for (let segment = 0; segment < 8; segment += 1) {
    const segmentStart = segment / 8;
    const visibility = Math.max(0, Math.min(1, (assembly - segmentStart) * 8));
    if (visibility <= 0) continue;
    const angle = (segment / 8) * Math.PI * 2;
    context.beginPath();
    context.arc(0, 0, 30 * scale, angle + 0.055, angle + Math.PI / 4 - 0.055);
    context.strokeStyle = `rgba(94,230,160,${0.18 + visibility * 0.58})`;
    context.lineWidth = 3.4 * scale;
    context.stroke();
  }
  context.rotate(Math.PI / 6);
  context.beginPath();
  for (let side = 0; side < 6; side += 1) {
    const angle = -Math.PI / 2 + (side / 6) * Math.PI * 2;
    const x = Math.cos(angle) * 15 * scale;
    const y = Math.sin(angle) * 15 * scale;
    if (side) context.lineTo(x, y);
    else context.moveTo(x, y);
  }
  context.closePath();
  context.fillStyle = 'rgba(19,20,20,.92)';
  context.fill();
  context.strokeStyle = `rgba(244,242,238,${0.12 + assembly * 0.38})`;
  context.lineWidth = 1;
  context.stroke();
  context.beginPath();
  context.arc(0, 0, (2.5 + assembly * 2) * scale, 0, Math.PI * 2);
  context.fillStyle = `rgba(94,230,160,${0.35 + assembly * 0.6})`;
  context.fill();
  context.restore();
  context.textAlign = 'left';
};

export class PolicyHero1 extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawOrbitalAssembly);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-hero-1')) customElements.define('policy-hero-1', PolicyHero1);
