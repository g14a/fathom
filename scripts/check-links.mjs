// Link integrity check for cross-referenced content. Validates that company,
// sector, case-study, and signal files reference only existing ids. Also audits
// the pattern registry (lib/patterns.ts) against case studies that carry a
// patternCard field. Run after editing content, or via `npm run check-links`.
// Exits non-zero if any broken reference is found, so it can gate CI.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve against this script's own location so it works from any working
// directory, including CI, not just the repo root.
const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadIds(dir) {
  const ids = new Set();
  const files = readdirSync(dir);
  for (const f of files) {
    if (f.endsWith('.json')) {
      // Skip .simple-draft.json files for case-studies
      if (f.endsWith('.simple-draft.json')) continue;
      const id = f.slice(0, -5);
      ids.add(id);
    }
  }
  return ids;
}

function loadJsonFile(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    return null;
  }
}

function jsonFilesInDir(dir) {
  return readdirSync(dir)
    .filter(f => f.endsWith('.json') && !f.endsWith('.simple-draft.json'))
    .map(f => ({ name: f.slice(0, -5), path: join(dir, f) }));
}

const findings = [];
let groupHead = null;

function report(file, field, kind, id) {
  const line = `${file}: ${field}: missing ${kind}: ${id}`;
  findings.push(line);
  console.log(line);
}

function ensureGroupHead(dir) {
  if (groupHead !== dir) {
    if (groupHead !== null) console.log('');
    console.log(dir);
    groupHead = dir;
  }
}

// Load all ids
const companyIds = loadIds(join(REPO_ROOT, 'data/companies'));
const sectorIds = loadIds(join(REPO_ROOT, 'data/sectors'));
const caseStudyIds = loadIds(join(REPO_ROOT, 'data/case-studies'));
const signalIds = loadIds(join(REPO_ROOT, 'data/signals'));

// Validate companies
const companyFiles = jsonFilesInDir(join(REPO_ROOT, 'data/companies'));
for (const f of companyFiles) {
  const data = loadJsonFile(f.path);
  if (!data) continue;

  if (data.sectorId && !sectorIds.has(data.sectorId)) {
    ensureGroupHead('data/companies/');
    report(`data/companies/${f.name}.json`, 'sectorId', 'sector', data.sectorId);
  }
}

// Validate sectors
const sectorFiles = jsonFilesInDir(join(REPO_ROOT, 'data/sectors'));
for (const f of sectorFiles) {
  const data = loadJsonFile(f.path);
  if (!data) continue;

  if (data.relatedSectors) {
    for (const id of data.relatedSectors) {
      if (!sectorIds.has(id)) {
        ensureGroupHead('data/sectors/');
        report(`data/sectors/${f.name}.json`, 'relatedSectors', 'sector', id);
      }
    }
  }

  if (data.relatedReports) {
    for (const id of data.relatedReports) {
      if (!companyIds.has(id)) {
        ensureGroupHead('data/sectors/');
        report(`data/sectors/${f.name}.json`, 'relatedReports', 'company', id);
      }
    }
  }

  if (data.relatedCaseStudies) {
    for (const id of data.relatedCaseStudies) {
      if (!caseStudyIds.has(id)) {
        ensureGroupHead('data/sectors/');
        report(`data/sectors/${f.name}.json`, 'relatedCaseStudies', 'case-study', id);
      }
    }
  }
}

// Validate case-studies
const caseStudyFiles = jsonFilesInDir(join(REPO_ROOT, 'data/case-studies'));
for (const f of caseStudyFiles) {
  const data = loadJsonFile(f.path);
  if (!data) continue;

  if (data.sectorId && !sectorIds.has(data.sectorId)) {
    ensureGroupHead('data/case-studies/');
    report(`data/case-studies/${f.name}.json`, 'sectorId', 'sector', data.sectorId);
  }

  if (data.stockSlug && !companyIds.has(data.stockSlug)) {
    ensureGroupHead('data/case-studies/');
    report(`data/case-studies/${f.name}.json`, 'stockSlug', 'company', data.stockSlug);
  }

  if (data.relatedCaseStudies) {
    for (const id of data.relatedCaseStudies) {
      if (!caseStudyIds.has(id)) {
        ensureGroupHead('data/case-studies/');
        report(`data/case-studies/${f.name}.json`, 'relatedCaseStudies', 'case-study', id);
      }
    }
  }

  // Validate exhibits
  if (data.exhibits) {
    for (const exhibit of data.exhibits) {
      if (exhibit.src) {
        const src = exhibit.src.startsWith('/') ? exhibit.src : '/' + exhibit.src;
        const filePath = join(REPO_ROOT, 'public', src);
        if (!existsSync(filePath)) {
          ensureGroupHead('data/case-studies/');
          report(`data/case-studies/${f.name}.json`, 'exhibits[].src', 'file', exhibit.src);
        }
      }
    }
  }
}

