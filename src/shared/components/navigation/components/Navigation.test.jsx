import React from 'react'
import { shallow } from 'enzyme'
import Navigation from './Navigation'

describe('<Navigation />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Navigation />)
    expect(wrapper).toMatchSnapshot()
  })
})
