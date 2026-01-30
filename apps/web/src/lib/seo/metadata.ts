import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import { defaultLocale, type Locale } from "@/lib/i18n/locales";

const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  pt: "pt_BR",
  fr: "fr_FR",
  de: "de_DE",
};

type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path,
  locale = defaultLocale,
  type = "website",
}: BuildMetadataArgs): Metadata {
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Altamira Tech Labs",
      type,
      locale: ogLocaleMap[locale] || ogLocaleMap[defaultLocale],
    },
  };
}
