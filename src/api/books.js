const BASE = '/api/books'

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

export function listBooks() {
  return request(`${BASE}/`)
}

export function getBook(id) {
  return request(`${BASE}/${id}`)
}

export function createBook(data) {
  return request(`${BASE}/`, { method: 'POST', body: JSON.stringify(data) })
}

export function updateBook(id, data) {
  return request(`${BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
}

export function deleteBook(id) {
  return request(`${BASE}/${id}`, { method: 'DELETE' })
}
