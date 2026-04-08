import { useState } from 'react'
import { FileText, Download, Sparkles, BarChart2, Search, Presentation, Loader } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import FilterPills from '../components/FilterPills'
import { useTravelData } from '../context/TravelDataContext'
import { generateReport, downloadCSV } from '../utils/pdfExport'
import { generatePPTX } from '../utils/pptxExport'
import { downloadCFOReport } from '../utils/cfoReportPDF'
import { callAnthropic } from '../utils/anthropicClient'
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

const presetSystems = {
  monthly:    'You are Traivio AI, a corporate travel analyst. Generate a professional Monthly Travel Summary report. Context: Q2 2025, $284,392 total spend, 312 trips, 48 travelers, 78% compliance rate. Include spend breakdown by category (Air $142K, Hotels $84K, Car rental $31K, Rail $27K).',
  compliance: 'You are Traivio AI, a corporate travel analyst. Generate a Policy Compliance Scorecard. Current compliance: 78% vs 90% target. Top violations: late bookings 45%, class upgrades 28%, missing receipts 27%. Department breakdown available.',
  savings:    'You are Traivio AI, a corporate travel analyst. Generate a Savings Opportunity Report. Identified savings: advance booking $18.2K, hotel consolidation $12.4K, car rental $6.8K, route optimisation $3.6K. Total pipeline: $41K.',
  risk:       'You are Traivio AI, a corporate travel analyst. Generate a Risk & Fraud Flag Report. Active flags: 4 fraud incidents totalling $320 at risk, 3 high-confidence anomalies requiring immediate review, 1 duplicate booking detected.',
  'ai-exec':  'You are Traivio AI, a corporate travel analyst. Generate an AI Executive Summary for the CFO. Cover Q2 2025 travel spend of $284K, compliance at 78% (below 90% target), $41K savings pipeline, and top 3 strategic recommendations.',
  credits:    'You are Traivio AI, a corporate travel analyst. Generate an Unused Credits & Expiry Report. $9,800 in airline credits expiring within 8 days, $41K total savings opportunity identified across advance booking and vendor consolidation.',
  vendor:     'You are Traivio AI, a corporate travel analyst. Generate a Vendor Performance Report. Top airlines: BA (42%), Delta (28%), SAA (18%). Hotel consolidation opportunity identified. Car rental rate variance 12% above contract.',
}

