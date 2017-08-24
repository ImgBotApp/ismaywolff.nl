import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { actions as workActions } from '../../data/works'
import { actions as imageActions } from '../../data/images'

class AppShell extends Component {
  static needs() {
    return [workActions.fetchWorksIfNeeded(), imageActions.fetchImagesIfNeeded()]
  }

  render() {
    return (
      <Helmet>
        <title>Ismay Wolff</title>
        <meta name="description" content="The portfolio of Ismay Wolff" />
      </Helmet>
    )
  }
}

export default AppShell
