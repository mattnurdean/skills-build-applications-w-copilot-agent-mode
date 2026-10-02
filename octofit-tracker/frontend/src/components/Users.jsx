import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'

const fetch = fetchCollection

export default function Users() {
  const endpoint = '/api/users/'
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetch(endpoint)
      .then(setUsers)
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section>
      <span className="eyebrow">Your community</span>
      <h1>Users</h1>
      <CollectionState loading={state.loading} error={state.error} emptyMessage="No users found.">
        {users.length > 0 && (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead><tr><th>Name</th><th>Username</th><th>Points</th></tr></thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id}>
                    <td>{user.displayName || user.name || 'Athlete'}</td>
                    <td>@{user.username || 'unknown'}</td>
                    <td>{user.points || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CollectionState>
    </section>
  )
}
