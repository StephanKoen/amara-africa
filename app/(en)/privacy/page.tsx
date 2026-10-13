import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Amara Africa",
  description:
    "How Amara Africa collects, uses and protects the personal information of guests, partners and visitors to amarafrica.com.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "13 October 2026";
const CONTACT = "reservations@amarafrica.com";

type Section = LegalSection;

const sections: Section[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          Amara Africa is a private travel company that designs and arranges
          African journeys for guests from the Gulf and elsewhere. Amara Africa
          is a trading name of Amara Travel Group, a company registered in
          South Africa, with offices in Dubai, United Arab Emirates, and Cape
          Town, South Africa.
        </p>
        <p>
          In this policy, &ldquo;Amara Africa&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to Amara Travel Group. We are
          the party responsible for your personal information under the
          Protection of Personal Information Act, 2013 (POPIA) of South Africa,
          the UAE Federal Decree-Law No. 45 of 2021 on the Protection of
          Personal Data, and, where it applies, the EU and UK General Data
          Protection Regulation.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <p>We collect only what we need to plan and look after your journey.</p>
        <ul>
          <li>
            <strong>Enquiries and requests.</strong> When you complete an
            enquiry form, request our guide, or write to us, we receive your
            name, email address, WhatsApp or phone number, country, and
            whatever you tell us about the trip you have in mind — dates,
            travelling party, interests and preferences.
          </li>
          <li>
            <strong>Booking details.</strong> If you go ahead with a journey,
            we collect what suppliers require to confirm it: full names as they
            appear on passports, dates of birth, passport and visa details,
            flight details, emergency contacts, and billing information.
          </li>
          <li>
            <strong>Special requirements.</strong> If you choose to tell us
            about dietary, religious, accessibility or medical needs, we use
            that only to arrange your journey properly, and we share it only
            with the people who need it to look after you.
          </li>
          <li>
            <strong>Our concierge.</strong> If you use the chat assistant on
            this site, the messages you type are processed to generate replies.
            Please don&rsquo;t share passport, payment or health details in the
            chat.
          </li>
          <li>
            <strong>How you found us.</strong> When you arrive on the site, a
            small cookie records the source that referred you (for example, a
            partner or a creator&rsquo;s link), so we can credit the referral if
            you later enquire.
          </li>
          <li>
            <strong>Site usage.</strong> Google Analytics and the Meta Pixel
            collect standard browsing information such as pages visited,
            device and browser type, approximate location and referring site.
          </li>
        </ul>
        <p>
          We do not knowingly collect information from children except as part
          of a family booking made by a parent or guardian.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    body: (
      <>
        <ul>
          <li>to reply to your enquiry and design a proposal for you;</li>
          <li>
            to book and manage your journey with lodges, hotels, airlines,
            guides and transfer providers;
          </li>
          <li>to contact you before, during and after your travels;</li>
          <li>to issue invoices, take payment and keep financial records;</li>
          <li>
            to credit partners and creators who referred you to us;
          </li>
          <li>
            to send you news and journey ideas, only if you have asked for
            them — you can unsubscribe at any time;
          </li>
          <li>
            to understand how the site is used and improve it, and to measure
            our advertising; and
          </li>
          <li>to meet our legal, tax and regulatory obligations.</li>
        </ul>
        <p>
          We process your information because you have asked us to (to take
          steps towards or perform a contract with you), because you have given
          consent (for marketing and non-essential cookies), because we have a
          legitimate interest in running and improving our business, or
          because the law requires it.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>
          We never sell your personal information. We share it only where it
          is needed:
        </p>
        <ul>
          <li>
            <strong>Travel suppliers</strong> — lodges, hotels, airlines, guides,
            transfer and excursion operators — to confirm and deliver your
            journey;
          </li>
          <li>
            <strong>Service providers</strong> who help us run the business,
            such as website hosting (Vercel), form delivery (Web3Forms), email,
            analytics (Google), advertising measurement (Meta), our AI
            concierge provider (Anthropic), and accounting software — each
            bound to use your information only on our instructions;
          </li>
          <li>
            <strong>Referral partners</strong>, who see only that a referral
            they made led to an enquiry or booking, not the details of your
            journey; and
          </li>
          <li>
            <strong>Authorities</strong>, where we are legally required to
            disclose information.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "international",
    title: "International transfers",
    body: (
      <p>
        Because we work between the UAE and South Africa and arrange travel
        across several African countries, your information will be transferred
        across borders — between our offices, to suppliers in the countries
        you visit, and to service providers who may store data in other
        countries, including the United States and the European Union. When we
        do this, we take reasonable steps to ensure your information receives
        a level of protection comparable to that required by POPIA and UAE
        law, including through contractual safeguards.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <>
        <p>We use a small number of cookies:</p>
        <ul>
          <li>
            <strong>Referral cookie</strong> (<code>amara_src</code>) — records
            how you reached us, kept for 60 days;
          </li>
          <li>
            <strong>Analytics cookies</strong> from Google Analytics — help us
            understand how the site is used;
          </li>
          <li>
            <strong>Advertising cookies</strong> from Meta — measure the
            effectiveness of our ads and let us show relevant ads on Meta
            platforms.
          </li>
        </ul>
        <p>
          You can block or delete cookies in your browser settings. The site
          will still work, though we may not be able to credit a referral.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        We keep enquiry information for up to two years if no booking is made,
        so we can pick up a conversation where it left off. We keep booking
        and financial records for as long as tax and accounting law requires,
        generally five to seven years. After that, we delete or anonymise the
        information.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We protect your information with appropriate technical and
        organisational measures, including encrypted connections, restricted
        access, and trusted service providers. No system is completely secure,
        but if a breach occurs that affects you, we will notify you and the
        relevant regulator as the law requires.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Depending on where you live, you have the right to:</p>
        <ul>
          <li>ask what personal information we hold about you and receive a copy;</li>
          <li>ask us to correct information that is wrong or incomplete;</li>
          <li>ask us to delete your information, where we have no legal reason to keep it;</li>
          <li>object to or restrict how we use it, including for marketing;</li>
          <li>withdraw consent you have given us at any time; and</li>
          <li>
            complain to a regulator — in South Africa, the Information
            Regulator (inforegulator.org.za); in the UAE, the UAE Data Office.
          </li>
        </ul>
        <p>
          To use any of these rights, email us at{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>. We will respond within
          30 days.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The date at the top of the
        page shows when it was last revised. Material changes will be
        highlighted on this page.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about this policy or your personal information can be sent
        to our Information Officer at{" "}
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>, or by post to Amara
        Travel Group, Foreshore, Cape Town, South Africa.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      accent="policy"
      intro={<>How we collect, use and look after the personal information of our guests, partners and visitors. Last updated {UPDATED}.</>}
      sections={sections}
    />
  );
}
