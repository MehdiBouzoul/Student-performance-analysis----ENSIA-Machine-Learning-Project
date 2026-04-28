import { useNavigate } from 'react-router-dom'

const clusters = [
  { label: 'Consistent Average Performers', badge: 'badge-green', desc: 'Balanced effort with steady, improvable results.' },
  { label: 'Last-Minute High Performers', badge: 'badge-orange', desc: 'Strategic learners — high output, low routine effort.' },
  { label: 'Struggling / At-Risk Students', badge: 'badge-amber', desc: 'Engaged but underperforming — need targeted support.' },
]

export default function HomePage() {
  const nav = useNavigate()
  return (
    <div className="container">
      <div style={{ maxWidth: 560, marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>Understand your students at a glance</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
          StudentLens uses Gaussian Mixture Models to cluster students into meaningful performance profiles — then gives actionable recommendations for each.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn" onClick={() => nav('/predict')}>Predict a student →</button>
          <button className="btn btn-outline" onClick={() => nav('/insights')}>View insights</button>
        </div>
      </div>

      <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--muted)', fontFamily: 'DM Sans', fontWeight: 500 }}>The 3 student profiles</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {clusters.map(c => (
          <div key={c.label} className="card">
            <span className={`badge ${c.badge}`} style={{ marginBottom: '0.75rem' }}>{c.label}</span>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}