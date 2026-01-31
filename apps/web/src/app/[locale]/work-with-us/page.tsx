import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/seo/metadata";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/locales";
import { workWithUsCopy, type Locale as WorkLocale } from "@/lib/i18n/workWithUs";
import { WorkWithUsForm } from "./WorkWithUsForm";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const copy = workWithUsCopy[locale as WorkLocale] ?? workWithUsCopy.en;

  return buildMetadata({
    title: copy.seo.title,
    description: copy.seo.description,
    path: `/${locale}/work-with-us`,
    locale,
    siteName: "Altamira Tech Labs",
  });
}

export default function WorkWithUsPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const copy = workWithUsCopy[locale as WorkLocale] ?? workWithUsCopy.en;

  return (
    <div className="bg-white">
      <section className="bg-brand-navy2 text-white">
        <Container>
          <div className="py-16 md:py-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{copy.hero.title}</h1>
              <p className="mt-4 text-base text-white/80">{copy.hero.subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-5 py-3 text-sm font-medium text-white hover:bg-brand-orange2"
                >
                  {copy.hero.ctaApply}
                </a>
                <a
                  href="#roles"
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 px-5 py-3 text-sm font-medium text-white hover:border-white"
                >
                  {copy.hero.ctaJoin}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="how-we-work" className="bg-brand-offwhite py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl2 border border-zinc-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-brand-navy">{copy.howWeWork.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                {copy.howWeWork.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-brand-navy/60">
                {copy.howWeWork.note}
              </p>
            </div>

            <div id="values" className="rounded-xl2 border border-zinc-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-brand-navy">{copy.values.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                {copy.values.list.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-brand-navy/60">
                {copy.values.note}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="roles" className="bg-white py-16">
        <Container>
          <div className="rounded-xl2 border border-zinc-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-brand-navy">{copy.roles.title}</h2>
              <p className="text-sm text-zinc-600">{copy.roles.note}</p>
            </div>
            <ul className="mt-6 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
              {copy.roles.list.map((role) => (
                <li key={role} className="rounded-lg border border-zinc-200 bg-brand-offwhite px-3 py-2">
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="apply" className="bg-brand-navy2 py-16 text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold">{copy.join.title}</h2>
              <p className="mt-3 text-sm text-white/75">
                {copy.hero.subtitle}
              </p>
            </div>
            <WorkWithUsForm copy={copy.join} locale={locale} />
          </div>
        </Container>
      </section>
    </div>
  );
}
