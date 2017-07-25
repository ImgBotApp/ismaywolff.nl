import styled from 'styled-components'
import { oneOf } from 'prop-types'

/* istanbul ignore next: default case cannot be tested without triggering a proptype warning */
const setBackground = props => {
  switch (props.type) {
    case 'success':
      return 'var(--color-green-light)'
    case 'error':
      return 'var(--color-red-light)'
    default:
      return 'var(--color-white)'
  }
}

/* istanbul ignore next: default case cannot be tested without triggering a proptype warning */
const setColor = props => {
  switch (props.type) {
    case 'success':
      return 'var(--color-green-dark)'
    case 'error':
      return 'var(--color-red-dark)'
    default:
      return 'var(--color-black)'
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
