const stats = [
  { label: 'Active Projects',    value: '24',   sub: '3 added this month' },
  { label: 'Open Tasks',         value: '87',   sub: '12 due this week' },
  { label: 'Hours This Week',    value: '142',  sub: 'Across all staff' },
  { label: 'Unpaid Invoices',    value: '£48k', sub: '7 overdue' },
]

export default function DashboardPage() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const name = 'James'

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)' }}>
          {greeting}, {name}
        </h1>
        <p style={{ color: 'var(--muted)', marginTop: '4px', fontSize: '13px' }}>
          Here&apos;s what&apos;s happening across your projects today.
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '20px',
          }}>
            <p style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500, marginBottom: '8px' }}>
              {s.label}
            </p>
            <p style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
              {s.value}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Two column */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Active Projects */}
        <div style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '20px',
        }}>
          <p style={{ fontWeight: 600, marginBottom: '16px' }}>Active Projects</p>
          {['Jupiter Survey', 'Brondesbury Pk', 'Marlow Rd'].map((p, i) => (
            <div key={p} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: '13px' }}>{p}</span>
              <span style={{
                fontSize: '11px', fontWeight: 600,
                background: '#C8DF0020', color: 'var(--accent)',
                padding: '2px 8px', borderRadius: '20px',
              }}>Active</span>
            </div>
          ))}
        </div>

        {/* Tasks Due */}
        <div style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '20px',
        }}>
          <p style={{ fontWeight: 600, marginBottom: '16px' }}>Tasks Due This Week</p>
          {[
            { name: 'Submit structural report', proj: 'PM2608-25', priority: 'High' },
            { name: 'Review drawings',           proj: 'PM2051-23', priority: 'Medium' },
            { name: 'Client call prep',          proj: 'PM1834-24', priority: 'Low' },
          ].map((t, i) => (
            <div key={t.name} style={{
              padding: '10px 0',
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '13px' }}>{t.name}</span>
                <span style={{
                  fontSize: '11px', fontWeight: 600,
                  color: t.priority === 'High' ? '#EF4444' : t.priority === 'Medium' ? '#F59E0B' : 'var(--muted)',
                }}>{t.priority}</span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-mono), monospace' }}>{t.proj}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
