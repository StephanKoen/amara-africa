import { Upload, X, CheckCircle, BarChart2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTravelData } from '../context/TravelDataContext'
import styles from './DemoBanner.module.css'

export default function DemoBanner() {
  const { isDemo, fileName, stats, clearUpload } = useTravelData()
  const navigate = useNavigate()

  if (isDemo) {
    return (
      <div className={`${styles.banner} ${styles.demo}`}>
        <BarChart2 size={15} className={styles.icon} />
        <span className={styles.text}>
          <strong>Viewing demo data</strong> — This is sample data to show you what Traivio can do
        </span>
        <button className={styles.cta} onClick={() => navigate('/upload')}>
          <Upload size={13} /> Upload my data
        </button>
      </div>
    )
  }

  return (
    <div className={`${styles.banner} ${styles.real}`}>
      <CheckCircle size={15} className={styles.icon} />
      <span className={styles.text}>
        <strong>Analysing: {fileName}</strong>
        {stats && <> &middot; {stats.totalTrips} records &middot; {stats.dateRange}</>}
      </span>
      <button className={styles.clear} onClick={clearUpload}>
        <X size={13} /> Clear &amp; return to demo
      </button>
    </div>
  )
}
