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

const navigationUsesPair = (
  pair: StoredMorphPair | undefined,
  event: { direction: string; from: URL; to: URL },
) =>
  Boolean(
    pair &&
    ((event.from.pathname === pair.sourcePath && event.to.pathname === pair.destinationPath) ||
      (event.direction === 'back' &&
        event.from.pathname === pair.destinationPath &&
        event.to.pathname === pair.sourcePath)),
  );

const silenceUnpairedPrincipleTitle = (root: ParentNode) => {
  root
    .querySelector<HTMLElement>('[data-principle-transition-title]')
    ?.style.setProperty('view-transition-name', 'none');
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

// A named element outside the viewport must not join a morph: an offscreen old image
// would fly across the screen from an invisible position, and an offscreen new image
// would fly out to one. Both sides are gated with the same visibility check (partially
// visible counts as visible; inline 'none' also overrides names applied by Astro's
// compiled transition:name rules), leaving the visible side to fade in place.
const NAMED_SELECTOR =
  '[data-morph-source], [data-astro-transition-scope], [style*="view-transition-name"]';

const silenceOffscreenNames = (restorable: boolean) => {
  document.querySelectorAll<HTMLElement>(NAMED_SELECTOR).forEach((el) => {
    const rect = el.getBoundingClientRect();
    const visible =
      rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
    if (visible) return;
    // The new document outlives the transition, so remember the prior inline name to
    // put back afterwards; the old document is discarded, so nothing to restore there.
    if (restorable && el.dataset.morphSilenced === undefined) {
      el.dataset.morphSilenced = el.style.viewTransitionName;
    }
    el.style.setProperty('view-transition-name', 'none');
  });
};

// Old side: gate before the outgoing page is captured.
document.addEventListener('astro:before-preparation', () => silenceOffscreenNames(false));

// New side: gate after the swap, before the new state is captured. The router applies
// scroll (hash targets, history restore) synchronously after dispatching after-swap, so
// defer one microtask to measure against the final scroll position.
document.addEventListener('astro:after-swap', () => {
  queueMicrotask(() => silenceOffscreenNames(true));
});

// Once the transition settles, hand silenced elements their inline names back so a later
// navigation involving them still morphs.
document.addEventListener('astro:page-load', () => {
  document.querySelectorAll<HTMLElement>('[data-morph-silenced]').forEach((el) => {
    const previous = el.dataset.morphSilenced;
    if (previous) el.style.setProperty('view-transition-name', previous);
    else el.style.removeProperty('view-transition-name');
    delete el.dataset.morphSilenced;
  });
});

document.addEventListener('astro:before-preparation', (event) => {
  const pair = readPair();
  if (!navigationUsesPair(pair, event)) silenceUnpairedPrincipleTitle(document);
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
  if (!navigationUsesPair(pair, event)) silenceUnpairedPrincipleTitle(event.newDocument);
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
    // If the offscreen gate silenced this element mid-transition, drop its marker too so
    // the page-load restore does not re-apply the one-shot name we just removed.
    delete source.dataset.morphSilenced;
  };
  void event.viewTransition.finished.then(cleanUp, cleanUp);
});

document.addEventListener('astro:after-swap', () => {
  activeSource = undefined;
});
