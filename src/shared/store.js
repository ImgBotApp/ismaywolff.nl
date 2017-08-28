/* global window */

import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { __REDUX_DEVTOOLS_EXTENSION__ } from './constants'
import rootReducer from './rootReducer'
import logErrors from './data/errors'
import { persistState } from './services/persist'

// Initialize devtools if on the client
const devTools =
  typeof window === 'object' && window[__REDUX_DEVTOOLS_EXTENSION__]
    ? window[__REDUX_DEVTOOLS_EXTENSION__]()
    : f => f

// Returns a store and accepts an initial state
const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(thunk, logErrors), devTools)
  )

  // Attempt to persist store on changes
  store.subscribe(() => {
    persistState(store.getState())
  })

  return store
}

export default configureStore
