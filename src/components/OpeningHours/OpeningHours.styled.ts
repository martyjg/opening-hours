import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: var(--background-highlight);
`

const Heading = styled.h1`
  font-size: 2rem;
`

export {
  Container,
  Card,
  Heading,
}