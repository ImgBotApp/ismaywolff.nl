import {
  getWorkEntities,
  getWorkState,
  checkHasWorks,
  shouldFetchWorks,
  getHero,
  getFeatured
} from './selectors'

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

describe('checkHasWorks', () => {
  it('should return whether there are works', () => {
    const state = { works: { result: ['work'] } }
    const actual = checkHasWorks(state)

    expect(actual).toEqual(true)
  })
})

describe('shouldFetchWorks', () => {
  it('should return false when fetching', () => {
    const state = { works: { isFetching: true, result: [] } }
    const actual = shouldFetchWorks(state)

    expect(actual).toEqual(false)
  })

  it('should return true if not fetching and it has no works', () => {
    const state = { works: { isFetching: false, result: [] } }
    const actual = shouldFetchWorks(state)

    expect(actual).toEqual(true)
  })

  it('should return false if not fetching and it has works', () => {
    const state = { works: { isFetching: false, result: ['work'] } }
    const actual = shouldFetchWorks(state)

    expect(actual).toEqual(false)
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

    it('should return undefined if there is no work', () => {
      const state = { works: { result: [] } }
      const actual = getHero(state)

      expect(actual).toEqual([])
    })

    it('should return undefined if there is work but no hero entities', () => {
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
      const state = { works: { result: [] } }
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
})
