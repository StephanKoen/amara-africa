import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { images } from "@/lib/images";
import NewsletterSection from "@/components/NewsletterSection";

export const metadata: Metadata = {
  title: "التجربة — طريقة أمارا أفريقيا",
  description:
    "المبادئ الهادئة التي تحكم كل رحلة من أمارا أفريقيا. خاصة، تراعي الحلال، بالعربية عند الطلب، ومكتوبة بيدٍ واحدة.",
  alternates: {
    canonical: "/ar/the-experience",
    languages: { en: "/the-experience", ar: "/ar/the-experience" },
  },
};

const PRINCIPLES = [
  {
    label: "٠١ · خاصة، لا تُشارك أبداً",
    title: "مركبة، ومرشد، وساعات تخصّكم وحدكم.",
    body: [
      "لا نشارك جولة برية أبداً. كل مركبة وكل مرشد وكل مقتفي أثر محجوز حصرياً لأهلك — سواء كنتما اثنين أو عائلة من عشرة. أعظم وسائل الراحة في السفاري هي ببساطة ألّا تقف في طابور.",
      "هذه ليست ترقية، وليست درجة أعلى تُدفع. إنها طريقتنا في العمل. وسنعتذر بهدوء عن تكليف قبل أن نساوم على هذه النقطة.",
    ],
    image: images.zebraKruger,
    alt: "مجموعة صغيرة من الحمير الوحشية تعبر طريقاً هادئاً عند الفجر",
    imagePosition: "right" as const,
  },
  {
    label: "٠٢ · صوت واحد، من البداية إلى الختام",
    title: "مستشار أول واحد، من أول اتصال إلى وداع الختام.",
    body: [
      "ملفك لا يُمرَّر على خط تجميع. مستشار أول واحد في مكتبنا في دبي يبني رحلتك، ويبقى على تواصل مع مرشدك على الأرض، ويكون على الطرف الآخر من الهاتف وأنت تسافر. ستعرف الصوت حين تسمعه.",
      "كل شيء يُكتب بلغة واضحة، على يد الشخص الذي خطّط للأيام فعلاً. لن تتسلم قالباً جاهزاً.",
    ],
    image: images.lodgeInterior,
    alt: "مكان داخلي هادئ بخامات طبيعية وضوء مدروس",
    imagePosition: "left" as const,
  },
  {
    label: "٠٣ · مطبخ يراعي الحلال",
    title: "يُعتنى به بهدوء، ويُرتَّب قبل وصولكم.",
    body: [
      "كل نُزل نعتمده يُبلَّغ مسبقاً. تُعدَّل القوائم بهدوء. وتُقدَّم أوقات الصلاة والخصوصية وتفاصيل العناية بالطعام أمراً مفروغاً منه، لا مِنّة.",
      "لا نعلن عن هذا بوصفه ميزة. نذكره هنا لأنه السؤال الذي يطرحه ضيوفنا الخليجيون أكثر من سواه، ولأن الجواب هو: نعم، بالطبع، ومن دون أي نقاش إضافي.",
    ],
    image: images.foodWine,
    alt: "مائدة خاصة مدروسة أُعدّت للغداء",
    imagePosition: "right" as const,
  },
  {
    label: "٠٤ · برنامج مكتوب",
    title: "وثيقة مدروسة، لا قالب جاهز.",
    body: [
      "ستتسلم برنامجاً كتبه المستشار الذي يمسك ملفك. كل يوم، وكل توصيلة، وكل وجبة، وكل صباح باكر. بلغة واضحة.",
      "سيتضمن اسم كل مرشد، ورقم كل سائق، وخط الطوارئ لأقرب مكتب إليك في أي ساعة. إنها الوثيقة التي تسافر بها، وهي الوثيقة التي نلتزم بها.",
    ],
    image: images.textiles,
    alt: "منسوجات مطوية بعناية على سطح خشبي",
    imagePosition: "left" as const,
  },
];

