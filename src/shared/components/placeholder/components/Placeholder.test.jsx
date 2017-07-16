import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Placeholder from './Placeholder'

describe('<Placeholder />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Placeholder ratio={0.5} />)
    expect(wrapper).toMatchSnapshot()
  })
})
