const STORAGE_KEY = 'ethical:morph-pair';

interface StoredMorphPair {
  destinationPath: string;
  name: string;
  oneWay?: boolean;
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
    // One-way sources morph forward only; their position on return is not stable (e.g. a
    // marquee that restarts from zero), so restoring the name would fling the reverse morph
    // across the viewport. These settle back plainly instead.
    const oneWay = source.dataset.morphOneWay !== undefined;
    const activate = () => {
      activeSource?.style.removeProperty('view-transition-name');
      activeSource = source;
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

    trigger.addEventListener('pointerdown', activate, { signal });
    trigger.addEventListener('click', activate, { signal });
  });
};

// A named element outside the viewport must not seed a morph: its old-image group would
// fly across the screen from an invisible position. Before the old page is captured,
// silence view-transition-names on offscreen elements (inline 'none' also overrides
// names applied by Astro's compiled transition:name rules). Partially visible counts
// as visible; the new document is untouched, so entry fades still run.
document.addEventListener('astro:before-preparation', () => {
  document
    .querySelectorAll<HTMLElement>(
      '[data-morph-source], [data-astro-transition-scope], [style*="view-transition-name"]',
    )
    .forEach((el) => {
      const rect = el.getBoundingClientRect();
      const visible =
        rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
      if (!visible) el.style.setProperty('view-transition-name', 'none');
    });
});

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

document.addEventListener('astro:after-swap', () => {
  activeSource = undefined;
});
