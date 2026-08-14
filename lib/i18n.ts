// Locale plumbing for the bilingual site. English lives at the root URLs;
// Arabic mirrors them under /ar. Only the routes listed here exist in both
// languages — anything else (guide, trip-design) falls back to the Arabic home.

export type Locale = "en" | "ar";

const LOCALIZED_ROOTS = ["", "/journeys", "/the-experience", "/about", "/enquire"];

export function localeHref(locale: Locale, path: string): string {
  if (locale === "en") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

/** The Arabic counterpart of an English pathname (or /ar if none exists). */
export function toArabicPath(pathname: string): string {
  if (pathname === "/") return "/ar";
  if (pathname.startsWith("/journeys/")) return `/ar${pathname}`;
  return LOCALIZED_ROOTS.includes(pathname) ? `/ar${pathname}` : "/ar";
}

/** The English counterpart of an Arabic pathname. */
export function toEnglishPath(pathname: string): string {
  const stripped = pathname.replace(/^\/ar(?=\/|$)/, "");
  return stripped || "/";
}

export function isArabicPath(pathname: string): boolean {
  return pathname === "/ar" || pathname.startsWith("/ar/");
}
