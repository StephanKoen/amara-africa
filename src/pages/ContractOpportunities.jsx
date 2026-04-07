import { FileText, Target, TrendingUp, Sparkles } from 'lucide-react'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import FilterPills from '../components/FilterPills'
import styles from './InnerPage.module.css'
import cStyles from './ContractOpportunities.module.css'

const vendors = [
  { name: 'British Airways', category: 'Air',      spend: 84000,  threshold: 100000, pct: 84, rec: 'You are $16K away from a 12% volume discount. Accelerate Q3 bookings.' },
  { name: 'Marriott',        category: 'Hotel',    spend: 52000,  threshold: 60000,  pct: 87, rec: 'Consolidating 4 more properties to Marriott triggers a preferred rate agreement.' },
  { name: 'Hertz',           category: 'Car',      spend: 18400,  threshold: 25000,  pct: 74, rec: 'Route all car rentals through Hertz to unlock $340/month flat-rate benefit.' },
  { name: 'Lufthansa',       category: 'Air',      spend: 38000,  threshold: 50000,  pct: 76, rec: 'LH corporate program unlocks lounge access + 8% fare reduction above $50K.' },
  { name: 'Hilton',          category: 'Hotel',    spend: 29000,  threshold: 40000,  pct: 73, rec: 'Adding 2 cities to Hilton HHonors corporate program reduces avg nightly rate by $42.' },
]

const catColor = { Air: '#7C3AED', Hotel: '#0EA5E9', Car: '#10B981' }

export default function ContractOpportunities() {
  return (
    <div>
      <FilterPills />
      <div className={styles.page}>
        <PageHeader title="Contract Opportunities" description="Vendor spend vs threshold — unlock discounts and preferred rates" />

        <div className={styles.kpiRow}>
          <KPICard title="Vendors Tracked"     value="5"      subtitle="Active contracts"    icon={FileText}   color="primary" />
          <KPICard title="Near Threshold"      value="3"      subtitle="Within 20% of target" icon={Target}    color="warning" />
          <KPICard title="Unlockable Savings"  value="$28K"   subtitle="If thresholds hit"   icon={TrendingUp} color="success" />
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Vendor spend vs contract threshold</h3>
          <div className={cStyles.vendorList}>
            {vendors.map(v => (
              <div key={v.name} className={cStyles.vendorCard}>
                <div className={cStyles.vendorHeader}>
                  <div>
                    <div className={cStyles.vendorName}>{v.name}</div>
                    <div className={cStyles.vendorCat} style={{ color: catColor[v.category] }}>{v.category}</div>
                  </div>
                  <div className={cStyles.vendorPct} style={{ color: v.pct >= 85 ? 'var(--success)' : 'var(--warning)' }}>
                    {v.pct}%
                  </div>
                </div>

                <div className={cStyles.progressWrap}>
                  <div className={cStyles.progressTrack}>
                    <div className={cStyles.progressFill}
                      style={{ width: `${v.pct}%`, background: catColor[v.category] }} />
                    <div className={cStyles.thresholdLine} />
                  </div>
                  <div className={cStyles.progressLabels}>
                    <span>${(v.spend/1000).toFixed(0)}K spent</span>
                    <span>${(v.threshold/1000).toFixed(0)}K target</span>
                  </div>
                </div>

                <div className={styles.aiBox}>
                  <Sparkles size={13} style={{ flexShrink: 0, marginTop: 1 }} />
                  {v.rec}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
