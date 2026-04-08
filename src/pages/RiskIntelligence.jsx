import { useState, useRef, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import jsPDF from 'jspdf'
import { riskEvents } from '../data/riskData'
import { matchRisksToTravelers, getTravelerLocations } from '../utils/riskMatcher'
import { useTravelData } from '../context/TravelDataContext'
import styles from './RiskIntelligence.module.css'

// Fix default Leaflet marker icons in React/Vite
const DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow })
L.Marker.prototype.options.icon = DefaultIcon

// Build traveler marker icons inline (no CSS class needed)
function travelerIcon(isAtRisk) {
  const color = isAtRisk ? '#EF4444' : '#3B82F6'
  const glow = isAtRisk ? '239,68,68' : '59,130,246'
  return L.divIcon({
    className: '',
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 8px rgba(${glow},0.8);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -8],
  })
}

// Severity colours for circles
const SEVERITY_STYLES = {
  critical: { fillColor: '#EF4444', color: '#EF4444', fillOpacity: 0.25, opacity: 0.8 },
  high:     { fillColor: '#F59E0B', color: '#F59E0B', fillOpacity: 0.2,  opacity: 0.7 },
  medium:   { fillColor: '#3B82F6', color: '#3B82F6', fillOpacity: 0.15, opacity: 0.6 },
  low:      { fillColor: '#10B981', color: '#10B981', fillOpacity: 0.08, opacity: 0.5 },
}

const TYPE_LABELS = {
  strike: 'STRIKE', weather: 'WEATHER', security: 'SECURITY',
  political: 'POLITICAL', natural_disaster: 'DISASTER',
  health: 'HEALTH', infrastructure: 'INFRA',
}

const FILTER_OPTIONS = ['all', 'strike', 'weather', 'security', 'political', 'natural_disaster', 'health', 'infrastructure']
const FILTER_LABELS  = { all: 'All', strike: 'Strikes', weather: 'Weather', security: 'Security', political: 'Political', natural_disaster: 'Natural Disaster', health: 'Health', infrastructure: 'Infrastructure' }

function timeAgo(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime()
  const h = Math.floor(diff / 3600000)
  const m = Math.floor(diff / 60000)
  if (h >= 24) return `${Math.floor(h/24)}d ago`
  if (h >= 1)  return `${h}h ago`
  return `${m}m ago`
}

// Inner component that can use useMap to fly to a location
function MapController({ target }) {
  const map = useMap()
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], 5, { duration: 1.2 })
  }, [target, map])
  return null
}

