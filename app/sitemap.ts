import type { MetadataRoute } from 'next';
import { getAllTickers } from '@/lib/data';
import { getAllSectors } from '@/lib/sectors';
import { getAllSignals } from '@/lib/signals';
import { getAllCaseStudies } from '@/lib/caseStudies';
import { canonical } from '@/lib/base';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '/',
    '/understand/',
    '/understand/filings/',
    '/sectors/',
    '/signals/',
    '/case-studies/',
    '/patterns/',
  ];

  const companyPaths = getAllTickers().map((t) => `/stocks/${t}/`);
  const sectorPaths = getAllSectors().map((s) => `/sectors/${s.id}/`);
  const signalPaths = getAllSignals().map((s) => `/signals/${s.id}/`);
  const casePaths = getAllCaseStudies().map((c) => `/case-studies/${c.id}/`);

  const all = [...staticPaths, ...companyPaths, ...sectorPaths, ...signalPaths, ...casePaths];

  const lastModified = new Date();

  return all.map((path) => ({
    url: canonical(path),
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.split('/').filter(Boolean).length <= 1 ? 0.8 : 0.6,
  }));
}
