import styled from 'styled-components'
import { SPACING_TOKENS, SIZES } from '../../styles/variables'

const Text = styled.span`
  font-size: ${SIZES.s};
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent-highlight);
  margin-left: ${SPACING_TOKENS.TIGHT}
`

export {
  Text
}