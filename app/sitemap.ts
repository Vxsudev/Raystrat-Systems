import type { MetadataRoute } from "next";
import { SITE_URL, INDEXABLE_ROUTES } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((route) => ({
    url: route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`,
  }));
}
