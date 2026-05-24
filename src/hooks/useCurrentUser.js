import { useEffect, useState } from 'react'

export function useCurrentUser() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    let cancelled = false
    fetch('/api/auth/me', { credentials: 'same-origin' })
      .then(async (res) => {
        if (cancelled) return
        if (res.status === 200) {
          setUser(await res.json())
        } else {
          setUser(null)
        }
      })
      .catch(() => {
        if (!cancelled) setUser(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return user
}
