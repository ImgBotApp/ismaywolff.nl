import React, { Component } from 'react'
import { string } from 'prop-types'
import { ExternalLink } from '../../links'
import { colors } from '../../../styles'
import ErrorContainer from './ErrorContainer'
import ErrorTitle from './ErrorTitle'

// Shown for errors that occur while booting / polyfilling.

class BootError extends Component {
  componentDidMount() {
    const error = new Error(`Boot error: ${this.props.errorMessage}`)

    import('../../../services/analytics').then(analytics => analytics.trackError(error))
  }

  render() {
    return (
      <ErrorContainer background={colors.lightRed} color={colors.darkRed}>
        <ErrorTitle>Oops, something went wrong!</ErrorTitle>
        <p>
          This page uses modern javascript that your browser doesn{"'"}t support and patching it
          has failed. Make sure that your browser extensions are not blocking the polyfill.io
          domain and refresh the page to retry or
          {' '}
          <ExternalLink href="http://outdatedbrowser.com">update your browser</ExternalLink>
          .
        </p>
        <p>
          In most cases I{"'"}ll be notified automatically that something went wrong and I{"'"}ll
          make sure to fix it as soon as possible. If you want to report this error you can do so on
          the issues tab of my
          {' '}
          <ExternalLink href="https://github.com/ismay/ismaywolff.nl">github repo</ExternalLink>
          .
        </p>
        <p>The error was: {'"'}{this.props.errorMessage}{'"'}.</p>
      </ErrorContainer>
    )
  }
}

BootError.propTypes = {
  errorMessage: string.isRequired
}

export default BootError
