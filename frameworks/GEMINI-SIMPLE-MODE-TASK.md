# Task prompt: write deep "Simple Mode" for Fathom case studies

Paste this whole file to Gemini (with repo access), one target study at a time.
It is self-contained: schema, rules, a gold-standard example, and the exact
thesis to build each study around.

---

## Your role

You are writing the **Explain Simply** reading for a Fathom equity-research case
study. Fathom is a static site that teaches Indian stock analysis to complete
beginners. Each case study has two readings: the **Investor** version (the full
research, already written) and the **Simple** version (your job).

**Simple Mode is not the research report in simpler words. It is a teaching
experience.** The reader should finish thinking: "I understand what happened, why
it happened, the mechanism, and what to look for in another company." They should
NOT think: "that was a comprehensive report written more simply."

A Simple case = **ONE important idea + ONE clear story + ONE economic mechanism +
a few decisive numbers + ONE reusable mental model.** Everything else stays in the
Investor version. Leaving research out is not a failure of Simple Mode; it is the
purpose of it.

## The depth bar (this is the part people get wrong)

Fewer ideas, taught deeply. NOT fewer words. Each section must actually *build*
the idea across full paragraphs, in this order every time:

> plain intuition -> a concrete everyday analogy (only if needed) -> the company's
> real number -> then, and only then, the investor term.

Never name a term before the reader understands the idea. Teach the factory at 60%
utilisation, *then* say "that is capacity utilisation." Ask "who is hurt more if
this ends?", *then* say "that is bargaining power."