function generateRiskPDF(matchedRisks, travelerLocations, orgName) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })
  const W = 595, M = 36, CW = W - M * 2
  let y = M

  function bold(sz) { pdf.setFont('helvetica','bold'); pdf.setFontSize(sz) }
  function normal(sz) { pdf.setFont('helvetica','normal'); pdf.setFontSize(sz) }
  function ink(hex) { const h=hex.replace('#',''); pdf.setTextColor(parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)) }
  function fill(hex) { const h=hex.replace('#',''); pdf.setFillColor(parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)) }
  function text(s, x, ty, opts) { pdf.text(String(s??''), x, ty, opts||{}) }

  fill('#1a0533'); pdf.rect(0,0,W,28,'F')
  ink('#ffffff'); bold(11); text('TRAIVIO  |  Traveler Risk Alert Report', M, 18)
  normal(8); ink('#94A3B8'); text(new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}), W-M, 18, {align:'right'})
  y = 50

  ink('#1a0533'); bold(20); text('Traveler Risk Alert Report', M, y); y += 16
  normal(10); ink('#64748B'); text('Live intelligence — ' + orgName, M, y); y += 20

  // summary box
  fill('#F5F4FF'); pdf.rect(M, y, CW, 44, 'F')
  const totalAffected = matchedRisks.reduce((s,r) => s + r.affectedCount, 0)
  ink('#7C3AED'); bold(9)
  text(matchedRisks.length + ' ACTIVE ALERTS', M+12, y+14)
  text(totalAffected + ' TRAVELERS AFFECTED', M+12, y+30)
  ink('#64748B'); normal(8)
  text('Report generated: ' + new Date().toISOString(), W-M-10, y+22, {align:'right'})
  y += 56

  matchedRisks.forEach((risk, idx) => {
    if (y > 720) { pdf.addPage(); y = 40 }
    const sevColors = { critical:'#EF4444', high:'#F59E0B', medium:'#3B82F6', low:'#10B981' }
    const c = sevColors[risk.severity] || '#94A3B8'
    const h=c.replace('#','')
    pdf.setFillColor(parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16))
    pdf.rect(M, y, 3, 40, 'F')
    fill('#FAFAFE'); pdf.rect(M+3, y, CW-3, 40, 'F')
    ink(c); bold(8); text(risk.severity.toUpperCase() + '  |  ' + TYPE_LABELS[risk.type], M+12, y+12)
    ink('#1a0533'); bold(11); text(risk.title, M+12, y+26)
    ink('#64748B'); normal(8); text(risk.source + '  |  ' + timeAgo(risk.publishedAt), W-M-10, y+12, {align:'right'})
    ink('#EF4444'); normal(8); text(risk.affectedCount + ' traveler(s) affected', W-M-10, y+26, {align:'right'})
    y += 48

    const descLines = pdf.splitTextToSize(risk.description, CW-20)
    ink('#374151'); normal(8); pdf.text(descLines, M+10, y); y += descLines.length * 10 + 4

    if (risk.affectedTravelers?.length > 0) {
      ink('#94A3B8'); normal(7)
      text('Affected: ' + risk.affectedTravelers.map(t => t.traveler).join(', '), M+10, y)
      y += 12
    }
    y += 8
  })

  if (y > 720) { pdf.addPage(); y = 40 }
  fill('#F5F4FF'); pdf.rect(M, y, CW, 60, 'F')
  ink('#1a0533'); bold(10); text('Emergency Contacts', M+10, y+14)
  ink('#374151'); normal(8)
  text('24/7 Travel Emergency: +1-800-TRAIVIO', M+10, y+28)
  text('Security Desk: security@traivio.ai', M+10, y+40)
  text('Medical Assistance: medical@traivio.ai', M+CW/2, y+28)

  const dateStr = new Date().toISOString().split('T')[0]
  pdf.save('traivio-risk-report-' + dateStr + '.pdf')
}

