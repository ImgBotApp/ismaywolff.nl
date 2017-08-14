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
  if (typeof localStorage !== 'undefined' && 'setItem' in localStorage) {
    const imagesIsValid = imageSelectors.getIsValid(storeState)
    const workIsValid = workSelectors.getIsValid(storeState)

    if (imagesIsValid && workIsValid) {
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
