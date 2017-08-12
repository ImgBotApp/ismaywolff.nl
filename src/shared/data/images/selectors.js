import online from '../../services/online'

/**
 * Simple selectors
 */

export const getImageEntities = state => state.entities.images
export const getImageState = state => state.images
export const getIsFetching = state => getImageState(state).isFetching
export const getResult = state => getImageState(state).result
export const getHasError = state => !!getImageState(state).errorMessage

/**
 * Checks whether the retrieved images are valid
 */

export const getHasValidResults = state => {
  const amountOfResults = getResult(state).length
  const amountOfEntities = Object.keys(getImageEntities(state)).length

  return amountOfResults > 0 && amountOfEntities > 0 && amountOfResults === amountOfEntities
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

  if (isFetching || !isOnline) {
    // Don't attempt to fetch if already fetching or offline
    return false
  }

  // Fetch if there are no images or they're stale
  return isStaleOrUnfetched
}
