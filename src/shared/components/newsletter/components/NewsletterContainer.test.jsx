import React from 'react'
import { shallow } from 'enzyme'
import { DumbNewsletterContainer } from './NewsletterContainer'

describe('<DumbNewsletterContainer />', () => {
  it('renders correctly', () => {
    const state = {
      didSubmit: false,
      errorMessage: '',
      isSubmitting: false,
      email: '',
      _gotcha: ''
    }

    const wrapper = shallow(
      <DumbNewsletterContainer
        handleEmailChange={() => {}}
        handleSubmit={() => {}}
        handleGotchaChange={() => {}}
        handleReset={() => {}}
        state={state}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
