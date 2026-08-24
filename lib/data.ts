import fs from 'fs';
import path from 'path';
import type { TickerReport } from './types';

const DATA_DIR = path.join(process.cwd(), 'data', 'companies');

export function getAllTickers(): string[] {
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

export function getReport(slug: string): TickerReport {
  const file = path.join(DATA_DIR, `${slug}.json`);
  const report = JSON.parse(fs.readFileSync(file, 'utf-8')) as TickerReport;
  return { ...report, slug };
}

export function getAllReports(): TickerReport[] {
  return getAllTickers()
    .map(getReport)
    .sort((a, b) => a.company.localeCompare(b.company));
}
