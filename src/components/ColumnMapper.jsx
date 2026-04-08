import { useState } from 'react'
import { CheckCircle, AlertCircle, HelpCircle, X, Sparkles } from 'lucide-react'
import { applyMapping } from '../utils/dataParser'
import styles from './ColumnMapper.module.css'

const FIELD_OPTIONS = [
  'Travel Date','Booking Date','Traveler Name','Traveler Email','Department',
  'Cost Centre','Origin','Origin Code','Destination','Destination Code',
  'Vendor','Booking Reference','Ticket Number','Class of Travel','Travel Category',
  'Total Cost','Currency','Policy Status','Approved By','Market Rate','Notes',
  'Ignore this column',
]

const FIELD_KEY_MAP = {
  'Travel Date':'travelDate','Booking Date':'bookingDate','Traveler Name':'travelerName',
  'Traveler Email':'travelerEmail','Department':'department','Cost Centre':'costCentre',
  'Origin':'origin','Origin Code':'originCode','Destination':'destination',
  'Destination Code':'destinationCode','Vendor':'vendor','Booking Reference':'bookingRef',
  'Ticket Number':'ticketNumber','Class of Travel':'classOfTravel','Travel Category':'category',
  'Total Cost':'totalCost','Currency':'currency','Policy Status':'policyStatus',
  'Approved By':'approvedBy','Market Rate':'marketRate','Notes':'notes',
  'Ignore this column':'ignore',
}

function ConfidenceIcon({ level }) {
  if (level === 'high')     return <span className={`${styles.conf} ${styles.confHigh}`}><CheckCircle size={12} /> High</span>
  if (level === 'medium')   return <span className={`${styles.conf} ${styles.confMed}`}><AlertCircle size={12} /> Medium</span>
  if (level === 'low')      return <span className={`${styles.conf} ${styles.confLow}`}><HelpCircle size={12} /> Low</span>
  return <span className={`${styles.conf} ${styles.confNone}`}><X size={12} /> Unmapped</span>
}

export default function ColumnMapper({ data, onConfirm, onCancel }) {
  const { headers, mapping, rawRows, fileName, currency: detCurrency, dateFormat: detDateFormat, isTraivioTemplate } = data

  const [localMapping, setLocalMapping] = useState(() => {
    const m = {}
    headers.forEach(h => { m[h] = { ...mapping[h] } })
    return m
  })

  function setField(header, label) {
    const key = FIELD_KEY_MAP[label] || null
    setLocalMapping(prev => ({ ...prev, [header]: { ...prev[header], detectedAs: key, label, confidence: prev[header]?.confidence || 'manual' } }))
  }

  function handleConfirm() {
    const records = applyMapping(rawRows, localMapping)
    onConfirm(records, localMapping)
  }

  // If Traivio template, show auto-confirm screen
  if (isTraivioTemplate) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.templateDetected}>
            <CheckCircle size={40} color="#10B981" />
            <h2>Traivio template detected</h2>
            <p>Perfect accuracy guaranteed — all columns matched exactly.</p>
            <button className={styles.confirmBtn} onClick={() => {
              const records = applyMapping(rawRows, localMapping)
              onConfirm(records, localMapping)
            }}>
              Load {rawRows.length} records
            </button>
            <button className={styles.cancelLink} onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  const sampleRow = rawRows[0] || {}

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>We've detected your columns — please confirm</h2>
            <p className={styles.sub}>File: <strong>{fileName}</strong> &middot; {rawRows.length} rows</p>
          </div>
          <button className={styles.closeBtn} onClick={onCancel}><X size={18} /></button>
        </div>

        {/* Detection badges */}
        <div className={styles.badges}>
          {detCurrency && (
            <span className={styles.badge}>Currency detected: <strong>{detCurrency}</strong></span>
          )}
          {detDateFormat && (
            <span className={styles.badge}>Date format: <strong>{detDateFormat}</strong></span>
          )}
        </div>

        {/* Mapping table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Your Column</th>
                <th>Sample Value</th>
                <th>Detected As</th>
                <th>Confidence</th>
                <th>Override</th>
              </tr>
            </thead>
            <tbody>
              {headers.map(header => {
                const m = localMapping[header] || {}
                return (
                  <tr key={header}>
                    <td className={styles.colName}>{header}</td>
                    <td className={styles.sample}>{String(sampleRow[header] ?? '').slice(0, 30)}</td>
                    <td className={styles.detected}>{m.label || 'Unmapped'}</td>
                    <td><ConfidenceIcon level={m.confidence} /></td>
                    <td>
                      <select
                        className={styles.select}
                        value={m.label || 'Ignore this column'}
                        onChange={e => setField(header, e.target.value)}
                      >
                        {FIELD_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* AI disclaimer */}
        <div className={styles.disclaimer}>
          <AlertCircle size={14} />
          <span>Analysis based on AI column detection. Please verify key totals against your source data. Exported reports will include this notice.</span>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
          <button className={styles.confirmBtn} onClick={handleConfirm}>
            <Sparkles size={14} /> Confirm &amp; Analyse {rawRows.length} records
          </button>
        </div>
      </div>
    </div>
  )
}
