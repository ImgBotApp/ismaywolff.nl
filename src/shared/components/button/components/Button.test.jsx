/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

describe('<Button />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Button to="/" />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })

  it('accepts a dark bool', () => {
    const wrapper = shallow(<Button to="/" dark />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
