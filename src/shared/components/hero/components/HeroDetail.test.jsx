/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import HeroDetail from './HeroDetail'

describe('<HeroDetail />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HeroDetail />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
