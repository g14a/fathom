import { getAllSignals, getSignal } from '@/lib/signals';
import { getSector } from '@/lib/sectors';
import { getCaseStudy } from '@/lib/caseStudies';
import { withBase } from '@/lib/base';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllSignals().map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const s = getSignal(id);
  if (!s) return {};
  return { title: `${s.title} | Fathom Signals`, description: s.summary };
}

const WHEN_LABEL: Record<string, string> = {
  immediate: 'Immediate',
  delayed: 'Delayed',
  'long-term': 'Long-term',
};

const FANOUT_MARK = (e: string) => (e === 'up' ? '▲' : e === 'down' ? '▼' : '＝');

function renderFanout(f: import('@/lib/signals').SignalFanout, key: React.Key) {
  return (
    <div key={key} className="sig-fanout">
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

  return (
    <div className="wrap report sig-page">
      <a href={withBase("/signals/")} className="back">← All signals</a>

      <div className="csd-head">
        <div className="cs-head">
          <span className="cs-kicker">Signal · {s.kind}</span>
          <span className="cs-period">{s.dateline}</span>
        </div>
        <h1 className="csd-title" style={{ marginTop: 14 }}>{s.title}</h1>
      </div>

      <div className="csd-body">
        {/* What happened */}
        <div className="sig-block">
          <div className="eyebrow">What happened</div>
          {s.event.map((p, j) => <p key={j} className="cs-para csd-lede">{p}</p>)}
        </div>

        {/* The trigger: the hero equation */}
        {s.trigger && (
          <div className="sig-trigger">
            <div className="sig-trigger-label">The one equation</div>
            <p className="sig-trigger-text">{s.trigger}</p>
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
                      <p className="sig-actor-why">{a.why}</p>
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
                      <p className="sig-actor-why">{a.why}</p>
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
          return (
            <div key={si} className="sig-block">
              <h2 className="csd-h2">{sec.heading}</h2>
              {sec.body.map((p, j) => <p key={j} className="cs-para">{p}</p>)}
              {diagram}
            </div>
          );
        })}

        {/* Time horizon table */}
        {s.horizons && s.horizons.length > 0 && (
          <div className="sig-block">
            <h2 className="csd-h2">The same event, at three distances in time</h2>
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
        {(relSectors.length > 0 || relCases.length > 0) && (
          <div className="sig-block sig-connect">
            <h2 className="csd-h2">Follow the threads</h2>
            {relSectors.length > 0 && (
              <div className="conn-links">
                {relSectors.map((sec) => (
                  <a key={sec!.id} href={withBase(`/sectors/${sec!.id}/`)} className="conn-link">
                    {sec!.name} <span className="arw">→</span>
                  </a>
                ))}
              </div>
            )}
            {relCases.length > 0 && (
              <div className="conn-links" style={{ marginTop: 10 }}>
                {relCases.map((c) => (
                  <a key={c!.id} href={withBase(`/case-studies/${c!.id}/`)} className="conn-link">
                    {c!.company} case study <span className="arw">→</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

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
