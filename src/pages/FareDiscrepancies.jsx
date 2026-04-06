import { AlertTriangle, TrendingUp, Plane } from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, Cell
} from 'recharts'
import PageHeader from '../components/PageHeader'
import KPICard from '../components/KPICard'
import styles from './InnerPage.module.css'

const discrepancies = [
  { route: 'NYC → LON', booked: 1840, market: 1290, diff: 550, traveler: 'J. Patel' },
  { route: 'SFO → SIN', booked: 2200, market: 1750, diff: 450, traveler: 'A. Kim' },
  { route: 'CHI → PAR', booked: 1650, market: 1310, diff: 340, traveler: 'M. Torres' },
  { route: 'LAX → FRA', booked: 1920, market: 1640, diff: 280, traveler: 'S. Chen' },
  { route: 'BOS → DXB', booked: 2400, market: 2160, diff: 240, traveler: 'R. Osei' },
  { route: 'MIA → MAD', booked: 1350, market: 1140, diff: 210, traveler: 'L. Nguyen' },
]

const chartData = discrepancies.map(d => ({ route: d.route.split(' → ')[1], diff: d.diff }))

export default function FareDiscrepancies() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Fare Discrepancies"
        description="Routes where booked fares exceeded best available market rates"
      />

      <div className={styles.kpiRow}>
        <KPICard title="Total Overspend"  value="$2,070"  subtitle="Across 6 routes"  icon={TrendingUp}    color="red"    />
        <KPICard title="Avg Discrepancy"  value="$345"    subtitle="Per booking"       icon={AlertTriangle} color="yellow" />
        <KPICard title="Routes Flagged"   value="6"       subtitle="Last 30 days"      icon={Plane}         color="blue"   />
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Overspend by Route</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
            <XAxis dataKey="route" tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
            <Tooltip contentStyle={{ background: '#1c2333', border: '1px solid #30363d', borderRadius: 8, fontSize: 13 }}
              formatter={v => [`$${v}`, 'Overspend']} />
            <Bar dataKey="diff" radius={[4,4,0,0]}>
              {chartData.map((_, i) => <Cell key={i} fill={i === 0 ? '#f85149' : '#da3633'} opacity={1 - i * 0.1} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Flagged Bookings</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Route</th><th>Booked ($)</th><th>Market Rate ($)</th><th>Overspend ($)</th><th>Traveler</th>
              </tr>
            </thead>
            <tbody>
              {discrepancies.map((d, i) => (
                <tr key={i}>
                  <td><span className={styles.routeTag}>{d.route}</span></td>
                  <td>{d.booked.toLocaleString()}</td>
                  <td>{d.market.toLocaleString()}</td>
                  <td><span className={styles.diffTag}>+${d.diff}</span></td>
                  <td>{d.traveler}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
