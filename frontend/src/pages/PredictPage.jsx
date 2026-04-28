import { useState } from 'react'
import StudentForm from '../components/StudentForm'
import ClusterResult from '../components/ClusterResult'

export default function PredictPage() {
  const [result, setResult] = useState(null)

  return (
    <div className="container">
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Student Predictor</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Fill in the student profile below to predict their performance cluster.</p>
      <div className="card">
        <StudentForm onResult={(r) => { setResult(r); setTimeout(() => document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' }), 100) }} />
      </div>
      <div id="result">
        {result && <ClusterResult result={result} />}
      </div>
    </div>
  )
}