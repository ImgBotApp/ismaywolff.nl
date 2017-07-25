import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Input from './Input'

describe('<Input />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Input />)
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts a hidden bool', () => {
    const wrapper = shallow(<Input hidden />)
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts a fill bool', () => {
    const wrapper = shallow(<Input fill />)
    expect(wrapper).toMatchSnapshot()
  })
})
