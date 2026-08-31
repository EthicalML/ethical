import { getCollection, type CollectionEntry } from 'astro:content';

export type Event = CollectionEntry<'events'>['data'];

/**
 * Everything about an event's state is derived from its dates, never stored:
 * a stored "upcoming" flag is what rotted the newsletter's events block for
 * four months. `today` is a parameter so callers share one build-time clock
 * rather than each reading their own.
 */
export function isUpcoming(event: Event, today: Date): boolean {
  return (event.end ?? event.start) >= today;
}

export function openCfps(event: Event, today: Date) {
  return (event.cfps ?? []).filter((cfp) => cfp.deadline && cfp.deadline >= today);
}

export function hasSpoken(event: Event): boolean {
  return (event.talks ?? []).length > 0;
}

/**
 * The title a confirmed slot carries until the programme names it. It is what
 * marks the event as ours, so it stays in the data, but it says nothing a
 * reader does not already get from the speaking marker and never renders.
 */
export const UNANNOUNCED = 'To be announced';

export function namedTalks(event: Event) {
  return (event.talks ?? []).filter((talk) => talk.title !== UNANNOUNCED);
}

export function recordings(event: Event) {
  return (event.talks ?? []).filter((talk) => talk.video);
}

export function daysUntil(date: Date, today: Date): number {
  return Math.ceil((date.getTime() - today.getTime()) / 86400000);
}

export function eventDate(event: Event): string {
  const start = event.start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const year = event.start.getFullYear();
  if (!event.end || event.end.getTime() === event.start.getTime()) return `${start} ${year}`;
  const end = event.end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  return `${start} – ${end} ${year}`;
}

export function deadlineLabel(deadline: Date, today: Date): string {
  const days = daysUntil(deadline, today);
  const date = deadline.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  if (days <= 0) return `closed ${date}`;
  if (days === 1) return `closes ${date} — tomorrow`;
  return `closes ${date} — ${days} days`;
}

/** Sorted soonest first for what is ahead, most recent first for what is past. */
export async function loadEvents(today: Date) {
  const all = (await getCollection('events')).map((entry) => entry.data);
  const upcoming = all
    .filter((event) => isUpcoming(event, today))
    .sort((left, right) => left.start.getTime() - right.start.getTime());
  const past = all
    .filter((event) => !isUpcoming(event, today))
    .sort((left, right) => right.start.getTime() - left.start.getTime());
  return { all, upcoming, past };
}
