import reducer from './reducer'

describe('reducer', () => {
  const initialState = {
    images: {},
    works: {}
  }

  it('should return the initial state', () => {
    const actual = reducer(undefined, {})
    const expected = initialState

    expect(actual).toEqual(expected)
  })

  it('should handle works entities', () => {
    const actual = reducer(undefined, {
      type: 'ACTION',
      payload: {
        entities: {
          works: { item: 'item' }
        }
      }
    })
    const expected = {
      images: {},
      works: { item: 'item' }
    }

    expect(actual).toEqual(expected)
  })

  it('should handle images entities', () => {
    const actual = reducer(undefined, {
      type: 'ACTION',
      payload: {
        entities: {
          images: { item: 'item' }
        }
      }
    })
    const expected = {
      images: { item: 'item' },
      works: {}
    }

    expect(actual).toEqual(expected)
  })
})
