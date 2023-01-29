import styled from 'styled-components'
import { SIZES } from '../../styles/variables'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  max-width: 280px;
  width: 100%;
  background-color: var(--background-highlight);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  `
const Heading = styled.h1`
  font-size: ${SIZES.xl};
  margin-bottom: 0.8rem;
`

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--typography-inactive);
  text-transform: capitalize;
  padding: 0.4rem 0;
  &:first-child {
    border-top: 1px solid var(--typography-default)
  }
`

const Text = styled.p`
  text-align: right;
  max-width: 65%;
`

export {
  Container,
  Card,
  Heading,
  ListItem,
  Text,
}