import jsPDF from 'jspdf'

// ── helpers ────────────────────────────────────────────────────────────────────
function hexRGB(hex) {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]
}

function fmt(n) {
  if (!n) return 'R0'
  if (n >= 1000000) return `R${(n/1000000).toFixed(1)}M`
  if (n >= 1000)    return `R${Math.round(n/1000)}K`
  return `R${Math.round(n).toLocaleString('en-ZA')}`
}
function fmtPct(n) { return `${Math.round(n || 0)}%` }
function todayStr() {
  return new Date().toLocaleDateString('en-ZA', { day:'numeric', month:'long', year:'numeric' })
}

// ── main export ────────────────────────────────────────────────────────────────
// FIX 1: Correct parameter order — called as downloadCFOReport(stats, records, orgName)
export async function downloadCFOReport(stats, records = [], orgName = 'Acme Corp') {
  const s = stats || {}
  // Support both explicit records param and stats.records fallback
  const recs = Array.isArray(records) ? records : (s.records || [])

  const pdf = new jsPDF({ orientation:'portrait', unit:'pt', format:'a4' })

  const W = 595
  const H = 842
  const M = 40           // margin
  const CW = W - M * 2  // content width = 515
  let y = M

  // ── colour palette ───────────────────────────────────────────────────────────
  const C = {
    purple:  '#7C3AED', navy:   '#1a0533', pink: '#EC4899',
    muted:   '#94A3B8', border: '#EDE9FE', dim:  '#F5F4FF',
    green:   '#10B981', red:    '#EF4444', amber:'#F59E0B',
    blue:    '#0EA5E9', white:  '#FFFFFF', dark: '#1E293B',
    text:    '#374151',
  }

  function fill(hex) { const [r,g,b]=hexRGB(hex); pdf.setFillColor(r,g,b) }
  function ink(hex)  { const [r,g,b]=hexRGB(hex); pdf.setTextColor(r,g,b) }
  function draw(hex) { const [r,g,b]=hexRGB(hex); pdf.setDrawColor(r,g,b) }

  function txt(str, x, tY, opts) {
    // FIX 1: Always coerce to string to prevent [object Object]
    pdf.text(String(str ?? ''), x, tY, opts)
  }

  function setFont(size, weight='normal') {
    pdf.setFont('helvetica', weight)
    pdf.setFontSize(size)
  }

  // Page guard — add new page with slim header bar if overflowing
  function guard(needed) {
    if (y + needed > H - M) {
      pdf.addPage()
      fill(C.navy); pdf.rect(0,0,W,22,'F')
      ink(C.white); setFont(7,'bold')
      // FIX 2: No emoji/unicode — use plain ASCII separator
      txt('TRAIVIO  |  Global Travel Performance Report', M, 15)
      txt('CONFIDENTIAL', W-M, 15, { align:'right' })
      y = 36
    }
  }

  // Derived numbers
  const fraudAmt = (s.fraudFlags || []).reduce((a,r)=>a+r.totalCost,0)
  const atRisk   = fraudAmt + (s.potentialSavings || 0) * 0.3

  // ═════════════════════════════════════════════════════════════
  // SECTION 1 — Dark header bar
  // ═════════════════════════════════════════════════════════════
  fill(C.navy); pdf.rect(0,0,W,30,'F')
  ink(C.white); setFont(10,'bold'); txt('TRAIVIO', M, 20)
  // FIX 1: Ensure orgName is a plain string (was receiving array before)
  ink(C.muted); setFont(8,'normal'); txt(String(orgName || 'Acme Corp'), W-M, 20, { align:'right' })
  y = 50

  // ═════════════════════════════════════════════════════════════
  // SECTION 2 — Report title + meta
  // ═════════════════════════════════════════════════════════════
  ink(C.navy); setFont(22,'bold')
  txt('Global Travel Performance Report', M, y); y += 14

  ink(C.muted); setFont(10,'normal')
  txt('Spend, compliance, savings, and traveler risk', M, y); y += 10

  // Meta dots row — FIX 1: build strings explicitly, no template literals with objects
  const metaItems = [
    'Q2 2025',
    String(s.totalTrips || 0) + ' trips',
    String(s.uniqueTravelers || 0) + ' travelers',
    String(s.dateRange || 'Oct 2024 - Mar 2025'),
  ]
  let mx = M; setFont(8,'normal'); ink(C.muted)
  metaItems.forEach((item, i) => {
    txt(item, mx, y)
    mx += pdf.getTextWidth(item) + 5
    if (i < metaItems.length - 1) {
      fill('#C4B5FD'); pdf.circle(mx+2, y-2.5, 1.8, 'F'); mx += 10
    }
  })
  // FIX 4: increased spacing after meta row
  y += 20

  // ═════════════════════════════════════════════════════════════
  // SECTION 3 — Hero banner (gradient via strips)
  // FIX 8: guard before hero banner
  // ═════════════════════════════════════════════════════════════
  guard(110)
  const heroH = 88
  const strips = 80
  for (let i = 0; i < strips; i++) {
    const t = i / strips
    let r, g, b
    if (t < 0.5) {
      const t2 = t * 2
      r = Math.round(45 + (124-45)*t2)
      g = Math.round(27 + (58-27)*t2)
      b = Math.round(105 + (237-105)*t2)
    } else {
      const t2 = (t - 0.5) * 2
      r = Math.round(124 + (236-124)*t2)
      g = Math.round(58  + (72-58)*t2)
      b = Math.round(237 + (153-237)*t2)
    }
    pdf.setFillColor(r,g,b)
    pdf.rect(M + (i/strips)*CW, y, CW/strips + 0.8, heroH, 'F')
  }

  // Hero text — left side
  const hy = y + 16
  ink(C.white); setFont(7,'bold')
  txt('TOTAL TRAVEL SPEND', M+14, hy)
  setFont(26,'bold')
  txt(fmt(s.totalSpend||0), M+14, hy+20)
  setFont(7.5,'normal')
  ink('#C4B5FD')
  // FIX 2: No unicode arrows — use ASCII +/- notation
  txt(String(s.dateRange||'') + ' | ' + String(s.totalTrips||0) + ' trips | ' + String(s.uniqueTravelers||0) + ' travelers | +8% vs prior quarter', M+14, hy+33)

  // Hero text — right side stats
  const rightStats = [
    { label:'COMPLIANCE',  value: fmtPct(s.complianceRate), sub:'Target: 90%' },
    { label:'SAVINGS',     value: fmt(s.potentialSavings),   sub:'Identified' },
    { label:'AT RISK',     value: fmt(atRisk),               sub:'Credits+fraud' },
  ]
  let rx = W - M - 160
  rightStats.forEach(st => {
    ink(C.white); setFont(6.5,'normal'); txt(String(st.label), rx, hy+2)
    setFont(16,'bold'); txt(String(st.value), rx, hy+16)
    setFont(7,'normal'); ink('#C4B5FD'); txt(String(st.sub), rx, hy+27)
    rx += 56
  })
  // FIX 4: increased section gap
  y += heroH + 20

  // ═════════════════════════════════════════════════════════════
  // SECTION 4 — Three-card row
  // FIX 8: guard already present
  // ═════════════════════════════════════════════════════════════
  guard(110)
  const cardW  = (CW - 20) / 3
  const cardH  = 94
  const card1X = M
  const card2X = M + cardW + 10
  const card3X = M + (cardW + 10) * 2

  ;[card1X, card2X, card3X].forEach(cx => {
    draw(C.border); pdf.setLineWidth(0.5); fill(C.white)
    pdf.rect(cx, y, cardW, cardH, 'FD')
  })

  // ── Card 1: Spend movement ────────────────────────────────────────────────
  const c1y = y + 10
  ink(C.navy); setFont(9,'bold'); txt('Spend movement', card1X+8, c1y)
  const cats = (s.categoryBreakdown || []).slice(0,4)
  const maxCat = Math.max(...cats.map(c=>c.value), 1)
  const catColors = [C.purple, C.blue, C.green, '#06B6D4']
  cats.forEach((cat, i) => {
    const ry = c1y + 12 + i * 16
    const [r,g,b] = hexRGB(catColors[i % catColors.length])
    pdf.setTextColor(r,g,b); setFont(7.5,'bold')
    txt(String(cat.name || '').slice(0,4), card1X+8, ry+5)
    fill(C.dim); pdf.rect(card1X+34, ry, cardW-72, 7, 'F')
    const bw = ((cat.value/maxCat) * (cardW-72))
    pdf.setFillColor(r,g,b); pdf.rect(card1X+34, ry, bw, 7, 'F')
    ink(C.navy); setFont(7.5,'bold')
    txt(fmt(cat.value), card1X+cardW-30, ry+5, { align:'right' })
  })

  // ── Card 2: Policy & compliance ───────────────────────────────────────────
  const c2y = y + 10
  ink(C.navy); setFont(9,'bold'); txt('Policy & compliance', card2X+8, c2y)
  // FIX 6: Plain rect pill — no Unicode bullet character
  const outOf = Math.round(100 - (s.complianceRate||0))
  const pillTxt = String(outOf) + '% out-of-policy spend'
  const pillW = pdf.getTextWidth(pillTxt) + 14
  const [pr,pg,pb] = hexRGB('#FEE2E2')
  pdf.setFillColor(pr,pg,pb); pdf.rect(card2X+8, c2y+5, pillW, 11, 'F')
  const [tr,tg,tb] = hexRGB('#991B1B')
  pdf.setTextColor(tr,tg,tb); setFont(7,'normal')
  txt(pillTxt, card2X+10, c2y+12.5)
  const bullets2 = [
    { dot:C.amber, text:'Compliance deteriorated vs prior quarter' },
    { dot:C.red,   text:'Advance purchase is largest issue' },
    { dot:C.green, text:'Operations maintained highest compliance' },
  ]
  bullets2.forEach((b, i) => {
    const by = c2y + 23 + i * 16
    const [dr,dg,db] = hexRGB(b.dot)
    pdf.setFillColor(dr,dg,db); pdf.circle(card2X+12, by+1, 2.5, 'F')
    ink(C.text); setFont(7.5,'normal')
    const wrapped = pdf.splitTextToSize(b.text, cardW-22)
    txt(wrapped[0], card2X+18, by+3)
  })

  // ── Card 3: Risk exposure ─────────────────────────────────────────────────
  const c3y = y + 10
  ink(C.navy); setFont(9,'bold'); txt('Risk exposure', card3X+8, c3y)
  const risks = [
    { color:C.red,    num: s.fraudFlagCount||0, label:'Fraud flags detected' },
    { color:C.amber,  num: s.violationCount||0, label:'Policy violations flagged' },
    { color:C.purple, num: 24,                  label:'Travelers to elevated-risk regions' },
  ]
  risks.forEach((r, i) => {
    const rry = c3y + 14 + i * 22
    const [cr,cg,cb] = hexRGB(r.color)
    pdf.setTextColor(cr,cg,cb); setFont(16,'bold')
    txt(String(r.num), card3X+10, rry+10)
    ink(C.text); setFont(7.5,'normal')
    const lw = pdf.splitTextToSize(r.label, cardW-40)
    txt(lw[0], card3X+30, rry+6)
    if (lw[1]) txt(lw[1], card3X+30, rry+14)
  })
  // FIX 4: increased section gap
  y += cardH + 20

  // ═════════════════════════════════════════════════════════════
  // SECTION 5 — AI Narrative (2-column)
  // FIX 3: explicit column widths, no overlap
  // FIX 8: guard already present
  // ═════════════════════════════════════════════════════════════
  guard(100)
  const colGap = 12
  const colW   = (CW - colGap) / 2   // ~251.5 pt each
  const narH   = 88
  draw(C.border); pdf.setLineWidth(0.5); fill(C.white)
  pdf.rect(M, y, CW, narH, 'FD')

  // Left column: What changed
  const lColX  = M + 10
  const lMaxW  = colW - 20   // text wraps at ~231 pt
  ink(C.navy); setFont(9,'bold'); txt('What changed this quarter', lColX, y+12)
  // FIX 2: No emoji — use plain ASCII labels
  const changes = [
    { icon:'Air:',   text:'Air spend rose due to shorter booking windows on top domestic routes.' },
    { icon:'Hotel:', text:'Hotel compliance weakened due to non-preferred property use.' },
    { icon:'!',      text:'Duplicate bookings and violations created direct financial risk.' },
  ]
  changes.forEach((c, i) => {
    const lineY = y + 26 + i * 19
    ink(C.purple); setFont(7.5,'bold'); txt(c.icon, lColX, lineY)
    ink(C.text); setFont(7.5,'normal')
    const iconW = pdf.getTextWidth(c.icon) + 4
    const lines = pdf.splitTextToSize(c.text, lMaxW - iconW)
    txt(lines[0], lColX + iconW, lineY)
    if (lines[1]) txt(lines[1], lColX + iconW, lineY + 9)
  })

  // Right column: Recommended actions
  // FIX 3: explicit x = M + colW + colGap ensures no overlap with left column
  const rColX = M + colW + colGap
  const rMaxW = colW - 14
  ink(C.navy); setFont(9,'bold'); txt('Recommended actions', rColX, y+12)
  const actions = [
    { color:C.purple, text:'Tighten advance purchase controls on top five domestic routes.' },
    { color:C.blue,   text:'Improve preferred hotel adoption in highest-spend cities.' },
    { color:C.amber,  text:'Review high-risk exceptions by department head before next quarter.' },
  ]
  actions.forEach((a, i) => {
    const lineY = y + 26 + i * 19
    const [ar,ag,ab] = hexRGB(a.color)
    // FIX 2: No unicode arrow — use plain >
    pdf.setTextColor(ar,ag,ab); setFont(9,'bold')
    txt('>', rColX, lineY)
    ink(C.text); setFont(7.5,'normal')
    const lines = pdf.splitTextToSize(a.text, rMaxW - 12)
    txt(lines[0], rColX + 10, lineY)
    if (lines[1]) txt(lines[1], rColX + 10, lineY + 9)
  })
  // FIX 4: increased section gap
  y += narH + 20

  // ═════════════════════════════════════════════════════════════
  // SECTION 6 — KPI strip (6 cards)
  // FIX 8: guard already present
  // ═════════════════════════════════════════════════════════════
  guard(70)
  const kpiW = (CW - 50) / 6
  const kpiH = 52
  const avgTrip = s.totalTrips ? Math.round((s.totalSpend||0) / s.totalTrips) : 0
  // FIX 7: ASCII trend indicators — ^ for up, v for down, = for flat
  const kpis = [
    { label:'TOTAL SPEND',   value:fmt(s.totalSpend),              trend:'+8% vs Q1',   tColor:C.amber,  bench:'Budget: target' },
    { label:'TRIPS',         value:String(s.totalTrips||0),        trend:'^ vs Q1',     tColor:C.green,  bench:'Plan: on track' },
    { label:'AVG TRIP',      value:fmt(avgTrip),                   trend:'vs prior',    tColor:C.amber,  bench:'Peer: R8,700' },
    { label:'SAVINGS',       value:'R9.2K',                        trend:'22% pipeline',tColor:C.green,  bench:fmt(s.potentialSavings||0) },
    { label:'COMPLIANCE',    value:fmtPct(s.complianceRate),       trend:'v vs Q1',     tColor:C.red,    bench:'Target: 90%' },
    { label:'AT RISK',       value:fmt(atRisk),                    trend:'Monitor',     tColor:C.red,    bench:'Fraud+credits' },
  ]
  kpis.forEach((k, i) => {
    const kx = M + i * (kpiW + 10)
    draw(C.border); pdf.setLineWidth(0.4); fill(C.white)
    pdf.rect(kx, y, kpiW, kpiH, 'FD')
    ink(C.muted);  setFont(6.5,'normal'); txt(k.label, kx+6, y+9)
    ink(C.navy);   setFont(12,'bold');    txt(k.value, kx+6, y+23)
    const [tr2,tg2,tb2] = hexRGB(k.tColor)
    pdf.setTextColor(tr2,tg2,tb2); setFont(7,'normal')
    txt(k.trend, kx+6, y+34)
    ink(C.muted); setFont(6.5,'normal'); txt(k.bench, kx+6, y+44)
  })
  // FIX 4: increased section gap
  y += kpiH + 20

  // ═════════════════════════════════════════════════════════════
  // SECTION 7 — Department table
  // FIX 8: guard already present
  // ═════════════════════════════════════════════════════════════
  guard(140)
  const depts = (s.departmentBreakdown || []).slice(0, 5)
  const tableH = 22 + depts.length * 20 + 8

  draw(C.border); pdf.setLineWidth(0.5); fill(C.white)
  pdf.rect(M, y, CW, tableH, 'FD')

  ink(C.navy); setFont(9,'bold')
  txt('Spend & compliance by department', M+10, y+13)
  ink(C.muted); setFont(7.5,'normal')
  // FIX 2: ASCII pipe instead of unicode separator
  txt('Sorted by spend | ' + String(s.dateRange||''), W-M-10, y+13, { align:'right' })

  const colYT = y + 22
  draw('#EDE9FE'); pdf.setLineWidth(0.3); pdf.line(M, colYT, M+CW, colYT)
  ink(C.muted); setFont(6.5,'normal')
  txt('DEPARTMENT', M+10, colYT+8)
  txt('SPEND SHARE', M+130, colYT+8)
  txt('SPEND', M+320, colYT+8)
  txt('COMP.', M+375, colYT+8)
  txt('VS Q1', M+420, colYT+8)

  const maxDept  = depts.length ? Math.max(...depts.map(d=>d.amount)) : 1
  const deptColors = [C.purple, C.blue, C.green, '#06B6D4', C.amber]
  // FIX 7: ASCII trend symbols — v=down, ==flat, ^=up
  const dTrends = ['v 5%','= 0%','^ 3%','v 2%','^ 1%']
  const tCols   = [C.red, C.amber, C.green, C.amber, C.green]

  depts.forEach((d, i) => {
    const ry = colYT + 14 + i * 20
    if (i % 2 === 0) { fill(C.dim); pdf.rect(M+1, ry-8, CW-2, 20, 'F') }
    ink(C.navy); setFont(8,'normal'); txt(String(d.dept||''), M+10, ry+3)
    fill(C.dim); pdf.rect(M+128, ry-3, 175, 7, 'F')
    const bw = (d.amount/maxDept) * 175
    const [br,bg,bb] = hexRGB(deptColors[i % deptColors.length])
    pdf.setFillColor(br,bg,bb); pdf.rect(M+128, ry-3, bw, 7, 'F')
    ink(C.navy); setFont(8,'bold'); txt(fmt(d.amount), M+320, ry+3)
    // Compliance %
    const deptRecs = recs.filter(r=>r.department===d.dept)
    const dComp = deptRecs.length
      ? Math.round((deptRecs.filter(r=>r.policyStatus==='Compliant').length/deptRecs.length)*100)
      : (s.complianceRate||0)
    const compColor = dComp>=85 ? C.green : dComp>=70 ? C.amber : C.red
    const [cr2,cg2,cb2] = hexRGB(compColor)
    pdf.setTextColor(cr2,cg2,cb2); setFont(8,'bold')
    txt(fmtPct(dComp), M+375, ry+3)
    // vs Q1 — FIX 7: ASCII trends
    const [tc2r,tc2g,tc2b] = hexRGB(tCols[i])
    pdf.setTextColor(tc2r,tc2g,tc2b); setFont(8,'normal')
    txt(dTrends[i], M+420, ry+3)
  })
  // FIX 4: increased section gap
  y += tableH + 20

  // ═════════════════════════════════════════════════════════════
  // SECTION 8 — Footer
  // ═════════════════════════════════════════════════════════════
  const footY = Math.max(y + 10, H - 36)
  draw(C.border); pdf.setLineWidth(0.4)
  pdf.line(M, footY, M+CW, footY)
  ink(C.muted); setFont(7,'normal')
  // FIX 2: ASCII pipe separators
  txt('Last updated ' + todayStr() + ' | ' + String(recs.length) + ' records | Powered by Traivio', M, footY+12)
  const [pr2,pg2,pb2] = hexRGB('#C4B5FD')
  pdf.setTextColor(pr2,pg2,pb2); setFont(7,'bold')
  txt('AI-powered travel intelligence | traivio.ai', M+CW, footY+12, { align:'right' })

  // ═════════════════════════════════════════════════════════════
  // Add page numbers to all pages
  // ═════════════════════════════════════════════════════════════
  const totalPages = pdf.internal.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p)
    ink(C.muted); setFont(7,'normal')
    txt('Page ' + p + ' of ' + totalPages, W-M, H-12, { align:'right' })
  }

  // ═════════════════════════════════════════════════════════════
  // Save
  // ═════════════════════════════════════════════════════════════
  const date = new Date().toISOString().split('T')[0]
  pdf.save(`traivio-cfo-report-${date}.pdf`)
}
