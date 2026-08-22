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
- [SIGNALS-CHECKLIST.md](SIGNALS-CHECKLIST.md) How to write a signal
  (`data/signals/*.json`): explain a market-moving event as a change to business
  economics, not as news.
- [ANTI-AI-SLOP.md](ANTI-AI-SLOP.md) How to keep prose sounding like a teacher, not
  a machine: ration three-part structures, rhetorical opposites, formulaic
  transitions and quotable-line density. Applies to every format.

## When to use which

| Task | Read first |
|---|---|
| Judge whether a business is worth writing up | MENTAL-MODELS-CHECKLIST |
| Write or edit a sector explainer | WRITING-GUIDE |
| Write a company report (`data/*.json`) | MENTAL-MODELS-CHECKLIST to judge it, then REPORTS-VOICE for how it reads |
| Write a case study | WRITING-GUIDE, then EDITORIAL-CHECKLIST to verify |
| Write a signal | SIGNALS-CHECKLIST |
| Final voice pass on any prose | ANTI-AI-SLOP |
