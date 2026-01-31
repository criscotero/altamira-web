import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { defaultLocale, locales } from "@/lib/i18n/locales";

const intlMiddleware = createMiddleware(routing);
const localePattern = new RegExp(`^/(${locales.join("|")})(/|$)`);

const COUNTRY_TO_LOCALE: Partial<Record<string, (typeof locales)[number]>> = {
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  NZ: "en",
  IE: "en",
  ES: "es",
  MX: "es",
  CO: "es",
  AR: "es",
  CL: "es",
  PE: "es",
  PT: "pt",
  BR: "pt",
  FR: "fr",
  BE: "fr",
  DE: "de",
  AT: "de",
};

function getLocaleFromCountry(country?: string | null) {
  if (!country) return null;
  return COUNTRY_TO_LOCALE[country.toUpperCase()] ?? null;
}

function getLocaleFromAcceptLanguage(header?: string | null) {
  if (!header) return null;
  const languages = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const lang of languages) {
    const base = lang.split("-")[0];
    if (locales.includes(base as (typeof locales)[number])) {
      return base as (typeof locales)[number];
    }
  }
  return null;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (localePattern.test(pathname)) {
    return intlMiddleware(request);
  }

  const geoCountry = request.geo?.country || request.headers.get("x-vercel-ip-country");
  const geoLocale = getLocaleFromCountry(geoCountry);
  const acceptLocale = getLocaleFromAcceptLanguage(request.headers.get("accept-language"));
  const locale = geoLocale || acceptLocale || defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
