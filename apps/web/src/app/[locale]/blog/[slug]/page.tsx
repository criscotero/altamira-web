import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { sanityClient } from "@/lib/sanity/client";
import { POST_BY_SLUG } from "@/lib/sanity/queries";
import { isLocale, type Locale, defaultLocale } from "@/lib/i18n/locales";
import { PortableText } from "@portabletext/react";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/site";
import { siteCopy } from "@/content/siteCopy";
import { buildMetadata } from "@/lib/seo/metadata";

type Post = {
  title: string;
  excerpt?: string;
  publishedAt?: string;
  content?: any;
  translations?: { locale: string; slug?: string; title?: string }[];
};

async function fetchPost(locale: Locale, slug: string) {
  return sanityClient.fetch(POST_BY_SLUG, { locale, slug }).catch(() => null);
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const post: Post | null = await fetchPost(locale, params.slug);
  const meta = siteCopy.pages.blog.meta;

  if (!post) {
    return buildMetadata({
      title: meta.title,
      description: meta.description,
      path: `/${locale}${siteCopy.links.blog}`,
      locale,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt || meta.description,
    path: `/${locale}${siteCopy.links.blog}/${params.slug}`,
    locale,
    type: "article",
  });
}

export default async function BlogPost({ params }: { params: { locale: string; slug: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const post: Post | null = await fetchPost(locale, params.slug);
  const template = siteCopy.pages.blog.postTemplate;
  const ui = siteCopy.pages.blog.ui;

  if (!post) {
    return (
      <Container>
        <div className="py-12">
          <h1 className="text-2xl font-semibold">{ui.notFoundTitle}</h1>
          <Link className="mt-4 inline-block text-sm underline" href={`/${locale}/blog`}>
            {ui.backToBlogLabel}
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <article className="prose prose-zinc max-w-none py-12">
        <JsonLd
          data={articleJsonLd({
            headline: post.title,
            url: `${getSiteUrl()}/${locale}/blog/${params.slug}`,
            datePublished: post.publishedAt,
            description: post.excerpt,
            authorName: (post as any).author?.name,
          })}
        />

        <h1>{post.title}</h1>
        {post.excerpt ? <p className="text-zinc-600">{post.excerpt}</p> : null}

        <section className="not-prose mt-8 rounded-xl2 border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-navy">{template.hookLabel}</h2>
          <p className="mt-2 text-sm text-zinc-600">{post.excerpt || template.hookFallback}</p>
        </section>

        <section className="not-prose mt-6 rounded-xl2 border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-navy">{template.problemLabel}</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            {template.problemPoints.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="not-prose mt-6 rounded-xl2 border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-navy">{template.frameworkLabel}</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            {template.frameworkPoints.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="not-prose mt-6 rounded-xl2 border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-navy">{template.examplesLabel}</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            {template.examplePoints.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="not-prose mt-6 rounded-xl2 border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-navy">{template.checklistLabel}</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            {template.checklistPoints.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {post.translations?.length ? (
          <div className="not-prose mt-6 flex flex-wrap gap-2 text-xs">
            {post.translations.map((tr) =>
              tr.slug ? (
                <Link
                  key={`${tr.locale}-${tr.slug}`}
                  href={`/${tr.locale}/blog/${tr.slug}`}
                  className="rounded-md border border-zinc-300 px-2 py-1 hover:bg-zinc-50"
                >
                  {tr.locale.toUpperCase()}
                </Link>
              ) : null
            )}
          </div>
        ) : null}

        <div className="mt-8">
          {post.content ? <PortableText value={post.content} /> : <p>Content is empty.</p>}
        </div>

        <section className="not-prose mt-10 rounded-xl2 border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-navy">{ui.continueTitle}</h2>
          <p className="mt-2 text-sm text-zinc-600">{template.cta.microcopy}</p>
          <div className="mt-4">
            <Link
              className="inline-flex items-center rounded-lg bg-brand-orange px-3 py-2 text-sm font-medium text-white hover:bg-brand-orange2"
              href={`/${locale}${template.cta.href}`}
            >
              {template.cta.label}
            </Link>
          </div>
        </section>

        <section className="not-prose mt-6 rounded-xl2 border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-brand-navy">{ui.authorTitle}</h2>
          <p className="mt-2 text-sm text-zinc-600">{template.authorBio}</p>
        </section>
      </article>
    </Container>
  );
}
