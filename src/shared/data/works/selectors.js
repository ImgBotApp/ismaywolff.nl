import online from '../../services/online'

/**
 * Simple selectors
 */

export const getWorkEntities = state => state.entities.works
export const getWorkState = state => state.works
export const checkHasWorks = state => state.works.result.length > 0

/**
 * Checks if work is stale (older than an hour). Also considers work stale if work hasn't been
 * fetched yet
 */

export const checkIfStale = state => {
  const hourInMs = 1000 * 60 * 60
  return Date.now() - state.works.lastUpdated > hourInMs
}

/**
 * Checks whether works should be fetched based on the current state
 */

export const shouldFetchWorks = state => {
  const isOnline = online()
  const workState = getWorkState(state)
  const isStale = checkIfStale(state)

  if (workState.isFetching || !isOnline) {
    // Don't attempt to fetch if already fetching or offline
    return false
  }

  // Fetch if there's no work or it's stale
  return isStale
}

/**
 * Factory for selectors that filter work by a property
 */

const getByProperty = property => state => {
  const hasWorks = checkHasWorks(state)

  // Return early if there is no work
  if (!hasWorks) return []

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
