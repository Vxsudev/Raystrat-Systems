import type { LucideIcon } from 'lucide-react';
import { BarChart, Bot, FileText, Inbox, IndianRupee, Recycle, Search, Sparkles, TrendingUp, Cpu, Banknote } from 'lucide-react';

export const navigationLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Results', href: '#results' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

export const marqueeStats = [
  'reply-rate +15%',
  'content 60 posts/mo',
  'invoices 20% faster',
  '6–12 hrs saved/wk',
];

export const services: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Search-Intent Lead Scraper',
    description: 'Prospect where deals are forming. Scrape live hiring pages for buying signals. Deliver enriched leads straight to your CRM.',
    icon: Search,
  },
  {
    title: 'Repurposing Engine',
    description: 'One recording → 30 days of content. Auto-clip, caption, and brand your Ads/videos/podcasts. Calendarized posts for LinkedIn, IG, YouTube.',
    icon: Recycle,
  },
  {
    title: 'Invoice Collector',
    description: 'Stop chasing late payers. Automated reminders with intent-aware wording. Stripe/Xero/QuickBooks.. integration for dunning.',
    icon: Banknote,
  },
  {
    title: 'Long-form Generator',
    description: 'Publish authority on schedule. Automate content research → outline → SEO-ready draft. Bi-weekly or monthly pillar posts prepped and delivered.',
    icon: FileText,
  },
  {
    title: 'Smart Inbox Categorizer',
    description: 'Inbox zero, automated. AI-powered rules that triage, prioritize, and label incoming emails. Deliverables: structured queues, SLA routing, and follow-up triggers ready-to-use.',
    icon: Inbox,
  },
  {
    title: 'Custom AI Automation',
    description: 'Your specific bottleneck, solved',
    icon: Cpu,
  },
];

export const results = {
  stats: [
    {
      value: '2–5×',
      label: 'Reply Rate Uplift',
      icon: TrendingUp,
    },
    {
      value: '+10–25%',
      label: 'Invoice Collections Speed',
      icon: IndianRupee,
    },
    {
      value: '30–60',
      label: 'Content Velocity (Posts/Mo)',
      icon: BarChart,
    },
    {
      value: '~40',
      label: 'Hours Saved (Monthly)',
      icon: Sparkles,
    },
  ],
};

export const pricing = {
  tiers: [
    {
      name: 'Starter',
      price: '₹40,000',
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
      price: '₹1,20,000',
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
        "While results vary, clients typically see ROI within the first 3-6 months. This comes from recovered revenue (e.g., invoice collection), increased lead generation, and significant time savings for your team, allowing them to focus on high-value tasks.",
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
