import type { Metadata } from "next";
import EnquireForm from "@/components/EnquireForm";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Enquire Privately — Amara Africa",
  description:
    "Write to us. A senior member of our Dubai office will reply in person, within one working day. No automated confirmations.",
};

// High-intent FAQ — answers the questions Gulf travellers actually ask at the
// planning stage. Rendered visibly AND as FAQPage schema (Google rich results
// + AI-engine answers). Pricing kept "on request" to match the site's stance.
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Are your journeys private, or do we travel with others?",
    a: "Every Amara journey is entirely private. Nothing is shared and nothing is fixed — we take the temperament of a journey and write it again for your household, down to the pace, the table and the hours in the vehicle.",
  },
  {
    q: "Can you arrange halal-aware dining and Arabic-speaking hosts?",
    a: "Halal-aware menus are briefed to every lodge in advance, quietly and without further discussion — that is simply how we work. Arabic-speaking hosts and guides are arranged on request and when available; tell us early and we will do the securing.",
  },
  {
    q: "Who looks after our booking?",
    a: "A single senior consultant in our Dubai office holds your file from the first call to the last goodbye. On the ground, a single senior guide holds the pace. You will always know the name of the person you are speaking to.",
  },
  {
    q: "When is the best time to travel?",
    a: "It depends on the journey. The Serengeti migration follows the herds through the year; South African safari game-viewing is strongest in the dry winter, May to October; and Cape Town is at its finest in the warm summer, November to March. We advise on timing for your specific itinerary.",
  },
  {
    q: "How far in advance should we book?",
    a: "The lodges we work with are small and book early, particularly in peak season. We recommend beginning the conversation several months ahead where possible — though we will always do our best with shorter notice.",
  },
  {
    q: "Do you arrange journeys for families and children?",
    a: "Yes. Several of our journeys are built for multi-generational travel, with private villa configurations and a children's programme designed around wonder rather than schedule.",
  },
  {
    q: "How does pricing work?",
    a: "Each journey is tailor-made and quoted on request — shaped by party size, season, the lodges chosen and the pace you prefer. We prepare a considered proposal once we understand the shape of your trip. International and domestic flights are quoted separately.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function EnquirePage() {
  return (
    <>
      <JsonLd data={FAQ_SCHEMA} />
      <section
        className="section-x pt-[144px] md:pt-[184px] pb-[60px]"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-7">
              <p className="label mb-6">Enquire Privately</p>
              <h1 className="h1-display">
                Write to us, and{" "}
                <span className="gold-italic">we will write back</span>.
              </h1>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end">
              <p className="body-copy max-w-[460px]">
                A senior member of our Dubai office will reply in person,
                within one working day. You will hear from a named individual.
                There is no automated confirmation, and there is no mailing
                list behind this form.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-x pb-[120px] md:pb-[170px]"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-[72px]">
            <div className="md:col-span-7">
              <div
                className="p-8 md:p-9"
                style={{
                  background: "var(--dd-white)",
                  border: "0.5px solid var(--dd-border)",
                }}
              >
                <EnquireForm />
              </div>
            </div>

            <aside className="md:col-span-5 md:col-start-8">
              <div
                className="p-8 md:p-9"
                style={{
                  background: "var(--dd-white)",
                  border: "0.5px solid var(--dd-border)",
                }}
              >
                <p className="label mb-5">Offices</p>
                <div className="flex flex-col gap-6">
                  <Office
                    city="Dubai"
                    description="Jumeirah Village Circle — guest relationships and the Gulf office."
                  />
                  <Office
                    city="Cape Town"
                    description="42 Hans Strijdom, Foreshore — product, itinerary writing and ground operations."
                  />
                </div>

                <div className="mt-8 hairline pt-6">
                  <p className="label mb-3">WhatsApp · UAE</p>
                  <a
                    href="https://wa.me/971588585960"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif italic text-[22px] leading-snug transition-colors duration-300 hover:text-[color:var(--dd-gold)]"
                    style={{ color: "var(--dd-ink)" }}
                  >
                    +971 58 858 5960
                  </a>
                </div>

                <div className="mt-8 hairline pt-6">
                  <p className="label mb-3">Reply time</p>
                  <p
                    className="font-serif italic text-[22px] leading-snug"
                    style={{ color: "var(--dd-ink)" }}
                  >
                    Within one working day, from a named individual.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ — high-intent planning questions + FAQPage schema */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--dd-parchment)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="mb-[52px] md:mb-[72px] max-w-[640px]">
            <p className="label mb-5">Before you write</p>
            <h2 className="h2-section">
              A few <span className="gold-italic">quiet answers</span>.
            </h2>
          </div>

          <dl className="max-w-[860px]">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7"
                style={{ borderTop: "0.5px solid var(--dd-border)" }}
              >
                <dt className="md:col-span-5">
                  <p
                    className="font-serif italic text-[22px] md:text-[24px] leading-[1.25]"
                    style={{ color: "var(--dd-ink)" }}
                  >
                    {item.q}
                  </p>
                </dt>
                <dd className="md:col-span-7">
                  <p className="body-copy">{item.a}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

function Office({
  city,
  description,
}: {
  city: string;
  description: string;
}) {
  return (
    <div>
      <p
        className="font-serif italic text-[22px] leading-snug"
        style={{ color: "var(--dd-ink)" }}
      >
        {city}
      </p>
      <p
        className="mt-2 text-[13px] leading-relaxed"
        style={{ color: "var(--dd-stone)" }}
      >
        {description}
      </p>
    </div>
  );
}
