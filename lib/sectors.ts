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
  // A signature visual chain: the whole industry compressed into a few boxes,
  // rendered as a centred vertical flow map near the top of the page.
  chain?: {
    kicker: string;
    steps: string[];
    note: string;
  };
  // A reusable diagnostic: the questions to run against any company in the
  // sector, rendered as the Fathom checklist box.
  checklist?: {
    kicker: string;
    title: string;
    items: string[];
    foot?: string;
  };
  sections?: SectorSection[];
  metrics: SectorMetric[];
  framework: {
    demand: string;
    pricing: string;
    efficiency: string;
    capital: string;
    risk: string;
  };
  // The six plain-language questions that explain any industry.
  anatomy?: {
    demand: string;    // Where does demand come from?
    pricing: string;   // Who controls the price?
    limiting: string;  // What's the hardest thing to get?
    leak: string;      // Where does the money disappear?
    killer: string;    // What usually breaks first?
    moat: string;      // Why can't rivals just copy it?
  };
  // The single conceptual stumbling block a beginner hits first, answered upfront.
  beginnerQuestion?: {
    q: string;
    a: string;
  };
  // A one-sentence memorable anchor for the whole industry, shown last.
  remember?: string;
  // Transferable concepts this sector teaches (labels, shown as chips).
  mentalModels?: string[];
  // Other sector ids with related economics.
  relatedSectors?: string[];
  // Case-study ids that demonstrate this sector's principles.
  relatedCaseStudies?: string[];
  // Ticker slugs of full company reports in this sector.
  relatedReports?: string[];
}

// Curated display order for the index and nav.
const SECTOR_ORDER = [
  'banks', 'nbfcs', 'insurance', 'hospitals', 'diagnostics', 'pharma', 'saas', 'businessservices',
  'fmcg', 'retail', 'telecom', 'mediaip', 'power', 'auto', 'cement', 'metals', 'chemicals',
  'packaging', 'airlines', 'realestate', 'hotels', 'ecommerce', 'infrastructure', 'capitalmarkets',
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
