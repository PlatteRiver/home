/**
 * Verbose client-side logging for one-shot debugging (paste console to Cursor).
 * Always on — remove or gate later if noise is an issue.
 */
const startMs = typeof performance !== 'undefined' ? performance.now() : 0

export function platteNow() {
  return Math.round((typeof performance !== 'undefined' ? performance.now() : Date.now()) - startMs)
}

const prefix = (scope) => `[Platte +${platteNow()}ms][${scope}]`

/** Log one line + optional JSON pretty-print for objects */
export function platteDebug(scope, message, data) {
  const p = prefix(scope)
  if (data !== undefined) {
    console.log(p, message, data)
    if (data !== null && typeof data === 'object' && !(data instanceof Error)) {
      try {
        console.log(`${p} ${message} ↴ JSON\n`, JSON.stringify(data, null, 2))
      } catch (_) {
        console.log(`${p} (JSON stringify failed)`)
      }
    }
  } else {
    console.log(p, message)
  }
}

/** Snapshot of every form on the page (Netlify duplicate-name debugging). */
export function platteDebugDomForms(scope = 'DOM') {
  if (typeof document === 'undefined') return
  const forms = [...document.forms]
  platteDebug(scope, 'document.forms count', forms.length)
  forms.forEach((f, i) => {
    const names = [...new Set([...f.elements].map((el) => el.name).filter(Boolean))]
    platteDebug(scope, `form[${i}]`, {
      name: f.name || '(no name)',
      id: f.id || '(no id)',
      method: f.method,
      action: f.action || '(empty)',
      fieldNames: names,
    })
  })
}

/** Log FetchResponse metadata without consuming the original body stream. */
export async function platteDebugResponse(scope, res, label = 'fetch response') {
  const headersObj = {}
  try {
    res.headers.forEach((v, k) => {
      headersObj[k] = v
    })
  } catch (_) {}
  let bodyText = ''
  try {
    bodyText = await res.clone().text()
  } catch (e) {
    platteDebug(scope, `${label} clone.text() failed`, { name: e?.name, message: e?.message })
    return { bodyText: '', headersObj }
  }
  const snippet = bodyText.slice(0, 3500)
  const looksLikeNetlifySuccess =
    /thank you|submitted successfully|form.*success/i.test(bodyText) ||
    (bodyText.length < 800 && !/<!DOCTYPE/i.test(bodyText))
  platteDebug(scope, `${label}`, {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    type: res.type,
    url: res.url,
    redirected: res.redirected,
    bodyLength: bodyText.length,
    looksLikeNetlifySuccessHint: looksLikeNetlifySuccess,
    bodySnippet: snippet,
    headers: headersObj,
  })
  if (bodyText.length > 3500) {
    platteDebug(scope, `${label} body …truncated`, `Total ${bodyText.length} chars; showing first 3500 in bodySnippet above`)
  }
  return { bodyText, headersObj }
}
