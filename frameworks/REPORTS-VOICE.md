# Fathom Reports Voice

Reference for the voice of company reports (`data/*.json`, the `TickerReport`
prose). Sector explainers have their own guide (`WRITING-GUIDE.md`); this one is
for the per-company reports. It sits on top of the voice, formatting and honesty
rules in the repo `CLAUDE.md` (no em-dashes, no spaced hyphens, beginner voice,
never fabricate, no buy/sell rating) and the no-repeat rule in `CLAUDE.md`, plus
`ANTI-AI-SLOP.md` in this `frameworks/` directory, which still apply in full.

The problem this file fixes: the reports read like a competent sell-side analyst
or an AI. Correct, neutral, balanced, and lifeless. The case studies and the
Understand pages already have the voice we want. This file makes the reports match
them.

The one test that catches almost everything: **read the field aloud.** If it
sounds like a person teaching a curious friend, keep it. If it sounds like a
research terminal or a press release, rewrite it.

---

## Who is talking (the narrator)

Fathom is one teacher, not a committee and not a wire service. Picture a specific
person: someone who has read the filings, has a view, respects your intelligence,
and refuses to hide behind jargon. Patient, a little dry, occasionally funny,
never breathless. The kind of teacher who says "here is the part that fooled
everyone" and means it.

The narrator is allowed to:
- have an opinion and say it plainly,
- admit what they do not know,
- be amused, unimpressed, or quietly impressed,
- talk directly to the reader.

The narrator is not allowed to:
- tell you to buy or sell anything,
- hedge every sentence into mush,
- perform certainty they have not earned.

## Person and address

- Write to **"you."** The reader is in the room. "You are paying 46 times earnings"
  beats "the stock trades at 46 times earnings."
- Use **"I"** sparingly, for a genuine judgement or doubt: "I think this drifts
  sideways and pays you to wait. I would be wrong if taxes freeze." One or two per
  report, not more.
- Never "we" in the corporate sense. Fathom is a person here, not a firm.

## The hook (the `oneLiner`)

The `oneLiner` is the first thing the reader sees. It is a hook, not an abstract.

- **Short enough to say in one breath.** If you run out of air reading it aloud,
  it is too long. Aim for one clear idea, not a comma-spliced paragraph.
- Lead with the tension or the surprise, in plain words. Numbers can follow.
- Bad (real, before): "A near debt-free business earning 29% on equity and
  yielding 5.2% is being sold like a sin stock because 80% of operating profit
  still comes from cigarettes that the government keeps taxing harder, so it trades
  like a high-yield income asset even though its earnings stay exposed to tax,
  volume and multiple risk." (60 words, one breath impossible.)
- Good: "It earns 29% on equity and pays you 5% a year to wait, and the market
  still treats it like a problem. The problem has a name: cigarettes, and a
  government that taxes them harder every couple of years."

## One analogy per report

The Understand pages teach with a tea stall and an umbrella shop. Reports have
none. Give each report **one** concrete analogy, tied to this specific company,
and reuse it as the spine. Not three competing metaphors. One, that a reader
remembers a week later.

- A bank lends *your* money. A hotel room rots at midnight. A toll booth gets paid
  whether or not you enjoy the drive.
- Tie it to the real company immediately, then let it recur once or twice. Do not
  scatter fresh metaphors in every field.

## Rhythm

The reports are rhythmically flat: every sentence is 15 to 25 words. A teacher
varies the beat.

- Let a short sentence land after a long one. "That saved the company. It did not
  save the shareholder."
- One idea per sentence where the idea is important. Stack clauses only when the
  reader can carry them.
- Read a whole field aloud. If it is a metronome, break it up.

## Opinion and doubt, in human words

- Earn **one clear opinion** per report, stated like a person, not a ratings
  machine. Not "odds slightly favour the base case." Instead: "My honest read: this
  is a patient income holding, not a story stock, and pretending otherwise is how
  people get bored and sell at the bottom."
- Earn **one honest admission** of what you cannot know: "Nobody can tell you when
  the next tax raise lands. That uncertainty is the price of the yield."
- Doubt is not hedging. Hedging is refusing to commit anywhere. Doubt is committing
  and naming the one thing that would change your mind.

## Ask the reader something

At least once per report, ask the reader a real question and then answer it, the
way the case studies do ("How can that be?"). It turns a lecture into teaching.

