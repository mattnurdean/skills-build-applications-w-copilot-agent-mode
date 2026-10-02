import { NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['/', 'Dashboard'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Users'],
  ['/workouts', 'Workouts'],
]

function Dashboard() {
  return (
    <section className="dashboard">
      <span className="eyebrow">OctoFit Tracker</span>
      <h1>Build momentum, together.</h1>
      <p className="lead">
        Track training, celebrate progress, and stay connected to your team.
      </p>
      <div className="dashboard-actions">
        <NavLink className="btn btn-primary" to="/activities">View activities</NavLink>
        <NavLink className="btn btn-outline-primary" to="/workouts">Find a workout</NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <img src={logo} alt="" />
          <span>OctoFit</span>
        </NavLink>
        <nav aria-label="Main navigation">
          {navigation.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={path === '/'}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
