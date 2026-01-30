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
  "inline-flex items-center rounded-sm text-white/80 transition-colors duration-200 hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F33]";

// Social rows (group hover makes icon + text orange together)
const socialLinkClass =
  "group inline-flex items-center gap-3 rounded-md text-white/85 transition-colors duration-200 hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F33]";

// Click target wrapper (keeps UI comfy, but icon stays 18px)
const iconWrapClass =
  "inline-flex shrink-0 items-center justify-center rounded-full p-2 bg-white/5 ring-1 ring-white/10 transition-colors duration-200 group-hover:bg-white/10";

// Icon itself is SMALL and follows group hover
const iconClass =
  `h-[${ICON_SIZE}px] w-[${ICON_SIZE}px] text-white/90 transition-colors duration-200 group-hover:text-brand-orange`;

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

export function Footer({ locale, t }: { locale: Locale; t: any }) {
  const year = new Date().getFullYear();

  return (
    <footer className={`mt-16 border-t border-white/10 ${footerBg} ${footerText}`}>
      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-orange shadow-[0_0_14px_rgba(208,96,16,0.45)]"
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
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Social</h3>

            <div className="space-y-3 text-sm">
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
          <div className="flex flex-col gap-2 py-4 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
            <span>© {year} {siteCopy.brand.name}. {t.footer.rights}</span>
            <span className="text-white/45">{siteCopy.brand.tagline}</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
