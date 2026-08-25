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
      if (next === 'investor' || next === 'simple') choose(next);
    }
    window.addEventListener('fathom:mode', onMode);
    return () => window.removeEventListener('fathom:mode', onMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  function choose(next: Mode) {
    if (next === mode) return;
    setMode(next);
    try {
      localStorage.setItem(STORE_KEY, next);
    } catch {
      /* ignore */
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
