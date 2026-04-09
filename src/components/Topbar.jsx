import { useLocation } from 'react-router-dom'
import { Upload, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { useTravelData } from '../context/TravelDataContext'
import { detectAndParse } from '../utils/dataParser'
import styles from './Topbar.module.css'

const pageInfo = {
  '/overview':           { title:'Overview',               subtitle:'Acme Corp · Updated just now' },
  '/upload':             { title:'Upload Data',            subtitle:'Import your travel records' },
  '/fare-discrepancies': { title:'Fare Discrepancies',     subtitle:'Booked vs market benchmark' },
  '/fraud-compliance':   { title:'Fraud & Compliance',     subtitle:'Automated risk detection' },
  '/savings':            { title:'Savings Opportunities',  subtitle:'AI-identified cost reductions' },
  '/unused-credits':     { title:'Unused Credits',         subtitle:'30-day expiry alert active' },
  '/contracts':          { title:'Contract Opportunities', subtitle:'Vendor spend vs thresholds' },
  '/reports':            { title:'Reports & Analytics',    subtitle:'Preset and custom reports' },
  '/predictive':         { title:'Predictive Insights',    subtitle:'ML-driven forecasts' },
  '/ai-analyst':         { title:'AI Analyst',             subtitle:'Powered by Claude' },
  '/tmc-portal':         { title:'TMC Portal',             subtitle:'Client portfolio overview' },
}

export default function Topbar() {
  const location  = useLocation()
  const { setPendingFile } = useTravelData()
  const inputRef  = useRef()
  const info = pageInfo[location.pathname] || { title:'Traivio', subtitle:'' }

  async function handleFile(file) {
    if (!file) return
    try {
      const result = await detectAndParse(file)
      setPendingFile(result)
    } catch (e) {
      console.error('Upload error:', e)
    }
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <h1 className={styles.title}>{info.title}</h1>
        <p className={styles.subtitle}>{info.subtitle}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.btnOutline} onClick={() => inputRef.current.click()}>
          <Upload size={14} /> Upload data
          <input ref={inputRef} type="file" accept=".csv,.xlsx,.xls" hidden
            onChange={e => handleFile(e.target.files[0])} />
        </button>
        <button className={styles.btnPrimary}>
          <Sparkles size={14} /> Run AI audit
        </button>
      </div>
    </header>
  )
}
