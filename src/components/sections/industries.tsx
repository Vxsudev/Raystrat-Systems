// src/components/sections/industries.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  BedDouble,
  ShoppingCart,
  Landmark,
  HeartPulse,
  Scale,
  Check
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const industryData: {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}[] = [
  {
    title: 'Education & e-Learning',
    description: 'Our AI automation agency facilitates scalable, data-driven educations in both traditional and digital classrooms.',
    features: [
      'Automated grading and feedback tool',
      'Personalized lesson plans',
      'AI teaching assistants & chatbots',
      'Student engagement tracking',
    ],
    icon: BookOpen,
  },
  {
    title: 'Hotels & Restaurants',
    description: 'Our AI automation agency partners with hoteliers to simplify room reservations, inventory tracking and admin work.',
    features: [
      'AI-driven booking & reservation systems',
      'Smart room allocation',
      'Automated service feedback collection',
      'Supply chain management',
    ],
    icon: BedDouble,
  },
  {
    title: 'Retail & eCommerce',
    description: 'Automate store operations, retail pricing, and order fulfillment with our custom AI automation solutions.',
    features: [
      'AI product recommendations',
      'Automated order processing',
      'Chatbots for customer queries',
      'Demand forecasting & stock optimization',
    ],
    icon: ShoppingCart,
  },
  {
    title: 'Fintech & Banking',
    description: 'Create faster, smarter, and more secure financial operations with our AI automation services.',
    features: [
      'Automated loan/credit approval workflows',
      'Fraud detection & anomaly alerts',
      'Customer onboarding & KYC automation',
      'Chatbots for 24/7 customer support',
    ],
    icon: Landmark,
  },
  {
    title: 'Medical & Healthcare',
    description: 'Our AI automation agency helps healthcare providers to enhance patient outcomes and reduce administrative workload.',
    features: [
      'Automated clinical documentation',
      'AI-driven appointment scheduling',
      'Medical symptoms checking bots',
      'Patient support chatbots',
    ],
    icon: HeartPulse,
  },
  {
    title: 'Legal Research',
    description: 'Streamline legal processes and improve access to justice with our AI-powered automation solutions.',
    features: [
      'Automated case analysis',
      'Legal document summarization',
      'E-discovery and document sorting',
      'Chatbots for legal help/form generation',
    ],
    icon: Scale,
  },
];

export function Industries() {
  return (
    <section id="industries">
      <div className="container">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary font-headline">
            Get Industry-Centric Solutions With
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
            Our AI Automation Agency
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industryData.map((industry) => (
            <Card
              key={industry.title}
              className="flex flex-col bg-card/50"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                   <div className="p-3 rounded-md bg-primary/10">
                    <industry.icon className="w-6 h-6 text-primary" />
                   </div>
                  <CardTitle className="text-xl font-bold font-headline">{industry.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="mb-4 text-foreground/80">{industry.description}</p>
                <ul className="space-y-3">
                  {industry.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 mr-3 text-primary shrink-0 mt-1" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}