import { journeys, type Journey } from "./journeys";

// The concierge's grounding document, assembled at build time from the same
// journeys data that renders the site — so the assistant can never drift from
// what the pages actually say. Server-side only (imported by the API route).

const HOUSE = `## The house

Amara Africa designs private, tailor-made journeys across South Africa,
Tanzania (including Zanzibar) and Zambia, crafted for travellers from the
Gulf — Saudi Arabia, the UAE, Qatar, Kuwait, Bahrain and Oman.

- Offices: Dubai (guest relationships & design) and Cape Town (ground operations).
- Every journey is entirely private — your own guide, vehicle, table and pace.
  Nothing is shared and nothing is fixed.
- A single senior consultant in the Dubai office holds each file from the first
  call to the last goodbye, in Arabic or English as the guest prefers.
- Halal-aware menus are briefed to every lodge in advance, quietly and without
  further discussion — that is simply how the house works.
- Arabic-speaking hosts and guides are arranged on request and when available —
  guests should mention this early so the house can secure them.
- WhatsApp concierge: +971 58 858 5960 (https://wa.me/971588585960).
- Private enquiry form: https://amarafrica.com/enquire — a senior member of the
  house replies in person within one working day. No automated confirmations,
  no mailing list.
- The Gulf Family's Guide — a complimentary guide to planning a family safari
  from the Gulf, at https://amarafrica.com/guide.
- Trip Design service (https://amarafrica.com/trip-design): a dedicated senior
  designer, a complete private itinerary and held space at the lodges, for a
  design fee of AED 5,000 — credited in full against the journey the moment it
  is confirmed. This is the only price ever stated; journeys themselves are
  quoted on request.

## Frequently asked

Q: Are your journeys private, or do we travel with others?
A: Every Amara journey is entirely private. Nothing is shared and nothing is
fixed — we take the temperament of a journey and write it again for your
household, down to the pace, the table and the hours in the vehicle.

Q: Can you arrange halal-aware dining and Arabic-speaking hosts?
A: Halal-aware menus are briefed to every lodge in advance, quietly and without
further discussion — that is simply how we work. Arabic-speaking hosts and
guides are arranged on request and when available; tell us early and we will do
the securing.

Q: Who looks after our booking?
A: A single senior consultant in our Dubai office holds your file from the
first call to the last goodbye. On the ground, a single senior guide holds the
pace. You will always know the name of the person you are speaking to.

Q: When is the best time to travel?
A: It depends on the journey. The Serengeti migration follows the herds through
the year; South African safari game-viewing is strongest in the dry winter, May
to October; and Cape Town is at its finest in the warm summer, November to
March. We advise on timing for your specific itinerary.

Q: How far in advance should we book?
A: The lodges we work with are small and book early, particularly in peak
season. We recommend beginning the conversation several months ahead where
possible — though we will always do our best with shorter notice.

Q: Do you arrange journeys for families and children?
A: Yes. Several of our journeys are built for multi-generational travel, with
private villa configurations and a children's programme designed around wonder
rather than schedule.

Q: How does pricing work?
A: Each journey is tailor-made and quoted on request — shaped by party size,
season, the lodges chosen and the pace you prefer. We prepare a considered
proposal once we understand the shape of your trip. International and domestic
flights are quoted separately.`;

function journeyBrief(j: Journey): string {
  const lines: string[] = [
    `### ${j.title} — ${j.duration} · ${j.territory}`,
    j.oneliner,
  ];
  if (j.highlights?.length) lines.push(`Highlights: ${j.highlights.join("; ")}.`);
  if (j.idealFor?.length) lines.push(`Ideal for: ${j.idealFor.join("; ")}.`);
  if (j.inclusions?.length) lines.push(`Included: ${j.inclusions.join("; ")}.`);
  if (j.exclusions?.length)
    lines.push(`Not included: ${j.exclusions.join("; ")}.`);
  lines.push(
    `Page: https://amarafrica.com/journeys/${j.slug} · Pricing: on request.`
  );
  if (j.body) lines.push(`Itinerary notes:\n${j.body}`);
  return lines.join("\n");
}

export const CONCIERGE_KNOWLEDGE = [
  HOUSE,
  "## The collection — every journey on the site",
  ...journeys.map(journeyBrief),
].join("\n\n");
