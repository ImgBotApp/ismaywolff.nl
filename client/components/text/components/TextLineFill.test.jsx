import React from 'react'
import { shallow } from 'enzyme'
import TextLineFill from './TextLineFill'

describe('<TextLineFill />', () => {
  it('renders correctly for direction right', () => {
    const wrapper = shallow(<TextLineFill direction={'right'} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly for direction left', () => {
    const wrapper = shallow(<TextLineFill direction={'left'} />)
    expect(wrapper).toMatchSnapshot()
  })
})