"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isArabicPath, toArabicPath, toEnglishPath } from "@/lib/i18n";

// The English ⇄ العربية switch, aware of the current page so it lands on the
// same page in the other language. Used in the nav and the footer.

export default function LanguageToggle({
  tone = "dark",
}: {
  tone?: "dark" | "light";
}) {
  const pathname = usePathname() ?? "/";
  const onArabic = isArabicPath(pathname);

  const activeColor = "var(--dd-gold)";
  const idleColor = tone === "dark" ? "var(--dd-stone)" : "rgba(26,22,16,0.5)";

  return (
    <span className="inline-flex items-center gap-3">
      <Link
        href={onArabic ? toEnglishPath(pathname) : pathname}
        className="text-[11px] uppercase transition-colors duration-300 hover:text-[color:var(--dd-gold)]"
        style={{
          color: onArabic ? idleColor : activeColor,
          letterSpacing: "0.3em",
        }}
        aria-current={onArabic ? undefined : "true"}
      >
        English
      </Link>
      <span
        className="block w-px h-[10px]"
        style={{ background: "rgba(200,185,150,0.22)" }}
        aria-hidden
      />
      <Link
        href={onArabic ? pathname : toArabicPath(pathname)}
        lang="ar"
        dir="rtl"
        className="text-[13px] transition-colors duration-300 hover:text-[color:var(--dd-gold)]"
        style={{
          color: onArabic ? activeColor : idleColor,
          fontFamily: "var(--font-arabic)",
        }}
        aria-current={onArabic ? "true" : undefined}
      >
        العربية
      </Link>
    </span>
  );
}
