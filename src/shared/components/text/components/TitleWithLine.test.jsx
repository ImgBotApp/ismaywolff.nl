import 'jest-styled-components'
import React from 'react'
import { shallow } from 'enzyme'
import TitleWithLine from './TitleWithLine'

describe('<TitleWithLine />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TitleWithLine tag="h1">Title</TitleWithLine>)
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts a center property', () => {
    const wrapper = shallow(
      <TitleWithLine tag="h1" center>
        Title
      </TitleWithLine>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts a margin property', () => {
    const wrapper = shallow(
      <TitleWithLine tag="h1" margin="1rem">
        Title
      </TitleWithLine>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('accepts a size property', () => {
    const wrapper = shallow(
      <TitleWithLine tag="h1" size="2rem">
        Title
      </TitleWithLine>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
