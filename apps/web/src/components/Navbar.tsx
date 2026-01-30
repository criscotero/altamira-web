import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/locales";
import { Container } from "./Container";

export function Navbar({ locale, t }: { locale: Locale; t: any }) {
  return (
    <header className="border-b border-white/10 bg-brand-navy text-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image
              src="/brand/profile-logo.jpg"
              alt="Altamira Tech Labs"
              width={40}
              height={40}
              className="rounded-full border border-white/15"
              priority
            />
            <span className="font-semibold tracking-tight">Altamira Tech Labs</span>
          </Link>

          <nav className="hidden gap-6 text-sm md:flex">
            <Link href={`/${locale}/services`} className="hover:text-brand-orange">{t.nav.services}</Link>
            <Link href={`/${locale}/blog`} className="hover:text-brand-orange">{t.nav.blog}</Link>
            <Link href={`/${locale}/about`} className="hover:text-brand-orange">{t.nav.about}</Link>
            <Link href={`/${locale}/contact`} className="hover:text-brand-orange">{t.nav.contact}</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/"
              className="rounded-lg border border-white/25 px-3 py-2 text-sm hover:bg-white/10"
            >
              {t.cta.whatsapp}
            </a>
            <a
              href={`/${locale}/contact`}
              className="rounded-lg bg-brand-orange px-3 py-2 text-sm font-medium text-white hover:bg-brand-orange2"
            >
              {t.cta.bookCall}
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
