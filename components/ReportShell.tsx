'use client';

import { useEffect, useState } from 'react';

type Mode = 'investor' | 'simple';
const STORE_KEY = 'fathom:reading-mode';

// The only client JS on a report page. It holds the reading-mode state and flips
// between the two server-rendered trees passed in as props. Both trees ship in
// the static HTML, so SEO and crawlers see the full investor report; the toggle
// only changes which one is visible.
export function ReportShell({
  investor,
  simple,
  persistLocalStorage = true,
}: {
  investor: React.ReactNode;
  simple: React.ReactNode | null;
  persistLocalStorage?: boolean;
}) {
  const [mode, setMode] = useState<Mode>('investor');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (persistLocalStorage) {
      try {
        const saved = localStorage.getItem(STORE_KEY);
        if (saved === 'simple' && simple) setMode('simple');
      } catch {
        /* storage blocked: stay on investor */
      }
    }
    setReady(true);
  }, [simple, persistLocalStorage]);

  // The "graduate to Investor mode" hand-off inside Simple mode asks the shell
  // to switch via this event, so the button need not know the shell internals.
  useEffect(() => {
    function onMode(e: Event) {
      const next = (e as CustomEvent).detail as Mode;
      if (next === 'investor' || next === 'simple') choose(next, 'graduate_cta');
    }
    window.addEventListener('fathom:mode', onMode);
    return () => window.removeEventListener('fathom:mode', onMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Engagement analytics for Simple mode: which glossary terms readers open, and
  // how far into the explanation they actually get. Both fire only through real
  // interaction, and the section funnel naturally gates to Simple mode because a
  // display:none pane never intersects the viewport. Best-effort: guarded by gtag.
  useEffect(() => {
    if (!simple) return;
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    const track = (event: string, params: Record<string, unknown>) => {
      try {
        if (typeof w.gtag === 'function') w.gtag('event', event, params);
      } catch {
        /* analytics is best-effort */
      }
    };
    const base = {
      content_type: location.pathname.includes('/case-studies/') ? 'case_study' : 'report',
      page_path: location.pathname,
    };

    // Glossary term opened (hover or keyboard focus), once per term per page load.
    const seenTerms = new Set<string>();
    const onTerm = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest?.('.s-term') as HTMLElement | null;
      if (!el) return;
      const term = (el.textContent || '').trim();
      if (!term || seenTerms.has(term)) return;
      seenTerms.add(term);
      track('glossary_term_open', { ...base, term });
    };
    document.addEventListener('mouseover', onTerm, { passive: true });
    document.addEventListener('focusin', onTerm);

    // How far into Simple mode readers get: each section counted once when half
    // of it has been on screen. Gives a drop-off funnel from section 1 to the end.
    let io: IntersectionObserver | null = null;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.mode-pane-simple .s-section'),
    );
    if (sections.length && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue;
            const el = en.target as HTMLElement;
            track('simple_section_view', {
              ...base,
              section_id: el.id.replace(/^simple-/, ''),
              section_index: sections.indexOf(el) + 1,
              section_total: sections.length,
            });
            io!.unobserve(el);
          }
        },
        { threshold: 0.5 },
      );
      sections.forEach((s) => io!.observe(s));
    }

    return () => {
      document.removeEventListener('mouseover', onTerm);
      document.removeEventListener('focusin', onTerm);
      io?.disconnect();
    };
  }, [simple]);

  function choose(next: Mode, source: 'toggle' | 'graduate_cta' = 'toggle') {
    if (next === mode) return;
    setMode(next);
    // Analytics: record that a reader actually used the mode switch. This fires
    // only on a real user action (a toggle click or the graduate button), never
    // on the auto-applied stored preference, so it measures genuine engagement.
    try {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'reading_mode_switch', {
          mode: next,
          source,
          content_type: location.pathname.includes('/case-studies/') ? 'case_study' : 'report',
          page_path: location.pathname,
        });
      }
    } catch {
      /* analytics is best-effort; never let it break the toggle */
    }
    if (persistLocalStorage) {
      try {
        localStorage.setItem(STORE_KEY, next);
      } catch {
        /* ignore */
      }
    }
  }

  if (!simple) return <>{investor}</>;

  return (
    <div className={`report-shell mode-${mode} ${ready ? 'shell-ready' : ''}`}>
      <div className="mode-bar">
        <div className="mode-bar-inner">
          <div className="mode-seg" role="tablist" aria-label="Reading mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'investor'}
              className={`mode-tab ${mode === 'investor' ? 'on' : ''}`}
              onClick={() => choose('investor')}
            >
              Investor
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'simple'}
              className={`mode-tab ${mode === 'simple' ? 'on' : ''}`}
              onClick={() => choose('simple')}
            >
              Explain simply
            </button>
          </div>
        </div>
      </div>

      <div className="mode-pane mode-pane-investor" aria-hidden={mode !== 'investor'}>
        {investor}
      </div>
      <div className="mode-pane mode-pane-simple" aria-hidden={mode !== 'simple'}>
        {simple}
      </div>
    </div>
  );
}
