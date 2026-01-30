import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { sanityClient } from "@/lib/sanity/client";
import { POSTS_BY_LOCALE } from "@/lib/sanity/queries";
import { isLocale, type Locale, defaultLocale } from "@/lib/i18n/locales";
import { siteCopy } from "@/content/siteCopy";
import { buildMetadata } from "@/lib/seo/metadata";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
};

export default async function BlogIndex({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const copy = siteCopy.pages.blog;
  const posts: Post[] = await sanityClient.fetch(POSTS_BY_LOCALE, { locale }).catch(() => []);

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-brand-navy">{copy.pageTitle}</h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600">{copy.indexIntro.subheadline}</p>
        <div className="mt-6 rounded-xl2 border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-navy">{copy.indexIntro.headline}</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            {copy.indexIntro.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href={`/${locale}${siteCopy.links.contact}`}
              className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 hover:bg-zinc-50"
            >
              {copy.indexIntro.cta.label}
            </Link>
            <p className="mt-2 text-xs text-zinc-500">{copy.indexIntro.cta.microcopy}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-semibold text-brand-navy">{copy.ui.categoriesLabel}</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600">
            {copy.categories.map((category) => (
              <span key={category} className="rounded-full border border-zinc-200 bg-white px-3 py-1">
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          {posts.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
              {copy.ui.emptyState}
            </div>
          ) : (
            posts.map((p) => (
              <Link
                key={p._id}
                href={`/${locale}/blog/${p.slug.current}`}
                className="rounded-xl2 border border-zinc-200 bg-white p-6 hover:bg-zinc-50"
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
  const meta = siteCopy.pages.blog.meta;
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${locale}${siteCopy.links.blog}`,
    locale,
  });
}
