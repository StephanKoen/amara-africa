import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
} from 'recharts'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { MapContainer, TileLayer, Circle, Marker } from 'react-leaflet'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import FilterPills from '../components/FilterPills'
import AlertCard from '../components/AlertCard'
import { useTravelData } from '../context/TravelDataContext'
import { riskEvents } from '../data/riskData'
import { matchRisksToTravelers, getTravelerLocations } from '../utils/riskMatcher'
import styles from './Overview.module.css'

// Fix Leaflet default icons
const DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow })
L.Marker.prototype.options.icon = DefaultIcon

const SEVERITY_STYLES = {
  critical: { fillColor: '#EF4444', color: '#EF4444', fillOpacity: 0.25, opacity: 0.8 },
  high:     { fillColor: '#F59E0B', color: '#F59E0B', fillOpacity: 0.2,  opacity: 0.7 },
  medium:   { fillColor: '#3B82F6', color: '#3B82F6', fillOpacity: 0.15, opacity: 0.6 },
  low:      { fillColor: '#10B981', color: '#10B981', fillOpacity: 0.08, opacity: 0.5 },
}

function miniTravelerIcon(isAtRisk) {
  const color = isAtRisk ? '#EF4444' : '#3B82F6'
  const glow = isAtRisk ? '239,68,68' : '59,130,246'
  return L.divIcon({
    className: '',
    html: `<div style="width:10px;height:10px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 6px rgba(${glow},0.8);"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  })
}

const PIE_COLORS = {
  Air:   '#7C3AED',
  Hotel: '#0EA5E9',
  Car:   '#10B981',
  Other: '#F59E0B',
}
const DEPT_COLORS = [
  'linear-gradient(90deg,#7C3AED,#8B5CF6)',
  'linear-gradient(90deg,#0EA5E9,#38BDF8)',
  'linear-gradient(90deg,#10B981,#34D399)',
  'linear-gradient(90deg,#F59E0B,#FCD34D)',
  'linear-gradient(90deg,#EC4899,#F472B6)',
]

function fmt(n) {
  if (n == null) return '—'
  if (n >= 1000000) return `$${(n/1000000).toFixed(1)}M`
  if (n >= 1000)    return `$${(n/1000).toFixed(0)}K`
  return `$${Math.round(n).toLocaleString()}`
}

function CustomLabel({ cx, cy, total }) {
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
      <tspan x={cx} dy="-6" style={{ fontSize: 13, fill: '#94A3B8', fontWeight: 500 }}>Total</tspan>
      <tspan x={cx} dy="20" style={{ fontSize: 18, fill: '#1a0533', fontWeight: 800 }}>{fmt(total)}</tspan>
    </text>
  )
}

export default function Overview() {
  const navigate = useNavigate()
  const { filteredStats, filteredRecords } = useTravelData()
  const s = filteredStats
  const records = filteredRecords || []

  const travelerLocations = useMemo(() => getTravelerLocations(records), [records])
  const matchedRisks      = useMemo(() => matchRisksToTravelers(riskEvents, records), [records])
  const atRiskNames = useMemo(() => {
    const set = new Set()
    matchedRisks.forEach(r => r.affectedTravelers?.forEach(t => set.add(t.traveler)))
    return set
  }, [matchedRisks])
  const totalAtRisk = matchedRisks.reduce((n, r) => n + r.affectedCount, 0)
  const topAlerts   = matchedRisks.slice(0, 3)

  // Pie chart from real category breakdown
  const pieData = s?.categoryBreakdown?.map(c => ({
    name:  c.name,
    value: c.value,
    color: PIE_COLORS[c.name] || '#94A3B8',
  })) || []

  // Dept bars
  const deptData = (s?.departmentBreakdown || []).slice(0, 5).map((d, i) => ({
    name:  d.dept,
    value: d.amount,
    color: DEPT_COLORS[i % DEPT_COLORS.length],
  }))
  const maxDept = Math.max(...deptData.map(d => d.value), 1)

  // Top routes
  const topRoutes = (s?.topRoutes || []).slice(0, 4)
  const maxRoute  = Math.max(...topRoutes.map(r => r.spend), 1)

  const fraudCount  = s?.fraudFlagCount || 0
  const savings     = s?.potentialSavings || 0
  const trips       = s?.totalTrips || 0
  const travelers   = s?.uniqueTravelers || 0
  const compliance  = s?.complianceRate ?? '—'
  const avg         = s?.avgCostPerTrip || 0

  return (
    <div className={styles.pageWrap}>
      <FilterPills />
      <div className={styles.page}>

        {/* Hero Banner */}
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.heroLabel}>TOTAL TRAVEL SPEND</div>
            <div className={styles.heroAmount}>{fmt(s?.totalSpend)}</div>
            <div className={styles.heroSub}>{trips} trips · {travelers} travelers</div>
            <div className={styles.heroPills}>
              {fraudCount > 0 && (
                <span className={styles.pill} style={{ background: 'rgba(239,68,68,0.25)', color: '#FCA5A5' }}>
                  {fraudCount} fraud flag{fraudCount > 1 ? 's' : ''}
                </span>
              )}
              <span className={styles.pill} style={{ background: 'rgba(245,158,11,0.25)', color: '#FCD34D' }}>$9.8K credits expiring</span>
              {savings > 0 && (
                <span className={styles.pill} style={{ background: 'rgba(16,185,129,0.25)', color: '#6EE7B7' }}>
                  {fmt(savings)} savings found
                </span>
              )}
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroStat}>
              <div className={styles.heroStatLabel}>Avg spend per trip</div>
              <div className={styles.heroStatValue}>{fmt(avg)}</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.heroStatLabel}>Compliance rate</div>
              <div className={styles.heroStatValue}>{compliance !== '—' ? `${compliance}%` : '—'}</div>
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
                    label={<CustomLabel total={s?.totalSpend} />}
                  >
                    {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={v => [fmt(v), '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.legend}>
                {pieData.map(d => (
                  <div key={d.name} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: d.color }} />
                    <span className={styles.legendName}>{d.name}</span>
                    <span className={styles.legendVal}>{fmt(d.value)}</span>
                  </div>
                ))}
              </div>
            </div>
            <span className={styles.link}>Full breakdown <ArrowRight size={12} /></span>
          </div>

          {/* Cost per dept */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Cost per dept</div>
            <div className={styles.cardSubtitle}>{deptData.length} departments</div>
            <div className={styles.deptList}>
              {deptData.map(d => (
                <div key={d.name} className={styles.deptRow}>
                  <div className={styles.deptName}>{d.name}</div>
                  <div className={styles.deptBarTrack}>
                    <div className={styles.deptBarFill}
                      style={{ width: `${(d.value / maxDept) * 100}%`, background: d.color }} />
                  </div>
                  <div className={styles.deptAmount}>{fmt(d.value)}</div>
                </div>
              ))}
            </div>
            <div className={styles.aiBox}>
              <Sparkles size={13} style={{ flexShrink: 0, marginTop: 1 }} />
              Your average flight price is lower than similar companies
            </div>
            <span className={styles.link}>Show all <ArrowRight size={12} /></span>
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
              value={fraudCount > 0 ? `${fraudCount} flag${fraudCount > 1 ? 's' : ''}` : 'No flags'}
              cta="Investigate now"
              ctaAmount={fraudCount > 0 ? `${fraudCount}` : '0'}
              gradient="linear-gradient(135deg, #DC2626, #EF4444)"
              onCtaClick={() => navigate('/fraud-compliance')}
            />
            <AlertCard
              tag="Quick win" tagColor="success"
              title="Savings opportunity"
              value={savings > 0 ? `${fmt(savings)}/yr` : 'Run analysis'}
              cta="View opportunity"
              ctaAmount={savings > 0 ? fmt(savings) : '—'}
              gradient="linear-gradient(135deg, #059669, #10B981)"
              onCtaClick={() => navigate('/savings')}
            />
            <AlertCard
              tag="8 days left" tagColor="warning"
              title="Credits expiring"
              value="$9,800 at risk"
              cta="Use credits now"
              ctaAmount="$9.8K"
              gradient="linear-gradient(135deg, #D97706, #F59E0B)"
              onCtaClick={() => navigate('/unused-credits')}
            />
          </div>

          {/* Top city pairs */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Top city pairs</div>
            {topRoutes.length > 0 ? topRoutes.map(r => (
              <div key={r.route} className={styles.barRow}>
                <div className={styles.barLabel}>{r.route}</div>
                <div className={styles.barTrack}>
                  <div className={styles.barFillGrad} style={{ width: `${(r.spend / maxRoute) * 100}%` }} />
                </div>
                <div className={styles.barAmt}>{fmt(r.spend)}</div>
              </div>
            )) : (
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>No air routes in selection</div>
            )}
          </div>

          {/* Savings pipeline */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Savings pipeline</div>
            {[
              { label: 'Advance booking',    pct: 75, amount: '$18,200' },
              { label: 'Hotel consolidation',pct: 60, amount: '$12,400' },
              { label: 'Car rental',         pct: 40, amount: '$6,800' },
              { label: 'Route optimisation', pct: 25, amount: '$3,600' },
            ].map(s => (
              <div key={s.label} className={styles.barRow}>
                <div className={styles.barLabel}>{s.label}</div>
                <div className={styles.barTrack}>
                  <div className={styles.barFillGreen} style={{ width: `${s.pct}%` }} />
                </div>
                <div className={styles.barAmt}>{s.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Intelligence Widget */}
        <div className={styles.card} style={{ marginTop: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className={styles.cardTitle} style={{ margin: 0 }}>Live traveler risk intelligence</div>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: '#EF4444', display: 'inline-block',
                animation: 'pulse 2s infinite'
              }} />
              {totalAtRisk > 0 && (
                <span style={{ background: '#FEE2E2', color: '#991B1B', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 12 }}>
                  {totalAtRisk} travelers at risk
                </span>
              )}
            </div>
            <button
              onClick={() => navigate('/risk-intelligence')}
              style={{ background: 'none', border: 'none', color: '#7C3AED', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              View full map <ArrowRight size={12} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
            {/* Mini map */}
            <div
              style={{ borderRadius: 10, overflow: 'hidden', height: 220, border: '1px solid #EDE9FE', cursor: 'pointer' }}
              onClick={() => navigate('/risk-intelligence')}
            >
              <MapContainer
                center={[20, 15]}
                zoom={2}
                minZoom={2}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
                dragging={false}
                zoomControl={false}
                doubleClickZoom={false}
                attributionControl={false}
                worldCopyJump={true}
                maxBounds={[[-90, -180], [90, 180]]}
                maxBoundsViscosity={0.8}
              >
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                {riskEvents.map(ev => (
                  <Circle
                    key={ev.id}
                    center={[ev.lat, ev.lng]}
                    radius={ev.radius * 1000}
                    pathOptions={SEVERITY_STYLES[ev.severity]}
                  />
                ))}
                {travelerLocations.map((loc, i) => (
                  <Marker
                    key={i}
                    position={[loc.lat, loc.lng]}
                    icon={miniTravelerIcon(atRiskNames.has(loc.traveler))}
                  />
                ))}
              </MapContainer>
            </div>

            {/* Top 3 alerts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {topAlerts.length === 0 ? (
                <div style={{ color: '#94A3B8', fontSize: 13, paddingTop: 20 }}>No alerts affecting your travelers</div>
              ) : (
                topAlerts.map(risk => {
                  const sevBg = { critical: '#FEE2E2', high: '#FEF3C7', medium: '#DBEAFE', low: '#D1FAE5' }[risk.severity]
                  const sevTx = { critical: '#991B1B', high: '#92400E', medium: '#1E40AF', low: '#065F46' }[risk.severity]
                  return (
                    <div key={risk.id} style={{ background: '#FAFAFE', border: '1px solid #EDE9FE', borderRadius: 8, padding: '10px 12px', cursor: 'pointer' }}
                      onClick={() => navigate('/risk-intelligence')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span style={{ background: sevBg, color: sevTx, fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 4, textTransform: 'uppercase' }}>
                          {risk.severity}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#1a0533' }}>{risk.title}</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#EF4444', fontWeight: 600 }}>
                        {risk.affectedCount} traveler{risk.affectedCount !== 1 ? 's' : ''} affected
                      </div>
                    </div>
                  )
                })
              )}
              <button
                onClick={() => navigate('/risk-intelligence')}
                className={styles.link}
                style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, marginTop: 4 }}
              >
                View all {riskEvents.length} alerts <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
