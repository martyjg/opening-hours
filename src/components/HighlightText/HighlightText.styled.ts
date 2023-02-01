import styled from 'styled-components';
import { SPACINGS, SIZES } from '../../styles/variables';

export const Text = styled.span`
  font-size: ${SIZES.s};
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent-highlight);
  margin-left: ${SPACINGS.TIGHT};
`;
