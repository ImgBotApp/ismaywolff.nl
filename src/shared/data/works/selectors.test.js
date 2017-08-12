import online from '../../services/online'
import {
  getError,
  getIsValid,
  getIsStaleOrUnfetched,
  getHasValidResults,
  getHasError,
  getResults,
  getIsFetching,
  getWorkEntities,
  getWorkState,
  getShouldFetchWorks,
  getHero,
  getFeatured
} from './selectors'

jest.mock('../../services/online')
Date.now = jest.fn(() => 1)

describe('getWorkEntities', () => {
  it('should return work entities', () => {
    const state = { entities: { works: 'entities' } }
    const expected = 'entities'
    const actual = getWorkEntities(state)

    expect(actual).toEqual(expected)
  })
})

describe('getWorkState', () => {
  it('should return the work state', () => {
    const state = { works: 'state' }
    const expected = 'state'
    const actual = getWorkState(state)

    expect(actual).toEqual(expected)
  })
})

describe('getIsFetching', () => {
  it('should return if works are being fetched', () => {
    const state = { works: { isFetching: true } }
    const actual = getIsFetching(state)

    expect(actual).toEqual(true)
  })
})

describe('getResults', () => {
  it('should return the result', () => {
    const state = { works: { result: ['work'] } }
    const expected = ['work']
    const actual = getResults(state)

    expect(actual).toEqual(expected)
  })
})

describe('getHasError', () => {
  it('should return whether there is an error', () => {
    const state = { works: { errorMessage: 'error' } }
    const actual = getHasError(state)

    expect(actual).toEqual(true)
  })
})

describe('getHasError', () => {
  it('should return an error-message if there is one', () => {
    const state = { works: { errorMessage: 'error' } }
    const expected = 'error'
    const actual = getError(state)

    expect(actual).toEqual(expected)
  })
})

describe('getHasValidResults', () => {
  it('should return true when the results are valid', () => {
    const state = {
      works: { result: ['work'] },
      entities: {
        works: { work: {} }
      }
    }
    const actual = getHasValidResults(state)

    expect(actual).toEqual(true)
  })

  it('should return false when there are no results', () => {
    const state = {
      works: { result: [] },
      entities: {
        works: { work: {} }
      }
    }
    const actual = getHasValidResults(state)

    expect(actual).toEqual(false)
  })

  it('should return false when there are no entities', () => {
    const state = {
      works: { result: ['work'] },
      entities: {
        works: {}
      }
    }
    const actual = getHasValidResults(state)

    expect(actual).toEqual(false)
  })
})

