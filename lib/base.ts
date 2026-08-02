// Base path for the deployment (e.g. "/fathom" on GitHub project pages).
// Next only rewrites basePath for next/link, not for plain <a>/<img>,
// so we prefix those manually via withBase().
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBase(path: string): string {
  if (!path.startsWith('/')) return path; // external or relative, leave as-is
  return BASE + path;
}
