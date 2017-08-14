/* global window, localStorage */
/* eslint-disable no-underscore-dangle */

import { selectors as imageSelectors } from '../../data/images'
import { selectors as workSelectors } from '../../data/works'
import { LOCAL_STORAGE_KEY } from './constants'
import persistState from './persistState'

/**
 * Gets the store state
 *
 * Prefers persisted state. Falls back to the state created by SSR and returns an empty hash if
 * nothing could be found.
 */

const getState = () => {
  const persistedState =
    typeof localStorage !== 'undefined' && 'getItem' in localStorage
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      : false
  const preloadedState = typeof window !== 'undefined' ? window.__PRELOADEDSTATE__ : false

  if (persistedState) {
    const imagesIsValid = imageSelectors.getIsValid(persistedState)
    const workIsValid = workSelectors.getIsValid(persistedState)

    if (imagesIsValid && workIsValid) {
      return persistedState
    }
  }

  if (preloadedState) {
    persistState(preloadedState)
    return preloadedState
  }

  return {}
}

export default getState
