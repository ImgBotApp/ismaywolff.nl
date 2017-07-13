import { createUrl, getRatio } from './utils'

describe('createUrl', () => {
  it('accepts a fill parameter', () => {
    expect(createUrl({ url: 'url', fill: true })).toEqual('url?fit=fill&&fl=progressive')
  })

  it('accepts a width parameter', () => {
    expect(createUrl({ url: 'url', width: 10 })).toEqual('url?w=10&fl=progressive')
  })

  it('accepts a height parameter', () => {
    expect(createUrl({ url: 'url', height: 10 })).toEqual('url?&h=10&fl=progressive')
  })

  it('creates a valid url', () => {
    expect(createUrl({ url: 'url' })).toEqual('url?&fl=progressive')
  })
})

describe('getRatio', () => {
  it('calculates the correct percentage for landscape ratio differences', () => {
    const image = { width: 100, height: 10 }
    const viewport = { height: 1000, width: 1000 }
    const actual = getRatio({ image, viewport })
    const expected = 100

    expect(actual).toEqual(expected)
  })

  it('calculates the correct percentage for portrait ratio differences', () => {
    const image = { width: 10, height: 100 }
    const viewport = { height: 1000, width: 1000 }
    const actual = getRatio({ image, viewport })
    const expected = 10

    expect(actual).toEqual(expected)
  })
})
