/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import ZoomableGridItem from './ZoomableGridItem'

describe('<ZoomableGridItem />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ZoomableGridItem />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
