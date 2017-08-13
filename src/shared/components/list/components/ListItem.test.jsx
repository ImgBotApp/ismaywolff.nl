import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import ListItem from './ListItem'

describe('<ListItem />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ListItem />)
    expect(wrapper).toMatchSnapshot()
  })
})
