import React, { PropTypes } from 'react'
import Router from 'react-router/BrowserRouter'
import { Provider } from 'react-redux'
import Routes from './Routes'

function App({ store }) {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
