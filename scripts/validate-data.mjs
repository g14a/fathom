// Validate JSON data files against their TypeScript schemas. Runs on each file
// in data/companies/, data/sectors/, data/case-studies/, and data/signals/ to
// catch malformed JSON and missing required fields before they ship silently.
// Exits with code 1 if any hard error is found; 0 if only warnings or nothing.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// Schema specs: each lists required and optional fields with their types.
// Types: 'string', 'number', 'boolean', 'array', 'object', 'array<string>',
// 'array<object>' etc. Required fields lack a '?' suffix.
const SCHEMAS = {
  companies: {
    // TickerReport schema. Note: 'slug' is injected by the loader, so it is not
    // required in the JSON.
    required: {
      ticker: 'string',
      company: 'string',
      sector: 'string',
      industry: 'string',
      dataVariant: 'string',
      asOf: 'string', // ISO date validation applied
      oneLiner: 'string',
      overview: 'string',
      business: 'object',
      valuation: 'array',
      financials: 'array',
      ratios: 'array',
      cashFlow: 'array',
      cashFlowNote: 'string',
      growth: 'array',
      management: 'string',
      holding: 'array',
      moat: 'object',
      narrative: 'string',
      risks: 'array',
      trapChecklist: 'array',
      sectorChecklist: 'array',
      summary: 'string',
      lenses: 'array',
    },
    optional: {
      slug: 'string',
      sectorId: 'string',
      isSample: 'boolean',
      verdict: 'object',
      facts: 'object',
      ipoFlag: 'string',
      editorial: 'object',
      moneyFlow: 'object',
      aiFork: 'object',
      counterpoint: 'object',
      scorecard: 'object',
      marginModel: 'object',
      scenario: 'object',
      engine: 'object',
      outlook: 'object',
      simple: 'object',
      pledged: 'number',
      caseStudies: 'array',
    },
  },
  sectors: {
    // Sector schema. Note: 'id' is injected from the filename.
    required: {
      name: 'string',
      icon: 'string',
      tagline: 'string',
      examples: 'array<string>',
      howItWorks: 'string',
      metrics: 'array',
      framework: 'object',
    },
    optional: {
      primer: 'array',
      chain: 'object',
      checklist: 'object',
      sections: 'array',
      anatomy: 'object',
      beginnerQuestion: 'object',
      remember: 'string',
      mentalModels: 'array<string>',
      relatedSectors: 'array<string>',
      relatedCaseStudies: 'array<string>',
      relatedReports: 'array<string>',
    },
  },
  caseStudies: {
    // CaseStudy schema. Note: 'id' is injected from the filename.
    required: {
      ticker: 'string',
      company: 'string',
      title: 'string',
      period: 'string',
      tags: 'array<string>',
      summary: 'string',
      keyNumbers: 'array',
      intro: 'array<string>',
      sections: 'array',
      timeline: 'array',
    },
    optional: {
      lesson: 'string',
      stockSlug: 'string',
      sectorId: 'string',
      relatedCaseStudies: 'array<string>',
      answer: 'string',
      faqs: 'array',
      evidence: 'object',
      exhibits: 'array',
      sources: 'array',
      exAnte: 'object',
      patternCard: 'object',
      published: 'string', // ISO date validation applied
      evidenceNotes: 'array',
      remember: 'string',
      simple: 'object',
    },
  },
  signals: {
    // Signal schema. Note: 'id' is injected from the filename.
    required: {
      title: 'string',
      kind: 'string',
      dateline: 'string',
      tags: 'array<string>',
      summary: 'string',
      event: 'array<string>',
      lesson: 'string',
    },
    optional: {
      kindLabel: 'string',
      published: 'string', // ISO date validation applied
      seoTitle: 'string',
      seoDescription: 'string',
      trigger: 'string',
      triggerLabel: 'string',
      triggerBody: 'array<string>',
      leverBand: 'object',
      mentalModels: 'array',
      fanouts: 'array',
      chainTitle: 'string',
      chain: 'array<string>',
      winners: 'array',
      losers: 'array',
      sections: 'array',
      evidence: 'object',
      horizonsTitle: 'string',
      horizons: 'array',
      ignore: 'array<string>',
      focus: 'array<string>',
      questions: 'array<string>',
      questionsTitle: 'string',
      questionsIntro: 'string',
      history: 'array',
      historyRhymes: 'array',
      yourTurn: 'object',
      relatedSectors: 'array<string>',
      relatedReports: 'array<string>',
      relatedCaseStudies: 'array<string>',
      threads: 'array',
      sources: 'array',
      lessonLabel: 'string',
      remember: 'string',
    },
  },
};

// Constraint validators: check specific field values against allowed sets or
// patterns. Called after type validation passes.
const CONSTRAINTS = {
  status: (v) => ['pass', 'fail', 'warn', 'na'].includes(v),
  tone: (v) => ['good', 'warn', 'bad', 'neutral'].includes(v), // metrics allow neutral; others are good/warn/bad
  confidence: (v) => ['high', 'medium', 'low'].includes(v),
  effect: (v) => ['up', 'down', 'neutral'].includes(v),
  mark: (v) => ['ask', 'yes', 'no'].includes(v),
  when: (v) => ['immediate', 'delayed', 'long-term'].includes(v),
  asOf: (v) => isValidIsoDate(v),
  published: (v) => isValidIsoDate(v),
};

function isValidIsoDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return d instanceof Date && !isNaN(d) && d.toISOString().startsWith(s);
}

function typeOf(v) {
  if (v === null || v === undefined) return 'null';
  if (Array.isArray(v)) return 'array';
  return typeof v;
}

function isTypeMatch(value, spec) {
  const vtype = typeOf(value);
  if (spec === 'array<string>') return vtype === 'array' && value.every((x) => typeof x === 'string');
  if (spec === 'array<object>') return vtype === 'array' && value.every((x) => typeof x === 'object' && x !== null);
  if (spec.startsWith('array<')) return vtype === 'array';
  return vtype === spec;
}

function validate(data, schema) {
  const errors = [];
  const warnings = [];

  // Check required fields.
  for (const [key, typeSpec] of Object.entries(schema.required)) {
    if (!(key in data)) {
      errors.push({ field: key, reason: 'missing required field' });
    } else if (!isTypeMatch(data[key], typeSpec)) {
      errors.push({
        field: key,
        reason: `expected ${typeSpec}, got ${typeOf(data[key])}`,
      });
    } else if (key in CONSTRAINTS) {
      if (!CONSTRAINTS[key](data[key])) {
        errors.push({ field: key, reason: `invalid value: ${data[key]}` });
      }
    }
  }

  // Check optional fields if present.
  for (const [key, typeSpec] of Object.entries(schema.optional)) {
    if (key in data && data[key] !== null && data[key] !== undefined) {
      if (!isTypeMatch(data[key], typeSpec)) {
        errors.push({
          field: key,
          reason: `expected ${typeSpec}, got ${typeOf(data[key])}`,
        });
      } else if (key in CONSTRAINTS) {
        if (!CONSTRAINTS[key](data[key])) {
          errors.push({ field: key, reason: `invalid value: ${data[key]}` });
        }
      }
    }
  }

  // Check for unknown top-level keys.
  const known = new Set([...Object.keys(schema.required), ...Object.keys(schema.optional)]);
  for (const key of Object.keys(data)) {
    if (!known.has(key)) {
      warnings.push({ field: key, reason: 'unknown top-level key' });
    }
  }

  // Recurse into required nested objects to validate their nested fields.
  validateChecklistItems(data, errors);
  validateArrayElements(data, errors);

  return { errors, warnings };
}

function validateChecklistItems(data, errors) {
  // Checksum: trapChecklist, sectorChecklist, and checklist items have a 'status' field.
  for (const list of [data.trapChecklist, data.sectorChecklist, data.checklist]) {
    if (Array.isArray(list)) {
      for (const item of list) {
        if (typeof item === 'object' && item !== null && 'status' in item) {
          if (!CONSTRAINTS.status(item.status)) {
            errors.push({
              field: `${list === data.trapChecklist ? 'trapChecklist' : list === data.sectorChecklist ? 'sectorChecklist' : 'checklist'}.status`,
              reason: `invalid status: ${item.status}`,
            });
          }
        }
      }
    }
  }
}

