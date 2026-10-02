import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

const fetch = fetchCollection

export default function Workouts() {
  const endpoint = '/api/workouts/'
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(endpoint)
      .then(setWorkouts)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <span className="eyebrow">Personalized training</span>
      <h1>Workouts</h1>
      <CollectionState loading={state.loading} error={state.error} emptyMessage="No workouts are available yet.">
        {workouts.length > 0 && (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.id}>
                <article className="card h-100">
                  <div className="card-body">
                    <h2 className="card-title">{workout.name || 'Workout'}</h2>
                    <p className="card-text">{workout.description || 'A workout for your next session.'}</p>
                    <span className="badge text-bg-secondary">{workout.durationMinutes || workout.duration || 0} minutes</span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </CollectionState>
    </section>
  )
}
