import { CanvasEngine, type CanvasDraw } from './CanvasEngine';

interface CategoryNode {
  label: string;
  x: number;
  y: number;
  phase: number;
}

const nodes: CategoryNode[] = [
  { label: 'SERVING', x: 0.18, y: 0.27, phase: 0.2 },
  { label: 'ORCHESTRATION', x: 0.46, y: 0.18, phase: 1.1 },
  { label: 'MONITORING', x: 0.76, y: 0.3, phase: 2.4 },
  { label: 'DATA', x: 0.29, y: 0.57, phase: 3.2 },
  { label: 'FEATURES', x: 0.63, y: 0.55, phase: 4.4 },
  { label: 'PRIVACY', x: 0.82, y: 0.75, phase: 5.1 },
  { label: 'TRAINING', x: 0.43, y: 0.82, phase: 5.8 },
  { label: 'REGISTRY', x: 0.12, y: 0.76, phase: 0.8 },
];

const edges: [number, number][] = [
  [0, 1],
  [0, 3],
  [1, 2],
  [1, 4],
  [2, 4],
  [2, 5],
  [3, 4],
  [3, 6],
  [3, 7],
  [4, 6],
  [5, 6],
  [6, 7],
];

const drawConstellation: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);
  const padding = Math.min(width, height) * 0.1;
  const points = nodes.map((node) => ({
    ...node,
    screenX: padding + node.x * (width - padding * 2) + Math.sin(elapsed * 0.35 + node.phase) * 8,
    screenY: padding + node.y * (height - padding * 2) + Math.cos(elapsed * 0.28 + node.phase) * 6,
  }));

  context.lineWidth = 1;
  context.strokeStyle = 'rgba(244,242,238,.13)';
  edges.forEach(([from, to]) => {
    context.beginPath();
    context.moveTo(points[from].screenX, points[from].screenY);
    context.lineTo(points[to].screenX, points[to].screenY);
    context.stroke();
  });

  context.font = "10px 'Geist Mono', monospace";
  points.forEach((point, index) => {
    const pulse = 0.6 + Math.sin(elapsed * 0.7 + point.phase) * 0.25;
    context.beginPath();
    context.arc(point.screenX, point.screenY, index % 3 === 0 ? 4 : 3, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${pulse})`;
    context.fill();
    context.fillStyle = 'rgba(244,242,238,.6)';
    context.fillText(point.label, point.screenX + 10, point.screenY + 4);
  });
};

export class CategoryConstellation extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawConstellation);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('category-constellation')) {
  customElements.define('category-constellation', CategoryConstellation);
}
