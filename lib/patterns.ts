// Patterns are the reusable shapes under the case studies: one named pattern per
// study that carries a `patternCard`. This is the single source of truth for the
// pattern name, its stable anchor slug, and which case study demonstrates it, so
// every page (the /patterns hub, case studies, signals, company reports) links to
// the same pattern the same way. That interlinking is what lets a reader (or an
// LLM) walk Company <-> Case study <-> Pattern <-> Signal as one knowledge graph.

export interface Pattern {
  caseStudyId: string; // the study that demonstrates the pattern
  name: string;        // the pattern's display name
  slug: string;        // stable anchor on /patterns/ (derived from the name)
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// The teachable order of the pattern hub. Names are authored here; the card body,
// company and period all come from the case study JSON at build time.
const PATTERN_NAMES: { caseStudyId: string; name: string }[] = [
  { caseStudyId: 'jet-airways-the-market-leader-that-vanished-1993-2024', name: 'Debt-funded acquisition into losses' },
  { caseStudyId: 'crompton-greaves-the-one-good-deal-2005-2020', name: 'One good deal mistaken for a formula' },
  { caseStudyId: 'suzlon-the-sadness-2008-2026', name: 'Currency-mismatched debt' },
  { caseStudyId: 'mahindra-the-65pc-fall-2018-2020', name: 'The consolidated vs standalone gap' },
  { caseStudyId: 'airtel-the-lost-decade-2007-2020', name: 'Growth that never reaches the owner' },
  { caseStudyId: 'bse-the-toll-booth-boom-2023-2026', name: 'A toll booth on someone else’s boom' },
  { caseStudyId: 'cupid-the-rerating-machine-2023-2026', name: 'A re-rating that outran the earnings' },
  { caseStudyId: 'asian-paints-distribution-machine-2000-2026', name: 'The capacity attack on a moat' },
  { caseStudyId: 'what-happened-to-the-paint-industry', name: 'A premium that outlived the returns' },
  { caseStudyId: 'nse-vs-bse-the-moat-that-moved-1875-2026', name: 'A liquidity moat that outlasts the technology' },
];

export const PATTERNS: Pattern[] = PATTERN_NAMES.map((p) => ({ ...p, slug: toSlug(p.name) }));

// The pattern demonstrated by a given case study, if any.
export function getPatternForCaseStudy(caseStudyId: string): Pattern | undefined {
  return PATTERNS.find((p) => p.caseStudyId === caseStudyId);
}

// Deep link to a pattern's card on the hub page.
export function patternPath(slug: string): string {
  return `/patterns/#${slug}`;
}
