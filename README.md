# Fathom: NSE Equity Research

Fully static research site. One structured report per ticker, mapped to the
`indian-stock-analyzer` skill's sections. Deploys to GitHub Pages. No backend, no DB.

## How it works

- Each ticker is one JSON file in `data/companies/<SLUG>.json` (schema in `lib/types.ts`).
- Next.js static-exports (`output: 'export'`) one page per ticker → `out/`.
- GitHub Action builds and publishes on every push to `main`.

## Other content types

- **Sectors** (`data/sectors/<id>.json`): explainers on how industries work, with metrics frameworks and risk checklists. Schema in `lib/sectors.ts`.
- **Case studies** (`data/case-studies/<id>.json`): long-form stories with real evidence from filings, showing how a business principle played out. Schema in `lib/caseStudies.ts`.
- **Signals** (`data/signals/<id>.json`): market events (Budget, RBI decisions, tariffs) explained as changes to business economics. Schema in `lib/signals.ts`.

## Add / refresh a ticker (quarterly workflow)

1. In a Claude session, run the `indian-stock-analyzer` skill on a ticker.
2. Ask Claude to write the result as `data/companies/<SLUG>.json` matching `lib/types.ts`.
3. Commit + push. The Action rebuilds the whole site.

The *hosting* is free and static. The *content refresh* is a Claude batch job.
Run it once a quarter (and after earnings), regenerate the JSON, push.

## Company editorial guide

Every company page should explain why the business exists before it explains what
the business does. The first paragraph should give the reader a one-sentence
mental model:

- BSE is not an exchange. It is a toll booth.
- Airtel is not telecom. It is a fixed-cost network.
- Kalyan is not jewellery. It is trust.
- Titan is not watches. It is brands.
- DMart is not supermarkets. It is inventory velocity.
- Asian Paints is not paint. It is distribution.

When refreshing a company JSON, fill the optional `editorial` block and make the
article naturally answer these questions, in this order:

1. What business is this really in?
2. Why does this company deserve to exist?
3. Why has no one else already won?
4. Which mental models explain it, and how strongly do they apply?
5. How does the economic engine work from demand to returns?
6. Where does the company sit strategically versus weaker and stronger alternatives?
7. Why is this company winning today?
8. Why could it stop winning?
9. What is the market betting on?
10. Which sector mental models matter here?
11. Why is this stock interesting today?
12. What is the one sentence to remember?

The key test: after the Company Overview, the reader should understand the
economic engine, not merely the product category. For Kalyan, the point is not
"it sells jewellery." The point is that buyers cannot easily verify purity,
weight or making charges, so reputation becomes the product. Demand creates gold
volume; making charges and studded mix create margin; FOCO changes the capital
base; capital efficiency drives ROE. Everything else supports that engine.

Do not list mental models as decorative chips. Each model needs a strength score
and a one-line reason it matters here:

- Trust: customers cannot verify purity themselves.
- Brand: the brand reduces fear, not the gold price.
- Distribution: national reach captures formalisation.
- Asset-light expansion: FOCO grows stores without tying up capital.
- Working capital: cash retail means excellent cash conversion.

The Economic Engine should read like a causal diagram, not a table of facts:

Weddings and festivals -> formalisation -> more jewellery sold -> making charges
and studded mix -> higher operating profit -> FOCO reduces capital required ->
high ROE.

Every page should also state what the market is betting on. For Kalyan: formalisation
continues, FOCO keeps working, trust remains intact, margins stay stable, and the
promoter pledge does not force a stock accident. If one of those breaks, the
investment thesis changes.

Also ask Michael Porter's hardest question on every company: why does everyone
else not make these returns? The answer should be specific, not a checklist of
generic risks. Brand, distribution, regulation, capital intensity, switching
costs, network effects, working capital and operating leverage are useful only
when they explain why returns can persist.

## Local dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Deploy

1. Push to a GitHub repo.
2. Settings → Pages → Source = "GitHub Actions".
3. If serving from `https://<user>.github.io/<repo>/`, add a repo **variable**
   `PAGES_BASE_PATH` = `/<repo>`. For a custom domain or user-root, leave it unset.

## Disclaimer

Educational use only. Not SEBI-registered advice. Point-in-time data may be stale.
