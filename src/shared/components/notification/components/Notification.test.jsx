import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Notification from './Notification'

describe('<Notification />', () => {
  it('renders error type correctly', () => {
    const wrapper = shallow(<Notification type="error" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders success type correctly', () => {
    const wrapper = shallow(<Notification type="success" />)
    expect(wrapper).toMatchSnapshot()
  })
})
