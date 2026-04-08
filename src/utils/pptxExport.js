import PptxGenJS from 'pptxgenjs'

// ── brand ──────────────────────────────────────────────────────────────────────
const PURPLE = '7C3AED'
const DARK   = '1a0533'
const LIGHT  = 'F5F4FF'
const WHITE  = 'FFFFFF'
const MUTED  = '64748B'

function fmtZAR(n) {
  if (n == null) return '—'
  if (n >= 1000000) return `R${(n/1000000).toFixed(1)}M`
  if (n >= 1000)    return `R${Math.round(n/1000)}K`
  return `R${Math.round(n)}`
}
function fmtPct(n) { return `${Math.round(n || 0)}%` }
function today()   { return new Date().toLocaleDateString('en-ZA', { day:'numeric', month:'long', year:'numeric' }) }

// ── slide helpers ──────────────────────────────────────────────────────────────
function addSlideHeader(slide, title, sub) {
  // purple top bar
  slide.addShape('rect', { x:0, y:0, w:'100%', h:0.55, fill:{ color: PURPLE } })
  slide.addText('TRAIVIO', { x:0.3, y:0.1, w:1.5, h:0.35, fontSize:9, bold:true, color:WHITE })
  slide.addText(title, { x:0, y:0.65, w:'100%', h:0.45, fontSize:20, bold:true, color:DARK, align:'center' })
  if (sub) slide.addText(sub, { x:0, y:1.1, w:'100%', h:0.3, fontSize:11, color:MUTED, align:'center' })
}

function addKPIBox(slide, label, value, color, x, y, w, h) {
  // box bg
  slide.addShape('rect', { x, y, w, h, fill:{ color: LIGHT }, line:{ color:'DDD6FE', w:0.5 } })
  // left accent
  slide.addShape('rect', { x, y, w:0.06, h, fill:{ color } })
  // label
  slide.addText(label, { x:x+0.1, y:y+0.08, w:w-0.15, h:0.25, fontSize:9, color:MUTED })
  // value
  slide.addText(value, { x:x+0.1, y:y+0.28, w:w-0.15, h:0.55, fontSize:22, bold:true, color })
}

// ── cover slide ────────────────────────────────────────────────────────────────
function addCoverSlide(pptx, title, orgName, dateRange, recordCount, aiMapped) {
  const slide = pptx.addSlide()
  // purple top half
  slide.addShape('rect', { x:0, y:0, w:'100%', h:'50%', fill:{ color: DARK } })
  // logo pill
  slide.addShape('roundRect', { x:0.5, y:0.3, w:1.4, h:0.35, rectRadius:0.05, fill:{ color:PURPLE } })
  slide.addText('TRAIVIO', { x:0.5, y:0.3, w:1.4, h:0.35, fontSize:9, bold:true, color:WHITE, align:'center', valign:'middle' })
  slide.addText('AI-powered travel intelligence', { x:0.5, y:0.75, w:8, h:0.3, fontSize:11, color:'C4B5FD' })
  // title
  slide.addText(title, { x:0.5, y:1.3, w:9, h:1.2, fontSize:30, bold:true, color:WHITE })
  // meta on white half
  const meta = [
    ['Organisation', orgName],
    ['Data period', dateRange],
    ['Records analysed', String(recordCount)],
    ['Generated', today()],
  ]
  meta.forEach(([lbl, val], i) => {
    const y = 4.0 + i * 0.55
    slide.addText(lbl + ':', { x:1, y, w:2, h:0.35, fontSize:10, color:MUTED })
    slide.addText(val,       { x:3, y, w:6, h:0.35, fontSize:10, bold:true, color:DARK })
  })
  if (aiMapped) {
    slide.addShape('rect', { x:0.5, y:7.0, w:9, h:0.45, fill:{ color:'FEF3C7' }, line:{ color:'FDE68A', w:0.5 } })
    slide.addText('⚠ Analysis based on AI column detection — verify key totals against source data.',
      { x:0.6, y:7.0, w:8.8, h:0.45, fontSize:9, color:'92400E', valign:'middle' })
  }
}

