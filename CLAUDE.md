# Fathom: Guide for AI Agents

Fathom is a **fully static Next.js site** that publishes beginner-friendly Indian
(NSE) equity research: per-company reports, sector explainers, a guide to reading
filings, and long-form case studies. It builds to static HTML and deploys to
GitHub Pages. No backend, no database, no runtime.

Read this whole file before editing. The **Voice rules** and **Design language**
sections are not optional style notes; they are the product.

---

## The one rule that matters most: the voice

Every word on this site is written for a **complete beginner**, in the plain,
human, teach-as-you-go style of a good explainer (think of The Capillary
substack, or explaining a business to a smart friend who knows no finance).

- **No jargon without unpacking it.** If you must use a term (NIM, ARPOB, ANDA),
  name it in plain words first and only then give the label.
- **Every line earns its place.** No filler, no hedging, no throat-clearing. If a
  sentence does not teach or advance the argument, cut it.
- **Concrete over abstract.** Use everyday analogies (a tea stall paid per cup, a
  hotel room that rots at midnight, a bank lending *your* money). Then tie the
  analogy to the real company.
- **Have a point of view.** Reports take an honest analytical stance on the business
  and explain the tension, rather than mushy both-sides hedging. A stance is a reading
  of the business (is it well run, is the moat real, is the price sane), never a
  buy/sell call: Fathom does not rate tickers to buy or sell.

### Hard formatting rules (enforced, non-negotiable)

- **NO em-dashes (`—`) anywhere.** Not in copy, data, or comments.
- **NO spaced hyphens (` - `) as punctuation.** Use periods, commas, or
  parentheses. Ranges use a plain hyphen with no spaces (`60-70%`, `2020-21`).
- Check before committing: `npm run check:prose` must pass. It greps `lib data app components`.
  This file is exempt, because stating the rule requires quoting the character.

### Honesty rules

- **Never fabricate data, numbers, quotes, screenshots, or sources.** All figures
  come from primary filings (screener.in, company results/annual reports) or
  named reputable coverage. If a number is unknown, say "not available"; do not
  estimate silently.
- Case-study **evidence** must be traceable: cite the exact filing line/note, and
  link primary sources. Document images (`public/case-studies/*.png`) are real
  pages rendered from real public regulatory filings, never mock-ups.
- Every report and case study carries an **educational-use / not-SEBI-adviser**
  disclaimer. Reports **never** rate a ticker to buy, sell, or hold: no verdict label,
  no literal buy/sell instruction. They explain the business and let the reader decide.

---

## Project structure

```
fathom/
├─ app/
│  ├─ layout.tsx                 root layout + top nav (Companies · Understand · Filings · Sectors · Case Studies)
│  ├─ globals.css                the ENTIRE design system (tokens + every component). No CSS-in-JS libs.
│  ├─ page.tsx                   home: company report cards
│  ├─ not-found.tsx              404
│  ├─ understand/
│  │  ├─ page.tsx                "How to understand a business": 7 beginner questions
│  │  └─ filings/page.tsx        "Reading the filings": annual report / concall / red flags
│  ├─ sectors/
│  │  ├─ page.tsx                sector index cards + the two "why the wrong metric misleads" cards
│  │  └─ [sector]/page.tsx       one page per sector (generateStaticParams)
│  ├─ stocks/[ticker]/page.tsx   one research report per ticker (generateStaticParams)
│  └─ case-studies/
│     ├─ page.tsx                case-study index cards
│     └─ [id]/page.tsx           one long-form case study per id
├─ components/
│  ├─ Report.tsx                 renders a full TickerReport (all sections + CTAs)
│  ├─ ReportShell.tsx            client component that renders and toggles full / simple trees
│  └─ SimpleReport.tsx           renders the simple tree
├─ lib/
│  ├─ types.ts                   TickerReport and SimpleReportData schemas
│  ├─ data.ts                    loader: reads data/companies/, injects `slug`
│  ├─ sectors.ts                 loader + Sector interfaces, SECTOR_ORDER array
│  ├─ caseStudies.ts             loader + CaseStudy interfaces
│  ├─ signals.ts                 loader + Signal interfaces
│  ├─ patterns.ts                hand-authored PATTERNS map (case-study id to pattern name)
│  └─ base.ts                    withBase() (prefixes internal links with the base path)
├─ data/
│  ├─ companies/
│  │  └─ <SLUG>.json             33 company reports (e.g. KALYANKJIL.json, MM.json)
│  ├─ sectors/
│  │  └─ <id>.json               20 sector explainers
│  ├─ case-studies/
│  │  └─ <id>.json               13 long-form case studies
│  └─ signals/
│     └─ <id>.json               9 market-event signals
├─ scripts/
│  └─ seo-audit.mjs              validates export in out/: titles, H1, descriptions, canonical, no-index
├─ public/case-studies/*.png     real filing page images used as case-study evidence
├─ frameworks/                   local-only guidelines (NOT shipped): writing guide, editorial
│                                and signals checklists, the business-judgment mental-models checklist
├─ next.config.js                output:'export', basePath, NEXT_PUBLIC_BASE_PATH
└─ .github/workflows/deploy.yml  build + publish to GitHub Pages on push to main
```

