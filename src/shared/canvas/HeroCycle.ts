import {
  type CanvasPalette,
  getPalette,
  onThemeChange,
  rgba,
  rgbCss,
  type Rgb,
  type CanvasSurface,
  surfaceOf,
} from './CanvasEngine';

type HeroMode = 'planes' | 'sphere' | 'contour';

/* The sphere mode paints in its own slightly cooler green, distinct from the
   site accent — kept as a literal under dark so the mode stays visually its own,
   collapsed onto the accent ink under light where it would otherwise vanish. */
const SPHERE_GREEN_DARK: Rgb = [62, 207, 166];

interface GraphNode {
  anchor?: string;
  layer: number;
  offset: number;
  period: number;
  seed: number;
  x: number;
  y: number;
  z: number;
}

interface GraphEdge {
  distance: number;
  from: number;
  limit: number;
  to: number;
}

interface ProjectedNode extends GraphNode {
  alpha: number;
  perspective: number;
}

interface HeroState {
  armed: boolean;
  current: HeroMode;
  last: number;
  mix: number;
  next: HeroMode | null;
  spin: number;
  tear: number;
}

const LABELS = [
  'Human intent',
  'Models',
  'Agents & tools',
  'Data',
  'Evaluations',
  'Monitoring',
  'Standards',
  'Institutions',
];

export class HeroCycle extends HTMLElement {
  private active = true;
  private animationFrame = 0;
  private buffer?: HTMLCanvasElement;
  private canvas?: HTMLCanvasElement;
  private context?: CanvasRenderingContext2D;
  private controller = new AbortController();
  private graph?: { nodes: GraphNode[]; edges: GraphEdge[] };
  private height = 0;
  private host?: HTMLElement;
  private indicators: HTMLElement[] = [];
  private intersectionObserver?: IntersectionObserver;
  private lastPointer?: { x: number; y: number };
  private pointer = { x: 0.5, y: 0.5 };
  private pointerTarget = { x: 0.5, y: 0.5 };
  private surface: CanvasSurface = 'dark';
  private palette: CanvasPalette = getPalette();
  private pausedAt?: number;
  private reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private resizeObserver?: ResizeObserver;
  private unsubscribeTheme?: () => void;
  private sphere?: { vertices: [number, number, number][]; edges: [number, number][] };
  private startedAt = performance.now();
  private state: HeroState = {
    current: 'planes',
    next: null,
    mix: 0,
    last: 0,
    spin: 0,
    armed: true,
    tear: 0,
  };
  private visible = true;
  private width = 0;

