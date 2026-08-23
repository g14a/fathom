import React from 'react';
import Connections from '@/components/Connections';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd, { ORG } from '@/components/JsonLd';
import { getPatternForCaseStudy, patternPath } from '@/lib/patterns';
import { getAllSignals, getSignal } from '@/lib/signals';
import { getAllReports } from '@/lib/data';
import { getSector } from '@/lib/sectors';
import { getCaseStudy } from '@/lib/caseStudies';
import { withBase, canonical } from '@/lib/base';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllSignals().map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const s = getSignal(id);
  if (!s) return {};
  const title = s.seoTitle ? `${s.seoTitle} | Fathom` : `${s.title} | Fathom Signals`;
  const description = s.seoDescription ?? s.summary;
  const url = canonical(`/signals/${id}/`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'article', images: ['/og.png'] },
    twitter: { title, description, images: ['/og.png'] },
  };
}

const WHEN_LABEL: Record<string, string> = {
  immediate: 'Immediate',
  delayed: 'Delayed',
  'long-term': 'Long-term',
};

const FANOUT_MARK = (e: string) => (e === 'up' ? '▲' : e === 'down' ? '▼' : '＝');

// Renders inline [label](url) markdown links inside body strings, so a factual
// claim can carry its source right where it is made. Everything else is plain text.
function inline(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return part;
    const [, label, url] = m;
    const external = /^https?:/.test(url);
    return (
      <a
        key={i}
        href={external ? url : withBase(url)}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {label}
      </a>
    );
  });
}

const EVIDENCE_COLORS = ['var(--accent)', 'var(--amber)', 'var(--ink-dim)'];

