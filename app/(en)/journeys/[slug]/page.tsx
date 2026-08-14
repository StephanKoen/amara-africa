import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JourneyCard from "@/components/JourneyCard";
import JsonLd from "@/components/JsonLd";
import { getJourney, journeys, splitTitle, type Journey } from "@/lib/journeys";
import { BodyMarkdown } from "@/components/JourneyBody";

const BASE = "https://amarafrica.com";

// Absolute URL for schema images (local paths → prefixed; Contentful URLs as-is).
function absoluteUrl(src: string) {
  return src.startsWith("http") ? src : `${BASE}${src}`;
}

// TouristTrip + breadcrumb structured data for a journey — rich results in
// Google and a parseable source for AI travel engines.
function journeySchema(journey: Journey) {
  const trip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: journey.title,
    description: journey.seoDescription ?? journey.oneliner,
    image: absoluteUrl(journey.heroImage),
    url: `${BASE}/journeys/${journey.slug}`,
    touristType: journey.idealFor,
    provider: {
      "@type": "TravelAgency",
      "@id": "https://amarafrica.com/#organization",
      name: "Amara Africa",
      url: BASE,
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Journeys", item: `${BASE}/journeys` },
      {
        "@type": "ListItem",
        position: 2,
        name: journey.title,
        item: `${BASE}/journeys/${journey.slug}`,
      },
    ],
  };
  return { "@context": "https://schema.org", "@graph": [trip, breadcrumb] };
}

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const journey = getJourney(params.slug);
  if (!journey) return { title: "Journey" };

  const title =
    journey.seoTitle ?? `${journey.title} — ${journey.territory}`;
  const description = journey.seoDescription ?? journey.oneliner;

  return {
    title,
    description,
    keywords: journey.seoKeywords,
    alternates: {
      canonical: `/journeys/${params.slug}`,
      languages: {
        en: `/journeys/${params.slug}`,
        ar: `/ar/journeys/${params.slug}`,
      },
    },
    openGraph: {
      title: journey.seoTitle ?? `${journey.title} · Amara Africa`,
      description,
      images: [{ url: journey.heroImage, alt: journey.title }],
    },
  };
}

