import { StyledClockIcon } from './ClockIcon.styled';

type ClockType = {
  className?: string;
};

const ClockIcon = ({ className }: ClockType): React.ReactElement => {
  return (
    <StyledClockIcon
      className={className}
      aria-hidden
      xmlns='http://www.w3.org/2000/Svg'
      width='800'
      height='800'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z'
      ></path>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M15.71 15.18l-3.1-1.85c-.54-.32-.98-1.09-.98-1.72v-4.1'
      ></path>
    </StyledClockIcon>
  );
};

export default ClockIcon;
