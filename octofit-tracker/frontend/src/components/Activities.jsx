import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

const fetch = fetchCollection

export default function Activities() {
  const endpoint = '/api/activities/'
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(endpoint)
      .then(setActivities)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <span className="eyebrow">Movement log</span>
      <h1>Activities</h1>
      <CollectionState loading={state.loading} error={state.error} emptyMessage="No activities recorded yet.">
        {activities.length > 0 && (
          <div className="row g-3">
            {activities.map((activity) => (
              <div className="col-md-6" key={activity._id || activity.id}>
                <article className="card h-100">
                  <div className="card-body">
                    <h2 className="card-title">{activity.type || activity.name || 'Activity'}</h2>
                    <p className="card-text">{activity.durationMinutes || activity.duration || 0} minutes</p>
                    <span className="badge text-bg-success">{activity.calories || 0} calories</span>
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
