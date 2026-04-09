import { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { ShieldAlert, ShieldCheck, AlertCircle, TrendingDown } from 'lucide-react'
import KPICard from '../components/KPICard'
import DataTable from '../components/DataTable'
import PageHeader from '../components/PageHeader'
import FilterPills from '../components/FilterPills'
import TransactionModal from '../components/TransactionModal'
import { useTravelData } from '../context/TravelDataContext'
import styles from './InnerPage.module.css'

const HARDCODED_FLAGS = [
  { id: 'F-001', type: 'Duplicate ticket',     traveler: 'A. Brooks', amount: '$412',   confidence: '96%', date: '2026-03-14', risk: 'High' },
  { id: 'F-002', type: 'Personal expense',     traveler: 'J. Lin',    amount: '$89',    confidence: '88%', date: '2026-03-18', risk: 'High' },
  { id: 'F-003', type: 'Unapproved vendor',    traveler: 'P. Okafor', amount: '$670',   confidence: '91%', date: '2026-03-21', risk: 'High' },
  { id: 'F-004', type: 'Policy limit exceeded',traveler: 'C. Roy',    amount: '$285',   confidence: '79%', date: '2026-03-25', risk: 'Medium' },
  { id: 'F-005', type: 'Missing receipt',      traveler: 'S. Hassan', amount: '$156',   confidence: '72%', date: '2026-03-28', risk: 'Medium' },
  { id: 'F-006', type: 'Weekend travel',       traveler: 'T. Park',   amount: '$1,100', confidence: '65%', date: '2026-03-30', risk: 'Low' },
  { id: 'F-007', type: 'Duplicate claim',      traveler: 'M. Davis',  amount: '$220',   confidence: '94%', date: '2026-04-01', risk: 'High' },
]

const violationChart = [
  { type: 'Duplicate',     count: 8 },
  { type: 'Personal',      count: 5 },
  { type: 'Unapproved',    count: 4 },
  { type: 'Limit exceeded',count: 7 },
  { type: 'Missing docs',  count: 12 },
]

const riskColor = { High: 'var(--danger)', Medium: 'var(--warning)', Low: 'var(--success)' }
const riskBg    = { High: 'var(--danger-dim)', Medium: 'var(--warning-dim)', Low: 'var(--success-dim)' }

export default function FraudCompliance() {
  const { filteredRecords } = useTravelData()
  const [selectedRecord, setSelectedRecord] = useState(null)

  // Prefer actual flagged/violation records from uploaded data; fall back to hardcoded
  const flaggedRecords = (filteredRecords || []).filter(r => r.fraudFlag || r.policyStatus === 'Violation' || r.isVoided)
  const flags = flaggedRecords.length > 0 ? flaggedRecords : HARDCODED_FLAGS

  const high = HARDCODED_FLAGS.filter(f => f.risk === 'High').length

  function handleRowClick(row) {
    // Try to find matching real record from uploaded data
    const match = (filteredRecords || []).find(r =>
      r.travelerName?.includes(row['Traveler']?.split('.')[1]?.trim() || '') ||
      r.bookingRef === row['ID']
    )
    if (match) {
      setSelectedRecord(match)
    } else if (row.travelDate) {
      // It's already a full record (from flaggedRecords)
      setSelectedRecord(row)
    } else {
      // Construct a minimal record from hardcoded flag data for the modal
      setSelectedRecord({
        id: row['ID'],
        travelerName: row['Traveler'],
        totalCost: parseFloat((row['Amount'] || '').replace(/[$,]/g, '')) || 0,
        currency: 'USD',
        policyStatus: 'Violation',
        violationType: row['Type'],
        fraudFlag: true,
        flagSeverity: row['Risk'],
        notes: `AI confidence: ${row['AI Confidence']} · Detected: ${row['Date']}`,
      })
    }
  }

  return (
    <div>
      <FilterPills />
      <div className={styles.page}>
        <PageHeader title="Fraud & Compliance" description="Duplicate detection, policy violations, and risk flags" />

        <div className={styles.kpiRow}>
          <KPICard title="Total Flags"      value={HARDCODED_FLAGS.length} subtitle="Pending review"   icon={ShieldAlert} color="danger"  trend={12} />
          <KPICard title="High Risk"        value={high}                   subtitle="Immediate action"  icon={AlertCircle} color="warning" />
          <KPICard title="Compliance Rate"  value="78%"                    subtitle="vs 90% target"     icon={ShieldCheck} color="success" trend={-2} />
          <KPICard title="Amount at Risk"   value="$2,932"                 subtitle="Flagged spend"      icon={TrendingDown}color="danger"  />
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Policy violations by type</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={violationChart} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDE9FE" vertical={false} />
              <XAxis dataKey="type" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #EDE9FE', borderRadius: 8, fontSize: 13 }} />
              <Bar dataKey="count" fill="#7C3AED" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Flagged transactions</h3>
          <DataTable
            headers={['ID', 'Type', 'Traveler', 'Amount', 'AI Confidence', 'Date', 'Risk']}
            rows={HARDCODED_FLAGS.map(f => ({
              'ID': f.id, 'Type': f.type, 'Traveler': f.traveler,
              'Amount': f.amount, 'AI Confidence': f.confidence,
              'Date': f.date, 'Risk': f.risk,
            }))}
            onRowClick={handleRowClick}
            rowStyle={{ cursor: 'pointer' }}
            renderCell={(h, v) => {
              if (h === 'Risk') return <span className={styles.badge} style={{ background: riskBg[v], color: riskColor[v] }}>{v}</span>
              if (h === 'ID') return <code style={{ background: '#F5F4FF', padding: '2px 7px', borderRadius: 5, fontSize: 11, color: '#7C3AED' }}>{v}</code>
              if (h === 'AI Confidence') return <span style={{ fontWeight: 600, color: parseInt(v) > 85 ? 'var(--danger)' : 'var(--warning)' }}>{v}</span>
              return v
            }}
          />
        </div>
      </div>

      {selectedRecord && (
        <TransactionModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      )}
    </div>
  )
}
