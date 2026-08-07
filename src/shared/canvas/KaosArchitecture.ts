import {
  CanvasEngine,
  type CanvasPalette,
  type CanvasPointer,
  rgba,
  rgbCss,
  type Rgb,
} from './CanvasEngine';

/* Per-CRD identity colours stay identity across themes, but at full saturation
   they carry no contrast on a pale surface (the accent green sits at ~1.4:1 on
   white). Under light each is darkened toward the ink while keeping its hue, so
   the CRD stays recognisable and the label stays readable. The return value is
   still `#rrggbb` because call sites append a two-digit alpha suffix to it. */
const themed = (hex: string, palette: CanvasPalette) => {
  if (!palette.light) return hex;
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
  return `#${channels
    .map((value) =>
      Math.round(value * 0.42)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
};

// Backdrop glow fades to the surface it sits on; the RGB of a zero-alpha stop
// still drives gradient interpolation, so it is not interchangeable with any
// other transparent value.
const BACKDROP_FADE_DARK: Rgb = [15, 16, 15];
// Node interiors: the operator gets a green-tinted well, the rest the inset face.
const OPERATOR_FILL_DARK: Rgb = [19, 37, 28];
const NODE_FILL_DARK: Rgb = [17, 19, 19];
const OPERATOR_FILL_LIGHT: Rgb = [226, 245, 236];
const NODE_FILL_LIGHT: Rgb = [252, 252, 250];

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

export interface GalaxyState {
  interactive: boolean;
  selected: string;
}

export interface GalaxyDrawerOptions {
  labels?: boolean;
  scale?: number;
  state?: () => GalaxyState;
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

const drawBackdrop = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  center: { x: number; y: number },
  radiusX: number,
  radiusY: number,
  elapsed: number,
  parallaxX: number,
  parallaxY: number,
  palette: CanvasPalette,
) => {
  const glow = context.createRadialGradient(
    center.x,
    center.y,
    10,
    center.x,
    center.y,
    radiusX * 1.35,
  );
  glow.addColorStop(0, rgba(palette.accent, 0.09));
  // The blue stop is the MCP/runtime identity hue; it reads on both surfaces.
  glow.addColorStop(0.45, 'rgba(74,199,255,.03)');
  glow.addColorStop(1, rgba(palette.light ? palette.base : BACKDROP_FADE_DARK, 0));
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
    context.strokeStyle = ring ? rgba(palette.ink, 0.075) : rgba(palette.accentInk, 0.16);
    context.lineWidth = 1;
    context.stroke();
  }
  context.setLineDash([]);
  context.restore();
};

const drawEdge = (
  context: CanvasRenderingContext2D,
  start: ProjectedNode,
  end: ProjectedNode,
  index: number,
  elapsed: number,
  state: GalaxyState,
  palette: CanvasPalette,
) => {
  const active = state.interactive && (end.id === state.selected || start.id === state.selected);
  const opacity = active ? 0.64 : Math.max(0.09, Math.min(0.34, 0.15 + end.depth * 0.09));
  const controlX = (start.x + end.x) * 0.5;
  const controlY = (start.y + end.y) * 0.5 - Math.abs(end.x - start.x) * 0.06;
  const gradient = context.createLinearGradient(start.x, start.y, end.x, end.y);
  gradient.addColorStop(0, rgba(palette.accentInk, opacity));
  gradient.addColorStop(
    1,
    `${themed(end.color, palette)}${Math.round(opacity * 255)
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
      inverse * inverse * start.x + 2 * inverse * progress * controlX + progress * progress * end.x,
      inverse * inverse * start.y + 2 * inverse * progress * controlY + progress * progress * end.y,
      1.8 + end.scale,
      0,
      Math.PI * 2,
    );
    context.fillStyle = themed(end.color, palette);
    context.globalAlpha = Math.sin(progress * Math.PI) * 0.62;
    context.fill();
    context.globalAlpha = 1;
  }
};

