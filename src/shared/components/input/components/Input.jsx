import styled from 'styled-components'
import { bool } from 'prop-types'

const setDisplay = props => {
  if (props.hidden) {
    return 'none'
  }

  if (props.fill) {
    return 'block'
  }

  return 'inline'
}

const Input = styled.input`
  border: none;
  border-radius: 0;
  display: ${setDisplay};
  padding: var(--size-smaller);
  width: ${props => (props.fill ? '100%' : 'unset')};
`

Input.propTypes = {
  fill: bool,
  hidden: bool
}

Input.defaultProps = {
  fill: false,
  hidden: false
}

export default Input
