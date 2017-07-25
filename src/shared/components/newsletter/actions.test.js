import 'isomorphic-fetch'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as types from './actionTypes'
import * as actions from './actions'

/**
 * Mocks
 */

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

/**
 * Tests
 */

describe('newsletterReset', () => {
  it('should create a NEWSLETTER_RESET action', () => {
    const actual = actions.newsletterReset()
    const expected = {
      type: types.NEWSLETTER_RESET
    }

    expect(actual).toEqual(expected)
  })
})

describe('newsletterSubscribeSuccess', () => {
  it('should create a NEWSLETTER_SUBSCRIBE_SUCCESS action', () => {
    const actual = actions.newsletterSubscribeSuccess()
    const expected = {
      type: types.NEWSLETTER_SUBSCRIBE_SUCCESS
    }

    expect(actual).toEqual(expected)
  })
})

describe('newsletterSubscribeFail', () => {
  it('should create a NEWSLETTER_SUBSCRIBE_FAIL action', () => {
    const error = new Error('error')
    const actual = actions.newsletterSubscribeFail(error)
    const expected = {
      type: types.NEWSLETTER_SUBSCRIBE_FAIL,
      payload: error
    }

    expect(actual).toEqual(expected)
  })
})

describe('newsletterEmailChanged', () => {
  it('should create a NEWSLETTER_EMAIL_CHANGED action', () => {
    const event = { target: { value: 'value' } }
    const actual = actions.newsletterEmailChanged(event)
    const expected = {
      type: types.NEWSLETTER_EMAIL_CHANGED,
      payload: 'value'
    }

    expect(actual).toEqual(expected)
  })
})

describe('newsletterGotchaChanged', () => {
  it('should create a NEWSLETTER_GOTCHA_CHANGED action', () => {
    const event = { target: { value: 'value' } }
    const actual = actions.newsletterGotchaChanged(event)
    const expected = {
      type: types.NEWSLETTER_GOTCHA_CHANGED,
      payload: 'value'
    }

    expect(actual).toEqual(expected)
  })
})

describe('newsletterSubscribe', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should handle succesful subscriptions', () => {
    nock(/formspree\.io/).post(/ismaywolff/).reply(200)

    const spyPreventDefault = jest.fn()
    const event = { preventDefault: spyPreventDefault }
    const store = mockStore({ newsletter: { email: 'email' } })
    const expectedActions = [
      { type: types.NEWSLETTER_SUBSCRIBE },
      { type: types.NEWSLETTER_SUBSCRIBE_SUCCESS }
    ]

    return store.dispatch(actions.newsletterSubscribe(event)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(spyPreventDefault).toHaveBeenCalled()
    })
  })

  it('should handle unsuccesful subscriptions', () => {
    const error = new Error('Internal Server Error')
    nock(/formspree\.io/).post(/ismaywolff/).reply(500, error)

    const spyPreventDefault = jest.fn()
    const event = { preventDefault: spyPreventDefault }
    const store = mockStore({ newsletter: { email: 'email' } })
    const expectedActions = [
      { type: types.NEWSLETTER_SUBSCRIBE },
      { type: types.NEWSLETTER_SUBSCRIBE_FAIL, payload: error }
    ]

    return store.dispatch(actions.newsletterSubscribe(event)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(spyPreventDefault).toHaveBeenCalled()
    })
  })
})
