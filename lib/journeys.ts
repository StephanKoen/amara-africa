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
    title: "The Cape & Kruger",
    titleItalic: "Cape & Kruger",
    oneliner:
      "South Africa's finest — from the Sabi Sand to the Cape Peninsula in one seamless arc.",
    duration: "8–12 nights",
    territory: "South Africa — Sabi Sand, Kruger & Cape",
    heroImage:
      "https://images.ctfassets.net/wds1hqrprqxb/5VDS25gvpLVtqSMNj7IPkc/e1ae74b563722948824e45942d899ff4/SMRTC_Guest_Bathroom_Emma_Jackson_3-min.jpg?w=1600&h=900&fl=progressive&q=92&fm=jpg",
    cardImage:
      "https://images.ctfassets.net/wds1hqrprqxb/5VDS25gvpLVtqSMNj7IPkc/e1ae74b563722948824e45942d899ff4/SMRTC_Guest_Bathroom_Emma_Jackson_3-min.jpg?w=900&h=900&fl=progressive&q=90&fm=jpg",
    galleryImages: [
      "https://images.ctfassets.net/wds1hqrprqxb/SNsZuHtshjzHJzlIB6M2Z/befd067a27bf017fff42f56cb63abc0d/Singita_Kruger_National_Park_Zebra_3U9A5862.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/6Glf1CQJy5HGb6UJnaeqse/84d483f8e6429525276457c6d2fc7037/ebony_lodge_dining_room.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
      "https://images.ctfassets.net/wds1hqrprqxb/2uTrdE7July4kBLuU3njGl/af37ecbfd7ea78d50b57ba39aca7f636/SSS_FOOD_Ebony_Lodge_Lunch_Food_And_Wine_Pairing_Ross_Couper_4.jpg?w=1200&h=800&fl=progressive&q=90&fm=jpg",
    ],
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
