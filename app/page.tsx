import { getAllReports } from '@/lib/data';
import CompanySearch from '@/components/CompanySearch';

export default function Home() {
  const reports = getAllReports();
  const cards = reports.map((r) => ({
    slug: r.slug!,
    ticker: r.ticker,
    company: r.company,
    sector: r.sector,
    industry: r.industry,
    oneLiner: r.oneLiner,
  }));
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div className="eyebrow">Deep · structured · point-in-time</div>
          <h1>Understand what you own.</h1>
          <p className="lede">
            Full-stack research on NSE-listed companies: business model, industry structure,
            cash-flow forensics, moat, and trap detection. One rigorous report per ticker,
            refreshed quarterly.
          </p>
        </div>
      </div>

      <div className="wrap">
        <CompanySearch reports={cards} />
      </div>
    </>
  );
}