export default function ArabicTheExperiencePage() {
  return (
    <>
      <HeroSection
        kicker="طريقة أمارا أفريقيا"
        headingLead="غياب كل"
        headingItalic="مساومة لا داعي لها"
        headingTail="."
        imageSrc={images.southAfricaSavanna}
        imageAlt="سافانا بكر تمتد إلى أفق بعيد في آخر الضوء"
        primaryLink={{ href: "/ar/journeys", label: "تصفّح المجموعة" }}
        secondaryLink={{ href: "/ar/enquire", label: "استفسر بخصوصية" }}
        showEstablishmentLine={false}
        scrollLabel="مرّر"
      />

      {/* Intro */}
      <section
        className="section-x section-y"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <p className="label mb-5">النهج</p>
              <h2 className="h2-section">
                أربع <span className="gold-italic">ثوابت هادئة</span>،
                والأسباب التي نتمسك بها لأجلها.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <p className="body-copy max-w-[520px]">
                هناك طرق لن نسافر بها أبداً، وطرق نسافر بها دائماً. ما يلي هو
                النص الكامل للأربع الأهم. إن غابت إحداها عن عرضٍ رأيته في مكان
                آخر، فستشعر بالفرق في صباح اليوم الثاني.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles in long form */}
      {PRINCIPLES.map((p, i) => (
        <section
          key={p.label}
          className={i === 0 ? "" : "hairline"}
          style={{
            background:
              i % 2 === 0 ? "var(--dd-parchment)" : "var(--dd-white)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {p.imagePosition === "left" ? (
              <>
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "4 / 5", minHeight: 340 }}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <Copy {...p} />
              </>
            ) : (
              <>
                <Copy {...p} />
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "4 / 5", minHeight: 340 }}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      ))}

      {/* GCC specific */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--dd-parchment)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-[52px]">
            <div className="md:col-span-5">
              <p className="label mb-5">لأهل الخليج</p>
              <h2 className="h2-section">
                بُنيت حول <span className="gold-italic">طريقتكم في السفر</span>.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <p className="body-copy max-w-[520px]">
                عملاؤنا المؤسسون يقيمون في دبي والرياض والدوحة والكويت
                والمنامة. بنينا الدار حول طريقتهم في السفر، وحول التفاصيل التي
                تهمّهم أكثر من سواها.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <GccCard
              label="الحلال، بهدوء"
              title="يُرتَّب قبل وصولكم"
              body="كل نُزل شريك يُبلَّغ مسبقاً. تُهيَّأ المطابخ. وتُدوَّن أوقات الصلاة. وتُمنَح الخصوصية. لن يُطلب منك أن تشرح."
            />
            <GccCard
              label="العربية عند الطلب"
              title="مضيف يتحدث العربية"
              body="مضيفون ومرشدون يتحدثون العربية ودعم داخل النُزل عند الطلب وبحسب التوفر — يُرتَّب بهدوءِ تفضيلِ وسادة، ويُحفَظ بالطريقة نفسها."
            />
            <GccCard
              label="التوزيع"
              title="قابلة للحجز عبر وكيلكم"
              body="رحلاتنا تُحجز مباشرة، وعبر وكالات خليجية منتقاة حيث يفيد ذلك. الملف يبقى عندنا، لا عند مركز اتصال. وستصل دائماً إلى شخص باسمه."
              last
            />
          </div>
        </div>
      </section>

      {/* Enquire CTA */}
      <section
        className="section-x section-y"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <p className="label mb-5">ابدأ رحلتك</p>
              <h2 className="h2-section">
                سطر واحد <span className="gold-italic">يكفي</span>.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
              <p className="body-copy max-w-[520px]">
                أخبرنا أين وصل تفكيرك. سيكتب إليك أحد كبار أعضاء فريقنا
                شخصياً، من دون أي رد آلي في الطريق.
              </p>
              <div className="mt-9">
                <Link href="/ar/enquire" className="text-link">
                  اطلب وصولاً خاصاً ←
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection locale="ar" />
    </>
  );
}

function Copy({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string[];
}) {
  return (
    <div className="flex items-center">
      <div className="px-[clamp(22px,4.8vw,78px)] py-[clamp(44px,6.2vw,92px)] max-w-[620px]">
        <p className="label mb-5">{label}</p>
        <h3
          className="font-serif text-[30px] md:text-[38px] leading-[1.35]"
          style={{ color: "var(--dd-ink)" }}
        >
          {title}
        </h3>
        <div className="mt-6 flex flex-col gap-4">
          {body.map((p, i) => (
            <p key={i} className="body-copy">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function GccCard({
  label,
  title,
  body,
  last = false,
}: {
  label: string;
  title: string;
  body: string;
  last?: boolean;
}) {
  return (
    <div
      className="p-7 md:p-9"
      style={{
        borderTop: "1px solid var(--dd-border)",
        borderBottom: "1px solid var(--dd-border)",
        borderInlineEnd: last ? "none" : "1px solid var(--dd-border)",
      }}
    >
      <p className="label mb-5">{label}</p>
      <h4
        className="font-serif italic text-[26px] leading-[1.4]"
        style={{ color: "var(--dd-ink)" }}
      >
        {title}
      </h4>
      <p className="mt-5 body-copy">{body}</p>
    </div>
  );
}
