/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import External from './External'

describe('<External />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<External href="/url">Text</External>)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })

  it('renders clean correctly', () => {
    const wrapper = shallow(<External href="/url" clean>Text</External>)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })

  it('renders size correctly', () => {
    const wrapper = shallow(<External href="/url" size="16px">Text</External>)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
