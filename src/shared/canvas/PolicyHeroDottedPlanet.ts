import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import { clamp, createSphereDots, drawGlow, hash, smooth, spherePoint } from './PolicyHeroShared';

const DOTS = createSphereDots(80, 150, 5);
const STARS = Array.from({ length: 54 }, (_, index) => ({
  alpha: 0.08 + hash(index, 51) * 0.24,
  phase: hash(index, 52) * Math.PI * 2,
  radius: 0.35 + hash(index, 53) * 1.1,
  x: hash(index, 54),
  y: hash(index, 55) * 0.75,
}));

interface OrgMarker {
  detail: string;
  elevation: number;
  latitude: number;
  longitude: number;
  org: string;
  phase: number;
  seed: number;
}

const MARKERS: OrgMarker[] = [
  {
    org: 'EC',
    detail: '8/12 ADOPTED',
    latitude: 0.42,
    longitude: 1.72,
    elevation: 0.03,
    phase: 0.0,
    seed: 0,
  },
  {
    org: 'UN',
    detail: 'GLOBAL DIALOGUE',
    latitude: 0.08,
    longitude: 3.1,
    elevation: 0.03,
    phase: 1.1,
    seed: 0,
  },
  {
    org: 'ACM',
    detail: 'TPC COMMENTS',
    latitude: 0.66,
    longitude: 0.4,
    elevation: 0.03,
    phase: 2.2,
    seed: 0,
  },
  {
    org: 'IEEE',
    detail: 'P7000 SERIES',
    latitude: -0.22,
    longitude: 2.3,
    elevation: 0.03,
    phase: 3.0,
    seed: 0,
  },
  {
    org: 'ISO',
    detail: 'JTC 1/SC 42',
    latitude: 0.3,
    longitude: 5.0,
    elevation: 0.03,
    phase: 4.1,
    seed: 0,
  },
  {
    org: 'OWASP',
    detail: 'LLM TOP 10',
    latitude: -0.44,
    longitude: 4.0,
    elevation: 0.03,
    phase: 5.0,
    seed: 0,
  },
];

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export class PolicyHeroDottedPlanet extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private pointer = { active: false, strength: 0, targetX: 0.5, targetY: 0.5, x: 0.5, y: 0.5 };

  connectedCallback() {
    this.controller = new AbortController();
    const canvas = this.querySelector('canvas');
    if (!canvas) return;
    canvas.addEventListener('pointerenter', this.handlePointer, { signal: this.controller.signal });
    canvas.addEventListener('pointermove', this.handlePointer, { signal: this.controller.signal });
    canvas.addEventListener('pointerleave', this.handlePointerLeave, {
      signal: this.controller.signal,
    });
    this.engine = new CanvasEngine(canvas, this.draw);
  }

  disconnectedCallback() {
    this.controller.abort();
    this.engine?.destroy();
  }

  private handlePointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    const canvas = event.currentTarget as HTMLCanvasElement;
    const bounds = canvas.getBoundingClientRect();
    this.pointer.active = true;
    this.pointer.targetX = (event.clientX - bounds.left) / bounds.width;
    this.pointer.targetY = (event.clientY - bounds.top) / bounds.height;
  };

  private handlePointerLeave = () => {
    this.pointer.active = false;
  };

  private draw: CanvasDraw = (context, width, height, elapsed) => {
    context.clearRect(0, 0, width, height);
    const time = reducedMotion ? 6.4 : elapsed + 2.2;
    const scale = Math.min(width / 920, height / 650);
    const center = { x: width * 0.6, y: height * 1.02 };
    const radiusX = Math.min(width * 0.56, height * 0.82);
    const radiusY = Math.min(height * 0.8, width * 0.58);
    const rotation = time * 0.044;
    // Clearer, faster oscillating light sweep across the surface.
    const sweep = Math.sin(time * 0.26) * 0.82;

    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.12;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.12;
    this.pointer.strength += ((this.pointer.active ? 1 : 0) - this.pointer.strength) * 0.09;
    const strength = this.pointer.strength;
    const cursorX = this.pointer.x * width;
    const cursorY = this.pointer.y * height;
    const hoverRadius = Math.min(width, height) * 0.26;

    STARS.forEach((star) => {
      const twinkle = 0.42 + (Math.sin(time * 0.34 + star.phase) + 1) * 0.29;
      context.beginPath();
      context.arc(star.x * width, star.y * height, star.radius * scale, 0, Math.PI * 2);
      context.fillStyle = `rgba(244,242,238,${star.alpha * twinkle})`;
      context.fill();
    });

    const planetGlow = context.createRadialGradient(
      center.x - radiusX * 0.22,
      center.y - radiusY * 0.5,
      radiusX * 0.06,
      center.x,
      center.y,
      radiusX * 1.06,
    );
    planetGlow.addColorStop(0, 'rgba(94,230,160,.1)');
    planetGlow.addColorStop(0.55, 'rgba(94,230,160,.034)');
    planetGlow.addColorStop(1, 'rgba(94,230,160,0)');
    context.fillStyle = planetGlow;
    context.fillRect(0, height * 0.12, width, height * 0.88);

    DOTS.forEach((dot) => {
      const point = spherePoint(dot, rotation);
      // Soft terminator: dots fade through a shade band as they rotate to the limb,
      // no hard pop. Only fully faded dots (deep on the far side) are culled.
      if (point.z < -0.32) return;
      const fade = smooth(clamp((point.z + 0.32) / 0.4));
      const depth = clamp((point.z + 0.32) / 1.34);
      const surfaceX = point.x * 0.72 - point.y * 0.44;
      const band = Math.exp(-Math.pow((surfaceX - sweep) / 0.17, 2));
      const directional = clamp((-point.x * 0.5 + point.y * 0.68 + 0.46) / 1.42);
      const ridge = clamp((dot.elevation + 0.06) / 0.12);
      const x = center.x + point.x * radiusX;
      let y = center.y - point.y * radiusY;
      let alpha = clamp(0.07 + depth * 0.14 + directional * 0.6 + band * 0.5 + ridge * 0.06) * fade;
      let radius =
        (0.5 + depth * 0.55 + directional * 0.86 + band * 0.78) * scale * (0.55 + fade * 0.45);

      if (strength > 0.01) {
        const distance = Math.hypot(cursorX - x, cursorY - y);
        if (distance < hoverRadius) {
          const local = Math.pow(1 - distance / hoverRadius, 2) * strength;
          alpha = clamp(alpha + local * 0.5);
          radius += local * 1.4 * scale;
          y -= local * 3.2 * scale;
        }
      }

      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(94,230,160,${alpha})`;
      context.fill();
    });

    // Organisation markers: rings are always present on the front hemisphere; labels
    // reveal as the light sweep passes and whenever the cursor is near.
    let nearest = -1;
    let nearestDistance = Infinity;
    const screen = MARKERS.map((marker) => {
      const point = spherePoint(marker, rotation);
      const x = center.x + point.x * radiusX;
      const y = center.y - point.y * radiusY;
      if (strength > 0.01 && point.z > 0.02) {
        const distance = Math.hypot(cursorX - x, cursorY - y);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = MARKERS.indexOf(marker);
        }
      }
      return { point, x, y };
    });

    MARKERS.forEach((marker, index) => {
      const { point, x, y } = screen[index];
      if (point.z <= 0.02) return;
      const front = clamp((point.z - 0.02) / 0.4);
      const surfaceX = point.x * 0.72 - point.y * 0.44;
      const sweepNear = Math.exp(-Math.pow((surfaceX - sweep) / 0.16, 2));
      const hoverNear =
        strength > 0.01 && index === nearest ? clamp(1 - nearestDistance / (hoverRadius * 1.1)) : 0;
      const reveal = clamp((sweepNear * 0.85 + hoverNear * 1.1) * front);
      const pulse = reducedMotion ? 0.6 : 0.5 + Math.sin(time * 1.1 + marker.phase) * 0.5;

      drawGlow(context, x, y, (13 + reveal * 16) * scale, 0.07 + reveal * 0.13);
      context.beginPath();
      context.arc(x, y, (8 + pulse * 3) * scale, 0, Math.PI * 2);
      context.strokeStyle = `rgba(244,242,238,${(0.14 + reveal * 0.5) * front})`;
      context.lineWidth = 0.8;
      context.stroke();
      context.beginPath();
      context.arc(x, y, (14 + pulse * 3) * scale, 0, Math.PI * 2);
      context.strokeStyle = `rgba(94,230,160,${(0.08 + reveal * 0.28) * front})`;
      context.stroke();
      context.beginPath();
      context.arc(x, y, 3.2 * scale, 0, Math.PI * 2);
      context.fillStyle = `rgba(244,242,238,${(0.55 + reveal * 0.35) * front})`;
      context.fill();

      if (reveal > 0.04) {
        context.font = `${Math.max(8, 9 * scale)}px 'Geist Mono', monospace`;
        context.fillStyle = `rgba(244,242,238,${reveal * 0.82})`;
        context.fillText(marker.detail, x + 22 * scale, y - 14 * scale);
        context.font = `${Math.max(7, 7.5 * scale)}px 'Geist Mono', monospace`;
        context.fillStyle = `rgba(94,230,160,${reveal * 0.72})`;
        context.fillText(marker.org, x + 22 * scale, y - 3 * scale);
      }
    });
  };
}

if (!customElements.get('policy-hero-dotted-planet')) {
  customElements.define('policy-hero-dotted-planet', PolicyHeroDottedPlanet);
}
