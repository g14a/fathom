import './globals.css';
import type { Metadata } from 'next';
import { withBase } from '@/lib/base';

export const metadata: Metadata = {
  title: 'Fathom — Indian Equity Research',
  description: 'Deep, structured research on NSE-listed companies. Educational use only.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="wrap topbar-inner">
            <a href={withBase("/")}>
              <span className="brand">Fathom<span className="dot">.</span></span>
            </a>
            <nav className="nav">
              <a href={withBase("/")}>Companies</a>
              <a href={withBase("/understand/")}>Understand a Business</a>
              <a href={withBase("/understand/filings/")}>Reading Filings</a>
              <a href={withBase("/sectors/")}>Sectors</a>
              <a href={withBase("/case-studies/")}>Case Studies</a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
