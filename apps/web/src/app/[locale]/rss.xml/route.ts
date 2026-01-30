import { NextResponse } from "next/server";
import { getSiteUrl, normalizeLocale } from "@/lib/site";
import { sanityClient } from "@/lib/sanity/client";
import { POSTS_BY_LOCALE } from "@/lib/sanity/queries";

export const runtime = "nodejs";

type Post = {
  title: string;
  excerpt?: string;
  publishedAt?: string;
  slug: { current: string };
};

function xmlEscape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export async function GET(_req: Request, ctx: { params: { locale: string } }) {
  const locale = normalizeLocale(ctx.params.locale);
  const baseUrl = getSiteUrl();

  let posts: Post[] = [];
  try {
    posts = await sanityClient.fetch(POSTS_BY_LOCALE, { locale });
  } catch {
    posts = [];
  }

  const items = posts
    .filter((p) => p?.slug?.current)
    .slice(0, 50)
    .map((p) => {
      const url = `${baseUrl}/${locale}/blog/${p.slug.current}`;
      const pubDate = p.publishedAt ? new Date(p.publishedAt).toUTCString() : new Date().toUTCString();
      const desc = p.excerpt ? xmlEscape(p.excerpt) : "";
      return `<item>
  <title>${xmlEscape(p.title)}</title>
  <link>${xmlEscape(url)}</link>
  <guid>${xmlEscape(url)}</guid>
  <pubDate>${xmlEscape(pubDate)}</pubDate>
  <description>${desc}</description>
</item>`;
    })
    .join("
");

  const channelTitle = `Altamira Tech Labs Blog (${locale.toUpperCase()})`;
  const channelLink = `${baseUrl}/${locale}/blog`;

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(channelTitle)}</title>
    <link>${xmlEscape(channelLink)}</link>
    <description>${xmlEscape("Articles on AI, automation, software engineering and systems.")}</description>
    <language>${xmlEscape(locale)}</language>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
