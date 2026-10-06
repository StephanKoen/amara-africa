import { NextRequest, NextResponse } from "next/server";

// The single enquiry pipeline. Every submission: (1) lands in the master
// portal's enquiry inbox with its source attached, and (2) is emailed to the
// reservations team. Creator attribution (cookie or entered code) and the
// sitewide first-touch source cookie are both read here, server-side.
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const PORTAL = process.env.PORTAL_URL || "https://amara-agents.vercel.app";
const SECRET = process.env.AFFILIATE_SECRET || "dev-affiliate-secret";
type Attribution = { code: string; platform: string; method: string; post: string | null };

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({} as Record<string, unknown>));
  const e = (b.enquiry || {}) as Record<string, string>;
  if (!e.name || !e.email) return NextResponse.json({ error: "name and email required" }, { status: 400 });

  // Creator attribution: entered code beats the creator-link cookie.
  let attribution: Attribution | null = null;
  const entered = String(b.refCode || "").trim().toLowerCase();
  let cookieRef: { c?: string; p?: string; po?: string } = {};
  try {
    cookieRef = JSON.parse(req.cookies.get("amara_ref")?.value || "{}");
  } catch {}
  if (entered) attribution = { code: entered, platform: cookieRef.p || "other", method: "code", post: cookieRef.po || null };
  else if (cookieRef.c) attribution = { code: cookieRef.c, platform: cookieRef.p || "other", method: "cookie", post: cookieRef.po || null };

  // First-touch source for everyone else: instagram·organic, google, direct…
  let source: { s?: string; m?: string; r?: string } = {};
  try {
    source = JSON.parse(req.cookies.get("amara_src")?.value || "{}");
  } catch {}
  const sourceLabel = attribution
    ? `Creator link ${attribution.code} · ${attribution.platform}${attribution.post ? ` · post ${attribution.post}` : ""}${attribution.method === "code" ? " (code entered)" : ""}`
    : source.s
    ? `${source.s}${source.m ? ` · ${source.m}` : ""}${source.r ? ` · from ${source.r}` : ""}`
    : "Direct";

  // 1) Master portal inbox — the system of record.
  let portalOk = false;
  try {
    const r = await fetch(`${PORTAL}/api/affiliate/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: SECRET,
        enquiry: e,
        attribution,
        source: { s: String(source.s || "").slice(0, 40), m: String(source.m || "").slice(0, 60), r: String(source.r || "").slice(0, 60) },
      }),
    });
    portalOk = r.ok;
  } catch {}

  return NextResponse.json({ ok: true, portal: portalOk, sourceLabel });
}
