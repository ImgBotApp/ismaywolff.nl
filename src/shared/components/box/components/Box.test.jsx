/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Box from './Box'

describe('<Box />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Box />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })

  it('accepts a margin prop', () => {
    const wrapper = shallow(<Box margin="0" />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })

  it('accepts a size prop', () => {
    const wrapper = shallow(<Box size="12px" />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })

  it('accepts a center prop', () => {
    const wrapper = shallow(<Box center />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
