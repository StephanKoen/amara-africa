"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Meta (Facebook/Instagram) Pixel. Inert until a Pixel ID is provided via
// NEXT_PUBLIC_META_PIXEL_ID (set it in Vercel → Project → Settings → Environment
// Variables, then redeploy). Pixel IDs are public client-side identifiers by
// design, so this is safe to ship. With no ID set, nothing loads or fires.
//
// Events emitted:
//   • PageView  — on first load and on every client-side route change.
//   • Contact   — when a visitor taps a WhatsApp (wa.me) link.
//   • Lead      — fired from EnquireForm on a successful enquiry submission.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

// Small typed helper so callers elsewhere can fire events safely.
export function trackMeta(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  if (fbq) fbq("track", event, params);
}

export default function MetaPixel() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  // Fire PageView on client-side navigations (the base code fires the first one).
  useEffect(() => {
    if (!PIXEL_ID) return;
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    trackMeta("PageView");
  }, [pathname]);

  // Treat a tap on any WhatsApp link as a Contact conversion.
  useEffect(() => {
    if (!PIXEL_ID) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a[href*='wa.me'], a[href*='api.whatsapp.com']");
      if (link) trackMeta("Contact", { method: "whatsapp" });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!PIXEL_ID) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
