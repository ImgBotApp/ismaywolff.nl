import React from 'react'
import { string, func, shape, object } from 'prop-types'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { injectGlobal } from 'styled-components'
import { Root } from '../../../../shared/components/root'
import { normalizeCss, globalCss } from '../../../../shared/styles'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${normalizeCss}
  ${globalCss}
`

const App = ({ location, context, store }) =>
  <Provider store={store}>
    <StaticRouter location={location} context={context}>
      <Root />
    </StaticRouter>
  </Provider>

App.propTypes = {
  store: shape({
    dispatch: func.isRequired,
    getState: func.isRequired
  }).isRequired,
  location: string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  context: object.isRequired
}

export default App
