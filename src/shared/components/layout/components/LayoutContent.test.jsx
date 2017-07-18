import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import LayoutContent from './LayoutContent'

describe('<LayoutContent />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LayoutContent />)
    expect(wrapper).toMatchSnapshot()
  })
})
