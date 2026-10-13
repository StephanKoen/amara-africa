import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Shipping Policy — Amara Africa",
  description:
    "Amara Africa sells travel services and does not ship physical goods. Documents are delivered electronically, free of charge, worldwide.",
  alternates: { canonical: "/shipping-policy" },
};

const UPDATED = "13 October 2026";
const CONTACT = "reservations@amarafrica.com";

const sections: LegalSection[] = [
  {
    id: "no-physical-goods",
    title: "We do not ship physical goods",
    body: (
      <p>
        Amara Africa, a trading name of Amara Travel Group, sells travel
        services. We do not sell or ship physical products, so no shipping
        applies to any purchase made with us.
      </p>
    ),
  },
  {
    id: "rates",
    title: "Shipping rates",
    body: (
      <p>
        There are no shipping or delivery charges. All travel documents —
        itineraries, confirmations, vouchers and e-tickets — are delivered
        electronically by email (and WhatsApp on request) at no cost.
      </p>
    ),
  },
  {
    id: "regions",
    title: "Regions",
    body: (
      <p>
        We serve guests worldwide, with a focus on the United Arab Emirates,
        Saudi Arabia and the wider Gulf. Electronic documents can be delivered
        to any country. The journeys we arrange take place in Africa, including
        South Africa, Tanzania, Zambia and neighbouring countries.
      </p>
    ),
  },
  {
    id: "timeframes",
    title: "Timeframes",
    body: (
      <p>
        Delivery timeframes for confirmations and travel documents are set out
        in our <Link href="/delivery-policy">delivery policy</Link>. For
        questions, email <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
      </p>
    ),
  },
];

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title="Shipping"
      accent="policy"
      intro={<>We sell travel, not physical goods — here is what that means for shipping. Last updated {UPDATED}.</>}
      sections={sections}
    />
  );
}
