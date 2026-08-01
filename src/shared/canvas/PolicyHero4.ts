import { CanvasEngine, type CanvasDraw } from './CanvasEngine';

const FRAGMENTS = [
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
];

interface TextLine {
  depth: number;
  font: 'display' | 'mono';
  phase: number;
  speed: number;
  x: number;
  y: number;
}

const LINES: TextLine[] = FRAGMENTS.map((_, index) => ({
  depth: 0.35 + ((index * 37) % 60) / 100,
  font: index % 4 === 0 ? 'display' : 'mono',
  phase: (index * 1.91) % (Math.PI * 2),
  speed: 0.28 + (index % 5) * 0.045,
  x: 0.04 + ((index * 43) % 83) / 100,
  y: 0.08 + ((index * 29) % 82) / 100,
}));

const drawLivingText: CanvasDraw = (context, width, height, elapsed) => {
  context.clearRect(0, 0, width, height);
  const time = elapsed + 2.2;
  const activeIndex = Math.floor(time / 4.8) % FRAGMENTS.length;
  const activeProgress = (time % 4.8) / 4.8;
  const activeOpacity =
    activeProgress < 0.22
      ? activeProgress / 0.22
      : activeProgress < 0.72
        ? 1
        : 1 - (activeProgress - 0.72) / 0.28;
  const scale = Math.min(width / 920, height / 650);

  LINES.forEach((line, index) => {
    const active = index === activeIndex;
    const driftX = Math.sin(time * line.speed + line.phase) * 16 * line.depth * scale;
    const driftY = Math.cos(time * line.speed * 0.62 + line.phase) * 6 * line.depth * scale;
    const baseSize = line.font === 'display' ? 18 : 9.5;
    const fontSize = Math.max(8, (baseSize + (active ? 2.5 : 0)) * scale);
    const x = line.x * width + driftX;
    const y = line.y * height + driftY;

    context.font =
      line.font === 'display'
        ? `300 ${fontSize}px 'Newsreader', Georgia, serif`
        : `400 ${fontSize}px 'Geist Mono', monospace`;
    const widthOfText = context.measureText(FRAGMENTS[index]).width;
    const startX = line.x > 0.55 ? x - widthOfText : x;
    context.fillStyle = active
      ? `rgba(94,230,160,${0.16 + activeOpacity * 0.62})`
      : `rgba(244,242,238,${0.035 + line.depth * 0.065})`;
    context.fillText(FRAGMENTS[index], startX, y);

    if (active) {
      context.beginPath();
      context.moveTo(startX, y + 9 * scale);
      context.lineTo(startX + widthOfText * activeOpacity, y + 9 * scale);
      context.strokeStyle = `rgba(94,230,160,${activeOpacity * 0.22})`;
      context.lineWidth = 1;
      context.stroke();
    }
  });
};

export class PolicyHero4 extends HTMLElement {
  private engine?: CanvasEngine;

  connectedCallback() {
    const canvas = this.querySelector('canvas');
    if (canvas) this.engine = new CanvasEngine(canvas, drawLivingText);
  }

  disconnectedCallback() {
    this.engine?.destroy();
  }
}

if (!customElements.get('policy-hero-4')) customElements.define('policy-hero-4', PolicyHero4);
