import { SECTORS } from '@/lib/sectors';
import type { Metadata } from 'next';
import { withBase } from '@/lib/base';

export const metadata: Metadata = {
  title: 'Sectors — Fathom',
  description: 'How each sector actually works, and the handful of metrics that decide the story.',
};

export default function SectorsIndex() {
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div className="eyebrow">The map</div>
          <h1>Every sector reads differently.</h1>
          <p className="lede">
            Using the wrong yardstick makes a great business look bad and a terrible one look cheap.
            Each sector below starts from zero: how the business actually makes money, explained with
            examples, and only then the handful of numbers that decide its story.
          </p>
          <div className="why-cards">
            <div className="why-card">
              <div className="k">Why PE is useless for a bank</div>
              <p>
                PE compares price to profit. But a bank runs on borrowed money by design, holding ₹10
                or more of deposits for every ₹1 of its own. That makes profit look big and hides the
                real risk, which is not profit but whether the loans get repaid. A bank dies from bad
                loans, not from a low PE. So you read its loan quality, not its PE.
              </p>
            </div>
            <div className="why-card">
              <div className="k">Why gross margin is useless for cement</div>
              <p>
                Gross margin suits businesses where the product varies. Cement is the same grey powder
                whoever makes it, and it is too heavy to ship far, so it is really a local commodity.
                What decides profit is cost and distance, captured in one number: profit per tonne of
                cement. Gross margin tells you almost nothing here.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="sector-grid">
          {SECTORS.map((s) => (
            <a key={s.id} href={withBase(`/sectors/${s.id}/`)} className="sector-card">
              <div className="sc-top">
                <div className="nm">{s.name}</div>
                <div className="tl">{s.tagline}</div>
              </div>
              <div className="sc-foot">
                <span className="sc-key">{s.framework.demand}</span>
                <span className="sc-go">Understand it <span className="arw">→</span></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
