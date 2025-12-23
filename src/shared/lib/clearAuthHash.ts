const clearAuthHash = () => {
  const { hash, pathname, search } = window.location
  if (!hash) return

  const params = new URLSearchParams(hash.substring(1))
  if (params.has('access_token')) {
    const url = pathname + search
    window.history.replaceState(window.history.state, '', url)
  }
}

export { clearAuthHash }
