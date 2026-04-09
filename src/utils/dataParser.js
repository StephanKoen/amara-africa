import Papa from 'papaparse'
import * as XLSX from 'xlsx'

// ── field definitions ──────────────────────────────────────────────────────────
const FIELD_DEFS = [
  { key:'travelDate',      label:'Travel Date',        matchers:['travel date','travel_date','traveldate','date','trip date','departure date','flight date','when'] },
  { key:'bookingDate',     label:'Booking Date',       matchers:['booking date','booking_date','booked date','booked on','purchase date','book date'] },
  { key:'travelerName',    label:'Traveler Name',      matchers:['traveler name','traveler','traveller','passenger','employee','name','emp name','passenger name','person'] },
  { key:'travelerEmail',   label:'Traveler Email',     matchers:['email','traveler email','emp email','e-mail'] },
  { key:'department',      label:'Department',         matchers:['department','dept','team','division','group','business unit','cost department'] },
  { key:'costCentre',      label:'Cost Centre',        matchers:['cost centre','cost center','cost_centre','cc','cost code','project code','cost_center'] },
  { key:'origin',          label:'Origin',             matchers:['origin','from','departure','origin city','from city','source','departure city'] },
  { key:'originCode',      label:'Origin Code',        matchers:['origin code','from code','departure code','iata from','origin_code'] },
  { key:'destination',     label:'Destination',        matchers:['destination','to','arrival','dest','destination city','to city','arrival city'] },
  { key:'destinationCode', label:'Destination Code',   matchers:['destination code','to code','arrival code','iata to','dest_code','destination_code'] },
  { key:'vendor',          label:'Vendor',             matchers:['vendor','airline','hotel','supplier','carrier','company','provider'] },
  { key:'bookingRef',      label:'Booking Reference',  matchers:['booking ref','booking reference','booking id','pnr','reference','booking_ref','confirmation'] },
  { key:'ticketNumber',    label:'Ticket Number',      matchers:['ticket number','ticket','ticket no','ticket_number','eticket','e-ticket'] },
  { key:'classOfTravel',   label:'Class of Travel',    matchers:['class of travel','class','cabin class','travel class','service class','cabin'] },
  { key:'category',        label:'Travel Category',    matchers:['category','type','travel type','expense type','travel category','mode'] },
  { key:'totalCost',       label:'Total Cost',         matchers:['total cost','total','cost','amount','fare','price','spend','total amount','ticket amount','ticket cost','total_cost','value'] },
  { key:'currency',        label:'Currency',           matchers:['currency','curr','ccy','currency code'] },
  { key:'policyStatus',    label:'Policy Status',      matchers:['policy status','policy','compliance','status','approval status','compliant'] },
  { key:'approvedBy',      label:'Approved By',        matchers:['approved by','approver','manager','approval','approved_by'] },
  { key:'marketRate',      label:'Market Rate',        matchers:['market rate','ota rate','benchmark','market fare','standard rate','market_rate'] },
  { key:'notes',           label:'Notes',              matchers:['notes','note','comments','comment','remarks','description'] },
]

// Traivio template headers (exact match = skip mapper)
const TRAIVIO_HEADERS = [
  'Travel Date','Booking Date','Traveler Name','Traveler Email','Department',
  'Cost Centre','Origin City','Origin Code','Destination City','Destination Code',
  'Vendor','Booking Reference','Ticket Number','Class of Travel','Travel Category',
  'Total Cost','Currency','Policy Status','Approved By','Notes',
]

// Template header → field key mapping (for direct load)
const TEMPLATE_MAP = {
  'Travel Date':'travelDate','Booking Date':'bookingDate','Traveler Name':'travelerName',
  'Traveler Email':'travelerEmail','Department':'department','Cost Centre':'costCentre',
  'Origin City':'origin','Origin Code':'originCode','Destination City':'destination',
  'Destination Code':'destinationCode','Vendor':'vendor','Booking Reference':'bookingRef',
  'Ticket Number':'ticketNumber','Class of Travel':'classOfTravel','Travel Category':'category',
  'Total Cost':'totalCost','Currency':'currency','Policy Status':'policyStatus',
  'Approved By':'approvedBy','Notes':'notes',
}

