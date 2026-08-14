import Link from "next/link";
import AmaraLogo from "./AmaraLogo";
import LanguageToggle from "./LanguageToggle";
import type { Locale } from "@/lib/i18n";

const STRINGS = {
  en: {
    journeyLinks: [
      { href: "/journeys/the-migration", label: "The Migration" },
      { href: "/journeys/the-grand-circuit", label: "The Grand Circuit" },
      { href: "/journeys/the-family-legacy", label: "The Family Legacy" },
      { href: "/journeys/the-cape-and-kruger", label: "The Cape & Kruger" },
      { href: "/journeys/the-falls-and-delta", label: "The Falls & Delta" },
      { href: "/journeys/the-coastal-escape", label: "The Coastal Escape" },
    ],
    discoverLinks: [
      { href: "/the-experience", label: "The Experience" },
      { href: "/about", label: "About" },
      { href: "/journeys", label: "All Journeys" },
      { href: "/enquire", label: "Enquire Privately" },
    ],
    offices: [
      { city: "Dubai", line1: "Jumeirah Village Circle", line2: "Dubai · UAE" },
      {
        city: "Cape Town",
        line1: "Foreshore",
        line2: "Cape Town · South Africa",
      },
    ],
    tagline: ["Private African journeys.", "Crafted for the Gulf."],
    whatsapp: "WhatsApp · UAE",
    journeys: "Journeys",
    discover: "Discover",
    officesLabel: "Offices",
    rights: "All rights reserved",
    brand: "Amara Africa",
  },
  ar: {
    journeyLinks: [
      { href: "/ar/journeys/the-migration", label: "الهجرة الكبرى" },
      { href: "/ar/journeys/the-grand-circuit", label: "الجولة الكبرى" },
      { href: "/ar/journeys/the-family-legacy", label: "إرث العائلة" },
      { href: "/ar/journeys/the-cape-and-kruger", label: "توقيع جنوب أفريقيا" },
      { href: "/ar/journeys/the-falls-and-delta", label: "الشلالات والدلتا" },
      { href: "/ar/journeys/the-coastal-escape", label: "الملاذ الساحلي" },
    ],
    discoverLinks: [
      { href: "/ar/the-experience", label: "التجربة" },
      { href: "/ar/about", label: "من نحن" },
      { href: "/ar/journeys", label: "كل الرحلات" },
      { href: "/ar/enquire", label: "استفسر بخصوصية" },
    ],
    offices: [
      {
        city: "دبي",
        line1: "قرية جميرا الدائرية",
        line2: "دبي · الإمارات العربية المتحدة",
      },
      {
        city: "كيب تاون",
        line1: "فورشور",
        line2: "كيب تاون · جنوب أفريقيا",
      },
    ],
    tagline: ["رحلات أفريقية خاصة.", "صيغت لأهل الخليج."],
    whatsapp: "واتساب · الإمارات",
    journeys: "الرحلات",
    discover: "اكتشف",
    officesLabel: "المكاتب",
    rights: "جميع الحقوق محفوظة",
    brand: "أمارا أفريقيا",
  },
} as const;

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = STRINGS[locale];
  return (
    <footer
      data-theme="dark"
      className="pt-[84px] pb-8 px-[20px] md:px-[40px] md:pt-[72px] md:pb-7"
      style={{
        background: "var(--dd-near-black)",
        borderTop: "0.5px solid var(--dd-border)",
      }}
    >
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 hairline pt-[68px]">
          {/* Logo */}
          <div className="md:col-span-5">
            <AmaraLogo variant="dark" size="md" />
            <p
              className="mt-6 font-serif italic text-[20px] leading-snug"
              style={{ color: "rgba(240,235,224,0.72)", maxWidth: 340 }}
            >
              {t.tagline[0]}
              <br />
              {t.tagline[1]}
            </p>
            <div className="mt-6">
              <p className="label mb-2">{t.whatsapp}</p>
              <a
                href="https://wa.me/971588585960"
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="font-serif italic text-[18px] leading-snug transition-colors duration-300 hover:text-[color:var(--dd-gold)]"
                style={{ color: "var(--dd-linen)" }}
              >
                +971 58 858 5960
              </a>
            </div>
          </div>

          {/* Journeys */}
          <div className="md:col-span-3">
            <p className="label mb-5">{t.journeys}</p>
            <ul className="flex flex-col gap-[10px]">
              {t.journeyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-serif italic text-[18px] leading-snug transition-colors duration-300 hover:text-[color:var(--dd-gold)]"
                    style={{ color: "rgba(200,192,170,0.55)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div className="md:col-span-2">
            <p className="label mb-5">{t.discover}</p>
            <ul className="flex flex-col gap-[10px]">
              {t.discoverLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-serif italic text-[18px] leading-snug transition-colors duration-300 hover:text-[color:var(--dd-gold)]"
                    style={{ color: "rgba(200,192,170,0.55)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="md:col-span-2">
            <p className="label mb-5">{t.officesLabel}</p>
            <ul className="flex flex-col gap-4">
              {t.offices.map((o) => (
                <li key={o.city}>
                  <p
                    className="font-serif italic text-[18px] leading-snug"
                    style={{ color: "var(--dd-linen)" }}
                  >
                    {o.city}
                  </p>
                  <p
                    className="text-[12px] leading-relaxed mt-1"
                    style={{
                      color: "var(--dd-stone)",
                      letterSpacing: locale === "ar" ? 0 : "0.04em",
                    }}
                  >
                    {o.line1}
                    <br />
                    {o.line2}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-[84px] hairline pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="label" style={{ color: "var(--dd-stone)" }}>
            © {new Date().getFullYear()} {t.brand} · {t.rights}
          </p>
          <LanguageToggle />
        </div>
      </div>
    </footer>
  );
}
