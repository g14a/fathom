# Explain Simply — case studies

Companion to [EXPLAIN-SIMPLY.md](EXPLAIN-SIMPLY.md), which covers company reports.
**Read that first.** The schema, the 17 block types, the inline glossary, the
components and the base voice rules are identical and are not repeated here. This
file covers what is *different* about a case study, and it is mostly about *how to
think* before you touch a block.

> **This is a decision framework, not a checklist to visibly satisfy.** If
> following a rule would make the reading more mechanical, repetitive, or
> unnatural, prefer the clearer explanation and omit the rule. Every tool below
> exists to serve the reader's understanding; none is a box to tick. When in
> doubt, leave something out.

## What a Simple case study is

A case study is **a business problem the reader should learn to reason through.**
The Simple reading takes them from:

> what happened → why it happened → why the decision made sense at the time →
> what changed → what the evidence showed → what could have been known → what
> pattern can be reused elsewhere.

It is **not** a shorter version of the case study. It is **not** a beginner
glossary. It is **not** a retelling. It is a **guided investigation written in
plain language.** Simple language is the means; investigative understanding is the
outcome.

**It is not optimised for word count.** It may run longer than the investor
version when explanation, analogy or context genuinely helps. A beginner may need
700 words to understand what an investor reads in 200, and that is fine. Optimise
for understanding per unit of reader effort, not for brevity.

## Think before you write (the most important part)

The blocks are the *output* of reasoning, not a template to fill. Before choosing
any block for a section, work through:

- What does a beginner not yet understand here?
- What would a beginner probably *think* is happening before reading this, and
  where is that wrong? Often the best teaching corrects a wrong model rather than
  adding facts. (Beginner: "Airtel grew, so Airtel must have made lots of money."
  Simple mode: "Not necessarily. The money may already have a job.")
- What wrong assumption are they likely to make?
- What everyday situation has the same underlying economics?
- What number (or comparison) makes the mechanism undeniable?
- What did management know and believe at the time?
- What happened next, and what actually changed?
- Have I already explained this idea earlier in the study?

Only then pick the block. A spec that says "question → paragraph → bigNumber →
callout → glossary" can be satisfied mechanically and still produce a beautiful
AI article. The reasoning above is what prevents that.

## Section depth (a thinking tool, not a paragraph plan)

For every major event, these layers help you find what the reader needs:

1. **What happened** — the plain-English event.
2. **Why it happened** — the business context, *and why the decision seemed
   reasonable to smart people at the time.*
3. **Everyday analogy** — only if the mechanism would otherwise need financial
   knowledge (see the analogy rule below).
4. **The company's numbers** — concrete evidence; prefer comparisons.
5. **Why the numbers matter** — the interpretation.
6. **Investor terminology** — named only *after* the idea lands (one or two new
   terms at most per event).
7. **Consequence** — what changed for the company or the shareholder.
8. **Transferable insight** — what the reader could recognise elsewhere.

**Do not walk these layers in prose.** They are a reasoning tool for deciding what
to include, not a paragraph order. Most events need only three to five of them; a
simple event may need one or two; a complex turning point may need more. The
finished section should read as one coherent explanation, never as "Layer 1,
Layer 2, Layer 3." Omit any layer that does not materially improve understanding.

A single event (Airtel buying Africa) can legitimately touch acquisition price,
debt, currency mismatch, operating economics, competition and valuation. That is
fine: **ration new *terminology* (one or two at a time), not the number of *ideas*
you explain in plain English.**

## Everyday mental models (analogies): a first-class tool

When a financial mechanism is hard to grasp, translate it into a concrete everyday
situation with the same economics, then return to the company and the number.

Pattern: **analogy → the company → the number → the term.**

| Mechanism | Everyday model |
|---|---|
| Capex vs free cash flow | ₹1 lakh salary → mortgage → household bills → little left to save |
| Currency mismatch | Borrow in dollars, earn in rupees; the rupee weakens and the debt gets heavier |
| Pricing pressure | Your restaurant charges ₹300; a rival sells the identical meal for ₹100 |
| A backdated regulatory bill (AGR) | A 15-year-old bill arrives after a court finally rules |
| Operating leverage | Your salary rises while your mortgage stays fixed; more of the rise is savings |

The table above lists reference patterns, not a required analogy inventory. Most
case studies should use fewer, and some sections need none.

**The analogy must preserve the economic *relationship*, not just the surface
situation.** "Airtel is like a highway" is visual but teaches nothing. The salary
example works because `income → fixed commitments → leftover cash` maps exactly
onto `revenue → capex and debt → free cash flow`. That mapping is the bar.

**Restrictions (this is what keeps it from becoming slop):**

- Use an analogy **only when** the reader would otherwise need finance knowledge
  to understand the mechanism.
- **Do not** use one when the concept is already intuitive from the business
  itself.
- **Never** use one merely to make the prose more entertaining.
- Ration them across a study, and **retire an analogy once it has taught its
  concept** — do not keep returning to the salary story every few hundred words.

## Explain before you name (core pedagogical rule)

