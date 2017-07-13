import styled, { keyframes } from 'styled-components'

const scale = keyframes`
  from {
    transform: scale(0);
  }

  to {
    opacity: 0;
    transform: scale(1);
  }
`

const Spinner = styled.div`
  animation: ${scale} 1s infinite ease-in-out;
  background-color: var(--color-black);
  border-radius: 100%;
  height: 2rem;
  margin: 2rem auto;
  width: 2rem;
`

export default Spinner
