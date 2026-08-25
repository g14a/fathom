# Explain Simply — build guide

How to add an "Explain Simply" reading to a company report. Read this before
writing one; it saves re-deriving the schema, the components and the voice.

## What it is

Every report page has a mode toggle: **Investor** and **Explain simply**.
Investor mode states the conclusions. Simple mode is the *teach-me* mode: it
walks a complete beginner up to those same conclusions from first principles,
using the company itself as the teaching example.

Two things make it work, and both are non-negotiable:

1. **It is a sequence of visual objects, not an article.** Each section answers
   one question and carries one visual anchor (a big number, a comparison, a
   flow, a decision tree). Prose is the exception, used only when nothing visual
   will do.
2. **It teaches the concept before it names it.** Give the reader the situation
   and the intuition, then attach the investor term as a quiet inline chip. It
   may run *longer* than the investor report. Never simplify by deleting a
   concept; simplify by explaining it.

It is authored data, like everything else on Fathom. No runtime, no AI at
render time. It builds to static HTML.

## Where things live

| Thing | File |
|---|---|
| Schema (`SimpleReportData` + block union) | `lib/types.ts` |
| Renderers + `rich()` glossary parser | `components/SimpleReport.tsx` |
| The mode toggle shell | `components/ReportShell.tsx` |
| Inline glossary chip | `components/InlineTerm.tsx` |
| The one "aha" reveal | `components/Reveal.tsx` |
| Scroll-animated cash flow | `components/SimpleMoney.tsx` |
| "Read the investor version" button | `components/GraduateCTA.tsx` |
| All styling (the `.s-*` namespace) | `app/globals.css` |
| The content itself | `data/companies/<SLUG>.json` → `"simple"` |

The report page renders both modes into the static HTML and the toggle flips
visibility, so SEO and crawlers see the full investor report. **The components
are generic**: to add Simple mode to a new company you only write JSON. You
touch a component/CSS only when you genuinely need a *new* kind of visual.

## How to add it to a company

1. Write the investor report first. It is the source of truth. List its major
   conclusions, the numbers that prove them, the risks, and every term a
   beginner would not know.
2. Add a `"simple"` object to `data/companies/<SLUG>.json` (see schema below).
   Build the learning journey: one question per section, one visual per section.
3. Every figure must trace to a value already in the investor report. Do not
   invent numbers.
4. `npm run build` and open the page, switch to Explain simply.

### Pre-ship checklist

- [ ] `grep -rn "—" lib data app` is empty (no em-dashes). No ` - ` as
      punctuation either.
- [ ] Every number in Simple mode appears in the investor report.
- [ ] Each section answers exactly one question and carries one visual anchor.
- [ ] Every investor term is taught *before* it is named, and named once as an
      inline `[[term|def|context]]` chip.
- [ ] The closing `graduate` glossary lists the terms taught, each with a def.
- [ ] Voice: run the AI-tell scan (below). All zero.
- [ ] `npm run build` is green and the page generates.
- [ ] Read it on a phone width. Nothing overflows (the layout is fluid).

## The schema

```
simple: {
  hero:  { lead, flow[], close }
  sections: [ { id, question, teaches?[], blocks[] } ]
}
```

- **hero** — the mental model in the first few seconds. `lead` is one line;
  `flow` is the funnel the hero map is built from (`You → apps → Company → …`,
  mark the company node `tone:"accent"`); `close` is the one-line payoff.
- **section** — `id` (stable slug), `question` (the section header, an actual
  question), optional `teaches` (currently not rendered), `blocks`.

### Block types (the visual vocabulary)

Reuse these. Do not invent a new block unless the story truly needs a shape none
of these give. Discriminated union on `kind`:

| kind | what it is | key fields |
|---|---|---|
| `prose` | short paragraphs; the escape hatch | `text[]` |
| `bigIdea` | one large centred statement (a payoff line) | `text` |
| `insight` | one highlighted line, teal left-rule | `text` |
| `flow` | vertical steps joined by arrows (a chain, a history) | `steps[]` of `{label, sub?, tone?}` (`tone:"accent"` = payoff, `"muted"` = dim) |
| `converge` | parts feeding into one costly thing | `items[]`, `result`, `cost` |
| `compare` | before/after, e.g. 12 → 3 (side by side on desktop) | `before`, `after` = `{year, count, unit, players[], caption}`, `punch` |
| `bigNumber` | one number that moved, e.g. ₹104 → ₹257 | `from`, `to`, `fromSub?`, `toSub?`, `delta?`, `label`, `bars?`, `insight`, `term?` |
| `bigStat` | one huge number that IS the point, e.g. 46x | `value`, `label`, `tone?` (`accent`/`bad`) |
| `moneyFlow` | "where ₹100 goes"; leftover is the hero; animates on scroll | `totalLabel`, `totalDisplay`, `parts[]` `{label,value,display,tone:"spent"|"left"}`, `punch` |
| `reveal` | the one conversational "aha", payoff always visible | `prompt`, `calc?`, `bigAnswer`, `sub?`, `note` |
| `split` | two columns compared (business vs stock, Airtel vs Jio) | `left`, `right` = `{tone:"good"|"bad"|"neutral", title, verdict, rows[]}`, `punch` |
| `analogy` | plain analogy that ends in the real term | `lead`, `body`, `term?` |
| `tension` | two things true at once; the engine of judgement | `a`, `b`, `resolve` |
| `branch` | a decision tree (rival cuts price → match or hold) | `trigger`, `decision`, `options[]` `{label, outcome, tone?}` |
| `callout` | a short "why this matters" aside | `label?`, `text` |
| `thesis` | closing colour-coded summary (good/warn/bad dots) | `heading`, `items[]` `{tone, label, text}` |
| `graduate` | the Simple → Investor bridge + interactive glossary | `intro`, `glossary[]` `{term, def, context?}`, `ctaLabel` |

