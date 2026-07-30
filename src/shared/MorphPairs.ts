const STORAGE_KEY = 'ethical:morph-pair';

interface StoredMorphPair {
  destinationPath: string;
  name: string;
  oneWay?: boolean;
  sourceId: string;
  sourcePath: string;
}

const readPair = () => {
  try {
    const pair = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '') as StoredMorphPair;
    if (
      typeof pair.destinationPath === 'string' &&
      typeof pair.name === 'string' &&
      typeof pair.sourceId === 'string' &&
      typeof pair.sourcePath === 'string'
    ) {
      return pair;
    }
  } catch {
    // An absent or stale record is equivalent to no pending morph.
  }
};

const clearPair = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};

export const bindMorphPairs = (root: ParentNode, signal: AbortSignal) => {
  let activeSource: HTMLElement | undefined;
  let activeDestinationPath: string | undefined;
  let activation = 0;
  let navigationStarted = false;

  const clearNamedSources = (preserve?: HTMLElement) => {
    root.querySelectorAll<HTMLElement>('[data-morph-source]').forEach((source) => {
      if (source === preserve) return;
      source.style.removeProperty('view-transition-name');
    });
    if (activeSource !== preserve) {
      activeSource = undefined;
      activeDestinationPath = undefined;
      navigationStarted = false;
    }
  };
  const cancelActivation = () => {
    clearPair();
    clearNamedSources();
  };

  root.querySelectorAll<HTMLElement>('[data-morph-pair]').forEach((trigger) => {
    const sourceId = trigger.dataset.morphPair;
    if (!sourceId) return;

    const source = root.querySelector<HTMLElement>(`[data-morph-source="${CSS.escape(sourceId)}"]`);
    const destination =
      trigger instanceof HTMLAnchorElement ? trigger.href : trigger.dataset.morphHref;
    if (!source || !destination) return;

    const name = source.dataset.morphName ?? sourceId;
    const destinationPath = new URL(destination, location.href).pathname;
    // One-way sources morph forward only; their position on return is not stable (e.g. a
    // marquee that restarts from zero), so restoring the name would fling the reverse morph
    // across the viewport. These settle back plainly instead.
    const oneWay = source.dataset.morphOneWay !== undefined;
    const activate = () => {
      activation += 1;
      clearNamedSources();
      activeSource = source;
      activeDestinationPath = destinationPath;
      navigationStarted = false;
      source.style.viewTransitionName = name;
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          destinationPath,
          name,
          oneWay,
          sourceId,
          sourcePath: location.pathname,
        } satisfies StoredMorphPair),
      );
    };
    const isCurrentPageClick = (event: MouseEvent) =>
      event.button === 0 &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      (!(trigger instanceof HTMLAnchorElement) ||
        (!trigger.download && (!trigger.target || trigger.target === '_self')));

    trigger.addEventListener(
      'pointerdown',
      (event) => {
        if (isCurrentPageClick(event)) activate();
      },
      { signal },
    );
    trigger.addEventListener(
      'pointerup',
      () => {
        const pointerActivation = activation;
        requestAnimationFrame(() => {
          if (activation === pointerActivation) cancelActivation();
        });
      },
      { signal },
    );
    trigger.addEventListener('pointercancel', cancelActivation, { signal });
    trigger.addEventListener(
      'click',
      (event) => {
        if (!isCurrentPageClick(event)) return;
        activate();
        const clickActivation = activation;
        requestAnimationFrame(() => {
          if (activation === clickActivation && !navigationStarted) cancelActivation();
        });
      },
      { signal },
    );
  });

  document.addEventListener(
    'astro:before-preparation',
    (event) => {
      const isActiveNavigation =
        activeSource &&
        event.from.pathname === location.pathname &&
        event.to.pathname === activeDestinationPath;
      navigationStarted = Boolean(isActiveNavigation);
      clearNamedSources(isActiveNavigation ? activeSource : undefined);
      event.signal.addEventListener('abort', cancelActivation, { once: true });
    },
    { signal },
  );
  document.addEventListener('astro:before-swap', () => clearNamedSources(), { signal });
  signal.addEventListener('abort', () => clearNamedSources(), { once: true });
};

document.addEventListener('astro:before-preparation', (event) => {
  const pair = readPair();
  if (!pair) return;

  const isForwardNavigation =
    event.from.pathname === pair.sourcePath && event.to.pathname === pair.destinationPath;
  const isImmediateReturn =
    event.from.pathname === pair.destinationPath && event.to.pathname === pair.sourcePath;
  if (!isForwardNavigation && !isImmediateReturn) {
    clearPair();
  }
});

document.addEventListener('astro:before-swap', (event) => {
  const pair = readPair();
  if (
    !pair ||
    event.from.pathname !== pair.destinationPath ||
    event.to.pathname !== pair.sourcePath
  ) {
    return;
  }

  if (pair.oneWay) {
    sessionStorage.removeItem(STORAGE_KEY);
    return;
  }

  const source = event.newDocument.querySelector<HTMLElement>(
    `[data-morph-source="${CSS.escape(pair.sourceId)}"]`,
  );
  sessionStorage.removeItem(STORAGE_KEY);
  if (!source) return;

  source.style.viewTransitionName = pair.name;
  source.dataset.morphRestored = '';
  const cleanUp = () => {
    source.style.removeProperty('view-transition-name');
    delete source.dataset.morphRestored;
  };
  void event.viewTransition.finished.then(cleanUp, cleanUp);
});
