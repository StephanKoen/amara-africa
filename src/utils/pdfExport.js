import jsPDF from 'jspdf'

// ── constants ──────────────────────────────────────────────────────────────────
const M  = 14          // margin mm
const PW = 210         // page width mm
const PH = 297         // page height mm
const CW = PW - M * 2 // content width mm

// ── text helpers ───────────────────────────────────────────────────────────────
function trunc(text, maxMM) {
  const t = String(text ?? '')
  const max = Math.max(3, Math.floor(maxMM * 0.88))
  return t.length > max ? t.slice(0, max - 1) + '…' : t
}
function fmtZAR(n)  { return `R${Math.round(n).toLocaleString('en-ZA')}` }
function fmtPct(n)  { return `${Math.round(n)}%` }
function todayStr() { return new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) }

// ── cover page ─────────────────────────────────────────────────────────────────
function drawCover(pdf, title, orgName, dateRange, recordCount, aiMapped) {
  // purple header
  pdf.setFillColor(26, 5, 51)
  pdf.rect(0, 0, PW, 105, 'F')

  // logo pill
  pdf.setFillColor(124, 58, 237)
  pdf.roundedRect(M, 16, 38, 10, 2, 2, 'F')
  pdf.setTextColor(255, 255, 255)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(7.5)
  pdf.text('TRAIVIO', M + 7, 22.5)

  // tagline
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  pdf.setTextColor(196, 181, 253)
  pdf.text('AI-powered travel intelligence', M, 40)

  // divider
  pdf.setDrawColor(124, 58, 237)
  pdf.setLineWidth(0.5)
  pdf.line(M, 48, PW - M, 48)

  // report title
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(20)
  pdf.setTextColor(255, 255, 255)
  const lines = pdf.splitTextToSize(title, CW)
  pdf.text(lines, M, 65)

  // meta block
  const my = 122
  const meta = [
    ['Organisation', orgName],
    ['Data period', dateRange],
    ['Records analysed', String(recordCount)],
    ['Generated', todayStr()],
  ]
  meta.forEach(([lbl, val], i) => {
    const y = my + i * 16
    pdf.setFontSize(9); pdf.setFont('helvetica', 'normal'); pdf.setTextColor(100, 116, 139)
    pdf.text(lbl, M, y)
    pdf.setFont('helvetica', 'bold'); pdf.setTextColor(26, 5, 51)
    pdf.text(val, M + 48, y)
  })

  // ai-mapped disclaimer
  if (aiMapped) {
    const ay = my + 4 * 16 + 8
    pdf.setFillColor(254, 243, 199)
    pdf.roundedRect(M, ay, CW, 12, 2, 2, 'F')
    pdf.setFontSize(8); pdf.setFont('helvetica', 'normal'); pdf.setTextColor(146, 64, 14)
    pdf.text('Analysis based on AI column detection — verify key totals against source data.', M + 3, ay + 8)
  }
}

// ── footer ─────────────────────────────────────────────────────────────────────
function drawFooter(pdf, pageNum, total, aiMapped) {
  pdf.setPage(pageNum)
  const y = PH - 9
  pdf.setDrawColor(237, 233, 254); pdf.setLineWidth(0.25)
  pdf.line(M, y - 3, PW - M, y - 3)
  pdf.setFontSize(7); pdf.setFont('helvetica', 'normal'); pdf.setTextColor(148, 163, 184)
  pdf.text('Traivio | AI-powered travel intelligence', M, y)
  pdf.text(`Page ${pageNum} of ${total}`, PW - M, y, { align: 'right' })
  if (aiMapped) pdf.text('AI column detection', PW / 2, y, { align: 'center' })
}
function addFooters(pdf, aiMapped) {
  const n = pdf.internal.getNumberOfPages()
  for (let p = 1; p <= n; p++) drawFooter(pdf, p, n, aiMapped)
}

// ── section header ──────────────────────────────────────────────────────────────
function sectionHead(pdf, title, y) {
  pdf.setFontSize(11); pdf.setFont('helvetica', 'bold'); pdf.setTextColor(124, 58, 237)
  pdf.text(title, M, y)
  pdf.setDrawColor(237, 233, 254); pdf.setLineWidth(0.4)
  pdf.line(M, y + 2, PW - M, y + 2)
  return y + 11
}

// ── big stat ────────────────────────────────────────────────────────────────────
function bigStat(pdf, label, value, rgb, x, y) {
  pdf.setFontSize(8.5); pdf.setFont('helvetica', 'normal'); pdf.setTextColor(100, 116, 139)
  pdf.text(label, x, y)
  pdf.setFontSize(18); pdf.setFont('helvetica', 'bold'); pdf.setTextColor(...rgb)
  pdf.text(value, x, y + 12)
}

