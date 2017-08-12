/* global ga, performance */

import metrics from './metrics'

/**
 * Gets the DOM and window load times and sends them as custom metrics to
 * Google Analytics via an event hit.
 */

const sendNavigationTimingMetrics = () => {
  // Only track performance in supporting browsers
  if (!(window.performance && window.performance.timing)) {
    return
  }

  // If the window hasn't loaded, run this function after the `load` event
  if (document.readyState !== 'complete') {
    window.addEventListener('load', sendNavigationTimingMetrics)
    return
  }

  const nt = performance.timing
  const navStart = nt.navigationStart

  const responseEnd = Math.round(nt.responseEnd - navStart)
  const domLoaded = Math.round(nt.domContentLoadedEventStart - navStart)
  const windowLoaded = Math.round(nt.loadEventStart - navStart)

  /**
   * In some edge cases browsers return very obviously incorrect NT values,
   * e.g. 0, negative, or future times. This validates values before sending.
   */

  const allValuesAreValid = (...values) => values.every(value => value > 0 && value < 6e6)

  if (allValuesAreValid(responseEnd, domLoaded, windowLoaded)) {
    ga('send', 'event', {
      eventCategory: 'Navigation Timing',
      eventAction: 'track',
      nonInteraction: true,
      [metrics.RESPONSE_END_TIME]: responseEnd,
      [metrics.DOM_LOAD_TIME]: domLoaded,
      [metrics.WINDOW_LOAD_TIME]: windowLoaded
    })
  }
}

export default sendNavigationTimingMetrics
