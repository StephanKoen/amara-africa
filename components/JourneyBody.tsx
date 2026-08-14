import Image from "next/image";
import type { Journey } from "@/lib/journeys";

// The journey-body renderer, shared by the English and Arabic journey pages.
// Moved verbatim from app/(en)/journeys/[slug]/page.tsx; the only addition is
// the optional `labels` prop so the photography captions can be localised.

export type BodyLabels = {
  photography: string;
  toFollow: string;
};

const EN_LABELS: BodyLabels = {
  photography: "Photography",
  toFollow: "Photography to follow",
};

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
export function BodyMarkdown({
  source,
  title,
  sectionGalleries,
  labels = EN_LABELS,
}: {
  source: string;
  title: string;
  sectionGalleries?: Journey["sectionGalleries"];
  labels?: BodyLabels;
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
              labels={labels}
            />
          ) : (
            <SectionGalleryPlaceholder
              key={`gallery-${key}`}
              headingTitle={item.heading}
              labels={labels}
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
  labels,
}: {
  images: string[];
  alts?: string[];
  headingTitle: string;
  journeyTitle: string;
  labels: BodyLabels;
}) {
  return (
    <div className="mt-10 mb-2">
      <p className="label mb-5">
        {labels.photography} · {headingTitle}
      </p>
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
              alt={alts?.[i] ?? `${journeyTitle} — ${headingTitle} — ${i + 1}`}
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
  labels,
}: {
  headingTitle: string;
  labels: BodyLabels;
}) {
  return (
    <div className="mt-10 mb-2">
      <p className="label mb-5">
        {labels.photography} · {headingTitle}
      </p>
      <div
        className="flex gap-3 overflow-hidden"
        aria-label={`${labels.photography} · ${headingTitle} — ${labels.toFollow}`}
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
                {labels.toFollow}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
