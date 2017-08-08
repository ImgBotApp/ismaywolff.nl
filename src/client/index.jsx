/* eslint-disable no-underscore-dangle, no-mixed-operators */

import load from 'load-script'
import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { logError } from '../shared/services/raven'
import configureStore from '../shared/store'
import { getState } from '../shared/services/persist'
import { App, AppWithErrors } from './components/app'
import { init } from './services/raven'

/**
 * Initialize error tracking in production and log uncaught errors
 */

init()

/**
 * Initialize offline runtime and update when ready
 */

OfflinePluginRuntime.install({
  onInstalled: () => {
    OfflinePluginRuntime.update()
  },
  onUpdateReady: () => {
    OfflinePluginRuntime.applyUpdate()
  },
  onUpdated: () => {
    window.location.reload()
  }
})

/**
 * Boots the app, shows errors if there were any
 */

const boot = error => {
  if (error) {
    logError(error)
    render(<AppWithErrors errorMessage={error.message} />, document.getElementById('app'))
  } else {
    const history = createHistory()
    const store = configureStore(getState())

    import('./services/analytics').then(analytics => analytics.init(history))
    render(<App store={store} history={history} />, document.getElementById('app'))
  }
}

/**
 * Feature tests
 */

const hasFetch = 'fetch' in window
const hasPromise = 'Promise' in window
const hasObjectAssign = typeof Object.assign === 'function'

/**
 * Checks if the client supports all necessary features, and polyfills them if necessary
 */

if (hasFetch && hasPromise && hasObjectAssign) {
  boot()
} else {
  load('https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,Object.assign,Promise', boot)
}
