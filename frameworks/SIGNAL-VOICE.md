# Fathom Signal Voice

The voice rules specific to **signals** (`data/signals/*.json`). This sits on top of
the repo `CLAUDE.md` voice and formatting rules and the `SIGNALS-CHECKLIST.md` build
steps, which still apply. Read `ANTI-AI-SLOP.md` too. Where the general voice says
"write for a beginner," this file says *how a signal in particular should sound*.

**The one sentence:** write like a patient, intellectually curious investor sitting
beside the reader, showing them a hidden mechanism, testing it against reality, and
leaving them with a mental model they can reuse the next time the news breaks.

**The one rule above all:** do not try to sound intelligent. Try to make the reader
more intelligent.

---

## 1. Core identity

- Write like an intellectual teacher, not a financial journalist.
- The goal is not to explain what happened. It is to teach the reader how to *think*
  about what happened.
- Every signal should leave the reader with a mental model they can reuse elsewhere.
- Prefer one surprising business or economic insight over a long list of facts.
- The reader should finish thinking: "I hadn't looked at it that way before."
- Never sound like an investment adviser, stock tipster or market pundit.

## 2. The fundamental Fathom move

Every signal walks this sequence:

**News → obvious interpretation → hidden mechanism → prediction → evidence → broader lesson**

1. Start with what happened.
2. Name what a beginner would naturally conclude.
3. Challenge that interpretation.
4. Explain the underlying business mechanism.
5. Form a testable prediction.
6. Use real evidence to test the prediction.
7. Generalise the insight into a reusable framework.
8. End on a memorable principle.

Worked example (the sugar signal):
- Sugar at records, so sugar companies should benefit.
- But record prices may be exactly when government intervention becomes most likely.
- The government influences both the mill's input cost and its output price.
- If that is true, the most sugar-exposed stocks should fall hardest when imports are announced.
- For government-controlled businesses, unusually high margins can be a warning, not a reason to celebrate.

## 3. Teach, don't explain

- Explain mechanisms; do not summarise them.
- Use concrete mental models and analogies that genuinely clarify the economics.
- Turn abstract economics into something the reader can picture.
- Let the reader discover the insight rather than announcing it.

Avoid: "This highlights the importance of understanding government intervention."
Prefer: "The mill sits in the middle of a vice the state tightens from whichever side is politically sore."

## 4. Be intellectually provocative

- Look for the counterintuitive reading. Ask: what would a smart beginner get wrong here?
- Build the signal around that misconception.
- Never manufacture contrarianism; the insight must follow from the evidence.
- Confident statements where the evidence supports them; qualified language where it does not.

Good: "The ceiling did not just cap a price, it capped a forecast."
Bad: "This demonstrates that investors should carefully consider policy risks."

## 5. Use questions as teaching tools

- Questions should expose the underlying mechanism, not add drama.
- Do not use rhetorical questions for effect.
- Answer an important question shortly after asking it.

Examples: Who is the government protecting right now? If the product is at a record
price, who has an incentive to intervene? What happens to a business that controls
neither its input nor its output price?

## 6. Predict before you show evidence

This is what separates a signal from a hindsight explainer.

- Never show the market reaction first and invent an explanation afterward.
- State what the framework predicts *before* the price evidence.
- Make the prediction specific enough that it could be wrong.
- Then test it against reality.

In the data, `evidence.prediction` must be written and read as if the numbers are
not yet known.

## 7. Evidence should test the idea

- Every fact has a job. Do not dump numbers; each important number answers "so what?"
- Use company comparisons when business exposure differs; use a benchmark to isolate the effect.
- Separate evidence from interpretation.
- Do not claim causation when the evidence only shows correlation.
- Never write "proves" unless it genuinely proves. Prefer "fits the pattern,"
  "supports," "suggests," "is consistent with."

## 8. Respect uncertainty

- Separate fact, interpretation and scenario. Label future scenarios *as* scenarios.
- Do not infer management's intentions or the government's motives without a source.
- Do not turn one day's stock move into a permanent conclusion.
- Include caveats when they materially affect the argument; never bury an important
  uncertainty to make the story cleaner.

The voice is "here is what the evidence tells us, and here is what it does not," never
"here is the definitive explanation."

## 9. Memorable language, rationed

- One to three memorable conceptual phrases per signal, no more.
- A metaphor must explain the economics, not decorate it.
- One great metaphor beats five mediocre ones. Do not sound like a copywriter
  reaching for profundity.

## 10. Concrete nouns and verbs

Prefer: cuts, raises, caps, forces, squeezes, protects, shifts, absorbs, passes
through, transfers, limits.

Avoid: leverages, underscores, highlights, navigates, dynamic landscape, key
considerations, headwinds and tailwinds, plays a pivotal role, significant
implications, investor sentiment was impacted.

Instead of "The policy creates significant implications for sugar producers," write
"The policy puts a ceiling on what mills can earn from sugar."

## 11. Do not sound like a news article

- Keep the event summary concise. The news is the starting point, not the product.
- Move quickly from what happened to why it matters.
- Spend more words on the mechanism than the announcement.
- Do not restate the news in different words.

## 12. Do not sound like an academic paper

- No unnecessary theory, long definitions, or a citation after every sentence.
- The reader should feel a very smart person is sitting beside them explaining this,
  not that they are reading a textbook.

## 13. Do not sound like an AI

Never use: "in today's rapidly evolving landscape," "this serves as a reminder that,"
"it's important to note that," "at the end of the day," "this highlights the
importance of," "there are several factors at play," "let's dive deeper," "in
conclusion," "this underscores."

Also avoid: repetitive summaries, perfectly symmetrical paragraphs, generic pros and
cons, excessive headings, explaining the obvious, restating the thesis after every
section, artificial rhetorical questions, over-polished corporate prose.

If a sentence could appear in 500 other AI-generated finance articles, rewrite it.

## 14. Talk to intelligent beginners

- The reader is intelligent but does not know this particular business.
- Never dumb things down; never assume specialist knowledge.
- Explain a specialised concept the first time it appears; introduce complexity
  progressively; never make the reader feel stupid.

Good: "This isn't a formal price ceiling. Nobody decreed a maximum rupees-per-kilo.
It's an economic ceiling..."

## 15. Always find the second-order effect

Do not stop at "government imports sugar, so sugar prices fall." Follow the chain one
or two steps past the obvious: who benefits indirectly, who is hurt indirectly, whose
competitive position changes.

## 16. Always find the reusable pattern

Every signal should answer "where else could I use this way of thinking?" Turn the
pattern into questions the reader can apply to another company tomorrow (who controls
the input price, who controls the output price, who is the government protecting, what
happens when margins get unusually high, how much of the business is exposed, does
diversification actually reduce the risk). This is what gives a signal long-term value
beyond news and SEO.

## 17. End with a principle, not a summary

The last line should compress the mental model and feel like "that's the thing I
should remember," not "therefore investors should monitor sugar prices."

Good: "For a business the government controls, a record price is not a celebration. It
is a countdown to intervention."

## How this maps to the data

`event` is the concise news; `trigger` names the one business change; `mentalModels`
are the reusable models; `sections` teach the mechanism; `evidence.prediction` states
the testable claim before the numbers, and the `evidence` block tests it (with a
benchmark and a control company where possible); `horizons` separate immediate effect
from later scenario; `questions` are the reusable framework; `lesson` and `remember`
land the principle. The reference implementations are `crude-oil-slides-2024-25` and
`sugar-duty-free-imports-2026`.
