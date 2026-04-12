import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JourneyCard from "@/components/JourneyCard";
import { getJourney, journeys } from "@/lib/journeys";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const journey = getJourney(params.slug);
  if (!journey) return { title: "Journey" };
  return {
    title: `${journey.name} — ${journey.tag}`,
    description: journey.descriptor,
    openGraph: {
      title: `${journey.name} · Dune & Delta`,
      description: journey.descriptor,
      images: [{ url: journey.heroImage, alt: journey.name }],
    },
  };
}

export default function JourneyDetailPage({ params }: Props) {
  const journey = getJourney(params.slug);
  if (!journey) notFound();

  const related = journeys.filter((j) => j.slug !== journey.slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section
        className="relative w-full"
        style={{ height: "88svh", minHeight: 600 }}
      >
        <Image
          src={journey.heroImage}
          alt={`${journey.name} — ${journey.tag}`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(13,13,11,0.55) 0%, rgba(13,13,11,0.1) 40%, rgba(13,13,11,0.9) 100%)",
          }}
        />
        <div className="absolute inset-0 section-x flex items-end pb-[80px]">
          <div className="max-w-container mx-auto w-full">
            <p className="label mb-7">{journey.tag}</p>
            <h1 className="h1-display max-w-[860px]">
              {journey.name}
            </h1>
            <p
              className="mt-8 font-serif italic text-[22px] md:text-[26px] leading-snug max-w-[680px]"
              style={{ color: "rgba(240,235,224,0.78)" }}
            >
              {journey.descriptor}
            </p>
          </div>
        </div>
      </section>

      {/* Body + sticky sidebar */}
      <section className="section-x section-y-lg">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-24">
            <div className="md:col-span-7">
              <p className="label mb-7">The Journey</p>
              <h2 className="h2-section">
                A journey{" "}
                <span className="gold-italic">held in one voice</span>, from
                first call to last goodbye.
              </h2>
              <div className="mt-12 flex flex-col gap-7">
                {journey.body.map((p, i) => (
                  <p key={i} className="body-copy">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <aside className="md:col-span-5 md:col-start-8">
              <div
                className="md:sticky md:top-[120px] p-10 md:p-12"
                style={{
                  background: "var(--color-ink-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p className="label mb-8">At a glance</p>

                <div className="flex flex-col gap-7">
                  <SidebarRow label="Duration" value={journey.duration} />
                  <SidebarRow label="Territory" value={journey.territory} />
                </div>

                <div className="mt-10 hairline pt-8">
                  <p className="label mb-5">Highlights</p>
                  <ul className="flex flex-col gap-4">
                    {journey.highlights.map((h) => (
                      <li
                        key={h}
                        className="font-serif italic text-[18px] leading-snug"
                        style={{ color: "var(--color-cream)" }}
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 hairline pt-8">
                  <Link href="/enquire" className="text-link">
                    Enquire About This Journey &rarr;
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="grid grid-cols-1 md:grid-cols-3">
        {journey.galleryImages.map((img, i) => (
          <div
            key={i}
            className="relative w-full"
            style={{ aspectRatio: "1 / 1" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </section>

      {/* You may also consider */}
      <section className="section-x section-y-lg">
        <div className="max-w-container mx-auto">
          <div className="mb-[80px]">
            <p className="label mb-7">You may also consider</p>
            <h2 className="h2-section">
              Two other{" "}
              <span className="gold-italic">quiet possibilities</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
            {related.map((j) => (
              <JourneyCard key={j.slug} journey={j} aspect="tall" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SidebarRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label mb-2">{label}</p>
      <p
        className="font-serif italic text-[22px] leading-snug"
        style={{ color: "var(--color-cream)" }}
      >
        {value}
      </p>
    </div>
  );
}
