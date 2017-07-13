import React from 'react'
import { shallow } from 'enzyme'
import Zoomable from './Zoomable'

describe('<Zoomable />', () => {
  it('renders correctly', () => {
    const image = {
      title: 'title',
      url: 'https://image.com',
      width: 10,
      height: 10
    }
    const wrapper = shallow(<Zoomable image={image} />)
    expect(wrapper).toMatchSnapshot()
  })
})
