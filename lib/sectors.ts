import fs from 'fs';
import path from 'path';

export interface SectorMetric {
  metric: string;
  why: string;
}

export interface PrimerBullet {
  term: string;
  desc: string;
}

export interface PrimerBlock {
  concept: string;
  body: string;
  bullets?: PrimerBullet[];
  outro?: string;
  example?: string;
}

export interface SectorSection {
  title: string;
  intro?: string;
  blocks: PrimerBlock[];
}

export interface Sector {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  examples: string[];
  howItWorks: string;
  primer?: PrimerBlock[];
  sections?: SectorSection[];
  metrics: SectorMetric[];
  framework: {
    demand: string;
    pricing: string;
    efficiency: string;
    capital: string;
    risk: string;
  };
}

// Curated display order for the index and nav.
const SECTOR_ORDER = [
  'banks', 'nbfcs', 'insurance', 'hospitals', 'pharma', 'saas', 'fmcg', 'retail',
  'telecom', 'power', 'auto', 'cement', 'metals', 'airlines', 'realestate', 'hotels',
  'ecommerce', 'infrastructure', 'capitalmarkets',
];

const SECTORS_DIR = path.join(process.cwd(), 'data', 'sectors');

function getAllIds(): string[] {
  return fs
    .readdirSync(SECTORS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

export function getSector(id: string): Sector | undefined {
  const file = path.join(SECTORS_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return undefined;
  const data = JSON.parse(fs.readFileSync(file, 'utf-8')) as Omit<Sector, 'id'>;
  return { ...data, id };
}

export function getAllSectors(): Sector[] {
  const rank = (id: string) => {
    const i = SECTOR_ORDER.indexOf(id);
    return i === -1 ? SECTOR_ORDER.length : i;
  };
  return getAllIds()
    .map((id) => getSector(id)!)
    .sort((a, b) => rank(a.id) - rank(b.id));
}