// ── detect columns ─────────────────────────────────────────────────────────────
export function detectColumns(rawRows) {
  if (!rawRows?.length) return { headers:[], mapping:{}, isTraivioTemplate:false, currency:null, dateFormat:null }
  const headers = Object.keys(rawRows[0])

  // check traivio template
  const isTraivioTemplate = TRAIVIO_HEADERS.every(th =>
    headers.some(h => h.trim().toLowerCase() === th.toLowerCase())
  )

  const usedKeys = new Set()
  const mapping  = {}

  headers.forEach(header => {
    const h = header.toLowerCase().replace(/[_\-]/g, ' ').trim()
    let matched = null, confidence = 'unmapped'

    for (const def of FIELD_DEFS) {
      if (usedKeys.has(def.key)) continue
      const idx = def.matchers.indexOf(h)
      if (idx === 0)                                          { matched = def; confidence = 'high';   break }
      if (idx > 0)                                            { matched = def; confidence = 'medium'; break }
      if (!matched && def.matchers.some(m => h.includes(m) || m.includes(h))) {
                                                                matched = def; confidence = 'low'
      }
    }
    if (matched) usedKeys.add(matched.key)
    mapping[header] = matched
      ? { detectedAs: matched.key, label: matched.label, confidence }
      : { detectedAs: null, label: 'Unmapped', confidence: 'unmapped' }
  })

  // currency detection
  const costHeader = Object.entries(mapping).find(([, v]) => v.detectedAs === 'totalCost')?.[0]
  let currency = null
  if (costHeader) {
    const sample = String(rawRows[0][costHeader] || '')
    if (/R|ZAR/i.test(sample))     currency = 'ZAR'
    else if (/\$|USD/i.test(sample)) currency = 'USD'
    else if (/£|GBP/i.test(sample)) currency = 'GBP'
    else if (/€|EUR/i.test(sample)) currency = 'EUR'
  }

  // date format detection
  const dateHeader = Object.entries(mapping).find(([, v]) => v.detectedAs === 'travelDate')?.[0]
  let dateFormat = null
  if (dateHeader) {
    const sample = String(rawRows[0][dateHeader] || '')
    if (/^\d{4}-\d{2}-\d{2}/.test(sample))   dateFormat = 'YYYY-MM-DD'
    else if (/^\d{2}\/\d{2}\/\d{4}/.test(sample)) dateFormat = 'DD/MM/YYYY'
    else if (/^\d{2}-\d{2}-\d{4}/.test(sample))   dateFormat = 'MM/DD/YYYY'
  }

  return { headers, mapping, isTraivioTemplate, currency, dateFormat }
}

// ── apply confirmed mapping → normalized records ───────────────────────────────
export function applyMapping(rawRows, confirmedMapping) {
  return rawRows.map((row, idx) => {
    const out = { id: idx + 1, policyStatus: 'Compliant', fraudFlag: false, currency: 'USD', category: 'Air' }
    Object.entries(confirmedMapping).forEach(([header, fieldDef]) => {
      const key = fieldDef?.detectedAs
      if (!key || key === 'ignore') return
      const val = row[header]
      if (key === 'totalCost' || key === 'marketRate') {
        out[key] = parseFloat(String(val || '').replace(/[^0-9.\-]/g, '')) || 0
      } else {
        out[key] = val ?? ''
      }
    })
    return out
  })
}

// ── parse template rows directly ───────────────────────────────────────────────
function applyTemplateMapping(rawRows) {
  return rawRows.map((row, idx) => {
    const out = { id: idx + 1, fraudFlag: false }
    Object.entries(TEMPLATE_MAP).forEach(([header, key]) => {
      const val = row[header]
      if (key === 'totalCost' || key === 'marketRate') {
        out[key] = parseFloat(String(val || '').replace(/[^0-9.\-]/g, '')) || 0
      } else {
        out[key] = val ?? ''
      }
    })
    return out
  })
}