// ── table ───────────────────────────────────────────────────────────────────────
function drawTable(pdf, headers, colWidths, rows, startY, rowH = 7) {
  let y = startY
  const totalW = colWidths.reduce((a, b) => a + b, 0)

  function headerRow() {
    pdf.setFillColor(124, 58, 237)
    pdf.rect(M, y, totalW, rowH, 'F')
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(7.5); pdf.setFont('helvetica', 'bold')
    let x = M + 2
    headers.forEach((h, i) => { pdf.text(trunc(h, colWidths[i] - 3), x, y + rowH - 2); x += colWidths[i] })
    y += rowH
  }
  headerRow()

  rows.forEach((row, ri) => {
    if (y > PH - 22) { pdf.addPage(); y = 20; headerRow() }
    if (ri % 2 === 0) {
      pdf.setFillColor(245, 244, 255)
      pdf.rect(M, y, totalW, rowH, 'F')
    }
    pdf.setTextColor(26, 5, 51); pdf.setFontSize(7.5); pdf.setFont('helvetica', 'normal')
    let x = M + 2
    row.forEach((cell, i) => { pdf.text(trunc(String(cell ?? ''), colWidths[i] - 3), x, y + rowH - 2); x += colWidths[i] })
    y += rowH
  })
  return y
}

// ── dept compliance helper ──────────────────────────────────────────────────────
function deptCompliance(records) {
  const map = {}
  records.forEach(r => {
    if (!map[r.department]) map[r.department] = { dept: r.department, compliant: 0, violations: 0, spend: 0 }
    if (r.policyStatus === 'Compliant') map[r.department].compliant++
    else map[r.department].violations++
    map[r.department].spend += r.totalCost
  })
  return Object.values(map).sort((a, b) => b.spend - a.spend)
}

