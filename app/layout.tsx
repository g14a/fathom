import './globals.css';
import type { Metadata } from 'next';

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
            <a href="/">
              <span className="brand">Fathom<span className="dot">.</span></span>
            </a>
            <nav className="nav">
              <a href="/">Companies</a>
              <a href="/understand/">Understand a Business</a>
              <a href="/understand/filings/">Reading Filings</a>
              <a href="/sectors/">Sectors</a>
              <a href="/case-studies/">Case Studies</a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
