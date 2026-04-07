import { CreditCard, AlertTriangle, Clock, DollarSign } from 'lucide-react'
import KPICard from '../components/KPICard'
import DataTable from '../components/DataTable'
import PageHeader from '../components/PageHeader'
import FilterPills from '../components/FilterPills'
import styles from './InnerPage.module.css'

const credits = [
  { id: 'TC-4821', traveler: 'A. Brooks', airline: 'British Airways', amount: '$2,400', expires: '2026-04-15', days: 8,  status: 'Critical' },
  { id: 'TC-3912', traveler: 'J. Lin',    airline: 'Emirates',        amount: '$1,840', expires: '2026-04-18', days: 11, status: 'Urgent' },
  { id: 'TC-5503', traveler: 'P. Okafor', airline: 'Delta',           amount: '$980',   expires: '2026-04-22', days: 15, status: 'Urgent' },
  { id: 'TC-2287', traveler: 'C. Roy',    airline: 'Lufthansa',       amount: '$1,200', expires: '2026-05-01', days: 24, status: 'Watch' },
  { id: 'TC-6614', traveler: 'S. Hassan', airline: 'United',          amount: '$760',   expires: '2026-05-10', days: 33, status: 'Watch' },
  { id: 'TC-7731', traveler: 'T. Park',   airline: 'AA',              amount: '$620',   expires: '2026-05-20', days: 43, status: 'OK' },
  { id: 'TC-8890', traveler: 'M. Davis',  airline: 'KLM',             amount: '$2,000', expires: '2026-06-01', days: 55, status: 'OK' },
]

const statusColor = { Critical: 'var(--danger)', Urgent: 'var(--warning)', Watch: 'var(--info)', OK: 'var(--success)' }
const statusBg    = { Critical: 'var(--danger-dim)', Urgent: 'var(--warning-dim)', Watch: 'var(--info-dim)', OK: 'var(--success-dim)' }

const total = credits.reduce((s, c) => s + parseFloat(c.amount.replace(/[$,]/g, '')), 0)

export default function UnusedCredits() {
  const expiring = credits.filter(c => c.days <= 14).length
  return (
    <div>
      <FilterPills />
      <div className={styles.page}>
        <div className={styles.alertBanner}>
          <AlertTriangle size={15} />
          <strong>{expiring} credits</strong> totalling <strong>${credits.filter(c => c.days <= 14).reduce((s,c) => s + parseFloat(c.amount.replace(/[$,]/g,'')), 0).toLocaleString()}</strong> expire within 14 days. Act now to avoid losing these funds.
        </div>

        <PageHeader title="Unused Credits" description="Airline credits with expiry tracking and urgency alerts" />

        <div className={styles.kpiRow}>
          <KPICard title="Total Credits"    value={`$${(total/1000).toFixed(1)}K`} subtitle="Across 7 travelers"  icon={DollarSign}    color="primary" />
          <KPICard title="Expiring < 14d"   value={expiring}                        subtitle="Immediate action"    icon={AlertTriangle} color="danger"  />
          <KPICard title="Avg Expiry"       value="31 days"                         subtitle="Weighted average"    icon={Clock}         color="warning" />
          <KPICard title="Airlines"         value="7"                               subtitle="Across portfolio"    icon={CreditCard}    color="info"    />
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Credit inventory</h3>
          <DataTable
            headers={['Ticket ID', 'Traveler', 'Airline', 'Amount', 'Expires', 'Days left', 'Status']}
            rows={credits.map(c => ({
              'Ticket ID': c.id, 'Traveler': c.traveler, 'Airline': c.airline,
              'Amount': c.amount, 'Expires': c.expires,
              'Days left': c.days, 'Status': c.status,
            }))}
            renderCell={(h, v) => {
              if (h === 'Status') return <span className={styles.badge} style={{ background: statusBg[v], color: statusColor[v] }}>{v}</span>
              if (h === 'Ticket ID') return <code style={{ background: '#F5F4FF', padding: '2px 7px', borderRadius: 5, fontSize: 11, color: '#7C3AED' }}>{v}</code>
              if (h === 'Days left') return <span style={{ fontWeight: 600, color: v <= 14 ? 'var(--danger)' : v <= 30 ? 'var(--warning)' : 'var(--success)' }}>{v}d</span>
              return v
            }}
          />
        </div>
      </div>
    </div>
  )
}
