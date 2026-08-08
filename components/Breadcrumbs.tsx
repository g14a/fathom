import { withBase, canonical } from '@/lib/base';

// One crumb. `path` is a site path ("/sectors/"); omit it on the current page.
export interface Crumb {
  name: string;
  path?: string;
}

// Visible breadcrumb trail plus a BreadcrumbList JSON-LD block, so deep pages
// show a hierarchy to readers and to Google. The last crumb is the current page.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: canonical(c.path) } : {}),
    })),
  };
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i}>
              {c.path && !last ? (
                <a href={withBase(c.path)}>{c.name}</a>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{c.name}</span>
              )}
              {!last && <span className="bc-sep" aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
