"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageToggle from "./LanguageToggle";
import type { Locale } from "@/lib/i18n";

const STRINGS = {
  en: {
    links: [
      { href: "/journeys", label: "Journeys" },
      { href: "/the-experience", label: "The Experience" },
      { href: "/about", label: "About" },
    ],
    home: "/",
    enquireHref: "/enquire",
    enquire: "Enquire Privately",
    enquireLead: "Enquire ",
    enquireTail: "Privately",
    requestAccess: "Request Private Access",
    footerLine1: "Amara Africa · Est. 2025",
    footerLine2: "Dubai · Cape Town",
  },
  ar: {
    links: [
      { href: "/ar/journeys", label: "الرحلات" },
      { href: "/ar/the-experience", label: "التجربة" },
      { href: "/ar/about", label: "من نحن" },
    ],
    home: "/ar",
    enquireHref: "/ar/enquire",
    enquire: "استفسر بخصوصية",
    enquireLead: "استفسر ",
    enquireTail: "بخصوصية",
    requestAccess: "اطلب وصولاً خاصاً",
    footerLine1: "أمارا أفريقيا · تأسست ٢٠٢٥",
    footerLine2: "دبي · كيب تاون",
  },
} as const;

export default function Nav({ locale = "en" }: { locale?: Locale }) {
  const t = STRINGS[locale];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquireHover, setEnquireHover] = useState(false);
  const pathname = usePathname();

  // Pages that open over a dark, full-bleed hero — the nav can stay
  // transparent at the top there. Every other page opens on a light
  // background and needs the solid dark nav so the logo + links read.
  // The check is locale-agnostic: strip the /ar prefix first.
  const basePath = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  const hasDarkHero =
    basePath === "/" ||
    basePath === "/the-experience" ||
    (basePath.startsWith("/journeys/") && basePath !== "/journeys");

  // Use the solid treatment when scrolled, on any light-top page, but never
  // while the mobile menu is open (the menu's light overlay needs the
  // header transparent so the dark close-icon and links stay legible).
  const solid = !menuOpen && (scrolled || !hasDarkHero);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Link colour by state
  const linkColor = solid
    ? "rgba(200,192,170,0.7)" // cream @ 0.7
    : "#FFFFFF";

  // Outline enquire button by state
  const enquireBorder = solid
    ? "rgba(200,185,150,0.4)"
    : enquireHover
    ? "#D4AA68"
    : "rgba(255,255,255,0.6)";
  const enquireColor = solid
    ? "var(--dd-linen)"
    : enquireHover
    ? "#D4AA68"
    : "#FFFFFF";

  // Hamburger bar colour — always readable on hero
  const barColor = "#FFFFFF";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-500"
        style={{
          background: solid
            ? "rgba(13,13,11,0.95)"
            : "linear-gradient(to bottom, rgba(13,13,11,0.55) 0%, rgba(13,13,11,0) 100%)",
          backdropFilter: solid ? "blur(12px)" : "none",
          WebkitBackdropFilter: solid ? "blur(12px)" : "none",
          borderBottom: solid
            ? "0.5px solid rgba(200,185,150,0.15)"
            : "0.5px solid transparent",
        }}
      >
        <nav className="flex items-center justify-between h-[110px] px-[20px] md:px-[36px]">
          {/* Desktop: logo on the leading side */}
          <div className="hidden md:block">
            <Link href={t.home}>
              <NavLogo />
            </Link>
          </div>

          {/* Desktop: nav centre */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
            {t.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-[12px] uppercase tracking-[0.3em] transition-all duration-500 ${
                    scrolled ? "" : "opacity-[0.85] hover:opacity-100"
                  }`}
                  style={{ color: linkColor }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop: language + enquire on the trailing side */}
          <div className="hidden md:flex items-center gap-7">
            <LanguageToggle />
            <Link
              href={t.enquireHref}
              onMouseEnter={() => setEnquireHover(true)}
              onMouseLeave={() => setEnquireHover(false)}
              className="inline-block px-[18px] py-[8px] text-[11px] uppercase tracking-[0.28em] transition-colors duration-500"
              style={{
                border: `0.5px solid ${enquireBorder}`,
                color: enquireColor,
              }}
            >
              {t.enquire}
            </Link>
          </div>

          {/* Mobile: centred logo */}
          <div className="md:hidden flex-1 flex justify-center">
            <Link href={t.home}>
              <NavLogo />
            </Link>
          </div>

          {/* Mobile: hamburger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden absolute right-[20px] top-1/2 -translate-y-1/2 w-8 h-8 flex flex-col items-end justify-center gap-[6px]"
          >
            <span
              className="block h-[1px] w-7 transition-transform duration-500"
              style={{
                background: menuOpen ? "var(--dd-ink)" : barColor,
                transform: menuOpen
                  ? "translateY(4px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block h-[1px] w-5 transition-transform duration-500"
              style={{
                background: menuOpen ? "var(--dd-ink)" : barColor,
                transform: menuOpen
                  ? "translateY(-3px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 menu-fade-in"
          style={{ background: "var(--dd-warm-white)" }}
        >
          <div className="section-x h-full flex flex-col pt-[110px] pb-12">
            <ul className="flex flex-col">
              {t.links.map((l) => (
                <li
                  key={l.href}
                  className="py-5"
                  style={{
                    borderBottom: "0.5px solid var(--dd-border)",
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif italic text-[40px] leading-none"
                    style={{ color: "var(--dd-ink)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li
                className="py-5"
                style={{ borderBottom: "0.5px solid var(--dd-border)" }}
              >
                <Link
                  href={t.enquireHref}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-[40px] leading-none"
                  style={{ color: "var(--dd-ink)" }}
                >
                  <span className="italic">{t.enquireLead}</span>
                  <span
                    className="italic"
                    style={{ color: "var(--dd-gold-antique)" }}
                  >
                    {t.enquireTail}
                  </span>
                </Link>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-8">
              <Link
                href={t.enquireHref}
                onClick={() => setMenuOpen(false)}
                className="inline-block px-[20px] py-[10px] text-[11px] uppercase tracking-[0.28em]"
                style={{
                  border: "0.5px solid var(--dd-gold-antique)",
                  color: "var(--dd-gold-antique)",
                }}
              >
                {t.requestAccess}
              </Link>
              <LanguageToggle tone="light" />
            </div>

            <div className="mt-auto">
              <div
                className="pt-5"
                style={{ borderTop: "0.5px solid var(--dd-border)" }}
              >
                <p className="label">{t.footerLine1}</p>
                <p className="label mt-2">{t.footerLine2}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavLogo() {
  return (
    <span
      className="inline-flex flex-col items-center text-center"
      aria-label="Amara Africa"
    >
      <span
        className="block"
        dir="ltr"
        style={{
          fontFamily: "var(--font-cursive)",
          fontSize: 48,
          lineHeight: 0.9,
          color: "#C8962E",
          letterSpacing: "-0.01em",
        }}
      >
        Amara
      </span>
      <span
        className="block mt-[3px] uppercase"
        dir="ltr"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: "0.52em",
          paddingLeft: "0.52em",
          color: "#EDE8DC",
          lineHeight: 1,
        }}
      >
        Africa
      </span>
      <span
        className="block mt-[6px]"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: "var(--font-arabic)",
          fontSize: 11,
          color: "rgba(200,150,46,0.7)",
          lineHeight: 1.2,
        }}
      >
        أَمَارَا وَ أَفْرِيقَا
      </span>
    </span>
  );
}
