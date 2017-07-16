import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import NavLink from './NavLink'

describe('<NavLink />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NavLink to="/url">Text</NavLink>)
    expect(wrapper).toMatchSnapshot()
  })
})
