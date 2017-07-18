import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Layout from './Layout'

describe('<Layout />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Layout />)
    expect(wrapper).toMatchSnapshot()
  })
})
