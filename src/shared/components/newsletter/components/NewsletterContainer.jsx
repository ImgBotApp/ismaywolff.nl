import React from 'react'
import { bool, string, func, shape } from 'prop-types'
import { connect } from 'react-redux'
import { getNewsletterState } from '../selectors'
import {
  newsletterSubscribe,
  newsletterEmailChanged,
  newsletterGotchaChanged,
  newsletterReset
} from '../actions'
import Newsletter from './Newsletter'

export const DumbNewsletterContainer = ({
  handleEmailChange,
  handleGotchaChange,
  handleSubmit,
  handleReset,
  state
}) =>
  <Newsletter
    handleSubmit={handleSubmit}
    handleEmailChange={handleEmailChange}
    handleGotchaChange={handleGotchaChange}
    handleReset={handleReset}
    newsletterState={state}
  />

DumbNewsletterContainer.propTypes = {
  handleSubmit: func.isRequired,
  handleEmailChange: func.isRequired,
  handleGotchaChange: func.isRequired,
  handleReset: func.isRequired,
  state: shape({
    didSubmit: bool.isRequired,
    errorMessage: string.isRequired,
    isSubmitting: bool.isRequired,
    email: string.isRequired,
    _gotcha: string.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  state: getNewsletterState(state)
})

const actions = {
  handleEmailChange: newsletterEmailChanged,
  handleGotchaChange: newsletterGotchaChanged,
  handleReset: newsletterReset,
  handleSubmit: newsletterSubscribe
}

export default connect(mapStateToProps, actions)(DumbNewsletterContainer)
