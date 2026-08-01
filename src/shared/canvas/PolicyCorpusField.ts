import { CanvasEngine, type CanvasDraw } from './CanvasEngine';

interface CanvasQuote {
  featured: boolean;
  text: string;
  theme: string;
  title: string;
}

interface CorpusThemeEvent extends CustomEvent {
  detail: { theme: string };
}

interface LetterTarget {
  character: string;
  index: number;
  line: number;
  x: number;
  y: number;
}

function easeOut(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function hash(value: string) {
  return [...value].reduce(
    (total, character) => (total * 31 + character.charCodeAt(0)) >>> 0,
    2166136261,
  );
}

function wrap(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (current && context.measureText(next).width > maxWidth) {
      lines.push(current);
      current = word;
    } else current = next;
  });
  if (current) lines.push(current);
  return lines;
}

export class PolicyCorpusField extends HTMLElement {
  private controller = new AbortController();
  private engine?: CanvasEngine;
  private letters: LetterTarget[] = [];
  private quotes: CanvasQuote[] = [];
  private selected: CanvasQuote[] = [];
  private theme = 'all';
  private transitionStarted = performance.now();

  connectedCallback() {
    this.controller = new AbortController();
    const canvas = this.querySelector('canvas');
    if (!canvas || !this.dataset.quotes) return;
    this.quotes = JSON.parse(this.dataset.quotes) as CanvasQuote[];
    this.addEventListener('corpus-theme', this.handleTheme as EventListener, {
      signal: this.controller.signal,
    });
    this.select('all');
    this.engine = new CanvasEngine(canvas, this.draw);
  }

  disconnectedCallback() {
    this.controller.abort();
    this.engine?.destroy();
  }

  private select(theme: string) {
    this.theme = theme;
    this.selected = this.quotes
      .filter((quote) => (theme === 'all' ? quote.featured : quote.theme === theme))
      .slice(0, 3);
    this.transitionStarted = performance.now();
    this.letters = [];
    this.engine?.redraw();
  }

  private handleTheme = (event: CorpusThemeEvent) => {
    this.select(event.detail.theme);
  };

  private draw: CanvasDraw = (context, width, height, elapsed) => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = '#0f100f';
    context.fillRect(0, 0, width, height);

    context.lineWidth = 1;
    context.strokeStyle = 'rgba(94,230,160,.055)';
    for (let x = 0; x < width; x += 64) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }
    for (let y = 0; y < height; y += 64) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    context.font = "10px 'Geist Mono', monospace";
    this.quotes.slice(0, 20).forEach((quote, index) => {
      const seed = hash(quote.title);
      const x = ((seed % 89) / 100) * width;
      const baseY = (((seed >>> 7) % 93) / 100) * height;
      const y = (baseY - elapsed * (4 + (index % 3)) + height) % height;
      const matched = this.theme === 'all' || quote.theme === this.theme;
      context.fillStyle = matched ? 'rgba(94,230,160,.16)' : 'rgba(244,242,238,.055)';
      context.fillText(quote.text.slice(0, 62), x, y, Math.min(360, width * 0.32));
    });

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const progress = reduced ? 1 : Math.min(1, (performance.now() - this.transitionStarted) / 920);
    const quoteWidth = Math.min(920, width * 0.76);
    const fontSize = width < 700 ? 20 : 27;
    const lineHeight = fontSize * 1.3;
    context.font = `300 ${fontSize}px 'Newsreader', serif`;

    if (!this.letters.length) {
      let y = height * 0.2;
      let letterIndex = 0;
      this.selected.forEach((quote, quoteIndex) => {
        const lines = wrap(context, quote.text, quoteWidth);
        lines.forEach((line, lineIndex) => {
          const lineWidth = context.measureText(line).width;
          let x = (width - lineWidth) / 2;
          [...line].forEach((character) => {
            this.letters.push({
              character,
              index: letterIndex,
              line: quoteIndex * 10 + lineIndex,
              x,
              y,
            });
            x += context.measureText(character).width;
            letterIndex += 1;
          });
          y += lineHeight;
        });
        y += lineHeight * 1.15;
      });
    }

    this.letters.forEach((letter) => {
      const local = reduced
        ? 1
        : Math.max(0, Math.min(1, progress * 1.32 - (letter.index % 38) * 0.009));
      const eased = easeOut(local);
      const direction = letter.index % 2 ? 1 : -1;
      const originX = letter.x + direction * (70 + (letter.index % 7) * 18);
      const originY = letter.y + ((letter.line % 3) - 1) * 46;
      context.fillStyle = `rgba(244,242,238,${0.05 + eased * 0.9})`;
      context.fillText(
        letter.character,
        originX + (letter.x - originX) * eased,
        originY + (letter.y - originY) * eased,
      );
    });
  };
}

if (!customElements.get('policy-corpus-field')) {
  customElements.define('policy-corpus-field', PolicyCorpusField);
}
