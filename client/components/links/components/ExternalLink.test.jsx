import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { matcher, serializer } from 'jest-glamor-react'
import ExternalLink from './ExternalLink'

expect.addSnapshotSerializer(serializer)
expect.extend(matcher)

describe('<ExternalLink />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ExternalLink href={'url'} />)
    expect(shallowToJson(wrapper)).toMatchSnapshotWithGlamor()
  })
})
