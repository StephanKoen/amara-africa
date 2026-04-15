"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    setStatus("sent");
  };

  return (
    <section
      className="section-x section-y"
      style={{ background: "var(--dd-parchment)" }}
    >
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <p className="label mb-7">The Field Journal</p>
            <h2 className="h2-section">
              A quarterly letter,{" "}
              <span className="gold-italic">quietly written</span>.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="body-copy max-w-[520px]">
              Four times a year we send a single long letter — a field report,
              a season's notes, and the occasional early release. No campaigns.
              No forwarded noise. You may leave at any time.
            </p>

            {status === "idle" ? (
              <form onSubmit={submit} className="mt-12">
                <div className="flex items-end gap-8">
                  <label className="flex-1">
                    <span className="label block mb-4">Your email</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="input-underline"
                      aria-label="Email address"
                    />
                  </label>
                  <button type="submit" className="text-link pb-[15px]">
                    Subscribe &rarr;
                  </button>
                </div>
                <p
                  className="mt-6 text-[12px]"
                  style={{ color: "var(--dd-stone)" }}
                >
                  Four letters per year. Nothing else.
                </p>
              </form>
            ) : (
              <div className="mt-12">
                <p
                  className="font-serif italic text-[24px] leading-snug"
                  style={{ color: "var(--dd-gold-antique)" }}
                >
                  Thank you. We will write when the season turns.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
