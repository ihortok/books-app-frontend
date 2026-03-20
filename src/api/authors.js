const BASE = '/api/authors'

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.detail || `Request failed: ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export function listAuthors() {
  return request(`${BASE}/`)
}

export function createAuthor(data) {
  return request(`${BASE}/`, { method: 'POST', body: JSON.stringify(data) })
}

export function updateAuthor(id, data) {
  return request(`${BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
}

export function deleteAuthor(id) {
  return request(`${BASE}/${id}`, { method: 'DELETE' })
}
