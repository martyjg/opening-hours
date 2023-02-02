import styled, { keyframes } from 'styled-components';
import ClockIcon from '../Icons/ClockIcon';
import { SPACINGS, SIZES } from '../../styles/variables';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fadeOut = keyframes`
  0% { 
    opacity: 1;
  };
  100% { 
    opacity: 0;
  }
`;
const expandShadow = keyframes`
  0% { 
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0px,
    rgba(0, 0, 0, 0.3) 0px 0px 0px 0px, rgba(0, 0, 0, 0.2) 0px -0px 0px inset;
    scale: 0.98;
  };
  100% { 
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset; 
    scale: 1;
  };
`;

export const Card = styled.div`
  position: relative;
  max-width: 280px;
  width: 100%;
  background-color: var(--background-highlight);
  padding: 2rem;
  border-radius: 15px;
  animation-name: ${expandShadow};
  animation-duration: 0.4s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;

export const CardOverlay = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 15px;
  background-color: var(--background-highlight);
  animation-name: ${fadeOut};
  animation-duration: 0.6s;
  animation-delay: 0.3s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
`;

export const Heading = styled.h1`
  font-size: ${SIZES.l};
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

export const ExtendedClockIcon = styled(ClockIcon)`
  margin-right: ${SPACINGS.TIGHT};
  color: var(--typography-inactive);
`;
