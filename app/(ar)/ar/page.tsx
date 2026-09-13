import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FeatureSplit from "@/components/FeatureSplit";
import FullbleedFeature from "@/components/FullbleedFeature";
import JourneyCard from "@/components/JourneyCard";
import PrinciplesGrid from "@/components/PrinciplesGrid";
import NewsletterSection from "@/components/NewsletterSection";
import { images } from "@/lib/images";
import { arabicJourney } from "@/lib/journeys-ar";

export const metadata: Metadata = {
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
};

const HOME_JOURNEYS = [
  "the-migration",
  "the-cape-and-kruger",
  "the-family-legacy",
];

export default function ArabicHomePage() {
  const featured = HOME_JOURNEYS.map((slug) => arabicJourney(slug)!);

  return (
    <>
      {/* Hero */}
      <HeroSection
        kicker="رحلات أفريقية خاصة"
        headingLead="أفريقيا، كما تُرى"
        headingItalic="على مهل"
        headingTail="وبخصوصية تامة."
        imageSrc={images.hero}
        imageAlt="جولة برية خاصة عند الفجر عبر سهول السيرينغيتي المفتوحة"
        primaryLink={{ href: "/ar/enquire", label: "ابدأ رحلتك" }}
        secondaryLink={{ href: "/ar/journeys", label: "تصفّح المجموعة" }}
        scrollLabel="مرّر"
        establishmentLine="أمارا أفريقيا · تأسست ٢٠٢٥ · رحلات خاصة، صيغت لأهل الخليج."
      />

      {/* Intro / The Difference */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-9 md:gap-14">
            <div className="md:col-span-5">
              <p className="label mb-5">الفرق</p>
              <h2 className="h2-section">
                طريقة أهدأ في{" "}
                <span className="gold-italic">اختبار أفريقيا</span>، تُدار من
                دبي.
              </h2>
              <p className="mt-8 body-copy max-w-[460px]">
                نحن دار صغيرة. رحلاتنا تُكتب ولا تُجمَّع. تبدأ بحديث في دبي،
                وتُبنى في كيب تاون، وتبقى بين الأيدي نفسها من أول اتصال إلى
                وداع الختام.
              </p>
              <div className="mt-8">
                <Link href="/ar/the-experience" className="text-link">
                  نهجنا ←
                </Link>
              </div>
            </div>

            <div className="md:col-span-6 md:col-start-7 flex flex-col">
              <Pillar
                title="خاصة، لا تُشارك أبداً"
                body="كل مركبة وكل مرشد وكل ترتيب في النُزل محجوز حصرياً لأهل بيتك. لن تشارك جولة برية ولا مائدة ولا لحظة مع غريب."
              />
              <Pillar
                title="فريق واحد، صوت واحد"
                body="مستشار أول واحد في دبي يمسك ملفك. وعلى الأرض، مرشد أول واحد يمسك الإيقاع. لا شيء يُسلَّم من يد إلى يد."
              />
              <Pillar
                title="مراعاة الحلال دون سؤال"
                body="نُزلنا الشريكة تجهّز قوائم طعام تراعي الحلال دون إعلان أو تكلّف. أوقات الصلاة والخصوصية والعناية بالطعام أمر مفروغ منه، لا طلب يُرفَع."
              />
              <Pillar
                title="العربية عند الطلب"
                body="مضيفون ومرشدون يتحدثون العربية ودعم داخل النُزل عند الطلب وبحسب التوفر. نخطط لأهل الخليج لأننا من الخليج."
                last
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature split — Lodge interior */}
      <FeatureSplit
        label="الدور التي نعتمدها"
        headingLead="عمارة داخلية"
        headingItalic="مدروسة"
        headingTail="وغياب كل مساومة لا داعي لها."
        body={[
          "نعمل مع مجموعة صغيرة خاصة من الدور عبر الجنوب الأفريقي وشرق القارة. بناها ملّاكها ويديرونها بأنفسهم، واختيرت لسبب واحد: أنها تحفظ المستوى نفسه سواء كنتم اثنين أو عشرة.",
          "أجنحة ضيوفنا هادئة، والخدمة غير مستعجلة، والتفاصيل — البياضات والماء والضوء — يُعتنى بها قبل وصولكم.",
        ]}
        link={{ href: "/ar/the-experience", label: "داخل الدور" }}
        imageSrc="https://library.singita.com/download/public/assets/171940122810044.jpg"
        imageAlt="سينغيتا ميليلي — حمّام الجناح الرئيسي بحوض قائم وإطلالات ممتدة على السيرينغيتي"
        imagePosition="left"
      />

      {/* Journey cards */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--dd-warm-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-[60px] md:mb-[82px]">
            <div className="md:col-span-5">
              <p className="label mb-5">المجموعة</p>
              <h2 className="h2-section">
                اثنتا عشرة <span className="gold-italic">طريقة للسفر</span>، كُتبت
                بهدوء.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <p className="body-copy max-w-[520px]">
                لدينا اثنا عشر نمطاً للرحلات. كل منها نقطة بداية، لا باقة جاهزة.
                نعيد كتابة كل نمط لكل ضيف، لكن طابع كل رحلة يبقى. ابدأ بالنمط
                الأقرب إلى الرحلة التي في خيالك.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
            {featured.map((journey, i) => (
              <JourneyCard
                key={journey.slug}
                journey={journey}
                priority={i === 0}
                locale="ar"
              />
            ))}
          </div>

          <div className="mt-[60px] flex justify-center">
            <Link href="/ar/journeys" className="text-link">
              اطّلع على الأنماط الاثني عشر كلها ←
            </Link>
          </div>
        </div>
      </section>

      {/* Numbered principles */}
      <PrinciplesGrid
        label="مبادئنا"
        headingLead="أربع"
        headingItalic="ثوابت هادئة"
        intro="هناك طرق لن نسافر بها أبداً، وطرق نسافر بها دائماً. هذه الأربع هي التي تشكّل كل تكليف نقبله. ليست قائمة تسويق؛ إنها الطريقة التي نعمل بها."
        link={{ href: "/ar/the-experience", label: "اقرأ النص الكامل" }}
        principles={[
          {
            number: "٠١",
            title: "مركبة خاصة، دائماً",
            body: "لا نشارك جولة برية أبداً. مركبتك ومرشدك وساعاتك. أعظم وسائل الراحة في السفاري هي ببساطة ألّا تقف في طابور.",
          },
          {
            number: "٠٢",
            title: "يدٌ واحدة تمسك الملف",
            body: "مستشار أول واحد من أول اتصال إلى وداع الختام. ملفك لا يُمرَّر على خط تجميع، ولا يُحوَّل إلى غيرنا يوم وصولك.",
          },
          {
            number: "٠٣",
            title: "مطبخ يراعي الحلال",
            body: "كل نُزل نعتمده يُبلَّغ مسبقاً. تُعدَّل القوائم بهدوء. وتُقدَّم أوقات الصلاة والخصوصية أمراً مفروغاً منه، لا مِنّة.",
          },
          {
            number: "٠٤",
            title: "برنامج مكتوب بخط اليد",
            body: "تتسلم وثيقة مدروسة، لا قالباً جاهزاً. كل يوم وكل توصيلة وكل وجبة — كتبها الشخص الذي يمسك ملفك، بلغة واضحة.",
          },
        ]}
      />

      {/* Full-bleed feature */}
      <FullbleedFeature
        label="في القارة"
        headingLead="سهولٌ لم تُخلق"
        headingItalic="للعجلة"
        headingTail="."
        link={{ href: "/ar/journeys/the-migration", label: "رحلة الهجرة الكبرى" }}
        imageSrc={images.serengetiDawn}
        imageAlt="السيرينغيتي عند أول الضوء، مروج مفتوحة تمتد إلى الأفق"
      />

      {/* Begin Your Journey CTA */}
      <section
        className="section-x section-y"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <p className="label mb-5">ابدأ رحلتك</p>
              <h2 className="h2-section">
                تُكتب بخط اليد.{" "}
                <span className="gold-italic">وتُرعى بيدٍ واحدة</span>.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <p className="body-copy max-w-[520px]">
                أخبرنا أين وصل تفكيرك. سطر واحد يكفي. سيكتب إليك أحد كبار
                أعضاء فريقنا شخصياً، من دون أي رد آلي في الطريق.
              </p>
              <div className="mt-9 flex flex-wrap gap-8">
                <Link href="/ar/enquire" className="text-link">
                  ابدأ رحلتك ←
                </Link>
                <Link href="/ar/journeys" className="text-link">
                  تصفّح المجموعة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection locale="ar" />
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
      className="py-7"
      style={{
        borderTop: "1px solid var(--dd-border)",
        borderBottom: last ? "1px solid var(--dd-border)" : "none",
      }}
    >
      <h3
        className="font-serif italic text-[26px] md:text-[30px] leading-[1.12]"
        style={{ color: "var(--dd-ink)" }}
      >
        {title}
      </h3>
      <p
        className="mt-4 text-[15px] leading-[1.8] max-w-[560px]"
        style={{ color: "var(--dd-stone)" }}
      >
        {body}
      </p>
    </div>
  );
}
