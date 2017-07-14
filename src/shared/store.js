/* global window */
/* eslint-disable no-underscore-dangle */

import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import logErrors from './data/errors'

// Initialize devtools if on the client
const devTools =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f

// Returns a store and accepts an initial state
const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(thunk, logErrors), devTools)
  )

  return store
}

export default configureStore
