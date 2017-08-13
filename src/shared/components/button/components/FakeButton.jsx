import { bool } from 'prop-types'
import styled from 'styled-components'

const FakeButton = styled.span`
  background: ${props => (props.dark ? 'var(--color-transparent-black)' : 'unset')};
  font-size: var(--size-small);
  padding: var(--size-smaller) var(--size-small);
  white-space: nowrap;
`

FakeButton.propTypes = {
  dark: bool
}

FakeButton.defaultProps = {
  dark: false
}

export default FakeButton
