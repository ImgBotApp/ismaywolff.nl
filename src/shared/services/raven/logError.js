/* global Raven */

/**
 * Logs any errors passed to it to Sentry. Accepts additional data (see docs below).
 *
 * - https://docs.sentry.io/clients/javascript/usage/#passing-additional-data
 */

function logError(error, additional = {}) {
  const hasRaven = typeof Raven !== 'undefined' && 'captureException' in Raven
  if (hasRaven) {
    Raven.captureException(error, additional)
  }
}

export default logError