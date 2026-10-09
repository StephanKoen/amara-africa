"use client";

import { useState } from "react";
import "./brand.css";

const L = (f: string) => `/brand/guide/logos/${f}`;
const COLOURS = ["Gold", "Black", "White"];
const FORMATS = ["svg", "png", "pdf"];

const CORE: Colour[] = [
  { n: "Linen", hex: "#F0EBE0", role: "Main background" },
  { n: "Night", hex: "#0D0D0B", role: "Dark panels and covers" },
  { n: "Amara Gold", hex: "#C8962E", role: "Logo, rules, accents" },
  { n: "Bush Olive", hex: "#3D4E28", role: "Buttons and accents" },
  { n: "Ink", hex: "#1A1610", role: "All text on linen" },
  { n: "Amara Navy", hex: "#172439", role: "Partner materials and panels" },
];
const SUPPORT: Colour[] = [
  { n: "Parchment", hex: "#E8DFC8", role: "Panels and captions" },
  { n: "Soft Gold", hex: "#D4AA68", role: "Gold text on night" },
  { n: "Antique Gold", hex: "#9A6018", role: "Gold text on linen, large" },
  { n: "Stone", hex: "#8A7A58", role: "Labels and details" },
  { n: "Sky", hex: "#D2DFF2", role: "Highlights on navy layouts" },
];

type Colour = { n: string; hex: string; role: string };

const rgb = (h: string) => {
  const v = parseInt(h.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255].join(", ");
};

function Swatch({ c }: { c: Colour }) {
  const [note, setNote] = useState("");
  const flash = (msg: string) => {
    setNote(msg);
    setTimeout(() => setNote(""), 1800);
  };
  return (
    <button
      type="button"
      className="swatch"
      aria-label={`Copy ${c.n} ${c.hex}`}
      onClick={() => {
        try {
          navigator.clipboard.writeText(c.hex).then(() => flash("Copied"), () => flash(c.hex));
        } catch {
          flash(c.hex);
        }
      }}
    >
      <span className="fill" style={{ background: c.hex }} />
      <span className="meta">
        <span className="name">{c.n}</span>
        <span className="role">{c.role}</span>
        <code>HEX {c.hex}</code>
        <code>RGB {rgb(c.hex)}</code>
        <span className="copied">{note}</span>
      </span>
    </button>
  );
}

function Downloads({ base, withColour = false }: { base: string; withColour?: boolean }) {
  return (
    <div className="dl">
      {(withColour ? COLOURS : [null as string | null]).flatMap((col) =>
        FORMATS.map((ext) => {
          const file = `${base}${col ? `-${col}` : ""}.${ext}`;
          return (
            <a key={file} className="chip" href={L(file)} download={file}>
              {col ? `${col} ` : ""}
              {ext.toUpperCase()}
            </a>
          );
        })
      )}
    </div>
  );
}

const LOGO_TILES = [
  { col: "Gold", bg: "on-night", title: "Amara Gold", text: "The primary logo. Use on night, navy, linen and olive grounds.", alt: "Gold logo on night background" },
  { col: "Black", bg: "on-white", title: "Black", text: "For white paper, light photography and one-colour print.", alt: "Black logo on white background" },
  { col: "White", bg: "on-navy", title: "White", text: "For navy, night, olive and dark photography.", alt: "White logo on olive background" },
];

