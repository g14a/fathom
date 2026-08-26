// SEO audit for the static export. Scans out/**/index.html and flags pages
// missing the SEO fundamentals. Run after `npm run build`, or via `npm run
// seo:audit` (which builds first). Exits non-zero if any hard failure is found,
// so it can gate CI.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';
if (!existsSync(OUT)) {
  console.error('No out/ directory. Run `npm run build` first.');
  process.exit(2);
}

function htmlFiles(dir) {
  const found = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) found.push(...htmlFiles(p));
    else if (name.endsWith('.html')) found.push(p);
  }
  return found;
}

const count = (re, s) => (s.match(re) || []).length;

const checks = [
  { key: 'title', hard: true, test: (h) => /<title>[^<]{5,}<\/title>/i.test(h) },
  { key: 'meta description', hard: true, test: (h) => /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{20,}/i.test(h) },
  { key: 'one H1', hard: true, test: (h) => count(/<h1\b/gi, h) === 1 },
  { key: 'canonical', hard: true, test: (h) => /<link[^>]+rel=["']canonical["']/i.test(h) },
  { key: 'JSON-LD', hard: false, test: (h) => /application\/ld\+json/i.test(h) },
  { key: 'og:image', hard: false, test: (h) => /property=["']og:image["']/i.test(h) },
  { key: 'no noindex', hard: true, test: (h) => !/name=["']robots["'][^>]+noindex/i.test(h) },
];

// Not-found routes are intentionally noindex and not content; exclude them.
const files = htmlFiles(OUT).filter((f) => !/(^|\/)(404|_not-found)(\/|\.html$)/.test(f));
const fails = {};
let hardFails = 0;

for (const f of files) {
  const h = readFileSync(f, 'utf8');
  const route = '/' + f.replace(/^out\//, '').replace(/index\.html$/, '');
  for (const c of checks) {
    if (!c.test(h)) {
      (fails[c.key] ||= []).push(route);
      if (c.hard) hardFails++;
    }
  }
}

console.log(`\nSEO audit — ${files.length} pages\n`);
let clean = true;
for (const c of checks) {
  const bad = fails[c.key] || [];
  const mark = bad.length === 0 ? 'ok  ' : c.hard ? 'FAIL' : 'warn';
  console.log(`  [${mark}] ${c.key}: ${bad.length} missing`);
  if (bad.length) {
    clean = false;
    for (const r of bad.slice(0, 8)) console.log(`         ${r}`);
    if (bad.length > 8) console.log(`         ... and ${bad.length - 8} more`);
  }
}
console.log(clean ? '\nAll pages pass.\n' : '');
process.exit(hardFails > 0 ? 1 : 0);
