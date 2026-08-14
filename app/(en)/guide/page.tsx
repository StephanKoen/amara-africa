import type { Metadata } from "next";
import GuideForm from "@/components/GuideForm";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "The Gulf Family's Guide to South Africa — Amara Africa",
  description:
    "Malaria-free safaris, direct flights from the Gulf, a two-hour time difference and lodges built for families. The honest planning guide, free to read.",
};

// Landing page for the Stage 1 paid campaign — the "Guide opt-in" that fires
// the Meta Lead event. Kept on the site nav-free by design: ad traffic lands
// here, reads the promise, and opts in.

const INSIDE: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "The two-hour secret",
    body:
      "Why South Africa is the closest 'far away' the Gulf has — direct flights from Dubai and Jeddah, and a time difference so small the children never notice it.",
  },
  {
    n: "02",
    title: "Big Five, malaria-free",
    body:
      "The private reserves where you need no tablets and no precautions — full safari, no compromise. Named, mapped and honestly compared.",
  },
  {
    n: "03",
    title: "Lodges that belong to you",
    body:
      "Exclusive-use villas and private camps where the only guests are your family — with your own chef, your own vehicle, your own hours.",
  },
  {
    n: "04",
    title: "The seasons, honestly",
    body:
      "When the game-viewing is at its strongest, when Cape Town is at its warmest, and which months we would quietly steer you away from.",
  },
  {
    n: "05",
    title: "How we work, and what it costs",
    body:
      "Halal-aware dining briefed in advance, privacy as standard, and a frank explanation of what your dirham actually buys at each level.",
  },
];

export default function GuidePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-end min-h-[62vh] md:min-h-[70vh]"
        style={{ background: "var(--dd-near-black)" }}
        data-theme="dark"
      >
        <img
          src={images.zebraKruger}
          alt="Zebra in the Kruger private reserves, South Africa"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
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
            <p className="label mb-6">Free to read · For families of the Gulf</p>
            <h1 className="h1-display max-w-[900px]">
              The Gulf Family&rsquo;s Guide to{" "}
              <span className="gold-italic">South Africa</span>.
            </h1>
            <p className="body-copy mt-8 max-w-[560px]">
              Nine hours from Dubai. A two-hour time difference. The Big Five,
              malaria-free. Everything we tell our own guests before they
              travel — written down, honestly, in one quiet document.
            </p>
          </div>
        </div>
      </section>

      {/* What's inside + form */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-[72px]">
            <div className="md:col-span-7">
              <p className="label mb-5">Inside the guide</p>
              <h2 className="h2-section mb-12">
                Five chapters, <span className="gold-italic">no brochure talk</span>.
              </h2>
              <div>
                {INSIDE.map((c) => (
                  <div
                    key={c.n}
                    className="grid grid-cols-12 gap-4 md:gap-8 py-7"
                    style={{ borderTop: "0.5px solid var(--dd-border)" }}
                  >
                    <div className="col-span-2 md:col-span-1">
                      <p
                        className="font-serif italic text-[20px]"
                        style={{ color: "var(--dd-gold-antique)" }}
                      >
                        {c.n}
                      </p>
                    </div>
                    <div className="col-span-10 md:col-span-11">
                      <h3 className="h3-card mb-3">{c.title}</h3>
                      <p className="body-copy max-w-[560px]">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="md:col-span-5 md:col-start-8">
              <div
                className="p-8 md:p-9 md:sticky md:top-[120px]"
                style={{
                  background: "var(--dd-warm-white)",
                  border: "0.5px solid var(--dd-border-mid)",
                }}
              >
                <p className="label mb-5">Your copy</p>
                <h3 className="h3-card mb-4">
                  Tell us where to <span className="gold-italic">send it</span>.
                </h3>
                <GuideForm />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Quiet credibility strip */}
      <section
        className="section-x section-y"
        style={{ background: "var(--dd-parchment)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <p className="label mb-4">Who wrote it</p>
              <p className="body-copy">
                Amara Africa — a private travel house with offices in Dubai and
                Cape Town. We design journeys for a small number of Gulf
                families each season, and this guide says exactly what we tell
                them.
              </p>
            </div>
            <div>
              <p className="label mb-4">What it is not</p>
              <p className="body-copy">
                Not a brochure, and not a mailing list. You will receive the
                guide and nothing else — no sequence, no follow-up campaign.
                If you want to talk, you write to us.
              </p>
            </div>
            <div>
              <p className="label mb-4">If your travel is near</p>
              <p className="body-copy">
                Skip the reading and speak to a person — our Dubai office is on
                WhatsApp at{" "}
                <a
                  href="https://wa.me/971588585960"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-italic"
                >
                  +971 58 858 5960
                </a>
                , and replies come from a named individual.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
