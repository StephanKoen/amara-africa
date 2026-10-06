import { NextRequest, NextResponse } from "next/server";

// Relays a submitted enquiry (with any creator attribution) into the master
// portal's enquiry inbox. Runs server-side so the shared secret never
// reaches the browser. Attribution rule: an entered code beats the cookie.
export const dynamic = "force-dynamic";

const PORTAL = process.env.PORTAL_URL || "https://amara-agents.vercel.app";
const SECRET = process.env.AFFILIATE_SECRET || "dev-affiliate-secret";

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({} as Record<string, unknown>));
  const e = (b.enquiry || {}) as Record<string, string>;
  if (!e.name || !e.email) return NextResponse.json({ error: "name and email required" }, { status: 400 });

  let attribution: { code: string; platform: string; method: string; post: string | null } | null = null;
  const entered = String(b.refCode || "").trim().toLowerCase();
  let cookieRef: { c?: string; p?: string; po?: string } = {};
  try {
    cookieRef = JSON.parse(req.cookies.get("amara_ref")?.value || "{}");
  } catch {}
  if (entered) attribution = { code: entered, platform: cookieRef.p || "other", method: "code", post: cookieRef.po || null };
  else if (cookieRef.c) attribution = { code: cookieRef.c, platform: cookieRef.p || "other", method: "cookie", post: cookieRef.po || null };

  try {
    const r = await fetch(`${PORTAL}/api/affiliate/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: SECRET, enquiry: e, attribution }),
    });
    const d = await r.json();
    return NextResponse.json({ ok: r.ok, id: d.id ?? null });
  } catch {
    // The Web3Forms email is the primary channel — a portal hiccup must
    // never fail the visitor's enquiry.
    return NextResponse.json({ ok: false });
  }
}
