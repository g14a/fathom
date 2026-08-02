import { getAllTickers, getReport } from '@/lib/data';
import { Report } from '@/components/Report';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllTickers().map((ticker) => ({ ticker }));
}

export async function generateMetadata({ params }: { params: Promise<{ ticker: string }> }): Promise<Metadata> {
  const { ticker } = await params;
  const r = getReport(ticker);
  return {
    title: `${r.company} (${r.ticker}) | Fathom Research`,
    description: r.oneLiner,
  };
}

export default async function StockPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  const r = getReport(ticker);
  return <Report r={r} />;
}
