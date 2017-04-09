import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { matcher, serializer } from 'jest-glamor-react'
import Placeholder from './Placeholder'

expect.addSnapshotSerializer(serializer)
expect.extend(matcher)

describe('<Placeholder />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Placeholder width={1} height={2} />
    )
    expect(shallowToJson(wrapper)).toMatchSnapshotWithGlamor()
  })
})
