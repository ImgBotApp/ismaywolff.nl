import { Link as ReactRouterLink } from 'react-router-dom'
import { string, bool } from 'prop-types'
import styled from 'styled-components'

const setBackgroundImage = props => {
  if (props.clean) {
    return 'unset'
  }

  return 'linear-gradient(transparent 50%, currentColor 50%)'
}

const Internal = styled(ReactRouterLink)`
  background-image: ${setBackgroundImage};
  background-position: 0 1.07em;
  background-repeat: repeat-x;
  background-size: 2px 0.1em;
  color: currentColor;
  font-size: ${props => props.size};
  text-decoration: none;
`

Internal.propTypes = {
  to: string.isRequired,
  clean: bool,
  size: string
}

Internal.defaultProps = {
  clean: false,
  size: 'unset'
}

export default Internal
