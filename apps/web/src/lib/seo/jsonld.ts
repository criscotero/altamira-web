import { getSiteUrl } from "@/lib/site";

export function organizationJsonLd(name: string) {
  const baseUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: baseUrl,
    sameAs: [],
  };
}

export function articleJsonLd(args: {
  headline: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  description?: string;
  authorName?: string;
  imageUrl?: string;
  publisherName: string;
}) {
  const baseUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    mainEntityOfPage: args.url,
    datePublished: args.datePublished,
    dateModified: args.dateModified || args.datePublished,
    description: args.description,
    author: args.authorName ? { "@type": "Person", name: args.authorName } : undefined,
    publisher: {
      "@type": "Organization",
      name: args.publisherName,
      url: baseUrl,
    },
    image: args.imageUrl ? [args.imageUrl] : undefined,
  };
}
