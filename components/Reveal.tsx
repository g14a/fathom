// The one "aha" per report. A setup, the calculation, then the payoff landing
// big. It stays on the page: the dopamine is the point, so nothing hides it
// behind a click.
export function Reveal({
  prompt,
  calc,
  bigAnswer,
  sub,
  note,
}: {
  prompt: string;
  calc?: string;
  bigAnswer: string;
  sub?: string;
  note: string;
}) {
  return (
    <div className="s-reveal">
      <div className="s-reveal-tag">Think about this</div>
      <p className="s-reveal-prompt">{prompt}</p>
      {calc && <div className="s-reveal-calc">{calc}</div>}
      <div className="s-reveal-big">{bigAnswer}</div>
      {sub && <div className="s-reveal-sub">{sub}</div>}
      <p className="s-reveal-note">{note}</p>
    </div>
  );
}
