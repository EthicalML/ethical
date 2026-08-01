import { CanvasEngine } from './CanvasEngine';

interface ControlNode {
  label: string;
  x: number;
  y: number;
}

const CRDS: ControlNode[] = [
  { label: 'Agent', x: 0.5, y: 0.12 },
  { label: 'ModelAPI', x: 0.79, y: 0.31 },
  { label: 'MCPServer', x: 0.72, y: 0.7 },
  { label: 'MemoryStore', x: 0.28, y: 0.7 },
  { label: 'AccessGrant', x: 0.21, y: 0.31 },
];

const RUNTIME: ControlNode[] = [
  { label: 'agent pods', x: 0.5, y: 0.01 },
  { label: 'gateway', x: 0.95, y: 0.5 },
  { label: 'memory service', x: 0.05, y: 0.5 },
];

export class ControlPlaneMap extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private pulseStarted = -1;
  private selected = 0;

  connectedCallback() {
    this.controller = new AbortController();
    const canvas = this.querySelector<HTMLCanvasElement>('canvas');
    const selectors = Array.from(this.querySelectorAll<HTMLButtonElement>('[data-crd]'));
    const panels = Array.from(this.querySelectorAll<HTMLElement>('[data-crd-panel]'));
    const delegate = this.querySelector<HTMLButtonElement>('[data-delegate]');
    if (!canvas || !selectors.length || !panels.length || !delegate) return;

    this.engine = new CanvasEngine(canvas, (context, width, height, elapsed) => {
      this.draw(context, width, height, elapsed);
    });

    const select = (index: number) => {
      this.selected = index;
      selectors.forEach((button, buttonIndex) => {
        button.classList.toggle('active', buttonIndex === index);
        button.setAttribute('aria-selected', String(buttonIndex === index));
      });
      panels.forEach((panel, panelIndex) => panel.classList.toggle('active', panelIndex === index));
      this.engine?.redraw();
    };
    selectors.forEach((button, index) => {
      button.addEventListener('click', () => select(index), { signal: this.controller.signal });
    });
    delegate.addEventListener(
      'click',
      () => {
        this.pulseStarted = performance.now();
        this.engine?.redraw();
      },
      { signal: this.controller.signal },
    );
  }

  disconnectedCallback() {
    this.controller.abort();
    this.engine?.destroy();
  }

  private draw(context: CanvasRenderingContext2D, width: number, height: number, elapsed: number) {
    context.clearRect(0, 0, width, height);
    const marginX = Math.min(70, width * 0.1);
    const marginY = Math.min(55, height * 0.12);
    const point = (node: ControlNode) => ({
      x: marginX + node.x * (width - marginX * 2),
      y: marginY + node.y * (height - marginY * 2),
    });
    const hub = { x: width / 2, y: height / 2 };
    const line = (
      from: { x: number; y: number },
      to: { x: number; y: number },
      color = 'rgba(244,242,238,.18)',
      lineWidth = 1,
    ) => {
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.stroke();
    };

    CRDS.forEach((node) => line(hub, point(node)));
    RUNTIME.forEach((runtime) => {
      const target = point(runtime);
      const source =
        runtime.label === 'agent pods'
          ? point(CRDS[0])
          : runtime.label === 'gateway'
            ? point(CRDS[4])
            : point(CRDS[3]);
      line(source, target, 'rgba(94,230,160,.28)');
    });

    const drawNode = (node: ControlNode, index: number, runtime = false) => {
      const position = point(node);
      const active = !runtime && index === this.selected;
      context.beginPath();
      context.arc(position.x, position.y, runtime ? 5 : active ? 10 : 7, 0, Math.PI * 2);
      context.fillStyle = active ? '#5ee6a0' : runtime ? 'rgba(94,230,160,.8)' : '#f4f2ee';
      context.fill();
      context.font = `${runtime ? 10 : 11}px Geist Mono, monospace`;
      context.fillStyle = runtime
        ? 'rgba(244,242,238,.52)'
        : active
          ? '#5ee6a0'
          : 'rgba(244,242,238,.78)';
      context.textAlign = 'center';
      context.fillText(node.label, position.x, position.y + (runtime ? 19 : 23));
    };
    CRDS.forEach((node, index) => drawNode(node, index));
    RUNTIME.forEach((node, index) => drawNode(node, index, true));

    context.beginPath();
    context.arc(hub.x, hub.y, 29, 0, Math.PI * 2);
    context.fillStyle = '#171818';
    context.fill();
    context.strokeStyle = 'rgba(94,230,160,.7)';
    context.stroke();
    context.fillStyle = '#f4f2ee';
    context.font = '11px Geist Mono, monospace';
    context.textAlign = 'center';
    context.fillText('operator', hub.x, hub.y + 4);

    if (this.pulseStarted < 0) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const progress = reduced ? 1 : Math.min(1, (performance.now() - this.pulseStarted) / 1400);
    const agent = point(CRDS[0]);
    const mcp = point(CRDS[2]);
    const peer = { x: agent.x + 72, y: agent.y + 18 };
    line(agent, mcp, 'rgba(94,230,160,.9)', 2);
    line(agent, peer, 'rgba(74,199,255,.9)', 2);
    [mcp, peer].forEach((target, index) => {
      const p = reduced ? 1 : Math.max(0, Math.min(1, progress * 1.45 - index * 0.3));
      context.beginPath();
      context.arc(
        agent.x + (target.x - agent.x) * p,
        agent.y + (target.y - agent.y) * p,
        4,
        0,
        Math.PI * 2,
      );
      context.fillStyle = index ? '#4ac7ff' : '#5ee6a0';
      context.fill();
    });
    if (progress >= 1 && !reduced) this.pulseStarted = -1;
    void elapsed;
  }
}

if (!customElements.get('control-plane-map'))
  customElements.define('control-plane-map', ControlPlaneMap);
