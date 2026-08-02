import type { Verdict } from '@/lib/types';

const LABEL: Record<Verdict, string> = {
  'strong-buy': 'Strong Buy',
  buy: 'Buy',
  accumulate: 'Accumulate',
  hold: 'Hold',
  avoid: 'Avoid',
  sell: 'Sell',
};

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return <span className={`verdict v-${verdict}`}>{LABEL[verdict]}</span>;
}
