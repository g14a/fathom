import { getAllCaseStudies } from '@/lib/caseStudies';
import type { Metadata } from 'next';
import { withBase, canonical } from '@/lib/base';

export const metadata: Metadata = {
  title: 'Business & Investing Patterns: Reusable Mental Models | Fathom',
  description: 'The reusable mental models behind good businesses and bad ones, from pricing power to working capital, and where each one shows up in a company’s filings.',
  alternates: { canonical: canonical('/patterns/') },
};

// Derived pattern names and a teachable order; everything else comes from the
// case-study JSONs at build time.
const PATTERN_META: { id: string; name: string }[] = [
  { id: 'jet-airways-the-market-leader-that-vanished-1993-2024', name: 'Debt-funded acquisition into losses' },
  { id: 'suzlon-the-sadness-2008-2026', name: 'Currency-mismatched debt' },
  { id: 'mahindra-the-65pc-fall-2018-2020', name: 'The consolidated vs standalone gap' },
  { id: 'airtel-the-lost-decade-2007-2020', name: 'Growth that never reaches the owner' },
  { id: 'bse-the-toll-booth-boom-2023-2026', name: 'A toll booth on someone else’s boom' },
  { id: 'asian-paints-distribution-machine-2000-2026', name: 'The capacity attack on a moat' },
  { id: 'nse-vs-bse-the-moat-that-moved-1875-2026', name: 'A liquidity moat that outlasts the technology' },
];

// Body text may carry [^n] evidence markers meant for the full study; strip them here.
const clean = (s: string) => s.replace(/\[\^\d+\]/g, '');

export default function PatternsPage() {
  const studies = getAllCaseStudies();
  const cards = PATTERN_META.map((m) => {
    const c = studies.find((s) => s.id === m.id);
    return c && c.patternCard ? { ...m, study: c, card: c.patternCard } : null;
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div className="eyebrow">The reusable part</div>
          <h1>Patterns</h1>
          <p className="lede">
            Companies fail in new stories but old shapes. Each post-mortem on Fathom ends in a
            pattern card: the signal, the mechanism behind it, and the exact place in a filing where
            you can check it. This page collects all of them, so the lessons work as a lookup, not
            just a story.
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="u-intro">
          <p>
            A pattern is the reusable shape underneath a company's story: debt-funded growth into
            losses, a moat under attack, profit that never reaches the owner. Companies fail in fresh
            headlines but old shapes, so learning the shapes lets you spot trouble early, even in a
            business you have never seen before. Every pattern below is drawn from a real Fathom case
            study and points to the exact line in a filing where you can check it.
          </p>
        </div>
        <div className="patterns-list">
          {cards.map((p) => (
            <div key={p.id} className="pattern-card" style={{ marginTop: 24 }}>
              <div className="pattern-card-label">{p.name}</div>
              <div className="pc-row">
                <span className="pc-k">Signal</span>
                <span className="pc-v">{clean(p.card.signal)}</span>
              </div>
              <div className="pc-row">
                <span className="pc-k">Mechanism</span>
                <span className="pc-v">{clean(p.card.mechanism)}</span>
              </div>
              <div className="pc-row">
                <span className="pc-k">Where to check</span>
                <span className="pc-v">{clean(p.card.whereToCheck)}</span>
              </div>
              <p className="pc-counter">
                <span className="pc-counter-k">But not always.</span> {clean(p.card.counterexample)}
              </p>
              <a href={withBase(`/case-studies/${p.study.id}/`)} className="pc-study-link">
                See it happen: <strong>{p.study.company}</strong>, {p.study.period}{' '}
                <span className="arw">→</span>
              </a>
            </div>
          ))}
        </div>

        <div className="closer">
          <p>
            A pattern is not a verdict. It is a reason to open the filing and look. The counterexample
            on each card is there so the lesson never hardens into a superstition.
          </p>
          <div className="attrib">Seven stories. Seven shapes. One habit: check the note, not the headline.</div>
        </div>
      </div>
    </>
  );
}
