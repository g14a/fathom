'use client';

import { useEffect, useRef, useState } from 'react';

type Part = { label: string; value: number; display: string; tone: 'spent' | 'left' };

// "Where the money goes." A vertical flow: total cash at the top, what gets
// spent, then the leftover as the hero of the block. It animates in when
// scrolled into view, so the reader watches the ₹100 resolve into ₹54 kept.
export function SimpleMoney({
  totalLabel,
  totalDisplay,
  parts,
  punch,
}: {
  totalLabel: string;
  totalDisplay: string;
  parts: Part[];
  punch: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const total = parts.reduce((s, p) => s + p.value, 0) || 1;
  const spent = parts.find((p) => p.tone === 'spent');
  const left = parts.find((p) => p.tone === 'left');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={`s-money ${live ? 'live' : ''}`} ref={ref}>
      <div className="s-money-total">
        <span className="s-money-total-val">{totalDisplay}</span>
        <span className="s-money-total-label">{totalLabel}</span>
      </div>

      {spent && (
        <div className="s-money-spent">
          <div className="s-money-arrow" aria-hidden />
          <div className="s-money-spent-row">
            <span className="s-money-spent-val">{spent.display}</span>
            <span className="s-money-spent-label">{spent.label}</span>
          </div>
          <div className="s-money-bar"><span style={{ width: live ? `${(spent.value / total) * 100}%` : '0%' }} /></div>
        </div>
      )}

      {left && (
        <div className="s-money-left">
          <div className="s-money-arrow" aria-hidden />
          <div className="s-money-left-tag">is left over</div>
          <div className="s-money-left-val">{left.display}</div>
          <div className="s-money-left-label">{left.label}</div>
        </div>
      )}

      <figcaption className="s-money-punch">{punch}</figcaption>
    </figure>
  );
}