**`frameworks/` is reference, not content.** It holds the writing/editorial guidelines
and mental-model checklists that govern how content is written and verified. These files
are never imported or rendered; they live outside `app`/`lib`/`data` on purpose. Read
`frameworks/README.md` for the index. Consult the relevant one before writing a report,
sector explainer, case study or signal.

**Content is data, not markup.** All content (reports, sectors, case studies, signals)
lives as JSON files under `data/`. The `lib/*.ts` files are loaders that read the
JSON plus TypeScript type definitions and helpers. To add or edit content you almost
always touch data, not components.

---

## Design language

The look is **an equity-research journal**: deep ink ground, a serif for
authority, a single restrained teal accent, mono for labels and numbers. It is
calm and text-first, not a flashy dashboard. Everything is theme-aware (dark
default, light supported) and defined once in `globals.css` as CSS custom
properties. **Do not introduce a second styling system, inline design tokens, or
a component/UI library.** Extend `globals.css`.

### Tokens (defined on `:root` in globals.css)

| Token | Role |
|---|---|
| `--bg`, `--bg-raised`, `--bg-card` | page / raised / card backgrounds (deep ink) |
| `--border`, `--border-strong` | hairlines and stronger dividers |
| `--ink`, `--ink-dim`, `--ink-faint` | primary / secondary / tertiary text |
| `--accent`, `--accent-dim` | teal (the ONE accent). Use sparingly, for emphasis and links |
| `--amber` | reserved for case studies and cautionary flags |
| `--good` / `--warn` / `--bad` | semantic only (verdicts, checklist status). NOT decorative |
| `--serif` | Iowan Old Style / Palatino for all display headings |
| `--sans` | system UI stack for body text |
| `--mono` | SF Mono stack for labels, tickers, figures, kickers |

### Type & layout conventions

- **Headings**: `--serif`, `font-weight: 600`, tight tracking, `text-wrap: balance`.
- **Body**: `--sans`, ~16px, line-height ~1.7, `max-width` ~680-720px so prose
  stays readable. Never let running text run full-bleed.
