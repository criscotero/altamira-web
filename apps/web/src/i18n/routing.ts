import { defaultLocale, locales } from "@/lib/i18n/locales";

export const routing = {
  locales,
  defaultLocale,
  localePrefix: "always",
} as const;

export type AppLocale = (typeof locales)[number];
