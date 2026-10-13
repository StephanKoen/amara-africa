import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Delivery Policy — Amara Africa",
  description:
    "How and when Amara Africa delivers proposals, booking confirmations and travel documents.",
  alternates: { canonical: "/delivery-policy" },
};

const UPDATED = "13 October 2026";
const CONTACT = "reservations@amarafrica.com";

const sections: LegalSection[] = [
  {
    id: "what-we-deliver",
    title: "What we deliver",
    body: (
      <p>
        Amara Africa, a trading name of Amara Travel Group, sells travel
        services, not physical goods. What we deliver is your journey: the
        arrangements themselves, and the documents you need to travel —
        itinerary, booking confirmations, accommodation and transfer vouchers,
        flight e-tickets and pre-departure information. All documents are
        delivered electronically, by email and, where you prefer, by WhatsApp.
      </p>
    ),
  },
  {
    id: "timeframes",
    title: "Timeframes",
    body: (
      <ul>
        <li>
          <strong>Your enquiry</strong> — acknowledged within one business
          day; your first written proposal within 3 business days.
        </li>
        <li>
          <strong>Payment received</strong> — an emailed receipt is sent
          immediately by our payment provider when you pay online.
        </li>
        <li>
          <strong>Booking confirmation</strong> — within 2 business days of
          receiving your deposit, once suppliers have confirmed.
        </li>
        <li>
          <strong>Flight e-tickets</strong> — within 2 business days of
          payment for the flights.
        </li>
        <li>
          <strong>Final travel documents</strong> — your full itinerary and
          vouchers no later than 14 days before departure, provided your
          balance has been paid. For bookings made within 14 days of
          departure, within 2 business days of full payment.
        </li>
        <li>
          <strong>The journey itself</strong> — delivered on the travel dates
          shown in your booking confirmation.
        </li>
      </ul>
    ),
  },
  {
    id: "process",
    title: "How it works",
    body: (
      <ol className="list-decimal pl-5 flex flex-col gap-2">
        <li>You enquire, and your consultant designs a written proposal.</li>
        <li>You approve it, and we send an invoice and a secure payment link.</li>
        <li>On payment of the deposit, we reserve the services and send your booking confirmation.</li>
        <li>On payment of the balance, we issue tickets and vouchers and send your final travel documents.</li>
        <li>Your consultant stays in touch before and during your journey.</li>
      </ol>
    ),
  },
  {
    id: "not-received",
    title: "If something doesn't arrive",
    body: (
      <p>
        Please check your spam folder, then email{" "}
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>. We will resend any
        document within one business day. Please check names, dates and details
        on every document as soon as you receive it, and let us know of any
        error straight away.
      </p>
    ),
  },
];

export default function DeliveryPolicyPage() {
  return (
    <LegalPage
      title="Delivery"
      accent="policy"
      intro={<>How and when we deliver your proposal, confirmations and travel documents. Last updated {UPDATED}.</>}
      sections={sections}
    />
  );
}
