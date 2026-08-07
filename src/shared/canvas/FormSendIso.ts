import { CanvasEngine, type CanvasPalette } from './CanvasEngine';

/* Isometric transmission scene that runs over a dimmed contact form while a
   submission is in flight. Unlike the other canvases here it is not ambient:
   `progress` is driven by the form over the settle window, so the packet's
   position along the route is the elapsed time and its arrival is the
   confirmation. `settled` holds the arrival bloom while the fields exit.

   Every stroke and fill in this scene is the accent at some alpha, so the whole
   module themes through one channel triplet. Strokes and small fills read as ink
   here rather than as flat fill, so it tracks `accentInk`. */
const channels = (palette: CanvasPalette) => palette.accentInk.join(', ');
const SPAN = 2.6;

const project = (x: number, y: number, unit: number, cx: number, cy: number) => ({
  x: cx + (x - y) * unit,
  y: cy + (x + y) * unit * 0.5,
});

class FormSendIso extends HTMLElement {
  private engine?: CanvasEngine;
  progress = 0;
  settled = false;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (!canvas) return;
    this.engine = new CanvasEngine(
      canvas,
      (context, width, height, elapsedSeconds, _p, palette) => {
        context.clearRect(0, 0, width, height);
        if (width < 2 || height < 2) return;
        const ACCENT = channels(palette);

        // A route along x === y would project to a straight vertical line, so the
        // packet travels one grid axis instead, and the scene sits above the
        // button rather than across it.
        const unit = Math.min(width, height) * 0.062;
        const cx = width / 2;
        const cy = height * 0.42;
        const eased =
          this.progress < 0.5
            ? 2 * this.progress * this.progress
            : 1 - (2 - 2 * this.progress) ** 2 / 2;

        // Ground grid. Faint until the packet has passed over it.
        context.lineWidth = 1;
        for (let step = -SPAN; step <= SPAN; step += 1.7) {
          const near = project(-SPAN, step, unit, cx, cy);
          const far = project(SPAN, step, unit, cx, cy);
          const side = project(step, -SPAN, unit, cx, cy);
          const other = project(step, SPAN, unit, cx, cy);
          context.strokeStyle = `rgba(${ACCENT}, 0.07)`;
          context.beginPath();
          context.moveTo(near.x, near.y);
          context.lineTo(far.x, far.y);
          context.moveTo(side.x, side.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }

        // The route, drawn dim end to end and bright behind the packet.
        const from = project(-SPAN, 0, unit, cx, cy);
        const to = project(SPAN, 0, unit, cx, cy);
        const head = { x: from.x + (to.x - from.x) * eased, y: from.y + (to.y - from.y) * eased };
        context.strokeStyle = `rgba(${ACCENT}, 0.16)`;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
        context.strokeStyle = `rgba(${ACCENT}, 0.75)`;
        context.lineWidth = 1.5;
        context.shadowBlur = 12;
        context.shadowColor = `rgba(${ACCENT}, 0.6)`;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(head.x, head.y);
        context.stroke();
        context.shadowBlur = 0;

        // The packet: a small iso cube riding the route, bobbing as it travels.
        const bob = Math.sin(elapsedSeconds * 5) * unit * 0.09;
        const size = unit * 0.42;
        const top = head.y - size * 0.62 + bob;
        context.fillStyle = `rgba(${ACCENT}, 0.92)`;
        context.beginPath();
        context.moveTo(head.x, top - size * 0.5);
        context.lineTo(head.x + size, top);
        context.lineTo(head.x, top + size * 0.5);
        context.lineTo(head.x - size, top);
        context.closePath();
        context.fill();
        context.fillStyle = `rgba(${ACCENT}, 0.4)`;
        context.beginPath();
        context.moveTo(head.x - size, top);
        context.lineTo(head.x, top + size * 0.5);
        context.lineTo(head.x, top + size * 1.25);
        context.lineTo(head.x - size, top + size * 0.75);
        context.closePath();
        context.fill();
        context.fillStyle = `rgba(${ACCENT}, 0.62)`;
        context.beginPath();
        context.moveTo(head.x + size, top);
        context.lineTo(head.x, top + size * 0.5);
        context.lineTo(head.x, top + size * 1.25);
        context.lineTo(head.x + size, top + size * 0.75);
        context.closePath();
        context.fill();

        // Destination tower, rising as the packet approaches and blooming on arrival.
        const rise = unit * (0.5 + eased * 1.5);
        const base = to;
        context.strokeStyle = `rgba(${ACCENT}, ${0.3 + eased * 0.6})`;
        context.lineWidth = 1.4;
        context.beginPath();
        context.moveTo(base.x, base.y);
        context.lineTo(base.x, base.y - rise);
        context.stroke();
        context.beginPath();
        context.moveTo(base.x, base.y - rise - unit * 0.3);
        context.lineTo(base.x + unit * 0.5, base.y - rise);
        context.lineTo(base.x, base.y - rise + unit * 0.3);
        context.lineTo(base.x - unit * 0.5, base.y - rise);
        context.closePath();
        context.fillStyle = `rgba(${ACCENT}, ${0.2 + eased * 0.7})`;
        context.fill();

        if (this.settled) {
          for (let ring = 0; ring < 3; ring += 1) {
            const phase = (elapsedSeconds * 1.5 + ring * 0.33) % 1;
            context.strokeStyle = `rgba(${ACCENT}, ${(1 - phase) * 0.5})`;
            context.lineWidth = 1;
            context.beginPath();
            context.ellipse(
              base.x,
              base.y,
              unit * (0.4 + phase * 2.6),
              unit * (0.2 + phase * 1.3),
              0,
              0,
              Math.PI * 2,
            );
            context.stroke();
          }
        }
      },
    );
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('form-send-iso')) {
  customElements.define('form-send-iso', FormSendIso);
}

export type { FormSendIso };
