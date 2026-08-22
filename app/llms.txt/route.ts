import { canonical } from '@/lib/base';
import { getAllSignals } from '@/lib/signals';
import { getAllReports } from '@/lib/data';
import { getAllSectors } from '@/lib/sectors';
import { getAllCaseStudies } from '@/lib/caseStudies';

export const dynamic = 'force-static';

// llms.txt: a curated, plain-markdown index of the site for answer engines and
// LLM crawlers (see llmstxt.org). Generated from the same data the pages use, so
// it stays in sync as content is added. One line per page: [title](url): summary.

// Trim a description to one clean line so the index stays scannable. Prefer the
// first full sentence; only hard-cut (with an ellipsis) if that sentence is long.
function clip(s: string, n = 200): string {
  const t = s.replace(/\s+/g, ' ').trim();
  const firstSentence = t.match(/^.*?[.?!](?=\s|$)/)?.[0]?.trim();
  if (firstSentence && firstSentence.length <= n) return firstSentence;
  if (t.length <= n) return t;
  const cut = t.slice(0, n);
  const sp = cut.lastIndexOf(' ');
  return (sp > 40 ? cut.slice(0, sp) : cut).replace(/[.,\s]+$/, '') + '...';
}

export function GET() {
  const signals = getAllSignals();
  const reports = getAllReports().slice().sort((a, b) => a.company.localeCompare(b.company));
  const sectors = getAllSectors();
  const cases = getAllCaseStudies();

  const lines: string[] = [];
  lines.push('# Fathom');
  lines.push('');
  lines.push(
    '> Beginner-friendly equity research on NSE-listed Indian companies. Fathom explains how each business actually makes money, the sectors and mental models behind it, and the market events that move it, in plain English with no jargon. Every figure comes from primary filings or named coverage. Fathom is educational and never rates a ticker to buy, sell or hold.',
  );
  lines.push('');

  lines.push('## Start here');
  lines.push(
    `- [How to understand a business](${canonical('/understand/')}): Eight plain questions that turn any stock into a business you understand, from how it makes money to what price makes it a bad deal.`,
  );
  lines.push(
    `- [Reading the filings](${canonical('/understand/filings/')}): How to read an annual report, an earnings call and a company presentation, and the red flags to watch for.`,
  );
  lines.push('');

  lines.push('## Signals (how a market event changes business economics)');
  for (const s of signals) {
    lines.push(`- [${s.title}](${canonical(`/signals/${s.id}/`)}): ${clip(s.summary)}`);
  }
  lines.push('');

  lines.push('## Sectors (how a whole industry works)');
  for (const sec of sectors) {
    lines.push(`- [${sec.name}](${canonical(`/sectors/${sec.id}/`)}): ${clip(sec.tagline || sec.howItWorks)}`);
  }
  lines.push('');

  lines.push('## Company reports');
  for (const r of reports) {
    lines.push(`- [${r.company} (${r.ticker})](${canonical(`/stocks/${r.slug}/`)}): ${clip(r.oneLiner)}`);
  }
  lines.push('');

  lines.push('## Case studies (long-form, primary-sourced business stories)');
  for (const c of cases) {
    lines.push(`- [${c.title}](${canonical(`/case-studies/${c.id}/`)}): ${clip(c.summary)}`);
  }
  lines.push('');

  lines.push('## About');
  lines.push(`- [About Fathom](${canonical('/about/')}): Who writes Fathom, the method, and the educational-use disclaimer.`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
