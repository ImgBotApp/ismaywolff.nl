import React from 'react'
import styled from 'styled-components'
import { bool, string, node, oneOf } from 'prop-types'

/* istanbul ignore next: is tested but not registered by istanbul */
const TitleWithLineTemplate = styled.h1`
  background: var(--color-white);
  display: inline;
  font-size: ${props => props.size};
  margin: ${props => props.margin};
  padding: 0 1rem;
`

const Wrapper = styled.div`
  position: relative;
  text-align: center;

  &::after {
    border-bottom: var(--border-size) solid var(--color-gray);
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-50%);
    z-index: -1;
  }
`

const TitleWithLineFactory = ({ tag, size, children, center, margin }) => {
  const TitleWithLine = TitleWithLineTemplate.withComponent(tag)
  return (
    <Wrapper>
      <TitleWithLine size={size} center={center} margin={margin}>
        {children}
      </TitleWithLine>
    </Wrapper>
  )
}

TitleWithLineFactory.propTypes = {
  center: bool,
  children: node,
  margin: string,
  size: string,
  tag: oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired
}

TitleWithLineFactory.defaultProps = {
  center: false,
  children: undefined,
  margin: 'unset',
  size: '1rem'
}

export default TitleWithLineFactory