// ── KPI slide ──────────────────────────────────────────────────────────────────
function addKPISlide(pptx, title, sub, kpis) {
  const slide = pptx.addSlide()
  addSlideHeader(slide, title, sub)
  const n = kpis.length
  const w = 9.5 / n
  const gap = 0.1
  kpis.forEach((k, i) => {
    addKPIBox(slide, k.label, k.value, k.color || PURPLE,
      0.25 + i * (w + gap), 1.6, w - gap, 1.2)
  })
  return slide
}

// ── bar chart slide ────────────────────────────────────────────────────────────
function addBarChartSlide(pptx, title, chartTitle, data, colors) {
  const slide = pptx.addSlide()
  addSlideHeader(slide, title, chartTitle)
  const labels = data.map(d => d.label)
  const values = data.map(d => d.value)
  const chartColors = (colors || [PURPLE, '0EA5E9', '10B981', 'F59E0B', 'EC4899'])
    .slice(0, values.length)

  slide.addChart('bar', [{
    name: 'Spend',
    labels,
    values,
  }], {
    x: 0.5, y: 1.5, w: 9, h: 5.0,
    chartColors,
    showValue: true,
    dataLabelFontSize: 9,
    dataLabelColor: WHITE,
    catAxisLabelFontSize: 9,
    valAxisHidden: true,
    catGridLine: { style:'none' },
    valGridLine: { style:'solid', color:'EDE9FE', w:0.5 },
    plotAreaBkgdColor: LIGHT,
  })
  return slide
}

// ── table slide ────────────────────────────────────────────────────────────────
function addTableSlide(pptx, title, headers, rows, colW) {
  const slide = pptx.addSlide()
  addSlideHeader(slide, title)
  const tableRows = [
    headers.map(h => ({ text: h, options: { bold:true, color:WHITE, fill:PURPLE, fontSize:9 } })),
    ...rows.map((r, ri) => r.map(cell => ({
      text: String(cell ?? ''),
      options: { fontSize:8.5, color:DARK, fill: ri%2===0 ? LIGHT : WHITE },
    }))),
  ]
  slide.addTable(tableRows, {
    x:0.3, y:1.55, w:9.4, h:5.3,
    colW: colW || headers.map(() => 9.4 / headers.length),
    rowH: 0.28,
    border: { type:'solid', color:'DDD6FE', w:0.5 },
    fontSize: 8.5,
  })
  return slide
}

