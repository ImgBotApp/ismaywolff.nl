import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import List from './List'

describe('<List />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<List />)
    expect(wrapper).toMatchSnapshot()
  })
})
