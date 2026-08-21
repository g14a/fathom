# Fathom Sector Writing Guide

Reference for writing and editing sector explainers (`data/sectors/*.json`).
Read this before adding or reworking a sector. It sits on top of the voice and
formatting rules in the repo `CLAUDE.md` (no em-dashes, no spaced hyphens,
beginner voice, honesty rules), which still apply in full.

## Goal

The goal is not to explain everything about an industry. It is to make a
beginner understand how the business actually works. After reading, the reader
should be able to say:

> "I now understand why companies in this industry make money, what usually goes
> wrong, and what actually matters."

Do not write an encyclopedia. Teach a mental model.

## Core philosophy

- Assume the reader has zero background.
- Explain ideas from first principles.
- Build intuition before introducing jargon.
- Prefer simple analogies over technical definitions.
- Teach how to think, not what to memorize.
- Every paragraph should answer "Why does this matter?" If a fact doesn't
  improve understanding, remove it.

## The transfer principle (what makes Fathom a business school)

Every sector page should teach a **reusable way of thinking**, not just one
industry. A reader who finishes Banking should be better at understanding
Insurance. A reader who finishes Pharma should be better at understanding
Chemicals. Companies change; the mental models transfer. Name the models
(operating leverage, pricing power, capital intensity, switching costs, the
scarce resource) so they carry across pages.

## One-sentence mental model

Every sector begins with a single memorable sentence that becomes the lens for
everything else:

- A bank is a spread machine.
- Telecom is a fixed-cost machine.
- An exchange is a toll booth.
- Pharma is two businesses wearing one uniform.

## The six questions every sector must answer

These render on the page as **"The six questions that explain this business"**
(the `anatomy` object in each sector JSON). Keep the wording conversational:
the simpler the phrasing, the more memorable the framework.

**1. Where does demand come from?**
Who buys, and why? Is demand recurring? Does it disappear in a recession? Is it
cyclical or structural? The reader should understand where revenue originates.

**2. Who controls the price?**
Can the company raise prices, or is price set elsewhere, by customers,
competition, government, or commodities? This teaches why margins expand or
shrink.

**3. What's the hardest thing to get?**
Every industry has one bottleneck, and it usually cannot simply be bought with
money. Banks → cheap deposits (trust). Telecom → spectrum. Pharma → USFDA-approved
factories and approvals. Paint → dealer network. Exchanges → liquidity.
Insurance → distribution. Software → great engineers. Explain why money alone
can't get it.

**4. Where does the money disappear?**
Ask where the *cash* goes, not where revenue goes. Telecom → capex. Pharma → R&D.
Banks → bad loans. Retail → inventory. Software → mostly stays. Exchange →
becomes profit. This teaches where shareholder returns leak away.

**5. What usually breaks first?**
The industry's biggest failure modes. Banks → bad loans. Telecom → price wars.
Pharma → USFDA. Steel → commodity prices. Insurance → bad underwriting. Airlines
→ fuel. This section teaches risk.

**6. Why can't rivals just copy it?**
The moat: brand, network effects, distribution, switching costs, regulation,
scale, technology, customer trust. This shows why the best companies stay ahead.

## The question beginners always ask

Every sector page also carries one **"The question beginners always ask"** block
(the `beginnerQuestion` object: `q` and `a`). It names the single naive question
that is the biggest conceptual stumbling block in that industry, and answers it
before the reader trips over it. Phrase it as plain first-person curiosity, and
answer concept-first (concrete example, then intuition, then the idea), in 3 to 5
sentences. Examples:

- Banks: "If the bank lends my money to someone else, how can I still withdraw it
  whenever I want?"
- Pharma: "If generics are chemically identical, why does one company make more
  money than another?"
- Telecom: "If everyone sells the same data, why is one operator so much more
  profitable?"
- Insurance: "How can an insurer make money if it keeps paying out claims?"

## One sentence to remember

Every sector page ends with a **"One sentence to remember"** anchor (the
`remember` string): a single, memorable line that compresses the whole industry
into something a reader carries away. It should name the mental model, where the
money is made, and what decides the winners. Examples:

- Banks: "Banks borrow cheaply, lend carefully, and survive or die by the quality
  of their loans."
- Insurance: "Insurance is a business that earns money twice: once by pricing risk
  correctly, and again by investing the float while it waits to pay claims."
- Pharma: "Pharma pairs a steady domestic prescription business with a brutally
  competitive export business, held together by the discipline of passing the
  regulator's inspections."

## Page structure (order)

1. One-sentence mental model
2. The six questions (high-level overview)
3. The business from first principles
4. Revenue model
5. Cost structure
6. Industry-specific concepts
7. What drives stock returns
8. What breaks the business
9. How to value companies in this sector
10. The five numbers that matter
11. Full metric glossary

Each section should build naturally on the previous one.

## Teaching style

Always introduce a concept in this order:

> concrete example → intuition → business concept → financial term

Never start with jargon.

- Bad: "NIM measures..."
- Good: "Imagine lending ₹100..." then introduce NIM.

Every concept gets one analogy, one real-world example, and one investing
implication. The reader should never meet an abstract concept without an example.

## Writing style

- Sound like a thoughtful teacher, not a finance analyst.
- Never assume prior knowledge.
- Concrete nouns over abstract language; no corporate buzzwords.
- Don't narrate ("Here's the interesting part...", "The real lesson is..."). Let
  facts lead to the conclusion.
- Vary sentence lengths. Conversational but precise.

## What to avoid

- A Wikipedia article, every technical detail, every metric, definition dumps.
- Long historical background.
- Overused metaphors (keep two at most per idea) and repeated lessons.
- Teaching accounting before intuition.

After every paragraph, ask: does this help the reader understand how this
business works? If not, delete it.

## What the reader should leave with

1. One mental model for the industry.
2. One framework for evaluating companies.
3. Where profits come from.
4. Where profits disappear.
5. What kills businesses in this sector.
6. One checklist they can apply to any company in the industry.

## Final test

A complete beginner should be able to answer all of these without looking
anything up:

1. What does this industry actually sell?
2. Why do customers buy it?
3. How does it make money?
4. Where does the money usually go?
5. What usually goes wrong?
6. What creates a great company here?
7. Why do some companies earn much higher profits than others?
8. Which financial metrics matter most, and why?
9. How should this type of business be valued?
10. If I had to study one company in this sector tomorrow, what would I ask first?

If the page doesn't naturally answer all ten, keep refining until it does.

## Where this lives in the data

- `anatomy` on the `Sector` type (`lib/sectors.ts`): the six questions, keys
  `demand`, `pricing`, `limiting`, `leak`, `killer`, `moat`. Rendered near the
  top of the sector page, right after "How this business works".
- `beginnerQuestion` (`{ q, a }`): the one naive question, rendered as its own
  amber block just before the teaching sections.
- `remember` (string): the one-sentence anchor, rendered as a centered accent
  block at the very end of the page, after the metric glossary.
- `mentalModels` (string[]), `relatedSectors` (sector ids), `relatedCaseStudies`
  (case-study ids): the "Take these ideas further" block at the very bottom.
- `howItWorks`: carries the one-sentence mental model and the framing.
- `sections[]`: the first-principles teaching blocks (banks is the reference
  implementation for depth).
- `framework{demand,pricing,efficiency,capital,risk}` and `metrics[]`: the five
  numbers and the full glossary.
