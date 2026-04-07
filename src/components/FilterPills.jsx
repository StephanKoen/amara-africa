import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import styles from './FilterPills.module.css'

const pillOptions = {
  'All time':    ['Today', 'Last 7 days', 'Last 30 days', 'Q1 2025', 'Q2 2025', 'Last 12 months'],
  'Department':  ['All departments', 'Sales', 'Engineering', 'Marketing', 'Executive & Admin', 'Operations'],
  'Region':      ['All regions', 'EMEA', 'Americas', 'APAC', 'South Africa'],
  'Cost centre': ['All cost centres', 'CC-001 Sales', 'CC-002 Tech', 'CC-003 Marketing', 'CC-004 Ops'],
  'Traveler':    ['All travelers', 'Alice Chen', 'Bob Smith', 'Carol White', 'David Park', 'Emma Davis'],
  'More':        ['Booking class', 'Vendor', 'Policy status', 'Trip type', 'Approval status'],
}

export default function FilterPills() {
  const [selected, setSelected] = useState({})
  const [openPill, setOpenPill] = useState(null)
  const wrapRef = useRef()

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenPill(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function togglePill(pill) {
    setOpenPill(prev => prev === pill ? null : pill)
  }

  function selectOption(pill, option) {
    setSelected(prev => ({ ...prev, [pill]: option }))
    setOpenPill(null)
  }

  function getLabel(pill) {
    const sel = selected[pill]
    if (!sel) return pill
    const defaults = { 'All time': 'All time', 'Department': 'All departments', 'Region': 'All regions', 'Cost centre': 'All cost centres', 'Traveler': 'All travelers' }
    return sel === defaults[pill] ? pill : sel
  }

  function isActive(pill) {
    const sel = selected[pill]
    if (!sel) return false
    const defaults = { 'All time': 'All time', 'Department': 'All departments', 'Region': 'All regions', 'Cost centre': 'All cost centres', 'Traveler': 'All travelers' }
    return sel !== defaults[pill]
  }

  return (
    <div className={styles.row} ref={wrapRef}>
      {Object.keys(pillOptions).map(pill => (
        <div key={pill} className={styles.pillWrap}>
          <button
            className={`${styles.pill} ${isActive(pill) ? styles.active : ''} ${openPill === pill ? styles.open : ''}`}
            onClick={() => togglePill(pill)}
          >
            {getLabel(pill)} <ChevronDown size={12} className={openPill === pill ? styles.chevronUp : ''} />
          </button>
          {openPill === pill && (
            <div className={styles.dropdown}>
              {pillOptions[pill].map(opt => (
                <button
                  key={opt}
                  className={`${styles.dropItem} ${selected[pill] === opt ? styles.dropItemActive : ''}`}
                  onClick={() => selectOption(pill, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
