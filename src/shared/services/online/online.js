/* global navigator */

/**
 * Tests if the client is online. Always returns true when run serverside.
 */

const online = () => {
  const hasNavigator = typeof navigator !== 'undefined'
  return hasNavigator ? navigator.onLine : true
}

export default online
