type AmaraLogoProps = {
  variant?: "linen" | "dark";
  size?: "nav" | "full";
  className?: string;
};

const GOLD = "#C8962E";
const GOLD_DEEP = "#9A6C1A";
const INK = "#1A1710";
const CREAM = "#EDE8DC";

const ruleStyle = {
  width: "100%",
  height: "1px",
  background: `rgba(154, 108, 26, 0.28)`,
} as const;

export default function AmaraLogo({
  variant = "linen",
  size = "full",
  className = "",
}: AmaraLogoProps) {
  const africaColor = variant === "dark" ? CREAM : INK;

  if (size === "nav") {
    return (
      <span
        className={`inline-flex flex-col items-center text-center ${className}`}
        aria-label="Amara Africa"
      >
        <span
          className="block"
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 36,
            lineHeight: 0.9,
            color: GOLD,
            letterSpacing: "-0.01em",
          }}
        >
          Amara
        </span>
        <span
          className="block mt-[2px] uppercase"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: "0.52em",
            paddingLeft: "0.52em",
            color: africaColor,
            lineHeight: 1,
          }}
        >
          Africa
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex flex-col items-center text-center ${className}`}
      aria-label="Amara Africa"
    >
      {/* Top rule */}
      <span className="block" style={ruleStyle} aria-hidden />

      {/* Amara — Great Vibes cursive */}
      <span
        className="block mt-4 mb-3"
        style={{
          fontFamily: '"Great Vibes", cursive',
          fontSize: 150,
          lineHeight: 0.85,
          color: GOLD,
          letterSpacing: "-0.01em",
        }}
      >
        Amara
      </span>

      {/* Mid rule */}
      <span className="block" style={ruleStyle} aria-hidden />

      {/* AFRICA — Cormorant Garamond uppercase */}
      <span
        className="block mt-4 mb-3 uppercase"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 28,
          fontWeight: 400,
          letterSpacing: "0.62em",
          paddingLeft: "0.62em",
          color: africaColor,
          lineHeight: 1,
        }}
      >
        Africa
      </span>

      {/* Tagline — Cormorant Garamond italic */}
      <span
        className="block mb-4 uppercase italic"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: "0.18em",
          paddingLeft: "0.18em",
          color: `rgba(154, 108, 26, 0.85)`,
          lineHeight: 1.4,
        }}
      >
        A Private World of African Luxury
      </span>

      {/* Lower rule */}
      <span className="block" style={ruleStyle} aria-hidden />

      {/* Arabic */}
      <span
        className="block mt-3 mb-3"
        dir="rtl"
        lang="ar"
        style={{
          fontFamily: '"Noto Naskh Arabic", serif',
          fontSize: 18,
          fontWeight: 500,
          color: GOLD,
          lineHeight: 1.4,
        }}
      >
        أَمَارَا وَ أَفْرِيقَا
      </span>

      {/* Bottom rule */}
      <span className="block" style={ruleStyle} aria-hidden />
    </span>
  );
}
