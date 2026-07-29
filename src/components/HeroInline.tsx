// EXHIBIT — fully self-contained hero as a Preact component: typed props, markup,
// and the complete typewriter implementation in one file. Requires hydration
// (client:load or client:visible) for the effect to run. Dormant: no page imports this.
import { useEffect, useRef } from 'preact/hooks';

interface HeroButton {
  href: string;
  label: string;
}

interface Props {
  status: string;
  status_href?: string;
  title: string[];
  subtitle: string;
  beneficiaries?: string[];
  typewriter_underline?: boolean;
  primary_button: HeroButton;
  secondary_button: HeroButton;
}

const missionLine1 = 'We are an independent research institute with a mission to';
const missionLine2 = 'ensure that frontier AI is safe, aligned and accountable to';

function mountTypewriter(subtitle: HTMLElement, beneficiaries: string[]) {
  let destroyed = false;
  const outputs = [...subtitle.querySelectorAll<HTMLElement>('.hero-typewriter-text')];
  const glitch = subtitle.querySelector<HTMLElement>('.hero-typewriter-glitch');
  const cursor = subtitle.querySelector<HTMLElement>('.hero-typewriter-cursor');
  const initialBeneficiary = beneficiaries[0];
  if (outputs.length !== 3 || !glitch || !cursor || !initialBeneficiary) return () => {};

  const initialLines = [outputs[0].textContent ?? '', outputs[1].textContent ?? '', initialBeneficiary];

  const styles = getComputedStyle(subtitle);
  const readDuration = (name: string, fallback: number) => {
    const value = parseFloat(styles.getPropertyValue(name));
    return Number.isFinite(value) ? value : fallback;
  };
  const typeDelay = readDuration('--typewriter-type-ms', 45);
  const deleteDelay = readDuration('--typewriter-delete-ms', 25);

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const jitter = () => typeDelay + (Math.random() - 0.5) * 12;
  const setPhase = (phase: string) => { subtitle.dataset.typewriterPhase = phase; };
  const setText = (output: HTMLElement, text: string) => {
    output.textContent = text;
    if (output === outputs[2]) glitch.dataset.text = text;
  };

  const type = async (output: HTMLElement, text: string, phase = 'typing') => {
    setPhase(phase);
    (output === outputs[2] ? glitch : output.parentElement!).append(cursor);
    for (const character of text) {
      if (destroyed) return;
      setText(output, (output.textContent ?? '') + character);
      await wait(jitter());
    }
  };

  const remove = async (output: HTMLElement, count: number) => {
    setPhase('deleting');
    for (let index = 0; index < count; index += 1) {
      if (destroyed) return;
      setText(output, (output.textContent ?? '').slice(0, -1));
      await wait(deleteDelay);
    }
  };

  const waitForGlitchEnd = async (skipActiveBurst = false) => {
    const headline = document.querySelector('.glitch')?.getAnimations()
      .find((animation) => (animation as CSSAnimation).animationName === 'om-flicker');
    const cycle = Number(headline?.effect?.getTiming().duration) || 9000;
    const phase = (Number(headline?.currentTime) || 0) % cycle;
    const burstStart = cycle * 0.656;
    const burstEnd = cycle * 0.767;
    const canUseCurrentBurst = phase < burstEnd && (!skipActiveBurst || phase < burstStart);
    await wait(canUseCurrentBurst ? burstEnd - phase : cycle - phase + burstEnd);
  };

  const run = async () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      initialLines.forEach((line, index) => setText(outputs[index], line));
      setPhase('static');
      return;
    }
    outputs.forEach((output) => setText(output, ''));
    for (let index = 0; index < initialLines.length; index += 1) {
      await type(outputs[index], initialLines[index], 'initial');
    }
    let beneficiaryIndex = 0;
    let firstRotation = true;
    while (!destroyed) {
      setPhase('dwell');
      await waitForGlitchEnd(firstRotation);
      firstRotation = false;
      await remove(outputs[2], beneficiaries[beneficiaryIndex].length);
      beneficiaryIndex = (beneficiaryIndex + 1) % beneficiaries.length;
      await type(outputs[2], beneficiaries[beneficiaryIndex]);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      run();
    });
  });
  observer.observe(subtitle);

  return () => {
    destroyed = true;
    observer.disconnect();
  };
}

export default function HeroInline({
  status,
  status_href,
  title,
  subtitle,
  beneficiaries = [],
  typewriter_underline = false,
  primary_button,
  secondary_button,
}: Props) {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const initialBeneficiary = beneficiaries[0];

  useEffect(() => {
    if (!subtitleRef.current) return;
    return mountTypewriter(subtitleRef.current, beneficiaries);
  }, []);

  return (
    <header class="hero" data-reveal>
      <canvas class="hero-canvas" data-widget="hero-cycle" aria-hidden="true"></canvas>
      <div class="hero-copy">
        {status_href
          ? <a class="status-pill" href={status_href}><span aria-hidden="true"></span>{status}</a>
          : <p class="status-pill"><span aria-hidden="true"></span>{status}</p>}
        <h1>
          {title.map((line, index) => index === 2
            ? <em class="glitch" data-text={line}>{line}</em>
            : <span>{line}</span>)}
        </h1>
        <p
          ref={subtitleRef}
          class="hero-subtitle"
          data-underline={typewriter_underline ? 'true' : 'false'}
          aria-label={subtitle}
        >
          <span class="hero-typewriter-line">
            <span class="hero-typewriter-text">{missionLine1}</span>
          </span>
          <span class="hero-typewriter-line">
            <span class="hero-typewriter-text">{missionLine2}</span>
          </span>
          <span class="hero-typewriter-line hero-typewriter-dynamic">
            <span class="hero-typewriter-glitch" data-text={initialBeneficiary}>
              <span class="hero-typewriter-text">{initialBeneficiary}</span><span class="hero-typewriter-cursor" aria-hidden="true"></span>
            </span>
          </span>
        </p>
        <nav class="actions" aria-label="Primary actions">
          <a class="button primary" href={primary_button.href}>{primary_button.label}</a>
          <a class="button" href={secondary_button.href}>{secondary_button.label}</a>
        </nav>
        <div class="graph-switcher" aria-label="Hero visual">
          <button class="active" type="button" data-hero-mode="planes" title="Layered planes"></button>
          <button type="button" data-hero-mode="sphere" title="Alignment sphere"></button>
          <button type="button" data-hero-mode="contour" title="Contour field"></button>
        </div>
      </div>
    </header>
  );
}