Any string field above may embed inline glossary chips (see below). Use at most
one `reveal` per report. Prefer a visual over a `prose` block wherever a visual
can carry the idea.

### Inline glossary chips

Terminology appears only *after* the idea lands, as a quiet inline chip, never a
box. Markup, inside any string field:

```
[[term|plain definition]]
[[term|plain definition|Company-specific line grounding it]]
```

Rendered by `rich()` in `SimpleReport.tsx` into an `InlineTerm` (a `<span>`, not
a `<button>` — button text drops from the clipboard, which made terms look like
they vanished when copied). Hover / focus / tap reveals the definition and the
"For this company" line. The closing `graduate.glossary` reuses the same chip so
the vocabulary is one consistent system end to end.

## The learning journey (reference order, from BHARTIARTL)

Roughly 10-12 sections, each a question, each teaching a concept before naming
it. Vary which visual leads each section so the scroll does not feel repetitive.

1. What does it do? (the network, recurring revenue)
2. Why can't a rival copy it? (converge visual → capital intensity, barriers)
3. Why did it struggle? (history flow → price war)
4. What changed? (12 → 3 compare + the undercut mechanism → oligopoly, pricing power)
5. Why does a small change matter? (bigNumber + reveal → ARPU)
6. Why does that become profit? (toll-road flow → fixed costs, operating leverage)
7. Where does the cash go? (moneyFlow → OCF, capex, free cash flow)
8. Is it winning or lucky? (split → competitive position, rivalry)
9. If it's great, why is the stock risky? (bigStat 46x → analogy → bigIdea "great business ≠ great stock" → P/E, margin of safety)
10. What breaks it? (branch decision tree → the key risk)
11. Put it together (flow recap → graduate glossary + CTA)

The **visual anchors** a reader should remember: the before/after comparison,
the one number that moved, the "×N cheap increase = huge total" reveal, the
cash split with the leftover as hero, the valuation multiple, and the rival
decision tree. Make those the biggest things on the page.

## Voice

Fathom's voice in one line: **a smart investor who has already figured it out,
sitting next to you and explaining the business without trying to impress you.**
Observant, calm, precise, occasionally sharp. Never excited about its own
explanation. See `frameworks/REPORTS-VOICE.md` and `frameworks/ANTI-AI-SLOP.md`;
this section is the Simple-mode specific layer.

**Keep:** short concrete sentences; company-specific numbers (`₹10 × 300 million
= ₹3 billion` is impossible to fake); direct explanations; metaphors that return
to the numbers (road → fixed costs → ARPU → cash); plain language before the
term; the rare memorable line.

**Cut / reduce (AI tells):**
- "If you remember only one thing…", "Now you see why…", "You now understand…"
- "This is the single hardest idea…", "That is the whole mechanism…", "the key takeaway…"
- Courseware: "You just learned…", "Carry this forward…", "Hold on to that idea."
- "Picture…" more than once or twice a report. Vary the structure.
- "not X, it's Y" as a reflex. Use the contrast only when it sharpens the idea.
- Manufactured drama ("this changes everything", "where the magic happens").
- Every sentence trying to be quotable. Let most sentences just explain; the
  occasional sharp line lands harder against plain prose.
- Any single rhetorical device used more than once per report.

**AI-tell scan** (should print 0 for each):

```
python3 -c "import json,sys; s=json.dumps(json.load(open('data/companies/<SLUG>.json'))['simple']); \
[print(p, s.count(p)) for p in ['Picture','whole mechanism','Now you see why','If you remember only one thing','single hardest idea','You now understand','got lucky']]"
```

## Metaphor discipline

Pick one coherent metaphor for the company and hold it across the whole piece
(Airtel = a toll road: road, toll, traffic, price war, cash machine). Every
metaphor must eventually cash out in a real number. Never let an analogy become
decoration.