// Validate signals
const signalFiles = jsonFilesInDir(join(REPO_ROOT, 'data/signals'));
for (const f of signalFiles) {
  const data = loadJsonFile(f.path);
  if (!data) continue;

  if (data.relatedSectors) {
    for (const id of data.relatedSectors) {
      if (!sectorIds.has(id)) {
        ensureGroupHead('data/signals/');
        report(`data/signals/${f.name}.json`, 'relatedSectors', 'sector', id);
      }
    }
  }

  if (data.relatedReports) {
    for (const id of data.relatedReports) {
      if (!companyIds.has(id)) {
        ensureGroupHead('data/signals/');
        report(`data/signals/${f.name}.json`, 'relatedReports', 'company', id);
      }
    }
  }

  if (data.relatedCaseStudies) {
    for (const id of data.relatedCaseStudies) {
      if (!caseStudyIds.has(id)) {
        ensureGroupHead('data/signals/');
        report(`data/signals/${f.name}.json`, 'relatedCaseStudies', 'case-study', id);
      }
    }
  }

  if (data.threads) {
    for (const t of data.threads) {
      if (t.sector && !sectorIds.has(t.sector)) {
        ensureGroupHead('data/signals/');
        report(`data/signals/${f.name}.json`, 'threads[].sector', 'sector', t.sector);
      }
      if (t.report && !companyIds.has(t.report)) {
        ensureGroupHead('data/signals/');
        report(`data/signals/${f.name}.json`, 'threads[].report', 'company', t.report);
      }
      if (t.caseStudy && !caseStudyIds.has(t.caseStudy)) {
        ensureGroupHead('data/signals/');
        report(`data/signals/${f.name}.json`, 'threads[].caseStudy', 'case-study', t.caseStudy);
      }
    }
  }

  if (data.sections) {
    for (const s of data.sections) {
      if (s.image && s.image.src) {
        const src = s.image.src.startsWith('/') ? s.image.src : '/' + s.image.src;
        const filePath = join(REPO_ROOT, 'public', src);
        if (!existsSync(filePath)) {
          ensureGroupHead('data/signals/');
          report(`data/signals/${f.name}.json`, 'sections[].image.src', 'file', s.image.src);
        }
      }
    }
  }
}

// Validate pattern registry
console.log('');
const patternsPath = join(REPO_ROOT, 'lib/patterns.ts');
const patternsContent = readFileSync(patternsPath, 'utf8');

const patternNamesMatch = patternsContent.match(
  /const\s+PATTERN_NAMES\s*:\s*\{[^}]*caseStudyId[^}]*\}\[\]\s*=\s*\[([\s\S]*?)\]/
);

if (!patternNamesMatch) {
  console.log('lib/patterns.ts: PATTERN_NAMES registry appears to be data-derived. Skipping pattern checks.');
} else {
  const patternNamesBody = patternNamesMatch[1];
  const caseStudyIdMatches = patternNamesBody.match(/caseStudyId\s*:\s*['"]([^'"]+)['"]/g) || [];
  const registeredCaseStudies = new Set(
    caseStudyIdMatches.map(m => m.match(/['"]([^'"]+)['"]/)[1])
  );

  // Check for case studies in registry that don't exist
  for (const id of registeredCaseStudies) {
    if (!caseStudyIds.has(id)) {
      ensureGroupHead('lib/patterns.ts');
      report('lib/patterns.ts', 'PATTERN_NAMES', 'case-study', id);
    }
  }

  // Check for case studies with patternCard but not in registry
  for (const f of caseStudyFiles) {
    const data = loadJsonFile(f.path);
    if (!data) continue;
    if (data.patternCard && !registeredCaseStudies.has(f.name)) {
      ensureGroupHead('lib/patterns.ts');
      console.log(`lib/patterns.ts: PATTERN_NAMES: missing entry: ${f.name}`);
      findings.push(`lib/patterns.ts: PATTERN_NAMES: missing entry: ${f.name}`);
    }
  }

  // Check for case studies in registry but without patternCard
  for (const id of registeredCaseStudies) {
    if (caseStudyIds.has(id)) {
      const caseStudyFile = join(REPO_ROOT, 'data/case-studies', id + '.json');
      const data = loadJsonFile(caseStudyFile);
      if (data && !data.patternCard) {
        ensureGroupHead('lib/patterns.ts');
        console.log(`lib/patterns.ts: PATTERN_NAMES: case-study has no patternCard: ${id}`);
        findings.push(`lib/patterns.ts: PATTERN_NAMES: case-study has no patternCard: ${id}`);
      }
    }
  }
}

// Summary
console.log('');
console.log(`Total broken references: ${findings.length}`);
if (findings.length > 0) {
  process.exit(1);
} else {
  console.log('All cross-references resolved.');
  process.exit(0);
}
