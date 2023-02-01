import * as Styled from './OpeningHours.styled';
import Schedule from '../Schedule/Schedule';
import useOpeningHours from '../../hooks/useOpeningHours';

const OpeningHours = () => {
  const { data, isLoading } = useOpeningHours();

  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.Heading>
          <Styled.ExtendedClockIcon />
          Opening Hours
        </Styled.Heading>
        {isLoading ? <p>Loading...</p> : <Schedule weeklyOpeningHours={data} />}
        <Styled.CardOverlay />
      </Styled.Card>
    </Styled.Container>
  );
};

export default OpeningHours;
