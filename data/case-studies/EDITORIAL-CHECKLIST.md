# Fathom Case Study: Editorial & Accuracy Checklist

Reference for verifying (not rewriting) a case study in `data/case-studies/*.json`.
Run this before publishing a new study or reworking an old one. It sits on top of
the voice, formatting and honesty rules in the repo `CLAUDE.md` (no em-dashes, no
spaced hyphens, beginner voice, never fabricate) and the `WRITING-GUIDE.md` in
`data/sectors/`, which still apply in full.

The job here is **not** to rewrite the article. The job is to verify whether every
important claim is accurate, fair, well-supported and easy to defend. Treat it like
a publication fact-check. Do not be polite. Be rigorous. The goal is to find
weaknesses, not to praise strengths.

---

## 1. Verify every factual claim

Go through the article line by line. For every factual statement: verify it is
correct, identify the original source, and flag it if it cannot be verified. Never
assume something is true because it sounds reasonable. Use primary sources wherever
possible (annual reports, earnings calls, investor presentations, regulatory
filings, government data, official announcements). Use secondary sources only when
a primary source is unavailable.

## 2. Separate facts from interpretation

Mark every important statement as one of three kinds:

- **Fact.** Objectively verifiable. "Jet acquired Air Sahara in 2007."
- **Interpretation.** Supported by evidence but not objective. "The acquisition
  weakened Jet's balance sheet." Interpretations must rest on multiple pieces of
  evidence.
- **Thesis.** The article's central argument. "Jet failed because airline economics
  mattered more than premium service." A thesis need not be "proven", but it must be
  strongly supported by evidence throughout.

## 3. Challenge every major conclusion

For each one ask: is there evidence, is there enough of it, and could another
reasonable conclusion fit the same facts? If so, present the strongest
counterargument, then say whether the article still holds. Never strengthen the
article by ignoring competing explanations.

## 4. Look for oversimplifications

Business failures almost never have one cause. Flag where the article leans too hard
on a single factor (management, debt, competition, regulation, pricing, culture) and
say where more nuance is needed.

## 5. Look for missing context

Ask what an industry expert would immediately notice is absent: regulatory changes,
competitor behaviour, industry economics, the macro environment, timing, historical
context.

## 6. Check every mental model

For each model the article uses, ask: is this the right model, is it the dominant
one, and is there a stronger model that explains the business better? Common models:
pricing power, operating leverage, capital intensity, distribution, working capital,
network effects, switching costs, capital allocation, commodity exposure, brand,
trust.

## 7. Verify cause and effect

Be strict wherever the article says *because, therefore, which led to, resulted in,
caused, due to*. Ask whether causation is actually supported or whether it is only
correlation. Flag every weak causal claim.

## 8. Find missing counterarguments

A good article survives criticism. Identify what a long-time investor, management, a
competitor and an industry analyst would each dispute, and include the strongest
opposing views.

## 9. Remove confirmation bias

Assume the article is wrong and try to disprove it. Keep only the conclusions that
still hold after you try to break them.

## 10. Verify numbers

Check every market share, margin, growth rate, ROE, debt figure, market size,
timeline and valuation metric. Flag anything outdated or unsupported. Cross-check
figures against the `evidence` block and `sources` already in the JSON.

## 11. Check company comparisons

Whenever the study compares companies (Jet vs IndiGo, Asian Paints vs Birla Opus,
Airtel vs Jio, and so on), ask whether the comparison is fair, and whether the
difference is really about business model, strategy, timing, regulation or industry
structure.

## 12. Check historical accuracy

For every major event verify the exact timeline, the sequence, and whether earlier
events genuinely influenced later ones. Avoid hindsight bias. This should line up
with the `timeline` array.

## 13. Flag AI-sounding writing (do not rewrite)

Only flag sentences that sound artificially polished: motivational-quote lines,
sections that all end on a perfect note, overused metaphors, documentary narration,
false certainty, the same idea explained twice, or a dramatic flourish. Prefer
writing that sounds like an experienced analyst explaining a business to a curious
friend. Ration the genuinely memorable lines to roughly one per few thousand words,
so they land.

## 14. Remove overconfidence

Where certainty cannot be established, prefer *probably, likely, suggests, appears,
seems*. Soften strong statements that the evidence does not fully carry.

## 15. Trust the reader

Find where the article repeats itself, explains the same point twice, or
over-explains an obvious conclusion. Suggest where fewer words would be stronger.

## 16. Evaluate the teaching

Ask whether a beginner could explain this business to someone else after reading. If
not, identify exactly where the explanation breaks down.

## 17. Rate the evidence

For every major claim assign a confidence level and say why:

- **High.** Supported by multiple independent primary sources.
- **Medium.** Supported by evidence but open to interpretation.
- **Low.** Interesting idea, insufficient evidence.

## 18. Final editorial verdict

Close the review with scores and a verdict:

- **Accuracy score** (out of 10): factual accuracy.
- **Evidence score:** how well conclusions are supported.
- **Nuance score:** does it avoid oversimplification.
- **Beginner score:** can a non-finance reader follow it.
- **Writing score:** does it sound like an experienced human, not an AI.

Then finish with exactly one confidence statement:

- **Ready to Publish.** All major factual claims are accurate and well supported.
- **Publish After Minor Corrections.** Only small factual or editorial fixes needed.
- **Needs More Research.** Important claims are currently unsupported or overstated.
