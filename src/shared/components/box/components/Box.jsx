import styled from 'styled-components'
import { bool, string } from 'prop-types'

const Box = styled.div`
  font-size: ${props => props.size};
  margin: ${props => props.margin};
  text-align: ${props => (props.center ? 'center' : 'left')};
`

Box.propTypes = {
  center: bool,
  margin: string,
  size: string
}

Box.defaultProps = {
  center: false,
  margin: 'unset',
  size: 'unset'
}

export default Box
