import { getAllTickers, getReport } from '@/lib/data';
import { Report } from '@/components/Report';
import { canonical } from '@/lib/base';
import JsonLd, { ORG } from '@/components/JsonLd';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllTickers().map((ticker) => ({ ticker }));
}

export async function generateMetadata({ params }: { params: Promise<{ ticker: string }> }): Promise<Metadata> {
  const { ticker } = await params;
  const r = getReport(ticker);
  const shortLiner = r.oneLiner ? r.oneLiner.slice(0, 155).replace(/:$/, '') : '';
  const title = `${r.company} (${r.ticker}): Business Model, Valuation & Analysis | Fathom`;
  const description = shortLiner;
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
    about: { '@type': 'Corporation', name: r.company },
  };
  return (
    <>
      <JsonLd data={articleLd} />
      <Report r={r} />
    </>
  );
}
