import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader, FileText, AlertCircle, Sparkles } from 'lucide-react'
import { useTravelData } from '../context/TravelDataContext'
import PageHeader from '../components/PageHeader'
import FilterPills from '../components/FilterPills'
import { callAnthropic } from '../utils/anthropicClient'
import styles from './AIAnalyst.module.css'
import innerStyles from './InnerPage.module.css'

const SUGGESTED = [
  'What are the top 3 cost-saving opportunities?',
  'Are there any suspicious or fraudulent transactions?',
  'Which travelers are most out of policy?',
  'Summarize overall spend patterns and anomalies.',
  'Which vendors are we spending the most with?',
]

function csvPreview(records, maxRows = 50) {
  if (!records?.length) return ''
  const headers = ['travelDate','travelerName','department','origin','destination','vendor','category','totalCost','currency','policyStatus','fraudFlag']
  const rows = records.slice(0, maxRows).map(r => headers.map(h => r[h] ?? '').join(','))
  return [headers.join(','), ...rows].join('\n')
}

function buildSystemPrompt(stats, fileName, isDemo) {
  if (!stats) return 'You are Traivio AI, an expert corporate travel analyst.'
  const s = stats
  return `You are Traivio AI, an expert corporate travel analyst.

Here is the travel data you are analysing:
Organisation: ${isDemo ? 'Acme Corp (Demo Data)' : 'Uploaded Organisation'}
Data file: ${fileName || 'demo data'}
Period: ${s.dateRange}
Total records: ${s.totalTrips}
Total spend: $${Math.round(s.totalSpend).toLocaleString('en-US')}
Avg cost per trip: $${Math.round(s.avgCostPerTrip).toLocaleString('en-US')}
Unique travelers: ${s.uniqueTravelers}
Unique vendors: ${s.uniqueVendors}
Compliance rate: ${s.complianceRate}% (target 90%)
Policy violations: ${s.violationCount}
Fraud flags: ${s.fraudFlagCount}
Fare discrepancies (>15% over market): ${s.fareDiscrepancies?.length || 0}
Potential savings identified: $${Math.round((s.potentialSavings || 0) + 41000).toLocaleString('en-US')}

Spend by category:
${Object.entries(s.byCategory || {}).map(([k, v]) => `  ${k}: $${Math.round(v).toLocaleString('en-US')}`).join('\n')}

Spend by department:
${Object.entries(s.byDepartment || {}).map(([k, v]) => `  ${k}: $${Math.round(v).toLocaleString('en-US')}`).join('\n')}

Top 5 travelers by spend:
${(s.topTravelers || []).map(t => `  ${t.name} (${t.department}): $${Math.round(t.amount).toLocaleString('en-US')} across ${t.trips} trips`).join('\n')}

Top routes:
${(s.topRoutes || []).map(r => `  ${r.route}: ${r.count} bookings`).join('\n')}

Answer all questions based specifically on this data.
Be precise with numbers. Format key figures in bold using **bold**.
Always suggest actionable next steps.
Keep responses concise and professional.`
}

export default function AIAnalyst() {
  const { travelData, stats, isDemo, fileName } = useTravelData()
  const [messages,    setMessages]    = useState([])
  const [input,       setInput]       = useState('')
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState(null)
  const [retryStatus, setRetryStatus] = useState(null)
  const bottomRef = useRef()
  const apiKey    = import.meta.env.VITE_ANTHROPIC_API_KEY

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  async function send(text) {
    const question = text || input.trim()
    if (!question) return
    setInput(''); setError(null); setRetryStatus(null)
    const userMsg = { role: 'user', content: question }
    const history = [...messages, userMsg]
    setMessages(history); setLoading(true)

    try {
      const systemPrompt  = buildSystemPrompt(stats, fileName, isDemo)
      const dataContext   = travelData ? `\n\nRaw data sample (first 50 rows):\n\`\`\`csv\n${csvPreview(travelData)}\n\`\`\`` : ''
      const contextualMsg = `${question}${messages.length === 0 ? dataContext : ''}`

      const requestMessages = messages.length === 0
        ? [{ role: 'user', content: contextualMsg }]
        : [...history.slice(0, -1).map(m => ({ role: m.role, content: m.content })), { role: 'user', content: question }]

      const text = await callAnthropic({
        apiKey,
        system:   systemPrompt,
        messages: requestMessages,
        onRetry: (attempt, delayMs) => {
          setRetryStatus(`AI is busy — retrying in ${delayMs / 1000}s... (attempt ${attempt}/3)`)
        },
      })
      setRetryStatus(null)
      setMessages(prev => [...prev, { role: 'assistant', content: text || 'No response.' }])
    } catch (e) {
      setRetryStatus(null)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const noKey = !apiKey || apiKey === 'your_api_key_here'

  return (
    <div>
      <FilterPills />
      <div className={styles.page}>
        <PageHeader title="AI Analyst" description="Claude-powered travel intelligence — ask anything about your data" />

        {noKey && (
          <div className={styles.keyWarning}>
            <AlertCircle size={14} />
            Set <code>VITE_ANTHROPIC_API_KEY</code> in your <code>.env</code> file to enable AI analysis.
          </div>
        )}

        <div className={styles.layout}>
          <div className={styles.sidebar}>
            <div className={styles.sideLabel}>Suggested questions</div>
            {SUGGESTED.map((s, i) => (
              <button key={i} className={styles.chip} onClick={() => send(s)} disabled={loading || noKey}>{s}</button>
            ))}
            {stats && (
              <div className={styles.dataStatus}>
                <FileText size={12} />
                {isDemo ? 'Demo data' : fileName} &middot; {stats.totalTrips} records &middot; {stats.dateRange}
              </div>
            )}
          </div>

          <div className={styles.chatWrap}>
            <div className={styles.messages}>
              {messages.length === 0 && (
                <div className={styles.empty}>
                  <Bot size={40} strokeWidth={1.5} />
                  <p>Ask Traivio AI anything about your corporate travel data.</p>
                  <p style={{ fontSize: 12, opacity: 0.6 }}>
                    {isDemo ? 'Using demo data — upload your file for personalised analysis.' : `Analysing ${stats?.totalTrips} records from ${stats?.dateRange}`}
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.assistant}`}>
                  <div className={styles.avatar}>
                    {m.role === 'user' ? <User size={13} /> : <Sparkles size={13} />}
                  </div>
                  <div className={styles.bubble}>
                    {m.content.split('\n').map((line, j, arr) => (
                      <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                    ))}
                  </div>
                </div>
              ))}
              {retryStatus && (
                <div className={styles.retryMsg}>
                  <Loader size={12} className={styles.spin} /> {retryStatus}
                </div>
              )}
              {loading && !retryStatus && (
                <div className={`${styles.msg} ${styles.assistant}`}>
                  <div className={styles.avatar}><Sparkles size={13} /></div>
                  <div className={styles.bubble}><Loader size={14} className={styles.spin} /></div>
                </div>
              )}
              {error && <div className={styles.errorMsg}><AlertCircle size={13} /> {error}</div>}
              <div ref={bottomRef} />
            </div>

            <div className={styles.inputRow}>
              <input
                className={styles.input}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder={noKey ? 'Add API key to chat…' : 'Ask about your travel data…'}
                disabled={loading || noKey}
              />
              <button className={styles.sendBtn} onClick={() => send()} disabled={loading || noKey || !input.trim()}>
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
