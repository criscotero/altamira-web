import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n/locales";
import { useTranslations } from "next-intl";

export function LanguageSwitcher({ locale, pathname }: { locale: Locale; pathname: string }) {
  const t = useTranslations("footer");
  const localeLinks = t.raw("localeLinks") as { code: string; label: string }[];

  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {locales.map((l) => {
        const label = localeLinks.find((item) => item.code === l)?.label || l.toUpperCase();
        const nextPath = pathname.replace(/^\/([a-z]{2})(\/|$)/, `/${l}$2`);
        return (
          <Link
            key={l}
            href={nextPath}
            className={`rounded-md border px-2 py-1 ${l === locale ? "bg-zinc-900 text-white border-zinc-900" : "border-zinc-300 hover:bg-zinc-50"}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
