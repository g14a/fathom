// Base path for the deployment (e.g. "/fathom" on GitHub project pages).
// Next only rewrites basePath for next/link, not for plain <a>/<img>,
// so we prefix those manually via withBase().
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBase(path: string): string {
  if (!path.startsWith('/')) return path; // external or relative, leave as-is
  return BASE + path;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Turns an ISO date ("2026-08-03") into a human-readable one ("3 Aug 2026").
// Anything that is not a plain ISO date is returned unchanged.
export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const month = MONTHS[parseInt(m[2], 10) - 1];
  if (!month) return iso;
  return `${parseInt(m[3], 10)} ${month} ${m[1]}`;
}
