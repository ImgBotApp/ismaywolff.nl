/* global Raven */

import load from 'load-script'
import { __ERROR_EVENTS__ } from '../../../shared/constants'
import { url, config, logError } from '../../../shared/services/raven'

/**
 * Initialize error tracking in production and log uncaught errors
 */

const init = () => {
  if (process.env.NODE_ENV === 'production') {
    load('https://cdn.ravenjs.com/3.17.0/raven.min.js', () => {
      if (typeof Raven !== 'undefined' && 'config' in Raven) {
        Raven.config(url, config).install()
      }

      if (__ERROR_EVENTS__ in window) {
        const errorEvents = window[__ERROR_EVENTS__].q || []
        errorEvents.map(event => logError(event.error))
        removeEventListener('error', window[__ERROR_EVENTS__])
        delete window[__ERROR_EVENTS__]
      }
    })
  }
}

export default init
