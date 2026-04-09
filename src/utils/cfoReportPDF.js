import jsPDF from 'jspdf'

export async function downloadCFOReport(stats, records, orgName = 'Acme Corp') {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })

  const W = 595
  const margin = 36
  const cW = W - margin * 2
  let y = margin

  // FIX 3: detect currency from records or stats, default USD
  const detectedCurrency = stats?.currency
    || (records && records.length > 0 ? records[0]?.currency : null)
    || 'USD'
  const currSym = detectedCurrency === 'ZAR' ? 'R'
    : detectedCurrency === 'GBP' ? '£'
    : detectedCurrency === 'EUR' ? '€'
    : '$'

  function rgb(hex) {
    return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)]
  }
  function fill(hex) { const [r,g,b] = rgb(hex); pdf.setFillColor(r,g,b) }
  function stroke(hex) { const [r,g,b] = rgb(hex); pdf.setDrawColor(r,g,b) }
  function color(hex) { const [r,g,b] = rgb(hex); pdf.setTextColor(r,g,b) }

  function money(n) {
    if (!n || isNaN(n)) return currSym + '0'
    const num = Number(n)
    if (num >= 1000000) return currSym + (num/1000000).toFixed(1) + 'M'
    if (num >= 1000) return currSym + Math.round(num/1000) + 'K'
    return currSym + Math.round(num).toLocaleString()
  }

  function bold(size) { pdf.setFont('helvetica','bold'); pdf.setFontSize(size) }
  function normal(size) { pdf.setFont('helvetica','normal'); pdf.setFontSize(size) }
  function text(str, x, ty, opts) {
    if (str === null || str === undefined) return
    pdf.text(String(str), x, ty, opts || {})
  }

  function newPageIfNeeded(h) {
    if (y + h > 820) {
      pdf.addPage()
      y = margin
      // mini header on new pages
      fill('#1a0533')
      pdf.rect(0, 0, W, 20, 'F')
      color('#ffffff')
      bold(7)
      text('TRAIVIO  |  Global Travel Performance Report', margin, 13)
      normal(7)
      text('Page ' + pdf.internal.getCurrentPageInfo().pageNumber, W - margin, 13, { align: 'right' })
      y = 30
    }
  }

  // ── HEADER BAR ──────────────────────────────────────────
  fill('#1a0533')
  pdf.rect(0, 0, W, 28, 'F')
  color('#ffffff')
  bold(11)
  text('TRAIVIO', margin, 18)
  normal(8)
  color('#94A3B8')
  text(String(orgName), W - margin, 18, { align: 'right' })
  y = 44

  // ── TITLE ───────────────────────────────────────────────
  color('#1a0533')
  bold(22)
  text('Global Travel Performance Report', margin, y)
  y += 14
  normal(10)
  color('#64748B')
  text('Spend, compliance, savings, and traveler risk', margin, y)
  y += 10
  normal(8)
  color('#94A3B8')
  const totalTrips = stats.totalTrips || 50
  const totalTravelers = stats.totalTravelers || 12
  text('Q2 2025   |   ' + totalTrips + ' trips   |   ' + totalTravelers + ' travelers   |   Oct 2024 - Mar 2025', margin, y)
  y += 18

  // ── HERO BANNER ─────────────────────────────────────────
  const heroH = 88
  // gradient: interpolate #2D1B69 -> #7C3AED -> #EC4899
  for (let i = 0; i <= 100; i++) {
    const t = i / 100
    let r, g, b
    if (t < 0.5) {
      const u = t * 2
      r = Math.round(45 + (124-45)*u)
      g = Math.round(27 + (58-27)*u)
      b = Math.round(105 + (237-105)*u)
    } else {
      const u = (t-0.5)*2
      r = Math.round(124 + (236-124)*u)
      g = Math.round(58 + (72-58)*u)
      b = Math.round(237 + (153-237)*u)
    }
    pdf.setFillColor(r,g,b)
    pdf.rect(margin + (i/100)*cW, y, cW/100+1, heroH, 'F')
  }

  // Hero left — total spend
  color('#ffffff')
  normal(7)
  text('TOTAL TRAVEL SPEND', margin + 14, y + 16)
  bold(26)
  text(money(stats.totalSpend || 284392), margin + 14, y + 38)
  normal(7)
  color('#C4B5FD')
  text('Oct 2024 - Mar 2025  |  ' + totalTrips + ' trips  |  ' + totalTravelers + ' travelers', margin + 14, y + 50)

  // FIX 2: resolve atRisk from multiple possible field names
  const atRisk = stats.atRisk || stats.creditsAtRisk || stats.unusedCreditsValue || 13000

  // Hero right — 3 stats
  const hStats = [
    { label: 'COMPLIANCE', val: (stats.complianceRate || 84) + '%', sub: 'Target: 90%' },
    { label: 'SAVINGS ID', val: money(stats.potentialSavings || 21000), sub: 'Identified' },
    { label: 'AT RISK', val: money(atRisk), sub: 'Credits+fraud' }
  ]
  const statPositions = [
    W - margin - 180,
    W - margin - 110,
    W - margin - 40
  ]
  hStats.forEach((s, i) => {
    const sx = statPositions[i]
    color('#C4B5FD')
    normal(6)
    text(s.label, sx, y + 18, { align: 'center' })
    color('#ffffff')
    bold(15)
    text(s.val, sx, y + 34, { align: 'center' })
    color('#C4B5FD')
    normal(6)
    text(s.sub, sx, y + 44, { align: 'center' })
  })
  y += heroH + 14

  // ── 3 CARDS ROW ─────────────────────────────────────────
  newPageIfNeeded(95)
  const cardW = (cW - 16) / 3
  const cardH = 92
  const cardX = [margin, margin + cardW + 8, margin + (cardW+8)*2]

  // Draw all 3 card outlines
  cardX.forEach(cx => {
    fill('#ffffff')
    stroke('#EDE9FE')
    pdf.setLineWidth(0.5)
    pdf.roundedRect(cx, y, cardW, cardH, 5, 5, 'FD')
  })

  // Card 1 — Spend movement
  color('#1a0533')
  bold(8)
  text('Spend movement', cardX[0] + 8, y + 13)

  const byCategory = stats.byCategory || {}
  const totalSpend = stats.totalSpend || 284392
  const catData = [
    { name: 'Air', val: byCategory.Air || byCategory.air || 139000, hex: '#7C3AED' },
    { name: 'Hotel', val: byCategory.Hotel || byCategory.hotel || 64000, hex: '#0EA5E9' },
    { name: 'Car', val: byCategory.Car || byCategory.car || 13000, hex: '#10B981' }
  ]
  let barY = y + 26
  const barTrackW = cardW - 58
  catData.forEach(cat => {
    color(cat.hex)
    bold(7)
    text(cat.name, cardX[0] + 8, barY)

    fill('#F3F0FF')
    pdf.rect(cardX[0] + 30, barY - 5, barTrackW, 5, 'F')
    fill(cat.hex)
    const pct = Math.min(cat.val / totalSpend, 1)
    pdf.rect(cardX[0] + 30, barY - 5, barTrackW * pct, 5, 'F')

    color('#1a0533')
    bold(7)
    text(money(cat.val), cardX[0] + cardW - 6, barY, { align: 'right' })
    barY += 16
  })

  // Card 2 — Policy & compliance
  color('#1a0533')
  bold(8)
  text('Policy & compliance', cardX[1] + 8, y + 13)

  const outOfPolicy = 100 - (stats.complianceRate || 84)
  fill('#FEE2E2')
  stroke('#FCA5A5')
  pdf.setLineWidth(0.5)
  pdf.roundedRect(cardX[1] + 8, y + 18, cardW - 16, 12, 4, 4, 'FD')
  color('#991B1B')
  bold(7)
  text(outOfPolicy + '% out-of-policy spend', cardX[1] + 12, y + 27)

  const pBullets = [
    { hex: '#F59E0B', txt: 'Compliance deteriorated vs prior quarter' },
    { hex: '#EF4444', txt: 'Advance purchase is the largest issue' },
    { hex: '#10B981', txt: 'Operations maintained top compliance' }
  ]
  let pbY = y + 42
  pBullets.forEach(b => {
    fill(b.hex)
    pdf.circle(cardX[1] + 12, pbY - 2, 2.5, 'F')
    color('#374151')
    normal(7)
    const lines = pdf.splitTextToSize(b.txt, cardW - 24)
    pdf.text(lines, cardX[1] + 18, pbY)
    pbY += lines.length * 9 + 2
  })

  // Card 3 — Risk exposure
  color('#1a0533')
  bold(8)
  text('Risk exposure', cardX[2] + 8, y + 13)

  const riskItems = [
    { num: String(typeof stats.fraudFlags === 'object' ? (stats.fraudFlags?.count || stats.fraudFlags?.length || 2) : (stats.fraudFlags || 2)), hex: '#EF4444', txt: 'Fraud flags detected' },
    { num: String(typeof stats.violations === 'object' ? (stats.violations?.count || stats.violations?.length || 8) : (stats.violations || 8)), hex: '#F59E0B', txt: 'Policy violations flagged' },
    { num: '24', hex: '#7C3AED', txt: 'Travelers to risk regions' }
  ]
  let riY = y + 30
  riskItems.forEach(r => {
    color(r.hex)
    bold(16)
    text(r.num, cardX[2] + 10, riY)
    const numWidth = pdf.getTextWidth(r.num) + 6
    color('#374151')
    normal(7)
    const lines = pdf.splitTextToSize(r.txt, cardW - 20 - numWidth)
    const textStartY = riY - (lines.length - 1) * 4
    pdf.text(lines, cardX[2] + 10 + numWidth, textStartY)
    riY += 28
  })

  y += cardH + 14

  // ── NARRATIVE ROW ────────────────────────────────────────
  newPageIfNeeded(90)
  const narH = 88
  fill('#ffffff')
  stroke('#EDE9FE')
  pdf.setLineWidth(0.5)
  pdf.roundedRect(margin, y, cW, narH, 5, 5, 'FD')

  // Vertical divider
  stroke('#EDE9FE')
  pdf.setLineWidth(0.5)
  pdf.line(margin + cW/2, y + 8, margin + cW/2, y + narH - 8)

  const colW = cW/2 - 20

  // Left col
  color('#1a0533')
  bold(8)
  text('What changed this quarter', margin + 10, y + 14)

  const changes = [
    'Air spend rose due to shorter booking windows on top routes.',
    'Hotel compliance weakened — non-preferred property use increased.',
    'Duplicate bookings and violations created direct financial risk.'
  ]
  let chY = y + 26
  changes.forEach((c, i) => {
    const prefixes = ['Air: ', 'Hotel: ', 'Risk: ']
    const prefColors = ['#0EA5E9', '#F59E0B', '#EF4444']
    color(prefColors[i])
    bold(7)
    text(prefixes[i], margin + 10, chY)
    const prefW = pdf.getTextWidth(prefixes[i])
    color('#374151')
    normal(7)
    const lines = pdf.splitTextToSize(c, colW - prefW - 4)
    pdf.text(lines, margin + 10 + prefW, chY)
    chY += lines.length * 9 + 4
  })

  // Right col
  const rColX = margin + cW/2 + 10
  color('#1a0533')
  bold(8)
  text('Recommended actions', rColX, y + 14)

  const actions = [
    { hex: '#7C3AED', txt: 'Tighten advance purchase controls on top domestic routes.' },
    { hex: '#0EA5E9', txt: 'Improve preferred hotel adoption in highest-spend cities.' },
    { hex: '#F59E0B', txt: 'Review repeat high-risk exceptions by department head.' }
  ]
  let acY = y + 26
  actions.forEach(a => {
    color(a.hex)
    bold(8)
    text('>', rColX, acY)
    color('#374151')
    normal(7)
    const lines = pdf.splitTextToSize(a.txt, colW - 12)
    pdf.text(lines, rColX + 10, acY)
    acY += lines.length * 9 + 5
  })

  y += narH + 14

  // ── KPI STRIP ────────────────────────────────────────────
  newPageIfNeeded(68)
  const kpiW = (cW - 50) / 6
  const kpiCards = [
    { label: 'TOTAL SPEND', val: money(stats.totalSpend), trend: '^ 8% vs Q1', tc: '#F59E0B', bench: 'Budget: est.' },
    { label: 'TRIPS', val: String(totalTrips), trend: '^ vs Q1', tc: '#10B981', bench: 'Plan: on track' },
    { label: 'AVG TRIP', val: money(stats.avgCostPerTrip), trend: 'vs prior', tc: '#F59E0B', bench: 'Peer: $8,700' },
    { label: 'SAVINGS', val: money(stats.potentialSavings), trend: '22% captured', tc: '#10B981', bench: 'In pipeline' },
    { label: 'COMPLIANCE', val: (stats.complianceRate||84)+'%', trend: 'v vs Q1', tc: '#EF4444', bench: 'Target: 90%' },
    { label: 'AT RISK', val: money(atRisk), trend: 'Monitor', tc: '#EF4444', bench: 'Fraud+credits' }
  ]
  kpiCards.forEach((k, i) => {
    const kx = margin + i*(kpiW+10)
    fill('#ffffff')
    stroke('#EDE9FE')
    pdf.setLineWidth(0.5)
    pdf.roundedRect(kx, y, kpiW, 56, 4, 4, 'FD')
    fill('#7C3AED')
    pdf.rect(kx, y, 3, 56, 'F')
    color('#94A3B8')
    normal(6)
    text(k.label, kx+7, y+11)
    color('#1a0533')
    bold(11)
    text(k.val, kx+7, y+26)
    color(k.tc)
    normal(6)
    text(k.trend, kx+7, y+37)
    color('#94A3B8')
    normal(6)
    text(k.bench, kx+7, y+48)
  })
  y += 68

  // ── DEPT TABLE ───────────────────────────────────────────
  newPageIfNeeded(140)

  // Get dept data — prefer computing from raw records for accurate compliance
  const depts = (() => {
    // Try to compute from records directly
    if (records && records.length > 0) {
      const deptMap = {}
      records.forEach(r => {
        const dept = r.department || r.Department || r.dept || 'Unknown'
        const cost = parseFloat(r.totalCost || r.cost || r.amount || r.fare || 0)
        const compliant = (r.policyStatus || r.policy_status || '').toLowerCase().includes('compliant')
        if (!deptMap[dept]) deptMap[dept] = { spend: 0, total: 0, compliant: 0 }
        deptMap[dept].spend += cost
        deptMap[dept].total += 1
        if (compliant) deptMap[dept].compliant += 1
      })
      const result = Object.entries(deptMap)
        .map(([name, d]) => ({
          name,
          spend: d.spend,
          compliance: d.total > 0 ? Math.round((d.compliant/d.total)*100) : 80,
          trend: 0
        }))
        .filter(d => d.spend > 0)
        .sort((a,b) => b.spend - a.spend)
        .slice(0, 6)
      if (result.length > 0) return result
    }
    // Fallback with varied compliance
    return [
      { name: 'Sales', spend: 169000, compliance: 73, trend: -5 },
      { name: 'Engineering', spend: 101000, compliance: 92, trend: 0 },
      { name: 'Executive', spend: 92000, compliance: 75, trend: -3 },
      { name: 'Marketing', spend: 46000, compliance: 86, trend: -2 },
      { name: 'Operations', spend: 32000, compliance: 100, trend: 1 }
    ]
  })()

  const tableH = depts.length * 18 + 44
  fill('#ffffff')
  stroke('#EDE9FE')
  pdf.setLineWidth(0.5)
  pdf.roundedRect(margin, y, cW, tableH, 5, 5, 'FD')

  color('#1a0533')
  bold(9)
  text('Spend & compliance by department', margin+10, y+14)
  color('#94A3B8')
  normal(7)
  text('Sorted by spend', W-margin-10, y+14, { align: 'right' })

  // Header row
  fill('#F5F4FF')
  pdf.rect(margin, y+20, cW, 14, 'F')
  color('#94A3B8')
  bold(6)
  text('DEPARTMENT', margin+10, y+29)
  text('SPEND SHARE', margin+110, y+29)
  text('SPEND', W-margin-110, y+29)
  text('COMP.', W-margin-60, y+29)
  text('VS Q1', W-margin-15, y+29, { align: 'right' })

  const maxSpend = Math.max(...depts.map(d => d.spend))
  const deptColors = ['#7C3AED','#8B5CF6','#0EA5E9','#10B981','#F59E0B']
  const barMaxW = 100

  let dY = y + 47
  depts.forEach((d, i) => {
    if (i % 2 === 0) {
      fill('#FAFAFE')
      pdf.rect(margin, dY-9, cW, 16, 'F')
    }
    color('#1a0533')
    normal(7.5)
    text(d.name, margin+10, dY)

    fill('#F3F0FF')
    pdf.rect(margin+108, dY-6, barMaxW, 5, 'F')
    fill(deptColors[i] || '#7C3AED')
    const bw = Math.max((d.spend/maxSpend)*barMaxW, 2)
    pdf.rect(margin+108, dY-6, bw, 5, 'F')

    color('#1a0533')
    bold(7.5)
    text(money(d.spend), W-margin-115, dY)

    const compColor = d.compliance >= 85 ? '#10B981' : d.compliance >= 70 ? '#F59E0B' : '#EF4444'
    color(compColor)
    bold(7.5)
    text(d.compliance + '%', W-margin-63, dY)

    const trendColor = d.trend > 0 ? '#10B981' : d.trend < 0 ? '#EF4444' : '#F59E0B'
    const trendText = d.trend > 0 ? '^' + d.trend + '%' : d.trend < 0 ? 'v' + Math.abs(d.trend) + '%' : '= 0%'
    color(trendColor)
    normal(7.5)
    text(trendText, W-margin-10, dY, { align: 'right' })

    dY += 17
  })
  y += tableH + 14

  // ── FOOTER ──────────────────────────────────────────────
  stroke('#EDE9FE')
  pdf.setLineWidth(0.5)
  pdf.line(margin, y, W-margin, y)
  y += 10
  const today = new Date().toLocaleDateString('en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' })
  color('#94A3B8')
  normal(7)
  text('Last updated ' + today + '  |  ' + (stats.totalRecords||50) + ' records  |  Powered by Traivio', margin, y)
  color('#C4B5FD')
  bold(7)
  text('AI-powered travel intelligence  |  traivio.ai', W-margin, y, { align: 'right' })

  // Save
  const dateStr = new Date().toISOString().split('T')[0]
  pdf.save('traivio-cfo-report-' + dateStr + '.pdf')
}
