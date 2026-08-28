import { getAllTickers, getReport } from '@/lib/data';
import { Report } from '@/components/Report';
import { SimpleReport } from '@/components/SimpleReport';
import { ReportShell } from '@/components/ReportShell';
import { canonical } from '@/lib/base';
import JsonLd, { ORG } from '@/components/JsonLd';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllTickers().map((ticker) => ({ ticker }));
}

export async function generateMetadata({ params }: { params: Promise<{ ticker: string }> }): Promise<Metadata> {
  const { ticker } = await params;
  const r = getReport(ticker);
  // Lead the snippet with the plain "what it does" line when present (it matches
  // "about <company>" intent), else fall back to the one-line thesis.
  const descSource = r.facts?.snapshot || r.oneLiner || '';
  const description = descSource.length > 155 ? `${descSource.slice(0, 152).trimEnd()}...` : descSource.replace(/:$/, '');
  const title = `${r.company} (${r.ticker}): Business Model, Valuation & Analysis | Fathom`;
  const url = canonical(`/stocks/${ticker}/`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'article', images: ['/og.png'] },
    twitter: { title, description, images: ['/og.png'] },
  };
}

export default async function StockPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const r = getReport(ticker);
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${r.company}: business model, moat and financial analysis`,
    description: r.oneLiner,
    articleSection: 'Company research',
    mainEntityOfPage: canonical(`/stocks/${ticker}/`),
    author: ORG,
    publisher: ORG,
    ...(r.asOf ? { datePublished: r.asOf, dateModified: r.asOf } : {}),
    about: {
      '@type': 'Corporation',
      name: r.company,
      tickerSymbol: r.ticker,
      description: r.oneLiner,
      url: canonical(`/stocks/${ticker}/`),
      ...(r.industry || r.sector ? { industry: r.industry || r.sector } : {}),
    },
  };
  // A small FAQ, built only from facts already in the report, so Google can serve
  // the "what does <company> do / who owns it" questions directly. Skipped unless
  // the report supplies a plain-language snapshot.
  const latest = r.financials[r.financials.length - 1];
  const promoter = r.holding.find((h) => /promoter/i.test(h.label));
  const faqs: { q: string; a: string }[] = [];
  if (r.facts?.snapshot) {
    faqs.push({ q: `What does ${r.company} do?`, a: r.facts.snapshot });
    if (r.facts.founded) faqs.push({ q: `When was ${r.company} founded?`, a: `${r.company} was founded in ${r.facts.founded}${r.facts.hq ? `, and is headquartered in ${r.facts.hq}` : ''}.` });
    if (latest) faqs.push({ q: `What is ${r.company}'s revenue?`, a: `${r.company} reported revenue of about ₹${latest.revenue.toLocaleString('en-IN')} crore in ${latest.year}.` });
    if (promoter) faqs.push({ q: `Who owns ${r.company}?`, a: `The promoter group holds about ${promoter.pct}% of ${r.company}.` });
  }
  const faqLd = faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;
  return (
    <>
      <JsonLd data={articleLd} />
      {faqLd && <JsonLd data={faqLd} />}
      <ReportShell
        investor={<Report r={r} />}
        simple={r.simple ? <SimpleReport r={r} /> : null}
      />
    </>
  );
}
