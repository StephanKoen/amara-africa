export type Journey = {
  slug: string;
  tag: string;
  title: string;
  titleItalic: string;
  oneliner: string;
  duration: string;
  territory: string;
  heroImage: string;
  cardImage: string;
  galleryImages: string[];

  // Optional structured frontmatter
  published?: boolean;
  durationNights?: [number, number];
  region?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  idealFor?: string[];
  pricingFrom?: number;
  pricingCurrency?: string;
  pricingUnit?: string;
  featureImage?: string;
  relatedSlugs?: string[];
  seasonal?: boolean;
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  body?: string;

  /**
   * Optional scrolling photo strips rendered within the body, inserted after
   * the H2 section whose heading matches `afterHeading` (case-insensitive,
   * trimmed). If `images` is empty the renderer shows a discreet "photography
   * to follow" placeholder instead, so the editorial rhythm of the page
   * remains intact while the real photos are still being sourced.
   */
  sectionGalleries?: Array<{
    afterHeading: string;
    images: string[];
    alts?: string[];
  }>;

  /** Internal product code, e.g. "AA-GR-06". Never rendered to guests. */
  code?: string;

  /**
   * Coastal/city extensions. Add-ons are sold standalone AND surfaced in the
   * "Extend your journey" block on every non-add-on journey page.
   */
  addOn?: boolean;

  /** Shown as an extra "At a glance" sidebar row when present. */
  bestSeason?: string;

  /**
   * Optional partner excursions, rendered as a bordered card set (visually
   * distinct from inclusions). Outbound links only — we never replicate a
   * partner's booking flow.
   */
  excursions?: {
    partnerName: string;
    partnerUrl: string;
    bookingUrl?: string;
    address?: string;
    note?: string;
    items: Array<{ name: string; desc: string; img?: string; highlight?: boolean }>;
  };
};

