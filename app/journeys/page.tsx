import type { Metadata } from "next";
import Link from "next/link";
import JourneyCard from "@/components/JourneyCard";
import { journeys } from "@/lib/journeys";
import NewsletterSection from "@/components/NewsletterSection";

export const metadata: Metadata = {
  title: "The Collection — Six Private African Journeys",
  description:
    "Six considered African journeys — The Migration, The Grand Circuit, The Family Legacy, The Cape & Kruger, The Falls & Delta, and The Coastal Escape.",
};

export default function JourneysIndexPage() {
  return (
    <>
      {/* Header */}
      <section
        className="section-x pt-[170px] md:pt-[220px] pb-[80px] md:pb-[120px]"
        style={{ background: "var(--color-ink)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-7">
              <p className="label mb-8">The Collection</p>
              <h1 className="h1-display">
                Six{" "}
                <span className="gold-italic">quietly written</span>{" "}
                journeys.
              </h1>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end">
              <p className="body-copy max-w-[460px]">
                These are the six starting points we return to most often.
                Each is an archetype, not a package. Every brief we accept is
                re-written from the first page. The temperament remains; the
                itinerary is yours alone.
              </p>
              <div className="mt-10">
                <Link href="/enquire" className="text-link">
                  Enquire Privately &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-x pb-[120px] md:pb-[180px]">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
            {journeys.map((journey, i) => (
              <JourneyCard
                key={journey.slug}
                journey={journey}
                priority={i < 2}
                aspect="tall"
              />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
