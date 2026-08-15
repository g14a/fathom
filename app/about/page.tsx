import type { Metadata } from 'next';
import { canonical } from '@/lib/base';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About Fathom: How We Research and What We Stand For',
  description:
    'Who is behind Fathom, how each report and case study is researched from primary filings, the voice and honesty rules we hold to, and the limits of what this site is.',
  alternates: { canonical: canonical('/about/') },
};

const aboutLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Fathom',
  url: canonical('/about/'),
  mainEntity: {
    '@type': 'Organization',
    name: 'Fathom',
    url: canonical('/'),
    description:
      'Independent, beginner-friendly research on NSE-listed companies, built from primary filings.',
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutLd} />
      <div className="hero">
        <div className="wrap">
          <div className="eyebrow">About</div>
          <h1>What Fathom is, and how it is made.</h1>
          <p className="lede">
            Fathom is an independent research project that explains NSE-listed Indian companies from
            first principles, for readers who are not finance professionals. Every page is written to
            teach the business, not to impress. This page explains where the work comes from and the
            rules it holds to, so you can judge how much to trust it.
          </p>
        </div>
      </div>

      <div className="wrap u-body">
        <section className="u-sec">
          <h2>What we publish</h2>
          <p>
            Three kinds of writing. One deep research report per company, covering how it makes money,
            the industry it sits in, where its cash actually goes, the strength of its competitive
            advantage, and what could break it. Sector explainers that teach how a whole industry
            works before you look at any single company in it. And long-form case studies that rebuild
            one real event from the filings and pull out the single lesson worth keeping.
          </p>
        </section>

        <section className="u-sec">
          <h2>Where the numbers come from</h2>
          <p>
            The figures come from primary sources: company results, annual reports and investor
            presentations, regulatory filings, and aggregators such as screener.in that reproduce
            those filings. Where we lean on outside coverage, it is named and linked. Case-study
            evidence is traced to the exact filing line it rests on, and any document images are real
            pages from real public filings, never mock-ups.
          </p>
        </section>

        <section className="u-sec">
          <h2>The rules we hold to</h2>
          <ul className="about-list">
            <li>
              <strong>We never make up data.</strong> If a number is not available, we say so rather
              than estimate it silently.
            </li>
            <li>
              <strong>We write for a complete beginner.</strong> No jargon goes unexplained, and every
              line has to teach or advance the argument or it gets cut.
            </li>
            <li>
              <strong>We take a stance, not a side-stepping hedge.</strong> A report reaches an honest
              verdict and explains the tension behind it.
            </li>
            <li>
              <strong>A verdict is never an instruction.</strong> We never tell you to buy or sell
              anything. The verdict describes a view of the business, and the decision stays yours.
            </li>
          </ul>
        </section>

        <section className="u-sec">
          <h2>Who writes it</h2>
          <p>
            Fathom is written and edited under the Fathom name rather than by a rotating cast of
            bylines, so the voice and the standards stay the same across every page. It is a personal,
            independent project, not the research arm of a broker, an asset manager, or any company we
            write about. We hold no brief for the businesses covered, and nobody pays for coverage.
          </p>
        </section>

        <section className="u-sec">
          <h2>What Fathom is not</h2>
          <p>
            Fathom is educational. It is <strong>not</strong> a SEBI-registered investment adviser, and
            nothing here is a recommendation, an offer, or a solicitation to buy or sell any security.
            The benchmarks and rules of thumb are teaching aids, not thresholds to trade on. Content is
            general, can contain errors, and goes stale as the world moves. Any decision you take is
            your own, and you should do your own research and consult a SEBI-registered adviser and your
            tax adviser before investing.
          </p>
        </section>
      </div>
    </>
  );
}
