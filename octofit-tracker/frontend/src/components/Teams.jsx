import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

const fetch = fetchCollection

export default function Teams() {
  const endpoint = '/api/teams/'
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(endpoint)
      .then(setTeams)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <span className="eyebrow">Train together</span>
      <h1>Teams</h1>
      <CollectionState loading={state.loading} error={state.error} emptyMessage="No teams have been created yet.">
        {teams.length > 0 && (
          <div className="row g-3">
            {teams.map((team) => (
              <div className="col-md-6" key={team._id || team.id}>
                <article className="card h-100">
                  <div className="card-body">
                    <h2 className="card-title">{team.name || 'Team'}</h2>
                    <p className="card-text">{team.description || 'A team ready to make progress.'}</p>
                    <span className="text-secondary">{team.members?.length || 0} members</span>
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
