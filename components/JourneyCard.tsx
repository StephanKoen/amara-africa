import Image from "next/image";
import Link from "next/link";
import type { Journey } from "@/lib/journeys";

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
  return (
    <Link
      href={`/journeys/${journey.slug}`}
      className="journey-card group block"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: aspect === "tall" ? "4 / 5" : "1 / 1",
          background: "var(--color-ink-tertiary)",
        }}
      >
        <Image
          src={journey.cardImage}
          alt={`${journey.name} — ${journey.tag}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="journey-card-image"
          style={{ objectFit: "cover" }}
          priority={priority}
        />
      </div>
      <div
        className="p-8 md:p-9"
        style={{
          background: "var(--color-ink-secondary)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <p className="label mb-4">{journey.tag}</p>
        <h3
          className="font-serif italic text-[28px] md:text-[32px] leading-[1.08]"
          style={{ color: "var(--color-cream)" }}
        >
          {journey.name}
        </h3>
        <p
          className="mt-5 text-[14.5px] leading-[1.75]"
          style={{ color: "rgba(240,235,224,0.7)" }}
        >
          {journey.oneLiner}
        </p>
        <span className="mt-8 inline-block text-link">Explore &rarr;</span>
      </div>
    </Link>
  );
}
