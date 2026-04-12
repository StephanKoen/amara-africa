import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FeatureSplit from "@/components/FeatureSplit";
import FullbleedFeature from "@/components/FullbleedFeature";
import JourneyCard from "@/components/JourneyCard";
import PrinciplesGrid from "@/components/PrinciplesGrid";
import NewsletterSection from "@/components/NewsletterSection";
import { images } from "@/lib/images";
import { journeys } from "@/lib/journeys";

const HOME_JOURNEYS = [
  "the-migration",
  "the-cape-and-kruger",
  "the-family-legacy",
];

export default function HomePage() {
  const featured = HOME_JOURNEYS.map(
    (slug) => journeys.find((j) => j.slug === slug)!
  );

  return (
    <>
      {/* Hero */}
      <HeroSection
        kicker="Private African Journeys"
        headingLead="Africa, seen"
        headingItalic="slowly"
        headingTail="and privately."
        imageSrc={images.hero}
        imageAlt="A private dawn game drive across the open plains of the Serengeti"
        primaryLink={{ href: "/enquire", label: "Begin Your Journey" }}
        secondaryLink={{ href: "/journeys", label: "View the Collection" }}
      />

      {/* Intro / The Difference */}
      <section className="section-x section-y-lg">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="label mb-7">The Difference</p>
              <h2 className="h2-section">
                A quieter way of{" "}
                <span className="gold-italic">experiencing Africa</span>, built
                from Dubai.
              </h2>
              <p className="mt-10 body-copy max-w-[460px]">
                We are a small house. Our journeys are written, not
                assembled. They begin with a conversation in Dubai, are built
                in Cape Town and Lusaka, and are held by the same hands from
                first call to last goodbye.
              </p>
              <div className="mt-10">
                <Link href="/the-experience" className="text-link">
                  Our Approach &rarr;
                </Link>
              </div>
            </div>

            <div className="md:col-span-6 md:col-start-7 flex flex-col">
              <Pillar
                title="Private, never shared"
                body="Every vehicle, every guide, every lodge arrangement is held exclusively for your party. You will not share a game drive, a table, or a moment with a stranger."
              />
              <Pillar
                title="One team, one voice"
                body="A single senior consultant in Dubai holds your file. On the ground, a single senior guide holds the pace. Nothing is handed off."
              />
              <Pillar
                title="Halal-aware by default"
                body="Our partner lodges can prepare Halal-aware menus without announcement or fuss. Prayer times, privacy, and dietary care are a given, not a request."
              />
              <Pillar
                title="Arabic on request"
                body="Arabic-speaking hosts, guides and in-lodge support can be arranged on any journey. We plan for the Gulf because we are from the Gulf."
                last
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature split — Lodge interior */}
      <FeatureSplit
        label="The Houses We Keep"
        headingLead="Considered"
        headingItalic="interiors"
        headingTail="and the absence of unnecessary compromise."
        body={[
          "We work with a small, private collection of houses across Southern and East Africa. Owner-built, owner-run, and chosen for a single reason: they hold the same standard whether there are two of you or ten.",
          "Our guest suites are quiet, the service is unhurried, and the details — the linens, the water, the light — are attended to before you arrive.",
        ]}
        link={{ href: "/the-experience", label: "Inside the Houses" }}
        imageSrc={images.lodgeInterior}
        imageAlt="A considered lodge bathroom in natural materials with late-afternoon light"
        imagePosition="left"
      />

      {/* Journey cards */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--color-ink)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-[80px] md:mb-[110px]">
            <div className="md:col-span-5">
              <p className="label mb-7">The Collection</p>
              <h2 className="h2-section">
                Six{" "}
                <span className="gold-italic">ways of travelling</span>,
                quietly written.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <p className="body-copy max-w-[520px]">
                We hold six journey archetypes. Each is a starting point, not a
                package. We re-write every one of them for every guest, but the
                temperament of each remains. Begin with whichever most resembles
                the journey you have in your head.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {featured.map((journey, i) => (
              <JourneyCard key={journey.slug} journey={journey} priority={i === 0} />
            ))}
          </div>

          <div className="mt-[80px] flex justify-center">
            <Link href="/journeys" className="text-link">
              View All Six Archetypes &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Numbered principles */}
      <PrinciplesGrid
        label="Our Principles"
        headingLead="Four quiet"
        headingItalic="certainties"
        intro="There are ways we will never travel, and ways we always will. These are the four that shape every brief we accept. They are not a marketing list; they are how we work."
        link={{ href: "/the-experience", label: "Read the long form" }}
        principles={[
          {
            number: "01",
            title: "A private vehicle, always",
            body: "We never share a game drive. Your vehicle, your guide, your hours. The most significant comfort on safari is simply not being in a queue.",
          },
          {
            number: "02",
            title: "A single pair of hands",
            body: "One senior consultant from first call to last goodbye. Your file is not handed down an assembly line, and it is not forwarded on the day you arrive.",
          },
          {
            number: "03",
            title: "A Halal-aware kitchen",
            body: "Every lodge we hold is briefed in advance. Menus are adjusted quietly. Prayer times and privacy are offered as a given, not a favour.",
          },
          {
            number: "04",
            title: "A written itinerary",
            body: "You receive a considered document, not a template. Each day, each transfer, each meal — written by the person who holds your file, in plain language.",
          },
        ]}
      />

      {/* Full-bleed feature */}
      <FullbleedFeature
        label="On the Continent"
        headingLead="The plains were never meant to be"
        headingItalic="hurried"
        headingTail="through."
        link={{ href: "/journeys/the-migration", label: "The Migration Journey" }}
        imageSrc={images.serengetiDawn}
        imageAlt="The Serengeti at first light, open grassland stretching to the horizon"
      />

      {/* Begin Your Journey CTA */}
      <section
        className="section-x section-y"
        style={{ background: "var(--color-ink-secondary)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-5">
              <p className="label mb-7">Begin Your Journey</p>
              <h2 className="h2-section">
                Written by hand.{" "}
                <span className="gold-italic">Kept by hand</span>.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <p className="body-copy max-w-[520px]">
                Tell us where you are in your thinking. A single line is
                enough. A senior member of our team will write back to you in
                person, without an automated reply in between.
              </p>
              <div className="mt-12 flex flex-wrap gap-10">
                <Link href="/enquire" className="text-link">
                  Begin Your Journey &rarr;
                </Link>
                <Link href="/journeys" className="text-link">
                  View the Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}

function Pillar({
  title,
  body,
  last = false,
}: {
  title: string;
  body: string;
  last?: boolean;
}) {
  return (
    <div
      className="py-10"
      style={{
        borderTop: "1px solid var(--color-border)",
        borderBottom: last ? "1px solid var(--color-border)" : "none",
      }}
    >
      <h3
        className="font-serif italic text-[26px] md:text-[30px] leading-[1.12]"
        style={{ color: "var(--color-cream)" }}
      >
        {title}
      </h3>
      <p className="mt-5 body-copy max-w-[560px]">{body}</p>
    </div>
  );
}
