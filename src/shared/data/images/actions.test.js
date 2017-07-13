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
      { type: types.FETCH_IMAGES_SUCCESS, payload: mockNormalized }
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
      { type: types.FETCH_IMAGES_FAIL, payload: error }
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

    const store = mockStore({ images: { isFetching: false, result: [] } })
    const expectedActions = [
      { type: types.FETCH_IMAGES },
      { type: types.FETCH_IMAGES_SUCCESS, payload: mockNormalized }
    ]

    return store
      .dispatch(actions.fetchImagesIfNeeded())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })

  it('should not fetch images if already fetching', () => {
    const store = mockStore({ images: { isFetching: true, result: [] } })

    return store
      .dispatch(actions.fetchImagesIfNeeded())
      .then(() => expect(store.getActions()).toEqual([]))
  })

  it('should not fetch images if there are already images', () => {
    const store = mockStore({ images: { isFetching: false, result: ['image'] } })

    return store
      .dispatch(actions.fetchImagesIfNeeded())
      .then(() => expect(store.getActions()).toEqual([]))
  })
})
