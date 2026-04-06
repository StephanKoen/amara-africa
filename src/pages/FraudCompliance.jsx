import { ShieldAlert, ShieldCheck, AlertCircle } from 'lucide-react'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import styles from './InnerPage.module.css'

const flags = [
  { id: 'F-001', type: 'Duplicate Receipt',     traveler: 'A. Brooks', amount: '$412',   date: '2026-03-14', risk: 'High' },
  { id: 'F-002', type: 'Personal Expense',       traveler: 'J. Lin',    amount: '$89',    date: '2026-03-18', risk: 'Medium' },
  { id: 'F-003', type: 'Unapproved Vendor',      traveler: 'P. Okafor', amount: '$670',   date: '2026-03-21', risk: 'High' },
  { id: 'F-004', type: 'Policy Limit Exceeded',  traveler: 'C. Roy',    amount: '$285',   date: '2026-03-25', risk: 'Medium' },
  { id: 'F-005', type: 'Missing Receipt',        traveler: 'S. Hassan', amount: '$156',   date: '2026-03-28', risk: 'Low' },
  { id: 'F-006', type: 'Weekend Travel',         traveler: 'T. Park',   amount: '$1,100', date: '2026-03-30', risk: 'Medium' },
  { id: 'F-007', type: 'Duplicate Claim',        traveler: 'M. Davis',  amount: '$220',   date: '2026-04-01', risk: 'High' },
  { id: 'F-008', type: 'Unapproved Upgrade',     traveler: 'N. Reyes',  amount: '$480',   date: '2026-04-02', risk: 'Medium' },
  { id: 'F-009', type: 'Blackout Period',        traveler: 'B. Mwangi', amount: '$940',   date: '2026-04-03', risk: 'Low' },
]

const riskColor = { High: styles.diffTag, Medium: styles.warnTag, Low: styles.positiveTag }

export default function FraudCompliance() {
  const high = flags.filter(f => f.risk === 'High').length
  return (
    <div className={styles.page}>
      <PageHeader
        title="Fraud & Compliance"
        description="Automated flagging of suspicious expenses and policy violations"
      />
      <div className={styles.kpiRow}>
        <KPICard title="Total Flags"     value={flags.length} subtitle="Pending review"   icon={ShieldAlert} color="red"    />
        <KPICard title="High Risk"       value={high}         subtitle="Immediate action" icon={AlertCircle} color="yellow" />
        <KPICard title="Compliance Rate" value="81.4%"        subtitle="vs 90% target"    icon={ShieldCheck} color="green"  />
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Flagged Transactions</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>ID</th><th>Type</th><th>Traveler</th><th>Amount</th><th>Date</th><th>Risk</th></tr>
            </thead>
            <tbody>
              {flags.map(f => (
                <tr key={f.id}>
                  <td><code style={{ background: 'var(--bg-elevated)', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>{f.id}</code></td>
                  <td>{f.type}</td>
                  <td>{f.traveler}</td>
                  <td>{f.amount}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{f.date}</td>
                  <td><span className={riskColor[f.risk]}>{f.risk}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
