import Image from "next/image";
import Link from "next/link";

type FullbleedFeatureProps = {
  label: string;
  headingLead: string;
  headingItalic: string;
  headingTail?: string;
  link?: { href: string; label: string };
  imageSrc: string;
  imageAlt: string;
  heightClass?: string;
};

export default function FullbleedFeature({
  label,
  headingLead,
  headingItalic,
  headingTail,
  link,
  imageSrc,
  imageAlt,
  heightClass = "h-[360px] md:h-[480px]",
}: FullbleedFeatureProps) {
  return (
    <section
      data-theme="dark"
      className={`relative w-full ${heightClass}`}
      style={{ background: "var(--dd-near-black)" }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, rgba(13,13,11,0.85) 0%, rgba(13,13,11,0.45) 45%, rgba(13,13,11,0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(13,13,11,0.25) 0%, rgba(13,13,11,0.1) 40%, rgba(13,13,11,0.8) 100%)",
        }}
      />

      <div className="relative h-full section-x flex items-end pb-[52px]">
        <div className="max-w-container mx-auto w-full">
          <div className="max-w-[720px]">
            <p className="label mb-5">{label}</p>
            <h2 className="h2-section">
              {headingLead}{" "}
              <span className="gold-italic">{headingItalic}</span>
              {headingTail ? <> {headingTail}</> : null}
            </h2>
            {link && (
              <div className="mt-8">
                <Link href={link.href} className="text-link">
                  {link.label} &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
