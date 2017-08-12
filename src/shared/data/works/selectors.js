import online from '../../services/online'

/**
 * Simple selectors
 */

export const getWorkEntities = state => state.entities.works
export const getWorkState = state => state.works
export const getIsFetching = state => getWorkState(state).isFetching
export const getResults = state => getWorkState(state).result
export const getHasError = state => !!getWorkState(state).errorMessage
export const getError = state => getWorkState(state).errorMessage

/**
 * Checks whether the retrieved works are valid
 */

export const getHasValidResults = state => {
  const results = getResults(state)
  const entities = getWorkEntities(state)

  if (results.length === 0 || Object.keys(entities).length === 0) {
    return false
  }

  return results.every(key => key in entities)
}

/**
 * Checks if work is stale (older than an hour). Also considers work stale if work hasn't been
 * fetched yet
 */

export const getIsStaleOrUnfetched = state => {
  const hourInMs = 1000 * 60 * 60
  return Date.now() - state.works.lastUpdated > hourInMs
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
 * Checks whether works should be fetched based on the current state
 */

export const getShouldFetchWorks = state => {
  const isOnline = online()
  const isFetching = getIsFetching(state)
  const isStaleOrUnfetched = getIsStaleOrUnfetched(state)
  const hasError = getHasError(state)
  const hasValidResults = getHasValidResults(state)

  if (isFetching || !isOnline) {
    // Don't attempt to fetch if already fetching or offline
    return false
  }

  // Fetch if there are no works, if they're stale, if there's an error or the results are invalid
  return isStaleOrUnfetched || hasError || !hasValidResults
}

/**
 * Factory for selectors that filter work by a property
 */

const getByProperty = property => state => {
  const hasValidResults = getHasValidResults(state)

  // Return early if there is no work
  if (!hasValidResults) {
    return []
  }

  const entities = getWorkEntities(state)
  return Object.keys(entities).filter(entity => entities[entity][property])
}

/**
 * Returns an array of id's of the works that have a `hero = true` property
 */

export const getHero = getByProperty('hero')

/**
 * Returns an array of id's of the works that have a `featured = true` property
 */

export const getFeatured = getByProperty('featured')
