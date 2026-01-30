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
  const meta = siteCopy.pages.howWeWork.meta;
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${locale}${siteCopy.links.howWeWork}`,
    locale,
  });
}

export default function HowWeWorkPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const copy = siteCopy.pages.howWeWork;

  const renderCta = (cta: typeof copy.intro.cta) => {
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
            <h1 className="text-3xl font-semibold tracking-tight text-brand-navy">{copy.pageTitle}</h1>
            <p className="mt-4 max-w-2xl text-sm text-zinc-600">{copy.intro.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-700">
              {copy.intro.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(copy.intro.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{copy.steps.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{copy.steps.subheadline}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {copy.steps.steps.map((step) => (
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
            {renderCta(copy.steps.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{copy.deliverables.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{copy.deliverables.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-700">
              {copy.deliverables.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(copy.deliverables.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{copy.governance.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{copy.governance.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-700">
              {copy.governance.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(copy.governance.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{copy.expectations.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{copy.expectations.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-700">
              {copy.expectations.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(copy.expectations.cta)}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50">
        <Container>
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-brand-navy">{copy.success.headline}</h2>
            <p className="mt-2 text-sm text-zinc-600">{copy.success.subheadline}</p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-700">
              {copy.success.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {renderCta(copy.success.cta)}
          </div>
        </Container>
      </section>
    </>
  );
}
