import styled from 'styled-components'

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  margin-top: 0;
  text-align: center;
  white-space: nowrap;

  @media (min-width: 30em) {
    margin-bottom: 0;
    text-align: left;
  }
`

export default HeaderTitle
