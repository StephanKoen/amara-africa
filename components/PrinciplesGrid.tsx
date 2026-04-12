import Link from "next/link";

export type Principle = {
  number: string;
  title: string;
  body: string;
};

type PrinciplesGridProps = {
  label: string;
  headingLead: string;
  headingItalic: string;
  headingTail?: string;
  intro: string;
  link?: { href: string; label: string };
  principles: Principle[];
};

export default function PrinciplesGrid({
  label,
  headingLead,
  headingItalic,
  headingTail,
  intro,
  link,
  principles,
}: PrinciplesGridProps) {
  return (
    <section className="section-x section-y-lg">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-[80px] md:mb-[120px]">
          <div className="md:col-span-5">
            <p className="label mb-7">{label}</p>
            <h2 className="h2-section">
              {headingLead}{" "}
              <span className="gold-italic">{headingItalic}</span>
              {headingTail ? <> {headingTail}</> : null}
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
            <p className="body-copy max-w-[520px]">{intro}</p>
            {link && (
              <div className="mt-8">
                <Link href={link.href} className="text-link">
                  {link.label} &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {principles.map((p, i) => (
            <div
              key={p.number}
              className="py-14 md:py-16 px-0 md:px-10 hairline"
              style={{
                borderRightWidth:
                  i % 2 === 0 && i < principles.length ? 1 : 0,
                borderRightColor: "var(--color-border)",
                borderRightStyle: "solid",
              }}
            >
              <div className="flex items-start gap-8">
                <span
                  className="font-serif italic text-[44px] leading-none"
                  style={{ color: "var(--color-gold)" }}
                  aria-hidden
                >
                  {p.number}
                </span>
                <div className="flex-1">
                  <h3
                    className="font-serif italic text-[26px] md:text-[30px] leading-[1.12]"
                    style={{ color: "var(--color-cream)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-5 body-copy">{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
