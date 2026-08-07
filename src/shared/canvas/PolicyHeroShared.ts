import { rgba, type Rgb } from './CanvasEngine';

export const POLICY_FRAGMENTS = [
  'eight (8) out of twelve (12) initial recommendations',
  'narrowness is maintained rather than merely declared',
  'operational divergence',
  'continuous and dynamic oversight',
  'measurable, reproducible, auditable',
  'an incident register',
  'deployment vs release',
  'classification should follow the risk introduced',
  'proportionate to the risk involved',
  'define your terms',
  'certain artifacts are irreducible for a meaningful audit',
  'ADM processes must be traceable',
  'public scrutiny of the data and models',
  'human-centered AI systems work in partnership',
  'sunlight is often the best disinfectant',
  'Existing mechanisms and modes for avoiding such harm likely will not suffice',
  'risk introduced by use of models',
  'systemic-risk mitigations',
  'domain experts involved',
  'model-fair-use templates',
  'incident-response plan for security breaches',
  'synthetic data inherits and can mask bias',
  'documented monitoring',
  'kill switches and drift-abort thresholds',
  'continuous post-deployment oversight',
  'a highly transparent process',
  'internationally compatible and interoperable',
  'inclusive AI governance',
  'not just industry led',
  'dataset provenance',
  'inference-phase energy transparency',
  'public climate-metrics registry',
];

export interface SphereDot {
  elevation: number;
  latitude: number;
  longitude: number;
  seed: number;
}

export const clamp = (value: number) => Math.max(0, Math.min(1, value));
export const smooth = (value: number) => value * value * (3 - 2 * value);

export const hash = (index: number, salt = 0) => {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export const spherePoint = (dot: SphereDot, rotation: number) => {
  const longitude = dot.longitude + rotation;
  const latitudeRadius = Math.cos(dot.latitude);
  const radius = 1 + dot.elevation;
  return {
    x: latitudeRadius * Math.cos(longitude) * radius,
    y: Math.sin(dot.latitude) * radius,
    z: latitudeRadius * Math.sin(longitude) * radius,
  };
};

export const drawGlow = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number,
  color: Rgb,
) => {
  const glow = context.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, rgba(color, alpha));
  glow.addColorStop(0.42, rgba(color, alpha * 0.28));
  glow.addColorStop(1, rgba(color, 0));
  context.fillStyle = glow;
  context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
};
