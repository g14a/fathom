# Fathom — NSE Equity Research

Fully static research site. One structured report per ticker, mapped to the
`indian-stock-analyzer` skill's sections. Deploys to GitHub Pages. No backend, no DB.

## How it works

- Each ticker is one JSON file in `data/<TICKER>.json` (schema in `lib/types.ts`).
- Next.js static-exports (`output: 'export'`) one page per ticker → `out/`.
- GitHub Action builds and publishes on every push to `main`.

## Add / refresh a ticker (quarterly workflow)

1. In a Claude session, run the `indian-stock-analyzer` skill on a ticker.
2. Ask Claude to write the result as `data/<TICKER>.json` matching `lib/types.ts`.
3. Commit + push. The Action rebuilds the whole site.

The *hosting* is free and static. The *content refresh* is a Claude batch job —
run it once a quarter (and after earnings), regenerate the JSON, push.

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
