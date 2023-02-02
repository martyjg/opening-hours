import * as Styled from './OpeningHours.styled';
import Schedule from '../Schedule/Schedule';

const OpeningHours = () => {
  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.Heading>
          <Styled.ExtendedClockIcon />
          Opening Hours
        </Styled.Heading>
        <Schedule />
        <Styled.CardOverlay />
      </Styled.Card>
    </Styled.Container>
  );
};

export default OpeningHours;
