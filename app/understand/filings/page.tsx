import type { Metadata } from 'next';
import { withBase, canonical } from '@/lib/base';

export const metadata: Metadata = {
  title: 'How to Read Company Filings: Annual Reports, Concalls & Red Flags | Fathom',
  description: 'How to read an annual report, an earnings call and an investor presentation without drowning: which few parts matter, and where companies hide the awkward bits.',
  alternates: { canonical: canonical('/understand/filings/') },
};

interface Bullet { term: string; desc: string }
interface Blk { concept: string; body: string; bullets?: Bullet[]; outro?: string; example?: string; link?: { href: string; kicker: string; label: string } }
interface Sec { title: string; intro?: string; blocks: Blk[]; goldenRule?: string }

const DOC_MAP: { doc: string; question: string; role: string }[] = [
  { doc: 'Investor presentation', question: 'What does management want me to notice?', role: 'The suspect\'s own story' },
  { doc: 'Annual report', question: 'What actually happened this year?', role: 'The official statement' },
  { doc: 'Earnings call', question: 'What are the analysts worried about?', role: 'The cross-examination' },
  { doc: 'Financial statements', question: 'Does the money agree with the story?', role: 'The forensic evidence' },
  { doc: 'Notes and auditor', question: 'What is management hoping I skip?', role: 'The footnotes nobody reads' },
];

const CHECKLIST: string[] = [
  'Did management explain what actually drove the growth, in specifics?',
  'Did cash from the business grow alongside reported profit?',
  'What one question kept coming back in the Q&A?',
  'Did management own any mistake, or only sell the vision?',
  'Did anything in the notes surprise me?',
];

