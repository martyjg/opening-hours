import styled from 'styled-components'
import { SIZES } from '../../styles/variables'

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
  font-size: ${SIZES.xl};
`

export {
  Container,
  Card,
  Heading,
}