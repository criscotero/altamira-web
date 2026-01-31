import { NextResponse } from "next/server";
import { getSiteUrl, normalizeLocale } from "@/lib/site";
import { sanityClient } from "@/lib/sanity/client";
import { POSTS_BY_LOCALE } from "@/lib/sanity/queries";

export const runtime = "nodejs";

type Post = { slug: { current: string }; _updatedAt?: string; publishedAt?: string };

function xmlEscape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export async function GET(_req: Request, ctx: { params: { locale: string } }) {
  const locale = normalizeLocale(ctx.params.locale);
  const baseUrl = getSiteUrl();

  const staticPaths = [
    `/${locale}`,
    `/${locale}/services`,
    `/${locale}/about`,
    `/${locale}/how-we-work`,
    `/${locale}/use-cases`,
    `/${locale}/work-with-us`,
    `/${locale}/contact`,
    `/${locale}/blog`,
  ];

  let posts: Post[] = [];
  try {
    posts = await sanityClient.fetch(POSTS_BY_LOCALE, { locale });
  } catch {
    posts = [];
  }

  const urls = [
    ...staticPaths.map((p) => ({ loc: `${baseUrl}${p}`, lastmod: new Date().toISOString() })),
    ...posts
      .filter((p) => p?.slug?.current)
      .map((p) => ({
        loc: `${baseUrl}/${locale}/blog/${p.slug.current}`,
        lastmod: (p._updatedAt || p.publishedAt || new Date().toISOString()),
      })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${xmlEscape(u.loc)}</loc>
    <lastmod>${xmlEscape(new Date(u.lastmod).toISOString())}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
