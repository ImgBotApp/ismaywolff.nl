import styled from 'styled-components'

const ThumbnailGridItem = styled.div`
  grid-column: span 2;
  position: relative;

  @media (min-width: 30em) {
    grid-column: span 1;
  }
`

export default ThumbnailGridItem
