// Schema for one ticker's research report.
// Mirrors the indian-stock-analyzer skill's 14-section structure.

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
  earningsLabel?: string; // box heading, defaults to "Earnings engine"
  multipleLabel?: string; // box heading, defaults to "Multiple engine"
  verdict: string;
}

export interface Lens {
  name: string;         // "Circle of Competence"
  reading: string;
}

// Forward view. Its ONE job is the future, and its discipline is to MONITOR, not
// conclude: for each area, state what has already happened (facts), then the open
// question the reader can watch. It never predicts; it hands the reader the dials.
export interface Outlook {
  intro?: string;

  // the areas to monitor: facts that have happened, then the question to watch
  areas: {
    title: string;      // "The core business"
    facts: string[];    // what has already happened (sourced numbers)
    watch: string;      // the open question, phrased as something to monitor
  }[];

  // acquired/contracted capacity that has NOT hit reported earnings yet.
  // The one metaphor that earns its place: capacity won vs profit reported.
  loadingEngines?: {
    name: string;
    whatItIs: string;   // plain-words: what it becomes
    notYetInPnL: string;// why today's numbers don't show it
    whenItLands: string;// "FY27-28"
  }[];

  closer?: string;      // one line: "The next few quarters should answer these."
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
  title?: string;       // block heading; defaults to "AI Transition Scorecard"
  intro?: string;       // one line: what this table is for
  rows: { metric: string; testing?: string; good: string; bad: string; why: string }[];
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

// ---------------------------------------------------------------------------
// "Explain Simply" mode.
//
// NOT a re-worded article. An interactive explanation of the business, built as
// a SEQUENCE OF VISUAL OBJECTS, not paragraphs. Each section answers one
// question and carries one visual anchor: a big idea, a flow, a before/after,
// a big number, a money flow, a reveal, a split, an analogy, or the closing
// thesis. Prose is the exception, used only when nothing visual will do.
//
// This is the TEACH-ME mode, not the summary. Investor mode states the
// conclusions; Simple mode walks the reader up to them from first principles,
// using the company itself as the teaching example. It may run LONGER than the
// investor report. Never simplify by deleting a concept: simplify by explaining
// it. Sections form an ordered curriculum, each a question that teaches the
// idea before naming it.
//
// Rules that do not bend: same figures as the investor report, every number
// traceable to it. No em-dashes, no spaced hyphens, no fabricated numbers, and
// no decorative emoji. Terminology appears only AFTER the idea lands, as a quiet
// inline chip with an optional company-specific second line:
//   `[[ARPU|The average monthly bill across all customers.|Airtel has hundreds
//   of millions of them, so a small rise is huge.]]`
// The third field is optional: `[[term|plain definition]]` also works.
// ---------------------------------------------------------------------------

// One node in a vertical flow diagram.
export interface SimpleFlowStep {
  label: string;
  sub?: string;                 // small line under the label
  tone?: 'accent' | 'muted';    // accent = the payoff node
}

// A before/after industry comparison (the 12 -> 3 roads collapse).
export interface SimpleCompareSide {
  year: string;
  count: string;                // "12", "3": the dramatic headline number
  unit: string;                 // "companies"
  players: string[];
  caption: string;
}

// One column of a two-column split (business vs stock, or Airtel vs Jio).
export interface SimpleSplitCol {
  tone: 'good' | 'bad' | 'neutral';
  title: string;                // "Business", "Airtel"
  verdict: string;              // "Excellent", "Winning"
  rows: string[];               // ["Competition down", "ARPU up", ...]
}

// One line of the closing thesis, colour-coded by role.
export interface SimpleThesisItem {
  tone: 'good' | 'warn' | 'bad';
  label: string;                // "The business"
  text: string;                 // "Getting better..."
}

// The visual objects Simple mode is built from.
export type SimpleBlock =
  // A large, standalone statement. The section's headline idea.
  | { kind: 'bigIdea'; text: string }
  // A vertical flow diagram (build the road -> add a customer -> more profit).
  | { kind: 'flow'; steps: SimpleFlowStep[] }
  // Several parts converging into one thing at a cost (the physical network:
  // towers + fibre + spectrum -> one national network -> billions to build).
  | { kind: 'converge'; items: string[]; result: string; cost: string }
  // A decision tree: a trigger forces a choice, each branch has a consequence
  // (Jio cuts to 250 -> Airtel must match, losing revenue, or hold, losing users).
  | {
      kind: 'branch';
      trigger: string;
      decision: string;
      options: { label: string; outcome: string; tone?: 'bad' | 'good' }[];
    }
  // The crowded-to-concentrated before/after.
  | { kind: 'compare'; before: SimpleCompareSide; after: SimpleCompareSide; punch: string }
  // One hero number that moved, with optional two-bar comparison.
  | {
      kind: 'bigNumber';
      kicker?: string;      // semantic tag: "The bill", "The collapse", "The shock"
      from: string;
      to: string;
      fromSub?: string;                                // small line under `from` (e.g. a year)
      toSub?: string;                                  // small line under `to`
      toTone?: 'good' | 'bad';                         // colour the `to` value (e.g. red for a loss)
      delta?: string;                                  // change badge, e.g. "+147%"
      label: string;                                   // what the number is
      bars?: { label: string; value: number; display: string }[];
      insight: string;
      term?: string;                                   // "ARPU", shown tiny
    }
  // A single huge stat that IS the point (a valuation multiple, a share). The
  // number carries the weight; one line labels it.
  | { kind: 'bigStat'; kicker?: string; value: string; label: string; tone?: 'accent' | 'bad' }
  // "Where ₹100 goes": bars where the leftover visually dominates.
  | {
      kind: 'moneyFlow';
      totalLabel: string;
      totalDisplay: string;
      parts: { label: string; value: number; display: string; tone: 'spent' | 'left' }[];
      punch: string;
    }
  // One highlighted insight line. The takeaway of a visual.
  | { kind: 'insight'; text: string }
  // The conversational "aha": a setup, the calculation, then the giant payoff.
  | { kind: 'reveal'; prompt: string; calc?: string; bigAnswer: string; sub?: string; note: string }
  // Two columns compared (business quality vs stock price).
  | { kind: 'split'; left: SimpleSplitCol; right: SimpleSplitCol; punch: string }
  // A plain-language analogy that ends in the real term (lemonade -> P/E).
  | { kind: 'analogy'; lead: string; body: string; term?: string }
  // The closing visual thesis: business / catch / question.
  | { kind: 'thesis'; heading: string; items: SimpleThesisItem[] }
  // "Why should you care?" ties a concept just taught back to the thesis.
  | { kind: 'callout'; label?: string; text: string }
  // The ex-ante investigation table: what an investor could have watched, where
  // to find it, and what it meant. `blindSpot` is the honest "and this part you
  // could not have known" line. The signature "could you have seen it" feature.
  | {
      kind: 'signals';
      heading?: string;
      rows: { signal: string; where: string; meaning: string }[];
      blindSpot?: string;
    }
  // Two things true at once (a great business AND an expensive stock). The
  // engine of real investing judgement, so Simple mode teaches it head on.
  | { kind: 'tension'; a: string; b: string; resolve: string }
  // The closing hand-off and the Simple -> Investor bridge. `glossary` is the
  // vocabulary picked up along the way, each term hoverable for its definition,
  // so the reader can carry the words into the investor report.
  | {
      kind: 'graduate';
      intro: string;
      glossary: { term: string; def: string; context?: string }[];
      ctaLabel: string;
    }
  // Short paragraphs. `aside` shifts it into the calmer "in everyday terms"
  // register (a quiet left-rule + small label) so an analogy or explanation
  // reads as a step away from the story, distinct from an emphatic `insight`.
  | { kind: 'prose'; text: string[]; aside?: string };

export interface SimpleSection {
  id: string;
  question: string;             // the one question this section answers
  teaches?: string[];           // concepts this stop on the journey teaches
  blocks: SimpleBlock[];
}

// The hero: title, one opening idea, a flow that teaches the business in
// seconds, and a closing line. No wall of text before the first visual.
export interface SimpleHero {
  lead: string;
  flow: SimpleFlowStep[];
  close: string;
}

export interface SimpleReportData {
  hero: SimpleHero;
  sections: SimpleSection[];
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
  oneLiner: string;     // 1-sentence thesis
  isSample?: boolean;   // flag placeholder data

  // Optional "Fathom view" card at the top of a report: a scannable read of the
  // business across a few axes, plus the one question that decides it. This is a
  // business verdict, never a buy/sell call. `tone` uses the semantic tokens.
  verdict?: {
    rows: { label: string; value: string; tone: 'good' | 'warn' | 'bad' }[];
    keyQuestion: string;
  };

  // Plain factual snapshot for the "about <company>" reader (and FAQ schema).
  // All fields are real, filing-sourced facts. Omit any that are not known;
  // never estimate. `snapshot` is a jargon-free one-liner of what the company
  // actually does (not the thesis, that is `oneLiner`).
  facts?: {
    snapshot: string;    // plain "what it does" sentence, no stance
    founded?: string;    // year, e.g. "2000"
    hq?: string;         // e.g. "Mumbai"
    employees?: string;  // e.g. "~18,000"
  };

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

  // 10. risks
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

  // 15. forward view (optional): what the numbers don't show yet
  outlook?: Outlook;

  // "Explain Simply" (ELI15) reading of this report. Optional: a report without
  // it simply shows no mode toggle. See SimpleReportData above.
  simple?: SimpleReportData;
}
