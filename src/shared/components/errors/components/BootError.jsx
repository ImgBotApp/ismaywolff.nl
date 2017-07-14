import React from 'react'
import { string } from 'prop-types'
import { Link } from '../../link'
import { Title } from '../../text'
import ErrorWrapper from './ErrorWrapper'

/**
 * Shown for errors that occur while booting / polyfilling.
 */

const BootError = ({ errorMessage }) =>
  <ErrorWrapper type="error">
    <Title tag="h2" margin="0" center>
      Oops, something went wrong!
    </Title>
    <p>
      This page uses modern javascript that your browser doesn{"'"}t support and patching it has
      failed. Make sure that your browser extensions are not blocking the polyfill.io domain and
      refresh the page to retry or{' '}
      <Link href="http://outdatedbrowser.com">update your browser</Link>
      .
    </p>
    <p>
      In most cases I{"'"}ll be notified automatically that something went wrong and I{"'"}ll make
      sure to fix it as soon as possible. If you want to report this error you can do so on the
      issues tab of my <Link href="https://github.com/ismay/ismaywolff.nl">github repo</Link>
      .
    </p>
    <p>
      The error was: {'"'}
      {errorMessage}
      {'"'}.
    </p>
  </ErrorWrapper>

BootError.propTypes = {
  errorMessage: string.isRequired
}

export default BootError
