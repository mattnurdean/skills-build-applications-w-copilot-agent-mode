export function CollectionState({ loading, error, emptyMessage, children }) {
  if (loading) return <p className="text-secondary">Loading...</p>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!children) return <p className="text-secondary">{emptyMessage}</p>
  return children
}
