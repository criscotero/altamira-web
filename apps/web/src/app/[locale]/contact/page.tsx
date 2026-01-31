import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo/metadata";
import { isLocale, type Locale, defaultLocale } from "@/lib/i18n/locales";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = await getTranslations({ locale });

  return buildMetadata({
    title: t("pages.contact.meta.title"),
    description: t("pages.contact.meta.description"),
    path: `/${locale}/contact`,
    locale,
    siteName: t("brand.name"),
  });
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "pages.contact" });

  const intro = t.raw("intro") as any;

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-brand-navy">{t("pageTitle")}</h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600">{intro.subheadline}</p>
        <ul className="mt-6 space-y-2 text-sm text-zinc-600">
          {intro.bullets.map((item: string) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <ContactForm submitLabel={intro.cta.label} submitMicrocopy={intro.cta.microcopy} />
      </div>
    </Container>
  );
}
