# Fathom Signals: Editorial Checklist

Reference for writing a signal in `data/signals/*.json`. A signal explains a
market-moving event (a Budget, an RBI rate decision, a tariff, a fuel-price move) as
a change to business economics, not as news. It sits on top of the voice, formatting
and honesty rules in the repo `CLAUDE.md` (no em-dashes, no spaced hyphens, beginner
voice, never fabricate) and the case-study guides, which still apply. Read
`ANTI-AI-SLOP.md` too: signals are the format most prone to manufactured three-part
structures, rhetorical opposites and quotable-line density. Ration them hard.

## Goal

Do **not** write a news article. Do **not** summarise headlines. Explain: what
changed, why it matters, who benefits, who loses, which mental models this activates,
and what an investor can learn for the future. The article should still be valuable
years after the event.

Final test: if this exact event happened again ten years from now, would this article
teach someone how to think about it? If not, keep working until it would.

## The build

1. **Explain the event simply.** What happened, who announced it, why it mattered, in
   plain words, in about 100 to 150 words. Assume the reader has never heard of it.
2. **Name the trigger.** Reduce the event to one business change: money got cheaper or
   dearer, demand rose or fell, an input got costlier, imports got harder, taxes moved.
   The reader should grasp the trigger before anything else.
3. **List the mental models it activates** (pricing power, cost of capital, government
   demand, commodity exposure, operating leverage, FX exposure, industry cycles,
   demand elasticity, switching costs, regulatory moat, capital allocation) and say why
   each one matters here.
4. **Map first, second and third-order effects.** Never stop at the obvious. Show the
   full chain (rate cut leads to cheaper loans leads to housing demand leads to cement
   leads to paint leads to more lending leads to more insurance).
5. **Identify winners**, split into immediate, delayed and long-term, and say why. Do
   not just list company names.
6. **Identify losers**, split the same way, and say why.
7. **Explain the why for every winner and loser.** "Airlines lose" is not enough:
   fuel is a top cost, and unless they can raise fares, margins shrink.
8. **Build one clear chain of consequences** the reader can follow end to end.
9. **Show the market reaction** over 1 day, 1 week, 1 month, 6 months and 1 year, not
   just day one. Long-term outcomes teach more.
10. **Explain why the market reacted** the way it did. Was it rational or emotional?
11. **Compare expectations with reality.** This is the most important section: what
    surprised the market, which sectors beat or missed expectations.
12. **Find the unexpected winners** beyond the first-order names (oil up also helps or
    hurts logistics, shipping, railways, EVs).
13. **Find the unexpected losers** from indirect effects (higher rates hit not just
    housing but furniture, paint, consumer durables).
14. **Connect to existing Fathom articles**: relevant sector, company, case study and
    mental model, via `relatedSectors` and `relatedCaseStudies`.
15. **Teach better questions** rather than answering everything: can costs be passed
    on, is demand structural, is it already priced in, who has the strongest balance
    sheet, does this change industry economics.
16. **Compare with history.** Find similar past events, show similarities, differences
    and lessons. History builds pattern recognition.
17. **Avoid hindsight bias.** Separate what investors knew then from what we know now.
    Teach uncertainty.
18. **Support everything with evidence**: government and RBI releases, ministry
    releases, filings, earnings calls, industry reports, historical market data.
19. **Use real data** where it exists (index performance, returns, commodity prices,
    rates, inflation, FX, order books) instead of qualitative hand-waving.
20. **Add charts only where they explain an idea**, never to decorate.
21. **End with the lesson.** Reduce the event to one timeless business idea that still
    holds in ten years (higher government spending creates demand, but execution
    decides who wins; lower rates help leveraged businesses first; commodity shocks
    punish businesses without pricing power; markets react immediately, businesses
    change slowly).
22. **Final editorial review.** Rate accuracy, research quality, depth, mental models,
    teaching quality, historical context, evidence, charts, beginner-friendliness and
    long-term educational value.

## Where this lives in the data

The `Signal` type is in `lib/signals.ts`. Content is JSON in `data/signals/`. The
`event` array is the plain explainer; `trigger` is the one-line business change;
`mentalModels`, `chain`, `winners`, `losers`, `questions`, `history`, `sections`,
`sources`, `lesson` and `remember` map to the sections above and render on
`/signals/<id>`. Link to sectors and case studies with `relatedSectors` and
`relatedCaseStudies` so everything stays connected.
