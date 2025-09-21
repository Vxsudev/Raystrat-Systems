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
    title: 'Fintech & Banking',
    description: 'We deploy compliance and operational agents to create faster, smarter, and more secure financial workflows.',
    features: [
      'Loan/credit approval agents',
      'Fraud detection & anomaly agents',
      'Customer onboarding & KYC agents',
      '24/7 customer support agents',
    ],
    icon: Landmark,
  },
  {
    title: 'Legal',
    description: 'We deploy paralegal agents to streamline legal processes, accelerate research, and improve case throughput.',
    features: [
      'Case analysis & precedent-finding agents',
      'Legal document summarization agents',
      'E-discovery and document sorting agents',
      'Client intake & form-generation agents',
    ],
    icon: Scale,
  },
  {
    title: 'Medical & Healthcare',
    description: 'Our agents help healthcare providers enhance patient outcomes and reduce administrative workload, freeing up practitioners.',
    features: [
      'Clinical documentation & coding agents',
      'AI-driven appointment scheduling agents',
      'Patient triage & symptom-checking agents',
      'Patient support & follow-up agents',
    ],
    icon: HeartPulse,
  },
  {
    title: 'Retail & eCommerce',
    description: 'Deploy retail agents to automate store operations, optimize pricing, and fulfill orders with machine-like discipline.',
    features: [
      'AI product recommendation agents',
      'Automated order processing agents',
      'Customer support & RMA agents',
      'Demand forecasting & stock optimization agents',
    ],
    icon: ShoppingCart,
  },
    {
    title: 'Hotels & Restaurants',
    description: 'Our agents partner with hoteliers to simplify room reservations, track inventory, and reduce administrative overhead.',
    features: [
      'AI-driven booking & reservation agents',
      'Smart room & table allocation agents',
      'Automated service feedback agents',
      'Supply chain & inventory agents',
    ],
    icon: BedDouble,
  },
  {
    title: 'Education & e-Learning',
    description: 'We deploy teaching and administrative agents to facilitate scalable, data-driven education in both traditional and digital classrooms.',
    features: [
      'Automated grading and feedback agents',
      'Personalized lesson plan agents',
      'AI teaching assistants & chatbots',
      'Student engagement tracking agents',
    ],
    icon: BookOpen,
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
