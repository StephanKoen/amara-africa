import { NextRequest, NextResponse } from "next/server";

// Creator affiliate links: amarafrica.com/r/{code}?s=tiktok. Logs the click
// to the portal (server-to-server, shared secret), sets the first-party
// attribution cookie, and lands the visitor on the enquiry page.
export const dynamic = "force-dynamic";

const PORTAL = process.env.PORTAL_URL || "https://amara-agents.vercel.app";
const SECRET = process.env.AFFILIATE_SECRET || "dev-affiliate-secret";
const WINDOW_DAYS = Number(process.env.AFFILIATE_WINDOW_DAYS || 60);

export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  const code = String(params.code || "").toLowerCase().slice(0, 12);
  const s = req.nextUrl.searchParams.get("s") || "";
  const post = (req.nextUrl.searchParams.get("p") || "").slice(0, 16);
  const referrer = req.headers.get("referer") || "";
  const ua = req.headers.get("user-agent") || "";
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";

  // Fire-and-forget click log — a slow portal never delays the redirect.
  try {
    await Promise.race([
      fetch(`${PORTAL}/api/affiliate/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: SECRET, code, s, p: post, referrer, ua, ip }),
      }),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);
  } catch {}

  const res = NextResponse.redirect(new URL(`/enquire?utm_source=creator&utm_campaign=${code}`, req.url));
  // Readable by the enquiry form (not httpOnly by design); carries no
  // personal data — just the code, platform tag and click time.
  res.cookies.set("amara_ref", JSON.stringify({ c: code, p: s || "other", po: post || undefined, t: Date.now() }), {
    maxAge: WINDOW_DAYS * 24 * 60 * 60,
    path: "/",
    sameSite: "lax",
  });
  return res;
}
