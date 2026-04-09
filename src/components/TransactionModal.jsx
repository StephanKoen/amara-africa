import { X, AlertTriangle, CheckCircle, Flag } from 'lucide-react'
import styles from './TransactionModal.module.css'

function initials(name) {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function fmt(n, currency = 'USD') {
  if (n == null || n === '' || isNaN(Number(n))) return '—'
  const num = Number(n)
  const sym = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$'
  return `${sym}${Math.round(num).toLocaleString('en-US')}`
}

function fmtDate(d) {
  if (!d) return '—'
  try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
  catch { return String(d) }
}

export default function TransactionModal({ record, onClose }) {
  if (!record) return null
  const r = record
  const isViolation = r.policyStatus === 'Violation' || r.policyStatus === 'Exception'
  const isFlagged   = r.fraudFlag || r.isVoided || r.isCancelled || r.isDuplicate
  const cur         = r.currency || 'USD'
  const variance    = (r.marketRate && r.totalCost) ? (r.totalCost - r.marketRate) : null
  const variancePct = (variance != null && r.marketRate) ? Math.round((variance / r.marketRate) * 100) : null

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>

        {/* Banners */}
        {r.isVoided      && <div className={styles.voidedBanner}>VOIDED TICKET</div>}
        {r.isCancelled && !r.isVoided && <div className={styles.cancelledBanner}>CANCELLED TICKET</div>}

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.travelerSection}>
            <div className={styles.avatar}>{initials(r.travelerName)}</div>
            <div className={styles.travelerInfo}>
              <div className={styles.travelerName}>{r.travelerName || 'Unknown Traveler'}</div>
              <div className={styles.travelerMeta}>
                {r.travelerEmail && <span>{r.travelerEmail}</span>}
                {r.travelerPhone && <span>{r.travelerPhone}</span>}
              </div>
              <div className={styles.travelerMeta}>
                {r.department  && <span>{r.department}</span>}
                {r.employeeId  && <span>ID: {r.employeeId}</span>}
              </div>
            </div>
          </div>
          <div className={styles.headerRight}>
            {isViolation && <span className={`${styles.badge} ${styles.badgeDanger}`}>Policy Violation</span>}
            {!isViolation && r.policyStatus === 'Compliant' && <span className={`${styles.badge} ${styles.badgeSuccess}`}>Compliant</span>}
            <button className={styles.closeBtn} onClick={onClose}><X size={18} /></button>
          </div>
        </div>

        {/* Violation alert */}
        {isViolation && (
          <div className={`${styles.alertBox} ${r.policyStatus === 'Exception' ? styles.alertAmber : styles.alertRed}`}>
            <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <div className={styles.alertTitle}>
                {r.violationType || r.policyStatus}
                {r.approvalStatus && r.approvalStatus !== 'N/A' && (
                  <span className={styles.approvalBadge}>{r.approvalStatus}</span>
                )}
              </div>
              {r.policyNote && <div className={styles.alertDesc}>{r.policyNote}</div>}
              {r.violationAmount && <div className={styles.alertAmount}>Violation amount: {fmt(r.violationAmount, cur)}</div>}
            </div>
          </div>
        )}

        {/* Trip details */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Trip Details</div>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Purpose</div>
              <div className={styles.fieldValue}>{r.purposeOfTravel || r.tripName || '—'}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Category</div>
              <div className={styles.fieldValue}>{r.category || '—'}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Travel Date</div>
              <div className={styles.fieldValue}>{fmtDate(r.travelDate)}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Booked</div>
              <div className={`${styles.fieldValue} ${r.daysAdvance != null && r.daysAdvance < 7 ? styles.fieldWarn : ''}`}>
                {fmtDate(r.bookingDate)}
                {r.daysAdvance != null && <span className={styles.fieldNote}>&nbsp;({r.daysAdvance}d advance)</span>}
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Route</div>
              <div className={styles.fieldValue}>
                {r.originCode && r.destinationCode
                  ? `${r.originCode} → ${r.destinationCode}`
                  : r.origin && r.destination
                    ? `${r.origin} → ${r.destination}`
                    : '—'}
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Vendor</div>
              <div className={styles.fieldValue}>{r.vendor || '—'}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Class</div>
              <div className={styles.fieldValue}>{r.classOfTravel || '—'}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Booking Ref</div>
              <div className={styles.fieldValue}><code className={styles.code}>{r.bookingRef || '—'}</code></div>
            </div>
          </div>
        </div>

        {/* Cost analysis */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Cost Analysis</div>
          <div className={styles.costBoxes}>
            <div className={styles.costBox}>
              <div className={styles.costLabel}>Booked</div>
              <div className={styles.costValue}>{fmt(r.totalCost, cur)}</div>
            </div>
            <div className={styles.costBox}>
              <div className={styles.costLabel}>Market rate</div>
              <div className={styles.costValue}>{r.marketRate ? fmt(r.marketRate, cur) : '—'}</div>
            </div>
            <div className={`${styles.costBox} ${variance != null && variance > 0 ? styles.costBoxDanger : variance != null && variance < 0 ? styles.costBoxSuccess : ''}`}>
              <div className={styles.costLabel}>Variance</div>
              <div className={styles.costValue}>
                {variance != null
                  ? `${variance > 0 ? '+' : ''}${fmt(Math.abs(variance), cur)} (${variancePct > 0 ? '+' : ''}${variancePct}%)`
                  : '—'}
              </div>
            </div>
          </div>
          {variance != null && variance > 0 && (
            <div className={styles.varBar}>
              <div className={styles.varBarFill} style={{ width: `${Math.min(Math.abs(variancePct), 100)}%` }} />
            </div>
          )}
        </div>

        {/* Approval */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Approval</div>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Approved by</div>
              <div className={styles.fieldValue}>{r.approvedBy || '—'}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Cost centre</div>
              <div className={styles.fieldValue}>{r.costCentre || '—'}</div>
            </div>
            {r.approvalStatus && r.approvalStatus !== 'N/A' && (
              <div className={styles.field}>
                <div className={styles.fieldLabel}>Approval status</div>
                <div className={styles.fieldValue}>{r.approvalStatus}</div>
              </div>
            )}
            {r.exceptionReason && (
              <div className={styles.field}>
                <div className={styles.fieldLabel}>Exception reason</div>
                <div className={styles.fieldValue}>{r.exceptionReason}</div>
              </div>
            )}
          </div>
        </div>

        {/* Fraud / flag section */}
        {isFlagged && (
          <div className={styles.fraudBox}>
            <Flag size={14} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div className={styles.fraudTitle}>
                {r.isVoided ? 'Voided Ticket'
                  : r.isCancelled ? 'Cancelled Ticket'
                  : r.isDuplicate ? 'Possible Duplicate'
                  : 'Flagged for Review'}
                {r.flagSeverity && <span className={`${styles.badge} ${styles.badgeDanger}`}>{r.flagSeverity}</span>}
              </div>
              {r.flagReason && <div className={styles.fraudDesc}>{r.flagReason}</div>}
              {r.duplicateOf && <div className={styles.fraudDesc}>Possible duplicate of: <code className={styles.code}>{r.duplicateOf}</code></div>}
              {!r.flagReason && r.notes && <div className={styles.fraudDesc}>{r.notes}</div>}
            </div>
          </div>
        )}

        {/* Spotnana section */}
        {r.dataSource === 'spotnana' && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Spotnana Details</div>
            <div className={styles.grid2}>
              {r.tripId     && <div className={styles.field}><div className={styles.fieldLabel}>Trip ID</div><div className={styles.fieldValue}><code className={styles.code}>{r.tripId}</code></div></div>}
              {r.tripName   && <div className={styles.field}><div className={styles.fieldLabel}>Trip Name</div><div className={styles.fieldValue}>{r.tripName}</div></div>}
              {r.bookingMode && <div className={styles.field}><div className={styles.fieldLabel}>Booking Mode</div><div className={styles.fieldValue}>{r.bookingMode}</div></div>}
              {r.bookingSource && <div className={styles.field}><div className={styles.fieldLabel}>Booking Source</div><div className={styles.fieldValue}>{r.bookingSource}</div></div>}
              {r.policyGroup && <div className={styles.field}><div className={styles.fieldLabel}>Policy Group</div><div className={styles.fieldValue}>{r.policyGroup}</div></div>}
              {r.ticketNumber && <div className={styles.field}><div className={styles.fieldLabel}>Spotnana PNR</div><div className={styles.fieldValue}><code className={styles.code}>{r.ticketNumber}</code></div></div>}
              {r.transactionType && (
                <div className={styles.field}>
                  <div className={styles.fieldLabel}>Transaction Type</div>
                  <div className={styles.fieldValue}>
                    {r.transactionType}
                    {r.isVoided && <span className={`${styles.badge} ${styles.badgeDanger}`} style={{ marginLeft: 6 }}>VOIDED</span>}
                  </div>
                </div>
              )}
              {r.creditCardLabel && <div className={styles.field}><div className={styles.fieldLabel}>Credit Card</div><div className={styles.fieldValue}>{r.creditCardLabel}</div></div>}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <button className={`${styles.actionBtn} ${styles.actionReview}`}><CheckCircle size={13} /> Mark as Reviewed</button>
          <button className={`${styles.actionBtn} ${styles.actionFlag}`}><Flag size={13} /> Flag for Investigation</button>
          {isViolation && <button className={`${styles.actionBtn} ${styles.actionApprove}`}><CheckCircle size={13} /> Approve Exception</button>}
          <button className={`${styles.actionBtn} ${styles.actionClose}`} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
