import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import Title from './Title'

describe('<Title />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Title tag="h2">Title</Title>)
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts a center prop', () => {
    const wrapper = shallow(
      <Title tag="h2" center>
        Title
      </Title>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts a margin prop', () => {
    const wrapper = shallow(
      <Title tag="h2" margin="0">
        Title
      </Title>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts a size prop', () => {
    const wrapper = shallow(
      <Title tag="h2" size="10rem">
        Title
      </Title>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
