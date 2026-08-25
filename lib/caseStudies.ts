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
    // `noteRef` renders a small superscript on the row linking to the matching
    // evidence note (which carries the source and confidence tier).
    rows: { label: string; value: string; source?: string; noteRef?: number }[];
    note?: string;
  };
  exhibits?: { src: string; caption: string; source: string }[];
  sources?: { label: string; url: string }[];
  // "What you could have seen, and when": ex-ante tells, each anchored to a dated
  // public document and the specific line a reader could have checked at the time.
  exAnte?: {
    heading?: string;   // defaults to "What you could have seen, and when"
    intro?: string[];
    tells: {
      when: string;     // the date or period of the document
      document: string; // the specific public document
      check: string;    // the line or number a reader could have looked up
      meaning: string;  // what it told you, in plain words
      lead: string;     // how far ahead of the outcome it was
    }[];
    blindSpot?: string; // the honest "and this part you could not have seen" note
  };
  // The reusable closing card: signal, mechanism, where to check it in a filing,
  // plus the condition under which the naive version of the lesson is wrong.
  patternCard?: {
    signal: string;
    mechanism: string;
    whereToCheck: string;
    counterexample: string;
  };
  published?: string; // ISO date (YYYY-MM-DD) this study went live; drives "latest" ordering
  timeline: { when: string; what: string }[];
  // Endnotes for the [^n] superscript markers in body text: where a load-bearing
  // claim comes from and how solid it is, in prose.
  evidenceNotes?: { id: number; note: string; confidence?: 'high' | 'medium' | 'low' }[];
  lesson?: string;
  remember?: string; // one-sentence takeaway, rendered as the closing box
  simple?: import('@/lib/types').SimpleReportData;
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

// Newest first, by explicit `published` date; those without one sort last.
export function getFeaturedCaseStudies(n = 2): CaseStudy[] {
  return [...getAllCaseStudies()]
    .sort((a, b) => (b.published ?? '').localeCompare(a.published ?? ''))
    .filter((c) => c.published)
    .slice(0, n);
}

export function getLatestCaseStudy(): CaseStudy | undefined {
  return getFeaturedCaseStudies(1)[0];
}
