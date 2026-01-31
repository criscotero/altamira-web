import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/seo/metadata";
import { isLocale, type Locale, defaultLocale } from "@/lib/i18n/locales";
import { getTranslations } from "next-intl/server";

const primaryCtaClass =
  "inline-flex items-center justify-center rounded-lg bg-brand-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-orange2";
const secondaryCtaClass = primaryCtaClass;

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function resolveHref(locale: Locale, href: string) {
  if (isExternalHref(href)) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("pages.useCases.meta.title"),
    description: t("pages.useCases.meta.description"),
    path: `/${locale}/use-cases`,
    locale,
    siteName: t("brand.name"),
  });
}

export default async function UseCasesPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "pages.useCases" });

  const intro = t.raw("intro") as any;
  const byFunction = t.raw("byFunction") as any;
  const deliverables = t.raw("deliverables") as any;
  const outcomes = t.raw("outcomes") as any;

  const renderCta = (cta: any, href: string) => {
    const className = cta.variant === "primary" ? primaryCtaClass : secondaryCtaClass;
    const resolvedHref = resolveHref(locale, href);

    return (
      <div className="mt-6 flex flex-col gap-2">
        {isExternalHref(href) ? (
          <a className={className} href={resolvedHref} target="_blank" rel="noreferrer noopener">
            {cta.label}
          </a>
        ) : (
          <Link className={className} href={resolvedHref}>
            {cta.label}
          </Link>
        )}
        <span className="text-xs text-zinc-600">{cta.microcopy}</span>
      </div>
    );
  };

  return (
    <>
      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h1 className="text-3xl font-semibold tracking-tight text-brand-navy">{t("pageTitle")}</h1>
            <p className="mt-4 max-w-2xl text-sm text-zinc-600">{intro.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-600">
              {intro.bullets.map((item: string) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(intro.cta, "/contact")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{byFunction.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{byFunction.subheadline}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {byFunction.cards.map((card: any) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                  {card.bullets ? (
                    <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                      {card.bullets.map((bullet: string) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
            {renderCta(byFunction.cta, "/services")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{deliverables.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{deliverables.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-600">
              {deliverables.bullets.map((item: string) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(deliverables.cta, "/how-we-work")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{outcomes.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{outcomes.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-600">
              {outcomes.bullets.map((item: string) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(outcomes.cta, "/contact")}
          </div>
        </Container>
      </section>
    </>
  );
}
