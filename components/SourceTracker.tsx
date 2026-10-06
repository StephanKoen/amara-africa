"use client";

import { useEffect } from "react";

// First-touch source capture, sitewide. On a visitor's first landing we
// record where they came from — UTM params when present, else the referrer
// host, else direct — in a 60-day cookie the enquiry relay reads. Creator
// links set their own richer cookie; this covers everyone else (an organic
// Instagram profile visit, a Google search, a typed URL).
const KNOWN = [
  ["instagram", /instagram\.|ig\.me/],
  ["tiktok", /tiktok\./],
  ["x", /twitter\.|(^|\.)x\.com|(^|\/\/)t\.co/],
  ["facebook", /facebook\.|fb\.com|fb\.me/],
  ["youtube", /youtube\.|youtu\.be/],
  ["google", /google\./],
  ["bing", /bing\./],
] as const;

export default function SourceTracker() {
  useEffect(() => {
    try {
      if (document.cookie.includes("amara_src=")) return;
      const q = new URLSearchParams(window.location.search);
      let s = (q.get("utm_source") || "").toLowerCase().slice(0, 40);
      let m = (q.get("utm_medium") || q.get("utm_campaign") || "").toLowerCase().slice(0, 60);
      const ref = document.referrer || "";
      const refHost = ref.replace(/^https?:\/\//, "").split("/")[0];
      if (!s) {
        const hit = KNOWN.find(([, rx]) => rx.test(refHost.toLowerCase()));
        if (hit) { s = hit[0]; m = m || "organic"; }
        else if (refHost && !refHost.includes("amarafrica.com")) { s = refHost.slice(0, 40); m = m || "referral"; }
        else { s = "direct"; }
      } else if (!m) m = "campaign";
      const payload = encodeURIComponent(JSON.stringify({ s, m, r: refHost.slice(0, 60), t: Date.now() }));
      document.cookie = `amara_src=${payload}; max-age=${60 * 24 * 60 * 60}; path=/; samesite=lax`;
    } catch {}
  }, []);
  return null;
}
