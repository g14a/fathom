import { getAllCaseStudies } from '@/lib/caseStudies';
import type { Metadata } from 'next';
import { withBase } from '@/lib/base';

export const metadata: Metadata = {
  title: 'Case Studies | Fathom',
  description: 'Real stories from Indian markets, and the one lesson each one teaches.',
};

export default function CaseStudiesIndex() {
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div className="eyebrow">Learn from what happened</div>
          <h1>Case studies</h1>
          <p className="lede">
            The best lessons in investing are not theories, they are real stories. A stock that
            halved, a turnaround that tripled, a trap that caught everyone. Each case below tells one
            such story in plain language, and pulls out the single lesson worth keeping.
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="cs-grid">
          {getAllCaseStudies().map((c) => (
            <a key={c.id} href={withBase(`/case-studies/${c.id}/`)} className="cs-card">
              <div className="cs-card-top">
                <span className="cs-card-company">{c.company}</span>
                <span className="cs-card-period">{c.period}</span>
              </div>
              <div className="cs-card-title">{c.title}</div>
              <div className="cs-card-summary">{c.summary}</div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
