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

// Optional bespoke visuals (currently used by ECLERX to frame the AI debate).
export interface ForkBranch {
  label: string;        // "eClerx captures the value"
  outcomes: string[];   // ["Outcome pricing", "Revenue per employee ↑"]
  tone: 'good' | 'bad';
}

export interface AiFork {
  premise: string;      // the framing sentence above the diagram
  trigger: string;      // the shared cause, e.g. "AI arrives → human effort falls"
  branches: ForkBranch[]; // exactly two: the two ways the value can flow
  takeaway: string;     // one line under the fork
}

export interface Scorecard {
  intro?: string;       // one line: what this table is for
  rows: { metric: string; good: string; bad: string; why: string }[];
  note?: string;
}

export interface Counterpoint {
  heading: string;      // "What if AI makes outsourcing more valuable?"
  body: string;         // the steelman
  caveat: string;       // the honest qualifier
}

export interface MoneyFlow {
  intro?: string;       // optional lead-in
  steps: { label: string; value: string }[]; // vertical flow, top to bottom
  spread: string;       // the punchline: what the spread is
}

export interface EconomicEngineStep {
  label: string;        // "Demand", "Revenue", "Margins"
  value: string;        // "Weddings and festivals", "Gold volume"
  note?: string;
}

export interface CompanyMentalModel {
  model: string;        // "Trust"
  strength: 1 | 2 | 3 | 4 | 5;
  why: string;          // why it matters for this company
}

export interface StrategicPosition {
  label: string;        // "Local jeweller"
  description: string;  // "Cheapest, lowest trust"
  tone?: 'weak' | 'focus' | 'strong';
}

export interface SectorMentalModel {
  model: string;        // "Pricing Power"
  reading: string;      // "Weak", "Strong", "Excellent"
  note?: string;
}

export interface CompanyEditorial {
  realBusiness: string;      // One-sentence mental model
  whyExists: string;         // Why this company deserves to exist
  whyNotAlreadyWon: string;  // Why someone else has not already captured the pool
  mentalModels: CompanyMentalModel[];
  economicEngine: EconomicEngineStep[];
  strategicPosition: StrategicPosition[];
  winningToday: string[];
  stopWinning: string[];
  marketBets: string[];
  sectorModels: SectorMentalModel[];
  whyNow: string;
  remember: string;
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
  editorial?: CompanyEditorial;

  // optional bespoke visuals
  moneyFlow?: MoneyFlow;   // rendered inside the business model block
  aiFork?: AiFork;         // rendered as a standalone framing section
  counterpoint?: Counterpoint; // the steelman, rendered under the AI fork
  scorecard?: Scorecard;   // rendered before the summary

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
