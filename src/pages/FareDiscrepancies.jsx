import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'
import { AlertTriangle, TrendingUp, Plane } from 'lucide-react'
import KPICard from '../components/KPICard'
import DataTable from '../components/DataTable'
import PageHeader from '../components/PageHeader'
import FilterPills from '../components/FilterPills'
import styles from './InnerPage.module.css'

const discrepancies = [
  { route: 'JNB → LHR', booked: 2840, ota: 2190, excess: 650, traveler: 'J. Patel', severity: 'High' },
  { route: 'NYC → LON', booked: 1840, ota: 1290, excess: 550, traveler: 'A. Kim',   severity: 'High' },
  { route: 'SFO → SIN', booked: 2200, ota: 1750, excess: 450, traveler: 'M. Torres',severity: 'Medium' },
  { route: 'CHI → PAR', booked: 1650, ota: 1310, excess: 340, traveler: 'S. Chen',  severity: 'Medium' },
  { route: 'LAX → FRA', booked: 1920, ota: 1640, excess: 280, traveler: 'R. Osei',  severity: 'Low' },
  { route: 'MIA → MAD', booked: 1350, ota: 1140, excess: 210, traveler: 'L. Nguyen',severity: 'Low' },
]

const chartData = discrepancies.map(d => ({ route: d.route.split(' → ')[1], excess: d.excess }))

const sevColor = { High: 'var(--danger)', Medium: 'var(--warning)', Low: 'var(--success)' }
const sevBg    = { High: 'var(--danger-dim)', Medium: 'var(--warning-dim)', Low: 'var(--success-dim)' }

export default function FareDiscrepancies() {
  return (
    <div>
      <FilterPills />
      <div className={styles.page}>
        <PageHeader title="Fare Discrepancies" description="Booked fares vs OTA benchmark — excess spend by route" />

        <div className={styles.kpiRow}>
          <KPICard title="Total Excess Spend" value="$2,480"  subtitle="Across 6 routes"   icon={TrendingUp}    color="danger"  trend={-8}  />
          <KPICard title="Avg Discrepancy"    value="$413"   subtitle="Per booking"         icon={AlertTriangle} color="warning" trend={3}   />
          <KPICard title="Routes Flagged"     value="6"      subtitle="Last 30 days"        icon={Plane}         color="primary" />
          <KPICard title="Potential Recovery" value="$1,240" subtitle="If policy enforced"  icon={TrendingUp}    color="success" />
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Excess spend by destination</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDE9FE" vertical={false} />
              <XAxis dataKey="route" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #EDE9FE', borderRadius: 8, fontSize: 13 }}
                formatter={v => [`$${v}`, 'Excess']} />
              <Bar dataKey="excess" radius={[6,6,0,0]}>
                {chartData.map((_, i) => <Cell key={i} fill={i < 2 ? '#EF4444' : i < 4 ? '#F59E0B' : '#10B981'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Flagged bookings</h3>
          <DataTable
            headers={['Route', 'Booked ($)', 'OTA Rate ($)', 'Excess ($)', 'Traveler', 'Severity']}
            rows={discrepancies.map(d => ({
              'Route': d.route,
              'Booked ($)': d.booked.toLocaleString(),
              'OTA Rate ($)': d.ota.toLocaleString(),
              'Excess ($)': `+$${d.excess}`,
              'Traveler': d.traveler,
              'Severity': d.severity,
            }))}
            renderCell={(h, v) => {
              if (h === 'Severity') return (
                <span className={styles.badge} style={{ background: sevBg[v], color: sevColor[v] }}>{v}</span>
              )
              if (h === 'Excess ($)') return <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{v}</span>
              return v
            }}
          />
        </div>
      </div>
    </div>
  )
}
