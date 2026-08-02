# Fathom — Guide for AI Agents

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
- **Have a point of view.** Reports take an honest stance (see verdict enum) and
  explain the tension, rather than mushy both-sides hedging.

### Hard formatting rules (enforced, non-negotiable)

- **NO em-dashes (`—`) anywhere.** Not in copy, data, or comments.
- **NO spaced hyphens (` - `) as punctuation.** Use periods, commas, or
  parentheses. Ranges use a plain hyphen with no spaces (`60-70%`, `2020-21`).
- Check before committing: `grep -rn "—" lib data app` must return nothing.

### Honesty rules

- **Never fabricate data, numbers, quotes, screenshots, or sources.** All figures
  come from primary filings (screener.in, company results/annual reports) or
  named reputable coverage. If a number is unknown, say "not available"; do not
  estimate silently.
- Case-study **evidence** must be traceable: cite the exact filing line/note, and
  link primary sources. Document images (`public/case-studies/*.png`) are real
  pages rendered from real public regulatory filings, never mock-ups.
- Every report and case study carries an **educational-use / not-SEBI-adviser**
  disclaimer. Reports give a verdict but **never** a literal buy/sell instruction.

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
│  │  ├─ page.tsx                "How to understand a business" — 7 beginner questions
│  │  └─ filings/page.tsx        "Reading the filings" — annual report / concall / red flags
│  ├─ sectors/
│  │  ├─ page.tsx                sector index cards + the two "why the wrong metric misleads" cards
│  │  └─ [sector]/page.tsx       one page per sector (generateStaticParams)
│  ├─ stocks/[ticker]/page.tsx   one research report per ticker (generateStaticParams)
│  └─ case-studies/
│     ├─ page.tsx                case-study index cards
│     └─ [id]/page.tsx           one long-form case study per id
├─ components/
│  ├─ Report.tsx                 renders a full TickerReport (all 16 sections + CTAs)
│  └─ Verdict.tsx                the verdict badge
├─ lib/
│  ├─ types.ts                   TickerReport schema (the report data contract)
│  ├─ data.ts                    loads data/*.json, injects `slug`
│  ├─ sectors.ts                 SECTORS[] + helpers (sector explainer content lives here as data)
│  ├─ caseStudies.ts             CASE_STUDIES[] + helpers (case-study content lives here as data)
│  └─ base.ts                    withBase() — prefixes internal links with the base path
├─ data/
│  └─ <SLUG>.json                one research report per file (e.g. KALYANKJIL.json, MM.json)
├─ public/case-studies/*.png     real filing page images used as case-study evidence
├─ next.config.js                output:'export', basePath, NEXT_PUBLIC_BASE_PATH
└─ .github/workflows/deploy.yml  build + publish to GitHub Pages on push to main
```

**Content is data, not markup.** Sector explainers and case studies are TypeScript
data arrays (`lib/sectors.ts`, `lib/caseStudies.ts`); reports are JSON (`data/`).
To add or edit content you almost always touch data, not components.

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
| `--accent`, `--accent-dim` | teal — the ONE accent. Use sparingly, for emphasis and links |
| `--amber` | reserved for case studies and cautionary flags |
| `--good` / `--warn` / `--bad` | semantic only (verdicts, checklist status). NOT decorative |
| `--serif` | Iowan Old Style / Palatino — all display headings |
| `--sans` | system UI stack — body text |
| `--mono` | SF Mono stack — labels, tickers, figures, kickers |

### Type & layout conventions

- **Headings**: `--serif`, `font-weight: 600`, tight tracking, `text-wrap: balance`.
- **Body**: `--sans`, ~16px, line-height ~1.7, `max-width` ~680-720px so prose
  stays readable. Never let running text run full-bleed.
- **Labels / kickers / figures**: `--mono`, uppercase, letter-spaced, small.
- **Eyebrows** (`.eyebrow`) are mono, teal, uppercase — the section's category.
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
  from a `TickerReport`. Verdict badge, metric grids, revenue bars, holding bar,
  moat pips, trap/sector checklists, two-engine boxes, lens cards.
- **Case study** = stat strip → intro → headed sections → evidence table →
  document-image exhibits → sources → vertical timeline → lesson.

---

## How to add content

### A new company report
1. Research via the `indian-stock-analyzer` skill (screener.in + news). Sanity-check
   the PE (`price / EPS`) against the scraped value.
2. Write `data/<SLUG>.json` matching `TickerReport` in `lib/types.ts`.
   - **Slug must be URL-safe.** Ampersands break static export: Mahindra & Mahindra
     is `data/MM.json` with `"ticker": "M&M"` (display) and the loader injects `slug`.
   - Set `sectorId` to link the report to its sector explainer.
   - `verdict` ∈ `strong-buy | buy | accumulate | hold | avoid | sell`.
   - checklist `status` ∈ `pass | fail | warn | na` (no other values).
   - `capex`/`fcf` are optional — omit rather than invent them.
3. `npm run build` and confirm the page generates.

### A new sector explainer
Add/extend an entry in `SECTORS[]` (`lib/sectors.ts`). Give it `howItWorks`, and
for full depth a `sections[]` array of teaching blocks (banks is the reference
implementation). `metrics[]` and `framework{demand,pricing,efficiency,capital,risk}`
drive the table and the five-number strip.

### A new case study
Add an entry to `CASE_STUDIES[]` (`lib/caseStudies.ts`): `intro[]`, headed
`sections[]`, optional `evidence` (sourced figures), `exhibits[]` (real filing
images in `public/case-studies/`), `sources[]`, `timeline[]`, `lesson`. Link it to
a report via `ticker`/`stockSlug`; the report auto-shows a CTA for it.

---

## Build, links, and deploy

- **Next 16, static export** (`output: 'export'`). Route `params` are async —
  `await params` in dynamic routes.
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
grep -rn "—" lib data app        # must be empty (no em-dashes)
npm run build                    # must be green
PAGES_BASE_PATH=/fathom npm run build && grep -q 'href="/sectors/"' out/index.html && echo BAD || echo OK
```
