import { useState } from 'react'
import { Building2, TrendingUp, ShieldAlert, Users, ArrowLeft } from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import FilterPills from '../components/FilterPills'
import styles from './InnerPage.module.css'
import tmcStyles from './TMCPortal.module.css'

const clients = [
  { id: 1, name: 'Acme Corp',        travelers: 48,  spend: 284392, compliance: 78, fraudFlags: 3, color: 'var(--primary)' },
  { id: 2, name: 'Globex Ltd',       travelers: 32,  spend: 198400, compliance: 92, fraudFlags: 0, color: 'var(--success)' },
  { id: 3, name: 'Initech Group',    travelers: 61,  spend: 412000, compliance: 65, fraudFlags: 7, color: 'var(--danger)' },
  { id: 4, name: 'Umbrella Co',      travelers: 19,  spend: 88200,  compliance: 88, fraudFlags: 1, color: 'var(--info)' },
  { id: 5, name: 'Stark Industries', travelers: 104, spend: 920100, compliance: 81, fraudFlags: 4, color: 'var(--warning)' },
]

const trendData = [
  { month: 'Oct', spend: 142 },
  { month: 'Nov', spend: 168 },
  { month: 'Dec', spend: 119 },
  { month: 'Jan', spend: 185 },
  { month: 'Feb', spend: 201 },
  { month: 'Mar', spend: 177 },
]

const complianceColor = c => c >= 85 ? 'var(--success)' : c >= 70 ? 'var(--warning)' : 'var(--danger)'
const complianceBg    = c => c >= 85 ? 'var(--success-dim)' : c >= 70 ? 'var(--warning-dim)' : 'var(--danger-dim)'

export default function TMCPortal() {
  const [selected, setSelected] = useState(null)
  const client = clients.find(c => c.id === selected)

  if (client) {
    return (
      <div>
        <FilterPills />
        <div className={styles.page}>
          <button className={tmcStyles.back} onClick={() => setSelected(null)}>
            <ArrowLeft size={14} /> Back to portfolio
          </button>
          <PageHeader title={client.name} description={`${client.travelers} travelers · $${(client.spend/1000).toFixed(0)}K spend`} />

          <div className={styles.kpiRow}>
            <KPICard title="Total Spend"     value={`$${(client.spend/1000).toFixed(0)}K`} subtitle="Q2 2025"        icon={TrendingUp}  color="primary" />
            <KPICard title="Travelers"       value={client.travelers}                        subtitle="Active"         icon={Users}       color="info"    />
            <KPICard title="Compliance"      value={`${client.compliance}%`}                 subtitle="vs 90% target"  icon={ShieldAlert} color={client.compliance >= 85 ? 'success' : 'warning'} />
            <KPICard title="Fraud Flags"     value={client.fraudFlags}                       subtitle="Open items"     icon={ShieldAlert} color={client.fraudFlags > 3 ? 'danger' : 'warning'} />
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Monthly spend trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE9FE" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #EDE9FE', borderRadius: 8, fontSize: 13 }}
                  formatter={v => [`$${v}K`, 'Spend']} />
                <Line type="monotone" dataKey="spend" stroke={client.color} strokeWidth={2.5} dot={{ r: 4, fill: client.color }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <FilterPills />
      <div className={styles.page}>
        <PageHeader title="TMC Portal" description="Client portfolio — click any client to view full dashboard" />

        <div className={tmcStyles.grid}>
          {clients.map(c => (
            <button key={c.id} className={tmcStyles.clientCard} onClick={() => setSelected(c.id)}>
              <div className={tmcStyles.clientHeader}>
                <div className={tmcStyles.clientIcon} style={{ background: c.color + '20', color: c.color }}>
                  <Building2 size={18} />
                </div>
                <div>
                  <div className={tmcStyles.clientName}>{c.name}</div>
                  <div className={tmcStyles.clientMeta}>{c.travelers} travelers</div>
                </div>
                {c.fraudFlags > 0 && (
                  <span className={tmcStyles.fraudBadge}>{c.fraudFlags} flags</span>
                )}
              </div>

              <div className={tmcStyles.clientSpend}>${(c.spend/1000).toFixed(0)}K</div>
              <div className={tmcStyles.clientLabel}>Q2 spend</div>

              <div className={tmcStyles.compBar}>
                <div className={tmcStyles.compTrack}>
                  <div className={tmcStyles.compFill}
                    style={{ width: `${c.compliance}%`, background: complianceColor(c.compliance) }} />
                </div>
                <span style={{ color: complianceColor(c.compliance), fontWeight: 700, fontSize: 12 }}>
                  {c.compliance}%
                </span>
              </div>
              <div className={tmcStyles.compLabel}>Compliance</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
