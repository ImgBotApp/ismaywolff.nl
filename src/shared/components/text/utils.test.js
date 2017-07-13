import { truncate } from './utils'

describe('truncate', () => {
  it('should return the string unmodified if it is not too long', () => {
    const input = 'Some text'
    const actual = truncate(input, 100)
    const expected = input

    expect(actual).toEqual(expected)
  })

  it('should truncate the string if it is too long', () => {
    const input = 'Some text'
    const actual = truncate(input, 2)
    const expected = 'So…'

    expect(actual).toEqual(expected)
  })
})
