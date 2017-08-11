import * as types from './actionTypes'

const fallbackMessage = 'Something went wrong, but no errormessage was provided.'
const initialState = {
  lastUpdated: 0,
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
        lastUpdated: action.receivedAt,
        errorMessage: '',
        isFetching: false,
        result: action.payload.result
      }
    case types.FETCH_IMAGES_FAIL:
      return Object.assign({}, state, {
        lastUpdated: action.receivedAt,
        errorMessage: action.payload.message || fallbackMessage,
        isFetching: false
      })
    default:
      return state
  }
}

export default reducer
