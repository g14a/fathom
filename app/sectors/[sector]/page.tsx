import { SECTORS, getSector } from '@/lib/sectors';
import type { PrimerBlock } from '@/lib/sectors';
import type { Metadata } from 'next';

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
  return SECTORS.map((s) => ({ sector: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const { sector } = await params;
  const s = getSector(sector);
  if (!s) return { title: 'Sector — Fathom' };
  return { title: `${s.name} — How the sector works | Fathom`, description: s.tagline };
}

const FW = [
  { key: 'demand', label: 'Demand', cls: 'fw-demand' },
  { key: 'pricing', label: 'Pricing', cls: 'fw-pricing' },
  { key: 'efficiency', label: 'Efficiency', cls: 'fw-eff' },
  { key: 'capital', label: 'Capital', cls: 'fw-capital' },
  { key: 'risk', label: 'Risk', cls: 'fw-risk' },
] as const;

export default async function SectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  const s = getSector(sector)!;

  return (
    <div className="wrap">
      <a href="/sectors/" className="back">← All sectors</a>

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

      <div className="disclaimer">
        <strong>Educational use only.</strong> Fathom is not a SEBI-registered investment adviser.
        Benchmarks are rules of thumb, not thresholds to trade on. Do your own research.
      </div>
    </div>
  );
}
