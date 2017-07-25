import React from 'react'
import { shallow } from 'enzyme'
import Newsletter from './Newsletter'

describe('<Newsletter />', () => {
  it('renders correctly', () => {
    const state = {
      didSubmit: false,
      errorMessage: '',
      isSubmitting: false,
      email: '',
      _gotcha: ''
    }

    const wrapper = shallow(
      <Newsletter
        handleSubmit={() => {}}
        handleEmailChange={() => {}}
        handleGotchaChange={() => {}}
        handleReset={() => {}}
        newsletterState={state}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a disabled form while submitting', () => {
    const state = {
      didSubmit: false,
      errorMessage: '',
      isSubmitting: true,
      email: 'email',
      _gotcha: ''
    }

    const wrapper = shallow(
      <Newsletter
        handleSubmit={() => {}}
        handleEmailChange={() => {}}
        handleGotchaChange={() => {}}
        handleReset={() => {}}
        newsletterState={state}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a success message after a successful submit', () => {
    const state = {
      didSubmit: true,
      errorMessage: '',
      isSubmitting: false,
      email: 'email',
      _gotcha: ''
    }

    const wrapper = shallow(
      <Newsletter
        handleSubmit={() => {}}
        handleEmailChange={() => {}}
        handleGotchaChange={() => {}}
        handleReset={() => {}}
        newsletterState={state}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders an error message after a unsuccessful submit', () => {
    const state = {
      didSubmit: true,
      errorMessage: 'Something went wrong',
      isSubmitting: false,
      email: 'email',
      _gotcha: ''
    }

    const wrapper = shallow(
      <Newsletter
        handleSubmit={() => {}}
        handleEmailChange={() => {}}
        handleGotchaChange={() => {}}
        handleReset={() => {}}
        newsletterState={state}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
