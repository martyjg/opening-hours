import * as Styled from './OpeningHours.styled';
import Schedule from '../Schedule/Schedule';

const OpeningHours = () => {
  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.HeadingContainer>
          <Styled.ExtendedClockIcon />
          <Styled.Heading>Opening Hours</Styled.Heading>
        </Styled.HeadingContainer>
        <Schedule />
        <Styled.CardOverlay />
      </Styled.Card>
    </Styled.Container>
  );
};

export default OpeningHours;
