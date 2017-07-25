import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import FakeButton from './FakeButton'

describe('<FakeButton />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<FakeButton />)
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts a dark bool', () => {
    const wrapper = shallow(<FakeButton dark />)
    expect(wrapper).toMatchSnapshot()
  })
})
