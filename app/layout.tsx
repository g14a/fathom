import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { withBase, SITE_URL, canonical } from '@/lib/base';
import { getFeaturedCaseStudies } from '@/lib/caseStudies';
import JsonLd from '@/components/JsonLd';

const SITE_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'Fathom',
      url: `${SITE_URL}/`,
      description:
        'Beginner-friendly research on NSE-listed companies: how each business makes money, the sectors and mental models behind it, and the events that move it.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#site`,
      name: 'Fathom',
      url: `${SITE_URL}/`,
      publisher: { '@id': `${SITE_URL}/#org` },
      inLanguage: 'en-IN',
    },
  ],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-HESW7D5M5H';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Fathom: Indian Equity Research, Explained From First Principles',
    template: '%s',
  },
  description: 'Beginner-friendly research on NSE-listed companies: how each business makes money, the sectors and mental models behind it, and the events that move it.',
  alternates: { canonical: canonical('/') },
  applicationName: 'Fathom',
  openGraph: {
    siteName: 'Fathom',
    type: 'website',
    locale: 'en_IN',
    url: canonical('/'),
    title: 'Fathom: Indian Equity Research, Explained From First Principles',
    description: 'How Indian businesses actually make money, the sectors and mental models behind them, and the events that move them.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Fathom' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fathom: Indian Equity Research, Explained',
    description: 'How Indian businesses actually make money, and the events that move them.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const featured = getFeaturedCaseStudies(2);
  return (
    <html lang="en">
      <body>
        <JsonLd data={SITE_JSONLD} />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
        {featured.length > 0 && (
          <div className="whatsnew">
            <div className="wrap whatsnew-inner">
              <span className="whatsnew-tag">New case studies</span>
              <div className="whatsnew-marquee">
                <div className="whatsnew-track">
                  {[...featured, ...featured].map((c, i) => (
                    <a
                      key={i}
                      href={withBase(`/case-studies/${c.id}/`)}
                      className="whatsnew-item"
                      aria-hidden={i >= featured.length ? true : undefined}
                      tabIndex={i >= featured.length ? -1 : undefined}
                    >
                      <span className="whatsnew-item-co">{c.ticker}</span>
                      <span className="whatsnew-item-title">{c.title}</span>
                      <span className="arw">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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
              <a href={withBase("/patterns/")}>Patterns</a>
              <a href={withBase("/signals/")}>Signals</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="wrap">
            <p className="site-footer-legal">
              <strong>Educational use only.</strong> Fathom is not a SEBI-registered investment
              adviser, and nothing on this site is a recommendation, an offer, or a solicitation
              to buy or sell any security. Benchmarks and rules of thumb are teaching aids, not
              thresholds to trade on. The content is general in nature, may contain errors or
              omissions, and can become outdated; past performance never guarantees future
              results. Any decision you take based on anything you read here is entirely your own
              responsibility, and Fathom accepts no liability for any loss or damage that may
              result. Always do your own research, and consult a SEBI-registered investment
              adviser and your tax adviser before investing.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
