import styled from 'styled-components'

const ZoomableGridItem = styled.div`
  box-shadow: var(--box-shadow);
  grid-column: span 6;
  position: relative;

  @media (min-width: 30em) {
    grid-column: span 3;
  }

  @media (min-width: 40em) {
    grid-column: span 2;
  }
`

export default ZoomableGridItem
