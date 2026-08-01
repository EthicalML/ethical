import { CanvasEngine, type CanvasPointer } from './CanvasEngine';

type NodeType = 'crd' | 'runtime';

interface OrbitNode {
  angle: number;
  color: string;
  id: string;
  label: string;
  orbit: number;
  speed: number;
  type: NodeType;
}

interface ProjectedNode extends OrbitNode {
  depth: number;
  opacity: number;
  radius: number;
  scale: number;
  x: number;
  y: number;
}

const NODES: OrbitNode[] = [
  { angle: -1.57, color: '#5ee6a0', id: 'agent', label: 'Agent', orbit: 1, speed: 1, type: 'crd' },
  {
    angle: -0.31,
    color: '#4ac7ff',
    id: 'model',
    label: 'ModelAPI',
    orbit: 1,
    speed: 1,
    type: 'crd',
  },
  { angle: 0.94, color: '#e8b45c', id: 'mcp', label: 'MCPServer', orbit: 1, speed: 1, type: 'crd' },
  {
    angle: 2.2,
    color: '#b694ff',
    id: 'memory',
    label: 'MemoryStore',
    orbit: 1,
    speed: 1,
    type: 'crd',
  },
  {
    angle: 3.46,
    color: '#e8b45c',
    id: 'access',
    label: 'AccessGrant',
    orbit: 1,
    speed: 1,
    type: 'crd',
  },
  {
    angle: 3.73,
    color: '#5ee6a0',
    id: 'pods',
    label: 'agent pods',
    orbit: 1.58,
    speed: -0.42,
    type: 'runtime',
  },
  {
    angle: -0.16,
    color: '#4ac7ff',
    id: 'gateway',
    label: 'gateway',
    orbit: 1.58,
    speed: -0.42,
    type: 'runtime',
  },
  {
    angle: 1.74,
    color: '#b694ff',
    id: 'service',
    label: 'memory service',
    orbit: 1.58,
    speed: -0.42,
    type: 'runtime',
  },
];

const CONNECTIONS = [
  ['operator', 'agent'],
  ['operator', 'model'],
  ['operator', 'mcp'],
  ['operator', 'memory'],
  ['operator', 'access'],
  ['agent', 'pods'],
  ['model', 'gateway'],
  ['mcp', 'gateway'],
  ['memory', 'service'],
  ['access', 'gateway'],
] as const;

export class KaosGraph extends HTMLElement {
  private canvas?: HTMLCanvasElement;
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private lastElapsed = 0;
  private nodes: ProjectedNode[] = [];
  private selected = 'agent';
  private traceStartedAt = -1;

  connectedCallback() {
    this.controller = new AbortController();
    this.classList.add('kaos-canvas-mount');
    this.canvas = this.querySelector('canvas') ?? document.createElement('canvas');
    this.canvas.setAttribute('aria-hidden', 'true');
    if (!this.canvas.parentElement) this.append(this.canvas);

    this.engine = new CanvasEngine(this.canvas, (context, width, height, elapsed, pointer) => {
      this.draw(context, width, height, elapsed, pointer);
    });
    this.canvas.addEventListener('pointermove', this.handlePointerMove, {
      signal: this.controller.signal,
    });
    this.canvas.addEventListener('click', this.handleClick, { signal: this.controller.signal });

    const window = this.closest('animation-window');
    if (window) {
      this.setPlaying(window.getAttribute('data-playing') === 'true');
      window.addEventListener('animationwindow:play', this.handlePlay, {
        signal: this.controller.signal,
      });
      window.addEventListener('animationwindow:pause', this.handlePause, {
        signal: this.controller.signal,
      });
    }
  }

  disconnectedCallback() {
    this.controller.abort();
    this.engine?.destroy();
  }

  selectResource(id: string) {
    if (!NODES.some((node) => node.type === 'crd' && node.id === id)) return;
    this.selected = id;
    this.engine?.redraw();
  }

  trace() {
    this.traceStartedAt = this.lastElapsed;
    this.engine?.redraw();
  }

  private get interactive() {
    return this.getAttribute('variant') === 'interactive';
  }

