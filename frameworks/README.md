# Fathom Frameworks

Local-only reference for how Fathom content is written and judged. These files are
**guidelines, not content**: they are never imported, rendered, or shipped to the site.
They sit outside `app`, `lib` and `data` on purpose. Everything here obeys and extends
the voice, formatting and honesty rules in the repo `CLAUDE.md` (no em-dashes, no spaced
hyphens, beginner voice, never fabricate).

Two kinds of file live here: **mental models** (how to think about a business) and
**writing/editorial guides** (how to write and verify a piece of content).

## Mental models

- [MENTAL-MODELS-CHECKLIST.md](MENTAL-MODELS-CHECKLIST.md) The business-judgment
  framework. Four lenses (Quality, Capital, Valuation, Risk) plus two outside proofs,
  23 models in all. Run it to reach a defensible verdict on any company before writing
  it up. Distilled from a full forensic dossier (the Kaspi.kz method).

## Writing and editorial guides

- [WRITING-GUIDE.md](WRITING-GUIDE.md) How to write and edit sector explainers
  (`data/sectors/*.json`). The base voice guide the other checklists build on.
- [REPORTS-VOICE.md](REPORTS-VOICE.md) The teacher voice for company reports
  (`data/*.json`): the narrator, the AI-tell blocklist, and the read-aloud test.
  Use it to keep reports from sounding like an AI analyst.
- [EDITORIAL-CHECKLIST.md](EDITORIAL-CHECKLIST.md) Fact-check and accuracy pass for a
  case study (`data/case-studies/*.json`). Verify, do not rewrite.
- [EDITORIAL-IMPROVEMENTS.md](EDITORIAL-IMPROVEMENTS.md) Editorial notes and improvement
  patterns for sector explainers and case studies.
- [SIGNALS-CHECKLIST.md](SIGNALS-CHECKLIST.md) How to *build* a signal
  (`data/signals/*.json`): the structural checklist. Explain a market-moving event as
  a change to business economics, not as news.
- [SIGNAL-VOICE.md](SIGNAL-VOICE.md) How a signal should *sound*: the News to obvious
  reading to hidden mechanism to prediction to evidence to lesson move, predict before
  evidence, ration metaphors, and the signal-specific AI-tell blocklist. Read it
  alongside SIGNALS-CHECKLIST when writing or editing any signal.
- [ANTI-AI-SLOP.md](ANTI-AI-SLOP.md) How to keep prose sounding like a teacher, not
  a machine: ration three-part structures, rhetorical opposites, formulaic
  transitions and quotable-line density. Applies to every format.
- [EXPLAIN-SIMPLY.md](EXPLAIN-SIMPLY.md) How to build the "Explain simply" teach-me
  reading of a company report (`data/companies/*.json` → `"simple"`): the block
  vocabulary, the reusable components, the inline glossary, the learning-journey
  order and the Simple-mode voice rules.
- [EXPLAIN-SIMPLY-CASE-STUDIES.md](EXPLAIN-SIMPLY-CASE-STUDIES.md) The companion for
  case studies (`data/case-studies/*.json` → `"simple"`): same blocks and components,
  but reframed as a *guided investigation*, not a retelling. Covers how to think
  before choosing a block, the section-depth layers, everyday analogies, "why did
  management do this", knowable vs unknowable, anti-redundancy, and the reader-test
  QA. Read EXPLAIN-SIMPLY first.
- [CASE-STUDY-QA-EXTRACTION.md](CASE-STUDY-QA-EXTRACTION.md) How to author the `answer` and `faqs` fields on a case study: pick the 5-8 questions that best explain the story (decision, what-went-wrong, turning-point, outcome, the surprising tension), answer each in 50-120 evidence-backed words, Event to Mechanism to Consequence. Never fabricate.

## When to use which

| Task | Read first |
|---|---|
| Judge whether a business is worth writing up | MENTAL-MODELS-CHECKLIST |
| Write or edit a sector explainer | WRITING-GUIDE |
| Write a company report (`data/*.json`) | MENTAL-MODELS-CHECKLIST to judge it, then REPORTS-VOICE for how it reads |
| Add an "Explain simply" reading to a report | EXPLAIN-SIMPLY (schema, components, journey), then ANTI-AI-SLOP for the voice |
| Add an "Explain simply" reading to a case study | EXPLAIN-SIMPLY-CASE-STUDIES (the story arc + section-map), which builds on EXPLAIN-SIMPLY |
| Write a case study | WRITING-GUIDE, then EDITORIAL-CHECKLIST to verify |
| Write a signal | SIGNALS-CHECKLIST to build it, then SIGNAL-VOICE for how it reads |
| Final voice pass on any prose | ANTI-AI-SLOP |
