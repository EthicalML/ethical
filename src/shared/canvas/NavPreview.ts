import { CanvasEngine, type CanvasPalette, type CanvasPointer, rgba, rgbCss } from './CanvasEngine';
import { createCubeDrawer } from './KomputeCube';
import { createGalaxyDrawer } from './KaosArchitecture';

const XAI_STEPS = [
  ['01', 'Data analysis', 'DISTRIBUTIONS · PROXIES'],
  ['02', 'Model evaluation', 'ATTRIBUTION · SUBGROUPS'],
  ['03', 'Production monitoring', 'DRIFT · OUTLIERS'],
] as const;

const drawXai = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsed: number,
  palette: CanvasPalette,
) => {
  const pad = 26;
  const gap = 24;
  const cardWidth = (width - pad * 2 - gap * 2) / 3;
  const cardHeight = Math.min(150, height * 0.42);
  const cardY = height * 0.5 - cardHeight * 0.62;
  const laneY = cardY + cardHeight * 0.5;
  const cycle = (elapsed * 0.14) % 1.2;
  const packetX = pad - 30 + cycle * (width - pad * 2 + 60);

  XAI_STEPS.forEach(([number, title, note], index) => {
    const x = pad + index * (cardWidth + gap);
    const centerX = x + cardWidth / 2;
    const passed = packetX > centerX;
    const near = Math.abs(packetX - centerX) < cardWidth * 0.55;

    context.strokeStyle = near ? rgba(palette.accentInk, 0.75) : rgba(palette.ink, 0.16);
    context.lineWidth = near ? 1.4 : 1;
    context.strokeRect(x, cardY, cardWidth, cardHeight);
    context.fillStyle = near ? rgba(palette.accent, 0.05) : rgba(palette.wash, 0.015);
    context.fillRect(x, cardY, cardWidth, cardHeight);

    context.textAlign = 'left';
    context.font = "9px 'Geist Mono',monospace";
    context.fillStyle = rgba(palette.accentInk, 0.8);
    context.fillText(number, x + 14, cardY + 24);
    context.fillStyle = rgba(palette.ink, 0.4);
    context.font = "7.5px 'Geist Mono',monospace";
    context.fillText('CHECKPOINT', x + 34, cardY + 24);
    context.font = "13px 'Geist',sans-serif";
    context.fillStyle = rgba(palette.ink, 0.9);
    context.fillText(title, x + 14, cardY + 52, cardWidth - 28);
    context.font = "7.5px 'Geist Mono',monospace";
    context.fillStyle = rgba(palette.ink, 0.42);
    context.fillText(note, x + 14, cardY + 72, cardWidth - 28);

    if (passed) {
      const stamp = Math.min(1, (packetX - centerX) / 40);
      context.globalAlpha = stamp;
      context.font = "8.5px 'Geist Mono',monospace";
      context.fillStyle = rgbCss(palette.accentInk);
      context.fillText('CHECKED ✓', x + 14, cardY + cardHeight - 16);
      context.globalAlpha = 1;
    }

    if (index < XAI_STEPS.length - 1) {
      context.strokeStyle = rgba(palette.ink, 0.25);
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(x + cardWidth + 5, laneY);
      context.lineTo(x + cardWidth + gap - 5, laneY);
      context.stroke();
    }
  });

  const loopY = cardY + cardHeight + 34;
  context.setLineDash([2, 6]);
  context.strokeStyle = rgba(palette.accentInk, 0.28);
  context.beginPath();
  context.moveTo(width - pad, loopY);
  context.lineTo(pad, loopY);
  context.stroke();
  context.setLineDash([]);
  const loopProgress = 1 - ((elapsed * 0.18) % 1);
  context.beginPath();
  context.arc(pad + loopProgress * (width - pad * 2), loopY, 2.2, 0, Math.PI * 2);
  context.fillStyle = rgba(palette.accentInk, 0.7);
  context.fill();
  context.font = "7.5px 'Geist Mono',monospace";
  context.fillStyle = rgba(palette.ink, 0.38);
  context.fillText('RESPONSIBLE AI PRINCIPLES · FEEDBACK', pad, loopY + 16);
};

interface MosaicTile {
  column: number;
  row: number;
  spanColumns: number;
  spanRows: number;
  emoji: string;
  name: string;
  count: number;
}