export default function RiskIntelligence() {
  const { filteredRecords } = useTravelData()
  const records = filteredRecords || []

  const [activeFilter, setActiveFilter] = useState('all')
  const [expandedId, setExpandedId]     = useState(null)
  const [flyTarget, setFlyTarget]       = useState(null)

  const travelerLocations = useMemo(() => getTravelerLocations(records), [records])
  const matchedRisks      = useMemo(() => matchRisksToTravelers(riskEvents, records), [records])

  // Set of traveler names at risk, for marker colouring
  const atRiskNames = useMemo(() => {
    const s = new Set()
    matchedRisks.forEach(r => r.affectedTravelers?.forEach(t => s.add(t.traveler)))
    return s
  }, [matchedRisks])

  const visibleRisks = activeFilter === 'all' ? riskEvents : riskEvents.filter(e => e.type === activeFilter)

  // KPI numbers
  const criticalCount  = riskEvents.filter(e => e.severity === 'critical').length
  const highCount      = riskEvents.filter(e => e.severity === 'high').length
  const totalAffected  = matchedRisks.reduce((s, r) => s + r.affectedCount, 0)
  const routesAffected = new Set(riskEvents.flatMap(e => e.affectedRoutes)).size

  // Unmatched risks (no your-traveler impact) for global section
  const unmatchedRisks = riskEvents.filter(e => !matchedRisks.find(m => m.id === e.id))

  return (
    <div className={styles.page}>
      {/* KPI row */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiCard} style={{ '--accent': '#7C3AED' }}>
          <div className={styles.kpiLabel}>Active risk events</div>
          <div className={styles.kpiValue}>{riskEvents.length}</div>
          <div className={styles.kpiSub}>{criticalCount} critical · {highCount} high</div>
        </div>
        <div className={styles.kpiCard} style={{ '--accent': '#EF4444' }}>
          <div className={styles.kpiLabel}>Travelers at risk</div>
          <div className={styles.kpiValue}>{totalAffected}</div>
          <div className={styles.kpiSub}>Bookings on affected routes</div>
        </div>
        <div className={styles.kpiCard} style={{ '--accent': '#EF4444' }}>
          <div className={styles.kpiLabel}>Critical alerts</div>
          <div className={styles.kpiValue}>{criticalCount}</div>
          <div className={styles.kpiSub}>Require immediate action</div>
        </div>
        <div className={styles.kpiCard} style={{ '--accent': '#F59E0B' }}>
          <div className={styles.kpiLabel}>Routes affected</div>
          <div className={styles.kpiValue}>{routesAffected}</div>
          <div className={styles.kpiSub}>Across active events</div>
        </div>
      </div>

      {/* Main grid: map + alert feed */}
      <div className={styles.mainGrid}>

        {/* Left: map */}
        <div className={styles.mapSection}>
          <div className={styles.mapHeader}>
            <div className={styles.mapTitle}>Live risk map</div>
          </div>
          <div className={styles.filterRow}>
            {FILTER_OPTIONS.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${activeFilter === f ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>
          <div className={styles.mapContainer}>
            <MapContainer
              center={[20, 15]}
              zoom={2}
              minZoom={2}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom
              worldCopyJump={true}
              maxBounds={[[-90, -180], [90, 180]]}
              maxBoundsViscosity={0.5}
            >
              <MapController target={flyTarget} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* Risk zone circles */}
              {visibleRisks.map(ev => (
                <Circle
                  key={ev.id}
                  center={[ev.lat, ev.lng]}
                  radius={ev.radius * 1000}
                  pathOptions={SEVERITY_STYLES[ev.severity]}
                >
                  <Popup>
                    <div style={{ minWidth: 200 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{ev.title}</div>
                      <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>{ev.description}</div>
                      {matchedRisks.find(m => m.id === ev.id) && (
                        <div style={{ fontSize: 11, color: '#EF4444', fontWeight: 600 }}>
                          {matchedRisks.find(m => m.id === ev.id).affectedCount} of your travelers affected
                        </div>
                      )}
                    </div>
                  </Popup>
                </Circle>
              ))}

              {/* Traveler markers */}
              {travelerLocations.map((loc, i) => {
                const isAtRisk = atRiskNames.has(loc.traveler)
                return (
                  <Marker
                    key={i}
                    position={[loc.lat, loc.lng]}
                    icon={travelerIcon(isAtRisk)}
                  >
                    <Popup>
                      <div style={{ minWidth: 160 }}>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{loc.traveler}</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>{loc.location} · {loc.department}</div>
                        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>Ref: {loc.bookingRef}</div>
                        {isAtRisk && (
                          <div style={{ fontSize: 11, color: '#EF4444', fontWeight: 600, marginTop: 4 }}>At risk — check alerts</div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
            </MapContainer>

            {/* Legend overlay */}
            <div className={styles.mapLegend}>
              <div className={styles.legendTitle}>Legend</div>
              <div className={styles.legendItem}><span className={styles.legendDot} style={{ background: '#3B82F6' }} />Active traveler (safe)</div>
              <div className={styles.legendItem}><span className={styles.legendDot} style={{ background: '#EF4444' }} />Traveler at risk</div>
              <div className={styles.legendItem}><span className={styles.legendDot} style={{ background: 'rgba(239,68,68,0.5)', border: '1px solid #EF4444' }} />Critical alert zone</div>
              <div className={styles.legendItem}><span className={styles.legendDot} style={{ background: 'rgba(245,158,11,0.5)', border: '1px solid #F59E0B' }} />High alert zone</div>
              <div className={styles.legendItem}><span className={styles.legendDot} style={{ background: 'rgba(59,130,246,0.4)', border: '1px solid #3B82F6' }} />Weather / disruption</div>
            </div>
          </div>
        </div>

        {/* Right: alert feed */}
        <div className={styles.alertFeed}>
          <div className={styles.alertFeedHeader}>
            <div className={styles.alertFeedTitle}>Active alerts</div>
            <span className={styles.liveDot} />
            <span className={styles.liveBadge}>LIVE</span>
          </div>

          <div className={styles.alertScroll}>
            {matchedRisks.length === 0 ? (
              <div style={{ color: '#94A3B8', fontSize: 13, padding: '20px 0' }}>No alerts affecting your travelers</div>
            ) : (
              matchedRisks.map(risk => (
                <div
                  key={risk.id}
                  className={styles.alertCard}
                  onClick={() => setExpandedId(expandedId === risk.id ? null : risk.id)}
                >
                  <div className={styles.alertCardTop}>
                    <span className={`${styles.severityBadge} ${styles['severity' + risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)]}`}>
                      {risk.severity}
                    </span>
                    <span className={styles.alertTypeTag}>{TYPE_LABELS[risk.type] || risk.type}</span>
                    <div className={styles.alertTitle}>{risk.title}</div>
                  </div>
                  <div className={styles.alertDesc}>{risk.description}</div>
                  <div className={styles.alertMeta}>
                    <span className={styles.affectedCount}>{risk.affectedCount} traveler{risk.affectedCount !== 1 ? 's' : ''} affected</span>
                    <span className={styles.alertTime}>{timeAgo(risk.publishedAt)}</span>
                  </div>

                  {expandedId === risk.id && (
                    <div className={styles.travelerList}>
                      {risk.affectedTravelers.map((t, i) => (
                        <span key={i} className={styles.travelerChip}>{t.traveler}</span>
                      ))}
                    </div>
                  )}

                  <div className={styles.alertActions} onClick={e => e.stopPropagation()}>
                    <button
                      className={`${styles.alertBtn} ${styles.alertBtnPrimary}`}
                      onClick={() => setFlyTarget({ lat: risk.lat, lng: risk.lng })}
                    >
                      View on map
                    </button>
                    <button
                      className={styles.alertBtn}
                      onClick={() => generateRiskPDF([risk], travelerLocations, 'Acme Corp')}
                    >
                      Alert report
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Global alerts section */}
            {unmatchedRisks.length > 0 && (
              <div className={styles.globalSection}>
                <div className={styles.globalTitle}>Global alerts (not affecting your travelers)</div>
                {unmatchedRisks.map(risk => (
                  <div key={risk.id} className={styles.globalCard}>
                    <span className={`${styles.severityBadge} ${styles['severity' + risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)]}`}>
                      {risk.severity}
                    </span>
                    <div className={styles.globalCardTitle}>{risk.title}</div>
                    <span className={styles.alertTime}>{timeAgo(risk.publishedAt)}</span>
                    <button
                      className={styles.alertBtn}
                      onClick={() => setFlyTarget({ lat: risk.lat, lng: risk.lng })}
                      style={{ marginLeft: 'auto' }}
                    >
                      Map
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Affected travelers table */}
      <div className={styles.tableSection}>
        <div className={styles.tableSectionHeader}>
          <div className={styles.tableSectionTitle}>Affected travelers</div>
          <span style={{ fontSize: 12, color: '#94A3B8' }}>{totalAffected} traveler bookings on risk routes</span>
        </div>
        {totalAffected === 0 ? (
          <div className={styles.emptyState}>No travelers currently at risk</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Traveler</th>
                <th>Department</th>
                <th>Current Location</th>
                <th>Risk Event</th>
                <th>Severity</th>
                <th>Travel Date</th>
                <th>Booking Ref</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {matchedRisks.flatMap(risk =>
                risk.affectedTravelers.map((t, i) => {
                  const loc = travelerLocations.find(l => l.traveler === t.traveler)
                  return (
                    <tr key={`${risk.id}-${i}`}>
                      <td style={{ fontWeight: 600 }}>{t.traveler}</td>
                      <td>{records.find(r => r.travelerName === t.traveler)?.department || '—'}</td>
                      <td>{loc?.location || t.destination || '—'}</td>
                      <td>{risk.title}</td>
                      <td>
                        <span className={`${styles.severityBadge} ${styles['severity' + risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)]}`}>
                          {risk.severity}
                        </span>
                      </td>
                      <td>{t.date || '—'}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{t.bookingRef}</td>
                      <td>
                        <button className={styles.actionBtn}>Contact</button>
                        <button className={styles.actionBtn}>Rebook</button>
                        <button className={`${styles.actionBtn} ${styles.actionBtnSuccess}`}>Mark safe</button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Report generator */}
      <div className={styles.reportSection}>
        <div className={styles.reportLeft}>
          <div className={styles.reportTitle}>Generate Full Risk Report</div>
          <div className={styles.reportSub}>Board-ready PDF with all active events, affected travelers, and recommended actions</div>
        </div>
        <button
          className={styles.reportBtn}
          onClick={() => generateRiskPDF(matchedRisks.length > 0 ? matchedRisks : riskEvents.slice(0,3), travelerLocations, 'Acme Corp')}
        >
          Download Risk Report
        </button>
      </div>
    </div>
  )
}
