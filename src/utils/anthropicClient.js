// Shared Anthropic API caller with exponential backoff on 529 (overloaded)
// Delays: 3s → 6s → 12s, max 3 retries

const RETRY_DELAYS = [3000, 6000, 12000]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Call the Anthropic Messages API with automatic retry on 529.
 *
 * @param {object} params
 * @param {string}   params.apiKey
 * @param {string}   params.system
 * @param {Array}    params.messages
 * @param {string}   [params.model]
 * @param {number}   [params.max_tokens]
 * @param {Function} [params.onRetry]  Called with (attempt, delayMs) before each retry
 * @returns {Promise<string>}  The assistant text response
 */
export async function callAnthropic({ apiKey, system, messages, model, max_tokens, onRetry }) {
  const body = JSON.stringify({
    model:      model      || 'claude-sonnet-4-20250514',
    max_tokens: max_tokens || 1024,
    system,
    messages,
  })

  let attempt = 0

  while (true) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body,
    })

    // Success
    if (res.ok) {
      const data = await res.json()
      return data.content?.[0]?.text || ''
    }

    // 529 — model overloaded, retry with backoff
    if (res.status === 529 && attempt < RETRY_DELAYS.length) {
      const delay = RETRY_DELAYS[attempt]
      onRetry?.(attempt + 1, delay)
      await sleep(delay)
      attempt++
      continue
    }

    // Other error — parse and throw
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error ${res.status}`)
  }
}
