import type { Metadata } from "next";
import EnquireForm from "@/components/EnquireForm";

export const metadata: Metadata = {
  title: "Enquire Privately — Dune & Delta",
  description:
    "Write to us. A senior member of our Dubai office will reply in person, within one working day. No automated confirmations.",
};

export default function EnquirePage() {
  return (
    <>
      <section
        className="section-x pt-[170px] md:pt-[220px] pb-[80px]"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-7">
              <p className="label mb-8">Enquire Privately</p>
              <h1 className="h1-display">
                Write to us, and{" "}
                <span className="gold-italic">we will write back</span>.
              </h1>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end">
              <p className="body-copy max-w-[460px]">
                A senior member of our Dubai office will reply in person,
                within one working day. You will hear from a named individual.
                There is no automated confirmation, and there is no mailing
                list behind this form.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-x pb-[160px] md:pb-[220px]"
        style={{ background: "var(--dd-white)" }}
      >
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-24">
            <div className="md:col-span-7">
              <div
                className="p-10 md:p-12"
                style={{
                  background: "var(--dd-white)",
                  border: "0.5px solid var(--dd-border)",
                }}
              >
                <EnquireForm />
              </div>
            </div>

            <aside className="md:col-span-5 md:col-start-8">
              <div
                className="p-10 md:p-12"
                style={{
                  background: "var(--dd-white)",
                  border: "0.5px solid var(--dd-border)",
                }}
              >
                <p className="label mb-7">Offices</p>
                <div className="flex flex-col gap-8">
                  <Office
                    city="Dubai"
                    description="Gate Avenue, DIFC — guest relationships and the Gulf office."
                  />
                  <Office
                    city="Cape Town"
                    description="42 Hans Strijdom, Foreshore — product and itinerary writing."
                  />
                  <Office
                    city="Lusaka"
                    description="Kabulonga — ground operations for Zambia and East Africa."
                  />
                </div>

                <div className="mt-10 hairline pt-8">
                  <p className="label mb-4">Reply time</p>
                  <p
                    className="font-serif italic text-[22px] leading-snug"
                    style={{ color: "var(--dd-ink)" }}
                  >
                    Within one working day, from a named individual.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function Office({
  city,
  description,
}: {
  city: string;
  description: string;
}) {
  return (
    <div>
      <p
        className="font-serif italic text-[22px] leading-snug"
        style={{ color: "var(--dd-ink)" }}
      >
        {city}
      </p>
      <p
        className="mt-2 text-[13px] leading-relaxed"
        style={{ color: "var(--dd-stone)" }}
      >
        {description}
      </p>
    </div>
  );
}
