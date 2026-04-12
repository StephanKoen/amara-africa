"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/journeys", label: "Journeys" },
  { href: "/the-experience", label: "The Experience" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-500"
        style={{
          background: scrolled ? "rgba(13,13,11,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
        }}
      >
        <nav className="section-x flex items-center justify-between h-[76px] md:h-[88px]">
          {/* Desktop: logo left */}
          <div className="hidden md:block">
            <Logo size="md" />
          </div>

          {/* Desktop: nav centre */}
          <ul className="hidden md:flex items-center gap-10 lg:gap-12 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[12px] uppercase tracking-[0.3em] text-cream/80 hover:text-[color:var(--color-gold)] transition-colors duration-300"
                  style={{ color: "rgba(240,235,224,0.78)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop: enquire right */}
          <div className="hidden md:block">
            <Link
              href="/enquire"
              className="text-link"
              style={{ letterSpacing: "0.28em" }}
            >
              Enquire Privately
            </Link>
          </div>

          {/* Mobile: centred logo */}
          <div className="md:hidden flex-1 flex justify-center">
            <Logo size="sm" />
          </div>

          {/* Mobile: hamburger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden absolute right-[22px] top-1/2 -translate-y-1/2 w-8 h-8 flex flex-col items-end justify-center gap-[6px]"
          >
            <span
              className="block h-[1px] w-7 transition-transform duration-500"
              style={{
                background: "var(--color-cream)",
                transform: menuOpen
                  ? "translateY(4px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block h-[1px] w-5 transition-transform duration-500"
              style={{
                background: "var(--color-cream)",
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
          style={{ background: "rgba(13,13,11,0.98)" }}
        >
          <div className="section-x h-full flex flex-col pt-[120px] pb-16">
            <ul className="flex flex-col gap-10">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif italic text-[44px] leading-none"
                    style={{ color: "var(--color-cream)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/enquire"
                  onClick={() => setMenuOpen(false)}
                  className="font-serif italic text-[44px] leading-none"
                  style={{ color: "var(--color-gold)" }}
                >
                  Enquire
                </Link>
              </li>
            </ul>
            <div className="mt-auto">
              <div className="hairline pt-6">
                <p className="label">Dune &amp; Delta · Est. 2025</p>
                <p className="label mt-2">Dubai · Cape Town · Lusaka</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
