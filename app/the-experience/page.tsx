import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { images } from "@/lib/images";
import NewsletterSection from "@/components/NewsletterSection";

export const metadata: Metadata = {
  title: "The Experience — The Amara Africa Way",
  description:
    "The quiet principles that hold every Amara Africa journey. Private, Halal-aware, Arabic on request, and written by one pair of hands.",
};

const PRINCIPLES = [
  {
    label: "01 · Private, never shared",
    title: "A vehicle, a guide, a pair of hours that belong to you.",
    body: [
      "We never share a game drive. Every vehicle, every guide, every tracker is held exclusively for your party — whether that is two of you or a family of ten. The most significant comfort on safari is simply not being in a queue.",
      "This is not an upgrade, and it is not a premium. It is the way we work. We will quietly decline a brief before we will compromise on this point.",
    ],
    image: images.zebraKruger,
    alt: "A small group of zebra crossing a quiet track at dawn",
    imagePosition: "right" as const,
  },
  {
    label: "02 · One voice, end to end",
    title: "A single senior consultant, from first call to last goodbye.",
    body: [
      "Your file is not handed down an assembly line. A single senior consultant in our Dubai office builds your journey, stays in contact with your guide on the ground, and is on the end of a phone while you travel. You will recognise the voice.",
      "Everything is written in plain language, by the person who actually planned the days. You will not receive a template.",
    ],
    image: images.lodgeInterior,
    alt: "A quiet interior with natural materials and considered light",
    imagePosition: "left" as const,
  },
  {
    label: "03 · A Halal-aware kitchen",
    title: "Attended to quietly, arranged before you arrive.",
    body: [
      "Every lodge we hold is briefed in advance. Menus are adjusted quietly. Prayer times, privacy and the particulars of dietary care are offered as a given, not a favour.",
      "We do not advertise this as a feature. We mention it here because it is the single question our Gulf guests most often ask, and because the answer is: yes, of course, and without any further discussion.",
    ],
    image: images.foodWine,
    alt: "A considered private table laid for lunch",
    imagePosition: "right" as const,
  },
  {
    label: "04 · A written itinerary",
    title: "A considered document, not a template.",
    body: [
      "You will receive an itinerary written by the consultant who holds your file. Each day, each transfer, each meal, each early morning. In plain language.",
      "It will include the name of every guide, the number for every driver, and the emergency line for the office nearest to you at any given hour. It is the document you travel with, and it is the document we honour.",
    ],
    image: images.textiles,
    alt: "Handwoven textiles folded on a wooden surface",
    imagePosition: "left" as const,
  },
];

export default function TheExperiencePage() {
  return (
    <>
      <HeroSection
        kicker="The Amara Africa Way"
        headingLead="The absence of"
        headingItalic="unnecessary compromise"
        headingTail="."
        imageSrc={images.southAfricaSavanna}
        imageAlt="Untouched savanna stretching to a distant horizon at last light"
        primaryLink={{ href: "/journeys", label: "View the Collection" }}
        secondaryLink={{ href: "/enquire", label: "Enquire Privately" }}
        showEstablishmentLine={false}
      />

      {/* Intro */}
      <section
        className="section-x section-y"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <p className="label mb-5">The Approach</p>
              <h2 className="h2-section">
                Four{" "}
                <span className="gold-italic">quiet certainties</span>, and the
                reasons we hold them.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <p className="body-copy max-w-[520px]">
                There are ways we will never travel, and ways we always will.
                What follows is the long form of the four that matter most. If
                one of them is missing from a proposal you have seen elsewhere,
                you will feel the difference on the second morning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles in long form */}
      {PRINCIPLES.map((p, i) => (
        <section
          key={p.label}
          className={i === 0 ? "" : "hairline"}
          style={{
            background:
              i % 2 === 0 ? "var(--dd-parchment)" : "var(--dd-white)",
          }}
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              p.imagePosition === "left" ? "" : ""
            }`}
          >
            {p.imagePosition === "left" ? (
              <>
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "4 / 5", minHeight: 340 }}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <Copy {...p} />
              </>
            ) : (
              <>
                <Copy {...p} />
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "4 / 5", minHeight: 340 }}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      ))}

      {/* GCC specific */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--dd-parchment)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-[52px]">
            <div className="md:col-span-5">
              <p className="label mb-5">For the Gulf</p>
              <h2 className="h2-section">
                Built for{" "}
                <span className="gold-italic">the way you travel</span>.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <p className="body-copy max-w-[520px]">
                Our founding clients live in Dubai, Riyadh, Doha, Kuwait and
                Manama. We built the house around the way they travel, and the
                particulars that matter most.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <GccCard
              label="Halal-aware, quietly"
              title="Arranged before you arrive"
              body="Every partner lodge is briefed in advance. Kitchens are adjusted. Prayer times are noted. Privacy is given. You will not be asked to explain."
            />
            <GccCard
              label="Arabic on request"
              title="An Arabic-speaking host"
              body="Arabic-speaking hosts, guides and in-lodge support on request and when available — arranged as quietly as a pillow preference, and held the same way."
            />
            <GccCard
              label="Distribution"
              title="Bookable through your OTA"
              body="Our journeys are held directly and, where useful, through selected Gulf OTAs. The file remains with us, not with a call centre. You will always reach a person by name."
              last
            />
          </div>
        </div>
      </section>

      {/* Enquire CTA */}
      <section
        className="section-x section-y"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <p className="label mb-5">Begin Your Journey</p>
              <h2 className="h2-section">
                A single line is{" "}
                <span className="gold-italic">enough</span>.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <p className="body-copy max-w-[520px]">
                Tell us where you are in your thinking. A senior member of our
                team will write back to you in person, without an automated
                reply in between.
              </p>
              <div className="mt-9">
                <Link href="/enquire" className="text-link">
                  Request Private Access &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}

function Copy({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string[];
}) {
  return (
    <div className="flex items-center">
      <div className="px-[clamp(22px,4.8vw,78px)] py-[clamp(44px,6.2vw,92px)] max-w-[620px]">
        <p className="label mb-5">{label}</p>
        <h3
          className="font-serif text-[30px] md:text-[38px] leading-[1.1]"
          style={{ color: "var(--dd-ink)" }}
        >
          {title}
        </h3>
        <div className="mt-6 flex flex-col gap-4">
          {body.map((p, i) => (
            <p key={i} className="body-copy">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function GccCard({
  label,
  title,
  body,
  last = false,
}: {
  label: string;
  title: string;
  body: string;
  last?: boolean;
}) {
  return (
    <div
      className="p-7 md:p-9"
      style={{
        borderTop: "1px solid var(--dd-border)",
        borderBottom: "1px solid var(--dd-border)",
        borderRight: last ? "none" : "1px solid var(--dd-border)",
      }}
    >
      <p className="label mb-5">{label}</p>
      <h4
        className="font-serif italic text-[26px] leading-[1.15]"
        style={{ color: "var(--dd-ink)" }}
      >
        {title}
      </h4>
      <p className="mt-5 body-copy">{body}</p>
    </div>
  );
}
