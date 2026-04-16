import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JourneyCard from "@/components/JourneyCard";
import { getJourney, journeys, splitTitle, type Journey } from "@/lib/journeys";

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
    openGraph: {
      title: journey.seoTitle ?? `${journey.title} · Dune & Delta`,
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
          Every Dune &amp; Delta journey is a starting point, not a package. We
          take the temperament of {journey.title} and re-write it for your
          household — the pace, the table, the hours in the vehicle, the hours
          in between.
        </p>
        <p className="body-copy">
          A single senior consultant in our Dubai office holds your file. On
          the ground, a single senior guide holds the pace. The lodges we hold
          are briefed in advance for Halal-aware menus and Arabic-speaking
          hosts, offered quietly and without further discussion.
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

/**
 * Minimal markdown-to-JSX renderer tailored to journey body content.
 * Supports: ## h2, ### h3, ---, **bold** (both standalone-line and inline),
 * and blank-line separated paragraphs. Content is fully trusted (authored
 * by us in lib/journeys.ts), so no sanitisation is required.
 *
 * Also inserts per-section scrolling photo strips. After every H2 section's
 * last content block, if the journey has a `sectionGalleries` entry whose
 * `afterHeading` matches the section title, the gallery is rendered just
 * before the section break (`---` or next `##`).
 */
function BodyMarkdown({
  source,
  title,
  sectionGalleries,
}: {
  source: string;
  title: string;
  sectionGalleries?: Journey["sectionGalleries"];
}) {
  const blocks = source
    .trim()
    .split(/\n\s*\n/)
    .map((b) => b.trim());

  const galleryFor = (heading: string) =>
    sectionGalleries?.find(
      (g) => g.afterHeading.trim().toLowerCase() === heading.trim().toLowerCase()
    );

  // Walk blocks and decide where to inject galleries: at the end of each
  // H2 section, right before the `---` break or the next `## Heading`.
  type Out =
    | { kind: "block"; idx: number; block: string }
    | {
        kind: "gallery";
        heading: string;
        images: string[];
        alts?: string[];
      };
  const plan: Out[] = [];
  let currentHeading: string | null = null;
  const flushGallery = () => {
    if (!currentHeading) return;
    const g = galleryFor(currentHeading);
    if (g) {
      plan.push({
        kind: "gallery",
        heading: currentHeading,
        images: g.images,
        alts: g.alts,
      });
    }
  };
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const isHr = /^-{3,}$/.test(b);
    const isH2 = b.startsWith("## ");
    if (isH2) {
      flushGallery();
      currentHeading = b.slice(3).trim();
      plan.push({ kind: "block", idx: i, block: b });
      continue;
    }
    if (isHr) {
      flushGallery();
      currentHeading = null;
      plan.push({ kind: "block", idx: i, block: b });
      continue;
    }
    plan.push({ kind: "block", idx: i, block: b });
  }
  // Flush once more for the final section (no trailing break).
  flushGallery();

  return (
    <div className="flex flex-col">
      {plan.map((item, key) => {
        if (item.kind === "gallery") {
          return item.images.length > 0 ? (
            <SectionGallery
              key={`gallery-${key}`}
              images={item.images}
              alts={item.alts}
              headingTitle={item.heading}
              journeyTitle={title}
            />
          ) : (
            <SectionGalleryPlaceholder
              key={`gallery-${key}`}
              headingTitle={item.heading}
            />
          );
        }

        const block = item.block;
        const idx = item.idx;

        // Horizontal rule
        if (/^-{3,}$/.test(block)) {
          return (
            <hr
              key={idx}
              className="my-10"
              style={{
                border: "none",
                borderTop: "0.5px solid var(--dd-border)",
              }}
            />
          );
        }

        // H2 — major section heading
        if (block.startsWith("## ")) {
          return (
            <h2
              key={idx}
              className="h2-section mt-12 mb-6"
              style={{ color: "var(--dd-ink)" }}
            >
              {block.slice(3)}
            </h2>
          );
        }

        // H3 — sub-section heading
        if (block.startsWith("### ")) {
          return (
            <h3
              key={idx}
              className="font-serif italic text-[22px] md:text-[26px] leading-[1.2] mt-10 mb-5"
              style={{ color: "var(--dd-ink)" }}
            >
              {block.slice(4)}
            </h3>
          );
        }

        // Standalone bold line — treated as a small italic gold sub-heading
        // (e.g. "**Stay: Cape Grace Hotel, V&A Waterfront**")
        const standaloneBold = block.match(/^\*\*([^*]+)\*\*$/);
        if (standaloneBold) {
          return (
            <p
              key={idx}
              className="font-serif italic mt-6 mb-2 text-[17px] md:text-[18px] leading-[1.3]"
              style={{ color: "var(--dd-gold-antique)" }}
            >
              {standaloneBold[1]}
            </p>
          );
        }

        // Paragraph — with possible inline **bold**
        return (
          <p key={idx} className="body-copy mb-5">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    if (m) {
      return (
        <strong
          key={i}
          style={{ color: "var(--dd-ink)", fontWeight: 500 }}
        >
          {m[1]}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/**
 * Horizontal, scroll-snap photo strip rendered inside a section. Each tile is
 * a tall 4:5 landscape anchor; users swipe / scroll-wheel horizontally.
 */
function SectionGallery({
  images,
  alts,
  headingTitle,
  journeyTitle,
}: {
  images: string[];
  alts?: string[];
  headingTitle: string;
  journeyTitle: string;
}) {
  return (
    <div className="mt-10 mb-2">
      <p className="label mb-5">Photography · {headingTitle}</p>
      <div
        className="flex gap-3 overflow-x-auto overflow-y-hidden pb-3 -mx-[clamp(18px,4vw,70px)] px-[clamp(18px,4vw,70px)]"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--dd-border-mid) transparent",
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative flex-none"
            style={{
              width: "clamp(260px, 44vw, 460px)",
              aspectRatio: "4 / 3",
              background: "var(--dd-parchment)",
              scrollSnapAlign: "start",
            }}
          >
            <Image
              src={src}
              alt={alts?.[i] ?? `${journeyTitle} — ${headingTitle} — photograph ${i + 1}`}
              fill
              sizes="460px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Placeholder shown when a section's gallery is declared but has no images
 * yet. Keeps the editorial rhythm intact — three hairline-bordered boxes
 * with a quiet "Photography — to follow" note.
 */
function SectionGalleryPlaceholder({
  headingTitle,
}: {
  headingTitle: string;
}) {
  return (
    <div className="mt-10 mb-2">
      <p className="label mb-5">Photography · {headingTitle}</p>
      <div
        className="flex gap-3 overflow-hidden"
        aria-label={`Photography for ${headingTitle} — to follow`}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="relative flex-none flex items-center justify-center"
            style={{
              width: "clamp(200px, 32vw, 320px)",
              aspectRatio: "4 / 3",
              background: "var(--dd-parchment)",
              border: "0.5px dashed var(--dd-border-mid)",
            }}
          >
            {i === 1 && (
              <span
                className="label"
                style={{ color: "var(--dd-stone)", letterSpacing: "0.28em" }}
              >
                Photography to follow
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
