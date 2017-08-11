/* global localStorage */

import debounce from 'debounce'
import { logError } from '../raven'
import { selectors as imageSelectors } from '../../data/images'
import { selectors as workSelectors } from '../../data/works'
import { LOCAL_STORAGE_KEY } from './constants'

/**
 * Persists the store if localStorage is available and the store is in a state that's worth
 * persisting
 */

const persistState = storeState => {
  if (typeof localStorage !== 'undefined') {
    const hasImages = imageSelectors.checkHasImages(storeState)
    const hasWorks = workSelectors.checkHasWorks(storeState)
    const worksError = storeState.works && storeState.works.errorMessage
    const imagesError = storeState.images && storeState.images.errorMessage

    if (hasImages && hasWorks && !worksError && !imagesError) {
      try {
        const { entities, images, works } = storeState
        const persistedState = { entities, images, works }

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(persistedState))
      } catch (error) {
        logError(error)
      }
    }
  }
}

/**
 * Debounce to prevent slowdown
 */

const debouncedPersistState = debounce(persistState, 200)

export default debouncedPersistState
