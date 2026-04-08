import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { demoRecords, computeStats } from '../data/demoData'

const TravelDataContext = createContext(null)

// Airport → region mapping
const AIRPORT_REGION = {
  JNB:'Africa', CPT:'Africa', DUR:'Africa', PLZ:'Africa', GRJ:'Africa',
  LHR:'EMEA', LGW:'EMEA', CDG:'EMEA', FRA:'EMEA', AMS:'EMEA', ZUR:'EMEA',
  DXB:'Middle East', DOH:'Middle East', AUH:'Middle East',
  JFK:'Americas', NYC:'Americas', LAX:'Americas', ORD:'Americas', MIA:'Americas',
  SIN:'APAC', HKG:'APAC', NRT:'APAC', SYD:'APAC', BKK:'APAC',
}
function getRegion(code) { return AIRPORT_REGION[code?.toUpperCase()] || 'Other' }

const DEFAULT_FILTERS = {
  datePreset: 'all',
  dateFrom: null,
  dateTo: null,
  departments: [],
  travelers: [],
  costCentres: [],
  categories: [],
  policyStatuses: [],
  regions: [],
}

function getDateWindow(preset) {
  const now = new Date()
  const ago = days => new Date(now.getTime() - days * 86400000)
  switch (preset) {
    case '30d':  return { from: ago(30),  to: now }
    case '90d':  return { from: ago(90),  to: now }
    case '6m':   return { from: ago(182), to: now }
    case '12m':  return { from: ago(365), to: now }
    default:     return null
  }
}

function filterRecords(records, filters) {
  if (!records) return []
  return records.filter(r => {
    // Date filter
    if (filters.datePreset !== 'all') {
      const d = new Date(r.travelDate)
      if (filters.datePreset === 'custom') {
        if (filters.dateFrom && d < new Date(filters.dateFrom)) return false
        if (filters.dateTo   && d > new Date(filters.dateTo))   return false
      } else {
        const w = getDateWindow(filters.datePreset)
        if (w && (d < w.from || d > w.to)) return false
      }
    }
    // Department
    if (filters.departments.length && !filters.departments.includes(r.department)) return false
    // Traveler
    if (filters.travelers.length && !filters.travelers.includes(r.travelerName)) return false
    // Cost centre
    if (filters.costCentres.length && !filters.costCentres.includes(r.costCentre)) return false
    // Category
    if (filters.categories.length && !filters.categories.includes(r.category)) return false
    // Policy status
    if (filters.policyStatuses.length && !filters.policyStatuses.includes(r.policyStatus)) return false
    // Region — check origin or destination airport
    if (filters.regions.length) {
      const originReg = getRegion(r.originCode)
      const destReg   = getRegion(r.destinationCode)
      if (!filters.regions.includes(originReg) && !filters.regions.includes(destReg)) return false
    }
    return true
  })
}

export function TravelDataProvider({ children }) {
  const [uploadedData,   setUploadedData]   = useState(null)
  const [fileName,       setFileName]       = useState(null)
  const [columnMapping,  setColumnMapping]  = useState(null)
  const [pendingFile,    setPendingFile]    = useState(null)
  const [filters,        setFiltersState]   = useState(DEFAULT_FILTERS)

  const isDemo     = !uploadedData
  const travelData = uploadedData || demoRecords

  // Derive available options from full dataset
  const availableDepts = useMemo(() =>
    [...new Set(travelData.map(r => r.department).filter(Boolean))].sort()
  , [travelData])

  const availableTravelers = useMemo(() =>
    [...new Set(travelData.map(r => r.travelerName).filter(Boolean))].sort()
  , [travelData])

  const availableCostCentres = useMemo(() =>
    [...new Set(travelData.map(r => r.costCentre).filter(Boolean))].sort()
  , [travelData])

  const filteredRecords = useMemo(() => filterRecords(travelData, filters), [travelData, filters])
  const filteredStats   = useMemo(() => computeStats(filteredRecords), [filteredRecords])
  const stats           = useMemo(() => computeStats(travelData), [travelData])

  const isFiltered = useMemo(() =>
    filters.datePreset !== 'all' ||
    filters.departments.length > 0 ||
    filters.travelers.length > 0 ||
    filters.costCentres.length > 0 ||
    filters.categories.length > 0 ||
    filters.policyStatuses.length > 0 ||
    filters.regions.length > 0
  , [filters])

  const setFilters = useCallback((patch) => {
    setFiltersState(prev => ({ ...prev, ...patch }))
  }, [])

  const clearFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS)
  }, [])

  function clearUpload() {
    setUploadedData(null)
    setFileName(null)
    setColumnMapping(null)
    setPendingFile(null)
    setFiltersState(DEFAULT_FILTERS)
  }

  return (
    <TravelDataContext.Provider value={{
      travelData, stats, isDemo,
      filteredRecords, filteredStats, isFiltered,
      filters, setFilters, clearFilters,
      availableDepts, availableTravelers, availableCostCentres,
      fileName,  setFileName,
      uploadedData, setUploadedData,
      columnMapping, setColumnMapping,
      pendingFile,   setPendingFile,
      clearUpload,
    }}>
      {children}
    </TravelDataContext.Provider>
  )
}

export function useTravelData() {
  return useContext(TravelDataContext)
}
