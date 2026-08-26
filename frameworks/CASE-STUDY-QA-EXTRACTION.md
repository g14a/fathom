# Case study Q&A extraction

How to author the `answer` and `faqs` fields on a case study
(`data/case-studies/*.json`). Companion to
[EXPLAIN-SIMPLY-CASE-STUDIES.md](EXPLAIN-SIMPLY-CASE-STUDIES.md).

## Core principle

Do not ask "what FAQs can we add for SEO?" Ask: **"What questions would someone
need answered to genuinely understand this company's story?"** Then make those
answers exceptionally clear. SEO is the consequence of that, never the reason.

The fields render as: `answer` = the "The short answer" block at the top of the
study; `faqs` = the "Questions people ask" section (each `q` becomes an H3) plus
FAQPage structured data.

## Process

1. **Read the whole study first** (title, summary, keyNumbers, every section,
   timeline, lesson). Note the central narrative, the major decision, the
   consequences, the turning point, the surprising fact, the outcome, and every
   load-bearing number/date/entity. Never write questions from the intro alone.
2. Privately state the story in one line: "This study explains why ___ happened
   to ___." That sentence anchors the whole selection.
3. Generate causal question candidates (Why did… / How did… / What caused… /
   What went wrong… / What changed… / How much… / Did it work…). For each major
   section ask: "if a reader stopped here, what would they want to know?"

## What to select (5-8 questions, quality over count)

Aim for a balanced set; include these where the study supports them:

- **The decision question** — why did management act? (why buy Zain, why enter
  telecom). Readers want to know how management thought, not just what happened.
- **The what-went-wrong question** — why did it fail / struggle (only if it is a
  failure/underperformance story).
- **The what-changed / turning-point question** — what flipped the economics.
- **The did-it-work / outcome question** — the verdict, when evidence supports one.
- **A causality question** — how competition / regulation / currency / debt
  changed the economics.
- **A financial-consequence question** — how much was lost, what happened to
  margins / debt / market share.
- **The surprising question** — the counterintuitive tension the study reveals
  (revenue grew but shareholders waited; a record loss was mostly one backdated
  bill; the company recovered but the shareholder didn't). Every study should
  have at least one.

Counts: short study 3-5, normal 5-8, deep 8-12, hard max 15. Publish four if only
four are genuinely valuable.

## Answer rules

- **Direct answer in the first sentence.** Structure: direct answer → supporting
  mechanism → the evidence (number/date) → optional nuance.
- **50-120 words each** (40-80 simple, 80-120 for the big causal ones). Do not
  re-tell the whole study.
- **Preserve causality: Event -> Mechanism -> Consequence.** Do not just list
  facts. Weak: "Jio launched. Airtel cut prices." Strong: "Jio's free launch
  forced a price war, so Airtel cut tariffs to hold its base, which roughly
  halved revenue per user and delayed the recovery."
- **Include specific evidence** from the study: deal values, dates, percentages,
  debt, share, revenue, the regulatory decision.
- **Separate fact from interpretation.** State facts plainly; mark Fathom's
  reading as a reading ("the problem was…", "in hindsight…") rather than as an
  independently established fact.

## Do not

- Fabricate anything: numbers, dates, causes, management motives, outcomes,
  quotes, sources. If a great question has no support in the study, drop it (or
  note it as a content gap for the editor); never invent the answer.
- Ask generic company-profile questions (what is X, when founded, who owns, stock
  price) unless the story genuinely turns on it.
- Waste a slot on the question the page title already answers directly (that lives
  in the top `answer` block).
- Keyword-stuff. "Why did Airtel's Zain Africa acquisition deal failure happen?"
  is wrong; "Why did Airtel's Zain Africa deal fail?" is right.
- Publish two questions whose answers are >70% the same. Combine or differentiate.
- No em-dashes, no spaced-hyphen punctuation (house rule).

## Final test per question

Human (would a smart reader want this answered?), Search (would someone type it?),
Fathom (do we answer it unusually well?), Evidence (can we substantiate it from
the study?), Distinctiveness (does it add something the others don't?), Concision
(clear in 50-120 words?). Fail multiple, cut it.

## The bar

Someone finishing the `answer` plus the FAQs should be able to explain, in plain
words: what happened, why, why the decision made sense at the time, what changed,
what it cost, and what to recognise elsewhere. The Airtel study
(`airtel-the-lost-decade-2007-2020.json`) is the reference.
