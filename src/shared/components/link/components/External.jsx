import { string, bool } from 'prop-types'
import styled from 'styled-components'

const setBackgroundImage = props => {
  if (props.clean) {
    return 'unset'
  }

  return 'linear-gradient(transparent 50%, currentColor 50%)'
}

const External = styled.a`
  background-image: ${setBackgroundImage};
  background-position: 0 1.07em;
  background-repeat: repeat-x;
  background-size: 2px 0.1em;
  color: currentColor;
  font-size: ${props => props.size};
  text-decoration: none;
`

External.propTypes = {
  href: string.isRequired,
  clean: bool,
  size: string
}

External.defaultProps = {
  clean: false,
  size: 'unset'
}

export default External
