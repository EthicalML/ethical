import { CanvasEngine, type CanvasPalette, rgba, rgbCss, surfaceOf } from './CanvasEngine';

// The XAI explainability pipeline: three checkpoint cards a packet travels through left to right,
// stamping each as CHECKED, then a dashed feedback loop back to the start. Shared by the header's
// nav preview and the open-source project card, which is why it lives here rather than inline in
// either mount.

const XAI_STEPS = [
  ['01', 'Data analysis', 'DISTRIBUTIONS · PROXIES'],
  ['02', 'Model evaluation', 'ATTRIBUTION · SUBGROUPS'],
  ['03', 'Production monitoring', 'DRIFT · OUTLIERS'],
] as const;

export const drawXai = (
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

// A standalone mount for the pipeline. The nav preview calls `drawXai` directly because it
// multiplexes several drawers onto one canvas; anything showing only the pipeline uses this.
export class XaiPipeline extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (!canvas) return;
    this.engine = new CanvasEngine(
      canvas,
      (context, width, height, elapsed, _pointer, palette) => {
        context.clearRect(0, 0, width, height);
        drawXai(context, width, height, elapsed, palette);
      },
      surfaceOf(this),
    );
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('xai-pipeline')) {
  customElements.define('xai-pipeline', XaiPipeline);
}
