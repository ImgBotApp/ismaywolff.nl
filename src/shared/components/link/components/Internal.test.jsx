/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Internal from './Internal'

describe('<Internal />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Internal to="/url">Text</Internal>)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })

  it('renders clean correctly', () => {
    const wrapper = shallow(<Internal to="/url" clean>Text</Internal>)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
