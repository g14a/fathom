import { withBase } from '@/lib/base';

export default function NotFound() {
  return (
    <div className="wrap" style={{ padding: '80px 24px' }}>
      <div className="eyebrow">404</div>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 40, fontWeight: 600, marginTop: 12 }}>
        Nothing here.
      </h1>
      <p style={{ color: 'var(--ink-dim)', marginTop: 12 }}>
        That page does not exist. <a href={withBase("/")} style={{ color: 'var(--accent)' }}>Back to companies</a>.
      </p>
    </div>
  );
}