  private draw(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    pointer: CanvasPointer,
  ) {
    this.lastElapsed = elapsed;
    context.clearRect(0, 0, width, height);
    const compact = width < 560;
    const center = { x: width * 0.5, y: height * (compact ? 0.48 : 0.49) };
    const radiusX = Math.min(width * (compact ? 0.27 : 0.245), 320);
    const radiusY = Math.min(height * (compact ? 0.21 : 0.23), 170);
    const time = elapsed * (this.interactive ? 0.08 : 0.045);
    const parallaxX = (pointer.x - 0.5) * Math.min(62, width * 0.055);
    const parallaxY = (pointer.y - 0.5) * Math.min(30, height * 0.04);
    const operator: ProjectedNode = {
      angle: 0,
      color: '#5ee6a0',
      depth: 0,
      id: 'operator',
      label: 'KAOS operator',
      opacity: 1,
      orbit: 0,
      radius: 31,
      scale: 1,
      speed: 0,
      type: 'crd',
      x: center.x,
      y: center.y,
    };
    this.nodes = NODES.map((node) => {
      const angle = node.angle + time * node.speed;
      const depth = Math.sin(angle);
      const scale = 0.72 + (depth + 1) * 0.18;
      const radius = (node.type === 'runtime' ? 10 : 17) * scale;
      return {
        ...node,
        depth,
        opacity: 0.42 + (depth + 1) * 0.26,
        radius,
        scale,
        x: center.x + Math.cos(angle) * radiusX * node.orbit + parallaxX * (0.25 + depth * 0.24),
        y:
          center.y +
          Math.sin(angle) * radiusY * node.orbit * 0.72 +
          parallaxY * (0.2 + depth * 0.18) +
          depth * 20,
      };
    });
    const lookup = new Map(this.nodes.map((node) => [node.id, node]));
    lookup.set('operator', operator);

    this.drawBackdrop(
      context,
      width,
      height,
      center,
      radiusX,
      radiusY,
      elapsed,
      parallaxX,
      parallaxY,
    );
    [...CONNECTIONS]
      .sort((a, b) => (lookup.get(a[1])?.depth ?? 0) - (lookup.get(b[1])?.depth ?? 0))
      .forEach(([from, to], index) =>
        this.drawEdge(context, lookup.get(from)!, lookup.get(to)!, index, elapsed),
      );
    [...this.nodes, operator]
      .sort((a, b) => a.depth - b.depth)
      .forEach((node) => this.drawNode(context, node, elapsed));
    this.drawTrace(context, lookup, elapsed);
    context.textAlign = 'left';
  }

  private drawBackdrop(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    center: { x: number; y: number },
    radiusX: number,
    radiusY: number,
    elapsed: number,
    parallaxX: number,
    parallaxY: number,
  ) {
    const glow = context.createRadialGradient(
      center.x,
      center.y,
      10,
      center.x,
      center.y,
      radiusX * 1.35,
    );
    glow.addColorStop(0, 'rgba(94,230,160,.09)');
    glow.addColorStop(0.45, 'rgba(74,199,255,.03)');
    glow.addColorStop(1, 'rgba(15,16,15,0)');
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(parallaxX * -0.12, parallaxY * -0.12);
    for (let ring = 0; ring < 2; ring += 1) {
      context.beginPath();
      context.ellipse(
        center.x,
        center.y,
        radiusX * (1 + ring * 0.58),
        radiusY * (0.74 + ring * 0.42),
        0,
        0,
        Math.PI * 2,
      );
      context.setLineDash(ring ? [2, 8] : [3, 6]);
      context.lineDashOffset = ring ? elapsed * 2 : -elapsed * 1.2;
      context.strokeStyle = ring ? 'rgba(244,242,238,.075)' : 'rgba(94,230,160,.16)';
      context.lineWidth = 1;
      context.stroke();
    }
    context.setLineDash([]);
    context.restore();
  }

  private drawEdge(
    context: CanvasRenderingContext2D,
    start: ProjectedNode,
    end: ProjectedNode,
    index: number,
    elapsed: number,
  ) {
    const active = this.interactive && (end.id === this.selected || start.id === this.selected);
    const opacity = active ? 0.64 : Math.max(0.09, Math.min(0.34, 0.15 + end.depth * 0.09));
    const controlX = (start.x + end.x) * 0.5;
    const controlY = (start.y + end.y) * 0.5 - Math.abs(end.x - start.x) * 0.06;
    const gradient = context.createLinearGradient(start.x, start.y, end.x, end.y);
    gradient.addColorStop(0, `rgba(94,230,160,${opacity})`);
    gradient.addColorStop(
      1,
      `${end.color}${Math.round(opacity * 255)
        .toString(16)
        .padStart(2, '0')}`,
    );
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.quadraticCurveTo(controlX, controlY, end.x, end.y);
    context.strokeStyle = gradient;
    context.lineWidth = active ? 1.8 : end.type === 'runtime' ? 1.25 : 0.8;
    context.stroke();

    if (end.type === 'runtime') {
      const progress = (elapsed * 0.12 + index * 0.31) % 1;
      const inverse = 1 - progress;
      context.beginPath();
      context.arc(
        inverse * inverse * start.x +
          2 * inverse * progress * controlX +
          progress * progress * end.x,
        inverse * inverse * start.y +
          2 * inverse * progress * controlY +
          progress * progress * end.y,
        1.8 + end.scale,
        0,
        Math.PI * 2,
      );
      context.fillStyle = end.color;
      context.globalAlpha = Math.sin(progress * Math.PI) * 0.62;
      context.fill();
      context.globalAlpha = 1;
    }
  }

