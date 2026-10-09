import type { Metadata } from "next";

// Standalone shell for the brand guidelines — no site nav or footer, so the
// page reads as a self-contained guide when shared with partners and creators.
export const metadata: Metadata = {
  title: "Brand Guidelines — Amara Africa",
  description: "Logo, colours, typography and voice for partners and creators working with Amara Africa.",
  robots: { index: false }, // shared by link only
};

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Great+Vibes&family=Noto+Naskh+Arabic:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
