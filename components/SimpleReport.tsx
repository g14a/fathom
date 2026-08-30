import type { TickerReport, SimpleBlock, SimpleFlowStep, SimpleHero } from '@/lib/types';
import { InlineTerm } from '@/components/InlineTerm';
import { Reveal } from '@/components/Reveal';
import { SimpleMoney } from '@/components/SimpleMoney';
import { GraduateCTA } from '@/components/GraduateCTA';

// The "Explain Simply" reading of a report: an interactive explanation built
// from visual objects, not paragraphs. Same ink-and-serif journal, no emoji,
// teal the single accent. Client pieces: inline glossary chips, the money flow
// (scroll-animated), and the reveal.

// Turn "...each month. [[ARPU|The average bill.|Airtel has millions.]]" into
// text with a tappable chip. Markup is [[term|def]] or [[term|def|context]].
export function rich(text: string | undefined | null): React.ReactNode[] {
  if (!text) return [];
  const out: React.ReactNode[] = [];
  const re = /\[\[([^\]|]+)\|([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<InlineTerm key={i++} term={m[1]} def={m[2]} context={m[3]} />);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Flow({ steps }: { steps: SimpleFlowStep[] }) {
  // Tolerate a step written as a bare string (normalize to { label }).
  const norm = (steps ?? []).map((s) =>
    typeof s === 'string' ? ({ label: s } as SimpleFlowStep) : s
  );
  return (
    <div className="s-flow">
      {norm.map((s, i) => (
        <div key={i} className={`s-flow-step ${s.tone ? `s-flow-${s.tone}` : ''}`}>
          <div className="s-flow-label">{s.label}</div>
          {s.sub && <div className="s-flow-sub">{s.sub}</div>}
          {i < norm.length - 1 && <div className="s-flow-link" aria-hidden />}
        </div>
      ))}
    </div>
  );
}

function Hero({ h, company }: { h: SimpleHero; company: string }) {
  // The flow data drives a small network "map": your apps at the top, funnelling
  // into Airtel's one network, then out to all of India. The mental model, made
  // physical, as the hero of the whole page.
  const apps = (h.flow[1]?.label ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const core = h.flow.find((s) => s.tone === 'accent') ?? h.flow[2];
  const base = h.flow.find((s) => s.tone === 'muted') ?? h.flow[3];
  return (
    <header className="s-hero">
      {/* Not an <h1>: the investor view holds the page's single canonical H1,
          and both views ship in the static HTML. This keeps one H1 per page. */}
      <div className="s-title" role="heading" aria-level={1}>{company}</div>
      <p className="s-hero-lead">{h.lead}</p>

      <div className="s-map">
        <div className="s-map-apps">
          {apps.map((a, i) => <span key={i} className="s-map-app">{a}</span>)}
        </div>
        <div className="s-map-funnel" aria-hidden><span /><span /><span /><span /></div>
        <div className="s-map-core">
          <span className="s-map-core-name">{core?.label}</span>
          {core?.sub && <span className="s-map-core-sub">{core.sub}</span>}
        </div>
        {base && (
          <>
            <div className="s-map-stem" aria-hidden />
            <div className="s-map-base">{base.label}{base.sub ? ` · ${base.sub}` : ''}</div>
          </>
        )}
      </div>

      <p className="s-hero-close">{h.close}</p>
    </header>
  );
}

export function Block({ b }: { b: SimpleBlock }) {
  switch (b.kind) {
    case 'bigIdea':
      return <p className="s-bigidea">{rich(b.text)}</p>;

    case 'flow':
      return <Flow steps={b.steps} />;

    case 'converge':
      return (
        <figure className="s-converge">
          <div className="s-cvg-items">
            {b.items.map((it, i) => <span key={i} className="s-cvg-item">{it}</span>)}
          </div>
          <div className="s-cvg-join" aria-hidden />
          <div className="s-cvg-result">{b.result}</div>
          <div className="s-cvg-cost">{b.cost}</div>
        </figure>
      );

    case 'branch':
      return (
        <figure className="s-branch">
          <div className="s-branch-trigger">{b.trigger}</div>
          <div className="s-branch-stem" aria-hidden />
          <div className="s-branch-decision">{b.decision}</div>
          <div className="s-branch-fork" aria-hidden><span /><span /></div>
          <div className="s-branch-options">
            {b.options.map((o, i) => (
              <div key={i} className={`s-branch-opt ${o.tone ? `s-branch-${o.tone}` : ''}`}>
                <div className="s-branch-opt-label">{o.label}</div>
                <div className="s-branch-opt-outcome">{o.outcome}</div>
              </div>
            ))}
          </div>
        </figure>
      );

    case 'insight':
      return <p className="s-insight">{rich(b.text)}</p>;

    case 'compare': {
      const side = (s: typeof b.before, cls: string) => (
        <div className={`s-cmp ${cls}`}>
          <div className="s-cmp-top">
            <span className="s-cmp-count">{s.count}</span>
            <span className="s-cmp-unit">{s.unit}</span>
          </div>
          <div className="s-cmp-year">{s.year}</div>
          <div className="s-cmp-players">
            {s.players.map((p, j) => <span key={j} className="s-cmp-player">{p}</span>)}
          </div>
          <div className="s-cmp-cap">{s.caption}</div>
        </div>
      );
      return (
        <figure className="s-compare">
          {side(b.before, 'then')}
          <div className="s-cmp-arrow" aria-hidden>→</div>
          {side(b.after, 'now')}
          <figcaption className="s-compare-punch">{rich(b.punch)}</figcaption>
        </figure>
      );
    }

    case 'bigNumber': {
      const max = b.bars ? Math.max(...b.bars.map((x) => x.value)) || 1 : 1;
      return (
        <figure className="s-num">
          {b.kicker && <div className="s-num-kicker">{b.kicker}</div>}
          <div className="s-num-label">{b.label}</div>
          <div className="s-num-row">
            <span className="s-num-side">
              <span className="s-num-from">{b.from}</span>
              {b.fromSub && <span className="s-num-sub">{b.fromSub}</span>}
            </span>
            <span className="s-num-mid" aria-hidden>
              <span className="s-num-arrow">↓</span>
              {b.delta && <span className="s-num-delta">{b.delta}</span>}
            </span>
            <span className="s-num-side">
              <span className={`s-num-to ${b.toTone === 'bad' ? 's-num-to-bad' : ''}`}>{b.to}</span>
              {b.toSub && <span className="s-num-sub">{b.toSub}</span>}
            </span>
          </div>
          {b.bars && (
            <div className="s-num-bars">
              {b.bars.map((bar, i) => (
                <div key={i} className={`s-num-bar ${i === b.bars!.length - 1 ? 'peak' : ''}`}>
                  <span className="s-num-bar-yr">{bar.label}</span>
                  <span className="s-num-bar-track"><span style={{ width: `${(bar.value / max) * 100}%` }} /></span>
                  <span className="s-num-bar-val">{bar.display}</span>
                </div>
              ))}
            </div>
          )}
          <figcaption className="s-num-insight">{rich(b.insight)}</figcaption>
          {b.term && <div className="s-num-term">Investors call this <b>{b.term}</b></div>}
        </figure>
      );
    }

    case 'bigStat':
      return (
        <figure className={`s-stat s-stat-${b.tone ?? 'accent'}`}>
          {b.kicker && <div className="s-num-kicker">{b.kicker}</div>}
          <div className="s-stat-val">{b.value}</div>
          <figcaption className="s-stat-label">{rich(b.label)}</figcaption>
        </figure>
      );

    case 'moneyFlow':
      return (
        <SimpleMoney
          totalLabel={b.totalLabel}
          totalDisplay={b.totalDisplay}
          parts={b.parts}
          punch={rich(b.punch)}
        />
      );

    case 'reveal':
      return <Reveal prompt={b.prompt} calc={b.calc} bigAnswer={b.bigAnswer} sub={b.sub} note={b.note} />;

    case 'split':
      return (
        <figure className="s-split">
          <div className="s-split-cols">
            {[b.left, b.right].map((col, i) => (
              <div key={i} className={`s-col s-col-${col.tone}`}>
                <div className="s-col-title">{col.title}</div>
                <div className="s-col-verdict">{col.verdict}</div>
                <ul className="s-col-rows">
                  {col.rows.map((r, j) => <li key={j}>{r}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <figcaption className="s-split-punch">{rich(b.punch)}</figcaption>
        </figure>
      );

    case 'analogy':
      return (
        <div className="s-analogy">
          <p className="s-analogy-lead">{rich(b.lead)}</p>
          <p className="s-analogy-body">{rich(b.body)}</p>
          {b.term && <div className="s-analogy-term">{b.term}</div>}
        </div>
      );

    case 'thesis':
      return (
        <figure className="s-thesis">
          <div className="s-thesis-head">{b.heading}</div>
          <div className="s-thesis-items">
            {b.items.map((it, i) => (
              <div key={i} className={`s-thesis-item s-th-${it.tone}`}>
                <span className="s-thesis-dot" aria-hidden />
                <div className="s-thesis-text">
                  <div className="s-thesis-label">{it.label}</div>
                  <div className="s-thesis-body">{rich(it.text)}</div>
                </div>
              </div>
            ))}
          </div>
        </figure>
      );

    case 'callout':
      return (
        <div className="s-callout">
          {b.label && <div className="s-callout-label">{b.label}</div>}
          <p className="s-callout-text">{rich(b.text)}</p>
        </div>
      );

    case 'tension':
      return (
        <div className="s-tension">
          <p className="s-tension-a">{rich(b.a)}</p>
          <p className="s-tension-b"><span className="s-tension-but">But</span>{rich(b.b)}</p>
          <p className="s-tension-resolve">{rich(b.resolve)}</p>
        </div>
      );

    case 'graduate':
      return (
        <div className="s-grad">
          <p className="s-grad-intro">{rich(b.intro)}</p>
          <div className="s-grad-learned">
            <div className="s-grad-learned-tag">The words, hover any one</div>
            <div className="s-grad-chips">
              {b.glossary.map((g, i) => (
                <InlineTerm key={i} term={g.term} def={g.def} context={g.context} />
              ))}
            </div>
          </div>
          <GraduateCTA label={b.ctaLabel} />
        </div>
      );

    case 'signals':
      return (
        <figure className="s-signals">
          {b.heading && <figcaption className="s-signals-head">{b.heading}</figcaption>}
          <div className="s-signals-table" role="table">
            <div className="s-signals-row s-signals-hrow" role="row">
              <span role="columnheader">The signal</span>
              <span role="columnheader">Where to look</span>
              <span role="columnheader">What it told you</span>
            </div>
            {b.rows.map((r, i) => (
              <div key={i} className="s-signals-row" role="row">
                <span className="s-sig-signal" role="cell"><span className="s-sig-k">The signal</span>{r.signal}</span>
                <span className="s-sig-where" role="cell"><span className="s-sig-k">Where to look</span>{r.where}</span>
                <span className="s-sig-meaning" role="cell"><span className="s-sig-k">What it told you</span>{rich(r.meaning)}</span>
              </div>
            ))}
          </div>
          {b.blindSpot && (
            <div className="s-signals-blind">
              <span className="s-signals-blind-tag">What you could not have known</span>
              {rich(b.blindSpot)}
            </div>
          )}
        </figure>
      );

    case 'prose':
      if (b.aside) {
        return (
          <aside className="s-prose s-prose-aside">
            <div className="s-aside-tag">{b.aside}</div>
            {b.text.map((p, i) => <p key={i}>{rich(p)}</p>)}
          </aside>
        );
      }
      return (
        <div className="s-prose">
          {b.text.map((p, i) => <p key={i}>{rich(p)}</p>)}
        </div>
      );
  }
}

export function SimpleReport({ r }: { r: TickerReport }) {
  const s = r.simple;
  if (!s) return null;

  return (
    <div className="wrap report simple-report">
      <Hero h={s.hero} company={r.company} />

      {s.sections.map((sec, i) => (
        <section key={sec.id} className="s-section" id={`simple-${sec.id}`}>
          <div className="s-sec-head">
            <span className="s-sec-num">{String(i + 1).padStart(2, '0')}</span>
            <h2 className="s-question">{sec.question}</h2>
          </div>
          <div className="s-blocks">
            {sec.blocks.map((b, j) => <Block key={j} b={b} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
