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
