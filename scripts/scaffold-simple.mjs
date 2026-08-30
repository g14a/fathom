#!/usr/bin/env node
// scaffold-simple.mjs
// Generate a FIRST-DRAFT "Explain simply" (`simple`) block for a case study,
// then apply it once you have refined it.
//
//   node scripts/scaffold-simple.mjs <id|path>            # write <id>.simple-draft.json
//   node scripts/scaffold-simple.mjs <id|path> --apply    # splice the refined draft in
//   node scripts/scaffold-simple.mjs <id|path> --apply --force   # replace an existing simple
//
// What it does (the mechanical 80%):
//   - pulls every anchor number, the ex-ante tells, the pattern card, `remember`
//   - maps each investor section to a Simple section stub (prose seeded from the
//     body, footnotes and links stripped), flags where a diagram belongs
//   - builds a near-final `signals` block from exAnte, a `thesis` from patternCard,
//     a closing `bigIdea` + `graduate` stub
//   - marks everything you must rewrite with `_hint` keys (stripped on --apply)
//
// What it does NOT do: write good beginner prose. That is the refine pass. The
// draft is a scaffold to edit down, not a shippable article. Read
// frameworks/EXPLAIN-SIMPLY-CASE-STUDIES.md before refining.
//
// Guarantees on --apply: no em-dashes, no ' - ' punctuation, smart quotes
// straightened, the study still parses, `_*` helper keys removed.

import fs from 'fs';
import path from 'path';

const CS_DIR = 'data/case-studies';
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const positional = args.filter((a) => !a.startsWith('--'));
if (positional.length !== 1) {
  console.error('usage: node scripts/scaffold-simple.mjs <id|path> [--apply] [--force]');
  process.exit(1);
}
const arg = positional[0];
const studyPath = arg.endsWith('.json') ? arg : path.join(CS_DIR, `${arg}.json`);
if (!fs.existsSync(studyPath)) {
  console.error(`not found: ${studyPath}`);
  process.exit(1);
}
const id = path.basename(studyPath).replace(/\.json$/, '');
const draftPath = path.join(path.dirname(studyPath), `${id}.simple-draft.json`);

// ---------- helpers ----------
const REWRITE = 'REWRITE: ';

// Straighten curly quotes only. Em-dashes are left untouched on purpose, so the
// apply guard can catch and reject them rather than silently rewriting them.
function straightenDeep(x) {
  if (typeof x === 'string') return x.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  if (Array.isArray(x)) return x.map(straightenDeep);
  if (x && typeof x === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(x)) out[k] = straightenDeep(v);
    return out;
  }
  return x;
}

// Strip evidence footnotes [^n] and turn [label](url) into plain label.
function stripInline(s) {
  return s
    .replace(/\[\^(\d+)\]/g, '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function firstSentence(s) {
  const m = s.match(/^.*?[.?!](\s|$)/);
  return (m ? m[0] : s).trim();
}

const usedSlugs = new Set();
function slugify(s, fallback) {
  let base = s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .slice(0, 6)
    .join('-');
  if (!base) base = fallback;
  let slug = base;
  let i = 2;
  while (usedSlugs.has(slug)) slug = `${base}-${i++}`;
  usedSlugs.add(slug);
  return slug;
}

// Deep-strip keys beginning with `_` (the writer hints), for --apply.
function stripHints(x) {
  if (Array.isArray(x)) return x.map(stripHints);
  if (x && typeof x === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(x)) {
      if (k.startsWith('_')) continue;
      out[k] = stripHints(v);
    }
    return out;
  }
  return x;
}