// The evidence block: state the prediction, then go into the filings and check
// it. The spread is taken apart in one lead bank (yield down, funding cost not),
// then the NIM move is shown across banks as a before->after dumbbell. Two
// measured endpoints and an arrow, never a diagonal that implies a trajectory.
function renderEvidence(ev: import('@/lib/signals').SignalEvidence, key: React.Key) {
  const bl = ev.banks[0]?.beforeLabel ?? '';
  const al = ev.banks[0]?.afterLabel ?? '';
  const d = ev.drivers;
  return (
    <div key={key} className="sig-block sig-evidence">
      <h2 className="csd-h2">{ev.heading}</h2>

      <div className="sig-prediction">
        <span className="sig-prediction-label">{ev.predictionLabel ?? 'The prediction'}</span>
        <p>{inline(ev.prediction)}</p>
      </div>

      {ev.intro.map((p, j) => <p key={j} className="cs-para">{inline(p)}</p>)}

      {d && (
        <>
          <p className="cs-para">{inline(d.intro)}</p>
          <div className="sig-horizon-wrap">
            <table className="sig-horizon sig-evidence-table">
              <thead>
                <tr>
                  <th>{d.bankName}: the spread, taken apart</th>
                  <th>{d.beforeLabel}</th>
                  <th>{d.afterLabel}</th>
                  <th>Change</th>
                  <th>What it means</th>
                </tr>
              </thead>
              <tbody>
                {d.rows.map((r, i) => {
                  const chg = r.after - r.before;
                  const dir = chg < 0 ? 'sig-ev-down' : 'sig-ev-up';
                  return (
                    <tr key={i}>
                      <td className="sig-h-event">{r.label}</td>
                      <td className="sig-ev-num">{r.before.toFixed(2)}{r.unit}</td>
                      <td className="sig-ev-num">{r.after.toFixed(2)}{r.unit}</td>
                      <td className={`sig-ev-num ${dir}`}>{chg > 0 ? '+' : ''}{(chg * 100).toFixed(0)} bps</td>
                      <td>{r.takeaway}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="cs-para">
            {inline(d.summary)}{' '}
            (<a href={d.sourceUrl} target="_blank" rel="noopener noreferrer">{d.sourceLabel ?? `${d.bankName} results`}</a>).
          </p>
        </>
      )}

      {ev.banks.length > 0 && (
      <figure className="sig-slope">
        <figcaption className="sig-slope-title">
          {ev.metricLabel}: {bl} versus {al}
          {ev.contextLine && <span className="sig-slope-sub">{ev.contextLine}</span>}
        </figcaption>
        <div className="sig-dumbbell">
          {ev.banks.map((b, i) => {
            const c = EVIDENCE_COLORS[i % EVIDENCE_COLORS.length];
            const chg = (b.after - b.before);
            const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
            const isPct = ev.deltaUnit === 'pct';
            const isAbs = ev.deltaUnit && ev.deltaUnit !== 'bps' && !isPct;
            const pctChg = b.before ? (b.after / b.before - 1) * 100 : 0;
            const deltaText = isPct
              ? `${pctChg > 0 ? '+' : ''}${pctChg.toFixed(2)}%`
              : isAbs
              ? `${chg > 0 ? '+' : ''}${fmt(chg)}${ev.deltaUnit}`
              : `${chg > 0 ? '+' : ''}${(chg * 100).toFixed(0)} bps`;
            const deltaClass = chg >= 0 ? 'sig-ev-up' : 'sig-ev-down';
            return (
              <div className="sig-db-row" key={i} style={{ color: c }}>
                <div className="sig-db-bank">
                  <a href={b.sourceUrl} target="_blank" rel="noopener noreferrer">{b.name}</a>
                </div>
                <div className="sig-db-track">
                  <span className="sig-db-pt sig-db-before">
                    <b>{fmt(b.before)}{ev.unit}</b>
                    <em>{b.beforeLabel}</em>
                  </span>
                  <span className="sig-db-arrow" aria-hidden="true">→</span>
                  <span className="sig-db-pt sig-db-after">
                    <b>{fmt(b.after)}{ev.unit}</b>
                    <em>{b.afterLabel}</em>
                  </span>
                </div>
                <div className={`sig-db-change ${deltaClass}`}>{deltaText}</div>
                <div className="sig-db-why">{b.exposure}</div>
              </div>
            );
          })}
        </div>
      </figure>
      )}

      <p className="cs-para">{inline(ev.directionLine)}</p>
      {ev.causeEvidence && <p className="cs-para">{inline(ev.causeEvidence)}</p>}
      {ev.contrast && (
        <div className="sig-ev-contrast">
          <span className="sig-ev-contrast-label">The control case: the one that barely moved</span>
          <p>{inline(ev.contrast)}</p>
        </div>
      )}
      <p className="cs-para">{inline(ev.seasonalityNote)}</p>

      {ev.robustness && ev.robustness.length > 0 && (
        <>
          <h3 className="sig-ev-h3">Could it be something else?</h3>
          {ev.robustness.map((p, j) => <p key={j} className="cs-para">{inline(p)}</p>)}
        </>
      )}

      {ev.anticipation && <p className="cs-para">{inline(ev.anticipation)}</p>}

      {ev.recovery && ev.recovery.length > 0 && (
        <>
          <h3 className="sig-ev-h3">Then the clock turns: the recovery</h3>
          {ev.recovery.map((p, j) => <p key={j} className="cs-para">{inline(p)}</p>)}
        </>
      )}
      {ev.caption && <p className="sig-ev-centerpiece">{inline(ev.caption)}</p>}
    </div>
  );
}

function renderFanout(f: import('@/lib/signals').SignalFanout, key: React.Key) {
  return (
    <div key={key} className="sig-fanout">
      <div className="sig-fanout-kicker">The fan-out</div>
      <div className="sig-fanout-head">{f.head}</div>
      <div className="sig-fanout-branches">
        {f.branches.map((b, j) => (
          <div key={j} className={`sig-fanout-branch sig-fx-${b.effect}`}>
            <span className="sig-fanout-mark" aria-hidden="true">{FANOUT_MARK(b.effect)}</span>
            <span className="sig-fanout-label">{b.label}</span>
            {b.note && <span className="sig-fanout-note">{b.note}</span>}
          </div>
        ))}
      </div>
      {f.caption && <p className="sig-fanout-cap">{f.caption}</p>}
    </div>
  );
}

function renderMethod(key: React.Key) {
  return (
    <div key={key} className="sig-method">
      <div className="sig-method-step">A headline lands</div>
      <div className="sig-method-step sig-method-branch">
        <span className="sig-method-q">Which moved?</span>
        <span className="sig-method-picks">
          <span>Price</span><span>Cost</span><span>Volume</span>
        </span>
      </div>
      <div className="sig-method-step">Who feels it first?</div>
      <div className="sig-method-step">Who feels it next, one link down?</div>
      <div className="sig-method-step">Who has the pricing power?</div>
      <div className="sig-method-step">Weeks, quarters, or years?</div>
      <div className="sig-method-step sig-method-last">Who is left standing?</div>
    </div>
  );
}

function renderChain(chain: string[], title: string | undefined, key: React.Key) {
  return (
    <div key={key} className="sig-chainwrap">
      {title && <div className="sig-chain-title">{title}</div>}
      <ol className="sig-chain">
        {chain.map((step, j) => (
          <li key={j} className="sig-chain-step">
            <span className="sig-chain-num">{String(j + 1).padStart(2, '0')}</span>
            <span className="sig-chain-text">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default async function SignalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = getSignal(id)!;

  const relSectors = (s.relatedSectors ?? []).map((sid) => getSector(sid)).filter(Boolean);
  const relCases = (s.relatedCaseStudies ?? []).map((cid) => getCaseStudy(cid)).filter(Boolean);
  // Patterns the related case studies demonstrate, deduped, so a signal links the
  // macro event straight to the reusable business mechanism behind it.
  const relPatterns = Array.from(
    new Map(
      (s.relatedCaseStudies ?? [])
        .map((cid) => getPatternForCaseStudy(cid))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
        .map((p) => [p.slug, p]),
    ).values(),
  );
  // Company reports whose sector this signal moves.
  const relReports = getAllReports().filter((r) => (s.relatedSectors ?? []).includes(r.sectorId ?? ''));

  // Structured data so answer engines can parse the signal as an article, and
  // quote its question/answer pairs. Markdown links are flattened to plain text.
  const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: s.title,
    description: s.seoDescription ?? s.summary,
    articleSection: 'Signal',
    keywords: s.tags.join(', '),
    mainEntityOfPage: canonical(`/signals/${id}/`),
    author: ORG,
    publisher: ORG,
    ...(s.published ? { datePublished: s.published, dateModified: s.published } : {}),
  };
  const faqPairs: { q: string; a: string }[] = [];
  if (s.title.includes('?')) faqPairs.push({ q: s.title, a: plain(s.lesson) });
  if (s.trigger && s.triggerBody?.length) {
    faqPairs.push({ q: s.trigger, a: plain(s.triggerBody.join(' ')) });
  }
  if (s.yourTurn) faqPairs.push({ q: s.yourTurn.prompt, a: plain(s.yourTurn.reveal.join(' ')) });
  const faqLd = faqPairs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqPairs.map((p) => ({
          '@type': 'Question',
          name: p.q,
          acceptedAnswer: { '@type': 'Answer', text: p.a },
        })),
      }
    : null;

  return (
    <div className="wrap report sig-page">
      <JsonLd data={articleLd} />
      {faqLd && <JsonLd data={faqLd} />}
      <Breadcrumbs items={[{ name: 'Signals', path: '/signals/' }, { name: s.title }]} />

      <div className="csd-head">
        <div className="cs-head">
          <span className="cs-kicker">Signal · {s.kind}</span>
          <span className="cs-period">{s.dateline}</span>
        </div>
        <h1 className="csd-title" style={{ marginTop: 14 }}>{s.title}</h1>
        {s.seoDescription && <p className="csd-subtitle">{s.seoDescription}</p>}
      </div>

      <div className="csd-body">
        {/* What happened */}
        <div className="sig-block">
          <div className="eyebrow">What happened</div>
          {s.event.map((p, j) => <p key={j} className="cs-para csd-lede">{inline(p)}</p>)}
        </div>

        {/* The trigger: the hero question */}
        {s.trigger && (
          <div className="sig-trigger">
            <div className="sig-trigger-label">{s.triggerLabel ?? 'The one equation'}</div>
            <p className="sig-trigger-text">{s.trigger}</p>
            {s.triggerBody && s.triggerBody.map((p, j) => (
              <p key={j} className="sig-trigger-body">{inline(p)}</p>
            ))}
          </div>
        )}

        {/* The signature "which moved?" band */}
        {s.leverBand && (
          <div className="sig-lever">
            <div className="sig-lever-title">{s.leverBand.title}</div>
            <div className="sig-lever-items">
              {s.leverBand.items.map((it, j) => (
                <span key={j} className={`sig-lever-chip sig-lv-${it.mark ?? 'ask'}`}>
                  <span className="sig-lever-box" aria-hidden="true">
                    {it.mark === 'yes' ? '✓' : it.mark === 'no' ? '✕' : ''}
                  </span>
                  {it.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Winners and losers */}
        {((s.winners && s.winners.length > 0) || (s.losers && s.losers.length > 0)) && (
          <div className="sig-block">
            <h2 className="csd-h2">Who wins, who loses</h2>
            <div className="sig-wl">
              {s.winners && s.winners.length > 0 && (
                <div className="sig-wl-col sig-wl-win">
                  <div className="sig-wl-head">Winners</div>
                  {s.winners.map((a, j) => (
                    <div key={j} className="sig-actor">
                      <div className="sig-actor-top">
                        <span className="sig-actor-label">{a.label}</span>
                        {a.when && <span className="sig-actor-when">{WHEN_LABEL[a.when] ?? a.when}</span>}
                      </div>
                      <p className="sig-actor-why">{inline(a.why)}</p>
                    </div>
                  ))}
                </div>
              )}
              {s.losers && s.losers.length > 0 && (
                <div className="sig-wl-col sig-wl-lose">
                  <div className="sig-wl-head">Losers</div>
                  {s.losers.map((a, j) => (
                    <div key={j} className="sig-actor">
                      <div className="sig-actor-top">
                        <span className="sig-actor-label">{a.label}</span>
                        {a.when && <span className="sig-actor-when">{WHEN_LABEL[a.when] ?? a.when}</span>}
                      </div>
                      <p className="sig-actor-why">{inline(a.why)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Teaching sections, each optionally followed by its diagram */}
        {s.sections && s.sections.map((sec, si) => {
          let diagram: React.ReactNode = null;
          if (sec.diagram === 'method') {
            diagram = renderMethod(`d-${si}`);
          } else if (sec.diagram === 'chain' && s.chain && s.chain.length > 0) {
            diagram = renderChain(s.chain, s.chainTitle, `d-${si}`);
          } else if (sec.diagram?.startsWith('fanout:') && s.fanouts) {
            const idx = Number(sec.diagram.split(':')[1]);
            if (s.fanouts[idx]) diagram = renderFanout(s.fanouts[idx], `d-${si}`);
          }
          // The evidence block lands right after whichever section is flagged
          // evidenceAfter, so the numbers follow the explanation they prove.
          const showEvidence = sec.evidenceAfter && s.evidence;
          return (
            <React.Fragment key={si}>
              <div className="sig-block">
                <h2 className="csd-h2">{sec.heading}</h2>
                {sec.body.map((p, j) => <p key={j} className="cs-para">{inline(p)}</p>)}
                {sec.image && (
                  <figure className="sig-figure">
                    <img src={withBase(sec.image.src)} alt={sec.image.alt} loading="lazy" />
                    {sec.image.caption && <figcaption>{inline(sec.image.caption)}</figcaption>}
                  </figure>
                )}
                {diagram}
              </div>
              {showEvidence && renderEvidence(s.evidence!, `ev-${si}`)}
            </React.Fragment>
          );
        })}

        {/* Time horizon table */}
        {s.horizons && s.horizons.length > 0 && (
          <div className="sig-block">
            <h2 className="csd-h2">{s.horizonsTitle ?? 'The same event, at three distances in time'}</h2>
            <div className="sig-horizon-wrap">
              <table className="sig-horizon">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Immediate</th>
                    <th>~6 months</th>
                    <th>~2 years</th>
                  </tr>
                </thead>
                <tbody>
                  {s.horizons.map((h, j) => (
                    <tr key={j}>
                      <td className="sig-h-event">{h.event}</td>
                      <td>{h.immediate}</td>
                      <td>{h.sixMonths}</td>
                      <td>{h.twoYears}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* What to ignore, what to watch */}
        {((s.ignore && s.ignore.length > 0) || (s.focus && s.focus.length > 0)) && (
          <div className="sig-block">
            <h2 className="csd-h2">What to ignore, what to watch</h2>
            <div className="sig-if">
              {s.ignore && s.ignore.length > 0 && (
                <div className="sig-if-col sig-if-ignore">
                  <div className="sig-if-head">Ignore</div>
                  <ul>{s.ignore.map((x, j) => <li key={j}>{x}</li>)}</ul>
                </div>
              )}
              {s.focus && s.focus.length > 0 && (
                <div className="sig-if-col sig-if-focus">
                  <div className="sig-if-head">Watch</div>
                  <ul>{s.focus.map((x, j) => <li key={j}>{x}</li>)}</ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Better questions */}
        {s.questions && s.questions.length > 0 && (
          <div className="sig-block">
            <h2 className="csd-h2">Questions worth asking</h2>
            <ul className="sig-questions">
              {s.questions.map((q, j) => <li key={j}>{q}</li>)}
            </ul>
          </div>
        )}

        {/* What history rhymes with */}
        {s.history && s.history.length > 0 && (
          <div className="sig-block">
            <h2 className="csd-h2">What history rhymes with</h2>
            <div className="sig-history">
              {s.history.map((h, j) => (
                <div key={j} className="sig-hist">
                  <div className="sig-hist-when">{h.when}</div>
                  <p className="sig-hist-what">{h.what}</p>
                  {h.lesson && <p className="sig-hist-lesson">{h.lesson}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History rhymes table */}
        {s.historyRhymes && s.historyRhymes.length > 0 && (
          <div className="sig-block">
            <h2 className="csd-h2">History rhymes</h2>
            <div className="sig-horizon-wrap">
              <table className="sig-horizon sig-rhymes">
                <thead>
                  <tr>
                    <th>This event</th>
                    <th>Rhymes with</th>
                    <th>Same mental model</th>
                  </tr>
                </thead>
                <tbody>
                  {s.historyRhymes.map((r, j) => (
                    <tr key={j}>
                      <td className="sig-h-event">{r.event}</td>
                      <td>{r.similar}</td>
                      <td className="sig-rhyme-model">{r.model}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Your turn: interactive exercise */}
        {s.yourTurn && (
          <div className="sig-block">
            <div className="sig-turn">
              <div className="sig-turn-label">Your turn</div>
              <p className="sig-turn-prompt">{s.yourTurn.prompt}</p>
              <ol className="sig-turn-q">
                {s.yourTurn.questions.map((q, j) => <li key={j}>{q}</li>)}
              </ol>
              <details className="sig-turn-reveal">
                <summary>Think it through first. Then check your reasoning.</summary>
                <ul>
                  {s.yourTurn.reveal.map((r, j) => <li key={j}>{r}</li>)}
                </ul>
              </details>
            </div>
          </div>
        )}

        {/* Connections */}
        <Connections
          title="Follow the threads"
          lede="Where this signal plays out in depth: the sectors it moves and the companies that lived it."
          items={[
            ...relReports.map((r) => ({ kicker: 'Company', name: r.company, href: `/stocks/${r.slug}/` })),
            ...relSectors.map((sec) => ({ kicker: 'Sector', name: sec!.name, href: `/sectors/${sec!.id}/` })),
            ...relCases.map((c) => ({ kicker: 'Case study', name: c!.company, href: `/case-studies/${c!.id}/`, variant: 'case' as const })),
            ...relPatterns.map((p) => ({ kicker: 'Pattern', name: p.name, href: patternPath(p.slug) })),
          ]}
        />

        {s.sources && s.sources.length > 0 && (
          <div className="sig-block">
            <h2 className="csd-h2">Sources</h2>
            <ul className="src-list">
              {s.sources.map((src, j) => (
                <li key={j}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer">{src.label} <span className="src-arw">↗</span></a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="cs-lesson csd-lesson">
          <span className="cs-lesson-label">The lesson</span>
          <p>{s.lesson}</p>
        </div>

        {s.remember && (
          <div className="remember">
            <div className="remember-label">One sentence to remember</div>
            <p className="remember-text">{s.remember}</p>
          </div>
        )}
      </div>

      <div className="disclaimer" style={{ borderTop: 'none', paddingTop: 40 }}>
        Signals explain how to think about past and present events for learning. They are not
        predictions or advice, and past performance never guarantees future results.
      </div>
    </div>
  );
}
