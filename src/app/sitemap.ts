
import type { MetadataRoute } from 'next';
import { navigationLinks, bytes } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  // In a real app, you'd pull this from an environment variable
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  const mainRoutes: MetadataRoute.Sitemap = navigationLinks
  .filter(link => link.href.startsWith('/')) // Only include internal links
  .map((link) => ({
    url: `${siteUrl}${link.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  
  const byteRoutes: MetadataRoute.Sitemap = bytes.map((byte) => ({
    url: `${siteUrl}/bytes/${byte.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...mainRoutes,
    ...byteRoutes,
  ];
}
