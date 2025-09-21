
import type { LucideIcon } from 'lucide-react';
import { BarChart, Bot, FileText, Inbox, IndianRupee, Recycle, Search, Sparkles, TrendingUp, Cpu, Banknote, Workflow, Database, MessageSquareShare, ShieldQuestion } from 'lucide-react';

export const navigationLinks = [
  { name: 'Services', href: '/#services' },
  { name: 'Results', href: '/#results' },
  { name: 'Bytes', href: '/bytes' },
  { name: 'FAQ', href: '/#faq' },
];

export const marqueeStats = [
  "Systems that collect, convert, and deliver.",
  "No missed invoices.",
  "Inbox discipline on autopilot.",
  "Scale without compliance fear.",
  "Revenue reclaimed from leaks.",
  "Search-intent leads only.",
  "Content treadmill destroyed.",
  "Accuracy that holds under load.",
  "Cash flow discipline, automated.",
  "12 hrs/week reclaimed per operator.",
  "3.2× reply rate lift.",
  "42% faster invoice cycles.",
];

export const services: { slug: string; title: string; subhead: string; bullets: string[]; icon: LucideIcon, pageContent: string; iconClassName?: string }[] = [
  {
    slug: 'leads-hunter-agent',
    title: 'Leads Hunter Agent',
    subhead: 'Continuous capture of high-intent demand.',
    bullets: [
      'Scans the web for live buying signals.',
      'Scores urgency, budget, and fit automatically.',
      'Streams qualified leads into your pipeline in real time.'
    ],
    icon: Search,
    pageContent: `<h3>Overview</h3><p>Every pipeline starts with signals. Most businesses wait until demand reaches them—by then, it’s already diluted. The Leads Hunter Agent inverts that. It continuously scans the web for buying intent, filters out noise, and delivers only prospects who are ready to move.</p><p>This isn’t a “list.” It’s a living feed. Every record is fresh, scored, and actionable.</p><h3>The Problem It Solves</h3><ul><li>Static lists go stale.</li><li>Paid ads burn budget on weak clicks.</li><li>Generic scraping floods you with noise.</li><li>Without an agent to detect true intent, businesses either overspend or operate blind.</li></ul><h3>What It Delivers</h3><ul><li><strong>High-Intent Leads Only &rarr;</strong> Every record passes urgency, fit, and contactability checks.</li><li><strong>Freshness by Design &rarr;</strong> Signals are captured and delivered within hours, not weeks.</li><li><strong>Clarity at a Glance &rarr;</strong> Each lead is scored, summarized, and stripped of dead ends.</li></ul><h3>Why It Works</h3><p>Because demand is always visible if you know where to look. The Leads Hunter Agent continuously maps digital footprints—search queries, posts, mentions, requests—and applies strict qualification gates. What gets through isn’t “noise with potential.” It’s demand with direction.</p><h3>Outcome for the Client</h3><ul><li>A pipeline that never runs dry.</li><li>Reduced cost-per-lead, since only qualified intent is delivered.</li><li>Sales teams that focus only on prospects who are already leaning forward.</li></ul><h3>Field Principle</h3><blockquote>Leads aren’t found—they’re detected.<br>The businesses that win are the ones who see demand first.</blockquote>`
  },
  {
    slug: 'follow-up-agent',
    title: 'Follow-Up Agent',
    subhead: 'Every lead pursued until closed.',
    bullets: [
      'Runs multi-channel sequences across email, SMS, and WhatsApp.',
      'Books meetings directly into your calendar.',
      'Tracks engagement and conversion with zero manual effort.'
    ],
    icon: MessageSquareShare,
    pageContent: `<h3>Overview</h3><p>Leads are worthless if they aren’t followed. Most businesses make first contact and then stop — schedules slip, salespeople get busy, and opportunities decay. The Follow-Up Agent removes that weakness.</p><p>It runs disciplined sequences across email, SMS, and WhatsApp — pursuing every prospect until they respond, book, or disqualify. No gaps, no excuses.</p><h3>The Problem It Solves</h3><ul><li>Sales teams forget or delay follow-up.</li><li>Manual pursuit is inconsistent and unscalable.</li><li>Prospects slip through cracks while competitors respond faster.</li><li>Without a systemized agent to relentlessly pursue, pipeline value leaks.</li></ul><h3>What It Delivers</h3><ul><li><strong>Zero Missed Leads &rarr;</strong> Every prospect is followed until outcome.</li><li><strong>Multi-Channel Coverage &rarr;</strong> Outreach runs where the customer actually is.</li><li><strong>Booked Meetings, Not Just Messages &rarr;</strong> Direct integration with calendars.</li></ul><h3>Why It Works</h3><p>Because speed and persistence win deals. The Follow-Up Agent eliminates human lapse, applies uniform pressure, and ensures the business is always first in line. Prospects don’t fall dormant; they either book or exit cleanly.</p><h3>Outcome for the Client</h3><ul><li>Higher conversion rate from the same leads.</li><li>Faster deal cycles due to immediate response.</li><li>A predictable flow of booked calls for the sales team.</li></ul><h3>Field Principle</h3><blockquote>The fortune is not just in the follow-up — it’s in the follow-through.<br>Businesses that close are those that never let go until resolution.</blockquote>`
  },
  {
    slug: 'support-agent',
    title: 'Support Agent',
    subhead: 'Frontline support, always on.',
    bullets: [
      'Resolves FAQs and common tickets instantly.',
      'Escalates exceptions with full context to your team.',
      'Logs SLA compliance and customer satisfaction automatically.'
    ],
    icon: ShieldQuestion,
    pageContent: `<h3>Overview</h3><p>Customers expect instant answers. Most businesses fail here — tickets pile up, response times stretch, and trust erodes. The Support Agent fixes this at the root.</p><p>It handles first-line support automatically: resolving common issues, routing exceptions, and logging every interaction against service levels. Always available. Always consistent.</p><h3>The Problem It Solves</h3><ul><li>Slow or inconsistent responses frustrate customers.</li><li>Human agents get overloaded with repetitive questions.</li><li>Escalations lack context, wasting more time.</li><li>Without a dependable agent, customer service becomes a cost center instead of a retention engine.</li></ul><h3>What It Delivers</h3><ul><li><strong>Instant Resolutions &rarr;</strong> FAQs and routine requests closed without delay.</li><li><strong>Smart Escalation &rarr;</strong> Complex cases routed with context, not noise.</li><li><strong>SLA Visibility &rarr;</strong> Every ticket logged and measured against service targets.</li></ul><h3>Why It Works</h3><p>Because 70% of customer queries are repetitive. The Support Agent clears that backlog automatically, giving human staff space to focus only where judgment is required. Customers get speed, and businesses keep control.</p><h3>Outcome for the Client</h3><ul><li>Higher retention through faster, more reliable support.</li><li>Reduced support costs by automating repetitive load.</li><li>Clear accountability with full SLA tracking.</li></ul><h3>Field Principle</h3><blockquote>Retention is defense. Defense wins wars.<br>The businesses that hold customers longest are the ones that answer fastest.</blockquote>`
  },
  {
    slug: 'operations-agent',
    title: 'Operations Agent',
    subhead: 'Your execution backbone, on rails.',
    bullets: [
      'Automates routine workflows: invoicing, notifications, task assignments.',
      'Orchestrates cross-team processes with precision.',
      'Provides audit trails for every task executed.'
    ],
    icon: Workflow,
    pageContent: `<h3>Overview</h3><p>Every business runs on hundreds of small, repetitive tasks — invoices, notifications, assignments, updates. Humans make mistakes. Processes stall. The Operations Agent turns all of that into a disciplined, automated flow.</p><p>It executes routine work with precision, consistency, and full traceability. No task forgotten. No step skipped.</p><h3>The Problem It Solves</h3><ul><li>Manual repetition drains hours and introduces errors.</li><li>Processes break when they depend on memory or busy staff.</li><li>Lack of visibility into task execution creates bottlenecks.</li><li>Without an agent running the backbone, operations collapse under their own weight.</li></ul><h3>What It Delivers</h3><ul><li><strong>Automated Workflows &rarr;</strong> From invoicing to task routing, everything runs on rails.</li><li><strong>Orchestration Across Teams &rarr;</strong> Handoffs happen without friction or loss.</li><li><strong>Audit Trails &rarr;</strong> Every action logged, every failure visible.</li></ul><h3>Why It Works</h3><p>Because consistency is the core of execution. The Operations Agent standardizes routine processes and eliminates human error from the chain. What used to be ad-hoc becomes a predictable system that never breaks stride.</p><h3>Outcome for the Client</h3><ul><li>More work done with fewer resources.</li><li>Reduced error rates across operations.</li><li>Freed human attention for high-value decisions, not repetitive steps.</li></ul><h3>Field Principle</h3><blockquote>Discipline scales. Memory does not.<br>The businesses that win are those that systemize execution before they scale.</blockquote>`
  },
  {
    slug: 'data-command-agent',
    title: 'Data Command Agent',
    subhead: 'One source of truth for performance.',
    bullets: [
      'Centralizes KPIs across leads, sales, ops, and support.',
      'Provides real-time dashboards and predictive trendlines.',
      'Enables instant exports and decision-ready reporting.'
    ],
    icon: Database,
    pageContent: `<h3>Overview</h3><p>Leaders make decisions every day. Without data, those decisions are guesses. The Data Command Agent centralizes the numbers that matter — leads, sales, support, operations — into a single, reliable view.</p><p>It doesn’t just report the past. It shows trends, forecasts, and emerging risks so leaders act with confidence, not speculation.</p><h3>The Problem It Solves</h3><ul><li>Data is scattered across tools and departments.</li><li>Reports arrive late, incomplete, or manipulated.</li><li>Leaders operate without visibility into real performance.</li><li>Without an agent controlling the data flow, the business runs blind.</li></ul><h3>What It Delivers</h3><ul><li><strong>Unified Dashboards &rarr;</strong> All KPIs in one place, updated in real time.</li><li><strong>Predictive Insights &rarr;</strong> Trendlines that reveal what’s coming, not just what’s past.</li><li><strong>Instant Exports &rarr;</strong> Clean data available for reporting and compliance.</li></ul><h3>Why It Works</h3><p>Because decision-making depends on visibility. The Data Command Agent ensures every action is grounded in verified numbers, not gut feel. When the data is clean and current, leadership can steer with precision.</p><h3>Outcome for the Client</h3><ul><li>Faster, more accurate business decisions.</li><li>Reduced risk from acting on outdated or siloed data.</li><li>A culture that runs on truth, not guesswork.</li></ul><h3>Field Principle</h3><blockquote>Command requires visibility. Without it, you’re not leading — you’re gambling.</blockquote>`
  },
  {
    slug: 'custom-ai-agent',
    title: 'Custom AI Agent',
    subhead: 'Your bottleneck, eliminated. Your edge, protected.',
    bullets: [
        'Curated with you — built alongside your team to eliminate the bottleneck no tool can handle.',
        'Optional SLA lock-in — by subscription, your solution is protected and withheld from rivals.',
        'Permanent leverage — once deployed, it becomes hardened infrastructure inside your business.'
    ],
    icon: Cpu,
    iconClassName: 'text-green-500',
    pageContent: `
      <h3>Built for the problem only you face</h3>
      <ul>
        <li><strong>Curated with you</strong> — engineered with your team to remove the bottleneck no tool can touch.</li>
        <li><strong>Optional SLA lock-in</strong> — by subscription, your build is contract-protected and withheld from rivals.</li>
        <li><strong>Permanent leverage</strong> — once deployed, the Agent becomes hardened infrastructure inside your business.</li>
      </ul>

      <h3>Exclusive SLA (Optional)</h3>
      <p>Contract-lock the build to your business. Direct competitors cannot license the same Agent while your subscription is active.</p>
      <ul>
        <li>Competitor blackout in your market segment</li>
        <li>Priority maintenance & change windows</li>
        <li>Availability targets aligned to your risk profile</li>
      </ul>

      <h3>What Sets It Apart</h3>
      <ul>
        <li><strong>Bespoke scope</strong> — starts with a precision audit of workflows and failure points.</li>
        <li><strong>Hard impact mapping</strong> — tied to clear metrics: revenue unlocked, hours reclaimed, risk reduced.</li>
        <li><strong>Infrastructure, not software</strong> — deployed as a system designed to run indefinitely.</li>
        <li><strong>Strategic exclusivity</strong> — with SLA, your Agent becomes proprietary leverage competitors can’t replicate.</li>
      </ul>

      <h3>Why Clients Use It</h3>
      <ul>
        <li>Regulated industries where off-the-shelf breaks.</li>
        <li>Complex cross-team workflows needing precision.</li>
        <li>Hidden ROI in “can’t be automated” tasks.</li>
        <li>Competitive edge written into contracts.</li>
      </ul>

      <h3>Bottom Line</h3>
      <p>The Custom AI Agent eliminates the one constraint only your business faces. Co-engineered with you, optionally locked under SLA, and deployed as permanent infrastructure. This isn’t customization. It’s your moat.</p>
    `
  },
];

