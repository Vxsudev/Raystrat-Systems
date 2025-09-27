
import type { MetadataRoute } from 'next';
import { services, bytes } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raystrat.com';

  const mainRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${siteUrl}/bytes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];
  
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  
  const byteRoutes: MetadataRoute.Sitemap = bytes.map((byte) => ({
    url: `${siteUrl}/bytes/${byte.slug}`,
    lastModified: new Date(byte.publishedOn),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    ...mainRoutes,
    ...serviceRoutes,
    ...byteRoutes,
  ];
}
