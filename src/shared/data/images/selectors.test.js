import online from '../../services/online'
import {
  getIsValid,
  getIsStaleOrUnfetched,
  getHasValidResults,
  getHasError,
  getIsFetching,
  getImageEntities,
  getImageState,
  getResult,
  getShouldFetchImages
} from './selectors'

jest.mock('../../services/online')
Date.now = jest.fn(() => 1)

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

describe('getIsFetching', () => {
  it('should return if images are being fetched', () => {
    const state = { images: { isFetching: true } }
    const actual = getIsFetching(state)

    expect(actual).toEqual(true)
  })
})

describe('getResult', () => {
  it('should return the result', () => {
    const state = { images: { result: ['image'] } }
    const expected = ['image']
    const actual = getResult(state)

    expect(actual).toEqual(expected)
  })
})

describe('getHasError', () => {
  it('should return whether there is an error', () => {
    const state = { images: { errorMessage: 'error' } }
    const actual = getHasError(state)

    expect(actual).toEqual(true)
  })
})

describe('getHasValidResults', () => {
  it('should return true when the results are valid', () => {
    const state = {
      images: { result: ['image'] },
      entities: {
        images: { image: {} }
      }
    }
    const actual = getHasValidResults(state)

    expect(actual).toEqual(true)
  })
})

describe('getIsStaleOrUnfetched', () => {
  it('should return true when unfetched', () => {
    Date.now.mockReturnValueOnce(1502537290838)
    const state = {
      images: {
        lastUpdated: 0
      }
    }
    const actual = getIsStaleOrUnfetched(state)

    expect(actual).toEqual(true)
  })

  it('should return true when stale', () => {
    Date.now.mockReturnValueOnce(2 + 3600000)
    const state = {
      images: {
        lastUpdated: 1
      }
    }
    const actual = getIsStaleOrUnfetched(state)

    expect(actual).toEqual(true)
  })

  it('should return false when not stale', () => {
    Date.now.mockReturnValueOnce(3600000)
    const state = {
      images: {
        lastUpdated: 1
      }
    }
    const actual = getIsStaleOrUnfetched(state)

    expect(actual).toEqual(false)
  })
})

describe('getIsValid', () => {
  it('should return true when the state is valid', () => {
    Date.now.mockReturnValueOnce(1)
    const state = {
      images: {
        lastUpdated: 1,
        errorMessage: '',
        isFetching: false,
        result: ['image']
      },
      entities: {
        images: { image: {} }
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(true)
  })

  it('should return false when the results are invalid', () => {
    Date.now.mockReturnValueOnce(1)
    const state = {
      images: {
        lastUpdated: 1,
        errorMessage: '',
        isFetching: false,
        result: ['image']
      },
      entities: {
        images: {}
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(false)
  })

  it('should return false when fetching', () => {
    Date.now.mockReturnValueOnce(1)
    const state = {
      images: {
        lastUpdated: 1,
        errorMessage: '',
        isFetching: true,
        result: ['image']
      },
      entities: {
        images: {
          image: {}
        }
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(false)
  })

  it('should return false when results are stale', () => {
    Date.now.mockReturnValueOnce(3600000 + 2)
    const state = {
      images: {
        lastUpdated: 1,
        errorMessage: '',
        isFetching: false,
        result: ['image']
      },
      entities: {
        images: {
          image: {}
        }
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(false)
  })

  it('should return false when lastUpdate is 0', () => {
    Date.now.mockReturnValueOnce(3600000 + 2)
    const state = {
      images: {
        lastUpdated: 0,
        errorMessage: '',
        isFetching: false,
        result: ['image']
      },
      entities: {
        images: {
          image: {}
        }
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(false)
  })

  it('should return false when it has an error', () => {
    Date.now.mockReturnValueOnce(1)
    const state = {
      images: {
        lastUpdated: 1,
        errorMessage: 'Error',
        isFetching: false,
        result: ['image']
      },
      entities: {
        images: {
          image: {}
        }
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(false)
  })
})

describe('getShouldFetchImages', () => {
  it('should return false when fetching', () => {
    const state = { images: { isFetching: true, result: [] } }
    const actual = getShouldFetchImages(state)

    expect(actual).toEqual(false)
  })

  it('should return false when offline', () => {
    online.mockReturnValueOnce(false)
    const state = { images: { isFetching: false, result: [] } }
    const actual = getShouldFetchImages(state)

    expect(actual).toEqual(false)
  })

  it('should return true if not fetching, online and it has no images', () => {
    Date.now.mockReturnValueOnce(3600000 + 2)
    online.mockReturnValueOnce(true)
    const state = { images: { isFetching: false, lastUpdated: 0 } }
    const actual = getShouldFetchImages(state)

    expect(actual).toEqual(true)
  })

  it('should return true if not fetching, online and is stale', () => {
    Date.now.mockReturnValueOnce(3600000 + 2)
    online.mockReturnValueOnce(true)
    const state = { images: { isFetching: false, lastUpdated: 1 } }
    const actual = getShouldFetchImages(state)

    expect(actual).toEqual(true)
  })

  it('should return false if not fetching, online and it has fresh images', () => {
    online.mockReturnValueOnce(true)
    const state = { images: { isFetching: false, lastUpdated: Date.now() } }
    const actual = getShouldFetchImages(state)

    expect(actual).toEqual(false)
  })
})
