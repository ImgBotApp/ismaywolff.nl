import * as types from './actionTypes'

const fallbackMessage = 'Something went wrong, but no errormessage was provided.'
const initialState = {
  didFetch: false,
  errorMessage: '',
  isFetching: false,
  result: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_IMAGES:
      return Object.assign({}, state, { isFetching: true })
    case types.FETCH_IMAGES_SUCCESS:
      return {
        didFetch: true,
        errorMessage: '',
        isFetching: false,
        result: action.payload.result
      }
    case types.FETCH_IMAGES_FAIL:
      return Object.assign({}, state, {
        didFetch: true,
        errorMessage: action.payload.message || fallbackMessage,
        isFetching: false
      })
    default:
      return state
  }
}

export default reducer
