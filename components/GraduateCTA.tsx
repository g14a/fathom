'use client';

// The closing hand-off. Once the reader understands the company in plain words,
// this offers the door into Investor mode. It asks the shell (which owns the
// reading-mode state) to switch, via a window event, then scrolls to the top.
export function GraduateCTA({ label }: { label: string }) {
  function go() {
    window.dispatchEvent(new CustomEvent('fathom:mode', { detail: 'investor' }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <button type="button" className="s-grad-cta" onClick={go}>
      {label}
      <span className="s-grad-arrow" aria-hidden>→</span>
    </button>
  );
}
