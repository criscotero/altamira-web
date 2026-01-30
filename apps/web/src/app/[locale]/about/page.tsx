import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { siteCopy } from "@/content/siteCopy";
import { buildMetadata } from "@/lib/seo/metadata";
import { isLocale, type Locale, defaultLocale } from "@/lib/i18n/locales";

const primaryCtaClass =
  "inline-flex items-center justify-center rounded-lg bg-brand-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-orange2";
const secondaryCtaClass =
  "inline-flex items-center justify-center rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-900 transition-colors hover:bg-zinc-50";

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
  const meta = siteCopy.pages.about.meta;
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${locale}${siteCopy.links.about}`,
    locale,
  });
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const copy = siteCopy.pages.about;

  const renderCta = (cta: typeof copy.mission.cta) => {
    const className = cta.variant === "primary" ? primaryCtaClass : secondaryCtaClass;
    const href = resolveHref(locale, cta.href);

    return (
      <div className="mt-6 flex flex-col gap-2">
        {isExternalHref(cta.href) ? (
          <a className={className} href={href} target="_blank" rel="noreferrer noopener">
            {cta.label}
          </a>
        ) : (
          <Link className={className} href={href}>
            {cta.label}
          </Link>
        )}
        <span className="text-xs text-zinc-500">{cta.microcopy}</span>
      </div>
    );
  };

  return (
    <>
      <section className="bg-white">
        <Container>
          <div className="py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{copy.pageLabel}</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy">
              {copy.mission.headline}
            </h1>
            <p className="mt-2 text-sm text-zinc-600">{copy.mission.subheadline}</p>
            <p className="mt-3 max-w-2xl text-sm text-zinc-600">{siteCopy.brand.shortDescription}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-700">
              {copy.mission.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(copy.mission.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{copy.origin.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{copy.origin.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-700">
              {copy.origin.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(copy.origin.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{copy.principles.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{copy.principles.subheadline}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {copy.principles.cards.map((card) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-white p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                </div>
              ))}
            </div>
            {renderCta(copy.principles.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{copy.delivery.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{copy.delivery.subheadline}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {copy.delivery.cards.map((card) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-white p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                </div>
              ))}
            </div>
            {renderCta(copy.delivery.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{copy.ownership.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{copy.ownership.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-700">
              {copy.ownership.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(copy.ownership.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{copy.founder.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{copy.founder.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-700">
              {copy.founder.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(copy.founder.cta)}
          </div>
        </Container>
      </section>
    </>
  );
}
