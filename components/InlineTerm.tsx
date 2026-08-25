// A quiet glossary chip. The word reads inline with a dotted underline; hovering
// (or focusing it by keyboard/tap) reveals a plain definition and, when given, a
// second line grounding the term in this specific company. Visibility is driven
// entirely by CSS (:hover / :focus-within), so this needs no client JS.
//
// It is a <span>, not a <button>, on purpose: button text is dropped from the
// clipboard in some browsers, which made the term look like it "disappeared"
// when a reader copied the paragraph. Span text always copies.
export function InlineTerm({
  term,
  def,
  context,
}: {
  term: string;
  def: string;
  context?: string;
}) {
  return (
    <span className="s-term-wrap">
      <span className="s-term" role="button" tabIndex={0} aria-label={`${term}: ${def}`}>
        {term}
      </span>
      <span className="s-term-pop" role="note">
        <span className="s-term-name">{term}</span>
        <span className="s-term-def">{def}</span>
        {context && (
          <span className="s-term-ctx">
            <span className="s-term-ctx-tag">For this company</span>
            {context}
          </span>
        )}
      </span>
    </span>
  );
}
