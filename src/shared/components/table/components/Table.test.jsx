import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Table from './Table'

describe('<Table />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Table />)
    expect(wrapper).toMatchSnapshot()
  })
})
