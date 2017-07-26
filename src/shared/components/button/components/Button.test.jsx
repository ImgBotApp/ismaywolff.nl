import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

describe('<Button />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts a fill bool', () => {
    const wrapper = shallow(<Button fill />)
    expect(wrapper).toMatchSnapshot()
  })
})