// ── parse raw bytes ────────────────────────────────────────────────────────────
async function parseRaw(file) {
  const ext = file.name.split('.').pop().toLowerCase()
  if (ext === 'csv') {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true, skipEmptyLines: true,
        complete: ({ data, errors }) => {
          if (errors.length && !data.length) reject(new Error('CSV parse error'))
          else resolve(data)
        },
        error: reject,
      })
    })
  }
  if (['xlsx','xls'].includes(ext)) {
    const buf = await file.arrayBuffer()
    const wb  = XLSX.read(buf, { type: 'array' })
    const ws  = wb.Sheets[wb.SheetNames[0]]
    return XLSX.utils.sheet_to_json(ws, { defval: '' })
  }
  throw new Error('Unsupported file type. Use CSV or Excel (.xlsx / .xls)')
}

// ── Spotnana: extract origin/destination from Trip Name for Air bookings ───────
function extractRoute(tripName, vendor, category) {
  if (category !== 'Air' && category !== 'Rail')
    return { origin: '', originCode: '', destination: '', destinationCode: '' }
  if (!tripName)
    return { origin: vendor || '', originCode: '', destination: '', destinationCode: '' }
  // Match patterns like "JNB-LHR", "NYC→LAX", "ORD > DFW", "BOS to MIA"
  const codeMatch = tripName.match(/\b([A-Z]{3})\s*[-→>\/]\s*([A-Z]{3})\b/)
  if (codeMatch) {
    return { originCode: codeMatch[1], destinationCode: codeMatch[2], origin: codeMatch[1], destination: codeMatch[2] }
  }
  return { origin: vendor || '', originCode: '', destination: '', destinationCode: '' }
}

// ── Spotnana: check if raw-array xlsx looks like a Spotnana export ─────────────
function detectSpotnanaFile(rawArr) {
  const top = rawArr.slice(0, 12)
  const flat = top.flat().filter(Boolean).map(c => String(c))
  const joined = flat.join(' ')
  const hasBrand = joined.includes('Spotnana') || joined.includes('Bespoke Travel Manager')
  const hasHeaders = top.some(row =>
    Array.isArray(row) &&
    row.includes('Traveler Name') &&
    row.includes('Policy Compliance') &&
    row.includes('Gross Spend (Billing Currency)')
  )
  return hasBrand || hasHeaders
}

