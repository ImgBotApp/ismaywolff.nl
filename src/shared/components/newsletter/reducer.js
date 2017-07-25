import * as types from './actionTypes'

const fallbackMessage = 'Something went wrong, but no errormessage was provided.'
const initialState = {
  didSubmit: false,
  errorMessage: '',
  isSubmitting: false,
  email: '',
  _gotcha: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NEWSLETTER_SUBSCRIBE:
      return Object.assign({}, state, { isSubmitting: true })
    case types.NEWSLETTER_SUBSCRIBE_SUCCESS:
      return Object.assign({}, state, {
        didSubmit: true,
        errorMessage: '',
        isSubmitting: false
      })
    case types.NEWSLETTER_SUBSCRIBE_FAIL:
      return Object.assign({}, state, {
        didSubmit: true,
        errorMessage: action.payload.message || fallbackMessage,
        isSubmitting: false
      })
    case types.NEWSLETTER_EMAIL_CHANGED:
      return Object.assign({}, state, {
        email: action.payload
      })
    case types.NEWSLETTER_GOTCHA_CHANGED:
      return Object.assign({}, state, {
        _gotcha: action.payload
      })
    case types.NEWSLETTER_RESET:
      return initialState
    default:
      return state
  }
}

export default reducer
