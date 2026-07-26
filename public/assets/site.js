(function () {
  function setupMenu() {
    const header = document.querySelector('[data-site-header]');
    const panel = header?.querySelector('[data-menu-panel]');
    const triggers = [...(header?.querySelectorAll('[data-menu-trigger]') || [])];
    const bodies = [...(header?.querySelectorAll('[data-menu-body]') || [])];
    if (!header || !panel || !triggers.length) return;

    const widths = { overview: 380, oss: 860, initiatives: 880, network: 640, about: 340 };
    let active = null;
    let closeTimer;

    const measure = (trigger, id) => {
      const row = header.querySelector('.header-row').getBoundingClientRect();
      const box = trigger.getBoundingClientRect();
      const width = Math.min(widths[id], row.width - 80);
      const left = Math.max(40, Math.min(box.left - row.left, row.width - width - 40));
      panel.style.setProperty('--panel-left', `${left}px`);
      panel.style.setProperty('--panel-width', `${width}px`);
    };

    const open = (trigger) => {
      clearTimeout(closeTimer);
      const id = trigger.dataset.menuTrigger;
      measure(trigger, id);
      triggers.forEach((item) => item.setAttribute('aria-expanded', String(item === trigger)));
      bodies.forEach((body) => {
        const selected = body.dataset.menuBody === id;
        body.classList.toggle('is-active', selected);
        if (selected) {
          body.style.animation = 'none';
          requestAnimationFrame(() => { body.style.animation = 'om-swap .3s cubic-bezier(.16,1,.3,1)'; });
        }
      });
      panel.setAttribute('aria-hidden', 'false');
      panel.classList.add('is-open');
      active = id;
    };
    const close = () => {
      clearTimeout(closeTimer);
      active = null;
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      triggers.forEach((item) => item.setAttribute('aria-expanded', 'false'));
    };
    const delayedClose = () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(close, 240);
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener('mouseenter', () => open(trigger));
      trigger.addEventListener('focus', () => open(trigger));
      trigger.addEventListener('click', () => active === trigger.dataset.menuTrigger ? close() : open(trigger));
    });
    header.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    header.addEventListener('mouseleave', delayedClose);
    panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    const previewCanvas = panel.querySelector('[data-widget="nav-preview"]');
    const previewEyebrow = panel.querySelector('[data-oss-preview-eyebrow]');
    const previewTitle = panel.querySelector('[data-oss-preview-title]');
    const previewDescription = panel.querySelector('[data-oss-preview-description]');
    panel.querySelectorAll('[data-oss-index]').forEach((row) => {
      const select = () => {
        panel.querySelectorAll('[data-oss-index]').forEach((item) => item.classList.toggle('active', item === row));
        if (previewCanvas) previewCanvas.dataset.previewMode = row.dataset.ossKey;
        if (previewEyebrow) previewEyebrow.textContent = row.dataset.ossEyebrow;
        if (previewTitle) previewTitle.textContent = row.dataset.ossTitle;
        if (previewDescription) previewDescription.textContent = row.dataset.ossDescription;
        const preview = panel.querySelector('.oss-menu-preview');
        if (preview) {
          preview.style.animation = 'none';
          requestAnimationFrame(() => { preview.style.animation = 'om-swap .3s cubic-bezier(.16,1,.3,1)'; });
        }
      };
      row.addEventListener('mouseenter', select);
      row.addEventListener('focus', select);
    });
    panel.querySelectorAll('[data-initiative-index]').forEach((row) => {
      const select = () => {
        const index = row.dataset.initiativeIndex;
        panel.querySelectorAll('[data-initiative-index]').forEach((item) => item.classList.toggle('active', item === row));
        panel.querySelectorAll('[data-initiative-pane]').forEach((pane) => pane.classList.toggle('active', pane.dataset.initiativePane === index));
      };
      row.addEventListener('mouseenter', select);
      row.addEventListener('focus', select);
    });
    document.addEventListener('click', (event) => { if (!header.contains(event.target)) close(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
    window.addEventListener('resize', () => {
      const trigger = triggers.find((item) => item.dataset.menuTrigger === active);
      if (trigger) measure(trigger, active);
    });
    window.addEventListener('scroll', () => { if (window.scrollY > header.offsetHeight) close(); }, { passive: true });
  }

  function setupReveal() {
    const targets = [...document.querySelectorAll('[data-reveal]')];
    if (!targets.length) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((target) => { target.dataset.revealed = '1'; });
      return;
    }
    const reveal = (target) => {
      if (target.dataset.revealed === '1') return;
      target.dataset.revealed = '1';
      target.style.opacity = '1';
      target.style.transform = 'none';
    };
    targets.forEach((target, index) => {
      target.style.opacity = '0';
      target.style.transform = 'translateY(26px)';
      target.style.transition = `opacity .8s cubic-bezier(.2,.7,.2,1) ${(index % 2) * .05}s, transform .8s cubic-bezier(.2,.7,.2,1) ${(index % 2) * .05}s`;
    });
    let queued = false;
    const sweep = () => {
      queued = false;
      const atBottom = scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
      targets.forEach((target) => {
        if (target.getBoundingClientRect().top < innerHeight * .92 || atBottom) reveal(target);
      });
    };
    const requestSweep = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sweep);
    };
    addEventListener('scroll', requestSweep, { passive: true });
    addEventListener('scrollend', requestSweep);
    addEventListener('resize', requestSweep);
    requestAnimationFrame(sweep);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { reveal(entry.target); observer.unobserve(entry.target); }
      }), { rootMargin: '0px 0px -8% 0px' });
      targets.forEach((target) => observer.observe(target));
    }
  }

  setupMenu();
  setupReveal();
})();
