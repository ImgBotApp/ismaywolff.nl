/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import HeroWrapper from './HeroWrapper'

describe('<HeroWrapper />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HeroWrapper />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
