type TypewriterPhase = 'initial' | 'typing' | 'deleting' | 'dwell' | 'static';

function parseBeneficiaries(element: HTMLElement): string[] {
  try {
    const beneficiaries = JSON.parse(element.dataset.beneficiaries ?? '[]');

    return Array.isArray(beneficiaries) ? beneficiaries : [];
  } catch {
    return [];
  }
}

export function mountTypewriter(element: HTMLElement): () => void {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const outputs = Array.from(
    element.querySelectorAll<HTMLElement>('.hero-typewriter-text'),
  );
  const glitch = element.querySelector<HTMLElement>('.hero-typewriter-glitch');
  const cursor = element.querySelector<HTMLElement>('.hero-typewriter-cursor');
  const beneficiaries = parseBeneficiaries(element);
  const initialBeneficiary = beneficiaries[0];
  const initialLines = [
    outputs[0]?.textContent ?? '',
    outputs[1]?.textContent ?? '',
    initialBeneficiary,
  ];

  if (outputs.length !== 3 || !glitch || !cursor || !initialBeneficiary) {
    return () => {};
  }

  const styles = getComputedStyle(element);

  const duration = (name: string, fallback: number) => {
    const value = Number.parseFloat(styles.getPropertyValue(name));

    return Number.isFinite(value) ? value : fallback;
  };

  const typeDelay = duration('--typewriter-type-delay', 45);
  const deleteDelay = duration('--typewriter-delete-delay', 25);
  let timer: ReturnType<typeof window.setTimeout> | undefined;
  let destroyed = false;

  const wait = (milliseconds: number) => new Promise<void>((resolve) => {
    timer = window.setTimeout(resolve, milliseconds);
  });

  const jitter = () => typeDelay + (Math.random() - 0.5) * 12;

  const setPhase = (phase: TypewriterPhase) => {
    element.dataset.typewriterPhase = phase;
  };

  const setText = (output: HTMLElement, text: string) => {
    output.textContent = text;

    if (output === outputs[2]) {
      glitch.dataset.text = text;
    }
  };

  const type = async (
    output: HTMLElement,
    text: string,
    phase: TypewriterPhase = 'typing',
  ) => {
    setPhase(phase);

    const cursorContainer = output === outputs[2] ? glitch : output.parentElement;

    cursorContainer?.append(cursor);

    for (const character of text) {
      if (destroyed) {
        return;
      }

      setText(output, output.textContent + character);
      await wait(jitter());
    }
  };

  const remove = async (output: HTMLElement, count: number) => {
    setPhase('deleting');

    for (let index = 0; index < count; index += 1) {
      if (destroyed) {
        return;
      }

      setText(output, output.textContent.slice(0, -1));
      await wait(deleteDelay);
    }
  };

  const waitForGlitchEnd = async (skipActiveBurst = false) => {
    const headlineAnimation = document.querySelector<HTMLElement>('.glitch')
      ?.getAnimations()
      .find((animation) => (
        'animationName' in animation
        && animation.animationName === 'om-flicker'
      ));
    const cycle = Number(headlineAnimation?.effect?.getTiming().duration) || 9000;
    const current = Number(headlineAnimation?.currentTime) || 0;
    const phase = current % cycle;
    const burstStart = cycle * 0.656;
    const burstEnd = cycle * 0.767;
    const canUseCurrentBurst = phase < burstEnd
      && (!skipActiveBurst || phase < burstStart);
    const delay = canUseCurrentBurst
      ? burstEnd - phase
      : cycle - phase + burstEnd;

    await wait(delay);
  };

  const run = async () => {
    if (motionQuery.matches) {
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

  void run();

  return () => {
    destroyed = true;

    if (timer !== undefined) {
      window.clearTimeout(timer);
    }

    initialLines.forEach((line, index) => setText(outputs[index], line));
    setPhase('static');
  };
}
