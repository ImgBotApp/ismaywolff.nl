import 'isomorphic-fetch'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as types from './actionTypes'
import * as actions from './actions'
import * as selectors from './selectors'

/**
 * Mocks
 */

// Return consistent date for testing
Date.now = jest.fn(() => 1)

// Allow getShouldFetchWorks to be mocked
selectors.getShouldFetchWorks = jest.fn()

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockResponse = {
  items: [
    {
      fields: { slug: 'slug' }
    }
  ]
}
const mockNormalized = {
  entities: {
    works: {
      slug: {
        slug: 'slug'
      }
    }
  },
  result: ['slug']
}

/**
 * Tests
 */

describe('fetchWorksSuccess', () => {
  it('should create a FETCH_WORKS_SUCCESS action', () => {
    const actual = actions.fetchWorksSuccess('payload')
    const expected = {
      type: types.FETCH_WORKS_SUCCESS,
      receivedAt: 1,
      payload: 'payload'
    }

    expect(actual).toEqual(expected)
  })
})

describe('fetchWorksFail', () => {
  it('should create a FETCH_WORKS_FAIL action', () => {
    const actual = actions.fetchWorksFail('payload')
    const expected = {
      type: types.FETCH_WORKS_FAIL,
      receivedAt: 1,
      payload: 'payload'
    }

    expect(actual).toEqual(expected)
  })
})

describe('fetchWorks', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should handle succesful fetches', () => {
    nock(/contentful\.com/).get(/works/).reply(200, mockResponse)

    const store = mockStore({})
    const expectedActions = [
      { type: types.FETCH_WORKS },
      { type: types.FETCH_WORKS_SUCCESS, receivedAt: 1, payload: mockNormalized }
    ]

    return store
      .dispatch(actions.fetchWorks())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })

  it('should handle unsuccesful fetches', () => {
    const error = new Error('Internal Server Error')
    nock(/contentful\.com/).get(/works/).reply(500, error)

    const store = mockStore({})
    const expectedActions = [
      { type: types.FETCH_WORKS },
      { type: types.FETCH_WORKS_FAIL, receivedAt: 1, payload: error }
    ]

    return store
      .dispatch(actions.fetchWorks())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })
})

describe('fetchWorksIfNeeded', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should fetch works if needed', () => {
    nock(/contentful\.com/).get(/works/).reply(200, mockResponse)
    selectors.getShouldFetchWorks.mockReturnValueOnce(true)

    const store = mockStore({})
    const expectedActions = [
      { type: types.FETCH_WORKS },
      { type: types.FETCH_WORKS_SUCCESS, receivedAt: 1, payload: mockNormalized }
    ]

    return store
      .dispatch(actions.fetchWorksIfNeeded())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })

  it('should not fetch works if not needed', () => {
    selectors.getShouldFetchWorks.mockReturnValueOnce(false)
    const store = mockStore({})

    return store
      .dispatch(actions.fetchWorksIfNeeded())
      .then(() => expect(store.getActions()).toEqual([]))
  })
})
