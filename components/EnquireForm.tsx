"use client";

import { useState } from "react";

const GCC_COUNTRIES = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
];

const OTHER_COUNTRIES = [
  "United Kingdom",
  "United States",
  "France",
  "Germany",
  "Switzerland",
  "Other",
];

const JOURNEY_ARCHETYPES = [
  "The Migration",
  "The Grand Circuit",
  "The Family Legacy",
  "The Cape & Kruger",
  "The Falls & Delta",
  "The Coastal Escape",
  "I am not yet sure",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  country: string;
  journey: string;
  dates: string;
  party: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  country: "",
  journey: "",
  dates: "",
  party: "",
  message: "",
};

export default function EnquireForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please share your name.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      next.email = "A valid email, please.";
    if (!form.country) next.country = "Where are you travelling from?";
    if (!form.journey) next.journey = "Please choose a starting point.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-[700px]">
        <p className="label mb-5">Your Enquiry</p>
        <h2 className="h2-section">
          Received, with <span className="gold-italic">thanks</span>.
        </h2>
        <div className="mt-8 flex flex-col gap-4 body-copy max-w-[560px]">
          <p>
            A senior member of our team will write to you personally within one
            working day. Your message will not be forwarded, and will not enter
            an automated system.
          </p>
          <p>
            If your travel is imminent, our Dubai office can be reached
            directly on the number we will include in our reply.
          </p>
        </div>
        <div className="mt-9">
          <p className="label">Amara Africa · Dubai · Cape Town · Lusaka</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-[780px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-7">
        <Field
          label="Your name"
          error={errors.name}
          field={
            <input
              type="text"
              className="input-field"
              value={form.name}
              onChange={update("name")}
              autoComplete="name"
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
          label="Phone (optional)"
          field={
            <input
              type="tel"
              className="input-field"
              value={form.phone}
              onChange={update("phone")}
              autoComplete="tel"
              placeholder="+971 4 000 0000"
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
              <optgroup label="Elsewhere">
                {OTHER_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </optgroup>
            </select>
          }
        />
        <Field
          label="Journey of interest"
          error={errors.journey}
          field={
            <select
              className="input-field"
              value={form.journey}
              onChange={update("journey")}
              required
            >
              <option value="">Please select</option>
              {JOURNEY_ARCHETYPES.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          }
        />
        <Field
          label="Approximate travel dates"
          field={
            <input
              type="text"
              className="input-field"
              value={form.dates}
              onChange={update("dates")}
              placeholder="e.g. October — November 2026"
            />
          }
        />
        <Field
          label="Party size"
          field={
            <input
              type="text"
              className="input-field"
              value={form.party}
              onChange={update("party")}
              placeholder="e.g. 2 adults, 2 children"
            />
          }
        />
      </div>

      <div className="mt-7">
        <Field
          label="Anything we should know"
          field={
            <textarea
              className="input-field"
              rows={4}
              value={form.message}
              onChange={update("message")}
              placeholder="Dietary considerations, special occasions, private aviation, Arabic-speaking hosts — anything at all."
            />
          }
        />
      </div>

      <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
        <button type="submit" className="btn-gold">
          Request Private Access &rarr;
        </button>
        <p
          className="text-[12px]"
          style={{ color: "var(--dd-stone)" }}
        >
          Your details are not shared. You will hear from a person, by name.
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
