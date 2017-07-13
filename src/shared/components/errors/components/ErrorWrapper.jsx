import { oneOf } from 'prop-types'
import styled from 'styled-components'

/* istanbul ignore next: default case cannot be tested without triggering a proptype warning */
const setBackground = props => {
  switch (props.type) {
    case 'info':
      return 'var(--color-blue-light)'
    case 'error':
      return 'var(--color-red-light)'
    default:
      return 'var(--color-white)'
  }
}

/* istanbul ignore next: default case cannot be tested without triggering a proptype warning */
const setColor = props => {
  switch (props.type) {
    case 'info':
      return 'var(--color-blue-dark)'
    case 'error':
      return 'var(--color-red-dark)'
    default:
      return 'var(--color-black)'
  }
}

const ErrorWrapper = styled.div`
  background: ${setBackground};
  color: ${setColor};
  fill: ${setColor};
  padding: var(--size-small) var(--size-regular);
`

ErrorWrapper.propTypes = {
  type: oneOf(['error', 'info']).isRequired
}

export default ErrorWrapper