  private drawNode(context: CanvasRenderingContext2D, node: ProjectedNode, elapsed: number) {
    const operator = node.id === 'operator';
    const selected = this.interactive && node.id === this.selected;
    const radius = node.radius;
    const pulse = operator ? 1 + Math.sin(elapsed * 1.1) * 0.035 : 1;
    context.globalAlpha = selected ? 1 : node.opacity;
    context.beginPath();
    context.arc(
      node.x,
      node.y,
      (radius + (operator ? 14 : selected ? 12 : 7)) * pulse,
      0,
      Math.PI * 2,
    );
    context.fillStyle = selected ? `${node.color}22` : `${node.color}0c`;
    context.fill();
    context.save();
    context.translate(node.x, node.y);
    if (node.type === 'runtime') context.rotate(Math.PI / 4);
    context.beginPath();
    if (node.type === 'runtime') {
      context.rect(-radius * 0.72, -radius * 0.72, radius * 1.44, radius * 1.44);
    } else {
      for (let side = 0; side < 6; side += 1) {
        const angle = -Math.PI / 2 + (side / 6) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (side === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
    }
    context.fillStyle = operator ? '#13251c' : '#111313';
    context.fill();
    context.strokeStyle = node.color;
    context.lineWidth = selected ? 2.2 : operator ? 1.8 : 1.15;
    context.stroke();
    context.restore();
    if (operator) {
      context.beginPath();
      context.arc(node.x, node.y, radius * 0.36, 0, Math.PI * 2);
      context.fillStyle = node.color;
      context.fill();
    }

    const showLabel = this.interactive || operator || node.type === 'crd';
    if (showLabel) {
      context.globalAlpha = Math.max(this.interactive ? 0.68 : 0.38, node.opacity);
      context.font = `${operator ? 11 : node.type === 'runtime' ? 9 : 10}px Geist Mono, monospace`;
      context.fillStyle = operator ? '#f4f2ee' : node.color;
      context.textAlign = 'center';
      context.fillText(node.label, node.x, node.y + radius + (operator ? 25 : 19));
      if (this.interactive && node.type === 'runtime') {
        context.fillStyle = 'rgba(244,242,238,.34)';
        context.font = '8px Geist Mono, monospace';
        context.fillText('RUNTIME', node.x, node.y + radius + 31);
      }
    }
    context.globalAlpha = 1;
  }

  private drawTrace(
    context: CanvasRenderingContext2D,
    lookup: Map<string, ProjectedNode>,
    elapsed: number,
  ) {
    if (this.traceStartedAt < 0) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const progress = reduced ? 1 : Math.min(1, (elapsed - this.traceStartedAt) / 2.2);
    const path = ['operator', 'agent', 'pods'] as const;
    for (let index = 0; index < path.length - 1; index += 1) {
      const start = lookup.get(path[index])!;
      const end = lookup.get(path[index + 1])!;
      const local = Math.max(0, Math.min(1, progress * 1.55 - index * 0.52));
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.strokeStyle = 'rgba(94,230,160,.78)';
      context.lineWidth = 2;
      context.stroke();
      context.beginPath();
      context.arc(
        start.x + (end.x - start.x) * local,
        start.y + (end.y - start.y) * local,
        5,
        0,
        Math.PI * 2,
      );
      context.fillStyle = '#5ee6a0';
      context.shadowBlur = 18;
      context.shadowColor = '#5ee6a0';
      context.fill();
      context.shadowBlur = 0;
    }
    if (progress >= 1 && !reduced) this.traceStartedAt = -1;
  }

  private nodeAt(event: PointerEvent) {
    const bounds = this.canvas!.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return this.nodes.find(
      (node) =>
        node.type === 'crd' && Math.hypot(node.x - x, node.y - y) <= Math.max(28, node.radius + 10),
    );
  }

  private handleClick = (event: PointerEvent) => {
    if (!this.interactive) return;
    const node = this.nodeAt(event);
    if (!node) return;
    this.selectResource(node.id);
    this.dispatchEvent(
      new CustomEvent('kaosgraph:select', { bubbles: true, detail: { id: node.id } }),
    );
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (this.interactive) this.canvas!.style.cursor = this.nodeAt(event) ? 'pointer' : 'default';
  };

  private handlePlay = () => {
    this.setPlaying(true);
    if (this.interactive) this.trace();
  };

  private handlePause = () => this.setPlaying(false);

  private setPlaying(playing: boolean) {
    this.engine?.setPlaying(playing);
  }
}

if (!customElements.get('kaos-graph')) customElements.define('kaos-graph', KaosGraph);
