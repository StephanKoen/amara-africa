// Amara Africa — logo brand-pack generator.
// One-off tool. Outlines Latin type to vector paths and renders the Arabic
// line with an embedded font, then rasterises each SVG to a transparent PNG.
//
//   cd tools/logo-export && npm install && npm run build
//
// Output: public/brand/logo/*.svg and *.png

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
  tagline: "A PRIVATE WORLD OF AFRICAN LUXURY",
  arabic: "أَمَارَا وَ أَفْرِيقَا",
};

// ---- Treatments ------------------------------------------------------------
const WHITE = { amara: "#FFFFFF", africa: "#FFFFFF", tagline: "#FFFFFF", arabic: "#FFFFFF", rule: "#FFFFFF", ruleOpacity: 0.5 };
const BLACK = { amara: "#1A1610", africa: "#1A1610", tagline: "#1A1610", arabic: "#1A1610", rule: "#1A1610", ruleOpacity: 0.5 };
const GOLD = { amara: "#C8962E", africa: "#C8962E", tagline: "#C8962E", arabic: "#C8962E", rule: "#C8962E", ruleOpacity: 0.55 };

const TREATMENTS = {
  gold: { ...GOLD, bg: null },
  white: { ...WHITE, bg: null },
  "white-on-black": { ...WHITE, bg: "#0D0D0B" },
  black: { ...BLACK, bg: null },
  "black-on-white": { ...BLACK, bg: "#FFFFFF" },
  "colour-on-dark": {
    amara: "#C8962E", africa: "#EDE8DC", tagline: "#C8A84A",
    arabic: "#C8962E", rule: "#C8962E", ruleOpacity: 0.45, bg: "#0D0D0B",
  },
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
  const bbox = full.getBoundingBox();
  return { path: full, bbox };
}

// Measure vertical extent of the Arabic string (ascent/descent above/below baseline).
function measureArabic(text, fontSize) {
  const scale = fontSize / naskh.unitsPerEm;
  let y1 = 0, y2 = 0;
  for (const ch of [...text]) {
    const bb = naskh.charToGlyph(ch).getPath(0, 0, fontSize).getBoundingBox();
    if (bb.y1 < y1) y1 = bb.y1;
    if (bb.y2 > y2) y2 = bb.y2;
  }
  // Pad a touch for harakat (diacritics) that sit high.
  return { ascent: -y1 + fontSize * 0.08, descent: y2 + fontSize * 0.04, scale };
}

const round = (n) => Math.round(n * 100) / 100;

function pathTag(layout, tx, ty, fill) {
  return `<path d="${layout.path.toPathData(2)}" fill="${fill}" transform="translate(${round(tx)} ${round(ty)})"/>`;
}

function rule(cx, y, w, t, fill, opacity) {
  return `<rect x="${round(cx - w / 2)}" y="${round(y)}" width="${round(w)}" height="${t}" fill="${fill}" fill-opacity="${opacity}"/>`;
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
  const PAD_X = 150, PAD_Y = 80, GAP = 44, RULE_T = 2;
  const sizes = { amara: 300, africa: 64, tagline: 24, arabic: 74 };
  const ls = { africa: sizes.africa * 0.62, tagline: sizes.tagline * 0.16 };

  const amara = layoutLatin(greatVibes, TXT.amara, sizes.amara);
  const africa = layoutLatin(cormorant, TXT.africa, sizes.africa, ls.africa);
  const tagline = layoutLatin(cormorantItalic, TXT.tagline, sizes.tagline, ls.tagline);
  const ar = measureArabic(TXT.arabic, sizes.arabic);

  const inkW = (b) => b.bbox.x2 - b.bbox.x1;
  const contentW = Math.max(inkW(amara), inkW(africa), inkW(tagline), sizes.arabic * 4);
  const W = contentW + PAD_X * 2;
  const cx = W / 2;
  const ruleW = contentW * 0.72;

  const parts = [];
  let y = PAD_Y;

  // top rule
  parts.push(rule(cx, y, ruleW, RULE_T, t.rule, t.ruleOpacity));
  y += RULE_T + GAP;

  // Amara
  const aAsc = -amara.bbox.y1, aDesc = amara.bbox.y2;
  let base = y + aAsc;
  parts.push(pathTag(amara, cx - (amara.bbox.x1 + amara.bbox.x2) / 2, base, t.amara));
  y = base + aDesc + GAP;

  // mid rule
  parts.push(rule(cx, y, ruleW, RULE_T, t.rule, t.ruleOpacity));
  y += RULE_T + GAP;

  // AFRICA
  const fAsc = -africa.bbox.y1, fDesc = africa.bbox.y2;
  base = y + fAsc;
  parts.push(pathTag(africa, cx - (africa.bbox.x1 + africa.bbox.x2) / 2, base, t.africa));
  y = base + fDesc + GAP * 0.7;

  // tagline
  const tAsc = -tagline.bbox.y1, tDesc = tagline.bbox.y2;
  base = y + tAsc;
  parts.push(pathTag(tagline, cx - (tagline.bbox.x1 + tagline.bbox.x2) / 2, base, t.tagline));
  y = base + tDesc + GAP;

  // rule
  parts.push(rule(cx, y, ruleW, RULE_T, t.rule, t.ruleOpacity));
  y += RULE_T + GAP;

  // Arabic
  base = y + ar.ascent;
  parts.push(arabicText(cx, base, sizes.arabic, t.arabic));
  y = base + ar.descent + GAP;

  // bottom rule
  parts.push(rule(cx, y, ruleW, RULE_T, t.rule, t.ruleOpacity));
  y += RULE_T + PAD_Y;

  return wrapSvg(W, y, t.bg, parts.join(""));
}

// ---- Compact wordmark ------------------------------------------------------
function buildWordmark(t) {
  const PAD_X = 130, PAD_Y = 70, GAP = 30, RULE_T = 2;
  const sizes = { amara: 200, africa: 132, arabic: 60 };

  const amara = layoutLatin(greatVibes, TXT.amara, sizes.amara);
  const africa = layoutLatin(cormorant, TXT.africa.charAt(0) + TXT.africa.slice(1).toLowerCase(), sizes.africa); // "Africa"
  const ar = measureArabic(TXT.arabic, sizes.arabic);

  const amaraInk = amara.bbox.x2 - amara.bbox.x1;
  const africaInk = africa.bbox.x2 - africa.bbox.x1;
  const between = sizes.africa * 0.18;
  const wordW = amaraInk + between + africaInk;

  const W = Math.max(wordW, sizes.arabic * 5) + PAD_X * 2;
  const cx = W / 2;
  let y = PAD_Y;

  const parts = [];
  // baseline alignment for the two scripts
  const asc = Math.max(-amara.bbox.y1, -africa.bbox.y1);
  const desc = Math.max(amara.bbox.y2, africa.bbox.y2);
  const base = y + asc;
  const startX = cx - wordW / 2;
  parts.push(pathTag(amara, startX - amara.bbox.x1, base, t.amara));
  parts.push(pathTag(africa, startX + amaraInk + between - africa.bbox.x1, base, t.africa));
  y = base + desc + GAP;

  // hairline rule under the wordmark
  parts.push(rule(cx, y, wordW, RULE_T, t.rule, t.ruleOpacity));
  y += RULE_T + GAP * 0.9;

  // Arabic
  const abase = y + ar.ascent;
  parts.push(arabicText(cx, abase, sizes.arabic, t.arabic));
  y = abase + ar.descent + PAD_Y;

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
