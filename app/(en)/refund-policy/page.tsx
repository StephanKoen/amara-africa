import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy — Amara Africa",
  description:
    "When refunds are available for journeys booked with Amara Africa, how they are calculated, and how they are paid.",
  alternates: { canonical: "/refund-policy" },
};

const UPDATED = "13 October 2026";
const CONTACT = "reservations@amarafrica.com";

const sections: LegalSection[] = [
  {
    id: "summary",
    title: "In short",
    body: (
      <>
        <p>
          Amara Africa, a trading name of Amara Travel Group, arranges travel
          services — accommodation, flights, transfers, guiding and
          experiences — on behalf of independent suppliers. We do accept
          refunds, in the circumstances set out below.
        </p>
        <ul>
          <li>
            If we cancel your journey, or make a significant change you do not
            accept, you receive a full refund of what you paid us for the
            affected services.
          </li>
          <li>
            If you cancel, you are refunded what you have paid less the
            cancellation charges in your booking confirmation. Those charges
            reflect what suppliers keep and become higher closer to departure.
          </li>
          <li>
            Deposits are generally non-refundable once they have been paid on
            to suppliers.
          </li>
          <li>
            Approved refunds are paid to the original payment method within 14
            business days, or within 14 business days of our receiving the
            supplier&rsquo;s refund where we depend on one.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cancellation-by-you",
    title: "If you cancel",
    body: (
      <>
        <p>
          Please tell us in writing at{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>. Your cancellation takes
          effect on the day we receive it.
        </p>
        <p>
          Lodges, airlines and other suppliers each apply their own
          cancellation terms. The charges that apply to your journey are set
          out in your booking confirmation before you pay. We refund the
          balance of what you have paid after deducting those charges, which
          will not exceed the costs we cannot recover from suppliers plus a
          reasonable fee for work already done.
        </p>
        <p>
          Flight tickets are refundable only to the extent the airline&rsquo;s
          fare rules allow; many discounted fares are non-refundable once
          issued.
        </p>
      </>
    ),
  },
  {
    id: "cancellation-by-us",
    title: "If we cancel or change your journey",
    body: (
      <p>
        If we must cancel your journey for a reason within our control, or make
        a significant change that you do not accept, you may choose a
        comparable alternative or a full refund of the money you paid us for
        the affected services.
      </p>
    ),
  },
  {
    id: "beyond-control",
    title: "Events beyond our control",
    body: (
      <p>
        If travel is prevented by events beyond our or our suppliers&rsquo;
        reasonable control — such as natural disasters, epidemics, war, civil
        unrest, government action or airspace closure — we will pass on every
        refund or credit we are able to recover from suppliers, less costs
        already incurred. Travel insurance is the best protection against these
        situations, and is a condition of travelling with us.
      </p>
    ),
  },
  {
    id: "non-refundable",
    title: "What is not refundable",
    body: (
      <ul>
        <li>services not used once your journey has begun, such as a missed activity, transfer or night;</li>
        <li>visa fees, insurance premiums and other third-party charges you paid directly;</li>
        <li>bank charges and currency differences arising on the original payment or the refund; and</li>
        <li>amounts a supplier retains under its terms, as shown in your confirmation.</li>
      </ul>
    ),
  },
  {
    id: "how-refunds-are-paid",
    title: "How refunds are paid",
    body: (
      <>
        <p>
          Refunds are made to the card or account used for the original
          payment. Card refunds are processed through our payment provider, and
          may take a further 5 to 10 business days to appear on your statement,
          depending on your bank.
        </p>
        <p>
          Refunds are paid in the currency of your original payment. We are not
          responsible for differences caused by exchange-rate movements between
          payment and refund.
        </p>
      </>
    ),
  },
  {
    id: "request",
    title: "Requesting a refund",
    body: (
      <p>
        Email <a href={`mailto:${CONTACT}`}>{CONTACT}</a> with your booking
        reference and the names of the travellers. We will confirm the refund
        amount in writing within 5 business days. This policy forms part of
        our <Link href="/terms">terms &amp; conditions</Link> and does not
        affect your rights under South African consumer law.
      </p>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund"
      accent="policy"
      intro={<>When refunds are available, how they are worked out, and how quickly they are paid. Last updated {UPDATED}.</>}
      sections={sections}
    />
  );
}
