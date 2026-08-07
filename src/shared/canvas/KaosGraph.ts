import { type CanvasPalette, getPalette, onThemeChange, rgba, rgbCss } from './CanvasEngine';

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface RenderedNode extends GraphNode {
  screenX: number;
  screenY: number;
}

interface Point {
  x: number;
  y: number;
}

const NODES: GraphNode[] = [
  { id: 'plan', label: 'PLANNER', x: 0.5, y: 0.12 },
  { id: 'ret', label: 'RETRIEVER', x: 0.17, y: 0.38 },
  { id: 'code', label: 'CODER', x: 0.5, y: 0.42 },
  { id: 'anal', label: 'ANALYST', x: 0.83, y: 0.38 },
  { id: 'pol', label: 'POLICY GATE', x: 0.5, y: 0.68 },
  { id: 'ver', label: 'VERIFIER', x: 0.24, y: 0.88 },
  { id: 'aud', label: 'AUDIT LOG', x: 0.76, y: 0.88 },
];

const EDGES: [number, number][] = [
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

/* The policy gate keeps its amber identity in both themes; it is the one node
   that is not accent-coloured and the warning read survives on either surface. */
const GATE = 'rgba(232,180,92,.9)';

export class KaosGraph extends HTMLElement {
  private active = true;
  private animationFrame = 0;
  private canvas?: HTMLCanvasElement;
  private context?: CanvasRenderingContext2D;
  private controller = new AbortController();
  private elapsed = 0;
  private height = 0;
  private intersectionObserver?: IntersectionObserver;
  private palette: CanvasPalette = getPalette();
  private pointer = { x: -1, y: -1 };
  private reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private resizeObserver?: ResizeObserver;
  private status?: HTMLElement | null;
  private unsubscribeTheme?: () => void;
  private width = 0;

  connectedCallback() {
    this.controller = new AbortController();
    this.classList.add('kaos-canvas-mount');
    this.canvas = this.querySelector('canvas') ?? document.createElement('canvas');
    this.canvas.setAttribute('aria-hidden', 'true');
    if (!this.canvas.parentElement) this.append(this.canvas);
    this.context = this.canvas.getContext('2d') ?? undefined;
    if (!this.context) return;

    this.status = this.closest('.kaos-panel')?.querySelector<HTMLElement>('[data-kaos-status]');
    this.addEventListener('pointermove', this.handlePointerMove, {
      signal: this.controller.signal,
    });
    this.addEventListener('pointerleave', this.handlePointerLeave, {
      signal: this.controller.signal,
    });
    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.intersectionObserver = new IntersectionObserver(this.handleIntersection);

    this.unsubscribeTheme = onThemeChange(this.handleThemeChange);
    this.fit();
    this.draw();
    this.resizeObserver.observe(this);
    this.intersectionObserver.observe(this);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.animationFrame);
    this.controller.abort();
    this.intersectionObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.unsubscribeTheme?.();
  }

  // Owns its own rAF loop, so it subscribes directly. The explicit repaint
  // covers the off-screen and reduced-motion cases, where no frame is pending.
  private handleThemeChange = () => {
    this.palette = getPalette();
    if (this.context) this.draw();
  };

  private compact() {
    const context = this.context!;
    const palette = this.palette;
    const padding = 26;
    const middle = this.height * 0.42;
    const planner = { x: padding, y: middle };
    const gate = { x: this.width - padding, y: middle };
    const middleNodes = [-1, 0, 1].map((offset) => ({
      x: this.width * 0.5 + offset * Math.min(46, this.width * 0.14),
      y: middle + offset * Math.min(26, this.height * 0.2),
    }));

    middleNodes.forEach((middleNode, middleIndex) => {
      [
        [planner, middleNode],
        [middleNode, gate],
      ].forEach(([start, end], edgeIndex) => {
        context.strokeStyle = rgba(palette.ink, 0.16);
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        const progress = (this.elapsed * 0.42 + middleIndex * 0.19 + edgeIndex * 0.5) % 1;
        context.beginPath();
        context.arc(
          start.x + (end.x - start.x) * progress,
          start.y + (end.y - start.y) * progress,
          2,
          0,
          7,
        );
        context.fillStyle = rgba(palette.accentInk, 0.3 + Math.sin(progress * Math.PI) * 0.6);
        context.fill();
      });
    });

    const drawNode = (point: Point, radius: number, color: string) => {
      context.beginPath();
      context.arc(point.x, point.y, radius + 4, 0, 7);
      context.fillStyle = rgba(palette.accent, 0.08);
      context.fill();
      context.beginPath();
      context.arc(point.x, point.y, radius, 0, 7);
      context.fillStyle = rgbCss(palette.inset);
      context.fill();
      context.strokeStyle = color;
      context.stroke();
    };
    middleNodes.forEach((middleNode) => drawNode(middleNode, 7, rgba(palette.accentInk, 0.5)));
    drawNode(planner, 10, rgbCss(palette.accentInk));
    drawNode(gate, 10, GATE);
    context.font = "8.5px 'Geist Mono',monospace";
    context.textAlign = 'center';
    context.fillStyle = rgba(palette.ink, 0.55);
    context.fillText('PLANNER', planner.x + 8, middle + 26);
    context.fillText('POLICY GATE', gate.x - 14, middle + 26);
    context.textAlign = 'left';
  }

  private draw = () => {
    const context = this.context!;
    this.palette = getPalette();
    this.elapsed += 0.016;
    context.clearRect(0, 0, this.width, this.height);
    if (this.height < 220) {
      this.compact();
      this.requestNextFrame();
      return;
    }

    const padding = 34;
    const points: RenderedNode[] = NODES.map((node) => ({
      ...node,
      screenX: padding + node.x * (this.width - padding * 2),
      screenY: padding + node.y * (this.height - padding * 2),
    }));
    let hovered = -1;
    let bestDistance = 26;
    points.forEach((node, index) => {
      const distance = Math.hypot(node.screenX - this.pointer.x, node.screenY - this.pointer.y);
      if (distance < bestDistance) {
        bestDistance = distance;
        hovered = index;
      }
    });

    if (this.status) {
      this.status.textContent = hovered >= 0 ? `${points[hovered].label} — INSPECTING` : 'RUNNING';
    }

    EDGES.forEach(([from, to], edgeIndex) => {
      const start = points[from];
      const end = points[to];
      const highlighted = hovered === from || hovered === to;
      context.strokeStyle = highlighted
        ? rgba(this.palette.accentInk, 0.65)
        : rgba(this.palette.ink, 0.16);
      context.lineWidth = highlighted ? 1.4 : 1;
      context.beginPath();
      context.moveTo(start.screenX, start.screenY);
      context.lineTo(end.screenX, end.screenY);
      context.stroke();

      for (let index = 0; index < 2; index += 1) {
        const progress = (this.elapsed * 0.34 + edgeIndex * 0.17 + index * 0.5) % 1;
        const x = start.screenX + (end.screenX - start.screenX) * progress;
        const y = start.screenY + (end.screenY - start.screenY) * progress;
        context.beginPath();
        context.arc(x, y, 2.1, 0, 7);
        context.fillStyle = rgba(this.palette.accentInk, 0.25 + Math.sin(progress * Math.PI) * 0.6);
        context.fill();
      }
    });

    points.forEach((node, index) => {
      const highlighted = hovered === index;
      const pulse = 1 + 0.12 * Math.sin(this.elapsed * 1.6 + index);
      const radius = (node.id === 'plan' || node.id === 'pol' ? 15 : 12) * pulse;
      context.beginPath();
      context.arc(node.screenX, node.screenY, radius + (highlighted ? 7 : 4), 0, 7);
      context.fillStyle = highlighted
        ? rgba(this.palette.accent, 0.16)
        : rgba(this.palette.accent, 0.06);
      context.fill();
      context.beginPath();
      context.arc(node.screenX, node.screenY, radius, 0, 7);
      context.fillStyle = rgbCss(this.palette.inset);
      context.fill();
      context.strokeStyle =
        node.id === 'pol'
          ? GATE
          : highlighted
            ? rgbCss(this.palette.accentInk)
            : rgba(this.palette.accentInk, 0.5);
      context.lineWidth = 1.3;
      context.stroke();
      context.font = "9.5px 'Geist Mono',monospace";
      context.textAlign = 'center';
      context.fillStyle = highlighted ? rgba(this.palette.ink, 0.95) : rgba(this.palette.ink, 0.55);
      context.fillText(node.label, node.screenX, node.screenY + radius + 14);
    });
    context.textAlign = 'left';
    this.requestNextFrame();
  };

  private fit() {
    const bounds = this.getBoundingClientRect();
    const density = Math.min(devicePixelRatio || 1, 1.5);
    this.width = bounds.width;
    this.height = bounds.height;
    this.canvas!.width = Math.max(1, Math.round(this.width * density));
    this.canvas!.height = Math.max(1, Math.round(this.height * density));
    this.context!.setTransform(density, 0, 0, density, 0, 0);
  }

  private handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
    const nextActive = entry.isIntersecting;
    if (nextActive && !this.active) {
      this.active = true;
      this.animationFrame = requestAnimationFrame(this.draw);
    }
    this.active = nextActive;
    if (!nextActive) cancelAnimationFrame(this.animationFrame);
  };

  private handlePointerLeave = () => {
    this.pointer.x = -1;
    this.pointer.y = -1;
  };

  private handlePointerMove = (event: PointerEvent) => {
    const bounds = this.canvas!.getBoundingClientRect();
    this.pointer.x = event.clientX - bounds.left;
    this.pointer.y = event.clientY - bounds.top;
  };

  private handleResize = () => {
    this.fit();
    if (this.reducedMotion) this.draw();
  };

  private requestNextFrame() {
    if (this.active && !this.reducedMotion) {
      this.animationFrame = requestAnimationFrame(this.draw);
    }
  }
}

if (!customElements.get('kaos-graph')) {
  customElements.define('kaos-graph', KaosGraph);
}
