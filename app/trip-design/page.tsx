import type { Metadata } from "next";
import Link from "next/link";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Begin Your Trip Design — Amara Africa",
  description:
    "A dedicated senior designer, a complete private itinerary and held space at the lodges — for a design fee of AED 5,000, credited in full against your journey.",
};

// Stage 2 destination — the AED 5,000 Trip Design Fee, credited in full.
// Warm (retargeted) traffic lands here; the WhatsApp CTA fires the Meta
// Contact event automatically via the wa.me listener in MetaPixel.

const WHATSAPP_URL =
  "https://wa.me/971588585960?text=" +
  encodeURIComponent(
    "Hello Amara — I would like to begin designing our journey to Africa."
  );

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "A conversation, not a form",
    body:
      "You speak with a senior designer — one person, by name, from our Dubai office. We listen for the shape of your family and the pace you keep, not just dates and headcounts.",
  },
  {
    n: "02",
    title: "Your itinerary, written",
    body:
      "Within days you receive a complete private itinerary — lodges chosen for your household, flights, seasons, dining briefed halal-aware in advance. Revised with you until it is right.",
  },
  {
    n: "03",
    title: "Space, quietly held",
    body:
      "While you decide, we hold the rooms. The lodges we use are small and book early; a held file is the difference between the villa you wanted and the one that was left.",
  },
];

export default function TripDesignPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-end min-h-[62vh] md:min-h-[70vh]"
        style={{ background: "var(--dd-near-black)" }}
        data-theme="dark"
      >
        <img
          src={images.lodgeInterior}
          alt="Private lodge interior, South Africa"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,13,11,0.25) 0%, rgba(13,13,11,0.55) 60%, rgba(13,13,11,0.92) 100%)",
          }}
        />
        <div className="relative section-x w-full pb-[64px] md:pb-[88px] pt-[160px]">
          <div className="max-w-container mx-auto">
            <p className="label mb-6">Begin your design</p>
            <h1 className="h1-display max-w-[900px]">
              One designer. One family.{" "}
              <span className="gold-italic">One journey</span>.
            </h1>
            <p className="body-copy mt-8 max-w-[560px]">
              No call centre, and no package off a shelf. Your journey is
              designed by a senior member of our house — and the fee for that
              work is credited in full when you travel.
            </p>
          </div>
        </div>
      </section>

      {/* The fee, plainly */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-[72px]">
            <div className="md:col-span-7">
              <p className="label mb-5">How it works</p>
              <h2 className="h2-section mb-12">
                Three steps, <span className="gold-italic">held by one hand</span>.
              </h2>
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="grid grid-cols-12 gap-4 md:gap-8 py-7"
                  style={{ borderTop: "0.5px solid var(--dd-border)" }}
                >
                  <div className="col-span-2 md:col-span-1">
                    <p
                      className="font-serif italic text-[20px]"
                      style={{ color: "var(--dd-gold-antique)" }}
                    >
                      {s.n}
                    </p>
                  </div>
                  <div className="col-span-10 md:col-span-11">
                    <h3 className="h3-card mb-3">{s.title}</h3>
                    <p className="body-copy max-w-[560px]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <aside className="md:col-span-5 md:col-start-8">
              <div
                className="p-8 md:p-9 md:sticky md:top-[120px]"
                style={{
                  background: "var(--dd-warm-white)",
                  border: "0.5px solid var(--dd-border-mid)",
                }}
              >
                <p className="label mb-5">The design fee</p>
                <p className="font-serif text-[44px] leading-none mb-2">
                  AED 5,000
                </p>
                <p
                  className="text-[13px] mb-6"
                  style={{ color: "var(--dd-stone)" }}
                >
                  ≈ SAR 5,100 · credited in full against your journey
                </p>
                <div className="flex flex-col gap-4 body-copy-sm mb-8">
                  <p>
                    The fee engages a senior designer exclusively on your file.
                    When you confirm your journey, every dirham is deducted
                    from its cost — the design, in the end, is free.
                  </p>
                  <p>
                    If we cannot design something you love, we will say so
                    plainly — and part as friends.
                  </p>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold block text-center"
                >
                  Begin on WhatsApp →
                </a>
                <p
                  className="mt-5 text-[12px] leading-relaxed"
                  style={{ color: "var(--dd-stone)" }}
                >
                  You will be speaking with a named senior consultant in our
                  Dubai office — not a call centre, not a bot.
                </p>
                <div className="mt-6 hairline pt-5">
                  <Link href="/enquire" className="text-link">
                    Prefer to write? Enquire privately
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Reassurance strip */}
      <section
        className="section-x section-y"
        style={{ background: "var(--dd-parchment)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <p className="label mb-4">Why a fee at all</p>
              <p className="body-copy">
                Because design is the work. A considered journey takes days of
                a senior person&rsquo;s time — and a house that charges for it
                answers to you, not to whichever lodge pays the commission.
              </p>
            </div>
            <div>
              <p className="label mb-4">Credited, in full</p>
              <p className="body-copy">
                The moment you confirm your journey, the full AED 5,000 comes
                off its price. You are not paying extra for the design — you
                are reserving the designer.
              </p>
            </div>
            <div>
              <p className="label mb-4">Still reading first?</p>
              <p className="body-copy">
                Our planning guide for Gulf families — malaria-free reserves,
                seasons, honest pricing — is{" "}
                <Link href="/guide" className="gold-italic">
                  free to read here
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
