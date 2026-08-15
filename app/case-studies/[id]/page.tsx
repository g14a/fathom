import { getAllCaseStudies, getCaseStudy } from '@/lib/caseStudies';
import { getSector } from '@/lib/sectors';
import type { Metadata } from 'next';
import { withBase, canonical, formatDate } from '@/lib/base';
import Connections from '@/components/Connections';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd, { ORG } from '@/components/JsonLd';

export function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = getCaseStudy(id);
  if (!c) return { title: 'Case Study | Fathom' };
  const title = `${c.title} | Fathom`;
  const url = canonical(`/case-studies/${id}/`);
  return {
    title,
    description: c.summary,
    alternates: { canonical: url },
    openGraph: { title, description: c.summary, url, type: 'article', images: ['/og.png'] },
    twitter: { title, description: c.summary, images: ['/og.png'] },
  };
}

// Render a paragraph with inline markdown links: [text](/path) or [text](https://...),
// plus evidence-note superscripts: [^1] links down to the matching evidence note.
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /\[\^(\d+)\]|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, supId, label, url] = m;
    if (supId) {
      parts.push(
        <sup key={k++} className="ev-sup">
          <a href={`#evidence-note-${supId}`} aria-label={`Evidence note ${supId}`}>{supId}</a>
        </sup>
      );
    } else {
      const external = /^https?:/.test(url);
      parts.push(
        <a key={k++} href={external ? url : withBase(url)} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {label}
        </a>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// Inline, theme-aware diagrams referenced by CaseSection.diagram.
function renderDiagram(id: string): React.ReactNode {
  if (id === 'consolidation') {
    const before = [
      'Airtel', 'Vodafone', 'Idea', 'Reliance Jio', 'Reliance Comm', 'Aircel',
      'Tata Docomo', 'Telenor / Uninor', 'Videocon', 'MTS (Sistema)',
    ];
    const after = [
      { name: 'Reliance Jio', note: 'the disruptor' },
      { name: 'Airtel', note: 'survived, battered' },
      { name: 'Vodafone Idea', note: 'two merged into one' },
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">A dozen operators, crushed to three</span>
          <span className="dg-badge">2016 → 2020</span>
        </div>
        <div className="dg-consol">
          <div className="dg-col">
            <div className="dg-col-head">Before Jio: ~12 players fighting</div>
            <ul className="dg-namelist dg-namelist-dim">
              {before.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
          <div className="dg-arrow" aria-hidden="true">→</div>
          <div className="dg-col">
            <div className="dg-col-head">After the price war: 3 left</div>
            <ul className="dg-namelist dg-namelist-live">
              {after.map((a) => (
                <li key={a.name}><span className="dg-name">{a.name}</span><span className="dg-name-note">{a.note}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <figcaption className="dg-cap">
          Charging almost nothing, most operators could not cover their costs. Some shut down (Aircel, Reliance
          Communications), others were absorbed (Telenor and Tata into Airtel; Vodafone and Idea merged). A crowded
          market became a three-way one, the change that would finally let prices rise. Source: industry history.
        </figcaption>
      </figure>
    );
  }
  if (id === 'operating-leverage') {
    const rows = [
      { label: 'Revenue', value: '× 5.5', width: '46%', cls: 'dg-oplev-rev' },
      { label: 'Costs', value: '~ unchanged', width: '9%', cls: 'dg-oplev-cost' },
      { label: 'Profit', value: '× 12', width: '100%', cls: 'dg-oplev-profit' },
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">Why profit outran revenue</span>
          <span className="dg-badge dg-badge-good">FY23 → FY26</span>
        </div>
        <div className="dg-oplev">
          {rows.map((r) => (
            <div key={r.label} className="dg-oplev-row">
              <span className="dg-oplev-label">{r.label}</span>
              <span className="dg-oplev-track">
                <span className={`dg-oplev-bar ${r.cls}`} style={{ width: r.width }} />
              </span>
              <span className="dg-oplev-value">{r.value}</span>
            </div>
          ))}
        </div>
        <figcaption className="dg-cap">
          Revenue grew about 5.5 times while the cost of running the exchange barely moved, so profit grew about 12
          times. That gap between the two is operating leverage.
        </figcaption>
      </figure>
    );
  }
  if (id === 'paint-distribution') {
    const nodes = [
      { label: 'Dealer counter', note: 'where the painter and homeowner decide' },
      { label: 'Tinting machine', note: 'last-mile factory inside the shop' },
      { label: 'Fast replenishment', note: 'dealer can carry less inventory' },
      { label: 'Working capital', note: 'faster turns make the brand profitable to stock' },
      { label: 'Recommendation', note: 'dealer and painter push what is available now' },
      { label: 'Volume', note: 'more offtake funds an even denser network' },
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">The distribution flywheel</span>
          <span className="dg-badge dg-badge-good">Asian Paints</span>
        </div>
        <div className="dg-flywheel">
          {nodes.map((n, i) => (
            <div key={n.label} className="dg-fw-node">
              <span className="dg-fw-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="dg-fw-label">{n.label}</span>
              <span className="dg-fw-note">{n.note}</span>
            </div>
          ))}
        </div>
        <figcaption className="dg-cap">
          Paint distribution is not a pipe. It is a loop: availability creates dealer confidence, dealer confidence
          creates recommendation, recommendation creates volume, and volume pays for even better availability.
        </figcaption>
      </figure>
    );
  }
  if (id === 'airline-cost-stack') {
    // Approximate share of total operating cost for a full-service Indian carrier.
    // Widths are the share x2 so the bars read clearly; the last row is the marginal
    // cost of one more passenger, not a share of the total.
    const rows = [
      { label: 'Fuel (ATF)', value: '~40%', tag: 'the giant, uncontrollable', width: '80%', cls: 'dg-oplev-cost' },
      { label: 'Aircraft leases + ownership', value: '~18%', tag: 'fixed for years', width: '36%', cls: 'dg-oplev-rev' },
      { label: 'Staff + crew', value: '~13%', tag: 'mostly fixed', width: '26%', cls: 'dg-oplev-rev' },
      { label: 'Maintenance', value: '~11%', tag: 'fixed', width: '22%', cls: 'dg-oplev-rev' },
      { label: 'Airport + navigation', value: '~9%', tag: 'fixed per flight', width: '18%', cls: 'dg-oplev-rev' },
      { label: 'Selling + other', value: '~9%', tag: 'semi-fixed', width: '18%', cls: 'dg-oplev-rev' },
      { label: 'One extra passenger', value: '~nil', tag: 'the only truly variable bit', width: '4%', cls: 'dg-oplev-profit' },
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">Where an airline's money goes</span>
          <span className="dg-badge">Cost stack</span>
        </div>
        <div className="dg-oplev">
          {rows.map((r) => (
            <div key={r.label} className="dg-oplev-row">
              <span className="dg-oplev-label">
                {r.label}
                <span className="dg-oplev-sub">{r.tag}</span>
              </span>
              <span className="dg-oplev-track">
                <span className={`dg-oplev-bar ${r.cls}`} style={{ width: r.width }} />
              </span>
              <span className="dg-oplev-value">{r.value}</span>
            </div>
          ))}
        </div>
        <figcaption className="dg-cap">
          Roughly 85% of the bill is fixed: spent the moment the airline decides to fly the route, whether the seats
          sell or not. Fuel is the largest single cost and the one management can least control, priced in dollars and
          heavily taxed. The cost of one more passenger, meanwhile, is almost nothing, and an unsold seat is worth
          nothing once the door shuts. Both halves of that push the airline the same way: fill the plane, or bleed.
          Shares are approximate and shift with the crude price.
        </figcaption>
      </figure>
    );
  }
  if (id === 'indigo-vs-jet') {
    const indigo = [
      'One aircraft type (A320): one parts set, one training',
      'Fast turnarounds: each plane flies more hours a day',
      'Bulk orders, sale-and-leaseback: young fleet, lighter book',
      'No free frills; charges for extras (ancillary revenue)',
      'Obsessed with lowest cost per seat',
    ];
    const jet = [
      'Mixed fleet: more parts, more training, more cost',
      'Full service: meals, higher staffing, more complexity',
      'Heavy debt and leases from aggressive growth',
      'Premium experience passengers loved',
      'Higher cost per seat, little pricing power to cover it',
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">Same skies, two machines</span>
          <span className="dg-badge">Cost per seat decides</span>
        </div>
        <div className="dg-consol">
          <div className="dg-col">
            <div className="dg-col-head">IndiGo: built around the economics</div>
            <ul className="dg-namelist dg-namelist-live">
              {indigo.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
          <div className="dg-arrow dg-arrow-vs" aria-hidden="true">vs</div>
          <div className="dg-col">
            <div className="dg-col-head">Jet: built around the passenger</div>
            <ul className="dg-namelist dg-namelist-dim">
              {jet.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        </div>
        <figcaption className="dg-cap">
          In a business with weak pricing power and price wars, the lower cost per seat wins, because it can
          profitably sell a seat at a fare that loses the rival money. Structure beat service.
        </figcaption>
      </figure>
    );
  }
  if (id === 'debt-spiral-jet') {
    const nodes = [
      { label: 'Fares held down', note: 'price war caps revenue' },
      { label: 'Losses appear', note: 'costs and interest outrun fares' },
      { label: 'Borrow more', note: 'no cash of its own to fund' },
      { label: 'Interest rises', note: 'the fixed bill grows' },
      { label: 'Miss payments', note: 'salaries, lessors, banks' },
      { label: 'Planes pulled', note: 'fewer flights, less revenue' },
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">The debt spiral</span>
          <span className="dg-badge">2016 → 2019</span>
        </div>
        <div className="dg-flywheel">
          {nodes.map((n, i) => (
            <div key={n.label} className="dg-fw-node">
              <span className="dg-fw-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="dg-fw-label">{n.label}</span>
              <span className="dg-fw-note">{n.note}</span>
            </div>
          ))}
        </div>
        <figcaption className="dg-cap">
          A flywheel run in reverse: each turn made the next worse. Debt did not start the trouble, it removed the
          flexibility Jet needed to survive it, so a business problem became a financial collapse.
        </figcaption>
      </figure>
    );
  }
  if (id === 'pe-identity') {
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">The whole framework in one line</span>
          <span className="dg-badge">Identity</span>
        </div>
        <div className="dg-eq">
          <div className="dg-eq-term dg-eq-price">
            <span className="dg-eq-sym">Price</span>
            <span className="dg-eq-note">what investors are willing to pay today. Forward-looking.</span>
          </div>
          <span className="dg-eq-op" aria-hidden="true">=</span>
          <div className="dg-eq-term">
            <span className="dg-eq-sym">EPS</span>
            <span className="dg-eq-note">earnings already reported. Backward-looking.</span>
          </div>
          <span className="dg-eq-op" aria-hidden="true">×</span>
          <div className="dg-eq-term dg-eq-pe">
            <span className="dg-eq-sym">P / E</span>
            <span className="dg-eq-note">the valuation multiple implied by today's price relative to those earnings.</span>
          </div>
        </div>
        <figcaption className="dg-cap">
          Careful with the directions. The price is forward-looking: it is a bet on all future years. The EPS is
          backward-looking: a fact about a year that has ended. The P/E is neither. It is simply the ratio between the
          two, telling you how large the price is relative to the earnings already reported. Keep those roles straight
          and most confusion about valuation disappears.
        </figcaption>
      </figure>
    );
  }
  if (id === 'two-expansions') {
    const priceLed = [
      'Price rises, EPS roughly flat',
      'The market now pays more for the same rupee of earnings',
      'This is a genuine re-rating: a change of opinion',
      'It is a bet on the future, and it can be right or wrong',
    ];
    const denominatorDriven = [
      'Price roughly flat, EPS falls',
      'The multiple rises on its own, mechanically',
      'Nobody re-rated anything: the denominator just shrank',
      'A cheap-looking business can get "expensive" while doing nothing',
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">Two ways a P/E goes up</span>
          <span className="dg-badge">Same number, opposite meanings</span>
        </div>
        <div className="dg-consol">
          <div className="dg-col">
            <div className="dg-col-head">Price-led: the market re-rates</div>
            <ul className="dg-namelist dg-namelist-live">
              {priceLed.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
          <div className="dg-arrow dg-arrow-vs" aria-hidden="true">vs</div>
          <div className="dg-col">
            <div className="dg-col-head">Denominator-driven: the denominator shrinks</div>
            <ul className="dg-namelist dg-namelist-dim">
              {denominatorDriven.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        </div>
        <figcaption className="dg-cap">
          A rising trailing P/E tells you nothing on its own. You have to ask which term moved. If the price did the
          work, the market changed its mind about the future. If falling earnings did the work, the multiple rose while
          the market was arguably getting more worried, not less. So a rising P/E does not necessarily mean investors
          became more optimistic.
        </figcaption>
      </figure>
    );
  }
  if (id === 'three-forces') {
    const cards = [
      {
        name: 'Earnings growth',
        sym: 'EPS ↑',
        tag: 'Engine of return',
        cls: 'dg-force-good',
        note: 'The company genuinely earns more. This is the honest engine, and it moves the stock price.',
      },
      {
        name: 'Multiple expansion',
        sym: 'P/E ↑',
        tag: 'Engine of return',
        cls: 'dg-force-accent',
        note: 'The market pays more for each rupee of earnings. A real re-rating. It moves the price too, and can be right or wrong.',
      },
      {
        name: 'Denominator distortion',
        sym: 'EPS ↓ ⇒ P/E ↑',
        tag: 'Distorts the multiple',
        cls: 'dg-force-dim',
        note: 'Earnings fall, so the trailing P/E rises on its own. The share price need not move at all. Not a return, just a way the number misleads.',
      },
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">Two engines, and one distortion</span>
          <span className="dg-badge">Which one just fired?</span>
        </div>
        <div className="dg-forces">
          {cards.map((c, i) => (
            <div key={c.name} className={`dg-force ${c.cls}`}>
              <span className="dg-force-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="dg-force-sym">{c.sym}</span>
              <span className="dg-force-name">{c.name}</span>
              <span className="dg-force-tag">{c.tag}</span>
              <span className="dg-force-note">{c.note}</span>
            </div>
          ))}
        </div>
        <figcaption className="dg-cap">
          The lazy summary is "P/E rises when the market expects growth." The truer picture: two of these are engines of
          your return (earnings growth and the change in the multiple, which multiply together), and the third is not a
          return at all, only a way falling earnings can inflate the reported P/E. Vinati mixed one of each: the price
          genuinely rose (expansion) while earnings fell (distortion), so the multiple leapt from both ends. Keeping the
          two boxes apart is the whole skill.
        </figcaption>
      </figure>
    );
  }
  if (id === 'mirror-compare') {
    const vinati = [
      'EPS: fell (down about 19%)',
      'P/E: rose sharply, from both ends',
      'What happened: re-rating plus a shrinking denominator',
      'Result: the price outran the earnings',
    ];
    const bls = [
      'EPS: rose (about 13.7 times over five years)',
      'P/E: fell, roughly halving',
      'What happened: strong earnings growth against a de-rating',
      'Result: the earnings outran the price',
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">Two companies, one equation</span>
          <span className="dg-badge">Opposite outcomes</span>
        </div>
        <div className="dg-consol">
          <div className="dg-col">
            <div className="dg-col-head">Vinati: the market ran ahead of the earnings</div>
            <ul className="dg-namelist dg-namelist-live">
              {vinati.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
          <div className="dg-arrow dg-arrow-vs" aria-hidden="true">vs</div>
          <div className="dg-col">
            <div className="dg-col-head">BLS: the earnings ran ahead of the market</div>
            <ul className="dg-namelist dg-namelist-dim">
              {bls.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        </div>
        <figcaption className="dg-cap">
          The same identity, read from opposite ends. At Vinati the earnings fell while the multiple rose, so the price
          moved ahead of the profit. At BLS the earnings climbed while the multiple fell, so the profit moved ahead of
          the price. In both, the business and its valuation pointed in opposite directions.
        </figcaption>
      </figure>
    );
  }
  if (id === 'liquidity-flywheel') {
    const nodes = [
      { label: 'More brokers present', note: 'a bigger crowd shows up to trade' },
      { label: 'More buyers and sellers', note: 'each side has more counterparties to meet' },
      { label: 'Tighter spreads', note: 'less gap between what buyers offer and sellers ask' },
      { label: 'Better execution', note: 'orders fill closer to the price you wanted' },
      { label: 'A more attractive exchange', note: 'traders prefer the venue with the better fills' },
      { label: 'More brokers present', note: 'the loop feeds itself' },
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">The liquidity flywheel</span>
          <span className="dg-badge">Why the crowd doesn&apos;t move back</span>
        </div>
        <div className="dg-flywheel">
          {nodes.map((n, i) => (
            <div key={`${n.label}-${i}`} className="dg-fw-node">
              <span className="dg-fw-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="dg-fw-label">{n.label}</span>
              <span className="dg-fw-note">{n.note}</span>
            </div>
          ))}
        </div>
        <figcaption className="dg-cap">
          For most businesses, more customers just means more revenue. For an exchange, more participants make the
          product itself better, tighter spreads, more reliable fills, which pulls in the next participant. Once this
          loop starts running on one exchange, a rival cannot beat it just by matching the technology.
        </figcaption>
      </figure>
    );
  }
  if (id === 'cupid-float') {
    const before = [
      'Market cap: about ₹380 crore',
      'Promoter holding: 41.84%',
      'Freely tradeable (non-promoter): 58%',
      'Value of that entire float: about ₹220 crore',
      'A few tens of crore of buying meets very few shares',
    ];
    const after = [
      'Market cap: about ₹37,000 crore',
      'Promoter holding: ~46%',
      'Freely tradeable (non-promoter): ~54%',
      'Value of that float: about ₹20,000 crore',
      'Now it takes an ocean of buying to move the price',
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">Why a small stock re-rates violently</span>
          <span className="dg-badge">Sept 2023 → Aug 2026</span>
        </div>
        <div className="dg-consol">
          <div className="dg-col">
            <div className="dg-col-head">At the takeover: a tiny, tightly held stock</div>
            <ul className="dg-namelist dg-namelist-dim">
              {before.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
          <div className="dg-arrow" aria-hidden="true">→</div>
          <div className="dg-col">
            <div className="dg-col-head">After the move: a large one</div>
            <ul className="dg-namelist dg-namelist-live">
              {after.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        </div>
        <figcaption className="dg-cap">
          Before the re-rating, the whole tradeable float was worth only about ₹220 crore. A pool of shares that small can
          be re-priced enormously without a large sum of money changing hands, which is what makes so violent a move
          possible in a small-cap and not in a large, liquid company. Note the limit of the claim: this shows the float was
          small, so a violent repricing was possible, not that the float itself amplified the move, which would need
          trading-volume and order-book data we do not have here. The ₹380 crore market cap is the value implied by the
          promoters' own stake sale (41.84% for about ₹159 crore); float values are that market cap times the non-promoter
          share.
        </figcaption>
      </figure>
    );
  }
  if (id === 'cupid-waterfall') {
    // Log-scaled widths (share of ln(94)) so the bars compare fairly: earnings did
    // about a third of the work, the multiple about two-thirds, the stock the whole.
    const rows = [
      { label: 'Earnings (EPS)', value: '× 4.3', tag: 'the business actually earning more', width: '32%', cls: 'dg-oplev-rev' },
      { label: 'Valuation (P/E)', value: '× 22', tag: 'the market paying more per rupee', width: '68%', cls: 'dg-oplev-profit' },
      { label: 'Share price', value: '× 94', tag: 'the two multiplied together', width: '100%', cls: 'dg-oplev-cost' },
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">Where the 94x came from</span>
          <span className="dg-badge">≈2023 → 2026</span>
        </div>
        <div className="dg-oplev">
          {rows.map((r) => (
            <div key={r.label} className="dg-oplev-row">
              <span className="dg-oplev-label">
                {r.label}
                <span className="dg-oplev-sub">{r.tag}</span>
              </span>
              <span className="dg-oplev-track">
                <span className={`dg-oplev-bar ${r.cls}`} style={{ width: r.width }} />
              </span>
              <span className="dg-oplev-value">{r.value}</span>
            </div>
          ))}
        </div>
        <figcaption className="dg-cap">
          Price = EPS times P/E, so a 94-fold share price is a 4.3-fold rise in earnings multiplied by a 22-fold rise in
          the multiple the market pays for them. The bars are on a log scale so the two contributions compare fairly: the
          earnings did roughly a third of the work, the re-rating roughly two-thirds. Cupid became a better business. But
          the market's valuation of it changed much more than the business itself. Figures are approximate and split and
          bonus adjusted.
        </figcaption>
      </figure>
    );
  }
  if (id === 'cupid-two-phases') {
    const phaseOne = [
      'Roughly 2023 to end-2024',
      'EPS barely moved: about ₹0.24 to ₹0.30',
      'P/E leapt from the low teens to about 250',
      'The price did roughly 20x almost entirely on the multiple',
      'The re-rating: a change of opinion, ahead of the numbers',
    ];
    const phaseTwo = [
      'End-2024 to 2026',
      'EPS: about ₹0.30 to ₹0.81 (FY26), ~₹1.02 trailing by Aug 2026',
      'P/E stayed high and roughly flat (about 250 to 290)',
      'The price did about 3.9x, this time on the earnings',
      'The validation: profit catching up to the opinion',
    ];
    return (
      <figure className="csd-diagram">
        <div className="dg-title-row">
          <span className="dg-title">The valuation moved first. The earnings came later.</span>
          <span className="dg-badge">Two phases</span>
        </div>
        <div className="dg-consol">
          <div className="dg-col">
            <div className="dg-col-head">Phase 1: the market re-rates</div>
            <ul className="dg-namelist dg-namelist-live">
              {phaseOne.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
          <div className="dg-arrow" aria-hidden="true">→</div>
          <div className="dg-col">
            <div className="dg-col-head">Phase 2: the earnings arrive</div>
            <ul className="dg-namelist dg-namelist-live">
              {phaseTwo.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        </div>
        <figcaption className="dg-cap">
          Split in two, the story answers its own key question. The stock did not wait for the earnings. The valuation
          moved first, as investors began pricing in the new owner's plan, when profit had hardly changed. The earnings
          followed later, more than tripling on a trailing basis and growing into the price the market had already paid.
          The forecast moved ahead of the fact here; it did not follow it.
        </figcaption>
      </figure>
    );
  }
  return null;
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = getCaseStudy(id)!;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.summary,
    articleSection: 'Case study',
    keywords: c.tags.join(', '),
    mainEntityOfPage: canonical(`/case-studies/${c.id}/`),
    author: ORG,
    publisher: ORG,
    ...(c.published ? { datePublished: c.published, dateModified: c.published } : {}),
    about: { '@type': 'Corporation', name: c.company },
  };

  return (
    <div className="wrap report csd-page">
      <JsonLd data={articleLd} />
      <Breadcrumbs items={[{ name: 'Case Studies', path: '/case-studies/' }, { name: c.company }]} />

      <div className="csd-head">
        <div className="cs-head">
          <span className="cs-kicker">Case study</span>
          <span className="cs-period">{c.period}</span>
        </div>
        <div className="eyebrow" style={{ marginTop: 14 }}>{c.company} · {c.ticker}</div>
        <h1 className="csd-title">{c.title}</h1>
        <div className="asof" style={{ marginTop: 12 }}>
          <a href={withBase('/about/')} className="byline-link">Fathom Research</a>
          {c.published ? ` · published ${formatDate(c.published)}` : ''}
        </div>
      </div>

      <div className="csd-stats">
        {c.keyNumbers.map((n) => (
          <div key={n.label} className="csd-stat">
            <div className="csd-stat-value">{n.value}</div>
            <div className="csd-stat-label">{n.label}</div>
          </div>
        ))}
      </div>

      <div className="csd-body">
        <div className="csd-row csd-lead">
          <div className="csd-row-side" aria-hidden="true" />
          <div className="csd-row-main">
            {c.intro.map((para, j) => <p key={j} className="cs-para csd-lede">{renderInline(para)}</p>)}

            {(() => {
              const sec = c.sectorId ? getSector(c.sectorId) : undefined;
              if (!sec) return null;
              return (
                <div className="csd-links">
                  <a href={withBase(`/sectors/${sec.id}/`)} className="sector-cta">
                    <div className="sc-cta-text">
                      <div className="sc-cta-kicker">Sector fundamentals</div>
                      <div className="sc-cta-line">
                        New to this business? Read <strong>how {sec.name} works</strong> to understand the forces in this story.
                      </div>
                    </div>
                    <span className="sc-cta-go">Read the primer <span className="arw">→</span></span>
                  </a>
                </div>
              );
            })()}
          </div>
        </div>

        {c.sections.map((sec, si) => (
          <section key={si} className="csd-section csd-row">
            <div className="csd-row-side">
              <h2 className="csd-h2">{sec.heading}</h2>
            </div>
            <div className="csd-row-main">
              {sec.body.map((para, j) => <p key={j} className="cs-para">{renderInline(para)}</p>)}
              {sec.lens && (
                <div className="csd-lens">
                  <div className="csd-lens-label">{sec.lens.label}</div>
                  <ul className="csd-lens-list">
                    {sec.lens.questions.map((q, j) => <li key={j}>{renderInline(q)}</li>)}
                  </ul>
                </div>
              )}
              {sec.diagram && renderDiagram(sec.diagram)}
              {sec.scorecard && (
                <div className="csd-score">
                  <div className="csd-score-label">The scorecard</div>
                  <div className="csd-score-row">
                    <span className="csd-score-k csd-score-up">{sec.scorecard.labels?.improved ?? 'Grew'}</span>
                    <span className="csd-score-v">{renderInline(sec.scorecard.improved)}</span>
                  </div>
                  <div className="csd-score-row">
                    <span className="csd-score-k csd-score-down">{sec.scorecard.labels?.worsened ?? 'Got worse'}</span>
                    <span className="csd-score-v">{renderInline(sec.scorecard.worsened)}</span>
                  </div>
                  <div className="csd-score-row">
                    <span className="csd-score-k csd-score-share">{sec.scorecard.labels?.shareholder ?? 'Shareholder'}</span>
                    <span className="csd-score-v">{renderInline(sec.scorecard.shareholder)}</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}

        {c.exAnte && (
          <section className="csd-section csd-row">
            <div className="csd-row-side">
              <h2 className="csd-h2">{c.exAnte.heading ?? 'What you could have seen, and when'}</h2>
            </div>
            <div className="csd-row-main">
              {(c.exAnte.intro ?? []).map((para, j) => <p key={j} className="cs-para">{renderInline(para)}</p>)}
              <ol className="csd-tells">
                {c.exAnte.tells.map((t, j) => (
                  <li key={j} className="csd-tell">
                    <div className="csd-tell-head">
                      <span className="csd-tell-when">{t.when}</span>
                      <span className="csd-tell-lead">{t.lead}</span>
                    </div>
                    <div className="csd-tell-doc">{renderInline(t.document)}</div>
                    <div className="csd-tell-check">
                      <span className="csd-tell-k">Look up</span>
                      <span className="csd-tell-v">{renderInline(t.check)}</span>
                    </div>
                    <div className="csd-tell-check">
                      <span className="csd-tell-k">It told you</span>
                      <span className="csd-tell-v">{renderInline(t.meaning)}</span>
                    </div>
                  </li>
                ))}
              </ol>
              {c.exAnte.blindSpot && (
                <div className="csd-blindspot">
                  <div className="csd-blindspot-label">And this part you could not have seen</div>
                  <p>{renderInline(c.exAnte.blindSpot)}</p>
                </div>
              )}
            </div>
          </section>
        )}

        <div className="csd-row csd-tail">
          <div className="csd-row-side" aria-hidden="true" />
          <div className="csd-row-main">
        {c.evidence && (
          <div className="csd-evidence">
            <div className="cs-head">
              <span className="cs-kicker ev-kicker">The evidence</span>
            </div>
            <h2 className="csd-h2">{c.evidence.caption}</h2>
            <div className="ev-table">
              {c.evidence.rows.map((row, j) => (
                <div key={j} className="ev-row">
                  <span className="ev-label">{row.label}</span>
                  <span className="ev-value">{row.value}</span>
                  {row.source && <span className="ev-source">{row.source}</span>}
                </div>
              ))}
            </div>
            {c.evidence.note && <p className="ev-note">{c.evidence.note}</p>}
          </div>
        )}

        {c.exhibits && (
          <div className="csd-exhibits">
            {c.exhibits.map((ex, j) => (
              <figure key={j} className="exhibit">
                <div className="ex-imgwrap">
                  <img src={withBase(ex.src)} alt={ex.caption} loading="lazy" />
                </div>
                <figcaption>
                  <span className="ex-cap">{ex.caption}</span>
                  <span className="ex-src">Source: {ex.source}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {c.sources && (
          <div className="csd-sources">
            <h2 className="csd-h2">Sources</h2>
            <ul className="src-list">
              {c.sources.map((s, j) => (
                <li key={j}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label} <span className="src-arw">↗</span></a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <details className="csd-timeline">
          <summary className="csd-timeline-summary">
            <span className="csd-h2">How it unfolded</span>
            <span className="csd-timeline-hint">{c.timeline.length} moments</span>
          </summary>
          <ol className="tl">
            {c.timeline.map((t, j) => (
              <li key={j} className="tl-item">
                <span className="tl-when">{t.when}</span>
                <span className="tl-what">{t.what}</span>
              </li>
            ))}
          </ol>
        </details>

        <div className="cs-lesson csd-lesson">
          <span className="cs-lesson-label">The lesson</span>
          <p>{c.lesson}</p>
        </div>

        {c.patternCard && (
          <div className="pattern-card">
            <div className="pattern-card-label">The pattern card</div>
            <div className="pc-row">
              <span className="pc-k">Signal</span>
              <span className="pc-v">{renderInline(c.patternCard.signal)}</span>
            </div>
            <div className="pc-row">
              <span className="pc-k">Mechanism</span>
              <span className="pc-v">{renderInline(c.patternCard.mechanism)}</span>
            </div>
            <div className="pc-row">
              <span className="pc-k">Where to check</span>
              <span className="pc-v">{renderInline(c.patternCard.whereToCheck)}</span>
            </div>
            <p className="pc-counter">
              <span className="pc-counter-k">But not always.</span> {renderInline(c.patternCard.counterexample)}
            </p>
          </div>
        )}

        {c.remember && (
          <div className="remember">
            <div className="remember-label">One sentence to remember</div>
            <p className="remember-text">{c.remember}</p>
          </div>
        )}

        {c.evidenceNotes && c.evidenceNotes.length > 0 && (
          <div className="csd-evnotes">
            <div className="csd-evnotes-label">Evidence notes</div>
            <p className="csd-evnotes-intro">
              The small numbers in the text mark the claims this story leans on. Here is where each
              one comes from, and how solid it is.
            </p>
            <ol className="csd-evnotes-list">
              {c.evidenceNotes.map((n) => (
                <li key={n.id} id={`evidence-note-${n.id}`}>
                  <span className="csd-evnote-num">{n.id}</span>
                  <span className="csd-evnote-text">{renderInline(n.note)}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
          </div>
        </div>
      </div>

      <Connections
        title="Related case studies"
        items={(c.relatedCaseStudies ?? [])
          .map((rid) => getCaseStudy(rid))
          .filter((r): r is NonNullable<typeof r> => Boolean(r))
          .map((r) => ({ kicker: 'Case study', name: r.title, href: `/case-studies/${r.id}/`, variant: 'case' as const }))}
      />

      {c.stockSlug && (
        <a href={withBase(`/stocks/${c.stockSlug}/`)} className="sector-cta" style={{ marginTop: 36 }}>
          <div className="sc-cta-text">
            <div className="sc-cta-kicker">Related report</div>
            <div className="sc-cta-line">
              Read the full research report on <strong>{c.company}</strong> to see where the business stands today.
            </div>
          </div>
          <span className="sc-cta-go">Read the report <span className="arw">→</span></span>
        </a>
      )}

      <div className="disclaimer" style={{ borderTop: 'none', paddingTop: 40 }}>
        Case studies describe past events for learning. They are not predictions or advice, and
        past performance never guarantees future results.
      </div>
    </div>
  );
}
