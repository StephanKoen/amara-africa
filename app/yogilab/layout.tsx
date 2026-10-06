import type { Metadata } from "next";
import "../globals.css";

// Standalone shell for collab event pages — no Amara site nav or footer;
// the page carries its own co-branded identity.
export const metadata: Metadata = {
  title: "Cape Town Takeover × Amara Africa",
  description:
    "Travel for the Cape Town Takeover — Mind Matters Summit 2026, Mental Mastery Week, 15–30 October. Flights, hotels, transfers and excursions by Amara Africa.",
  robots: { index: false }, // referral-only page
};

export default function YogiLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&family=Oswald:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
