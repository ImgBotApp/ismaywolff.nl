/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Wrapper from './Wrapper'

describe('<Wrapper />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Wrapper />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
