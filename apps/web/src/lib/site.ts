import { defaultLocale, locales, type Locale, isLocale } from "@/lib/i18n/locales";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function normalizeLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export { locales, defaultLocale };
