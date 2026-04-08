'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const { signIn } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <img src="/quorum-logo-Q.png" alt="Quorum Q" style={{ height: '48px', display: 'block' }} />
            <span style={{
              fontSize: '32px',
              fontWeight: 600,
              color: 'var(--text)',
              letterSpacing: '-0.5px',
              fontFamily: 'var(--font-jakarta), sans-serif',
            }}>Desk</span>
          </div>
          <p style={{ color: 'var(--muted)', marginTop: '12px', fontSize: '13px' }}>
            Sign in to your workspace
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '32px',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@quorum.co.uk"
                style={{
                  background: 'var(--card2)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: 'var(--text)',
                  fontSize: '14px',
                  outline: 'none',
                  width: '100%',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  background: 'var(--card2)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: 'var(--text)',
                  fontSize: '14px',
                  outline: 'none',
                  width: '100%',
                }}
              />
            </div>

            {error && (
              <p style={{ color: 'var(--danger)', fontSize: '13px' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? 'var(--accent2)' : 'var(--accent)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '11px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '4px',
                width: '100%',
              }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '12px', marginTop: '24px' }}>
          QDesk · Quorum Associates · Internal use only
        </p>
      </div>
    </div>
  )
}
