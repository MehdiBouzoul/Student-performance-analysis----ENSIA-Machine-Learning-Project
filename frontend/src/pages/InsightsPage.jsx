import { useEffect, useState } from 'react'
import ClusterCard from '../components/ClusterCard'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend, Tooltip
} from 'recharts'

const BASE = import.meta.env.VITE_API_URL ?? ''

const PROFILE_DATA = [
  { metric: 'Study Hours', 0: 65, 1: 40, 2: 55 },
  { metric: 'Attendance', 0: 78, 1: 70, 2: 85 },
  { metric: 'Assignment', 0: 75, 1: 68, 2: 60 },
  { metric: 'Exam Score', 0: 72, 1: 85, 2: 55 },
  { metric: 'Engagement', 0: 70, 1: 55, 2: 80 },
  { metric: 'Wellbeing', 0: 60, 1: 65, 2: 45 },
]

const COLORS = ['#12664A', '#BD8F3C', '#ff0000']
const LABELS = ['Consistent Avg', 'Last-Minute High', 'Struggling']

export default function InsightsPage() {
  const [clusters, setClusters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${BASE}/clusters`)
      .then(r => { if (!r.ok) throw new Error('Backend unreachable'); return r.json() })
      .then(setClusters)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container">
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Cluster Insights</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Overview of the 3 student performance clusters identified by the GMM model.</p>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)', marginBottom: '1rem' }}>Cluster profile comparison (representative values)</p>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={PROFILE_DATA}>
            <PolarGrid stroke="#e2ddd6" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: '#6b6860' }} />
            <Tooltip />
            <Legend formatter={(v) => LABELS[parseInt(v)]} />
            {[0, 1, 2].map(i => (
              <Radar key={i} name={String(i)} dataKey={i}
                stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.12} strokeWidth={2} />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {loading && <p style={{ color: 'var(--muted)' }}>Loading cluster details...</p>}
      {error && <p style={{ color: 'var(--accent2)' }}>Could not load from backend: {error}. Showing static profiles only.</p>}

      {clusters.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {clusters.map(c => <ClusterCard key={c.cluster_id} cluster={c} />)}
        </div>
      )}
    </div>
  )
}