/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import HeaderWrapper from './HeaderWrapper'

describe('<HeaderWrapper />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HeaderWrapper />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
