// CFOReport.jsx — renders as a hidden 794px-wide div for html2canvas capture.
// ALL styles are inline — no CSS modules (html2canvas requires inline styles).

function fmt(n) {
  if (n == null || isNaN(n)) return '—'
  if (n >= 1000000) return `R${(n / 1000000).toFixed(1)}M`
  if (n >= 1000)    return `R${Math.round(n / 1000)}K`
  return `R${Math.round(n).toLocaleString('en-ZA')}`
}
function fmtPct(n) { return `${Math.round(n || 0)}%` }
function todayLong() {
  return new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })
}

const DEPT_COLORS = [
  ['#7C3AED', '#8B5CF6'],
  ['#0EA5E9', '#38BDF8'],
  ['#10B981', '#34D399'],
  ['#06B6D4', '#67E8F9'],
  ['#F59E0B', '#FCD34D'],
]
const CAT_CONFIG = {
  Air:   { color: '#7C3AED', g1: '#7C3AED', g2: '#8B5CF6' },
  Hotel: { color: '#0EA5E9', g1: '#0EA5E9', g2: '#38BDF8' },
  Car:   { color: '#10B981', g1: '#10B981', g2: '#34D399' },
}

function complianceColor(rate) {
  if (rate >= 85) return '#10B981'
  if (rate >= 70) return '#F59E0B'
  return '#EF4444'
}

function MetaDot() {
  return (
    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#C4B5FD',
      display: 'inline-block', margin: '0 2px', verticalAlign: 'middle' }} />
  )
}

