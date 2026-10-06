"use client";

import { useState } from "react";

// The Cape Town Takeover × Amara — the event travel desk. Themed on
// YogiLab's own identity (black ground, gold, condensed caps, the flask
// mark) per the sponsorship deck: Mind Matters Summit 2026 · Mental Mastery
// Week · 20–27 October · Cape Town. Requests run the standard pipeline —
// master portal (attributed to The Yogi Lab, code beats cookie) and the
// three team inboxes.
const YOGILAB_CODE = "8ves67";

const WEB3FORMS_KEYS = (
  process.env.NEXT_PUBLIC_WEB3FORMS_KEYS ??
  "99c172f6-b2c2-4520-ba4e-10ae96846519,0c8ed8eb-bf9b-4ca4-8974-308c4a4298e8,7cd46ef5-0c82-467f-8969-9d54d6cf1e52"
).split(",").map((k) => k.trim()).filter(Boolean);

const NEEDS = ["Flights", "Hotel", "Airport transfers", "Excursions & experiences", "The full journey"];

const PHOTOS: Array<[string, string]> = [
  ["/images/journeys/the-cape-and-kruger/cape-town/04.jpg", "Table Mountain at dusk"],
  ["/images/itineraries/ultimate-luxury-south-africa/hero.jpg", "The V&A Waterfront from above"],
  ["/images/journeys/the-cape-and-kruger/cape-town/02.jpg", "The marina, Cape Town"],
];

