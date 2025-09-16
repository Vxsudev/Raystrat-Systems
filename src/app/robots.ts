
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // In a real app, you'd pull this from an environment variable
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  return {
    rules: [
        {
            userAgent: '*',
            allow: '/',
        },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
