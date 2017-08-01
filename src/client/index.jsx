/* global Raven */
/* eslint-disable no-underscore-dangle, no-mixed-operators */

import load from 'load-script'
import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { url, config, logError } from '../shared/services/raven'
import configureStore from '../shared/store'
import { App, AppWithErrors } from './components/app'

/**
 * Initialize error tracking in production and log uncaught errors
 */

if (process.env.NODE_ENV === 'production') {
  load('https://cdn.ravenjs.com/3.17.0/raven.min.js', () => {
    if (typeof Raven !== 'undefined' && 'config' in Raven) {
      Raven.config(url, config).install()
    }

    if ('__ERROR_EVENTS__' in window) {
      const errorEvents = window.__ERROR_EVENTS__.q || []
      errorEvents.map(event => logError(event.error))
      removeEventListener('error', window.__ERROR_EVENTS__)
      delete window.__ERROR_EVENTS__
    }
  })
}

/**
 * Initialize offline runtime
 */

OfflinePluginRuntime.install()

/**
 * Feature tests
 */

const hasFetch = 'fetch' in window
const hasPromise = 'Promise' in window
const hasObjectAssign = typeof Object.assign === 'function'

/**
 * Boots the app, shows errors if there were any
 */

const boot = error => {
  if (error) {
    logError(error)
    render(<AppWithErrors errorMessage={error.message} />, document.getElementById('app'))
  } else {
    // Initialize analytics
    const history = createHistory()
    import('./services/analytics').then(analytics => analytics.init(history))

    // Hydrate store
    const preloadedState = '__PRELOADEDSTATE__' in window ? window.__PRELOADEDSTATE__ : {}
    if ('__PRELOADEDSTATE__' in window) delete window.__PRELOADEDSTATE__
    const store = configureStore(preloadedState)

    render(<App store={store} history={history} />, document.getElementById('app'))
  }
}

/**
 * Checks if the client supports all necessary features, and polyfills them if necessary
 */

if (hasFetch && hasPromise && hasObjectAssign) {
  boot()
} else {
  load('https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,Object.assign,Promise', boot)
}