// ── CSV download helper (used from ReportsAnalytics) ───────────────────────────
export function downloadCSV(filename, headers, rows) {
  const escape = v => `"${String(v ?? '').replace(/"/g, '""')}"`
  const date = new Date().toISOString().slice(0, 10)
  const lines = [
    `# Traivio Export | ${filename} | ${date}`,
    headers.map(escape).join(','),
    ...rows.map(r => r.map(escape).join(',')),
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = `traivio-${filename.toLowerCase().replace(/\s+/g,'-')}-${date}.csv`; a.click()
  URL.revokeObjectURL(url)
}

// ── main export ────────────────────────────────────────────────────────────────
export async function generateReport(type, stats, orgName = 'Acme Corp (Demo)', aiMapped = false, aiText = null) {
  const pdf      = new jsPDF('p', 'mm', 'a4')
  const s        = stats || {}
  const records  = s.records || []
  const dr       = s.dateRange || ''
  const count    = records.length

  const titleMap = {
    monthly:    'Monthly Travel Summary',
    compliance: 'Policy Compliance Scorecard',
    savings:    'Savings Opportunity Report',
    risk:       'Risk & Fraud Flag Report',
    'ai-exec':  'AI Executive Summary',
    credits:    'Unused Credits & Expiry Report',
    vendor:     'Vendor Performance Report',
  }
  const reportTitle = titleMap[type] || 'Travel Report'

  drawCover(pdf, reportTitle, orgName, dr, count, aiMapped)
  pdf.addPage()
  let y = 22

  // ── 1. MONTHLY ───────────────────────────────────────────────────────────────
  if (type === 'monthly') {
    y = sectionHead(pdf, 'Monthly Spend Breakdown', y)
    const ms = s.monthlySpend || []
    const mt = s.monthlyTrips || {}
    const msRows = ms.map((m, i) => {
      const prev = ms[i - 1]?.amount || m.amount
      const pct  = prev ? Math.round(((m.amount - prev) / prev) * 100) : 0
      const trips = mt[m.key] || 0
      const avg   = trips ? Math.round(m.amount / trips) : 0
      return [m.month, trips, fmtZAR(m.amount), fmtZAR(avg), pct >= 0 ? `+${pct}%` : `${pct}%`]
    })
    y = drawTable(pdf, ['Month', 'Trips', 'Total Spend', 'Avg / Trip', 'vs Prev'], [35, 20, 45, 45, 37], msRows, y)
    y += 10

    y = sectionHead(pdf, 'Top 5 Routes by Volume', y)
    const routeRows = (s.topRoutes || []).map(r => [r.route, r.count, fmtZAR(r.spend), fmtZAR(r.count ? r.spend / r.count : 0)])
    y = drawTable(pdf, ['Route', 'Bookings', 'Total Spend', 'Avg Fare'], [55, 27, 50, 50], routeRows, y)
    y += 10

    if (y > PH - 60) { pdf.addPage(); y = 22 }
    y = sectionHead(pdf, 'Top 5 Travelers by Spend', y)
    const travRows = (s.topTravelers || []).map(t => [t.name, t.department, t.trips, fmtZAR(t.amount), fmtZAR(t.trips ? t.amount / t.trips : 0)])
    y = drawTable(pdf, ['Traveler', 'Department', 'Trips', 'Total Spend', 'Avg / Trip'], [52, 38, 18, 42, 32], travRows, y)
    y += 10

    if (y > PH - 60) { pdf.addPage(); y = 22 }
    y = sectionHead(pdf, 'Spend by Category', y)
    const catRows = (s.categoryBreakdown || []).map(c => [c.name, fmtZAR(c.value), fmtPct(s.totalSpend ? (c.value / s.totalSpend) * 100 : 0), records.filter(r => r.category === c.name).length])
    y = drawTable(pdf, ['Category', 'Amount', '% of Total', 'Records'], [60, 50, 50, 22], catRows, y)

  // ── 2. COMPLIANCE ────────────────────────────────────────────────────────────
  } else if (type === 'compliance') {
    const viol   = s.violations || []
    const violAmt = viol.reduce((a, r) => a + r.totalCost, 0)
    const cr     = s.complianceRate || 0
    const crRGB  = cr >= 85 ? [16, 185, 129] : cr >= 70 ? [245, 158, 11] : [239, 68, 68]

    bigStat(pdf, 'Compliance Rate',    fmtPct(cr),             crRGB,             M,          y)
    bigStat(pdf, 'Total Violations',   String(s.violationCount || 0), [239, 68, 68], M + 65,  y)
    bigStat(pdf, 'Amount at Risk',     fmtZAR(violAmt),        [245, 158, 11],    M + 125,    y)
    y += 28

    y = sectionHead(pdf, 'Policy Violations Detail', y)
    const violRows = viol.map(r => [r.travelerName, r.travelDate?.slice(0, 10) || '', `${r.originCode}→${r.destinationCode}`, fmtZAR(r.totalCost), r.department])
    y = drawTable(pdf, ['Traveler', 'Date', 'Route / Item', 'Amount', 'Dept'], [48, 22, 50, 32, 30], violRows, y)
    y += 10

    if (y > PH - 60) { pdf.addPage(); y = 22 }
    y = sectionHead(pdf, 'Compliance by Department', y)
    const dc = deptCompliance(records)
    const dcRows = dc.map(d => {
      const total = d.compliant + d.violations
      return [d.dept, d.compliant, d.violations, fmtPct(total ? (d.compliant / total) * 100 : 100), fmtZAR(d.spend)]
    })
    y = drawTable(pdf, ['Department', 'Compliant', 'Violations', 'Rate', 'Total Spend'], [55, 28, 28, 30, 41], dcRows, y)

  // ── 3. SAVINGS ───────────────────────────────────────────────────────────────
  } else if (type === 'savings') {
    const totalSav = (s.potentialSavings || 0) + 41000
    bigStat(pdf, 'Total Potential Savings (annual)', fmtZAR(totalSav), [16, 185, 129], M, y)
    y += 28

    y = sectionHead(pdf, 'Fare Discrepancy Analysis', y)
    const fd = s.fareDiscrepancies || []
    const fdRows = fd.map(r => [r.travelerName, `${r.originCode}→${r.destinationCode}`, fmtZAR(r.totalCost), fmtZAR(r.marketRate || 0), fmtZAR(r.totalCost - (r.marketRate || 0)), r.travelDate?.slice(0, 10) || ''])
    y = drawTable(pdf, ['Traveler', 'Route', 'Booked', 'Market Rate', 'Excess', 'Date'], [45, 42, 28, 28, 24, 23], fdRows, y)
    y += 10

    if (y > PH - 70) { pdf.addPage(); y = 22 }
    y = sectionHead(pdf, 'Savings Opportunities Pipeline', y)
    const pipeline = [
      ['Advance Booking Policy (14+ days)',   fmtZAR(18200), 'Low',    'High',     '22% lower fares on 60% of routes'],
      ['Hotel Vendor Consolidation',           fmtZAR(12400), 'Medium', 'High',     'Reduce to 3 preferred hotels'],
      ['Apply Expiring Credits',               fmtZAR(9800),  'Low',    'Critical', 'Credits expire within 30 days'],
      ['Car Rental Preferred Vendors',         fmtZAR(6800),  'Low',    'Medium',   'Use Avis/Budget contract rates'],
      ['Route Optimisation (rail sub)',         fmtZAR(3600),  'High',   'Low',      '8 routes suitable for rail'],
    ]
    y = drawTable(pdf, ['Opportunity', 'Est. Annual', 'Effort', 'Priority', 'Notes'], [62, 28, 20, 22, 50], pipeline, y)

  // ── 4. RISK ──────────────────────────────────────────────────────────────────
  } else if (type === 'risk') {
    const ff     = s.fraudFlags || []
    const viol   = s.violations || []
    const atRisk = [...ff, ...viol].reduce((a, r) => a + r.totalCost, 0)

    bigStat(pdf, 'Fraud Flags',   String(ff.length),             [239, 68, 68],  M,      y)
    bigStat(pdf, 'Policy Violations', String(s.violationCount || 0), [245, 158, 11], M + 65, y)
    bigStat(pdf, 'Amount at Risk', fmtZAR(atRisk),              [239, 68, 68],  M + 125, y)
    y += 28

    y = sectionHead(pdf, 'Fraud & Anomaly Flags', y)
    const ffRows = ff.map((r, i) => [i + 1, r.notes?.slice(0, 30) || 'Anomaly detected', r.travelerName, fmtZAR(r.totalCost), r.travelDate?.slice(0, 10) || '', 'High'])
    y = drawTable(pdf, ['#', 'Type', 'Traveler', 'Amount', 'Date', 'Risk'], [10, 55, 42, 28, 24, 23], ffRows, y)
    y += 10

    if (y > PH - 60) { pdf.addPage(); y = 22 }
    y = sectionHead(pdf, 'Policy Violations', y)
    const violRows2 = viol.map((r, i) => [i + 1, r.travelerName, r.notes?.slice(0, 35) || r.policyStatus, fmtZAR(r.totalCost), r.travelDate?.slice(0, 10) || '', r.department])
    y = drawTable(pdf, ['#', 'Traveler', 'Violation Type', 'Amount', 'Date', 'Dept'], [10, 42, 60, 28, 22, 20], violRows2, y)

  // ── 5. AI EXEC ───────────────────────────────────────────────────────────────
  } else if (type === 'ai-exec') {
    // Key metrics strip
    bigStat(pdf, 'Total Spend',      fmtZAR(s.totalSpend || 0),              [124, 58, 237], M,       y)
    bigStat(pdf, 'Total Trips',      String(s.totalTrips || 0),               [14, 165, 233], M + 65, y)
    bigStat(pdf, 'Compliance Rate',  fmtPct(s.complianceRate || 0),          [16, 185, 129], M + 120, y)
    bigStat(pdf, 'Date Range',       s.dateRange || '',                        [100,116,139],  M,       y + 22)
    bigStat(pdf, 'Fraud Flags',      String(s.fraudFlagCount || 0),           [239, 68, 68],  M + 65,  y + 22)
    bigStat(pdf, 'Potential Savings',fmtZAR((s.potentialSavings || 0)+41000), [16,185,129],   M + 120, y + 22)
    y += 50

    y = sectionHead(pdf, 'Executive Summary', y)
    const summaryText = aiText || `Traivio AI analysis for ${orgName}.\n\nData period: ${dr}. Total travel spend: ${fmtZAR(s.totalSpend || 0)} across ${s.totalTrips || 0} trips by ${s.uniqueTravelers || 0} travelers.\n\nCompliance rate is ${fmtPct(s.complianceRate || 0)} against a 90% target. ${s.violationCount || 0} policy violations were detected totalling ${fmtZAR((s.violations || []).reduce((a, r) => a + r.totalCost, 0))}.\n\nKey recommendations:\n1. Enforce 14-day advance booking policy to capture lower fares.\n2. Apply ${fmtZAR(9800)} in expiring airline credits before they lapse.\n3. Investigate ${s.fraudFlagCount || 0} flagged transactions immediately.\n\nTotal identified savings pipeline: ${fmtZAR((s.potentialSavings || 0) + 41000)} annually.`

    pdf.setFontSize(10); pdf.setFont('helvetica', 'normal'); pdf.setTextColor(26, 5, 51)
    summaryText.split('\n').forEach(line => {
      if (!line.trim()) { y += 4; return }
      if (y > PH - 20) { pdf.addPage(); y = 22 }
      const wrapped = pdf.splitTextToSize(line, CW)
      pdf.text(wrapped, M, y)
      y += wrapped.length * 6
    })

  // ── 6. CREDITS ───────────────────────────────────────────────────────────────
  } else if (type === 'credits') {
    const credits = [
      { id:'TC-4821', traveler:'Andrew Fischer', airline:'British Airways', amount:9800, expires:'2025-04-15', days:8 },
      { id:'TC-3912', traveler:'Lisa Botha',      airline:'SAA',            amount:5600, expires:'2025-04-18', days:11 },
      { id:'TC-5503', traveler:'Sarah Johnson',   airline:'Emirates',       amount:3200, expires:'2025-04-22', days:15 },
      { id:'TC-2287', traveler:'Thabo Radebe',    airline:'SAA',            amount:4100, expires:'2025-05-01', days:24 },
      { id:'TC-6614', traveler:'Nomsa Sithole',   airline:'Airlink',        amount:2800, expires:'2025-05-10', days:33 },
      { id:'TC-7731', traveler:'Craig Dlamini',   airline:'Emirates',       amount:1900, expires:'2025-05-20', days:43 },
    ]
    const total = credits.reduce((a, c) => a + c.amount, 0)
    const urgent = credits.filter(c => c.days <= 14)

    bigStat(pdf, 'Total Credits at Risk', fmtZAR(total),         [239, 68, 68],  M,       y)
    bigStat(pdf, 'Expiring < 14 days',    String(urgent.length), [245, 158, 11], M + 75, y)
    bigStat(pdf, 'Total Credits',         String(credits.length),[124, 58, 237], M + 135, y)
    y += 28

    y = sectionHead(pdf, 'Credit Inventory — Act Immediately', y)
    const cRows = credits.map(c => [c.id, c.traveler, c.airline, fmtZAR(c.amount), c.expires, c.days <= 14 ? `${c.days}d URGENT` : `${c.days}d`])
    y = drawTable(pdf, ['Ticket ID', 'Traveler', 'Airline', 'Amount', 'Expires', 'Days Left'], [30, 42, 38, 28, 24, 20], cRows, y)

  // ── 7. VENDOR ────────────────────────────────────────────────────────────────
  } else if (type === 'vendor') {
    y = sectionHead(pdf, 'Vendor Spend Summary', y)
    const preferred = new Set(['South African Airways', 'British Airways', 'Emirates', 'FlySafair', 'Airlink', 'Marriott', 'Protea Hotels', 'Avis', 'Budget'])
    const vmap = {}
    records.forEach(r => {
      if (!vmap[r.vendor]) vmap[r.vendor] = { vendor: r.vendor, category: r.category, trips: 0, spend: 0, compliant: 0, total: 0 }
      vmap[r.vendor].trips++
      vmap[r.vendor].spend += r.totalCost
      vmap[r.vendor].total++
      if (r.policyStatus === 'Compliant') vmap[r.vendor].compliant++
    })
    const vRows = Object.values(vmap)
      .sort((a, b) => b.spend - a.spend)
      .map(v => [v.vendor, v.category, v.trips, fmtZAR(v.spend), fmtZAR(v.trips ? v.spend / v.trips : 0), fmtPct(v.total ? (v.compliant / v.total) * 100 : 100)])
    y = drawTable(pdf, ['Vendor', 'Category', 'Trips', 'Total Spend', 'Avg Cost', 'Compliance'], [52, 22, 16, 38, 30, 24], vRows, y)
    y += 10

    if (y > PH - 60) { pdf.addPage(); y = 22 }
    y = sectionHead(pdf, 'Preferred vs Non-Preferred Breakdown', y)
    let prefSpend = 0, nonPrefSpend = 0, prefVendors = [], nonPrefVendors = []
    Object.values(vmap).forEach(v => {
      if (preferred.has(v.vendor)) { prefSpend += v.spend; prefVendors.push(v.vendor) }
      else                          { nonPrefSpend += v.spend; nonPrefVendors.push(v.vendor) }
    })
    const total = prefSpend + nonPrefSpend
    const pnRows = [
      ['Preferred',     prefVendors.slice(0, 3).join(', ') + (prefVendors.length > 3 ? '…' : ''), fmtZAR(prefSpend),    fmtPct(total ? (prefSpend / total) * 100 : 0)],
      ['Non-Preferred', nonPrefVendors.join(', ') || 'None',                                       fmtZAR(nonPrefSpend), fmtPct(total ? (nonPrefSpend / total) * 100 : 0)],
    ]
    y = drawTable(pdf, ['Type', 'Vendors', 'Total Spend', '% of Spend'], [38, 72, 40, 32], pnRows, y)
  }

  addFooters(pdf, aiMapped)
  pdf.save(`traivio-${type}-${new Date().toISOString().slice(0, 10)}.pdf`)
}

// backward-compat stub (no-op since we removed html2canvas)
export async function captureSection() {}
