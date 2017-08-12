import online from '../../services/online'

/**
 * Simple selectors
 */

export const getImageEntities = state => state.entities.images
export const getImageState = state => state.images
export const getIsFetching = state => getImageState(state).isFetching
export const getResults = state => getImageState(state).result
export const getHasError = state => !!getImageState(state).errorMessage
export const getError = state => getImageState(state).errorMessage

/**
 * Checks whether the retrieved images are valid
 */

export const getHasValidResults = state => {
  const results = getResults(state)
  const entities = getImageEntities(state)

  if (results.length === 0 || Object.keys(entities).length === 0) {
    return false
  }

  return results.every(key => key in entities)
}

/**
 * Checks if images are stale (older than an hour). Also considers images stale if images haven't
 * been fetched yet
 */

export const getIsStaleOrUnfetched = state => {
  const hourInMs = 1000 * 60 * 60
  return Date.now() - state.images.lastUpdated > hourInMs
}

/**
 * Checks if state is valid (i.e. worth persisting or reusing and not corrupted)
 */

export const getIsValid = state => {
  const hasValidResults = getHasValidResults(state)
  const isFetching = getIsFetching(state)
  const isStaleOrUnfetched = getIsStaleOrUnfetched(state)
  const hasError = getHasError(state)

  return hasValidResults && !isFetching && !isStaleOrUnfetched && !hasError
}

/**
 * Checks whether images should be fetched based on the current state
 */

export const getShouldFetchImages = state => {
  const isOnline = online()
  const isFetching = getIsFetching(state)
  const isStaleOrUnfetched = getIsStaleOrUnfetched(state)
  const hasError = getHasError(state)
  const hasValidResults = getHasValidResults(state)

  if (isFetching || !isOnline) {
    // Don't attempt to fetch if already fetching or offline
    return false
  }

  // Fetch if there are no images, if they're stale, if there's an error or the results are invalid
  return isStaleOrUnfetched || hasError || !hasValidResults
}
