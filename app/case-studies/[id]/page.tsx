import { getAllCaseStudies, getCaseStudy } from '@/lib/caseStudies';
import type { Metadata } from 'next';
import { withBase } from '@/lib/base';

export function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = getCaseStudy(id);
  if (!c) return { title: 'Case Study | Fathom' };
  return { title: `${c.title} | ${c.company} | Fathom`, description: c.summary };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = getCaseStudy(id)!;

  return (
    <div className="wrap report">
      <a href={withBase("/case-studies/")} className="back">← All case studies</a>

      <div className="csd-head">
        <div className="cs-head">
          <span className="cs-kicker">Case study</span>
          <span className="cs-period">{c.period}</span>
        </div>
        <div className="eyebrow" style={{ marginTop: 14 }}>{c.company} · {c.ticker}</div>
        <h1 className="csd-title">{c.title}</h1>
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
        {c.intro.map((para, j) => <p key={j} className="cs-para csd-lede">{para}</p>)}

        {c.sections.map((sec, si) => (
          <section key={si} className="csd-section">
            <h2 className="csd-h2">{sec.heading}</h2>
            {sec.body.map((para, j) => <p key={j} className="cs-para">{para}</p>)}
          </section>
        ))}

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

        <div className="csd-timeline">
          <h2 className="csd-h2">How it unfolded</h2>
          <ol className="tl">
            {c.timeline.map((t, j) => (
              <li key={j} className="tl-item">
                <span className="tl-when">{t.when}</span>
                <span className="tl-what">{t.what}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="cs-lesson csd-lesson">
          <span className="cs-lesson-label">The lesson</span>
          <p>{c.lesson}</p>
        </div>
      </div>

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
        <strong>Educational use only.</strong> Fathom is not a SEBI-registered investment adviser.
        Case studies describe past events for learning; they are not predictions or advice. Do your own research.
      </div>
    </div>
  );
}
