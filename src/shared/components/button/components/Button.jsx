import { bool } from 'prop-types'
import styled from 'styled-components'

const Button = styled.span`
  background: ${props => (props.dark ? 'var(--color-transparent-black)' : 'unset')};
  font-size: var(--size-small);
  padding: var(--size-smaller) var(--size-small);
  white-space: nowrap;
`

Button.propTypes = {
  dark: bool
}

Button.defaultProps = {
  dark: false
}

export default Button
