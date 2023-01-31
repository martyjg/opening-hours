import { Day, OpeningTime } from '../OpeningHours/OpeningHours';
import * as Styled from './Schedule.styled';
import Time from '../Time/Time';
import HighlightText from '../HighlightText/HighlightText';

interface ScheduleProps {
  weeklyOpeningHours: Day[];
}

const adjustDayIndex = (index: number) => (index ? index - 1 : 6);

const Schedule = ({ weeklyOpeningHours }: ScheduleProps) => {
  const dayIndex = new Date().getDay();
  const todayIndex = adjustDayIndex(dayIndex);

  return (
    <ol>
      {weeklyOpeningHours.map((day: Day, index: number) => {
        return (
          <Styled.ListItem key={day.name}>
            <Styled.DayText>
              {day.name}
              {index === todayIndex && <HighlightText>Today</HighlightText>}
            </Styled.DayText>
            {day.openingHours?.length > 0 ? (
              <Styled.TimeText>
                {day.openingHours.map(
                  (openingHour: OpeningTime, index: number) => {
                    return (
                      <span key={index}>
                        {index % 2 === 0 ? (
                          <>{index > 1 ? ', ' : ''}</>
                        ) : (
                          <>&nbsp;-&nbsp;</>
                        )}
                        <Time {...openingHour} />
                      </span>
                    );
                  }
                )}
              </Styled.TimeText>
            ) : (
              <Styled.TimeText inactive>Closed</Styled.TimeText>
            )}
          </Styled.ListItem>
        );
      })}
    </ol>
  );
};

export default Schedule;