export default function JourneyDetailPage({ params }: Props) {
  const journey = getJourney(params.slug);
  if (!journey) notFound();

  const related = resolveRelated(journey);
  const heroParts = splitTitle(journey);

  return (
    <>
      <JsonLd data={journeySchema(journey)} />
      {/* Hero */}
      <section
        data-theme="dark"
        className="relative w-full"
        style={{
          height: "88svh",
          minHeight: 600,
          background: "var(--dd-near-black)",
        }}
      >
        <Image
          src={journey.heroImage}
          alt={`${journey.title} — ${journey.territory}`}
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
        <div className="absolute inset-0 section-x flex items-end pb-[60px]">
          <div className="max-w-container mx-auto w-full">
            <p className="label mb-5">{journey.tag}</p>
            <h1 className="h1-display max-w-[860px]">
              {heroParts.lead}
              <span className="gold-italic">{heroParts.italic}</span>
              {heroParts.tail}
            </h1>
            <p
              className="mt-6 font-serif italic text-[22px] md:text-[26px] leading-snug max-w-[720px]"
              style={{ color: "rgba(240,235,224,0.78)" }}
            >
              {journey.oneliner}
            </p>
          </div>
        </div>
      </section>

      {/* Body + sticky sidebar */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--dd-warm-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-[72px]">
            <div className="md:col-span-7">
              <p className="label mb-5">The Journey</p>
              {journey.body ? (
                <BodyMarkdown
                  source={journey.body}
                  title={journey.title}
                  sectionGalleries={journey.sectionGalleries}
                />
              ) : (
                <DefaultBody journey={journey} />
              )}
            </div>

            <aside className="md:col-span-5 md:col-start-8">
              <div
                className="md:sticky md:top-[96px] p-8 md:p-9"
                style={{
                  background: "var(--dd-white)",
                  border: "0.5px solid var(--dd-border)",
                }}
              >
                <p className="label mb-6">At a glance</p>

                <div className="flex flex-col gap-5">
                  <SidebarRow label="Duration" value={journey.duration} />
                  <SidebarRow label="Territory" value={journey.territory} />
                  <SidebarRow label="Temperament" value={journey.tag} />
                </div>

                <div className="mt-8 hairline pt-6">
                  <Link href="/enquire" className="btn-gold">
                    Enquire About This Journey &rarr;
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Inclusions */}
      {journey.inclusions && journey.inclusions.length > 0 && (
        <section
          className="section-x section-y"
          style={{ background: "var(--dd-parchment)" }}
        >
          <div className="max-w-container mx-auto">
            <div className="mb-10">
              <p className="label mb-4">What's included</p>
              <h2 className="h2-section">
                Quietly <span className="gold-italic">included</span>.
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {journey.inclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 py-2"
                  style={{
                    borderTop: "0.5px solid var(--dd-border)",
                  }}
                >
                  <TickIcon />
                  <span
                    className="text-[15px] leading-[1.6]"
                    style={{ color: "var(--dd-ink)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Exclusions */}
      {journey.exclusions && journey.exclusions.length > 0 && (
        <section
          className="section-x section-y"
          style={{ background: "var(--dd-white)" }}
        >
          <div className="max-w-container mx-auto">
            <div className="mb-10">
              <p className="label mb-4">Not included</p>
              <h2 className="h2-section">
                For <span className="gold-italic">clarity</span>.
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {journey.exclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 py-2"
                  style={{
                    borderTop: "0.5px solid var(--dd-border)",
                  }}
                >
                  <DashIcon />
                  <span
                    className="text-[15px] leading-[1.6]"
                    style={{ color: "var(--dd-stone)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Ideal For */}
      {journey.idealFor && journey.idealFor.length > 0 && (
        <section
          className="section-x section-y"
          style={{ background: "var(--dd-warm-white)" }}
        >
          <div className="max-w-container mx-auto">
            <div className="mb-8">
              <p className="label mb-4">Ideal for</p>
              <h2 className="h2-section">
                Written for <span className="gold-italic">these guests</span>.
              </h2>
            </div>
            <ul className="flex flex-wrap gap-3">
              {journey.idealFor.map((item) => (
                <li
                  key={item}
                  style={{
                    border: "0.5px solid var(--dd-border-mid)",
                    padding: "8px 16px",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: "var(--dd-stone)",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Photo strip */}
      <section className="grid grid-cols-1 md:grid-cols-3">
        {journey.galleryImages.map((src, i) => (
          <div
            key={src}
            className="relative w-full"
            style={{ aspectRatio: "1 / 1" }}
          >
            <Image
              src={src}
              alt={`${journey.title} — photograph ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </section>

      {/* You may also consider */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--dd-warm-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="mb-[60px]">
            <p className="label mb-5">You may also consider</p>
            <h2 className="h2-section">
              Two other{" "}
              <span className="gold-italic">quiet possibilities</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
            {related.map((j) => (
              <JourneyCard key={j.slug} journey={j} aspect="tall" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function resolveRelated(journey: Journey): Journey[] {
  if (journey.relatedSlugs && journey.relatedSlugs.length > 0) {
    const resolved = journey.relatedSlugs
      .map((s) => journeys.find((j) => j.slug === s))
      .filter((j): j is Journey => Boolean(j));
    if (resolved.length > 0) return resolved.slice(0, 2);
  }
  return journeys.filter((j) => j.slug !== journey.slug).slice(0, 2);
}

function DefaultBody({ journey }: { journey: Journey }) {
  return (
    <>
      <h2 className="h2-section">
        A journey held in{" "}
        <span className="gold-italic">one voice</span>, from first call to last
        goodbye.
      </h2>
      <div className="mt-9 flex flex-col gap-5">
        <p className="body-copy">
          Every Amara Africa journey is a starting point, not a package. We
          take the temperament of {journey.title} and re-write it for your
          household — the pace, the table, the hours in the vehicle, the hours
          in between.
        </p>
        <p className="body-copy">
          A single senior consultant in our Dubai office holds your file. On
          the ground, a single senior guide holds the pace. The lodges we hold
          are briefed in advance for Halal-aware menus, offered quietly and
          without further discussion; Arabic-speaking hosts can be arranged
          on request and when available.
        </p>
        <p className="body-copy">
          Your itinerary will be written by hand — each day, each transfer,
          each early morning, in plain language — by the person who actually
          planned it.
        </p>
      </div>
    </>
  );
}

function SidebarRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label mb-[6px]" style={{ color: "var(--dd-stone)" }}>
        {label}
      </p>
      <p
        className="font-serif italic text-[22px] leading-snug"
        style={{ color: "var(--dd-ink)" }}
      >
        {value}
      </p>
    </div>
  );
}

function TickIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="mt-[6px] shrink-0"
      style={{ color: "var(--dd-gold-antique)" }}
    >
      <path
        d="M2 7.2 L5.4 10.4 L12 3.6"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="mt-[6px] shrink-0"
      style={{ color: "var(--dd-stone)" }}
    >
      <path
        d="M3 7 L11 7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
