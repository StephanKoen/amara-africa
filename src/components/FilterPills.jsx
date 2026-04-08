import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown, X, Check, Search } from 'lucide-react'
import { useTravelData } from '../context/TravelDataContext'
import styles from './FilterPills.module.css'

const DATE_OPTIONS = [
  { key: 'all',    label: 'All time' },
  { key: '30d',    label: 'Last 30 days' },
  { key: '90d',    label: 'Last 90 days' },
  { key: '6m',     label: 'Last 6 months' },
  { key: '12m',    label: 'Last 12 months' },
  { key: 'custom', label: 'Custom range…' },
]

const REGIONS = ['Africa', 'EMEA', 'Americas', 'APAC', 'Middle East']
const CATEGORIES = ['Air', 'Hotel', 'Car']
const POLICY_STATUSES = ['Compliant', 'Violation']

function useClickOutside(ref, handler) {
  useEffect(() => {
    function listener(e) { if (ref.current && !ref.current.contains(e.target)) handler() }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [ref, handler])
}

// ── single-select dropdown pill ────────────────────────────────────────────────
function SinglePill({ label, activeLabel, options, onSelect, isActive }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  useClickOutside(ref, useCallback(() => setOpen(false), []))
  return (
    <div className={styles.pillWrap} ref={ref}>
      <button
        className={`${styles.pill} ${isActive ? styles.active : ''} ${open ? styles.open : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        {activeLabel || label}
        <ChevronDown size={12} className={open ? styles.chevronUp : ''} />
      </button>
      {open && (
        <div className={styles.dropdown}>
          {options.map(opt => (
            <button
              key={opt}
              className={`${styles.dropItem} ${(activeLabel || '') === opt && isActive ? styles.dropItemActive : ''}`}
              onClick={() => { onSelect(opt); setOpen(false) }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── multi-select dropdown pill ─────────────────────────────────────────────────
function MultiPill({ label, options, selected, onToggle, onClear }) {
  const [open,   setOpen]   = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef()
  useClickOutside(ref, useCallback(() => { setOpen(false); setSearch('') }, []))
  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()))
  const isActive = selected.length > 0
  const pillLabel = isActive
    ? selected.length === 1 ? selected[0] : `${label}: ${selected.length}`
    : label

  return (
    <div className={styles.pillWrap} ref={ref}>
      <button
        className={`${styles.pill} ${isActive ? styles.active : ''} ${open ? styles.open : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        {pillLabel}
        {isActive
          ? <X size={11} onClick={e => { e.stopPropagation(); onClear() }} />
          : <ChevronDown size={12} className={open ? styles.chevronUp : ''} />
        }
      </button>
      {open && (
        <div className={`${styles.dropdown} ${styles.dropdownWide}`}>
          {options.length > 6 && (
            <div className={styles.searchWrap}>
              <Search size={12} />
              <input
                className={styles.searchInput}
                placeholder={`Search ${label.toLowerCase()}…`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          )}
          {filtered.map(opt => (
            <button
              key={opt}
              className={`${styles.dropItem} ${selected.includes(opt) ? styles.dropItemActive : ''}`}
              onClick={() => onToggle(opt)}
            >
              <span className={`${styles.checkbox} ${selected.includes(opt) ? styles.checkboxChecked : ''}`}>
                {selected.includes(opt) && <Check size={9} />}
              </span>
              {opt}
            </button>
          ))}
          {filtered.length === 0 && <div className={styles.noResults}>No results</div>}
        </div>
      )}
    </div>
  )
}

// ── date range pill ────────────────────────────────────────────────────────────
function DatePill({ filters, setFilters }) {
  const [open,       setOpen]      = useState(false)
  const [showCustom, setShowCustom] = useState(filters.datePreset === 'custom')
  const [fromVal,    setFromVal]   = useState(filters.dateFrom || '')
  const [toVal,      setToVal]     = useState(filters.dateTo   || '')
  const ref = useRef()
  useClickOutside(ref, useCallback(() => setOpen(false), []))

  const activeOpt = DATE_OPTIONS.find(o => o.key === filters.datePreset)
  const isActive  = filters.datePreset !== 'all'
  const pillLabel = isActive ? (activeOpt?.label || 'Date') : 'All time'

  function selectPreset(opt) {
    if (opt.key === 'custom') {
      setShowCustom(true)
      setFilters({ datePreset: 'custom', dateFrom: fromVal || null, dateTo: toVal || null })
    } else {
      setShowCustom(false)
      setFilters({ datePreset: opt.key, dateFrom: null, dateTo: null })
      setOpen(false)
    }
  }

  function applyCustom() {
    setFilters({ datePreset: 'custom', dateFrom: fromVal || null, dateTo: toVal || null })
    setOpen(false)
  }

  return (
    <div className={styles.pillWrap} ref={ref}>
      <button
        className={`${styles.pill} ${isActive ? styles.active : ''} ${open ? styles.open : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        {pillLabel}
        {isActive
          ? <X size={11} onClick={e => { e.stopPropagation(); setFilters({ datePreset:'all', dateFrom:null, dateTo:null }); setShowCustom(false) }} />
          : <ChevronDown size={12} className={open ? styles.chevronUp : ''} />
        }
      </button>
      {open && (
        <div className={styles.dropdown} style={{ minWidth: 200 }}>
          {DATE_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`${styles.dropItem} ${filters.datePreset === opt.key ? styles.dropItemActive : ''}`}
              onClick={() => selectPreset(opt)}
            >
              {opt.label}
            </button>
          ))}
          {showCustom && (
            <div className={styles.customRange}>
              <label>From</label>
              <input type="date" className={styles.dateInput} value={fromVal} onChange={e => setFromVal(e.target.value)} />
              <label>To</label>
              <input type="date" className={styles.dateInput} value={toVal}   onChange={e => setToVal(e.target.value)} />
              <button className={styles.applyBtn} onClick={applyCustom}>Apply</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── "More" pill (category + policy status) ────────────────────────────────────
function MorePill({ filters, setFilters }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  useClickOutside(ref, useCallback(() => setOpen(false), []))
  const activeCount = filters.categories.length + filters.policyStatuses.length
  const isActive = activeCount > 0

  function toggleCat(c) {
    setFilters({ categories: filters.categories.includes(c) ? filters.categories.filter(x => x !== c) : [...filters.categories, c] })
  }
  function toggleStatus(s) {
    setFilters({ policyStatuses: filters.policyStatuses.includes(s) ? filters.policyStatuses.filter(x => x !== s) : [...filters.policyStatuses, s] })
  }

  return (
    <div className={styles.pillWrap} ref={ref}>
      <button
        className={`${styles.pill} ${isActive ? styles.active : ''} ${open ? styles.open : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        {isActive ? `More (${activeCount})` : 'More'}
        {isActive
          ? <X size={11} onClick={e => { e.stopPropagation(); setFilters({ categories:[], policyStatuses:[] }) }} />
          : <ChevronDown size={12} className={open ? styles.chevronUp : ''} />
        }
      </button>
      {open && (
        <div className={`${styles.dropdown} ${styles.dropdownWide}`}>
          <div className={styles.moreGroup}>
            <div className={styles.moreLabel}>Travel Category</div>
            {CATEGORIES.map(c => (
              <button key={c} className={`${styles.dropItem} ${filters.categories.includes(c) ? styles.dropItemActive : ''}`} onClick={() => toggleCat(c)}>
                <span className={`${styles.checkbox} ${filters.categories.includes(c) ? styles.checkboxChecked : ''}`}>{filters.categories.includes(c) && <Check size={9}/>}</span>{c}
              </button>
            ))}
          </div>
          <div className={styles.moreDivider}/>
          <div className={styles.moreGroup}>
            <div className={styles.moreLabel}>Policy Status</div>
            {POLICY_STATUSES.map(s => (
              <button key={s} className={`${styles.dropItem} ${filters.policyStatuses.includes(s) ? styles.dropItemActive : ''}`} onClick={() => toggleStatus(s)}>
                <span className={`${styles.checkbox} ${filters.policyStatuses.includes(s) ? styles.checkboxChecked : ''}`}>{filters.policyStatuses.includes(s) && <Check size={9}/>}</span>{s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── filter indicator bar ──────────────────────────────────────────────────────
function FilterIndicator({ filters, filteredCount, totalRecords, clearFilters }) {
  const parts = []
  const dateOpt = DATE_OPTIONS.find(o => o.key === filters.datePreset)
  if (filters.datePreset !== 'all') {
    parts.push(filters.datePreset === 'custom'
      ? `${filters.dateFrom || '?'} → ${filters.dateTo || '?'}`
      : dateOpt?.label)
  }
  if (filters.departments.length)    parts.push(filters.departments.join(', '))
  if (filters.travelers.length)      parts.push(`${filters.travelers.length} traveler${filters.travelers.length > 1 ? 's' : ''}`)
  if (filters.regions.length)        parts.push(filters.regions.join(', '))
  if (filters.costCentres.length)    parts.push(filters.costCentres.join(', '))
  if (filters.categories.length)     parts.push(filters.categories.join(', '))
  if (filters.policyStatuses.length) parts.push(filters.policyStatuses.join(', '))

  if (!parts.length) return null

  return (
    <div className={styles.indicator}>
      <span className={styles.indicatorText}>
        <strong>Filtered:</strong> {parts.join(' · ')} · Showing <strong>{filteredCount}</strong> of {totalRecords} records
      </span>
      <button className={styles.indicatorClear} onClick={clearFilters}>
        <X size={11} /> Clear all filters
      </button>
    </div>
  )
}

// ── main export ───────────────────────────────────────────────────────────────
export default function FilterPills() {
  const {
    filters, setFilters, clearFilters, isFiltered,
    filteredRecords, travelData,
    availableDepts, availableTravelers, availableCostCentres,
  } = useTravelData()

  const totalRecords = travelData?.length || 0

  return (
    <>
      <div className={styles.row}>
        <DatePill filters={filters} setFilters={setFilters} />

        <MultiPill
          label="Department"
          options={availableDepts}
          selected={filters.departments}
          onToggle={v => setFilters({ departments: filters.departments.includes(v) ? filters.departments.filter(x => x !== v) : [...filters.departments, v] })}
          onClear={() => setFilters({ departments: [] })}
        />

        <SinglePill
          label="Region"
          activeLabel={filters.regions.length === 1 ? filters.regions[0] : filters.regions.length > 1 ? `Region (${filters.regions.length})` : null}
          options={['All regions', ...REGIONS]}
          isActive={filters.regions.length > 0}
          onSelect={opt => setFilters({ regions: opt === 'All regions' ? [] : [opt] })}
        />

        <MultiPill
          label="Cost centre"
          options={availableCostCentres}
          selected={filters.costCentres}
          onToggle={v => setFilters({ costCentres: filters.costCentres.includes(v) ? filters.costCentres.filter(x => x !== v) : [...filters.costCentres, v] })}
          onClear={() => setFilters({ costCentres: [] })}
        />

        <MultiPill
          label="Traveler"
          options={availableTravelers}
          selected={filters.travelers}
          onToggle={v => setFilters({ travelers: filters.travelers.includes(v) ? filters.travelers.filter(x => x !== v) : [...filters.travelers, v] })}
          onClear={() => setFilters({ travelers: [] })}
        />

        <MorePill filters={filters} setFilters={setFilters} />
      </div>

      {isFiltered && (
        <FilterIndicator
          filters={filters}
          filteredCount={filteredRecords?.length || 0}
          totalRecords={totalRecords}
          clearFilters={clearFilters}
        />
      )}
    </>
  )
}
