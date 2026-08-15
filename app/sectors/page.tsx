import { getAllSectors } from '@/lib/sectors';
import type { Metadata } from 'next';
import { withBase, canonical } from '@/lib/base';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Sectors: How Indian Industries Work & Make Money | Fathom',
  description: 'How each Indian sector actually works: how companies make money, what drives demand and margins, and the handful of metrics that decide the story.',
  alternates: { canonical: canonical('/sectors/') },
};

export default function SectorsIndex() {
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sector explainers',
    itemListElement: getAllSectors().map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: canonical(`/sectors/${s.id}/`),
      name: s.name,
    })),
  };
  return (
    <>
      <JsonLd data={itemListLd} />
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
        <div className="u-intro">
          <p>
            A sector page explains how an entire industry works before you look at any single company
            in it: how the businesses make money, what customers actually buy, what drives demand and
            margins, and the one or two numbers that decide the story. The right yardstick changes
            from sector to sector, which is why the same metric can flatter a bank and damn a cement
            maker. Start with the sector, then read any company in it on its own terms.
          </p>
        </div>
        <div className="sector-grid">
          {getAllSectors().map((s) => (
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
