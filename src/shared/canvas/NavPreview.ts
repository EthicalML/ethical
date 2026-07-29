import { CanvasEngine, type CanvasPointer } from './CanvasEngine';
import { createCubeDrawer } from './KomputeCube';

type Point = [number, number];

const drawXai = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsed: number,
) => {
  context.clearRect(0, 0, width, height);
  const labels = ['Data analysis', 'Model evaluation', 'Production monitoring'];
  const notes = ['DISTRIBUTIONS · PROXIES', 'ATTRIBUTION · SUBGROUPS', 'DRIFT · OUTLIERS'];
  context.font = "12px 'Geist',sans-serif";
  labels.forEach((label, index) => {
    const y = 28 + index * 54;
    context.fillStyle = 'rgba(244,242,238,.88)';
    context.fillText(label, 16, y);
    context.textAlign = 'right';
    context.font = "8px 'Geist Mono',monospace";
    context.fillStyle = 'rgba(244,242,238,.42)';
    context.fillText(notes[index], width - 16, y);
    context.textAlign = 'left';
    context.fillStyle = 'rgba(255,255,255,.07)';
    context.fillRect(16, y + 12, width - 32, 8);
    const sweepWidth = (width - 32) * 0.32;
    const sweepX =
      16 - sweepWidth + ((elapsed * 0.42 + index * 0.28) % 1) * (width - 32 + sweepWidth);
    const gradient = context.createLinearGradient(sweepX, 0, sweepX + sweepWidth, 0);
    gradient.addColorStop(0, 'rgba(94,230,160,0)');
    gradient.addColorStop(0.5, '#5ee6a0');
    gradient.addColorStop(1, 'rgba(94,230,160,0)');
    context.fillStyle = gradient;
    context.fillRect(
      Math.max(16, sweepX),
      y + 12,
      Math.min(width - 16, sweepX + sweepWidth) - Math.max(16, sweepX),
      8,
    );
    context.font = "12px 'Geist',sans-serif";
  });
};

const drawEcosystem = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsed: number,
) => {
  context.clearRect(0, 0, width, height);
  const rows: [string, number][] = [
    ['Serving & inference', 48],
    ['Orchestration & pipelines', 37],
    ['Monitoring & observability', 31],
    ['Feature & vector stores', 24],
    ['Explainability & fairness', 22],
    ['ML security', 17],
    ['GPU & acceleration', 15],
  ];
  context.font = "10px 'Geist',sans-serif";
  rows.forEach(([label, count], index) => {
    const y = 20 + index * 24;
    const growth = Math.min(1, Math.max(0, elapsed * 0.8 - index * 0.08));
    context.fillStyle = 'rgba(244,242,238,.68)';
    context.fillText(label, 10, y);
    context.fillStyle = 'rgba(255,255,255,.07)';
    context.fillRect(width * 0.55, y - 8, width * 0.35, 7);
    context.fillStyle = 'rgba(94,230,160,.6)';
    context.fillRect(width * 0.55, y - 8, width * 0.35 * (count / 48) * growth, 7);
    context.textAlign = 'right';
    context.fillStyle = 'rgba(244,242,238,.45)';
    context.fillText(String(Math.round(count * growth)), width - 8, y);
    context.textAlign = 'left';
  });
};

const drawKaosPreview = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsed: number,
) => {
  context.clearRect(0, 0, width, height);
  const nodes: Point[] = [
    [0.5, 0.13],
    [0.18, 0.4],
    [0.5, 0.42],
    [0.82, 0.4],
    [0.5, 0.68],
    [0.25, 0.87],
    [0.75, 0.87],
  ];
  const edges: Point[] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 5],
    [4, 6],
    [5, 0],
  ];
  const padding = 34;
  const points = nodes.map(([x, y]): Point => [
    padding + x * (width - padding * 2),
    padding + y * (height - padding * 2),
  ]);

  edges.forEach(([from, to], edgeIndex) => {
    const start = points[from];
    const end = points[to];
    context.strokeStyle = 'rgba(244,242,238,.16)';
    context.beginPath();
    context.moveTo(...start);
    context.lineTo(...end);
    context.stroke();
    for (let index = 0; index < 2; index += 1) {
      const progress = (elapsed * 0.34 + edgeIndex * 0.17 + index * 0.5) % 1;
      context.fillStyle = `rgba(94,230,160,${0.25 + Math.sin(progress * Math.PI) * 0.6})`;
      context.beginPath();
      context.arc(
        start[0] + (end[0] - start[0]) * progress,
        start[1] + (end[1] - start[1]) * progress,
        2,
        0,
        7,
      );
      context.fill();
    }
  });
  points.forEach((point, index) => {
    context.fillStyle = '#0f100f';
    context.strokeStyle = index === 4 ? '#e8b45c' : 'rgba(94,230,160,.65)';
    context.beginPath();
    context.arc(point[0], point[1], index === 0 || index === 4 ? 14 : 11, 0, 7);
    context.fill();
    context.stroke();
  });
};

export class NavPreview extends HTMLElement {
  static observedAttributes = ['mode'];

  private cube = createCubeDrawer();
  private engine?: CanvasEngine;

  attributeChangedCallback() {
    this.engine?.redraw();
  }

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (!canvas) return;

    this.engine = new CanvasEngine(
      canvas,
      (
        context: CanvasRenderingContext2D,
        width: number,
        height: number,
        elapsed: number,
        pointer: CanvasPointer,
      ) => {
        const mode = this.getAttribute('mode');
        context.clearRect(0, 0, width, height);
        if (mode === 'kompute') this.cube(context, width, height, elapsed, pointer);
        else if (mode === 'xai') drawXai(context, width, height * 0.72, elapsed);
        else if (mode === 'list') drawEcosystem(context, width, height * 0.72, elapsed);
        else drawKaosPreview(context, width, height, elapsed);
      },
    );
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('nav-preview')) {
  customElements.define('nav-preview', NavPreview);
}
