"use client";

import { useEffect, useRef, useState } from "react";
import { trackGA } from "./GoogleAnalytics";

// The Gulf concierge widget — a floating desk in the corner of every page.
// Streams answers from /api/concierge (grounded on the site's own content),
// speaks English and Arabic, and always offers the human WhatsApp handover.
// Conversation survives navigation via sessionStorage.

type ChatMessage = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "amara_concierge_v1";
const WHATSAPP_URL = "https://wa.me/971588585960";

const STARTERS = [
  "Which journey suits a family with young children?",
  "When should we travel to see the Migration?",
  "هل الطعام حلال في السفاري؟",
];

const ERROR_REPLY =
  "The desk seems briefly unreachable. Do write to us on WhatsApp at " +
  "+971 58 858 5960 — a senior member of the house will reply personally.";

export default function Concierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // Ignore a corrupt draft.
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage full or unavailable — the chat still works for this page.
    }
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || busy) return;
    setInput("");
    setBusy(true);
    trackGA("concierge_message");

    const history: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);

    const appendReply = (chunk: string) =>
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        next[next.length - 1] = {
          role: "assistant",
          content: last.content + chunk,
        };
        return next;
      });

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        appendReply(decoder.decode(value, { stream: true }));
      }
      setMessages((prev) => {
        if (prev[prev.length - 1]?.content.trim()) return prev;
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content: ERROR_REPLY };
        return next;
      });
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content: ERROR_REPLY };
        return next;
      });
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      {/* Launch button */}
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            trackGA("concierge_open");
          }}
          aria-label="Open the concierge"
          className="fixed z-[70] transition-opacity duration-300 hover:opacity-90"
          style={{
            right: 20,
            bottom: 20,
            background: "var(--dd-near-black)",
            border: "0.5px solid var(--dd-border-strong)",
            padding: "13px 22px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 8px 28px rgba(13,13,11,0.35)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--dd-gold)",
            }}
          />
          <span
            className="font-serif italic"
            style={{ color: "var(--dd-linen)", fontSize: 17, lineHeight: 1 }}
          >
            The Concierge
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Amara Africa concierge"
          className="fixed z-[70] flex flex-col"
          style={{
            right: 0,
            bottom: 0,
            width: "100%",
            maxWidth: 400,
            height: "100dvh",
            maxHeight: 620,
            background: "var(--dd-warm-white)",
            border: "0.5px solid var(--dd-border-mid)",
            boxShadow: "0 18px 60px rgba(13,13,11,0.4)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "var(--dd-near-black)",
              padding: "18px 20px 16px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                className="font-serif italic"
                style={{ color: "var(--dd-linen)", fontSize: 21, lineHeight: 1.1 }}
              >
                The Concierge
              </p>
              <p
                style={{
                  color: "var(--dd-cream)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginTop: 7,
                  opacity: 0.75,
                }}
              >
                English · العربية — with a person behind it
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close the concierge"
              style={{
                color: "var(--dd-cream)",
                fontSize: 22,
                lineHeight: 1,
                padding: "2px 6px",
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}
          >
            {messages.length === 0 && (
              <div>
                <p
                  style={{
                    color: "var(--dd-stone)",
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  Ask about our journeys, timing, halal dining or travelling as
                  a family — in English or Arabic. When you are ready, a senior
                  member of the house takes over personally.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {STARTERS.map((s) => (
                    <button
                      key={s}
                      dir="auto"
                      onClick={() => send(s)}
                      className="transition-colors duration-200 hover:border-[color:var(--dd-border-strong)]"
                      style={{
                        textAlign: "start",
                        border: "0.5px solid var(--dd-border-mid)",
                        background: "var(--dd-white)",
                        padding: "10px 14px",
                        fontSize: 14,
                        color: "var(--dd-ink)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: 12,
                }}
              >
                <div
                  dir="auto"
                  style={{
                    maxWidth: "85%",
                    whiteSpace: "pre-wrap",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    padding: "10px 14px",
                    ...(m.role === "user"
                      ? {
                          background: "var(--dd-near-black)",
                          color: "var(--dd-linen)",
                        }
                      : {
                          background: "var(--dd-white)",
                          border: "0.5px solid var(--dd-border)",
                          color: "var(--dd-ink)",
                        }),
                  }}
                >
                  {m.content ||
                    (busy && i === messages.length - 1 ? "…" : m.content)}
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            style={{
              borderTop: "0.5px solid var(--dd-border-mid)",
              padding: "12px 14px 10px",
              background: "var(--dd-white)",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <input
                ref={inputRef}
                dir="auto"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write in English or Arabic…"
                aria-label="Your message to the concierge"
                style={{
                  flex: 1,
                  border: "0.5px solid var(--dd-border-mid)",
                  background: "var(--dd-warm-white)",
                  padding: "10px 12px",
                  fontSize: 14.5,
                  color: "var(--dd-ink)",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                style={{
                  background: "var(--dd-near-black)",
                  color: "var(--dd-gold)",
                  padding: "0 18px",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: busy || !input.trim() ? 0.5 : 1,
                }}
              >
                Send
              </button>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-[color:var(--dd-gold-antique)]"
              style={{
                display: "block",
                marginTop: 9,
                fontSize: 12,
                color: "var(--dd-stone)",
              }}
            >
              Prefer a person? WhatsApp the desk — +971 58 858 5960 →
            </a>
          </form>
        </div>
      )}
    </>
  );
}
