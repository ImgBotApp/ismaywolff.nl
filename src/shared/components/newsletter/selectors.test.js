import { getNewsletterState } from './selectors'

describe('getNewsletterState', () => {
  it('should return the newsletter state', () => {
    const state = { newsletter: 'state' }
    const expected = 'state'
    const actual = getNewsletterState(state)

    expect(actual).toEqual(expected)
  })
})
