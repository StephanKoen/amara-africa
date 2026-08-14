import type { Metadata } from "next";
import {
  Great_Vibes,
  Cormorant_Garamond,
  Noto_Naskh_Arabic,
} from "next/font/google";
import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import MetaPixel from "@/components/MetaPixel";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Concierge from "@/components/Concierge";

// The Arabic root layout — the /ar tree renders right-to-left in Noto Naskh.
// It mirrors app/(en)/layout.tsx; the two route groups are separate root
// layouts so each <html> carries the correct lang/dir.

const ORGANISATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://amarafrica.com/#organization",
  name: "Amara Africa",
  alternateName: "أَمَارَا وَ أَفْريقَا",
  url: "https://amarafrica.com",
  description:
    "رحلات سفاري أفريقية خاصة ومدروسة، صيغت لمسافري الخليج — عناية تراعي الحلال، وخدمة باللغة العربية، ومستشار واحد يرافق الملف من البداية إلى الختام. مكاتب في دبي وكيب تاون.",
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
  weight: ["400", "500", "600"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amarafrica.com"),
  title: {
    default: "أمارا أفريقيا — رحلات أفريقية خاصة. صيغت لأهل الخليج.",
    template: "%s · أمارا أفريقيا",
  },
  description:
    "رحلات سفاري خاصة ومدروسة عبر جنوب أفريقيا وتنزانيا وزامبيا — صيغت لمسافري الخليج على يد فريق في دبي وكيب تاون.",
  openGraph: {
    title: "أمارا أفريقيا — رحلات أفريقية خاصة. صيغت لأهل الخليج.",
    description:
      "رحلات سفاري خاصة ومدروسة عبر جنوب أفريقيا وتنزانيا وزامبيا — صيغت لمسافري الخليج.",
    type: "website",
    locale: "ar_AE",
    siteName: "أمارا أفريقيا",
    images: [
      {
        url: "https://images.ctfassets.net/wds1hqrprqxb/7wrSc782QHPspNc7NWmcaP/1c48edc3fd244969058e52c361a24594/Sasakwa_Activities_Game_drive_slider1.jpg?w=1600&h=1000&fl=progressive&q=92&fm=jpg",
        width: 1600,
        height: 1000,
        alt: "جولة برية خاصة عند الفجر عبر السهول الأفريقية",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function ArabicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
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
        <MetaPixel />
        <GoogleAnalytics />
        <JsonLd data={ORGANISATION_SCHEMA} />
        <Nav locale="ar" />
        <main className="page-fade">{children}</main>
        <Footer locale="ar" />
        {/* The AI concierge ships only once the key exists in the environment,
            so a deploy without it never shows guests a dead widget. */}
        {(process.env.ANTHROPIC_API_KEY ||
          process.env.NODE_ENV === "development") && <Concierge />}
      </body>
    </html>
  );
}
