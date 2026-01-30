import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n/locales";

export function LanguageSwitcher({ locale, pathname }: { locale: Locale; pathname: string }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {locales.map((l) => {
        const nextPath = pathname.replace(/^\/([a-z]{2})(\/|$)/, `/${l}$2`);
        return (
          <Link
            key={l}
            href={nextPath}
            className={`rounded-md border px-2 py-1 ${l === locale ? "bg-zinc-900 text-white border-zinc-900" : "border-zinc-300 hover:bg-zinc-50"}`}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
