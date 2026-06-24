import type { Metadata } from "next";
import {
  Great_Vibes,
  Cormorant_Garamond,
  Noto_Naskh_Arabic,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

// Site-wide organisation schema — the trust/identity signal for search and AI
// engines. Telephone is the already-public UAE WhatsApp/business number; email
// is deliberately omitted so it isn't newly exposed to scrapers.
const ORGANISATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://amarafrica.com/#organization",
  name: "Amara Africa",
  alternateName: "أَمَارَا وَ أَفْريقَا",
  url: "https://amarafrica.com",
  description:
    "Private, considered African safaris built for Gulf travellers — halal-aware service, Arabic-language access, and single-consultant continuity. Offices in Dubai and Cape Town.",
  foundingDate: "2025",
  knowsLanguage: ["en", "ar"],
  areaServed: [
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Oman",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+971588585960",
    availableLanguage: ["en", "ar"],
  },
  image:
    "https://images.ctfassets.net/wds1hqrprqxb/7wrSc782QHPspNc7NWmcaP/1c48edc3fd244969058e52c361a24594/Sasakwa_Activities_Game_drive_slider1.jpg?w=1600&h=1000&fl=progressive&q=92&fm=jpg",
};

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cursive",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  weight: "400",
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amarafrica.com"),
  title: {
    default: "Amara Africa — Private African Journeys. Crafted for the Gulf.",
    template: "%s · Amara Africa",
  },
  description:
    "Private, considered safaris across South Africa, Tanzania and Zambia — built for Gulf travellers by a team in Dubai and Cape Town.",
  openGraph: {
    title: "Amara Africa — Private African Journeys. Crafted for the Gulf.",
    description:
      "Private, considered safaris across South Africa, Tanzania and Zambia — built for Gulf travellers.",
    type: "website",
    locale: "en_GB",
    siteName: "Amara Africa",
    images: [
      {
        url: "https://images.ctfassets.net/wds1hqrprqxb/7wrSc782QHPspNc7NWmcaP/1c48edc3fd244969058e52c361a24594/Sasakwa_Activities_Game_drive_slider1.jpg?w=1600&h=1000&fl=progressive&q=92&fm=jpg",
        width: 1600,
        height: 1000,
        alt: "A private game drive at dawn across the African plains",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${cormorantGaramond.variable} ${notoNaskhArabic.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd data={ORGANISATION_SCHEMA} />
        <Nav />
        <main className="page-fade">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
