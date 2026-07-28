(function () {
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');

  function mount(element) {
    const outputs = [...element.querySelectorAll('.hero-typewriter-text')];
    const glitch = element.querySelector('.hero-typewriter-glitch');
    const cursor = element.querySelector('.hero-typewriter-cursor');
    let beneficiaries;

    try {
      beneficiaries = JSON.parse(element.dataset.beneficiaries ?? '[]');
    } catch {
      beneficiaries = [];
    }

    const initialBeneficiary = beneficiaries[0];
    const initialLines = [
      outputs[0]?.textContent ?? '',
      outputs[1]?.textContent ?? '',
      initialBeneficiary,
    ];
    if (outputs.length !== 3 || !glitch || !cursor || !initialBeneficiary) return { destroy() {} };

    const styles = getComputedStyle(element);
    const duration = (name, fallback) => {
      const value = Number.parseFloat(styles.getPropertyValue(name));
      return Number.isFinite(value) ? value : fallback;
    };
    const typeDelay = duration('--typewriter-type-delay', 45);
    const deleteDelay = duration('--typewriter-delete-delay', 25);
    let timer;
    let destroyed = false;

    const wait = (milliseconds) => new Promise((resolve) => {
      timer = setTimeout(resolve, milliseconds);
    });
    const jitter = () => typeDelay + (Math.random() - .5) * 12;
    const setPhase = (phase) => { element.dataset.typewriterPhase = phase; };
    const setText = (output, text) => {
      output.textContent = text;
      if (output === outputs[2]) glitch.dataset.text = text;
    };

    const type = async (output, text, phase = 'typing') => {
      setPhase(phase);
      (output === outputs[2] ? glitch : output.parentElement).append(cursor);
      for (const character of text) {
        if (destroyed) return;
        setText(output, output.textContent + character);
        await wait(jitter());
      }
    };

    const remove = async (output, count) => {
      setPhase('deleting');
      for (let index = 0; index < count; index += 1) {
        if (destroyed) return;
        setText(output, output.textContent.slice(0, -1));
        await wait(deleteDelay);
      }
    };

    const waitForGlitchEnd = async (skipActiveBurst = false) => {
      const headlineAnimation = document.querySelector('.glitch')
        ?.getAnimations()
        .find((animation) => animation.animationName === 'om-flicker');
      const cycle = Number(headlineAnimation?.effect.getTiming().duration) || 9000;
      const current = Number(headlineAnimation?.currentTime) || 0;
      const phase = current % cycle;
      const burstStart = cycle * .656;
      const burstEnd = cycle * .767;
      const canUseCurrentBurst = phase < burstEnd && (!skipActiveBurst || phase < burstStart);
      const delay = canUseCurrentBurst ? burstEnd - phase : cycle - phase + burstEnd;
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

    run();
    return {
      destroy() {
        destroyed = true;
        clearTimeout(timer);
        initialLines.forEach((line, index) => setText(outputs[index], line));
        setPhase('static');
      },
    };
  }

  const widgets = [...document.querySelectorAll('[data-widget="hero-typewriter"]')];
  if (!widgets.length) return;

  if (!('IntersectionObserver' in window)) {
    widgets.forEach(mount);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      mount(entry.target);
      observer.unobserve(entry.target);
    });
  });
  widgets.forEach((widget) => observer.observe(widget));
})();
