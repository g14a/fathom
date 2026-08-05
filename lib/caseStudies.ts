import fs from 'fs';
import path from 'path';

export interface CaseSection {
  heading: string;
  body: string[];
  diagram?: string; // id of an inline diagram to render after the body (see the page renderer)
  scorecard?: {     // optional end-of-chapter recap: what grew, what worsened, why the owner still waited
    improved: string;
    worsened: string;
    shareholder: string;
    labels?: {      // optional row-label overrides (default: Grew / Got worse / Shareholder)
      improved?: string;
      worsened?: string;
      shareholder?: string;
    };
  };
  lens?: {          // optional framing callout: a recurring set of questions to carry through the study
    label: string;
    questions: string[];
  };
}

export interface CaseStudy {
  id: string;          // URL slug, injected from the filename
  ticker: string;      // display ticker of the company
  stockSlug?: string;  // route slug of the stock report, if one exists (for cross-linking)
  company: string;
  title: string;
  period: string;      // e.g. "2018 → 2020"
  tags: string[];
  sectorId?: string;             // links to the /sectors/<id> fundamentals primer
  relatedCaseStudies?: string[]; // ids of other case studies referenced here
  summary: string;     // one-line hook for the index card
  keyNumbers: { label: string; value: string }[];
  intro: string[];     // opening paragraphs
  sections: CaseSection[];
  evidence?: {
    caption: string;
    rows: { label: string; value: string; source?: string }[];
    note?: string;
  };
  exhibits?: { src: string; caption: string; source: string }[];
  sources?: { label: string; url: string }[];
  timeline: { when: string; what: string }[];
  lesson: string;
  remember?: string; // one-sentence takeaway, rendered as the closing box
}

const CS_DIR = path.join(process.cwd(), 'data', 'case-studies');

function getAllIds(): string[] {
  return fs
    .readdirSync(CS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

export function getCaseStudy(id: string): CaseStudy | undefined {
  const file = path.join(CS_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return undefined;
  const data = JSON.parse(fs.readFileSync(file, 'utf-8')) as Omit<CaseStudy, 'id'>;
  return { ...data, id };
}

export function getAllCaseStudies(): CaseStudy[] {
  return getAllIds()
    .map((id) => getCaseStudy(id)!)
    .sort((a, b) => b.period.localeCompare(a.period));
}

export function getCaseStudiesForTicker(ticker: string): CaseStudy[] {
  return getAllCaseStudies().filter((c) => c.ticker === ticker);
}
