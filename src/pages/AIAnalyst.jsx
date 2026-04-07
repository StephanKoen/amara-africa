import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader, FileText, AlertCircle, Sparkles } from 'lucide-react'
import { useTravelData } from '../context/TravelDataContext'
import PageHeader from '../components/PageHeader'
import styles from './AIAnalyst.module.css'

const SYSTEM_PROMPT = `You are Traivio AI, an expert corporate travel analyst. You analyze travel spend data, identify anomalies, fraud risks, policy violations, and cost-saving opportunities. When given CSV data, provide concise, data-driven insights in a professional tone. Format key figures as bullet points when helpful.`

const SUGGESTED = [
  'What are the top 3 cost-saving opportunities?',
  'Are there any suspicious or fraudulent transactions?',
  'Which travelers are most out of policy?',
  'Summarize overall spend patterns and anomalies.',
  'What hotel spend can be consolidated?',
]

function csvPreview(data, maxRows = 50) {
  if (!data?.length) return ''
  const headers = Object.keys(data[0])
  const rows = data.slice(0, maxRows).map(r => headers.map(h => r[h] ?? '').join(','))
  return [headers.join(','), ...rows].join('\n')
}

export default function AIAnalyst() {
  const { travelData, fileName } = useTravelData()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef()
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send(text) {
    const question = text || input.trim()
    if (!question) return
    setInput(''); setError(null)
    const userMsg = { role: 'user', content: question }
    const history = [...messages, userMsg]
    setMessages(history); setLoading(true)

    try {
      const contextContent = travelData
        ? `Travel data file: "${fileName}"\n\nCSV data (first 50 rows):\n\`\`\`csv\n${csvPreview(travelData)}\n\`\`\`\n\nQuestion: ${question}`
        : question

      const requestMessages = travelData
        ? [{ role: 'user', content: contextContent }]
        : history.map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: requestMessages,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error?.message || `API error ${res.status}`)
      }
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content?.[0]?.text || 'No response.' }])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const noKey = !apiKey || apiKey === 'your_api_key_here'

  return (
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
          {travelData ? (
            <div className={styles.dataStatus}>
              <FileText size={12} /> {fileName} · {travelData.length} rows
            </div>
          ) : (
            <div className={styles.noData}>Upload a CSV on the Overview page for data-grounded analysis.</div>
          )}
        </div>

        <div className={styles.chatWrap}>
          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.empty}>
                <Bot size={40} strokeWidth={1.5} />
                <p>Ask Traivio AI anything about your corporate travel data.</p>
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
            {loading && (
              <div className={`${styles.msg} ${styles.assistant}`}>
                <div className={styles.avatar}><Sparkles size={13} /></div>
                <div className={styles.bubble}><Loader size={14} className={styles.spin} /></div>
              </div>
            )}
            {error && (
              <div className={styles.errorMsg}><AlertCircle size={13} /> {error}</div>
            )}
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
  )
}