Never introduce an investor term before the reader understands the idea. The order
is always: **plain situation → the company's example → name the concept →
(optional) short definition.** Example:

> Your salary rises but your mortgage stays the same, so more of the extra pay
> becomes savings. Airtel's network works the same way: once it is built, extra
> revenue meets barely-higher costs. Investors call this
> `[[operating leverage|…|…]]`.

The inline glossary chip carries the naming and the definition; the prose does the
teaching.

## Why did management do this? (avoid hindsight bias)

A beginner should never be taught "they bought Africa and it was bad." They should
understand *why intelligent management would ever make that choice.* For every
major decision, consider: what were they trying to achieve, what did they believe,
which assumption turned out wrong, and what was outside their control.

**Do not invent management's beliefs.** Attribute a belief, intention or
expectation to management only when a contemporaneous statement, filing, interview
or investor presentation supports it. Otherwise describe it as *the apparent
strategic rationale*, not as a fact about what they believed. "Management believed
Africa would diversify revenue" is a factual claim and needs a source; "the deal
was pitched as a way to diversify beyond a maturing Indian market" is a safe
description of the apparent rationale.

**Source hierarchy for ex-ante and rationale claims** (best first): a
contemporaneous company filing or investor presentation; management commentary or
an interview from the time; a regulatory filing or order; reputable contemporaneous
reporting; and last, later retrospective analysis. Prefer contemporaneous evidence
when reconstructing what was knowable at the time, and keep it clearly distinct
from later interpretation.

## Knowable vs unknowable (use it when the case earns it)

When the case supports a meaningful ex-ante analysis, separate what an investor
could realistically have known at each point in time from what they could not,
and date it. For Airtel:

- **Knowable in 2010**: the acquisition price, the debt taken on, Africa's
  operating conditions, the currency exposure.
- **Knowable in 2016**: Jio had entered; pricing and ARPU were falling.
- **Knowable in 2019**: the AGR dispute existed.
- **Not knowable**: exactly how the Supreme Court would eventually rule.

This is potentially the most distinctive thing a Fathom case study teaches. But
**do not manufacture the distinction** when the evidence does not support it. Some
cases have no interesting information boundary; forcing "what investors could have
known in 2014…" onto them produces filler.

## Counterfactuals (only when they sharpen cause and effect)

When they clarify causality, ask *what would have happened if X had not happened?*
(Without Africa, would the debt have stayed manageable? Without Jio, would ARPU
have held?) **Never add a counterfactual because this file mentions
counterfactuals.** Add it only where it makes a causal link clearer.

## The evidence (not "the tell")

Extract the **smallest set of numbers, disclosures, events or decisions** needed to
reveal the mechanism. The evidence can be one number, several weak signals that
only cohere in hindsight, a filing disclosure, a strategic decision, or an industry
event. **Prefer comparisons and relationships over isolated numbers** — `₹202 →
₹104` teaches more than either figure alone; `₹1,123 crore vs ₹23,045 crore` is the
evidence, not either number by itself. **Never show a number without answering
"compared with what?" or "why does this matter?"** A bare `₹66,000 crore` teaches
nothing; the same figure against a decade of near-zero free cash teaches the whole
turn.

## Anti-redundancy (essential)

- Explain each core concept fully **once**; later references build on it, they do
  not redefine it.
- Do not restate the central thesis after every section.
- Do not repeat a number unless its meaning has changed.
- Do not repeat a causal chain in prose after you have shown it visually.
- Retire an analogy once it has done its teaching.
- Do not use "mental model", "key takeaway", "what this teaches us" as repeated
  section labels.
- The closing synthesis **connects** the pieces; it does not re-explain them.

## The macro arc (seven beats)

These describe the *whole study*, not the structure inside a section.

1. **The puzzle** — what does not make sense? (Airtel grew for 13 years while its
   stock went nowhere.)
2. **The setup** — what the business looked like before things changed.
3. **The decisions and events** — what happened, in order.
4. **The mechanism** — why those events produced the outcome.
5. **The evidence and ex-ante view** — what numbers and signals showed it, and,
   *where the case earns it*, what an investor could actually have known at the
   time.
6. **The reversal / outcome** — what changed, and why. This is the **analytical**
   centre (the economics changed), not a dramatic one. Give enough setup that the
   change is understood, not merely felt.
7. **The pattern** — what the reader should recognise elsewhere.

## The pattern (the ending)

Close with **one primary pattern plus two to four supporting mental models.**

- **Primary pattern** — what the case is fundamentally about. For Airtel: growth
  does not create shareholder value unless the business can keep the economics of
  that growth.
- **Supporting mental models** — reusable ideas the reader picked up on the way.
  For Airtel: debt makes growth dangerous; revenue is not cash; pricing power sets
  customer economics; fixed costs create operating leverage.

**The primary pattern must emerge from the evidence; never choose it first and
bend the case to fit it.** If the numbers point at debt, do not force a
pricing-power lesson because pricing power is tidier.

