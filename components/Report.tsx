import type {
  TickerReport, Metric, FinancialRow, HoldingSlice, ChecklistItem, MoatStrength,
  MoneyFlow as MoneyFlowT, AiFork as AiForkT, Scorecard as ScorecardT,
  Counterpoint as CounterpointT,
} from '@/lib/types';
import { getSector } from '@/lib/sectors';
import { getCaseStudiesForTicker } from '@/lib/caseStudies';
import { getAllSignals } from '@/lib/signals';
import { withBase, formatDate } from '@/lib/base';
import Breadcrumbs from '@/components/Breadcrumbs';
import Connections from '@/components/Connections';

const HOLD_COLORS: Record<string, string> = {
  Promoter: '#2dd4bf',
  FII: '#f0b429',
  DII: '#7c93f5',
  Retail: '#f85149',
  Other: '#6b7684',
};

const MOAT_PIPS: Record<MoatStrength, number> = { wide: 4, narrow: 2, eroding: 1, none: 0 };
const CHK: Record<ChecklistItem['status'], string> = { pass: '✓', fail: '✕', warn: '!', na: '–' };

function Metrics({ items }: { items: Metric[] }) {
  return (
    <div className="metrics">
      {items.map((m, i) => (
        <div key={i} className={`metric ${m.tone === 'good' ? 'good' : m.tone === 'bad' ? 'bad' : ''}`}>
          <div className="m-label">{m.label}</div>
          <div className="m-value">{m.value}</div>
          {m.hint && <div className="m-hint">{m.hint}</div>}
        </div>
      ))}
    </div>
  );
}

