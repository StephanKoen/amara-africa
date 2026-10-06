"use client";

import { useState } from "react";

// The Yogi Lab × Amara — Cape Town event travel desk. A co-branded page of
// its own (sage & cream, apart from the Amara house look) whose request form
// runs the same pipeline as every enquiry: master portal + the three team
// inboxes, attributed to The Yogi Lab whether or not a referral cookie made
// it through an in-app browser.
const YOGILAB_CODE = "8ves67";

const WEB3FORMS_KEYS = (
  process.env.NEXT_PUBLIC_WEB3FORMS_KEYS ??
  "99c172f6-b2c2-4520-ba4e-10ae96846519,0c8ed8eb-bf9b-4ca4-8974-308c4a4298e8,7cd46ef5-0c82-467f-8969-9d54d6cf1e52"
).split(",").map((k) => k.trim()).filter(Boolean);

const NEEDS = ["Flights", "Hotel", "Airport transfers", "Excursions & experiences", "The full journey"];

const PHOTOS: Array<[string, string]> = [
  ["/images/itineraries/ultimate-luxury-south-africa/hero.jpg", "The V&A Waterfront from above"],
  ["/images/journeys/the-cape-and-kruger/cape-town/04.jpg", "Table Mountain at dusk"],
  ["/images/journeys/the-cape-and-kruger/cape-town/02.jpg", "The marina, Cape Town"],
];

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
      journey: "The Yogi Lab — Cape Town",
      dates: form.dates,
      party: form.party,
      message: `Needs: ${needs.length ? needs.join(", ") : "not specified"}${form.message ? `\n\n${form.message}` : ""}`,
      lang: "en",
    };
    try {
      // 1) Master portal, attributed to The Yogi Lab (code beats any cookie).
      const r = await fetch("/api/ref-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiry, refCode: YOGILAB_CODE }),
      });
      const relay = await r.json().catch(() => ({ ok: false, sourceLabel: "" }));
      // 2) The team's three inboxes.
      const payload = {
        subject: `Yogi Lab Cape Town — travel request — ${form.name}`,
        from_name: "The Yogi Lab × Amara Africa",
        replyto: form.email,
        Name: form.name,
        Email: form.email,
        Phone: form.phone || "—",
        Country: form.country || "—",
        Event: "The Yogi Lab — Cape Town",
        "Travel needs": needs.length ? needs.join(", ") : "—",
        "Travel dates": form.dates || "—",
        "Party size": form.party || "—",
        Message: form.message || "—",
        Source: relay.sourceLabel || `Yogi Lab collab page`,
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
        <p className="yl-brand">
          THE YOGI LAB <span className="yl-x">×</span> <em>Amara</em> AFRICA
        </p>
      </header>

      <section className="yl-hero">
        <div>
          <p className="yl-kicker">Cape Town · the event travel desk</p>
          <h1>
            Come for the practice.
            <br />
            <em>Stay for Cape Town.</em>
          </h1>
          <p className="yl-lead">
            Travelling for The Yogi Lab&rsquo;s Cape Town event? Amara Africa is
            carrying the journeys — flights, hotels, airport transfers and the
            excursions worth adding around the event. Tell us what you need and a
            person writes back within a working day.
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
            <h2>Received, <em>with thanks.</em></h2>
            <p>
              Your request is with the Amara desk — a person will write to you
              personally within one working day with options and prices.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="yl-form">
            <h2>Your travel request</h2>
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
                <input value={form.phone} onChange={set("phone")} placeholder="+971 …" />
              </label>
              <label>
                Country of residence
                <input value={form.country} onChange={set("country")} placeholder="e.g. United Arab Emirates" />
              </label>
              <label>
                Travel dates
                <input value={form.dates} onChange={set("dates")} placeholder="Around the event — e.g. 3 nights before, 2 after" />
              </label>
              <label>
                Party size
                <input value={form.party} onChange={set("party")} placeholder="e.g. 2 adults" />
              </label>
            </div>

            <p className="yl-needs-label">What should we carry for you?</p>
            <div className="yl-needs">
              {NEEDS.map((n) => (
                <button
                  type="button"
                  key={n}
                  className={needs.includes(n) ? "on" : ""}
                  onClick={() => toggleNeed(n)}
                >
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
              {sending ? "Sending…" : "Send my request →"}
            </button>
            <p className="yl-privacy">
              Your details go only to the Amara reservations team. Travel arranged by Amara Africa · amarafrica.com
            </p>
          </form>
        )}
      </section>

      <footer className="yl-foot">
        <p>The Yogi Lab × Amara Africa · Cape Town · travel by amarafrica.com</p>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .yl-root { min-height: 100vh; background: #f3efe4; color: #24352b; font-family: "Jost", "Helvetica Neue", sans-serif; font-weight: 300; }
        .yl-head { padding: 26px 6vw; border-bottom: 1px solid rgba(36,53,43,.14); }
        .yl-brand { font-size: 13px; letter-spacing: .28em; }
        .yl-brand em { font-family: "Cormorant Garamond", Georgia, serif; font-style: italic; font-size: 17px; letter-spacing: .04em; }
        .yl-x { color: #8a9c6a; margin: 0 .35em; }
        .yl-hero { display: grid; grid-template-columns: minmax(340px, 1.1fr) 1fr; gap: 40px; padding: 7vh 6vw 5vh; align-items: center; }
        .yl-kicker { font-size: 11px; letter-spacing: .3em; text-transform: uppercase; color: #8a9c6a; margin: 0 0 18px; }
        .yl-hero h1 { font-family: "Cormorant Garamond", Georgia, serif; font-weight: 400; font-size: clamp(34px, 4.4vw, 56px); line-height: 1.06; margin: 0; }
        .yl-hero h1 em { color: #8a9c6a; }
        .yl-lead { max-width: 480px; font-size: 15px; line-height: 1.75; color: rgba(36,53,43,.75); margin: 20px 0 26px; }
        .yl-offer { display: flex; gap: 10px; flex-wrap: wrap; }
        .yl-offer span { border: 1px solid rgba(36,53,43,.25); padding: 7px 16px; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; border-radius: 999px; }
        .yl-photos { display: grid; grid-template-columns: 1.4fr 1fr; grid-auto-rows: 150px; gap: 8px; }
        .yl-photos img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 4px; }
        .yl-photos img:first-child { grid-row: span 2; }
        .yl-form-wrap { padding: 2vh 6vw 8vh; max-width: 860px; }
        .yl-form h2, .yl-done h2 { font-family: "Cormorant Garamond", Georgia, serif; font-weight: 400; font-size: 28px; margin: 0 0 20px; }
        .yl-done h2 em, .yl-form h2 em { color: #8a9c6a; font-style: italic; }
        .yl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 22px; }
        .yl-form label { display: block; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: rgba(36,53,43,.6); }
        .yl-form input, .yl-form textarea {
          display: block; width: 100%; margin-top: 7px; padding: 12px 13px; font-size: 15px;
          font-family: inherit; color: #24352b; background: #fbf9f2;
          border: 1px solid rgba(36,53,43,.2); border-radius: 3px; outline: none; box-sizing: border-box;
          transition: border-color .2s;
        }
        .yl-form input:focus, .yl-form textarea:focus { border-color: #8a9c6a; }
        .yl-needs-label { font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: rgba(36,53,43,.6); margin: 24px 0 10px; }
        .yl-needs { display: flex; gap: 8px; flex-wrap: wrap; }
        .yl-needs button {
          font-family: inherit; font-size: 13px; padding: 9px 16px; cursor: pointer;
          background: #fbf9f2; color: #24352b; border: 1px solid rgba(36,53,43,.25); border-radius: 999px;
          transition: all .15s;
        }
        .yl-needs button.on { background: #8a9c6a; border-color: #8a9c6a; color: #fbf9f2; }
        .yl-msg { margin-top: 22px; }
        .yl-err { color: #a3542c; font-size: 13.5px; margin: 14px 0 0; }
        .yl-submit {
          margin-top: 24px; padding: 14px 30px; font-family: inherit; font-size: 12px;
          letter-spacing: .22em; text-transform: uppercase; cursor: pointer;
          background: #24352b; color: #f3efe4; border: none; border-radius: 2px; transition: background .2s;
        }
        .yl-submit:hover { background: #8a9c6a; }
        .yl-submit:disabled { opacity: .7; cursor: default; }
        .yl-privacy { font-size: 12px; color: rgba(36,53,43,.5); margin-top: 16px; max-width: 460px; line-height: 1.6; }
        .yl-done p { font-size: 15px; line-height: 1.75; color: rgba(36,53,43,.75); max-width: 480px; }
        .yl-foot { border-top: 1px solid rgba(36,53,43,.14); padding: 22px 6vw; font-size: 11.5px; letter-spacing: .12em; color: rgba(36,53,43,.5); }
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
