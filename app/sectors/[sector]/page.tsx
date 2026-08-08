import { getAllSectors, getSector } from '@/lib/sectors';
import type { PrimerBlock } from '@/lib/sectors';
import { getCaseStudy } from '@/lib/caseStudies';
import { getAllTickers, getReport } from '@/lib/data';
import type { Metadata } from 'next';
import { withBase, canonical } from '@/lib/base';
import Connections from '@/components/Connections';
import Breadcrumbs from '@/components/Breadcrumbs';

function Block({ p, i }: { p: PrimerBlock; i: number }) {
  return (
    <div className="primer-block">
      <div className="pb-num">{String(i + 1).padStart(2, '0')}</div>
      <div>
        <h3>{p.concept}</h3>
        <p>{p.body}</p>
        {p.bullets && (
          <ul className="pb-list">
            {p.bullets.map((b, j) => (
              <li key={j}>
                <span className="pb-term">{b.term}</span>
                <span className="pb-desc">{b.desc}</span>
              </li>
            ))}
          </ul>
        )}
        {p.outro && <p className="pb-outro">{p.outro}</p>}
        {p.example && (
          <div className="eg">
            <span className="tag">For example</span>
            {p.example}
          </div>
        )}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return getAllSectors().map((s) => ({ sector: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const { sector } = await params;
  const s = getSector(sector);
  if (!s) return { title: 'Sector | Fathom' };
  const title = `${s.name}: How the Industry Works, Economics & Key Drivers | Fathom`;
  const description = `How the ${s.name} industry works: how companies make money, what customers buy, what drives demand and margins, and the metrics that decide the story.`;
  const url = canonical(`/sectors/${sector}/`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'article' },
    twitter: { title, description },
  };
}

const FW = [
  { key: 'demand', label: 'Demand', cls: 'fw-demand' },
  { key: 'pricing', label: 'Pricing', cls: 'fw-pricing' },
  { key: 'efficiency', label: 'Efficiency', cls: 'fw-eff' },
  { key: 'capital', label: 'Capital', cls: 'fw-capital' },
  { key: 'risk', label: 'Risk', cls: 'fw-risk' },
] as const;

const ANATOMY = [
  { key: 'demand', q: 'Where does demand come from?' },
  { key: 'pricing', q: 'Who controls the price?' },
  { key: 'limiting', q: "What's the hardest thing to get?" },
  { key: 'leak', q: 'Where does the money disappear?' },
  { key: 'killer', q: 'What usually breaks first?' },
  { key: 'moat', q: "Why can't rivals just copy it?" },
] as const;

export default async function SectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  const s = getSector(sector)!;

  return (
    <div className="wrap">
      <Breadcrumbs items={[{ name: 'Sectors', path: '/sectors/' }, { name: s.name }]} />

      <div className="sector-hero">
        <h1>{s.name}</h1>
        <p className="tl">{s.tagline}</p>
        <div className="examples">
          <span className="lbl">Examples</span>
          {s.examples.map((e) => (
            <span key={e} className="tk">{e}</span>
          ))}
        </div>
      </div>

      <div className="section-label" style={{ marginTop: 36 }}>How this business works</div>
      <p className="sub" style={{ fontSize: 17, lineHeight: 1.7, marginTop: 12 }}>{s.howItWorks}</p>

      {s.chain && (
        <div className="flowmap">
          <div className="flowmap-k">{s.chain.kicker}</div>
          <div className="flowmap-chain">
            {s.chain.steps.map((step, i) => (
              <div key={step} className="flowmap-node">
                <span className="flowmap-step">{step}</span>
                {i < s.chain!.steps.length - 1 && <span className="flowmap-arw" aria-hidden="true">↓</span>}
              </div>
            ))}
          </div>
          <p className="flowmap-note">{s.chain.note}</p>
        </div>
      )}

      {s.checklist && (
        <div className="checklist">
          <div className="checklist-head">
            <div className="k">{s.checklist.kicker}</div>
            <h3>{s.checklist.title}</h3>
          </div>
          <ul>
            {s.checklist.items.map((item) => (
              <li key={item}><span className="box" aria-hidden="true" />{item}</li>
            ))}
          </ul>
          {s.checklist.foot && <p className="checklist-foot">{s.checklist.foot}</p>}
        </div>
      )}

      {s.anatomy && (
        <>
          <div className="section-label">The six questions that explain this business</div>
          <p className="sub">Answer these six and you have understood the industry. The rest of the page is the detail behind them.</p>
          <div className="anatomy">
            {ANATOMY.map((a) => (
              <div key={a.key} className="anatomy-item">
                <div className="anatomy-q">{a.q}</div>
                <div className="anatomy-a">{s.anatomy![a.key]}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {s.beginnerQuestion && (
        <div className="beginnerq">
          <div className="beginnerq-label">The question beginners always ask</div>
          <div className="beginnerq-q">{s.beginnerQuestion.q}</div>
          <div className="beginnerq-a">{s.beginnerQuestion.a}</div>
        </div>
      )}

      {s.sections?.map((sec, si) => (
        <section key={si} className="teach-section">
          <h2 className="ts-title">{sec.title}</h2>
          {sec.intro && <p className="ts-intro">{sec.intro}</p>}
          <div className="primer">
            {sec.blocks.map((p, i) => (
              <Block key={i} p={p} i={i} />
            ))}
          </div>
        </section>
      ))}

      {s.primer && (
        <div className="primer">
          {s.primer.map((p, i) => (
            <Block key={i} p={p} i={i} />
          ))}
        </div>
      )}

      <div className="section-label">The five numbers that decide the story</div>
      <p className="sub">
        Every sector reduces to a demand metric, a pricing metric, an efficiency metric, a capital
        metric, and a risk metric. For {s.name.toLowerCase()}, these are the ones that matter.
      </p>
      <div className="framework">
        {FW.map((f) => (
          <div key={f.key} className={`fw-cell ${f.cls}`}>
            <div className="fl">{f.label}</div>
            <div className="fv">{s.framework[f.key]}</div>
          </div>
        ))}
      </div>

      <div className="section-label">The full metric set</div>
      <p className="sub">What each number tells you, and how to read it.</p>
      <div className="metrics-wrap">
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Why it matters</th>
            </tr>
          </thead>
          <tbody>
            {s.metrics.map((m) => (
              <tr key={m.metric}>
                <td className="mname">{m.metric}</td>
                <td>{m.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {s.remember && (
        <div className="remember">
          <div className="remember-label">One sentence to remember</div>
          <p className="remember-text">{s.remember}</p>
        </div>
      )}

      {(() => {
        const relSectors = (s.relatedSectors ?? []).map((id) => getSector(id)).filter(Boolean);
        const relCases = (s.relatedCaseStudies ?? []).map((id) => getCaseStudy(id)).filter(Boolean);
        const tickers = getAllTickers();
        const relReports = (s.relatedReports ?? []).filter((t) => tickers.includes(t)).map(getReport);
        const models = s.mentalModels ?? [];
        return (
          <Connections
            title="Take these ideas further"
            chips={models}
            items={[
              ...relSectors.map((r) => ({ kicker: 'Sector', name: r!.name, href: `/sectors/${r!.id}/` })),
              ...relReports.map((r) => ({ kicker: 'Report', name: r.company, href: `/stocks/${r.slug}/` })),
              ...relCases.map((c) => ({ kicker: 'Case study', name: c!.title, href: `/case-studies/${c!.id}/`, variant: 'case' as const })),
            ]}
          />
        );
      })()}

    </div>
  );
}
