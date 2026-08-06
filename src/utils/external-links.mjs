export const INSTITUTE_HOST = 'ethical.institute';

export function isExternalHref(href) {
  if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return false;

  try {
    const host = new URL(href).hostname.toLowerCase();
    return host !== INSTITUTE_HOST && !host.endsWith(`.${INSTITUTE_HOST}`);
  } catch {
    return false;
  }
}
