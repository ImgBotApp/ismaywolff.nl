import reducer from './reducer'
import * as types from './actionTypes'

describe('reducer', () => {
  const initialState = {
    didSubmit: false,
    errorMessage: '',
    isSubmitting: false,
    email: '',
    _gotcha: ''
  }
  const fetchingState = Object.assign({}, initialState, { isSubmitting: true })

  it('should return the initial state', () => {
    const actual = reducer(undefined, {})
    const expected = initialState

    expect(actual).toEqual(expected)
  })

  it('should handle NEWSLETTER_RESET', () => {
    const actual = reducer(fetchingState, { type: types.NEWSLETTER_RESET })
    const expected = initialState

    expect(actual).toEqual(expected)
  })

  it('should handle NEWSLETTER_SUBSCRIBE', () => {
    const actual = reducer(undefined, { type: types.NEWSLETTER_SUBSCRIBE })
    const expected = fetchingState

    expect(actual).toEqual(expected)
  })

  it('should handle NEWSLETTER_SUBSCRIBE_SUCCESS', () => {
    const actual = reducer(fetchingState, {
      type: types.NEWSLETTER_SUBSCRIBE_SUCCESS
    })
    const expected = {
      didSubmit: true,
      errorMessage: '',
      isSubmitting: false,
      email: '',
      _gotcha: ''
    }

    expect(actual).toEqual(expected)
  })

  it('should handle NEWSLETTER_SUBSCRIBE_FAIL with an errormessage', () => {
    const actual = reducer(fetchingState, {
      type: types.NEWSLETTER_SUBSCRIBE_FAIL,
      payload: new Error('error')
    })
    const expected = {
      didSubmit: true,
      errorMessage: 'error',
      isSubmitting: false,
      email: '',
      _gotcha: ''
    }

    expect(actual).toEqual(expected)
  })

  it('should handle NEWSLETTER_SUBSCRIBE_FAIL without an errormessage', () => {
    const actual = reducer(fetchingState, {
      type: types.NEWSLETTER_SUBSCRIBE_FAIL,
      payload: {}
    })
    const expected = {
      didSubmit: true,
      errorMessage: 'Something went wrong, but no errormessage was provided.',
      isSubmitting: false,
      email: '',
      _gotcha: ''
    }

    expect(actual).toEqual(expected)
  })

  it('should handle NEWSLETTER_EMAIL_CHANGED', () => {
    const actual = reducer(initialState, {
      type: types.NEWSLETTER_EMAIL_CHANGED,
      payload: 'change'
    })
    const expected = {
      didSubmit: false,
      errorMessage: '',
      isSubmitting: false,
      email: 'change',
      _gotcha: ''
    }

    expect(actual).toEqual(expected)
  })

  it('should handle NEWSLETTER_GOTCHA_CHANGED', () => {
    const actual = reducer(initialState, {
      type: types.NEWSLETTER_GOTCHA_CHANGED,
      payload: 'change'
    })
    const expected = {
      didSubmit: false,
      errorMessage: '',
      isSubmitting: false,
      email: '',
      _gotcha: 'change'
    }

    expect(actual).toEqual(expected)
  })
})