export default function ReportsAnalytics() {
  const { filteredStats, filteredRecords, isDemo, fileName } = useTravelData()
  const stats = filteredStats
  const [nlQuery,        setNlQuery]        = useState('')
  const [selectedDims,   setSelectedDims]   = useState(['Department'])
  const [chartType,      setChartType]      = useState('Bar chart')
  const [running,        setRunning]        = useState(null)
  const [aiSummary,      setAiSummary]      = useState(null)
  const [retryStatus,    setRetryStatus]    = useState(null)
  const [lastAiReport,   setLastAiReport]   = useState({ id: null, text: null })
  const [cfoGenerating,  setCfoGenerating]  = useState(false)

  const orgName = isDemo ? 'Acme Corp (Demo)' : (fileName || 'Your Organisation')

  async function handleCFOReport() {
    setCfoGenerating(true)
    try {
      await downloadCFOReport(stats, filteredRecords || [], orgName)
    } catch (e) {
      console.error('CFO report error:', e)
    } finally {
      setCfoGenerating(false)
    }
  }

  function handleDownloadPDF(e, presetId) {
    e.stopPropagation()
    const aiText = lastAiReport.id === presetId ? lastAiReport.text : null
    generateReport(presetId, stats, orgName, !isDemo, aiText)
  }

  async function handleDownloadPPTX(e, presetId) {
    e.stopPropagation()
    const aiText = lastAiReport.id === presetId ? lastAiReport.text : null
    await generatePPTX(presetId, stats, orgName, !isDemo, aiText)
  }

  function handleDownloadCSV() {
    if (!stats?.records) return
    const headers = ['Travel Date', 'Traveler', 'Department', 'Route', 'Vendor', 'Category', 'Amount (USD)', 'Policy Status', 'Fraud Flag']
    const rows = stats.records.map(r => [
      r.travelDate, r.travelerName, r.department,
      `${r.originCode}→${r.destinationCode}`, r.vendor, r.category,
      r.totalCost, r.policyStatus, r.fraudFlag ? 'Yes' : 'No',
    ])
    downloadCSV('Travel Records', headers, rows)
  }

  function toggleDim(d) {
    setSelectedDims(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  async function runReport(id) {
    setRunning(id)
    setAiSummary(null)
    setRetryStatus(null)

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey) {
      setAiSummary('⚠️ No API key configured. Add VITE_ANTHROPIC_API_KEY to your .env file to enable AI reports.')
      setRunning(null)
      return
    }

    const system = id === 'nl'
      ? 'You are Traivio AI, a corporate travel analyst. Answer travel analytics queries with specific insights and data-driven recommendations. Context: Q2 2025, $284K total spend, 312 trips, 48 travelers, 78% compliance.'
      : id === 'pivot'
        ? `You are Traivio AI, a corporate travel analyst. Generate a custom report for dimensions: ${selectedDims.join(', ')}, visualised as a ${chartType}. Provide data insights and 3 actionable recommendations.`
        : (presetSystems[id] || 'You are Traivio AI, a corporate travel analyst.')

    const userMsg = id === 'nl'
      ? nlQuery
      : 'Generate this report now. Include key findings, data highlights, and 3 actionable recommendations. Keep it concise and professional (under 300 words).'

    try {
      const text = await callAnthropic({
        apiKey,
        system,
        messages: [{ role: 'user', content: userMsg }],
        onRetry: (attempt, delayMs) => {
          setRetryStatus(`AI is busy — retrying in ${delayMs / 1000}s... (attempt ${attempt}/3)`)
        },
      })
      setRetryStatus(null)
      if (text) {
        setAiSummary(text)
        setLastAiReport({ id, text })
      } else {
        setAiSummary('No response received. Please check your API key and try again.')
      }
    } catch (err) {
      setRetryStatus(null)
      setAiSummary(`Error connecting to AI: ${err.message}`)
    } finally {
      setRunning(null)
    }
  }

  return (
    <div>
      <FilterPills />
      <div className={styles.page}>
        <PageHeader title="Reports & Analytics" description="Preset reports, custom pivot builder, and natural language queries" />

        {/* CFO Executive Report */}
        <div style={{
          background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ color: 'white', fontSize: '16px', fontWeight: '700' }}>
              CFO Executive Report
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '4px' }}>
              Board-ready PDF with spend, compliance, risk and recommendations
            </div>
          </div>
          <button
            onClick={handleCFOReport}
            disabled={cfoGenerating}
            style={{
              background: 'white',
              color: '#7C3AED',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: cfoGenerating ? 'not-allowed' : 'pointer',
              opacity: cfoGenerating ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {cfoGenerating ? '⏳ Generating...' : '⬇ Download CFO Report'}
          </button>
        </div>

        {/* Preset reports */}
        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 className={styles.cardTitle} style={{ marginBottom: 0 }}>Preset reports</h3>
            <button className={rStyles.csvBtn} onClick={handleDownloadCSV}>
              <Download size={13} /> Download CSV
            </button>
          </div>
          <div className={rStyles.presetGrid}>
            {presets.map(p => (
              <button
                key={p.id}
                className={`${rStyles.presetBtn} ${running === p.id ? rStyles.running : ''}`}
                onClick={() => runReport(p.id)}
              >
                <p.icon size={16} style={{ color: p.color, flexShrink: 0 }} />
                <span>{p.label}</span>
                <div className={rStyles.presetActions} onClick={e => e.stopPropagation()}>
                  {running === p.id
                    ? <span className={rStyles.spinner} />
                    : <>
                        <Download    size={13} className={rStyles.dlIcon} onClick={e => handleDownloadPDF(e, p.id)}  title="Download PDF" />
                        <Presentation size={13} className={rStyles.dlIcon} onClick={e => handleDownloadPPTX(e, p.id)} title="Download PowerPoint" />
                      </>
                  }
                </div>
              </button>
            ))}
          </div>
          {retryStatus && (
            <div className={rStyles.retryMsg}>
              <Loader size={12} className={rStyles.spin} /> {retryStatus}
            </div>
          )}
          {aiSummary && (
            <div className={`${styles.aiBox} ${rStyles.aiResult}`}>
              <Sparkles size={14} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ whiteSpace: 'pre-wrap' }}>{aiSummary}</p>
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
              onKeyDown={e => e.key === 'Enter' && nlQuery.trim() && runReport('nl')}
              placeholder='e.g. "Show all business class flights over $2000 by sales team in Q3"'
            />
            <button className={rStyles.nlBtn} onClick={() => runReport('nl')} disabled={!nlQuery.trim() || running === 'nl'}>
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
            <button className={rStyles.runBtn} onClick={() => runReport('pivot')} disabled={!!running}>
              {running === 'pivot' ? <span className={rStyles.spinner} style={{ borderTopColor: '#fff' }} /> : <><BarChart2 size={14} /> Build report</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
