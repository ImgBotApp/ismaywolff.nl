/* eslint-disable default-case, consistent-return */

import styled from 'styled-components'
import { oneOf } from 'prop-types'

const setBackground = props => {
  switch (props.type) {
    case 'success':
      return 'var(--color-green-light)'
    case 'error':
      return 'var(--color-red-light)'
  }
}

const setColor = props => {
  switch (props.type) {
    case 'success':
      return 'var(--color-green-dark)'
    case 'error':
      return 'var(--color-red-dark)'
  }
}

const Notification = styled.div`
  background: ${setBackground};
  color: ${setColor};
  padding: var(--size-smaller);
  text-align: center;
`

Notification.propTypes = {
  type: oneOf(['error', 'success']).isRequired
}

export default Notification
