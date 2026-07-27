(function () {
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');

  function mount(element) {
    const output = element.querySelector('.hero-typewriter-text');
    const sentence = element.dataset.text ?? '';
    let beneficiaries;

    try {
      beneficiaries = JSON.parse(element.dataset.beneficiaries ?? '[]');
    } catch {
      beneficiaries = [];
    }

    const initialBeneficiary = beneficiaries[0];
    const beneficiaryStart = initialBeneficiary ? sentence.lastIndexOf(initialBeneficiary) : -1;
    if (!output || beneficiaryStart < 0) return { destroy() {} };

    const prefix = sentence.slice(0, beneficiaryStart);
    const suffix = sentence.slice(beneficiaryStart + initialBeneficiary.length);
    const styles = getComputedStyle(element);
    const duration = (name, fallback) => {
      const value = Number.parseFloat(styles.getPropertyValue(name));
      return Number.isFinite(value) ? value : fallback;
    };
    const typeDelay = duration('--typewriter-type-delay', 45);
    const deleteDelay = duration('--typewriter-delete-delay', 25);
    const dwell = duration('--typewriter-dwell', 2600);
    let timer;
    let destroyed = false;

    const wait = (milliseconds) => new Promise((resolve) => {
      timer = setTimeout(resolve, milliseconds);
    });
    const jitter = () => typeDelay + (Math.random() - .5) * 12;
    const setPhase = (phase) => { element.dataset.typewriterPhase = phase; };

    const type = async (text, phase = 'typing') => {
      setPhase(phase);
      for (const character of text) {
        if (destroyed) return;
        output.textContent += character;
        await wait(jitter());
      }
    };

    const remove = async (count) => {
      setPhase('deleting');
      for (let index = 0; index < count; index += 1) {
        if (destroyed) return;
        output.textContent = output.textContent.slice(0, -1);
        await wait(deleteDelay);
      }
    };

    const run = async () => {
      if (motionQuery.matches) {
        output.textContent = sentence;
        setPhase('static');
        return;
      }

      output.textContent = '';
      await type(sentence, 'initial');
      let beneficiaryIndex = 0;

      while (!destroyed) {
        setPhase('dwell');
        await wait(dwell);
        await remove(beneficiaries[beneficiaryIndex].length + suffix.length);
        beneficiaryIndex = (beneficiaryIndex + 1) % beneficiaries.length;
        output.textContent = prefix;
        await type(`${beneficiaries[beneficiaryIndex]}${suffix}`);
      }
    };

    run();
    return {
      destroy() {
        destroyed = true;
        clearTimeout(timer);
        output.textContent = sentence;
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
