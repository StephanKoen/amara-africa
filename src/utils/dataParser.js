import Papa from 'papaparse'
import * as XLSX from 'xlsx'

const FIELD_ALIASES = {
  date:        ['travel date', 'date', 'trip date', 'departure date', 'booking date'],
  origin:      ['origin', 'from', 'departure city', 'origin city', 'from city'],
  destination: ['destination', 'to', 'arrival city', 'dest', 'to city'],
  cost:        ['cost', 'amount', 'fare', 'price', 'total', 'spend', 'total cost', 'ticket cost'],
  traveler:    ['traveler', 'traveller', 'passenger', 'employee', 'name', 'traveler name'],
  department:  ['department', 'dept', 'team', 'division', 'cost centre', 'cost center'],
  vendor:      ['vendor', 'airline', 'hotel', 'supplier', 'carrier'],
  category:    ['category', 'type', 'travel type', 'expense type'],
}

function mapHeaders(raw) {
  const mapped = {}
  const lower = Object.fromEntries(
    Object.entries(raw[0] || {}).map(([k]) => [k.toLowerCase().trim(), k])
  )
  for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
    for (const alias of aliases) {
      if (lower[alias]) { mapped[field] = lower[alias]; break }
    }
  }
  return mapped
}

function normaliseRows(raw, mapping) {
  return raw.map(r => {
    const row = {}
    for (const [field, orig] of Object.entries(mapping)) {
      row[field] = r[orig]
    }
    // Keep all original keys too
    Object.assign(row, r)
    return row
  })
}

export async function parseFile(file) {
  const ext = file.name.split('.').pop().toLowerCase()

  if (ext === 'csv') {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data, errors }) => {
          if (errors.length && !data.length) return reject(new Error('CSV parse error'))
          const mapping = mapHeaders(data)
          resolve(normaliseRows(data, mapping))
        },
        error: reject,
      })
    })
  }

  if (['xlsx', 'xls'].includes(ext)) {
    const buf = await file.arrayBuffer()
    const wb = XLSX.read(buf, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    const raw = XLSX.utils.sheet_to_json(ws, { defval: '' })
    const mapping = mapHeaders(raw)
    return normaliseRows(raw, mapping)
  }

  throw new Error('Unsupported file type. Please upload CSV or Excel (.xlsx/.xls)')
}

export function validateData(rows) {
  const required = ['date', 'cost']
  const missing = required.filter(f => !rows[0]?.[f])
  return { valid: missing.length === 0, missing }
}

export function summarise(rows) {
  const totalSpend = rows.reduce((s, r) => s + (parseFloat(r.cost) || 0), 0)
  const trips = rows.length
  const travelers = new Set(rows.map(r => r.traveler).filter(Boolean)).size

  const byCategory = {}
  rows.forEach(r => {
    const cat = r.category || 'Other'
    byCategory[cat] = (byCategory[cat] || 0) + (parseFloat(r.cost) || 0)
  })

  const byDept = {}
  rows.forEach(r => {
    const d = r.department || 'Unknown'
    byDept[d] = (byDept[d] || 0) + (parseFloat(r.cost) || 0)
  })

  return { totalSpend, trips, travelers, byCategory, byDept }
}
