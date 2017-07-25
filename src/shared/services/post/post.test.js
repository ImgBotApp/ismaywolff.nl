/* global Headers */

import 'isomorphic-fetch'
import fetchy from '../fetchy'
import post from './post'

jest.mock('../fetchy', () => jest.fn())

describe('post', () => {
  it('calls fetchy with the right endpoint', () => {
    post('endpoint', {})
    const lastCall = fetchy.mock.calls.length - 1
    const expected = 'endpoint'

    expect(fetchy.mock.calls[lastCall][0]).toEqual(expected)
  })

  it('calls fetchy with the right init object for formspree', () => {
    const data = { email: 'email' }

    post('endpoint', data)
    const lastCall = fetchy.mock.calls.length - 1
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
    const expected = {
      method: 'POST',
      body: JSON.stringify(data),
      headers
    }

    expect(fetchy.mock.calls[lastCall][1]).toEqual(expected)
  })
})
