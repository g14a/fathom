import type { Metadata } from 'next';
import { withBase } from '@/lib/base';

export const metadata: Metadata = {
  title: 'Understand a Business | Fathom',
  description: 'Seven plain questions that turn any ticker into a business you actually understand.',
};

interface QLink {
  href: string;
  kicker: string;
  label: string;
}

interface Q {
  n: string;
  title: string;
  ask: string;
  body: React.ReactNode;
  eg: React.ReactNode;
  link?: QLink;
}

const QUESTIONS: Q[] = [
  {
    n: '01',
    title: 'How does it make money?',
    ask: 'Find the one thing it sells',
    body: (
      <>Start simple. Every business gets paid for <strong>one small thing</strong>, again and again. A tea stall gets paid per cup. A cinema gets paid per ticket. Find that one thing and you already understand most of the business. Also ask: do they get paid once, or every month? A tailor gets paid once per shirt. Netflix gets paid every single month. Getting paid every month is much nicer.</>
    ),
    eg: (
      <>Kalyan gets paid per piece of gold jewellery. But here is the surprise: the gold itself is not really theirs to profit from. They buy it at today&apos;s price and sell it at today&apos;s price. What they actually earn is the <strong>making charge</strong>, the fee for turning gold into a necklace. So even though huge amounts of money pass through, only a thin slice sticks.</>
    ),
  },
  {
    n: '02',
    title: 'Why do customers buy?',
    ask: 'The real-world need that drives the sale',
    body: (
      <>A shop cannot sell more unless something real happens more. An umbrella shop needs rain. A school-bag shop needs kids starting school. So ask: what real-life thing does this business need? And is that thing <strong>steady</strong> (people always need soap), or does it come and go (people only buy fireworks at Diwali), or is it the first thing people skip when money is tight (fancy holidays)?</>
    ),
    eg: (
      <>Kalyan needs weddings and festivals, which happen every single year no matter what. In India, gifting gold at a wedding is a tradition, not a luxury. <strong>A father will not give his daughter a bank app screenshot at her wedding. He gives gold.</strong> So even in a bad year, people still buy. That steady need is a big deal.</>
    ),
  },
  {
    n: '03',
    title: 'Who decides the price?',
    ask: 'Does the shop set the price, or someone else?',
    body: (
      <>Some businesses can name their price. A famous restaurant can charge extra and people still come. Others cannot: a vegetable seller has to match the price of every other seller in the market, or nobody buys from them. So ask a simple question: <strong>can this business raise its price without losing customers?</strong> If yes, that is powerful. If the price is fixed by the market or by one big buyer, that is weak.</>
    ),
    eg: (
      <>Kalyan cannot decide the price of gold. Gold has one price for everyone that day. What Kalyan <em>can</em> charge extra for is <strong>trust</strong>, people pay a little more to be sure the gold is real and pure. That trust is the only pricing power it has. On the gold itself, it has none.</>
    ),
    link: {
      href: withBase('/case-studies/airtel-the-lost-decade-2007-2020/'),
      kicker: 'Want to see pricing power decide a company’s fate?',
      label: 'Read Airtel: the lost decade',
    },
  },
  {
    n: '04',
    title: 'Why will it grow?',
    ask: 'Is the market full, or wide open?',
    body: (
      <>Imagine two juice shops. One is in a lane where everyone already drinks juice, so to grow it must steal customers from rivals, which is hard. The other is in a new area where people are just starting to drink juice, so it grows as the whole area picks up the habit. The second shop has it much easier. Always ask: <strong>is this business fighting for a bigger slice of a full plate, or is the whole plate getting bigger?</strong></>
    ),
    eg: (
      <>Most Indians still buy gold from the small local jeweller, not from big trusted brands. Every year, a few more switch to brands. Kalyan is one of the brands they switch to. <strong>So Kalyan is not fighting over the same customers, it is picking up new ones as people move to brands.</strong> That can go on for years and years.</>
    ),
  },
  {
    n: '05',
    title: 'Why this company?',
    ask: 'Why here, and not the shop next door?',
    body: (
      <>This is the question that works for everyone, from Apple to a bank to your local barber. If two shops sell the same thing, why does a customer walk into one and not the other? The honest answer is the <strong>real</strong> business. It might be a name people trust, a location nobody else can get, a habit that is hard to break, or a network that gets better the more people use it. If you cannot say why customers pick this company over the next one, you have not found the business yet, only the product.</>
    ),
    eg: (
      <>Kalyan sells the same metal as the jeweller down the road. People choose Kalyan because they trust its gold is real and pure, and that trust took years and a lot of advertising to build. That is the whole business. <strong>Take away the trusted name and it is just a counter selling metal.</strong> Its reputation matters more than anything it owns.</>
    ),
    link: {
      href: withBase('/case-studies/asian-paints-distribution-machine-2000-2026/'),
      kicker: 'Want to see “why this company” become an unbeatable moat?',
      label: 'Read Asian Paints: paint was never the moat',
    },
  },
  {
    n: '06',
    title: 'Can it earn more from each customer?',
    ask: 'More sales, or a bigger bill each time?',
    body: (
      <>Great businesses do not just find more customers. They earn more from the customers they already have. A barber can cut more heads, or start selling shampoo and face packs to the same people so each visit costs more. The second way is called <strong>upselling</strong>, and it is quietly one of the most powerful things a business can do. It is how Amazon, Apple, Costco and every good software company keep growing without finding a single new customer. So ask: <strong>can this business get each customer to pay more over time?</strong> Or is its price stuck?</>
    ),
    eg: (
      <>This is Kalyan&apos;s weak spot. Its earnings per sale have barely moved for years, because gold is gold. The only way it earns a bit more is by selling more <strong>diamond</strong> jewellery, where the profit is fatter. So do not expect fatter profits per sale. Expect it to grow by simply selling to more people.</>
    ),
  },
  {
    n: '07',
    title: 'What could quietly go wrong?',
    ask: 'The trouble that hides behind good news',
    body: (
      <>Every business has a way the story quietly breaks, and it is rarely on the front page. The most common one is a <strong>mix trap</strong>. Say a shop sells cakes (big profit) and cold drinks (tiny profit). If it suddenly sells loads more cold drinks, total sales shoot up and everyone cheers, but it keeps <em>less</em> profit on each rupee. Growing fast and getting less profitable can happen at the same time. So always check <em>what</em> is growing, not just that something is growing. Then ask the bigger version: what could actually stop this business? Usually it is one of five things, competition, technology, regulation, debt, or plain bad execution.</>
    ),
    eg: (
      <>Kalyan is growing fast, but a lot of that growth is low-profit gold and low-profit franchise stores, not high-profit diamonds. So the sales number looks amazing while the profit slice stays thin. <strong>The growth is real. Just do not expect the profit to grow as fast as the sales.</strong> And the thing that could truly hurt it is trust: one scandal about impure gold would undo years of work.</>
    ),
    link: {
      href: withBase('/stocks/KALYANKJIL/'),
      kicker: 'Want to see a mix trap in a full report?',
      label: 'Read the Kalyan Jewellers report',
    },
  },
];

