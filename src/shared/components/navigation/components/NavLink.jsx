import styled from 'styled-components'
import { NavLink as ReactRouterNavlink } from 'react-router-dom'

const StyledNavLink = styled(ReactRouterNavlink)`
  border-bottom: var(--border-size) solid var(--color-gray);
  color: currentColor;
  font-family: var(--font-emphasis);
  font-size: var(--size-small);
  margin-right: 1.5rem;
  text-decoration: none;
  transition: border-color 0.2s;

  &:hover,
  &.active {
    border-bottom: var(--border-size) solid var(--color-black);
  }

  &:last-of-type {
    margin-right: 0;
  }
`

export default StyledNavLink
