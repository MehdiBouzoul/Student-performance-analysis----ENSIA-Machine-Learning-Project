import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PredictPage from './pages/PredictPage'
import InsightsPage from './pages/InsightsPage'

export default function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/" className="logo">StudentLens</NavLink>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/predict" className={({ isActive }) => isActive ? 'active' : ''}>Predict</NavLink>
        <NavLink to="/insights" className={({ isActive }) => isActive ? 'active' : ''}>Insights</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/predict" element={<PredictPage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
    </Router>
  )
}