// ---------- APPLY MODE ----------
if (flags.has('--apply')) {
  if (!fs.existsSync(draftPath)) {
    console.error(`no draft to apply: ${draftPath}\nrun without --apply first, then refine it.`);
    process.exit(1);
  }
  let simple = JSON.parse(fs.readFileSync(draftPath, 'utf-8'));
  simple = straightenDeep(stripHints(simple));

  // Guard: house formatting rules. Fail loudly rather than ship a violation.
  const violations = [];
  (function walk(x, p) {
    if (typeof x === 'string') {
      if (x.includes('—')) violations.push(`em-dash at ${p}`);
      if (x.includes(' - ')) violations.push(`spaced hyphen at ${p}`);
      if (x.includes(REWRITE)) violations.push(`unresolved ${REWRITE.trim()} marker at ${p}`);
    } else if (Array.isArray(x)) x.forEach((v, i) => walk(v, `${p}[${i}]`));
    else if (x && typeof x === 'object') for (const [k, v] of Object.entries(x)) walk(v, `${p}.${k}`);
  })(simple, 'simple');
  if (violations.length) {
    console.error('cannot apply, unresolved issues:\n  ' + violations.join('\n  '));
    process.exit(1);
  }

  const text = fs.readFileSync(studyPath, 'utf-8');
  const hasSimple = /\n\s*"simple"\s*:/.test(text);
  if (hasSimple && !flags.has('--force')) {
    console.error('study already has a "simple" block. Remove it first, or pass --force (insert-only, will duplicate the key otherwise).');
    process.exit(1);
  }
  // Splice before the first top-level key that is present exactly once. `remember`
  // keeps placement consistent with the earliest hand-written studies; the rest
  // are fallbacks for studies that omit it. `ticker` is always present.
  const anchor = ['  "remember":', '  "published":', '  "answer":', '  "ticker":']
    .find((a) => text.split(a).length - 1 === 1);
  if (!anchor) {
    console.error('could not find a unique top-level key to splice before.');
    process.exit(1);
  }
  let snippet = JSON.stringify(simple, null, 2)
    .split('\n')
    .map((line) => (line ? '  ' + line : line))
    .join('\n')
    .trimStart();
  const insert = '  "simple": ' + snippet + ',\n';
  const out = text.replace(anchor, insert + anchor);
  JSON.parse(out); // must still parse
  fs.writeFileSync(studyPath, out);
  console.log(`applied simple (${simple.sections.length} sections) to ${studyPath}`);
  console.log('now run: grep -rn "\\u2014" lib data app  |  npm run build  |  AI-tell scan');
  process.exit(0);
}

// ---------- SCAFFOLD MODE ----------
const study = JSON.parse(fs.readFileSync(studyPath, 'utf-8'));

const hero = {
  _hint: `${REWRITE}lead = the puzzle in one line; flow = 3-4 rows where several rise and one (tone:muted) is the flat/bad outcome; close = the one question the study answers.`,
  lead: `${REWRITE}${firstSentence(stripInline(study.summary || ''))}`,
  flow: (study.keyNumbers || []).slice(0, 4).map((k, i, a) => ({
    label: k.label,
    sub: k.value,
    ...(i === a.length - 1 ? { tone: 'muted' } : {}),
  })),
  close: `${REWRITE}the one-sentence question this study answers`,
};

const sections = [];

// One Simple section per investor chapter, prose seeded from the body.
for (const sec of study.sections || []) {
  const blocks = [
    {
      _hint: `${REWRITE}this is the investor prose, verbatim. Rewrite for a complete beginner: teach the idea before naming any term, split into short paragraphs, keep every number, cut what does not teach. Prefer a visual block (bigNumber/compare/flow/split/reveal) where one carries the idea.`,
      kind: 'prose',
      text: (sec.body || []).map(stripInline),
    },
  ];
  if (sec.diagram) {
    blocks.push({
      _hint: `${REWRITE}the investor version renders a diagram ("${sec.diagram}") here. Rebuild its idea as a Simple block (flow / split / compare / bigNumber / thesis). Do not reference the diagram id.`,
      kind: 'callout',
      text: `VISUAL PLACEHOLDER for investor diagram "${sec.diagram}".`,
    });
  }
  sections.push({
    _hint: `${REWRITE}turn this heading into a beginner question (one dominant question per section).`,
    id: slugify(sec.heading, `section-${sections.length + 1}`),
    question: sec.heading,
    blocks,
  });
}

// A holding pen of ready-made stat blocks to place where they earn their spot.
if ((study.keyNumbers || []).length) {
  sections.push({
    _hint: `${REWRITE}HOLDING PEN, not a real section. These are your anchor numbers as bigStat blocks. Move each into the section it belongs to, and convert to bigNumber wherever there is a real from->to comparison (prefer relationships over lone numbers). Delete this section when done.`,
    id: slugify('anchor numbers', 'anchor-numbers'),
    question: `${REWRITE}(holding pen: distribute these numbers, then delete)`,
    blocks: study.keyNumbers.map((k) => ({
      kind: 'bigStat',
      value: k.value,
      label: k.label,
    })),
  });
}

