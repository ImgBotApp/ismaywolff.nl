/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import LayoutFooter from './LayoutFooter'

describe('<LayoutFooter />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LayoutFooter />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
