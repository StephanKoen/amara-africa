import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
  variant?: "light" | "dark";
};

const sizeMap = {
  sm: "text-[20px]",
  md: "text-[26px]",
  lg: "text-[34px]",
};

const variants = {
  light: {
    dune: "var(--dd-gold-antique)",
    amp: "var(--dd-gold-deep)",
    ampOpacity: 0.7,
    delta: "var(--dd-ink)",
  },
  dark: {
    dune: "var(--dd-gold)",
    amp: "var(--dd-gold-deep)",
    ampOpacity: 0.7,
    delta: "var(--dd-linen)",
  },
} as const;

export default function Logo({
  size = "md",
  href = "/",
  className = "",
  variant = "dark",
}: LogoProps) {
  const v = variants[variant];

  const content = (
    <span
      className={`font-serif ${sizeMap[size]} leading-none tracking-[-0.01em]`}
      aria-label="Dune and Delta"
    >
      <span className="italic" style={{ color: v.dune }}>
        Dune
      </span>
      <span
        className="italic mx-[0.18em]"
        style={{ color: v.amp, opacity: v.ampOpacity }}
      >
        &amp;
      </span>
      <span style={{ color: v.delta }}>Delta</span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={`inline-block ${className}`}>
        {content}
      </Link>
    );
  }

  return <span className={`inline-block ${className}`}>{content}</span>;
}
