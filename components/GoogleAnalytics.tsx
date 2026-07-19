"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Google Analytics 4. The Measurement ID is a public client-side identifier
// by design — safe to commit. Override via NEXT_PUBLIC_GA_ID if it ever
// changes.
//
// Events emitted:
//   • page_view       — on first load and on every client-side route change.
//   • contact_whatsapp — when a visitor taps a WhatsApp (wa.me) link.
//   • generate_lead   — fired from EnquireForm (form: enquiry) and
//                       GuideForm (form: guide) on successful submission.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-MK54EYVD8F";

// Typed helper so forms elsewhere can fire events safely.
export function trackGA(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (gtag) gtag("event", event, params);
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  // The config call fires the first page_view; fire the rest on client-side
  // navigations (send_page_view stays enabled, so only skip the first).
  useEffect(() => {
    if (!GA_ID) return;
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    trackGA("page_view", { page_path: pathname });
  }, [pathname]);

  // Mirror of the Meta Contact event — WhatsApp taps are a conversion.
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a[href*='wa.me'], a[href*='api.whatsapp.com']");
      if (link) trackGA("contact_whatsapp", { method: "whatsapp" });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
