import online from '../../services/online'

/**
 * Simple selectors
 */

export const getImageEntities = state => state.entities.images
export const getImageState = state => state.images
export const checkHasImages = state => state.images.result.length > 0

/**
 * Checks if images are stale (older than an hour). Also considers images stale if images haven't
 * been fetched yet
 */

export const checkIfStale = state => {
  const hourInMs = 1000 * 60 * 60
  return Date.now() - state.images.lastUpdated > hourInMs
}

/**
 * Checks whether images should be fetched based on the current state
 */

export const shouldFetchImages = state => {
  const isOnline = online()
  const imageState = getImageState(state)
  const isStale = checkIfStale(state)

  if (imageState.isFetching || !isOnline) {
    // Don't attempt to fetch if already fetching or offline
    return false
  }

  // Fetch if there are no images or they're stale
  return isStale
}