export const journeys: Journey[] = [
  {
    slug: "the-migration",
    tag: "Movement",
    title: "The Migration",
    titleItalic: "Migration",
    oneliner:
      "Timed to the Serengeti wildebeest crossing. The greatest wildlife spectacle on earth.",
    duration: "7–10 nights",
    territory: "Tanzania — Serengeti & Lamai",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/6FuXti7kPpoMSaRUJVfLi/8e67d00a8428e3fb93e0a93a1dd596d8/Lamai_Wildlife_Migration_Penny_Parker_2022.jpg?w=1600&h=900&fl=progressive&q=92&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/6FuXti7kPpoMSaRUJVfLi/8e67d00a8428e3fb93e0a93a1dd596d8/Lamai_Wildlife_Migration_Penny_Parker_2022.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      "https://images.ctfassets.net/wds1hqrprqxb/whBDmhklc1y2SDWdHCIbm/2b4c6ad91948ea0509f42c64e889ab88/Lamai_Wildlife_Migration_Penny_Parker_2022__22_.jpg?w=1200&h=800&fl=progressive&q=92&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/1HquHPcOaEsbeKA5EGGDxO/ff964080fedc01649c4588af9783d037/Sabora_Activities_Game_drive_slider1.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/65aTPJVM2j0aL8h6XfJueD/45f39c25f3e5925582912329519b416d/Conservation_Serengeti_Hero.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
    ],
  },
  {
    slug: "the-grand-circuit",
    tag: "Sovereignty",
    title: "The Grand Circuit",
    titleItalic: "Grand Circuit",
    oneliner:
      "Three countries. Private air access. Every arrival exclusively yours.",
    duration: "12–16 nights",
    territory: "South Africa · Tanzania · Zambia",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/7wrSc782QHPspNc7NWmcaP/1c48edc3fd244969058e52c361a24594/Sasakwa_Activities_Game_drive_slider1.jpg?w=1600&h=900&fl=progressive&q=92&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/7wrSc782QHPspNc7NWmcaP/1c48edc3fd244969058e52c361a24594/Sasakwa_Activities_Game_drive_slider1.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      "https://images.ctfassets.net/wds1hqrprqxb/5AYyA91LaFdHzarcSxIyL0/78fee3bbcbec6259b7c5703ee6a8650b/Explore_Activities_Game_Drive_slider1.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/1By6DT2Fa4M0kQXWgnGADp/78137645393ae20f1ae0080e6efc737a/Grumeti-region.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/5CZ74q7AnMo5dnaglhtAQb/8e28f396a98c62cdd1e4441af38e943d/Biodiversity_Conservation_Partners_Malilangwe_Trust.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
    ],
  },
  {
    slug: "the-family-legacy",
    tag: "Generations",
    title: "The Family Legacy",
    titleItalic: "Family Legacy",
    oneliner:
      "Multi-generational. Private villa configurations. A children's programme built around wonder.",
    duration: "7–14 nights",
    territory: "South Africa — Sabi Sand & Kruger",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/6SOVbwGrM0acAfNGq9nPbt/2f15d440b22c846e897d10e439c8f9d9/Singita_Malilangwe_House_-_Breakfast_with_a_view.jpg?w=1600&h=900&fl=progressive&q=92&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/6SOVbwGrM0acAfNGq9nPbt/2f15d440b22c846e897d10e439c8f9d9/Singita_Malilangwe_House_-_Breakfast_with_a_view.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      "https://images.ctfassets.net/wds1hqrprqxb/5PUDPumxl9Rsh9uC8v9s0/04e40a3f365b3edd35ddb979b7afd53a/DSC01618.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/6Glf1CQJy5HGb6UJnaeqse/84d483f8e6429525276457c6d2fc7037/ebony_lodge_dining_room.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/36tmbH5DG5RFz4Gfv1z4uD/6bbeb4387c51a6409343299bf57d3eb5/Sasakwa_Activities_Wellness_slider1.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
    ],
  },
  {
    slug: "the-cape-and-kruger",
    tag: "Classic",
    title: "Signature South Africa",
    titleItalic: "Signature South Africa",
    oneliner:
      "Cape Town, Grootbos and Monwana. A refined private journey through South Africa's most compelling landscapes.",
    duration: "10 Days / 9 Nights",
    territory: "Cape Town · Grootbos · Greater Kruger",
    heroImage: "/images/journeys/the-cape-and-kruger/hero.jpg",
    cardImage: "/images/journeys/the-cape-and-kruger/card.jpg",
    galleryImages: [
      "/images/journeys/the-cape-and-kruger/gallery-1.jpg",
      "/images/journeys/the-cape-and-kruger/gallery-2.jpg",
      "/images/journeys/the-cape-and-kruger/gallery-3.jpg",
    ],
    published: true,
    durationNights: [9, 10],
    region: "South Africa",
    highlights: [
      "4 nights at Cape Grace, Cape Town",
      "2 nights at Grootbos Forest Lodge",
      "3 nights at Monwana Game Lodge",
      "Private Cape Town touring with dedicated guide",
      "Private helicopter experience over Cape Town",
      "Private yacht experience along the Atlantic Seaboard",
      "Curated luxury dining reservations in Cape Town",
      "Big Five safari in a private luxury setting",
      "Ideal for couples, honeymooners, families and private groups",
      "Tailor-made service with concierge-style support throughout",
    ],
    inclusions: [
      "4 nights at Cape Grace Hotel, Cape Town",
      "2 nights at Grootbos Forest Lodge",
      "3 nights at Monwana Game Lodge",
      "Luxury accommodation throughout",
      "Breakfast daily in Cape Town",
      "Fully inclusive stay at Grootbos as per lodge offering",
      "Fully inclusive safari stay at Monwana",
      "Selected private touring in Cape Town",
      "Private helicopter experience over Cape Town",
      "Private yacht experience along the Atlantic Seaboard",
      "Safari activities at Monwana",
      "Private transfers as specified in the itinerary",
      "Meet and greet support on arrival",
      "Tailor-made planning and concierge-style service throughout",
    ],
    exclusions: [
      "International flights",
      "Domestic flights unless specifically included",
      "Visa fees if applicable",
      "Travel insurance",
      "Personal expenses and gratuities",
      "Premium beverages unless specifically included",
      "Optional activities not specified in the itinerary",
    ],
    idealFor: [
      "GCC luxury travellers",
      "Couples and honeymooners",
      "Families seeking a premium South Africa journey",
      "First-time Africa travellers",
      "Guests wanting privacy, comfort and curated experiences",
      "Private groups celebrating a special occasion",
    ],
    pricingFrom: 0,
    pricingCurrency: "USD",
    pricingUnit: "on request",
    featureImage: "/images/journeys/the-cape-and-kruger/feature.jpg",
    relatedSlugs: ["the-migration", "the-coastal-escape"],
    seasonal: false,
    order: 1,
    seoTitle:
      "Luxury South Africa Tour — Cape Town, Grootbos & Safari | Amara Africa",
    seoDescription:
      "A private 10-night South Africa journey combining Cape Town, the natural beauty of Grootbos and a Big Five safari at Monwana. Tailor-made for GCC travellers.",
    seoKeywords: [
      "luxury South Africa tour",
      "South Africa luxury safari",
      "Cape Town and safari itinerary",
      "private South Africa holiday",
      "GCC travel to South Africa",
      "tailor-made South Africa holiday",
      "luxury Africa travel",
    ],
    sectionGalleries: [
      {
        afterHeading: "Cape Town — 4 nights",
        images: [
          "/images/journeys/the-cape-and-kruger/cape-town/01.jpg",
          "/images/journeys/the-cape-and-kruger/cape-town/02.jpg",
          "/images/journeys/the-cape-and-kruger/cape-town/03.jpg",
          "/images/journeys/the-cape-and-kruger/cape-town/04.jpg",
          "/images/journeys/the-cape-and-kruger/cape-town/05.jpg",
        ],
        alts: [
          "Cape Grace lobby — panelled walls, chesterfield seating and chevron parquet floors",
          "Private yacht moored in the V&A marina with the Cape Grace façade behind",
          "A couple arriving at Cape Grace in a vintage convertible",
          "The V&A Waterfront at sunset — Table Mountain and Cape Grace reflected in the harbour",
          "The Cape Grace pool deck on a bright summer day",
        ],
      },
      {
        afterHeading: "Grootbos — 2 nights",
        images: [
          "/images/journeys/the-cape-and-kruger/grootbos/01.jpg",
          "/images/journeys/the-cape-and-kruger/grootbos/02.jpg",
          "/images/journeys/the-cape-and-kruger/grootbos/03.jpg",
          "/images/journeys/the-cape-and-kruger/grootbos/04.jpg",
          "/images/journeys/the-cape-and-kruger/grootbos/05.jpg",
        ],
        alts: [
          "A plate of freshly shucked oysters dressed with sea lettuce, lime and foraged shoreline botanicals",
          "A private villa pool deck above the fynbos with the Walker Bay coastline beyond",
          "A Land Rover moving quietly along a track through the restio-lined fynbos reserve",
          "A small group riding through pink erica and ocean dunes on a clear morning",
          "A Southern Right whale breaching just off the Grootbos coast",
        ],
      },
      {
        afterHeading: "Monwana — 3 nights",
        images: [
          "/images/journeys/the-cape-and-kruger/monwana/01.jpg",
          "/images/journeys/the-cape-and-kruger/monwana/02.jpg",
          "/images/journeys/the-cape-and-kruger/monwana/03.jpg",
          "/images/journeys/the-cape-and-kruger/monwana/04.jpg",
          "/images/journeys/the-cape-and-kruger/monwana/05.jpg",
        ],
        alts: [
          "Monwana Game Lodge at dusk, lit gables reflected in the waterhole",
          "A close sighting of a lioness mid-yawn in the golden grass",
          "The lodge entrance — thatched gable, timber doors and a walkway between lily ponds",
          "The Monwana team lined up to welcome guests arriving back from a game drive",
          "The main lodge lounge — open-plan, stone fireplace, doors folded back to the bush",
        ],
      },
    ],
    body: `South Africa distilled to its finest elements — a seamless private journey from the city energy of Cape Town to the restorative seclusion of Grootbos, and finally to the wild beauty of Monwana. Designed for travellers who move through the world on their own terms.

## The journey

Experience South Africa through an itinerary that balances iconic city experiences, dramatic coastal scenery, exclusive nature and extraordinary safari. Designed for discerning travellers seeking elegance, privacy and seamless service, this journey offers a refined progression from Cape Town's vibrant energy and privately guided experiences, to the restorative beauty of Grootbos, and on to the quiet exclusivity of Monwana. Every detail is curated to feel effortless, personal and exceptional.

## Cape Town — 4 nights

**Stay: Cape Grace Hotel, V&A Waterfront**

Begin your South African journey at the iconic Cape Grace, perfectly positioned on the V&A Waterfront with immediate access to the city's finest shopping, dining and cultural landmarks. Framed by Table Mountain and the Atlantic Ocean, Cape Town offers a compelling confluence of natural beauty, design, history and coastal sophistication.

This stay is built around flexibility and exclusivity. Your time here moves at your pace, shaped by a curated collection of private touring, scenic experiences and standout dining — all arranged in advance and managed throughout by your dedicated Amara Africa concierge.

### Curated private experiences in Cape Town

**Private Table Mountain and city discovery**

Begin with a private guided introduction to Cape Town's most iconic landmarks. Whether you ascend Table Mountain at sunrise or explore the city's design quarters and heritage neighbourhoods, your dedicated guide tailors the day entirely to your interests.

**Private Cape Peninsula tour**

One of the great scenic drives in the world, explored exclusively with your private guide. The route takes in Chapman's Peak, Cape Point Nature Reserve and the famous penguin colony at Boulders Beach — without the compromises of a shared itinerary.

**Private helicopter experience**

See Cape Town from above on a private helicopter flight, taking in the full sweep of Table Mountain, the Atlantic Seaboard, the Cape Peninsula and the surrounding mountains. This is one of the most memorable ways to understand the scale and beauty of the city.

**Private yacht experience**

Take to the water on a private yacht along the Atlantic Seaboard, with Table Mountain as your backdrop and the open ocean ahead. The pace and route are entirely yours.

**Private Kirstenbosch and coastal touring**

Explore the renowned Kirstenbosch National Botanical Garden in private, with guided insights into the Cape's remarkable flora. Combine with scenic coastal touring along the Garden Route's Atlantic edge.

**V&A Waterfront**

The V&A Waterfront is one of Africa's finest retail and dining destinations, immediately accessible from Cape Grace. Browse at your own pace, with guidance available if required.

### Signature dining in Cape Town

Cape Town's dining landscape is among the most accomplished in Africa, and we make a selection of reservations on your behalf to ensure each meal reflects the standard of the journey.

**FYN** — One of Cape Town's most celebrated contemporary restaurants, FYN offers a Japanese-South African culinary dialogue with sweeping views across the city. The atmosphere is elegant, the cooking inventive and the service quietly exceptional.

**Marble Cape Town** — Situated high above the city with a commanding rooftop setting, Marble is known for its precise wood-fired cooking, exceptional produce and stylish ambience. An evening here is as much about setting as it is about the food.

**Mantra Café** — A refined choice for a relaxed daytime experience, offering quality, calm and a considered menu in a comfortable setting.

**Bukhara** — A Cape Town institution and one of the finest Indian dining experiences in South Africa. The flavours are sophisticated and the cooking consistent — an ideal choice for guests seeking familiar excellence in an unfamiliar city.

---

## Grootbos — 2 nights

**Stay: Grootbos Forest Lodge**

From Cape Town, your private transfer carries you south along one of the world's most scenic coastal routes to Grootbos Forest Lodge — an exclusive retreat set between ancient milkwood forest, mountains and the sea. This is one of South Africa's most distinctive luxury escapes, and it offers something the rest of the journey deliberately does not: stillness.

Grootbos operates at a different rhythm. The reserve encompasses over 2,500 hectares of extraordinary fynbos and milkwood forest, set above the Walker Bay coastline. The lodge itself is refined and peaceful, with spacious suites designed to draw in the surrounding landscape.

Guests here enjoy guided nature and botanical experiences — the floral diversity of the Overberg is remarkable and entirely unlike anything encountered elsewhere on the journey. Horseback riding along the coastline, scenic walks through ancient forest, and coastal exploration of Walker Bay are among the activities available. The ocean is always present, whether in view or in sound.

There is also the option to simply rest. After the energy of Cape Town, Grootbos offers the space to slow down, breathe and settle into the natural world before the journey's final chapter.

---

## Monwana — 3 nights

**Stay: Monwana Game Lodge, Greater Kruger**

The journey concludes at Monwana, an intimate luxury lodge in the Greater Kruger region that offers everything a discerning safari guest should expect — and very little that they would not want.

Monwana is intentionally small. The lodge accommodates a limited number of guests at any time, which means the experience here is personal, unhurried and genuinely private. The guiding is outstanding, the wildlife viewing exceptional, and the environment — deep in the Greater Kruger — is among the most rewarding in southern Africa for encountering the Big Five.

Each day moves to the rhythm of the bush. Morning game drives depart in the cool hours before dawn, when the light is at its finest and the wildlife most active. Afternoon drives continue into the golden hour and evening. Between activities, the lodge itself is a destination — beautifully designed, generously spaced and set within a landscape that rewards quiet observation.

Dining at Monwana is taken seriously. Meals are prepared with care and served in settings that make the most of the surrounding environment — whether at a candlelit table under the night sky or in the comfort of the main lodge. The food is excellent, the service warm and the atmosphere entirely your own.

This is the dramatic, unhurried final chapter of a journey designed to leave a lasting impression.

---

## Why this journey

This itinerary brings together South Africa's most compelling elements in one coherent, private route. Cape Town provides the energy, the cultural depth and the scenic spectacle. Grootbos offers seclusion, natural beauty and a rare sense of calm. Monwana delivers the safari experience at its most personal and refined.

Each destination has been chosen because it is genuinely excellent — not merely well-known. The progression from city to coast to bush is deliberately paced, allowing the journey to build in a way that feels complete rather than hurried.

For travellers seeking the very best of South Africa, privately experienced and seamlessly delivered, this is the itinerary we return to most often. It works for couples, for honeymooners, for families and for private groups. It works for first-time visitors to Africa and for those returning with higher expectations. It is, simply, South Africa done properly.

---

## Begin your journey

This itinerary is offered as a starting point, not a fixed product. Travel dates, accommodation, pace and included experiences can all be adjusted to reflect your preferences. Contact us to begin the planning conversation.`,
  },
  // ──────────────────────────────────────────────────────────────────────
  // The Singita Signature — 14-day Cape Town + Singita safari (from the
  // "Cape Town & Singita Safari" PDF, 14 days / 13 nights, 2 adults).
  // Built to mirror the "Signature South Africa" (the-cape-and-kruger) layout.
  //
  // STATUS: on a feature branch (not yet merged to main / not live). Ready to
  // launch pending the user's go-ahead and the "Six → Seven journeys" copy fix.
  //
  // IMAGERY (real):
  //   • Cape Town gallery → real Cape Grace / V&A Waterfront photos we already
  //     hold (cape-and-kruger/cape-town/*). Correct as-is.
  //   • Sabi Sand → real Singita Ebony Lodge photos (the-singita-signature/sabi-sand/*).
  //   • Kruger → real Singita Sweni Lodge photos (the-singita-signature/kruger/*).
  //   • Hero → Singita Ebony Lodge fire deck over the Sand River.
  //   (No dedicated new Cape Grace shots were supplied; existing ones suffice.)
  //
  // STILL TO CONFIRM (from the PDF's "To be confirmed" section):
  //   • Cross-region complimentary-night offer applicability (excludes Castleton).
  //   • Whether Cape Town touring is included or concierge-arranged at cost
  //     (PDF says excursions are "not pre-reserved here" — kept as arranged).
  //   • Night split (CPT 6 · Sabi Sand 4 · Kruger 3) is flagged flexible.
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: "the-singita-signature",
    tag: "Grand",
    title: "The Singita Signature",
    titleItalic: "Singita Signature",
    oneliner:
      "Six nights at Cape Grace, then seven of Singita Big Five — the Sabi Sand and the private Kruger, back to back.",
    duration: "14 Days / 13 Nights",
    territory: "Cape Town · Sabi Sand · Kruger",
    heroImage: "/images/journeys/the-singita-signature/hero.jpg",
    cardImage: "/images/journeys/the-singita-signature/card.jpg",
    galleryImages: [
      // A trio across the three legs: Cape Grace (real, shared) → Ebony → Sweni.
      "/images/journeys/the-cape-and-kruger/cape-town/04.jpg",
      "/images/journeys/the-singita-signature/sabi-sand/01.jpg",
      "/images/journeys/the-singita-signature/kruger/02.jpg",
    ],
    published: true,
    durationNights: [13, 13],
    region: "South Africa",
    highlights: [
      "6 nights at Cape Grace, A Fairmont Managed Hotel, V&A Waterfront",
      "4 nights at Singita Ebony Lodge, Sabi Sand",
      "3 nights at Singita Sweni Lodge, the private Kruger concession",
      "Table Mountain, the Cape Peninsula and Boulders penguins",
      "A full day in the Cape Winelands — Stellenbosch & Franschhoek",
      "Twice-daily game drives with guide and tracker, plus guided walks",
      "Two contrasting Singita wilderness camps, back to back",
      "Built for two — couples and honeymooners",
    ],
    inclusions: [
      "6 nights at Cape Grace, A Fairmont Managed Hotel, V&A Waterfront",
      "4 nights at Singita Ebony Lodge, Sabi Sand",
      "3 nights at Singita Sweni Lodge, Kruger National Park",
      "Daily breakfast in Cape Town",
      "Fully inclusive stay at both Singita lodges (meals, drives and lodge activities as per the lodge offering)",
      "Twice-daily game drives with guide and tracker, plus guided walks",
      "Singita airstrip transfers and the inter-reserve light-aircraft transfer",
      "Private arrival transfer in Cape Town",
      "Complimentary hotel chauffeur within a 10km radius of Cape Grace (excludes airport)",
      "Cape Town experiences arranged by the hotel concierge (peninsula, Winelands, culture)",
      "Tailor-made planning and concierge-style service throughout",
    ],
    exclusions: [
      "International flights",
      "Domestic and inter-lodge flights (Cape Town–Johannesburg–safari routing)",
      "Conservation and community levies",
      "Airport transfers unless specifically included",
      "Visa fees if applicable",
      "Travel insurance",
      "Gratuities and personal expenses",
      "Premium beverages unless specifically included",
      "Cape Town touring and excursions booked through the concierge unless specified",
    ],
    idealFor: [
      "Couples and honeymooners",
      "GCC luxury travellers",
      "Singita enthusiasts and safari connoisseurs",
      "Guests wanting city, wine and Big Five in one journey",
      "Travellers seeking an unhurried 13-night route",
      "First-time and returning visitors seeking the very best",
    ],
    pricingFrom: 0,
    pricingCurrency: "USD",
    pricingUnit: "on request",
    featureImage: "/images/journeys/the-singita-signature/hero.jpg",
    relatedSlugs: ["the-cape-and-kruger", "the-family-legacy"],
    seasonal: false,
    order: 2,
    seoTitle:
      "Cape Town & Singita Safari — 14-Day Luxury South Africa Journey | Amara Africa",
    seoDescription:
      "A private 13-night South Africa journey: six nights at Cape Grace on the V&A Waterfront, then Singita Big Five safari across the Sabi Sand and a private Kruger concession. Tailor-made for GCC travellers.",
    seoKeywords: [
      "Cape Town and Singita safari",
      "luxury South Africa itinerary",
      "Singita safari Sabi Sand Kruger",
      "Cape Grace V&A Waterfront",
      "14 day South Africa luxury tour",
      "GCC travel to South Africa",
      "private Big Five safari",
    ],
    sectionGalleries: [
      {
        afterHeading: "Cape Town · Cape Grace — 6 nights",
        images: [
          "/images/journeys/the-cape-and-kruger/cape-town/01.jpg",
          "/images/journeys/the-cape-and-kruger/cape-town/02.jpg",
          "/images/journeys/the-cape-and-kruger/cape-town/03.jpg",
          "/images/journeys/the-cape-and-kruger/cape-town/04.jpg",
          "/images/journeys/the-cape-and-kruger/cape-town/05.jpg",
        ],
        alts: [
          "Cape Grace on its private quay at the V&A Waterfront",
          "A private yacht moored in the V&A marina with the hotel behind",
          "Arrival at Cape Grace beneath Table Mountain",
          "The V&A Waterfront at sunset — Table Mountain reflected in the harbour",
          "The Cape Grace pool deck on a bright summer day",
        ],
      },
      {
        afterHeading: "Sabi Sand · Singita — 4 nights",
        images: [
          "/images/journeys/the-singita-signature/sabi-sand/01.jpg",
          "/images/journeys/the-singita-signature/sabi-sand/02.jpg",
          "/images/journeys/the-singita-signature/sabi-sand/03.jpg",
        ],
        alts: [
          "Singita Ebony Lodge — the fire deck above the Sand River",
          "The Ebony lounge under a thatched roof, open to Sand River views",
          "An Ebony suite bathroom in stone, open to the riverine bush",
        ],
      },
      {
        afterHeading: "Kruger · Singita — 3 nights",
        images: [
          "/images/journeys/the-singita-signature/kruger/01.jpg",
          "/images/journeys/the-singita-signature/kruger/02.jpg",
        ],
        alts: [
          "Singita Sweni Lodge — a timber-clad suite interior in the Lebombo concession",
          "A Sweni pool suite, its private deck and pool above the bush",
        ],
      },
    ],
    body: `Two halves of South Africa at its best — six refined nights at Cape Grace on the V&A Waterfront, then seven of Singita Big Five safari split across the Sabi Sand and the company's private concession in the Kruger. One elegant city base, two contrasting wilderness camps.

## The journey

A seamless private progression from city to wild. Cape Town first — Table Mountain, the peninsula, the Winelands and the Waterfront, at your own pace from a hotel on its own quay. Then the bush: the dense riverine forest of the Sabi Sand, among the finest leopard country in Africa, followed by the dramatic open horizons of Singita's private Kruger concession. The night split — Cape Town 6, Sabi Sand 4, Kruger 3 — and the lodge choices are flexible, shaped around your dates and pace.

## Cape Town · Cape Grace — 6 nights

**Stay: Cape Grace, A Fairmont Managed Hotel — V&A Waterfront**

Begin on a private quay between the Waterfront and the yacht marina, beneath Table Mountain — recently reopened as a Fairmont managed hotel after a full renovation, with the Heirloom restaurant, Bascule Bar and afternoon tea in the Library Lounge. Six unhurried nights here give the city room to breathe, with every experience arranged in advance through the concierge and a complimentary chauffeur on hand within the city.

### Curated days on the Cape

**Table Mountain & the city**

The cableway to the summit (weather permitting), then the historic centre — the Company's Garden and the brightly painted streets of Bo-Kaap on Signal Hill — with afternoon tea back at the hotel.

**The Cape Peninsula**

One of the world's great scenic drives: the coastal Chapman's Peak, Cape Point and the Cape of Good Hope, and the penguin colony at Boulders Beach near Simon's Town.

**The Cape Winelands**

A day among the historic estates and cellars of Stellenbosch and Franschhoek, with lunch among the vines.

**Culture, art & the spa**

A morning ferry to Robben Island, contemporary art at Zeitz MOCAA or the gardens at Kirstenbosch — and an afternoon reserved for the Fairmont Spa.

**An open day**

A flexible final day on the Cape: the Atlantic beaches at Camps Bay and Clifton, the wine farms of Constantia, or simply the Waterfront.

---

## Sabi Sand · Singita — 4 nights

**Stay: Singita Ebony Lodge, Sabi Sand**

Fly from Cape Town to the Singita airstrip and transfer to the lodge for lunch and an introductory late-afternoon drive into the dense riverine forest of the Sabi Sand — among the finest leopard country in Africa. The full safari rhythm follows: early-morning and late-afternoon drives with guide and tracker, guided walks, and long, leisurely hours at the lodge through the heat of the day. Two full days to work the territory, track a specific animal across drives, and make the most of the light for photography.

---

## Kruger · Singita — 3 nights

**Stay: Singita Sweni Lodge, Kruger National Park**

A morning drive, then a light-aircraft transfer east to Singita's private concession in the Kruger — a dramatic landscape of rhyolite ridges and giant euphorbia, known for its lion prides and vast, uncrowded terrain. Morning and late-afternoon drives, with walking safaris available for a closer read of the bush, before a last evening under a dark Kruger sky closes the journey.

---

## When to travel

The two halves pull gently in different directions. Cape Town is at its best in the warm, dry summer — roughly November to March — for the city, beaches and peninsula. Safari game-viewing is strongest in the dry winter, May to October, when thinner vegetation and animals gathering at water make sightings easier. The shoulder months — around April, or October into November — give the most balanced compromise across both.

---

## Why this journey

It brings together the two things travellers most want from South Africa — a world-class city and a world-class safari — without compromise on either. Cape Grace anchors the first half in comfort and location; Singita anchors the second in some of the finest guiding and most exclusive traversing rights in the country. The progression from city to bush is deliberately paced, and the whole route is private from first transfer to last.

Designed here for two — couples and honeymooners — it adapts readily for families and private groups.

---

## Begin your journey

This itinerary is offered as a starting point, not a fixed product. Travel dates, lodges, night split and included experiences can all be adjusted to reflect your preferences. Contact us to begin the planning conversation.`,
  },
  {
    slug: "the-falls-and-delta",
    tag: "Wonder",
    title: "The Falls & Delta",
    titleItalic: "Falls & Delta",
    oneliner:
      "Victoria Falls to the Okavango. Africa's two great water wonders, back to back.",
    duration: "7–10 nights",
    territory: "Zambia — Victoria Falls & Kafue",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/1By6DT2Fa4M0kQXWgnGADp/78137645393ae20f1ae0080e6efc737a/Grumeti-region.jpg?w=1600&h=900&fl=progressive&q=92&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/1By6DT2Fa4M0kQXWgnGADp/78137645393ae20f1ae0080e6efc737a/Grumeti-region.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      "https://images.ctfassets.net/wds1hqrprqxb/159GHit1WtFKaIN8GTm5EO/1cc3f6ef571517af928b522143e47bdd/Pamushana__Activities_Game_Drives_Slider3.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/4zJgvlYdmkjDUW4dX6sw6b/d9ebff89c039f9c73e460594579de4e9/Malilangwe_House_Activities_Rock_Art_Slider3.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/1usqCukJSIQ9RJUdAm9Sr8/9fd0599caf7306b70bdc092ee8f79fca/Faru_Faru_Activities_Wellness_slider2.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
    ],
  },
  {
    slug: "the-coastal-escape",
    tag: "Seclusion",
    title: "The Coastal Escape",
    titleItalic: "Coastal Escape",
    oneliner:
      "Zanzibar's coral coast. Overwater villas, Halal cuisine, and total seclusion.",
    duration: "5–8 nights",
    territory: "Tanzania — Zanzibar",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/26DCSDgkZ8sn3oegOwTPOp/88d5ee5aba1c2da130a68cd5f01115aa/Singita_Serengeti_House_Fire_Pit_2MB.jpg?w=1600&h=900&fl=progressive&q=92&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/26DCSDgkZ8sn3oegOwTPOp/88d5ee5aba1c2da130a68cd5f01115aa/Singita_Serengeti_House_Fire_Pit_2MB.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      "https://images.ctfassets.net/wds1hqrprqxb/50P5jvbtSiXTwOSXU5OIVF/14dc7f44dad009b2c3b3a8b4d0d5b7a4/Singita_Milele_Main_Lounge_6.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/6hPMB4ZhOIAzF3kh6szoN9/1c422e0e97b331515e29c73f582a4af1/Sabora_Activities_pool_slider3.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/4baWLsS8IYP5i5QTrIfO1E/d2dc3455b310741389f9f2b1c06e963b/SocialMilele-05906.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  // The Garden Route — six-night coastal extension (AA-GR-06). Sold as an
  // add-on to any safari and as a standalone journey.
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: "garden-route",
    code: "AA-GR-06",
    addOn: true,
    tag: "Extension",
    title: "The Garden Route",
    titleItalic: "Garden Route",
    oneliner: "Six nights along the Cape's southern shore.",
    duration: "7 Days / 6 Nights",
    territory: "Hermanus · Knysna · Plettenberg Bay",
    bestSeason: "June to November",
    heroImage: "/images/itineraries/garden-route/hero.jpg",
    cardImage: "/images/itineraries/garden-route/card.jpg",
    galleryImages: [
      "/images/itineraries/garden-route/gallery-1.jpg",
      "/images/itineraries/garden-route/gallery-2.jpg",
      "/images/itineraries/garden-route/gallery-3.jpg",
    ],
    published: true,
    durationNights: [6, 6],
    region: "Western Cape",
    highlights: [
      "2 nights at The Marine, Hermanus — Liz McGrath Collection",
      "2 nights at The Turbine Hotel & Spa, Thesen Island, Knysna",
      "2 nights at The Plettenberg — Liz McGrath Collection",
      "Clarence Drive, the coastal road between mountain and sea",
      "Walker Bay whale watching in season (June to November)",
      "The Hemel-en-Aarde Valley, with non-alcoholic tastings on request",
      "The Knysna lagoon with The Water Club — private, sole-use charters",
      "Robberg Nature Reserve or the Tsitsikamma forest with a private guide",
      "Private vehicle and guide throughout, Cape Town to George Airport",
    ],
    inclusions: [
      "6 nights in the accommodation shown",
      "Private vehicle and guide throughout",
      "Breakfast daily",
      "All transfers, Cape Town to George Airport",
    ],
    exclusions: [
      "International and domestic flights",
      "Optional excursions unless specified",
      "Meals other than breakfast",
      "Gratuities",
    ],
    idealFor: [
      "An extension to any Amara safari",
      "Couples and honeymooners",
      "Families and multi-generational groups",
      "Whale season travellers, June to November",
      "Guests who prefer the coast unhurried",
    ],
    pricingFrom: 0,
    pricingCurrency: "USD",
    pricingUnit: "on request",
    relatedSlugs: ["the-cape-and-kruger", "the-singita-signature"],
    seasonal: false,
    order: 8,
    seoTitle:
      "The Garden Route — Six-Night Coastal Extension | Amara Africa",
    seoDescription:
      "Six nights along the Cape's southern shore — The Marine in Hermanus, The Turbine on Thesen Island and The Plettenberg above Formosa Bay. A private coastal extension to any Amara safari, or a journey in its own right.",
    seoKeywords: [
      "Garden Route luxury itinerary",
      "Garden Route safari extension",
      "Hermanus whale watching hotel",
      "The Marine Hermanus",
      "Turbine Hotel Knysna",
      "The Plettenberg hotel",
      "luxury South Africa coastal tour",
    ],
    excursions: {
      partnerName: "The Water Club",
      partnerUrl: "https://thewaterclub.co.za/",
      bookingUrl: "https://thewaterclub.activitar.com/",
      address: "TH36 Sawtooth Lane, Thesen Island, Knysna",
      note: "Time on the water is arranged with The Water Club — the Garden Route's largest private charter fleet, working three waters: the Knysna lagoon, the Swartvlei estuary at Sedgefield and the Touw River at Wilderness. Their Knysna berth sits on the Thesen Island marina, a short walk from The Turbine's front door, so the water is part of the stay rather than an outing from it. Every charter is skippered, private and sole-use — your party and no one else — with Knysna oysters and champagne served on board on request. Booked through your consultant, or directly with the partner.",
      items: [
        {
          name: "Private lagoon cruise",
          desc: "The classic — a sole-use sunset charter through the moorings and out toward the Heads, the lagoon at its best hour. Oysters and champagne on deck as the light goes; the skipper holds the boat where the view is.",
          img: "/images/itineraries/garden-route/water-club-1.jpg",
          highlight: true,
        },
        {
          name: "Fishing charter",
          desc: "A skippered sole-use boat on the lagoon or beyond the Heads — tackle aboard, patience optional. It suits families and multi-generational groups particularly well; children are welcomed, not tolerated.",
          img: "/images/itineraries/garden-route/water-club-4.jpg",
        },
        {
          name: "Guided fly fishing",
          desc: "The quieter waters — Swartvlei at Sedgefield and the Touw River at Wilderness, with a local guide who knows where the grunter feed. Catch-and-release, at first light or the last of it.",
          img: "/images/itineraries/garden-route/water-club-5.jpg",
        },
        {
          name: "Kayak hire",
          desc: "Self-guided, straight from the marina — the island's quiet canals and the open lagoon at your own pace, no skipper and no schedule.",
          img: "/images/itineraries/garden-route/water-club-6.jpg",
        },
      ],
    },
    // Photography: The Marine & The Plettenberg © Liz McGrath Collection
    // (supplied for our use); The Turbine © The Turbine Hotel & Spa; lagoon
    // and Heads shots supplied by The Water Club; hero/card via Unsplash.
    sectionGalleries: [
      {
        afterHeading: "Day 2 — Walker Bay & Hemel-en-Aarde",
        images: [
          "/images/itineraries/garden-route/marine-1.jpg",
          "/images/itineraries/garden-route/marine-2.jpg",
          "/images/itineraries/garden-route/marine-3.jpg",
          "/images/itineraries/garden-route/marine-4.jpg",
        ],
        alts: [
          "The Marine on the Hermanus cliffs above Walker Bay",
          "Walker Bay from a sea-facing room at The Marine",
          "Dining at The Marine",
          "Southern right whales breaching below the cliffs",
        ],
      },
      {
        afterHeading: "Day 4 — Thesen Island & the lagoon",
        images: [
          "/images/itineraries/garden-route/turbine-1.jpg",
          "/images/itineraries/garden-route/turbine-2.jpg",
          "/images/itineraries/garden-route/water-club-2.jpg",
          "/images/itineraries/garden-route/water-club-3.jpg",
        ],
        alts: [
          "The Turbine — Knysna's 1939 power station, reimagined",
          "A Luxury Room at The Turbine, canal side",
          "A private Water Club charter on the Knysna lagoon",
          "Oysters and champagne served on the water",
        ],
      },
      {
        afterHeading: "Day 5 — The Heads to Plettenberg Bay",
        images: [
          "/images/itineraries/garden-route/heads-1.jpg",
          "/images/itineraries/garden-route/heads-2.jpg",
          "/images/itineraries/garden-route/heads-3.jpg",
        ],
        alts: [
          "A hidden cove at the Knysna Heads from above",
          "The Heads from the eastern viewpoint, the lagoon meeting the sea",
          "Surf breaking on the sandstone at the Heads",
        ],
      },
      {
        afterHeading: "Day 6 — Robberg & Tsitsikamma",
        images: [
          "/images/itineraries/garden-route/plettenberg-1.jpg",
          "/images/itineraries/garden-route/plettenberg-2.jpg",
          "/images/itineraries/garden-route/plettenberg-3.jpg",
        ],
        alts: [
          "The Plettenberg on its headland above Formosa Bay",
          "The pool deck over the ocean at The Plettenberg",
          "Formosa Bay beneath the hotel",
        ],
      },
    ],
    body: `Africa's great plains ask something of a traveller. The Garden Route asks nothing at all.

Six nights along the southern Cape — cliff-top suites above a whale bay, a 1939 power station reimagined on a private island, a headland hotel above the Indian Ocean. Three houses, each with a view that justifies the stay on its own.

Designed as an extension to any Amara safari, or as a journey in its own right.

## Day 1 — Cape Town to Hermanus

**Stay: The Marine, Hermanus**

A private transfer along Clarence Drive, the coastal road between mountain and sea. Arrival at The Marine, and the afternoon at leisure.

## Day 2 — Walker Bay & Hemel-en-Aarde

**Stay: The Marine, Hermanus**

Whale watching in season, or the Cliff Path at your own pace. The afternoon in the Hemel-en-Aarde Valley — private estate visits arranged, with non-alcoholic tastings on request.

## Day 3 — The coastal road to Knysna

**Stay: The Turbine Hotel & Spa, Thesen Island**

Through Swellendam and over the Outeniqua Pass. Arrival at The Turbine in the late afternoon.

## Day 4 — Thesen Island & the lagoon

**Stay: The Turbine Hotel & Spa, Thesen Island**

A morning on the water with The Water Club, whose marina berth sits a short walk from the hotel. The afternoon at the Amani Spa.

## Day 5 — The Heads to Plettenberg Bay

**Stay: The Plettenberg, Plettenberg Bay**

The Knysna Heads in the morning — Featherbed's private reserve on the western head, or the eastern viewpoint. Thirty minutes on to The Plettenberg.

## Day 6 — Robberg & Tsitsikamma

**Stay: The Plettenberg, Plettenberg Bay**

Robberg Nature Reserve with a private guide, or the Tsitsikamma forest and canopy. The afternoon at leisure.

## Day 7 — Departure via George

Ninety minutes to George Airport, connecting to Cape Town or Johannesburg.

---

## The houses

### The Marine — Hermanus

A Hermanus landmark since 1902, when it opened as the village's grand seaside hotel — whalers' boats still worked the bay below its windows. The late hotelier Liz McGrath bought and restored it in 1998, and it remains the white flagship of her collection: cliff-top above Walker Bay, where the finest land-based whale watching on earth breaches below the terrace in season, and the Cliff Path begins at the door.

### The Turbine Hotel & Spa — Thesen Island, Knysna

The Thesen family sailed from Norway and settled Knysna in 1870, building the timber business that gave the island its name. Their power station, raised in 1939, burned offcuts from the family sawmill and lit the town for decades — it fed Knysna until the national grid arrived in the mid-1970s, and ran its final shift on 26 June 2001. Rather than demolish it, the island's redevelopment kept the machine: the boilers, turbines and gantries were preserved where they stood, painted, and a 26-room hotel was built around them. You take breakfast among the workings that once powered the town.

### The Plettenberg — Plettenberg Bay

The founding house of the Liz McGrath Collection — the first hotel she bought, in 1989, and the one she rebuilt into the Garden Route's grande dame. It stands on the headland the village once called the Lookout, above Formosa Bay: ocean from every window, beaches on either side, dolphins and southern right whales in the water below.

---

## Why this journey

Two houses of the Liz McGrath Collection, one heritage landmark, and a coastline that has never needed embellishment.

## Begin your journey

This itinerary is offered as a starting point, not a fixed product. Travel dates, accommodation, pace and included experiences can all be adjusted to reflect your preferences — and the whole route joins seamlessly onto the end of any Amara safari. Contact us to begin the planning conversation.`,
  },
  // ──────────────────────────────────────────────────────────────────────
  // The five signature journeys — added from the "Amara Africa — Five
  // Signature Journeys" itinerary set (Sept 2026). Hero photography comes
  // from the itinerary documents themselves; galleries reuse only
  // photography we already hold and have verified for the places shown.
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: "classic-luxury-south-africa",
    code: "AA-CL-07",
    tag: "Essential",
    title: "Classic Luxury South Africa",
    titleItalic: "Classic Luxury",
    oneliner:
      "The Mother City, the Whale Coast and the Big Five — the essential South Africa, beautifully done.",
    duration: "11 Days / 10 Nights",
    territory: "Cape Town · Grootbos · Sabi Sand",
    heroImage: "/images/itineraries/classic-luxury-south-africa/hero.jpg",
    cardImage: "/images/itineraries/classic-luxury-south-africa/card.jpg",
    galleryImages: [
      "/images/journeys/the-cape-and-kruger/cape-town/01.jpg",
      "/images/journeys/the-cape-and-kruger/grootbos/02.jpg",
      "/images/journeys/the-cape-and-kruger/cape-town/04.jpg",
    ],
    published: true,
    durationNights: [10, 10],
    region: "South Africa",
    highlights: [
      "4 nights at Cape Grace on the V&A Waterfront",
      "3 nights at Grootbos Private Nature Reserve, Walker Bay",
      "3 nights at Sabi Sabi Earth Lodge, Sabi Sand",
      "Table Mountain, the Cape Peninsula and the Bo-Kaap, privately guided",
      "Walker Bay whale watching in season and the marine Big Five",
      "Big Five game drives at dawn and dusk with a private ranger",
      "Connecting suites and halal-aware dining arranged throughout",
      "One Amara journey designer from the Gulf to the ground",
    ],
    inclusions: [
      "4 nights at Cape Grace, Cape Town",
      "3 nights at Grootbos Private Nature Reserve",
      "3 nights at Sabi Sabi Earth Lodge, Sabi Sand",
      "Breakfast daily in Cape Town; fully inclusive stays at Grootbos and Sabi Sabi",
      "Private touring in Cape Town — Table Mountain, the Peninsula, the Winelands",
      "Private transfers throughout, including the coastal drive to Grootbos",
      "Internal flight Cape Town–Skukuza and road transfer to the lodge",
      "Safari activities at Sabi Sabi with a private ranger",
      "Meet and greet on arrival; tailor-made planning and concierge service throughout",
    ],
    exclusions: [
      "International flights",
      "Visa fees if applicable",
      "Travel insurance",
      "Personal expenses and gratuities",
      "Premium beverages unless specifically included",
      "Optional activities not specified in the itinerary",
    ],
    idealFor: [
      "First-time visitors who want the essential South Africa, privately",
      "GCC luxury travellers",
      "Couples and honeymooners",
      "Families — connecting suites arranged throughout",
    ],
    pricingFrom: 0,
    pricingCurrency: "USD",
    pricingUnit: "on request",
    bestSeason: "Year-round · whales June to November",
    relatedSlugs: ["ultimate-luxury-south-africa", "the-cape-and-kruger", "garden-route"],
    seasonal: false,
    seoTitle: "Classic Luxury South Africa — Cape Town, Grootbos & Sabi Sand | Amara Africa",
    seoDescription:
      "An 11-day private journey through the essential South Africa — Cape Grace on the V&A Waterfront, Grootbos above Walker Bay, and the Big Five at Sabi Sabi Earth Lodge. Crafted for the Gulf.",
    seoKeywords: [
      "luxury South Africa itinerary",
      "Cape Town and safari holiday",
      "Sabi Sabi Earth Lodge journey",
      "Grootbos private nature reserve stay",
      "GCC travel to South Africa",
      "halal friendly South Africa tour",
    ],
    body: `The essential South Africa in one unhurried line — the city at its most gracious, the Whale Coast at its stillest, and the Big Five in the private reserve that defined the luxury safari. Three chapters, each given the nights it deserves.

## The journey

Eleven days, three stays, no wasted movement. Cape Town opens the journey with four nights at Cape Grace on the V&A Waterfront — the mountain, the Peninsula and the Winelands each taken privately and at your pace. A single scenic drive carries you to Grootbos, the eco-reserve above Walker Bay, for three nights of fynbos, forest and — in season — the southern right whales below. One internal flight then swaps ocean for bush: three nights at Sabi Sabi Earth Lodge in the Sabi Sand, where the day is measured in game drives and firelight.

## Cape Town — 4 nights

**Stay: Cape Grace, V&A Waterfront**

A gracious address on the marina with the harbour on one side and Table Mountain filling the sky on the other. The city's finest shopping and dining sit at the front door, and your dedicated guide collects you from it each morning.

The days here follow the classic Cape arc, privately: the cableway to the summit of Table Mountain and the painted streets of the Bo-Kaap; the full Peninsula day — Boulders Beach penguins, the Cape of Good Hope, and the theatre of the Chapman's Peak drive; and a day among the Constantia and Stellenbosch estates, or simply at leisure between the Waterfront and the spa. Dinner reservations are made ahead at the city's best tables, halal-aware throughout.

---

## Grootbos — 3 nights

**Stay: Grootbos Private Nature Reserve, Walker Bay**

A private transfer of about two and a half hours traces the coast to Grootbos — 2,500 hectares of ancient milkwood forest and flowering fynbos above Walker Bay, with suites and villas built to hold the view. This is the journey's exhale.

In season (June to November) the bay below carries one of the world's great whale populations, watched from the cliffs or by boat; the marine Big Five — whale, shark, seal, penguin, dolphin — are all possible in a single sea outing. Ashore there are flower safaris through the reserve, horses on the dunes, forest walks and a spa in the fynbos. The kitchen is one of the coast's celebrated tables.

---

## Sabi Sand — 3 nights

**Stay: Sabi Sabi Earth Lodge**

A short flight from Cape Town to Skukuza and twenty minutes by road deliver you to the Sabi Sand — the private reserve that wrote the rules of the luxury safari — in time for the first evening drive. Earth Lodge is its most sculptural address: carved into a hillside, almost invisible from a distance, all raw texture and deep quiet.

The rhythm here is the oldest one — out at first light with your private ranger, back for breakfast in the bush; out again as the day cools, home by lantern light. Between drives the lodge does what great lodges do: long lunches, an art-filled interior, a spa, and the theatre of the wild running past the deck.

---

## Good to know

The Sabi Sand lies in a low-risk malaria area — your journey designer will advise on simple precautions. Cape Town and the Whale Coast are malaria-free. Flights: direct Gulf–Cape Town; one internal flight Cape Town–Skukuza. Daily touring shown is illustrative — final touring is tailored to your travellers.

## Why this journey

Because it is the distilled answer to the first question every traveller asks of South Africa: city, coast and Big Five, each done properly, in eleven days that never feel hurried. Connecting suites, halal-aware dining, prayer times and Qibla arranged, private guiding throughout, and one Amara journey designer carrying every detail from the Gulf to the ground.

## Begin your journey

This itinerary is offered as a starting point, not a fixed product. Travel dates, accommodation, pace and included experiences can all be adjusted to reflect your preferences. Contact us to begin the planning conversation.`,
  },
  {
    slug: "ultimate-luxury-south-africa",
    code: "AA-UL-08",
    tag: "Icons",
    title: "Ultimate Luxury South Africa",
    titleItalic: "Ultimate Luxury",
    oneliner:
      "The Cape's landmark addresses, Grootbos and the wild heart of the Timbavati.",
    duration: "11 Days / 10 Nights",
    territory: "Cape Town · Grootbos · Timbavati",
    heroImage: "/images/itineraries/ultimate-luxury-south-africa/hero.jpg",
    cardImage: "/images/itineraries/ultimate-luxury-south-africa/card.jpg",
    galleryImages: [
      "/images/journeys/the-cape-and-kruger/grootbos/05.jpg",
      "/images/journeys/the-cape-and-kruger/cape-town/04.jpg",
      "/images/journeys/the-cape-and-kruger/grootbos/03.jpg",
    ],
    published: true,
    durationNights: [10, 10],
    region: "South Africa",
    highlights: [
      "4 nights at One&Only Cape Town, the marina resort beneath Table Mountain",
      "3 nights at Grootbos Private Nature Reserve, Walker Bay",
      "3 nights at Tanda Tula Safari Camp in the open Timbavati",
      "The cableway, the Waterfront and the Peninsula, privately guided",
      "Walker Bay whales in season; coastal and flower safaris",
      "Walking safaris, bush dining and star-lit skies in Greater Kruger",
      "Landmark suites with room for the family; halal-aware dining arranged",
      "One Amara journey designer end to end",
    ],
    inclusions: [
      "4 nights at One&Only Cape Town",
      "3 nights at Grootbos Private Nature Reserve",
      "3 nights at Tanda Tula Safari Camp, Timbavati",
      "Breakfast daily in Cape Town; fully inclusive stays at Grootbos and Tanda Tula",
      "Private touring in Cape Town — the mountain, the Peninsula, the Winelands",
      "Private transfers throughout, including the coastal drive to Grootbos",
      "Internal flight Cape Town–Hoedspruit and road transfer to camp",
      "Safari activities at Tanda Tula with a private tracker",
      "Meet and greet on arrival; tailor-made planning and concierge service throughout",
    ],
    exclusions: [
      "International flights",
      "Visa fees if applicable",
      "Travel insurance",
      "Personal expenses and gratuities",
      "Premium beverages unless specifically included",
      "Optional activities not specified in the itinerary",
    ],
    idealFor: [
      "Travellers who want the iconic addresses done privately",
      "GCC families — spacious suites and connecting rooms",
      "Couples marking an occasion",
      "Returning guests ready for the tented wild",
    ],
    pricingFrom: 0,
    pricingCurrency: "USD",
    pricingUnit: "on request",
    bestSeason: "Year-round · whales June to November",
    relatedSlugs: ["classic-luxury-south-africa", "the-singita-signature", "garden-route"],
    seasonal: false,
    seoTitle: "Ultimate Luxury South Africa — One&Only, Grootbos & the Timbavati | Amara Africa",
    seoDescription:
      "Eleven days across South Africa's landmark addresses — One&Only Cape Town, Grootbos above Walker Bay, and Tanda Tula Safari Camp in the open Timbavati. Crafted for the Gulf.",
    seoKeywords: [
      "One&Only Cape Town itinerary",
      "Timbavati luxury safari",
      "Tanda Tula Safari Camp journey",
      "ultimate luxury South Africa",
      "GCC luxury travel Africa",
      "halal friendly luxury safari",
    ],
    body: `The iconic route, taken at its highest register — a landmark marina resort beneath Table Mountain, the great eco-reserve of the Whale Coast, and a classic tented camp in the open Timbavati, where the safari still feels the way it was meant to.

## The journey

Four nights at One&Only Cape Town anchor the city chapter — spa island, celebrated dining, family suites, the mountain framed from the marina. The coast follows: three nights at Grootbos above Walker Bay, whales below in season. The finale is the Timbavati — three nights at Tanda Tula Safari Camp in the open Greater Kruger wilderness, canvas and lantern light, a private tracker in the vehicle and the bush unfenced in every direction.

## Cape Town — 4 nights

**Stay: One&Only Cape Town**

A landmark resort set on its own marina island beneath Table Mountain — vast suites, a spa on its own island, and some of the city's most celebrated dining a lift-ride away. The Waterfront is at the door; the city is yours privately.

Days follow your pace: the cableway to the summit and the harbour and oceans of the V&A; the full Peninsula — Boulders penguins, the Cape of Good Hope, Chapman's Peak; the Constantia and Stellenbosch estates, or a day of spa and shopping in the city. Evenings are reserved ahead at the Cape's best tables, halal-aware.

---

## Grootbos — 3 nights

**Stay: Grootbos Private Nature Reserve, Walker Bay**

The coastal drive south — about two and a half hours, and one of the world's lovelier transfers — ends amid 2,500 hectares of fynbos and ancient milkwood forest above Walker Bay. Suites and villas hold wide sea views; the kitchen is one of the coast's great tables.

In season the bay fills with southern right whales, watched from the cliffs or by boat. There are flower safaris and coastal drives, riding and sea kayaking, forest walks and the spa deep in the reserve. After the city's pace, Grootbos is deliberately still.

---

## The Timbavati — 3 nights

**Stay: Tanda Tula Safari Camp, Greater Kruger**

A short flight to Hoedspruit and three-quarters of an hour by road bring you to camp in time for the evening drive. Tanda Tula is the classic luxury tented camp — canvas under old trees on a riverbank, open to the sounds of the night, impeccable in its comfort.

The Timbavati is open Greater Kruger wilderness: Big Five country traversed with a private tracker, walking safaris at first light, bush dining under the marula trees and star-lit skies that the Gulf's cities have long forgotten. It is safari as it was meant to be — unhurried, close and quiet.

---

## Good to know

The Timbavati (Greater Kruger) is a low-risk malaria area — precautions advised. Cape Town and the Whale Coast are malaria-free. Flights: direct Gulf–Cape Town; one internal flight Cape Town–Hoedspruit. Daily touring shown is illustrative — final touring is tailored to your travellers.

## Why this journey

For travellers who want the icons — the One&Only name, the Grootbos reserve, the true tented safari — threaded into one line with nothing ordinary in between. Landmark suites with room for the family, halal-aware dining arranged, prayer times and Qibla respected, private guiding and transfers, and one Amara journey designer end to end.

## Begin your journey

This itinerary is offered as a starting point, not a fixed product. Travel dates, accommodation, pace and included experiences can all be adjusted to reflect your preferences. Contact us to begin the planning conversation.`,
  },
  {
    slug: "cape-safari-and-victoria-falls",
    code: "AA-VF-09",
    tag: "Finale",
    title: "Cape Town, Safari & Victoria Falls",
    titleItalic: "Victoria Falls",
    oneliner:
      "The Mother City, the Sabi Sand wild and the thunder of the Falls — three of Africa's great chapters.",
    duration: "11 Days / 10 Nights",
    territory: "Cape Town · Sabi Sand · Victoria Falls",
    heroImage: "/images/itineraries/cape-safari-and-victoria-falls/hero.jpg",
    cardImage: "/images/itineraries/cape-safari-and-victoria-falls/card.jpg",
    galleryImages: [
      "/images/itineraries/cape-safari-and-victoria-falls/falls-crop-1.jpg",
      "/images/journeys/the-cape-and-kruger/cape-town/04.jpg",
      "/images/itineraries/cape-safari-and-victoria-falls/falls-crop-2.jpg",
    ],
    published: true,
    durationNights: [10, 10],
    region: "South Africa & Zimbabwe",
    highlights: [
      "4 nights at Twelve Apostles Hotel & Spa on the Atlantic coast",
      "3 nights at Dulini Moya in the Sabi Sand",
      "3 nights at Victoria Falls River Lodge on the Zambezi",
      "Big Five drives at dawn and dusk with a private ranger and tracker",
      "A guided tour of the Falls and a sunset cruise on the great river",
      "River game viewing and island dining on the Zambezi",
      "Every internal flight, transfer and border formality handled end to end",
      "Halal-aware dining and prayer times arranged throughout",
    ],
    inclusions: [
      "4 nights at Twelve Apostles Hotel & Spa, Cape Town",
      "3 nights at Dulini Moya, Sabi Sand",
      "3 nights at Victoria Falls River Lodge, Zambezi National Park",
      "Breakfast daily in Cape Town; fully inclusive stays on safari and at the Falls",
      "Private touring in Cape Town — Table Mountain, the Peninsula, the Winelands",
      "Internal flight Cape Town–Skukuza; scheduled lodge-hop flight to Victoria Falls",
      "Cross-border formalities and visa guidance for Zimbabwe",
      "A guided Falls tour and a Zambezi sunset cruise",
      "Meet and greet on arrival; tailor-made planning and concierge service throughout",
    ],
    exclusions: [
      "International flights",
      "Visa fees if applicable",
      "Travel insurance",
      "Personal expenses and gratuities",
      "Premium beverages unless specifically included",
      "Optional activities not specified in the itinerary",
    ],
    idealFor: [
      "Travellers who want Africa's three great chapters in one journey",
      "GCC families and private groups",
      "Honeymooners seeking a grand finale",
      "Photographers — the Falls and the Sabi Sand in one line",
    ],
    pricingFrom: 0,
    pricingCurrency: "USD",
    pricingUnit: "on request",
    bestSeason: "Falls fullest February to June",
    relatedSlugs: ["the-falls-and-delta", "classic-luxury-south-africa", "the-cape-and-kruger"],
    seasonal: false,
    seoTitle: "Cape Town, Safari & Victoria Falls — a Private 11-Day Journey | Amara Africa",
    seoDescription:
      "Three of Africa's great chapters in one private journey — the Twelve Apostles coast, the Sabi Sand's Big Five at Dulini Moya, and the Zambezi at Victoria Falls River Lodge.",
    seoKeywords: [
      "Cape Town safari Victoria Falls itinerary",
      "Victoria Falls luxury journey",
      "Dulini Moya Sabi Sand",
      "Zambezi river lodge holiday",
      "South Africa Zimbabwe private tour",
      "GCC travel Victoria Falls",
    ],
    body: `Three landmarks in one journey — the Atlantic drama of the Cape, the Sabi Sand's close and unhurried Big Five, and the oldest spectacle on the continent: a mile of the Zambezi falling into the gorge. The route runs city, wild, water — and every connection is carried for you.

## The journey

Four nights on the Atlantic coast at the Twelve Apostles open the journey — mountain behind, ocean ahead, the city ten minutes away. A flight to Skukuza brings the Sabi Sand and three nights at Dulini Moya, an intimate contemporary lodge celebrated for close, patient sightings. A scheduled lodge-hop flight then crosses to Zimbabwe: three nights at Victoria Falls River Lodge on the banks of the Zambezi, inside the national park, with the spray of the Falls on the horizon.

## Cape Town — 4 nights

**Stay: Twelve Apostles Hotel & Spa, Atlantic coast**

Between mountain and sea on the Atlantic edge — a dramatic setting, a celebrated spa, and sunsets that need no arranging. The city sits just beyond Lion's Head; your private guide bridges the two.

The days take the classic shape: the cableway and the V&A Waterfront with the Bo-Kaap's painted streets; the Peninsula in full — penguins at Boulders, the Cape of Good Hope, Chapman's Peak; then the Constantia and Stellenbosch estates, or a day given to the coast and the spa. Evening reservations are made ahead, halal-aware.

---

## Sabi Sand — 3 nights

**Stay: Dulini Moya**

The flight from Cape Town to Skukuza takes a morning; the road to the lodge, half an hour; the first game drive leaves that evening. Dulini Moya is an intimate, contemporary lodge in the western Sabi Sand — few suites, superb guiding, and a reputation for close, unhurried Big Five sightings, leopard above all.

Two full safari days follow the bush's own clock: drives at dawn and dusk with a private ranger and tracker, bush breakfasts, walks and sundowners in between. The final morning ends with one last drive before the north calls.

---

## Victoria Falls — 3 nights

**Stay: Victoria Falls River Lodge, Zambezi National Park**

A scheduled lodge-hop flight via Kruger Mpumalanga carries you across the border to Victoria Falls, and a short river transfer delivers you to the lodge — on the banks of the Zambezi inside the national park, elephants on the floodplain and the Falls' spray standing on the horizon.

A guided tour walks the rainforest opposite the mile-wide curtain of water; a sunset cruise takes the great river at its golden hour. The last full day belongs to the Zambezi — river game viewing, island dining, and the sound of the Falls carrying upstream.

---

## Good to know

Victoria Falls lies in Zimbabwe — your journey designer arranges the border formalities and visas. The Sabi Sand and the Zambezi are low-risk malaria areas; precautions advised. Cape Town is malaria-free. The Falls run fullest from February to June. Daily touring shown is illustrative — final touring is tailored to your travellers.

## Why this journey

Because these are the three chapters travellers cross the world for, and this line joins them without a wasted day — connecting suites for privacy, halal-aware dining arranged, prayer times and Qibla respected, private guiding, and every internal flight, transfer and border crossing handled end to end.

## Begin your journey

This itinerary is offered as a starting point, not a fixed product. Travel dates, accommodation, pace and included experiences can all be adjusted to reflect your preferences. Contact us to begin the planning conversation.`,
  },
  {
    slug: "the-golfers-south-africa",
    code: "AA-GF-10",
    tag: "Championship",
    title: "The Golfer's South Africa",
    titleItalic: "Golfer's",
    oneliner:
      "Three of the country's great courses — Steenberg, Fancourt and Pezula — closing on a malaria-free safari.",
    duration: "14 Days / 13 Nights",
    territory: "Cape Town · George · Knysna · Eastern Cape",
    heroImage: "/images/itineraries/the-golfers-south-africa/hero.jpg",
    cardImage: "/images/itineraries/the-golfers-south-africa/card.jpg",
    galleryImages: [
      "/images/itineraries/garden-route/heads-1.jpg",
      "/images/itineraries/garden-route/gallery-2.jpg",
      "/images/itineraries/garden-route/heads-3.jpg",
    ],
    published: true,
    durationNights: [13, 13],
    region: "South Africa",
    highlights: [
      "4 nights at Steenberg Hotel & Spa — a round on the historic estate course",
      "3 nights at Fancourt — The Links, Montagu or Outeniqua",
      "3 nights at Pezula Nature Retreat — the clifftop course above the Heads",
      "3 nights at Shamwari Private Game Reserve — malaria-free Big Five",
      "Pre-booked tee times carried end to end",
      "Table Mountain, Cape Point and the Winelands between rounds",
      "The Knysna lagoon and a Featherbed cruise",
      "Halal-aware dining throughout; family welcome at every stop",
    ],
    inclusions: [
      "4 nights at Steenberg Hotel & Spa, Constantia",
      "3 nights at Fancourt, George",
      "3 nights at Pezula Nature Retreat, Knysna",
      "3 nights at Shamwari Private Game Reserve, Eastern Cape",
      "Pre-booked tee times at Steenberg, Fancourt and Pezula",
      "Breakfast daily; fully inclusive safari stay at Shamwari",
      "Private touring in Cape Town — the mountain, the Peninsula, the Waterfront",
      "Internal flight Cape Town–George; private transfers along the Garden Route",
      "Private transfer to the Eastern Cape and departure via Gqeberha",
      "Meet and greet on arrival; one journey designer carrying every booking end to end",
    ],
    exclusions: [
      "International flights",
      "Green fees beyond the rounds specified",
      "Golf equipment hire unless arranged",
      "Visa fees if applicable",
      "Travel insurance",
      "Personal expenses and gratuities",
    ],
    idealFor: [
      "Golfers pairing championship courses with the Cape",
      "Mixed parties — spa, coast and safari for the non-golfers",
      "GCC families — malaria-free safari safe for all ages",
      "Golf societies and small private groups",
    ],
    pricingFrom: 0,
    pricingCurrency: "USD",
    pricingUnit: "on request",
    bestSeason: "October to April for the fairways",
    relatedSlugs: ["golf-coast-and-safari", "garden-route", "classic-luxury-south-africa"],
    seasonal: false,
    seoTitle: "The Golfer's South Africa — Steenberg, Fancourt, Pezula & Shamwari | Amara Africa",
    seoDescription:
      "Fourteen days across South Africa's great courses — Steenberg, Fancourt and Pezula — closing on a malaria-free Big Five safari at Shamwari. Tee times carried end to end.",
    seoKeywords: [
      "South Africa golf holiday",
      "Fancourt golf itinerary",
      "Steenberg golf estate stay",
      "Pezula golf Knysna",
      "golf and safari South Africa",
      "malaria-free safari Shamwari",
    ],
    body: `A golfer's dream with the family in mind — three of South Africa's great golf estates strung along the Cape and the Garden Route, closing on a malaria-free Big Five safari. Tee times are pre-booked and carried end to end; the non-golfers are as well looked after as the scorecards.

## The journey

Fourteen days, four estates. Steenberg opens it — the historic Constantia wine estate with its own championship course, minutes from Cape Town's icons. A short flight reaches Fancourt at George, the country's premier golf estate, for The Links and its siblings. The Garden Route road then leads to Pezula's clifftop course above the Knysna Heads. The clubs are put away for the finale: Shamwari in the malaria-free Eastern Cape, where the Big Five replace the back nine.

## Constantia — 4 nights

**Stay: Steenberg Hotel & Spa**

The Cape's oldest farm, now a graceful estate hotel with vineyards, a celebrated spa and its own championship course out the door. The first full day belongs to it — a round on the estate, then the cellar and the spa.

Cape Town's essentials fill the middle days, privately: Table Mountain and the city, Cape Point and the Peninsula, the Waterfront — and for those who prefer, a second round or a day among the Constantia and Stellenbosch estates.

---

## George — 3 nights

**Stay: Fancourt**

A short flight to George and ten minutes by road bring you to Fancourt — South Africa's premier golf estate, with three championship courses on the property and a grand manor at its heart. The Links, ranked among the world's best, is the pilgrimage; Montagu and Outeniqua reward the following day.

Between rounds: the leisure centre, the spa, and the Outeniqua mountains standing over every fairway.

---

## Knysna — 3 nights

**Stay: Pezula Nature Retreat**

An hour's private transfer along the Garden Route reaches Knysna and the clifftop world of Pezula — suites in the forest above the Indian Ocean, and one of the country's most dramatic courses running along the cliffs.

The Pezula round is the one golfers describe for years: fairways above the sea, the Knysna Heads below. Off the course there is the lagoon and a Featherbed cruise, the forests and beaches of the wild coast, and a town made for unhurried afternoons.

---

## Eastern Cape — 3 nights

**Stay: Shamwari Private Game Reserve**

A private transfer of about three hours carries you to Shamwari, the celebrated malaria-free Big Five reserve of the Eastern Cape — safe for every age, luxurious in its lodges, serious in its conservation.

The clubs rest. Game drives leave at dawn and dusk; between them are conservation experiences, long lunches and the great stillness. Departure is an easy morning drive to Gqeberha (Port Elizabeth) for the flight home.

---

## Good to know

Shamwari is malaria-free — safe for the whole family. Flights: direct Gulf–Cape Town; internal Cape Town–George; depart from Gqeberha (PLZ). Tee times are pre-booked; handicap certificates may be requested at Fancourt. Daily touring shown is illustrative — final touring is tailored to your travellers.

## Why this journey

Because nowhere else strings three courses of this calibre along one coastline — with a Big Five reserve, malaria-free, waiting at the end. Pre-booked tee times, halal-aware dining throughout, prayer times and Qibla arranged, private transfers, and one Amara journey designer carrying every booking end to end.

## Begin your journey

This itinerary is offered as a starting point, not a fixed product. Travel dates, courses, pace and included experiences can all be adjusted to reflect your party — golfers and non-golfers alike. Contact us to begin the planning conversation.`,
  },
  {
    slug: "golf-coast-and-safari",
    code: "AA-GS-11",
    tag: "Golf & Wild",
    title: "Golf, Coast & Safari",
    titleItalic: "Golf, Coast",
    oneliner:
      "Constantia fairways, the forests and lagoons of Knysna, and the Greater Kruger wild.",
    duration: "11 Days / 10 Nights",
    territory: "Cape Town · Knysna · Greater Kruger",
    heroImage: "/images/itineraries/golf-coast-and-safari/hero.jpg",
    cardImage: "/images/itineraries/golf-coast-and-safari/card.jpg",
    galleryImages: [
      "/images/itineraries/garden-route/heads-2.jpg",
      "/images/itineraries/garden-route/gallery-2.jpg",
      "/images/itineraries/garden-route/heads-1.jpg",
    ],
    published: true,
    durationNights: [10, 10],
    region: "South Africa",
    highlights: [
      "4 nights at Steenberg Hotel & Spa — golf and the vineyard",
      "3 nights at Pezula Nature Retreat — the clifftop course and the Heads",
      "3 nights at Thornybush Saseka Tented Camp, Greater Kruger",
      "Championship rounds at Steenberg and Pezula, tee times pre-booked",
      "Table Mountain, Cape Point and the Peninsula, privately guided",
      "The Knysna lagoon and a Featherbed cruise",
      "Big Five drives at dawn and dusk with a private ranger",
      "Halal-aware dining and prayer times arranged throughout",
    ],
    inclusions: [
      "4 nights at Steenberg Hotel & Spa, Constantia",
      "3 nights at Pezula Nature Retreat, Knysna",
      "3 nights at Thornybush Saseka Tented Camp, Greater Kruger",
      "Pre-booked tee times at Steenberg and Pezula",
      "Breakfast daily; fully inclusive safari stay at Thornybush",
      "Private touring in Cape Town — the mountain, the Peninsula, the Bo-Kaap",
      "Internal flights Cape Town–George and George–Hoedspruit",
      "Private transfers throughout; road transfer to camp",
      "Meet and greet on arrival; one journey designer end to end",
    ],
    exclusions: [
      "International flights",
      "Green fees beyond the rounds specified",
      "Golf equipment hire unless arranged",
      "Visa fees if applicable",
      "Travel insurance",
      "Personal expenses and gratuities",
    ],
    idealFor: [
      "Golfers who want the wild as well as the fairways",
      "Couples splitting the brief — golf for one, coast and safari for both",
      "GCC travellers on a first golf-and-bush journey",
      "Shorter stays that still want three distinct chapters",
    ],
    pricingFrom: 0,
    pricingCurrency: "USD",
    pricingUnit: "on request",
    bestSeason: "October to April for the fairways",
    relatedSlugs: ["the-golfers-south-africa", "garden-route", "ultimate-luxury-south-africa"],
    seasonal: false,
    seoTitle: "Golf, Coast & Safari — Steenberg, Pezula & Thornybush | Amara Africa",
    seoDescription:
      "Eleven days pairing championship golf with the coast and the wild — Steenberg in Constantia, Pezula above the Knysna Heads, and Thornybush Saseka in Big Five country.",
    seoKeywords: [
      "golf and safari itinerary South Africa",
      "Steenberg golf holiday",
      "Pezula Knysna golf",
      "Thornybush Saseka Tented Camp",
      "Greater Kruger safari and golf",
      "GCC golf travel South Africa",
    ],
    body: `Championship golf paired with the coast and the wild — a vineyard round in Constantia, a clifftop round above the Knysna Heads, and a contemporary tented camp in Big Five country to close. Three chapters in eleven days, each a different register of the same country.

## The journey

Steenberg opens the journey: four nights on the historic Constantia wine estate, a round on its championship course, and Cape Town's icons taken privately between fairways. A short flight and a Garden Route transfer bring Pezula — three nights above the Knysna Heads, with the clifftop course and the lagoon below. The last flight turns inland: three nights at Thornybush Saseka Tented Camp in the Greater Kruger, where dawn belongs to the Big Five.

## Constantia — 4 nights

**Stay: Steenberg Hotel & Spa**

The Cape's oldest wine farm, with its own championship course, a celebrated cellar and a spa among the vines — and the city's landmarks twenty minutes away. The first full day pairs golf and the vineyard: a round on the Steenberg course, then the estate's cellar and spa.

The middle days belong to the Cape, privately guided — the cableway and Table Mountain, the V&A Waterfront and the Bo-Kaap; then Cape Point and the Peninsula: penguins at Boulders, the Cape of Good Hope, Chapman's Peak.

---

## Knysna — 3 nights

**Stay: Pezula Nature Retreat**

A short flight to George and an hour's private transfer along the Garden Route deliver Knysna and Pezula's clifftop world — suites above the Indian Ocean, forest at the door, and the dramatic Pezula course running along the cliffs.

Golf takes one day: the round above the Heads, followed by the lagoon and a Featherbed cruise. Another day is left deliberately open — forests, beaches and the wild coast at your pace.

---

## Greater Kruger — 3 nights

**Stay: Thornybush Saseka Tented Camp**

A flight from George to Hoedspruit (via Johannesburg on selected days) and half an hour by road reach camp in time for the evening drive. Saseka is the contemporary face of the tented safari — style, space and wide wild horizons in proven Big Five country.

Two full days follow the bush clock: game drives at dawn and dusk with a private ranger, bush walks, sundowners and the great stillness in between. Departure is a morning drive to Hoedspruit and onward home.

---

## Good to know

Thornybush (Greater Kruger) is a low-risk malaria area — precautions advised; the Cape and the Garden Route are malaria-free. Flights: direct Gulf–Cape Town; internal Cape Town–George and George–Hoedspruit. Tee times are pre-booked. Daily touring shown is illustrative — final touring is tailored to your travellers.

## Why this journey

Because it answers the double brief — serious golf and a serious safari — inside eleven days, with the Garden Route's loveliest stretch in between. Pre-booked tee times, halal-aware dining throughout, prayer times and Qibla arranged, private transfers, and one Amara journey designer end to end.

## Begin your journey

This itinerary is offered as a starting point, not a fixed product. Travel dates, rounds, pace and included experiences can all be adjusted to reflect your party. Contact us to begin the planning conversation.`,
  },
];

export function getJourney(slug: string): Journey | undefined {
  return journeys.find((j) => j.slug === slug);
}

/**
 * Render a journey title with the italic-emphasis portion wrapped in a
 * ReactNode-friendly span. Returns the title split into `lead` + `italic` +
 * `tail` so callers can style the emphasis word(s) as they please.
 */
export function splitTitle(journey: Pick<Journey, "title" | "titleItalic">) {
  const { title, titleItalic } = journey;
  const idx = title.indexOf(titleItalic);
  if (idx === -1) return { lead: "", italic: title, tail: "" };
  return {
    lead: title.slice(0, idx),
    italic: titleItalic,
    tail: title.slice(idx + titleItalic.length),
  };
}
