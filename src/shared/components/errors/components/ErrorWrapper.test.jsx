import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import ErrorWrapper from './ErrorWrapper'

describe('<ErrorWrapper />', () => {
  it('accepts an error type', () => {
    const wrapper = shallow(<ErrorWrapper type="error" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts an info type', () => {
    const wrapper = shallow(<ErrorWrapper type="info" />)
    expect(wrapper).toMatchSnapshot()
  })
})