---

## The AI-tell blocklist

These are the constructions that make the current reports sound generated. Grep
for them before shipping. The point is not a mechanical ban; it is that each one is
a place where the writing stopped thinking and reached for a template.

### 1. Rule-of-three anaphora
The single worst tell. Three parallel clauses hammering the same word.
- Before: "the core stays cigarettes, the core stays tax-exposed, and the core
  stays capped."
- After: "The core is still cigarettes, and cigarettes are still where the tax
  lands. That ceiling is the whole story."
- Grep: repeated sentence-initial phrases, "X stays A, X stays B, X stays C".

### 2. "It is not X, it is Y" (overused)
Fine once. Deadly as a verbal tic.
- Grep: `is not a .*, it is`, `not X but Y` repeated across fields.
- Fix: say the thing directly. "This is an income holding" beats "this is not a
  growth story, it is an income holding."

### 3. Throat-clearing narration
- "The entire tension is this." "The useful question is." "What you have to
  understand is." "Here is the part that matters."
- Fix: just say the tension. The reader does not need to be told a point is coming.
- Grep: `entire tension`, `the useful question`, `what you have to`, `here is the`.

### 4. Balanced-hedge endings
Every section resolving to a perfectly weighted shrug.
- Before: "Odds are slightly in the favour of the base case, but the upside is
  limited and the downside is real."
- After: "I think you get paid to wait and not much more. If you need excitement,
  this is the wrong stock."
- Grep: `odds .* favour`, `slightly`, `on balance`, `broadly`, `that said`.

### 5. Uniform sentence length
Not greppable, but the most pervasive. If you cannot hear any short sentences when
you read a field aloud, it is machine-flat. Break one clause off into its own line.

### 6. Empty intensifiers with no number
"Strong growth", "robust performance", "significant upside", "hugely profitable."
- Fix: attach a number, or cut the adjective. "Robust" with no figure is noise.

### 7. Twin summaries
The `summary`, `remember`, `engine.verdict` and `oneLiner` all re-arguing the same
sentence. See the no-repeat rule in `CLAUDE.md`. Each slot has one job.

---

## Which fields carry the voice

Not every field is prose. Labels, hints and table cells stay terse and factual.
The voice lives in the connected-prose slots:

`oneLiner`, `overview`, `editorial.whyExists`, `editorial.whyNotAlreadyWon`,
`editorial.whyNow`, `editorial.remember`, `business.qualityVerdict`, `moat.note`,
`narrative`, `priceAction`, `engine.earnings`, `engine.multiple`, `engine.verdict`,
`lenses[].reading`, `summary`.

For terse fields (metric `hint`, checklist `note`, segment `marginProfile`): stay
factual and short. A `hint` is a caption, not a paragraph. Do not force voice into
a number's caption.

Keep the no-repeat rule: state each idea once, in the slot that owns it (see the
table in `CLAUDE.md`). Voice does not mean saying the thesis more times; it means
saying it once, memorably.

---

## Before and after (the target)

Before (real, `engine.verdict`, ITC):
> "Earnings engine is real but slow. Multiple is not compelling because it is
> already discounted for the risks. ... Odds are slightly in the favour of the base
> case (patience rewarded), but the upside is limited and the downside is real."

After (the voice we want):
> "So here is my honest read. The earnings engine runs, just slowly, and the market
> has already marked the stock down for the tax risk, so there is no cheap surprise
> waiting. You are buying a 5% cheque and the patience to keep holding it. That is a
> fine thing to own if you know that is what it is. It is a miserable thing to own
> if you were hoping for a growth stock in disguise."

Note what changed: "you" is in the room, the sentences vary in length, there is one
plain opinion, no rule-of-three, no balanced-shrug ending, and it teaches the
reader what kind of thing they are looking at instead of rating it.

---

## The checklist before shipping a report

1. Read every prose field aloud. Does a person teaching a friend come through?
2. Is there **one** analogy, tied to this company, running through it?
3. Grep the AI-tell list. Zero rule-of-three. No throat-clearing. No balanced
   shrugs.
4. Is there one plain opinion and one honest admission of doubt, in human words?
5. Does the `oneLiner` fit in one breath?
6. Do short sentences exist? Is the rhythm varied?
7. No buy/sell rating anywhere, in any field. The stance is about the business.
8. No-repeat rule holds: each idea lives in one slot.
