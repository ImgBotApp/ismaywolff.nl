export const getWorkEntities = state => state.entities.works
export const getWorkState = state => state.works
export const checkHasWorks = state => state.works.result.length > 0

/**
 * Checks whether works should be fetched based on the current state
 */

export const shouldFetchWorks = state => {
  const hasWorks = checkHasWorks(state)
  const workState = getWorkState(state)

  if (workState.isFetching) {
    return false
  } else if (!hasWorks) {
    return true
  }

  return false
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
