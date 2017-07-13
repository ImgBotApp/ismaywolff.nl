/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Placeholder from './Placeholder'

describe('<Placeholder />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Placeholder width={1} height={2} />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
