import Image from "next/image";
import Link from "next/link";

type FeatureSplitProps = {
  label: string;
  headingLead: string;
  headingItalic: string;
  headingTail?: string;
  body: string[];
  link?: { href: string; label: string };
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
};

export default function FeatureSplit({
  label,
  headingLead,
  headingItalic,
  headingTail,
  body,
  link,
  imageSrc,
  imageAlt,
  imagePosition = "left",
}: FeatureSplitProps) {
  const image = (
    <div className="relative w-full" style={{ minHeight: 480 }}>
      <div
        className="relative w-full"
        style={{
          aspectRatio: "4 / 5",
          minHeight: 480,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );

  const copy = (
    <div
      className="flex items-center"
      style={{ background: "var(--color-ink-secondary)" }}
    >
      <div
        className="px-[clamp(28px,6vw,100px)] py-[clamp(60px,8vw,120px)] max-w-[620px]"
      >
        <p className="label mb-8">{label}</p>
        <h2 className="h2-section">
          {headingLead}{" "}
          <span className="gold-italic">{headingItalic}</span>
          {headingTail ? <> {headingTail}</> : null}
        </h2>
        <div className="mt-8 flex flex-col gap-5">
          {body.map((p, i) => (
            <p key={i} className="body-copy">
              {p}
            </p>
          ))}
        </div>
        {link && (
          <div className="mt-10">
            <Link href={link.href} className="text-link">
              {link.label} &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {imagePosition === "left" ? (
        <>
          {image}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {image}
        </>
      )}
    </section>
  );
}
