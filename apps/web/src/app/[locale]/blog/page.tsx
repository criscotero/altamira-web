import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { sanityClient } from "@/lib/sanity/client";
import { POSTS_BY_LOCALE } from "@/lib/sanity/queries";
import { isLocale, type Locale, defaultLocale } from "@/lib/i18n/locales";
import { buildMetadata } from "@/lib/seo/metadata";
import { getTranslations } from "next-intl/server";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
};

export default async function BlogIndex({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  const posts: Post[] = await sanityClient.fetch(POSTS_BY_LOCALE, { locale }).catch(() => []);

  const indexIntro = t.raw("indexIntro") as any;
  const ui = t.raw("ui") as any;
  const categories = t.raw("categories") as string[];

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-brand-navy">{t("pageTitle")}</h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600">{indexIntro.subheadline}</p>
        <div className="mt-6 rounded-xl2 border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-sm font-semibold text-brand-navy">{indexIntro.headline}</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            {indexIntro.bullets.map((item: string) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center rounded-lg bg-brand-orange px-3 py-2 text-sm font-medium text-white hover:bg-brand-orange2"
            >
              {indexIntro.cta.label}
            </Link>
            <p className="mt-2 text-xs text-zinc-600">{indexIntro.cta.microcopy}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-semibold text-brand-navy">{ui.categoriesLabel}</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600">
            {categories.map((category) => (
              <span key={category} className="rounded-full border border-zinc-200 bg-white px-3 py-1">
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          {posts.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
              {ui.emptyState}
            </div>
          ) : (
            posts.map((p) => (
              <Link
                key={p._id}
                href={`/${locale}/blog/${p.slug.current}`}
                className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6 hover:bg-white"
              >
                <div className="text-lg font-semibold">{p.title}</div>
                {p.excerpt ? <p className="mt-2 text-sm text-zinc-600">{p.excerpt}</p> : null}
              </Link>
            ))
          )}
        </div>
      </div>
    </Container>
  );
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("pages.blog.meta.title"),
    description: t("pages.blog.meta.description"),
    path: `/${locale}/blog`,
    locale,
    siteName: t("brand.name"),
  });
}
