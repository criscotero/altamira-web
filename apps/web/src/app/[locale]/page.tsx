import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/seo/metadata";
import { isLocale, type Locale, defaultLocale } from "@/lib/i18n/locales";
import { getTranslations } from "next-intl/server";
import { BOOK_CALL_URL } from "@/lib/links";

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
    title: t("pages.home.meta.title"),
    description: t("pages.home.meta.description"),
    path: `/${locale}`,
    locale,
    siteName: t("brand.name"),
  });
}

export default async function Home({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "pages.home" });

  const hero = t.raw("hero") as any;
  const credibility = t.raw("credibility") as any;
  const problem = t.raw("problem") as any;
  const pillars = t.raw("pillars") as any;
  const servicesHighlights = t.raw("servicesHighlights") as any;
  const howItWorks = t.raw("howItWorks") as any;
  const useCases = t.raw("useCases") as any;
  const whyAltamira = t.raw("whyAltamira") as any;
  const faq = t.raw("faq") as any;
  const closingCta = t.raw("closingCta") as any;

  const renderCta = (cta: any, href: string, microcopyClass = "text-zinc-600") => {
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
        <span className={`text-xs ${microcopyClass}`}>{cta.microcopy}</span>
      </div>
    );
  };

  return (
    <>
      <section className="bg-[#0B1F33] text-white">
        <Container>
          <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 sm:items-center">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{hero.headline}</h1>
              <p className="mt-4 max-w-2xl text-base text-white/85">{hero.subheadline}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/85">
                {hero.bullets.map((item: string) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {renderCta(hero.cta, BOOK_CALL_URL, "text-white/70")}
            </div>
            <div className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-navy">
                {hero.deliverablesCard.headline}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                {hero.deliverablesCard.bullets.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href={resolveHref(locale, "/services")}
                  className="text-sm font-medium text-brand-orange hover:underline"
                >
                  {hero.deliverablesCard.linkLabel}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-zinc-200 bg-white">
        <Container>
          <div className="py-12">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
              <div>
                <h2 className="text-2xl font-semibold text-brand-navy">{credibility.headline}</h2>
                <p className="mt-2 text-sm text-zinc-600">{credibility.subheadline}</p>
                {renderCta(credibility.cta, "/how-we-work")}
              </div>
              <ul className="grid gap-3 text-sm text-zinc-600 sm:grid-cols-2">
                {credibility.bullets.map((item: string) => (
                  <li key={item} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="grid gap-8 py-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{problem.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{problem.subheadline}</p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-600">
                {problem.bullets.map((item: string) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {renderCta(problem.cta, "/contact")}
            </div>
            <div className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
              <div className="text-sm font-semibold text-brand-navy">{problem.successCard.headline}</div>
              <ul className="mt-4 space-y-2">
                {problem.successCard.bullets.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{pillars.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{pillars.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {pillars.cards.map((card: any) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                </div>
              ))}
            </div>
            {renderCta(pillars.cta, "/services")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{servicesHighlights.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{servicesHighlights.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {servicesHighlights.cards.map((card: any) => (
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
            {renderCta(servicesHighlights.cta, "/services")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{howItWorks.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{howItWorks.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {howItWorks.steps.map((step: any) => (
                <div key={step.title} className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{step.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{step.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                    {step.deliverables.map((deliverable: string) => (
                      <li key={deliverable} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {renderCta(howItWorks.cta, "/how-we-work")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{useCases.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{useCases.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {useCases.cards.map((card: any) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                </div>
              ))}
            </div>
            {renderCta(useCases.cta, "/use-cases")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{whyAltamira.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{whyAltamira.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {whyAltamira.cards.map((card: any) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                </div>
              ))}
            </div>
            {renderCta(whyAltamira.cta, "/about")}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{faq.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{faq.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {faq.items.map((item: any) => (
                <div key={item.question} className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{item.question}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{item.answer}</p>
                </div>
              ))}
            </div>
            {renderCta(faq.cta, "/services")}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B1F33] text-white">
        <Container>
          <div className="grid gap-8 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold">{closingCta.headline}</h2>
              <p className="mt-2 text-sm text-white/85">{closingCta.subheadline}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/85">
                {closingCta.bullets.map((item: string) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {renderCta(closingCta.cta, BOOK_CALL_URL, "text-white/70")}
            </div>
            <div className="rounded-xl2 border border-white/10 bg-white/5 p-6 text-sm text-white/85">
              <div className="text-sm font-semibold text-white">{closingCta.positioningCard.headline}</div>
              <p className="mt-3">{closingCta.positioningCard.description}</p>
              <div className="mt-6">
                <Link
                  href={resolveHref(locale, "/contact")}
                  className="text-sm font-medium text-brand-orange hover:underline"
                >
                  {closingCta.positioningCard.linkLabel}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
