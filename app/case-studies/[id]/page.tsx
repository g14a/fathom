import { getAllCaseStudies, getCaseStudy } from '@/lib/caseStudies';
import { getSector } from '@/lib/sectors';
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

// Render a paragraph with inline markdown links: [text](/path) or [text](https://...)
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, url] = m;
    const external = /^https?:/.test(url);
    parts.push(
      <a key={k++} href={external ? url : withBase(url)} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {label}
      </a>
    );
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
  return null;
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

        {c.sections.map((sec, si) => (
          <section key={si} className="csd-section">
            <h2 className="csd-h2">{sec.heading}</h2>
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
        Case studies describe past events for learning. They are not predictions or advice, and
        past performance never guarantees future results.
      </div>
    </div>
  );
}