const MOSAIC: MosaicTile[] = [
  {
    column: 0,
    row: 0,
    spanColumns: 2,
    spanRows: 2,
    emoji: '📈',
    name: 'Evaluation & Monitoring',
    count: 68,
  },
  {
    column: 2,
    row: 0,
    spanColumns: 2,
    spanRows: 1,
    emoji: '💪',
    name: 'Deployment & Serving',
    count: 60,
  },
  {
    column: 4,
    row: 0,
    spanColumns: 2,
    spanRows: 1,
    emoji: '🧮',
    name: 'Compute Optimisation',
    count: 58,
  },
  { column: 2, row: 1, spanColumns: 1, spanRows: 1, emoji: '🔠', name: 'NLP', count: 45 },
  { column: 3, row: 1, spanColumns: 1, spanRows: 1, emoji: '🍕', name: 'RL', count: 39 },
  {
    column: 4,
    row: 1,
    spanColumns: 2,
    spanRows: 1,
    emoji: '🏁',
    name: 'Training & Orchestration',
    count: 27,
  },
  { column: 0, row: 2, spanColumns: 1, spanRows: 1, emoji: '🧵', name: 'Pipelines', count: 25 },
  { column: 1, row: 2, spanColumns: 1, spanRows: 1, emoji: '💾', name: 'Storage', count: 25 },
  { column: 2, row: 2, spanColumns: 2, spanRows: 1, emoji: '📊', name: 'Visualisation', count: 25 },
  { column: 4, row: 2, spanColumns: 1, spanRows: 1, emoji: '🔥', name: 'Retrieval', count: 24 },
  { column: 5, row: 2, spanColumns: 1, spanRows: 1, emoji: '🔧', name: 'AutoML', count: 18 },
  {
    column: 0,
    row: 3,
    spanColumns: 2,
    spanRows: 1,
    emoji: '🏷️',
    name: 'Annotation & Synthesis',
    count: 16,
  },
  {
    column: 2,
    row: 3,
    spanColumns: 2,
    spanRows: 1,
    emoji: '📜',
    name: 'Experiment Management',
    count: 16,
  },
  {
    column: 4,
    row: 3,
    spanColumns: 2,
    spanRows: 1,
    emoji: '🔏',
    name: 'Privacy & Safety',
    count: 15,
  },
];

const drawEcosystem = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsed: number,
  palette: CanvasPalette,
) => {
  const pad = 22;
  const gap = 7;
  const columns = 6;
  const rows = 4;
  const unitWidth = (width - pad * 2 - gap * (columns - 1)) / columns;
  const unitHeight = (height - pad * 2 - gap * (rows - 1)) / rows;

  MOSAIC.forEach((tile, index) => {
    const x = pad + tile.column * (unitWidth + gap);
    const y = pad + tile.row * (unitHeight + gap);
    const tileWidth = tile.spanColumns * unitWidth + (tile.spanColumns - 1) * gap;
    const tileHeight = tile.spanRows * unitHeight + (tile.spanRows - 1) * gap;
    const entrance = Math.min(1, Math.max(0, elapsed * 2 - index * 0.07));
    // Star-like twinkle: each tile flares on its own offset cycle, most stay dim.
    const twinkle = Math.max(0, Math.sin(elapsed * (1.1 + (index % 5) * 0.27) + index * 2.4)) ** 4;

    context.globalAlpha = entrance;
    context.save();
    context.translate(0, (1 - entrance) * 10);
    context.fillStyle = rgba(palette.accent, 0.015 + twinkle * 0.055);
    context.fillRect(x, y, tileWidth, tileHeight);
    context.strokeStyle =
      twinkle > 0.08 ? rgba(palette.accentInk, 0.13 + twinkle * 0.6) : rgba(palette.ink, 0.13);
    context.lineWidth = 1 + twinkle * 0.4;
    context.strokeRect(x, y, tileWidth, tileHeight);

    context.textAlign = 'left';
    context.font = `${Math.min(17, tileHeight * 0.24)}px 'Geist',sans-serif`;
    context.fillText(tile.emoji, x + 10, y + 24);
    context.font = "10px 'Geist Mono',monospace";
    context.fillStyle = rgba(palette.accentInk, 0.5 + twinkle * 0.5);
    context.textAlign = 'right';
    context.fillText(String(tile.count), x + tileWidth - 10, y + 22);
    context.textAlign = 'left';
    context.font = "9.5px 'Geist',sans-serif";
    context.fillStyle = rgba(palette.ink, 0.55 + twinkle * 0.4);
    context.fillText(tile.name, x + 10, y + tileHeight - 12, tileWidth - 20);
    context.restore();
    context.globalAlpha = 1;
  });
};

export class NavPreview extends HTMLElement {
  static observedAttributes = ['mode'];

  private cube = createCubeDrawer();
  private galaxy = createGalaxyDrawer({ labels: false, scale: 0.88 });
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
        palette: CanvasPalette,
      ) => {
        const mode = this.getAttribute('mode');
        context.clearRect(0, 0, width, height);
        if (mode === 'kompute') {
          context.save();
          context.translate(width * 0.5, height * 0.43);
          context.scale(0.85, 0.85);
          context.translate(width * -0.5, height * -0.43);
          this.cube(context, width, height * 0.86, elapsed, pointer, palette);
          context.restore();
        } else if (mode === 'xai') drawXai(context, width, height * 0.72, elapsed, palette);
        else if (mode === 'list') drawEcosystem(context, width, height * 0.72, elapsed, palette);
        else this.galaxy.draw(context, width, height * 0.86, elapsed, pointer, palette);
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
