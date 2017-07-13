import { getImageEntities, getImageState, checkHasImages, shouldFetchImages } from './selectors'

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

  it('should return true if not fetching and it has no images', () => {
    const state = { images: { isFetching: false, result: [] } }
    const actual = shouldFetchImages(state)

    expect(actual).toEqual(true)
  })

  it('should return false if not fetching and it has images', () => {
    const state = { images: { isFetching: false, result: ['image'] } }
    const actual = shouldFetchImages(state)

    expect(actual).toEqual(false)
  })
})
