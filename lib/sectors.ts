export interface SectorMetric {
  metric: string;
  why: string;
}

export interface PrimerBullet {
  term: string;  // the thing being named
  desc: string;  // plain-language explanation of it
}

export interface PrimerBlock {
  concept: string;         // the idea being taught
  body: string;            // plain-language explanation
  bullets?: PrimerBullet[]; // optional itemised list under the body
  outro?: string;          // optional closing line after the bullets
  example?: string;        // a concrete everyday example
}

export interface SectorSection {
  title: string;         // section heading
  intro?: string;        // optional one-line framing under the heading
  blocks: PrimerBlock[]; // numbered teaching blocks within the section
}

export interface Sector {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  examples: string[];
  howItWorks: string; // plain-language: how this business actually makes money
  primer?: PrimerBlock[]; // beginner explainer: single flat list of concepts
  sections?: SectorSection[]; // richer explainer split into multiple named sections
  metrics: SectorMetric[];
  framework: {
    demand: string;
    pricing: string;
    efficiency: string;
    capital: string;
    risk: string;
  };
}

export const SECTORS: Sector[] = [
  {
    id: 'banks',
    name: 'Banks',
    icon: '🏦',
    tagline: 'PE matters less. Loan quality matters most.',
    examples: ['HDFCBANK', 'ICICIBANK', 'KOTAKBANK', 'SBIN'],
    howItWorks:
      'A bank is a spread machine. It takes in money from people who want to save, pays them a little, and lends that same money to people who want to borrow, charging them more. The gap between the two is where a bank makes its living. Everything else in banking is a detail hanging off that one simple idea. The section below builds it up from zero.',
    sections: [
      {
        title: 'First, what is a bank really?',
        intro: 'Strip away the branches, the apps and the jargon, and a bank is one of the oldest, simplest ideas there is.',
        blocks: [
          {
            concept: 'A bank is a middleman for money',
            body: 'Some people have spare cash they want kept safe. Others need money right now, for a house, a shop, a car. A bank simply stands between the two. It takes the spare cash from the first group and hands it to the second. Here is the part that surprises people the first time they hear it: the bank is barely using its own money at all. It is lending yours.',
            example: 'You park ₹1,00,000 in your savings account. It does not sit in a vault with your name on it. Most of it is already out the door, lent to someone down the road buying a scooter. Your app still shows ₹1,00,000, the scooter buyer has the cash, and the bank is quietly earning off the gap between you.',
          },
          {
            concept: 'Interest is just rent on money',
            body: 'Lend a friend your bike for a week and you might expect a little something for it when you get it back. Money works the same way. When you borrow it, you pay for the time you had it, and that payment is called interest. An interest rate is nothing more than that rent written as a yearly percentage. Once you see interest as rent, the whole business stops being mysterious.',
            example: 'Borrow ₹100 for a year at a rate of 10% and you hand back ₹110. That extra ₹10 is the rent you paid for using the money.',
          },
        ],
      },
      {
        title: 'How a bank makes money',
        intro: 'Nearly all of a bank\'s profit comes down to one gap, with a bit of steady income on the side.',
        blocks: [
          {
            concept: 'The bank pays rent too',
            body: 'Most people think of interest as something they pay. But the bank pays it as well, to you. The moment your money lands in your account, the bank is really borrowing it from you, and it pays you a little for the privilege. That is your deposit rate. So the whole game is simple to state and hard to do well: pay as little as possible to the people it borrows from, charge as much as it sensibly can to the people it lends to, and live off the difference.',
            example: 'It pays you 3% on your savings and charges the scooter buyer 11% on his loan. On every ₹100, it hands you ₹3 and collects ₹11. The ₹8 in between is the bank\'s.',
          },
          {
            concept: 'Cheap money beats expensive money',
            body: 'Not every rupee a bank takes in costs it the same. The money sitting in ordinary current and savings accounts is almost free, because the bank pays you next to nothing to keep it there. Bankers have a name for it: CASA, short for current and savings accounts. Money locked in a fixed deposit is the opposite. You only agreed to lock it away because the bank promised you a higher rate, so it is expensive money. A bank swimming in cheap savings deposits has a huge head start over one that has to bid up for fixed deposits. This, more than almost anything, is why some banks are simply better than others.',
            example: 'HDFC and SBI hold crores of everyday salary and savings accounts paying around 3%. A weaker rival might have to dangle 7% fixed deposits to pull in the same money. They can make the identical loan, but the big bank walks away with far more of the profit.',
          },
          {
            concept: 'The gap is the profit, and it has a name',
            body: 'That gap, between what a bank earns on everything it lends and what it pays on everything it borrows, is the single most important number in banking. It is called the Net Interest Margin, or NIM. When you hear that a bank\'s NIM is widening, its profit engine is running well. When you hear it is shrinking, something is eating into the core business, and you should want to know what.',
            example: 'Earn 11% on loans, pay 5% on deposits, and the margin is 6%. Now imagine deposits get pricier and cost 7%, but competition stops the bank raising loan rates. The margin quietly slips to 4%, and profit falls with it, even though the bank did nothing wrong.',
          },
          {
            concept: 'And a little on the side: fees',
            body: 'Not all of a bank\'s money comes from lending. It also charges fees: on cards, on transactions, on lockers, and as commission for selling you insurance and mutual funds. Bankers call this non-interest income, and it is prized, because unlike a loan, a fee cannot turn bad on you. A bank with plenty of it has a steadier, higher-quality profit that does not depend entirely on the lending cycle.',
            example: 'Every card swipe, every locker rental, every policy sold at the branch earns the bank a small cut. On its own that is nothing. Across tens of millions of customers, it becomes a large and dependable slice of profit.',
          },
        ],
      },
      {
        title: 'Not all bank stocks are the same',
        intro: 'When someone says "bank stock", they could mean three quite different animals.',
        blocks: [
          {
            concept: 'Private banks',
            body: 'These are owned by ordinary shareholders and run to make a profit. As a group they grow faster, run tighter, and tend to lend more carefully. It is no accident that most of the market\'s beloved long-term compounders are private banks, because good management sitting on cheap deposits shows up, year after year, as high and steady returns.',
            example: 'HDFC Bank, ICICI Bank, Kotak Mahindra Bank, Axis Bank.',
          },
          {
            concept: 'Public sector banks (the government ones)',
            body: 'These are majority-owned by the government. They are enormous, they reach villages no private bank bothers with, and they sit on mountains of cheap deposits. But historically they have been slower, less efficient and more accident-prone on bad loans, partly because their lending was not always driven purely by what made commercial sense. They can have their moment when the cycle turns and old bad loans get cleaned up, but they are a rougher, more up-and-down ride.',
            example: 'State Bank of India, Bank of Baroda, Punjab National Bank.',
          },
          {
            concept: 'Small finance banks, and why NBFCs are not banks',
            body: 'Small finance banks lend to smaller, riskier borrowers the big banks skip, usually at higher rates. And then there are NBFCs, which get their own section on this site. They look like banks and lend like banks, but they are missing the one thing that makes a bank powerful: they cannot take your everyday deposits. So they have to borrow from markets and other banks instead, which is costlier and far more fragile when money gets tight. The humble deposit account is the whole secret.',
            example: 'AU is a small finance bank. Bajaj Finance is an NBFC. Neither can fund itself as cheaply as an HDFC or an SBI, for the simple reason that neither has that deep pool of everyday savings to draw on.',
          },
        ],
      },
      {
        title: 'What actually moves a bank stock',
        intro: 'Beyond any single quarter\'s numbers, three big forces push bank shares around.',
        blocks: [
          {
            concept: 'The interest rate cycle',
            body: 'The RBI, India\'s central bank, sets the base rate for the whole economy, and it moves that rate up and down over time. When it does, a bank\'s loan rates and deposit rates both shift, but rarely at the same speed. Sometimes a bank gets to charge more on its loans before it has to pay more on its deposits, and its margin fattens. Sometimes it works the other way and the margin gets pinched. So the rate cycle is forever nudging bank profits up and down, no matter how well the bank itself is run.',
            example: 'Rates rise. A bank whose loans reprice quickly but whose cheap deposits stay put suddenly earns more almost overnight. Its margin widens, and the stock usually likes it.',
          },
          {
            concept: 'The health of the economy',
            body: 'A bank is really a geared-up bet on the country. When the economy is humming, people and businesses borrow more and pay it back without trouble. When it stumbles, borrowing dries up and defaults creep in. Because a bank is lending out ten times its own money, both the good and the bad get amplified, which is why bank stocks tend to swing harder than the market they sit in.',
            example: 'In a strong year, loans grow fast and bad loans stay tiny, so profits and share prices climb together. In a downturn, both turn at once, and the fall can be just as sharp as the climb.',
          },
          {
            concept: 'The rule-maker: the RBI',
            body: 'Few businesses are watched as closely as banks, and for good reason: they are holding the public\'s savings. The RBI decides how much cushion they must keep, how much and to whom they can lend, and even what officially counts as a bad loan. One rule change can lift or wound the entire sector overnight, however well or badly any single bank is being run.',
            example: 'The day the RBI tightens the rules on unsecured personal loans, every bank that had been leaning on that fast, high-margin business slows down together, whether it wanted to or not.',
          },
        ],
      },
      {
        title: 'Where banks break',
        intro: 'A bank can look wonderful right up to the moment it doesn\'t. These are the usual cracks.',
        blocks: [
          {
            concept: 'The loans that never come back',
            body: 'Handing out a loan is the easy part. Getting it back is where banking is actually hard. Some borrowers simply cannot repay: a business folds, a job is lost. A loan that has stopped being paid is a bad loan, or in the jargon a Non-Performing Asset. This is the thing that quietly kills banks. One can look gloriously profitable for years and then admit that a big slab of its loans is never coming back, and years of profit vanish in a single quarter.',
            example: 'Lend ₹100 and see ₹5 of it go bad, and you have not just lost the interest on that ₹5. You can lose the whole ₹5 you lent. It only takes a handful of big loans souring at once to wipe out a lot of patient profit.',
          },
          {
            concept: 'Good times hide bad lending',
            body: 'This is the trap that catches even experienced investors. In the good years everyone repays, bad loans look tiny, and banks feel invincible, so they lend more and more, and to shakier and shakier borrowers. Then the economy turns, and all that weak lending goes bad together. The cruel part is the timing: the worst loans are made at the very top, when everything feels safe, and only reveal themselves on the way down. So a bank boasting almost no bad loans in a boom has not proven it is safe. It may just be standing early in the cycle.',
            example: 'Picture a bank lending freely to builders through a property boom. For two years everyone pays and profits soar. Then demand cools, several builders default in the same few months, and all the bad loans that were quietly being written the whole time land on the books at once.',
          },
          {
            concept: 'The slow squeeze on margins',
            body: 'A bank does not need a single bad loan to disappoint you. If its margin, that NIM again, gets squeezed, profit falls anyway. Maybe deposits got expensive faster than its loans could reprice. Maybe rivals undercut it and forced loan rates down. Either way the gap narrows and earnings stall. That is why the margin deserves as much of your attention as the bad-loan number.',
            example: 'After a big merger, or in the middle of a deposit price war, a bank can be forced to pay up for deposits while its loan yields sit still. The gap narrows, earnings flatten, and nothing has technically gone wrong at all.',
          },
        ],
      },
      {
        title: 'How to actually value a bank',
        intro: 'This is where beginners trip. Put away the tool you would reach for on any other company.',
        blocks: [
          {
            concept: 'Why PE is the wrong tool here',
            body: 'For most companies, the PE ratio, price compared to earnings, is a fair quick check. For a bank it quietly lies to you, and there is one reason why: a bank is built to run on borrowed money. For every ₹1 of its own it is handling ₹10 or more of other people\'s. That enormous borrowed base makes the profit look big and, worse, distracts you from where the real danger lives, which is the loans, not the earnings. Remember, a bank almost never dies because profit dipped. It dies because its loans went bad.',
            example: 'Two banks show you the exact same PE. One lent with great care and has barely any bad loans. The other lent recklessly and is sitting on a hidden pile of them. PE calls them twins. Their loan books tell you they are nothing alike.',
          },
          {
            concept: 'Look at these instead',
            body: 'So skip the single PE number and read a bank through four windows, each answering a different question about how well it is run and how safely.',
            bullets: [
              { term: 'Return on Assets', desc: 'Of every rupee the bank puts to work, how much comes back as profit? It is the cleanest read on how well the thing is actually run. Above roughly 1.5% is genuinely excellent.' },
              { term: 'Return on Equity', desc: 'The return earned on the bank\'s own money, the bit shareholders put in. Mid-teens or higher is healthy, and this is the number that actually compounds in your pocket over the years.' },
              { term: 'Bad-loan levels', desc: 'What share of the loans have stopped being repaid? The lower and the steadier, the safer the bank. This is the window that shows you trouble the profit line is hiding.' },
              { term: 'Price-to-Book', desc: 'What you are paying against the bank\'s own net worth. Because a bank is essentially a stack of financial assets, its book value actually means something, unlike at most companies. This is the price gauge that replaces PE.' },
            ],
            outro: 'And these four talk to each other. A bank earning a high return on its own money has earned the right to trade at a richer price against its book. One with bad loans creeping up has not, no matter how tempting its PE looks.',
            example: 'A bank doing 1.8% on its assets and 17% on its equity with almost no bad loans deserves its high price-to-book. A bank scraping 0.6% with bad loans climbing does not, however cheap that low PE makes it seem.',
          },
        ],
      },
      {
        title: 'The trap: a great bank that is still a bad stock',
        intro: 'Save this one. It is the lesson that catches even the smart money.',
        blocks: [
          {
            concept: 'Your return runs on two engines',
            body: 'What you make on a stock comes from two things multiplied together. The first is how fast the company\'s earnings grow. The second is whether people decide to pay more or less for each rupee of those earnings, which is the multiple. Both can move, and here is the sting: a roaring first engine can be completely cancelled by a fading second one. A superb, growing bank can still hand you nothing at all if you bought it when the multiple was already too high.',
            example: 'Earnings double, but the price people will pay per rupee of earnings halves. Two times a half is one. You finish exactly where you started, even though the business had a wonderful few years.',
          },
          {
            concept: 'HDFC Bank, where the multiple ate the engine',
            body: 'HDFC Bank is the textbook case, and a painful one for a lot of holders. Across roughly eight years its earnings per share tripled, from about ₹17 to ₹49. That is a magnificent engine by any measure. And yet the stock went almost nowhere. Why? Because over those same years the multiple, what investors were willing to pay per rupee of earnings, slid from around 30x down to about 15x. The shrinking multiple swallowed everything the growing earnings had cooked up. The business kept winning while its shareholders sat and waited.',
            example: 'Pay 30x for ₹17 of earnings and your entry price is about ₹510. Years later, ₹49 of earnings at a 15x multiple is about ₹735. A tripling of the earnings turned into a limp return, purely because the multiple you bought at was too high to begin with.',
          },
          {
            concept: 'Why it happened, and what to take from it',
            body: 'The multiple did not shrink out of spite. After HDFC Bank merged with its parent, its return on equity slipped from around 18% to 14% and its margin came under real pressure, so investors, quite reasonably, paid a bit less for each rupee of a slightly lower-quality engine. And that is the whole lesson in one line: buy a good bank, absolutely, but buy it at a sensible price. A fine business bought well compounds for you. The very same business bought too dear can sit dead for years while the multiple slowly lets the air out.',
            example: 'The stock only really wakes up again if the quality comes back, return on equity climbing toward 16-17%, so that both engines finally pull the same way. Until that happens, even a growing bank can feel like money that just sits there.',
          },
        ],
      },
    ],
    metrics: [
      { metric: 'NIM (Net Interest Margin)', why: 'Spread between lending and deposit rates, the core profit engine. Higher means more profitable lending.' },
      { metric: 'CASA Ratio', why: 'Current plus savings deposits as a share of the total. Cheap, sticky money. High CASA means a low cost of funds and better margins.' },
      { metric: 'GNPA / NNPA', why: 'Gross and net non-performing assets. Bad-loan quality. Rising NPAs signal trouble ahead; falling means the cleanup is working.' },
      { metric: 'Credit Growth', why: 'Loan-book expansion, a proxy for business momentum. 15%+ YoY is a healthy growth cycle.' },
      { metric: 'Provision Coverage Ratio', why: 'How much of the bad loans are already provisioned. Above 70% is a conservative, well-cushioned balance sheet.' },
      { metric: 'Cost-to-Income Ratio', why: 'Operating expenses over income. Lower is more efficient. Private banks run 40-50%, PSBs 50-60%.' },
      { metric: 'ROA (Return on Assets)', why: 'The best profitability metric for banks. Above 1.5% is excellent. It strips out the distortion of leverage.' },
      { metric: 'Capital Adequacy Ratio (CAR)', why: 'The safety buffer against losses. RBI minimum is 11.5%. Higher is safer, though it can cap growth.' },
    ],
    framework: { demand: 'Credit growth', pricing: 'NIM', efficiency: 'Cost-to-Income', capital: 'ROA', risk: 'GNPA / NPAs' },
  },
  {
    id: 'nbfcs',
    name: 'NBFCs',
    icon: '💳',
    tagline: 'It is all about AUM growth and collection quality.',
    examples: ['BAJFINANCE', 'CHOLAFIN', 'MUTHOOTFIN', 'LTFH'],
    howItWorks:
      'An NBFC is a bank without the cheap deposits. It borrows from banks and the bond market, then lends that money out at a higher rate to people and businesses a bank often will not touch. The whole model rests on two things: borrowing cheaply and collecting reliably. When interest rates rise, an NBFC feels it first, because its cost of funds climbs before it can reprice its loans. And because it lends to riskier borrowers, collection discipline is the difference between a compounder and a blow-up.',
    metrics: [
      { metric: 'AUM Growth', why: 'Assets under management growth, the topline equivalent for NBFCs. Business expansion in one number.' },
      { metric: 'NIM', why: 'Lending margin. NBFCs borrow from banks and markets and lend higher; the spread is the profit.' },
      { metric: 'Gross Stage 3 Assets', why: 'Bad loans under Ind AS. Rising Stage 3 means credit quality is deteriorating.' },
      { metric: 'Collection Efficiency', why: 'Recovery strength. Above 98% is excellent. A drop below 95% is an early stress signal.' },
      { metric: 'Cost of Funds', why: 'The rate at which the NBFC borrows. Lower means better margins. A rising-rate environment hurts here first.' },
      { metric: 'ROA / ROE', why: 'Profitability after all costs. Top-tier NBFCs post ROA above 3% and ROE above 20%.' },
      { metric: 'Capital Adequacy', why: 'The buffer against loan losses, mandated by RBI. A falling CAR points to possible equity dilution.' },
    ],
    framework: { demand: 'AUM growth', pricing: 'NIM', efficiency: 'Collection efficiency', capital: 'ROA', risk: 'Stage 3 assets' },
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: '🛡️',
    tagline: 'Traditional valuation fails. Use EV and VNB.',
    examples: ['HDFCLIFE', 'ICICIGI', 'LICI', 'SBILIFE'],
    howItWorks:
      'An insurer sells a promise today and pays out years or decades later, which is why normal profit and PE mean almost nothing here. It collects premiums, invests the float, and hopes it priced the risk correctly. The profit in a life policy is spread across its whole life, so the industry invented its own yardsticks: the value baked into each new policy sold, and the embedded value of the whole book. Read a life insurer through those, plus how many customers keep paying their renewals, because a policy that lapses in year two was an expensive sale that earned nothing.',
    metrics: [
      { metric: 'APE Growth', why: 'Annualised premium equivalent, the sales-volume topline for life insurers.' },
      { metric: 'VNB Margin', why: 'Value of new business margin, the profitability of each new policy sold. Above 25% is excellent.' },
      { metric: 'Persistency Ratio', why: 'Policy renewals. 13th-month above 85% is good. It measures stickiness and the quality of the sale.' },
      { metric: 'Embedded Value (EV)', why: 'Intrinsic value: adjusted net worth plus the present value of future profits. The PE equivalent for insurers.' },
      { metric: 'EV Growth', why: 'The long-term compounding indicator. 15%+ EV growth signals a strong franchise.' },
      { metric: 'Solvency Ratio', why: 'The ability to pay future claims. IRDAI minimum is 150%. Higher means more financial strength.' },
    ],
    framework: { demand: 'APE growth', pricing: 'VNB margin', efficiency: 'Persistency ratio', capital: 'EV growth', risk: 'Solvency ratio' },
  },
  {
    id: 'hospitals',
    name: 'Hospitals',
    icon: '🏥',
    tagline: 'Occupancy and ARPOB tell the whole story.',
    examples: ['APOLLOHOSP', 'MAXHEALTH', 'FORTIS', 'NH'],
    howItWorks:
      'A hospital is really an expensive building full of costs that do not care whether patients show up. The beds, the machines, the doctors and nurses all have to be paid for whether the ward is full or half empty. So the whole business comes down to two questions: how full are the beds, and how much does each full bed earn? Everything below builds from there.',
    sections: [
      {
        title: 'First, what is a hospital business really?',
        intro: 'Forget the white coats for a moment and look at it the way an owner does.',
        blocks: [
          {
            concept: 'A hospital is a building of fixed costs',
            body: 'Most of what a hospital spends is fixed. Whether a ward is packed or half empty, the building still costs the same, the expensive scanner still has to be paid off, and the doctors and nurses still draw their salaries. Those costs do not budge with how busy the place is. That one fact shapes everything, because it means the difference between a great hospital and a struggling one is not the costs, it is how well it fills the beds it has already paid for.',
            example: 'A 200-bed hospital pays for 200 beds\' worth of building, equipment and staff every single day. If only 100 beds are in use, it is carrying the full cost while earning off half the rooms. Fill 170 of those beds and almost every extra rupee drops straight to profit.',
          },
          {
            concept: 'It earns per bed, per night',
            body: 'Strip it right down and a hospital sells one thing: a bed with care attached, for a night. A patient checks in, occupies a bed, uses the theatre, the scans, the medicines and the doctors, and pays for all of it. So the whole business boils down to two levers pulling in the same direction: how many of the beds are occupied, and how much money each occupied bed brings in. Get both climbing and a hospital is a wonderful business. Let either one slip and it struggles.',
            example: 'Think of it a bit like a hotel that also does surgery. An empty room earns nothing tonight and you can never sell tonight\'s empty room again. A full room earns its rent plus everything the guest spends inside. A hospital just plays that game with far higher stakes.',
          },
        ],
      },
      {
        title: 'How a hospital fills beds and earns from them',
        intro: 'Four numbers do almost all the work. Learn these and you can read any hospital.',
        blocks: [
          {
            concept: 'How full it is: occupancy',
            body: 'Occupancy is simply the share of beds that are actually in use. Because the costs are fixed, this is the single biggest swing factor in whether a hospital makes money. Below about 60% a hospital is struggling to cover its costs. Between 60% and 75% it is healthy. Push past 75% and it is humming, with each extra patient adding almost pure profit on top of costs already paid.',
            example: 'Run at 50% and you are paying for a full hospital while earning off half of it. Climb to 75% and the same building, the same staff, the same machines are suddenly throwing off serious profit, because you barely spent anything more to treat those extra patients.',
          },
          {
            concept: 'How much each bed earns: ARPOB',
            body: 'Filling beds is only half the story. The other half is how much money each occupied bed brings in, and hospital people have a name for it: ARPOB, the average revenue per occupied bed. Two hospitals can be equally full and yet one earns far more per bed, because it does more complex, higher-value work and treats better-paying patients. Rising ARPOB is usually the clearest sign a hospital is moving upmarket rather than just getting busier.',
            example: 'A bed used for a simple fever earns a little. The same bed used for a heart surgery, with its theatre time, implants and specialists, earns many times more. A hospital that keeps shifting its beds toward the second kind of work lifts its ARPOB without adding a single new bed.',
          },
          {
            concept: 'The kind of work it does: case mix',
            body: 'Behind ARPOB sits case mix, which just means the blend of simple versus complex treatments a hospital handles. Complex specialties like cardiac care, cancer and neurosurgery pay far more than routine work, and they are harder for a rival down the road to copy. So a hospital building a reputation as the place to go for heart or cancer care is quietly building both higher margins and a real moat at the same time.',
            example: 'A hospital known across the city for cancer treatment attracts the toughest, best-paying cases and the best doctors to handle them. A general hospital doing mostly routine admissions competes with everyone and earns like it.',
          },
          {
            concept: 'How fast beds turn over: length of stay',
            body: 'There is a subtle lever too: how long the average patient stays, which the industry calls length of stay. A shorter stay for the same treatment means the bed is freed up sooner for the next patient, so the hospital treats more people through the same beds in a year. Handled well, that is pure efficiency. But read it carefully, because a shorter stay is only good news if the hospital is still just as full afterwards.',
            example: 'If a hospital trims the average stay from six nights to four for the same surgery and stays just as full, it now runs far more patients through the same beds each year. More throughput, same building, higher returns.',
          },
        ],
      },
      {
        title: 'Who actually pays the bill',
        intro: 'The same treatment earns very different money depending on who is footing it.',
        blocks: [
          {
            concept: 'Payer mix decides the margin',
            body: 'Not every patient is worth the same to a hospital, because different payers pay differently. International patients and cash-paying patients pay the most and pay quickly. Insurance sits in the middle: reliable, but it negotiates hard and pays slowly. Government schemes pay the least of all, often at rates barely above cost. So a hospital\'s payer mix, the blend of who is settling the bills, quietly sets its profitability before a single patient is even treated.',
            example: 'A hospital in a rich neighbourhood full of insured and international patients earns far more per bed than an identical building running mostly on low-paying government scheme patients. Same medicine, very different economics, purely because of who pays.',
          },
        ],
      },
      {
        title: 'The types of hospital business',
        intro: 'They are not all the same bet, even under one "hospital" label.',
        blocks: [
          {
            concept: 'The big multi-specialty chains',
            body: 'These run large hospitals across many cities, covering everything from maternity to organ transplants. Their strength is scale and reputation: a trusted brand pulls in patients and top doctors alike, and a network lets them spread costs and share expertise. Most of the market\'s favourite hospital stocks are these chains, because a mature, full, well-known hospital is a genuine cash machine.',
            example: 'Apollo Hospitals, Max Healthcare, Fortis, Narayana.',
          },
          {
            concept: 'Single-specialty players',
            body: 'Some focus on doing one thing extremely well, like eye care, kidney care or maternity. By repeating the same few procedures thousands of times they get very efficient and very good, which can mean high margins and a strong niche brand. The trade-off is concentration: their whole fortune rides on that one specialty and whatever happens to its pricing.',
            example: 'A chain of eye hospitals doing cataract surgery at scale, or a dialysis network. Narrow, but often superbly run within that narrow lane.',
          },
          {
            concept: 'The asset-light operators',
            body: 'A newer model is to run hospitals without owning the expensive building, managing a property someone else paid for in return for a share of the revenue. It grows the brand and bed count without pouring in huge capital, which lifts returns. The catch is that the profit gets shared with the owner of the bricks, so each hospital earns the operator a bit less.',
            example: 'An operator that signs a deal to run a hospital a developer built, taking a cut of the revenue rather than putting up the crores itself. More beds, less capital, thinner slice per bed.',
          },
        ],
      },
      {
        title: 'What actually moves a hospital stock',
        intro: 'Two forces matter more than any single quarter.',
        blocks: [
          {
            concept: 'New hospitals ramping up',
            body: 'A brand new hospital does not fill up on day one. It takes years to build a reputation, win over doctors and reach the occupancy where it finally makes money, usually somewhere around two-thirds full. During that wait it bleeds losses. So a chain busy opening new hospitals will look less profitable than it really is, because the healthy mature hospitals are being dragged down by the young ones still finding their feet. When those new hospitals finally fill, profit jumps, sometimes dramatically.',
            example: 'A chain opens five new hospitals. For three or four years they lose money while filling up, dragging the whole company\'s profit down. Then they cross breakeven roughly together, and suddenly the group\'s earnings surge, even though nothing new was built.',
          },
          {
            concept: 'The mature core getting fuller and richer',
            body: 'Underneath the new-hospital noise sits the real engine: the older, established hospitals steadily filling up and shifting toward higher-value work. That quiet climb in occupancy and revenue per bed at the mature hospitals is what genuinely compounds, because it costs almost nothing extra to earn. A hospital stock does well when that core keeps improving even as new beds get added on top.',
            example: 'An old flagship hospital going from 70% to 78% full while doing more cardiac and cancer work earns meaningfully more from the exact same building. Multiply that across a dozen mature hospitals and it is a powerful, low-cost source of growth.',
          },
        ],
      },
      {
        title: 'Where hospitals break',
        intro: 'The risks here are specific, and easy to miss if you only look at the headline profit.',
        blocks: [
          {
            concept: 'Expanding too fast on borrowed money',
            body: 'Hospitals are enormously expensive to build, and the temptation is to borrow heavily and open lots of them at once. That is fine if the new hospitals fill up on schedule. It is dangerous if they do not, because the debt has to be serviced whether the beds are occupied or not. An over-ambitious chain can find itself paying interest on empty wards, and that is how hospital companies get into trouble.',
            example: 'A chain borrows heavily to open six hospitals at once. Demand disappoints, the new beds fill slowly, and the interest bill lands every month regardless. What looked like bold growth turns into a cash squeeze.',
          },
          {
            concept: 'Leaning too hard on a few star doctors',
            body: 'A lot of a hospital\'s pull comes from its best specialists, the surgeons patients travel across the state to see. That is a strength until one of them leaves and takes their patients along. A hospital overly dependent on a handful of star names carries a quiet, hard-to-see risk in its most important asset, one that walks out of the building every evening.',
            example: 'A hospital famous for its heart programme loses its lead cardiac surgeon to a rival. Some of the toughest, best-paying cases follow the doctor out the door, and a whole department takes a hit.',
          },
          {
            concept: 'The government capping prices',
            body: 'Healthcare is politically sensitive, so the government sometimes steps in to cap what hospitals can charge for certain procedures, implants or medicines. A price cap can wipe out the margin on a whole line of treatment overnight, no matter how well the hospital is run. It is a risk that comes from outside the business entirely.',
            example: 'A cap on the price of heart stents or knee implants instantly squeezes the margin on those procedures across every hospital, however efficient, simply by decree.',
          },
        ],
      },
      {
        title: 'How to actually value a hospital',
        intro: 'The headline profit lies to you here, for a very specific reason. Learn to see past it.',
        blocks: [
          {
            concept: 'Why the plain profit misleads',
            body: 'A hospital chain that is busy expanding will always look less profitable than it truly is, because its young, loss-making hospitals are dragging down its healthy, mature ones in the same set of numbers. Judge the whole company on today\'s blended profit and you will wrongly conclude a fast-growing chain is a poor business, when really it is a good business carrying the temporary cost of tomorrow\'s growth. The trick is to separate the two.',
            example: 'A chain\'s mature hospitals might be earning a superb return, while three new ones bleed losses as they fill. The combined figure looks mediocre. But the mediocrity is the growth cost, not the quality of the business.',
          },
          {
            concept: 'Split the mature from the maturing',
            body: 'So the right way to read a hospital is to mentally split it in two. Look at how the established hospitals are doing on their own, on occupancy, on revenue per bed, and on the profit each mature bed throws off. That tells you the true quality of the machine. Then look separately at the new hospitals and ask a simple question: are they filling up on schedule toward breakeven? That tells you whether the growth is on track. One number for quality, one for growth.',
            example: 'If the mature hospitals earn a rich profit per bed and the new ones are steadily climbing toward two-thirds full, you are looking at a good business investing in more of itself, whatever the blended number says.',
          },
          {
            concept: 'The numbers that actually fit',
            body: 'Because hospitals carry heavy debt and lumpy new-hospital losses, plain PE is a blunt tool. A few measures fit far better.',
            bullets: [
              { term: 'EBITDA per bed', desc: 'The profit each bed throws off before debt and depreciation muddy the picture. It lets you compare a hospital against itself over time and against rivals. Mature hospitals should earn a healthy figure; new ones drag it down until they fill.' },
              { term: 'Return on Capital (ROCE)', desc: 'Hospitals soak up enormous capital, so the real test is how much profit comes back per rupee invested. A mature chain earning above roughly 15% is allocating its money well. A low figure may just mean lots of new hospitals, so check before judging.' },
              { term: 'EV/EBITDA', desc: 'A price gauge that fits capital-heavy, debt-carrying businesses far better than PE, because it accounts for the debt as well as the equity. It is the multiple most serious hospital analysts actually use.' },
            ],
            outro: 'Put together, these let you value the mature engine properly and treat the new-hospital losses as the investment in growth they really are, instead of mistaking them for a weak business.',
            example: 'A chain on a middling PE can be genuinely cheap once you see its mature hospitals earning strong EBITDA per bed and high returns, with a batch of new hospitals about to cross breakeven and lift the whole group.',
          },
        ],
      },
    ],
    metrics: [
      { metric: 'Occupancy %', why: 'Beds occupied over total beds. Higher means better use of fixed assets. 60-70% is healthy, 75%+ excellent.' },
      { metric: 'ARPOB (Avg Revenue / Occupied Bed)', why: 'Pricing power. Complex surgeries and a better payer mix lift ARPOB. The key growth lever.' },
      { metric: 'ALOS (Avg Length of Stay)', why: 'An efficiency metric. Lower ALOS at the same revenue means more throughput and higher asset turns.' },
      { metric: 'EBITDA/Bed', why: 'Profitability per unit of capacity. Mature hospitals do ₹20-30L per bed; new ones drag it down.' },
      { metric: 'ROCE', why: 'Capital efficiency. Hospitals are capex-heavy, so ROCE above 15% in mature units signals good allocation.' },
      { metric: 'Case Mix', why: 'The share of complex, higher-margin cases. More oncology and cardiac means higher margins.' },
      { metric: 'Payer Mix', why: 'International beats insurance beats self-pay beats government. More international and insurance means better margins.' },
    ],
    framework: { demand: 'Occupancy %', pricing: 'ARPOB', efficiency: 'ALOS', capital: 'ROCE', risk: 'Debt / new-bed ramp' },
  },
  {
    id: 'saas',
    name: 'SaaS / Software',
    icon: '💻',
    tagline: 'Gross margin and NRR matter more than revenue.',
    examples: ['TATAELXSI', 'PERSISTENT', 'KPITTECH', 'MPHASIS'],
    howItWorks:
      'Software is sold once and billed forever. The cost to serve the next customer is close to zero, so a good SaaS business compounds on top of a base that keeps paying. The single most powerful signal is whether existing customers spend more each year without any new sales, because that means the product is growing itself. The enemy is churn: a leaky bucket kills compounding no matter how fast the top of the funnel fills. Judge it on retention and gross margin long before you judge it on revenue.',
    metrics: [
      { metric: 'ARR (Annual Recurring Revenue)', why: 'The recurring, predictable revenue base. The heartbeat metric; high-quality SaaS grows it 30%+.' },
      { metric: 'Net Revenue Retention (NRR)', why: 'Revenue from existing customers including expansion minus churn. Above 110% means growth without new sales. The best moat signal.' },
      { metric: 'CAC (Customer Acquisition Cost)', why: 'The cost to win one customer. Rising CAC with flat NRR means deteriorating unit economics.' },
      { metric: 'LTV / CAC', why: 'The unit-economics ratio. Above 3x is healthy; below 2x means burning money to grow.' },
      { metric: 'Gross Margin', why: 'Software efficiency. 70-80% is normal. Below 60% points to a services drag.' },
      { metric: 'Churn Rate', why: 'Below 5% annual churn is a sticky product. Above 15% is a leaky bucket that kills compounding.' },
      { metric: 'Rule of 40', why: 'Revenue growth plus FCF margin. A score above 40 is a healthy balance of growth and profitability.' },
      { metric: 'Free Cash Flow Margin', why: 'Real profitability. Accounting profit can be massaged; FCF cannot. Positive FCF means self-funding.' },
    ],
    framework: { demand: 'ARR growth', pricing: 'NRR', efficiency: 'Gross margin', capital: 'FCF margin', risk: 'Churn' },
  },
  {
    id: 'fmcg',
    name: 'FMCG',
    icon: '🛒',
    tagline: 'Volume growth is real demand. Price growth is inflation.',
    examples: ['HINDUNILVR', 'NESTLEIND', 'DABUR', 'MARICO'],
    howItWorks:
      'FMCG sells small, cheap, repeat-purchase products to hundreds of millions of people, and its real moat is distribution: getting a product onto a shelf in a village no competitor can reach cost-effectively. Because the products are cheap and habitual, a company can raise prices quietly for years. That is the trap in the numbers: revenue can grow on price alone while actual demand stalls. Always split growth into volume and price. Volume is real people buying more; price is just inflation passing through.',
    metrics: [
      { metric: 'Volume Growth', why: 'Real demand stripped of price hikes. Pricing inflates revenue; volume shows whether consumers actually buy more.' },
      { metric: 'Gross Margin', why: 'Raw-material sensitivity. When commodities spike, gross margin contracts first. Watch input cycles.' },
      { metric: 'EBITDA Margin', why: 'Operating leverage. 20-25% is standard for large FMCG; premiumisation pushes it higher.' },
      { metric: 'Distribution Reach', why: 'The moat. Rural and semi-urban penetration expands the addressable market and is hard to replicate.' },
      { metric: 'Market Share', why: 'Competitive position. Gaining share in a flat market beats losing share in a growing one.' },
      { metric: 'ROCE', why: 'Capital efficiency. FMCG should post high ROCE, 25-50%, given low capex intensity.' },
      { metric: 'Ad Spend %', why: 'Brand investment. Cutting A&P to flatter short-term margins weakens the long-term franchise.' },
    ],
    framework: { demand: 'Volume growth', pricing: 'Gross margin', efficiency: 'EBITDA margin', capital: 'ROCE', risk: 'Market share loss' },
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: '🏪',
    tagline: 'Same-store sales separate real growth from just opening stores.',
    examples: ['TRENT', 'DMART', 'ABFRL', 'SHOPERSTOP'],
    howItWorks:
      'A retailer grows two ways: selling more from the stores it already has, and opening new ones. Only the first proves the concept works. New stores can mask a weak business for years, which is why same-store sales growth is the number that matters most. Underneath that, retail is a game of turning inventory fast and squeezing productivity out of every square foot of expensive real estate. The very best, like DMart, get suppliers to fund their working capital so growth pays for itself.',
    metrics: [
      { metric: 'SSSG (Same Store Sales Growth)', why: 'Core demand from existing stores. Growing SSSG plus new stores is a double engine; flat SSSG means expansion is masking weakness.' },
      { metric: 'Revenue / sq ft', why: 'Store productivity. Higher means better yield per unit of real-estate cost.' },
      { metric: 'Inventory Turnover', why: 'How fast stock sells. Low turns mean dead stock, markdowns and a margin hit.' },
      { metric: 'Gross Margin', why: 'Pricing power versus suppliers. Fashion retail (60%+) and value retail like DMart (15%) are very different models.' },
      { metric: 'Store Additions', why: 'The expansion runway, but only valuable if SSSG is healthy. Otherwise it just dilutes returns.' },
      { metric: 'Working Capital Cycle', why: 'Cash efficiency. Selling before paying suppliers, negative working capital, is a cash machine.' },
      { metric: 'EBITDA Margin', why: 'Scalability. Retail has high fixed costs, so scale drives operating leverage.' },
    ],
    framework: { demand: 'SSSG', pricing: 'Gross margin', efficiency: 'Inventory turnover', capital: 'ROCE', risk: 'Working capital' },
  },
  {
    id: 'telecom',
    name: 'Telecom',
    icon: '📡',
    tagline: 'ARPU tells you if monetisation is actually working.',
    examples: ['BHARTIARTL', 'IDEA', 'INDUSTOWER'],
    howItWorks:
      'Telecom builds a hugely expensive network of towers and spectrum, then earns a small amount from each subscriber every month. Once the network is built, every extra rupee of revenue is almost pure profit, so the whole game is filling the pipe and charging more per user. Revenue per user is the honest scoreboard: adding cheap subscribers while that number stalls is just competitive bleeding. Spectrum auctions are brutal cash outflows that can starve a player of the money it needs to keep the network good.',
    metrics: [
      { metric: 'ARPU (Avg Revenue Per User)', why: 'Pricing power per subscriber. Rising ARPU means monetisation works; flat ARPU in a growing base means competitive pressure.' },
      { metric: 'Subscriber Growth', why: 'Scale, which brings fixed-cost leverage. Quality (postpaid versus prepaid) matters as much as quantity.' },
      { metric: 'Churn', why: 'Customer loyalty. Low churn signals a sticky network effect and better coverage or brand.' },
      { metric: 'Data Consumption / User', why: 'Monetisation potential. Higher data usage is the path to higher ARPU tiers and add-on services.' },
      { metric: 'Spectrum Costs', why: 'Capital intensity. Auctions are massive cash outflows; heavy spectrum debt constrains network capex.' },
      { metric: 'EBITDA Margin', why: 'Efficiency on fixed infrastructure. Telcos should post 40-50% EBITDA margin at scale.' },
    ],
    framework: { demand: 'Subscriber growth', pricing: 'ARPU', efficiency: 'EBITDA margin', capital: 'FCF after spectrum', risk: 'Churn / debt' },
  },
  {
    id: 'auto',
    name: 'Auto & Auto Parts',
    icon: '🚗',
    tagline: 'Volume is the demand. Profit per vehicle is the quality.',
    examples: ['MARUTI', 'M&M', 'TATAMOTORS', 'BAJAJ-AUTO'],
    howItWorks:
      'A carmaker earns per vehicle it sells, so the business runs on two things: how many it sells, and how much it keeps on each one. Volume is the demand signal, but the quality of the business shows up in the profit per vehicle, which rises when buyers trade up to pricier, better-loaded models. The parts makers who supply the carmakers ride the same wave, and the whole sector is being reshaped by the slow shift from petrol and diesel to electric, which rewards some players and threatens others. Watch out for a hidden trap: revenue can climb on discounts and cheap models while the profit on each vehicle quietly shrinks.',
    metrics: [
      { metric: 'Volume Growth', why: 'Units sold, split by type (two-wheelers, cars, trucks, tractors). The rawest read on real demand, before any price effects.' },
      { metric: 'Average Selling Price', why: 'The price of the typical vehicle sold. Rising ASP means buyers are trading up to costlier models, which lifts revenue and usually margin.' },
      { metric: 'Profit per Vehicle (EBITDA)', why: 'How much the company actually keeps on each vehicle. The truest measure of pricing power and cost control in the business.' },
      { metric: 'Market Share', why: 'Whether the company is winning or losing against rivals. Gaining share in a flat market is far better than riding a rising one.' },
      { metric: 'Export Share', why: 'How much is sold abroad. Diversifies away from one economy and can add a currency tailwind, but also imports foreign risks.' },
      { metric: 'EV Readiness', why: 'How prepared the company is for the shift to electric. Being on the winning side of that change (batteries, electronics) versus the losing side (engine parts) is a structural, make-or-break issue.' },
      { metric: 'Raw Material Cost', why: 'Steel, aluminium and battery costs are the biggest swing in the cost base. When commodities spike, margins get squeezed first here.' },
      { metric: 'Dealer Inventory', why: 'How many weeks of unsold stock sit with dealers. Rising inventory is an early warning that demand is cooling before the sales numbers show it.' },
    ],
    framework: { demand: 'Volume growth', pricing: 'Average selling price', efficiency: 'Profit per vehicle', capital: 'ROCE', risk: 'EV shift / raw material costs' },
  },
  {
    id: 'cement',
    name: 'Cement',
    icon: '🏗️',
    tagline: 'EBITDA/tonne is the only margin that matters.',
    examples: ['ULTRACEMCO', 'SHREECEM', 'AMBUJACEM', 'ACC'],
    howItWorks:
      'Cement is a heavy, low-value commodity that is expensive to transport, so it is really a collection of regional markets rather than one national one. A bag of cement is much the same whoever makes it, which means the winner is whoever produces and delivers it cheapest and sells it where demand is tight. Everything reduces to profit per tonne. Fuel is the swing cost and freight decides how far a plant can profitably sell, so proximity to the market is a real edge.',
    metrics: [
      { metric: 'Capacity Utilisation', why: 'Demand strength. Above 75% is a tight market with pricing power; below 65% means oversupply and margin pressure.' },
      { metric: 'Realisation / Tonne', why: 'Pricing. Regional prices vary a lot. Rising realisation means demand is outpacing supply.' },
      { metric: 'EBITDA / Tonne', why: 'The core profitability metric. Above ₹1,000 per tonne is strong; below ₹800 is a squeeze. The standard comparison unit.' },
      { metric: 'Fuel Cost', why: 'The biggest variable cost (coal, petcoke), around 30% of revenue. The commodity cycle hits margins directly here.' },
      { metric: 'Capacity Expansion', why: 'Growth strategy. Greenfield takes 3-4 years, acquisitions are faster. It adds future supply to the market.' },
      { metric: 'Freight Cost', why: 'A margin driver. Cement is heavy and low-value, so proximity to markets is a cost advantage.' },
    ],
    framework: { demand: 'Capacity utilisation', pricing: 'Realisation/tonne', efficiency: 'EBITDA/tonne', capital: 'ROCE', risk: 'Fuel / freight costs' },
  },
  {
    id: 'metals',
    name: 'Steel & Metals',
    icon: '⚙️',
    tagline: 'A commodity cycle stock. The macro direction matters most.',
    examples: ['JSWSTEEL', 'TATASTEEL', 'HINDALCO', 'SAIL'],
    howItWorks:
      'A metals company does not set its own price. The price of steel or aluminium is decided by global supply and demand, above all China, and the company simply takes what the market gives. So the macro cycle, not management brilliance, drives most of the return. What management controls is cost per tonne and the balance sheet. Captive mines are a huge advantage, and low debt is survival, because when the cycle turns down, heavily indebted players can be crushed by interest before the price recovers.',
    metrics: [
      { metric: 'Realisation / Tonne', why: 'The steel price realised, driven by global commodity cycles, not company decisions. Watch HRC and CRC benchmarks.' },
      { metric: 'EBITDA / Tonne', why: 'Operating efficiency: profit squeezed per tonne despite input costs. ₹8,000-12,000/tonne is healthy for steel.' },
      { metric: 'Capacity Utilisation', why: 'The demand environment. Low utilisation in a downcycle means both volume and margin pressure.' },
      { metric: 'Iron Ore / Coal Costs', why: 'Input sensitivity. Captive mines are a huge advantage; import-dependent players suffer in commodity upcycles.' },
      { metric: 'Debt', why: 'Cyclical risk. Metal companies carry heavy debt; in downcycles, debt service can overwhelm operations.' },
      { metric: 'Global commodity cycle', why: 'The real sector direction. China demand, global supply and USD strength drive the cycle more than any company factor.' },
    ],
    framework: { demand: 'Capacity utilisation', pricing: 'Realisation/tonne', efficiency: 'EBITDA/tonne', capital: 'ROCE', risk: 'Debt / commodity cycle' },
  },
  {
    id: 'airlines',
    name: 'Airlines',
    icon: '✈️',
    tagline: 'Load factor and CASK determine survival.',
    examples: ['INDIGO', 'SPICEJET'],
    howItWorks:
      'An airline flies a fixed number of seats whether they sell or not, so an empty seat is revenue gone forever the moment the door closes. The business is a knife-edge between how full the planes are and the cost of flying each seat one kilometre. Fuel is a third to a half of costs and moves with crude, which the airline cannot control, so the only durable edge is a structurally lower cost per seat. That is the entire IndiGo story. Debt and unhedged fuel are what bankrupt the rest.',
    metrics: [
      { metric: 'Load Factor', why: 'Seats filled over seats available. Above 85% is efficient; below 80% means yield dilution.' },
      { metric: 'RASK (Revenue/ASK)', why: 'Revenue per available seat kilometre, the pricing-power metric.' },
      { metric: 'CASK (Cost/ASK)', why: 'Cost per seat kilometre. Lower CASK is a structural cost advantage, IndiGo\'s moat.' },
      { metric: 'Fuel Cost %', why: 'Typically 35-45% of revenue. When crude moves, margins move. Unhedged means high volatility.' },
      { metric: 'Fleet Utilisation', why: 'Hours flown per aircraft per day. Higher means more revenue from the same fixed asset base.' },
      { metric: 'Yield', why: 'Revenue per passenger kilometre, a pricing-power indicator. The RASK-yield gap shows ancillary revenue quality.' },
    ],
    framework: { demand: 'Load factor', pricing: 'Yield / RASK', efficiency: 'CASK', capital: 'Fleet utilisation', risk: 'Fuel cost / debt' },
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: '🏘️',
    tagline: 'Pre-sales today equals revenue two to three years from now.',
    examples: ['DLF', 'GODREJPROP', 'OBEROIRLTY', 'PRESTIGE'],
    howItWorks:
      'A developer sells flats long before it finishes building them, then recognises the revenue years later when the project completes. So the reported P&L is old news; the real leading indicator is pre-sales, what got booked this quarter. But bookings are only promises. The number that proves execution is collections, the cash actually received against those bookings. Real estate is brutally capital-intensive and cyclical, so debt is the existential risk: a developer that over-leverages into a boom and then hits slow collections can go under fast.',
    metrics: [
      { metric: 'Pre-sales (Bookings)', why: 'The future revenue pipeline, booked units times price. A leading indicator for the next 2-3 years of P&L.' },
      { metric: 'Collections', why: 'Cash actually received. Pre-sales are promises; collections are reality and show execution.' },
      { metric: 'Inventory Levels', why: 'Unsold units. Rising inventory means a demand slowdown or oversupply. Watch months-of-inventory.' },
      { metric: 'Net Debt', why: 'The existential risk in real estate. Highly leveraged developers are vulnerable to rate cycles and slow collections.' },
      { metric: 'Project Pipeline', why: 'Land bank plus upcoming launches, the growth visibility. Location quality matters as much as size.' },
      { metric: 'ROE', why: 'Capital-allocation quality. Real estate is capital-heavy, and ROE separates the efficient developers from the destroyers.' },
    ],
    framework: { demand: 'Pre-sales', pricing: 'Realisation/sq ft', efficiency: 'Collections', capital: 'ROE', risk: 'Net debt' },
  },
  {
    id: 'hotels',
    name: 'Hotels',
    icon: '🏨',
    tagline: 'RevPAR is the single most important number.',
    examples: ['INDHOTEL', 'EIH', 'LEMONTREE', 'CHALET'],
    howItWorks:
      'A hotel room is the most perishable product there is: an unsold night is gone forever. The building is a big fixed cost, so once the rooms are full, every extra booking is almost pure profit, and the same works viciously in reverse in a downturn. The business combines two levers, how full the hotel is and what each room fetches, into one number: revenue per available room. The smart modern move is to grow by managing other people\'s hotels for a fee, adding rooms and brand without pouring in capital.',
    metrics: [
      { metric: 'Occupancy %', why: 'The demand proxy. 65-70% is standard, 75%+ in leisure resorts. Highly seasonal and cycle-sensitive.' },
      { metric: 'ARR (Avg Room Rate)', why: 'Pricing power. Rising ARR means brand premium and tight supply. Luxury hotels defend ARR even in downcycles.' },
      { metric: 'RevPAR', why: 'Occupancy times ARR. The single metric that combines demand and pricing, and the best cross-hotel comparison.' },
      { metric: 'EBITDA Margin', why: 'Operating leverage. High fixed costs mean that at full occupancy, incremental revenue is near-100% margin.' },
      { metric: 'Managed Rooms Growth', why: 'Asset-light expansion. Managing third-party properties grows inventory without capex, the quality-compounder path.' },
    ],
    framework: { demand: 'Occupancy %', pricing: 'ARR / RevPAR', efficiency: 'EBITDA margin', capital: 'ROCE', risk: 'Capex / debt' },
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: '📦',
    tagline: 'GMV is vanity; contribution margin is sanity.',
    examples: ['NYKAA', 'DELHIVERY', 'ZOMATO', 'FIRSTCRY'],
    howItWorks:
      'An online platform sits between buyers and sellers and keeps a slice of every transaction. The headline number everyone quotes, gross merchandise value, is mostly vanity, because it is easy to buy growth by subsidising customers into a loss. The honest question is whether the platform keeps more of each order than it spends to serve it, and whether customers come back on their own instead of being paid to return. Repeat purchases lower acquisition cost over time and are the real compounding engine; without them the model is just burning cash for GMV.',
    metrics: [
      { metric: 'GMV (Gross Merchandise Value)', why: 'Total transaction value on the platform. A scale metric, but inflated by high-return categories. Watch take rate.' },
      { metric: 'Take Rate', why: 'Revenue over GMV, how much of each transaction the platform keeps. Rising take rate means monetisation is working.' },
      { metric: 'CAC (Customer Acquisition Cost)', why: 'The cost to win each new user. Rising CAC with flat repeat rates means the unit economics are breaking.' },
      { metric: 'Repeat Purchase Rate', why: 'Loyalty. High repeat means organic growth and lower CAC over time, the compounding engine.' },
      { metric: 'Contribution Margin', why: 'Revenue minus variable cost per order. Positive is a path to profit; negative means still subsidising growth.' },
      { metric: 'Logistics Cost', why: 'A major expense. Owning versus outsourcing logistics changes the margin structure; higher order density lowers per-unit cost.' },
    ],
    framework: { demand: 'GMV / order volume', pricing: 'Take rate', efficiency: 'Logistics cost', capital: 'Contribution margin', risk: 'CAC / churn' },
  },
  {
    id: 'pharma',
    name: 'Pharma',
    icon: '💊',
    tagline: 'US generics pipeline and USFDA compliance decide the fate.',
    examples: ['SUNPHARMA', 'DRREDDY', 'CIPLA', 'DIVISLAB'],
    howItWorks:
      'An Indian pharma company is really two very different businesses wearing one uniform. At home it sells trusted brands for long-term illnesses, a steady, high-margin business. Abroad, mostly in America, it sells cheap copies of off-patent drugs in a brutal, price-cutting market. Sitting between the two is a factory, and whether the American drug regulator is happy with that factory can matter more than everything else put together. The sections below take these one at a time.',
    sections: [
      {
        title: 'First, what is a pharma company really?',
        intro: 'The confusing thing about Indian pharma is that one company is doing two opposite jobs at once.',
        blocks: [
          {
            concept: 'Two businesses under one roof',
            body: 'Almost every big Indian pharma company runs two businesses that could not be more different. One is the India business, where it sells branded medicines for ongoing conditions, calm, profitable and dependable. The other is the export business, mostly to the United States, where it sells plain copies of drugs whose patents have expired, in a market that grinds prices down every year. Understanding a pharma company means never mixing these two up, because they behave in completely opposite ways.',
            example: 'The same company might earn a lovely, steady margin selling a heart-disease brand to Indian patients, while fighting tooth and nail on price for the identical molecule sold as a no-name generic in America. One business is a garden, the other is a knife fight.',
          },
          {
            concept: 'What a generic actually is',
            body: 'When a new drug is invented, the company that made it gets a patent, a period of years where only it can sell that drug, at a high price. Once the patent runs out, anyone who can prove they make the same molecule safely is allowed to sell their own version. That copy is called a generic. Making generics is what most Indian pharma does best. The molecule is the same as the original; the only thing that has vanished is the monopoly and the fat price that came with it.',
            example: 'A blood-pressure pill sells for a high price for years while under patent. The day the patent expires, a dozen generic makers pile in with the exact same pill, the price collapses, and the medicine gets cheap for everyone.',
          },
        ],
      },
      {
        title: 'The home business: brands doctors trust',
        intro: 'The India half is the quiet, dependable engine, and it runs on something surprising: brand loyalty for generics.',
        blocks: [
          {
            concept: 'In India, even generics carry a brand',
            body: 'Here is the quirk that makes the India business so good. Even though these are generic medicines, Indian companies sell them under their own brand names, and doctors get comfortable prescribing a particular brand they trust. That trust is sticky. A doctor who has prescribed a company\'s thyroid brand for a decade does not casually switch. So the India business earns healthy margins and enjoys a loyalty that a plain price-driven generic never could.',
            example: 'Two pills can be chemically identical, but a doctor keeps writing the familiar brand because they trust its quality and consistency. That habit, repeated across thousands of doctors, is worth a great deal.',
          },
          {
            concept: 'Chronic beats acute',
            body: 'Within the India business, the best kind of medicine is one for a long-term illness, what the industry calls chronic conditions: heart disease, diabetes, blood pressure, thyroid. A patient takes these every day, for years, so the prescription repeats month after month like a subscription. Medicines for short-term problems, the acute ones like a fever or an infection, are taken once and stop, so that revenue is lumpier and more seasonal. A company weighted toward chronic care has smoother, more predictable earnings.',
            example: 'A diabetes patient refills the same medicine every month for the rest of their life. An antibiotic is bought for a week and then forgotten. Guess which one a pharma company would rather build its business on.',
          },
        ],
      },
      {
        title: 'The export business: the American grind',
        intro: 'The US half can be huge, but it is a far harsher place to make a living.',
        blocks: [
          {
            concept: 'Prices only fall',
            body: 'Selling generics in America is a volume game with no loyalty. Whoever offers the drug cheapest tends to win the order, and as more makers pile onto a molecule, the price only ever grinds downward. This is called price erosion, and it is relentless. A drug that earned good money this year will earn less next year purely because more competitors showed up. So the US business is a treadmill: a company has to keep launching new generics just to stand still.',
            example: 'A generic launches at a decent price with two rivals. A year later there are eight rivals, the price has fallen by half, and the money the company banked on that drug quietly shrinks, even though it did nothing wrong.',
          },
          {
            concept: 'Every new generic needs a permission slip (ANDA)',
            body: 'To sell a generic in America, a company must file an application with the US regulator proving its copy is as good as the original, and wait for approval. That filing is called an ANDA. A company\'s stack of pending and approved ANDAs is basically its pipeline of future US products, so a thick pipeline means years of new launches to fight the price erosion, and a thin one means trouble ahead.',
            example: 'A company with dozens of approved ANDAs has a steady stream of new products to launch each year. One with an empty pipeline is running out of ways to replace the revenue that erosion keeps eating.',
          },
          {
            concept: 'The occasional jackpot: first-to-file',
            body: 'Once in a while there is a real prize. The first company to challenge a patent and file to make a particular generic can win six months where it is the only generic version allowed, before the crowd is let in. For those six months it enjoys near-monopoly pricing and the profits can be enormous. But it is a one-off windfall, not a steady stream, so it is important not to mistake a jackpot quarter for the normal run rate.',
            example: 'Win the exclusive six-month window on a big drug and a company can make a spectacular, headline-grabbing profit. Then the window closes, the other generics flood in, the price crashes, and that windfall does not come back.',
          },
        ],
      },
      {
        title: 'The factory decides everything: the USFDA',
        intro: 'This is the risk that makes pharma pharma. Nothing else on the page matters if this goes wrong.',
        blocks: [
          {
            concept: 'The American regulator inspects Indian factories',
            body: 'To sell medicine in America, a company\'s factory has to pass inspection by the US Food and Drug Administration, the USFDA, even though the plant sits in India. These inspectors turn up and check that everything is spotlessly, provably up to standard. What they find decides whether that factory can keep exporting to its most profitable market. This single relationship hangs over every Indian pharma company like weather.',
            example: 'An inspector spends a week walking a plant in Gujarat or Hyderabad, checking records and processes. Their report can make or break a year\'s earnings for the whole company.',
          },
          {
            concept: 'The escalating ladder of trouble',
            body: 'When inspectors are unhappy, the trouble comes in steps. First they issue a list of observations, known as a Form 483, a warning to fix things. If it is not fixed well enough, that becomes a Warning Letter, which is serious. At the worst end sits an import alert, where America simply bans that factory\'s medicines until the mess is cleaned up, which can take years. Each step up the ladder chops away more of the company\'s most valuable revenue.',
            example: 'A factory gets a Warning Letter, and suddenly no new products from that plant can be approved for the US, freezing a chunk of the pipeline. If it escalates to an import alert, the existing US sales from that plant stop dead too.',
          },
          {
            concept: 'Why a great quarter can still be a landmine',
            body: 'This is what makes pharma unusual. A company can be growing beautifully, with a rich pipeline and rising profits, and then a single bad inspection at one important factory can wipe out a large slice of earnings overnight, no matter how well the rest of the business is doing. So with pharma you can never look only at the growth. You always have to ask how clean the factories are.',
            example: 'The numbers look wonderful, the pipeline is deep, the stock is loved, and then one Warning Letter on the plant that makes half the US products turns the whole story upside down in a single day.',
          },
        ],
      },
      {
        title: 'Betting on the future: R&D',
        intro: 'Because old drugs keep eroding, a pharma company has to keep inventing its next act.',
        blocks: [
          {
            concept: 'R&D is buying tomorrow\'s pipeline',
            body: 'Research and development spending is how a pharma company funds its future products. Too little, and the pipeline dries up and erosion slowly eats the business. But the kind of R&D matters as much as the amount. Spending to churn out yet more simple generics is low-value, because everyone can do it. Spending to crack hard-to-make complex generics and biosimilars, copies of advanced biological drugs, is where the durable, better-protected profits of the future live.',
            example: 'A company spending heavily to master a difficult inhaler or an injectable that few rivals can copy is buying years of protected margin. One spending the same money on ordinary pills is just feeding the treadmill.',
          },
        ],
      },
      {
        title: 'Where pharma breaks',
        intro: 'Beyond the factory risk, a few specific cracks show up again and again.',
        blocks: [
          {
            concept: 'Leaning on one or two big drugs',
            body: 'Some companies earn a huge share of their US profit from just a couple of products. That is lovely while it lasts, but the moment competition arrives on one of those drugs, or its exclusivity ends, a big lump of profit can vanish at once. A pharma company resting on a couple of blockbusters is more fragile than its smooth numbers suggest.',
            example: 'A firm making most of its US money from a single high-margin generic sees three new competitors launch the same drug. The price halves, and a big part of the company\'s profit disappears in a couple of quarters.',
          },
          {
            concept: 'The government capping prices at home',
            body: 'In India, the government keeps a list of essential medicines whose prices it controls, to keep healthcare affordable. That is good for patients, but it caps the margin on any drug that lands on the list. A company heavy in price-controlled medicines has less room to raise prices and protect its profitability.',
            example: 'A widely-used medicine gets added to the essential-drugs price list, and its price is frozen at a modest level by rule. Every company selling it takes a margin hit, however well run.',
          },
          {
            concept: 'Betting the whole business on America',
            body: 'A company that sells almost entirely into the US carries all the price erosion and all the factory risk in one basket. The steadier players spread their exports across America, Europe, emerging markets and a strong India business, so that a bad patch in any one place does not sink the whole ship. Geographic concentration is a quiet but real risk.',
            example: 'When US price erosion turns nasty, a company selling only to America feels the full force of it. One with a big India business and sales across many countries barely flinches.',
          },
        ],
      },
      {
        title: 'How to actually value a pharma company',
        intro: 'The blended profit hides two very different engines and one landmine. Value them separately.',
        blocks: [
          {
            concept: 'Split the calm from the lumpy',
            body: 'A pharma company\'s headline profit blends the steady India business with the jumpy, erosion-prone US business, and sometimes a one-off first-to-file windfall on top. Judge the whole thing on a single number and you can badly misread it, mistaking a lucky jackpot quarter for the normal run rate, or a temporary US slump for a broken company. The right way is to value the durable India engine for its steadiness and treat the US business for what it is: valuable, but volatile and always shadowed by factory risk.',
            example: 'A company can post a stunning quarter purely because of a six-month exclusivity that will not repeat. Read that as the new normal and you will overpay badly when the window shuts.',
          },
          {
            concept: 'What to actually look at',
            body: 'So put the single PE aside and read a pharma company through a few clearer windows.',
            bullets: [
              { term: 'Domestic chronic growth', desc: 'How fast the India business, especially the recurring chronic-illness brands, is growing. This is the calm, high-quality engine, and steady growth here is worth a lot.' },
              { term: 'Pipeline quality, not just size', desc: 'Not merely how many US approvals are pending, but whether they are hard-to-make complex products that resist erosion, or ordinary generics that will be competed away. Quality of pipeline beats quantity.' },
              { term: 'Factory track record', desc: 'The regulatory history of the key plants. A clean inspection record is worth real money; a plant under a Warning Letter is a live risk sitting under the earnings, however good the pipeline looks.' },
              { term: 'EV/EBITDA', desc: 'A price gauge that handles the debt and the heavy investment better than plain PE, and lets you compare pharma companies more fairly.' },
            ],
            outro: 'Read together, these tell you how much of the profit is durable, how protected the future is, and how big the hidden factory risk is, which is far more than any single PE number can say.',
            example: 'A company with a fast-growing chronic India business, a pipeline full of complex products and a spotless factory record deserves a premium. One leaning on lumpy US windfalls from a plant with a shaky inspection history does not, whatever its PE suggests.',
          },
        ],
      },
    ],
    metrics: [
      { metric: 'Domestic Formulations Growth', why: 'India business quality. Chronic therapies mean recurring prescriptions and stable revenue; acute is volatile and seasonal.' },
      { metric: 'US Generic Revenue & ANDA Pipeline', why: 'The biggest earnings swing. ANDA count and first-to-file opportunities signal US pricing power. Revenue can be lumpy.' },
      { metric: 'R&D Spend %', why: 'Pipeline investment. Generic-focused runs 4-6% of sales; complex generics and biosimilars 8-14%. Too low means no future.' },
      { metric: 'EBITDA Margin', why: 'Operating efficiency. Top-tier Indian pharma does 22-28%. API-heavy players are lower; US price erosion compresses it.' },
      { metric: 'API vs Formulations Mix', why: 'Margin quality. API is upstream, capital-intensive and cyclical; branded formulations carry 40-60% gross margins.' },
      { metric: 'Chronic vs Acute Mix', why: 'Revenue quality. A higher chronic mix means recurring prescriptions and smoother earnings; acute is one-time.' },
      { metric: 'USFDA Compliance Status', why: 'The existential risk. A warning letter shuts US exports; a Form 483 needs watching; an import alert is a ban until resolved.' },
      { metric: 'Export Diversification', why: 'Concentration risk. US-only exposure is volatile; EU, EM and rest-of-world diversification is a buffer.' },
    ],
    framework: { demand: 'Domestic Rx growth', pricing: 'EBITDA margin', efficiency: 'R&D spend %', capital: 'ROCE', risk: 'USFDA compliance' },
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    icon: '🛤️',
    tagline: 'Order book is the balance sheet. Execution speed is the P&L.',
    examples: ['LT', 'ADANIPORTS', 'IRFC', 'NTPC', 'POWERGRID'],
    howItWorks:
      'An infrastructure company builds big things: roads, metros, ports, power lines, factories. It does not sell to millions of customers. It wins large contracts, one at a time, and then spends years building them out. So its future is not really in this year\'s sales. It is in the pile of contracts it has already won and not yet finished. The sections below explain how that works, and where the money can quietly go missing.',
    sections: [
      {
        title: 'First, what is an infrastructure company really?',
        intro: 'This business runs backwards from most. The future is more visible than the present.',
        blocks: [
          {
            concept: 'It lives off contracts it has already won',
            body: 'An infrastructure or construction company does not wake up each morning hoping for sales. It wins big contracts through bidding, a highway here, a metro line there, and each one takes two, three, sometimes five years to build. So at any moment the company is sitting on a stack of work it has already been awarded but not yet finished. That stack is the whole point of the business, because it is revenue that is effectively already booked, just waiting to be built.',
            example: 'A company wins a ₹5,000 crore contract to build a stretch of expressway over four years. That ₹5,000 crore is future revenue it can already count on, long before a single truck of concrete arrives.',
          },
          {
            concept: 'The order book is its real balance sheet',
            body: 'Because of that, the most important number is not this year\'s sales, it is the order book: the total value of all the won-but-unfinished contracts. A healthy order book is like a full pantry, several years of revenue sitting ready to be cooked. When people say a company has "revenue visibility", this is what they mean. You can see the next few years coming because the work is already signed.',
            example: 'A builder doing ₹2,000 crore of revenue a year with a ₹6,000 crore order book has roughly three years of work in hand. You do not have to guess where its revenue comes from; it is sitting right there in the book.',
          },
        ],
      },
      {
        title: 'Reading the order book',
        intro: 'Three related numbers tell you whether the pantry is filling up or emptying out.',
        blocks: [
          {
            concept: 'How much is in hand: the backlog',
            body: 'The size of the order book is usually compared to the company\'s yearly revenue. Two to three times yearly revenue is comfortable, meaning two to three years of work is locked in. Much less than that and the company will soon run out of things to build. Much more can be good, though very large books sometimes hide projects that are stuck. As a rule, a bigger, cleaner book means more of the future is already secured.',
            example: 'An order book worth 3x annual revenue means three years of building is already won. One worth barely 1x means the company is nearly out of work and had better win new contracts fast.',
          },
          {
            concept: 'How much is coming in: order inflows',
            body: 'The pantry empties as the company builds, so it has to keep restocking by winning fresh contracts. The value of new contracts won in a period is called order inflows, and it is the real leading indicator. Strong, growing inflows today become revenue two and three years from now. Slowing inflows are an early warning that growth will fade down the line, even if today\'s numbers still look fine.',
            example: 'A company that keeps winning more new work each year than it finishes is growing its future. One whose new wins are drying up will keep reporting good revenue for a while, then quietly stall once the old book runs down.',
          },
          {
            concept: 'Winning faster than you build: book-to-bill',
            body: 'Put those two together and you get a simple, powerful check: are new orders coming in faster than old ones are being completed? That ratio is called book-to-bill. Above one, the order book is growing and the future is getting bigger. Below one, the company is finishing work faster than it is replacing it, and the book, its whole future, is shrinking.',
            example: 'Win ₹6,000 crore of new orders in a year while completing ₹4,000 crore of old ones, and the book grew. Win only ₹3,000 crore while completing ₹4,000 crore, and the pantry is emptying, however busy this year feels.',
          },
        ],
      },
      {
        title: 'Turning orders into cash',
        intro: 'Winning and building is the easy bit. Getting paid on time is where infra companies live or die.',
        blocks: [
          {
            concept: 'Execution: actually getting it built',
            body: 'An order is only worth something once it is built. How quickly a company turns its order book into finished, invoiced work is called execution, and it is where good and bad infrastructure companies separate. Delays, land not handed over, materials short, labour missing, all leave the money stuck in a half-built project earning nothing. A company that executes well converts its pantry into meals steadily and predictably. A poor one lets orders rot in the book.',
            example: 'Two firms win identical highway contracts. One finishes on schedule and gets paid on time. The other hits delays, the road sits half-built for an extra two years, and all that promised revenue stays frozen in concrete.',
          },
          {
            concept: 'The cash trap: working capital',
            body: 'Here is the hard part of the business. A builder has to pay for cement, steel, machines and workers now, while its customer, very often a government body, pays slowly, sometimes many months after the work is done. The gap between money going out and money coming in is called working capital, and in infrastructure it is enormous. A company can be winning contracts and reporting profit while its cash is completely trapped in unpaid bills and unfinished sites.',
            example: 'A builder spends crores this month on materials and wages, then waits eight or ten months for the government to clear the bill. Multiply that across many projects and a huge amount of the company\'s cash is permanently tied up, even as the profit line looks healthy.',
          },
        ],
      },
      {
        title: 'The accounting trap you must understand',
        intro: 'This is where infrastructure companies flatter their profits, and where beginners get caught.',
        blocks: [
          {
            concept: 'Profit booked before the cash arrives',
            body: 'Because a project takes years, accounting rules let a company book part of the profit each year as the work progresses, based on how complete it estimates the project to be. This is sensible in theory, but it has a dangerous side. The company is booking profit on work it has done but often not yet been paid for. So the profit on paper can march steadily upward while the actual cash stays stuck on-site. The reported profit is partly an estimate, not money in the bank.',
            example: 'A company judges a project is 40% done and books 40% of the expected profit, even though the customer has paid for only a fraction of it. The P&L shows a healthy profit; the bank account tells a very different, emptier story.',
          },
          {
            concept: 'Always check profit against cash',
            body: 'This is why, with an infrastructure company, you can never trust the profit line on its own. You have to check whether that profit is showing up as actual cash coming in, or just piling up as unpaid bills. If reported profits keep rising but cash from the business stays weak and the unpaid bills keep swelling, something is off. In infrastructure, cash is the truth and profit is only an opinion until the customer pays.',
            example: 'Two builders report the same rising profit. One is collecting its cash and its bank balance grows. The other\'s cash keeps thinning while unpaid bills balloon. Same profit line, but only one is actually making money.',
          },
        ],
      },
      {
        title: 'Two very different "infra" businesses',
        intro: 'The word "infrastructure" hides two completely different animals with opposite economics.',
        blocks: [
          {
            concept: 'The builders (contractors)',
            body: 'One type just builds and hands over. It wins a contract, constructs the road or metro, gets paid, and moves on. These are contractors, and they earn a modest margin on a lot of activity. They should carry little debt, because they do not keep the asset, and their whole skill is winning work and executing it cleanly while managing that brutal working capital.',
            example: 'A company that builds highways for the government and hands them back is a contractor. It never owns the road; it just earns a builder\'s fee for making it.',
          },
          {
            concept: 'The owners (asset operators)',
            body: 'The other type builds or buys the asset and then keeps it, earning money from it for decades, a toll road collecting toll, a port charging ships, a power line carrying electricity. These asset owners earn fat, steady margins for years, but they swallow enormous amounts of capital up front and carry heavy long-term debt to fund it. That debt is fine as long as the asset reliably throws off cash, but it makes them a very different, more capital-heavy bet than the builders.',
            example: 'A company that owns a port and collects a charge on every container for the next thirty years is an asset owner. Very different from the contractor who merely built the port and walked away.',
          },
        ],
      },
      {
        title: 'What moves an infra stock',
        intro: 'One force towers over the rest: the government\'s wallet.',
        blocks: [
          {
            concept: 'The government capex cycle',
            body: 'Most large infrastructure work in India is ordered, directly or indirectly, by the government. So the single biggest driver of the whole sector is how much the government is choosing to spend on roads, railways, defence and power. When the annual budget pours money into building, order inflows swell across the sector and the stocks tend to run. When the government tightens its belt, or an election freezes decisions, new awards dry up and the whole sector cools together.',
            example: 'A budget that sharply raises spending on railways and highways sends fresh contracts flooding to builders, and their order books and share prices climb together. A year of election-related delays does the opposite to everyone at once.',
          },
        ],
      },
      {
        title: 'Where it breaks, and how to value it',
        intro: 'The risks are specific, and the right way to price the business follows straight from them.',
        blocks: [
          {
            concept: 'Where infra companies break',
            body: 'The failures are usually the same handful of things. Execution stalls and the order book turns into stuck, unpaid work. Working capital balloons until the company is starved of cash despite reporting profits. Or the company, especially an asset owner, borrows too heavily and cannot service the debt when a project runs late. Almost every infrastructure blow-up traces back to cash trapped in projects meeting a pile of debt that still has to be paid.',
            example: 'A builder over-borrows to chase growth, then a few large projects get delayed. The revenue is frozen in half-built sites, the interest bill keeps arriving, and a company that looked profitable is suddenly fighting to survive.',
          },
          {
            concept: 'How to actually value it',
            body: 'Because reported profit can run ahead of cash, you read an infrastructure company through a different set of windows than a normal business.',
            bullets: [
              { term: 'Order book coverage', desc: 'The size of the order book compared to yearly revenue. Two to three years of work in hand means the future is reasonably secured; much less means trouble is coming.' },
              { term: 'Working capital days', desc: 'How long the company\'s cash stays trapped between paying for work and getting paid for it. Rising working capital days is an early warning that profit is turning into unpaid bills rather than cash.' },
              { term: 'Debt against earnings', desc: 'How heavy the borrowing is relative to the profit that services it. A pure builder should carry little; an asset owner carries a lot by design, so the real test is whether the asset reliably covers the interest.' },
              { term: 'EV/EBITDA', desc: 'A price gauge that counts the debt as well as the equity, which matters enormously here, and fits the capital-heavy asset owners far better than plain PE.' },
            ],
            outro: 'Together these tell you whether the future is secured, whether the profit is real cash or just paper, and whether the debt is safe, which is exactly what a single profit multiple cannot show you in this sector.',
            example: 'A builder with three years of orders, steady working capital and low debt is a solid, visible business. One with a huge book but ballooning unpaid bills and rising debt is a warning, however fast its reported profit is growing.',
          },
        ],
      },
    ],
    metrics: [
      { metric: 'Order Book (Backlog)', why: 'The revenue pipeline locked in. 2.5-3x TTM revenue is 2-3 years of work already won, the most forward-looking metric in infra.' },
      { metric: 'Order Inflows', why: 'New business won in the quarter. YoY growth drives the next 2-3 years; decelerating inflows warn of a topline slowdown.' },
      { metric: 'Book-to-Bill Ratio', why: 'Inflows over revenue. Above 1 means the backlog is growing; below 1 means burning old orders faster than new arrive.' },
      { metric: 'Revenue Execution Rate', why: 'How fast the backlog converts to invoiced revenue. Delays trap working capital; strong execution means predictable compounding.' },
      { metric: 'EBITDA Margin', why: 'Contractors run 10-14%; asset-owners (ports, power, highways) 40-60%. Very different businesses under one infra label.' },
      { metric: 'Working Capital Days', why: 'Construction is working-capital-intensive. Long debtor days plus high inventory means cash-crunch risk; government delays compound it.' },
      { metric: 'Debt / EBITDA', why: 'Pure contractors should carry little debt; asset-owners carry long-duration project finance. Watch interest coverage.' },
      { metric: 'Government Capex Cycle', why: 'The sector direction. Budget allocations to roads, railways, defence and power set order flow. Election years can delay awards.' },
    ],
    framework: { demand: 'Order inflows', pricing: 'EBITDA margin', efficiency: 'Working capital days', capital: 'ROCE', risk: 'Debt / execution delays' },
  },
  {
    id: 'capitalmarkets',
    name: 'Capital Markets',
    icon: '📊',
    tagline: 'Volume is the business. The market cycle sets revenue, not the company.',
    examples: ['BSE', 'CDSL', 'ANGELONE', 'MOTILALOFS'],
    howItWorks:
      'Exchanges, depositories and brokers all earn a small fee every time someone trades, so their revenue rises and falls with market volumes, which they do not control. A bull market floods them with income; a bear market drains it just as fast. The best of them own a structural moat, a licensed depository like CDSL is a near-monopoly, and increasingly they diversify into recurring, fee-based income like asset management that keeps paying through the cycle. Watch revenue yield, because zero-brokerage disruption has been quietly compressing what each trade earns for years.',
    metrics: [
      { metric: 'ADTO (Avg Daily Turnover)', why: 'Total market trading volume across equity and F&O. Exchanges earn per crore traded, brokers earn commissions. Volumes fall, revenue falls immediately.' },
      { metric: 'Market Share', why: 'For exchanges, NSE dominates F&O, which is existential for BSE. For brokers, active-client share among discount and full-service players.' },
      { metric: 'Active Client Base', why: 'Clients who traded at least once in 30 days, the monetisable base. Growing actives in flat volumes means share gain.' },
      { metric: 'Revenue Yield (per crore of turnover)', why: 'A structural-decline metric. Zero-brokerage disruption compressed yields industry-wide. Watch for a floor or recovery.' },
      { metric: 'AUM (for AMC / wealth arms)', why: 'Fee-based, recurring revenue uncorrelated to daily volumes. Increasingly critical for diversified players.' },
      { metric: 'NII (Net Interest Income)', why: 'Income from client margin funds and pledged shares. Interest-rate sensitive; rising-rate cycles help brokers here.' },
      { metric: 'Regulatory & Tech Moat', why: 'CDSL and NSDL are licensed near-monopolies. The moat is structural, not replicable. Regulation is both risk and protection.' },
      { metric: 'New Product Revenue Mix', why: 'Margin funding, wealth, insurance distribution and AMC fees. Diversifying away from pure broking smooths revenue through cycles.' },
    ],
    framework: { demand: 'ADTO / market volumes', pricing: 'Revenue yield', efficiency: 'Active clients', capital: 'ROE', risk: 'Market cycle / regulatory change' },
  },
];

export function getSector(id: string): Sector | undefined {
  return SECTORS.find((s) => s.id === id);
}