function validateArrayElements(data, errors) {
  // Validate nested object constraints in arrays: tone in various places, effect
  // in fanouts, mark in leverBand items, when in winners/losers, confidence in
  // evidenceNotes.
  if (Array.isArray(data.valuation)) {
    for (const m of data.valuation) {
      if (typeof m === 'object' && m !== null && 'tone' in m && m.tone !== undefined) {
        if (!CONSTRAINTS.tone(m.tone)) {
          errors.push({ field: 'valuation.tone', reason: `invalid tone: ${m.tone}` });
        }
      }
    }
  }
  if (Array.isArray(data.ratios)) {
    for (const m of data.ratios) {
      if (typeof m === 'object' && m !== null && 'tone' in m && m.tone !== undefined) {
        if (!CONSTRAINTS.tone(m.tone)) {
          errors.push({ field: 'ratios.tone', reason: `invalid tone: ${m.tone}` });
        }
      }
    }
  }
  if (Array.isArray(data.growth)) {
    for (const m of data.growth) {
      if (typeof m === 'object' && m !== null && 'tone' in m && m.tone !== undefined) {
        if (!CONSTRAINTS.tone(m.tone)) {
          errors.push({ field: 'growth.tone', reason: `invalid tone: ${m.tone}` });
        }
      }
    }
  }
  if (data.business && typeof data.business === 'object' && Array.isArray(data.business.segments)) {
    for (const s of data.business.segments) {
      if (typeof s === 'object' && s !== null && 'marginProfile' in s && typeof s.marginProfile !== 'string') {
        errors.push({ field: 'business.segments.marginProfile', reason: `expected string, got ${typeOf(s.marginProfile)}` });
      }
    }
  }
  if (Array.isArray(data.fanouts)) {
    for (const f of data.fanouts) {
      if (typeof f === 'object' && f !== null && Array.isArray(f.branches)) {
        for (const b of f.branches) {
          if (typeof b === 'object' && b !== null && 'effect' in b) {
            if (!CONSTRAINTS.effect(b.effect)) {
              errors.push({ field: 'fanouts.branches.effect', reason: `invalid effect: ${b.effect}` });
            }
          }
        }
      }
    }
  }
  if (data.leverBand && typeof data.leverBand === 'object' && Array.isArray(data.leverBand.items)) {
    for (const it of data.leverBand.items) {
      if (typeof it === 'object' && it !== null && 'mark' in it && it.mark !== undefined) {
        if (!CONSTRAINTS.mark(it.mark)) {
          errors.push({ field: 'leverBand.items.mark', reason: `invalid mark: ${it.mark}` });
        }
      }
    }
  }
  if (Array.isArray(data.winners)) {
    for (const w of data.winners) {
      if (typeof w === 'object' && w !== null && 'when' in w && w.when !== undefined) {
        if (!CONSTRAINTS.when(w.when)) {
          errors.push({ field: 'winners.when', reason: `invalid when: ${w.when}` });
        }
      }
    }
  }
  if (Array.isArray(data.losers)) {
    for (const l of data.losers) {
      if (typeof l === 'object' && l !== null && 'when' in l && l.when !== undefined) {
        if (!CONSTRAINTS.when(l.when)) {
          errors.push({ field: 'losers.when', reason: `invalid when: ${l.when}` });
        }
      }
    }
  }
  if (Array.isArray(data.evidenceNotes)) {
    for (const en of data.evidenceNotes) {
      if (typeof en === 'object' && en !== null && 'confidence' in en && en.confidence !== undefined) {
        if (!CONSTRAINTS.confidence(en.confidence)) {
          errors.push({ field: 'evidenceNotes.confidence', reason: `invalid confidence: ${en.confidence}` });
        }
      }
    }
  }
}

function loadFiles(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    if (name.endsWith('.json')) {
      // Skip .simple-draft.json sidecars in case-studies.
      if (!name.endsWith('.simple-draft.json')) {
        files.push(name);
      }
    }
  }
  return files;
}

function normalizeDataType(dirName) {
  if (dirName === 'companies') return 'companies';
  if (dirName === 'sectors') return 'sectors';
  if (dirName === 'case-studies') return 'caseStudies';
  if (dirName === 'signals') return 'signals';
  return null;
}

const BASE = '/Users/gowtham/fathom/data';
const DIRS = [
  { path: 'companies', name: 'companies' },
  { path: 'sectors', name: 'sectors' },
  { path: 'case-studies', name: 'caseStudies' },
  { path: 'signals', name: 'signals' },
];

let totalErrors = 0;
let totalWarnings = 0;

for (const dir of DIRS) {
  const fullPath = join(BASE, dir.path);
  if (!existsSync(fullPath)) {
    console.log(`${dir.path}: directory not found`);
    continue;
  }

  const files = loadFiles(fullPath);
  const schema = SCHEMAS[dir.name];
  const allProblems = [];

  for (const file of files) {
    const filePath = join(fullPath, file);
    let data;
    try {
      const raw = readFileSync(filePath, 'utf8');
      data = JSON.parse(raw);
    } catch (e) {
      allProblems.push({
        file,
        type: 'error',
        message: `JSON parse error: ${e.message}`,
      });
      totalErrors++;
      continue;
    }

    const { errors, warnings } = validate(data, schema);

    for (const err of errors) {
      allProblems.push({
        file,
        type: 'error',
        field: err.field,
        message: err.reason,
      });
      totalErrors++;
    }

    for (const warn of warnings) {
      allProblems.push({
        file,
        type: 'warning',
        field: warn.field,
        message: warn.reason,
      });
      totalWarnings++;
    }
  }

  // Print summary for this directory.
  const errorCount = allProblems.filter((p) => p.type === 'error').length;
  const warningCount = allProblems.filter((p) => p.type === 'warning').length;
  const summary =
    errorCount === 0 && warningCount === 0
      ? 'ok'
      : `${errorCount} error${errorCount !== 1 ? 's' : ''}, ${warningCount} warning${warningCount !== 1 ? 's' : ''}`;
  console.log(`${dir.path}: ${files.length} file${files.length !== 1 ? 's' : ''} (${summary})`);

  // Print problems, capped at 40.
  let printed = 0;
  for (const p of allProblems) {
    if (printed >= 40) {
      const remaining = allProblems.length - printed;
      console.log(`  ... and ${remaining} more`);
      break;
    }
    const mark = p.type === 'error' ? 'ERR' : 'WARN';
    const fieldPart = p.field ? `: ${p.field}` : '';
    console.log(`  ${p.file}${fieldPart}: ${p.message} [${mark}]`);
    printed++;
  }
}

console.log(
  `\nTotal: ${totalErrors} error${totalErrors !== 1 ? 's' : ''}, ${totalWarnings} warning${totalWarnings !== 1 ? 's' : ''}`
);
process.exit(totalErrors > 0 ? 1 : 0);
