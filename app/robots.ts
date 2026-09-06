import type { MetadataRoute } from "next";
import { SITE_URL, IS_PRODUCTION } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) {
    // Preview: crawling stays allowed so crawlers can read the noindex directive
    // served on every page (X-Robots-Tag header + page metadata). No sitemap here.
    return {
      rules: [{ userAgent: "*", allow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
