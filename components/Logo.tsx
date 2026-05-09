import type { CSSProperties } from "react";

type LogoProps = {
  variant?: "nav" | "footer" | "full";
  theme?: "dark" | "light";
  className?: string;
};

const themeColors = {
  dark: { dune: "#D4AA68", amp: "#B89050", delta: "#FFFFFF" },
  light: { dune: "#9A6018", amp: "#B89050", delta: "#1A1610" },
} as const;

const ARABIC = "أمارا أفريقيا";

const arabicFont: CSSProperties = {
  fontFamily: '"Noto Naskh Arabic", "Playfair Display", serif',
};

function IconMark({ width, height }: { width: number; height: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 88 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 38 Q8 16 16 26 Q21 33 27 20 Q31 11 36 20 Q39 26 44 20"
        stroke="#D4AA68"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="64"
        y1="8"
        x2="64"
        y2="36"
        stroke="#C8C0AA"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="64"
        y1="36"
        x2="52"
        y2="44"
        stroke="#C8C0AA"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="64"
        y1="36"
        x2="76"
        y2="44"
        stroke="#C8C0AA"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="44" cy="38" r="2" fill="#D4AA68" />
      <line
        x1="2"
        y1="43"
        x2="86"
        y2="43"
        stroke="rgba(200,185,150,0.2)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function NavVariant({ theme }: { theme: "dark" | "light" }) {
  const deltaColor = theme === "dark" ? "#FFFFFF" : "#1A1610";
  return (
    <span
      className="inline-flex flex-col items-start"
      aria-label="Amara Africa"
    >
      {/* English wordmark */}
      <span className="font-serif leading-none flex items-baseline">
        <span
          className="italic"
          style={{
            color: "#C8962E",
            fontSize: 38,
            letterSpacing: "-0.005em",
          }}
        >
          Amara
        </span>
        <span
          style={{
            color: deltaColor,
            fontSize: 38,
            letterSpacing: "-0.005em",
            marginLeft: "0.25em",
          }}
        >
          Africa
        </span>
      </span>
      {/* Hairline rule */}
      <span
        className="block"
        style={{
          width: "100%",
          height: "1px",
          background: "rgba(200,160,60,0.4)",
          margin: "7px 0 6px",
        }}
        aria-hidden
      />
      {/* Arabic line */}
      <span
        className="block leading-[1.2]"
        dir="rtl"
        lang="ar"
        style={{
          ...arabicFont,
          fontSize: 18,
          fontWeight: 500,
          color: "#C8962E",
          width: "100%",
          textAlign: "center",
        }}
      >
        {ARABIC}
      </span>
    </span>
  );
}

function FooterVariant({ theme }: { theme: "dark" | "light" }) {
  const c = themeColors[theme];
  return (
    <span
      className="inline-flex flex-col items-start"
      aria-label="Amara Africa"
    >
      <IconMark width={52} height={30} />
      <span className="mt-3 font-serif leading-none flex items-baseline">
        <span className="italic" style={{ color: c.dune, fontSize: 20 }}>
          Amara
        </span>
        <span style={{ color: "#F0EBE0", fontSize: 20, marginLeft: "0.25em" }}>Africa</span>
      </span>
      <span
        className="block mt-3"
        style={{
          width: 72,
          height: "0.5px",
          background: "rgba(200,185,150,0.18)",
        }}
        aria-hidden
      />
      <span
        className="mt-3 leading-[1.2]"
        dir="rtl"
        lang="ar"
        style={{
          ...arabicFont,
          fontSize: 16,
          color: "#C8A84A",
        }}
      >
        {ARABIC}
      </span>
      <span
        className="mt-2 uppercase"
        style={{
          fontSize: 7,
          letterSpacing: "0.28em",
          color: "rgba(200,185,150,0.35)",
        }}
      >
        Est. 2025
      </span>
    </span>
  );
}

function FullVariant({ theme }: { theme: "dark" | "light" }) {
  const c = themeColors[theme];
  return (
    <span
      className="inline-flex flex-col items-center text-center"
      aria-label="Amara Africa"
    >
      <IconMark width={64} height={36} />
      <span className="mt-4 font-serif leading-none flex items-baseline">
        <span className="italic" style={{ color: c.dune, fontSize: 26 }}>
          Amara
        </span>
        <span style={{ color: c.delta, fontSize: 26, marginLeft: "0.25em" }}>Africa</span>
      </span>
      <span
        className="block mt-4"
        style={{
          width: 88,
          height: "0.5px",
          background: "rgba(200,185,150,0.18)",
        }}
        aria-hidden
      />
      <span
        className="mt-4 leading-[1.2]"
        dir="rtl"
        lang="ar"
        style={{
          ...arabicFont,
          fontSize: 18,
          color: "#C8A84A",
        }}
      >
        {ARABIC}
      </span>
      <span
        className="mt-3 uppercase"
        style={{
          fontSize: 8,
          letterSpacing: "0.28em",
          color: "rgba(200,185,150,0.5)",
        }}
      >
        Private African Journeys · Crafted for the Gulf
      </span>
    </span>
  );
}

export default function Logo({
  variant = "nav",
  theme = "dark",
  className = "",
}: LogoProps) {
  const content =
    variant === "nav" ? (
      <NavVariant theme={theme} />
    ) : variant === "footer" ? (
      <FooterVariant theme={theme} />
    ) : (
      <FullVariant theme={theme} />
    );

  return <span className={`inline-block ${className}`}>{content}</span>;
}
