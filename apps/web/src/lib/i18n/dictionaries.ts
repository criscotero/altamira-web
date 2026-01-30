import type { Locale } from "./locales";

export type Dictionary = typeof import("@/messages/en.json");

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => (await import("@/messages/en.json")).default,
  es: async () => (await import("@/messages/es.json")).default,
  pt: async () => (await import("@/messages/pt.json")).default,
  fr: async () => (await import("@/messages/fr.json")).default,
  de: async () => (await import("@/messages/de.json")).default
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
