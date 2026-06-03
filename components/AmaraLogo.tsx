type AmaraLogoProps = {
  variant?: "linen" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

// Per-size type scale (px). Layout: Amara → AFRICA → Arabic (tight) → tagline.
const SCALE = {
  sm: { amara: 64, africa: 12, arabic: 10, tagline: 8 },
  md: { amara: 120, africa: 22, arabic: 17, tagline: 13 },
  lg: { amara: 180, africa: 34, arabic: 26, tagline: 19 },
} as const;

export default function AmaraLogo({
  variant = "linen",
  size = "md",
  className = "",
}: AmaraLogoProps) {
  const s = SCALE[size];
  const dark = variant === "dark";

  const amaraColor = "#C8962E";
  const africaColor = dark ? "#EDE8DC" : "#1A1710";
  const arabicColor = "#C8962E";
  const taglineColor = dark ? "rgba(200,168,74,0.88)" : "rgba(154,108,26,0.92)";

  return (
    <span
      className={`inline-flex flex-col items-center text-center ${className}`}
      aria-label="Amara Africa"
    >
      {/* Amara — Great Vibes cursive */}
      <span
        className="block"
        style={{
          fontFamily: "var(--font-cursive)",
          fontSize: s.amara,
          lineHeight: 0.85,
          color: amaraColor,
        }}
      >
        Amara
      </span>

      {/* AFRICA — Cormorant Garamond, spaced */}
      <span
        className="block uppercase"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: s.africa,
          fontWeight: 400,
          letterSpacing: "0.58em",
          paddingLeft: "0.58em",
          color: africaColor,
          lineHeight: 1,
          marginTop: s.africa * 0.9,
        }}
      >
        Africa
      </span>

      {/* Arabic — tight beneath AFRICA */}
      <span
        className="block"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: "var(--font-arabic)",
          fontSize: s.arabic,
          color: arabicColor,
          lineHeight: 1.3,
          marginTop: s.arabic * 0.35,
        }}
      >
        أَمَارَا وَ أَفْرِيقَا
      </span>

      {/* Tagline — Title-Case italic, set apart at the bottom */}
      <span
        className="block italic"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: s.tagline,
          fontWeight: 400,
          letterSpacing: "0.04em",
          color: taglineColor,
          lineHeight: 1.4,
          marginTop: s.tagline * 2.4,
        }}
      >
        A Private World of African Luxury
      </span>
    </span>
  );
}