const SECTIONS: Sec[] = [
  {
    title: 'Why go to the source at all?',
    intro: 'Before the how, the why. This one habit separates people who invest from people who gamble.',
    blocks: [
      {
        concept: 'A tip is an opinion. A filing is on the record.',
        body: 'When a friend or a TV channel or a WhatsApp group tells you a stock is great, that is just someone\'s opinion, and you have no idea what it is based on. A company\'s own filings are different. They are the company on the record, in documents it is legally required to publish and cannot simply make up. That is the difference between hearing a rumour about someone and reading what they signed their name to.',
        example: 'A tip says "this company is growing fast". The annual report shows you exactly how fast, whether the cash actually came in, and what the company owes. One is chatter. The other you can check.',
      },
      {
        concept: 'It is all free, and it is all public',
        body: 'Here is the part beginners do not realise: every one of these documents is free and open to anyone. Annual reports, results, earnings-call recordings and investor presentations all sit on the company\'s own website and on the stock exchange sites. You do not need a subscription or a broker. The same documents the big investors read are sitting there waiting for you.',
        example: 'Search the company name with the words "annual report" or "investor relations" and you will land on the exact same file a fund manager in Mumbai is reading. Nobody has a secret version.',
      },
      {
        concept: 'You are checking, not trusting',
        body: 'The goal is not to believe the filing blindly either. Companies choose their words carefully and put their best foot forward. The goal is to use the documents to check the story you have been told, and to cross-check the company against itself. When the cheerful letter at the front says one thing and the cash flow statement at the back says another, you have learned something no tip could tell you.',
        example: 'Management says it was a "transformational year". You flip to the numbers and see profit fell and debt rose. Now you know to be careful, purely by reading two parts of the same document against each other.',
      },
    ],
  },
  {
    title: 'The annual report: the yearly confession',
    intro: 'Once a year, a company must publish a big document about itself. It looks intimidating. You only need a few parts of it.',
    blocks: [
      {
        concept: 'What it actually is',
        body: 'The annual report is the company\'s official once-a-year account of how it did and where it stands. It runs to a hundred pages or more, most of it glossy photos and legal boilerplate you can skip. The value is concentrated in four parts, and once you know which four, the intimidating brick becomes a quick, honest read.',
        example: 'Think of it like a school report card wrapped in a school brochure. The brochure pages are marketing. You are hunting for the actual marks, and they are only on a few pages.',
      },
      {
        concept: 'The chairman\'s letter: read it for tone, not facts',
        body: 'Near the front sits a friendly letter from the chairman or managing director. It is the most-read and least-reliable part, because it is written to reassure. Do not take its claims at face value. Read it instead for tone and honesty. Does it own up to what went wrong, or does it hide a bad year behind grand words about vision and the future? A leader who admits mistakes plainly is telling you more than one who only sells a dream.',
        example: 'A letter that says "margins fell because our input costs rose and we were slow to pass them on" is being honest. One that says only "we continued our exciting journey of value creation" after a bad year is hiding the ball.',
      },
      {
        concept: 'Management Discussion & Analysis: the real story',
        body: 'This is the section that actually explains what happened and why, in the company\'s own words but with far more substance than the chairman\'s letter. It walks through each business, the industry conditions, what drove revenue and costs, and what management sees ahead. If you read only one narrative part of the annual report, read this one. It is where the business is explained rather than sold.',
        example: 'The MD&A is where you learn that sales grew because a new factory came online, or that margins slipped because one big customer negotiated a lower price. The specifics live here, not in the glossy letter.',
      },
      {
        concept: 'The financial statements: the three that matter',
        body: 'At the heart of the report sit three tables, and you already know the ideas behind them. The profit and loss statement shows what the company earned and spent. The balance sheet shows what it owns and what it owes on one day. And the cash flow statement shows the actual cash that moved, which, as we keep saying, is the one hardest to fake. You do not need to be an accountant. You need to read the three together and notice when they disagree.',
        example: 'The profit and loss can show a healthy profit while the cash flow statement shows very little cash came in. That gap is one of the most useful warnings in all of investing, and it is sitting right there for free.',
        link: {
          href: '/case-studies/mahindra-the-65pc-fall-2018-2020/',
          kicker: 'Want to see two statements disagree, years before the write-off?',
          label: 'Read Mahindra: the 65% fall',
        },
      },
      {
        concept: 'The notes and the auditor: where the awkward truths hide',
        body: 'This is the part almost nobody reads and where the real signals often live. Buried after the main tables are the notes to the accounts and the auditor\'s report, and they hide the things a company would rather you glossed over. Learn to glance at four of them.',
        bullets: [
          { term: 'Related-party transactions', desc: 'Deals the company did with its own promoters, their relatives or their other companies. A few are normal. A lot of money flowing to promoter-linked parties is a reason to be very careful about whose pocket the profit really ends up in.' },
          { term: 'Contingent liabilities', desc: 'Money the company might have to pay if things go wrong, like tax disputes or lawsuits, that is not yet in the main accounts. If this number is huge next to the company\'s profit, a nasty surprise could be waiting.' },
          { term: 'A change of auditor', desc: 'The auditor is the outside referee who signs off on the accounts. If they resign suddenly or are quietly replaced, ask why. Referees do not usually walk off the pitch for no reason.' },
          { term: 'The auditor\'s opinion', desc: 'A clean opinion means the referee is satisfied. Any hedging, qualification or note of concern in that opinion is a loud signal to slow down, however good the headline numbers look.' },
        ],
        outro: 'None of these needs accounting skill to spot. They just need you to turn to the back of the report, which is exactly why so few people do.',
        example: 'A company reports record profit, but the notes show its unpaid tax disputes are larger than a year of that profit, and the auditor added a note of concern. The front of the report is a celebration. The back is a warning.',
        link: {
          href: '/case-studies/jet-airways-the-market-leader-that-vanished-1993-2024/',
          kicker: 'One debt note in 2007 gave twelve years of warning.',
          label: 'Read Jet Airways: the market leader that vanished',
        },
      },
    ],
    goldenRule: 'Ignore the glossy pages. Spend your time on the MD&A, the three statements, and the notes.',
  },
  {
    title: 'The earnings call: listening in on management',
    intro: 'A few times a year, management gets on a call to discuss results and take questions. It is the closest you get to looking them in the eye.',
    blocks: [
      {
        concept: 'What a concall is',
        body: 'After it announces results each quarter, a company usually holds a conference call, an earnings call, often shortened to concall. Management presents how the quarter went, and then analysts get to ask questions. The recording and a written transcript are published free afterwards. It is the one regular occasion where management has to speak unscripted and field hard questions, which makes it uniquely revealing.',
        example: 'You can read the transcript of almost any big company\'s latest concall in a few minutes online, and hear management explain the results in their own words and get pushed on the weak spots.',
      },
      {
        concept: 'The Q&A matters more than the speech',
        body: 'The first half of a concall is management\'s prepared pitch, and like the chairman\'s letter, it is polished to flatter. The gold is in the second half, the questions. That is where analysts probe the things management did not volunteer, and where you see whether management answers straight or wriggles. A prepared speech tells you what a company wants you to think. The Q&A tells you what it would rather you did not ask.',
        example: 'The presentation glows about growth. Then an analyst asks why cash collections lagged profit, and management gives a vague non-answer. That dodge, in the Q&A, is worth more than the whole cheerful presentation before it.',
      },
      {
        concept: 'Listen for operator talk versus storyteller talk',
        body: 'The most useful thing you can do on a concall is notice how management talks. Operators talk about the boring real stuff: cash flow, returns on capital, paying down debt, margins, why something cannot be fixed overnight. Storytellers dodge those and reach for themes, big market-size numbers and exciting future visions instead. When cash-flow questions get answered with slogans, take note. Good managers discuss how the money actually works.',
        example: 'Ask two managements about a weak quarter. One says "collections were slow because of a festival timing, here is how it normalises next quarter". The other says "we remain excited about the massive opportunity ahead". The first is an operator. The second is selling.',
      },
      {
        concept: 'Did they do what they said last time?',
        body: 'Management often gives guidance, a promise of what to expect, like "we aim to grow 15% this year". The single best test of whether to trust them is simple: go back to what they promised a year ago and check whether they delivered it. A team that consistently meets its own guidance has earned some belief. A team that keeps missing and moving the goalposts has not, however confident this quarter\'s promises sound.',
        example: 'Management guided to 20% growth last year and delivered 8%, and now guides to 20% again. The new promise is worth very little. Their own track record just told you so.',
      },
    ],
    goldenRule: 'Read the questions before you read the answers. The worries are the point.',
  },
  {
    title: 'Investor presentations: useful, but it is marketing',
    intro: 'The easiest document to read, and the one to trust the least on its own.',
    blocks: [
      {
        concept: 'A polished summary, on the company\'s terms',
        body: 'Alongside results, companies put out a slide deck, the investor presentation. It is genuinely useful as a quick, visual summary of the business and the quarter, and it is the friendliest starting point for a beginner. But never forget who made it and why. It is a marketing document, designed to show the company at its best, so it highlights what flatters and quietly leaves out what does not. Use it to get oriented, then verify anything important against the annual report and the numbers.',
        bullets: [
          { term: 'Good for', desc: 'Quickly grasping what the company does, its segments, its scale and the headline story of the quarter. A fast, friendly orientation.' },
          { term: 'Be wary of', desc: 'Cherry-picked charts, growth shown from a flattering starting point, and big market-size numbers that make the opportunity look limitless. Always ask what was left off the slide.' },
        ],
        outro: 'The rule is simple: let the presentation introduce you, but let the annual report and the cash flow have the final word.',
        example: 'A slide shows a soaring three-year growth chart. You check the annual report and find the starting year was an unusually bad one, which makes the growth look far more dramatic than the real trend. The chart was not false, just framed to impress.',
      },
    ],
    goldenRule: 'Treat the presentation as an introduction, never as evidence.',
  },
  {
    title: 'Red flags to hunt across everything',
    intro: 'As you read, keep a short list of warning signs in your head. Any one of these is a reason to slow down and dig deeper.',
    blocks: [
      {
        concept: 'Accounting red flags: does the money add up?',
        body: 'The first family of warnings is about the numbers themselves, whether the reported profit is as real and as clean as it looks. These live in the statements and the notes.',
        bullets: [
          { term: 'Profit rising but cash is not', desc: 'The classic. If reported profit climbs while cash from the business stays weak and unpaid bills swell, the earnings may be more paper than real.' },
          { term: 'Contingent liabilities that dwarf profit', desc: 'Big potential payouts from disputes or lawsuits, hiding in the notes, that could swamp a year or more of earnings.' },
          { term: 'The auditor resigns, is replaced, or hedges', desc: 'The outside referee leaving suddenly, or adding any note of concern to the accounts, is one of the loudest signals there is. Always find out why.' },
        ],
      },
      {
        concept: 'Governance red flags: whose company is it really?',
        body: 'The second family is about the people in charge, whether they are running the company for all its owners or mostly for themselves. These live in the ownership and related-party disclosures.',
        bullets: [
          { term: 'Lots of related-party dealings', desc: 'Money flowing between the company and its promoters or their other businesses. Ask whose pocket the profit really lands in.' },
          { term: 'Rising promoter pledging', desc: 'When promoters borrow against their own shares and the pledged amount keeps climbing, a falling stock can force sales out of their hands.' },
          { term: 'Constantly changing the story', desc: 'Management that reinvents its strategy or its favourite metric every year, and keeps missing its own guidance, is telling you something.' },
        ],
        outro: 'You do not need to find all of these to walk away, and finding one does not automatically mean fraud. But each one earns the company a harder look before you trust a single cheerful headline.',
        example: 'On their own, any one of these might have an innocent explanation. Three or four together, in the same company, is the market quietly telling you that the story and the reality are pointing in different directions.',
      },
    ],
  },
  {
    title: 'If you only have twenty minutes',
    intro: 'You will not read a hundred-page report end to end, and you do not need to. Here is the short path.',
    blocks: [
      {
        concept: 'A beginner\'s reading order',
        body: 'When you are short on time, read these few things, in this order. It gets you most of the understanding for a fraction of the effort.',
        bullets: [
          { term: '1. Investor presentation (10 min)', desc: 'Understand what the company does and its headline story. Treat it as the friendly introduction, nothing more.' },
          { term: '2. Management Discussion & Analysis (5 min)', desc: 'The real explanation of what happened and why, in the annual report. This is the substance the presentation dressed up.' },
          { term: '3. Cash flow statement (3 min)', desc: 'Check that reported profit is actually turning into cash. If it is not, stop and find out why before you go any further.' },
          { term: '4. Concall Q&A (2 min)', desc: 'Skim the questions from the latest earnings call to see what analysts are worried about and whether management answers straight or dodges.' },
        ],
        outro: 'Do just these four and you already understand the company better than most people who own its shares, and far better than anyone acting on a tip.',
        example: 'Twenty focused minutes on the right four things beats an hour skimming the glossy pages, and beats a lifetime of acting on WhatsApp forwards.',
      },
    ],
  },
];

