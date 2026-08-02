import type { Metadata } from 'next';
import { withBase } from '@/lib/base';

export const metadata: Metadata = {
  title: 'Understand a Business | Fathom',
  description: 'The seven questions that turn a ticker into a business you actually understand.',
};

interface Q {
  n: string;
  title: string;
  ask: string;
  body: React.ReactNode;
  eg: React.ReactNode;
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
    title: 'What has to happen for it to sell more?',
    ask: 'The thing in the real world that drives it',
    body: (
      <>A shop cannot sell more unless something real happens more. An umbrella shop needs rain. A school-bag shop needs kids starting school. So ask: what real-life thing does this business need? And is that thing <strong>steady</strong> (people always need soap), or does it come and go (people only buy fireworks at Diwali), or is it the first thing people skip when money is tight (fancy holidays)?</>
    ),
    eg: (
      <>Kalyan needs weddings and festivals, which happen every single year no matter what. In India, gifting gold at a wedding is a tradition, not a luxury. <strong>A father will not give his daughter a bank app screenshot at her wedding. He gives gold.</strong> So even in a bad year, people still buy. That steady need is a big deal.</>
    ),
  },
  {
    n: '03',
    title: 'Who gets to decide the price?',
    ask: 'Does the shop set the price, or someone else?',
    body: (
      <>Some businesses can name their price. A famous restaurant can charge extra and people still come. Others cannot: a vegetable seller has to match the price of every other seller in the market, or nobody buys from them. So ask a simple question: <strong>can this business raise its price without losing customers?</strong> If yes, that is powerful. If the price is fixed by the market or by one big buyer, that is weak.</>
    ),
    eg: (
      <>Kalyan cannot decide the price of gold. Gold has one price for everyone that day. What Kalyan <em>can</em> charge extra for is <strong>trust</strong>, people pay a little more to be sure the gold is real and pure. That trust is the only pricing power it has. On the gold itself, it has none.</>
    ),
  },
  {
    n: '04',
    title: 'How much room is left to grow?',
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
    title: 'Can it earn more from the same customer?',
    ask: 'More sales, or a bigger bill each time?',
    body: (
      <>There are two ways to earn more: sell to more people, or get each person to spend more. A barber can cut more heads, or start selling shampoo and face packs to the same customers so each visit costs more. The second way is often better. So ask: <strong>can this business get each customer to pay more over time?</strong> Or is its price stuck?</>
    ),
    eg: (
      <>This is Kalyan&apos;s weak spot. Its earnings per sale have barely moved for years, because gold is gold. The only way it earns a bit more is by selling more <strong>diamond</strong> jewellery, where the profit is fatter. So do not expect fatter profits per sale. Expect it to grow by simply selling to more people.</>
    ),
  },
  {
    n: '06',
    title: 'Where does it stand in the chain?',
    ask: 'Who does the work, who keeps the profit?',
    body: (
      <>Think of how bread reaches you. A farmer grows wheat, a mill grinds it, a factory bakes it, a shop sells it. Each one does a different job and earns a different amount. Some spots in that chain keep a lot of profit, some keep very little. So ask: <strong>what job does this business do, and is it a well-paid spot or a poorly-paid one?</strong></>
    ),
    eg: (
      <>Kalyan is the shop at the very end, the one that sells to you. It does not mine gold or make it. Its whole job is to be the trusted face you buy from. <strong>That is why its name and reputation matter more than anything else it owns.</strong> Take away the trusted name and it is just a counter selling metal.</>
    ),
  },
  {
    n: '07',
    title: 'Is fast growth quietly hiding thinner profit?',
    ask: 'Watch the mix, not just the total',
    body: (
      <>Here is a sneaky trap. Say a shop sells two things: cakes (big profit) and cold drinks (tiny profit). If it suddenly sells loads more cold drinks, its total sales shoot up and everyone cheers, but it is actually keeping <strong>less</strong> profit on each rupee. Growing fast and getting less profitable can happen at the same time. So always check <em>what</em> is growing, not just that something is growing.</>
    ),
    eg: (
      <>Kalyan is growing fast, but a lot of that growth is the low-profit gold and low-profit franchise stores, not the high-profit diamonds. So the sales number looks amazing while the profit slice stays thin. <strong>The growth is real. Just do not expect the profit to grow as fast as the sales.</strong></>
    ),
  },
];

export default function UnderstandPage() {
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div className="eyebrow">Start here</div>
          <h1>How to understand a business</h1>
          <p className="lede">
            Before you buy a share, you should understand the company behind it, the same way you would
            understand a shop before buying it. You do not need finance words to do this. You just need
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
            Answer these seven questions and the company stops being a confusing name on a screen and
            starts making sense. We use Kalyan Jewellers, a company that sells gold jewellery, as our
            example all the way through, so you can see each idea with something real.
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
              </div>
            </div>
          ))}
        </div>

        <div className="gut">
          <h3>Two last checks before you trust the story</h3>
          <div className="gut-cards">
            <div className="gut-card">
              <div className="k">Check 1</div>
              <h4>Is the money actually coming in?</h4>
              <p>
                A company can <em>say</em> it made a profit but still not have the cash. Imagine you sold
                lots of sweets but let everyone pay you later, and most never do. On paper you did great;
                your pocket is empty. So always check that real cash is coming in, not just promises.{' '}
                <strong>A company that grows and actually collects its cash is one you can trust.</strong>
              </p>
            </div>
            <div className="gut-card">
              <div className="k">Check 2</div>
              <h4>Can someone else easily copy it?</h4>
              <p>
                A good business has something that keeps rivals out, like a loved brand or a location
                nobody else can get. Ask honestly: <strong>if a new competitor showed up tomorrow with
                more money, could they take these customers away?</strong> If yes, the business is weaker
                than it looks, no matter how good today&apos;s numbers are.
              </p>
            </div>
          </div>
        </div>

        <a href={withBase("/understand/filings/")} className="sector-cta" style={{ marginTop: 40 }}>
          <div className="sc-cta-text">
            <div className="sc-cta-kicker">Next step</div>
            <div className="sc-cta-line">
              Once you understand the business, learn <strong>where to check if the story is true</strong>:
              how to read an annual report, an earnings call and a company presentation.
            </div>
          </div>
          <span className="sc-cta-go">Reading the filings <span className="arw">→</span></span>
        </a>

        <div className="closer">
          <p>
            If you cannot answer how a company makes money, what it needs to sell more, and whether
            someone could easily copy it, you do not understand it yet. That is fine. Keep asking simple
            questions until it makes sense, and only then think about buying.
          </p>
          <div className="attrib">The Fathom way. Understand the business first. The numbers come after.</div>
        </div>
      </div>
    </>
  );
}