// Ex-ante -> signals block (near final; tighten the prose only).
if (study.exAnte && Array.isArray(study.exAnte.tells)) {
  sections.push({
    _hint: `${REWRITE}the ex-ante beat. The signals block below is auto-built from exAnte; tighten each 'signal' to a short watchable phrase and each 'meaning' to plain language. Keep the order.`,
    id: slugify('could you have seen it', 'could-you-have-seen'),
    question: study.exAnte.heading
      ? `${REWRITE}${study.exAnte.heading}`
      : 'Could you have seen it, and when?',
    blocks: [
      {
        kind: 'signals',
        heading: 'What you could have watched, and where',
        rows: study.exAnte.tells.map((t) => ({
          signal: stripInline(t.lead || t.check || ''),
          where: [t.when, t.document].filter(Boolean).map(stripInline).join(': '),
          meaning: stripInline(t.meaning || ''),
        })),
        ...(study.exAnte.blindSpot ? { blindSpot: stripInline(study.exAnte.blindSpot) } : {}),
      },
    ],
  });
}

// Pattern card -> a thesis (recolour/reword as needed).
if (study.patternCard) {
  const pc = study.patternCard;
  const items = [];
  if (pc.signal) items.push({ tone: 'warn', label: 'The signal', text: stripInline(pc.signal) });
  if (pc.mechanism) items.push({ tone: 'bad', label: 'The mechanism', text: stripInline(pc.mechanism) });
  if (pc.whereToCheck) items.push({ tone: 'good', label: 'Where to check', text: stripInline(pc.whereToCheck) });
  if (pc.counterexample) items.push({ tone: 'warn', label: 'The counterexample', text: stripInline(pc.counterexample) });
  sections.push({
    _hint: `${REWRITE}the reusable pattern. A thesis is one option; a flow or split may read better. State the primary pattern once, plainly.`,
    id: slugify('the pattern', 'the-pattern'),
    question: `${REWRITE}what should the reader recognise elsewhere?`,
    blocks: [{ kind: 'thesis', heading: `${REWRITE}the pattern in a line`, items }],
  });
}

// Closing bigIdea + graduate glossary stub.
sections.push({
  _hint: `${REWRITE}the close. bigIdea = one memorable line (seeded from 'remember'). graduate.glossary = every term you taught inline via [[term|def|context]], each with a plain def and a company-specific context line.`,
  id: 'graduate',
  question: 'The language behind the story',
  blocks: [
    { kind: 'bigIdea', text: study.remember ? `${REWRITE}${stripInline(study.remember)}` : `${REWRITE}one memorable closing line` },
    {
      kind: 'graduate',
      intro: 'The case study uses these words. Now you know what they mean.',
      ctaLabel: 'Read the investor case study',
      glossary: [
        { term: `${REWRITE}Term 1`, def: `${REWRITE}plain definition`, context: `${REWRITE}what it meant for this company` },
      ],
    },
  ],
});

const simple = { hero, sections };
fs.writeFileSync(draftPath, JSON.stringify(simple, null, 2) + '\n');

// ---------- refine checklist ----------
const nInvestor = (study.sections || []).length;
console.log(`\nDraft written: ${draftPath}`);
console.log(`  ${nInvestor} investor chapters -> ${sections.length} scaffold sections (incl. holding pen, ex-ante, pattern, graduate).`);
console.log(`\nRefine (read frameworks/EXPLAIN-SIMPLY-CASE-STUDIES.md first):`);
console.log(`  1. Rewrite every "${REWRITE.trim()}" field. Teach before naming; one dominant question per section.`);
console.log(`  2. Distribute the holding-pen numbers into their sections; convert to bigNumber (from->to) where a comparison exists; delete the pen.`);
console.log(`  3. Replace each VISUAL PLACEHOLDER with a real Simple block.`);
console.log(`  4. Add 2-4 analogies max, each preserving the mechanism. At most one 'reveal'.`);
console.log(`  5. Anti-redundancy: each idea explained once, in the section that owns it.`);
console.log(`  6. Fill the graduate glossary from the terms you taught inline.`);
console.log(`\nThen: node scripts/scaffold-simple.mjs ${id} --apply`);
console.log(`Verify: grep -rn "\\u2014" lib data app  ·  npm run build  ·  AI-tell scan  ·  read at phone width.`);
