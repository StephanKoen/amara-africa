type AmaraLogoProps = {
  variant?: "linen" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SCALE = {
  sm: { amara: 64, africa: 12, tagline: 7, arabic: 9, gap: 6 },
  md: { amara: 120, africa: 22, tagline: 9, arabic: 14, gap: 12 },
  lg: { amara: 180, africa: 34, tagline: 13, arabic: 22, gap: 16 },
} as const;

export default function AmaraLogo({
  variant = "linen",
  size = "md",
  className = "",
}: AmaraLogoProps) {
  const s = SCALE[size];
  const dark = variant === "dark";
  const ruleColor = dark ? "rgba(200,150,46,0.28)" : "rgba(154,108,26,0.28)";
  const africaColor = dark ? "#EDE8DC" : "#1A1710";
  const taglineColor = dark
    ? "rgba(200,150,46,0.78)"
    : "rgba(154,108,26,0.85)";
  const arabicColor = dark ? "#C8962E" : "#9A6C1A";

  return (
    <span
      className={`inline-flex flex-col items-center text-center ${className}`}
      aria-label="Amara Africa"
    >
      <span
        className="block w-[70%] h-px"
        style={{ background: ruleColor }}
        aria-hidden
      />

      <span
        className="block"
        style={{
          fontFamily: "var(--font-cursive)",
          fontSize: s.amara,
          lineHeight: 0.85,
          color: "#C8962E",
          marginTop: s.gap,
          marginBottom: s.gap * 0.75,
        }}
      >
        Amara
      </span>

      <span
        className="block w-[70%] h-px"
        style={{ background: ruleColor }}
        aria-hidden
      />

      <span
        className="block uppercase"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: s.africa,
          fontWeight: 400,
          letterSpacing: "0.62em",
          paddingLeft: "0.62em",
          color: africaColor,
          lineHeight: 1,
          marginTop: s.gap,
          marginBottom: s.gap * 0.6,
        }}
      >
        Africa
      </span>

      <span
        className="block uppercase italic"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: s.tagline,
          fontWeight: 400,
          letterSpacing: "0.18em",
          paddingLeft: "0.18em",
          color: taglineColor,
          lineHeight: 1.4,
          marginBottom: s.gap,
        }}
      >
        A Private World of African Luxury
      </span>

      <span
        className="block w-[70%] h-px"
        style={{ background: ruleColor }}
        aria-hidden
      />

      <span
        className="block"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: "var(--font-arabic)",
          fontSize: s.arabic,
          color: arabicColor,
          lineHeight: 1.4,
          marginTop: s.gap * 0.75,
          marginBottom: s.gap * 0.75,
        }}
      >
        أَمَارَا وَ أَفْرِيقَا
      </span>

      <span
        className="block w-[70%] h-px"
        style={{ background: ruleColor }}
        aria-hidden
      />
    </span>
  );
}
