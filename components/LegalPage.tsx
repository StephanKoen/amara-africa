import Link from "next/link";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

// Shared shell for the legal pages (privacy, terms, refunds, delivery,
// shipping): heading, sticky contents list on desktop, hairline-separated
// sections. Payment providers check these URLs, so keep them all reachable
// from the footer.
export default function LegalPage({
  title,
  accent,
  intro,
  sections,
}: {
  title: string;
  accent: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <section
        className="section-x pt-[144px] md:pt-[184px] pb-[48px] md:pb-[64px]"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <p className="label mb-6">Legal</p>
          <h1 className="h1-display">
            {title} <span className="gold-italic">{accent}</span>
          </h1>
          <p className="body-copy mt-6 max-w-[620px]">{intro}</p>
        </div>
      </section>

      <section
        className="section-x pb-[96px] md:pb-[140px]"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <nav className="md:col-span-3 hidden md:block" aria-label="Contents">
            <ul className="sticky top-[120px] flex flex-col gap-3">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="body-copy-sm transition-colors duration-300 hover:text-[color:var(--dd-gold)]"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-8 md:col-start-5 privacy-body">
            {sections.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className={`scroll-mt-[120px] ${i > 0 ? "hairline pt-10 mt-10" : ""}`}
              >
                <h2 className="font-serif text-[28px] md:text-[32px] leading-tight mb-5">
                  {s.title}
                </h2>
                <div className="body-copy flex flex-col gap-4">{s.body}</div>
              </article>
            ))}

            <p className="body-copy-sm mt-14 flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/terms">Terms &amp; conditions</Link>
              <Link href="/privacy">Privacy policy</Link>
              <Link href="/refund-policy">Refund policy</Link>
              <Link href="/delivery-policy">Delivery policy</Link>
              <Link href="/shipping-policy">Shipping policy</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