export default function BrandGuide() {
  return (
    <div className="amb">
      <header className="cover">
        <div className="wrap cover-grid">
          <img className="cover-logo" src={L("Amara-Africa-Logo-Gold.svg")} alt="Amara Africa logo in gold" />
          <div className="cover-meta">
            <p className="label">Brand Guidelines · Edition 1 · 2026</p>
            <h1>
              How we look, write and <em>appear</em> beside our partners.
            </h1>
            <p>
              Amara Africa designs private journeys through Africa for travellers from the Gulf. This guide is for
              partners, creators and anyone placing our name in their work.
            </p>
            <ul className="toc">
              <li><a href="#brand">Brand</a></li>
              <li><a href="#logo">Logo</a></li>
              <li><a href="#colour">Colour</a></li>
              <li><a href="#type">Typography</a></li>
              <li><a href="#voice">Voice</a></li>
              <li><a href="#partners">Imagery &amp; partners</a></li>
              <li><a href="#downloads">Downloads</a></li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        <section className="page" id="brand">
          <div className="wrap">
            <div className="head">
              <p className="label">The brand</p>
              <h2>A Private World of <em>African Luxury</em></h2>
              <p className="lede">
                Every journey is made for one guest at a time. Everything carrying our name should feel the same way:
                quiet, considered and generous with space.
              </p>
            </div>
            <div className="pillars">
              <div className="pillar"><h3>Private</h3><p>Discretion over display. We describe the experience and let it speak.</p></div>
              <div className="pillar"><h3>Curated</h3><p>Fewer, better choices. A short list of remarkable places beats a brochure.</p></div>
              <div className="pillar"><h3>Bilingual</h3><p>African hospitality, presented with Gulf courtesy, in English and Arabic.</p></div>
              <div className="pillar"><h3>Grounded</h3><p>Earth, light and gold. Warm and calm, never cold or loud.</p></div>
            </div>
          </div>
        </section>

        <section className="page" id="logo">
          <div className="wrap">
            <div className="head">
              <p className="label">Logo</p>
              <h2>One mark, <em>three colours</em></h2>
              <p className="lede">
                The stacked logo pairs the Amara script with spaced capitals, our Arabic name and the tagline. Always use
                the supplied files. Every file has a transparent background.
              </p>
            </div>

            <div className="logos">
              {LOGO_TILES.map((t) => (
                <div className="tile" key={t.col}>
                  <div className={`tile-art ${t.bg}`}><img src={L(`Amara-Africa-Logo-${t.col}.svg`)} alt={t.alt} /></div>
                  <div className="tile-info">
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                    <Downloads base={`Amara-Africa-Logo-${t.col}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="subrow">
              <div className="wordmarks">
                <div className="tile-art on-night"><img src={L("Amara-Africa-Wordmark-Gold.svg")} alt="Gold wordmark" /></div>
                <div className="tile-art on-white"><img src={L("Amara-Africa-Wordmark-Black.svg")} alt="Black wordmark" /></div>
                <div className="tile-art on-navy"><img src={L("Amara-Africa-Wordmark-White.svg")} alt="White wordmark" /></div>
                <div className="tile-info wm-info">
                  <h3>Wordmark</h3>
                  <p>
                    The compact version for website headers, email signatures and anywhere the stacked logo would be
                    smaller than 140&nbsp;px (30&nbsp;mm) wide.
                  </p>
                  <Downloads base="Amara-Africa-Wordmark" withColour />
                </div>
              </div>
              <div className="space">
                <div className="space-art">
                  <div className="space-box">
                    <span className="x t">A</span>
                    <span className="x l">A</span>
                    <img src={L("Amara-Africa-Logo-Black.svg")} alt="Logo with clear space marked around it" />
                  </div>
                </div>
                <div className="tile-info">
                  <h3>Clear space &amp; size</h3>
                  <p>
                    Keep an empty margin the height of the capital A in AFRICA on every side. Minimum width: 140&nbsp;px
                    on screen, 30&nbsp;mm in print.
                  </p>
                </div>
              </div>
            </div>

            <div className="rules">
              <div className="yes">
                <h3>Do</h3>
                <ul>
                  <li>Use the supplied files only, at their original proportions.</li>
                  <li>Choose the version with the strongest contrast against the background.</li>
                  <li>Place the logo on calm areas of a photograph.</li>
                </ul>
              </div>
              <div className="no">
                <h3>Don&apos;t</h3>
                <ul>
                  <li>Recolour, outline, add shadows or gradients.</li>
                  <li>Stretch, rotate, re-space or retype any part of it.</li>
                  <li>Remove the Arabic line or put the logo inside a box.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="page" id="colour">
          <div className="wrap">
            <div className="head">
              <p className="label">Colour</p>
              <h2>The bush at <em>golden hour</em></h2>
              <p className="lede">
                Linen and night carry most of every layout, with navy for partner materials and calm panels. Gold is the light within it, used for the logo, fine rules
                and accents, never as body text on linen. Tap a colour to copy its hex code.
              </p>
            </div>
            <div className="palette">{CORE.map((c) => <Swatch key={c.n} c={c} />)}</div>
            <div className="palette support">{SUPPORT.map((c) => <Swatch key={c.n} c={c} />)}</div>
            <div className="ratio">
              <p className="label">Balance</p>
              <div className="ratio-bar" aria-hidden="true">
                <span style={{ flex: 58, background: "var(--linen)" }} />
                <span style={{ flex: 8, background: "var(--night)" }} />
                <span style={{ flex: 4, background: "var(--navy)" }} />
                <span style={{ flex: 20, background: "var(--ink)", opacity: 0.9 }} />
                <span style={{ flex: 6, background: "var(--gold)" }} />
                <span style={{ flex: 4, background: "var(--olive)" }} />
              </div>
              <div className="ratio-keys"><span>Grounds 70%</span><span>Ink &amp; imagery 20%</span><span>Gold, olive &amp; navy accents 10%</span></div>
            </div>
          </div>
        </section>

        <section className="page" id="type">
          <div className="wrap">
            <div className="head">
              <p className="label">Typography</p>
              <h2>Five faces, <em>each with one job</em></h2>
              <p className="lede">All are free on Google Fonts. In Word or PowerPoint without them, use Georgia for headings and Arial for text.</p>
            </div>
            <div className="specimens">
              <div className="spec">
                <div className="spec-info"><h3>Great Vibes</h3><p>Logo script. Reserved for the logo, never for headings or text.</p><span className="src">Logo only</span></div>
                <div className="spec-sample s-script">Amara</div>
              </div>
              <div className="spec">
                <div className="spec-info"><h3>Playfair Display</h3><p>Headings, set large and regular. Italic words in antique gold for emphasis.</p><span className="src">Headings</span></div>
                <div className="spec-sample s-display">Dinner beneath the acacias, <em>the river below.</em></div>
              </div>
              <div className="spec">
                <div className="spec-info"><h3>Cormorant Garamond</h3><p>Spaced capitals and italic taglines, as in the logo.</p><span className="src">Capitals &amp; taglines</span></div>
                <div className="spec-sample">
                  <div className="s-serif">Cape Town · Okavango</div>
                  <div className="s-serif-i">A Private World of African Luxury</div>
                </div>
              </div>
              <div className="spec">
                <div className="spec-info"><h3>System sans</h3><p>Body text and labels: San Francisco, Segoe UI or Roboto, falling back to Arial. 15&nbsp;px, generous line spacing.</p><span className="src">Body &amp; labels</span></div>
                <div className="spec-sample s-sans">
                  <span className="lbl">Journey · 10 nights</span>
                  Arrive in Cape Town to a private transfer and a suite above the Atlantic, then fly north into the
                  Okavango Delta, where the camp is yours alone.
                </div>
              </div>
              <div className="spec">
                <div className="spec-info"><h3>Noto Naskh Arabic</h3><p>All Arabic text, set slightly larger than the English beside it.</p><span className="src">Arabic</span></div>
                <div className="spec-sample s-arabic" lang="ar">عالم خاص من الفخامة الأفريقية</div>
              </div>
            </div>
          </div>
        </section>

        <section className="page" id="voice">
          <div className="wrap">
            <div className="head">
              <p className="label">Voice</p>
              <h2>A trusted host, <em>never a salesperson</em></h2>
            </div>
            <div className="voice">
              <div className="yes">
                <p className="label" style={{ color: "var(--olive)" }}>We say</p>
                <blockquote>“Dinner is set under the acacias, with the river below.”</blockquote>
                <ul><li>Lead with the place and the moment.</li><li>Short, complete sentences.</li><li>Private, curated, considered, unhurried.</li></ul>
              </div>
              <div className="no">
                <p className="label">We avoid</p>
                <blockquote>“An unforgettable once-in-a-lifetime deal!”</blockquote>
                <ul><li>Prices, discounts and urgency up front.</li><li>Exclamation marks and emoji.</li><li>Cheap, bargain, hurry, best-ever.</li></ul>
              </div>
            </div>
          </div>
        </section>

        <section className="page" id="partners">
          <div className="wrap two">
            <div>
              <div className="head" style={{ marginBottom: 0 }}>
                <p className="label">Imagery</p>
                <h2>Real places, <em>natural light</em></h2>
              </div>
              <ul className="points">
                <li><b>Light.</b> Early morning and golden hour, warm and natural grading.</li>
                <li><b>People.</b> Guests seen from behind or at a distance, never posing to camera.</li>
                <li><b>Wildlife.</b> At a respectful distance, never baited or disturbed.</li>
                <li><b>Avoid.</b> Heavy filters, oversaturated skies and stock sunset silhouettes.</li>
              </ul>
            </div>
            <div>
              <div className="head" style={{ marginBottom: 0 }}>
                <p className="label">With partners</p>
                <h2>Side by side, <em>equal weight</em></h2>
              </div>
              <div className="cobrand">
                <img className="am" src={L("Amara-Africa-Logo-Gold.svg")} alt="Amara Africa logo" />
                <span className="div" aria-hidden="true" />
                <span className="yl-ph">Your logo</span>
              </div>
              <p className="caption">
                Example lockup. Separate logos with a thin vertical rule and give each its own clear space. Use our
                white or black logo when gold doesn&apos;t stand out on a partner&apos;s colours.
              </p>
            </div>
          </div>
        </section>
      </main>

      <section className="downloads" id="downloads">
        <div className="wrap dl-grid">
          <div className="head" style={{ marginBottom: 0 }}>
            <p className="label">Downloads</p>
            <h2>The complete <em>logo pack</em></h2>
            <p>
              Stacked logo and wordmark in gold, black and white: vector SVG and PDF for print, 4000&nbsp;px PNG for
              everything else. All transparent.
            </p>
          </div>
          <div style={{ display: "grid", gap: 22 }}>
            <div>
              <a className="primary" href="/brand/guide/Amara-Africa-Logo-Pack.zip" download="Amara-Africa-Logo-Pack.zip">
                Download logo pack (.zip)
              </a>
            </div>
            <div className="contact">
              <p className="label">Questions &amp; approvals</p>
              <span className="email">reservations@amarafrica.com</span>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="wrap">
          <span>© 2026 Amara Africa</span>
          <span>Dubai · Cape Town</span>
        </div>
      </footer>
    </div>
  );
}
