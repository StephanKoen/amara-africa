import type { Metadata } from "next";
import {
  Great_Vibes,
  Cormorant_Garamond,
  Noto_Naskh_Arabic,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
    "Private, considered safaris across South Africa, Tanzania and Zambia — built for Gulf travellers by a team in Dubai, Cape Town and Lusaka.",
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
        <Nav />
        <main className="page-fade">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
