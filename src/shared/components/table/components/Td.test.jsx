import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Td from './Td'

describe('<Td />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Td />)
    expect(wrapper).toMatchSnapshot()
  })
})