function Block({ p, i }: { p: Blk; i: number }) {
  return (
    <div className="primer-block">
      <div className="pb-num">{String(i + 1).padStart(2, '0')}</div>
      <div>
        <h3>{p.concept}</h3>
        <p>{p.body}</p>
        {p.bullets && (
          <ul className="pb-list">
            {p.bullets.map((b, j) => (
              <li key={j}>
                <span className="pb-term">{b.term}</span>
                <span className="pb-desc">{b.desc}</span>
              </li>
            ))}
          </ul>
        )}
        {p.outro && <p className="pb-outro">{p.outro}</p>}
        {p.example && (
          <div className="eg">
            <span className="tag">For example</span>
            {p.example}
          </div>
        )}
        {p.link && (
          <a href={withBase(p.link.href)} className="qlink">
            <span className="qlink-k">{p.link.kicker}</span>
            <span className="qlink-go">{p.link.label} <span className="arw">→</span></span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function FilingsPage() {
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div className="eyebrow">Reading the filings</div>
          <h1>Where the truth actually lives</h1>
          <p className="lede">
            Understanding a business is one thing. Checking whether the story is true is another, and
            for that you go to the company’s own documents: its annual report, its earnings calls,
            its presentations. They are free, they are public, and almost nobody reads them. Here is
            how, in plain language.
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="u-intro">
          <p>
            Most people buy shares on a tip and never open a single company document. That is like
            buying a used car without looking under the bonnet because a stranger said it runs fine.
            The documents below are the bonnet. Learning to lift it is the single biggest step from
            guessing to investing.
          </p>
          <p>
            You do not need accounting training. You need to know which few parts matter, what each one
            is really telling you, and where companies tend to hide the awkward bits.
          </p>
        </div>

        <section className="teach-section">
          <h2 className="ts-title">Every filing answers one question</h2>
          <p className="ts-intro">
            The trick is to stop asking “which file should I open?” and start asking “which question am
            I trying to answer?” Approach a company like an investigation: each document is a different
            kind of witness, and each one has a job.
          </p>
          <div className="doc-map">
            {DOC_MAP.map((d, i) => (
              <div key={i} className="doc-map-row">
                <div className="dm-doc">{d.doc}</div>
                <div className="dm-arrow">→</div>
                <div className="dm-body">
                  <span className="dm-q">{d.question}</span>
                  <span className="dm-role">{d.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {SECTIONS.map((sec, si) => (
          <section key={si} className="teach-section">
            <h2 className="ts-title">{sec.title}</h2>
            {sec.intro && <p className="ts-intro">{sec.intro}</p>}
            <div className="primer">
              {sec.blocks.map((p, i) => (
                <Block key={i} p={p} i={i} />
              ))}
            </div>
            {sec.goldenRule && (
              <div className="golden-rule">
                <span className="gr-label">Golden rule</span>
                <p>{sec.goldenRule}</p>
              </div>
            )}
          </section>
        ))}

        <section className="teach-section">
          <h2 className="ts-title">What to write down while you read</h2>
          <p className="ts-intro">
            Knowing where to read is half of it. The other half is reading with a pen. Keep these five
            questions beside you, and turn passive skimming into an actual investigation.
          </p>
          <ul className="read-checklist">
            {CHECKLIST.map((c, i) => (
              <li key={i}>
                <span className="rc-box" aria-hidden="true" />
                <span className="rc-text">{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <a href={withBase('/sectors/')} className="sector-cta" style={{ marginTop: 40 }}>
          <div className="sc-cta-text">
            <div className="sc-cta-kicker">Next step</div>
            <div className="sc-cta-line">
              Filings make far more sense when you know <strong>how the sector works</strong>: what
              normal looks like for a bank is a red flag for a retailer.
            </div>
          </div>
          <span className="sc-cta-go">Browse the sectors <span className="arw">→</span></span>
        </a>

        <div className="closer">
          <p>
            The story tells you what management wants you to believe. The filings let you decide whether
            it is true. Learn to read them and you never have to take anyone’s word for it again.
          </p>
          <div className="attrib">The Fathom way. Trust the documents, not the tips.</div>
        </div>
      </div>
    </>
  );
}
