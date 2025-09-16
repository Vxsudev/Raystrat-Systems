
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
    slug: 'lead-signal-system',
    title: 'Lead Signal System',
    subhead: 'Continuous capture of high-intent demand.',
    bullets: [
      'Scans the web for live buying signals.',
      'Scores urgency, budget, and fit automatically.',
      'Streams qualified leads into your pipeline in real time.'
    ],
    icon: Search,
    pageContent: `### Overview

Every pipeline starts with signals. Most businesses wait until demand reaches them—by then, it’s already diluted. The Lead Signal System inverts that. It continuously scans the web for buying intent, filters out noise, and delivers only prospects who are ready to move. This isn’t a “list.” It’s a living feed. Every record is fresh, scored, and actionable.

### The Problem It Solves

Static lists go stale. Paid ads burn budget on weak clicks. Generic scraping floods you with noise. Without a system to detect true intent, businesses either overspend or operate blind.

### What It Delivers

- **High-Intent Leads Only:** Every record passes urgency, fit, and contactability checks.
- **Freshness by Design:** Signals are captured and delivered within hours, not weeks.
- **Clarity at a Glance:** Each lead is scored, summarized, and stripped of dead ends.

### Why It Works

Because demand is always visible if you know where to look. The Lead Signal System continuously maps digital footprints—search queries, posts, mentions, requests—and applies strict qualification gates. What gets through isn’t “noise with potential.” It’s demand with direction.

### Outcome for the Client

A pipeline that never runs dry. Reduced cost-per-lead, since only qualified intent is delivered. Sales teams that focus only on prospects who are already leaning forward.

### Field Principle

> Leads aren’t found—they’re detected. The businesses that win are the ones who see demand first.`
  },
  {
    slug: 'follow-up-automation-system',
    title: 'Follow-Up Automation System',
    subhead: 'Every lead pursued until closed.',
    bullets: [
      'Runs multi-channel sequences across email, SMS, and WhatsApp.',
      'Books meetings directly into your calendar.',
      'Tracks engagement and conversion with zero manual effort.'
    ],
    icon: MessageSquareShare,
    pageContent: 'This is the detailed page content for the Follow-Up Automation System. Describe the power of multi-channel sequencing and how the system intelligently nurtures leads, handling objections and booking meetings autonomously.'
  },
  {
    slug: 'support-automation-system',
    title: 'Support Automation System',
    subhead: 'Frontline support, always on.',
    bullets: [
      'Resolves FAQs and common tickets instantly.',
      'Escalates exceptions with full context to your team.',
      'Logs SLA compliance and customer satisfaction automatically.'
    ],
    icon: ShieldQuestion,
    pageContent: 'This is the detailed page content for the Support Automation System. Explain how it improves customer satisfaction by providing instant answers while freeing up human agents to handle complex, high-value interactions.'
  },
  {
    slug: 'operations-automation-system',
    title: 'Operations Automation System',
    subhead: 'Your execution backbone, on rails.',
    bullets: [
      'Automates routine workflows: invoicing, notifications, task assignments.',
      'Orchestrates cross-team processes with precision.',
      'Provides audit trails for every task executed.'
    ],
    icon: Workflow,
    pageContent: 'This is the detailed page content for the Operations Automation System. Detail the types of workflows it can automate, from finance to project management, ensuring nothing slips through the cracks and providing perfect operational visibility.'
  },
  {
    slug: 'data-command-system',
    title: 'Data Command System',
    subhead: 'One source of truth for performance.',
    bullets: [
      'Centralizes KPIs across leads, sales, ops, and support.',
      'Provides real-time dashboards and predictive trendlines.',
      'Enables instant exports and decision-ready reporting.'
    ],
    icon: Database,
    pageContent: 'This is the detailed page content for the Data Command System. Showcase how it connects disparate data sources into a single, cohesive dashboard, giving leaders a real-time, actionable view of the entire business.'
  },
  {
    slug: 'custom-ai-automation',
    title: 'Custom AI Automation',
    subhead: 'Your specific bottleneck, solved.',
    bullets: [
      'Eliminate your team’s #1 bottleneck with purpose-built automation.',
      'Automate complex, repetitive workflows no off-the-shelf tool can touch.',
      'Capture hidden ROI by automating the tasks you think “can’t be automated”.'
    ],
    icon: Cpu,
    pageContent: 'This is the detailed page content for Custom AI Automation. This is where you explain your process for identifying, scoping, and building bespoke automations that solve unique and challenging business problems.'
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
      question: 'What if we need an automation not listed in your services?',
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
