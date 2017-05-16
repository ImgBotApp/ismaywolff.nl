/* global Raven */
/* eslint-disable import/first */

// Globally scoped css
import 'normalize.css'
import './index.css'

import load from 'load-script'
import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { url, config, logError } from '../shared/services/raven'
import configureStore from '../shared/store'
import { App, AppWithErrors } from './components/app'

// Initialize error tracking
const hasRaven = typeof Raven !== 'undefined' && 'config' in Raven
const isProd = process.env.NODE_ENV === 'production'
if (isProd && hasRaven) {
  Raven.config(url, config).install()
}

// Feature tests
const hasFetch = 'fetch' in window
const hasPromise = 'Promise' in window
const hasObjectAssign = typeof Object.assign === 'function'

// Boots the app, shows errors if there were any
function boot(error) {
  if (error) {
    logError(error)
    render(<AppWithErrors errorMessage={error.message} />, document.getElementById('app'))
  } else {
    // Initialize analytics
    const history = createHistory()
    import('./services/analytics').then(analytics => analytics.init(history))

    // Hydrate store
    const preloadedState = window.preloadedState
    delete window.preloadedState
    const store = configureStore(preloadedState)

    // Set cookie
    const release = process.env.RELEASE
    const commit = release.substring(0, release.indexOf('-'))
    document.cookie = `commit=${commit}`

    render(<App store={store} history={history} />, document.getElementById('app'))
  }
}

// Checks if the client supports all necessary features, and polyfills them if necessary
if (hasFetch && hasPromise && hasObjectAssign) {
  boot()
} else {
  load('https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,Object.assign,Promise', boot)
}
