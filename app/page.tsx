import { getAllReports } from '@/lib/data';
import { canonical } from '@/lib/base';
import CompanySearch from '@/components/CompanySearch';
import JsonLd from '@/components/JsonLd';

export default function Home() {
  const reports = getAllReports();
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Company research reports',
    itemListElement: reports.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: canonical(`/stocks/${r.slug}/`),
      name: r.company,
    })),
  };
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
      <JsonLd data={itemListLd} />
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
