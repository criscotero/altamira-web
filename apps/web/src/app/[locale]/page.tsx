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
  const meta = siteCopy.pages.home.meta;
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${locale}`,
    locale,
  });
}

export default async function Home({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const copy = siteCopy.pages.home;

  const renderCta = (cta: typeof copy.hero.cta, microcopyClass = "text-zinc-500") => {
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
        <span className={`text-xs ${microcopyClass}`}>{cta.microcopy}</span>
      </div>
    );
  };

  return (
    <>
      <section className="bg-[#0B1F33] text-slate-100">
        <Container>
          <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                {copy.hero.headline}
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-200">{copy.hero.subheadline}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-200">
                {copy.hero.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {renderCta(copy.hero.cta, "text-slate-300")}
            </div>
            <div className="rounded-xl2 border border-white/10 bg-white/5 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                {copy.hero.deliverablesCard.headline}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                {copy.hero.deliverablesCard.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href={resolveHref(locale, copy.hero.deliverablesCard.linkHref)}
                  className="text-sm font-medium text-brand-orange hover:underline"
                >
                  {copy.hero.deliverablesCard.linkLabel}
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
                <h2 className="text-2xl font-semibold text-brand-navy">{copy.credibility.headline}</h2>
                <p className="mt-2 text-sm text-zinc-600">{copy.credibility.subheadline}</p>
                {renderCta(copy.credibility.cta)}
              </div>
              <ul className="grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
                {copy.credibility.bullets.map((item) => (
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
              <h2 className="text-2xl font-semibold text-brand-navy">{copy.problem.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{copy.problem.subheadline}</p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-700">
                {copy.problem.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {renderCta(copy.problem.cta)}
            </div>
            <div className="rounded-xl2 border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
              <div className="text-sm font-semibold text-brand-navy">
                {copy.problem.successCard.headline}
              </div>
              <ul className="mt-4 space-y-2">
                {copy.problem.successCard.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{copy.pillars.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{copy.pillars.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {copy.pillars.cards.map((card) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-white p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                </div>
              ))}
            </div>
            {renderCta(copy.pillars.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{copy.servicesHighlights.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{copy.servicesHighlights.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {copy.servicesHighlights.cards.map((card) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-white p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                  {card.bullets ? (
                    <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
            {renderCta(copy.servicesHighlights.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{copy.howItWorks.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{copy.howItWorks.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {copy.howItWorks.steps.map((step) => (
                <div key={step.title} className="rounded-xl2 border border-zinc-200 bg-white p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{step.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{step.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                    {step.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {renderCta(copy.howItWorks.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{copy.useCases.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{copy.useCases.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {copy.useCases.cards.map((card) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-white p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                </div>
              ))}
            </div>
            {renderCta(copy.useCases.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{copy.whyAltamira.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{copy.whyAltamira.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {copy.whyAltamira.cards.map((card) => (
                <div key={card.title} className="rounded-xl2 border border-zinc-200 bg-white p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
                </div>
              ))}
            </div>
            {renderCta(copy.whyAltamira.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <div>
              <h2 className="text-2xl font-semibold text-brand-navy">{copy.faq.headline}</h2>
              <p className="mt-2 text-sm text-zinc-600">{copy.faq.subheadline}</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {copy.faq.items.map((item) => (
                <div key={item.question} className="rounded-xl2 border border-zinc-200 bg-white p-6">
                  <h3 className="text-sm font-semibold text-brand-navy">{item.question}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{item.answer}</p>
                </div>
              ))}
            </div>
            {renderCta(copy.faq.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B1F33] text-slate-100">
        <Container>
          <div className="grid gap-8 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold">{copy.closingCta.headline}</h2>
              <p className="mt-2 text-sm text-slate-200">{copy.closingCta.subheadline}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-200">
                {copy.closingCta.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {renderCta(copy.closingCta.cta, "text-slate-300")}
            </div>
            <div className="rounded-xl2 border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
              <div className="text-sm font-semibold text-slate-100">
                {copy.closingCta.positioningCard.headline}
              </div>
              <p className="mt-3">{copy.closingCta.positioningCard.description}</p>
              <div className="mt-6">
                <Link
                  href={resolveHref(locale, copy.closingCta.positioningCard.linkHref)}
                  className="text-sm font-medium text-brand-orange hover:underline"
                >
                  {copy.closingCta.positioningCard.linkLabel}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
