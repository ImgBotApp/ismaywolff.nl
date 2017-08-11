import online from '../../services/online'
import { getImageEntities, getImageState, checkHasImages, shouldFetchImages } from './selectors'

jest.mock('../../services/online')

describe('getImageEntities', () => {
  it('should return image entities', () => {
    const state = { entities: { images: 'entities' } }
    const expected = 'entities'
    const actual = getImageEntities(state)

    expect(actual).toEqual(expected)
  })
})

describe('getImageState', () => {
  it('should return the image state', () => {
    const state = { images: 'state' }
    const expected = 'state'
    const actual = getImageState(state)

    expect(actual).toEqual(expected)
  })
})

describe('checkHasImages', () => {
  it('should return whether there are images', () => {
    const state = { images: { result: ['image'] } }
    const actual = checkHasImages(state)

    expect(actual).toEqual(true)
  })
})

describe('shouldFetchImages', () => {
  it('should return false when fetching', () => {
    const state = { images: { isFetching: true, result: [] } }
    const actual = shouldFetchImages(state)

    expect(actual).toEqual(false)
  })

  it('should return false when offline', () => {
    online.mockReturnValueOnce(false)
    const state = { images: { isFetching: false, result: [] } }
    const actual = shouldFetchImages(state)

    expect(actual).toEqual(false)
  })

  it('should return true if not fetching, online and it has no images', () => {
    online.mockReturnValueOnce(true)
    const state = { images: { isFetching: false, lastUpdated: 0 } }
    const actual = shouldFetchImages(state)

    expect(actual).toEqual(true)
  })

  it('should return true if not fetching, online and is stale', () => {
    online.mockReturnValueOnce(true)
    const state = { images: { isFetching: false, lastUpdated: 1 } }
    const actual = shouldFetchImages(state)

    expect(actual).toEqual(true)
  })

  it('should return false if not fetching, online and it has fresh images', () => {
    online.mockReturnValueOnce(true)
    const state = { images: { isFetching: false, lastUpdated: Date.now() } }
    const actual = shouldFetchImages(state)

    expect(actual).toEqual(false)
  })
})