// ── Spotnana: parse raw 2D array into Traivio records ─────────────────────────
function parseSpotnanaFromRaw(rawArr) {
  let headerRowIndex = -1
  for (let i = 0; i < Math.min(rawArr.length, 15); i++) {
    if (rawArr[i] && rawArr[i].includes('Traveler Name')) { headerRowIndex = i; break }
  }
  if (headerRowIndex === -1)
    throw new Error('Could not find Spotnana header row. Please ensure this is a Spotnana All Transactions Report.')

  const headers  = rawArr[headerRowIndex]
  const dataRows = rawArr.slice(headerRowIndex + 1)

  function parseDate(val) {
    if (!val) return null
    if (val instanceof Date) return val.toISOString().split('T')[0]
    if (typeof val === 'string') return val.split('T')[0].split(' ')[0]
    if (typeof val === 'number') return new Date((val - 25569) * 86400 * 1000).toISOString().split('T')[0]
    return null
  }

  const policyMap = {
    'In Policy': 'Compliant', 'Out of Policy': 'Violation', 'Exception': 'Exception',
    'in_policy': 'Compliant', 'out_of_policy': 'Violation',
  }

  const records = dataRows
    .filter(row => row && row.some(cell => cell !== null && cell !== ''))
    .map((row, index) => {
      const r = {}
      headers.forEach((h, i) => { if (h) r[h] = row[i] })

      const isVoided    = r['Transaction Type'] === 'Ticket Voided'
      const isCancelled = r['Transaction Type'] === 'Ticket Cancelled'
      const rawActive   = r['Active']
      const isActive    = rawActive !== false && rawActive !== 'false' && rawActive !== 0
      const category    = r['Booking Type'] || 'Air'
      const vendor      = r['Vendor Name'] || ''
      const tripName    = r['Trip Name'] || ''

      // FIX 1: Voided/cancelled transactions contribute $0 to spend analytics
      // but are kept in the dataset so they appear in fraud/audit views
      const grossSpend = parseFloat(r['Gross Spend (Billing Currency)']) || 0
      const totalCost  = (isVoided || isCancelled) ? 0 : grossSpend

      // FIX 2: Extract route from Trip Name for Air/Rail (Spotnana has no origin/dest cols)
      const route = extractRoute(tripName, vendor, category)

      return {
        id:              `spotnana-${index + 1}`,
        travelDate:      parseDate(r['Travel Begin Date UTC']),
        travelEndDate:   parseDate(r['Travel End Date UTC']),
        bookingDate:     parseDate(r['PNR Creation Date']),
        transactionDate: parseDate(r['Transaction Date UTC']),
        travelerName:    r['Traveler Name']           || 'Unknown',
        travelerEmail:   r['Traveler Email']          || '',
        department:      r['Traveler Department']     || 'Unknown',
        costCentre:      r['Traveler Cost Center']    || '',
        employeeId:      r['Traveler Employee ID']    || '',
        organizationName:r['Organization Name']       || '',
        vendor,
        bookingRef:      r['Source Reference']        || r['Confirmation Number'] || '',
        ticketNumber:    r['Spotnana PNR ID'] ? String(r['Spotnana PNR ID']) : '',
        category,
        transactionType: r['Transaction Type']        || '',
        classOfTravel:   r['Traveler Tier']           || 'Standard',
        // FIX 1: totalCost is ONLY Gross Spend (Billing Currency); zero for voided/cancelled
        totalCost,
        baseSpend:       parseFloat(r['Base Spend (Billing Currency)'])         || 0,
        taxesAndFees:    parseFloat(r['Taxes & Fees Spend (Billing Currency)'])  || 0,
        currency:        r['Billing Currency']                                   || 'USD',
        marketRate:      parseFloat(r['Published Price (Billing Currency)'])     || 0,
        policyStatus:    policyMap[r['Policy Compliance']] || 'Compliant',
        violationType:   r['OOP Reason Code']         || null,
        policyNote:      r['OOP Reason Description']  || null,
        policiesViolated:r['List of Policies Violated']|| null,
        approvedBy:      r['Approver Name']           || '',
        approvalStatus:  r['Approval Status']         || 'N/A',
        bookingMode:     r['Booking Mode']            || '',
        bookingSource:   r['Booking Source']          || '',
        policyGroup:     r['Policy Group']            || '',
        creditCardLabel: r['Credit Card Labels']      || '',
        tripId:          r['Trip ID'] ? String(r['Trip ID']) : '',
        tripName,
        // FIX 2: route fields from Trip Name extraction
        origin:          route.origin,
        originCode:      route.originCode,
        destination:     route.destination,
        destinationCode: route.destinationCode,
        isActive,
        isVoided,
        isCancelled,
        fraudFlag:       isVoided,
        dataSource:      'spotnana',
      }
    })
    .filter(r => r.travelDate || r.transactionDate)

  return {
    records,
    isSpotnana:   true,
    voidedCount:  records.filter(r => r.isVoided).length,
    cancelledCount: records.filter(r => r.isCancelled).length,
    totalRecords: records.length,
    activeCount:  records.filter(r => r.isActive).length,
  }
}

// ── parseSpotnanaExport: public API for dedicated Spotnana upload ──────────────
export async function parseSpotnanaExport(file) {
  const buf  = await file.arrayBuffer()
  const wb   = XLSX.read(buf, { type: 'array' })
  const ws   = wb.Sheets[wb.SheetNames[0]]
  const raw  = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null })
  return { fileName: file.name, ...parseSpotnanaFromRaw(raw) }
}

// ── detectAndParse: returns detection result for mapper ────────────────────────
export async function detectAndParse(file) {
  const ext = file.name.split('.').pop().toLowerCase()

  // For Excel files, check for Spotnana format before standard parsing
  if (['xlsx', 'xls'].includes(ext)) {
    const buf = await file.arrayBuffer()
    const wb  = XLSX.read(buf, { type: 'array' })
    const ws  = wb.Sheets[wb.SheetNames[0]]
    const rawArr = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null })
    if (detectSpotnanaFile(rawArr)) {
      return { fileName: file.name, ...parseSpotnanaFromRaw(rawArr) }
    }
  }

  const rawRows   = await parseRaw(file)
  const detection = detectColumns(rawRows)
  return { fileName: file.name, rawRows, ...detection }
}

