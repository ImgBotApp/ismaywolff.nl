import { number } from 'prop-types'
import styled from 'styled-components'

/**
 * Renders a background color while the child image is loading. Expects an img
 * as child. Only the ratio between height and width params is important so
 * actual sizes aren't necessary.
 */

const Placeholder = styled.picture`
  background: var(--color-gray);
  display: block;
  height: 0;
  padding-top: calc(${props => props.height / props.width} * 100%);
  position: relative;
  width: 100%;

  & img {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

Placeholder.propTypes = {
  height: number.isRequired,
  width: number.isRequired
}

export default Placeholder
