import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import HeaderTitle from './HeaderTitle'

describe('<HeaderTitle />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HeaderTitle />)
    expect(wrapper).toMatchSnapshot()
  })
})
