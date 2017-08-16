import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import configureStore from '../shared/store'
import { getState } from '../shared/services/persist'
import { App } from './components/app'
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
 * Boots the app
 */

const history = createHistory()
const store = configureStore(getState())

import('./services/analytics').then(analytics => analytics.init(history))
render(<App store={store} history={history} />, document.getElementById('app'))
