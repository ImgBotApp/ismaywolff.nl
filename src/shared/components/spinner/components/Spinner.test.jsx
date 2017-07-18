import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Spinner from './Spinner'

describe('<Spinner />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Spinner />)
    expect(wrapper).toMatchSnapshot()
  })
})
