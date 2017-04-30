import React, { Component } from 'react'
import { string } from 'prop-types'
import { ExternalLink } from '../../links'
import { colors } from '../../../styles'
import ErrorContainer from './ErrorContainer'
import ErrorTitle from './ErrorTitle'

/**
 * Shown for api errors and async component errors.
 */

class AppError extends Component {
  componentDidMount() {
    const error = new Error(`App error: ${this.props.errorMessage}`)

    import('../../../services/analytics').then(analytics => analytics.trackError(error))
  }

  render() {
    return (
      <ErrorContainer background={colors.lightRed} color={colors.darkRed}>
        <ErrorTitle>Oops, something went wrong!</ErrorTitle>
        <p>
          Something went wrong while loading this page. Try refreshing the page and check if your
          browser extensions aren{"'"}t blocking anything critical.
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

AppError.propTypes = {
  errorMessage: string.isRequired
}

export default AppError
