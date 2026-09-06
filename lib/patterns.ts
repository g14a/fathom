// Patterns are the reusable shapes under the case studies: one named pattern per
// study that carries a `patternCard`. This is the single source of truth for the
// pattern name, its stable anchor slug, and which case study demonstrates it, so
// every page (the /patterns hub, case studies, signals, company reports) links to
// the same pattern the same way. That interlinking is what lets a reader (or an
// LLM) walk Company <-> Case study <-> Pattern <-> Signal as one knowledge graph.

import { getAllCaseStudies } from '@/lib/caseStudies';

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

// Hand-authored pattern names, keyed by case study id. The actual pattern roster
// is derived at build time from which case studies carry a patternCard field.
// Any case study with a pattern card that lacks a hand-authored name here will
// appear on the hub with its title as a fallback (a prompt to add a real name).
// Any hand-authored name whose study no longer exists or has lost its pattern is
// dropped silently.
const PATTERN_NAME_MAP: { [caseStudyId: string]: string } = {
  'jet-airways-the-market-leader-that-vanished-1993-2024': 'Debt-funded acquisition into losses',
  'crompton-greaves-the-one-good-deal-2005-2020': 'One good deal mistaken for a formula',
  'cg-power-what-survived-2020-2026': 'A good business buried under a bad owner',
  'suzlon-the-sadness-2008-2026': 'Currency-mismatched debt',
  'mahindra-the-65pc-fall-2018-2020': 'The consolidated vs standalone gap',
  'airtel-the-lost-decade-2007-2020': 'Growth that never reaches the owner',
  'bse-the-toll-booth-boom-2023-2026': 'A toll booth on someone else\'s boom',
  'cupid-the-rerating-machine-2023-2026': 'A re-rating that outran the earnings',
  'the-pe-paradox-why-multiples-rise-when-earnings-fall': 'A multiple that expands from both ends',
  'asian-paints-distribution-machine-2000-2026': 'The capacity attack on a moat',
  'what-happened-to-the-paint-industry': 'A premium that outlived the returns',
  'nse-vs-bse-the-moat-that-moved-1875-2026': 'A liquidity moat that outlasts the technology',
};

// The teachable sequence: the curated order in which patterns appear on the hub.
// This list determines the rank; patterns are rendered in this order. Any case
// study with a patternCard automatically qualifies; maintaining this list ensures
// the reader's journey stays coherent.
const CURATED_ORDER = [
  'jet-airways-the-market-leader-that-vanished-1993-2024',
  'crompton-greaves-the-one-good-deal-2005-2020',
  'cg-power-what-survived-2020-2026',
  'suzlon-the-sadness-2008-2026',
  'mahindra-the-65pc-fall-2018-2020',
  'airtel-the-lost-decade-2007-2020',
  'bse-the-toll-booth-boom-2023-2026',
  'cupid-the-rerating-machine-2023-2026',
  'the-pe-paradox-why-multiples-rise-when-earnings-fall',
  'asian-paints-distribution-machine-2000-2026',
  'what-happened-to-the-paint-industry',
  'nse-vs-bse-the-moat-that-moved-1875-2026',
];

// Build the roster at module load time. Patterns are case studies with
// patternCard, in curated order, with hand-authored names and fallbacks.
const allStudies = getAllCaseStudies();
const studiesWithPattern = allStudies.filter(s => s.patternCard);
const studiesById = new Map(studiesWithPattern.map(s => [s.id, s]));

export const PATTERNS: Pattern[] = CURATED_ORDER
  .map(caseStudyId => {
    const study = studiesById.get(caseStudyId);
    if (!study) return null; // Study no longer exists or has no pattern

    // Use hand-authored name if available, else fall back to the study title
    // (which should prompt adding a real name to PATTERN_NAME_MAP).
    const name = PATTERN_NAME_MAP[caseStudyId] ?? study.title;

    return {
      caseStudyId,
      name,
      slug: toSlug(name),
    };
  })
  .filter((p): p is Pattern => p !== null)
  .concat(
    // Any case studies with patterns that are not in the curated order are
    // added at the end with fallback names. This is a safety net to prevent
    // losing a pattern to a forgotten CURATED_ORDER entry.
    studiesWithPattern
      .filter(s => !CURATED_ORDER.includes(s.id))
      .map(s => ({
        caseStudyId: s.id,
        name: PATTERN_NAME_MAP[s.id] ?? s.title, // Fallback; add a real name to PATTERN_NAME_MAP
        slug: toSlug(PATTERN_NAME_MAP[s.id] ?? s.title),
      }))
  );

// The pattern demonstrated by a given case study, if any.
export function getPatternForCaseStudy(caseStudyId: string): Pattern | undefined {
  return PATTERNS.find((p) => p.caseStudyId === caseStudyId);
}

// Deep link to a pattern's card on the hub page.
export function patternPath(slug: string): string {
  return `/patterns/#${slug}`;
}
