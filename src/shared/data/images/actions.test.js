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

// Allow getShouldFetchImages to be mocked
selectors.getShouldFetchImages = jest.fn()

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockResponse = {
  items: [
    {
      fields: {
        title: 'title',
        file: {
          url: 'url',
          details: {
            image: {
              width: 'width',
              height: 'height'
            }
          }
        }
      },
      sys: { id: 'id' }
    }
  ]
}
const mockNormalized = {
  entities: {
    images: {
      id: {
        title: 'title',
        url: 'url',
        width: 'width',
        height: 'height'
      }
    }
  },
  result: ['id']
}

/**
 * Tests
 */

describe('fetchImagesSuccess', () => {
  it('should create a FETCH_IMAGES_SUCCESS action', () => {
    const actual = actions.fetchImagesSuccess('payload')
    const expected = {
      type: types.FETCH_IMAGES_SUCCESS,
      receivedAt: 1,
      payload: 'payload'
    }

    expect(actual).toEqual(expected)
  })
})

describe('fetchImagesFail', () => {
  it('should create a FETCH_IMAGES_FAIL action', () => {
    const actual = actions.fetchImagesFail('payload')
    const expected = {
      type: types.FETCH_IMAGES_FAIL,
      receivedAt: 1,
      payload: 'payload'
    }

    expect(actual).toEqual(expected)
  })
})

describe('fetchImages', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should handle succesful fetches', () => {
    nock(/contentful\.com/).get(/image/).reply(200, mockResponse)

    const store = mockStore({})
    const expectedActions = [
      { type: types.FETCH_IMAGES },
      { type: types.FETCH_IMAGES_SUCCESS, receivedAt: 1, payload: mockNormalized }
    ]

    return store
      .dispatch(actions.fetchImages())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })

  it('should handle unsuccesful fetches', () => {
    const error = new Error('Internal Server Error')
    nock(/contentful\.com/).get(/image/).reply(500, error)

    const store = mockStore({})
    const expectedActions = [
      { type: types.FETCH_IMAGES },
      { type: types.FETCH_IMAGES_FAIL, receivedAt: 1, payload: error }
    ]

    return store
      .dispatch(actions.fetchImages())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })
})

describe('fetchImagesIfNeeded', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should fetch images if needed', () => {
    nock(/contentful\.com/).get(/image/).reply(200, mockResponse)
    selectors.getShouldFetchImages.mockReturnValueOnce(true)

    const store = mockStore({})
    const expectedActions = [
      { type: types.FETCH_IMAGES },
      { type: types.FETCH_IMAGES_SUCCESS, receivedAt: 1, payload: mockNormalized }
    ]

    return store
      .dispatch(actions.fetchImagesIfNeeded())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })

  it('should not fetch images if not needed', () => {
    selectors.getShouldFetchImages.mockReturnValueOnce(false)
    const store = mockStore({})

    return store
      .dispatch(actions.fetchImagesIfNeeded())
      .then(() => expect(store.getActions()).toEqual([]))
  })
})
