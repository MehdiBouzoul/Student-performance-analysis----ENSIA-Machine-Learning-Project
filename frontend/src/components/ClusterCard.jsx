const BADGE = ['badge-green', 'badge-orange', 'badge-amber']
const COLORS = ['var(--accent)', 'var(--accent2)', 'var(--warn)']

export default function ClusterCard({ cluster }) {
  const { cluster_id, label, description, recommendations } = cluster
  return (
    <div className="card" style={{ borderTop: `3px solid ${COLORS[cluster_id]}` }}>
      <span className={`badge ${BADGE[cluster_id]}`} style={{ marginBottom: '0.6rem' }}>Cluster {cluster_id}</span>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{label}</h3>
      <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '1rem' }}>{description}</p>
      <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '0.5rem' }}>Recommendations</p>
      <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {recommendations.map((r, i) => <li key={i} style={{ fontSize: '13px' }}>{r}</li>)}
      </ul>
    </div>
  )
}