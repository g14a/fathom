import fs from 'fs';
import path from 'path';

// A "signal" is a market-moving event (a Budget, a rate decision, a tariff, a
// fuel-price move) explained as a change to business economics, not as news.

export interface SignalModel {
  name: string;
  why: string;
}

export interface SignalActor {
  label: string;
  why: string;
  when?: 'immediate' | 'delayed' | 'long-term';
}

// A worked calculation, shown as an equation rather than buried in a sentence.
// `frac` stacks a numerator over a denominator with a rule between, so the reader
// sees which figure went where. Everything renders from CSS; there is no math engine.
export interface SignalMathTerm {
  kind: 'text' | 'op' | 'result' | 'frac' | 'pow';
  value?: string; // text, op and result
  num?: string;    // frac only
  den?: string;    // frac only
  numExp?: string; // frac only: superscript on the numerator
  denExp?: string; // frac only: superscript on the denominator
  exp?: string;    // pow only: the superscript
}

export interface SignalFormula {
  label?: string;
  // A sentence in plain words above the equation, saying what it is about to
  // show. The note under the equation says what the answer means.
  lead?: string;
  exprCaption?: string;
  expr: SignalMathTerm[];
  // Further equations shown inside the same box, for the same sum run on a
  // second window or a second assumption. Each may carry its own small caption.
  lines?: { caption?: string; expr: SignalMathTerm[] }[];
  note?: string;
}

export interface SignalSection {
  heading: string;
  body: string[];
  diagram?: string; // 'chain', or 'fanout:N' to render fanouts[N] after the body
  evidenceAfter?: boolean; // render the evidence block right after this section
  image?: { src: string; alt: string; caption?: string }; // a figure rendered after the body
  // A compact synthesis table rendered after the body. Cells accept inline
  // markdown links. Kept short on purpose; a signal is not a sector-picking list.
  table?: { columns: string[]; rows: string[][] };
  // A short numbered stage flow (rendered like the chain) when diagram is 'flow'.
  flow?: string[];
  // Worked calculations, rendered as equations after the table.
  math?: SignalFormula[];
}

// One curated research thread: a bottleneck, and the internal pages that follow
// it down, sector to company to case study. Makes Fathom's knowledge graph visible.
export interface SignalThread {
  bottleneck: string;   // the thread label, e.g. "Power and grid"
  sector?: string;      // sector id
  report?: string;      // company ticker
  caseStudy?: string;   // case-study id
}

// The signature "which moved?" band: price / cost / volume, each asked or marked.
export interface SignalLeverBand {
  title: string;
  items: { label: string; mark?: 'ask' | 'yes' | 'no' }[];
}

export interface SignalHistory {
  when: string;
  what: string;
  lesson?: string;
}

// A fan-out: one event, several businesses, each helped or hurt. The proof that
// the same signal lands differently depending on the business.
export interface SignalFanout {
  head: string;        // the event, e.g. "Crude oil rises 20%"
  branches: { label: string; effect: 'up' | 'down' | 'neutral'; note?: string }[];
  caption?: string;
  kicker?: string;     // overrides the "The fan-out" label (e.g. to sound like the writer's notes)
}

// The same effect at different distances in time.
export interface SignalHorizon {
  event: string;
  immediate: string;
  sixMonths: string;
  twoYears: string;
}

// A pattern the reader can recognise: this event rhymes with that past one.
export interface SignalRhyme {
  event: string;
  similar: string;
  model: string;
}

// Proof block: show the framework's predicted metric actually moving, in real
// company numbers, before vs after the event. Kept honest and sourced.
export interface SignalEvidenceBank {
  name: string;
  basis: string;        // which NIM is quoted, e.g. "whole-bank NIM" / "domestic NIM"
  beforeLabel: string;  // e.g. "Q1 FY25"
  before: number;       // the metric a year earlier, apples-to-apples
  afterLabel: string;   // e.g. "Q1 FY26"
  after: number;        // the metric after the event
  exposure: string;     // why this bank sits in the fast-repricing bucket
  sourceUrl: string;    // primary/named coverage for this bank's numbers
}
// One driver line inside the mechanism table: a component of the spread, shown
// before vs after, so the reader watches the squeeze form rather than being told.
export interface SignalEvidenceDriver {
  label: string;   // e.g. "Yield on advances"
  before: number;
  after: number;
  unit: string;    // e.g. "%"
  takeaway: string;// what this line means for the spread
}
export interface SignalEvidence {
  heading: string;      // section heading, framed as an investigation
  metricLabel: string;  // e.g. "Net interest margin (NIM)"
  unit: string;         // e.g. "%"
  prediction: string;   // the explicit if-then before any number is shown
  predictionLabel?: string; // overrides the default "The prediction" kicker
  intro: string[];      // who fits the mechanism (examples, not a ranked claim)
  drivers?: {           // the spread taken apart, in one lead bank
    bankName: string;
    beforeLabel: string;
    afterLabel: string;
    sourceUrl: string;
    sourceLabel?: string; // named link text for the source (falls back to "<bankName> results")
    intro: string;
    rows: SignalEvidenceDriver[];
    summary: string;    // the one-line reading of the three rows together
  };
  banks: SignalEvidenceBank[];
  deltaUnit?: string;      // how to render the change: 'bps' (default, for margins) or a unit like ' lakh cr'
  contextLine: string;     // the chart subtitle: the driver's move + what we expect to see
  directionLine: string;   // "both moved the way the framework predicted"
  causeEvidence?: string;  // primary evidence for the cause, not just the outcome
  contrast?: string;       // an entity that barely moved, proving it is the shape/position that matters
  seasonalityNote: string; // why we compare the way we do, plus any honest caveat
  robustness?: string[];   // try to break the attribution: what else could move the metric, and why the event still leads
  anticipation?: string;   // whether the move was forecast ahead of time
  recovery?: string[];     // the second half of the clock, where the event has one
  caption?: string;
}

