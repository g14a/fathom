import { getAllReports } from '@/lib/data';
import { VerdictBadge } from '@/components/Verdict';
import { withBase } from '@/lib/base';

export default function Home() {
  const reports = getAllReports();
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div className="eyebrow">Deep · structured · point-in-time</div>
          <h1>Understand what you own.</h1>
          <p className="lede">
            Full-stack research on NSE-listed companies — business model, industry structure,
            cash-flow forensics, moat, and trap detection. One rigorous report per ticker,
            refreshed quarterly.
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="grid">
          {reports.map((r) => (
            <a key={r.slug} href={withBase(`/stocks/${r.slug}/`)} className="tcard">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="sym">{r.ticker}</span>
                <VerdictBadge verdict={r.verdict} />
              </div>
              <div className="co">{r.company}</div>
              <div className="meta">{r.sector} · {r.industry}</div>
              <div className="thesis">{r.oneLiner}</div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
