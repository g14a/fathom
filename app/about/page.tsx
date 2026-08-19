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
          <h2>How we grade the evidence</h2>
          <p>
            Not every fact is equally solid, so on the load-bearing claims in our case studies we label
            two different things: what kind of source a number came from, and how confident we are in
            the claim itself. The first is a source tier.
          </p>
          <ul className="about-list">
            <li>
              <strong>Tier A: audited and primary.</strong> Annual reports, audited financial
              statements and statutory filings. The hardest evidence there is, and the kind we build a
              case on wherever we can.
            </li>
            <li>
              <strong>Tier B: official but unaudited.</strong> A company's own press releases, investor
              presentations and exchange announcements. Straight from the source, but not yet audited.
            </li>
            <li>
              <strong>Tier C: reputable contemporaneous reporting.</strong> Named news and trade press,
              used when no primary document is public. Always linked, never anonymous.
            </li>
            <li>
              <strong>Tier D: interpretation.</strong> A reading that the evidence supports but that no
              document actually states. We label it as ours, so you can agree or disagree with the
              inference rather than mistake it for a fact.
            </li>
          </ul>
          <p>
            Separately, we mark our confidence in the claim as high, medium or low. High means several
            independent sources agree; medium means the evidence supports it but leaves room for
            judgement; low means it is an idea worth raising but thin on proof, kept only when it is
            clearly flagged as such. The two labels are independent: a tier C number that many outlets
            report the same way can still be high confidence, and a tier A figure can be low confidence
            if it hinges on a definition that shifts year to year.
          </p>
        </section>

        <section className="u-sec">
          <h2>What we keep separate</h2>
          <ul className="about-list">
            <li>
              <strong>Fact, interpretation and thesis.</strong> A fact is objectively checkable. An
              interpretation rests on several facts and could reasonably be read another way. The thesis
              is the argument the piece is making. We never dress an interpretation up as a fact, or
              pretend a thesis is proven when it is strongly supported.
            </li>
            <li>
              <strong>The reporting basis.</strong> A company's standalone accounts and its consolidated
              accounts can tell very different stories, so we say which one a number is on, and mix the
              two only where we flag it. Several of our case studies turn on exactly that gap.
            </li>
            <li>
              <strong>The number and the point it makes.</strong> A precise figure can be shaky while
              the direction it shows is not. Where a rupee value moves with the source, we lean on the
              trend and say the exact number is approximate, rather than borrow a false precision.
            </li>
          </ul>
        </section>

        <section className="u-sec">
          <h2>How we stress-test a story</h2>
          <p>
            Every case study is written to survive disagreement, not just to read well. We try to
            disprove our own conclusion, present the strongest opposing view, and keep only what holds
            up. Two habits show on the page.
          </p>
          <ul className="about-list">
            <li>
              <strong>What you could have seen, and when.</strong> Most studies end with the warning
              signs that were visible in public documents before the outcome, each tied to a dated
              filing and the exact line to look up, plus an honest note on what no filing could have
              told you at the time. Hindsight is only useful if it points to something you could
              actually have checked.
            </li>
            <li>
              <strong>Every pattern carries its counterexample.</strong> The reusable lesson at the end
              of a study always ships with the case where the naive version of it is wrong, so a pattern
              stays a reason to open the filing and look, never a superstition to trade on.
            </li>
          </ul>
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
