import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import NewsletterSection from "@/components/NewsletterSection";

export const metadata: Metadata = {
  title: "من نحن — أمارا أفريقيا",
  description:
    "دار صغيرة، تأسست عام ٢٠٢٥، بمكاتب في دبي وكيب تاون. قصتنا وفريقنا وما نتمسك به.",
  alternates: {
    canonical: "/ar/about",
    languages: { en: "/about", ar: "/ar/about" },
  },
};

export default function ArabicAboutPage() {
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
              <p className="label mb-6">من نحن</p>
              <h1 className="h1-display">
                دار صغيرة، <span className="gold-italic">تأسست بهدوء</span>،
                عام ٢٠٢٥.
              </h1>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end">
              <p className="body-copy max-w-[460px]">
                تأسست أمارا أفريقيا في دبي عام ٢٠٢٥ على يد مجموعة صغيرة من
                أشخاص أمضوا خمسة عشر عاماً يكتبون رحلات السفاري لشركات أخرى،
                وأرادوا أن يكتبوها من جديد، بطريقة مختلفة.
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
            alt="منسوجات منسوجة يدوياً مطوية على مقعد خشبي منخفض"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex items-center">
          <div className="px-[clamp(22px,4.8vw,78px)] py-[clamp(52px,7vw,108px)] max-w-[640px]">
            <p className="label mb-5">القصة</p>
            <h2 className="h2-section">
              تُكتب، <span className="gold-italic">لا تُجمَّع</span>.
            </h2>
            <div className="mt-8 flex flex-col gap-5">
              <p className="body-copy">
                أمضينا سنوات داخل دور أكبر. تعلمنا كيف تُكتب رحلة السفاري،
                وتعلمنا — ببطء، وبشيء من الإحباط — ما الذي يضيع حين يُمرَّر
                الملف على خط تجميع، وما الذي يُكسَب حين لا يحدث ذلك.
              </p>
              <p className="body-copy">
                وُجدت أمارا أفريقيا لتبقى رحلاتٌ قليلة بين أيدٍ قليلة. مكتبنا
                في دبي يرعى علاقة الضيف؛ وفريقنا في كيب تاون يرعى البرنامج
                والعمليات على الأرض. غرفتان، صوت واحد، إيقاع واحد.
              </p>
              <p className="body-copy">
                نحن دار مدينتين وبلدين. نحن من الخليج ومن الجنوب الأفريقي.
                وعملاؤنا، بهدوء، كذلك.
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
            <p className="label mb-5">الفريق</p>
            <h2 className="h2-section">
              ثلاث <span className="gold-italic">أيادٍ خبيرة</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-9">
            <TeamCard
              name="ستيفان كوين"
              role="شريك مؤسس · الرئيس الاستراتيجي"
              office="جورج"
              image="/images/Team/Stephan2.png"
              alt="صورة ستيفان كوين، الشريك المؤسس والرئيس الاستراتيجي"
              bio={[
                "على مدى أكثر من عقدين، عمل ستيفان حول العالم في إدارة العمليات لبعض من أكبر شركات إدارة السفر — متقناً الأنظمة والاستراتيجيات والتقنيات التي تنقل الناس بسلاسة حول العالم. لكن العمليات والاستراتيجية كانتا دوماً في خدمة شيء أبسط: حب عمرٍ كامل لأفريقيا، لساحلها البري وبراريها الهادئة، ولإحساس الوجود في مكانٍ لم يُروَّض بعد.",
                "أسّس أمارا ليقدّم أفضل ما تملكه أفريقيا للمسافرين المتمرّسين في الإمارات والسعودية — وليشارك قارةً أحبّها طوال حياته مع من لم يكتشفوها بعد. يرى ستيفان أن أعظم رفاهيات أفريقيا هي برّيتها السليمة، وأن أمارا وُجدت لتساعد في بقائها كذلك.",
              ]}
            />
            <TeamCard
              name="لويد باركهاوزن"
              role="شريك مؤسس · رئيس الإيرادات"
              office="دبي"
              image="/images/Team/Lloyd.png"
              alt="صورة لويد باركهاوزن، الشريك المؤسس ورئيس الإيرادات"
              bio={[
                "عبر أكثر من ثلاثة عقود في قطاع السفر، بنى لويد مسيرة تمتد من قيادة المبيعات إلى التعاقد مع شركات الطيران والموردين إلى تقديم الاستشارات للقطاع في جنوب أفريقيا وخارجها. أنشأ شركات سفر، وتفاوض على الاتفاقات التي تجعل الرحلات الاستثنائية ممكنة، وعُرف بوضع العميل في قلب كل حديث.",
                "من مقره اليوم في دبي، هو جسر أمارا بين مسافري الخليج المتمرّسين وأفريقيا التي أحبّها طوال حياته. الامتياز عند لويد ليس الصفقة — بل أن يرى ضيفاً في زيارته الأولى يقع في حب القارة كما وقع هو، وأن يعرف أن الرحلة بُنيت لتردّ للمكان بقدر ما تعطي ضيفها.",
              ]}
            />
            <TeamCard
              name="سيسيلي فيستر"
              role="المديرة العالمية للعمليات"
              office="كيب تاون"
              image="/images/Team/Cecily2.png"
              alt="صورة سيسيلي فيستر، المديرة العالمية للعمليات"
              bio={[
                "أكثر من عقدين في عمليات السفر جعلا من سيسيلي أستاذةً في الفن الذي تقوم عليه أفضل الرحلات ولا يراه الضيف أبداً. عبر بعض من أكثر أسماء القطاع احتراماً، رعت سفر كبار الشخصيات، ونظّمت المؤتمرات والفعاليات، وحافظت على معيار خدمة واحد ثابت عبر الحدود والمناطق الزمنية وكل مفاجآت الطريق.",
                "حبّها لأفريقيا يسري في ذلك كله — إيمانٌ بأن القارة تكافئ من يحضر فيها بكامل حواسه، وأن هذا الحضور لا يتحقق إلا حين يكون كل ما وراء الكواليس مدروساً حتى آخر تفصيلة. في أمارا، هي اليد الهادئة الدقيقة وراء كل رحلة، والحارسة الصامتة للأماكن البرية في قلبها.",
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
            <p className="label mb-6">فلسفتنا</p>
            <blockquote>
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(28px, 3.2vw, 44px)",
                  lineHeight: 1.6,
                  color: "var(--dd-ink)",
                }}
              >
                «الرحلة ليست منتجاً. إنها ترتيب مدروس للساعات، يُكتب لأهل بيت
                واحد، على يد أشخاص ينوون أن يكونوا على الطرف الآخر من الهاتف
                وهي تحدث.»
              </p>
            </blockquote>
            <p className="label mt-8">
              أمارا أفريقيا · دار خاصة · تأسست ٢٠٢٥
            </p>
          </div>

          <div className="mt-14 flex justify-center">
            <Link href="/ar/enquire" className="text-link">
              ابدأ رحلتك ←
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSection locale="ar" />
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
          className="font-serif italic text-[30px] leading-[1.3]"
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
