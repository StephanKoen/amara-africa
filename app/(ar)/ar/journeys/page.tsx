import type { Metadata } from "next";
import Link from "next/link";
import JourneyCard from "@/components/JourneyCard";
import NewsletterSection from "@/components/NewsletterSection";
import { arabicJourneys } from "@/lib/journeys-ar";

export const metadata: Metadata = {
  title: "المجموعة — سبع رحلات أفريقية خاصة",
  description:
    "سبع رحلات أفريقية مدروسة — الهجرة الكبرى، الجولة الكبرى، إرث العائلة، توقيع جنوب أفريقيا، توقيع سينغيتا، الشلالات والدلتا، والملاذ الساحلي.",
  alternates: {
    canonical: "/ar/journeys",
    languages: { en: "/journeys", ar: "/ar/journeys" },
  },
};

export default function ArabicJourneysIndexPage() {
  return (
    <>
      {/* Header */}
      <section
        className="section-x pt-[144px] md:pt-[184px] pb-[60px] md:pb-[90px]"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-7">
              <p className="label mb-6">المجموعة</p>
              <h1 className="h1-display">
                سبع رحلات <span className="gold-italic">كُتبت بهدوء</span>.
              </h1>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end">
              <p className="body-copy max-w-[460px]">
                هذه نقاط البداية السبع التي نعود إليها أكثر من سواها. كل منها
                نمط، لا باقة جاهزة. وكل تكليف نقبله يُعاد كتابته من الصفحة
                الأولى. الطابع يبقى؛ أما البرنامج فلكم وحدكم.
              </p>
              <div className="mt-8">
                <Link href="/ar/enquire" className="text-link">
                  استفسر بخصوصية ←
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section
        className="section-x pb-[90px] md:pb-[140px]"
        style={{ background: "var(--dd-warm-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
            {arabicJourneys.map((journey, i) => (
              <JourneyCard
                key={journey.slug}
                journey={journey}
                priority={i < 2}
                aspect="tall"
                locale="ar"
              />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection locale="ar" />
    </>
  );
}