describe('getIsStaleOrUnfetched', () => {
  it('should return true when unfetched', () => {
    Date.now.mockReturnValueOnce(1502537290838)
    const state = {
      works: {
        lastUpdated: 0
      }
    }
    const actual = getIsStaleOrUnfetched(state)

    expect(actual).toEqual(true)
  })

  it('should return true when stale', () => {
    Date.now.mockReturnValueOnce(2 + 3600000)
    const state = {
      works: {
        lastUpdated: 1
      }
    }
    const actual = getIsStaleOrUnfetched(state)

    expect(actual).toEqual(true)
  })

  it('should return false when not stale', () => {
    Date.now.mockReturnValueOnce(3600000)
    const state = {
      works: {
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
      works: {
        lastUpdated: 1,
        errorMessage: '',
        isFetching: false,
        result: ['work']
      },
      entities: {
        works: { work: {} }
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(true)
  })

  it('should return false when the results are invalid', () => {
    Date.now.mockReturnValueOnce(1)
    const state = {
      works: {
        lastUpdated: 1,
        errorMessage: '',
        isFetching: false,
        result: ['work']
      },
      entities: {
        works: {}
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(false)
  })

  it('should return false when fetching', () => {
    Date.now.mockReturnValueOnce(1)
    const state = {
      works: {
        lastUpdated: 1,
        errorMessage: '',
        isFetching: true,
        result: ['work']
      },
      entities: {
        works: {
          work: {}
        }
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(false)
  })

  it('should return false when results are stale', () => {
    Date.now.mockReturnValueOnce(3600000 + 2)
    const state = {
      works: {
        lastUpdated: 1,
        errorMessage: '',
        isFetching: false,
        result: ['work']
      },
      entities: {
        works: {
          work: {}
        }
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(false)
  })

  it('should return false when lastUpdate is 0', () => {
    Date.now.mockReturnValueOnce(3600000 + 2)
    const state = {
      works: {
        lastUpdated: 0,
        errorMessage: '',
        isFetching: false,
        result: ['work']
      },
      entities: {
        works: {
          work: {}
        }
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(false)
  })

  it('should return false when it has an error', () => {
    Date.now.mockReturnValueOnce(1)
    const state = {
      works: {
        lastUpdated: 1,
        errorMessage: 'Error',
        isFetching: false,
        result: ['work']
      },
      entities: {
        works: {
          work: {}
        }
      }
    }
    const actual = getIsValid(state)

    expect(actual).toEqual(false)
  })
})

describe('getShouldFetchWorks', () => {
  it('should return false when fetching', () => {
    Date.now.mockReturnValueOnce(3600000 + 2)
    online.mockReturnValueOnce(true)
    const state = {
      entities: {
        works: {}
      },
      works: {
        errorMessage: '',
        isFetching: true,
        lastUpdated: 0,
        result: []
      }
    }
    const actual = getShouldFetchWorks(state)

    expect(actual).toEqual(false)
  })

  it('should return false when offline', () => {
    Date.now.mockReturnValueOnce(3600000 + 2)
    online.mockReturnValueOnce(false)
    const state = {
      entities: {
        works: {}
      },
      works: {
        errorMessage: '',
        isFetching: false,
        lastUpdated: 0,
        result: []
      }
    }
    const actual = getShouldFetchWorks(state)

    expect(actual).toEqual(false)
  })

  it('should return true if not fetching, online and it has no works', () => {
    Date.now.mockReturnValueOnce(3600000 + 2)
    online.mockReturnValueOnce(true)
    const state = {
      entities: {
        works: {}
      },
      works: {
        errorMessage: '',
        isFetching: false,
        lastUpdated: 0,
        result: []
      }
    }
    const actual = getShouldFetchWorks(state)

    expect(actual).toEqual(true)
  })

  it('should return true if not fetching, online and is stale', () => {
    Date.now.mockReturnValueOnce(3600000 + 2)
    online.mockReturnValueOnce(true)
    const state = {
      entities: {
        works: {
          id: {}
        }
      },
      works: {
        errorMessage: '',
        isFetching: false,
        lastUpdated: 1,
        result: ['id']
      }
    }
    const actual = getShouldFetchWorks(state)

    expect(actual).toEqual(true)
  })

  it('should return false if not fetching, online and it has fresh works', () => {
    online.mockReturnValueOnce(true)
    const state = {
      entities: {
        works: {
          id: {}
        }
      },
      works: {
        errorMessage: '',
        isFetching: false,
        lastUpdated: Date.now(),
        result: ['id']
      }
    }
    const actual = getShouldFetchWorks(state)

    expect(actual).toEqual(false)
  })

  it('should return true if not fetching, online, has fresh works and an error', () => {
    online.mockReturnValueOnce(true)
    const state = {
      entities: {
        works: {
          id: {}
        }
      },
      works: {
        errorMessage: 'Error',
        isFetching: false,
        lastUpdated: Date.now(),
        result: ['id']
      }
    }
    const actual = getShouldFetchWorks(state)

    expect(actual).toEqual(true)
  })

  it('should return true if not fetching, online, has fresh works, no error and invalid results', () => {
    online.mockReturnValueOnce(true)
    const state = {
      entities: {
        works: {}
      },
      works: {
        errorMessage: '',
        isFetching: false,
        lastUpdated: Date.now(),
        result: ['id']
      }
    }
    const actual = getShouldFetchWorks(state)

    expect(actual).toEqual(true)
  })
})

describe('getHero', () => {
  it("should return the id's of entities that are heros", () => {
    const state = {
      works: { result: ['work', 'working'] },
      entities: {
        works: {
          work: { hero: true },
          working: { hero: false }
        }
      }
    }
    const actual = getHero(state)

    expect(actual).toEqual(['work'])
  })

  it('should return an empty array if there is no work', () => {
    const state = {
      works: { result: [] },
      entities: { works: {} }
    }
    const actual = getHero(state)

    expect(actual).toEqual([])
  })

  it('should return an empty array if there is work but no hero entities', () => {
    const state = { works: { result: ['work'] }, entities: { works: { work: { hero: false } } } }
    const actual = getHero(state)

    expect(actual).toEqual([])
  })
})

describe('getFeatured', () => {
  it("should return the id's of entities that are featured", () => {
    const state = {
      works: { result: ['work', 'working'] },
      entities: {
        works: {
          work: { featured: true },
          working: { featured: false }
        }
      }
    }
    const actual = getFeatured(state)

    expect(actual).toEqual(['work'])
  })

  it('should return an empty array if there is no work', () => {
    const state = {
      works: { result: [] },
      entities: { works: {} }
    }
    const actual = getFeatured(state)

    expect(actual).toEqual([])
  })

  it('should return an empty array if there is work but no featured entities', () => {
    const state = {
      works: { result: ['work'] },
      entities: { works: { work: { featured: false } } }
    }
    const actual = getFeatured(state)

    expect(actual).toEqual([])
  })
})
