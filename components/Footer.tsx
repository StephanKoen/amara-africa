import Link from "next/link";
import Logo from "./Logo";

const JOURNEY_LINKS = [
  { href: "/journeys/the-migration", label: "The Migration" },
  { href: "/journeys/the-grand-circuit", label: "The Grand Circuit" },
  { href: "/journeys/the-family-legacy", label: "The Family Legacy" },
  { href: "/journeys/the-cape-and-kruger", label: "The Cape & Kruger" },
  { href: "/journeys/the-falls-and-delta", label: "The Falls & Delta" },
  { href: "/journeys/the-coastal-escape", label: "The Coastal Escape" },
];

const DISCOVER_LINKS = [
  { href: "/the-experience", label: "The Experience" },
  { href: "/about", label: "About" },
  { href: "/journeys", label: "All Journeys" },
  { href: "/enquire", label: "Enquire Privately" },
];

const OFFICES = [
  {
    city: "Dubai",
    line1: "Gate Avenue · DIFC",
    line2: "Sheikh Zayed Road",
  },
  {
    city: "Cape Town",
    line1: "42 Hans Strijdom",
    line2: "Foreshore · 8001",
  },
  {
    city: "Lusaka",
    line1: "Stand 1234 · Kabulonga",
    line2: "Lusaka · Zambia",
  },
];

export default function Footer() {
  return (
    <footer
      className="section-x pt-[110px] pb-10"
      style={{ background: "var(--color-ink-secondary)" }}
    >
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10 hairline pt-[90px]">
          {/* Logo + tagline */}
          <div className="md:col-span-5">
            <Logo size="lg" />
            <p
              className="mt-7 font-serif italic text-[22px] leading-snug"
              style={{ color: "rgba(240,235,224,0.72)", maxWidth: 360 }}
            >
              Private African journeys.
              <br />
              Crafted for the Gulf.
            </p>
            <p
              className="mt-10 font-serif text-[34px] leading-none"
              dir="rtl"
              lang="ar"
              style={{ color: "var(--color-gold)" }}
              aria-label="Raaha — comfort, belonging"
            >
              راحة
            </p>
            <p className="label mt-4">A sense of belonging</p>
          </div>

          {/* Journeys */}
          <div className="md:col-span-3">
            <p className="label mb-6">Journeys</p>
            <ul className="flex flex-col gap-3">
              {JOURNEY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-serif italic text-[19px] leading-snug hover:text-[color:var(--color-gold)] transition-colors duration-300"
                    style={{ color: "rgba(240,235,224,0.85)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div className="md:col-span-2">
            <p className="label mb-6">Discover</p>
            <ul className="flex flex-col gap-3">
              {DISCOVER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-serif italic text-[19px] leading-snug hover:text-[color:var(--color-gold)] transition-colors duration-300"
                    style={{ color: "rgba(240,235,224,0.85)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="md:col-span-2">
            <p className="label mb-6">Offices</p>
            <ul className="flex flex-col gap-5">
              {OFFICES.map((o) => (
                <li key={o.city}>
                  <p
                    className="font-serif italic text-[19px] leading-snug"
                    style={{ color: "var(--color-cream)" }}
                  >
                    {o.city}
                  </p>
                  <p
                    className="text-[12px] leading-relaxed mt-1"
                    style={{
                      color: "rgba(200,192,170,0.55)",
                      letterSpacing: "0.04em",
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
        <div className="mt-[110px] hairline pt-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="label">
            © {new Date().getFullYear()} Dune &amp; Delta · All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <button
              className="label hover:text-[color:var(--color-gold)] transition-colors duration-300"
              aria-pressed="true"
            >
              English
            </button>
            <span
              className="block w-px h-[10px]"
              style={{ background: "rgba(200,185,150,0.22)" }}
              aria-hidden
            />
            <button
              className="label hover:text-[color:var(--color-gold)] transition-colors duration-300"
              lang="ar"
              dir="rtl"
            >
              العربية
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
