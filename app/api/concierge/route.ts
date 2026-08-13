import { NextRequest } from "next/server";
import { CONCIERGE_KNOWLEDGE } from "@/lib/concierge-knowledge";

// The Gulf concierge — a retrieval-grounded assistant answering only from the
// site's own content (lib/concierge-knowledge.ts). Streams plain text back to
// the widget. Requires ANTHROPIC_API_KEY; without it the route answers with a
// polite handover to WhatsApp so the widget never breaks.

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.CONCIERGE_MODEL ?? "claude-sonnet-5";
const MAX_MESSAGES = 24;
const MAX_MESSAGE_CHARS = 4000;

const SYSTEM = `You are the Concierge of Amara Africa — the private safari house's assistant on amarafrica.com, speaking with prospective guests from the Gulf.

Voice: warm, precise, understated luxury. Write in short, complete sentences — usually two to five. No exclamation marks, no emoji, no hard selling. You may use a short list only when comparing journeys.

Language: reply in the language the guest writes in. Arabic must be natural, native-register Modern Standard Arabic. English should match the house's editorial tone.

Grounding — the only rule that cannot bend:
- Answer ONLY from the house knowledge below. Never invent lodges, itineraries, availability, dates, visa or medical specifics, or anything else not written there.
- Never state a price of any kind, with one exception: the Trip Design fee of AED 5,000, credited in full against the journey. All journeys are quoted on request.
- If the guest asks something the knowledge does not cover, say plainly that your consultant will confirm it personally, and offer the WhatsApp concierge (+971 58 858 5960) or the enquiry form at /enquire.

Gulf awareness: halal-aware dining is briefed to every lodge by default; Arabic-speaking hosts are on request and when available; several journeys suit multi-generational families with private villa configurations. Only claim what the knowledge supports.

Handover: whenever the guest is ready to plan, book, or wants a quotation — or asks to speak to a person — hand over gracefully: WhatsApp +971 58 858 5960, or the private enquiry form at https://amarafrica.com/enquire (a senior member of the house replies within one working day). Suggest the Trip Design service when a guest wants a complete itinerary designed.

Scope: you discuss Amara Africa and its journeys only. If asked about anything else — other companies, general trivia, code, homework — decline in one courteous sentence and return to the journey.

--- HOUSE KNOWLEDGE ---

${CONCIERGE_KNOWLEDGE}`;

const FALLBACK =
  "The concierge desk is stepping away for a moment. For anything at all, " +
  "write to us on WhatsApp at +971 58 858 5960 — a senior member of the house " +
  "will reply personally. Or leave your details at amarafrica.com/enquire and " +
  "we will write back within one working day.";

// Best-effort per-IP limiter. Serverless instances don't share memory, so this
// is a soft brake against a single hot client, not a security boundary.
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 5 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 25;
}

function textResponse(text: string, status = 200): Response {
  return new Response(text, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function sanitize(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  const messages = input.slice(-MAX_MESSAGES).map((m) => {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      !m.content.trim()
    )
      return null;
    return {
      role: m.role as "user" | "assistant",
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
    };
  });
  if (messages.some((m) => m === null)) return null;
  const list = messages as ChatMessage[];
  if (list[list.length - 1].role !== "user") return null;
  return list;
}

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] | null = null;
  try {
    const body = await req.json();
    messages = sanitize(body?.messages);
  } catch {
    messages = null;
  }
  if (!messages) return textResponse("Bad request.", 400);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip))
    return textResponse(
      "One moment, please — the desk is busy. Do try again shortly, or write to us on WhatsApp at +971 58 858 5960.",
      429
    );

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return textResponse(FALLBACK);

  let upstream: Response;
  try {
    upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 700,
        stream: true,
        // Cache the large grounding prompt across turns — it never changes
        // within a deploy, so every message after the first is nearly free.
        system: [
          {
            type: "text",
            text: SYSTEM,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages,
      }),
    });
  } catch {
    return textResponse(FALLBACK);
  }
  if (!upstream.ok || !upstream.body) return textResponse(FALLBACK);

  // Re-shape the Anthropic SSE stream into a bare text stream for the widget.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const event = JSON.parse(payload);
          if (
            event.type === "content_block_delta" &&
            event.delta?.type === "text_delta" &&
            typeof event.delta.text === "string"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        } catch {
          // Partial or non-JSON line — skip.
        }
      }
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
