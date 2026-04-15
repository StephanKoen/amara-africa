import Image from "next/image";
import Link from "next/link";
import type { Journey } from "@/lib/journeys";
import { splitTitle } from "@/lib/journeys";

type JourneyCardProps = {
  journey: Journey;
  priority?: boolean;
  aspect?: "tall" | "square";
};

export default function JourneyCard({
  journey,
  priority = false,
  aspect = "tall",
}: JourneyCardProps) {
  const parts = splitTitle(journey);

  return (
    <Link
      href={`/journeys/${journey.slug}`}
      className="journey-card group block"
      style={{
        background: "var(--dd-white)",
        border: "0.5px solid var(--dd-border)",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: aspect === "tall" ? "4 / 5" : "1 / 1",
          background: "var(--dd-parchment)",
        }}
      >
        <Image
          src={journey.cardImage}
          alt={`${journey.title} — ${journey.territory}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="journey-card-image"
          style={{ objectFit: "cover" }}
          priority={priority}
        />
      </div>
      <div className="p-6 md:p-7">
        <p className="label mb-3" style={{ color: "var(--dd-stone)" }}>
          {journey.tag}
        </p>
        <h3
          className="font-serif italic text-[28px] md:text-[32px] leading-[1.08]"
          style={{ color: "var(--dd-ink)" }}
        >
          {parts.lead}
          <span style={{ color: "var(--dd-gold-antique)" }}>
            {parts.italic}
          </span>
          {parts.tail}
        </h3>
        <p
          className="mt-4 text-[14.5px] leading-[1.75]"
          style={{ color: "var(--dd-stone)" }}
        >
          {journey.oneliner}
        </p>
        <span
          className="mt-6 inline-block text-[12px] uppercase tracking-[0.28em] pb-[6px]"
          style={{
            color: "var(--dd-stone)",
            borderBottom: "0.5px solid var(--dd-border-mid)",
          }}
        >
          Explore &rarr;
        </span>
      </div>
    </Link>
  );
}
