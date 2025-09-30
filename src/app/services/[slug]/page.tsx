

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/data/content';
import { ServicePageClient } from '@/components/ui/service-page-client';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Raystrat Systems`,
    description: service.subhead,
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }
  
  const currentIndex = services.findIndex((s) => s.slug === params.slug);
  const nextIndex = (currentIndex + 1) % services.length;
  const nextService = services[nextIndex];

  return <ServicePageClient service={service} nextService={nextService} />;
}

// This function tells Next.js which slugs to pre-render at build time.
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}
