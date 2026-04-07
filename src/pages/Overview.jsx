import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts'
import { Sparkles, ArrowRight } from 'lucide-react'
import FilterPills from '../components/FilterPills'
import AlertCard from '../components/AlertCard'
import styles from './Overview.module.css'

const pieData = [
  { name: 'Air',         value: 142000, color: '#7C3AED' },
  { name: 'Hotels',      value: 84000,  color: '#0EA5E9' },
  { name: 'Car rental',  value: 31000,  color: '#10B981' },
  { name: 'Rail & other',value: 27000,  color: '#F59E0B' },
]

const deptData = [
  { name: 'Sales',              value: 100300, color: 'linear-gradient(90deg,#7C3AED,#8B5CF6)' },
  { name: 'Executive & Admin',  value: 98004,  color: 'linear-gradient(90deg,#7C3AED,#8B5CF6)' },
  { name: 'Engineering',        value: 48200,  color: 'linear-gradient(90deg,#0EA5E9,#38BDF8)' },
  { name: 'Marketing',          value: 37888,  color: 'linear-gradient(90deg,#10B981,#34D399)' },
  { name: 'Operations',         value: 1289,   color: 'linear-gradient(90deg,#F59E0B,#FCD34D)' },
]

const cityPairs = [
  { pair: 'JNB → CPT', value: 85, amount: '$42,100' },
  { pair: 'JNB → LHR', value: 70, amount: '$38,400' },
  { pair: 'JNB → NYC', value: 55, amount: '$29,800' },
  { pair: 'CPT → DUR', value: 30, amount: '$14,200' },
]

const savingsPipeline = [
  { label: 'Advance booking', value: 75, amount: '$18,200' },
  { label: 'Hotel consolidation', value: 60, amount: '$12,400' },
  { label: 'Car rental', value: 40, amount: '$6,800' },
  { label: 'Route optimisation', value: 25, amount: '$3,600' },
]

const maxDept = Math.max(...deptData.map(d => d.value))

const RADIAN = Math.PI / 180
function CustomLabel({ cx, cy }) {
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
      <tspan x={cx} dy="-6" style={{ fontSize: 13, fill: '#94A3B8', fontWeight: 500 }}>Total</tspan>
      <tspan x={cx} dy="20" style={{ fontSize: 20, fill: '#1a0533', fontWeight: 800 }}>$284K</tspan>
    </text>
  )
}

export default function Overview() {
  return (
    <div className={styles.pageWrap}>
      <FilterPills />
      <div className={styles.page}>

        {/* Hero Banner */}
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.heroLabel}>TOTAL TRAVEL SPEND</div>
            <div className={styles.heroAmount}>$284,392</div>
            <div className={styles.heroSub}>Q2 2025 · 312 trips · 48 travelers</div>
            <div className={styles.heroPills}>
              <span className={styles.pill} style={{ background: 'rgba(239,68,68,0.25)', color: '#FCA5A5' }}>4 fraud flags</span>
              <span className={styles.pill} style={{ background: 'rgba(245,158,11,0.25)', color: '#FCD34D' }}>$9.8K expiring</span>
              <span className={styles.pill} style={{ background: 'rgba(16,185,129,0.25)', color: '#6EE7B7' }}>$41K savings found</span>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroStat}>
              <div className={styles.heroStatLabel}>Avg spend per trip</div>
              <div className={styles.heroStatValue}>$911</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.heroStatLabel}>Compliance rate</div>
              <div className={styles.heroStatValue}>78%</div>
            </div>
          </div>
        </div>

        {/* 2-col row */}
        <div className={styles.twoCol}>
          {/* Spend by category */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Spend by category</div>
            <div className={styles.donutWrap}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                    dataKey="value" paddingAngle={2} labelLine={false}
                    label={<CustomLabel />}
                  >
                    {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={v => [`$${(v/1000).toFixed(0)}K`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.legend}>
                {pieData.map(d => (
                  <div key={d.name} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: d.color }} />
                    <span className={styles.legendName}>{d.name}</span>
                    <span className={styles.legendVal}>${(d.value/1000).toFixed(0)}K</span>
                  </div>
                ))}
              </div>
            </div>
            <span className={styles.link}>Full breakdown <ArrowRight size={12} /></span>
          </div>

          {/* Cost per dept */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Cost per dept</div>
            <div className={styles.cardSubtitle}>Average $343/day</div>
            <div className={styles.deptList}>
              {deptData.map(d => (
                <div key={d.name} className={styles.deptRow}>
                  <div className={styles.deptName}>{d.name}</div>
                  <div className={styles.deptBarTrack}>
                    <div className={styles.deptBarFill}
                      style={{ width: `${(d.value / maxDept) * 100}%`, background: d.color }} />
                  </div>
                  <div className={styles.deptAmount}>${(d.value/1000).toFixed(0)}K</div>
                </div>
              ))}
            </div>
            <div className={styles.aiBox}>
              <Sparkles size={13} style={{ flexShrink: 0, marginTop: 1 }} />
              Your average flights price is $20 lower than similar companies
            </div>
            <span className={styles.link}>Show 12 more <ArrowRight size={12} /></span>
          </div>
        </div>

        {/* 3-col row */}
        <div className={styles.threeCol}>
          {/* Active alerts */}
          <div className={styles.alertsCol}>
            <div className={styles.cardTitle}>Active alerts</div>
            <AlertCard
              tag="High priority" tagColor="danger"
              title="Fraud detected"
              value="$320 at risk"
              cta="Investigate now"
              ctaAmount="$320"
              gradient="linear-gradient(135deg, #DC2626, #EF4444)"
            />
            <AlertCard
              tag="Quick win" tagColor="success"
              title="Savings opportunity"
              value="$10,400/qtr"
              cta="View opportunity"
              ctaAmount="$10.4K"
              gradient="linear-gradient(135deg, #059669, #10B981)"
            />
            <AlertCard
              tag="8 days left" tagColor="warning"
              title="Credits expiring"
              value="$9,800 at risk"
              cta="Use credits now"
              ctaAmount="$9.8K"
              gradient="linear-gradient(135deg, #D97706, #F59E0B)"
            />
          </div>

          {/* Top city pairs */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Top city pairs</div>
            {cityPairs.map(c => (
              <div key={c.pair} className={styles.barRow}>
                <div className={styles.barLabel}>{c.pair}</div>
                <div className={styles.barTrack}>
                  <div className={styles.barFillGrad} style={{ width: `${c.value}%` }} />
                </div>
                <div className={styles.barAmt}>{c.amount}</div>
              </div>
            ))}
          </div>

          {/* Savings pipeline */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Savings pipeline</div>
            {savingsPipeline.map(s => (
              <div key={s.label} className={styles.barRow}>
                <div className={styles.barLabel}>{s.label}</div>
                <div className={styles.barTrack}>
                  <div className={styles.barFillGreen} style={{ width: `${s.value}%` }} />
                </div>
                <div className={styles.barAmt}>{s.amount}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
