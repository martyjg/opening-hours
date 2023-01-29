import styled from 'styled-components'

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--divider-default);
  text-transform: capitalize;
  padding: 0.4rem 0;
  &:first-child {
    border-top: 1px solid var(--typography-default)
  }
`

interface TextProps {
  inactive?: boolean;
} 

const Text = styled.p<TextProps>`
  text-align: right;
  max-width: 50%;
  color: ${props => props.inactive ? 'var(--typography-inactive)' : ''}
`

export {
  ListItem,
  Text,
}