import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/locales";
import { Container } from "./Container";
import { useTranslations } from "next-intl";
import { BOOK_CALL_URL, WHATSAPP_URL } from "@/lib/links";

export function Navbar({ locale }: { locale: Locale }) {
  const nav = useTranslations("nav");
  const cta = useTranslations("cta");
  const brand = useTranslations("brand");

  return (
    <header className="border-b border-white/10 bg-[#0B1F33] text-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image
              src="/brand/profile-logo.jpg"
              alt={brand("name")}
              width={40}
              height={40}
              className="rounded-full border border-white/15"
              priority
            />
            <span className="font-semibold tracking-tight">{brand("name")}</span>
          </Link>

          <nav className="hidden gap-6 text-sm md:flex">
            <Link href={`/${locale}/services`} className="text-white/80 hover:text-white">{nav("services")}</Link>
            <Link href={`/${locale}/blog`} className="text-white/80 hover:text-white">{nav("blog")}</Link>
            <Link href={`/${locale}/about`} className="text-white/80 hover:text-white">{nav("about")}</Link>
            <Link href={`/${locale}/contact`} className="text-white/80 hover:text-white">{nav("contact")}</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              {cta("whatsapp")}
            </a>
            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg bg-brand-orange px-3 py-2 text-sm font-medium text-white hover:bg-brand-orange2"
            >
              {cta("bookCall")}
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
