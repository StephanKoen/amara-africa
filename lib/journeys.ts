export type Journey = {
  slug: string;
  name: string;
  tag: string;
  oneLiner: string;
  descriptor: string;
  duration: string;
  territory: string;
  heroImage: string;
  cardImage: string;
  galleryImages: { src: string; alt: string }[];
  highlights: string[];
  body: string[];
};

export const journeys: Journey[] = [
  {
    slug: "the-migration",
    name: "The Migration",
    tag: "Tanzania · Kenya",
    oneLiner:
      "Follow the oldest overland movement on earth from a single, privately-guided camp.",
    descriptor:
      "A quiet seat at the edge of a river crossing. Two mobile camps, one private guide, no hurry.",
    duration: "9 — 12 nights",
    territory: "Serengeti · Grumeti · Lamai",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/6FuXti7kPpoMSaRUJVfLi/8e67d00a8428e3fb93e0a93a1dd596d8/Lamai_Wildlife_Migration_Penny_Parker_2022.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/6FuXti7kPpoMSaRUJVfLi/8e67d00a8428e3fb93e0a93a1dd596d8/Lamai_Wildlife_Migration_Penny_Parker_2022.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/65aTPJVM2j0aL8h6XfJueD/45f39c25f3e5925582912329519b416d/Conservation_Serengeti_Hero.jpg?w=1600&h=900&fl=progressive&q=92&fm=jpg",
        alt: "Dawn light over the open plains of the Serengeti",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/1By6DT2Fa4M0kQXWgnGADp/78137645393ae20f1ae0080e6efc737a/Grumeti-region.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "The rolling hills of the Grumeti region at golden hour",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/6FuXti7kPpoMSaRUJVfLi/8e67d00a8428e3fb93e0a93a1dd596d8/Lamai_Wildlife_Migration_Penny_Parker_2022.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "A herd moving in long file across the plain",
      },
    ],
    highlights: [
      "Private access to two mobile camps",
      "A single guide from arrival to departure",
      "River-crossing viewing, without the crowds",
      "Optional balloon ascent over the Serengeti",
      "All-day private vehicle and tracker",
    ],
    body: [
      "The migration is not a moment. It is a year-long motion of nearly two million animals, and the most considered way to experience it is to position yourself quietly and wait.",
      "Our Migration journey places you in two carefully-chosen private camps — one in the Grumeti corridor, one on the Lamai wedge in the far north — so that you are always within reach of the herds without ever being part of a convoy.",
      "You travel with a single guide from the moment you arrive in Arusha until you leave. One voice, one vehicle, one quiet rhythm. It is the opposite of a packaged itinerary, and it is how the migration was meant to be seen.",
    ],
  },
  {
    slug: "the-grand-circuit",
    name: "The Grand Circuit",
    tag: "Tanzania · Zambia",
    oneLiner:
      "Three countries, one guided arc, and the continent's most storied wilderness in sequence.",
    descriptor:
      "A twelve-night arc from Ngorongoro's crater rim to the lower Zambezi. Unhurried, and continuously guided.",
    duration: "12 — 16 nights",
    territory: "Ngorongoro · Serengeti · Lower Zambezi",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/65aTPJVM2j0aL8h6XfJueD/45f39c25f3e5925582912329519b416d/Conservation_Serengeti_Hero.jpg?w=1600&h=900&fl=progressive&q=92&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/1By6DT2Fa4M0kQXWgnGADp/78137645393ae20f1ae0080e6efc737a/Grumeti-region.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/65aTPJVM2j0aL8h6XfJueD/45f39c25f3e5925582912329519b416d/Conservation_Serengeti_Hero.jpg?w=1600&h=900&fl=progressive&q=92&fm=jpg",
        alt: "A panoramic view across the Serengeti at sunrise",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/5CZ74q7AnMo5dnaglhtAQb/8e28f396a98c62cdd1e4441af38e943d/Biodiversity_Conservation_Partners_Malilangwe_Trust.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "Untouched savanna stretching to the horizon",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/SNsZuHtshjzHJzlIB6M2Z/befd067a27bf017fff42f56cb63abc0d/Singita_Kruger_National_Park_Zebra_3U9A5862.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "A small herd of zebra grazing in open bushveld",
      },
    ],
    highlights: [
      "Private arrival services in three countries",
      "Ngorongoro rim with exclusive crater descent",
      "Lower Zambezi canoe and walking days",
      "Dedicated guide for the full arc",
      "Private aircraft between regions",
    ],
    body: [
      "The Grand Circuit is our longest standing journey. It is the arc we send clients on when they have a quiet fortnight and want to understand Africa in sequence, rather than in fragments.",
      "You begin on the rim of the Ngorongoro crater, descend onto the Serengeti, then fly south to the lower Zambezi. The rhythm shifts from plains to water, from vehicles to canoes, without ever breaking tone.",
      "Private aircraft carry you between regions. The same senior guide accompanies you throughout. What changes is the landscape; what remains is the pace.",
    ],
  },
  {
    slug: "the-family-legacy",
    name: "The Family Legacy",
    tag: "Tanzania · South Africa",
    oneLiner:
      "A multi-generational safari built around privacy, children, and the long table.",
    descriptor:
      "Private villas, a dedicated family guide, and a rhythm that accommodates three generations without compromise.",
    duration: "8 — 11 nights",
    territory: "Sabi Sand · Grumeti",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/5VDS25gvpLVtqSMNj7IPkc/e1ae74b563722948824e45942d899ff4/SMRTC_Guest_Bathroom_Emma_Jackson_3-min.jpg?w=900&h=1100&fl=progressive&q=92&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/4Llv44ZLnr8v268Tzwkyhe/45ff8172c818b615068cdb43de5901f7/Textile_20250612-A1_02791.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/5VDS25gvpLVtqSMNj7IPkc/e1ae74b563722948824e45942d899ff4/SMRTC_Guest_Bathroom_Emma_Jackson_3-min.jpg?w=900&h=1100&fl=progressive&q=92&fm=jpg",
        alt: "A quiet interior lit by late-afternoon light",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/4Llv44ZLnr8v268Tzwkyhe/45ff8172c818b615068cdb43de5901f7/Textile_20250612-A1_02791.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "Handwoven textiles folded on a low wooden bench",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/2uTrdE7July4kBLuU3njGl/af37ecbfd7ea78d50b57ba39aca7f636/SSS_FOOD_Ebony_Lodge_Lunch_Food_And_Wine_Pairing_Ross_Couper_4.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "A long table set under trees for a private lunch",
      },
    ],
    highlights: [
      "Sole-use villa in the Sabi Sand",
      "Dedicated family guide and tracker",
      "Children's naturalist programme",
      "Halal-aware private kitchen",
      "Arabic-speaking host on request",
    ],
    body: [
      "Safari with children is often mis-sold. The default is a shared vehicle and a rigid timetable. We take the opposite position.",
      "Family Legacy is built around sole-use villas and a single family guide who shapes the day to you. Early drives for the adults, later starts for the children, long lunches under trees, quiet hours by the pool in between.",
      "A Halal-aware private kitchen is available throughout, and an Arabic-speaking host is available on request. What we promise is simple: no shared vehicles, no set menus, no compromise.",
    ],
  },
  {
    slug: "the-cape-kruger",
    name: "The Cape & Kruger",
    tag: "South Africa",
    oneLiner:
      "The country in two registers — a civilised city and a very private corner of the Lowveld.",
    descriptor:
      "Four nights above the Cape harbour. Four nights on a sole-use concession in the Sabi Sand.",
    duration: "7 — 9 nights",
    territory: "Cape Town · Sabi Sand",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/SNsZuHtshjzHJzlIB6M2Z/befd067a27bf017fff42f56cb63abc0d/Singita_Kruger_National_Park_Zebra_3U9A5862.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/SNsZuHtshjzHJzlIB6M2Z/befd067a27bf017fff42f56cb63abc0d/Singita_Kruger_National_Park_Zebra_3U9A5862.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/5CZ74q7AnMo5dnaglhtAQb/8e28f396a98c62cdd1e4441af38e943d/Biodiversity_Conservation_Partners_Malilangwe_Trust.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "Open South African bushveld at dusk",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/SNsZuHtshjzHJzlIB6M2Z/befd067a27bf017fff42f56cb63abc0d/Singita_Kruger_National_Park_Zebra_3U9A5862.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "A zebra crossing a Lowveld track at first light",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/2uTrdE7July4kBLuU3njGl/af37ecbfd7ea78d50b57ba39aca7f636/SSS_FOOD_Ebony_Lodge_Lunch_Food_And_Wine_Pairing_Ross_Couper_4.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "A considered plate of regional produce and wine",
      },
    ],
    highlights: [
      "Private residence above the Cape harbour",
      "Sole-use concession in the Sabi Sand",
      "Wine estates and table mountain hikes",
      "Private aviation between legs",
      "Halal-aware menus throughout",
    ],
    body: [
      "South Africa is two countries. A Cape peninsula of long lunches and fynbos hikes, and a Lowveld of leopards and quiet evenings. This journey holds both.",
      "You begin at a private residence above the Cape harbour, with a dedicated host and a driver. Four nights of wine country, considered restaurants, and the mountain.",
      "Then we fly you to the Sabi Sand and a sole-use concession where a senior ranger and tracker will hold the pace for as long as you wish. A long weekend either side of a working week.",
    ],
  },
  {
    slug: "the-falls-delta",
    name: "The Falls & Delta",
    tag: "Zambia · Botswana",
    oneLiner:
      "Victoria Falls at its quietest, followed by a private water camp on the delta.",
    descriptor:
      "Three nights above the Falls. Four nights on a private island. One guide for the arc.",
    duration: "7 — 9 nights",
    territory: "Livingstone · Okavango",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/1By6DT2Fa4M0kQXWgnGADp/78137645393ae20f1ae0080e6efc737a/Grumeti-region.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/1By6DT2Fa4M0kQXWgnGADp/78137645393ae20f1ae0080e6efc737a/Grumeti-region.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/1By6DT2Fa4M0kQXWgnGADp/78137645393ae20f1ae0080e6efc737a/Grumeti-region.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "The meandering waterways of the Okavango from above",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/65aTPJVM2j0aL8h6XfJueD/45f39c25f3e5925582912329519b416d/Conservation_Serengeti_Hero.jpg?w=1600&h=900&fl=progressive&q=92&fm=jpg",
        alt: "Quiet morning light over open water",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/5VDS25gvpLVtqSMNj7IPkc/e1ae74b563722948824e45942d899ff4/SMRTC_Guest_Bathroom_Emma_Jackson_3-min.jpg?w=900&h=1100&fl=progressive&q=92&fm=jpg",
        alt: "A considered interior in a private water camp",
      },
    ],
    highlights: [
      "Private side of Victoria Falls access",
      "Sole-use water camp on the delta",
      "Mokoro mornings with a senior poler",
      "Walking safari by day, open water by dusk",
      "Return to Lusaka, privately met",
    ],
    body: [
      "The Falls draw crowds. This journey does not. We begin you on the Zambian side, at a private residence with river frontage and a boat of your own.",
      "Three nights of the Falls as a quiet landscape — walks, long dinners, one late afternoon at the lip of the gorge with no one else in sight.",
      "Then a short flight west onto a sole-use water camp in the Okavango. A mokoro at dawn. Walking safari by day. A single guide for the full seven nights.",
    ],
  },
  {
    slug: "the-coastal-escape",
    name: "The Coastal Escape",
    tag: "Tanzania · Zanzibar",
    oneLiner:
      "A safari and a shoreline, connected by a single flight and a single team.",
    descriptor:
      "Five nights in the bush. Four nights on a private beach estate. One concierge from start to finish.",
    duration: "9 — 11 nights",
    territory: "Ruaha · Zanzibar",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/2uTrdE7July4kBLuU3njGl/af37ecbfd7ea78d50b57ba39aca7f636/SSS_FOOD_Ebony_Lodge_Lunch_Food_And_Wine_Pairing_Ross_Couper_4.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/2uTrdE7July4kBLuU3njGl/af37ecbfd7ea78d50b57ba39aca7f636/SSS_FOOD_Ebony_Lodge_Lunch_Food_And_Wine_Pairing_Ross_Couper_4.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/2uTrdE7July4kBLuU3njGl/af37ecbfd7ea78d50b57ba39aca7f636/SSS_FOOD_Ebony_Lodge_Lunch_Food_And_Wine_Pairing_Ross_Couper_4.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "A considered lunch laid out for a private party",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/4Llv44ZLnr8v268Tzwkyhe/45ff8172c818b615068cdb43de5901f7/Textile_20250612-A1_02791.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
        alt: "Handwoven textiles in natural fibres",
      },
      {
        src: "https://images.ctfassets.net/wds1hqrprqxb/5VDS25gvpLVtqSMNj7IPkc/e1ae74b563722948824e45942d899ff4/SMRTC_Guest_Bathroom_Emma_Jackson_3-min.jpg?w=900&h=1100&fl=progressive&q=92&fm=jpg",
        alt: "A quiet bathroom interior with natural materials",
      },
    ],
    highlights: [
      "Ruaha walking safari with senior guide",
      "Private beach estate on Zanzibar's east coast",
      "Halal-aware private kitchen on the coast",
      "Dhow sundowners and reef mornings",
      "Single concierge across both legs",
    ],
    body: [
      "There is a particular satisfaction to closing a safari with salt air. Coastal Escape pairs five nights in Ruaha — the least-visited of Tanzania's great parks — with four nights on a private estate on the east coast of Zanzibar.",
      "A single concierge manages both legs. A single senior guide holds the bush half. The beach half is unhurried and private, and the kitchen is Halal-aware throughout.",
      "It is the most requested journey among our GCC families, and the one we quietly recommend most often.",
    ],
  },
];

export function getJourney(slug: string): Journey | undefined {
  return journeys.find((j) => j.slug === slug);
}
