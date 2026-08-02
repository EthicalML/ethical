import { CanvasEngine, type CanvasDraw } from './CanvasEngine';
import { clamp, createSphereDots, drawGlow, hash, smooth, spherePoint } from './PolicyHeroShared';

const DOTS = createSphereDots(54, 90, 5);
const STARS = Array.from({ length: 54 }, (_, index) => ({
  alpha: 0.08 + hash(index, 51) * 0.24,
  phase: hash(index, 52) * Math.PI * 2,
  radius: 0.35 + hash(index, 53) * 1.1,
  x: hash(index, 54),
  y: hash(index, 55) * 0.75,
}));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const drawDottedPlanet: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);
  const time = reducedMotion ? 6.4 : elapsed + 2.2;
  const scale = Math.min(width / 920, height / 650);
  const center = { x: width * 0.61, y: height * 1.055 };
  const radiusX = Math.min(width * 0.52, height * 0.76);
  const radiusY = Math.min(height * 0.75, width * 0.54);
  const rotation = time * 0.036;
  const sweep = Math.sin(time * 0.16) * 0.72;

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
    radiusX * 0.08,
    center.x,
    center.y,
    radiusX * 1.06,
  );
  planetGlow.addColorStop(0, 'rgba(94,230,160,.055)');
  planetGlow.addColorStop(0.55, 'rgba(94,230,160,.022)');
  planetGlow.addColorStop(1, 'rgba(94,230,160,0)');
  context.fillStyle = planetGlow;
  context.fillRect(0, height * 0.12, width, height * 0.88);

  DOTS.forEach((dot) => {
    const point = spherePoint(dot, rotation);
    if (point.z < -0.035) return;
    const depth = clamp((point.z + 0.04) / 1.08);
    const surfaceX = point.x * 0.72 - point.y * 0.48;
    const band = Math.exp(-Math.pow((surfaceX - sweep) / 0.19, 2));
    const directional = clamp((-point.x * 0.48 + point.y * 0.7 + point.z * 0.22 + 0.38) / 1.5);
    const ridge = clamp((dot.elevation + 0.06) / 0.12);
    const alpha = clamp(0.04 + depth * 0.12 + directional * 0.31 + band * 0.68 + ridge * 0.045);
    const radius = (0.48 + depth * 0.62 + directional * 0.52 + band * 0.94) * scale;
    const x = center.x + point.x * radiusX;
    const y = center.y - point.y * radiusY;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(94,230,160,${alpha})`;
    context.fill();
  });

  const atmosphere = context.createLinearGradient(
    center.x - radiusX,
    center.y - radiusY,
    center.x + radiusX,
    center.y - radiusY * 0.35,
  );
  atmosphere.addColorStop(0, 'rgba(94,230,160,.04)');
  atmosphere.addColorStop(0.42, 'rgba(94,230,160,.19)');
  atmosphere.addColorStop(1, 'rgba(94,230,160,.025)');
  context.beginPath();
  context.ellipse(center.x, center.y, radiusX, radiusY, 0, Math.PI * 1.04, Math.PI * 1.96);
  context.strokeStyle = atmosphere;
  context.lineWidth = 1.1;
  context.stroke();

  const markerDot = {
    elevation: 0.035,
    latitude: 0.37,
    longitude: 1.72,
    seed: 0,
  };
  const marker = spherePoint(markerDot, rotation);
  if (marker.z > 0) {
    const x = center.x + marker.x * radiusX;
    const y = center.y - marker.y * radiusY;
    const pulse = reducedMotion ? 0.65 : 0.5 + Math.sin(time * 1.15) * 0.5;
    drawGlow(context, x, y, 26 * scale, 0.12 + pulse * 0.06);
    context.beginPath();
    context.arc(x, y, (10 + pulse * 4) * scale, 0, Math.PI * 2);
    context.strokeStyle = `rgba(244,242,238,${0.2 + pulse * 0.2})`;
    context.lineWidth = 0.8;
    context.stroke();
    context.beginPath();
    context.arc(x, y, (17 + pulse * 4) * scale, 0, Math.PI * 2);
    context.strokeStyle = `rgba(94,230,160,${0.1 + pulse * 0.12})`;
    context.stroke();
    context.beginPath();
    context.arc(x, y, 3.4 * scale, 0, Math.PI * 2);
    context.fillStyle = 'rgba(244,242,238,.88)';
    context.fill();
    const labelAlpha = 0.46 + smooth(pulse) * 0.18;
    context.font = `${Math.max(8, 9 * scale)}px 'Geist Mono', monospace`;
    context.fillStyle = `rgba(244,242,238,${labelAlpha})`;
    context.fillText('8/12 ADOPTED', x + 24 * scale, y - 15 * scale);
    context.fillStyle = 'rgba(94,230,160,.38)';
    context.font = `${Math.max(7, 7.5 * scale)}px 'Geist Mono', monospace`;
    context.fillText('GPAI CODE', x + 24 * scale, y - 3 * scale);
  }
};

export class PolicyHeroDottedPlanet extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawDottedPlanet);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-hero-dotted-planet')) {
  customElements.define('policy-hero-dotted-planet', PolicyHeroDottedPlanet);
}
