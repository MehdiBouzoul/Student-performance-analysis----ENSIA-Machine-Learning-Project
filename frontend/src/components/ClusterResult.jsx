const BADGE = ['badge-green', 'badge-orange', 'badge-amber']

export default function ClusterResult({ result }) {
  const { cluster_id, cluster_label, cluster_description, recommendations, probabilities } = result

  return (
    <div className="card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--accent)' }}>
      <div style={{ marginBottom: '1rem' }}>
        <span className={`badge ${BADGE[cluster_id]}`} style={{ marginBottom: '0.5rem' }}>Cluster {cluster_id}</span>
        <h2 style={{ fontSize: '1.5rem' }}>{cluster_label}</h2>
        <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>{cluster_description}</p>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)', marginBottom: '0.6rem' }}>Cluster probabilities</p>
        {Object.entries(probabilities).map(([label, prob]) => (
          <div key={label} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '3px' }}>
              <span>{label}</span>
              <span style={{ fontWeight: 500 }}>{(prob * 100).toFixed(1)}%</span>
            </div>
            <div style={{ height: '6px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: `${prob * 100}%`, height: '100%', background: 'var(--accent)', borderRadius: '99px', transition: 'width .6s ease' }} />
            </div>
          </div>
        ))}
      </div>

      <div>
        <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--muted)', marginBottom: '0.6rem' }}>Recommendations</p>
        <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {recommendations.map((r, i) => (
            <li key={i} style={{ fontSize: '14px' }}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}