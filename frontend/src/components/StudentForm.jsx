const ORDINAL = ['Low', 'Medium', 'High']
const LEARNING = ['Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing']
const BASE = import.meta.env.VITE_API_URL ?? ''

const fields = [
  { key: 'StudyHours', label: 'Study Hours / week', type: 'number', min: 0, max: 40, step: 0.5, default: 10 },
  { key: 'Attendance', label: 'Attendance (%)', type: 'number', min: 0, max: 100, step: 1, default: 80 },
  { key: 'AssignmentCompletion', label: 'Assignment Completion (%)', type: 'number', min: 0, max: 100, step: 1, default: 80 },
  { key: 'ExamScore', label: 'Exam Score (%)', type: 'number', min: 0, max: 100, step: 1, default: 70 },
  { key: 'Age', label: 'Age', type: 'number', min: 15, max: 35, step: 1, default: 20 },
  { key: 'OnlineCourses', label: 'Online Courses taken', type: 'number', min: 0, max: 20, step: 1, default: 2 },
  { key: 'Resources', label: 'Resources Access', type: 'select', options: ORDINAL },
  { key: 'Motivation', label: 'Motivation Level', type: 'select', options: ORDINAL },
  { key: 'StressLevel', label: 'Stress Level', type: 'select', options: ORDINAL },
  { key: 'LearningStyle', label: 'Learning Style', type: 'select', options: LEARNING },
  { key: 'Gender', label: 'Gender', type: 'select', options: ['Female', 'Male'] },
  { key: 'Internet', label: 'Internet Access', type: 'select', options: ['No', 'Yes'] },
  { key: 'EduTech', label: 'Uses EduTech Tools', type: 'select', options: ['No', 'Yes'] },
  { key: 'Extracurricular', label: 'Extracurricular Activities', type: 'select', options: ['No', 'Yes'] },
  { key: 'Discussions', label: 'Participates in Discussions', type: 'select', options: ['No', 'Yes'] },
]

function initState() {
  const s = {}
  fields.forEach(f => { s[f.key] = f.default ?? 0 })
  return s
}

import { useState } from 'react'

export default function StudentForm({ onResult }) {
  const [values, setValues] = useState(initState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function set(key, val) { setValues(v => ({ ...v, [key]: val })) }

  async function submit() {
    setLoading(true); setError(null)
    try {
      const payload = { ...values }
      const res = await fetch(`${BASE}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      onResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {fields.map(f => (
          <div key={f.key}>
            <label>{f.label}</label>
            {f.type === 'number' ? (
              <input type="number" min={f.min} max={f.max} step={f.step}
                value={values[f.key]}
                onChange={e => set(f.key, parseFloat(e.target.value))} />
            ) : (
              <select value={values[f.key]} onChange={e => set(f.key, parseInt(e.target.value))}>
                {f.options.map((o, i) => <option key={o} value={i}>{o}</option>)}
              </select>
            )}
          </div>
        ))}
      </div>
      {error && <p style={{ color: 'var(--accent2)', marginBottom: '1rem', fontSize: '14px' }}>Error: {error}</p>}
      <button className="btn" onClick={submit} disabled={loading}>
        {loading ? 'Analysing...' : 'Predict cluster →'}
      </button>
    </div>
  )
}