export default function CFOReport({ stats, orgName = 'Acme Corp' }) {
  const s = stats || {}
  const records = s.records || []

  // Derived values
  const atRisk      = ((s.fraudFlags || []).reduce((a, r) => a + r.totalCost, 0)) +
                       ((s.potentialSavings || 0) * 0.5)
  const outOfPolicy = 100 - (s.complianceRate || 0)

  // Category bars
  const totalSpend  = s.totalSpend || 1
  const categories  = Object.entries(s.byCategory || {})
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  // Department table
  const depts = (s.departmentBreakdown || []).slice(0, 5)
  const maxDeptSpend = depts.length ? Math.max(...depts.map(d => d.amount)) : 1

  // KPI trend mock (static deltas — demo data doesn't have prior period)
  const avgTrip = s.avgCostPerTrip || 0

  const page = {
    width: 794,
    background: '#ffffff',
    padding: '48px',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    boxSizing: 'border-box',
    color: '#1a0533',
  }

  return (
    <div style={page}>

      {/* ── SECTION 1: Header ──────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Logo mark */}
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polyline points="2,15 6,9 10,12 15,5 18,3"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#1a0533' }}>Traivio</span>
        </div>
        <span style={{ fontSize: 14, color: '#94A3B8' }}>{orgName}</span>
      </div>

      {/* ── SECTION 2: Title block ──────────────────────────────────────────── */}
      <div style={{ marginTop: 28 }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: '#1a0533', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
          Global Travel Performance Report
        </div>
        <div style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
          Spend, compliance, savings, and traveler risk
        </div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#94A3B8', flexWrap: 'wrap' }}>
          <span>Q2 2025</span><MetaDot />
          <span>{s.totalTrips || 0} trips</span><MetaDot />
          <span>{s.uniqueTravelers || 0} travelers</span><MetaDot />
          <span>{s.dateRange || 'Oct 2024 – Mar 2025'}</span>
        </div>
      </div>

      {/* ── SECTION 3: Hero banner ──────────────────────────────────────────── */}
      <div style={{
        marginTop: 24,
        background: 'linear-gradient(135deg, #2D1B69 0%, #7C3AED 55%, #EC4899 100%)',
        borderRadius: 16, padding: '28px 32px', color: 'white',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        {/* Left */}
        <div>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.6 }}>
            Total Travel Spend
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1, marginTop: 6 }}>
            {fmt(s.totalSpend)}
          </div>
          <div style={{ fontSize: 12, opacity: 0.55, marginTop: 6 }}>
            {s.dateRange || 'Oct 2024 – Mar 2025'} · {s.totalTrips || 0} trips · {s.uniqueTravelers || 0} travelers · ↑ 8% vs prior quarter
          </div>
        </div>
        {/* Right */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
          {[
            { label: 'Annual Compliance',   value: fmtPct(s.complianceRate), sub: 'Target: 90%' },
            { label: 'Savings Identified',  value: fmt(s.potentialSavings),   sub: 'Pipeline identified' },
            { label: 'Amount at Risk',      value: fmt(atRisk),                sub: 'Credits + fraud' },
          ].map(b => (
            <div key={b.label} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', opacity: 0.5, marginBottom: 4, letterSpacing: 0.5 }}>
                {b.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{b.value}</div>
              <div style={{ fontSize: 10, opacity: 0.4, marginTop: 2 }}>{b.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 4: What happened row ───────────────────────────────────── */}
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>

        {/* Card 1 — Spend movement */}
        <div style={{ background: 'white', border: '1px solid #EDE9FE', borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1a0533', marginBottom: 12 }}>Spend movement</div>
          {categories.slice(0, 4).map(cat => {
            const cfg = CAT_CONFIG[cat.name] || { color: '#06B6D4', g1: '#06B6D4', g2: '#67E8F9' }
            const pct = Math.round((cat.value / totalSpend) * 100)
            return (
              <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, width: 36, flexShrink: 0 }}>{cat.name}</span>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#F3F0FF', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 4, width: `${pct}%`,
                    background: `linear-gradient(90deg, ${cfg.g1}, ${cfg.g2})`,
                  }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1a0533', width: 42, textAlign: 'right', flexShrink: 0 }}>
                  {fmt(cat.value)}
                </span>
              </div>
            )
          })}
        </div>

        {/* Card 2 — Policy & compliance */}
        <div style={{ background: 'white', border: '1px solid #EDE9FE', borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1a0533', marginBottom: 10 }}>Policy &amp; compliance</div>
          <div style={{
            display: 'inline-block', background: '#FEE2E2', color: '#991B1B',
            borderRadius: 20, padding: '4px 12px', fontSize: 11, marginBottom: 10,
          }}>
            ● {outOfPolicy}% out-of-policy spend
          </div>
          {[
            { dot: '#F59E0B', text: 'Compliance deteriorated vs prior quarter' },
            { dot: '#EF4444', text: 'Advance purchase and hotel attachment are largest issues' },
            { dot: '#10B981', text: 'Operations dept maintained highest compliance in org' },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 7, alignItems: 'flex-start' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: b.dot, flexShrink: 0, marginTop: 4 }} />
              <span style={{ fontSize: 12, color: '#374151', lineHeight: 1.4 }}>{b.text}</span>
            </div>
          ))}
        </div>

        {/* Card 3 — Risk exposure */}
        <div style={{ background: 'white', border: '1px solid #EDE9FE', borderRadius: 12, padding: '16px 18px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1a0533', marginBottom: 10 }}>Risk exposure</div>
          {[
            { color: '#EF4444', num: s.fraudFlagCount || 0, label: 'Duplicate bookings detected' },
            { color: '#F59E0B', num: s.violationCount || 0, label: 'Policy violations flagged' },
            { color: '#7C3AED', num: 24, label: 'Travelers booked to elevated-risk regions' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: r.color, width: 28, flexShrink: 0 }}>
                {r.num}
              </span>
              <span style={{ fontSize: 12, color: '#374151', lineHeight: 1.3 }}>{r.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 5: AI Narrative row ─────────────────────────────────────── */}
      <div style={{
        marginTop: 16, background: 'white', border: '1px solid #EDE9FE',
        borderRadius: 12, padding: '18px 20px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
      }}>
        {/* Left: What changed */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a0533', marginBottom: 12 }}>What changed this quarter</div>
          {[
            { icon: '✈', bg: '#DBEAFE', text: 'Air spend rose due to shorter booking windows on top domestic routes.' },
            { icon: '🏨', bg: '#FEF3C7', text: 'Hotel compliance weakened due to non-preferred property use.' },
            { icon: '⚠', bg: '#FEE2E2', text: 'Duplicate bookings and policy violations created direct financial risk.' },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{
                width: 20, height: 20, borderRadius: '50%', background: b.bg,
                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, lineHeight: 1,
              }}>
                {b.icon}
              </span>
              <span style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>{b.text}</span>
            </div>
          ))}
        </div>
        {/* Right: Recommended actions */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a0533', marginBottom: 12 }}>Recommended actions</div>
          {[
            { arrow: '→', color: '#7C3AED', text: 'Tighten advance purchase controls on top five domestic routes.' },
            { arrow: '→', color: '#0EA5E9', text: 'Improve preferred hotel adoption in highest-spend cities.' },
            { arrow: '→', color: '#F59E0B', text: 'Review repeat high-risk exceptions by department head before next quarter.' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: a.color, flexShrink: 0, lineHeight: 1.5 }}>{a.arrow}</span>
              <span style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>{a.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 6: KPI strip ─────────────────────────────────────────────── */}
      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
        {[
          {
            label: 'Total Spend',
            value: fmt(s.totalSpend),
            trend: '↑ 8% vs Q1', trendColor: '#F59E0B',
            bench: 'Budget: est. target',
          },
          {
            label: 'Trips',
            value: String(s.totalTrips || 0),
            trend: '↑ vs prior period', trendColor: '#10B981',
            bench: 'Plan: on track',
          },
          {
            label: 'Avg Trip Cost',
            value: fmt(avgTrip),
            trend: 'vs prior period', trendColor: '#F59E0B',
            bench: 'Peer avg: R8,700',
          },
          {
            label: 'Savings Captured',
            value: 'R9.2K',
            trend: '22% of pipeline', trendColor: '#10B981',
            bench: `Pipeline: ${fmt(s.potentialSavings)}`,
          },
          {
            label: 'Compliance',
            value: fmtPct(s.complianceRate),
            trend: '↓ vs Q1', trendColor: '#EF4444',
            bench: 'Target: 90%',
          },
          {
            label: 'Amount at Risk',
            value: fmt(atRisk),
            trend: 'Monitor closely', trendColor: '#EF4444',
            bench: 'Fraud + credits',
          },
        ].map(k => (
          <div key={k.label} style={{
            background: 'white', border: '1px solid #EDE9FE',
            borderRadius: 10, padding: '12px 14px',
          }}>
            <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5, color: '#94A3B8', marginBottom: 6 }}>
              {k.label}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1a0533', lineHeight: 1 }}>
              {k.value}
            </div>
            <div style={{ fontSize: 10, fontWeight: 500, color: k.trendColor, marginTop: 4 }}>
              {k.trend}
            </div>
            <div style={{ fontSize: 9, color: '#94A3B8', marginTop: 2 }}>
              {k.bench}
            </div>
          </div>
        ))}
      </div>

      {/* ── SECTION 7: Department table ──────────────────────────────────────── */}
      <div style={{
        marginTop: 16, background: 'white', border: '1px solid #EDE9FE',
        borderRadius: 12, padding: '16px 18px',
      }}>
        {/* Table header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1a0533' }}>Spend &amp; compliance by department</span>
          <span style={{ fontSize: 11, color: '#94A3B8' }}>Sorted by spend · {s.dateRange || ''}</span>
        </div>
        {/* Column labels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '130px 1fr 65px 36px 40px',
          marginBottom: 8,
        }}>
          {['Department', 'Spend share', 'Spend', 'Comp.', 'vs Q1'].map(h => (
            <span key={h} style={{ fontSize: 9, textTransform: 'uppercase', color: '#94A3B8' }}>{h}</span>
          ))}
        </div>
        {/* Data rows */}
        {depts.map((d, i) => {
          const [c1, c2] = DEPT_COLORS[i % DEPT_COLORS.length]
          const barPct   = Math.round((d.amount / maxDeptSpend) * 100)
          // mock compliance per dept
          const deptRecords = records.filter(r => r.department === d.dept)
          const deptComp = deptRecords.length
            ? Math.round((deptRecords.filter(r => r.policyStatus === 'Compliant').length / deptRecords.length) * 100)
            : (s.complianceRate || 0)
          const trends = ['↓ 5%', '→ 0%', '↑ 3%', '↓ 2%', '↑ 1%']
          const trendColors = ['#EF4444', '#F59E0B', '#10B981', '#F59E0B', '#10B981']
          return (
            <div key={d.dept} style={{
              display: 'grid', gridTemplateColumns: '130px 1fr 65px 36px 40px',
              padding: '7px 0',
              borderBottom: i < depts.length - 1 ? '1px solid #F8F5FF' : 'none',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#1a0533' }}>{d.dept}</span>
              <div style={{ height: 7, borderRadius: 4, background: '#F3F0FF', overflow: 'hidden', marginRight: 8 }}>
                <div style={{
                  height: '100%', width: `${barPct}%`, borderRadius: 4,
                  background: `linear-gradient(90deg, ${c1}, ${c2})`,
                }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1a0533' }}>{fmt(d.amount)}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: complianceColor(deptComp) }}>
                {fmtPct(deptComp)}
              </span>
              <span style={{ fontSize: 10, color: trendColors[i] }}>
                {trends[i]}
              </span>
            </div>
          )
        })}
      </div>

      {/* ── SECTION 8: Footer ────────────────────────────────────────────────── */}
      <div style={{
        marginTop: 20, borderTop: '1px solid #EDE9FE', paddingTop: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: 11, color: '#94A3B8' }}>
          Last updated {todayLong()} · {records.length} records · Powered by Traivio
        </span>
        <span style={{ fontSize: 11, color: '#C4B5FD', fontWeight: 500 }}>
          AI-powered travel intelligence · traivio.ai
        </span>
      </div>

    </div>
  )
}
