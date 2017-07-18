import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import NavWrapper from './NavWrapper'

describe('<NavWrapper />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NavWrapper />)
    expect(wrapper).toMatchSnapshot()
  })
})
