import { getAllSignals } from '@/lib/signals';
import type { Metadata } from 'next';
import { withBase, canonical } from '@/lib/base';

export const metadata: Metadata = {
  title: 'Market Signals: How Big Events Move Indian Businesses | Fathom',
  description: 'How to read the big market-moving events. Budgets, RBI rate decisions, commodity moves and tariffs, explained as changes to business economics, not news.',
  alternates: { canonical: canonical('/signals/') },
};

export default function SignalsIndex() {
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div className="eyebrow">Decode the news</div>
          <h1>Signals</h1>
          <p className="lede">
            A Budget, a rate cut, a new tariff, a fuel-price jump. Most coverage tells you what
            happened and how the market twitched that day. Signals do the useful part instead:
            reduce each event to one change in business economics, then trace who ends up earning
            more, who earns less, and why.
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="u-intro">
          <p>
            A signal is a big, market-moving event, a Budget, an RBI rate decision, a commodity swing,
            a tariff, reduced to the single thing that actually changes for businesses. Rather than
            report what happened, each one follows that change through the economy: who earns more,
            who earns less, who feels it first, and how long the money takes to arrive. The point is
            to hand you a reusable way to reason about the next event, not just this one.
          </p>
        </div>
        <div className="cs-grid">
          {getAllSignals().map((s) => (
            <a key={s.id} href={withBase(`/signals/${s.id}/`)} className="cs-card">
              <div className="cs-card-top">
                <span className="cs-card-company">{s.kind}</span>
                <span className="cs-card-period">{s.dateline}</span>
              </div>
              <div className="cs-card-title">{s.title}</div>
              <div className="cs-card-summary">{s.summary}</div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
