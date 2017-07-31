import React from 'react'
import { object, func, shape } from 'prop-types'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { injectGlobal } from 'styled-components'
import { normalizeCss, globalCss } from '../../../../shared/styles'
import { ScrollToTop } from '../../scroll'
import { Root } from '../../../../shared/components/root'

/**
 * Inject global styles during development
 */

/* istanbul ignore next: not tested since it's not used in production */
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-unused-expressions
  injectGlobal`
    ${normalizeCss}
    ${globalCss}
  `
}

const App = ({ history, store }) =>
  <Provider store={store}>
    <Router history={history}>
      <div>
        <ScrollToTop />
        <Root />
      </div>
    </Router>
  </Provider>

App.propTypes = {
  store: shape({
    dispatch: func.isRequired,
    getState: func.isRequired
  }).isRequired,
  history: shape({
    location: object.isRequired
  }).isRequired
}

export default App
