
import type { LucideIcon } from 'lucide-react';
import { BarChart, Bot, FileText, Inbox, IndianRupee, Recycle, Search, Sparkles, TrendingUp, Cpu, Banknote, Workflow, Database, MessageSquareShare, ShieldQuestion } from 'lucide-react';

export const navigationLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Results', href: '#results' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Bytes', href: '/bytes' },
  { name: 'FAQ', href: '#faq' },
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

export const services: { slug: string; title: string; subhead: string; bullets: string[]; icon: LucideIcon, pageContent: string; }[] = [
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
    pageContent: `<h3>Overview</h3><p>Every pipeline starts with signals. Most businesses wait until demand reaches them—by then, it’s already diluted. The Leads Hunter Agent inverts that. It continuously scans the web for buying intent, filters out noise, and delivers only prospects who are ready to move.</p><p>This isn’t a “list.” It’s a living feed. Every record is fresh, scored, and actionable.</p><h3>The Problem It Solves</h3><ul><li>Static lists go stale.</li><li>Paid ads burn budget on weak clicks.</li><li>Generic scraping floods you with noise.</li><li>Without an agent to detect true intent, businesses either overspend or operate blind.</li></ul><h3>What It Delivers</h3><ul><li><strong>High-Intent Leads Only:</strong> Every record passes urgency, fit, and contactability checks.</li><li><strong>Freshness by Design:</strong> Signals are captured and delivered within hours, not weeks.</li><li><strong>Clarity at a Glance:</strong> Each lead is scored, summarized, and stripped of dead ends.</li></ul><h3>Why It Works</h3><p>Because demand is always visible if you know where to look. The Leads Hunter Agent continuously maps digital footprints—search queries, posts, mentions, requests—and applies strict qualification gates. What gets through isn’t “noise with potential.” It’s demand with direction.</p><h3>Outcome for the Client</h3><ul><li>A pipeline that never runs dry.</li><li>Reduced cost-per-lead, since only qualified intent is delivered.</li><li>Sales teams that focus only on prospects who are already leaning forward.</li></ul><h3>Field Principle</h3><blockquote>Leads aren’t found—they’re detected. The businesses that win are the ones who see demand first.</blockquote>`
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
    pageContent: `<h3>Overview</h3><p>Leads are worthless if they aren’t followed. Most businesses make first contact and then stop — schedules slip, salespeople get busy, and opportunities decay. The Follow-Up Agent removes that weakness.</p><p>It runs disciplined sequences across email, SMS, and WhatsApp — pursuing every prospect until they respond, book, or disqualify. No gaps, no excuses.</p><h3>The Problem It Solves</h3><ul><li>Sales teams forget or delay follow-up.</li><li>Manual pursuit is inconsistent and unscalable.</li><li>Prospects slip through cracks while competitors respond faster.</li><li>Without a systemized agent to relentlessly pursue, pipeline value leaks.</li></ul><h3>What It Delivers</h3><ul><li><strong>Zero Missed Leads:</strong> Every prospect is followed until outcome.</li><li><strong>Multi-Channel Coverage:</strong> Outreach runs where the customer actually is.</li><li><strong>Booked Meetings, Not Just Messages:</strong> Direct integration with calendars.</li></ul><h3>Why It Works</h3><p>Because speed and persistence win deals. The Follow-Up Agent eliminates human lapse, applies uniform pressure, and ensures the business is always first in line. Prospects don’t fall dormant; they either book or exit cleanly.</p><h3>Outcome for the Client</h3><ul><li>Higher conversion rate from the same leads.</li><li>Faster deal cycles due to immediate response.</li><li>A predictable flow of booked calls for the sales team.</li></ul><h3>Field Principle</h3><blockquote>The fortune is not just in the follow-up — it’s in the follow-through.<br>Businesses that close are those that never let go until resolution.</blockquote>`
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
    pageContent: `<h3>Overview</h3><p>Customers expect instant answers. Most businesses fail here — tickets pile up, response times stretch, and trust erodes. The Support Agent fixes this at the root.</p><p>It handles first-line support automatically: resolving common issues, routing exceptions, and logging every interaction against service levels. Always available. Always consistent.</p><h3>The Problem It Solves</h3><ul><li>Slow or inconsistent responses frustrate customers.</li><li>Human agents get overloaded with repetitive questions.</li><li>Escalations lack context, wasting more time.</li><li>Without a dependable agent, customer service becomes a cost center instead of a retention engine.</li></ul><h3>What It Delivers</h3><ul><li><strong>Instant Resolutions:</strong> FAQs and routine requests closed without delay.</li><li><strong>Smart Escalation:</strong> Complex cases routed with context, not noise.</li><li><strong>SLA Visibility:</strong> Every ticket logged and measured against service targets.</li></ul><h3>Why It Works</h3><p>Because 70% of customer queries are repetitive. The Support Agent clears that backlog automatically, giving human staff space to focus only where judgment is required. Customers get speed, and businesses keep control.</p><h3>Outcome for the Client</h3><ul><li>Higher retention through faster, more reliable support.</li><li>Reduced support costs by automating repetitive load.</li><li>Clear accountability with full SLA tracking.</li></ul><h3>Field Principle</h3><blockquote>Retention is defense. Defense wins wars.<br>The businesses that hold customers longest are the ones that answer fastest.</blockquote>`
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
    pageContent: 'This is the detailed page content for the Operations Agent. Detail the types of workflows it can automate, from finance to project management, ensuring nothing slips through the cracks and providing perfect operational visibility.'
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
    pageContent: 'This is the detailed page content for the Data Command Agent. Showcase how it connects disparate data sources into a single, cohesive dashboard, giving leaders a real-time, actionable view of the entire business.'
  },
  {
    slug: 'custom-ai-agent',
    title: 'Custom AI Agent',
    subhead: 'Your specific bottleneck, solved.',
    bullets: [
      'Eliminate your team’s #1 bottleneck with purpose-built automation.',
      'Automate complex, repetitive workflows no off-the-shelf tool can touch.',
      'Capture hidden ROI by automating the tasks you think “can’t be automated”.'
    ],
    icon: Cpu,
    pageContent: 'This is the detailed page content for Custom AI Agent. This is where you explain your process for identifying, scoping, and building bespoke automations that solve unique and challenging business problems.'
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

    
