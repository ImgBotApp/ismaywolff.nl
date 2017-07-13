/**
 * @jest-environment node
 */

import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import ThumbnailGridItem from './ThumbnailGridItem'

describe('<ThumbnailGridItem />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ThumbnailGridItem />)
    expect(wrapper).toMatchStyledComponentsSnapshot()
  })
})
