/* eslint-disable default-case, consistent-return */

import { oneOf } from 'prop-types'
import styled from 'styled-components'

const setBackground = props => {
  switch (props.type) {
    case 'info':
      return 'var(--color-blue-light)'
    case 'error':
      return 'var(--color-red-light)'
  }
}

const setColor = props => {
  switch (props.type) {
    case 'info':
      return 'var(--color-blue-dark)'
    case 'error':
      return 'var(--color-red-dark)'
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
