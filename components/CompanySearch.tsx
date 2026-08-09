'use client';

import { useMemo, useState } from 'react';
import { withBase } from '@/lib/base';

type Card = {
  slug: string;
  ticker: string;
  company: string;
  sector: string;
  industry: string;
  oneLiner: string;
};

export default function CompanySearch({ reports }: { reports: Card[] }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return reports;
    return reports.filter(
      (r) =>
        r.ticker.toLowerCase().includes(term) ||
        r.company.toLowerCase().includes(term)
    );
  }, [q, reports]);

  return (
    <>
      <div className="co-search">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by company name or ticker"
          aria-label="Search companies"
          autoComplete="off"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="co-search-empty">No companies match "{q}".</p>
      ) : (
        <div className="grid">
          {filtered.map((r) => (
            <a key={r.slug} href={withBase(`/stocks/${r.slug}/`)} className="tcard">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="sym">{r.ticker}</span>
              </div>
              <div className="co">{r.company}</div>
              <div className="meta">{r.sector === r.industry ? r.sector : `${r.sector} · ${r.industry}`}</div>
              <div className="thesis">{r.oneLiner}</div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