const drawNode = (
  context: CanvasRenderingContext2D,
  node: ProjectedNode,
  elapsed: number,
  state: GalaxyState,
  labels: boolean,
  palette: CanvasPalette,
) => {
  const operator = node.id === 'operator';
  const color = themed(node.color, palette);
  const selected = state.interactive && node.id === state.selected;
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
  context.fillStyle = selected ? `${color}22` : `${color}0c`;
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
  context.fillStyle = rgbCss(
    palette.light
      ? operator
        ? OPERATOR_FILL_LIGHT
        : NODE_FILL_LIGHT
      : operator
        ? OPERATOR_FILL_DARK
        : NODE_FILL_DARK,
  );
  context.fill();
  context.strokeStyle = color;
  context.lineWidth = selected ? 2.2 : operator ? 1.8 : 1.15;
  context.stroke();
  context.restore();
  if (operator) {
    context.beginPath();
    context.arc(node.x, node.y, radius * 0.36, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  }

  const showLabel = labels && (state.interactive || operator || node.type === 'crd');
  if (showLabel) {
    context.globalAlpha = Math.max(state.interactive ? 0.68 : 0.38, node.opacity);
    context.font = `${operator ? 11 : node.type === 'runtime' ? 9 : 10}px Geist Mono, monospace`;
    context.fillStyle = operator ? rgbCss(palette.ink) : color;
    context.textAlign = 'center';
    context.fillText(node.label, node.x, node.y + radius + (operator ? 25 : 19));
    if (state.interactive && node.type === 'runtime') {
      context.fillStyle = rgba(palette.ink, 0.34);
      context.font = '8px Geist Mono, monospace';
      context.fillText('RUNTIME', node.x, node.y + radius + 31);
    }
  }
  context.globalAlpha = 1;
};

export function createGalaxyDrawer(options: GalaxyDrawerOptions = {}) {
  const labels = options.labels ?? true;
  const orbitScale = options.scale ?? 1;
  const readState = options.state ?? (() => ({ interactive: false, selected: '' }));
  let nodes: ProjectedNode[] = [];

  const draw = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
    pointer: CanvasPointer,
    palette: CanvasPalette,
  ) => {
    const state = readState();
    context.clearRect(0, 0, width, height);
    const compact = width < 560;
    const center = { x: width * 0.5, y: height * (compact ? 0.48 : 0.49) };
    const radiusX = Math.min(width * (compact ? 0.27 : 0.245), 320) * orbitScale;
    const radiusY = Math.min(height * (compact ? 0.21 : 0.23), 170) * orbitScale;
    const time = elapsed * (state.interactive ? 0.08 : 0.045);
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
      radius: 31 * orbitScale,
      scale: 1,
      speed: 0,
      type: 'crd',
      x: center.x,
      y: center.y,
    };
    nodes = NODES.map((node) => {
      const angle = node.angle + time * node.speed;
      const depth = Math.sin(angle);
      const scale = 0.72 + (depth + 1) * 0.18;
      const radius = (node.type === 'runtime' ? 10 : 17) * scale * orbitScale;
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
          depth * 20 * orbitScale,
      };
    });
    const lookup = new Map(nodes.map((node) => [node.id, node]));
    lookup.set('operator', operator);

    drawBackdrop(
      context,
      width,
      height,
      center,
      radiusX,
      radiusY,
      elapsed,
      parallaxX,
      parallaxY,
      palette,
    );
    [...CONNECTIONS]
      .sort((a, b) => (lookup.get(a[1])?.depth ?? 0) - (lookup.get(b[1])?.depth ?? 0))
      .forEach(([from, to], index) =>
        drawEdge(context, lookup.get(from)!, lookup.get(to)!, index, elapsed, state, palette),
      );
    [...nodes, operator]
      .sort((a, b) => a.depth - b.depth)
      .forEach((node) => drawNode(context, node, elapsed, state, labels, palette));
    context.textAlign = 'left';
  };

  return { draw, nodes: () => nodes };
}

export class KaosArchitecture extends HTMLElement {
  private canvas?: HTMLCanvasElement;
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private galaxy = createGalaxyDrawer({
    state: () => ({ interactive: this.interactive, selected: this.selected }),
  });
  private selected = 'agent';

  connectedCallback() {
    this.controller = new AbortController();
    this.classList.add('kaos-architecture-mount');
    this.canvas = this.querySelector('canvas') ?? document.createElement('canvas');
    this.canvas.setAttribute('aria-hidden', 'true');
    if (!this.canvas.parentElement) this.append(this.canvas);

    this.engine = new CanvasEngine(this.canvas, this.galaxy.draw);
    this.canvas.addEventListener('pointermove', this.handlePointerMove, {
      signal: this.controller.signal,
    });
    this.canvas.addEventListener('click', this.handleClick, { signal: this.controller.signal });

    const window = this.closest('animation-window');
    if (window && !window.hasAttribute('data-chrome-only')) {
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

  private get interactive() {
    return this.getAttribute('variant') === 'interactive';
  }

  private nodeAt(event: PointerEvent) {
    const bounds = this.canvas!.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return this.galaxy
      .nodes()
      .find(
        (node) =>
          node.type === 'crd' &&
          Math.hypot(node.x - x, node.y - y) <= Math.max(28, node.radius + 10),
      );
  }

  private handleClick = (event: PointerEvent) => {
    if (!this.interactive) return;
    const node = this.nodeAt(event);
    if (!node) return;
    this.selectResource(node.id);
    this.dispatchEvent(
      new CustomEvent('kaosarchitecture:select', { bubbles: true, detail: { id: node.id } }),
    );
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (this.interactive) this.canvas!.style.cursor = this.nodeAt(event) ? 'pointer' : 'default';
  };

  private handlePlay = () => {
    this.setPlaying(true);
  };

  private handlePause = () => this.setPlaying(false);

  private setPlaying(playing: boolean) {
    this.engine?.setPlaying(playing);
  }
}

if (!customElements.get('kaos-architecture'))
  customElements.define('kaos-architecture', KaosArchitecture);