  connectedCallback() {
    this.controller = new AbortController();
    this.surface = surfaceOf(this);
    this.palette = getPalette(this.surface);
    this.canvas = this.querySelector('canvas') ?? undefined;
    this.host =
      this.canvas?.closest<HTMLElement>('.hero, .canvas-variant') ??
      this.canvas?.parentElement ??
      undefined;
    this.context = this.canvas?.getContext('2d') ?? undefined;
    if (!this.canvas || !this.context || !this.host) return;

    this.indicators = Array.from(this.host.querySelectorAll<HTMLElement>('[data-hero-mode]'));
    this.host.addEventListener('pointerenter', this.handlePointerEnter, {
      signal: this.controller.signal,
    });
    this.host.addEventListener('pointermove', this.handlePointerMove, {
      signal: this.controller.signal,
    });
    document.addEventListener('visibilitychange', this.handleVisibilityChange, {
      signal: this.controller.signal,
    });
    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.intersectionObserver = new IntersectionObserver(this.handleIntersection);

    this.unsubscribeTheme = onThemeChange(this.handleThemeChange);
    this.fit();
    this.draw(0);
    this.resizeObserver.observe(this.canvas);
    this.intersectionObserver.observe(this.canvas);
    if (!this.reducedMotion) this.animationFrame = requestAnimationFrame(this.loop);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.animationFrame);
    this.controller.abort();
    this.intersectionObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.unsubscribeTheme?.();
  }

  // This element owns its rAF loop, so it subscribes to the theme directly. The
  // offscreen `buffer` is fully repainted every frame, but a paused, hidden or
  // reduced-motion element needs an explicit repaint to clear the stale theme.
  private handleThemeChange = () => {
    this.palette = getPalette(this.surface);
    if (this.context) this.draw(this.state.last);
  };

  private draw(elapsed: number) {
    const context = this.context!;
    this.palette = getPalette(this.surface);
    const delta = Math.max(0, Math.min(0.05, elapsed - this.state.last));
    this.state.last = elapsed;
    const pointerFollow = 1 - Math.exp(-delta * 8);
    this.pointer.x += (this.pointerTarget.x - this.pointer.x) * pointerFollow;
    this.pointer.y += (this.pointerTarget.y - this.pointer.y) * pointerFollow;
    const modes: HeroMode[] = ['planes', 'sphere', 'contour'];
    const phase = elapsed % 9;
    const inTear = phase >= 6.4 && phase < 7.4;

    this.state.tear = inTear ? phase - 6.4 : 0;
    if (!inTear && phase >= 7.4 && !this.state.next && this.state.armed) {
      this.state.armed = false;
      this.state.next = modes[(modes.indexOf(this.state.current) + 1) % modes.length];
      this.state.mix = 0;
    }
    if (phase < 6.4) this.state.armed = true;

    if (this.state.next) {
      this.state.mix += delta / 1.25;
      if (this.state.mix >= 1) {
        this.state.current = this.state.next;
        this.state.next = null;
        this.state.mix = 0;
        this.indicators.forEach((indicator) => {
          indicator.classList.toggle('active', indicator.dataset.heroMode === this.state.current);
        });
      }
    }

    const tear = this.state.tear
      ? Math.sin(Math.min(1, this.state.tear) * Math.PI) * 0.9 + 0.1
      : this.state.next
        ? (1 - Math.min(1, this.state.mix)) * 0.3
        : 0;
    const smooth = (value: number) => value * value * (3 - 2 * value);
    const mix = this.state.next ? smooth(Math.min(1, this.state.mix)) : 0;
    const bell = this.state.next ? Math.sin(Math.min(1, this.state.mix) * Math.PI) : 0;
    this.state.spin += delta * bell * 2.4;

    if (!this.buffer) this.buffer = document.createElement('canvas');
    if (
      this.buffer.width !== Math.round(this.width) ||
      this.buffer.height !== Math.round(this.height)
    ) {
      this.buffer.width = Math.round(this.width);
      this.buffer.height = Math.round(this.height);
    }
    const bufferContext = this.buffer.getContext('2d')!;
    bufferContext.clearRect(0, 0, this.width, this.height);

    const layer = (mode: HeroMode, alpha: number, scale: number) => {
      bufferContext.save();
      bufferContext.globalAlpha = alpha;
      bufferContext.translate(this.width * 0.5, this.height * 0.5);
      bufferContext.scale(scale, scale);
      bufferContext.translate(-this.width * 0.5, -this.height * 0.5);
      this.paint(mode, bufferContext, this.width, this.height, elapsed);
      bufferContext.restore();
    };
    layer(this.state.current, 1 - mix, 1 + mix * 0.16);
    if (this.state.next) layer(this.state.next, mix, 0.86 + mix * 0.14);

    context.clearRect(0, 0, this.width, this.height);
    if (tear < 0.02) {
      context.drawImage(this.buffer, 0, 0, this.width, this.height);
      return;
    }

    const tick = Math.floor(elapsed / 0.055);
    const random = (seed: number) => {
      const value = Math.sin(tick * 12.9898 + seed * 78.233) * 43758.5453;
      return value - Math.floor(value);
    };
    const bandHeight = this.height / 16;
    for (let index = 0; index < 16; index += 1) {
      const value = random(index);
      const offsetX = (value - 0.5) * 90 * tear * (value > 0.62 ? 1.8 : 0.5);
      if (value > 0.94 && tear > 0.5) continue;
      context.drawImage(
        this.buffer,
        0,
        index * bandHeight,
        this.width,
        bandHeight,
        offsetX,
        index * bandHeight + (random(index + 50) - 0.5) * 4 * tear,
        this.width,
        bandHeight,
      );
      if (value > 0.78) {
        context.globalAlpha = 0.4 * tear;
        context.globalCompositeOperation = 'screen';
        context.drawImage(
          this.buffer,
          0,
          index * bandHeight,
          this.width,
          bandHeight,
          offsetX + 7 * tear,
          index * bandHeight,
          this.width,
          bandHeight,
        );
        context.globalCompositeOperation = 'source-over';
        context.globalAlpha = 1;
      }
    }
    context.globalAlpha = 0.08 * tear;
    context.fillStyle = rgbCss(this.palette.accentInk);
    context.fillRect(0, (random(99) * this.height) | 0, this.width, 2 + 3 * tear);
    context.globalAlpha = 1;
  }

  private drawContour(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
  ) {
    const centerX = width * (0.56 + (this.pointer.x - 0.5) * 0.05);
    const centerY = height * (0.5 + (this.pointer.y - 0.5) * 0.05);
    const step = Math.max(width, height) / 46;
    const swirl = this.state.spin * 1.1;
    for (let index = 1; index <= 54; index += 1) {
      context.beginPath();
      for (let angleIndex = 0; angleIndex <= 84; angleIndex += 1) {
        const angle = (angleIndex / 84) * Math.PI * 2 + swirl + index * 0.012;
        const warp =
          1 +
          0.17 * Math.sin(angle * 2 + index * 0.09 + elapsed * 0.22) +
          0.09 * Math.sin(angle * 3 - index * 0.05 - elapsed * 0.15) +
          0.05 * Math.cos(angle * 5 + elapsed * 0.1);
        const radius = index * step * warp;
        const x = centerX + Math.cos(angle) * radius * 1.15;
        const y = centerY + Math.sin(angle) * radius * 0.78;
        if (angleIndex) context.lineTo(x, y);
        else context.moveTo(x, y);
      }
      context.closePath();
      context.lineWidth = 0.7;
      const fade = 0.34 - (index / 54) * 0.26;
      context.strokeStyle =
        index % 9 === 0 ? rgba(this.palette.accentInk, fade + 0.1) : rgba(this.palette.ink, fade);
      context.stroke();
    }
    context.beginPath();
    context.ellipse(centerX, centerY, 14, 9, elapsed * 0.25, 0, 7);
    context.strokeStyle = rgba(this.palette.accentInk, 0.75);
    context.lineWidth = 1.1;
    context.stroke();
  }

  private drawPlanes(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
  ) {
    if (!this.graph) this.initializeGraph();
    const yaw = elapsed * 0.055 + this.state.spin + (this.pointer.x - 0.5) * 0.35;
    const tilt = 0.3 + (this.pointer.y - 0.5) * 0.14;
    const scale = Math.min(width * 1.15, height) * 0.4;
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const life = (node: GraphNode) => {
      const progress = ((elapsed + node.offset) % node.period) / node.period;
      const raw = Math.min(1, Math.min(progress, 1 - progress) / 0.3);
      return raw * raw * (3 - 2 * raw);
    };
    const points: ProjectedNode[] = this.graph!.nodes.map((node) => {
      const yawCosine = Math.cos(yaw);
      const yawSine = Math.sin(yaw);
      const x = node.x * yawCosine - node.z * yawSine;
      let z = node.x * yawSine + node.z * yawCosine;
      const tiltCosine = Math.cos(tilt);
      const tiltSine = Math.sin(tilt);
      const y = node.y * tiltCosine - z * tiltSine;
      z = node.y * tiltSine + z * tiltCosine;
      const perspective = 4.2 / (4.2 - z);
      return {
        ...node,
        x: centerX + x * scale * perspective,
        y: centerY + y * scale * perspective,
        z,
        perspective,
        alpha: life(node),
      };
    });

    context.lineWidth = 1;
    this.graph!.edges.forEach((edge) => {
      const start = points[edge.from];
      const end = points[edge.to];
      const alpha =
        start.alpha *
        end.alpha *
        (1 - edge.distance / edge.limit) *
        (0.3 + (0.3 * ((start.z + end.z) / 2 + 1)) / 2);
      if (alpha < 0.012) return;
      context.strokeStyle = rgba(this.palette.accentInk, alpha);
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.stroke();
    });
    points.forEach((point) => {
      if (point.alpha < 0.02) return;
      const radius = (1.3 + 1.9 * point.perspective) * (0.7 + point.seed * 0.6);
      const bright = point.seed > 0.78;
      context.beginPath();
      context.arc(point.x, point.y, radius, 0, 7);
      context.fillStyle = bright
        ? rgba(this.palette.accentInk, point.alpha * 0.95)
        : rgba(this.palette.ink, point.alpha * (0.3 + 0.42 * point.perspective));
      context.fill();
      if (bright) {
        context.beginPath();
        context.arc(point.x, point.y, radius + 6 + 3 * point.perspective, 0, 7);
        context.strokeStyle = rgba(this.palette.accentInk, point.alpha * 0.16);
        context.stroke();
      }
      if (point.anchor && point.z > -0.1) {
        context.font = "10px 'Geist Mono',monospace";
        context.fillStyle = rgba(this.palette.ink, point.alpha * 0.3);
        context.fillText(point.anchor.toUpperCase(), point.x + 11, point.y - 9);
      }
    });
  }

  private drawSphere(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
  ) {
    if (!this.sphere) this.initializeSphere();
    const sphereGreen = this.palette.onLight ? this.palette.accentInk : SPHERE_GREEN_DARK;
    const rotationX = -0.24 + elapsed * 0.06 + (this.pointer.y - 0.5) * 0.5;
    const rotationY = 0.4 + elapsed * 0.2 + this.state.spin * 1.4 + (this.pointer.x - 0.5) * 0.9;
    const radius = Math.min(width, height) * 0.36;
    const centerX = width * 0.6;
    const centerY = height * 0.5;
    const cosineX = Math.cos(rotationX);
    const sineX = Math.sin(rotationX);
    const cosineY = Math.cos(rotationY);
    const sineY = Math.sin(rotationY);
    const points = this.sphere!.vertices.map((vertex) => {
      const y = vertex[1] * cosineX - vertex[2] * sineX;
      const z = vertex[1] * sineX + vertex[2] * cosineX;
      const x = vertex[0] * cosineY + z * sineY;
      const depth = -vertex[0] * sineY + z * cosineY;
      const perspective = 3.4 / (3.4 + depth);
      return {
        x: centerX + x * perspective * radius,
        y: centerY + y * perspective * radius,
        z: depth,
      };
    });
    const alive = this.sphere!.vertices.map((_, index) =>
      Math.max(
        0,
        Math.min(1, (Math.sin(elapsed * 0.9 + ((index * 1.7) % (Math.PI * 2))) + 0.65) * 1.4),
      ),
    );

    context.setLineDash([1, 6]);
    context.strokeStyle = rgba(sphereGreen, 0.18);
    context.beginPath();
    context.arc(centerX, centerY, radius * 1.06, 0, 7);
    context.stroke();
    context.setLineDash([]);
    this.sphere!.edges.forEach(([from, to]) => {
      const life = Math.min(alive[from], alive[to]);
      if (life <= 0.02) return;
      const depth = 0.15 + Math.max(0, 1 - ((points[from].z + points[to].z) / 2 + 1) / 2) * 0.75;
      context.strokeStyle = rgba(sphereGreen, depth * life * 0.8);
      context.beginPath();
      context.moveTo(points[from].x, points[from].y);
      context.lineTo(points[to].x, points[to].y);
      context.stroke();
    });
    points.forEach((point, index) => {
      const life = alive[index];
      if (life <= 0.02) return;
      const depth = 0.4 + Math.max(0, 1 - (point.z + 1) / 2) * 0.6;
      context.beginPath();
      context.arc(point.x, point.y, 2.4 * (0.4 + life * 0.9), 0, 7);
      context.fillStyle = rgba(sphereGreen, depth * life * (point.z < 0 ? 1 : 0.45));
      context.fill();
    });
    const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.22);
    glow.addColorStop(0, rgba(sphereGreen, 0.5));
    glow.addColorStop(1, rgba(sphereGreen, 0));
    context.fillStyle = glow;
    context.beginPath();
    context.arc(centerX, centerY, radius * 0.22, 0, 7);
    context.fill();
    context.fillStyle = rgbCss(this.palette.wash);
    context.beginPath();
    context.arc(centerX, centerY, 3, 0, 7);
    context.fill();
  }

  private fit() {
    const bounds = this.canvas!.getBoundingClientRect();
    const density = Math.min(devicePixelRatio || 1, 1.5);
    this.width = bounds.width;
    this.height = bounds.height;
    this.canvas!.width = Math.max(1, Math.round(this.width * density));
    this.canvas!.height = Math.max(1, Math.round(this.height * density));
    this.context!.setTransform(density, 0, 0, density, 0, 0);
  }

  private handlePointerEnter = (event: PointerEvent) => {
    this.lastPointer = { x: event.clientX, y: event.clientY };
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (!this.lastPointer) {
      this.handlePointerEnter(event);
      return;
    }
    const bounds = this.host!.getBoundingClientRect();
    const deltaX = (event.clientX - this.lastPointer.x) / bounds.width;
    const deltaY = (event.clientY - this.lastPointer.y) / bounds.height;
    this.pointerTarget.x = Math.max(0, Math.min(1, this.pointerTarget.x + deltaX));
    this.pointerTarget.y = Math.max(0, Math.min(1, this.pointerTarget.y + deltaY));
    this.lastPointer = { x: event.clientX, y: event.clientY };
  };

  private handleResize = () => {
    this.fit();
    if (this.reducedMotion) this.draw(0);
  };

  private handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
    this.active = entry.isIntersecting;
    this.updatePlayback();
  };

  private handleVisibilityChange = () => {
    this.visible = !document.hidden;
    this.updatePlayback();
  };

  private initializeGraph() {
    const nodes: GraphNode[] = [];
    [
      { y: -0.62, count: 16 },
      { y: 0, count: 20 },
      { y: 0.62, count: 15 },
    ].forEach((layer, layerIndex) => {
      const columns = Math.ceil(Math.sqrt(layer.count * 1.7));
      for (let index = 0; index < layer.count; index += 1) {
        const gridX = (index % columns) / (columns - 1) - 0.5;
        const gridZ =
          Math.floor(index / columns) / Math.max(1, Math.ceil(layer.count / columns) - 1) - 0.5;
        nodes.push({
          x: gridX * 2.5 + (Math.random() - 0.5) * 0.3,
          y: layer.y + (Math.random() - 0.5) * 0.14,
          z: gridZ * 2.1 + (Math.random() - 0.5) * 0.28,
          layer: layerIndex,
          period: 11 + Math.random() * 14,
          offset: Math.random() * 20,
          seed: Math.random(),
        });
      }
    });
    LABELS.forEach((label, index) => {
      if (nodes[index * 6]) nodes[index * 6].anchor = label;
    });

    const edges: GraphEdge[] = [];
    for (let from = 0; from < nodes.length; from += 1) {
      for (let to = from + 1; to < nodes.length; to += 1) {
        const first = nodes[from];
        const second = nodes[to];
        const distance = Math.hypot(first.x - second.x, first.y - second.y, first.z - second.z);
        const sameLayer = first.layer === second.layer;
        const limit = sameLayer ? 0.78 : 0.82;
        if (distance <= limit && (sameLayer || Math.random() <= 0.35)) {
          edges.push({ from, to, distance, limit });
        }
      }
    }
    this.graph = { nodes, edges };
  }

  private initializeSphere() {
    const vertices: [number, number, number][] = [];
    const edges: [number, number][] = [];
    const seen = new Set<string>();
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let index = 0; index < 48; index += 1) {
      const y = 1 - (index / 47) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const angle = golden * index;
      vertices.push([Math.cos(angle) * radius, y, Math.sin(angle) * radius]);
    }
    for (let index = 0; index < 48; index += 1) {
      vertices
        .map((point, candidate) => ({
          candidate,
          distance:
            (point[0] - vertices[index][0]) ** 2 +
            (point[1] - vertices[index][1]) ** 2 +
            (point[2] - vertices[index][2]) ** 2,
        }))
        .filter(({ candidate }) => candidate !== index)
        .sort((first, second) => first.distance - second.distance)
        .slice(0, 3)
        .forEach(({ candidate }) => {
          const key = index < candidate ? `${index}-${candidate}` : `${candidate}-${index}`;
          if (!seen.has(key)) {
            seen.add(key);
            edges.push([index, candidate]);
          }
        });
    }
    this.sphere = { vertices, edges };
  }

  private loop = (now: number) => {
    this.draw((now - this.startedAt) / 1000);
    if (this.active && this.visible) this.animationFrame = requestAnimationFrame(this.loop);
  };

  private updatePlayback() {
    if (this.reducedMotion) return;
    cancelAnimationFrame(this.animationFrame);
    const now = performance.now();
    if (!this.active || !this.visible) {
      this.pausedAt ??= now;
      return;
    }
    if (this.pausedAt !== undefined) {
      this.startedAt += now - this.pausedAt;
      this.pausedAt = undefined;
    }
    this.animationFrame = requestAnimationFrame(this.loop);
  }

  private paint(
    mode: HeroMode,
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    elapsed: number,
  ) {
    if (mode === 'sphere') this.drawSphere(context, width, height, elapsed);
    else if (mode === 'contour') this.drawContour(context, width, height, elapsed);
    else this.drawPlanes(context, width, height, elapsed);
  }
}

if (!customElements.get('hero-cycle')) {
  customElements.define('hero-cycle', HeroCycle);
}