// ── parseFile: legacy API (used by old Demo page) ─────────────────────────────
export async function parseFile(file) {
  const result = await detectAndParse(file)
  if (result.isTraivioTemplate) return applyTemplateMapping(result.rawRows)
  // fall back: apply best-guess mapping without user confirmation
  return applyMapping(result.rawRows, result.mapping)
}

// ── validate / summarise (legacy, used by Demo.jsx) ───────────────────────────
export function validateData(rows) {
  const required = ['travelDate','totalCost']
  const keys = Object.keys(rows[0] || {})
  const missing = required.filter(f => !keys.includes(f))
  return { valid: missing.length === 0, missing }
}

export function summarise(rows) {
  const totalSpend = rows.reduce((s, r) => s + (parseFloat(r.totalCost) || 0), 0)
  const trips      = rows.length
  const travelers  = new Set(rows.map(r => r.travelerName).filter(Boolean)).size
  return { totalSpend, trips, travelers }
}

// ── template downloads ─────────────────────────────────────────────────────────
export const CSV_TEMPLATE_HEADERS = TRAIVIO_HEADERS

export function downloadCSVTemplate() {
  const header = CSV_TEMPLATE_HEADERS.join(',')
  const example = [
    '2025-01-15','2025-01-03','Sarah Johnson','sarah.j@company.com','Sales',
    'CC-SALES-001','Johannesburg','JNB','Cape Town','CPT',
    'South African Airways','SAA-2025-0001','SA083456789','Economy','Air',
    '4200','ZAR','Compliant','Michael Peters','',
  ].map(v => `"${v}"`).join(',')
  const csv = `${header}\n${example}\n`
  const blob = new Blob([csv], { type: 'text/csv' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
  a.download = 'traivio-template.csv'; a.click()
}

export function downloadExcelTemplate() {
  const ws = XLSX.utils.aoa_to_sheet([
    CSV_TEMPLATE_HEADERS,
    ['2025-01-15','2025-01-03','Sarah Johnson','sarah.j@company.com','Sales','CC-SALES-001','Johannesburg','JNB','Cape Town','CPT','South African Airways','SAA-2025-0001','SA083456789','Economy','Air',4200,'ZAR','Compliant','Michael Peters',''],
  ])
  const instructions = [
    ['Column','Description','Example'],
    ['Travel Date','Date of travel (YYYY-MM-DD)','2025-01-15'],
    ['Booking Date','Date booking was made','2025-01-03'],
    ['Traveler Name','Full name of traveler','Sarah Johnson'],
    ['Traveler Email','Work email address','sarah.j@company.com'],
    ['Department','Business department','Sales'],
    ['Cost Centre','Internal cost centre code','CC-SALES-001'],
    ['Origin City','City of departure','Johannesburg'],
    ['Origin Code','IATA airport code','JNB'],
    ['Destination City','City of arrival','Cape Town'],
    ['Destination Code','IATA airport code','CPT'],
    ['Vendor','Airline, hotel, or car rental company','South African Airways'],
    ['Booking Reference','PNR or booking ID','SAA-2025-0001'],
    ['Ticket Number','E-ticket number','SA083456789'],
    ['Class of Travel','Economy / Business / Standard','Economy'],
    ['Travel Category','Air / Hotel / Car','Air'],
    ['Total Cost','Total amount charged (no currency symbol)','4200'],
    ['Currency','ISO currency code','ZAR'],
    ['Policy Status','Compliant or Violation','Compliant'],
    ['Approved By','Manager who approved','Michael Peters'],
    ['Notes','Any additional notes',''],
  ]
  const ws2 = XLSX.utils.aoa_to_sheet(instructions)
  const wb  = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws,  'Travel Data')
  XLSX.utils.book_append_sheet(wb, ws2, 'Instructions')
  XLSX.writeFile(wb, 'traivio-template.xlsx')
}
