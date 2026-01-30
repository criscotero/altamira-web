import type { MetadataRoute } from "next";
import { getSiteUrl, locales } from "@/lib/site";

// This is a sitemap index-like list (Next returns an array of URLs).
// For multi-locale, we point to each locale sitemap route.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  return locales.map((l) => ({
    url: `${baseUrl}/${l}/sitemap.xml`,
    lastModified: new Date(),
  }));
}
