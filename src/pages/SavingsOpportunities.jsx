import { TrendingDown, DollarSign, Zap } from 'lucide-react'
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import styles from './InnerPage.module.css'

const opportunities = [
  { category: 'Advance Booking',    potential: 31200, description: 'Book 14+ days ahead to capture lowest fares' },
  { category: 'Preferred Hotels',   potential: 18500, description: 'Route to negotiated hotel rates vs open market' },
  { category: 'Rail vs Air',        potential: 14800, description: 'Substitute air with rail on routes < 3 hrs' },
  { category: 'Group Rates',        potential: 11200, description: 'Consolidate 3+ travelers on same routes' },
  { category: 'Unused Credits',     potential: 8600,  description: 'Apply $8.6K in accumulated airline credits' },
]

const COLORS = ['#1f6feb', '#388bfd', '#2ea043', '#3fb950', '#a371f7']
const pieData = opportunities.map((o, i) => ({ name: o.category, value: o.potential, fill: COLORS[i] }))

export default function SavingsOpportunities() {
  const total = opportunities.reduce((s, o) => s + o.potential, 0)
  return (
    <div className={styles.page}>
      <PageHeader
        title="Savings Opportunities"
        description="AI-identified gaps between current spend and optimized travel policy"
      />
      <div className={styles.kpiRow}>
        <KPICard title="Total Potential Savings" value={`$${(total/1000).toFixed(1)}K`} subtitle="Next 12 months" icon={DollarSign}   color="green" />
        <KPICard title="Quick Wins"              value="3"                                subtitle="Implement now"   icon={Zap}         color="blue"  />
        <KPICard title="Avg ROI"                 value="4.2x"                             subtitle="On policy changes" icon={TrendingDown} color="purple" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Savings Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                paddingAngle={3} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1c2333', border: '1px solid #30363d', borderRadius: 8, fontSize: 13 }}
                formatter={v => [`$${v.toLocaleString()}`, '']} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#8b949e' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Opportunities</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {opportunities.map((o, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{o.category}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{o.description}</div>
                </div>
                <span className={styles.positiveTag} style={{ flexShrink: 0 }}>${o.potential.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
