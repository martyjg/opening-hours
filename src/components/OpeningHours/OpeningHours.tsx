import * as Styled from './OpeningHours.styled';
import Schedule from '../Schedule/Schedule';
import useOpeningHours from '../../hooks/useOpeningHours';

const OpeningHours = () => {
  const openingHours = useOpeningHours();

  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.Heading>
          <Styled.ExtendedClockIcon />
          Opening Hours
        </Styled.Heading>
        <Schedule weeklyOpeningHours={openingHours} />
      </Styled.Card>
    </Styled.Container>
  );
};

export default OpeningHours;