// YogiLab's flask-and-meditator mark, drawn inline.
function YogiMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M19 6 h10 M21 6 v9 c0 2 -0.5 3 -1.6 4.4 C14.5 23.5 11 28.6 11 33.2 11 40 16.8 44 24 44 s13 -4 13 -10.8 c0 -4.6 -3.5 -9.7 -8.4 -13.8 C27.5 18 27 17 27 15 V6"
        stroke="#f2ead8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="26.5" r="2.6" fill="#f2ead8" />
      <path d="M24 30 c-3.4 0 -6 2.4 -6.6 5.4 h13.2 C30 32.4 27.4 30 24 30 Z" fill="#f2ead8" />
      <path d="M17.4 35.4 c1.4 -1.1 2.8 -1.4 2.8 -1.4 M30.6 35.4 c-1.4 -1.1 -2.8 -1.4 -2.8 -1.4" stroke="#f2ead8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function YogiLabPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", dates: "", party: "", message: "" });
  const [needs, setNeeds] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggleNeed = (n: string) => setNeeds((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      setErr("Your name and a valid email, please.");
      return;
    }
    setSending(true);
    setErr("");
    const enquiry = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      country: form.country,
      journey: "Yogi Lab — Cape Town Takeover (Oct 2026)",
      dates: form.dates,
      party: form.party,
      message: `Needs: ${needs.length ? needs.join(", ") : "not specified"}${form.message ? `\n\n${form.message}` : ""}`,
      lang: "en",
    };
    try {
      const r = await fetch("/api/ref-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiry, refCode: YOGILAB_CODE }),
      });
      const relay = await r.json().catch(() => ({ ok: false, sourceLabel: "" }));
      const payload = {
        subject: `Cape Town Takeover — travel request — ${form.name}`,
        from_name: "The Cape Town Takeover × Amara Africa",
        replyto: form.email,
        Name: form.name,
        Email: form.email,
        Phone: form.phone || "—",
        Country: form.country || "—",
        Event: "Cape Town Takeover · Mind Matters Summit 2026 · 20–27 Oct",
        "Travel needs": needs.length ? needs.join(", ") : "—",
        "Travel dates": form.dates || "—",
        "Party size": form.party || "—",
        Message: form.message || "—",
        Source: relay.sourceLabel || "Yogi Lab event page",
      };
      const sends = await Promise.allSettled(
        WEB3FORMS_KEYS.map((access_key) =>
          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ access_key, ...payload }),
          }).then((res) => res.json())
        )
      );
      const emailed = sends.some((s) => s.status === "fulfilled" && (s.value as { success?: boolean })?.success);
      if (emailed || relay.ok) setDone(true);
      else throw new Error("We couldn't send your request just now — please email Lloyd@amarafrica.com.");
    } catch (e2) {
      setErr(String((e2 as Error).message || e2));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="yl-root">
      <header className="yl-head">
        <span className="yl-mark">
          <YogiMark />
          <span className="yl-word">yogilab</span>
        </span>
        <span className="yl-x">×</span>
        <span className="yl-amara"><em>Amara</em> AFRICA</span>
      </header>

      <section className="yl-hero">
        <div>
          <p className="yl-kicker">Mind Matters Summit™ 2026 · Mental Mastery Week</p>
          <h1>
            CAPE TOWN
            <span className="yl-sub">MEDITATOR CITY TAKEOVER</span>
          </h1>
          <p className="yl-dates">20 – 27 October · Cape Town</p>
          <p className="yl-lead">
            A city-wide mass meditation and creator summit — and Amara Africa is
            carrying the journeys there. Flights, hotels, airport transfers and
            the excursions worth adding around Mental Mastery Week. Tell us what
            you need and a person writes back within a working day.
          </p>
          <div className="yl-offer">
            {["Flights", "Hotels", "Transfers", "Excursions"].map((o) => (
              <span key={o}>{o}</span>
            ))}
          </div>
        </div>
        <div className="yl-photos">
          {PHOTOS.map(([src, alt], i) => (
            <img key={src} src={src} alt={alt} loading={i > 0 ? "lazy" : undefined} />
          ))}
        </div>
      </section>

      <section className="yl-form-wrap">
        {done ? (
          <div className="yl-done">
            <h2>RECEIVED. <span>Settle the mind — the travel is handled.</span></h2>
            <p>
              Your request is with the Amara desk — a person will write to you
              personally within one working day with options and prices for the
              Takeover.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="yl-form">
            <h2>YOUR TRAVEL REQUEST</h2>
            <div className="yl-grid">
              <label>
                Your name *
                <input value={form.name} onChange={set("name")} placeholder="As per passport" />
              </label>
              <label>
                Email *
                <input type="email" value={form.email} onChange={set("email")} placeholder="Replies come here" />
              </label>
              <label>
                Phone
                <input value={form.phone} onChange={set("phone")} placeholder="+..." />
              </label>
              <label>
                Country of residence
                <input value={form.country} onChange={set("country")} placeholder="Where you fly from" />
              </label>
              <label>
                Travel dates
                <input value={form.dates} onChange={set("dates")} placeholder="Around 20–27 Oct — e.g. arrive the 18th, leave the 30th" />
              </label>
              <label>
                Party size
                <input value={form.party} onChange={set("party")} placeholder="e.g. 2 adults" />
              </label>
            </div>

            <p className="yl-needs-label">What should we carry for you?</p>
            <div className="yl-needs">
              {NEEDS.map((n) => (
                <button type="button" key={n} className={needs.includes(n) ? "on" : ""} onClick={() => toggleNeed(n)}>
                  {n}
                </button>
              ))}
            </div>

            <label className="yl-msg">
              Anything else
              <textarea rows={3} value={form.message} onChange={set("message")} placeholder="Dietary notes, room preferences, who you're travelling with…" />
            </label>

            {err && <p className="yl-err">{err}</p>}
            <button type="submit" className="yl-submit" disabled={sending}>
              {sending ? "SENDING…" : "SEND MY REQUEST →"}
            </button>
            <p className="yl-privacy">
              Your details go only to the Amara reservations team. Travel arranged by Amara Africa · amarafrica.com
            </p>
          </form>
        )}
      </section>

      <footer className="yl-foot">
        <p>Cape Town Takeover · Mind Matters Summit™ 2026 · travel by Amara Africa — amarafrica.com</p>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .yl-root { min-height: 100vh; background: #0b0a08; color: #f2ead8; font-family: "Jost", "Helvetica Neue", sans-serif; font-weight: 300; }
        .yl-head { display: flex; align-items: center; gap: 16px; padding: 22px 6vw; border-bottom: 1px solid rgba(242,234,216,.14); }
        .yl-mark { display: flex; align-items: center; gap: 10px; }
        .yl-word { font-size: 17px; letter-spacing: .06em; font-weight: 400; }
        .yl-x { color: #c9a24a; font-size: 18px; }
        .yl-amara { font-size: 12px; letter-spacing: .26em; }
        .yl-amara em { font-family: "Cormorant Garamond", Georgia, serif; font-style: italic; font-size: 17px; letter-spacing: .04em; color: #c9a24a; }
        .yl-hero { display: grid; grid-template-columns: minmax(340px, 1.1fr) 1fr; gap: 44px; padding: 7vh 6vw 5vh; align-items: center; }
        .yl-kicker { font-size: 11px; letter-spacing: .3em; text-transform: uppercase; color: #c9a24a; margin: 0 0 18px; }
        .yl-hero h1 { font-family: "Oswald", "Arial Narrow", sans-serif; font-weight: 600; font-size: clamp(44px, 6vw, 84px); line-height: .96; margin: 0; letter-spacing: .01em; }
        .yl-sub { display: block; color: #c9a24a; font-size: clamp(19px, 2.4vw, 32px); font-weight: 500; letter-spacing: .14em; margin-top: 10px; }
        .yl-dates { font-family: "Cormorant Garamond", Georgia, serif; font-style: italic; font-size: 19px; color: rgba(242,234,216,.85); margin: 16px 0 0; }
        .yl-lead { max-width: 480px; font-size: 15px; line-height: 1.75; color: rgba(242,234,216,.72); margin: 14px 0 26px; }
        .yl-offer { display: flex; gap: 10px; flex-wrap: wrap; }
        .yl-offer span { border: 1px solid #c9a24a; color: #c9a24a; padding: 7px 16px; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; border-radius: 999px; }
        .yl-photos { display: grid; grid-template-columns: 1.4fr 1fr; grid-auto-rows: 150px; gap: 6px; }
        .yl-photos img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .yl-photos img:first-child { grid-row: span 2; }
        .yl-form-wrap { padding: 2vh 6vw 8vh; max-width: 880px; }
        .yl-form h2, .yl-done h2 { font-family: "Oswald", "Arial Narrow", sans-serif; font-weight: 500; font-size: 24px; letter-spacing: .1em; margin: 0 0 22px; }
        .yl-done h2 span { display: block; font-family: "Cormorant Garamond", Georgia, serif; font-style: italic; font-weight: 400; font-size: 20px; letter-spacing: 0; text-transform: none; color: #c9a24a; margin-top: 8px; }
        .yl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 22px; }
        .yl-form label { display: block; font-size: 10.5px; letter-spacing: .18em; text-transform: uppercase; color: rgba(242,234,216,.55); }
        .yl-form input, .yl-form textarea {
          display: block; width: 100%; margin-top: 7px; padding: 12px 13px; font-size: 15px;
          font-family: inherit; color: #f2ead8; background: rgba(255,255,255,.05);
          border: 1px solid rgba(242,234,216,.2); border-radius: 2px; outline: none; box-sizing: border-box;
          transition: border-color .2s;
        }
        .yl-form input::placeholder, .yl-form textarea::placeholder { color: rgba(242,234,216,.35); }
        .yl-form input:focus, .yl-form textarea:focus { border-color: #c9a24a; }
        .yl-needs-label { font-size: 10.5px; letter-spacing: .18em; text-transform: uppercase; color: rgba(242,234,216,.55); margin: 24px 0 10px; }
        .yl-needs { display: flex; gap: 8px; flex-wrap: wrap; }
        .yl-needs button {
          font-family: inherit; font-size: 13px; padding: 9px 16px; cursor: pointer;
          background: transparent; color: #f2ead8; border: 1px solid rgba(242,234,216,.3); border-radius: 999px;
          transition: all .15s;
        }
        .yl-needs button.on { background: #c9a24a; border-color: #c9a24a; color: #0b0a08; font-weight: 400; }
        .yl-msg { margin-top: 22px; }
        .yl-err { color: #e08a5a; font-size: 13.5px; margin: 14px 0 0; }
        .yl-submit {
          margin-top: 24px; padding: 15px 32px; font-family: "Oswald", sans-serif; font-size: 13px;
          letter-spacing: .22em; cursor: pointer; font-weight: 500;
          background: #c9a24a; color: #0b0a08; border: none; border-radius: 2px; transition: background .2s;
        }
        .yl-submit:hover { background: #dcb65e; }
        .yl-submit:disabled { opacity: .7; cursor: default; }
        .yl-privacy { font-size: 12px; color: rgba(242,234,216,.45); margin-top: 16px; max-width: 460px; line-height: 1.6; }
        .yl-done p { font-size: 15px; line-height: 1.75; color: rgba(242,234,216,.75); max-width: 480px; }
        .yl-foot { border-top: 1px solid rgba(242,234,216,.14); padding: 22px 6vw; font-size: 11px; letter-spacing: .14em; color: rgba(242,234,216,.45); }
        @media (max-width: 820px) {
          .yl-hero { grid-template-columns: 1fr; padding-top: 5vh; }
          .yl-photos { grid-auto-rows: 120px; }
          .yl-grid { grid-template-columns: 1fr; }
        }
      `,
        }}
      />
    </div>
  );
}
