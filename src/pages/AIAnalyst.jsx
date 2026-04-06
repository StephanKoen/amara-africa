import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader, FileText, AlertCircle } from 'lucide-react'
import { useTravelData } from '../context/TravelDataContext'
import PageHeader from '../components/PageHeader'
import styles from './AIAnalyst.module.css'

const SYSTEM_PROMPT = `You are Traivio AI, an expert corporate travel analyst. You analyze travel spend data, identify anomalies, fraud risks, policy violations, and cost-saving opportunities. When given CSV data, provide concise, data-driven insights in a professional tone. Format key figures as bullet points when helpful.`

const SUGGESTED = [
  'What are the top 3 cost-saving opportunities in this data?',
  'Are there any suspicious or potentially fraudulent transactions?',
  'Which travelers are most out of policy compliance?',
  'Summarize overall spend patterns and anomalies.',
]

function csvPreview(data, maxRows = 50) {
  if (!data || data.length === 0) return ''
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
    setInput('')
    setError(null)

    const userMsg = { role: 'user', content: question }
    const history = [...messages, userMsg]
    setMessages(history)
    setLoading(true)

    try {
      const contextContent = travelData
        ? `The user has uploaded a travel data file: "${fileName}".\n\nHere is the CSV data (up to 50 rows):\n\`\`\`csv\n${csvPreview(travelData)}\n\`\`\`\n\nUser question: ${question}`
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
      const reply = data.content?.[0]?.text || 'No response.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const noKey = !apiKey || apiKey === 'your_api_key_here'

  return (
    <div className={styles.page}>
      <PageHeader
        title="AI Analyst"
        description="Chat with Traivio AI to uncover insights in your travel data"
      />

      {noKey && (
        <div className={styles.keyWarning}>
          <AlertCircle size={15} />
          <span>Set <code>VITE_ANTHROPIC_API_KEY</code> in your <code>.env</code> file to enable AI analysis.</span>
        </div>
      )}

      <div className={styles.layout}>
        <div className={styles.suggestions}>
          <div className={styles.suggTitle}>Suggested questions</div>
          {SUGGESTED.map((s, i) => (
            <button key={i} className={styles.suggItem} onClick={() => send(s)} disabled={loading || noKey}>
              {s}
            </button>
          ))}

          {travelData && (
            <div className={styles.dataStatus}>
              <FileText size={13} />
              <span>{fileName} · {travelData.length} rows loaded</span>
            </div>
          )}
          {!travelData && (
            <div className={styles.noData}>
              No data uploaded. Visit <b>Overview</b> to upload a CSV for contextual analysis.
            </div>
          )}
        </div>

        <div className={styles.chatWrap}>
          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.empty}>
                <Bot size={36} strokeWidth={1.5} />
                <p>Ask me anything about your corporate travel data.</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.assistant}`}>
                <div className={styles.avatar}>
                  {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={styles.bubble}>
                  {m.content.split('\n').map((line, j) => (
                    <span key={j}>{line}{j < m.content.split('\n').length - 1 && <br />}</span>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div className={`${styles.msg} ${styles.assistant}`}>
                <div className={styles.avatar}><Bot size={14} /></div>
                <div className={styles.bubble}><Loader size={14} className={styles.spin} /></div>
              </div>
            )}

            {error && (
              <div className={styles.errorMsg}>
                <AlertCircle size={14} /> {error}
              </div>
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
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