- **Labels / kickers / figures**: `--mono`, uppercase, letter-spaced, small.
- **Eyebrows** (`.eyebrow`) are mono, teal, uppercase (the section's category).
- Numbers that line up use `font-variant-numeric: tabular-nums`.
- Layout uses flex/grid + `gap`, never per-element margins that collide.
- Cards: `--bg-card`, 1px `--border`, ~12-14px radius, a hover lift
  (`translateY(-2px/3px)` + soft shadow) and often a top accent hairline.
- Wide content (tables) scrolls inside its own container; the page never scrolls
  sideways.

### Established component patterns (reuse, don't reinvent)

- **Teaching block** (`.primer-block` inside `.teach-section`): numbered concept
  → plain explanation → optional `.pb-list` bullets → optional `.eg` "For example"
  callout. This is the core explainer unit (banks/hospitals/pharma/infra pages).
- **`.eg`** callout: teal left-border card for the concrete example. `.cs-lesson`
  is its amber cousin for a case-study takeaway.
- **CTA banner** (`.sector-cta`): teal-tinted linked panel with a mono kicker, a
  line, and an animated `→`. Used for cross-links (report → sector, understand →
  filings, case study → report).
- **Report** = 16 numbered `.block` sections rendered by `components/Report.tsx`
  from a `TickerReport`. Metric grids, revenue bars, holding bar,
  moat pips, trap/sector checklists, two-engine boxes, lens cards.
- **Case study** = stat strip → intro → headed sections → evidence table →
  document-image exhibits → sources → vertical timeline → lesson.

---

## How to add content

### A new company report
1. Research via the `indian-stock-analyzer` skill (screener.in + news). Sanity-check
   the PE (`price / EPS`) against the scraped value.
2. Write `data/companies/<SLUG>.json` matching `TickerReport` in `lib/types.ts`.
   - **Slug must be URL-safe.** Ampersands break static export: Mahindra & Mahindra
     is `data/companies/MM.json` with `"ticker": "M&M"` (display) and the loader injects `slug`.
   - Set `sectorId` to link the report to its sector explainer.
   - An optional `verdict` field holds a business-quality read shaped `{ rows: { label, value, tone }[], keyQuestion: string }` where tone is `good`, `warn`, or `bad`. This must never contain a buy, sell or hold call. Fathom does not rate tickers. The stance lives in the prose and in this quality read.
   - checklist `status` ∈ `pass | fail | warn | na` (no other values).
   - `capex`/`fcf` are optional. Omit rather than invent them.
3. `npm run build` and confirm the page generates.

#### No-repeat rule: one job per prose slot (enforced)

A report has ~13 prose fields, and the failure mode is every one of them
re-arguing the same thesis. A reader then hits the AI-vs-moat point (or whatever
the core tension is) a dozen times. State each idea **once**, in the slot that
owns it, and let the other slots reference it, not re-argue it. Assign jobs:

| Slot | Its ONE job | Does NOT |
|---|---|---|
| `oneLiner` | The full thesis, in one sentence. This is the only place it lives in full. | none |
| `overview` | What the business *does*, in plain words. One hook to the tension, no verdict. | re-state returns/valuation |
| `editorial.whyNotAlreadyWon` | Why the moat exists. | re-argue the risk in depth |
| `editorial.whyNow` | Why the price/multiple is where it is *now*. | repeat the full thesis |
| `business.qualityVerdict` | Operator quality (is it well run?). | re-argue the structural risk |
| `moat.note` | What the moat is and its single honest caveat. | expand the caveat into the lens's argument |
| `narrative` | The *history and numbers* story only. | re-state the price-vs-earnings line |
| `priceAction` | Price mechanics only (levels, range). | explain *why* (that is engine's job) |
| `engine.*` | The earnings/multiple/re-rating mechanics. | restate the business model |
| `lenses[]` | Each = one distinct *angle*, argued in full here. | duplicate moat.note or engine |
| `summary` | A 3-line recap that *references*, never re-argues. | introduce a new argument |
| `editorial.remember` | One memorable sentence. | be a paragraph |

Concrete tells to grep for before shipping a report: a headline data point
(e.g. "stock fell 14% while profit rose 30%") should appear **once** as prose,
plus optionally once as a metric `hint`. If it shows up in 5+ prose fields, cut
it down. Same for the core tension: name it in `oneLiner`, develop it in its
owning block (`aiFork`/`counterpoint`/a `lens`), reference it elsewhere.

### Other pages (no editing needed)

- **Patterns hub** (`app/patterns/page.tsx`): lists reusable business shapes discovered
  in case studies. `lib/patterns.ts` holds the hand-authored PATTERNS map; a case
  study carrying a `patternCard` field demonstrates a pattern.
- **About & methodology** (`app/about/page.tsx`): editorial mission and how the site works.
- **LLM crawler index** (`app/llms.txt/route.ts`): plain-markdown export of all content
  for LLM crawlers, built from the same loaders the pages use.
- **Sitemap & robots** (`app/sitemap.ts`, `app/robots.ts`): generated via loaders.
  Sitemap uses each item's own date (`asOf` for reports, `published` for case studies/signals) as lastmod.

### A new sector explainer
Write `data/sectors/<id>.json` matching the Sector interface in `lib/sectors.ts`.
Give it `howItWorks`, and for full depth a `sections[]` array of teaching blocks
(banks is the reference implementation). `metrics[]` and `framework{demand,pricing,efficiency,capital,risk}`
drive the table and the five-number strip.

### A new case study
Write `data/case-studies/<id>.json` matching the CaseStudy interface in `lib/caseStudies.ts`.
Include `intro[]`, headed `sections[]`, optional `evidence` (sourced figures),
`exhibits[]` (real filing images in `public/case-studies/`), `sources[]`, `timeline[]`, `lesson`.
Link it to a report via `ticker`/`stockSlug`; the report auto-shows a CTA for it. Optionally add
a `simple` block to enable Simple mode (toggle between full and simplified trees). To scaffold
a Simple mode draft, run `node scripts/scaffold-simple.mjs <id>` which writes
`<id>.simple-draft.json`. Refine that draft, then splice it in with the same command
plus `--apply`. The loaders deliberately skip `.simple-draft.json` sidecars.

### A new signal
Write `data/signals/<id>.json` matching the Signal interface in `lib/signals.ts`.
A signal is a market event (Budget, RBI rate decision, tariff, currency or commodity move)
explained as a change to business economics, not as news. The load-bearing fields are
`event[]` (what happened, in plain words), `trigger` (the single business change the event
reduces to), `chain[]` (the causal flow), `winners[]`/`losers[]`, `fanouts[]` (one event,
several businesses, each helped or hurt), `sections[]` (freeform teaching blocks),
`evidence` (real before/after numbers proving the predicted metric moved), `horizons[]`
and `lesson`. Set `published` to the ISO date it goes live.

---

## Build, links, and deploy

- **Next 16, static export** (`output: 'export'`). Route `params` are async.
  Use `await params` in dynamic routes.
- **Base path**: the site lives at `g14a.github.io/fathom/`. `PAGES_BASE_PATH`
  (repo variable = `/fathom`) sets `basePath` and `NEXT_PUBLIC_BASE_PATH`.
- **Internal links MUST use `withBase()`** from `lib/base.ts`. Next only rewrites
  `basePath` for `next/link`, NOT plain `<a>`/`<img>`. Every internal `href` and
  image `src` is wrapped: `href={withBase("/sectors/")}`. Forgetting this sends
  users to the wrong origin in production. External links and `data:`/`http` are
  left untouched.
- **Deploy**: push to `main` → `deploy.yml` builds and publishes to Pages
  (~45s). Live at https://g14a.github.io/fathom/.
- **`main` is the deploy branch here** (this is a standalone site repo, not a
  feature-branch workflow). Note: an unrelated `yt-feature-dev` hook on the user's
  *other* repo can block `git commit`/`push` from this shell; if so, the user runs
  the commit/push themselves.

## Quick checks before you commit
```
npm run check          # data schema, cross-links, repetition, em-dashes, tsc
npm run build                    # must be green
npm run seo:audit                # validate titles, H1, descriptions, canonical
PAGES_BASE_PATH=/fathom npm run build && grep -q 'href="/sectors/"' out/index.html && echo BAD || echo OK
```