const CHECKLIST = [
  'What does this company actually sell?',
  'Why do customers buy from it?',
  'Who decides the price?',
  'Why will it grow?',
  'Why this company instead of a competitor?',
  'Can it earn more from existing customers?',
  'What could quietly break the story?',
];

const FLOW = ['Business', 'Customers', 'Revenue', 'Profit', 'Cash', 'Returns', 'You, the owner'];

export default function UnderstandPage() {
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div className="eyebrow">Start here</div>
          <h1>How to understand a business</h1>
          <p className="lede">
            Before you buy a share, you should understand the company behind it, the same way you would
            understand a shop before buying it. You do not need to start with finance words. You just need
            to ask seven simple questions. Here they are.
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="u-intro">
          <p>
            A share is just a small piece of a real company. So the first job is not to look at charts
            or big numbers. It is to understand the company like a shopkeeper would: what it sells, who
            buys it, and whether it can keep doing well for a long time.
          </p>
          <p>
            Every business, from a tea stall to Apple, can be understood by answering the same seven
            questions. They cover how money comes in, why customers buy, who holds the pricing power,
            where growth comes from, why this company and not another, how it earns more per customer,
            and what can quietly go wrong. Answer them and a company stops being a confusing name on a
            screen. We use <strong>Kalyan Jewellers</strong>, a company that sells gold jewellery, as our
            example all the way through, so you can see each idea with something real.
          </p>
        </div>

        <div className="flowmap">
          <div className="flowmap-k">Every page on Fathom is really explaining one of these arrows</div>
          <div className="flowmap-chain">
            {FLOW.map((step, i) => (
              <div key={step} className="flowmap-node">
                <span className="flowmap-step">{step}</span>
                {i < FLOW.length - 1 && <span className="flowmap-arw" aria-hidden="true">↓</span>}
              </div>
            ))}
          </div>
          <p className="flowmap-note">
            A business serves customers, that makes revenue, revenue leaves some profit, profit turns
            into real cash, cash earns a return, and the return belongs to you, the owner. The seven
            questions below simply walk down this chain.
          </p>
        </div>

        <div className="qlist">
          {QUESTIONS.map((q) => (
            <div key={q.n} className="q">
              <div className="q-num">{q.n}</div>
              <div>
                <h2>{q.title}</h2>
                <p className="ask">{q.ask}</p>
                <p>{q.body}</p>
                <div className="eg">
                  <span className="tag">Kalyan</span>
                  {q.eg}
                </div>
                {q.link && (
                  <a href={q.link.href} className="qlink">
                    <span className="qlink-k">{q.link.kicker}</span>
                    <span className="qlink-go">{q.link.label} <span className="arw">→</span></span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="congrats">
          <div className="k">You just did the hard part</div>
          <p>
            Congratulations. If you can answer those seven questions about a company, you already
            understand it better than most people buying its stock. Everything else, the financial
            statements, the ratios, the valuation, is simply <strong>evidence</strong> that confirms or
            challenges the answers you just gave.
          </p>
        </div>

        <div className="checklist">
          <div className="checklist-head">
            <div className="k">The Fathom checklist</div>
            <h3>One minute, before you look at a single number</h3>
          </div>
          <ul>
            {CHECKLIST.map((item) => (
              <li key={item}><span className="box" aria-hidden="true" />{item}</li>
            ))}
          </ul>
          <p className="checklist-foot">If you cannot answer these, you do not understand the business yet. That is fine. Keep asking until it makes sense.</p>
        </div>

        <a href={withBase("/understand/filings/")} className="sector-cta" style={{ marginTop: 40 }}>
          <div className="sc-cta-text">
            <div className="sc-cta-kicker">Next step</div>
            <div className="sc-cta-line">
              Now learn <strong>where to check if the story is true</strong>: how to read an annual
              report, an earnings call and a company presentation.
            </div>
          </div>
          <span className="sc-cta-go">Reading the filings <span className="arw">→</span></span>
        </a>

        <div className="closer">
          <p>
            Most people start with the numbers and hope they understand the business. Fathom starts with
            the business, because only then do the numbers make sense.
          </p>
          <div className="attrib">The Fathom way. Understand the business first. The numbers come after.</div>
        </div>
      </div>
    </>
  );
}