// An end-of-article exercise: pose a fresh event, then reveal how to reason it.
export interface SignalYourTurn {
  prompt: string;
  questions: string[];
  reveal: string[];
}

export interface Signal {
  id: string;          // URL slug, injected from the filename
  title: string;
  kind: string;        // e.g. "Primer", "Rate decision", "Union Budget", "Tariffs" (drives sort/behaviour)
  kindLabel?: string;  // display-only override for the visible kind tag (kind stays for sorting)
  dateline: string;    // e.g. "Start here" or "Feb 2025"
  published?: string;  // ISO date (YYYY-MM-DD) this signal went live; drives Article dates and sitemap lastmod
  tags: string[];
  summary: string;     // one-line hook for the index card
  seoTitle?: string;   // search-oriented <title> (the visible H1 stays editorial)
  seoDescription?: string; // search-oriented meta description
  event: string[];     // what happened, in plain words (aim for 100-150 words)
  trigger?: string;    // the single business change the event reduces to
  triggerLabel?: string; // overrides the default "The one equation" kicker
  triggerBody?: string[]; // optional explanation paragraphs under the trigger hero
  leverBand?: SignalLeverBand; // the "which moved?" price/cost/volume band
  mentalModels?: SignalModel[];
  fanouts?: SignalFanout[];   // one event, many businesses, different outcomes
  chainTitle?: string;
  chain?: string[];    // the causal chain, rendered as a vertical flow
  winners?: SignalActor[];
  losers?: SignalActor[];
  sections?: SignalSection[]; // freeform teaching blocks
  evidence?: SignalEvidence;  // real numbers proving the predicted metric moved
  horizonsTitle?: string;     // overrides the default heading over the horizons table
  horizons?: SignalHorizon[]; // the same event across immediate / 6 months / 2 years
  ignore?: string[];          // what to tune out
  focus?: string[];           // what to actually watch
  questions?: string[];       // the better questions to ask
  questionsTitle?: string;    // overrides the "Questions worth asking" heading
  questionsIntro?: string;    // optional lede under that heading
  history?: SignalHistory[];
  historyRhymes?: SignalRhyme[]; // the pattern table
  yourTurn?: SignalYourTurn;     // the end-of-article exercise
  relatedSectors?: string[];
  relatedReports?: string[];   // explicit on-thread company tickers; overrides the sector-derived dump
  relatedCaseStudies?: string[];
  threads?: SignalThread[];    // curated bottleneck -> sector -> company -> case study threads
  sources?: { label: string; url: string }[];
  lesson: string;
  lessonLabel?: string; // overrides the "The lesson" kicker on the closing box
  remember?: string;   // one-sentence takeaway, rendered as the closing box
}

const SIG_DIR = path.join(process.cwd(), 'data', 'signals');

function getAllIds(): string[] {
  return fs
    .readdirSync(SIG_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

export function getSignal(id: string): Signal | undefined {
  const file = path.join(SIG_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return undefined;
  const data = JSON.parse(fs.readFileSync(file, 'utf-8')) as Omit<Signal, 'id'>;
  return { ...data, id };
}

export function getAllSignals(): Signal[] {
  return getAllIds()
    .map((id) => getSignal(id)!)
    // Primers first, then the rest alphabetically by title.
    .sort((a, b) => {
      if (a.kind === 'Primer' && b.kind !== 'Primer') return -1;
      if (b.kind === 'Primer' && a.kind !== 'Primer') return 1;
      return a.title.localeCompare(b.title);
    });
}
