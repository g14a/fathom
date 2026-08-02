// Schema for one ticker's research report.
// Mirrors the indian-stock-analyzer skill's 14-section structure.

export type Verdict =
  | 'strong-buy' | 'buy' | 'accumulate' | 'hold' | 'avoid' | 'sell';

export type MoatStrength = 'wide' | 'narrow' | 'none' | 'eroding';

export type EngineState =
  | 'earnings-engine' | 'multiple-engine' | 'both-firing'
  | 'both-stalling' | 'multiple-drift';

export interface Metric {
  label: string;
  value: string;        // pre-formatted, verbatim from source
  hint?: string;        // e.g. "vs industry 24.3"
  tone?: 'good' | 'bad' | 'neutral';
}

export interface FinancialRow {
  year: string;         // "FY22"
  revenue: number;      // ₹ cr
  netProfit: number;    // ₹ cr
  eps: number;
  patMargin: number;    // %
}

export interface HoldingSlice {
  label: 'Promoter' | 'FII' | 'DII' | 'Retail' | 'Other';
  pct: number;
  qoqChange?: number;   // pp change
}

export interface ChecklistItem {
  label: string;
  status: 'pass' | 'fail' | 'warn' | 'na';
  note?: string;
}

export interface CaseStudy {
  title: string;
  period?: string;   // e.g. "2018 → 2020"
  body: string[];    // paragraphs
  lesson?: string;   // the takeaway
}

export interface EngineAssessment {
  state: EngineState;
  earnings: string;     // narrative
  multiple: string;
  verdict: string;
}

export interface Lens {
  name: string;         // "Circle of Competence"
  reading: string;
}

export interface TickerReport {
  // header
  ticker: string;      // display symbol, e.g. "M&M"
  slug?: string;       // URL-safe route id (filename), injected by the loader
  company: string;
  sector: string;
  industry: string;
  sectorId?: string;   // links to /sectors/<id> explainer
  dataVariant: 'Consolidated' | 'Standalone';
  asOf: string;         // ISO date of the research run
  verdict: Verdict;
  oneLiner: string;     // 1-sentence thesis
  isSample?: boolean;   // flag placeholder data

  // 1. overview
  overview: string;
  ipoFlag?: string;

  // 1b. business model
  business: {
    unitOfRevenue: string;
    revenueModel: string;
    segments: { name: string; pct: number; marginProfile: string }[];
    revenuePerUnitTrend: string;
    industry: {
      structure: string;
      competitors: string;
      pricingPower: string;
      demandDriver: string;
      driverType: string;
      tam: string;
      penetration: string;
      valueChainPosition: string;
    };
    qualityVerdict: string;
  };

  // 2. valuation
  valuation: Metric[];

  // 3. financials (5Y)
  financials: FinancialRow[];

  // 4. key ratios
  ratios: Metric[];

  // 4b. cash flow forensics
  cashFlow: { year: string; ocf: number; capex?: number; fcf?: number }[];
  cashFlowNote: string;

  // 5. growth
  growth: Metric[];

  // 6. management
  management: string;

  // 7. holding
  holding: HoldingSlice[];
  pledged?: number;

  // 8. moat
  moat: { strength: MoatStrength; sources: string[]; note: string };

  // bespoke case studies (optional, keeps reports distinct)
  caseStudies?: CaseStudy[];

  // 9. narrative
  narrative: string;

  // 10. price action
  priceAction: string;

  // 11. risks
  risks: string[];

  // 11b. trap detection
  trapChecklist: ChecklistItem[];

  // 11c. sector checklist
  sectorChecklist: ChecklistItem[];

  // 12. summary
  summary: string;

  // 13. two-engine
  engine: EngineAssessment;

  // 14. lenses
  lenses: Lens[];
}
