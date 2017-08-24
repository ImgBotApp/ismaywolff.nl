import React from 'react'
import { shallow } from 'enzyme'
import AppShell from './index'

describe('<AppShell />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AppShell />)
    expect(wrapper).toMatchSnapshot()
  })

  it('has server side data needs defined', () => {
    expect(AppShell.needs()).toMatchSnapshot()
  })
})
