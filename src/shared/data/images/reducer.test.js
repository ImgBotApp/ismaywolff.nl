import reducer from './reducer'
import * as types from './actionTypes'

describe('reducer', () => {
  const initialState = {
    lastUpdated: 0,
    errorMessage: '',
    isFetching: false,
    result: []
  }
  const fetchingState = Object.assign({}, initialState, { isFetching: true })
  const payload = { result: 'result' }

  it('should return the initial state', () => {
    const actual = reducer(undefined, {})
    const expected = initialState

    expect(actual).toEqual(expected)
  })

  it('should handle FETCH_IMAGES', () => {
    const actual = reducer(undefined, { type: types.FETCH_IMAGES })
    const expected = fetchingState

    expect(actual).toEqual(expected)
  })

  it('should handle FETCH_IMAGES_SUCCESS', () => {
    const actual = reducer(fetchingState, {
      type: types.FETCH_IMAGES_SUCCESS,
      receivedAt: 1,
      payload
    })
    const expected = {
      lastUpdated: 1,
      errorMessage: '',
      isFetching: false,
      result: payload.result
    }

    expect(actual).toEqual(expected)
  })

  it('should handle FETCH_IMAGES_FAIL with an errormessage', () => {
    const actual = reducer(fetchingState, {
      type: types.FETCH_IMAGES_FAIL,
      receivedAt: 1,
      payload: new Error('error')
    })
    const expected = {
      lastUpdated: 1,
      errorMessage: 'error',
      isFetching: false,
      result: []
    }

    expect(actual).toEqual(expected)
  })

  it('should handle FETCH_IMAGES_FAIL without an errormessage', () => {
    const actual = reducer(fetchingState, {
      type: types.FETCH_IMAGES_FAIL,
      receivedAt: 1,
      payload: {}
    })
    const expected = {
      lastUpdated: 1,
      errorMessage: 'Something went wrong, but no errormessage was provided.',
      isFetching: false,
      result: []
    }

    expect(actual).toEqual(expected)
  })
})