// ── main export ────────────────────────────────────────────────────────────────
export async function generatePPTX(type, stats, orgName = 'Acme Corp (Demo)', aiMapped = false, aiText = null) {
  const pptx    = new PptxGenJS()
  const s       = stats || {}
  const records = s.records || []
  const dr      = s.dateRange || ''
  const count   = records.length

  pptx.layout  = 'LAYOUT_WIDE'
  pptx.author  = 'Traivio AI'
  pptx.company = orgName
  pptx.subject = type

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

  addCoverSlide(pptx, reportTitle, orgName, dr, count, aiMapped)

  // ── 1. MONTHLY ─────────────────────────────────────────────────────────────
  if (type === 'monthly') {
    addKPISlide(pptx, 'Monthly Travel Summary', `Period: ${dr}`, [
      { label:'Total Spend',      value: fmtZAR(s.totalSpend || 0),      color: PURPLE },
      { label:'Total Trips',      value: String(s.totalTrips || 0),       color: '0EA5E9' },
      { label:'Avg / Trip',       value: fmtZAR(s.avgCostPerTrip || 0),  color: '10B981' },
      { label:'Unique Travelers', value: String(s.uniqueTravelers || 0),  color: 'F59E0B' },
    ])

    const ms = s.monthlySpend || []
    if (ms.length) {
      addBarChartSlide(pptx, 'Monthly Spend Trend', 'Total spend by month (ZAR)',
        ms.map(m => ({ label: m.month.slice(0, 3) + ' ' + m.month.slice(-4), value: m.amount })))
    }

    addTableSlide(pptx, 'Monthly Breakdown',
      ['Month', 'Trips', 'Total Spend', 'Avg / Trip'],
      ms.map((m, i) => {
        const mt = s.monthlyTrips || {}
        const trips = mt[m.key] || 0
        return [m.month, trips, fmtZAR(m.amount), fmtZAR(trips ? m.amount / trips : 0)]
      }),
      [2.5, 1.5, 2.5, 2.5]
    )

    addTableSlide(pptx, 'Top Travelers by Spend',
      ['Traveler', 'Department', 'Trips', 'Total Spend', 'Avg / Trip'],
      (s.topTravelers || []).map(t => [t.name, t.department, t.trips, fmtZAR(t.amount), fmtZAR(t.trips ? t.amount / t.trips : 0)]),
      [2.5, 2, 1, 2, 2]
    )

  // ── 2. COMPLIANCE ──────────────────────────────────────────────────────────
  } else if (type === 'compliance') {
    const viol    = s.violations || []
    const violAmt = viol.reduce((a, r) => a + r.totalCost, 0)
    const cr      = s.complianceRate || 0

    addKPISlide(pptx, 'Policy Compliance Scorecard', `Period: ${dr}`, [
      { label:'Compliance Rate',   value: fmtPct(cr),                 color: cr >= 85 ? '10B981' : cr >= 70 ? 'F59E0B' : 'EF4444' },
      { label:'Policy Violations', value: String(s.violationCount||0), color: 'EF4444' },
      { label:'Amount at Risk',    value: fmtZAR(violAmt),             color: 'F59E0B' },
      { label:'Fraud Flags',       value: String(s.fraudFlagCount||0), color: 'EF4444' },
    ])

    // Dept compliance chart
    const dc = {}
    records.forEach(r => {
      if (!dc[r.department]) dc[r.department] = { compliant:0, violations:0 }
      if (r.policyStatus === 'Compliant') dc[r.department].compliant++
      else dc[r.department].violations++
    })
    const dcArr = Object.entries(dc).map(([dept, d]) => {
      const tot = d.compliant + d.violations
      return { label: dept, value: tot ? Math.round((d.compliant / tot) * 100) : 100 }
    })
    if (dcArr.length) {
      addBarChartSlide(pptx, 'Compliance by Department', 'Rate (%) per department', dcArr)
    }

    addTableSlide(pptx, 'Policy Violations Detail',
      ['Traveler', 'Date', 'Route', 'Amount', 'Department'],
      viol.map(r => [r.travelerName, r.travelDate?.slice(0,10)||'', `${r.originCode}→${r.destinationCode}`, fmtZAR(r.totalCost), r.department]),
      [2.2, 1.3, 1.8, 1.8, 1.8]
    )

  // ── 3. SAVINGS ─────────────────────────────────────────────────────────────
  } else if (type === 'savings') {
    const totalSav = (s.potentialSavings || 0) + 41000
    const fd = s.fareDiscrepancies || []

    addKPISlide(pptx, 'Savings Opportunity Report', `Period: ${dr}`, [
      { label:'Total Savings Pipeline', value: fmtZAR(totalSav), color: '10B981' },
      { label:'Fare Discrepancies',     value: String(fd.length), color: 'F59E0B' },
      { label:'Credits Expiring',       value: 'R9,800',          color: 'EF4444' },
      { label:'Car Rental Savings',     value: 'R6,800',          color: '10B981' },
    ])

    addBarChartSlide(pptx, 'Savings Pipeline', 'Estimated annual savings by category (ZAR)', [
      { label:'Advance Booking',  value:18200 },
      { label:'Hotel Consol.',    value:12400 },
      { label:'Credits',          value:9800  },
      { label:'Car Rental',       value:6800  },
      { label:'Route Opt.',       value:3600  },
    ])

    addTableSlide(pptx, 'Fare Discrepancy Detail',
      ['Traveler', 'Route', 'Booked', 'Market Rate', 'Excess', 'Date'],
      fd.map(r => [r.travelerName, `${r.originCode}→${r.destinationCode}`, fmtZAR(r.totalCost), fmtZAR(r.marketRate||0), fmtZAR(r.totalCost-(r.marketRate||0)), r.travelDate?.slice(0,10)||'']),
      [2, 1.5, 1.4, 1.4, 1.4, 1.4]
    )

  // ── 4. RISK ────────────────────────────────────────────────────────────────
  } else if (type === 'risk') {
    const ff   = s.fraudFlags || []
    const viol = s.violations || []
    const atR  = [...ff, ...viol].reduce((a, r) => a + r.totalCost, 0)

    addKPISlide(pptx, 'Risk & Fraud Flag Report', `Period: ${dr}`, [
      { label:'Fraud Flags',       value: String(ff.length),             color: 'EF4444' },
      { label:'Policy Violations', value: String(s.violationCount || 0), color: 'F59E0B' },
      { label:'Amount at Risk',    value: fmtZAR(atR),                   color: 'EF4444' },
      { label:'High Risk Trips',   value: String(ff.length+viol.length), color: 'EF4444' },
    ])

    addTableSlide(pptx, 'Fraud & Anomaly Flags',
      ['#', 'Type', 'Traveler', 'Amount', 'Date', 'Risk'],
      ff.map((r, i) => [i+1, r.notes?.slice(0,30)||'Anomaly', r.travelerName, fmtZAR(r.totalCost), r.travelDate?.slice(0,10)||'', 'High']),
      [0.4, 3.2, 2, 1.2, 1.2, 1]
    )

    addTableSlide(pptx, 'Policy Violations',
      ['#', 'Traveler', 'Violation Type', 'Amount', 'Date', 'Dept'],
      viol.map((r, i) => [i+1, r.travelerName, r.notes?.slice(0,35)||r.policyStatus, fmtZAR(r.totalCost), r.travelDate?.slice(0,10)||'', r.department]),
      [0.4, 2, 3, 1.2, 1.2, 1.5]
    )

  // ── 5. AI EXEC ─────────────────────────────────────────────────────────────
  } else if (type === 'ai-exec') {
    addKPISlide(pptx, 'AI Executive Summary', `Period: ${dr}`, [
      { label:'Total Spend',      value: fmtZAR(s.totalSpend || 0),           color: PURPLE },
      { label:'Total Trips',      value: String(s.totalTrips || 0),             color: '0EA5E9' },
      { label:'Compliance Rate',  value: fmtPct(s.complianceRate || 0),        color: '10B981' },
      { label:'Savings Pipeline', value: fmtZAR((s.potentialSavings||0)+41000),color: '10B981' },
    ])

    // Spend by category
    const cats = s.categoryBreakdown || []
    if (cats.length) {
      addBarChartSlide(pptx, 'Spend by Category', 'Total spend breakdown (ZAR)',
        cats.map(c => ({ label:c.name, value:c.value })),
        [PURPLE, '0EA5E9', '10B981'])
    }

    // Summary text slide
    const sumSlide = pptx.addSlide()
    addSlideHeader(sumSlide, 'Executive Summary', `Generated ${today()}`)
    const summaryText = aiText ||
      `Total travel spend: ${fmtZAR(s.totalSpend || 0)} across ${s.totalTrips || 0} trips by ${s.uniqueTravelers || 0} travelers (${dr}).\n\n` +
      `Compliance rate: ${fmtPct(s.complianceRate || 0)} vs 90% target — ${s.violationCount || 0} violations flagged.\n\n` +
      `Key recommendations:\n` +
      `1. Enforce 14-day advance booking policy to capture lower fares.\n` +
      `2. Apply R9,800 in expiring airline credits before they lapse.\n` +
      `3. Investigate ${s.fraudFlagCount || 0} flagged transactions immediately.\n\n` +
      `Total identified savings pipeline: ${fmtZAR((s.potentialSavings || 0) + 41000)} annually.`
    sumSlide.addText(summaryText, { x:0.5, y:1.5, w:9, h:5.5, fontSize:12, color:DARK, valign:'top', paraSpaceAfter:6 })

  // ── 6. CREDITS ─────────────────────────────────────────────────────────────
  } else if (type === 'credits') {
    const credits = [
      { id:'TC-4821', traveler:'Andrew Fischer', airline:'British Airways', amount:9800, expires:'2025-04-15', days:8 },
      { id:'TC-3912', traveler:'Lisa Botha',      airline:'SAA',            amount:5600, expires:'2025-04-18', days:11 },
      { id:'TC-5503', traveler:'Sarah Johnson',   airline:'Emirates',       amount:3200, expires:'2025-04-22', days:15 },
      { id:'TC-2287', traveler:'Thabo Radebe',    airline:'SAA',            amount:4100, expires:'2025-05-01', days:24 },
      { id:'TC-6614', traveler:'Nomsa Sithole',   airline:'Airlink',        amount:2800, expires:'2025-05-10', days:33 },
      { id:'TC-7731', traveler:'Craig Dlamini',   airline:'Emirates',       amount:1900, expires:'2025-05-20', days:43 },
    ]
    const total  = credits.reduce((a, c) => a + c.amount, 0)
    const urgent = credits.filter(c => c.days <= 14)

    addKPISlide(pptx, 'Unused Credits & Expiry Report', `Generated ${today()}`, [
      { label:'Total Credits at Risk', value: fmtZAR(total),          color: 'EF4444' },
      { label:'Expiring ≤ 14 days',   value: String(urgent.length),   color: 'EF4444' },
      { label:'Total Credits',         value: String(credits.length),  color: PURPLE },
      { label:'Avg Credit Value',      value: fmtZAR(total/credits.length), color: '0EA5E9' },
    ])

    addBarChartSlide(pptx, 'Credit Value by Days Until Expiry', 'Amount by expiry urgency (ZAR)',
      credits.map(c => ({ label: `${c.days}d`, value: c.amount })),
      credits.map(c => c.days <= 14 ? 'EF4444' : c.days <= 30 ? 'F59E0B' : '10B981'))

    addTableSlide(pptx, 'Credit Inventory',
      ['Ticket ID', 'Traveler', 'Airline', 'Amount', 'Expires', 'Days Left'],
      credits.map(c => [c.id, c.traveler, c.airline, fmtZAR(c.amount), c.expires, c.days <= 14 ? `${c.days}d URGENT` : `${c.days}d`]),
      [1.4, 2.2, 1.8, 1.4, 1.4, 1.2]
    )

  // ── 7. VENDOR ──────────────────────────────────────────────────────────────
  } else if (type === 'vendor') {
    const preferred = new Set(['South African Airways', 'British Airways', 'Emirates', 'FlySafair', 'Airlink', 'Marriott', 'Protea Hotels', 'Avis', 'Budget'])
    const vmap = {}
    records.forEach(r => {
      if (!vmap[r.vendor]) vmap[r.vendor] = { vendor:r.vendor, category:r.category, trips:0, spend:0, compliant:0, total:0 }
      vmap[r.vendor].trips++
      vmap[r.vendor].spend += r.totalCost
      vmap[r.vendor].total++
      if (r.policyStatus === 'Compliant') vmap[r.vendor].compliant++
    })
    const sorted = Object.values(vmap).sort((a, b) => b.spend - a.spend)

    addKPISlide(pptx, 'Vendor Performance Report', `Period: ${dr}`, [
      { label:'Total Vendors',    value: String(sorted.length), color: PURPLE },
      { label:'Preferred Vendors',value: String(sorted.filter(v => preferred.has(v.vendor)).length), color: '10B981' },
      { label:'Top Vendor Spend', value: fmtZAR(sorted[0]?.spend || 0), color: '0EA5E9' },
      { label:'Avg Compliance',   value: fmtPct(s.complianceRate || 0), color: '10B981' },
    ])

    addBarChartSlide(pptx, 'Top Vendors by Spend', 'Total spend by vendor (ZAR)',
      sorted.slice(0, 7).map(v => ({ label: v.vendor.length > 10 ? v.vendor.slice(0,10)+'…' : v.vendor, value: v.spend })))

    addTableSlide(pptx, 'Vendor Spend Detail',
      ['Vendor', 'Category', 'Trips', 'Total Spend', 'Avg Cost', 'Compliance'],
      sorted.map(v => [v.vendor, v.category, v.trips, fmtZAR(v.spend), fmtZAR(v.trips ? v.spend/v.trips : 0), fmtPct(v.total ? (v.compliant/v.total)*100 : 100)]),
      [2.6, 1.2, 0.8, 1.6, 1.6, 1.4]
    )
  }

  const date = new Date().toISOString().slice(0, 10)
  await pptx.writeFile({ fileName: `traivio-${type}-${date}.pptx` })
}
