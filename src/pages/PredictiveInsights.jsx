import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid, ReferenceLine, Area, AreaChart
} from 'recharts'
import { Brain, TrendingUp, CalendarClock, Sparkles } from 'lucide-react'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import FilterPills from '../components/FilterPills'
import styles from './InnerPage.module.css'

const forecast = [
  { month: 'Jan', actual: 142000, predicted: null,   lo: null,   hi: null   },
  { month: 'Feb', actual: 168000, predicted: null,   lo: null,   hi: null   },
  { month: 'Mar', actual: 177000, predicted: null,   lo: null,   hi: null   },
  { month: 'Apr', actual: null,   predicted: 192000, lo: 178000, hi: 206000 },
  { month: 'May', actual: null,   predicted: 208000, lo: 190000, hi: 226000 },
  { month: 'Jun', actual: null,   predicted: 215000, lo: 194000, hi: 236000 },
]

const insights = [
  { tag: 'High Impact', title: 'Q2 Spend Surge Expected', detail: 'Conference season drives +18% travel volume April–June. Pre-negotiate group fares now.', color: '#7C3AED', confidence: 91 },
  { tag: 'Urgent',      title: 'Hotel Rate Increase — EMEA', detail: 'London & Frankfurt rates forecast +12% in May. Lock in Q2 rates before April 20.', color: '#EF4444', confidence: 88 },
  { tag: 'Quick Win',   title: 'SFO–NYC Route Optimisation', detail: 'Tuesday departures save avg $210/ticket based on 6-month model across 18 bookings.', color: '#10B981', confidence: 85 },
  { tag: 'Medium',      title: 'Unused Loyalty Points', detail: '~14,200 points expiring within 60 days across 8 travelers. Coordinate redemption.', color: '#F59E0B', confidence: 79 },
]

export default function PredictiveInsights() {
  return (
    <div>
      <FilterPills />
      <div className={styles.page}>
        <PageHeader title="Predictive Insights" description="ML-driven forecasts with confidence bands" />

        <div className={styles.kpiRow}>
          <KPICard title="Q2 Forecast"    value="$615K"  subtitle="+14% vs Q1"    icon={TrendingUp}    color="primary" trend={14} />
          <KPICard title="Model Accuracy" value="91.2%"  subtitle="Last 6 months" icon={Brain}         color="info"    />
          <KPICard title="Next Alert"     value="Apr 20" subtitle="Hotel rates"    icon={CalendarClock} color="warning" />
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Spend forecast — next 6 months</h3>
          <p className={styles.cardSubtitle}>Shaded area = 80% confidence band</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={forecast} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8B5CF6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDE9FE" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #EDE9FE', borderRadius: 8, fontSize: 13 }}
                formatter={v => v ? [`$${v?.toLocaleString()}`, ''] : [null]} />
              <ReferenceLine x="Mar" stroke="#EDE9FE" strokeDasharray="4 4"
                label={{ value: 'Today', fill: '#94A3B8', fontSize: 11 }} />
              <Area type="monotone" dataKey="hi" stroke="none" fill="url(#bandGrad)" connectNulls={false} />
              <Area type="monotone" dataKey="lo" stroke="none" fill="#fff" connectNulls={false} />
              <Line type="monotone" dataKey="actual"    stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4, fill: '#7C3AED' }} connectNulls={false} />
              <Line type="monotone" dataKey="predicted" stroke="#10B981" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4, fill: '#10B981' }} connectNulls={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 16, height: 3, background: '#7C3AED', display: 'inline-block', borderRadius: 99 }} /> Actual
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 16, height: 3, background: '#10B981', display: 'inline-block', borderRadius: 99, borderTop: '2px dashed #10B981' }} /> Forecast
            </span>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>AI-generated recommendations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {insights.map((ins, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                padding: '14px 0',
                borderBottom: i < insights.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{
                  flexShrink: 0, marginTop: 2,
                  background: ins.color + '18', color: ins.color,
                  padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}>{ins.tag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{ins.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{ins.detail}</div>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: ins.color }}>{ins.confidence}%</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>confidence</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
