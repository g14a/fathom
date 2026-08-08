import { withBase } from '@/lib/base';

// One cross-link. `kicker` is the mono category label (Sector / Report / Case study),
// `variant: 'case'` swaps the accent to amber to match the case-study colour.
export interface ConnItem {
  kicker: string;
  name: string;
  href: string;          // internal path; withBase() is applied here
  variant?: 'case';
}

// The shared "related links" block used on sector, signal and case-study pages.
// One design everywhere: a heading, optional lede, optional non-link concept
// chips, then a uniform grid of link cards.
export default function Connections({
  title,
  lede,
  chips,
  items,
}: {
  title: string;
  lede?: string;
  chips?: string[];
  items: ConnItem[];
}) {
  const hasChips = !!chips && chips.length > 0;
  if (!hasChips && items.length === 0) return null;
  return (
    <div className="connections-block">
      <h2 className="csd-h2">{title}</h2>
      {lede && <p className="connections-lede">{lede}</p>}
      {hasChips && (
        <div className="conn-chips">
          {chips!.map((c) => (
            <span key={c} className="conn-chip">{c}</span>
          ))}
        </div>
      )}
      {items.length > 0 && (
        <div className="conn-grid">
          {items.map((it) => (
            <a
              key={it.href}
              href={withBase(it.href)}
              className={`conn-card${it.variant === 'case' ? ' conn-card-case' : ''}`}
            >
              <span className="conn-kicker">{it.kicker}</span>
              <span className="conn-name">{it.name}</span>
              <span className="arw">→</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
