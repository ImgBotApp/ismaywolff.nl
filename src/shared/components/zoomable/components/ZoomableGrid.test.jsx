/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import ZoomableGrid from './ZoomableGrid'

describe('<ZoomableGrid />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ZoomableGrid />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
