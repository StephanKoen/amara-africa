import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import NewsletterSection from "@/components/NewsletterSection";

export const metadata: Metadata = {
  title: "About — Amara Africa",
  description:
    "A small house, founded in 2025, with offices in Dubai and Cape Town. Our story, our team, and what we hold to.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero-ish header */}
      <section
        className="section-x pt-[144px] md:pt-[184px] pb-[60px] md:pb-[85px]"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-7">
              <p className="label mb-6">About</p>
              <h1 className="h1-display">
                A small house,{" "}
                <span className="gold-italic">quietly founded</span>, in 2025.
              </h1>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end">
              <p className="body-copy max-w-[460px]">
                Amara Africa was founded in Dubai in 2025 by a small group
                of people who had spent fifteen years writing safaris for other
                companies, and who wanted to write them again, differently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand story split */}
      <section
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ background: "var(--dd-parchment)" }}
      >
        <div
          className="relative w-full"
          style={{ aspectRatio: "4 / 5", minHeight: 400 }}
        >
          <Image
            src={images.textiles}
            alt="Handwoven textiles folded on a low wooden bench"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex items-center">
          <div className="px-[clamp(22px,4.8vw,78px)] py-[clamp(52px,7vw,108px)] max-w-[640px]">
            <p className="label mb-5">The Story</p>
            <h2 className="h2-section">
              Written,{" "}
              <span className="gold-italic">not assembled</span>.
            </h2>
            <div className="mt-8 flex flex-col gap-5">
              <p className="body-copy">
                We spent years inside larger houses. We learned how to write a
                safari, and we learned — slowly, and with some frustration —
                what is lost when a file is handed down an assembly line, and
                what is gained when it is not.
              </p>
              <p className="body-copy">
                Amara Africa exists to keep a small number of journeys held
                by a small number of hands. Our Dubai office holds the guest
                relationship; our Cape Town product team holds the itinerary
                and the ground operation. Two rooms, one
                voice, one pace.
              </p>
              <p className="body-copy">
                We are a house of two cities and two countries. We are from
                the Gulf and from Southern Africa. Our
                clients are, quietly, the same.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="mb-[52px] md:mb-[76px]">
            <p className="label mb-5">The Team</p>
            <h2 className="h2-section">
              Three{" "}
              <span className="gold-italic">senior pairs of hands</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-9">
            <TeamCard
              name="Stephan Koen"
              role="Co-Founder · Chief Strategy Officer"
              office="George"
              image="/images/Team/Stephan.jpg"
              alt="Portrait of Stephan Koen, Co-Founder and Chief Strategy Officer"
              bio={[
                "For over two decades Stephan has worked across the globe managing operations for some of the world's largest travel management companies — mastering the systems, strategy, and technology that move people seamlessly around the world. But the operations and the strategy were always in service of something simpler: a lifelong love of Africa, of its wild coast and quiet bushveld, of the feeling of being somewhere truly untamed.",
                "He founded Amara to bring the very best of what Africa has to offer to the discerning travellers of the UAE and Saudi Arabia — to share a continent he has loved his whole life with those who have yet to discover it. For Stephan, Africa's greatest luxury is its wildness intact, and Amara exists to help keep it that way.",
              ]}
            />
            <TeamCard
              name="Lloyd Barkhuizen"
              role="Co-Founder · Chief Revenue Officer"
              office="Dubai"
              image="/images/Team/Lloyd.png"
              alt="Portrait of Lloyd Barkhuizen, Co-Founder and Chief Revenue Officer"
              bio={[
                "Across more than three decades in travel, Lloyd has built a career spanning sales leadership, airline and supplier contracting, and consulting to the industry across South Africa and beyond. He has built travel businesses, negotiated the deals that make extraordinary journeys possible, and earned a name for putting the client at the centre of every conversation.",
                "Now based in Dubai, he is Amara's bridge between the discerning travellers of the Gulf and the Africa he has loved his whole life. For Lloyd, the privilege isn't the deal — it's watching a first-time guest fall for the continent the way he did, and knowing the journey was built to give back as much as it gives.",
              ]}
            />
            <TeamCard
              name="Cecily Fester"
              role="Global Director of Operations"
              office="Cape Town"
              image="/images/Team/Cecily.jpg"
              alt="Portrait of Cecily Fester, Global Director of Operations"
              bio={[
                "Over two decades in travel operations have made Cecily a master of the art that the best journeys depend on and the guest never sees. Across some of the industry's most respected names she has looked after VIP travel, orchestrated conferences and events, and held a single service standard steady across borders, time zones, and every surprise the road can throw.",
                "Her love of Africa runs through all of it — a belief that the continent rewards those who are fully present in it, and that such presence is only possible when everything behind the scenes has been thought through to the last detail. At Amara she is the calm, exacting hand behind every Amara journey, and the quiet guardian of the wild places at its heart.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Philosophy statement */}
      <section
        className="section-x section-y"
        style={{ background: "var(--dd-parchment)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="max-w-[980px] mx-auto text-center">
            <p className="label mb-6">Our philosophy</p>
            <blockquote>
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(30px, 3.6vw, 48px)",
                  lineHeight: 1.2,
                  color: "var(--dd-ink)",
                }}
              >
                &ldquo;A journey is not a product. It is a considered
                arrangement of hours, written for one household, by people who
                intend to be on the end of the phone while it happens.&rdquo;
              </p>
            </blockquote>
            <p className="label mt-8">
              Amara Africa · A Private House · Est. 2025
            </p>
          </div>

          <div className="mt-14 flex justify-center">
            <Link href="/enquire" className="text-link">
              Begin Your Journey &rarr;
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}

function TeamCard({
  name,
  role,
  office,
  image,
  alt,
  bio,
}: {
  name: string;
  role: string;
  office: string;
  image: string;
  alt: string;
  bio: string[];
}) {
  return (
    <div>
      <div
        className="relative w-full"
        style={{ aspectRatio: "4 / 5", background: "var(--dd-parchment)" }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="mt-6">
        <p className="label mb-3">
          {role} · {office}
        </p>
        <h3
          className="font-serif italic text-[30px] leading-[1.1]"
          style={{ color: "var(--dd-ink)" }}
        >
          {name}
        </h3>
        <div className="mt-5 flex flex-col gap-3 max-w-[520px]">
          {bio.map((p, i) => (
            <p key={i} className="body-copy-sm">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
