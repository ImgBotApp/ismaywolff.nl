import React from 'react'
import styled from 'styled-components'
import { bool, string, node, oneOf } from 'prop-types'

/* istanbul ignore next: is tested but not registered by istanbul */
const TitleTemplate = styled.h1`
  font-size: ${props => props.size};
  margin: ${props => props.margin};
  text-align: ${props => (props.center ? 'center' : 'left')};
`

const TitleFactory = ({ tag, size, children, center, margin }) => {
  const Title = TitleTemplate.withComponent(tag)
  return (
    <Title size={size} center={center} margin={margin}>
      {children}
    </Title>
  )
}

TitleFactory.propTypes = {
  center: bool,
  children: node,
  margin: string,
  size: string,
  tag: oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired
}

TitleFactory.defaultProps = {
  center: false,
  children: undefined,
  margin: 'unset',
  size: '1rem'
}

export default TitleFactory
