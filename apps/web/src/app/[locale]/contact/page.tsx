import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { siteCopy } from "@/content/siteCopy";
import { buildMetadata } from "@/lib/seo/metadata";
import { isLocale, type Locale, defaultLocale } from "@/lib/i18n/locales";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const meta = siteCopy.pages.contact.meta;
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/${locale}${siteCopy.links.contact}`,
    locale,
  });
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const copy = siteCopy.pages.contact;

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-brand-navy">{copy.pageTitle}</h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600">{copy.intro.subheadline}</p>
        <ul className="mt-6 space-y-2 text-sm text-zinc-600">
          {copy.intro.bullets.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-navy" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <ContactForm
          locale={locale}
          submitLabel={copy.intro.cta.label}
          submitMicrocopy={copy.intro.cta.microcopy}
        />

        
      </div>
    </Container>
  );
}
