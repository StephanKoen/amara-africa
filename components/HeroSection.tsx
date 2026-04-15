import Image from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  kicker?: string;
  headingLead: string;
  headingItalic: string;
  headingTail?: string;
  imageSrc: string;
  imageAlt: string;
  primaryLink?: { href: string; label: string };
  secondaryLink?: { href: string; label: string };
  showEstablishmentLine?: boolean;
};

export default function HeroSection({
  kicker = "Private African Journeys",
  headingLead,
  headingItalic,
  headingTail,
  imageSrc,
  imageAlt,
  primaryLink,
  secondaryLink,
  showEstablishmentLine = true,
}: HeroSectionProps) {
  return (
    <section
      data-theme="dark"
      className="relative w-full overflow-hidden"
      style={{
        height: "100svh",
        minHeight: 640,
        background: "var(--dd-near-black)",
      }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      {/* gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(13,13,11,0.55) 0%, rgba(13,13,11,0.18) 35%, rgba(13,13,11,0.55) 75%, rgba(13,13,11,0.92) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(13,13,11,0.55) 0%, rgba(13,13,11,0.08) 45%, rgba(13,13,11,0) 100%)",
        }}
      />

      <div className="relative h-full section-x pb-[52px] pt-[96px] flex flex-col justify-end">
        <div className="max-w-container mx-auto w-full">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            {/* Left: copy */}
            <div className="max-w-[780px]">
              <p className="label mb-5">{kicker}</p>
              <h1 className="h1-display">
                {headingLead}{" "}
                <span className="gold-italic">{headingItalic}</span>
                {headingTail ? (
                  <>
                    <br />
                    {headingTail}
                  </>
                ) : null}
              </h1>

              {(primaryLink || secondaryLink) && (
                <div className="mt-9 flex flex-wrap gap-8">
                  {primaryLink && (
                    <Link href={primaryLink.href} className="text-link">
                      {primaryLink.label} &rarr;
                    </Link>
                  )}
                  {secondaryLink && (
                    <Link href={secondaryLink.href} className="text-link">
                      {secondaryLink.label}
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Right: scroll indicator */}
            <div className="hidden md:flex flex-col items-center gap-4 pb-2">
              <span className="label" style={{ writingMode: "vertical-rl" }}>
                Scroll
              </span>
              <span className="scroll-line" aria-hidden />
            </div>
          </div>

          {showEstablishmentLine && (
            <p
              className="mt-12 pt-5 hairline label"
              style={{ maxWidth: 520 }}
            >
              Dune &amp; Delta · Est. 2025 · Private journeys. Built for the Gulf.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
