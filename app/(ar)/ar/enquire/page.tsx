import type { Metadata } from "next";
import EnquireForm from "@/components/EnquireForm";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "استفسر بخصوصية — أمارا أفريقيا",
  description:
    "اكتب إلينا. سيرد عليك أحد كبار أعضاء دارنا شخصياً خلال يوم عمل واحد. لا تأكيدات آلية.",
  alternates: {
    canonical: "/ar/enquire",
    languages: { en: "/enquire", ar: "/ar/enquire" },
  },
};

// The Arabic edition of the enquiry FAQ — rendered visibly AND as FAQPage
// schema so Arabic search/AI engines can answer from it directly.
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "هل رحلاتكم خاصة، أم نسافر مع آخرين؟",
    a: "كل رحلة من أمارا خاصة بالكامل. لا شيء يُشارك ولا شيء ثابت — نأخذ طابع الرحلة ونعيد كتابته لأهل بيتك، وصولاً إلى الإيقاع والمائدة وساعات المركبة.",
  },
  {
    q: "هل يمكنكم ترتيب طعام يراعي الحلال ومضيفين يتحدثون العربية؟",
    a: "قوائم الطعام المراعية للحلال تُبلَّغ لكل نُزل مسبقاً، بهدوء ومن دون أي نقاش إضافي — هذه ببساطة طريقتنا في العمل. أما المضيفون والمرشدون الناطقون بالعربية فيُرتَّبون عند الطلب وبحسب التوفر؛ أخبرنا مبكراً ونتولى نحن التأمين.",
  },
  {
    q: "من يرعى حجزنا؟",
    a: "مستشار أول واحد في مكتبنا في دبي يمسك ملفك من أول اتصال إلى وداع الختام. وعلى الأرض، مرشد أول واحد يمسك الإيقاع. ستعرف دائماً اسم الشخص الذي تتحدث إليه.",
  },
  {
    q: "متى أفضل وقت للسفر؟",
    a: "يعتمد على الرحلة. الهجرة الكبرى في السيرينغيتي تتبع القطعان على مدار السنة؛ ومشاهدة الحياة البرية في جنوب أفريقيا أقوى في شتاء الجفاف، من مايو إلى أكتوبر؛ وكيب تاون في أبهى حالاتها في الصيف الدافئ، من نوفمبر إلى مارس. ننصحك بالتوقيت الأنسب لبرنامجك تحديداً.",
  },
  {
    q: "قبل كم من الوقت ينبغي أن نحجز؟",
    a: "النُزل التي نعمل معها صغيرة وتمتلئ مبكراً، خصوصاً في المواسم العالية. ننصح ببدء الحديث قبل عدة أشهر حيثما أمكن — وسنبذل دائماً قصارى جهدنا مع المهل الأقصر.",
  },
  {
    q: "هل ترتبون رحلات للعائلات والأطفال؟",
    a: "نعم. عدد من رحلاتنا بُني للسفر متعدد الأجيال، بفلل خاصة قابلة للتهيئة وبرنامج للأطفال صُمم حول الدهشة لا حول الجدول.",
  },
  {
    q: "كيف تُحسب الأسعار؟",
    a: "كل رحلة تُصمم خصيصاً ويُقدَّم سعرها عند الطلب — بحسب عدد المسافرين والموسم والنُزل المختارة والإيقاع الذي تفضلونه. نُعدّ عرضاً مدروساً فور أن نفهم شكل رحلتكم. أما الرحلات الجوية الدولية والداخلية فتُسعَّر على حدة.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "ar",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ArabicEnquirePage() {
  return (
    <>
      <JsonLd data={FAQ_SCHEMA} />
      <section
        className="section-x pt-[144px] md:pt-[184px] pb-[60px]"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-7">
              <p className="label mb-6">استفسر بخصوصية</p>
              <h1 className="h1-display">
                اكتب إلينا، <span className="gold-italic">وسنكتب إليك</span>.
              </h1>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end">
              <p className="body-copy max-w-[460px]">
                سيرد عليك أحد كبار أعضاء مكتبنا في دبي شخصياً، خلال يوم عمل
                واحد. سيصلك الرد من شخص باسمه. لا يوجد تأكيد آلي، ولا توجد
                قائمة بريدية خلف هذا النموذج.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-x pb-[120px] md:pb-[170px]"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-[72px]">
            <div className="md:col-span-7">
              <div
                className="p-8 md:p-9"
                style={{
                  background: "var(--dd-white)",
                  border: "0.5px solid var(--dd-border)",
                }}
              >
                <EnquireForm locale="ar" />
              </div>
            </div>

            <aside className="md:col-span-5 md:col-start-8">
              <div
                className="p-8 md:p-9"
                style={{
                  background: "var(--dd-white)",
                  border: "0.5px solid var(--dd-border)",
                }}
              >
                <p className="label mb-5">المكاتب</p>
                <div className="flex flex-col gap-6">
                  <Office
                    city="دبي"
                    description="قرية جميرا الدائرية — علاقات الضيوف ومكتب الخليج."
                  />
                  <Office
                    city="كيب تاون"
                    description="٤٢ هانس سترايدوم، فورشور — المنتج وكتابة البرامج والعمليات على الأرض."
                  />
                </div>

                <div className="mt-8 hairline pt-6">
                  <p className="label mb-3">واتساب · الإمارات</p>
                  <a
                    href="https://wa.me/971588585960"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="font-serif italic text-[22px] leading-snug transition-colors duration-300 hover:text-[color:var(--dd-gold)]"
                    style={{ color: "var(--dd-ink)" }}
                  >
                    +971 58 858 5960
                  </a>
                </div>

                <div className="mt-8 hairline pt-6">
                  <p className="label mb-3">زمن الرد</p>
                  <p
                    className="font-serif italic text-[22px] leading-snug"
                    style={{ color: "var(--dd-ink)" }}
                  >
                    خلال يوم عمل واحد، من شخص باسمه.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ — high-intent planning questions + FAQPage schema */}
      <section
        className="section-x section-y-lg"
        style={{ background: "var(--dd-parchment)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="mb-[52px] md:mb-[72px] max-w-[640px]">
            <p className="label mb-5">قبل أن تكتب</p>
            <h2 className="h2-section">
              بضع <span className="gold-italic">إجابات هادئة</span>.
            </h2>
          </div>

          <dl className="max-w-[860px]">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7"
                style={{ borderTop: "0.5px solid var(--dd-border)" }}
              >
                <dt className="md:col-span-5">
                  <p
                    className="font-serif italic text-[22px] md:text-[24px] leading-[1.5]"
                    style={{ color: "var(--dd-ink)" }}
                  >
                    {item.q}
                  </p>
                </dt>
                <dd className="md:col-span-7">
                  <p className="body-copy">{item.a}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

function Office({
  city,
  description,
}: {
  city: string;
  description: string;
}) {
  return (
    <div>
      <p
        className="font-serif italic text-[22px] leading-snug"
        style={{ color: "var(--dd-ink)" }}
      >
        {city}
      </p>
      <p
        className="mt-2 text-[13px] leading-relaxed"
        style={{ color: "var(--dd-stone)" }}
      >
        {description}
      </p>
    </div>
  );
}
