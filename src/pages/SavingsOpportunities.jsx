import { ResponsiveContainer, FunnelChart, Funnel, LabelList, Tooltip } from 'recharts'
import { DollarSign, Zap, TrendingDown, Target } from 'lucide-react'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import FilterPills from '../components/FilterPills'
import styles from './InnerPage.module.css'
import savStyles from './SavingsOpportunities.module.css'

const opportunities = [
  { title: 'Advance booking',     impact: 18200, effort: 'Low',    detail: 'Book 14+ days ahead — capture 22% lower fares on 60% of routes', color: '#7C3AED' },
  { title: 'Hotel consolidation', impact: 12400, effort: 'Medium', detail: 'Route to 3 preferred hotels; currently 14 vendors used', color: '#0EA5E9' },
  { title: 'Rail substitution',   impact: 8600,  effort: 'Low',    detail: 'Replace air with rail on 8 routes under 3 hours', color: '#10B981' },
  { title: 'Group rate pooling',  impact: 6800,  effort: 'High',   detail: 'Consolidate 4+ same-route travelers for negotiated fares', color: '#F59E0B' },
  { title: 'Unused credits',      impact: 9800,  effort: 'Low',    detail: '$9.8K in airline credits expiring within 30 days', color: '#EC4899' },
]

const effortColor = { Low: 'var(--success)', Medium: 'var(--warning)', High: 'var(--danger)' }
const effortBg    = { Low: 'var(--success-dim)', Medium: 'var(--warning-dim)', High: 'var(--danger-dim)' }

const total = opportunities.reduce((s, o) => s + o.impact, 0)

export default function SavingsOpportunities() {
  return (
    <div>
      <FilterPills />
      <div className={styles.page}>
        <PageHeader title="Savings Opportunities" description="AI-ranked cost reductions by impact and effort" />

        <div className={styles.kpiRow}>
          <KPICard title="Total Identified"  value={`$${(total/1000).toFixed(0)}K`} subtitle="Next 12 months"    icon={DollarSign}   color="success" trend={-15} />
          <KPICard title="Quick Wins"        value="3"                               subtitle="Low effort"         icon={Zap}           color="primary" />
          <KPICard title="Avg ROI"           value="4.2x"                            subtitle="On policy changes"  icon={TrendingDown}  color="info"    />
          <KPICard title="Implementation"    value="2–4 wks"                         subtitle="To first savings"   icon={Target}        color="warning" />
        </div>

        <div className={savStyles.oppGrid}>
          {opportunities.map((o, i) => (
            <div key={i} className={savStyles.oppCard}>
              <div className={savStyles.oppHeader}>
                <div className={savStyles.oppRank} style={{ background: o.color + '20', color: o.color }}>
                  #{i + 1}
                </div>
                <span className={styles.badge} style={{ background: effortBg[o.effort], color: effortColor[o.effort] }}>
                  {o.effort} effort
                </span>
              </div>
              <div className={savStyles.oppTitle}>{o.title}</div>
              <div className={savStyles.oppDetail}>{o.detail}</div>
              <div className={savStyles.oppFooter}>
                <div className={savStyles.oppImpact} style={{ color: o.color }}>
                  ${o.impact.toLocaleString()}
                </div>
                <span className={savStyles.oppLabel}>annual savings</span>
              </div>
              <div className={savStyles.oppBar}>
                <div className={savStyles.oppBarFill}
                  style={{ width: `${(o.impact / opportunities[0].impact) * 100}%`, background: o.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
