import type { MetadataRoute } from 'next';
import { getAllTickers, getReport } from '@/lib/data';
import { getAllSectors } from '@/lib/sectors';
import { getAllSignals } from '@/lib/signals';
import { getAllCaseStudies } from '@/lib/caseStudies';
import { canonical } from '@/lib/base';

export const dynamic = 'force-static';

type Entry = { path: string; lastModified?: string | Date; priority: number; changeFrequency: 'weekly' | 'monthly' };

// Only accept plain ISO dates for lastmod, so a bad value never poisons the sitemap.
function isoDate(v?: string): string | undefined {
  return v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: Entry[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/understand/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/understand/filings/', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/sectors/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/signals/', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/case-studies/', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/patterns/', priority: 0.7, changeFrequency: 'monthly' },
  ];

  // Real per-page dates where the data carries one, so genuine freshness stands out
  // instead of every URL claiming it changed on this build.
  const companyPaths: Entry[] = getAllTickers().map((t) => ({
    path: `/stocks/${t}/`,
    lastModified: isoDate(getReport(t).asOf),
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  const casePaths: Entry[] = getAllCaseStudies().map((c) => ({
    path: `/case-studies/${c.id}/`,
    lastModified: isoDate(c.published),
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  const sectorPaths: Entry[] = getAllSectors().map((s) => ({
    path: `/sectors/${s.id}/`,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  const signalPaths: Entry[] = getAllSignals().map((s) => ({
    path: `/signals/${s.id}/`,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  return [...staticPaths, ...companyPaths, ...casePaths, ...sectorPaths, ...signalPaths].map((e) => ({
    url: canonical(e.path),
    ...(e.lastModified ? { lastModified: e.lastModified } : {}),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
