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

export const ORGANISATIONS = ['EC', 'UN', 'ACM', 'IEEE', 'ISO', 'OWASP', 'LF AI'];

export interface PhraseStar {
  alpha: number;
  fragment: number;
  phase: number;
  scale: number;
  speed: number;
  x: number;
  y: number;
}

export interface SphereDot {
  elevation: number;
  latitude: number;
  longitude: number;
  seed: number;
}

export const clamp = (value: number) => Math.max(0, Math.min(1, value));
export const smooth = (value: number) => value * value * (3 - 2 * value);
export const ease = (value: number) => smooth(smooth(clamp(value)));

export const hash = (index: number, salt = 0) => {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export const createPhraseStars = (count: number, salt = 0): PhraseStar[] =>
  Array.from({ length: count }, (_, index) => ({
    alpha: 0.24 + hash(index, salt + 1) * 0.58,
    fragment: (index * 7 + salt * 3) % POLICY_FRAGMENTS.length,
    phase: hash(index, salt + 2) * Math.PI * 2,
    scale: 0.62 + hash(index, salt + 3) * 0.92,
    speed: 0.16 + hash(index, salt + 4) * 0.38,
    x: 0.025 + hash(index, salt + 5) * 0.95,
    y: 0.04 + hash(index, salt + 6) * 0.9,
  }));

export const createSphereDots = (rows: number, columns: number, salt = 0): SphereDot[] => {
  const dots: SphereDot[] = [];
  for (let row = 0; row < rows; row += 1) {
    const rowProgress = (row + 0.5) / rows;
    const latitude = (rowProgress - 0.5) * Math.PI;
    const rowColumns = Math.max(12, Math.round(columns * (0.44 + Math.cos(latitude) * 0.56)));
    for (let column = 0; column < rowColumns; column += 1) {
      const seed = hash(row * columns + column, salt);
      const longitude =
        (column / rowColumns) * Math.PI * 2 + latitude * 0.22 + (seed - 0.5) * 0.025;
      const ridge =
        Math.sin(longitude * 3.1 + latitude * 4.7) * 0.035 +
        Math.sin(longitude * 7.3 - latitude * 2.9) * 0.018 +
        Math.cos(longitude * 1.7 + latitude * 8.2) * 0.013;
      dots.push({ elevation: ridge, latitude, longitude, seed });
    }
  }
  return dots;
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
) => {
  const glow = context.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, `rgba(94,230,160,${alpha})`);
  glow.addColorStop(0.42, `rgba(94,230,160,${alpha * 0.28})`);
  glow.addColorStop(1, 'rgba(94,230,160,0)');
  context.fillStyle = glow;
  context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
};
