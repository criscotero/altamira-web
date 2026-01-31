import Link from "next/link";
import type { SVGProps } from "react";
import type { Locale } from "@/lib/i18n/locales";
import { siteCopy } from "@/content/siteCopy";
import { Container } from "./Container";

const ICON_SIZE = 18;

// Footer theme
const footerBg = "bg-[#0B1F33]"; // swap to "bg-brand-navy" if you have it
const footerText = "text-white";

// Links
const navLinkClass =
  "inline-flex items-center rounded-sm text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F33]";

// Social rows (group hover makes icon + text orange together)
const socialLinkClass =
  "group flex w-full items-center gap-3 rounded-md text-white/85 transition-colors duration-200 hover:text-brand-orangeSoft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F33]";

// Click target wrapper (keeps UI comfy, but icon stays 18px)
const iconWrapClass =
  "inline-flex shrink-0 items-center justify-center rounded-full p-2 bg-white/5 ring-1 ring-white/10 transition-colors duration-200 group-hover:bg-white/10";

// Icon itself is SMALL and follows group hover
const iconClass =
  `h-[${ICON_SIZE}px] w-[${ICON_SIZE}px] text-white/90 transition-colors duration-200 group-hover:text-brand-orangeSoft`;

const localeLinks = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "pt", label: "PT", flag: "🇧🇷" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "de", label: "DE", flag: "🇩🇪" },
] as const;

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={ICON_SIZE}
      height={ICON_SIZE}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={ICON_SIZE}
      height={ICON_SIZE}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={ICON_SIZE}
      height={ICON_SIZE}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.81.32 1.6.58 2.36a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.81-1.13a2 2 0 0 1 2.11-.45c.76.26 1.55.46 2.36.58A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={ICON_SIZE}
      height={ICON_SIZE}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function Footer({ locale, t }: { locale: Locale; t: any }) {
  const year = new Date().getFullYear();

  return (
    <footer className={`mt-px border-t border-white/10 ${footerBg} ${footerText}`}>
      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-orangeSoft shadow-[0_0_12px_rgba(243,162,109,0.45)]"
                aria-hidden="true"
              />
              <span className="text-lg font-semibold tracking-tight">{siteCopy.brand.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/75">{siteCopy.brand.shortDescription}</p>
          </div>

          <nav aria-label="Navigation" className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}`} className={navLinkClass}>Home</Link></li>
              <li><Link href={`/${locale}/about`} className={navLinkClass}>About</Link></li>
              <li><Link href={`/${locale}/services`} className={navLinkClass}>Services</Link></li>
              <li><Link href={`/${locale}/blog`} className={navLinkClass}>Blog</Link></li>
              <li><Link href={`/${locale}/contact`} className={navLinkClass}>Contact</Link></li>
            </ul>
          </nav>

          <nav aria-label="Services" className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/services`} className={navLinkClass}>Custom Software</Link></li>
              <li><Link href={`/${locale}/services`} className={navLinkClass}>AI & Automation</Link></li>
              <li><Link href={`/${locale}/services`} className={navLinkClass}>Web & Mobile</Link></li>
              <li><Link href={`/${locale}/services`} className={navLinkClass}>Integrations & APIs</Link></li>
              <li><Link href={`/${locale}/services`} className={navLinkClass}>Cloud & DevOps</Link></li>
            </ul>
          </nav>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Contact</h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 text-white/85">
                <span className={iconWrapClass} aria-hidden="true">
                  <PhoneIcon className={iconClass} />
                </span>
                <div className="space-y-1">
                  <div>Phone / WhatsApp</div>
                  <div>+1 302-595-7259</div>
                  <div>+57 315-070-5119</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-white/85">
                <span className={iconWrapClass} aria-hidden="true">
                  <MapPinIcon className={iconClass} />
                </span>
                <div className="space-y-1">
                  <div>Altamira Tech Labs</div>
                  <div>123 Main St, Suite 456</div>
                  <div>Dover, DE 19901</div>
                  <div>USA</div>
                </div>
              </div>

              <a
                className={socialLinkClass}
                href="https://linkedin.com/company/altamira-tech-labs"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className={iconWrapClass} aria-hidden="true">
                  <LinkedinIcon className={iconClass} />
                </span>
                <span>LinkedIn</span>
              </a>

              <a className={socialLinkClass} href="mailto:hello@altamiratechlabs.com">
                <span className={iconWrapClass} aria-hidden="true">
                  <MailIcon className={iconClass} />
                </span>
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col gap-3 py-4 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
            <span>© {year} {siteCopy.brand.name}. {t.footer.rights}</span>
            <span className="text-white/45">{siteCopy.brand.tagline}</span>
            <div className="flex flex-wrap items-center gap-2">
              {localeLinks.map((item) => (
                <Link
                  key={item.code}
                  href={`/${item.code}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70 transition-colors hover:text-white"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs">
                    {item.flag}
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
