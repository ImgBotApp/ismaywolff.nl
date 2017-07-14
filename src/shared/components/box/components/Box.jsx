import styled from 'styled-components'
import { bool, string } from 'prop-types'

const Box = styled.div`
  color: ${props => props.color};
  font-size: ${props => props.size};
  margin: ${props => props.margin};
  text-align: ${props => (props.center ? 'center' : 'left')};
`

Box.propTypes = {
  center: bool,
  color: string,
  margin: string,
  size: string
}

Box.defaultProps = {
  center: false,
  color: 'unset',
  margin: 'unset',
  size: 'unset'
}

export default Box
