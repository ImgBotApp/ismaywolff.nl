import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import ThumbnailButtonWrapper from './ThumbnailButtonWrapper'

describe('<ThumbnailButtonWrapper />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ThumbnailButtonWrapper />)
    expect(wrapper).toMatchSnapshot()
  })
})
