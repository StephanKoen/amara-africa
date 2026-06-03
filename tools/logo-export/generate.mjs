// Amara Africa — logo brand-pack generator.
// One-off tool. Outlines Latin type to vector paths and renders the Arabic
// line with an embedded font, then rasterises each SVG to a transparent PNG.
//
//   cd tools/logo-export && npm install && npm run build
//
// Output: public/brand/logo/*.svg and *.png
//
// Layout: Amara (cursive) → AFRICA (spaced serif) → Arabic (tight under
// AFRICA) → tagline (Title-Case italic, set apart at the bottom). No rules.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONT_DIR = path.join(__dirname, "fonts");
const OUT_DIR = path.join(__dirname, "..", "..", "public", "brand", "logo");

// ---- Fonts -----------------------------------------------------------------
const greatVibes = opentype.loadSync(path.join(FONT_DIR, "GreatVibes-Regular.ttf"));
const cormorant = opentype.loadSync(path.join(FONT_DIR, "CormorantGaramond-Regular.ttf"));
const cormorantItalic = opentype.loadSync(path.join(FONT_DIR, "CormorantGaramond-Italic.ttf"));
const naskh = opentype.loadSync(path.join(FONT_DIR, "NotoNaskhArabic-Regular.ttf"));
const naskhB64 = fs.readFileSync(path.join(FONT_DIR, "NotoNaskhArabic-Regular.ttf")).toString("base64");
const naskhBuf = fs.readFileSync(path.join(FONT_DIR, "NotoNaskhArabic-Regular.ttf"));

// ---- Content ---------------------------------------------------------------
const TXT = {
  amara: "Amara",
  africa: "AFRICA",
  tagline: "A Private World of African Luxury",
  arabic: "أَمَارَا وَ أَفْرِيقَا",
};

// ---- Treatments ------------------------------------------------------------
const T_LIGHT = "rgba(154,108,26,0.92)"; // muted gold tagline on light
const T_DARK = "rgba(200,168,74,0.88)"; // muted gold tagline on dark

const MONO = (c, tagline) => ({ amara: c, africa: c, arabic: c, tagline });

const TREATMENTS = {
  // Primary multi-colour mark (matches the approved comp) — for light grounds
  "colour-light": { amara: "#C8962E", africa: "#1A1610", arabic: "#C8962E", tagline: T_LIGHT, bg: null },
  // Multi-colour for dark grounds (AFRICA reads in cream)
  "colour-on-dark": { amara: "#C8962E", africa: "#EDE8DC", arabic: "#C8962E", tagline: T_DARK, bg: "#0D0D0B" },
  // Single-colour marks
  gold: { ...MONO("#C8962E", "rgba(200,150,46,0.9)"), bg: null },
  white: { ...MONO("#FFFFFF", "rgba(255,255,255,0.85)"), bg: null },
  "white-on-black": { ...MONO("#FFFFFF", "rgba(255,255,255,0.85)"), bg: "#0D0D0B" },
  black: { ...MONO("#1A1610", "rgba(26,22,16,0.85)"), bg: null },
  "black-on-white": { ...MONO("#1A1610", "rgba(26,22,16,0.85)"), bg: "#FFFFFF" },
};

// ---- Helpers ---------------------------------------------------------------
// Lay out a Latin string into a single outlined path (with optional tracking).
function layoutLatin(font, text, fontSize, letterSpacing = 0) {
  const scale = fontSize / font.unitsPerEm;
  let x = 0;
  const full = new opentype.Path();
  for (const ch of [...text]) {
    const glyph = font.charToGlyph(ch);
    full.extend(glyph.getPath(x, 0, fontSize));
    x += glyph.advanceWidth * scale + letterSpacing;
  }
  return { path: full, bbox: full.getBoundingBox() };
}

// Measure vertical extent of the Arabic string (ascent/descent around baseline).
function measureArabic(text, fontSize) {
  let y1 = 0, y2 = 0;
  for (const ch of [...text]) {
    const bb = naskh.charToGlyph(ch).getPath(0, 0, fontSize).getBoundingBox();
    if (bb.y1 < y1) y1 = bb.y1;
    if (bb.y2 > y2) y2 = bb.y2;
  }
  return { ascent: -y1 + fontSize * 0.08, descent: y2 + fontSize * 0.04 };
}

const round = (n) => Math.round(n * 100) / 100;
const inkW = (b) => b.bbox.x2 - b.bbox.x1;

function pathTag(layout, tx, ty, fill) {
  return `<path d="${layout.path.toPathData(2)}" fill="${fill}" transform="translate(${round(tx)} ${round(ty)})"/>`;
}
function centeredPath(layout, cx, baseline, fill) {
  return pathTag(layout, cx - (layout.bbox.x1 + layout.bbox.x2) / 2, baseline, fill);
}
function fontFaceDefs() {
  return `<defs><style>@font-face{font-family:'Noto Naskh Arabic';font-style:normal;src:url(data:font/ttf;base64,${naskhB64}) format('truetype');}</style></defs>`;
}
function arabicText(cx, baseline, size, fill) {
  return `<text x="${round(cx)}" y="${round(baseline)}" font-family="Noto Naskh Arabic" font-size="${size}" fill="${fill}" text-anchor="middle" direction="rtl" xml:lang="ar">${TXT.arabic}</text>`;
}
function wrapSvg(width, height, bg, body) {
  const bgRect = bg ? `<rect x="0" y="0" width="${round(width)}" height="${round(height)}" fill="${bg}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${round(width)}" height="${round(height)}" viewBox="0 0 ${round(width)} ${round(height)}">${fontFaceDefs()}${bgRect}${body}</svg>`;
}

