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
    title: t("pages.about.meta.title"),
    description: t("pages.about.meta.description"),
    path: `/${locale}/about`,
    locale,
    siteName: t("brand.name"),
  });
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  const brand = await getTranslations({ locale, namespace: "brand" });

  const mission = t.raw("mission") as any;
  const origin = t.raw("origin") as any;
  const principles = t.raw("principles") as any;
  const delivery = t.raw("delivery") as any;
  const ownership = t.raw("ownership") as any;
  const founder = t.raw("founder") as any;

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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">{t("pageLabel")}</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy">
              {mission.headline}
            </h1>
            <p className="mt-2 text-sm text-zinc-600">{mission.subheadline}</p>
            <p className="mt-3 max-w-2xl text-sm text-zinc-600">{brand("shortDescription")}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-600">
              {mission.bullets.map((item: string) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(mission.cta, "/services")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{origin.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{origin.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-600">
              {origin.bullets.map((item: string) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(origin.cta, "/how-we-work")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{principles.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{principles.subheadline}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {principles.cards.map((card: any) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                </div>
              ))}
            </div>
            {renderCta(principles.cta, "/use-cases")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{delivery.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{delivery.subheadline}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {delivery.cards.map((card: any) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                </div>
              ))}
            </div>
            {renderCta(delivery.cta, "/how-we-work")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{ownership.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{ownership.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-600">
              {ownership.bullets.map((item: string) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(ownership.cta, "/contact")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{founder.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{founder.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-600">
              {founder.bullets.map((item: string) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(founder.cta, "/contact")}
          </div>
        </Container>
      </section>
    </>
  );
}
