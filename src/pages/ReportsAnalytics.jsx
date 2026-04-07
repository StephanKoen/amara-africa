import { useState } from 'react'
import { FileText, Download, Sparkles, BarChart2, Search } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import FilterPills from '../components/FilterPills'
import styles from './InnerPage.module.css'
import rStyles from './ReportsAnalytics.module.css'

const presets = [
  { id: 'monthly',    label: 'Monthly Travel Summary',        icon: FileText, color: '#7C3AED' },
  { id: 'compliance', label: 'Policy Compliance Scorecard',   icon: FileText, color: '#0EA5E9' },
  { id: 'savings',    label: 'Savings Opportunity Report',    icon: FileText, color: '#10B981' },
  { id: 'risk',       label: 'Risk & Fraud Flag Report',      icon: FileText, color: '#EF4444' },
  { id: 'ai-exec',    label: 'AI Executive Summary',          icon: Sparkles, color: '#EC4899' },
  { id: 'credits',    label: 'Unused Credits & Expiry',       icon: FileText, color: '#F59E0B' },
  { id: 'vendor',     label: 'Vendor Performance Report',     icon: FileText, color: '#8B5CF6' },
]

const dimensions = ['Department', 'Traveler', 'Route', 'Vendor', 'Cost Centre', 'Booking Class', 'Date Range', 'Policy Status']
const chartTypes  = ['Bar chart', 'Line chart', 'Pie chart', 'Table', 'Heatmap']

export default function ReportsAnalytics() {
  const [nlQuery, setNlQuery] = useState('')
  const [selectedDims, setSelectedDims] = useState(['Department'])
  const [chartType, setChartType] = useState('Bar chart')
  const [running, setRunning] = useState(null)
  const [aiSummary, setAiSummary] = useState(null)

  function toggleDim(d) {
    setSelectedDims(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  function runReport(id) {
    setRunning(id)
    setTimeout(() => {
      setRunning(null)
      setAiSummary(`AI Executive Summary: In Q2 2025, total travel spend was $284,392 across 312 trips and 48 travelers. Compliance rate sits at 78%, below the 90% target. Top savings opportunity is advance booking ($18.2K/yr). Three high-confidence fraud flags require immediate review. Recommended actions: enforce 14-day booking policy, consolidate hotel vendors, and apply $9.8K in expiring credits before April 15.`)
    }, 1800)
  }

  return (
    <div>
      <FilterPills />
      <div className={styles.page}>
        <PageHeader title="Reports & Analytics" description="Preset reports, custom pivot builder, and natural language queries" />

        {/* Preset reports */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Preset reports</h3>
          <div className={rStyles.presetGrid}>
            {presets.map(p => (
              <button
                key={p.id}
                className={`${rStyles.presetBtn} ${running === p.id ? rStyles.running : ''}`}
                onClick={() => runReport(p.id)}
              >
                <p.icon size={16} style={{ color: p.color, flexShrink: 0 }} />
                <span>{p.label}</span>
                {running === p.id
                  ? <span className={rStyles.spinner} />
                  : <Download size={13} className={rStyles.dlIcon} />
                }
              </button>
            ))}
          </div>
          {aiSummary && (
            <div className={`${styles.aiBox} ${rStyles.aiResult}`}>
              <Sparkles size={14} style={{ flexShrink: 0, marginTop: 2 }} />
              <p>{aiSummary}</p>
            </div>
          )}
        </div>

        {/* Natural language query */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Natural language query</h3>
          <p className={styles.cardSubtitle}>Describe what you want to see — Traivio AI builds the report automatically</p>
          <div className={rStyles.nlRow}>
            <Search size={15} className={rStyles.nlIcon} />
            <input
              className={rStyles.nlInput}
              value={nlQuery}
              onChange={e => setNlQuery(e.target.value)}
              placeholder='e.g. "Show all business class flights over $2000 by sales team in Q3"'
            />
            <button className={rStyles.nlBtn} onClick={() => runReport('nl')} disabled={!nlQuery.trim()}>
              {running === 'nl' ? <span className={rStyles.spinner} /> : 'Run'}
            </button>
          </div>
          <div className={rStyles.exampleChips}>
            {['Top 10 travelers by spend', 'Hotel compliance by dept', 'Fraud flags last 90 days'].map(ex => (
              <button key={ex} className={rStyles.exChip} onClick={() => setNlQuery(ex)}>{ex}</button>
            ))}
          </div>
        </div>

        {/* Custom pivot */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Custom pivot builder</h3>
          <div className={rStyles.pivotGrid}>
            <div>
              <div className={rStyles.pivotLabel}>Dimensions</div>
              <div className={rStyles.dimGrid}>
                {dimensions.map(d => (
                  <button
                    key={d}
                    className={`${rStyles.dimChip} ${selectedDims.includes(d) ? rStyles.dimActive : ''}`}
                    onClick={() => toggleDim(d)}
                  >{d}</button>
                ))}
              </div>
            </div>
            <div>
              <div className={rStyles.pivotLabel}>Chart type</div>
              <div className={rStyles.chartTypes}>
                {chartTypes.map(c => (
                  <button
                    key={c}
                    className={`${rStyles.chartChip} ${chartType === c ? rStyles.chartActive : ''}`}
                    onClick={() => setChartType(c)}
                  >{c}</button>
                ))}
              </div>
            </div>
          </div>
          <div className={rStyles.pivotActions}>
            <button className={rStyles.saveBtn}>Save as template</button>
            <button className={rStyles.runBtn} onClick={() => runReport('pivot')}>
              {running === 'pivot' ? <span className={rStyles.spinner} style={{ borderTopColor: '#fff' }} /> : <><BarChart2 size={14} /> Build report</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
