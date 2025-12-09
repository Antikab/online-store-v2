const clearAuthHash = () => {
  const hash = window.location.hash
  if (!hash) return

  const params = new URLSearchParams(hash.substring(1))
  if (params.get('access_token')) {
    window.history.replaceState(null, '', window.location.pathname)
  }
}

export { clearAuthHash }
