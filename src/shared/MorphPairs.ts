const STORAGE_KEY = 'ethical:morph-pair';

interface StoredMorphPair {
  destinationPath: string;
  name: string;
  sourceId: string;
  sourcePath: string;
}

let activeSource: HTMLElement | undefined;

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
  activeSource?.style.removeProperty('view-transition-name');
  activeSource = undefined;
  sessionStorage.removeItem(STORAGE_KEY);
};

export const bindMorphPairs = (root: ParentNode, signal: AbortSignal) => {
  root.querySelectorAll<HTMLElement>('[data-morph-pair]').forEach((trigger) => {
    const sourceId = trigger.dataset.morphPair;
    if (!sourceId) return;

    const source = root.querySelector<HTMLElement>(`[data-morph-source="${CSS.escape(sourceId)}"]`);
    const destination =
      trigger instanceof HTMLAnchorElement ? trigger.href : trigger.dataset.morphHref;
    if (!source || !destination) return;

    const name = source.dataset.morphName ?? sourceId;
    const destinationPath = new URL(destination, location.href).pathname;
    const activate = () => {
      activeSource?.style.removeProperty('view-transition-name');
      activeSource = source;
      source.style.viewTransitionName = name;
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          destinationPath,
          name,
          sourceId,
          sourcePath: location.pathname,
        } satisfies StoredMorphPair),
      );
    };

    trigger.addEventListener('pointerdown', activate, { signal });
    trigger.addEventListener('click', activate, { signal });
  });
};

document.addEventListener('astro:before-preparation', (event) => {
  const pair = readPair();
  if (
    pair &&
    event.from.pathname === pair.sourcePath &&
    event.to.pathname !== pair.destinationPath
  ) {
    clearPair();
  }
});

document.addEventListener('astro:before-swap', (event) => {
  const pair = readPair();
  if (!pair || event.direction !== 'back' || event.to.pathname !== pair.sourcePath) return;

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

document.addEventListener('astro:after-swap', () => {
  activeSource = undefined;
});
