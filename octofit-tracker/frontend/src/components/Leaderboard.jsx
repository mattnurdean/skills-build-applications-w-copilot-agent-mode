import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

const fetch = fetchCollection

export default function Leaderboard() {
  const endpoint = '/api/leaderboard/'
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(endpoint)
      .then(setEntries)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <span className="eyebrow">Friendly competition</span>
      <h1>Leaderboard</h1>
      <CollectionState loading={state.loading} error={state.error} emptyMessage="The leaderboard is waiting for its first scores.">
        {entries.length > 0 && (
          <div className="list-group shadow-sm">
            {entries.map((entry, index) => (
              <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id}>
                <span><strong>#{entry.rank || index + 1}</strong> {entry.user?.displayName || entry.user?.username || entry.name || 'Athlete'}</span>
                <span className="badge text-bg-primary rounded-pill">{entry.points || 0} pts</span>
              </div>
            ))}
          </div>
        )}
      </CollectionState>
    </section>
  )
}
