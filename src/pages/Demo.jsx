import { useState, useRef } from 'react'
import { Upload, FileText, Lock, ArrowRight, BarChart2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { parseFile, validateData, summarise } from '../utils/dataParser'
import styles from './Demo.module.css'

const templateCSV = `travel date,traveler name,origin,destination,cost,category,department
2025-04-01,Alice Brown,NYC,LON,1840,Air,Sales
2025-04-02,Bob Smith,SFO,SIN,2200,Air,Engineering
2025-04-03,Carol White,NYC,PAR,420,Hotels,Marketing
2025-04-04,Dave Jones,LAX,FRA,310,Car rental,Operations`

function downloadTemplate() {
  const blob = new Blob([templateCSV], { type: 'text/csv' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
  a.download = 'traivio_template.csv'; a.click()
}

export default function Demo() {
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState(null)
  const inputRef = useRef()
  const navigate = useNavigate()

  async function handleFile(file) {
    if (!file) return
    setStatus('loading'); setError(null)
    try {
      const rows = await parseFile(file)
      const { valid, missing } = validateData(rows)
      if (!valid) {
        setError(`Missing required columns: ${missing.join(', ')}. Please use the template.`)
        setStatus('error'); return
      }
      setSummary(summarise(rows))
      setStatus('done')
    } catch (e) {
      setError(e.message); setStatus('error')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoMark}><BarChart2 size={18} color="#fff" /></div>
          <span>Traivio</span>
        </div>
        <button className={styles.loginBtn} onClick={() => navigate('/login')}>Sign in</button>
      </div>

      <div className={styles.hero}>
        <h1 className={styles.title}>Free travel spend analysis</h1>
        <p className={styles.sub}>Upload your travel data and get AI-powered insights instantly. No account required.</p>
      </div>

      {status === 'idle' || status === 'loading' || status === 'error' ? (
        <div className={styles.uploadBox}>
          <div
            className={styles.dropzone}
            onClick={() => inputRef.current.click()}
            onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
            onDragOver={e => e.preventDefault()}
          >
            {status === 'loading' ? (
              <div className={styles.loading}><div className={styles.spinner} /> Analysing your data…</div>
            ) : (
              <>
                <Upload size={32} className={styles.uploadIcon} />
                <p className={styles.dropTitle}>Drop your CSV or Excel file here</p>
                <p className={styles.dropSub}>Supports .csv, .xlsx, .xls · Up to 12 months of data</p>
                <input ref={inputRef} type="file" accept=".csv,.xlsx,.xls" hidden
                  onChange={e => handleFile(e.target.files[0])} />
              </>
            )}
          </div>
          {status === 'error' && (
            <div className={styles.errorBox}>
              <p>{error}</p>
              <button className={styles.templateBtn} onClick={downloadTemplate}>
                <FileText size={13} /> Download template
              </button>
            </div>
          )}
          <button className={styles.templateLink} onClick={downloadTemplate}>
            <FileText size={12} /> Download sample template
          </button>
        </div>
      ) : (
        <div className={styles.results}>
          <h2 className={styles.resultsTitle}>Your travel analysis</h2>
          <div className={styles.resultGrid}>
            <div className={styles.resultCard}>
              <div className={styles.rLabel}>Total Spend</div>
              <div className={styles.rValue}>${summary.totalSpend.toLocaleString('en', { maximumFractionDigits: 0 })}</div>
            </div>
            <div className={styles.resultCard}>
              <div className={styles.rLabel}>Total Trips</div>
              <div className={styles.rValue}>{summary.trips}</div>
            </div>
            <div className={styles.resultCard}>
              <div className={styles.rLabel}>Travelers</div>
              <div className={styles.rValue}>{summary.travelers}</div>
            </div>
            <div className={styles.resultCard}>
              <div className={styles.rLabel}>Avg per Trip</div>
              <div className={styles.rValue}>${summary.trips ? Math.round(summary.totalSpend / summary.trips).toLocaleString() : 0}</div>
            </div>
          </div>

          <div className={styles.lockedSection}>
            <div className={styles.blurred}>
              <div className={styles.fakeRow} />
              <div className={styles.fakeRow} style={{ width: '80%' }} />
              <div className={styles.fakeRow} style={{ width: '60%' }} />
            </div>
            <div className={styles.lockOverlay}>
              <Lock size={20} />
              <p>Sign up to unlock: top 5 savings opportunities, fraud flags, compliance score, AI executive summary</p>
              <button className={styles.upgradeBtn} onClick={() => navigate('/login')}>
                Unlock full analysis <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