// ---- Full stacked lockup ---------------------------------------------------
function buildFull(t) {
  const PAD_X = 150, PAD_TOP = 64, PAD_BOT = 60;
  const GAP_AMARA_AFRICA = 26, GAP_AFRICA_ARABIC = 20, GAP_ARABIC_TAGLINE = 70;
  const sizes = { amara: 300, africa: 58, arabic: 56, tagline: 31 };
  const ls = { africa: sizes.africa * 0.58, tagline: sizes.tagline * 0.05 };

  const amara = layoutLatin(greatVibes, TXT.amara, sizes.amara);
  const africa = layoutLatin(cormorant, TXT.africa, sizes.africa, ls.africa);
  const tagline = layoutLatin(cormorantItalic, TXT.tagline, sizes.tagline, ls.tagline);
  const ar = measureArabic(TXT.arabic, sizes.arabic);

  const contentW = Math.max(inkW(amara), inkW(africa), inkW(tagline), sizes.arabic * 4);
  const W = contentW + PAD_X * 2;
  const cx = W / 2;
  const parts = [];
  let y = PAD_TOP;

  // Amara
  let base = y + -amara.bbox.y1;
  parts.push(centeredPath(amara, cx, base, t.amara));
  y = base + amara.bbox.y2 + GAP_AMARA_AFRICA;

  // AFRICA
  base = y + -africa.bbox.y1;
  parts.push(centeredPath(africa, cx, base, t.africa));
  y = base + africa.bbox.y2 + GAP_AFRICA_ARABIC;

  // Arabic — tight beneath AFRICA
  base = y + ar.ascent;
  parts.push(arabicText(cx, base, sizes.arabic, t.arabic));
  y = base + ar.descent + GAP_ARABIC_TAGLINE;

  // Tagline — set apart at the bottom
  base = y + -tagline.bbox.y1;
  parts.push(centeredPath(tagline, cx, base, t.tagline));
  y = base + tagline.bbox.y2 + PAD_BOT;

  return wrapSvg(W, y, t.bg, parts.join(""));
}

// ---- Compact wordmark ------------------------------------------------------
function buildWordmark(t) {
  const PAD_X = 130, PAD_TOP = 64, PAD_BOT = 60, GAP_ARABIC = 26;
  const sizes = { amara: 200, africa: 132, arabic: 58 };

  const amara = layoutLatin(greatVibes, TXT.amara, sizes.amara);
  const africa = layoutLatin(cormorant, "Africa", sizes.africa);
  const ar = measureArabic(TXT.arabic, sizes.arabic);

  const amaraInk = inkW(amara), africaInk = inkW(africa);
  const between = sizes.africa * 0.18;
  const wordW = amaraInk + between + africaInk;

  const W = Math.max(wordW, sizes.arabic * 5) + PAD_X * 2;
  const cx = W / 2;
  const parts = [];
  let y = PAD_TOP;

  const asc = Math.max(-amara.bbox.y1, -africa.bbox.y1);
  const desc = Math.max(amara.bbox.y2, africa.bbox.y2);
  const base = y + asc;
  const startX = cx - wordW / 2;
  parts.push(pathTag(amara, startX - amara.bbox.x1, base, t.amara));
  parts.push(pathTag(africa, startX + amaraInk + between - africa.bbox.x1, base, t.africa));
  y = base + desc + GAP_ARABIC;

  const abase = y + ar.ascent;
  parts.push(arabicText(cx, abase, sizes.arabic, t.arabic));
  y = abase + ar.descent + PAD_BOT;

  return wrapSvg(W, y, t.bg, parts.join(""));
}

// ---- Render ----------------------------------------------------------------
function rasterise(svg, outPng, targetWidth) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: targetWidth },
    font: { fontBuffers: [naskhBuf], loadSystemFonts: false, defaultFontFamily: "Noto Naskh Arabic" },
    background: "rgba(0,0,0,0)",
  });
  fs.writeFileSync(outPng, resvg.render().asPng());
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const lockups = { full: buildFull, wordmark: buildWordmark };
let count = 0;
for (const [lockup, build] of Object.entries(lockups)) {
  for (const [name, t] of Object.entries(TREATMENTS)) {
    const svg = build(t);
    const baseName = `amara-${lockup}-${name}`;
    fs.writeFileSync(path.join(OUT_DIR, `${baseName}.svg`), svg);
    rasterise(svg, path.join(OUT_DIR, `${baseName}.png`), lockup === "full" ? 2000 : 2400);
    count += 2;
    console.log(`  ✓ ${baseName}.svg + .png`);
  }
}
console.log(`\nDone — ${count} files written to public/brand/logo/`);
