import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
};

const sizeMap = {
  sm: "text-[20px]",
  md: "text-[26px]",
  lg: "text-[34px]",
};

export default function Logo({ size = "md", href = "/", className = "" }: LogoProps) {
  const content = (
    <span
      className={`font-serif ${sizeMap[size]} leading-none tracking-[-0.01em]`}
      aria-label="Dune and Delta"
    >
      <span className="italic" style={{ color: "var(--color-gold)" }}>
        Dune
      </span>
      <span
        className="italic mx-[0.18em]"
        style={{ color: "rgba(212,170,104,0.55)" }}
      >
        &amp;
      </span>
      <span style={{ color: "var(--color-cream)" }}>Delta</span>
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
