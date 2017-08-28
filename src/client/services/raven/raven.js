/* global Raven */

import load from 'load-script'
import { url, config } from '../../../shared/services/raven'

/**
 * Initialize error tracking in production
 */

const init = () => {
  if (process.env.NODE_ENV === 'production') {
    load('https://cdn.ravenjs.com/3.17.0/raven.min.js', () => {
      if (typeof Raven !== 'undefined' && 'config' in Raven) {
        Raven.config(url, config).install()
      }
    })
  }
}

export default init