- **8 to 9 sections. Roughly 1,500 to 2,000 words.** Finishable in one sitting.
- **One section = one job**, titled as a real reader question ("Why did the stock
  rise if earnings fell?"), never "Other things worth knowing."
- **Follow the reader's curiosity**: question -> answer -> new question -> answer.
- **Numbers prove, they do not decorate.** ~1 hero number or comparison per
  section, 1 to 2 supporting at most. Prefer `395 cr -> 985 cr` to a full annual
  series. If cutting a number does not weaken the point, cut it.
- **Company names are expensive.** Do not list five acquisitions when "the second
  deal was a bad one" is the causal point.
- **Analogies reduce load, never entertain.** 2 to 4 per case, each preserving the
  real economic relationship. Reuse the good ones: toll booth, house with a loan,
  idle factory, landlord and tenant, a busy vs empty market.
- **Preserve uncertainty and material caveats.** Simplify the explanation, not the
  truth. Keep any caveat that changes the conclusion.
- **The removal test** for every paragraph, number and name: *if I remove this,
  does the reader lose understanding, or only lose completeness?* If only
  completeness, cut it.

### The canonical arc (build every case on this)

surprise -> explain the business -> reveal the mechanism -> prove it with a few
numbers -> show the twist -> prevent the wrong lesson -> hand over a reusable
question -> the takeaway. The last one or two sections are the reader's takeaway
(a reusable question, then a one-line framework), not more narrative.

## The gold-standard example

Read `data/case-studies/jet-airways-the-market-leader-that-vanished-1993-2024.json`,
the `"simple"` object. It is the approved reference for depth, voice, section
shape and how each idea is built before its term is named. Match that quality.
Also read the full charter in `frameworks/EXPLAIN-SIMPLY-CASE-STUDIES.md`.

## Hard formatting rules (non-negotiable, enforced)

- **No em-dashes (`—`) anywhere.** Use commas, periods or parentheses.
- **No spaced hyphens (` - `) as punctuation.** Ranges use a plain hyphen with no
  spaces (`60-70%`, `FY22-23`).
- **Straight quotes only** (`'` and `"`), never curly.
- **Every number must already appear in that study's Investor content**
  (`sections`, `keyNumbers`, `evidence`, `timeline`, `exAnte`). Never invent,
  estimate silently, or round in a way that changes meaning. If a figure is not in
  the source, do not use it.
- This is educational content, never buy/sell advice. Explain, do not rate.

## Output: the `simple` object

Add (or replace) a top-level `"simple"` key in the study's JSON file. Shape:

```jsonc
"simple": {
  "hero": {
    "lead": "one-line hook stating the surprise",
    "flow": [                       // 2 to 4 rows; the puzzle made visible
      { "label": "Thing that rose", "sub": "how" },
      { "label": "The flat/bad outcome", "sub": "detail", "tone": "muted" }
      // use "tone": "accent" to mark a payoff row instead
    ],
    "close": "the one question the study answers"
  },
  "sections": [
    { "id": "kebab-slug", "question": "A real reader question?", "blocks": [ ... ] }
  ]
}
```

### Block types (discriminated by `kind`). Use `prose` for the teaching; use the
visual blocks where one carries the idea better than a paragraph.

- `prose` — `{ kind, text: string[], aside?: "In everyday terms" }`. The workhorse.
  `aside` shifts it into a calm analogy register.
- `insight` — `{ kind, text }`. One highlighted line, the takeaway of a build.
- `bigIdea` — `{ kind, text }`. One large closing statement.
- `bigNumber` — `{ kind, kicker?, from, to, fromSub?, toSub?, toTone?: "good"|"bad",
  label, insight, term? }`. One decisive move (`₹2,757 cr -> ₹16 cr`).
- `bigStat` — `{ kind, kicker?, value, label, tone?: "accent"|"bad" }`. One huge
  number that is itself the point.
- `split` — `{ kind, left, right, punch }` where each side is
  `{ tone: "good"|"bad"|"neutral", title, verdict, rows: string[] }`. Two things
  compared (e.g. IndiGo vs Jet).
- `thesis` — `{ kind, heading, items: [{ tone: "good"|"warn"|"bad", label, text }] }`.
  A colour-coded summary (e.g. three things that were broken).
- `flow` — `{ kind, steps: [{ label, sub?, tone?: "accent"|"muted" }] }`. A chain
  or sequence.
- `converge` — `{ kind, items: string[], result, cost }`. Parts feeding one costly
  thing.
- `tension` — `{ kind, a, b, resolve }`. Two things true at once, then the reading.
- `signals` — `{ kind, heading?, rows: [{ signal, where, meaning }], blindSpot? }`.
  The "what could you have seen, and when" table. Great for the ex-ante beat.
- `callout` — `{ kind, label?, text }`. A short aside.
- `analogy` — `{ kind, lead, body, term? }`. (Usually a `prose` with `aside` reads
  better; use this only if you want the boxed form.)
- `graduate` — `{ kind, intro, ctaLabel, glossary: [{ term, def, context? }] }`.
  ALWAYS the final block. `ctaLabel` is "Read the investor case study".

### Inline glossary chips (teach before naming)

Inside any string, attach a term as a quiet chip AFTER the idea has landed:

```
[[term|plain one-line definition|one line grounding it in this company]]
```

The third field is optional. Example, mid-sentence:
`... so more of the extra revenue is pure profit. That is
[[operating leverage|When most costs are fixed, extra revenue turns almost entirely
into profit.|An airline is almost pure operating leverage.]]`

Every term you teach inline should also appear in the closing `graduate.glossary`.

## Standard section skeleton (adapt, do not fill mechanically)

1. **The surprise** (`prose`) — the puzzle, set up richly enough to feel strange.
2. **The business / setup** (`prose`) — how it really makes money, in plain words.
3. **The mechanism** (`prose` + `insight`) — the one economic idea, taught intuition
   first, named at the end.
4. **Inside the company** (`prose` + a `bigNumber`/`split`) — the mechanism operating
   in the real numbers.
5. **The decisive number** — one comparison that proves it.
6. **The twist** — what makes this more than the textbook version.
7. **Prevent the wrong lesson** (`prose`/`tension`) — the short counterexample or
   limit. One compact example, not a second case study.
8. **Using this yourself** (`insight`) — the reusable question the reader can apply
   to another company.
9. **The takeaway** (`bigIdea` + `graduate`) — one memorable line, then the glossary.

## Per-study briefs (build each around exactly this ONE idea)

Do these one at a time. For each: read the study's Investor content for the facts
and numbers, then write the `simple` object to the same file, replacing any
existing one.

| File (in `data/case-studies/`) | The ONE idea | Anchor numbers to use (from its own Investor data) | Keep the memorable bits |
|---|---|---|---|
| `bse-the-toll-booth-boom-2023-2026` | An exchange is a toll booth: costs barely move while trading volume explodes, so profit explodes faster than revenue. The boom rests on derivatives volume the regulator wants to curb, so the same leverage runs in reverse. | profit `₹206 cr -> ₹2,487 cr` (FY23-FY26); revenue `₹925 cr -> ₹5,124 cr`; stock ~13x | toll booth; "owning a day of the week" (moving its weekly expiry to its own day) |
| `mahindra-the-65pc-fall-2018-2020` | A 68% fall that looked like the auto cycle was really capital allocation: a good core business was quietly funding loss-making subsidiaries. | fall ~68%; SUV share `23.8% -> 18.7%`; overseas-arm loss `₹5,200 cr+` (FY20); first quarterly loss in 19 years; ~15 businesses exited; the 18% return-on-equity-or-exit rule | shopkeeper funding failing relatives' shops; standalone vs consolidated profit gap |
| `cupid-the-rerating-machine-2023-2026` | A ~90x stock did not need a ~90x business: profit grew ~4x, the multiple grew ~22x (22 x 4 ≈ 90), and the multiple re-rated on a new owner BEFORE the earnings arrived. | EPS `₹0.24 -> ₹1.02` (~4.3x); P/E `~13x -> ~288x` (~22x); revenue `₹183 cr -> ₹390 cr`; stock ~90x | phase one (opinion moves) vs phase two (earnings arrive) |
| `suzlon-the-sadness-2008-2026` | A business can recover completely while its original owners are left behind: it survived crushing dollar debt only by issuing new shares round after round, diluting the 2008 shareholder to almost nothing. | price ~₹48; market cap ~₹65,600 cr; shares ~1,363 crore; peak debt over ₹13,000 cr | dollar-loan-rupee-income currency trap; a pizza re-cut into ever more slices |
| `asian-paints-distribution-machine-2000-2026` | The moat is distribution, not the product: tinting at the dealer counter plus fast replenishment let dealers stock every colour with less cash, so they push the brand. | 169,000+ retail touchpoints; FY26 revenue `₹30,680 cr`; FY26 free cash flow `₹5,567 cr`; Birla Opus ~10%+ share, ~40% of new capacity | the tinting counter; the availability -> recommendation -> volume flywheel; working capital |
| `nse-vs-bse-the-moat-that-moved-1875-2026` | Liquidity (the crowd) is the moat: technology opened the door but the crowd kept BSE out. BSE even launched derivatives first and still lost, because traders were on NSE. | founded 1875; Aug 1996 monthly turnover BSE `~₹480 cr` vs NSE `~₹1,035 cr`; NSE overtook in ~2 years; today ~93% vs ~7%; 20+ years near-zero BSE derivatives | two markets across the road (busy vs empty); the liquidity flywheel |
| `what-happened-to-the-paint-industry` | The stock fell while earnings ROSE, so the multiple fell (a de-rating), because returns (ROCE) had been fading for a decade; new competition was the accelerant, not the cause. | Asian Paints EPS `₹22.5 -> ~₹45` (FY19-FY26); stock about -27% from 2022 peak; P/E `~110x -> ~53x`; ROCE `~42% -> ~26%`; Birla Opus `₹10,000 cr`, ~40% of capacity | "cheaper is a question, not a bargain"; separate earnings fall from multiple fall |
| `cg-power-what-survived-2020-2026` | The ₹5-to-₹863 rise was three stacked repricings (survival, then real earnings recovery, then multiple expansion); only the middle one is the business proving itself. Tighten the existing long version to 8-9 sections. | ~₹4.7 low; equity ~₹300 cr vs borrowings ₹2,757 cr; ₹8.56 rescue price; borrowings `₹2,757 cr -> ₹16 cr`; FY21 profit ₹1,280 cr mostly a ₹737 cr deferred-tax write-back; margin `~4% -> ~14%`; P/E ~107; ₹863 | equity as the leftover slice after lenders (house with a loan) |
| `crompton-greaves-the-one-good-deal-2005-2020` | One brilliant deal (Pauwels) was mistaken for a repeatable formula, funding a debt-fuelled spree of deals that lacked what made the first one work. Tighten the existing long version to 8-9 sections. | Pauwels ~€32m (~₹200 cr), doubled the company; utilisation ~60% -> ~95%; borrowings `₹395 cr -> ₹985 cr`; Power Systems profit `₹807 cr -> ₹239 cr` (FY11-FY12) | "you are paying to skip the decade"; the idle factory; five ingredients that aligned once |

## Self-check before you finish each study (all must pass)

1. State the central lesson in ONE sentence. Does every section support it?
2. 8 to 9 sections, roughly 1,500 to 2,000 words, one dominant question each.
3. Every term is taught before it is named; every taught term is in `graduate.glossary`.
4. Every number appears in that study's Investor content. No invented figures.
5. Run the removal test on each section: cut anything that only adds completeness.
6. No `—`, no ` - ` punctuation, no curly quotes. Grep the file to confirm.
7. Valid JSON, and the study still parses.

Deliver one file at a time so each can be reviewed against the Jet bar.
