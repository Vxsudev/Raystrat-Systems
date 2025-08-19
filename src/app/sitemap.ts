import type { MetadataRoute } from 'next';
import { navigationLinks } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  // In a real app, you'd pull this from an environment variable
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  const sections: MetadataRoute.Sitemap = navigationLinks.map((link) => ({
    url: `${siteUrl}/${link.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...sections,
  ];
}
