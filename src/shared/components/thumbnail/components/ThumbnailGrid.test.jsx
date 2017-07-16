import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import ThumbnailGrid from './ThumbnailGrid'

describe('<ThumbnailGrid />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ThumbnailGrid />)
    expect(wrapper).toMatchSnapshot()
  })
})
