/**
 * Ground and ink per topic, shared by the generated banner and by any surface
 * that wants to take its colour from the event on screen. One table so a card
 * and the page behind it can never drift apart.
 *
 * Every ground is already dark: these are washes over a near-black page, not
 * accents, and the brightness ceiling is the palette itself rather than a
 * filter applied afterwards.
 */
export const EVENT_TINTS: Record<string, [ground: string, ink: string]> = {
  mlops: ['#173629', '#5ee6a0'],
  llms: ['#1b2733', '#7fb3ff'],
  'ai-agents': ['#2e221b', '#e8b45c'],
  'ml-security': ['#2b1b1f', '#ef8f9c'],
  'data-engineering': ['#1f2a1b', '#a9d47f'],
  research: ['#241b2e', '#c39cf0'],
  python: ['#1b2a2e', '#6fd3d8'],
  'cloud-native': ['#16262e', '#63c6e0'],
  'ai-infrastructure': ['#2a2418', '#d8c26a'],
  'ai-policy': ['#252525', '#cfcabf'],
  'general-tech': ['#1c1d1d', '#9aa0a0'],
};

/** FNV-1a, so an unmapped topic still gets a stable hue rather than flat grey. */
export function tintFor(topic?: string, seed = ''): [string, string] {
  const known = EVENT_TINTS[topic ?? ''];
  if (known) return known;
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  const hue = (hash >>> 0) % 360;
  return [`hsl(${hue} 18% 12%)`, `hsl(${hue} 42% 62%)`];
}