export const results = {
  stats: [
    {
      value: '2–5×',
      label: 'Reply Rate Uplift',
      caption: 'Automation multiplies reply rates 2–5× above baseline',
      icon: TrendingUp,
    },
    {
      value: '+10–25%',
      label: 'Invoice collections speed',
      caption: 'Optimized reminder flows increase recovery speed.',
      icon: IndianRupee,
    },
    {
      value: '30–60',
      label: 'Content velocity',
      caption: 'One recording → multi-platform content via system automation.',
      icon: BarChart,
    },
    {
      value: '~56',
      label: 'Hours saved (monthly)',
      caption: 'AI tools save 13 hrs/week (~56 hrs/month) on average',
      icon: Sparkles,
    },
  ],
};

export const pricing = {
  tiers: [
    {
      name: 'Starter',
      price: '₹20,099',
      period: '/month',
      description: 'For teams testing the waters of automation.',
      features: [
        '1 Active Automation',
        'Up to 500 actions/mo',
        'Email & Chat Support',
        'Standard Onboarding',
      ],
      cta: 'Book 15-min Audit',
      popular: false,
    },
    {
      name: 'Core',
      price: '₹49,099',
      period: '/month',
      description: 'For businesses ready to scale their core operations.',
      features: [
        '3 Active Automations',
        'Up to 2,000 actions/mo',
        'Priority Support',
        'Dedicated Account Manager',
        'Monthly Strategy Call',
      ],
      cta: 'Book 15-min Audit',
      popular: true,
    },
    {
      name: 'Scale',
      price: 'Custom',
      period: '',
      description: 'For enterprises seeking transformative efficiency.',
      features: [
        'Unlimited Automations',
        'Unlimited actions',
        '24/7/365 Support',
        'Custom Integrations',
        'On-site workshops',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ],
};

export const faq = {
  items: [
    {
      question: 'What kind of ROI can we expect?',
      answer:
        "While results vary, clients typically see ROI within the first 1-4 weeks. This comes from recovered revenue (e.g., invoice collection), increased lead generation, and significant time savings for your team, allowing them to focus on high-value tasks.",
    },
    {
      question: 'How long does it take to implement an automation?',
      answer:
        "Standard automations like our core services can be deployed within 2-4 weeks. Custom solutions may take longer, depending on the complexity and integration requirements. We prioritize a swift, seamless transition.",
    },
    {
      question: 'Is this secure? How do you handle our data?',
      answer:
        "Security is paramount. We operate on enterprise-grade infrastructure (Google Cloud & Firebase) with strict IAM controls, data encryption in transit and at rest, and enforced App Check verification. We only require the minimum necessary permissions to operate and adhere to strict data privacy policies.",
    },
    {
      question: 'What if we need an automation not listed in our services?',
      answer:
        "Our five core services address the most common business bottlenecks. However, we specialize in creating custom AI automations tailored to unique workflows. Book an audit to discuss your specific needs with our engineering team.",
    },
    {
      question: 'What are the technology prerequisites for our company?',
      answer:
        "Most of our automations integrate with existing tools you already use (e.g., email, CRM, project management software). The primary prerequisite is a willingness to identify and streamline repetitive processes. We handle the technical heavy lifting.",
    },
    {
      question: 'How do you measure success and report on it?',
      answer:
        "We establish key performance indicators (KPIs) at the start of every engagement. This could be hours saved, leads generated, invoices paid faster, or content output. You'll receive a monthly report detailing the performance and ROI of your automations.",
    },
  ],
};

export const bytes = [
  {
    slug: 'byte-01-the-real-cost-of-manual-follow-up',
    title: 'The Real Cost of Manual Follow-Up',
    summary: 'Every hour spent chasing an invoice is an hour not spent on billable work. We quantify the hidden operational drag of manual accounts receivable and show how automation reclaims that value.',
    content: 'The content for Byte-01 goes here.',
  },
  {
    slug: 'byte-02-repurposing-content-isnt-optional',
    title: 'Repurposing Content Isn’t Optional, It’s Asymmetric ROI',
    summary: 'Content creation is expensive. Not repurposing it is leaving 90% of its value on the table. This byte breaks down the tactical model for turning a single recording into a 30-day content pipeline.',
    content: 'The content for Byte-02 goes here.',
  },
  {
    slug: 'byte-03-inbox-zero-is-a-system-not-a-skill',
    title: 'Inbox Zero is a System, Not a Skill',
    summary: 'An overflowing inbox isn’t a personal failing, it’s a systems failure. We show how a "Smart Inbox" automation acts as a force multiplier for executive focus, filtering signal from noise.',
    content: 'The content for Byte-03 goes here.',
  },
  {
    slug: 'byte-04-why-your-best-leads-are-boring',
    title: 'Why Your Best Leads Are “Boring”',
    summary: 'High-excitement leads often churn. The most profitable clients come from methodical, intent-driven prospecting. We’ll show you how to find them.',
    content: 'The content for Byte-04 goes here.',
  },
];

export const industries = [
    "Technology / SaaS",
    "E-commerce / Retail",
    "Healthcare",
    "Financial Services",
    "Real Estate",
    "Professional Services (e.g., Agency, Consulting)",
    "Education",
    "Manufacturing",
    "Media / Entertainment",
    "Non-Profit",
    "Other"
];

    