The supporting models must be **reusable ideas, not a recap of the case.** "Africa
was expensive, Jio hurt Airtel, AGR caused losses" is a summary and fails this
test. Then close with the `graduate` glossary, as in reports.

## Structure, not rigid rules

- **One dominant question per section.** Use visual anchors only where they make
  the reasoning easier to see. A section may carry zero, one, or several visuals,
  depending on the complexity of the idea. Never manufacture a visual to hit a
  count.
- **One dominant causal structure per study.** It may be chronological, causal,
  competitive, financial, or decision-based. Use `flow` when it genuinely
  represents that structure (dates in `sub` for a timeline); do not force a
  timeline onto a study whose logic is a causal tree.
- **Dated section headers** are right for chronological studies ("5 September 2016:
  Jio launches"). Mix them with question headers.

## Section-map (case-study anatomy → blocks)

| Case-study field | Simple treatment |
|---|---|
| `title` / `period` / `summary` | `hero`: lead = the puzzle, `flow` = a small before→after motif, close = the stakes |
| `keyNumbers` | the anchor numbers → `bigNumber` / `bigStat` / `compare`; prefer relationships |
| `intro[]` | folds into the hero and the first section |
| `sections[]` (chapters) | the numbered journey; each chapter → one dominant question + the layers it needs |
| `section.scorecard` (grew / worsened / shareholder) | `split` or `thesis` |
| `section.lens` (recurring questions) | the section `question`, or a `callout` |
| `evidence` | the smallest set of numbers/relationships → `bigNumber` / `compare` / `callout` |
| `exhibits` (filing images) | stay investor-only; at most one "the filing said X" `callout` |
| `exAnte.tells` | beat 5: a `flow` of dated tells or `insight` lines, split into knowable vs unknowable where it earns it |
| `patternCard` | beat 7: the closing reusable-pattern card |
| `timeline` | a `flow` chain (date in `sub`) |
| `lesson` / `remember` | the closing `bigIdea` / `thesis` |
| `evidenceNotes` (`[^n]`) | see "sources" below |

## Sources and trust

Simple mode is simpler, not less trustworthy — evidence is part of Fathom's brand.
Remove the distracting inline `[^n]` footnote markers from Simple prose, but keep
every number traceable to the study's own `keyNumbers` / `evidence` / `timeline`.
**Until a dedicated "source / see filing" affordance exists, do not invent new UI
for it.** Keep the data honest and traceable internally, use the existing
evidence/source infrastructure, and add the affordance only when a study genuinely
needs it. Do not modify the UI while the job is writing content.

## Voice (case-study layer)

Base voice unchanged (EXPLAIN-SIMPLY.md, `ANTI-AI-SLOP.md`). For a study:

- Tell it in the structure that best explains the case, plainly. Chronology,
  causality and evidence should do the work.
- **No hindsight smugness.** Never "obviously it would collapse." The point of the
  ex-ante beat is that it was *knowable*, not that it was obvious.
- **Do not moralise.** Avoid "the lesson here is…", "this teaches us…". State the
  pattern once, as a fact, at the end.

## Checklists

Run the content QA **before** the engineering checklist. A study can pass every
grep and still fail the reader.

**The 60-second friend test (the final editorial gate).** Could the reader explain
the story to a friend in a minute, in plain words, without jargon? For Airtel:
*"Airtel kept growing, but the money got eaten by acquisitions, network spending,
debt and a price war. Then the weaker telcos disappeared, prices rose, and because
the network was already built, more of the extra revenue turned into cash."* If the
reader can say that naturally, without sounding like they are reciting an article,
Simple mode worked. **If this test fails, the study does not ship, no matter how
many other checklist items pass.**

**Reader test** — after reading, can a financially inexperienced reader:
- [ ] follow the whole thing *without opening the glossary* (the glossary should
      reinforce, not be a crutch)?
- [ ] explain what happened, and why?
- [ ] explain why management's decision made sense at the time?
- [ ] explain the important number or relationship and why it matters?
- [ ] explain the causal chain to someone else?
- [ ] tell what was knowable from what was not (where the case has that boundary)?
- [ ] apply the pattern to a different company?

**Redundancy test**
- [ ] Every major idea has one primary explanation.
- [ ] No section redefines a term already taught.
- [ ] No conclusion repeats an earlier one in different words.
- [ ] Every sentence adds understanding, evidence, or narrative progress; cut the rest.

**Engineering** (the global voice/style rules in EXPLAIN-SIMPLY and ANTI-AI-SLOP
still apply; not repeated here)
- [ ] Every number traces to the study's own data.
- [ ] Terms taught before named; closing `graduate` glossary present.
- [ ] AI-tell scan zero (swap the path to the case-study file).
- [ ] `npm run build` green; reads cleanly at phone width.

## Rollout

Airtel's case study (`data/case-studies/airtel-the-lost-decade-2007-2020.json`) is
the worked reference. Do the rest one at a time, each verified against the reader
and redundancy tests, not just the build. Cautionary tales (Jet, Suzlon, Mahindra)
first: the knowable-vs-unknowable beat lands hardest when the ending is a collapse.
