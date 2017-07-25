import styled from 'styled-components'
import { bool } from 'prop-types'

const Button = styled.button`
  background: var(--color-gray);
  border: 1px solid var(--color-gray-dark);
  border-radius: 0;
  display: ${props => (props.fill ? 'block' : 'unset')};
  padding: var(--size-smaller);
  width: ${props => (props.fill ? '100%' : 'unset')};
`

Button.propTypes = {
  fill: bool
}

Button.defaultProps = {
  fill: false
}

export default Button
