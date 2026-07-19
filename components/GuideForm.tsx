"use client";

import { useState } from "react";
import { trackMeta } from "./MetaPixel";

const GCC_COUNTRIES = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
];

const GUIDE_PDF = "/guides/the-gulf-familys-guide-to-south-africa.pdf";

// Same Web3Forms key as the enquiry form — routes to Lloyd@amarafrica.com.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "99c172f6-b2c2-4520-ba4e-10ae96846519";

type FormState = { name: string; email: string; whatsapp: string; country: string };
const initial: FormState = { name: "", email: "", whatsapp: "", country: "" };

export default function GuideForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const update =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please share your first name.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      next.email = "A valid email, please.";
    if (!form.country) next.country = "Where are you travelling from?";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Guide download — ${form.name} (${form.country})`,
          from_name: "Amara Africa — Guide Opt-in",
          replyto: form.email,
          Name: form.name,
          Email: form.email,
          WhatsApp: form.whatsapp || "—",
          "Country of residence": form.country,
          Source: "The Gulf Family's Guide to South Africa (/guide)",
        }),
      });
    } catch {
      // The guide is delivered regardless — the notification email is best-effort.
    }
    // Meta conversion — the guide opt-in is the Stage 1 "Lead" event the
    // paid campaign optimises on.
    trackMeta("Lead", { content_name: "gulf-family-guide" });
    setDone(true);
    setSending(false);
  };

  if (done) {
    return (
      <div>
        <p className="label mb-5">Your copy is ready</p>
        <h3 className="h3-card mb-4">
          Thank you, <span className="gold-italic">{form.name.split(" ")[0]}</span>.
        </h3>
        <p className="body-copy-sm max-w-[420px] mb-8">
          Your guide is ready to read below. We will also keep a copy aside for
          you — if you would like to talk any of it through, our Dubai office
          replies in person, within one working day.
        </p>
        <a
          href={GUIDE_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
          download
        >
          Read the Guide →
        </a>
        <p className="mt-6 text-[12px]" style={{ color: "var(--dd-stone)" }}>
          A PDF, quietly designed. No mailing list follows.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="flex flex-col gap-6">
        <Field
          label="First name"
          error={errors.name}
          field={
            <input
              type="text"
              className="input-field"
              value={form.name}
              onChange={update("name")}
              autoComplete="given-name"
              required
            />
          }
        />
        <Field
          label="Email"
          error={errors.email}
          field={
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
              required
            />
          }
        />
        <Field
          label="WhatsApp (optional)"
          field={
            <input
              type="tel"
              className="input-field"
              value={form.whatsapp}
              onChange={update("whatsapp")}
              autoComplete="tel"
              placeholder="+971 …"
            />
          }
        />
        <Field
          label="Country of residence"
          error={errors.country}
          field={
            <select
              className="input-field"
              value={form.country}
              onChange={update("country")}
              required
            >
              <option value="">Please select</option>
              <optgroup label="GCC">
                {GCC_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </optgroup>
              <option value="Elsewhere">Elsewhere</option>
            </select>
          }
        />
      </div>

      <div className="mt-8">
        <button type="submit" className="btn-gold w-full sm:w-auto" disabled={sending}>
          {sending ? "One moment…" : "Send Me the Guide →"}
        </button>
        <p className="mt-5 text-[12px] leading-relaxed" style={{ color: "var(--dd-stone)" }}>
          Your details are not shared, and there is no mailing list behind this
          form. One guide, and then silence — unless you write to us.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  field,
}: {
  label: string;
  error?: string;
  field: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label block mb-3">{label}</span>
      {field}
      {error && (
        <span
          className="block mt-2 text-[12px] italic"
          style={{ color: "var(--dd-gold-antique)" }}
        >
          {error}
        </span>
      )}
    </label>
  );
}
