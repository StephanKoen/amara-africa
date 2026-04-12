# Dune & Delta

Private African journeys. Crafted for the Gulf.

A small, editorial marketing site for Dune & Delta — a luxury African safari
house founded in Dubai in 2025, with offices in Dubai, Cape Town and Lusaka.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS, with CSS custom properties for brand colour tokens
- Google Fonts (Playfair Display) loaded via `<link>` in the document head
- `next/image` with the `images.ctfassets.net` remote pattern allow-listed in
  `next.config.js`

## Scripts

```bash
npm run dev    # start the dev server
npm run build  # production build
npm run start  # run the built app
npm run lint   # next lint
```

## Site map

| Route                    | Page                                     |
| ------------------------ | ---------------------------------------- |
| `/`                      | Homepage                                 |
| `/journeys`              | The Collection — six journey archetypes  |
| `/journeys/[slug]`       | Individual journey page                  |
| `/the-experience`        | The Dune & Delta Way                     |
| `/about`                 | About, team, philosophy                  |
| `/enquire`               | Enquiry form                             |

## File structure

```
app/
  globals.css            CSS custom properties + base styles
  layout.tsx             Shared nav + footer, fonts, metadata
  page.tsx               Homepage
  journeys/page.tsx      Journeys index
  journeys/[slug]/page.tsx
  the-experience/page.tsx
  about/page.tsx
  enquire/page.tsx
components/
  Nav.tsx
  Footer.tsx
  Logo.tsx
  HeroSection.tsx
  JourneyCard.tsx
  FeatureSplit.tsx
  FullbleedFeature.tsx
  PrinciplesGrid.tsx
  NewsletterSection.tsx
  EnquireForm.tsx
lib/
  journeys.ts            Journey data
  images.ts              Image URL map
```

## Deployment

This project is ready to deploy to Vercel as-is — no environment variables are
required for the marketing site.
