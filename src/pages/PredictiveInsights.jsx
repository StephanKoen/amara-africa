import { Brain, TrendingUp, CalendarClock } from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid, ReferenceLine
} from 'recharts'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import styles from './InnerPage.module.css'

const forecast = [
  { month: 'Mar', actual: 177000, predicted: null },
  { month: 'Apr', actual: null,   predicted: 192000 },
  { month: 'May', actual: null,   predicted: 208000 },
  { month: 'Jun', actual: null,   predicted: 215000 },
  { month: 'Jul', actual: null,   predicted: 199000 },
  { month: 'Aug', actual: null,   predicted: 186000 },
]

const insights = [
  { title: 'Q2 Spend Surge Expected',    detail: 'Conference season drives +18% travel volume April–June. Pre-negotiate group fares.',  tag: 'High Impact' },
  { title: 'Hotel Rate Increase — EMEA', detail: 'London & Frankfurt rates forecast up 12% in May. Lock in Q2 rates by Apr 20.',         tag: 'Urgent' },
  { title: 'SFO–NYC Route Optimization', detail: 'Shifting bookings to Tuesday departures saves avg $210/ticket based on 6-month model.', tag: 'Quick Win' },
  { title: 'Unused Loyalty Points',      detail: '~14,200 points expiring within 60 days across 8 travelers. Coordinate redemption.',     tag: 'Medium' },
]

const tagColors = {
  'High Impact': { bg: 'rgba(31,111,235,0.12)',  color: 'var(--blue-light)' },
  'Urgent':      { bg: 'rgba(218,54,51,0.12)',   color: 'var(--red-light)' },
  'Quick Win':   { bg: 'rgba(46,160,67,0.12)',   color: 'var(--green-light)' },
  'Medium':      { bg: 'rgba(210,153,34,0.12)',  color: 'var(--yellow-light)' },
}

export default function PredictiveInsights() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Predictive Insights"
        description="ML-driven forecasts to stay ahead of travel spend patterns"
      />
      <div className={styles.kpiRow}>
        <KPICard title="Q2 Forecast"    value="$615K"  subtitle="+14% vs Q1"    icon={TrendingUp}    color="blue"   />
        <KPICard title="Model Accuracy" value="91.2%"  subtitle="Last 6 months" icon={Brain}         color="purple" />
        <KPICard title="Next Alert"     value="Apr 20" subtitle="Hotel rates"    icon={CalendarClock} color="yellow" />
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Spend Forecast (Next 6 Months)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={forecast} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false}
              tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: '#1c2333', border: '1px solid #30363d', borderRadius: 8, fontSize: 13 }}
              formatter={v => [`$${v?.toLocaleString()}`, '']} />
            <ReferenceLine x="Mar" stroke="#30363d" strokeDasharray="4 4" label={{ value: 'Today', fill: '#8b949e', fontSize: 11 }} />
            <Line type="monotone" dataKey="actual"    stroke="#1f6feb" strokeWidth={2} dot={{ r: 4 }} connectNulls={false} />
            <Line type="monotone" dataKey="predicted" stroke="#3fb950" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 16, height: 2, background: '#1f6feb', display: 'inline-block' }} /> Actual
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 16, height: 2, background: '#3fb950', display: 'inline-block', borderTop: '2px dashed #3fb950' }} /> Forecast
          </span>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>AI-Generated Recommendations</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {insights.map((ins, i) => {
            const tc = tagColors[ins.tag]
            return (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderBottom: i < insights.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ flexShrink: 0, marginTop: 2, background: tc.bg, color: tc.color, padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {ins.tag}
                </span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{ins.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{ins.detail}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
