import { useRef, useState } from 'react'
import { Upload, FileText, CheckCircle, AlertTriangle, Download, Sparkles, Database } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTravelData } from '../context/TravelDataContext'
import { detectAndParse, applyMapping, downloadCSVTemplate, downloadExcelTemplate, parseSpotnanaExport } from '../utils/dataParser'
import styles from './UploadData.module.css'

export default function UploadData() {
  const navigate   = useNavigate()
  const { setPendingFile, setUploadedData, setFileName } = useTravelData()
  const templateRef  = useRef()
  const smartRef     = useRef()
  const spotnanaRef  = useRef()
  const [loading, setLoading] = useState(null) // 'template' | 'smart' | 'spotnana' | null
  const [error,   setError]   = useState(null)
  const [spotnanaResult, setSpotnanaResult] = useState(null)

  async function handleFile(file, isTemplate) {
    if (!file) return
    setLoading(isTemplate ? 'template' : 'smart')
    setError(null)
    try {
      const result = await detectAndParse(file)
      if (result.isSpotnana) {
        // Spotnana auto-detected via smart upload
        setUploadedData(result.records)
        setFileName(file.name)
        navigate('/overview')
      } else if (result.isTraivioTemplate) {
        const records = applyMapping(result.rawRows, result.mapping)
        setUploadedData(records)
        setFileName(file.name)
        navigate('/overview')
      } else {
        setPendingFile(result)
        navigate('/overview') // ColumnMapper will intercept
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(null)
    }
  }

  async function handleSpotnanaFile(file) {
    if (!file) return
    setLoading('spotnana')
    setError(null)
    setSpotnanaResult(null)
    try {
      const result = await parseSpotnanaExport(file)
      setSpotnanaResult(result)
      setUploadedData(result.records)
      setFileName(file.name)
      setTimeout(() => navigate('/overview'), 1200)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Upload your travel data</h1>
        <p className={styles.sub}>Choose the upload method that works best for you</p>
      </div>

      {error && (
        <div className={styles.error}>
          <AlertTriangle size={15} /> {error}
        </div>
      )}

      <div className={styles.cards}>
        {/* ── Template card ── */}
        <div className={`${styles.card} ${styles.templateCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon} style={{ background: '#ECFDF5' }}>
              <CheckCircle size={22} color="#10B981" />
            </div>
            <div>
              <div className={styles.cardTitle}>Template upload</div>
              <span className={`${styles.badge} ${styles.badgeGreen}`}>100% Accurate</span>
            </div>
          </div>
          <p className={styles.cardDesc}>Use the Traivio template for guaranteed perfect results every time.</p>
          <ul className={styles.features}>
            <li><CheckCircle size={13} color="#10B981" /> Perfect column mapping every time</li>
            <li><CheckCircle size={13} color="#10B981" /> Instant analysis — no confirmation needed</li>
            <li><CheckCircle size={13} color="#10B981" /> Recommended for regular reporting</li>
          </ul>
          <div className={styles.downloadRow}>
            <button className={styles.dlBtn} onClick={downloadCSVTemplate}>
              <Download size={13} /> CSV Template
            </button>
            <button className={styles.dlBtn} onClick={downloadExcelTemplate}>
              <Download size={13} /> Excel Template
            </button>
          </div>
          <div
            className={`${styles.dropzone} ${styles.dropGreen}`}
            onClick={() => templateRef.current.click()}
            onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0], true) }}
            onDragOver={e => e.preventDefault()}
          >
            {loading === 'template' ? (
              <div className={styles.spinner} />
            ) : (
              <>
                <Upload size={22} color="#10B981" />
                <span>Upload completed template</span>
              </>
            )}
            <input ref={templateRef} type="file" accept=".csv,.xlsx,.xls" hidden
              onChange={e => handleFile(e.target.files[0], true)} />
          </div>
        </div>

        {/* ── Smart upload card ── */}
        <div className={`${styles.card} ${styles.smartCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon} style={{ background: '#FFFBEB' }}>
              <Sparkles size={22} color="#F59E0B" />
            </div>
            <div>
              <div className={styles.cardTitle}>Smart upload</div>
              <span className={`${styles.badge} ${styles.badgeAmber}`}>Any Format</span>
            </div>
          </div>
          <p className={styles.cardDesc}>Upload any export from any travel management system.</p>
          <ul className={styles.features}>
            <li><CheckCircle size={13} color="#10B981" /> Works with Concur, Amex, and other TMS exports</li>
            <li><CheckCircle size={13} color="#10B981" /> Any column names, any structure</li>
            <li><AlertTriangle size={13} color="#F59E0B" /> AI mapping — review before confirming</li>
          </ul>
          <div className={styles.disclaimer}>
            <AlertTriangle size={13} />
            Depending on data quality, some fields may be misidentified. You will always confirm mapping before analysis runs.
          </div>
          <div
            className={`${styles.dropzone} ${styles.dropAmber}`}
            onClick={() => smartRef.current.click()}
            onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0], false) }}
            onDragOver={e => e.preventDefault()}
          >
            {loading === 'smart' ? (
              <div className={styles.spinner} />
            ) : (
              <>
                <Upload size={22} color="#F59E0B" />
                <span>Upload your travel export</span>
              </>
            )}
            <input ref={smartRef} type="file" accept=".csv,.xlsx,.xls" hidden
              onChange={e => handleFile(e.target.files[0], false)} />
          </div>
        </div>

        {/* ── Spotnana card ── */}
        <div className={`${styles.card} ${styles.spotnanaCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon} style={{ background: '#EFF6FF' }}>
              <Database size={22} color="#3B82F6" />
            </div>
            <div>
              <div className={styles.cardTitle}>Spotnana All Transactions</div>
              <span className={`${styles.badge} ${styles.badgeBlue}`}>Auto-detected</span>
            </div>
          </div>
          <p className={styles.cardDesc}>
            Upload your Spotnana All Transactions Report directly — zero mapping required.
          </p>
          <ul className={styles.features}>
            <li><CheckCircle size={13} color="#10B981" /> Automatic header row detection (skips metadata)</li>
            <li><CheckCircle size={13} color="#10B981" /> All 59 Spotnana fields mapped perfectly</li>
            <li><CheckCircle size={13} color="#10B981" /> Policy compliance pre-mapped</li>
            <li><CheckCircle size={13} color="#10B981" /> Approver / approval status pre-mapped</li>
            <li><CheckCircle size={13} color="#10B981" /> Voided tickets flagged automatically</li>
          </ul>

          {spotnanaResult ? (
            <div className={styles.spotnanaSuccess}>
              <CheckCircle size={15} color="#10B981" />
              <div>
                <div className={styles.spotnanaSuccessTitle}>Spotnana format detected — perfect accuracy</div>
                <div className={styles.spotnanaSuccessMeta}>
                  {spotnanaResult.activeCount} active · {spotnanaResult.voidedCount > 0 ? `${spotnanaResult.voidedCount} voided (excluded) · ` : ''}{spotnanaResult.totalRecords} total
                </div>
                <div className={styles.spotnanaSuccessMeta}>Redirecting to analysis…</div>
              </div>
            </div>
          ) : (
            <div
              className={`${styles.dropzone} ${styles.dropBlue}`}
              onClick={() => spotnanaRef.current.click()}
              onDrop={e => { e.preventDefault(); handleSpotnanaFile(e.dataTransfer.files[0]) }}
              onDragOver={e => e.preventDefault()}
            >
              {loading === 'spotnana' ? (
                <div className={styles.spinnerBlue} />
              ) : (
                <>
                  <Upload size={22} color="#3B82F6" />
                  <span>Upload Spotnana export (.xlsx)</span>
                </>
              )}
              <input ref={spotnanaRef} type="file" accept=".xlsx,.xls" hidden
                onChange={e => handleSpotnanaFile(e.target.files[0])} />
            </div>
          )}

          <div className={styles.spotnanaNote}>
            Export from Spotnana: Reports → All Transactions Report
          </div>
        </div>
      </div>
    </div>
  )
}
