import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Papa from 'papaparse'
import {
  DollarSign, TrendingDown, AlertTriangle,
  ShieldAlert, Users, CheckCircle, Upload, FileText
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts'
import KPICard from '../components/KPICard'
import DataTable from '../components/DataTable'
import PageHeader from '../components/PageHeader'
import { useTravelData } from '../context/TravelDataContext'
import styles from './Overview.module.css'

const mockSpendData = [
  { month: 'Oct', spend: 142000 },
  { month: 'Nov', spend: 168000 },
  { month: 'Dec', spend: 119000 },
  { month: 'Jan', spend: 185000 },
  { month: 'Feb', spend: 201000 },
  { month: 'Mar', spend: 177000 },
]

const kpis = [
  { title: 'Total Spend',       value: '$1.19M',  subtitle: 'Last 6 months',   icon: DollarSign,    color: 'blue',   trend: 8.2  },
  { title: 'Potential Savings', value: '$84.3K',  subtitle: 'Identified gaps',  icon: TrendingDown,  color: 'green',  trend: -3.1 },
  { title: 'Policy Violations', value: '47',      subtitle: 'This quarter',     icon: AlertTriangle, color: 'yellow', trend: 12.0 },
  { title: 'Fraud Flags',       value: '9',       subtitle: 'Needs review',     icon: ShieldAlert,   color: 'red',    trend: -5.0 },
  { title: 'Traveler Friction', value: '23%',     subtitle: 'Rebooking rate',   icon: Users,         color: 'purple', trend: 2.4  },
  { title: 'Compliance Rate',   value: '81.4%',   subtitle: 'Policy adherence', icon: CheckCircle,   color: 'green',  trend: 1.8  },
]

export default function Overview() {
  const { travelData, setTravelData, fileName, setFileName } = useTravelData()
  const inputRef = useRef()
  const navigate = useNavigate()

  const handleFile = useCallback((file) => {
    if (!file) return
    setFileName(file.name)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => setTravelData(data),
    })
  }, [setTravelData, setFileName])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file?.name.endsWith('.csv')) handleFile(file)
  }, [handleFile])

  const onDragOver = (e) => e.preventDefault()

  return (
    <div className={styles.page}>
      <PageHeader
        title="Overview"
        description="Corporate travel spend intelligence at a glance"
      >
        {travelData && (
          <button className={styles.analyzeBtn} onClick={() => navigate('/ai-analyst')}>
            <FileText size={14} /> Analyze with AI
          </button>
        )}
      </PageHeader>

      <div className={styles.kpiGrid}>
        {kpis.map(k => <KPICard key={k.title} {...k} />)}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Monthly Spend Trend</h2>
          <span className={styles.badge}>Last 6 months</span>
        </div>
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockSpendData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1f6feb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1f6feb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false}
                tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#1c2333', border: '1px solid #30363d', borderRadius: 8, fontSize: 13 }}
                labelStyle={{ color: '#e6edf3' }}
                formatter={v => [`$${v.toLocaleString()}`, 'Spend']}
              />
              <Area type="monotone" dataKey="spend" stroke="#1f6feb" strokeWidth={2}
                fill="url(#spendGrad)" dot={{ fill: '#1f6feb', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Upload Travel Spend Report</h2>
          {fileName && <span className={styles.fileName}><FileText size={13} />{fileName}</span>}
        </div>

        {!travelData ? (
          <div
            className={styles.dropzone}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={() => inputRef.current.click()}
          >
            <Upload size={28} className={styles.uploadIcon} />
            <p className={styles.dropTitle}>Drop your CSV file here</p>
            <p className={styles.dropSub}>or click to browse · Supports standard travel expense exports</p>
            <input ref={inputRef} type="file" accept=".csv" hidden
              onChange={e => handleFile(e.target.files[0])} />
          </div>
        ) : (
          <div>
            <div className={styles.uploadActions}>
              <span className={styles.successTag}>{travelData.length} rows loaded</span>
              <button className={styles.clearBtn} onClick={() => { setTravelData(null); setFileName(null) }}>
                Clear data
              </button>
            </div>
            <DataTable data={travelData} />
          </div>
        )}
      </div>
    </div>
  )
}
