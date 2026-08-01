import { CanvasEngine, type CanvasDraw } from './CanvasEngine';

interface PolicyNode {
  phase: number;
  track: number;
  x: number;
}

const trackCounts = [11, 7, 3, 4, 3];
const nodes: PolicyNode[] = trackCounts.flatMap((count, track) =>
  Array.from({ length: count }, (_, index) => ({
    phase: track * 1.37 + index * 0.79,
    track,
    x: 0.08 + (index / Math.max(1, count - 1)) * 0.84,
  })),
);

const drawTimeline: CanvasDraw = (context, width, height, elapsed, pointer) => {
  context.clearRect(0, 0, width, height);

  const left = width * 0.08;
  const right = width * 0.94;
  const top = height * 0.2;
  const gap = (height * 0.6) / (trackCounts.length - 1);
  const parallaxX = (pointer.x - 0.5) * 8;
  const parallaxY = (pointer.y - 0.5) * 5;

  context.font = "9px 'Geist Mono', monospace";
  context.lineWidth = 1;

  for (let track = 0; track < trackCounts.length; track += 1) {
    const y = top + track * gap + parallaxY * (track / trackCounts.length);
    context.beginPath();
    context.moveTo(left, y);
    context.lineTo(right, y);
    context.strokeStyle = 'rgba(244,242,238,.09)';
    context.stroke();
  }

  ['2020', '2022', '2024', '2026'].forEach((year, index) => {
    const x = left + (index / 3) * (right - left);
    context.beginPath();
    context.moveTo(x, top - 20);
    context.lineTo(x, top + gap * 4 + 20);
    context.setLineDash([2, 8]);
    context.strokeStyle = 'rgba(244,242,238,.06)';
    context.stroke();
    context.setLineDash([]);
    context.fillStyle = 'rgba(244,242,238,.25)';
    context.fillText(year, x + 6, top - 28);
  });

  nodes.forEach((node, index) => {
    const driftX = Math.sin(elapsed * 0.16 + node.phase) * 4;
    const driftY = Math.cos(elapsed * 0.13 + node.phase) * 3;
    const x = left + node.x * (right - left) + driftX + parallaxX;
    const y = top + node.track * gap + driftY;
    const featured = index === 0 || index === 7 || index === 17 || index === 22 || index === 25;
    const pulse = featured ? 0.55 + Math.sin(elapsed * 0.4 + node.phase) * 0.12 : 0.28;

    context.beginPath();
    context.arc(x, y, featured ? 3.1 : 2.1, 0, Math.PI * 2);
    context.fillStyle = featured ? `rgba(94,230,160,${pulse})` : 'rgba(244,242,238,.34)';
    context.fill();

    if (featured) {
      context.beginPath();
      context.arc(x, y, 8, 0, Math.PI * 2);
      context.strokeStyle = 'rgba(94,230,160,.12)';
      context.stroke();
    }
  });
};

export class PolicyTimeline extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawTimeline);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-timeline')) {
  customElements.define('policy-timeline', PolicyTimeline);
}
