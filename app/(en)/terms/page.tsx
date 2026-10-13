import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — Amara Africa",
  description:
    "The terms on which Amara Africa, a trading name of Amara Travel Group, arranges journeys and provides this website.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "13 October 2026";
const CONTACT = "reservations@amarafrica.com";

type Section = LegalSection;

const sections: Section[] = [
  {
    id: "about-these-terms",
    title: "About these terms",
    body: (
      <>
        <p>
          Amara Africa is a trading name of Amara Travel Group, a company
          registered in South Africa, with offices in Dubai, United Arab
          Emirates, and Cape Town, South Africa (&ldquo;Amara Africa&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).
        </p>
        <p>
          These terms apply to every journey we arrange and to your use of
          amarafrica.com. Please read them with your proposal and booking
          confirmation: where a confirmation sets out specific terms for your
          journey — such as deposit amounts, payment dates or cancellation
          charges — those specific terms apply alongside these.
        </p>
        <p>
          By confirming a booking or paying a deposit, you accept these terms
          on behalf of yourself and everyone travelling with you, and you
          confirm that you are at least 18 years old and authorised to do so.
        </p>
      </>
    ),
  },
  {
    id: "our-role",
    title: "Our role",
    body: (
      <>
        <p>
          We design your journey and arrange it with independent suppliers —
          lodges, hotels, camps, airlines, charter operators, guides, transfer
          and excursion providers. We act as an agent on behalf of those
          suppliers. Each supplier is responsible for the services it provides,
          and its own terms and conditions also apply to those services.
        </p>
        <p>
          We select suppliers with care and take responsibility for doing our
          own part of the arrangements with reasonable skill and care.
        </p>
      </>
    ),
  },
  {
    id: "proposals-and-bookings",
    title: "Proposals and bookings",
    body: (
      <>
        <p>
          Proposals and quotes are offered in good faith but are subject to
          availability and are not a reservation. Prices are only held once a
          booking is confirmed in writing and any required deposit has been
          received.
        </p>
        <p>
          A booking becomes binding when we issue a written confirmation. Please
          check it carefully, including names as they appear on passports, and
          tell us of any error straight away. Changes to names after tickets or
          permits are issued may not be possible, or may carry a charge.
        </p>
      </>
    ),
  },
  {
    id: "prices-and-payment",
    title: "Prices and payment",
    body: (
      <>
        <ul>
          <li>
            A deposit is payable to confirm your booking, and the balance is due
            by the date shown on your invoice. The amounts and dates are set out
            in your proposal or confirmation, and reflect the requirements of
            the suppliers involved.
          </li>
          <li>
            If the balance is not received by the due date, we may treat the
            booking as cancelled by you and apply the cancellation charges
            below.
          </li>
          <li>
            Prices are quoted in the currency shown on your proposal. Many
            supplier costs are set in South African Rand or US Dollars, so we
            reserve the right to adjust a confirmed price before the balance is
            paid if exchange rates, fuel surcharges, park and conservation fees,
            government taxes or levies change. We will tell you of any change
            and the reason for it.
          </li>
          <li>
            Bank charges and card fees on payments to us are for your account,
            unless we agree otherwise.
          </li>
          <li>
            Prices include only the services listed in your confirmation.
            Gratuities, visas, travel insurance, personal expenses and items
            marked as excluded are not included.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "changes-by-you",
    title: "Changes you make",
    body: (
      <p>
        If you ask to change a confirmed booking, we will do our best to help.
        Changes depend on availability and may carry supplier charges, any
        difference in price, and a reasonable administration fee, all of which
        we will confirm before making the change.
      </p>
    ),
  },
  {
    id: "cancellation-by-you",
    title: "Cancellation by you",
    body: (
      <>
        <p>
          You may cancel your booking by notifying us in writing. Cancellation
          takes effect on the day we receive your notice.
        </p>
        <p>
          Because lodges, airlines and other suppliers apply their own
          cancellation charges — which become stricter closer to travel — the
          charges that apply to your journey are set out in your booking
          confirmation. They will not exceed the costs we cannot recover from
          suppliers plus a reasonable fee for the work already done. Deposits
          are generally non-refundable once suppliers have been paid.
        </p>
        <p>
          No refund is due for unused services, such as a missed activity or a
          night not taken. We strongly recommend insurance that covers
          cancellation.
        </p>
      </>
    ),
  },
  {
    id: "changes-by-us",
    title: "Changes or cancellation by us",
    body: (
      <>
        <p>
          Occasionally we or a supplier may need to change part of your
          journey — for example, a change in flight times, or moving you to a
          comparable camp. We will tell you as soon as possible and offer
          suitable alternatives.
        </p>
        <p>
          If we must cancel your journey for a reason within our control, or
          make a significant change you do not accept, we will offer a
          comparable alternative or refund what you have paid us for the
          affected services.
        </p>
      </>
    ),
  },
  {
    id: "force-majeure",
    title: "Events beyond our control",
    body: (
      <p>
        We are not liable for any failure, delay or change caused by events
        beyond our or our suppliers&rsquo; reasonable control, including
        natural disasters, extreme weather, fire, epidemics, war, civil unrest,
        terrorism, government action, industrial action, airline failure or
        airspace closure. In such cases we will help you make alternative
        arrangements and pass on any refunds we recover from suppliers, less
        costs already incurred.
      </p>
    ),
  },
  {
    id: "documents-and-health",
    title: "Passports, visas and health",
    body: (
      <>
        <p>
          You are responsible for holding a valid passport, with the validity
          and blank pages the countries you visit require, and for obtaining
          any visas, permits and health documents. We can provide general
          guidance, but requirements change and you should confirm them with the
          relevant embassy or authority before you travel.
        </p>
        <p>
          Please take medical advice before travelling, including on
          vaccinations and malaria prevention, and tell us about any medical
          condition, mobility need or dietary requirement that may affect your
          journey. Some lodges, light aircraft and activities have age, weight
          or fitness restrictions.
        </p>
      </>
    ),
  },
  {
    id: "insurance",
    title: "Travel insurance",
    body: (
      <p>
        Comprehensive travel insurance is a condition of travelling with us.
        It should cover cancellation, curtailment, medical treatment, emergency
        evacuation and repatriation, and personal belongings, for the full
        length of your journey and the activities you will take part in.
      </p>
    ),
  },
  {
    id: "safari-and-conduct",
    title: "On safari",
    body: (
      <>
        <p>
          Travel in Africa involves wild animals, remote locations and natural
          hazards. Wildlife sightings cannot be guaranteed. Please follow the
          instructions of guides, rangers, pilots and lodge staff at all times;
          they are given for your safety.
        </p>
        <p>
          Suppliers may refuse service to anyone whose behaviour puts others at
          risk or causes serious disruption, without refund. You are
          responsible for any damage you cause.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Our liability",
    body: (
      <>
        <p>
          We are responsible for the arrangements we make, carried out with
          reasonable skill and care. We are not liable for the acts or
          omissions of independent suppliers, or for loss, injury or damage
          that is caused by you, by an unconnected third party, or by events
          beyond our control.
        </p>
        <p>
          To the extent the law allows, our total liability to you for any
          claim is limited to the amount you paid us for the journey concerned,
          and we are not liable for indirect or consequential loss. Where
          international conventions apply to air, sea or rail travel or to
          hotel stays, our liability is limited in the same way as the
          supplier&rsquo;s. Nothing in these terms limits liability that cannot
          be limited by law, including your rights under South Africa&rsquo;s
          Consumer Protection Act where it applies.
        </p>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Complaints",
    body: (
      <p>
        If something is not right during your journey, please tell your guide,
        the lodge or your Amara consultant straight away, so it can be put
        right on the spot. If you are still not satisfied, write to us at{" "}
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a> within 28 days of your
        return, and we will respond within 14 days.
      </p>
    ),
  },
  {
    id: "website",
    title: "Using this website",
    body: (
      <>
        <p>
          The content of amarafrica.com — including text, photographs, design
          and branding — belongs to us or our licensors and may not be copied or
          reused without permission. Information on the site is general and
          may change; it is not an offer to book.
        </p>
        <p>
          Our online concierge offers general guidance only. Its replies are
          not a confirmation of price, availability or travel requirements,
          which we confirm in writing.
        </p>
        <p>
          How we handle your personal information is explained in our{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the Republic of South Africa,
        and the courts of South Africa have jurisdiction over any dispute. If
        any part of these terms is found to be unenforceable, the rest remains
        in effect. We may update these terms from time to time; the version in
        force when you confirm your booking applies to that booking.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Amara Travel Group, trading as Amara Africa · Foreshore, Cape Town,
        South Africa · <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      accent="& conditions"
      intro={<>The terms on which we arrange your journey and provide this website. Last updated {UPDATED}.</>}
      sections={sections}
    />
  );
}
