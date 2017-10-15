import React from 'react'
import { bool, string, func, shape } from 'prop-types'
import { Notification } from '../../notification'
import { Box } from '../../box'
import { Input } from '../../input'
import { Button } from '../../button'

const Newsletter = ({
  handleSubmit,
  handleEmailChange,
  handleGotchaChange,
  handleReset,
  newsletterState
}) => {
  const { isSubmitting, didSubmit, email, errorMessage, _gotcha } = newsletterState

  // Disable form while submitting
  if (isSubmitting) {
    return (
      <div>
        <form
          onSubmit={handleSubmit}
          action="https://formspree.io/ismay@ismaywolff.nl"
          method="POST"
        >
          <Input
            autoComplete="email"
            onChange={handleEmailChange}
            value={email}
            type="email"
            placeholder="Your email"
            name="email"
            fill
            disabled
            required
          />
          <Input
            type="text"
            name="_gotcha"
            tabIndex="-1"
            autoComplete="off"
            onChange={handleGotchaChange}
            value={_gotcha}
            disabled
            hidden
          />
          <Box margin="var(--size-smaller) 0 0 0">
            <Button type="submit" disabled fill>
              Subscribing
            </Button>
          </Box>
        </form>
      </div>
    )
  }

  // Show success message and reset button
  if (didSubmit && !errorMessage) {
    return (
      <div>
        <Box margin="0 0 var(--size-regular) 0">
          <Notification type="success">
            {email} has successfully been added to the mailing list. Thank you!
          </Notification>
        </Box>
        <Button type="reset" onClick={handleReset} fill>
          Add another email address
        </Button>
      </div>
    )
  }

  // Show error message
  if (didSubmit && errorMessage) {
    return (
      <div>
        <Box margin="0 0 var(--size-regular) 0">
          <Notification type="error">
            Something went wrong. Check if you have a working internet connection and make sure that
            you entered a valid email address.
          </Notification>
        </Box>
        <form
          onSubmit={handleSubmit}
          action="https://formspree.io/ismay@ismaywolff.nl"
          method="POST"
        >
          <Input
            autoComplete="email"
            onChange={handleEmailChange}
            value={email}
            type="email"
            placeholder="Your email"
            name="email"
            fill
            required
          />
          <Input
            type="text"
            name="_gotcha"
            tabIndex="-1"
            autoComplete="off"
            onChange={handleGotchaChange}
            value={_gotcha}
            hidden
          />
          <Box margin="var(--size-smaller) 0 0 0">
            <Button type="submit" fill>
              Try again
            </Button>
          </Box>
        </form>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} action="https://formspree.io/ismay@ismaywolff.nl" method="POST">
      <Input
        autoComplete="email"
        onChange={handleEmailChange}
        value={email}
        type="email"
        placeholder="Your email"
        name="email"
        fill
        required
      />
      <Input
        type="text"
        name="_gotcha"
        tabIndex="-1"
        autoComplete="off"
        onChange={handleGotchaChange}
        value={_gotcha}
        hidden
      />
      <Box margin="var(--size-smaller) 0 0 0">
        <Button type="submit" fill>
          Subscribe
        </Button>
      </Box>
    </form>
  )
}

Newsletter.propTypes = {
  handleSubmit: func.isRequired,
  handleEmailChange: func.isRequired,
  handleGotchaChange: func.isRequired,
  handleReset: func.isRequired,
  newsletterState: shape({
    didSubmit: bool.isRequired,
    errorMessage: string.isRequired,
    isSubmitting: bool.isRequired,
    email: string.isRequired,
    _gotcha: string.isRequired
  }).isRequired
}

export default Newsletter