function Financials({ rows }: { rows: FinancialRow[] }) {
  const max = Math.max(...rows.map((r) => r.revenue));
  return (
    <div className="fin">
      {rows.map((r) => (
        <div key={r.year} className="fin-row">
          <span className="yr">{r.year}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(r.revenue / max) * 100}%` }} />
          </div>
          <span className="amt">₹{r.revenue.toLocaleString('en-IN')}cr</span>
        </div>
      ))}
      <div className="fin-row" style={{ marginTop: 4 }}>
        <span className="yr" />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-faint)' }}>
          <span>Net profit → {rows.map((r) => `₹${r.netProfit}cr`).join('  ·  ')}</span>
        </div>
        <span />
      </div>
    </div>
  );
}

function Holding({ slices, pledged }: { slices: HoldingSlice[]; pledged?: number }) {
  return (
    <>
      <div className="hold-bar">
        {slices.map((s) => (
          <div key={s.label} className="hold-seg"
            style={{ width: `${s.pct}%`, background: HOLD_COLORS[s.label] }}>
            {s.pct >= 10 ? `${s.pct}%` : ''}
          </div>
        ))}
      </div>
      <div className="hold-legend">
        {slices.map((s) => (
          <span key={s.label} className="li">
            <span className="swatch" style={{ background: HOLD_COLORS[s.label] }} />
            {s.label} {s.pct}%
            {s.qoqChange != null && s.qoqChange !== 0 && (
              <span style={{ color: s.qoqChange > 0 ? 'var(--good)' : 'var(--bad)' }}>
                ({s.qoqChange > 0 ? '+' : ''}{s.qoqChange})
              </span>
            )}
          </span>
        ))}
        {pledged != null && (
          <span className="li"><span className="swatch" style={{ background: 'var(--bad)' }} />Pledged {pledged}%</span>
        )}
      </div>
    </>
  );
}

function Checklist({ items }: { items: ChecklistItem[] }) {
  return (
    <div className="checks">
      {items.map((c, i) => (
        <div key={i} className="check">
          <span className={`chk-icon chk-${c.status}`}>{CHK[c.status]}</span>
          <div>
            <div className="c-label">{c.label}</div>
            {c.note && <div className="c-note">{c.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function MoneyFlow({ f }: { f: MoneyFlowT }) {
  return (
    <div className="money-flow">
      {f.intro && <p className="tight" style={{ color: 'var(--ink-dim)' }}>{f.intro}</p>}
      <div className="mf-chain">
        {f.steps.map((s, i) => (
          <div key={i} className="mf-node">
            <div className="mf-label">{s.label}</div>
            <div className="mf-value">{s.value}</div>
            {i < f.steps.length - 1 && <div className="mf-arrow">↓</div>}
          </div>
        ))}
      </div>
      <div className="mf-spread">{f.spread}</div>
    </div>
  );
}

function AiFork({ f }: { f: AiForkT }) {
  return (
    <section className="ai-fork">
      <div className="af-kicker">The AI fork</div>
      <p className="af-premise">{f.premise}</p>
      <div className="af-trigger">{f.trigger}</div>
      <div className="af-split-arrow">↓</div>
      <div className="af-branches">
        {f.branches.map((b, i) => (
          <div key={i} className={`af-branch af-${b.tone}`}>
            <div className="af-branch-label">{b.label}</div>
            <ul className="af-outcomes">
              {b.outcomes.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="af-takeaway">{f.takeaway}</p>
    </section>
  );
}

function Counterpoint({ c }: { c: CounterpointT }) {
  return (
    <section className="counterpoint">
      <div className="cp-kicker">The counterargument</div>
      <h3>{c.heading}</h3>
      <p>{c.body}</p>
      <p className="cp-caveat">{c.caveat}</p>
    </section>
  );
}

function Scorecard({ s }: { s: ScorecardT }) {
  return (
    <div className="scorecard">
      {s.intro && <p className="tight" style={{ color: 'var(--ink-dim)' }}>{s.intro}</p>}
      <div className="sc-table">
        <div className="sc-head">
          <span>Metric</span><span className="sc-good">Good sign</span><span className="sc-bad">Bad sign</span><span>Why it matters</span>
        </div>
        {s.rows.map((row, i) => (
          <div key={i} className="sc-row">
            <span className="sc-metric">{row.metric}</span>
            <span className="sc-good">{row.good}</span>
            <span className="sc-bad">{row.bad}</span>
            <span className="sc-why">{row.why}</span>
          </div>
        ))}
      </div>
      {s.note && <p className="tight" style={{ color: 'var(--ink-faint)' }}>{s.note}</p>}
    </div>
  );
}

function Block({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section className="block">
      <h2><span className="num">{num}</span>{title}</h2>
      {children}
    </section>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => <span key={n} className={n <= value ? 'on' : ''}>★</span>)}
    </span>
  );
}

function EditorialModel({ r }: { r: TickerReport }) {
  if (!r.editorial) return null;

  const e = r.editorial;
  return (
    <section className="editorial-model">
      <div className="editorial-hero">
        <div className="ed-kicker">Mental model</div>
        <h2>{e.realBusiness}</h2>
        <p>{e.whyExists}</p>
        <p className="ed-answer"><strong>Why has no one else already won?</strong> {e.whyNotAlreadyWon}</p>
      </div>

      <div className="ed-heatmap">
        <div className="ed-label">Mental model heatmap</div>
        <div className="model-rows">
          {e.mentalModels.map((m) => (
            <div key={m.model} className="model-row">
              <div className="model-score"><Stars value={m.strength} /></div>
              <div className="model-name">{m.model}</div>
              <div className="model-why">{m.why}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ed-engine">
        <div className="ed-label">Economic engine</div>
        <div className="engine-flow">
          {e.economicEngine.map((step, i) => (
            <div key={`${step.label}-${i}`} className="flow-step">
              <div className="flow-label">{step.label}</div>
              <div className="flow-value">{step.value}</div>
              {step.note && <div className="flow-note">{step.note}</div>}
            </div>
          ))}
        </div>
      </div>

      {e.strategicPosition.length > 0 && (
        <div className="ed-position">
          <div className="ed-label">Strategic position</div>
          <div className="position-stack">
            {e.strategicPosition.map((p, i) => (
              <div key={p.label} className={`position-node ${p.tone ? `pos-${p.tone}` : ''}`}>
                <div className="pos-label">{p.label}</div>
                <div className="pos-desc">{p.description}</div>
                {i < e.strategicPosition.length - 1 && <div className="pos-arrow">↓</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="ed-grid">
        <div className="ed-panel">
          <div className="ed-label">Why now</div>
          <p>{e.whyNow}</p>
        </div>

        <div className="ed-panel">
          <div className="ed-label">What the market is betting on</div>
          <ul className="ed-list">
            {e.marketBets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </div>

      <div className="ed-grid">
        <div className="ed-panel">
          <div className="ed-label">Why it is winning</div>
          <ul className="ed-list">
            {e.winningToday.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </div>

        <div className="ed-panel">
          <div className="ed-label">Why it could stop winning</div>
          <ul className="ed-list">
            {e.stopWinning.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </div>
      </div>

      <div className="ed-sector">
        <div className="ed-label">Sector mental models</div>
        <div className="sector-models">
          {e.sectorModels.map((m) => (
            <div key={m.model} className="sector-model">
              <div className="sm-model">{m.model}</div>
              <div className="sm-reading">{m.reading}</div>
              {m.note && <div className="sm-note">{m.note}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="ed-remember">
        <div className="ed-label">One sentence to remember</div>
        <p>{e.remember}</p>
      </div>
    </section>
  );
}

export function Report({ r }: { r: TickerReport }) {
  const crumbSector = r.sectorId ? getSector(r.sectorId) : undefined;
  // Signals that move this company's sector, and case studies about this company.
  const relatedSignals = crumbSector
    ? getAllSignals().filter((s) => s.kind !== 'Primer' && (s.relatedSectors ?? []).includes(crumbSector.id))
    : [];
  const relatedCases = getCaseStudiesForTicker(r.ticker);
  return (
    <div className="wrap report">
      <Breadcrumbs
        items={[
          { name: 'Companies', path: '/' },
          ...(crumbSector ? [{ name: crumbSector.name, path: `/sectors/${crumbSector.id}/` }] : []),
          { name: r.company },
        ]}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
        <div>
          <div className="eyebrow">{r.sector === r.industry ? r.sector : `${r.sector} · ${r.industry}`}</div>
          <h1 className="report-title">{r.company}</h1>
          <div className="asof" style={{ marginTop: 8 }}>
            {r.ticker} · {r.dataVariant} · as of {formatDate(r.asOf)}
          </div>
        </div>
      </div>

      <p style={{ fontSize: 18, color: 'var(--ink-dim)', marginTop: 16, maxWidth: 720 }}>{r.oneLiner}</p>

      {r.isSample && (
        <div className="sample-banner">
          ⚠ Sample / template record — illustrative numbers describing no real company. Replace with a real research run.
        </div>
      )}

      {(() => {
        const sec = r.sectorId ? getSector(r.sectorId) : undefined;
        if (!sec) return null;
        return (
          <a href={withBase(`/sectors/${sec.id}/`)} className="sector-cta">
            <div className="sc-cta-text">
              <div className="sc-cta-kicker">Start with the sector</div>
              <div className="sc-cta-line">
                New to {sec.name.toLowerCase()}? Read <strong>how {sec.name} businesses work</strong> first.
                It explains the ideas this report leans on.
              </div>
            </div>
            <span className="sc-cta-go">Read the primer <span className="arw">→</span></span>
          </a>
        );
      })()}

      <EditorialModel r={r} />

      {r.aiFork && <AiFork f={r.aiFork} />}
      {r.counterpoint && <Counterpoint c={r.counterpoint} />}

      <Block num="01" title="Company Overview">
        <p>{r.overview}</p>
        {r.ipoFlag && <p className="tight" style={{ color: 'var(--ink-faint)' }}>{r.ipoFlag}</p>}
      </Block>

      <Block num="02" title="Business Model & Industry">
        <p><strong style={{ color: 'var(--ink)' }}>Unit of revenue:</strong> {r.business.unitOfRevenue}</p>
        <p className="tight"><strong style={{ color: 'var(--ink)' }}>Model:</strong> {r.business.revenueModel}</p>
        {r.moneyFlow && <MoneyFlow f={r.moneyFlow} />}
        <div className="chips">
          {r.business.segments.map((s) => (
            <span key={s.name} className="chip">{s.name} — {s.pct}% · {s.marginProfile}</span>
          ))}
        </div>
        <dl className="dl">
          <div className="dl-row"><dt>Structure</dt><dd>{r.business.industry.structure}</dd></div>
          <div className="dl-row"><dt>Competitors</dt><dd>{r.business.industry.competitors}</dd></div>
          <div className="dl-row"><dt>Pricing power</dt><dd>{r.business.industry.pricingPower}</dd></div>
          <div className="dl-row"><dt>Demand driver</dt><dd>{r.business.industry.demandDriver} ({r.business.industry.driverType})</dd></div>
          <div className="dl-row"><dt>TAM</dt><dd>{r.business.industry.tam}</dd></div>
          <div className="dl-row"><dt>Penetration</dt><dd>{r.business.industry.penetration}</dd></div>
          <div className="dl-row"><dt>Value-chain seat</dt><dd>{r.business.industry.valueChainPosition}</dd></div>
        </dl>
        <p>{r.business.qualityVerdict}</p>
      </Block>

      <Block num="03" title="Valuation Snapshot"><Metrics items={r.valuation} /></Block>

      <Block num="04" title="Financial Performance (5Y)">
        <Financials rows={r.financials} />
      </Block>

      <Block num="05" title="Key Ratios"><Metrics items={r.ratios} /></Block>

      <Block num="06" title="Cash Flow Forensics">
        <div className="fin" style={{ marginTop: 8 }}>
          {r.cashFlow.map((c) => (
            <div key={c.year} className="fin-row">
              <span className="yr">{c.year}</span>
              <div style={{ fontSize: 14, color: 'var(--ink-dim)' }}>
                {c.capex != null ? `OCF ₹${c.ocf}cr, capex ₹${c.capex}cr` : `Operating cash flow ₹${c.ocf.toLocaleString('en-IN')}cr`}
              </div>
              {c.fcf != null ? (
                <span className="amt" style={{ color: c.fcf > 0 ? 'var(--good)' : 'var(--bad)' }}>FCF ₹{c.fcf}cr</span>
              ) : (
                <span className="amt" style={{ color: c.ocf > 0 ? 'var(--good)' : 'var(--bad)' }}>{c.ocf > 0 ? 'positive' : 'negative'}</span>
              )}
            </div>
          ))}
        </div>
        <p>{r.cashFlowNote}</p>
      </Block>

      <Block num="07" title="Growth"><Metrics items={r.growth} /></Block>

      <Block num="08" title="Management">
        <p>{r.management}</p>
      </Block>

      <Block num="09" title="Shareholding">
        <Holding slices={r.holding} pledged={r.pledged} />
      </Block>

      <Block num="10" title="Moat">
        <div className="moat-meter">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`moat-pip ${i < MOAT_PIPS[r.moat.strength] ? 'on' : ''}`} />
          ))}
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {r.moat.strength} moat
        </div>
        <div className="chips">
          {r.moat.sources.map((s) => <span key={s} className="chip">{s}</span>)}
        </div>
        <p>{r.moat.note}</p>
      </Block>

      <Block num="11" title="The Story So Far">
        <p>{r.narrative}</p>
        <p className="tight"><strong style={{ color: 'var(--ink)' }}>Price action (12M):</strong> {r.priceAction}</p>
      </Block>

      {r.caseStudies?.map((cs, i) => (
        <Block key={i} num={`11.${i + 1}`} title={cs.title}>
          {cs.period && <div className="eyebrow" style={{ marginBottom: 10 }}>{cs.period}</div>}
          {cs.body.map((p, j) => <p key={j} className={j > 0 ? 'tight' : undefined}>{p}</p>)}
          {cs.lesson && <div className="cs-lesson" style={{ marginTop: 14 }}>{cs.lesson}</div>}
        </Block>
      ))}

      {getCaseStudiesForTicker(r.ticker).map((cs) => (
        <a key={cs.id} href={withBase(`/case-studies/${cs.id}/`)} className="sector-cta" style={{ marginTop: 22 }}>
          <div className="sc-cta-text">
            <div className="sc-cta-kicker">Case study · {cs.period}</div>
            <div className="sc-cta-line">
              <strong>{cs.title}.</strong> {cs.summary}
            </div>
          </div>
          <span className="sc-cta-go">Read the case study <span className="arw">→</span></span>
        </a>
      ))}

      <Block num="12" title="Risks">
        <div className="risks">
          {r.risks.map((risk, i) => <div key={i} className="risk">{risk}</div>)}
        </div>
      </Block>

      <Block num="13" title="Trap Detection">
        <Checklist items={r.trapChecklist} />
        {r.sectorChecklist.length > 0 && (
          <>
            <p className="tight" style={{ marginTop: 20, color: 'var(--ink-faint)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.08em' }}>Sector checklist</p>
            <Checklist items={r.sectorChecklist} />
          </>
        )}
      </Block>

      <Block num="14" title="Two-Engine Assessment">
        <div className="engine-grid">
          <div className="engine-box"><h4>Earnings engine</h4><p>{r.engine.earnings}</p></div>
          <div className="engine-box"><h4>Multiple engine</h4><p>{r.engine.multiple}</p></div>
        </div>
        <div className="engine-verdict">{r.engine.verdict}</div>
      </Block>

      <Block num="15" title="Mental-Model Lenses">
        <div className="lenses">
          {r.lenses.map((l) => (
            <div key={l.name} className="lens">
              <div className="l-name">{l.name}</div>
              <div className="l-read">{l.reading}</div>
            </div>
          ))}
        </div>
      </Block>

      {r.scorecard && (
        <Block num="15.1" title="AI Transition Scorecard">
          <Scorecard s={r.scorecard} />
        </Block>
      )}

      <Block num="16" title="Summary">
        <p style={{ fontSize: 17 }}>{r.summary}</p>
      </Block>

      <Connections
        title="Take these ideas further"
        items={[
          ...(crumbSector ? [{ kicker: 'Sector', name: `How ${crumbSector.name} businesses work`, href: `/sectors/${crumbSector.id}/` }] : []),
          ...relatedSignals.map((s) => ({ kicker: 'Signal', name: s.title, href: `/signals/${s.id}/` })),
          ...relatedCases.map((cs) => ({ kicker: 'Case study', name: cs.title, href: `/case-studies/${cs.id}/`, variant: 'case' as const })),
        ]}
      />

      <div className="disclaimer" style={{ borderTop: 'none', paddingTop: 40 }}>
        Figures are a point-in-time snapshot as of {formatDate(r.asOf)} and may be stale.
      </div>
    </div>
  );
}
