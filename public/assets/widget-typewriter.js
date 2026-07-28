(function () {
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');

  function mount(element) {
    const output = element.querySelector('.hero-typewriter-text');
    const glitch = element.querySelector('.hero-typewriter-glitch');
    let beneficiaries;

    try {
      beneficiaries = JSON.parse(element.dataset.beneficiaries ?? '[]');
    } catch {
      beneficiaries = [];
    }

    const initialBeneficiary = beneficiaries[0];
    if (!output || !glitch || !initialBeneficiary) return { destroy() {} };

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
    const setText = (text) => {
      output.textContent = text;
      glitch.dataset.text = text;
    };

    const type = async (text, phase = 'typing') => {
      setPhase(phase);
      for (const character of text) {
        if (destroyed) return;
        setText(output.textContent + character);
        await wait(jitter());
      }
    };

    const remove = async (count) => {
      setPhase('deleting');
      for (let index = 0; index < count; index += 1) {
        if (destroyed) return;
        setText(output.textContent.slice(0, -1));
        await wait(deleteDelay);
      }
    };

    const waitForGlitchEnd = async () => {
      const headlineAnimation = document.querySelector('.glitch')
        ?.getAnimations()
        .find((animation) => animation.animationName === 'om-flicker');
      const cycle = Number(headlineAnimation?.effect.getTiming().duration) || 9000;
      const current = Number(headlineAnimation?.currentTime) || 0;
      const phase = current % cycle;
      const burstEnd = cycle * .767;
      const delay = burstEnd > phase ? burstEnd - phase : cycle - phase + burstEnd;
      await wait(delay);
    };

    const run = async () => {
      if (motionQuery.matches) {
        setText(initialBeneficiary);
        setPhase('static');
        return;
      }

      setText('');
      await type(initialBeneficiary, 'initial');
      let beneficiaryIndex = 0;

      while (!destroyed) {
        setPhase('dwell');
        await waitForGlitchEnd();
        await remove(beneficiaries[beneficiaryIndex].length);
        beneficiaryIndex = (beneficiaryIndex + 1) % beneficiaries.length;
        await type(beneficiaries[beneficiaryIndex]);
      }
    };

    run();
    return {
      destroy() {
        destroyed = true;
        clearTimeout(timer);
        setText(initialBeneficiary);
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
