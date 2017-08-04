/* global window, localStorage */
/* eslint-disable no-underscore-dangle */

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
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      : false
  const preloadedState = typeof window !== 'undefined' ? window.__PRELOADEDSTATE__ : false

  if (persistedState) {
    return persistedState
  }

  if (preloadedState) {
    persistState(preloadedState)
    return preloadedState
  }

  return {}
}

export default getState
