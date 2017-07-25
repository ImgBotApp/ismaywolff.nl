import { endpoints } from '../../services/endpoints'
import post from '../../services/post'
import * as types from './actionTypes'
import { getNewsletterState } from './selectors'

export const newsletterReset = () => ({
  type: types.NEWSLETTER_RESET
})

export const newsletterSubscribeSuccess = () => ({
  type: types.NEWSLETTER_SUBSCRIBE_SUCCESS
})

export const newsletterSubscribeFail = payload => ({
  type: types.NEWSLETTER_SUBSCRIBE_FAIL,
  payload
})

export const newsletterGotchaChanged = payload => ({
  type: types.NEWSLETTER_GOTCHA_CHANGED,
  payload: payload.target.value
})

export const newsletterEmailChanged = payload => ({
  type: types.NEWSLETTER_EMAIL_CHANGED,
  payload: payload.target.value
})

export const newsletterSubscribe = event => (dispatch, getState) => {
  const { _gotcha, email } = getNewsletterState(getState())
  const data = { _gotcha, email }

  // Prevent the form from being submitted the regular way so we can send it with fetch
  event.preventDefault()

  // Indicate the start of the subcription process
  dispatch({
    type: types.NEWSLETTER_SUBSCRIBE
  })

  return post(endpoints.NEWSLETTER, data)
    .then(() => dispatch(newsletterSubscribeSuccess()))
    .catch(error => dispatch(newsletterSubscribeFail(error)))
}
