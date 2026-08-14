"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

const STRINGS = {
  en: {
    label: "The Field Journal",
    headingLead: "A quarterly letter,",
    headingItalic: "quietly written",
    body:
      "Four times a year we send a single long letter — a field report, a season's notes, and the occasional early release. No campaigns. No forwarded noise. You may leave at any time.",
    emailLabel: "Your email",
    placeholder: "name@example.com",
    subscribe: "Subscribe",
    note: "Four letters per year. Nothing else.",
    thanks: "Thank you. We will write when the season turns.",
  },
  ar: {
    label: "دفتر الرحلات",
    headingLead: "رسالة فصلية،",
    headingItalic: "تُكتب بهدوء",
    body:
      "أربع مرات في السنة نرسل رسالة واحدة طويلة — تقرير ميداني، ومدوّنات موسم، وإصدار مبكر أحياناً. لا حملات، ولا ضجيج مُعاد توجيهه. ولك أن تنسحب متى شئت.",
    emailLabel: "بريدك الإلكتروني",
    placeholder: "name@example.com",
    subscribe: "اشترك",
    note: "أربع رسائل في السنة. لا شيء غيرها.",
    thanks: "شكراً لك. سنكتب إليك حين يتبدّل الموسم.",
  },
} as const;

export default function NewsletterSection({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const t = STRINGS[locale];
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-5">
            <p className="label mb-5">{t.label}</p>
            <h2 className="h2-section">
              {t.headingLead}{" "}
              <span className="gold-italic">{t.headingItalic}</span>.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="body-copy max-w-[520px]">{t.body}</p>

            {status === "idle" ? (
              <form onSubmit={submit} className="mt-9">
                <div className="flex items-end gap-6">
                  <label className="flex-1">
                    <span className="label block mb-3">{t.emailLabel}</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.placeholder}
                      className="input-underline"
                      aria-label={t.emailLabel}
                      dir="ltr"
                    />
                  </label>
                  <button type="submit" className="text-link pb-[15px]">
                    {t.subscribe} <span className="ui-arrow">&rarr;</span>
                  </button>
                </div>
                <p
                  className="mt-5 text-[12px]"
                  style={{ color: "var(--dd-stone)" }}
                >
                  {t.note}
                </p>
              </form>
            ) : (
              <div className="mt-9">
                <p
                  className="font-serif italic text-[24px] leading-snug"
                  style={{ color: "var(--dd-gold-antique)" }}
                >
                  {t.thanks}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
