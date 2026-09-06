// Repetition checker: detects when the same idea (6-word phrase) appears in
// three or more distinct prose slots of a company report, which violates the
// "one job per prose slot" editorial rule. Each idea should be stated once, in
// the slot that owns it, and other slots reference rather than re-argue.
//
// Usage: node scripts/check-repetition.mjs [--strict]
//   Default (no flag): exits 0, prints warning banner. Use in CI.
//   --strict: exits 1 if any report violates. Use for local strict mode.
//
// Slots checked and their one job:
//   oneLiner                the full thesis in one sentence
//   overview                what the business does, in plain words
//   narrative               the history and numbers story
//   priceAction             price mechanics only
//   summary                 a three-line recap that references, never re-argues
//   moat.note               what the moat is, plus one honest caveat
//   engine                  the earnings and multiple mechanics (all strings)
//   lenses                  each lens is one distinct angle (all strings)
//   editorial               editorial block (all strings, including whyNotAlreadyWon, whyNow, remember)
//   business.qualityVerdict operator quality

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const strict = process.argv.includes('--strict');

// Stopwords: common function words that alone do not carry editorial meaning
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'being', 'both', 'but',
  'by', 'can', 'could', 'did', 'do', 'does', 'each', 'either', 'for', 'from',
  'had', 'has', 'have', 'he', 'her', 'hers', 'him', 'his', 'how', 'i', 'if',
  'in', 'into', 'is', 'it', 'its', 'me', 'may', 'might', 'more', 'most', 'my',
  'myself', 'no', 'not', 'of', 'on', 'only', 'or', 'our', 'ours', 'out', 'over',
  'own', 'same', 'shall', 'she', 'should', 'so', 'some', 'such', 'than', 'that',
  'the', 'their', 'theirs', 'them', 'then', 'there', 'these', 'they', 'this',
  'those', 'to', 'too', 'under', 'until', 'up', 'very', 'we', 'were', 'what',
  'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with',
  'would', 'you', 'your', 'yours',
]);

// Extract all strings at any depth in a value
function extractStrings(val) {
  const strs = [];
  if (val === null || val === undefined) return strs;
  if (typeof val === 'string') return [val];
  if (Array.isArray(val)) {
    for (const item of val) {
      strs.push(...extractStrings(item));
    }
  } else if (typeof val === 'object') {
    for (const v of Object.values(val)) {
      strs.push(...extractStrings(v));
    }
  }
  return strs;
}

// Normalize text: lowercase, keep only letters, digits, %, spaces
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9%\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Extract 6-word sequences from normalized text. Returns array of sequences.
function extract6WordSequences(text) {
  const words = text.split(/\s+/);
  const sequences = [];
  for (let i = 0; i <= words.length - 6; i++) {
    const seq = words.slice(i, i + 6).join(' ');
    sequences.push(seq);
  }
  return sequences;
}

// Check if a sequence is pure stopwords
function isPureStopwords(seq) {
  const words = seq.split(/\s+/);
  return words.every((w) => STOPWORDS.has(w));
}

// Extract prose slots from a report
function extractSlots(report) {
  const slots = {};

  if (report.oneLiner) slots.oneLiner = normalize(report.oneLiner);
  if (report.overview) slots.overview = normalize(report.overview);
  if (report.narrative) slots.narrative = normalize(report.narrative);
  if (report.priceAction) slots.priceAction = normalize(report.priceAction);
  if (report.summary) slots.summary = normalize(report.summary);

  if (report.moat?.note) slots.moat = normalize(report.moat.note);

  if (report.engine) {
    const strs = extractStrings(report.engine);
    slots.engine = normalize(strs.join(' '));
  }

  if (report.lenses) {
    const strs = extractStrings(report.lenses);
    slots.lenses = normalize(strs.join(' '));
  }

  if (report.editorial) {
    const strs = extractStrings(report.editorial);
    slots.editorial = normalize(strs.join(' '));
  }

  if (report.business?.qualityVerdict) {
    slots.qualityVerdict = normalize(report.business.qualityVerdict);
  }

  return slots;
}

// Find violations: 6-word sequences that appear in 3+ slots
function findViolations(slots) {
  const seqToSlots = {}; // seq => Set of slot names
  const seqToIndex = {}; // seq => first position in original text

  for (const [slotName, text] of Object.entries(slots)) {
    if (!text) continue;
    const seqs = extract6WordSequences(text);
    for (const seq of seqs) {
      if (isPureStopwords(seq)) continue;
      if (!seqToSlots[seq]) {
        seqToSlots[seq] = new Set();
        seqToIndex[seq] = text.indexOf(seq);
      }
      seqToSlots[seq].add(slotName);
    }
  }

  // Filter to violations: 3+ slots
  const violations = [];
  for (const [seq, slotSet] of Object.entries(seqToSlots)) {
    if (slotSet.size >= 3) {
      violations.push({
        seq,
        slots: Array.from(slotSet).sort(),
        pos: seqToIndex[seq],
      });
    }
  }

  return violations;
}

// Merge overlapping sequences with the same slot set. Keep the longest.
function mergeOverlapping(violations) {
  violations.sort((a, b) => a.pos - b.pos);

  const merged = [];
  for (const v of violations) {
    if (merged.length === 0) {
      merged.push(v);
      continue;
    }

    const last = merged[merged.length - 1];
    const lastWords = last.seq.split(/\s+/);
    const currWords = v.seq.split(/\s+/);
    const lastEnd = last.pos + last.seq.length;

    // Check if overlapping and same slot set
    if (
      v.pos < lastEnd &&
      last.slots.length === v.slots.length &&
      last.slots.every((s) => v.slots.includes(s))
    ) {
      // Merge: keep the longer one
      if (v.seq.length > last.seq.length) {
        merged[merged.length - 1] = v;
      }
    } else {
      merged.push(v);
    }
  }

  return merged;
}

// Load and process all reports
const dataDir = '/Users/gowtham/fathom/data/companies';
const files = readdirSync(dataDir)
  .filter((f) => f.endsWith('.json'))
  .sort();

const results = []; // { slug, violations: [] }

for (const file of files) {
  const slug = file.replace(/\.json$/, '');
  const path = join(dataDir, file);

  try {
    const data = JSON.parse(readFileSync(path, 'utf8'));
    const slots = extractSlots(data);
    const violations = findViolations(slots);
    const merged = mergeOverlapping(violations);

    if (merged.length > 0) {
      results.push({ slug, violations: merged });
    }
  } catch (err) {
    console.error(`Error processing ${slug}: ${err.message}`);
  }
}

// Sort by violation count, worst first
results.sort((a, b) => b.violations.length - a.violations.length);

// Print results
const totalWithViolations = results.length;
const banner = strict
  ? '\nRepetition Check (strict mode)\n'
  : '\nRepetition Check (CI mode: exits 0)\n';
console.log(banner);

for (const { slug, violations } of results) {
  const count = violations.length;
  console.log(
    `${slug}  ${count} repeated phrase${count === 1 ? '' : 's'}`
  );

  // Print at most 4 worst violations
  const toShow = violations.slice(0, 4);
  for (const { seq, slots } of toShow) {
    console.log(`    "${seq}"  [${slots.join(', ')}]`);
  }

  if (violations.length > 4) {
    console.log(`    ... and ${violations.length - 4} more`);
  }
}

console.log(
  `\nSummary: ${totalWithViolations} of ${files.length} reports have violations\n`
);

process.exit(strict && totalWithViolations > 0 ? 1 : 0);
